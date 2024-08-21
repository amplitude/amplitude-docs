---
id: ec6127d5-1384-41b1-b85a-04d21d0678f1
blueprint: analytic
title: 'Gain marketing insights with web analytics'
this_article_will_help_you:
  - 'Track industry-standard web analytics in one place'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718945018
source: 'https://help.amplitude.com/hc/en-us/articles/25181928085019-Gain-marketing-insights-with-web-analytics'
landing: false
---
Amplitude’s Web Analytics space acts as a centralized hub where you can track page engagement and session-based metrics using common KPIs, such as page views, session duration, and bounce rate. Custom settings are available to:

- **Filter by domain**: Filter metrics by a specific domain to target a specific website for analysis.
- **Track conversions**: Easily define a conversion funnel, enable detailed tracking, and visualize conversion metrics with data tables and charts.
- **Uncover deeper insights with nested group-bys**: Add additional detail to your top-level channels or campaigns analytics with nested group-bys.

This article will help you understand how to use this feature and quickly gain insights into your product’s web analytics in Amplitude.

## Feature availability
This feature is available to users on all Amplitude plans. See our [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin
If you haven’t already read up on the basics of building charts in Amplitude, you should do so before proceeding.

## Analyze industry-standard metrics
The Web Analytics space offers four sets of insights with default metrics, as well as optional goals or key outcomes, that you are driving users to:

- **Traffic by Channel**: Provides an overview of users visiting your product by channel. Metrics include visitors, bounce rate, session totals, average session duration, sessions per user, and web analytics views.
- **Traffic by Campaign**: Provides an overview of the users visiting your product by campaign. Metrics include visitors, bounce rate, session totals, average session duration, sessions per user, and any defined goals.
- **Page Engagement**: Details user engagement by page. Metrics include visitors, page views, bounce rate, page views per session, entry rate, exit rate, and any defined goals.
- **Conversion**: Provides over-time and aggregated analyses of user conversion based on your defined funnel. Metrics include overall conversion and step-by-step conversion.

Each insight displays a time series chart and an aggregated data table below it. 

{{partial:admonition type='note'}}
Visit the [Marketing metrics recipes article](/docs/analytics/charts/user-sessions/marketing-metrics-recipes) for a more detailed explanation of commonly-used marketing analytics and how to replicate them in Amplitude charts.
{{/partial:admonition}}

Follow these steps to analyze metrics in the Web Analytics space:

1. Click Explore Web Analytics from the Quick Actions section on the homepage, or click Web Analytics from the Spaces dropdown.
2. In the left-hand panel, click on the insight you’d like to view.
3. If desired, click the All Users dropdown to filter your analysis by user type:
     *  **All users**: Users who triggered any event during the selected date range.
     * **Active users**: Users who triggered at least one active event during the selected date range.
     * **New users**: Users who triggered at least one new user event during the selected date range.
     * **Mobile web**: Users who triggered events on a web platform from an Apple iPad or Android device.
     * **Desktop web**: Users who triggered events on a web platform from a Mac or Windows device.

From there, use the data table to further your analysis: 
- Click *Open in Data Table* to view your results in a separate chart.
- For traffic by channel or conversion insights, select the channel you'd like to analyze from the Default Channels dropdown.

For conversion insights, you can also:
- View the data table fields by channel or campaign.
- Display total conversions or conversion rate.

## Modify settings and create goals

The Web Analytics space uses default events and properties from the Browser SDK, but admins or managers can modify them in settings.

Follow these steps to manage settings, create goals, or customize tracked events:

1. Click Settings.
2. Select the type of setting you’d like to modify:
   * If *Page View and Filter*, choose the event and property that you’d like to use. This will affect all page-related metrics.
   * For *Breakdown*, choose the default channels you want to display, as well as your campaign and page engagement properties.
   * Set *Conversion Funnel* settings by choosing the events that make up your funnel.

If *Goals*, choose the key events or metrics you'd like to set up as additional metrics. Goals can be broken down by channels, campaigns, or pages.