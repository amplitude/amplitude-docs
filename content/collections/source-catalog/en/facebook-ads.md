---
id: 00e3b9dd-749c-4795-936f-3180ee46b706
blueprint: source-catalog
title: 'Facebook Ads'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
integration_category:
  - ad-networks
partner_maintained: false
integration_icon: partner-icons/facebook.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718944464
---
Amplitude Data's Facebook Ads integration lets you import your Facebook Ad spend, click and impression data for analysis in Amplitude.

## Prerequisites

To set up this integration, you need the following:

* [Facebook Ads Account ID](https://www.facebook.com/business/help/1492627900875762) for the ad account you want to connect.

## Considerations

* This source imports campaign-level metrics from [Facebook Ads](https://www.facebook.com/business/tools/ads-manager). It doesn't import other types of data such as experiments or user-level identifiers. Metrics are ingested at the ad level and aren't tied to individual users.  
* Amplitude imports Facebook Ads data once per day, always for the previous calendar day, using a batch ingestion process. The data appears in Amplitude as a dedicated event called Daily Ad Metrics, which includes properties such as `ad_metrics.impressions`, `ad_metrics.clicks`, `ad_group_id`, and `campaign_id`.  
* The Daily Ad Metrics event may also include user properties such as `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, and `utm_term`. These fields are commonly used for campaign reporting and for calculating metrics like Customer Acquisition Cost (CAC) and Return on Ad Spend (ROAS).  
* Facebook Ads doesn't automatically populate UTM. To ensure these fields appear in Amplitude, you must manually add UTM parameters using the [URL Parameters](https://www.facebook.com/business/help/1016122818401732) input in Facebook Ads Manager. Add these parameters should at the ad or ad set level using either the built-in editor or a tracking template. If UTM fields are missing, CAC and ROAS may not compute correctly, as they rely on matching values across ad spend and conversion events.  
* To calculate CAC and ROAS in Amplitude, UTM properties must appear on both the Daily Ad Metrics event and on downstream product events such as Sign Up or Purchase. These calculations depend on shared keys like `utm_campaign` that link acquisition spend to behavioral outcomes.  
* [Amplitude’s Web SDK v2](/docs/sdks/analytics/browser/browser-sdk-2) and other platform SDKs typically autocapture UTM parameters when a session starts. However, for setups using server-side instrumentation, custom routing, or single-page applications, you may need to manually map UTM values as user properties to keep consistency across events.  
* If you use [Schema enforcement](/docs/data/configure-schema), ensure the Daily Ad Metrics event and its associated properties aren't blocked. If blocked, ingestion may silently fail and metrics don't populate.  
* Because Facebook Ads data isn't tied to Amplitude user identifiers, Daily Ad Metrics events aren't mapped to real users. These events may appear in user streams with a synthetic ID but are best suited for campaign-level analysis rather than user-level funnels, cohorts, or journeys.  
* You can connect multiple Facebook Ads customer accounts (not MCCs) to a single Amplitude project. There's no limit on the number of ad accounts you can connect. Although all campaign data is grouped under the same Daily Ad Metrics event, `ad_account_id` is available on new events as of May 9, 2025 and allows you to filter and analyze performance by Facebook Ads account.

### Amplitude setup

1) Log in to Facebook and grant Amplitude permission in the consent form.  
2) Enter the Facebook Ads Account ID for the ad account you want to import data from.  
3) [Optional] Import past data for a given period.

### Analyze your data

Once your Google Ads data is imported, you can analyze campaign performance using Amplitude’s built-in **Ad Performance** dashboard. This dashboard is available under **Marketing Analytics > Ad Performance** and displays key metrics such as impressions, clicks, CTR, CPC, CAC, and ad spend. You can break down performance by UTM parameters including UTM Source, UTM Campaign, UTM Medium, UTM Content, and UTM Term. The metrics refresh daily and you can filter them campaign or time period to help you track trends and optimize ad spend.

For a full list of available advertising metrics and how they work, refer to the [Advertising metrics and properties reference](/docs/analytics/ootb-marketing-analytics#advertising-metrics-and-properties).

## Common issues

If you enounter issues with your implementation, keep the following in mind.

### Ad events don't to users

Facebook Ads doesn't export user-level identifiers such as device ID, email address, or user ID. As a result, Daily Ad Metrics events aren't linked to real user profiles in Amplitude and can't be associated with known users across other product events.

While these events may appear in a user stream with a synthetic identifier (such as a Facebook Ads device ID), this doesn't mean successful identity resolution. Amplitude treats the events as standalone entries and they aren't suitable for user-level reporting.

Daily Ad Metrics events are best used for campaign-level analysis and you shouldn't include them in funnels, cohort definitions, or behavioral journeys that rely on user identity.