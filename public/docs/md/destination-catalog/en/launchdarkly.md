---
id: e5fd4b42-e55c-485a-9ab4-0ecb2071da5e
blueprint: destination-catalog
use_cases:
  - "Send cohorts from Amplitude to LaunchDarkly's feature management platform to create tailored feature flags for specific user segments identified by Amplitude data, enabling precise control over software functionality based on user behavior and attributes."
short_description: 'LaunchDarkly is a feature management platform that empowers development teams to safely deliver and control software through feature flags.'
integration_category:
  - experimentation
integration_type:
  - cohorts
partner_doc_link: 'https://launchdarkly.com/blog/tag/amplitude/'
title: LaunchDarkly
source: 'https://docs.developers.amplitude.com/data/destinations/launchdarkly'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/launchdarkly.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479246
---
With Amplitude's LaunchDarkly integration, you can export your Amplitude cohorts and use them as segmentation and targeting criteria in LaunchDarkly. From there, you can create feature flags for specific segments of users defined by your Amplitude data.

## Setup

### LaunchDarkly setup

To set up this integration, you first need an access token and client-side ID from LaunchDarkly.

1. In LaunchDarkly, navigate to **Account Settings → Authorization**. 
2. Click **+ Token**.
3. Enter a name for the token.
4. Select *Writer* from the Role dropdown list. 
5. Select the appropriate API version from the *API version* drop-down list.
6. When finished, save the token. Copy the token from the *Authorization* tab.
7. Navigate to the **Projects** tab and copy the client side ID from the project you want to export Amplitude cohorts to.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **LaunchDarkly**.
3. Enter a name. 
4. Paste the access token and client-side ID. 
5. Map an Amplitude property to the LaunchDarkly user key.

{{partial:admonition type="note" title=""}}
Make sure to choose a matching user identifier in Amplitude and LaunchDarkly. This is often `userID`, but could also be a device ID.
{{/partial:admonition}}

6. Save when finished. 

## Send a cohort

After you connect LaunchDarkly to Amplitude, you can sync any Amplitude cohort to it.

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose LaunchDarkly.
2. Choose the API target. This is the name you gave the integration in Amplitude.
3. Select the sync cadence. If you're not sure which selection is best, try setting up automated, recurring syncs for any strategically essential cohorts, whereas one-time syncs are more appropriate for project work.
4. Save your work.

After the cohort is synced with LaunchDarkly, Amplitude creates a LaunchDarkly segment. It's available in the *Segments* section in LaunchDarkly with an Amplitude logo next to it. You can then use this segment for targeting rules in feature flags you set up in LaunchDarkly.
