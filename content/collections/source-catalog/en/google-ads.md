---
id: 9c4a9a4c-775b-483f-934e-78d402d5634d
blueprint: source-catalog
title: 'Google Ads'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
integration_type:
  - cohorts
integration_category:
  - ad-networks
partner_maintained: false
integration_icon: partner-icons/google-ads.svg
exclude_from_sitemap: false
updated_by: 4870994b-20b1-4b89-b813-42091eaf6cb7
updated_at: 1747259144
academy_course:
  - 5851e566-81eb-4447-96c8-25fe1babd34b
---
Amplitude's Google Ads integration lets you import your Google Ads spend, click, and impression data for analysis in Amplitude.

## Prerequisites

To set up, you need the following:

-   [Google Ads Customer ID](https://support.google.com/google-ads/answer/1704344?hl=en) of the ad account you want to connect to.
-   If you don't have direct access to the account, Google Ads Manager ID that you authorized access on which can view this ad account.

## Considerations

-   This source imports campaign level metrics from Google Ads. It doesn't import other types of data such as experiments or user level identifiers. Metrics are ingested at the ad level and aren't tied to individual users.
-   Amplitude imports Google Ads data once per day, always for the previous calendar day, using a batch ingestion process. The data appears in Amplitude as a dedicated event called `Daily Ad Metrics`, which includes properties such as `ad_metrics.impressions`, `ad_metrics.clicks`, `ad_group_id`, and `campaign_id`.
-   The `Daily Ad Metrics` event also includes user properties such as `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`. These fields are often used for campaign analysis and for calculating metrics like Customer Acquisition Cost (CAC) and Return on Ad Spend (ROAS).
-   UTM parameters aren't automatically populated by Google Ads. To ensure these fields appear in Amplitude, customers must manually add UTM parameters to their ad URLs using either [tracking templates](https://support.google.com/google-ads/answer/6305348) or the [Final URL Suffix](https://support.google.com/google-ads/answer/7305793). Auto tagging, such as using gclid, doesn't populate UTM fields. Some campaign types such as [Performance Max](https://support.google.com/google-ads/answer/10724817) may not allow URL level control. This means UTM values may not consistently appear in those cases.
-   To calculate CAC and ROAS correctly, UTM parameters must be present on both the Daily Ad Metrics event and on downstream conversion events such as Sign Up or Purchase. These metrics depend on shared fields, such as `utm_campaign`, that link ad spend to user behavior.
-   Amplitude’s [Browser SDK v2](/docs/sdks/analytics/browser/browser-sdk-2) and other SDKs usually capture UTM parameters automatically at the beginning of a user session. However, if your setup uses server side tracking, custom routing, or a single page application, you may need to manually map UTM values as user properties to ensure consistency.
-   If your project uses [Schema enforcement](/docs/data/configure-schema), allow the `Daily Ad Metrics` event and its properties. Otherwise, the data may be silently blocked from ingestion.
-   Google Ads data collects data at the ad level rather than the user level. As a result, `Daily Ad Metrics` events aren't associated with individual users and may appear as standalone events in user streams. These are best used for campaign level reporting, not for user level funnels or behavioral analysis.
-   You can't import data directly from a Google Ads Manager Account (MCC). While you can provide an MCC ID to authorize access to a specific Customer ID, Amplitude only imports data from the specified account and not from the MCC or other accounts linked to it.
-   You can connect multiple Google Ads customer accounts (not MCCs) to a single Amplitude project. There's no limit on the number of ad accounts you can connect. Although all campaign data is grouped under the same `Daily Ad Metrics` event, the `ad_account_id` property is available on new events as of May 9, 2025 and allows you to filter and analyze performance by account.

## Amplitude setup

In Amplitude, navigate to Data Sources, then find Google Ads in the I want to import data into Amplitude tab.

1.  Log into Google and grant Amplitude permission in the consent form.
2.  Enter the Google Ads Customer ID for the ad account you want to import data from.
3.  If you don't have direct access to the account, enter the Manager ID that you authorized access on which can view this ad account. Otherwise, just leave the field as blank.
4.  Optional. Import past data for a given period.

## Analyze your data

Once your Google Ads data is imported, you can analyze campaign performance using Amplitude’s built-in **Ad Performance** dashboard. This dashboard is available under **Marketing Analytics > Ad Performance** and displays key metrics such as impressions, clicks, CTR, CPC, CAC, and ad spend. You can break down performance by UTM parameters including UTM Source, UTM Campaign, UTM Medium, UTM Content, and UTM Term. The metrics refresh daily and you can filter them by campaign or time period to help you track trends and optimize ad spend.

For a full list of available advertising metrics and how they work, refer to the [Advertising metrics and properties reference](/docs/analytics/ootb-marketing-analytics#advertising-metrics-and-properties).

## Supported properties

| Property Name        | Type       | Description                                         | Availability              |
| ------------------------ | -------------- | ------------------------------------------------------- | ----------------------------- |
| `ad_metrics.clicks `     | Event Property | Number of clicks on the ad                              | Always                        |
| `ad_metrics.impressions` | Event Property | Number of times the ad was shown                        | Always                        |
| `ad_metrics.conversions` | Event Property | Number of conversions attributed to the ad              | Always                        |
| `ad_metrics.cost`        | Event Property | Total cost associated with the ad                       | Always                        |
| `ad_name`                | Event Property | Name of the ad                                          | Varies by campaign type       |
| `ad_id`                  | Event Property | Unique ID of the ad                                     | Varies                        |
| `ad_group_name `         | Event Property | Name of the ad group                                    | Varies                        |
| `ad_group_id`            | Event Property | Unique ID of the ad group                               | Varies                        |
| `campaign_name`          | Event Property | Name of the campaign                                    | Varies                        |
| `campaign_id`            | Event Property | Unique ID of the campaign                               | Varies                        |
| `ad_account_id`          | Event Property | Unique identifier for the connected Google Ads account. | Available for new events only |
| `utm_source`             | User Property  | Source that referred the user                           | Only if manually tagged       |
| `utm_medium`             | User Property  | Advertising or marketing medium                         | Only if manually tagged       |
| `utm_campaign`           | User Property  | Campaign name from UTM tracking                         | Only if manually tagged       |
| `utm_content`            | User Property  | Ad content or variation from UTM tracking               | Only if manually tagged       |
| `utm_term`               | User Property  | Search term or keyword from UTM tracking                | Only if manually tagged       |

{{partial:admonition type="note" heading=""}}
-   `add_account_id` applies to all **newly ingested** events as of May 9, 2025. It isn't added to already ingested data.
-   To view historical trends by account, create a new project and re-import data from the ad source using a backfill.
-   Campaign-level properties like `campaign_id` still exist and are helpful for performance analysis, but `ad_account_id` enables cross-account breakdowns within a single Amplitude project.
{{/partial:admonition}}


## Common issues

If you enounter issues with your implementation, keep the following in mind.

### Insufficient permissions

Amplitude's Google Ads Import integration requires that your Google Ads Manager account has administrator privileges. This level of permission allows Amplitude to add and remove users from specific user lists in Google Ads.

For more information, see [About access levels in your Google Ads Account](https://support.google.com/google-ads/answer/9978556) in Google's documentation.

### Import job ingests no data

- Unplanned data: check if you reject unplanned events in your [Schema settings](/docs/data/configure-schema). If you reject unplanned data,  Amplitude doesn't store the event or its properties.
* Matching users: check if your users have corresponding accounts in Amplitude and Google Ads. Google Ads import tries to match users between platforms based on the key-value pairs you selected. If your import job doesn't find any corresponding values, it fails.

### Daily ad metric discrepancies

Google Ads may update advertising metrics several days after the original interaction. This can happen for several reasons, including delayed conversion attribution or the removal of invalid traffic. For instance, a user may click on an ad today but complete a conversion a few days later, which Google then attributes retroactively. Google may later exclude clicks it detects as fraudulent or non-human, resulting in lower reported impressions or spend. These updates can affect key metrics such as conversions, cost, and impressions.

Amplitude imports Google Ads data once per day, and always for the **previous calendar day**. Because Amplitude schedules this import as a daily batch, the data isn't available in real time and you can't use it for hour-by-hour analysis. If Google revises campaign data after Amplitude’s import has completed, those changes don't reflect automatically.

This behavior is important to consider when analyzing campaign performance, particularly when reviewing short-term trends, diagnosing anomalies, or comparing metrics across tools. Data appearing accurate at the time of import may shift days later due to these retrospective updates in Google Ads.

For more information, review [About data freshness](https://support.google.com/google-ads/answer/2544985?hl=en) in Google's documentation.

### Ad events don't map to Users

Google Ads doesn't export user-level identifiers such as device ID, email address, or user ID. As a result, `Daily Ad Metrics` events aren't linked to real user profiles in Amplitude and aren't associated with known users across other product events.

While these events may appear in a user stream with a synthetic identifier (such as a Google Ads device ID), this doesn't mean successful identity resolution. Amplitude treats the events as standalone entries and aren't suitable for user-level reporting.

`Daily Ad Metrics` events are best used for campaign-level analysis and you shouldn't use them in funnels, cohort definitions, or behavioral journeys that rely on user identity.

These events may appear as standalone events in user streams with only campaign-level context.