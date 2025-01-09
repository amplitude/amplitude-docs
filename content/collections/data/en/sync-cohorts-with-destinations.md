---
id: 49650754-faac-4f89-8e01-20d881d0c099
blueprint: data
title: 'Sync Cohorts with Destinations'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1736374369
---

You can synchronize the cohorts your create in Amplitude, with third-party [destinations](/docs/data/destination-catalog) like ad networks, attribution provividers, and marketing automation platforms.

The sync cadence you define impacts both the frequency with which Amplitude sends cohort or cohort updates to the destination, and the destinations that are available.

## One-time sync

Use a one-time sync to send a cohort to your destination once. Use this option if you need to export a cohort to the destination, and don't require continuous updates.

## Scheduled sync

Use a scheduled sync to ensure Amplitude sends cohort updates to your destination on an **hourly** or **daily** basis. Amplitude queues sync jobs throughout the hour or day, depending on your selection. As a result, you can't select the time of day that a sync occurs.

## Real-time sync

Use a Real-time sync to ensure the destination has the most up-to-date information about your cohort. Real-time sync checks for updates, and sends them to the destination every minute.

Amplitude recommends Real-time syncs for cohorts that require minute-by-minute precision and don't change by a large number of users from minute to minute. If you choose Real-time syncing, and notice in the sync history that most syncs update `0` users, hourly sync may work better for your use case.

{{partial:admonition type="warning" heading="Real-time sync limitations"}}
Real-time sync supports all cohort types except:

* Funnel
* Retention
* Stickiness
* Nth time event
* Event within
* Distinct interval

Real-time sync supports all cohort destinations except:

* [Facebook Ads](/docs/data/destination-catalog/facebook-ads)
* [Google Ads](/docs/data/destination-catalog/google-ads-cohort-syncing)
* [Twitter (X) Ads](/docs/data/destination-catalog/twitter-ads-cohort)
* [Hubspot](/docs/data/destination-catalog/hubspot-cohort-sync)
* [Qualtrics](/docs/data/destination-catalog/qualtrics)
* [S3 cohort sync](/docs/data/destination-catalog/amazon-s3-cohort)
* [TikTok Ads](/docs/data/destination-catalog/tiktok-ads)
* [Enterpret](/docs/data/destination-catalog/enterpret)
* [Braze](/docs/data/destination-catalog/braze-cohort-sync)
* [SFMC](/docs/data/destination-catalog/salesforce-marketing-cloud-v2)
* [The Trade Desk](/docs/data/destination-catalog/thetradedesk)
{{/partial:admonition}}