---
id: 82fbd1b7-712f-4eb3-b551-999a5d0dd628
blueprint: source-catalog
title: 'TikTok Ads'
connection: source
integration_category:
  - ad-networks
partner_maintained: false
integration_icon: partner-icons/tiktok-color-icon.svg
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1751305788
---

Amplitude's TitkTok Ads integration helps you import your TikTok Ads spend, click, and impression data for analysis in Amplitude.

The integration imports metrics once per day from the Ads Manager Account level. These metrics appear in Amplitude as ad-level metrics, and don't tie to individual users.

In Amplitude, ad data appears as a dedicated event called `Daily Ad Metrics`, and includes event properties like:

* `ad_metrics.cost`
* `ad_metrics.impressions`
* `ad_metrics.conversions`
* `ad_metrics.clicks`
* `ad_group_id`
* `campaign_id`

`Daily Ad Metrics` includes the following user properties, which you can use for campaign analysis and for calculating other metrics like Customer Acquisition Cost (CAC) and Return on Ad Spend (ROAS):

* `utm_medium`
* `utm_campaign`
* `utm_content`

{{partial:admonition type="tip" heading="UTM parameters require manual setup"}}
UTM parameters don't appear in TikTok Ads by default. To ensure these properties appear in Amplitude, add the UTM parameters to `landing_page_url`. For more information, see TikTok's [Create ads](https://business-api.tiktok.com/portal/docs?id=1739953377508354) article.

If you don't add parameters to TikTok's `landing_page_url`, Amplitude infers default values and attaches them during ingestion.
{{/partial:admonition}}

## Prerequisites

Before you begin, ensure you have the following:

* A TikTok Ads account
* A TikTok Business Center membership with access to that account
* A user with the Standard (Operator/Analyst role) or above, to configure the integration.

## Amplitude configuration

To enable the integration in Amplitude:

1. Navigate to Data Sources and find **TikTok Ads**.
2. Enter a **Display Name** for the connection.
3. Select the TikTok Ads account from which you want to import data.
4. Choose to import historical data from a period you specify, up to one year. Amplitude backfills this data, and continues daily imports.
5. Click **Save** to create the integration.

## Analyze your data

After you import your TikTok Ads data, analyze campaign performance in the Ad Performance dashboard in [Out-of-the-box Marketing Analytics](/docs/analytics/ootb-marketing-analytics).

## Supported properties

TikTok provides the properties listed in this section.

### Event properties

TikTok provides the following event properties.

| Property Name            | Description                                            |
| ------------------------ | ------------------------------------------------------ |
| `ad_account_id`          | The unique identifier of the connected ad account.     |
| `ad_group_id`            | The ID of the ad group.                                |
| `ad_group_name`          | The name of the ad group.                              |
| `ad_id`                  | The ID of the ad.                                      |
| `ad_metrics.clicks`      | The number of clicks on the ad.                        |
| `ad_metrics.conversions` | The number of conversions attributed to the ad.        |
| `ad_metrics.cost`        | The total cost associated with the ad.                 |
| `ad_metrics.impressions` | The number of times the ad was shown to users.         |
| `ad_name`                | The name of the ad.                                    |
| `ad_platform`            | The platform source for the ad. Defaults to `tikttok`. |
| `campaign_id`            | The ID of the campaign.                                |
| `campaign_name`          | The name of the campaign.                               |

### User properties

If your TikTok Ad URLs include UTM parameters, Amplitude captures the following user properties. These fields are required to calculate metrics like Customer Acquisition Cost and Return on Ad Spend.

| Property Name | Description                                    |
| ------------- | ---------------------------------------------- |
| utm_source    | The source that referred the user.             |
| utm_medium    | The advertising or marketing medium.           |
| utm_campaign  | The campaign name from UTM tracking.           |
| utm_content   | The ad content or variation from UTM tracking. |

## Common issues

Keep the following potential issues in mind as you build out the integration.

### Insufficient permissions

Your TikTok Ads Manager account requires administrator privileges. This level of permission allows Amplitude to add and remove users from specific user lists in TikTok Ads.

### Daily ad metric discrepancies

Amplitude imports TikTok Ads data once per day, and always for the previous calendar day. The import happens as a daily batch, and isn't available in real time or for hour-by-hour analysis

If TikTok revises campaign data after Amplitude’s import complets, those changes don't appear automatically. 

Consider this as you analyze campaign performance, particularly when reviewing short-term trends, diagnosing anomalies, or comparing metrics across tools. Data appearing accurate at the time of import may shift days later due to these retrospective updates in TikTok Ads.

For more information, see [Data latency for reports](https://business-api.tiktok.com/portal/docs?id=1738864894606337) in TikTok’s documentation.

### Ad events don't map to users

TikTok Ads doesn't export user level identifiers like device ID, email address, or user ID. As a result, `Daily Ad Metrics` event's don't link to use profiles in Amplitude, they aren't associated with known users across other product events.

While these events may appear in a user stream with a synthetic identifier (like TikTok Ads device ID), this doesn't mean identity resolution was successful. Amplitude treats the events as standalone entries, which aren't suitable for user-level reporting.

`Daily Ad Metrics` events work best for campaign level analysis. Amplitude recommends excluding them from funnels, cohort definitions, or behavioral journeys that rely on user identity.




