---
id: c92dadd2-fd63-4601-954b-fe269d82fc25
blueprint: session-replay
instrumentation_guide: false
title: Heatmaps
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1742510992
---
Heatmaps provide a visual representation of user engagement on your website or application over time. Analyze patterns of events to identify trends, anomalies, and areas of your product that drive the most engagement.

### Feature availability

Heatmaps are available to customers on **Growth** and **Enterprise** plans who use Session Replay. For more information, see the [pricing page](https://amplitude.com/pricing).

## Map types

Heatmaps provides three views that help you understand how users engage with a specific page.

### Click map

![Click map](statamic://asset::help_center_conversions::session-replay/hm1.png)

Click maps provide a color-coded display of the clicks, or "heat" on your page. Areas with few clicks appear blue, while busier areas appear green, yellow, orange, and red in order of increasing clicks.

Highlight an area on screen to watch Session Replays of those events, view the raw events, or create a cohort of users who engaged with the area you highlight.

### Selectors

![](statamic://asset::help_center_conversions::session-replay/hm2.png)

The Selector view displays a wire frame of clickable elements on the page, ranked by number of clicks in descending order. Select an element on the map, or in the list to watch Session Replays of those events, view the raw events, or create a cohort of users who engaged with selector.

### Scrollmap

![](statamic://asset::help_center_conversions::session-replay/hm3.png)

The Scrollmap shows the unique users, and percentage of unique users who have scrolled that part of the page into their view port. Use the handle on the slider to adjust the scroll depth.

This view also shows the average fold of your page. The amount of the page that appeared on a user's device without the need to scroll.

On the list to the right of the map, click Watch Replays to view Session Replays of users who saw *at least* that much of your page.

## Create a Heatmap

To create a new Heatmap:
1. Click **Heatmaps** in the left nav.
2. Click **+ New Heatmap**. The Heatmap viewer displays.
3. Click **Untitled Heatmap** to rename the heatmap to something that describes the page you're viewing. For example, `Home page` or `Login page`.
4. Select a page in your site or application. Define the URL with the following methods:
   - **Matches exactly**: Enter the full URL to use. For example, `https://amplitude.com`.
   - **Matches pattern**: Enter a partial URL and use wildcards (`*`). This method uses glob matching. For example, `https://bank.com/accounts/*/products/`. In this case, the `*` matches any account number that may appear in the URL. This is useful for applications where the URL may differ between users, but the experience is the same.
   - **Contains**: Enter a string that the URL must contain. For example, `?promo=newUser` might return pages that contain a component (for example, [Guides and Surveys](/docs/guides-and-surveys)) that appears as a result a user landing on the page from an ad or other external resource.
   - **Starts with**: Enter a string that matches pages that begin with a specific string.
5. Optionally segment the users whose interactions you want to view.
6. Select the [Map Type](#map-types).
7. Select the Device to change the width of the heatmap, and automatically filter out users who were on other devices. For example, if you select **Mobile**, Amplitude shows a mobile rendition of the web page, and filters the engagements to only those that came from the selected device type.
8. Optionally change the screenshot. Amplitude captures different background images of your page. Change the screenshot to show hidden UI elements. For example, if you have a search modal that appears instead of a traditional search box, if Amplitude captures a session where that element is present, it can display it on the screenshot.