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

// GitHub-specific setup (optional for local testing)
const github = GITHUB_TOKEN ? new Octokit({ auth: GITHUB_TOKEN }) : null;
const [owner, repo] = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/') : ['', ''];

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

// Get which lines were changed in a file
function getChangedLines(fileName) {
  try {
    // Get the diff for this file
    const diff = execSync(
      `git diff ${BASE_SHA} ${COMMIT_SHA} -- ${fileName}`,
      { encoding: 'utf8' }
    );
    
    // Parse the diff to find changed line numbers
    const changedLines = new Set();
    const lines = diff.split('\n');
    let currentLine = 0;
    
    for (const line of lines) {
      if (line.startsWith('@@')) {
        const match = line.match(/\+(\d+)/);
        if (match) {
          currentLine = parseInt(match[1]) - 1;
        }
      } else if (line.startsWith('+') && !line.startsWith('+++')) {
        currentLine++;
        changedLines.add(currentLine);
      } else if (!line.startsWith('-')) {
        currentLine++;
      }
    }
    
    return changedLines;
  } catch (e) {
    console.error(`Error getting changed lines for ${fileName}:`, e.message);
    return new Set();
  }
}

// Get content of specific lines with context
function getLineContent(content, lineNumber) {
  const lines = content.split('\n');
  if (lineNumber < 1 || lineNumber > lines.length) {
    return null;
  }
  return lines[lineNumber - 1];
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
async function reviewWithAI(fileContent, fileName, styleRules, changedLines) {
  const systemPrompt = `You are an expert technical documentation reviewer for Amplitude.

CRITICAL CONSTRAINTS:
- This is a Pull Request review
- You can ONLY flag issues on lines that were CHANGED in this PR
- Focus ONLY on newly added or modified content
- Ignore pre-existing issues in unchanged lines
- Provide the EXACT corrected text for GitHub suggestions

# Amplitude Style Rules (CRITICAL - Apply ALL of these):

${styleRules.map(rule => `## ${rule.name}\n${rule.content}`).join('\n\n---\n\n')}

# Your Task:
1. Review ONLY the changed lines (marked with ➡️) for violations
2. Focus on: active voice, present tense, contractions, link format
3. Provide EXACT line numbers (must match the ➡️ marked lines)
4. For each issue, provide the EXACT corrected line text
5. Be constructive and helpful
6. Prioritize: errors > warnings > info

# Output Format (CRITICAL - Return valid JSON):
Return a JSON object with an "issues" array. Each issue must have:
{
  "issues": [
    {
      "line": <exact line number from the file>,
      "severity": "error" | "warning" | "info",
      "rule": "<which style rule>",
      "issue": "<brief description>",
      "originalText": "<exact current text on this line>",
      "correctedText": "<exact corrected text for this line>",
      "explanation": "<why this matters>"
    }
  ]
}

CRITICAL REQUIREMENTS:
- Line numbers must be EXACT (count from start of file, shown as "➡️ 123:")
- Only include issues for lines marked with ➡️
- originalText MUST be copied EXACTLY from the line content (after the ":")
- correctedText MUST be the full line with only the specific fix applied
- If you're unsure about a line number, DO NOT include that issue
- Return empty array if no issues found
- Always return valid JSON

EXAMPLE:
If line 18 says: "This will allow you to configure settings"
And it violates contractions rule, your response should be:
{
  "line": 18,
  "originalText": "This will allow you to configure settings",
  "correctedText": "This allows you to configure settings",
  "rule": "contractions"
}`;

  // Mark changed lines
  const changedLinesArray = Array.from(changedLines || []);
  const contentWithMarkers = fileContent.split('\n').map((line, i) => {
    const lineNum = i + 1;
    const marker = changedLines && changedLines.has(lineNum) ? '➡️' : '  ';
    return `${marker} ${String(lineNum).padStart(4, ' ')}: ${line}`;
  }).join('\n');
  
  const userPrompt = `Review this documentation file: ${fileName}

**Changed lines in this PR:** ${changedLinesArray.length > 0 ? changedLinesArray.join(', ') : 'All lines (new file)'}

Content (lines marked with ➡️ were changed in this PR):
\`\`\`markdown
${contentWithMarkers}
\`\`\`

IMPORTANT: 
- Only flag issues on lines marked with ➡️ (changed lines)
- Provide EXACT originalText and correctedText for each issue
- Line numbers must match the numbers shown above
- Focus on substantive style violations

Return JSON with the "issues" array.`;

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

// Fetch existing review comments to avoid duplicates
async function getExistingComments(fileName) {
  if (!github) return new Set();
  
  try {
    const { data: comments } = await github.rest.pulls.listReviewComments({
      owner,
      repo,
      pull_number: parseInt(PR_NUMBER),
    });
    
    // Create a Set of unique comment identifiers (file + line + rule)
    const existingComments = new Set();
    
    comments
      .filter(comment => comment.path === fileName)
      .forEach(comment => {
        // Extract rule from comment body (format: "🟡 **rule-name**" at start)
        // Match the first bold text after emoji, which is always the rule name
        const ruleMatch = comment.body.match(/^.+?\*\*([a-z-]+)\*\*/);
        if (ruleMatch) {
          const rule = ruleMatch[1];
          const line = comment.line || comment.original_line;
          if (line) {
            const key = `${fileName}:${line}:${rule}`;
            existingComments.add(key);
          }
        }
      });
    
    return existingComments;
  } catch (error) {
    console.error(`Warning: Could not fetch existing comments: ${error.message}`);
    return new Set();
  }
}

// Post inline review comments on specific lines with GitHub suggestions
async function postInlineComments(fileName, issues, lineMapping, fileContent) {
  if (!lineMapping || !lineMapping.lineMap) {
    console.log(`No line mapping available for ${fileName}, skipping inline comments`);
    return 0;
  }
  
  // Fetch existing comments to avoid duplicates
  console.log('  Checking for existing comments...');
  const existingComments = await getExistingComments(fileName);
  if (existingComments.size > 0) {
    console.log(`  Found ${existingComments.size} existing comments to skip`);
  }
  
  let commentCount = 0;
  let skippedCount = 0;
  let mismatchedCount = 0;
  const lines = fileContent.split('\n');
  
  for (const issue of issues) {
    if (!issue.line || issue.line < 1) continue;
    
    // Check if this exact comment already exists
    const commentKey = `${fileName}:${issue.line}:${issue.rule}`;
    if (existingComments.has(commentKey)) {
      console.log(`  Skipping duplicate comment at line ${issue.line} for ${issue.rule}`);
      skippedCount++;
      continue;
    }
    
    // Validate that AI's originalText matches the actual line content
    const actualLine = lines[issue.line - 1];
    if (issue.originalText && actualLine) {
      // Normalize whitespace for comparison
      const normalizedActual = actualLine.trim();
      const normalizedOriginal = issue.originalText.trim();
      
      // Check if the original text is contained in the actual line or vice versa
      if (!normalizedActual.includes(normalizedOriginal) && !normalizedOriginal.includes(normalizedActual)) {
        console.log(`  ⚠️  Skipping mismatched suggestion at line ${issue.line}`);
        console.log(`     Expected: "${normalizedOriginal.substring(0, 50)}..."`);
        console.log(`     Actual:   "${normalizedActual.substring(0, 50)}..."`);
        mismatchedCount++;
        continue;
      }
    }
    
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
    
    // Add GitHub suggestion if we have corrected text
    if (issue.originalText && issue.correctedText) {
      body += `**Suggested change:**\n\`\`\`suggestion\n${issue.correctedText}\n\`\`\`\n\n`;
    } else if (issue.correctedText) {
      // Fallback: try to get the current line
      const currentLine = lines[issue.line - 1];
      if (currentLine) {
        body += `**Suggested change:**\n\`\`\`suggestion\n${issue.correctedText}\n\`\`\`\n\n`;
      }
    }
    
    if (issue.explanation) {
      body += `**Why this matters:** ${issue.explanation}\n\n`;
    }
    
    body += `---\n`;
    body += `💡 *Tip: Click "Commit suggestion" above to apply this fix*\n\n`;
    body += `🤖 *AI-powered review - [Style guide](.cursor/rules/README.md)*`;
    
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
  
  if (skippedCount > 0) {
    console.log(`  ✓ Skipped ${skippedCount} duplicate comment${skippedCount > 1 ? 's' : ''}`);
  }
  
  if (mismatchedCount > 0) {
    console.log(`  ⚠️  Skipped ${mismatchedCount} mismatched suggestion${mismatchedCount > 1 ? 's' : ''} (AI line numbers didn't match actual content)`);
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

// Post summary comment (or update existing)
async function postSummaryComment(comment) {
  if (!github) {
    console.log('Skipping summary comment (local mode)');
    return;
  }
  
  try {
    // Check if a summary comment already exists
    const { data: comments } = await github.rest.issues.listComments({
      owner,
      repo,
      issue_number: parseInt(PR_NUMBER),
    });
    
    // Find existing AI review summary
    const existingSummary = comments.find(c => 
      c.body.includes('🤖 AI Documentation Review') &&
      c.user.type === 'Bot'
    );
    
    if (existingSummary) {
      // Update existing comment
      await github.rest.issues.updateComment({
        owner,
        repo,
        comment_id: existingSummary.id,
        body: comment
      });
      console.log('✅ Updated existing summary comment on PR');
    } else {
      // Create new comment
      await github.rest.issues.createComment({
        owner,
        repo,
        issue_number: parseInt(PR_NUMBER),
        body: comment
      });
      console.log('✅ Posted new summary comment to PR');
    }
  } catch (error) {
    console.error('Error posting/updating summary comment:', error.message);
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
      
      // Get which lines were changed
      console.log('  Identifying changed lines...');
      const changedLines = getChangedLines(file);
      console.log(`  ${changedLines.size} lines changed`);
      
      // Get line mapping for inline comments
      console.log('  Getting diff positions...');
      const lineMapping = await getLineMapping(file);
      
      // Get AI review (pass changed lines)
      console.log('  Calling AI for review...');
      const issues = await reviewWithAI(content, file, styleRules, changedLines);
      console.log(`  Found ${issues.length} issues`);
      
      // Filter issues to only those on changed lines (double-check)
      const validIssues = issues.filter(issue => {
        if (changedLines.size === 0) return true; // New file, all lines valid
        return changedLines.has(issue.line);
      });
      
      if (validIssues.length < issues.length) {
        console.log(`  Filtered out ${issues.length - validIssues.length} issues on unchanged lines`);
      }
      
      results.push({ file, issues: validIssues });
      
      // Post inline comments with suggestions
      if (validIssues.length > 0 && lineMapping) {
        console.log('  Posting inline comments with suggestions...');
        const count = await postInlineComments(file, validIssues, lineMapping, content);
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

module.exports = { main, reviewWithAI, loadStyleRules, getChangedLines, getLineContent };

