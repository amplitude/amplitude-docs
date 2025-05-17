---
id: ec6127d5-1384-41b1-b85a-04d21d0678f1
blueprint: analytic
title: 'Out-of-the-box Marketing Analytics'
this_article_will_help_you:
  - 'Track industry-standard marketing analytics in one place'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1743538884
source: 'https://help.amplitude.com/hc/en-us/articles/25181928085019-Gain-marketing-insights-with-web-analytics'
landing: false
academy_course:
  - cafa90d0-f101-4234-bdf3-c9525c221850
---
Amplitude’s Out-of-the-box Marketing Analytics acts as a centralized hub where you can track page engagement and session-based metrics using common KPIs, such as page views, session duration, and bounce rate. Custom settings are available to:

- **Filter by domain**: Filter metrics by a specific domain to target a specific website for analysis.
- **Track conversions**: Easily define a conversion funnel, enable detailed tracking, and visualize conversion metrics with data tables and charts.
- **Uncover deeper insights with nested group-bys**: Add additional detail to your top-level channels or campaigns analytics with nested group-bys.

## Feature availability

This feature is available to users on all Amplitude plans. See the [pricing page](https://amplitude.com/pricing) for more details.

### Permissions

Your ability to edit views in Marketing Analytics depends on your role within the project.

| Role    | Default view | Custom view (yours) | Custom view (others) |
| ------- | ------------ | ------------------- | -------------------- |
| Admin   | ✅            | ✅                   | ✅                    |
| Manager | ✅            | ✅                   | ✅                    |
| Member  | ❌            | ❌                   | ❌                    |

## Before you begin

If you haven’t already read up on the basics of building charts in Amplitude, you should do so before proceeding.

{{partial:partials/web-product-analytics hub="Marketing"}}


## Analyze industry-standard metrics
Out-of-the-box Marketing Analytics offers four sets of insights with default metrics, as well as optional goals or key outcomes, that you are driving users to:

- **Traffic by Channel**: Provides an overview of users visiting your product by channel. Metrics include visitors, bounce rate, session totals, average session duration, sessions per user, and marketing analytics views.
- **Traffic by Campaign**: Provides an overview of the users visiting your product by campaign. Metrics include visitors, bounce rate, session totals, average session duration, sessions per user, and any defined goals.
- **Ad Performance**: Provides an overview of your ad campaigns (for example, Google Ads and Facebook Ads) with key metrics like Impressions, Clicks, Click-Through Rate (CTR), Cost Per Click (CPC), Customer Acquisition Cost (CAC), and Return on Ad Spend (ROAS), plus flexible settings for acquisition and revenue tracking.
- **Page Engagement**: Details user engagement by page. Metrics include visitors, page views, bounce rate, page views per session, entry rate, exit rate, and any defined goals.
- **Conversion**: Provides over-time and aggregated analyses of user conversion based on your defined funnel. Metrics include total conversion and step-by-step conversion.

{{partial:admonition type="note" heading="If your CAC and ROAS are 0"}}
CAC and ROAS may display as `0` if your ads haven't led to conversions, or if the UTM parameters in your campaigns don't match those in your events. 

For example, if `utm_content` in a Facebook add is `image_xyz`, but the value you set in Amplitude is `xyz`, Amplitude can't accurately track that campaign.

To ensure accurate results, ensure the UTM properties you use in your campaigns match what you [configure in Amplitude](#configure-utm-properties). If you notice a discrepency, you can update the property definition in Amplitude. For more information, see [Fix your data with Transformations](/docs/data/transformations#rename-property-values)
{{/partial:admonition}}

Each insight displays a time series chart and an aggregated data table below it.

{{partial:admonition type='note'}}
Visit the [Marketing metrics recipes article](/docs/analytics/charts/user-sessions/marketing-metrics-recipes) for a more detailed explanation of commonly used marketing analytics and how to replicate them in Amplitude charts.
{{/partial:admonition}}

Follow these steps to analyze metrics in Out-of-the-box Marketing Analytics:

1. Click *Marketing Analytics* in the left-hand sidebar and select the insight you’d like to view.
2. If desired, click *Add segment > Amplitude segments* to filter your analysis by user type:
    * **All users**: Users who triggered any event during the selected date range.
    * **Active users**: Users who triggered at least one active event during the selected date range.
    * **New users**: Users who triggered at least one new user event during the selected date range.
    * **Mobile web**: Users who triggered events on a web platform from an Apple iPad, Apple iPhone, or Android device.
    * **Desktop web**: Users who triggered events on a web platform from a Mac or Windows device.

From there, use the data table to further your analysis:
- Click *Open in Data Table* to view your results in a separate chart.
- For traffic by channel or conversion insights, select the channel you'd like to analyze from the Default Channels dropdown.

For conversion insights, you can also:
- View the data table fields by channel or campaign.
- Display total conversions or conversion rate.

### Ad metric definitions

Here are the default Ad metrics available in Out-of-the-box Marketing Analytics, along with the high-level formulas and definitions:

| Metric     | Formula                                             | Definition                                                                                                                                                     |
|----------------|---------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Impressions**| `PROPSUM(ad_metrics.impressions)`                      | Total number of times your ad is served (shown) to users. **Derived from Daily Ad Metrics**.                                                                       |
| **Clicks**     | `PROPSUM(ad_metrics.clicks)`                           | Total number of times users click your ad. **Derived from Daily Ad Metrics**.                                                                                      |
| **CTR**        | `%: (ad_metrics.clicks / ad_metrics.impressions) * 100` | Click-through rate. Shows the percentage of impressions that result in a click. **Derived from Daily Ad Metrics**.                       |
| **Ad Spend**   | `PROPSUM(ad_metrics.cost)`                             | Total amount spent on your ad campaign. **Derived from Daily Ad Metrics**.                                                                                      |
| **CPC**        | `ad_metrics.cost / ad_metrics.clicks`                  | Cost per click. Shows how much you pay, on average, for each click on your ad. **Derived from Daily Ad Metrics**.                                     |
| **CAC**        | `ad_metrics.cost / [Acquisition Event]`                | Customer Acquisition Cost. Shows how much you pay, on average, to acquire a single new user. **Cost from Daily Ad Metrics; acquisition event set in Settings**.   |
| **ROAS**       | `[Revenue Property] / ad_metrics.cost`                            | Return on Ad Spend. Shows how much revenue you earn for every dollar spent on advertising. **Cost from Daily Ad Metrics; revenue property set in Settings**.      |


## Modify settings and create goals

Out-of-the-box Marketing Analytics uses default events and properties from the Browser SDK or Ad Networks, but admins or managers can modify them in settings.

Follow these steps to manage settings, create goals, or customize tracked events:

1. Click *Customize*.
2. Select the type of setting you’d like to modify:
   * If *Page View and Filter*, choose the event and property that you’d like to use. This affects all page-related metrics.
   * For *Breakdown*, choose the default channels you want to display, as well as your campaign and page engagement properties.
   * Set *Conversion Funnel* settings by choosing the events that make up your funnel.
   * For Ad Performance, select events and properties to calculate CAC and ROAS metrics, along with properties such as ad source, campaign, and content.

If *Goals*, choose the key events or metrics you'd like to set up as additional metrics. Break down goals by  channels, campaigns, or pages.

## Advertising metrics and properties

To view insights on ad performance, you need to connect to an ad network (for example, Google or Facebook). For more information, see the [Source Catalog](/docs/data/source-catalog).

Amplitude associates advertising metrics with an event called `Daily Ad Metrics`.

The following user properties are set with the `Daily Ad Metrics` event and display by default in the breakdown table on the Ad Performance tab:

* UTM Campaign
* UTM Content
* UTM Medium 
* UTM Source 
* UTM Term

{{partial:admonition type="tip" heading="Use UTM properties as breakdowns"}}
To gain insight on both ad metrics and product metrics, use UTM properties as the breakdown.
{{/partial:admonition}}

The Daily Ad Metrics event also includes several important event properties:

* Ad Impressions, Ad Clicks, Ad Cost, Ad Conversions, Ad Interactions

* Ad Group ID, Ad Group Name, Ad Group Type, Ad ID, Ad Name, Ad Platform, Ad Segment Device, Campaign Advertising Channel Type, Campaign End Date, Campaign ID, Campaign Name, Campaign Start Date, Final URL, Tracking URL Template

The first set of event properties includes numeric values you can use to compute advertising metrics. The remaining event properties describe the advertising metrics in the same way as the ad network. (This example uses Google Ads, but the process is similar for other advertising networks, although property names may vary.)

{{partial:admonition type="tip" heading="Amplitude recommends UTM properties"}}
Amplitude recommends that you use UTM properties to track the full user journey from impression to in-product action.

The Daily Ad Metric supports other properties, like `ad_platform` or `campaign_name`. Using these properties lets you measure ad-level metrics like impressions and clicks. They don't support values for CAC, ROAS, or any custom goals you define that tie to Amplitude events. Those require UTM-based matching within the Daily Ad Metric.
{{/partial:admonition}}

### Configure UTM properties

To ensure your UTMs end up in Amplitude:

1. Add UTM parameters to your ad campaign URLs.
2. Instrument those UTMs as user properties in Amplitude.
3. Ensure the UTM values match between your advertising URLs and the event data you see in Amplitude.

If you don't see results, ensure the following:

* You ran an ad campaign during the selected date range.
* You added UTM parameters to your ad campaign URLs.

## Create a web experiment for specific URLs

On the Page Engagement tab of Marketing Analytics, when you breakdown your data by Page URL, you can create a [web experiment](/docs/web-experiment) from the table.

Click the flask icon in the Action column of the table, and the New Web Experiment dialog appears pre-populated with the targeted page URL.