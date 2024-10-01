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
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724963263
---
Amplitude Data's Google Ads integration enables you to stream your Amplitude event data straight to Google Ads with just a few clicks.

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- Amplitude sends custom events using Amplitude `event_type` as the event name.
- This integration uses Google Ads [Upload Click Conversions API](https://developers.google.com/google-ads/api/docs/conversions/upload-clicks). The event payload needs both the Google Click ID (`gclid`) and the Conversion Date Time properties. Google Ads relies on the `gclid` parameter to track user interactions with ads and attribute conversions back to specific ad clicks. When a user clicks an ad served through Google Ads, it generates a unique `gclid` value and appends it to the URL. This parameter identifies the click and links it to later conversions. Amplitude drops events without a user property `gclid`.
- `gclid` must be valid: `none` isn't acceptable. The conversion date time filed should be in `yyyy-MM-dd HH:mm:ss` format, with optional microseconds. For example, the `event_time` that's part of the default mapped property has the format `2024-02-23 19:18:32.712000`.
  
## Setup

### Amplitude setup

1. In Amplitude Data, click *Catalog* and select the *Destinations* tab.
2. In the Event Streaming section, click *Google Ads*.
3. Enter a sync name, then click *Create Sync*.

After you create the destination, you must configure the settings.

#### Configure settings

1. On the *Settings* tab, click *Edit*.
2. Under *Status*, click the toggle from *Disabled* to **Enabled**.
3. Upload the [Google Cloud Service Account](https://developers.google.com/google-ads/api/docs/oauth/service-accounts): A Google Cloud Service Account is a special type of Google account used for server-to-server interactions and authentication within Google Cloud Platform (GCP) services. A user with access to the Google Ads Service Account can create the Google Cloud Service Account. The Google Ads Service Account should have [domain wide delegation enabled](https://developers.google.com/workspace/guides/create-credentials). 
      
      When you configure the domain-wide delegation, set the OAuth scope to `https://www.googleapis.com/auth/adwords`. For more information, see [Configure the OAuth screen](https://developers.google.com/google-ads/api/docs/get-started/oauth-cloud-project#configure_the_oauth_consent_screen) in Google's documentation.

4. Enter the Google Cloud Service Account User Email: This is the email address of the user who created the Google Cloud Service account and who has access to the Google Ads account.
5. Enter the [Google Ads Customer ID](https://support.google.com/google-ads/answer/1704344?hl=en): A Google Ads Customer ID is a unique identifier assigned to each advertiser or business that uses Google Ads. It helps Google track and manage accounts, campaigns, and billing information for advertisers. Find the Google Ads Customer ID at top-right when logged into Google Ads. Enter the ID **without** hyphens.
6. Enter the [Google Ads Conversion Action ID](https://support.google.com/google-ads/thread/105330243?hl=en&sjid=5504033552721490234-EU): This is a unique identifier associated with a specific conversion action in Google Ads, and represents an action that you want your visitors or users to take. For example, make a purchase, submit a contact form, or sign up for a newsletter. Once the conversion action is visible on Google Ads, click it to visit the details page (path: `/conversions/detail`). The URL has a parameter `ctId=`. Copy the value of that parameter as the Conversion Action ID.
7.  To send events ingested by Amplitude to Google Ads, toggle *Send Events* to *Enabled*. Expand the *Select and filter events* panel, and select which events to send. Amplitude recommends that you send only the events you need in Google Ads, rather than selecting *All Events*.
9.  Map the `gclid` Amplitude property to the `GCLID` property in Google Ads. This is the [Google Click identifier](https://support.google.com/google-ads/answer/9744275?hl=en).
10. Save when finished.

### Setup tracking conversion in Google Ads

1. In Google Ads, click *Goals*.
2. Click *New conversion action*.
3. Click *Import data from Google Analytics or another source*.
4. Check *Manual import using API or uploads*.
5. Check *Track conversions from clicks*.
6. Choose your goal and action optimization.
7. Enter your conversion name.
8. Choose the value setting. This lets you track how much these conversions are worth to your business.
9. Select the number of conversions to count per click or interaction.
10. Select your click-through conversion window.
11. Select your attribution type.

When you configure tracking conversions in Google Ads, select the following options:

- *Import*
- *Manual import using API or uploads*
- *Track conversions from clicks*

This enables recording of offline conversions in the *Goals* section of Google Ads. There may be a delay of up to 60 minutes after metrics stream from Amplitude before they appear in Google Ads.

## Common issues

### Stuck at the authentication step

If you see `ERR_BLOCKED_BY_CLIENT` in your browser's console, disable your ad blocker, clear your browser's cache and cookies, and try to add the connection again.

### "Error: Invalid Customer ID"

Google Ads requires a customer ID to configure as an integration with Amplitude. For more information, see [Find your Google Ads customer ID](https://support.google.com/google-ads/answer/1704344?hl=en) in Google's documentation. Keep in mind that **Manager Account Customer ID** is different from the **Customer ID**.

### Insufficient permissions

Your Google Ads Manager account needs administrator privileges to use Amplitude's Google Ads Event Streaming integration. This allows Amplitude to add and remove users from specific user lists in Google Ads.

For more information, see [About access levels in your Google Ads Account
](https://support.google.com/google-ads/answer/9978556) in Google's documentation.

## Use cases

1. *Enhanced Conversion Tracking:* By linking Amplitude events to Google Ads, you can track conversions more effectively. This is particularly useful for understanding how users who click on your Google Ads interact with your product or service. For instance, if a user clicks an ad and then completes a significant action (like signing up or making a purchase) tracked in Amplitude, this integration allows you to attribute that action back to the specific ad click.
2. *Data-Driven Advertising Decisions:* The integration help you make more informed decisions about your advertising strategies. By analyzing which ads lead to meaningful user actions, you can optimize ad spend, focusing on the most effective campaigns and channels.