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

{{partial:admonition type="note" heading="Feature in Beta"}}
Zoning is in Beta. Because the feature is still evolving, the documentation may not reflect the latest state of the functionality.
{{/partial:admonition}}

Zoning lets you define named areas (zones) on your pages and analyze user engagement within those areas. Create zone maps that overlay your product UI that reveal how users interact with specific regions, such as hero sections, navigation bars, or call-to-action blocks.

Zoning requires [auto-captured interaction data](/docs/data/autocapture) (for example, click exposures, or scrolls) to compute element-level metrics directly on your pages. Because Zoning uses autocapture to collect page-level click events and interaction data, it can increase event volumes.

### Permissions

If you have an Admin or Manager role, you can create, update, and delete any zoning analysis. If you have the Member role, you can create, update, or delete your own zoning analyses but can't edit anyone else's. If you have the Viewer role, you can only view zoning analyses. For details, go to [User roles and permissions](/docs/admin/account-management/user-roles-permissions).

### Availability

You can use Zoning on Web and Mobile Web.

### How Zoning relates to Session Replay and Heatmaps

Zoning is different than either Session Replay or Heatmaps:

- **Session Replay** records user sessions and lets you watch replays and debug behavior.
- **Heatmaps** aggregate clicks, scrolls, and selector-level interactions on a page without defining custom areas.
- **Zoning** lets you define custom areas (zones) on a page and analyze engagement within those areas. It complements Session Replay and Heatmaps when you care about specific regions (for example: banners, forms, or CTAs) rather than the whole page or raw selectors.

## Configuring Zoning

Configure Zoning through the Autocapture [Remote Configuration](/docs/data/amplitude-data-settings#autocapture) settings in the [Browser SDK v2](/docs/sdks/analytics/browser/browser-sdk-2#autocapture) by enabling `fetchRemoteConfig`. 

At minimum, turn on the following Autocapture options: 

```
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  autocapture: {
    pageViews: true,
    elementInteractions: true,
  },
});
```

Optionally, you can include detailed `elementInteractions` settings such as `allowlists` or `viewportContentUpdated.exposureDuration`. 

## Creating a zone map

Create a zone map by defining one or more zones on a page and then viewing aggregated behavior within those zones.

1. Navigate to the *Zoning* section from the Amplitude navigation. 
2. Click **Create Overlay** and select either:
   * **Single page**
   * **Page group**
3. Select the Amplitude space where you want the zone map saved and click **Continue**.
4. If you're creating a new zone map for a group of pages do the following:
   a. Click **Create new page group** and enter a name for the group.
   b. Set a condition or rule for the group. For example, set the URL to begin with a specific domain such as *amplitude.com/*.
   c. Finish adding rules and click **Create URL group**.
5. Specify the URL(s) to analyze. If your product supports the same URL matching options as [Heatmaps](/docs/session-replay/heatmaps), you can use:
   * **Exact match** for a single URL.
   * **Pattern match** with wildcards for similar URLs.
   * **Contains** for URLs that include a keyword or segment.
   * **Starts with** for a URL prefix and its subpages.
6. Confirm that you want to create the page screenshot.
Amplitude needs the screenshot to create the zone map. You need a screenshot for both single pages and page groups.
7. Confirm that the correct URL is visibile and then click **Take Screenshot**.
8. Name the screenshot, describe it, and save it.
9. Click each zone to turn it on or off.
10. Save or apply the zone map so Amplitude can aggregate data for the defined zones.

After you save the map, view the metrics, user journeys, session replays for each zone (for example, clicks, scrolls, or sessions that touched a zone). You can also create segments for each zone.

Additionally, you can turn on the Heatmap overlay to better understand [heatmap](/docs/session-replay/heatmaps) clicks on your page.
