# AI Documentation Review - Setup Guide

This guide helps you set up the AI-powered documentation review system.

## What You Get

✅ **Intelligent feedback** - AI understands context and meaning  
✅ **Inline comments** - Suggestions appear on specific lines in PRs  
✅ **Cursor integration** - Links to Cursor commands for quick fixes  
✅ **Auto-enforcement** - Style rules applied automatically  
✅ **Cost-effective** - ~$6/month for 100 PRs  

## Prerequisites

- OpenAI API account (free tier works for testing)
- GitHub repository admin access
- Node.js 18+ (handled by GitHub Actions)

## Setup Steps

### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/
2. Sign up or log in
3. Navigate to https://platform.openai.com/api-keys
4. Click **"Create new secret key"**
5. Name it: `amplitude-docs-reviewer`
6. **Copy the key** (starts with `sk-...`) - you won't see it again!

**Billing Setup:**
- Add payment method (required even for testing)
- Set spending limit: $10/month is more than enough
- First $5 is free (for new accounts)

### 2. Add Secret to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `OPENAI_API_KEY`
5. Value: Paste your OpenAI key
6. Click **"Add secret"**

### 3. Enable the Workflow

The workflow is already created at `.github/workflows/ai-docs-review.yml`

It will automatically run when:
- Someone opens a PR with documentation changes
- Documentation files are updated in an existing PR

### 4. Test It

**Create a test PR:**

1. Create a new branch:
   ```bash
   git checkout -b test-ai-review
   ```

2. Make a documentation change with intentional style issues:
   ```bash
   # Edit any file in content/collections/
   # Add some violations:
   # - Use "will" (future tense)
   # - Use "please click" (please in instructions)
   # - Use "../" in a link (should be /docs/)
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Test AI review"
   git push origin test-ai-review
   ```

4. Open a PR on GitHub

5. Wait 2-3 minutes, then check:
   - ✅ Inline comments on specific lines
   - ✅ Summary comment with overview
   - ✅ Cursor command suggestions

### 5. Review Results

You should see:

**Inline Comments:**
```
🔴 voice-and-tense

Uses future tense "will allow"

💡 Suggestion: Change to "allows" for present tense

Why this matters: Present tense makes documentation feel current and actionable
```

**Summary Comment:**
```
🤖 AI Documentation Review

Reviewed 1 file and found 3 suggestions.

Files Reviewed:
🟡 content/collections/analytics/en/test.md - 3 issues

💡 Quick Fixes with Cursor
1. Open the file in Cursor
2. Press Cmd+L
3. Say: "Fix all style issues following Amplitude guidelines"
```

## Configuration

### Adjust AI Model

Edit `.github/scripts/ai-docs-reviewer.js` line ~150:

```javascript
model: 'gpt-4o',  // Change to: gpt-4-turbo, gpt-3.5-turbo
```

**Recommendations:**
- `gpt-4o` - Best quality, most expensive (~$0.02/file)
- `gpt-4-turbo` - Good quality, cheaper (~$0.01/file)
- `gpt-3.5-turbo` - Fastest, cheapest, lower quality (~$0.001/file)

### Control When It Runs

Edit `.github/workflows/ai-docs-review.yml`:

```yaml
on:
  pull_request:
    paths:
      - 'content/collections/**/*.md'
    types: [opened, synchronize]  # Add/remove: ready_for_review, etc.
```

### Disable for Specific Files

Add to `.github/workflows/ai-docs-review.yml`:

```yaml
      - name: Get changed documentation files
        id: changed-files
        uses: tj-actions/changed-files@v41
        with:
          files: |
            content/collections/**/*.md
          files_ignore: |
            content/collections/internal/**  # Skip internal docs
            **/*-draft.md  # Skip drafts
```

## Cost Management

### Monitor Usage

1. Go to https://platform.openai.com/usage
2. View daily/monthly costs
3. Set up email alerts

### Reduce Costs

**Option 1: Use cheaper model**
```javascript
model: 'gpt-3.5-turbo'  // 10x cheaper
```

**Option 2: Review fewer files**
```yaml
- name: Limit files
  run: |
    # Only review first 5 files
    echo "${{ steps.changed-files.outputs.all_changed_files }}" | \
      head -n 5 > files-to-review.txt
```

**Option 3: Skip for small PRs**
```yaml
- name: Count changes
  run: |
    if [ ${{ steps.changed-files.outputs.all_changed_files_count }} -lt 2 ]; then
      echo "Small PR, skipping AI review"
      exit 0
    fi
```

### Set Spending Limit

In OpenAI dashboard:
1. Settings → Limits
2. Set hard limit: $10/month
3. Set soft limit: $5/month (gets email alert)

## Troubleshooting

### Issue: Workflow doesn't run

**Check:**
- PR has documentation changes (`content/collections/**/*.md`)
- Workflow file is on the base branch (merge to main first)
- Actions are enabled (Settings → Actions → Allow all actions)

### Issue: "OpenAI API error: 401"

**Solution:**
- Verify API key is correct
- Check key wasn't revoked
- Regenerate key if needed

### Issue: "Rate limit exceeded"

**Solution:**
- Wait a few minutes and re-run
- Upgrade to paid tier (very cheap)
- Add more delay between files

### Issue: No inline comments

**Possible causes:**
1. Lines weren't actually changed in the diff
2. File was renamed (not supported)
3. GitHub token lacks permissions

**Fix:**
- Check GitHub Actions logs for errors
- Verify the file shows a diff in the PR

### Issue: Too expensive

**Solution:**
```javascript
// Switch to cheaper model
model: 'gpt-3.5-turbo',  // Was: gpt-4o

// Or reduce rules sent (in loadStyleRules)
content: content.substring(0, 1000)  // Was: 2000
```

## Advanced Usage

### Run Locally

```bash
cd .github/scripts
npm install

export OPENAI_API_KEY="sk-..."
export GITHUB_TOKEN="ghp_..."
export PR_NUMBER="123"
export GITHUB_REPOSITORY="amplitude/amplitude-docs"
export COMMIT_SHA="$(git rev-parse HEAD)"
export BASE_SHA="$(git rev-parse origin/main)"

node ai-docs-reviewer.js
```

### Test Without API Costs

Use a mock response:

```javascript
// In ai-docs-reviewer.js, replace reviewWithAI():
async function reviewWithAI(fileContent, fileName, styleRules) {
  return [
    {
      line: 5,
      severity: "warning",
      rule: "voice-and-tense",
      issue: "Uses future tense",
      suggestion: "Change 'will allow' to 'allows'",
      explanation: "Present tense makes docs feel current"
    }
  ];
}
```

### Add More AI Providers

To use Claude (Anthropic):

1. Get API key from https://console.anthropic.com/
2. Add `ANTHROPIC_API_KEY` secret
3. Update the API call in `ai-docs-reviewer.js`:

```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01'
  },
  body: JSON.stringify({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      { role: 'user', content: systemPrompt + '\n\n' + userPrompt }
    ]
  })
});
```

## Success Metrics

Track these to measure impact:

- **PR review time** - Should decrease by 30-50%
- **Style violations** - Should decrease over time
- **Engineer satisfaction** - Survey after 1 month
- **Docs quality** - Fewer support tickets about confusing docs

## Questions?

- **Slack:** `#amplitude-docs`
- **GitHub Issues:** For bugs or feature requests
- **This file:** Update with your learnings!

---

**Ready to go!** 🚀 The AI reviewer will now help maintain documentation quality at scale.

