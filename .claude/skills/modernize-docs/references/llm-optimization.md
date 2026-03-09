# LLM optimization guide

Patterns that make technical documentation easier for language models to parse, retrieve, and use accurately.

## Table of contents

1. [Self-contained sections](#self-contained-sections)
2. [Explicit relationships](#explicit-relationships)
3. [Consistent terminology](#consistent-terminology)
4. [Structure and hierarchy](#structure-and-hierarchy)
5. [Descriptive headings](#descriptive-headings)
6. [Structured data](#structured-data)
7. [Explicit prerequisites](#explicit-prerequisites)

---

## Self-contained sections

Each section should be understandable without reading the surrounding content. LLMs often retrieve individual sections rather than full articles.

**Avoid**:
- "As mentioned above..."
- "See the previous step..."
- "Following from what we discussed..."
- "This" or "it" referring to something defined several paragraphs back

**Fix**: Name the thing explicitly. If a section builds on another, restate the key dependency in one sentence rather than relying on context.

**Before**: "Once you've done this, you can proceed to the next step."

**After**: "After you configure the API key, you can create your first event."

---

## Explicit relationships

State logical relationships between concepts explicitly. Don't assume the reader will infer cause, sequence, or dependency.

| Relationship | Implicit (avoid) | Explicit (use) |
|---|---|---|
| Cause | "High latency can affect event delivery." | "High latency causes events to queue, which delays delivery." |
| Requirement | "You need a project before tracking events." | "You must create a project before you can track events." |
| Contrast | "Cohorts and segments work differently." | "Cohorts are saved user groups; segments are dynamic filters applied at query time." |
| Sequence | "Configure X. Then set up Y." | "Configure X first, because Y depends on the project ID that X generates." |

---

## Consistent terminology

One concept = one term, used identically every time. Synonym variation helps human readers stay engaged but actively harms retrieval accuracy.

**Common inconsistencies to fix**:

| Inconsistent terms | Canonical term |
|---|---|
| "properties" / "attributes" / "metadata" (for event data) | "event properties" |
| "user" / "person" / "visitor" | "user" |
| "dashboard" / "workspace" / "project" | Use the specific Amplitude term for each |
| "send" / "fire" / "trigger" / "emit" (for events) | "send" |
| "key" / "token" / "credential" | "API key" (for API authentication) |

When an article uses the same concept with multiple terms, standardize to the canonical term throughout.

---

## Structure and hierarchy

Flat, shallow hierarchy is easier to parse than deeply nested structures.

**Avoid**:
- Bullet lists nested more than two levels deep
- Paragraphs that could be tables
- Tables embedded inside list items
- Long paragraphs that each cover multiple distinct points

**Fix**:
- Convert dense prose lists to bullet points or tables
- Break paragraphs that cover more than one point into separate paragraphs
- Limit nesting to two levels: top-level bullets with one level of sub-bullets maximum

**Before** (nested, hard to parse):
- Configure your project
  - Set the API key
    - You can find this in Settings
      - Navigate to *Settings > API Keys*

**After** (flat):
1. Navigate to *Settings > API Keys*.
2. Copy your API key.
3. Set the `api_key` value in your configuration.

---

## Descriptive headings

Headings are used as index entries by retrieval systems. Vague headings like "Overview," "Notes," or "More information" are hard to match to a user query.

**Before**:
- `## Overview`
- `## Notes`
- `## Additional information`
- `## Next steps`

**After**:
- `## How event tracking works`
- `## Rate limits and quotas`
- `## Configure advanced event properties`
- `## Related resources`

**Rule**: A heading should answer the question "What is this section about?" in plain language.

---

## Structured data

Present comparative, tabular, or parametric information as tables or definition lists, not as dense prose.

**Before**: "The API accepts three parameters: the event name, which is a required string; the user ID, which is an optional string; and the timestamp, which is an optional integer in milliseconds."

**After**:

| Parameter | Type | Required | Description |
|---|---|---|---|
| `event_name` | String | Yes | The name of the event |
| `user_id` | String | No | The user's unique identifier |
| `timestamp` | Integer | No | Event time in milliseconds (Unix epoch) |

**Use tables for**:
- API parameters and responses
- Configuration options
- Feature comparisons
- Supported values for an enum

**Use definition lists or bullet pairs for**:
- Term + explanation pairs that are too long for a table column

---

## Explicit prerequisites

State what the reader needs before they start. Unstated assumptions cause retrieval systems to return incomplete answers.

**Bad pattern**: Prerequisites buried in a note halfway through the article.

**Good pattern**: Dedicated `## Before you begin` section immediately after the intro, listing:
- Required access or permissions
- Software or accounts that must already exist
- Related configuration that must be complete

**Example**:
```markdown
## Before you begin

- You need Manager or Admin access to the Amplitude organization.
- You must have at least one project configured.
- Install the Amplitude Browser SDK (version 2.0 or later).
```

If there are no prerequisites, omit this section rather than writing "No prerequisites are needed."
