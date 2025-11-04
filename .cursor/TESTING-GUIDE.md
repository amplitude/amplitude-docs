# Testing the AI Documentation Reviewer

Quick guide to test the AI reviewer locally before submitting a PR.

## Setup (One Time)

```bash
# 1. Go to scripts directory
cd .github/scripts

# 2. Install dependencies
npm install

# 3. Set your OpenAI API key
export OPENAI_API_KEY="sk-..."
```

## Test a File

```bash
# From .github/scripts directory
node test-local.js ../../content/collections/analytics/en/your-file.md
```

### Example Output:

```
🧪 Testing AI Review on: content/collections/analytics/en/session-replay.md

📚 Loading style rules...
   ✅ Loaded 8 rules

📄 Reading file...
   ✅ 195 lines

🤖 Calling OpenAI for review...
   (This may take 10-30 seconds...)
   ✅ Complete in 12.3s
   Found 3 issues

📋 Found 3 Issues:

🟡 WARNINGS:

1. Line 24: voice-and-tense
   Severity: warning
   Issue: Uses future tense "will allow"

   Current text:
   > With Session Replay, you will be able to:

   Suggested fix:
   > With Session Replay, you can:

   📖 Why: Present tense makes documentation feel current

----------------------------------------------------------------------

💡 To fix these in Cursor:
   1. Open the file in Cursor
   2. Press Cmd+L for Cursor Chat
   3. Say: "Fix all style issues following Amplitude guidelines"

✅ Review complete!
```

## What Gets Tested

**Local Testing:**
- ✅ Reviews ALL lines in the file
- ✅ Shows all issues found
- ✅ Good for checking entire documents

**PR Review (Actual):**
- ✅ Reviews ONLY changed lines
- ✅ Posts inline comments with suggestions
- ✅ Can apply fixes with "Commit suggestion" button

## Common Test Scenarios

### Test a New Document

```bash
# Create a test file with intentional issues
cat > test-doc.md << 'EOF'
---
title: Test Document
---

# Test Document

This feature will allow you to configure settings.

Please navigate to the Settings page.

You can access [other docs](../path/to/doc.md).
EOF

# Test it
node test-local.js test-doc.md
```

Expected issues:
- Line 7: Future tense ("will allow")
- Line 9: Uses "please" in instruction
- Line 11: Relative path link (should use `/docs/`)

### Test Only Part of a File

```bash
# Extract specific lines to test
sed -n '20,50p' ../../content/collections/analytics/en/session-replay.md > test-section.md

# Test the section
node test-local.js test-section.md
```

### Test Without API Costs (Mock Mode)

Create `test-mock.js`:

```javascript
const fs = require('fs');

// Mock review function
async function mockReview(content) {
  const issues = [];
  const lines = content.split('\n');
  
  lines.forEach((line, idx) => {
    // Check for future tense
    if (/\bwill\s+(allow|enable|let)/i.test(line)) {
      issues.push({
        line: idx + 1,
        severity: 'warning',
        rule: 'voice-and-tense',
        issue: 'Uses future tense',
        originalText: line,
        correctedText: line.replace(/will\s+/i, ''),
        explanation: 'Present tense makes docs feel current'
      });
    }
    
    // Check for "please"
    if (/\bplease\b/i.test(line)) {
      issues.push({
        line: idx + 1,
        severity: 'info',
        rule: 'direct-instructions',
        issue: 'Uses "please" in instruction',
        originalText: line,
        correctedText: line.replace(/please\s+/i, ''),
        explanation: 'Direct commands are clearer'
      });
    }
  });
  
  return issues;
}

const file = process.argv[2];
const content = fs.readFileSync(file, 'utf8');

mockReview(content).then(issues => {
  console.log(`Found ${issues.length} issues:`);
  issues.forEach((i, idx) => {
    console.log(`\n${idx + 1}. Line ${i.line}: ${i.rule}`);
    console.log(`   ${i.issue}`);
    console.log(`   Fix: ${i.correctedText}`);
  });
});
```

Run with:
```bash
node test-mock.js your-file.md
```

## Troubleshooting

### "OPENAI_API_KEY not set"

**Fix:**
```bash
export OPENAI_API_KEY="sk-..."
```

Make sure you're in the same terminal session where you set the variable.

### "Error calling OpenAI API: 401"

**Fix:**
- Check your API key is correct
- Verify the key isn't expired
- Regenerate key if needed

### "File not found"

**Fix:**
- Use relative path from `.github/scripts/` directory
- Or use absolute path: `/Users/.../amplitude-docs/content/...`

### Test takes too long

**Normal timing:**
- Small file (< 50 lines): 5-10 seconds
- Medium file (50-200 lines): 10-20 seconds
- Large file (> 200 lines): 20-40 seconds

If it takes longer:
- Check your internet connection
- Try a smaller file first
- OpenAI may be experiencing high load

## Testing Workflow

### Before Submitting a PR:

```bash
# 1. Test your changes locally
cd .github/scripts
node test-local.js ../../content/collections/your-area/en/your-file.md

# 2. Fix issues in Cursor
# Open file, press Cmd+L, say: "Fix all style issues"

# 3. Test again to verify
node test-local.js ../../content/collections/your-area/en/your-file.md

# 4. If clean, commit and push
git add .
git commit -m "Update docs with style fixes"
git push
```

### After PR Created:

1. Wait 2-3 minutes for AI review to run
2. Check PR for inline comments
3. Click "Commit suggestion" on any issues
4. Or use Cursor to fix issues in batch

## Cost Tracking

Each test costs approximately:
- Small file: $0.01
- Medium file: $0.02
- Large file: $0.03

Monthly budget for 100 tests: ~$2

Monitor at: https://platform.openai.com/usage

## Questions?

- **Slack:** `#amplitude-docs`
- **Issues:** GitHub repository issues
- **Style guide:** `.cursor/rules/README.md`

