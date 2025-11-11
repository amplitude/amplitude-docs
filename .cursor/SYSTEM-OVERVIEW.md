# Cursor Documentation System - Complete Overview

**Created:** October 31, 2024  
**Purpose:** Scale 2-person tech writing team to support 125+ person organization

---

## 🎯 System Components

### 1. **Cursor Rules & Templates** (`.cursor/rules/`)
AI rules that automatically enforce Amplitude's writing style:

**Style Rules (12 .mdc files):**
- `voice-and-tense.mdc` - Active voice & present tense
- `contractions.mdc` - Contractions for conversational tone
- `person-and-point-of-view.mdc` - Second person point of view
- `direct-instructions.mdc` - Direct instructions (no "please")
- `concise-language.mdc` - Concise language
- `grammar-and-punctuation.mdc` - Grammar & punctuation
- `inclusive-terminology.mdc` - Inclusive terminology
- `technical-writing.mdc` - Technical writing conventions
- `vocabulary.mdc` - Amplitude vocabulary
- `headings-and-structure.mdc` - Headings & structure
- `images-and-accessibility.mdc` - Images & accessibility
- `master-checklist.mdc` - Complete editing checklist

**Templates (3 .mdc files):**
- `new-feature-template.mdc` - Interactive guide for documenting features
- `statamic-routing.mdc` - Ensures correct `/docs/` link format (automatically applied)
- `link-validation.mdc` - Validates internal link formats

**Documentation (2 .md files):**
- `README.md` - Style guide overview
- `TEMPLATES-INDEX.md` - Template catalog

### 2. **AI-Powered PR Reviews** (`.github/`)
Intelligent documentation review on every PR:

**Features:**
- ✅ Context-aware feedback (understands meaning, not just patterns)
- ✅ Inline comments on specific lines with suggestions
- ✅ Before/after examples for every issue
- ✅ Severity levels (errors, warnings, info)
- ✅ Cursor command suggestions for quick fixes
- ✅ Cost-effective (~$6/month for 100 PRs)

**Workflows (`.github/workflows/`):**
- `ai-docs-review.yml` - AI-powered documentation review
- `vale.yml` - Vale linting
- `internal-link-check.yml` - Internal link validation
- `spell-checker.yml` - Spell checking
- `markdown-check.yml` - Markdown syntax validation
- `mega-linter.yml` - Comprehensive linting
- `cron-link-check.yml` - Scheduled link checking
- `auto-assign-reviewer.yml` - Automatic reviewer assignment
- `deploy.yml` - Deployment workflow

**Scripts (`.github/scripts/`):**
- `ai-docs-reviewer.js` - Main AI review logic
- `test-local.js` - Local testing script
- `package.json` - Node.js dependencies
- `package-lock.json` - Dependency lock file
- `README.md` - Script documentation

### 3. **Engineer Documentation** (`.cursor/`)
- `README.md` - Navigation hub and main entry point
- `HOW-TO-CONTRIBUTE.md` - Complete guide for engineers
- `QUICK-START.md` - Fast-track guide for contributors
- `AI-REVIEW-SETUP.md` - Setup guide for AI reviews
- `TESTING-GUIDE.md` - Testing and validation guide
- `SYSTEM-OVERVIEW.md` - This file (complete system documentation)

**Commands (`.cursor/commands/`):**
- `fix-issue.md` - Quick fix commands for common issues

---

## 🚀 How It Works

### For Engineers (Contributors)

1. **Open Cursor** in amplitude-docs repo
2. **Press Cmd+L** to open Cursor Chat
3. **Say:** `"Document new feature: [name]"`
4. **Answer questions** about product area, benefits, workflow
5. **Review generated docs** - properly structured, style-compliant
6. **Submit PR** - AI reviews automatically, Vercel previews
7. **Get feedback** - Inline comments + summary with Cursor commands
8. **Quick fixes** - Use suggested Cursor commands to fix issues
9. **Approved & merged** - Tech writers do final polish

**Time:** 15-30 minutes (vs 3-5 days waiting)

### For Tech Writers (Reviewers)

**Before:**
- Write everything yourself (2-4 docs/week)
- Bottleneck for 125 engineers
- Features ship without docs

**After:**
- Engineers draft with Cursor templates
- AI enforces style automatically
- You review for accuracy & polish (30-60 min)
- 5x throughput with same quality

---

## 📊 Expected Impact

### Throughput
- **Before:** 2-4 docs/week by 2 writers
- **After:** 10-20 docs/week (5x increase)
- **Method:** Engineer contributions + writer polish + AI enforcement

### Coverage
- **Before:** Features often ship without docs
- **After:** 100% feature documentation on launch day
- **Method:** Engineers document as they build

### Quality
- **Before:** High (maintained by writers)
- **After:** Same or better (maintained by AI + review)
- **Method:** Cursor enforcement + AI reviews + writer polish

### Time Savings
- **Engineer:** Draft in 15-30 min (vs weeks waiting)
- **Writer:** Review in 30-60 min (vs 2-4 hours writing)
- **Organization:** Ship docs with features, not after

### Cost
- **AI Review:** ~$6/month for 100 PRs
- **Time saved:** 30+ hours/month of writer time
- **ROI:** 300x+

---

## 🎨 Key Advantages

### vs Vale (Regex Linting)
| Feature | Vale | AI Review |
|---------|------|-----------|
| Context awareness | ❌ | ✅ |
| Explanations | ❌ | ✅ |
| False positives | ⚠️ Many | ✅ Few |
| Suggestions | ❌ | ✅ Before/after |
| Link validation | ❌ | ✅ Understands routes |
| Code examples | ❌ Often flags | ✅ Understands context |

### vs Manual Review Only
- **Speed:** Instant feedback vs 1-2 day wait
- **Consistency:** Always applies same standards
- **Availability:** 24/7, never busy
- **Learning:** Explains why, not just what

### vs No System
- **Enablement:** Engineers can contribute
- **Quality:** Enforced standards
- **Scale:** 2 writers → 125 contributors
- **Coverage:** 100% vs 30-40%

---

## 📁 Complete File Structure

```
amplitude-docs/
├── README.md (updated with Cursor info)
│
├── .cursor/
│   ├── README.md (navigation hub)
│   ├── QUICK-START.md (fast-track guide)
│   ├── HOW-TO-CONTRIBUTE.md (complete engineer guide)
│   ├── AI-REVIEW-SETUP.md (AI review setup)
│   ├── TESTING-GUIDE.md (testing and validation)
│   ├── SYSTEM-OVERVIEW.md (this file)
│   │
│   ├── commands/
│   │   └── fix-issue.md (quick fix commands)
│   │
│   └── rules/
│       ├── README.md (style guide overview)
│       ├── TEMPLATES-INDEX.md (template catalog)
│       │
│       ├── Style Rules (12 .mdc files)
│       │   ├── voice-and-tense.mdc
│       │   ├── contractions.mdc
│       │   ├── concise-language.mdc
│       │   ├── direct-instructions.mdc
│       │   ├── person-and-point-of-view.mdc
│       │   ├── headings-and-structure.mdc
│       │   ├── grammar-and-punctuation.mdc
│       │   ├── images-and-accessibility.mdc
│       │   ├── inclusive-terminology.mdc
│       │   ├── technical-writing.mdc
│       │   ├── vocabulary.mdc
│       │   └── master-checklist.mdc
│       │
│       └── Templates (3 .mdc files)
│           ├── new-feature-template.mdc
│           ├── statamic-routing.mdc
│           └── link-validation.mdc
│
└── .github/
    ├── workflows/ (9 workflow files)
    │   ├── ai-docs-review.yml (AI-powered reviews)
    │   ├── vale.yml (Vale linting)
    │   ├── internal-link-check.yml (link validation)
    │   ├── spell-checker.yml (spell checking)
    │   ├── markdown-check.yml (markdown syntax)
    │   ├── mega-linter.yml (comprehensive linting)
    │   ├── cron-link-check.yml (scheduled checks)
    │   ├── auto-assign-reviewer.yml (auto-assignment)
    │   └── deploy.yml (deployment)
    │
    └── scripts/
        ├── ai-docs-reviewer.js (AI review logic)
        ├── test-local.js (local testing)
        ├── package.json (dependencies)
        ├── package-lock.json (dependency lock)
        └── README.md (script documentation)
```

---

## 🎓 Getting Started

### For Engineers
1. **Quick start:** Read [`.cursor/QUICK-START.md`](QUICK-START.md)
2. **Complete guide:** Read [`.cursor/HOW-TO-CONTRIBUTE.md`](HOW-TO-CONTRIBUTE.md)
3. Try: `"Document new feature: Test Feature"`
4. Submit PR and see AI feedback
5. Use [`.cursor/commands/fix-issue.md`](commands/fix-issue.md) for quick fixes

### For Tech Writers
1. Read [`.cursor/AI-REVIEW-SETUP.md`](AI-REVIEW-SETUP.md)
2. Add OpenAI API key to GitHub secrets
3. Test with [`.github/scripts/test-local.js`](../.github/scripts/test-local.js)
4. Monitor costs and quality
5. Review [`.cursor/TESTING-GUIDE.md`](TESTING-GUIDE.md) for validation

### For Leadership
- **This file** for system overview
- **Track metrics** (PRs, contributors, time saved)
- **Report monthly** on adoption and ROI

---

## 🔧 Configuration

### AI Review Settings

**Model Selection:**
```javascript
// In .github/scripts/ai-docs-reviewer.js
model: 'gpt-4o',  // Options: gpt-4o, gpt-4-turbo, gpt-3.5-turbo
```

**Cost Control:**
- gpt-4o: ~$0.02/file (best quality)
- gpt-4-turbo: ~$0.01/file (good quality)
- gpt-3.5-turbo: ~$0.001/file (fast, cheaper)

**When to Run:**
```yaml
# In .github/workflows/ai-docs-review.yml
on:
  pull_request:
    paths:
      - 'content/collections/**/*.md'
    types: [opened, synchronize]
```

### Cursor Rule Customization

Add new rules in `.cursor/rules/` as `.mdc` files:
- Follow existing format (see `voice-and-tense.mdc` as example)
- Use `.mdc` extension (Markdown Cursor format)
- Add descriptive title and description at the top
- Rules are automatically applied when relevant to conversation
- Templates (like `new-feature-template.mdc`) are invoked on-demand
- Update `TEMPLATES-INDEX.md` when adding new templates

---

## 📈 Metrics to Track

### Weekly
- Docs authored by engineers (target: 50%+)
- Docs published (target: 5x baseline)
- Vale/AI violations per PR (target: <3)
- PR review time (target: <1 hour)

### Monthly
- Engineer adoption rate (target: 20+ contributors)
- Feature documentation coverage (target: 100%)
- Support tickets re: docs confusion (target: –50%)
- Time saved (hours) (target: 30+/month)

### Quarterly
- Engineer satisfaction (target: 4+/5)
- Documentation quality score
- Cost per doc (target: <$0.50)
- Repeat contributors (target: 50%+)

---

## 🎉 Success Stories (Template)

Document wins as they happen:

**Example:**
> "Engineer [name] documented [feature] in 20 minutes using Cursor templates. AI review caught 3 style issues automatically. Tech writer polished in 15 minutes. Total time: 35 min vs previous 3-4 days. Feature shipped with docs on day one."

---

## 🔮 Future Enhancements

### Short Term (Next 3 months)
- [ ] Autofix mode (AI generates PR with fixes)
- [ ] Slack integration for notifications
- [ ] Weekly metrics dashboard
- [ ] Video tutorial for engineers

### Medium Term (3-6 months)
- [ ] API/SDK docs templates
- [ ] Release notes generator
- [ ] Documentation coverage dashboard
- [ ] Learning from feedback (improve AI prompts)

### Long Term (6+ months)
- [ ] Multi-language support
- [ ] Autogenerated API docs from OpenAPI
- [ ] Interactive examples
- [ ] Docs-as-code validation in CI/CD

---

## 🤝 Support

### Questions
- **Slack:** `#amplitude-docs`
- **Tech Writers:** `@tech-writers`
- **GitHub:** Open an issue

### Resources
- **Navigation Hub:** `.cursor/README.md`
- **Quick Start:** `.cursor/QUICK-START.md`
- **Contributing Guide:** `.cursor/HOW-TO-CONTRIBUTE.md`
- **Style Guide:** `.cursor/rules/README.md`
- **Templates:** `.cursor/rules/TEMPLATES-INDEX.md`
- **AI Setup:** `.cursor/AI-REVIEW-SETUP.md`
- **Testing:** `.cursor/TESTING-GUIDE.md`
- **Quick Fixes:** `.cursor/commands/fix-issue.md`
- **Script Docs:** `.github/scripts/README.md`

---

## 🏆 Success Criteria

**Short Term (1-3 months):**
- ✅ 5+ engineers contribute docs successfully
- ✅ Zero increase in Vale violations
- ✅ 50% reduction in time-to-docs
- ✅ 4+/5 engineer satisfaction score

**Medium Term (3-6 months):**
- ✅ 20+ engineers have contributed
- ✅ 3x increase in docs published
- ✅ 80% of features ship with docs
- ✅ No increase in support tickets

**Long Term (6-12 months):**
- ✅ 50+ engineers familiar with system
- ✅ 5x increase in docs output
- ✅ 100% feature documentation coverage
- ✅ Sustainable, scalable process

---

**System Status:** ✅ Fully operational and actively in use!

**Last Updated:** November 11, 2025  
**File Count:**
- 17 rule/template files (`.cursor/rules/`)
- 6 documentation files (`.cursor/`)
- 9 GitHub workflow files (`.github/workflows/`)
- 5 script files (`.github/scripts/`)

