# Cursor Documentation System

This directory contains Cursor AI rules and templates that help you create high-quality Amplitude documentation.

## 📚 Quick Links

### For Engineers and Contributors
👉 **[HOW-TO-CONTRIBUTE.md](HOW-TO-CONTRIBUTE.md)** - Start here to learn how to document features using Cursor AI

### For Tech Writers
👉 **[QUICK-START.md](QUICK-START.md)** - 10-minute setup checklist  
👉 **[AI-REVIEW-SETUP.md](AI-REVIEW-SETUP.md)** - Complete setup guide for AI reviews  
👉 **[TESTING-GUIDE.md](TESTING-GUIDE.md)** - Test AI reviews locally  
👉 **[SYSTEM-OVERVIEW.md](SYSTEM-OVERVIEW.md)** - Full system documentation

### For Style and Templates
👉 **[rules/README.md](rules/README.md)** - Complete style guide and rule reference  
👉 **[rules/TEMPLATES-INDEX.md](rules/TEMPLATES-INDEX.md)** - Available templates and workflows

---

## What's in This Directory

### Documentation Guides
- **HOW-TO-CONTRIBUTE.md** - Quick start guide for engineers documenting features
- **IMPLEMENTATION-SUMMARY.md** - System overview, metrics, and implementation plan

### Rules Directory (`rules/`)
Contains all Cursor rules that enforce Amplitude's documentation standards:

#### Style Rules (Auto-Applied)
- Active voice and present tense
- Contractions for conversational tone
- Second person point of view
- Concise language
- Direct instructions
- Proper grammar and punctuation
- Inclusive terminology
- Technical writing conventions
- Amplitude vocabulary

#### Templates (Invoke on Demand)
- **new-feature-template.md** - Guides feature documentation creation
- **link-validation.md** - Validates internal link formats
- **statamic-routing.md** - Ensures correct web routes for links (auto-applied)

---

## How to Use

### First Time Contributing?

1. Read **[HOW-TO-CONTRIBUTE.md](HOW-TO-CONTRIBUTE.md)**
2. Open Cursor Chat (Cmd+L)
3. Say: `"Document new feature: [your feature name]"`
4. Follow Cursor's guidance

### Need Help?

- **Questions:** Ask in `#amplitude-docs` Slack
- **Style reference:** See `rules/README.md`
- **Template list:** See `rules/TEMPLATES-INDEX.md`
- **Tech writers:** Tag `@tech-writers` in your PR

---

## System Overview

This Cursor system enables engineers to document features with AI assistance while automatically enforcing Amplitude's writing style:

✅ **Auto-enforced style** - Active voice, contractions, present tense  
✅ **Smart templates** - Guided documentation creation  
✅ **Correct links** - Automatic web route formatting  
✅ **AI-powered reviews** - Intelligent feedback on every PR  
✅ **Quality assurance** - Context-aware linting + tech writer review  

**Result:** Ship docs with features, not weeks later.

### 🤖 NEW: AI Documentation Review

PRs now get intelligent, context-aware feedback:
- **Inline comments** on specific lines with suggestions
- **Before/after examples** for every issue
- **Severity levels** (errors, warnings, info)
- **Cursor commands** to fix issues quickly

See [AI-REVIEW-SETUP.md](AI-REVIEW-SETUP.md) for setup.

---

## File Organization

```
.cursor/
├── README.md (this file)
├── HOW-TO-CONTRIBUTE.md (engineer guide)
├── IMPLEMENTATION-SUMMARY.md (tech writer guide)
│
└── rules/
    ├── README.md (style guide overview)
    ├── TEMPLATES-INDEX.md (template reference)
    │
    ├── Style Rules (11 files)
    │   ├── voice-and-tense.md
    │   ├── contractions.md
    │   ├── concise-language.md
    │   ├── direct-instructions.md
    │   ├── person-and-point-of-view.md
    │   ├── headings-and-structure.md
    │   ├── grammar-and-punctuation.md
    │   ├── images-and-accessibility.md
    │   ├── inclusive-terminology.md
    │   ├── technical-writing.md
    │   └── amplitude-vocabulary.md
    │
    └── Templates (3 files)
        ├── statamic-routing.md
        ├── new-feature-template.md
        └── link-validation.md
```

---

## Questions?

Drop a message in `#amplitude-docs` Slack channel anytime! 🎉

