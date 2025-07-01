---
id: b1dfcb9b-9567-4440-b28b-e2948486c0af
blueprint: source-catalog
title: 'LinkedIn Ads'
connection: source
integration_category:
  - ad-networks
partner_maintained: false
integration_icon: partner-icons/linkedin_icon.svg
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1751392218
---
Amplitude's LinkedIn Ads integration helps you import your LinkedIn Ads spend, click, and impression data for analysis in Amplitude.

The integration imports campaign level metrics once per day from LinkedIn Ads. These metrics appear in Amplitude as ad-level metrics, and don't tie to individual users.

In Amplitude, ad data appears as a dedicated event caleld Daily Ad Metrics, and includes event properties like:

* `ad_metrics.impressions`
* `ad_metrics.clicks`
* `ad_group_id`
* `campaign_id`

Daily Ad Metrics includes the following user properties, which you can use for campaign analysis and for calculating other metrics like Customer Acquisition Cost (CAC) and Return on Ad Spend (ROAS):

* `utm_medium`
* `utm_campaign`
* `utm_content`

{{partial:admonition type="note" heading="LinkedIn automatically populates UTMs"}}
LinkedIn Ads populates UTM paramaters at the campaign level. Amplitude fetches these parameters with LinkedIn's reporting API, which supports dynamic UTM tracking. For more information, see Microsoft's [Dynamic UTM Tracking](https://learn.microsoft.com/en-us/linkedin/marketing/integrations/ads-reporting/dynamic-utm-tracking?view=li-lms-2025-06&tabs=http) article.
{{/partial:admonition}}

## Preqrequisites

Before you begin, ensure you have the following:

* A LinkedIn Ads account
* Admin access to that LinkedIn Ads account. You must log in with a user who has Admin privileges to authorize the connection and allow Amplitude to import campaign metrics like spend, clicks, and impressions.

## Amplitude configuration

To enable the integration in Amplitude:

1. Navigate to Data Sources and find **LinkedIn Ads**.
2. Enter a **Display Name** for the connection.
3. Select your OAuth connection and log in to LinkedIn Ads Manager with Admin access.
4. Select the LinkedIn Ads account from which you want to import data.
5. Choose to import historical data from a period you specify, up to one year. Amplitude backfills this data, and continues daily imports.
6. Click **Save** to create the integration.

## Analyze your data

After you import your LinkedIn Ads data, analyze campaign performance in the Ad Performance dashboard in [Out-of-the-box Marketing Analytics](/docs/analytics/ootb-marketing-analytics).

## Supported properties

LinkedIn Ads provides the properties listed in this section.

### Event properties

| Property Name          | Description                                               |
| ---------------------- | --------------------------------------------------------- |
| `ad_account_id`          | The unique identifier for the connected Linkedin Ads account. |
| `ad_account_name`        | The unique name for the connected Linkedin Ads account.       |
| `ad_metrics.clicks`      | The number of clicks on the ad.                                |
| `ad_metrics.conversions` | The number of conversions attributed to the ad.                |
| `ad_metrics.cost`        | The total cost associated with the ad.                         |
| `ad_metrics.impressions` | The number of times the ad was shown.                          |
| `ad_platform`            | The platform source for the ad data.                       |
| `campaign_group_id`      | The ID of the campaign group.                              |
| `campaign_group_name`    | The name of the campaign group.                            |
| `campaign_id`            | The ID of the campaign.                                    |
| `campaign_name`          | The name of the campaign.                                  |
| `campaign_status`        | The current status of the campaign.                        |
| `campaign_type`          | The type or format of the campaign.                        |
| `creative_id`            | The ID of the creative used.                               |
| `creative_status`        | The current status of the creative.                        |
| `creative_type`          | The type of creative used in the ad.                       |
| `currency`               | The currency used for spend reporting.                     |

### User properties

If your LinkedIn Ads URL contains UTM parameters, Amplitude captures the following user properties.

| Property Name  | Description                                    |
| -------------- | ---------------------------------------------- |
| `utm_source`   | The source that referred the user.             |
| `utm_medium`   | The advertising or marketing medium.           |
| `utm_campaign` | The campaign name from UTM tracking.           |
| `utm_content`  | The ad content or variation from UTM tracking. |
| `utm_term`     | The search term or keyword from UTM tracking.  |

## Common issues

Keep the following potential issues in mind as you build out the integration.

### Insufficient permissions

Your LinkedIn Ads Manager account requires administrator privileges. This level of permission allows Amplitude to add and remove users from specific user lists in LinkedIn Ads.

### Import job ingests no data

The following issues may prevent Amplitude from ingesting LinkedIn Ads data:

* **Unplanned data**: If you configured Amplitude to reject unplanned events in your [Schema settings](/docs/data/configure-schema), Amplitude doesn't store the event or its properties.

### Daily ad metric discrepancies

LinkedIn Ads may update advertising metrics several days after the original interaction. This can happen for different reasons, including delayed conversion attribution or the removal of invalid traffic. For example, a user clicks on an ad today, but doesn't complete the conversion for a few days. Upon conversion, LinkedIn retroactively attributes that conversion to the click from a few days ago.

LinkedIn can also exclude clicks it detects as fraudulent or non-human. This can result in lower reported impressions or spend. These updates impact key metrics like conversions, cost, and impressions.

Amplitude imports LinkedIn Ads data once per day, and always for the previous calendar day. The import happens as a daily batch, and isn't available in real time or for hour-by-hour analysis

If LinkedIn revises campaign data after Amplitude’s import complets, those changes don't appear automatically. To ensure the most accurate reporting, trigger a manual [backfill](/docs/data/data-backfill) to refresh metrics for the affected time period.

Consider this a you analyze campaign performance, particularly when reviewing short-term trends, diagnosing anomalies, or comparing metrics across tools. Data appearing accurate at the time of import may shift days later due to these retrospective updates in LinkedIn Ads.

### Ad event's don't map to users

LinkedIn Ads doesn't export user level identifiers like device ID, email address, or user ID. As a result, Daily Ad Metrics event's don't link to use profiles in Amplitude, they aren't associated with known users across other product events.

While these events may appear in a user stream with a synthetic identifier (like LinkedIn Ads device ID), this doesn't mean identity resolution was successful. Amplitude treats the events as standalone entries, which aren't suitable for user-level reporting.

Daily Ad Metrics events work best for campaign level analysis. Amplitude recommends excluding them from funnels, cohort definitions, or behavioral journeys that rely on user identity.