# AI Documentation Reviewer

This directory contains the AI-powered documentation review system that provides intelligent, context-aware feedback on documentation changes.

## Files

- **`ai-docs-reviewer.js`** - Main script that reviews documentation using OpenAI
- **`package.json`** - Node.js dependencies

## How It Works

1. **Triggered on PRs** - Runs automatically when documentation files change
2. **Loads Style Rules** - Reads all Cursor rules from `.cursor/rules/`
3. **AI Review** - Sends documentation + rules to OpenAI for analysis
4. **Inline Comments** - Posts specific suggestions on exact lines in the PR
5. **Summary Comment** - Provides overview with quick fix tips

## Features

- ✅ **Context-aware** - Understands meaning, not just patterns
- ✅ **Changed lines only** - Reviews only modified content in PRs
- ✅ **GitHub suggestions** - One-click "Commit suggestion" buttons
- ✅ **Inline comments** - Comments on specific lines with exact fixes
- ✅ **Actionable feedback** - Provides exact corrected text
- ✅ **Cursor integration** - Suggests Cursor commands to fix issues
- ✅ **Prioritized** - Groups by severity (errors, warnings, info)
- ✅ **No duplicate comments** - Skips comments already posted on previous runs
- ✅ **Smart summary updates** - Updates existing summary instead of posting duplicates

## Setup

### 1. Add OpenAI API Key

Go to your GitHub repository:
1. Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `OPENAI_API_KEY`
4. Value: Your OpenAI API key (starts with `sk-`)

Get an API key at: https://platform.openai.com/api-keys

### 2. Install Dependencies

Dependencies are installed automatically by the GitHub Action, but to test locally:

```bash
cd .github/scripts
npm install
```

### 3. Test Locally

Test a file before creating a PR:

```bash
# Set your API key
export OPENAI_API_KEY="sk-..."

# Run the test script
node test-local.js ../../content/collections/data/en/destination-event-streaming-overview.md
```

The test script will:
- Load all style rules
- Review the entire file
- Show issues grouped by severity
- Display current text and suggested fixes
- Provide Cursor commands to fix issues

**Note:** Local testing reviews ALL lines. In a real PR, only changed lines are reviewed.

**💡 Tip:** You don't need GitHub environment variables (`GITHUB_TOKEN`, `GITHUB_REPOSITORY`, etc.) for local testing. The script automatically detects local mode.

## Cost Estimate

**OpenAI GPT-4o Pricing:**
- Input: $2.50 per 1M tokens
- Output: $10.00 per 1M tokens

**Per PR:**
- ~3,000 tokens input (rules + content)
- ~500 tokens output (review)
- Cost: ~$0.01-0.02 per file

**Monthly estimate:**
- 100 PRs/month × 3 files/PR × $0.02 = ~$6/month
- Compare to: 30+ hours of human review time saved

## Customization

### Change AI Model

Edit `ai-docs-reviewer.js` line ~150:

```javascript
model: 'gpt-4o',  // Options: gpt-4o, gpt-4-turbo, gpt-3.5-turbo
```

For Claude (Anthropic), you'd need to:
1. Change API endpoint
2. Update request format
3. Add `ANTHROPIC_API_KEY` secret

### Adjust Severity Levels

Edit the prompt in `reviewWithAI()` to change what's considered error vs warning.

### Add More Rules

Rules are automatically loaded from `.cursor/rules/`. Just add new rule files there.

## Troubleshooting

### "No line mapping available"
- The file wasn't actually changed in the diff
- File was renamed (not supported yet)

### "OpenAI API error: 429"
- Rate limit hit
- Add delays between files (already implemented)

### Comments not appearing
- Check GitHub token permissions
- Verify PR number is correct
- Check that lines are in the actual diff

### Duplicate comments on multiple pushes
✅ **Fixed!** The script now:
- Checks existing comments before posting
- Skips duplicates based on file + line + rule
- Updates the summary comment instead of creating new ones
- Logs how many duplicates were skipped

### High costs
- Reduce files per PR
- Use gpt-3.5-turbo instead of gpt-4o
- Cache style rules (TODO)

## Future Enhancements

- [ ] Cache style rules to reduce token usage
- [ ] Batch multiple files in one API call
- [ ] Support for Claude/Anthropic
- [ ] Auto-fix mode (generate PR with fixes)
- [ ] Confidence scores for suggestions
- [ ] Learning from accepted/rejected suggestions
- [ ] Slack notifications
- [ ] Web dashboard for metrics

## Contributing

To improve the AI reviewer:

1. Edit the system prompt for better accuracy
2. Add more style rules to `.cursor/rules/`
3. Adjust token limits for cost optimization
4. Add support for other AI providers

## Questions?

Ask in `#amplitude-docs` Slack channel!

