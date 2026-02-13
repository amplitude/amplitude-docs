---
id: a7f3c8d2-9e4b-4a1c-8d5e-3f6b2a9c1e4d
blueprint: experiment
title: 'Change to Assignment Event User Properties'
landing: false
exclude_from_sitemap: false
updated_by: c0ecd457-5b72-4dc9-b683-18a736413d32
updated_at: 1759852528
---

Effective February 10, 2026, Amplitude stops creating experiment user properties (`{flag-key}` = `assigned_variant`) on the Assignment event.

Event properties on the Assignment event remain unchanged.

This change ensures experiment analysis using the user properties is accurate and based only on actual user exposure.

## What's changing

### Before (current behavior)

When a user is assigned a variant during remote evaluation:

- An Assignment event is generated (for debugging).
- A user property is created: `{flag-key}` = `assigned_variant`.
- Assignment event properties are set:
  - `{flag-key}.variant` = `assigned_variant`.
  - `{flag-key}.details` = assignment details.

{{partial:admonition type="warning" heading="Important"}}
At this stage, the user hasn't been exposed to the experiment. They may never see the experiment at all.
{{/partial:admonition}}

### After (new behavior)

- No experiment user property is created on the Assignment event.
- The Assignment event remains available for debugging only.
- The experiment user property is created only on the Exposure event.

## When exposure happens

A user is considered exposed only when experiment logic affects the user experience.

At exposure time:

- An Exposure event is recorded.
- The experiment user property is created: `{flag-key}` = `assigned_variant`.
- All subsequent events include this user property. Only these events are valid for experiment analysis.

## How experiment analysis works

Analysis is based on:

- Exposure events.
- Metric events occurring after exposure.
- User properties created at exposure time.

Analysis doesn't use:

- Assignment events.
- User properties created on Assignment events.
- Events between Assignment and Exposure.

## Why this change is necessary

Using user properties for experiment analysis without attributing to the exposure event can produce incorrect results.

### Example

1. User is assigned Variant B (Assignment event).
2. User property `{flag-key}` = `B` is set.
3. User performs actions.
4. User is never exposed to the experiment.

If analysis relies only on the user property:

- The user is incorrectly counted in Variant B.
- Their actions are wrongly attributed to the experiment.
- This leads to misleading results.

## Benefits of the new behavior

After this change:

- Experiment user property always means actual exposure.
- User properties accurately reflect experiment participation.
- Analysis using user properties is correct and consistent.

## Key takeaway

An experiment user property should indicate one thing only: the user was exposed to the experiment.

Assignment events remain for debugging and shouldn't be used for experiment analysis.

If you want to opt out of this change, contact Support.
