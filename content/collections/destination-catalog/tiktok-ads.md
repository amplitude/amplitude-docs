---
id: 89d65bd2-9292-456f-b8c5-4d8d6a8cb802
blueprint: destination-catalog
use_cases:
  - "Sending cohorts from Amplitude to TikTok Ads enables businesses to create more personalized campaigns on TikTok's platform. With this integration, companies can retarget cohorts to continue engaging with customers on TikTok effectively. Additionally, they can create suppression lists to minimize media waste on customers who have already been converted, optimizing ad spend and maximizing campaign efficiency. This integration leverages TikTok's innovative advertising solutions and unique targeting capabilities to help businesses build brand awareness, drive traffic, and boost conversions efficiently."
short_description: 'TikTok is the world’s leading destination for short-form mobile videos. The TikTok Ads integration allows you to send audiences from Amplitude to TikTok Ads to create more personalized campaigns.'
integration_category:
  - ad-networks
integration_type:
  - cohorts
title: 'TikTok Ads'
source: 'https://docs.developers.amplitude.com/data/destinations/tiktok-ads'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/tiktok.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480242
---

[TikTok](https://www.tiktok.com/) is the world's leading destination for short-form mobile videos. Their mission is to capture and present the world's creativity, knowledge, and moments that matter in everyday life.

The TikTok Ads integration allows you to send audiences from Amplitude to TikTok Ads to create more personalized campaigns. 

## Considerations

- The TikTok Ads / Amplitude integration is only available for Scholarship, Growth and Enterprise customers.
- You need a [TikTok for Business account](https://getstarted.tiktok.com/). 
- To use this integration, you must have an Amplitude user property that maps to a TikTok Key. TikTok supports these keys:
    - IDFA - Apple Ads ID
    - GAID - Google Ads ID
    - Email
    - Phone Number
- This integration must be enabled on a per-project basis.
- TikTok Ads requires SHA256 encryption. If your Amplitude key isn't encrypted, Amplitude applies SHA256 when syncing cohort data. 
- You can't change the TikTok Key after you save the integration. If you need to use a different key, disconnect the integration in Amplitude and set it up again.
- TikTok Ads API has the hard limit of 24 calls per day per Audience/Cohort [here](https://ads.tiktok.com/marketing_api/docs?id=1708580518247426). For Amplitude this means:
  1. The maximum size of cohort sync is 4.8 million users.
  2. If the TikTok Ads Audience has hourly sync and users are added/removed every hour, some sync can fail.


## Setup

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **TikTok Ads**.
3. Click **Connect to TikTok Ads**. You're redirected to TikTok Ads to authenticate.
4. In the TikTok permissions modal, select **Audience Management**, then click **Confirm**. You're redirected back to Amplitude.
5. Back in Amplitude, map your TikTok and Amplitude users. TikTok Ads supports four keys:
   - Email: Matches on user email address.[^1]
   - Phone Number: Matches on user phone number.[^1]
   - IDFA - Apple Ads ID: Matches on user IDFA (Apple Ads ID).
   - GAID - Google Ads ID: Matches on user GAID (Google Ads ID).
6. When finished, save your work.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **TikTok Ad Account**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence..[^2]
5. When finished, save your work.
[^2]: If you're not sure which selection is best, Amplitude recommends setting up automated recurring syncs for any essential cohorts. Use one-time syncs for work on individual projects.

In [TikTok Ads Manager](https://ads.tiktok.com/i18n/dashboard) the cohort appears under **Assets → Audiences**. It can take TikTok Ads up to 12 hours to populate the sync. If the cohort is less than 1000 users, it's marked as *unavailable* on TikTok Ads. In this case, disconnect the TikTok Ads integration in Amplitude, change the mapping and cohort definition to restart the cohort sync.
