---
id: 8ef1dd2c-953d-484f-ab1d-f8ddea570064
blueprint: source-catalog
title: 'X Ads'
connection: source
integration_category:
  - ad-networks
partner_maintained: false
integration_icon: partner-icons/x.svg
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1751386159
---
Amplitude's X Ads integration helps you import your X Ads spend, click, and impression data for analysis in Amplitude.

The integration imports campaign level metrics once per day from X Ads. These metrics appear in Amplitude as ad-level metrics, and don't tie to individual users.

In Amplitude, ad data appears as a dedicated event caleld Daily Ad Metrics, and includes event properties like:

* `ad_metrics.impressions`
* `ad_metrics.clicks`
* `ad_group_id`
* `campaign_id`

Daily Ad Metrics includes the following user properties, which you can use for campaign analysis and for calculating other metrics like Customer Acquisition Cost (CAC) and Return on Ad Spend (ROAS):

* `utm_medium`
* `utm_campaign`
* `utm_content`

{{partial:admonition type="note" heading="UTM parameters require manual setup"}}
X Ads doesn't populate UTM parameters by default. To ensure these fields appear in Amplitude, add the UTM parameters to ad URLs with [tracking templates](https://support.google.com/google-ads/answer/6305348) or another method. 

Autotagging with `gclid` doesn't populate UTM fields. Some campaign types, like [Performance Max](https://support.google.com/google-ads/answer/10724817) don't allow URL level control, so UTM values don't consistently appear.
{{/partial:admonition}}

## Preqrequisites

Before you begin, ensure you have the following:

* An X Ads Manager account with Admin access. This gives Amplitude permission to read your ad account data.
* At least one X Ads ad account under your Admin user. After you authenticate, Amplitude shows a list of all ad accounts you have access to.

## Amplitude configuration

To enable the integration in Amplitude:

1. Navigate to Data Sources and find **X Ads**.
2. Enter a **Display Name** for the connection.
3. Select the TikTok Ads account from which you want to import data.
4. Choose to import historical data from a period you specify, up to one year. Amplitude backfills this data, and continues daily imports.
5. Select the number of days to wait for X Ads data to finalize before import.
   * **1 Day**: Faster data availability, but higher risk of underreporting clicks, spend, or impressions due to late corrections from X Ads.
   * **3 Days**: Slower data availability, but more accurate metrics as X Ads may retroactively adjust for bot traffic, delayed conversions, or attribution changes.
6. Click **Save** to create the integration.

## Analyze your data

After you import your TikTok Ads data, analyze campaign performance in the Ad Performance dashboard in [Out-of-the-box Marketing Analytics](/docs/analytics/ootb-marketing-analytics).

## Supported properties

X Ads provides the properties listed in this section.

### Event properties

| Property Name            | Description                                     |
| ------------------------ | ----------------------------------------------- |
| `ad_account_id`          | The ID of the connected X Ads account.          |
| `ad_group_id`            | The ID of the ad group.                         |
| `ad_group_name`          | The name of the ad group.                       |
| `ad_group_status`        | The current status of the ad group.             |
| `ad_id`                  | The ID of the ad.                               |
| `ad_metrics.app_clicks`  | The number of app-specific clicks.              |
| `ad_metrics.clicks`      | The number of clicks on the ad.                 |
| `ad_metrics.cost`        | The total cost associated with the ad.          |
| `ad_metrics.impressions` | The number of times the ad displayed to a user. |
| `ad_metrics.retweets`    | The number of retweets recorded.                |
| `ad_metrics.url_clicks`  | The number of link clicks to external URLs.     |
| `ad_platform`            | The platform source for the ad (value is “x”).  |
| `campaign_currency`      | The currency used for the campaign spend.       |
| `campaign_id`            | The ID of the campaign.                         |
| `campaign_name`          | The name of the campaign.                       |
| `campaign_status`        | The current status of the campaign.             |
| `tweet_id`               | The ID of the tweet used in the promoted ad.    |

### User properties

If your X Ads URL contains UTM parameters, Amplitude captures the following user properties.

| Property Name  | Description                                    |
| -------------- | ---------------------------------------------- |
| `utm_source`   | The source that referred the user.             |
| `utm_medium`   | The advertising or marketing medium.           |
| `utm_campaign` | The campaign name from UTM tracking.           |
| `utm_content`  | The ad content or variation from UTM tracking. |
| `utm_term`     | The search term or keyword from UTM tracking.  |

## Common issues