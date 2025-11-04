#!/usr/bin/env node

/**
 * Local testing script for AI documentation reviewer
 * 
 * Usage:
 *   export OPENAI_API_KEY="sk-..."
 *   node test-local.js path/to/file.md
 * 
 * Example:
 *   node test-local.js ../../content/collections/analytics/en/session-replay.md
 */

const fs = require('fs');
const { reviewWithAI, loadStyleRules } = require('./ai-docs-reviewer.js');

async function testFile(filePath) {
  console.log(`\n🧪 Testing AI Review on: ${filePath}\n`);
  console.log('='.repeat(70));
  
  // Check API key
  if (!process.env.OPENAI_API_KEY) {
    console.error('\n❌ Error: OPENAI_API_KEY environment variable not set');
    console.error('\nSet it with:');
    console.error('  export OPENAI_API_KEY="sk-..."');
    process.exit(1);
  }
  
  // Check file exists
  if (!fs.existsSync(filePath)) {
    console.error(`\n❌ Error: File not found: ${filePath}`);
    process.exit(1);
  }
  
  // Load style rules
  console.log('\n📚 Loading style rules...');
  const styleRules = loadStyleRules();
  console.log(`   ✅ Loaded ${styleRules.length} rules`);
  
  // Read file
  console.log('\n📄 Reading file...');
  const content = fs.readFileSync(filePath, 'utf8');
  const lineCount = content.split('\n').length;
  console.log(`   ✅ ${lineCount} lines`);
  
  // For local testing, treat all lines as "changed"
  // In a real PR, only changed lines would be reviewed
  const allLines = new Set();
  for (let i = 1; i <= lineCount; i++) {
    allLines.add(i);
  }
  
  // Review with AI
  console.log('\n🤖 Calling OpenAI for review...');
  console.log('   (This may take 10-30 seconds...)');
  
  const startTime = Date.now();
  const issues = await reviewWithAI(content, filePath, styleRules, allLines);
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  
  console.log(`   ✅ Complete in ${elapsed}s`);
  console.log(`   Found ${issues.length} issue${issues.length === 1 ? '' : 's'}`);
  
  // Display results
  console.log('\n' + '='.repeat(70));
  
  if (issues.length === 0) {
    console.log('\n✅ No issues found! Great work!\n');
    return;
  }
  
  console.log(`\n📋 Found ${issues.length} Issue${issues.length === 1 ? '' : 's'}:\n`);
  
  // Group by severity
  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  const info = issues.filter(i => i.severity === 'info');
  
  // Display errors
  if (errors.length > 0) {
    console.log('🔴 ERRORS:\n');
    errors.forEach((issue, idx) => displayIssue(issue, idx + 1, content));
  }
  
  // Display warnings
  if (warnings.length > 0) {
    console.log('\n🟡 WARNINGS:\n');
    warnings.forEach((issue, idx) => displayIssue(issue, idx + 1, content));
  }
  
  // Display info
  if (info.length > 0) {
    console.log('\n ℹ️  INFO:\n');
    info.forEach((issue, idx) => displayIssue(issue, idx + 1, content));
  }
  
  console.log('\n' + '='.repeat(70));
  console.log('\n💡 To fix these in Cursor:');
  console.log('   1. Open the file in Cursor');
  console.log('   2. Press Cmd+L for Cursor Chat');
  console.log('   3. Say: "Fix all style issues following Amplitude guidelines"');
  console.log('\n✅ Review complete!\n');
}

function displayIssue(issue, number, fileContent) {
  const lines = fileContent.split('\n');
  const currentLine = lines[issue.line - 1] || '';
  
  console.log(`${number}. Line ${issue.line}: ${issue.rule}`);
  console.log(`   Severity: ${issue.severity}`);
  console.log(`   Issue: ${issue.issue}`);
  
  if (currentLine.trim()) {
    console.log(`\n   Current text:`);
    console.log(`   > ${currentLine.trim()}`);
  }
  
  if (issue.correctedText) {
    console.log(`\n   Suggested fix:`);
    console.log(`   > ${issue.correctedText.trim()}`);
  }
  
  if (issue.explanation) {
    console.log(`\n   📖 Why: ${issue.explanation}`);
  }
  
  console.log('\n' + '-'.repeat(70) + '\n');
}

// Get file path from command line
const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node test-local.js <path-to-file>');
  console.error('\nExample:');
  console.error('  node test-local.js ../../content/collections/analytics/en/session-replay.md');
  console.error('\nNote: Make sure OPENAI_API_KEY environment variable is set');
  process.exit(1);
}

// Run test
testFile(filePath).catch(error => {
  console.error('\n❌ Error:', error.message);
  console.error('\nStack trace:');
  console.error(error.stack);
  process.exit(1);
});

