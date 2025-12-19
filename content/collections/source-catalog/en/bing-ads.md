---
id: 41d7ef5b-4d62-4015-9071-096482cf33d8
blueprint: source-catalog
title: 'Bing Ads'
connection: source
integration_category:
  - ad-networks
partner_maintained: false
integration_icon: partner-icons/bing.svg
exclude_from_sitemap: false
integration_type:
  - raw-events
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1766181060
---
Amplitude's Bing Ads integration helps you import your Bing Ads spend, click, impression, and conversion data for analysis in Amplitude.

The integration imports metrics once per day from the Ads Account level. These metrics appear in Amplitude as ad-level metrics, and don't tie to individual users.

In Amplitude, ad data appears as a dedicated event called Daily Ad Metrics, and includes event properties like:

* `ad_metrics.cost`
* `ad_metrics.impressions`
* `ad_metrics.conversions`
* `ad_metrics.clicks`
* `ad_group_id`
* `campaign_id`

Daily Ad Metrics includes the following user properties, which you can use for campaign analysis and for calculating other metrics like Customer Acquisition Cost (CAC) and Return on Ad Spend (ROAS):

* `utm_medium`
* `utm_campaign`
* `utm_content`

{{partial:admonition type="tip" heading="UTM parameters require manual setup"}}
UTM parameters don't appear in Bing Ads by default. To ensure these properties appear in Amplitude, add the UTM parameters to `FinalUrls` of the ad. For more information, see Bing Ads' [Create ads](https://learn.microsoft.com/en-us/advertising/campaign-management-service/ad?view=bingads-13) article.

If you don't add parameters to Bing Ads' `FinalUrls`, Amplitude infers default values and attaches them during ingestion.
{{/partial:admonition}}

## Prerequisites

Before you begin, ensure you have the following:

* A Bing Ads account
* A OAuth account must have access to the Ad account in order to configure the integration. (TOCHECK)

## Amplitude configuration

To enable the integration in Amplitude: (TODO)

1. Navigate to Data Sources and find **Bing Ads**.
2. Enter a **Display Name** for the connection.
3. Select the Bing Ads account from which you want to import data.
4. Choose to import historical data from a period you specify, up to one year. Amplitude backfills this data, and continues daily imports.
5. Click **Save** to create the integration.

## Analyze your data

After you import your Bing Ads data, analyze campaign performance in the Ad Performance dashboard in [Out-of-the-box Marketing Analytics](/docs/analytics/ootb-marketing-analytics).

## Supported properties

Bing Ads provides the properties listed in this section.

### Event properties

Bing Ads provides the following event properties. (TOCHECK)

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
| `ad_platform`            | The platform source for the ad. Defaults to `bing`. |
| `campaign_id`            | The ID of the campaign.                                |
| `campaign_name`          | The name of the campaig.                               |

### User properties

If your Bing Ad URLs include UTM parameters, Amplitude captures the following user properties. These fields are required to calculate metrics like Customer Acquisition Cost and Return on Ad Spend.

| Property Name | Description                                    |
| ------------- | ---------------------------------------------- |
| utm_source    | The source that referred the user.             |
| utm_medium    | The advertising or marketing medium.           |
| utm_campaign  | The campaign name from UTM tracking.           |
| utm_content   | The ad content or variation from UTM tracking. |

## Common issues

Keep the following potential issues in mind as you build out the integration.

### Insufficient permissions

Your Bing Ads Manager account requires administrator privileges. This level of permission allows Amplitude to add and remove users from specific user lists in Bing Ads. (TOCHECK)

### Daily ad metric discrepancies

Amplitude imports Bing Ads data once per day, and always for the previous calendar day. The import happens as a daily batch, and isn't available in real time or for hour-by-hour analysis

If Bing Ads revises campaign data after Amplitude’s import complets, those changes don't appear automatically. 

Consider this a you analyze campaign performance, particularly when reviewing short-term trends, diagnosing anomalies, or comparing metrics across tools. Data appearing accurate at the time of import may shift days later due to these retrospective updates in Bing Ads.

For more information, see [Reporting Data Retention Time Periods](https://learn.microsoft.com/en-us/advertising/guides/report-data-retention-time-periods?view=bingads-13) in Bing Ads' documentation.

### Ad events don't map to users

Bing Ads doesn't export user level identifiers like device ID, email address, or user ID. As a result, Daily Ad Metrics event's don't link to use profiles in Amplitude, they aren't associated with known users across other product events.

While these events may appear in a user stream with a synthetic identifier (like Bing Ads device ID), this doesn't mean identity resolution was successful. Amplitude treats the events as standalone entries, which aren't suitable for user-level reporting.

Daily Ad Metrics events work best for campaign level analysis. Amplitude recommends excluding them from funnels, cohort definitions, or behavioral journeys that rely on user identity.