---
id: a7f3c8d2-9e4b-4a1c-8d5e-3f6b2a9c1e4d
blueprint: experiment
title: 'Change to Assignment Event User Properties'
landing: false
exclude_from_sitemap: false
updated_by: c0ecd457-5b72-4dc9-b683-18a736413d32
updated_at: 1759852528
---

This announcement describes an important change to how Amplitude sets experiment user properties on assignment events.

## What's changing

The assignment event (`[Experiment] Assignment`) now sets the experiment user property at the time the assignment event is ingested, just like exposure events. This ensures the experiment user property (for example, `[Experiment] <flag_key>`) reflects the variant the user was assigned to, not just when the exposure happens.

## Why this matters

Previously, the value of experiment user properties on assignment events could lag exposure values, leading to discrepancies in analysis when segmenting or filtering by variant. With this change, assignment events become more reliable for debugging, monitoring, and serving as heuristics for exposure in server-side or remote evaluation setups.

## What to do

- If you're depending on `[Experiment] Assignment` events as exposure events (for example, for server-side experiments), your dashboards, queries, and filters may need updating.
- Review custom queries that segment users by experiment user property and ensure they align with this updated behavior.

## Additional details

- This change applies to assignment events triggered by remote evaluation, as well as server-side local evaluation when configured to track assignments.
- Exposure events remain unchanged in behavior for setting user properties.
- There should be no breaking changes or data loss, but variant-based segmentation might show updated results because of this alignment.

## FAQs

### Does this change retroactively update historical data?

No. This change applies from the date of rollout. All historical events remain as-is.

### What if I already treat assignment as exposure in server-side experiments?

This change makes that practice more accurate—it should now reflect user properties you expect.

### Will this affect our SDK integrations?

Only if you manually rely on assignment behavior in custom logic. Most integrations should continue to work unaffected.
