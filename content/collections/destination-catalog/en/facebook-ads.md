---
id: 14aabb31-0c11-4354-a611-ba27d6aaab70
blueprint: destination-catalog
use_cases:
  - 'Sending cohorts from Amplitude to Facebook Ads enables businesses to connect their advertising efforts directly to product success. By leveraging first-party behavioral data from Amplitude, organizations can create custom cohorts tailored to specific user segments. These cohorts can then be used in Facebook Ads to target relevant audiences with highly personalized ad campaigns, driving new user acquisition and conversions.'
  - 'This integration allows businesses to compute metrics like cost per impression and cost per click directly in Amplitude, providing a better view of overall conversion and facilitating collaboration across teams within the organization.'
short_description: 'Facebook is one of the most efficient ways to advertise online. Create targeted cross-channel ads to more than 1.8 billion monthly users.'
integration_category:
  - ad-networks
integration_type:
  - cohorts
  - raw-events
title: 'Facebook Ads'
source: 'https://docs.developers.amplitude.com/data/destinations/facebook-ads'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/facebook.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478534
---

This integration enables you to create [custom audiences](https://www.facebook.com/business/help/381385302004628) from your first-party behavioral data to drive new user acquisition and conversions. With this integration, you can upload and sync [behavioral cohorts](https://help.amplitude.com/hc/en-us/articles/231881448) directly to Facebook for campaign targeting throughout the Facebook ad network.  

## Considerations

- If your audience has fewer than 100 users, [Facebook is unlikely to use it](https://www.facebook.com/business/a/custom-to-lookalike-audiences#:~:text=Note%3A%20The%20minimum%20source%20audience,find%20who%20look%20like%20them.). For audiences between 100 and 1000 users, Facebook displays the user count as "<1000 users."
- You must add this integration in each individual project. The person who establishes the integration is also the person who needs to agree with the custom audience Terms of Service.
- Matching for added users from uploaded custom audiences can take up to one hour, and removing users can take up to a day. As a result, there can be a delay before you see the Audience you synced from Amplitude.
- Facebook Ads requires hashed fields for ingestion. If you don't hash fields yourself, Amplitude hashes them when it exports the cohort.

## Setup

### Prerequisites

You need a [Facebook Business Manager account](https://business.facebook.com/).

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Facebook**.
3. Click **Continue with Facebook** and log in to Facebook to accept the terms and conditions. You **must** accept Facebook's terms to set up the integration.
4. Map your Facebook users to your Amplitude users. You can choose to map a wide range of Facebook keys, such as email or phone number, and the Amplitude Identifier can be a user ID, device ID, or a custom user property. You can use Facebook keys that aren't specific to an individual user, such as "country," but you must send at least one uniquely identifiable key (like email or device ID). The more key mappings you add, the better your match rate is.
5. When finished, save your work. 

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Facebook.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

The exported cohort is now available as a custom audience on the Audience page of Facebook Business Manager.

## Common errors

There are three common errors users can run into while setting up the Facebook integration.

**The Facebook Custom Audience Terms of Service weren't accepted**. Amplitude must be authorized by the Facebook ad account to use custom audiences. You must accept the Terms of Service to authorize Amplitude.

- *Solution*: Accept the terms of service. You need to have Admin/Manager permissions on Amplitude and have the appropriate permissions on Facebook to accept the terms and services in the pop-up module.

**Facebook didn't connect to Business Manager.** For security reasons, Facebook requires that ad accounts are associated with Business Manager. This integration doesn't work unless you've enabled Business Manager for your ad account.

- *Solution*: Create a [Business Manager](https://www.facebook.com/business/help/1710077379203657) for your account and associate your ad account with that Business Manager.

**Facebook user lacks audience permissions.** The user who sets up the integration on Amplitude must have the appropriate permissions to access the Facebook APIs. Amplitude sends custom audiences to Facebook on behalf of that user, so if they don't have the proper permissions, Amplitude doesn't either.

- *Solution*: Grant the setup user access to use APIs. If the original setup user lost permissions, disconnect the integration and reconnect it with another user who has permissions.
To disconnect the integration, navigate to *Sources & Destinations* --> *{Project Name}* --> *Destinations* --> *Cohort Destinations* --> *Facebook*.
