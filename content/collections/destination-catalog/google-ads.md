---
id: 9ecced14-cac2-42c9-8194-a53a2e979711
blueprint: destination-catalog
use_cases:
  - 'The use case with sending events to Google Ads enables streaming events directly to the Google Ad network. This integration allows advertisers to track user interactions, such as clicks or conversions, in real-time and use this data to refine their advertising strategies and optimize ad placements for better results.'
short_description: 'An online advertising platform developed by Google, where advertisers bid to display brief advertisements, service offerings, product listings, or videos to web users.'
integration_category:
  - ad-networks
integration_type:
  - event-streaming
title: 'Google Ads (Event Stream)'
source: 'https://docs.developers.amplitude.com/data/destinations/google-ads'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/google-ads.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478561
---
Amplitude Data's Google Ads integration enables you to stream your Amplitude event data straight to Google Ads with just a few clicks.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- Amplitude sends custom events using Amplitude `event_type` as event name.
- This integration uses Amplitude's integration uses Google Ads [Upload Click Conversions API](https://developers.google.com/google-ads/api/docs/conversions/upload-clicks). This would mean the event payload needs both the Google Click ID (`gclid`) and the Conversion Date Time properties. Google Ads relies on the `gclid` parameter to track user interactions with ads and attribute conversions back to specific ad clicks. When a user clicks an ad served through Google Ads, Google Ads generates a unique `gclid` value and appends it to the URL. This parameter identifies the click, and links it to subsequent conversions. Amplitude drops events without a user property `gclid`.
- `gclid` needs to be valid and not `none` and Conversion Date Time filed should be of the `format yyyy-MM-dd HH:mm:ss` with optional micro seconds. For example the `event_time` that's part of the default mapped property has the format `2024-02-23 19:18:32.712000`.
  
## Setup

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Google Ads**.
3. Enter a sync name, then click **Create Sync**.

After you create the destination, you must configure the settings.

#### Configure settings

1. On the **Settings** tab, click **Edit**.
2. Under **Status**, click the toggle from **Disabled** to **Enabled**.
3. Upload the [**Google Cloud Service Account**](https://developers.google.com/google-ads/api/docs/oauth/service-accounts): A Google Cloud Service Account is a special type of Google account used for server-to-server interactions and authentication within Google Cloud Platform (GCP) services. A user who has access to the Google Ads Service Account can create the Google Cloud Service Account. The Google Ads Service Account should have [domain wide delegation enabled](https://developers.google.com/workspace/guides/create-credentials). 
      
      When you configure the domain-wide delegation, set the OAuth scope to `https://www.googleapis.com/auth/adwords`. For more information, see [Configure the OAuth screen](https://developers.google.com/google-ads/api/docs/get-started/oauth-cloud-project#configure_the_oauth_consent_screen) in Google's documentation.

4. Enter the **Google Cloud Service Account User Email:** This is the email address of the user who created the Google Cloud Service Account and who has access to the Google Ads Account.
5. Enter the **Google Ads Developer Token:** The Google Ads admin needs to apply for a [developer token](https://developers.google.com/google-ads/api/docs/get-started/dev-token) from the Manager account. Each level of the [developer token has limits](https://developers.google.com/google-ads/api/docs/access-levels#access_levels) on the number of requests that Amplitude sends.
6. Enter the [**Google Ads Customer ID**](https://support.google.com/google-ads/answer/1704344?hl=en): A Google Ads Customer ID is a unique identifier assigned to each advertiser or business that uses Google Ads. This ID helps Google track and manage accounts, campaigns, and billing information for advertisers. Find the Google Ads Customer ID at top-right when logged into Google Ads. Enter the ID **without** hyphens.
7. Enter the [**Google Ads Conversion Action ID**](https://support.google.com/google-ads/thread/105330243?hl=en&sjid=5504033552721490234-EU): This is a unique identifier associated with a specific conversion action in Google Ads, and represents a desired action that you want your visitors or users to take. For example, make a purchase, submit a contact form, or sign up for a newsletter. Once the conversion action is visible on Google Ads, click it to visit the details page (path: `/conversions/detail`). The URL has a parameter `ctId=`. Copy the value of that parameter as the Conversion Action ID.
8.  Configure **Send Events** to send events ingested by Amplitude to Google Ads. 
      1. To send events, toggle **Send Events** to **Enabled**.
      2. Expand the **Select and filter events** panel, and select which events to send. Amplitude recommends that you send only the events you need in Google Ads, rather than selecting **All Events**.
9.  Map your Amplitude property to Google Ads property
      1. Map the `gclid` Amplitude property to the **GCLID** property in Google Ads
      2. Map the `event_time` Amplitude property to the **Conversion Date Time** property in Google Ads
10. Save when finished.

### Setup tracking conversion in Google Ads

1. In Google Ads, click on **Goals**.
2. Click **New conversion action**.
3. Click **Import data from Google Analytics or another source**.
4. Check **Manual import using API or uploads**.
5. Check **Track conversions from clicks**.
6. Choose your Goal and action optimization
7. Enter your Conversion name
8. Choose the value setting which lets you track how much these conversions are worth to your business.
9. Select how many conversions to count per click or interaction.
10. Select your Click-through conversion window
11. Select your attribution type.

When you configure Tracking Conversions in Google Ads, select the following options:

1. Import
2. Manual import using API or uploads
3. Track conversions from clicks

This enables recording of offline conversions in the **Goals** section of Google Ads. There may be a delay of up to 60 minutes for metrics to show in Google Ads after they stream from Amplitude.

## Common issues

### Stuck at the authentication step

If you see `ERR_BLOCKED_BY_CLIENT` in your browser's console, disable your ad blocker, clear your browser's cache and cookies, and try to add the connection again.

### "Error: Invalid Customer ID"

Google Ads requires a **Customer ID** to configure as an integration with Amplitude. For more information, see [Find your Google Ads customer ID](https://support.google.com/google-ads/answer/1704344?hl=en) in Google's documentation. Keep in mind, **Manager Account Customer ID** is different from the **Customer ID**.

### Insufficient permissions

Amplitude's Google Ads Event Streaming integration requires that your Google Ads Manager account has administrator privileges. This level of permission allows Amplitude to add and remove users from specific user lists in Google Ads.
For Google Ads, Amplitude adds and removes users from a specific user list. As a result, Amplitude needs appropriate permissions to create and delete Google Ads account data.
For more information, see [About access levels in your Google Ads Account
](https://support.google.com/google-ads/answer/9978556) in Google's documentation.

## Use cases

1. **Enhanced Conversion Tracking:** By linking Amplitude events to Google Ads, you can track conversions more effectively. This is particularly useful for understanding how users who click on your Google Ads interact with your product or service. For instance, if a user clicks an ad and then completes a significant action (like signing up or making a purchase) tracked in Amplitude, this integration allows you to attribute that action back to the specific ad click.
2. **Data-Driven Advertising Decisions:** The integration helps in making more informed decisions about your advertising strategies. By analyzing which ads lead to meaningful user actions, you can optimize ad spend, focusing on the most effective campaigns and channels.
