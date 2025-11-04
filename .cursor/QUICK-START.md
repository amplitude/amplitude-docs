# Quick Start: AI Documentation Review

**Time to setup:** 10 minutes  
**Monthly cost:** ~$6 for typical usage

---

## ✅ Setup Checklist

### Step 1: Get OpenAI API Key (3 minutes)

1. Go to https://platform.openai.com/
2. Sign up or log in
3. Go to https://platform.openai.com/api-keys
4. Click **"Create new secret key"**
5. Name it: `amplitude-docs-reviewer`
6. **Copy the key** (starts with `sk-...`)
7. Add payment method + set $10/month limit

### Step 2: Add Secret to GitHub (2 minutes)

1. Go to https://github.com/amplitude/amplitude-docs
2. **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Name: `OPENAI_API_KEY`
5. Value: Paste your OpenAI key
6. Click **"Add secret"**

### Step 3: Commit the Files (2 minutes)

```bash
cd /path/to/amplitude-docs

# Check what's new
git status

# Add all new files
git add .cursor/AI-REVIEW-SETUP.md
git add .cursor/SYSTEM-OVERVIEW.md
git add .cursor/QUICK-START.md
git add .cursor/README.md
git add .github/workflows/ai-docs-review.yml
git add .github/scripts/

# Commit
git commit -m "Add AI-powered documentation review system

- Adds intelligent PR reviews with inline comments
- Context-aware feedback using OpenAI GPT-4
- Replaces regex-based linting with AI analysis
- Provides before/after examples and Cursor commands
- Cost: ~$6/month for typical usage"

# Push to main (or create PR)
git push origin DOC-974
```

### Step 4: Test It (3 minutes)

1. Create test branch:
   ```bash
   git checkout -b test-ai-review
   ```

2. Edit any docs file with intentional issues:
   ```bash
   # Open any file in content/collections/
   # Add violations:
   # - "will allow" (future tense)
   # - "please click" (please in instructions)
   # - "../other-doc.md" (relative link)
   ```

3. Commit and push:
   ```bash
   git add .
   git commit -m "Test AI review"
   git push origin test-ai-review
   ```

4. Open PR on GitHub

5. Wait 2-3 minutes and check:
   - ✅ Inline comments on specific lines
   - ✅ Summary comment with overview
   - ✅ Cursor fix suggestions

---

## 🎯 What You Should See

### Inline Comment with Suggestion Button:
```
🟡 voice-and-tense

Uses future tense "will allow users to"

Suggested change:
┌─────────────────────────────────────┐
│ This feature allows users to...    │  [Commit suggestion]
└─────────────────────────────────────┘

Why this matters: Present tense makes documentation feel 
current and actionable.

💡 Tip: Click "Commit suggestion" above to apply this fix

🤖 AI-powered review
```

**The "Commit suggestion" button lets you apply fixes with one click!**

### Summary Comment Example:
```
🤖 AI Documentation Review

Reviewed 1 file and found 3 suggestions in 1 file.

Files Reviewed
🟡 content/collections/analytics/en/test.md - 3 issues

Issue Breakdown
🟡 2 important issues
ℹ️ 1 minor suggestion

💬 Check inline comments above for specific suggestions

---

💡 Quick Fixes with Cursor
1. Open the file in Cursor
2. Press Cmd+L for Cursor Chat
3. Say: "Fix all style issues following Amplitude guidelines"
```

---

## 🎉 You're Done!

The system is now active and will:
- ✅ Review every PR with doc changes
- ✅ Post inline comments with suggestions
- ✅ Provide Cursor commands for quick fixes
- ✅ Learn from your style rules automatically

---

## 📊 Monitor Usage

**Check costs weekly:**
1. Go to https://platform.openai.com/usage
2. View daily API usage
3. Should see ~$0.05-0.15/day

**Expected costs:**
- 1 PR with 3 files: ~$0.06
- 5 PRs/day × 22 days: ~$6/month

---

## 🔧 Adjust if Needed

### Too Expensive?

**Use cheaper model:**
```javascript
// Edit .github/scripts/ai-docs-reviewer.js line ~150
model: 'gpt-3.5-turbo',  // Was: gpt-4o (10x cheaper)
```

### Too Many Comments?

**Increase severity threshold:**
```javascript
// In ai-docs-reviewer.js, filter issues:
const issues = (await reviewWithAI(...))
  .filter(i => i.severity !== 'info');  // Only errors & warnings
```

### Want to Pause?

**Disable workflow:**
```bash
# Rename to disable
mv .github/workflows/ai-docs-review.yml \
   .github/workflows/ai-docs-review.yml.disabled
```

---

## 🆘 Troubleshooting

### Issue: No API key error
**Fix:** Check secret name is exactly `OPENAI_API_KEY`

### Issue: Workflow doesn't run
**Fix:** Files must be in main branch first

### Issue: No inline comments
**Fix:** Wait 2-3 min, check Actions tab for errors

### Issue: Rate limit error
**Fix:** Wait 5 minutes, re-run workflow

---

## 📚 Learn More

- **Full setup guide:** [AI-REVIEW-SETUP.md](AI-REVIEW-SETUP.md)
- **System overview:** [SYSTEM-OVERVIEW.md](SYSTEM-OVERVIEW.md)
- **Contributing guide:** [HOW-TO-CONTRIBUTE.md](HOW-TO-CONTRIBUTE.md)

---

## 💬 Questions?

Ask in `#amplitude-docs` Slack channel!

**Next:** Share in engineering all-hands to encourage adoption! 🚀

