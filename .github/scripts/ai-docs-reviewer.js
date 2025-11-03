const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const fetch = require('node-fetch');
const { Octokit } = require('@octokit/rest');

// Configuration
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const PR_NUMBER = process.env.PR_NUMBER;
const COMMIT_SHA = process.env.COMMIT_SHA;
const BASE_SHA = process.env.BASE_SHA;

const github = new Octokit({ auth: GITHUB_TOKEN });
const [owner, repo] = process.env.GITHUB_REPOSITORY.split('/');

// Load all Cursor style rules
function loadStyleRules() {
  const rulesDir = '.cursor/rules';
  const styleRules = [];
  
  const ruleFiles = [
    'voice-and-tense.md',
    'contractions.md',
    'concise-language.md',
    'direct-instructions.md',
    'person-and-point-of-view.md',
    'inclusive-terminology.md',
    'technical-writing.md',
    'statamic-routing.md'
  ];
  
  ruleFiles.forEach(file => {
    const filePath = path.join(rulesDir, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      styleRules.push({
        name: file.replace('.md', ''),
        content: content.substring(0, 2000) // Truncate to save tokens
      });
    }
  });
  
  return styleRules;
}

// Get changed files from git
function getChangedFiles() {
  try {
    const output = execSync(`git diff --name-only ${BASE_SHA} ${COMMIT_SHA}`, { encoding: 'utf8' });
    return output.split('\n')
      .filter(f => f.endsWith('.md') && f.startsWith('content/collections/'))
      .filter(f => f.trim().length > 0);
  } catch (e) {
    console.error('Error getting changed files:', e);
    return [];
  }
}

// Get line mapping for a file (maps content lines to diff positions)
async function getLineMapping(fileName) {
  try {
    const { data: files } = await github.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: parseInt(PR_NUMBER)
    });
    
    const file = files.find(f => f.filename === fileName);
    if (!file || !file.patch) {
      console.log(`No patch data for ${fileName}`);
      return null;
    }
    
    // Parse the diff to map line numbers to positions
    const lines = file.patch.split('\n');
    const lineMap = new Map();
    let currentLine = 0;
    let position = 0;
    
    for (const line of lines) {
      if (line.startsWith('@@')) {
        // Parse hunk header: @@ -old_start,old_count +new_start,new_count @@
        const match = line.match(/\+(\d+)/);
        if (match) {
          currentLine = parseInt(match[1]) - 1;
        }
      } else if (line.startsWith('+')) {
        currentLine++;
        position++;
        lineMap.set(currentLine, position);
      } else if (!line.startsWith('-')) {
        currentLine++;
        position++;
        lineMap.set(currentLine, position);
      } else {
        position++;
      }
    }
    
    return {
      sha: file.sha,
      lineMap: lineMap
    };
  } catch (error) {
    console.error(`Error getting line mapping for ${fileName}:`, error.message);
    return null;
  }
}

// Call OpenAI API to review documentation
async function reviewWithAI(fileContent, fileName, styleRules) {
  const systemPrompt = `You are an expert technical documentation reviewer for Amplitude. 
Your job is to review documentation against Amplitude's style guide and provide actionable, specific feedback.

# Amplitude Style Rules (CRITICAL - Apply ALL of these):

${styleRules.map(rule => `## ${rule.name}\n${rule.content}`).join('\n\n---\n\n')}

# Your Task:
1. Review the documentation for violations of these style rules
2. Focus on the most impactful issues (active voice, present tense, contractions, link format)
3. Provide specific line numbers where possible
4. Provide specific suggestions with before/after examples
5. Be constructive and helpful
6. Prioritize: errors > warnings > info

# Output Format (CRITICAL - Return valid JSON):
Return a JSON object with an "issues" array. Each issue must have:
{
  "issues": [
    {
      "line": <line number in the file, starting from 1>,
      "severity": "error" | "warning" | "info",
      "rule": "<which style rule>",
      "issue": "<brief description>",
      "suggestion": "<specific fix with example>",
      "explanation": "<why this matters>"
    }
  ]
}

IMPORTANT:
- Line numbers must be accurate (count from the start of the file)
- Focus on changed lines only
- Return empty array if no issues found
- Always return valid JSON`;

  const userPrompt = `Review this documentation file: ${fileName}

Content (with line numbers):
\`\`\`markdown
${fileContent.split('\n').map((line, i) => `${i + 1}: ${line}`).join('\n')}
\`\`\`

Focus your review on substantive style issues. Return JSON with the "issues" array.`;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        response_format: { type: "json_object" }
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    const content = data.choices[0].message.content;
    
    try {
      const parsed = JSON.parse(content);
      return parsed.issues || [];
    } catch (e) {
      console.error('Failed to parse AI response:', content);
      return [];
    }
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    return [];
  }
}

// Post inline review comments on specific lines
async function postInlineComments(fileName, issues, lineMapping) {
  if (!lineMapping || !lineMapping.lineMap) {
    console.log(`No line mapping available for ${fileName}, skipping inline comments`);
    return 0;
  }
  
  let commentCount = 0;
  
  for (const issue of issues) {
    if (!issue.line || issue.line < 1) continue;
    
    // Get the position in the diff
    const position = lineMapping.lineMap.get(issue.line);
    
    if (!position) {
      console.log(`Line ${issue.line} not in diff for ${fileName}, skipping`);
      continue;
    }
    
    const severityEmoji = {
      'error': '🔴',
      'warning': '🟡',
      'info': 'ℹ️'
    };
    
    const emoji = severityEmoji[issue.severity] || '📝';
    
    let body = `${emoji} **${issue.rule}**\n\n`;
    body += `${issue.issue}\n\n`;
    
    if (issue.suggestion) {
      body += `💡 **Suggestion**: ${issue.suggestion}\n\n`;
    }
    
    if (issue.explanation) {
      body += `*Why this matters*: ${issue.explanation}\n\n`;
    }
    
    body += `---\n`;
    body += `🤖 *AI-powered review - [Learn about our style guide](.cursor/rules/README.md)*`;
    
    try {
      await github.rest.pulls.createReviewComment({
        owner,
        repo,
        pull_number: parseInt(PR_NUMBER),
        body: body,
        commit_id: COMMIT_SHA,
        path: fileName,
        position: position
      });
      commentCount++;
      
      // Rate limit
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to post inline comment at line ${issue.line}:`, error.message);
    }
  }
  
  return commentCount;
}

// Format issues as GitHub PR summary comment
function formatSummaryComment(results) {
  let comment = `## 🤖 AI Documentation Review\n\n`;
  
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  const totalFiles = results.length;
  const filesWithIssues = results.filter(r => r.issues.length > 0).length;
  
  if (totalIssues === 0) {
    comment += `### ✅ Excellent work!\n\n`;
    comment += `Reviewed ${totalFiles} ${totalFiles === 1 ? 'file' : 'files'} - all documentation follows Amplitude's style guidelines!\n\n`;
  } else {
    comment += `Reviewed ${totalFiles} ${totalFiles === 1 ? 'file' : 'files'} and found ${totalIssues} ${totalIssues === 1 ? 'suggestion' : 'suggestions'} in ${filesWithIssues} ${filesWithIssues === 1 ? 'file' : 'files'}.\n\n`;
    
    // Summary by file
    comment += `### Files Reviewed\n\n`;
    
    results.forEach(result => {
      const issueCount = result.issues.length;
      const icon = issueCount === 0 ? '✅' : issueCount < 3 ? '🟡' : '🔴';
      comment += `${icon} \`${result.file}\` - ${issueCount} ${issueCount === 1 ? 'issue' : 'issues'}\n`;
    });
    
    comment += `\n`;
    
    // Summary by severity
    const allIssues = results.flatMap(r => r.issues);
    const errors = allIssues.filter(i => i.severity === 'error').length;
    const warnings = allIssues.filter(i => i.severity === 'warning').length;
    const info = allIssues.filter(i => i.severity === 'info').length;
    
    if (errors > 0 || warnings > 0) {
      comment += `### Issue Breakdown\n\n`;
      if (errors > 0) comment += `🔴 **${errors}** critical ${errors === 1 ? 'issue' : 'issues'}\n`;
      if (warnings > 0) comment += `🟡 **${warnings}** important ${warnings === 1 ? 'issue' : 'issues'}\n`;
      if (info > 0) comment += `ℹ️ **${info}** minor ${info === 1 ? 'suggestion' : 'suggestions'}\n`;
      comment += `\n`;
    }
    
    comment += `💬 **Check inline comments above** for specific suggestions on each line.\n\n`;
  }
  
  comment += `---\n\n`;
  comment += `### 💡 Quick Fixes with Cursor\n\n`;
  comment += `To fix these issues quickly:\n\n`;
  comment += `1. Open the file in Cursor\n`;
  comment += `2. Press **Cmd+L** for Cursor Chat\n`;
  comment += `3. Say: **"Fix all style issues following Amplitude guidelines"**\n\n`;
  comment += `Or fix specific issues:\n`;
  comment += `- "Convert to active voice"\n`;
  comment += `- "Apply contractions"\n`;
  comment += `- "Fix link formatting to use /docs/ routes"\n`;
  comment += `- "Use present tense instead of future tense"\n\n`;
  comment += `📚 [Contributing Guide](.cursor/HOW-TO-CONTRIBUTE.md) | `;
  comment += `📖 [Style Guide](.cursor/rules/README.md) | `;
  comment += `🔧 [All Templates](.cursor/rules/TEMPLATES-INDEX.md)\n`;
  
  return comment;
}

// Post summary comment
async function postSummaryComment(comment) {
  try {
    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number: parseInt(PR_NUMBER),
      body: comment
    });
    console.log('✅ Posted summary comment to PR');
  } catch (error) {
    console.error('Error posting summary comment:', error.message);
  }
}

// Main execution
async function main() {
  console.log('🤖 AI Documentation Reviewer starting...\n');
  
  if (!OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not set. Add it as a GitHub secret.');
    process.exit(1);
  }
  
  // Load style rules
  const styleRules = loadStyleRules();
  console.log(`📚 Loaded ${styleRules.length} style rules\n`);
  
  // Get changed files
  const changedFiles = getChangedFiles();
  console.log(`📄 Found ${changedFiles.length} changed documentation files\n`);
  
  if (changedFiles.length === 0) {
    console.log('No documentation files to review');
    return;
  }
  
  const results = [];
  let totalComments = 0;
  
  // Review each file
  for (const file of changedFiles) {
    console.log(`\n📝 Reviewing ${file}...`);
    
    try {
      // Read file content
      const content = fs.readFileSync(file, 'utf8');
      
      // Get line mapping for inline comments
      console.log('  Getting diff positions...');
      const lineMapping = await getLineMapping(file);
      
      // Get AI review
      console.log('  Calling AI for review...');
      const issues = await reviewWithAI(content, file, styleRules);
      console.log(`  Found ${issues.length} issues`);
      
      results.push({ file, issues });
      
      // Post inline comments
      if (issues.length > 0 && lineMapping) {
        console.log('  Posting inline comments...');
        const count = await postInlineComments(file, issues, lineMapping);
        totalComments += count;
        console.log(`  Posted ${count} inline comments`);
      }
      
      // Rate limit between files
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error(`  ❌ Error reviewing ${file}:`, error.message);
    }
  }
  
  // Post summary comment
  console.log('\n📋 Generating summary...');
  const summary = formatSummaryComment(results);
  await postSummaryComment(summary);
  
  const totalIssues = results.reduce((sum, r) => sum + r.issues.length, 0);
  
  console.log('\n✅ Review complete!');
  console.log(`   Files reviewed: ${results.length}`);
  console.log(`   Issues found: ${totalIssues}`);
  console.log(`   Inline comments posted: ${totalComments}`);
  console.log(`   Summary comment: Posted\n`);
}

// Run
if (require.main === module) {
  main().catch(error => {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { main, reviewWithAI, loadStyleRules };

