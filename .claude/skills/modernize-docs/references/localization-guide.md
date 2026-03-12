# Localization optimization guide

Patterns that make technical documentation easier to translate accurately into other languages and locales.

## Table of contents

1. [Sentence structure](#sentence-structure)
2. [Vocabulary and word choice](#vocabulary-and-word-choice)
3. [Cultural and regional references](#cultural-and-regional-references)
4. [Formatting for translation](#formatting-for-translation)

---

## Sentence structure

### Keep sentences short and simple

Long, complex sentences with multiple clauses are harder to translate accurately. Target under 25 words per sentence.

**Before**: "If you have configured your API key in the settings file, and the endpoint is properly formatted, and you have the correct permissions, the request will succeed."

**After**: "Configure your API key in the settings file. Ensure the endpoint is properly formatted and you have the correct permissions. The request then succeeds."

---

### Avoid dangling modifiers and ambiguous antecedents

Modifying phrases and pronouns must have a clear, unambiguous referent.

**Before**: "After configuring the SDK, events are sent automatically." (Who configures? What sends?)

**After**: "After you configure the SDK, Amplitude sends events automatically."

**Before**: "When you enable this, it changes the behavior." (What is "this"? What is "it"?)

**After**: "When you enable real-time processing, Amplitude changes how it batches events."

---

### Use one idea per sentence

Compound sentences joined with "and" or "but" are often split into two separate sentences in translation, sometimes losing the logical relationship.

**Before**: "Configure the endpoint and make sure you have the correct API key."

**After**: "Configure the endpoint. You also need the correct API key."

---

### Avoid gerund-heavy openings

Gerund phrases at the start of sentences are frequently mistranslated.

**Before**: "Configuring the API endpoint requires setting up credentials first."

**After**: "To configure the API endpoint, set up credentials first."

---

## Vocabulary and word choice

### Avoid idioms and colloquialisms

Idiomatic expressions often have no direct translation.

| Avoid | Use instead |
|---|---|
| "out of the box" | "by default" |
| "under the hood" | "internally" or "in the background" |
| "on the fly" | "dynamically" or "in real time" |
| "spin up" | "start" or "create" |
| "hit the ground running" | "get started quickly" |
| "kick off" | "start" or "begin" |
| "long story short" | Remove — state the point directly |
| "ballpark" | "approximate" or "estimated" |

---

### Avoid culturally specific metaphors

**Before**: "This feature is the secret sauce that makes Amplitude powerful."

**After**: "This feature is central to how Amplitude analyzes user behavior."

---

### Use precise, consistent terminology

Translation tools and human translators rely on consistency. One concept = one term, used the same way every time.

- Pick one term and use it throughout: "event properties" not "event attributes," "event data," or "event metadata" interchangeably.
- Don't use synonyms for variety. Variety helps human reading but hurts translation accuracy.

---

### Avoid phrasal verbs when a single verb exists

Phrasal verbs (two-word verbs) often translate poorly.

| Avoid | Use instead |
|---|---|
| "set up" | "configure" (as a verb) |
| "turn on" | "enable" |
| "turn off" | "disable" |
| "log in" | "sign in" (or use consistently; pick one) |
| "pop up" | "appears" or "opens" |
| "kick off" | "start" |
| "pull in" | "retrieve" or "import" |

**Exception**: Use "sign in" and "sign out" as the Amplitude standard (not "log in/out").

---

### Avoid negation chains

Multiple negatives are hard to translate accurately.

**Before**: "You can't not configure this unless you don't need the feature."

**After**: "Configure this only if you need the feature."

---

## Cultural and regional references

### Avoid locale-specific examples

- Don't use US-centric date formats (12/31/2024). Use ISO 8601 (2024-12-31) or spell out the month.
- Don't use dollar amounts as examples without context. Use a generic number or make the currency explicit.
- Don't use US-centric phone number formats or zip code examples.

---

### Avoid cultural humor and sarcasm

Humor doesn't translate. Sarcasm actively misleads.

**Before**: "Congratulations—you've just created your third duplicate event. Again."

**After**: "Duplicate events can affect your data accuracy. Review your tracking plan to avoid duplicates."

---

## Formatting for translation

### Don't embed translatable text in code blocks

Translators skip code blocks. If your code block contains UI strings or user-facing labels, they won't be translated.

**Before**:
```js
amplitude.track('User signed up', { plan: 'Free trial' });
```

If "Free trial" is a user-facing value that varies by locale, call it out in prose: "Replace `'Free trial'` with your plan name."

---

### Keep formatting markup out of mid-sentence

Bold, italics, and backtick formatting that splits a sentence creates translation segments that don't make sense on their own.

**Before**: "Select the **Save** button to **save your changes** to the project."

**After**: "Select **Save** to save your changes."

---

### Use consistent parallel structure in lists

Translators work segment by segment. If list items aren't parallel, each item appears to be a different type of content.

**Before**:
- Configure your API key.
- The event properties should be set.
- Verifying your setup.

**After**:
- Configure your API key.
- Set your event properties.
- Verify your setup.
