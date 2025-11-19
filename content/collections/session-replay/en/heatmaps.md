---
id: c92dadd2-fd63-4601-954b-fe269d82fc25
blueprint: session-replay
instrumentation_guide: false
title: Heatmaps
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1760632817
academy_course:
  - cafa90d0-f101-4234-bdf3-c9525c221850
---
Heatmaps uses Session Replay to provide a visual representation of user engagement on your website or application over time. Analyze patterns of events to identify trends, anomalies, and areas of your product that drive the most engagement.

{{partial:admonition type="note" heading="Heatmap retention"}}
Heatmaps use an anonymized session replay that's decoupled from any user behavior and isn't subject to your Session Replay retention period.
{{/partial:admonition}}

Heatmaps are available to customers who have the Session Replay addon. All users with [View permissions](/docs/account-management/user-roles-permissions) can create Heatmaps.

Use the following map types, depending on your use case,

| Map type                      | Use case                                                                                                                                                       |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Click map](#click-map)       | Displays the most clicked areas of your site by coordinates. This helps you identify high-traffic areas, optimize components, and improve the user experience. |
| [Selector map](#selector-map) | Highlights the most interacted with elements on a page along with their rank.                                                                                  |
| [Scroll map](#scroll-map)     | Displays the aggregate scroll activity on a given page. See the location of the average page fold, the number of users who scroll to a given depth.            |

{{partial:admonition type="note" heading="Legacy organizations"}}
If you recieve a message that states that "Heatmaps isn’t available for your organization", contact [Amplitude Support](https://gethelp.amplitude.com) for assistance enabling Heatmaps. Legacy organizations require manual enablement, and may require an increase in property limit.
{{/partial:admonition}}

## Prerequisites

Before you create a heatmap, ensure your Amplitude instrumentation meets the following requirements.

### Session Replay

{{partial:admonition type="note" heading="Client availiability"}}
Heatmaps are available on web-based session replays only, and don't support mobile apps or SDKs.
{{/partial:admonition}}

Heatmaps requires the following minimums:

* [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin): 1.7.0
* [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk): 1.14.0

{{partial:admonition type="note" heading="Session Replay sample rate"}}
Heatmaps use Session Replay data to track interactions on your pages. If you use a sample rate limit the number of replays you generate, you also limit the events available to build heatmaps. This can lead to a less comprehensive view of user interactions on your site, and can limit the accuracy of heatmaps. 
{{/partial:admonition}}

### No server-side identifiers

Heatmaps requires Amplitude's default device identifiers from the Browser SDK and doesn't support device identifiers from server-side SDKs or third party data sources.

### Create a development project (optional)

Amplitude recommends that you create a separate development project to test Heatmapping without impacting your production environment.

{{partial:admonition type="note" heading="Event taxonomy impact"}}
Heatmap and Session Replay events don't count toward your allotted event volume, and Amplitude doesn't bill you for them.
{{/partial:admonition}}

## Create a Heatmap

To create a new Heatmap:

1. Navigate to **Heatmaps** in the left navigation in Amplitude.
2. Click **+ New Heatmap**.
3. Choose a [Heatmap type](#map-types). You can update the map type after at any point.
4. Select the URL to analyze. Use the following URL matching options to more easily target the pages you care about.
   * **Exact match**: Matches the URL exactly as you specify it. Ideal for single URLs. For example, `https://amplitude.com`.
   * **Pattern match**: Uses wild cards to match more than one URL with a similar patterns. Useful for targeting dynamic paths. For example, `https://amplistore/prodcuts/*` matches `/products/shoes` and `/product/accessories`.
   * **Contains**: Matches URLs that contain a specific keyword or segment anywhere in the URL. Useful for common themes. For example `/search?q=` matches the search results page for any user query.
   * **Starts with**: Matches all URLs that begin with a specific prefix. Useful for capturing sections of a site. For example, `https://amplitude.com/blog` captures the `/blog` page and all subpages.
5. Select or create a **Segment** using user properties or cohorts to narrow the focus to a specific set of users.
6. Optionally, select different device types to understand how users interact on devices of different widths.
7. Choose a background to select the background of your heatmap. Backgrounds are snapshots of a session replay, and represent the page's state during replay collection. Each heatmap generates eight backgrounds, based on the state of the page that generates the most actions during a session.

## Map types

Heatmaps provides three views that help you understand how users engage with a specific page.

### Click map

![Click map](statamic://asset::help_center_conversions::session-replay/hm1.png)

Click maps provide a color-coded display of the clicks, or "heat" on your page. Areas with few clicks appear blue, while busier areas appear green, yellow, orange, and red in order of increasing clicks.

#### Microscope

Highlight an area of the click map to access Microscope. From there, you can:

* View the events in the highlighted area for deeper visibilty into user actions or create a chart to further analyze trends and behaviors across your data.
* View replays of user sessions that contain the events in your selection to combine the quantitative insights from Heatmaps to the qualitative context from Session Replay.
* Create a cohort of users who interact with a specific area of a page. For more information, go to [Behavioral Cohorts](/docs/analytics/behavioral-cohorts)

### Selector map

![](statamic://asset::help_center_conversions::session-replay/hm2.png)

The Selector view displays a wire frame of clickable elements on the page, ranked by number of clicks in descending order. Select an element on the map, or in the list to watch Session Replays of those events, view the raw events, or create a cohort of users who engaged with selector.

{{partial:admonition type="note" heading="Page length"}}
Selector maps display the page up to the lowest interactive element recorded, plus a small buffer. For instance, if the lowest button on a page is 1,200px down, the map shows up to that point, even if the full page is longer.
{{/partial:admonition}}

#### Microscope

Select a ranked element on the page to access Microscope. From there you can:

* View the events associated with the element area for deeper visibilty into user actions or create a chart to further analyze trends and behaviors across your data.
* View replays of user sessions that contain an interaction with the selected element to combine the quantitative insights from Heatmaps to the qualitative context from Session Replay.
* Create a cohort of users who interact with a specific element. For more information, go to [Behavioral Cohorts](/docs/analytics/behavioral-cohorts)

### Scroll map

![](statamic://asset::help_center_conversions::session-replay/hm3.png)

The Scrollmap shows the unique users, and percentage of unique users who have scrolled that part of the page into their view port. Use the handle on the slider to adjust the scroll depth.

This view also shows the average fold of your page. The amount of the page that appeared on a user's device without the need to scroll.

On the list to the right of the map, click Watch Replays to view Session Replays of users who saw *at least* that much of your page.

{{partial:admonition type="note" heading="Page length"}}
Scroll maps reflect the farthest point users scrolled on the page, with no set limit. For example, if some users receive a 1,000px version of a page and others receive a 2,000px version, the heatmap combines scroll data from both versions. Choose from available background snapshots to align the heatmap with the version most relevant to your analysis.
{{/partial:admonition}}