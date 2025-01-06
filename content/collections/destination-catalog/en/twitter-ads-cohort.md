---
id: b96bbcc2-34af-47fd-95cc-006065f6f4da
blueprint: destination-catalog
title: 'Send Cohorts to Twitter Ads'
description: 'Send Amplitude cohorts to Twitter Ads to create audiences for more personalized campaigns.'
---
Send Amplitude cohorts to Twitter Ads to create audiences for more personalized campaigns. 

## Setup

### Prerequisites
Your Twitter Ads account must have standard access. If it doesn't, request the necessary permissions on Twitter Ads Developer Portal.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Twitter Ads**.
3. Log into Twitter and grant Amplitude permission to create audience list and update users.
4. Set up the fields necessary for Amplitude to begin syncing to Twitter Ads. 
    - **Device ID**: User Device ID. This value should be an iOS Advertising Identifier, Google Advertising ID, or when not available - Android ID.
    - **Email**: User Email. If the email isn't hashed, Amplitude applies SHA256 hashing to ensure compliance with Twitter Ads standards.
    - **Handle**: The X @handle belonging to the user.
    - **X ID (Twitter ID)**: The X ID belonging to the user. The X ID is a unique value that every account on X has. No two people have the same ID. Although an account can change its @handle, it can never change its X ID
    - **Phone Number**: User Phone Number. If the phone number isn't hashed, Amplitude applies SHA256 hashing to ensure compliance with Twitter Ads standards.

{{partial:admonition type="note" heading=""}}
You must send **at least one uniquely identifiable key** (like email or device ID) to Amplitude in order for this integration to work.
{{/partial:admonition}}

## Send a cohort

1. In Amplitude, open the cohort you want to export.
2. Click **Sync**, and choose Twitter Ads.
3. Select the destination.
4. Select the sync frequency you need.
5. Save when finished.

In Twitter Ads you should see the cohort in the audience manager. It may take Twitter up to 24-48 hours to populate the sync. For privacy purposes, the user list size shows as zero until the list has at least 100 members. After that, the size is rounded to the two most significant digits.

