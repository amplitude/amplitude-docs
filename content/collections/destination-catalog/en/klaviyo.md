---
id: d50a8f77-1c8e-4ef5-9b62-b28fb0d7c79c
blueprint: destination-catalog
use_cases:
  - "The integration between Amplitude and Klaviyo allows businesses to drive retention and conversion by leveraging targeted messaging. By syncing cohorts from Amplitude to Klaviyo's email marketing platform, businesses can create highly personalized campaigns that resonate with specific audience segments. This enables marketers to send tailored messages based on user behavior and preferences, enhancing engagement and driving better results. With Klaviyo's tools for website personalization and audience segmentation, businesses can optimize their email and SMS marketing efforts to build stronger relationships with customers and improve overall campaign performance."
short_description: 'Klaviyo is a powerful email marketing and analysis tool that supports segmentation based on category and event triggers like page viewed.'
integration_category:
  - marketing-automation
integration_type:
  - cohorts
title: Klaviyo
source: 'https://docs.developers.amplitude.com/data/destinations/klaviyo'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/klaviyo.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479158
---
Send Amplitude cohorts to Klaviyo to use in targeted messaging. 

## Setup

### Klaviyo setup

Create a private API key in Klaviyo. Open Klaviyo and navigate to **Account > Settings > API Keys**. 

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Klaviyo**.
3. Enter a name and API key. 
4. Map an Amplitude field to Klaviyo email. Klaviyo requires the user ID to be valid email format.
5. Save when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Klaviyo.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

After you have exported the cohort, you can see the cohort in the [List](https://www.klaviyo.com/lists "https://www.klaviyo.com/lists") section of the Klaviyo platform. You can then create [segments](https://www.klaviyo.com/lists/create "https://www.klaviyo.com/lists/create") with two conditions:

- "Properties about someone" → `isActive `sets to be `is true `with type `Boolean`.
- "If someone is in or not in a list" → Person `is `in `Choose a list `→ chooses a list from the dropdown list.

After that, you create a segment with active users in the cohort to use for events that follow.