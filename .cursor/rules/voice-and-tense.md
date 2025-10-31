---
description: Use active voice and present tense in documentation
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Voice and Tense Guidelines

## Active Voice
Use active voice to make documentation clear and direct. Active voice emphasizes who performs the action.

**Examples:**
- ❌ Passive: "The configuration is created by the system."
- ✅ Active: "The system creates the configuration."
- ❌ Passive: "Events are sent to the API endpoint."
- ✅ Active: "Send events to the API endpoint."

## Present Tense
Use present tense to describe current functionality. Avoid future tense constructions.

**Avoid these future tense patterns:**
- "will" → Use present tense instead
- "would be" → Use "is" or imperative form
- "we are going to" → Use present tense

**Examples:**
- ❌ Future: "This feature will allow you to configure settings."
- ✅ Present: "This feature lets you configure settings."
- ❌ Future: "The API will return a response."
- ✅ Present: "The API returns a response."

## Implementation Tips
- Start instructions with imperative verbs (Configure, Create, Navigate, Use)
- Describe what the product does, not what it will do
- When referring to user actions, use second person ("you") with present or imperative forms

