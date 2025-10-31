---
description: Use second person and avoid first person in documentation
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Person and Point of View

Write in second person to directly address readers. Minimize first-person usage.

## Use Second Person ("You")

Address the reader directly using "you" and "your."

**Examples:**
- ✅ "You can configure your API settings in the dashboard."
- ✅ "Your organization has access to these features."
- ✅ "When you create a new project, Amplitude generates a unique ID."

## Avoid First Person Plural ("We")

Don't use "we," "our," or "us" unless specifically referring to collaborative actions or the Amplitude team in appropriate contexts.

**Examples:**
- ❌ "We recommend using the latest SDK version."
- ✅ "Use the latest SDK version." or "Amplitude recommends using the latest SDK version."
- ❌ "Let's configure the API endpoint."
- ✅ "Configure the API endpoint."
- ❌ "In our example, we'll use React."
- ✅ "This example uses React."

## Avoid First Person Singular ("I")

Never use "I," "me," "my," or "mine" in documentation.

**Examples:**
- ❌ "I'll show you how to configure..."
- ✅ "This guide shows how to configure..."
- ❌ "In my experience, this approach works best."
- ✅ "This approach works best for most use cases."

## Product and Company References

When referring to Amplitude as a product or company:

- Use "Amplitude" as the subject: "Amplitude provides..."
- Use passive constructions sparingly: "The data is processed by Amplitude's servers."
- Focus on what users do: "You send events to Amplitude."

## Examples

**Before:**
```
We've designed this feature to help you analyze user behavior. 
Let's start by configuring your tracking plan. I'll walk you 
through the process, and we'll set up your first event together.
```

**After:**
```
This feature helps you analyze user behavior. Start by configuring 
your tracking plan. This guide walks you through the process and 
shows you how to set up your first event.
```

