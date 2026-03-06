---
id: a8e4f1c2-5b9d-4a7e-8f3c-1d6e2a0b9c4f
blueprint: session-replay
instrumentation_guide: false
title: Zoning
landing: false
exclude_from_sitemap: false
this_article_will_help_you:
  - 'Understand what Zoning is and how it fits with Session Replay'
  - 'Create and use zone maps to analyze defined areas of your product'
---
Zoning lets you define named areas (zones) on your pages and analyze user engagement within those areas. You create zone maps that overlay your product UI so you can see how users interact with specific regions, such as hero sections, navigation bars, or call-to-action blocks.

## Prerequisites

Before you use Zoning, ensure the following:

### Session Replay

Zoning depends on Session Replay. You need Session Replay enabled and collecting data for the pages you want to zone.

**Unconfirmed:** Whether Zoning is available only for web (browser) Session Replay—similar to [Heatmaps](/docs/session-replay/heatmaps)—or also for mobile. Confirm in the product or with the team.

**Unconfirmed:** Minimum Session Replay SDK versions required for Zoning (for example, Browser Plugin, Standalone SDK). The Technical Zoning SDK Remote Config Confluence page likely defines this.

### Permissions and plan

**Unconfirmed:** Required [user roles or permissions](/docs/admin/account-management/user-roles-permissions) and any plan or add-on requirements for Zoning. Confirm in the product or with the team.

## Create a zone map

You create a zone map by defining one or more zones on a page and then viewing aggregated behavior within those zones.

1. Navigate to the Zoning area in Amplitude (exact location in the left navigation is unconfirmed—for example, under *Session Replay* or a dedicated *Zoning* item).
2. Click the control to create a new zone map (for example, **+ New Zone Map** or **Create zone map**). *Label to be confirmed from the product.*
3. Select or specify the URL(s) to analyze. If the product supports the same URL matching options as [Heatmaps](/docs/session-replay/heatmaps), you can use:
   * **Exact match** for a single URL.
   * **Pattern match** with wildcards for similar URLs.
   * **Contains** for URLs that include a keyword or segment.
   * **Starts with** for a URL prefix and its subpages.
   * *Confirm which of these options Zoning supports and any differences in behavior.*
4. Define zones on the page. *The exact flow is unconfirmed.* For example:
   * You may draw or select rectangular areas on a page snapshot or live view.
   * You may assign a name or label to each zone (for example, "Hero CTA" or "Nav bar").
   * You may be able to add, edit, or remove zones before saving the zone map.
5. Optionally, apply a segment (user properties or cohorts) to limit the zone map to a specific set of users. *Confirm whether segments are supported and where they are configured.*
6. Save or apply the zone map so Amplitude can aggregate data for the defined zones.

After the zone map is saved, you can view metrics or replays for each zone (for example, clicks, scrolls, or sessions that touched a zone). *Exact metrics and views need to be confirmed from the product.*

**Unconfirmed:** Whether zone maps use a background snapshot (like Heatmaps), how retention works for zone data, and whether there is a minimum data threshold before a zone map shows results.

## How Zoning relates to Session Replay and Heatmaps

- **Session Replay** records user sessions so you can watch replays and debug behavior.
- **Heatmaps** aggregate clicks, scrolls, and selector-level interactions on a page without defining custom areas.
- **Zoning** lets you define custom areas (zones) on a page and analyze engagement within those areas. It complements Session Replay and Heatmaps when you care about specific regions (e.g. banners, forms, or CTAs) rather than the whole page or raw selectors.

**Unconfirmed:** Whether zone data is derived from the same underlying Session Replay pipeline as Heatmaps and whether Zoning has its own retention or sampling rules.

## Technical details (unconfirmed)

The following are likely defined in internal technical docs; they were not verified for this draft:

- **SDK and remote config:** The Technical Zoning SDK Remote Config Confluence page likely describes how zones are configured or delivered (e.g. remote config) and any SDK changes needed for Zoning.
- **Data model:** The Technical Zoning DB Schema Confluence page likely describes how zone definitions and zone-level events or metrics are stored.
- **Instrumentation:** Whether you must add any instrumentation (e.g. zone IDs or metadata) in your app for Zoning, or whether zones are defined only in the Amplitude UI and applied to existing Session Replay data.

Update this section once those sources are available.

## Common questions

### What is a zone?

A zone is a named, defined area on a page (for example, a rectangle over a hero section or a CTA). Zone maps let you analyze user behavior within those areas instead of only at the full-page or selector level.

### Can I use Zoning with mobile Session Replay?

*Unconfirmed.* Heatmaps are web-only. Confirm whether Zoning supports mobile (iOS/Android) or is web-only.

### How is Zoning different from Heatmaps?

Heatmaps show aggregated clicks, scrolls, and selector interactions across the whole page. Zoning lets you define custom regions (zones) and analyze behavior within those regions. Use Zoning when you care about specific areas you define; use Heatmaps for page-wide patterns.

## Related resources

- [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin)
- [Heatmaps](/docs/session-replay/heatmaps)
- [Session Replay settings](/docs/session-replay/session-replay-settings)
- [User roles and permissions](/docs/admin/account-management/user-roles-permissions)
