---
description: Replace wordy phrases with concise alternatives (not about removing content)
globs: ["content/**/*.md", "*.md"]
alwaysApply: true
---

# Concise Language

Use simple, direct language. Replace wordy phrases with shorter equivalents.

**IMPORTANT:** This rule is about replacing verbose phrases with concise alternatives, NOT about removing content or entire sentences. Never delete information or change the meaning.

## Common Wordy Phrases to Replace

### Prepositions and Conjunctions
- ❌ "in order to" → ✅ "to"
- ❌ "via" → ✅ "through"
- ❌ "prior to" or "previous to" → ✅ "before"
- ❌ "subsequent to" → ✅ "after"
- ❌ "in spite of" → ✅ "despite"
- ❌ "with regard to" → ✅ "regarding"
- ❌ "in addition" → ✅ "also"

### Time-Related Phrases
- ❌ "at the present time" → ✅ "now"
- ❌ "at this point in time" → ✅ "at this point"
- ❌ "in the near future" → ✅ "soon"
- ❌ "at a later date" → ✅ "later"
- ❌ "during the time that" → ✅ "while"
- ❌ "for the duration of" → ✅ "during"

### Causal Phrases
- ❌ "due to the fact that" → ✅ "because"
- ❌ "because of the fact that" → ✅ "because"
- ❌ "based on the fact that" → ✅ "because"
- ❌ "as a result of" → ✅ "because of"

### Conditional Phrases
- ❌ "in the event that" → ✅ "if"
- ❌ "if this is not the case" → ✅ "if not"
- ❌ "except when" → ✅ "unless"

### Verbal Phrases
- ❌ "utilize" or "make use of" → ✅ "use"
- ❌ "perform an assessment of" → ✅ "assess"
- ❌ "conduct an investigation" → ✅ "investigate"
- ❌ "take action" → ✅ "act"
- ❌ "make reference to" → ✅ "refer to"
- ❌ "has the ability to" → ✅ "can"
- ❌ "has the capacity to" → ✅ "can"

### Quantifiers
- ❌ "a large number of" → ✅ "many"
- ❌ "a majority of" → ✅ "most"
- ❌ "an adequate number of" → ✅ "enough"

## Examples

**Before:**
```
In order to utilize the API, you need to obtain credentials. Due to the fact 
that the system has the ability to process events in real time, you can 
monitor data at the present time.
```

**After:**
```
To use the API, you need to obtain credentials. Because the system can process 
events in real time, you can monitor data now.
```

## Remove Temporal Qualifiers

- ❌ "currently" - Documentation always represents the current state
- ❌ "at present"
- ❌ "right now"

**Exception:** When describing version-specific behavior or deprecated features, temporal qualifiers may be necessary.

## What NOT to Do

**DON'T remove entire sentences or content:**

❌ **Wrong:**
```
Original: "By default, user permissions in Amplitude exist at the organization level. 
With the default configuration, a user in an organization has the same level of 
access to all projects within that organization."

Bad suggestion: "By default, user permissions in Amplitude are at the organization level."
```
This removes important information about project-level access.

✅ **Correct:**
The original is fine. The word "exist" is not a wordy phrase - it's a clear, simple verb. Keep both sentences as they provide important context.

**DON'T change simple, clear words:**
- "exist" is already concise
- "have" is already concise  
- "use" is already concise
- "get" is already concise

**ONLY flag actual wordy phrases** listed in the sections above (like "in order to" → "to", "utilize" → "use", etc.).

