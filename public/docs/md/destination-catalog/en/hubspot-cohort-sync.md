---
id: 119727fe-3a6f-40c0-aa88-e1eab2da0cf6
blueprint: destination-catalog
title: 'HubSpot (Cohort Sync)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - marketing-automation
partner_maintained: false
integration_icon: partner-icons/hubspot.svg
use_cases:
  - 'Target key cohorts with messaging informed by customer insights'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1722034412
source: 'https://www.docs.developers.amplitude.com/data/destinations/hubspot-cohort/'
---
The HubSpot destination allows you to sync your Amplitude-built cohort to your HubSpot contacts lists for targeting purposes.

## Considerations

- This integration supports both Email and Contact ID as a `user_id` mapping option.
- If you choose Email as HubSpot's userID, Amplitude creates a new email address contact in HubSpot if the user doesn't exist in HubSpot but does exist in the Amplitude cohort that you are syncing over. 
- If you choose Contact ID as HubSpot's userID, it must already exist in HubSpot and is required to be in **long** data type format.

## Set up in Amplitude

1. In Amplitude Data, navigate to *Catalog > Destinations* tab.
2. In the Cohort section, click *HubSpot*.
3. Log into your HubSpot account (via OAuth) to authenticate. Then select the account that contains the cohort you want to sync.
4. After you're redirected to the Amplitude dashboard, select the identifiers you want to use for the cohort sync. When you're done, save your work.

## Send a cohort

1. In Amplitude, open the cohort you want to sync. 
2. Click *Sync* and choose *HubSpot*.
3. Specify the HubSpot account you want to send the cohort to.
4. Set the sync cadence. 
5. Save your work.


{{partial:admonition type="note" title=""}}
For scheduled cohort syncs, only the initial sync will include the full cohort. All subsequent syncs will include all additions and removals since the last sync.
{{/partial:admonition}}

## Cohorts in HubSpot

After you send your Amplitude cohort to HubSpot, you can see it in the *Contacts* section of the HubSpot dashboard. Cohorts sent by Amplitude include a "amplitude_" prefix in the name. 

HubSpot only ingests users for whom they have identifiers.

{{partial:admonition type="example" title=""}}
User A, User B, and User C are in the Amplitude cohort (Cohort 1). HubSpot only has identifiers for User A and User C. HubSpot creates a list that includes User A and User C, and drops User B.
{{/partial:admonition}}

## Disconnect HubSpot from within Amplitude

To disconnect HubSpot from within Amplitude, follow these steps:

1. In Amplitude, navigate to *Data > Sources > HubSpot*.
2. Click the trash can icon.
3. Follow the instructions displayed in the confirmation modal that appears.
4. Click *Delete*.

Disconnecting HubSpot means new data sent from this source will no longer be processed. Historical data from HubSpot won’t be deleted and can still be analyzed.

## Uninstall Amplitude from a HubSpot account

To disconnect HubSpot from within Amplitude, follow these steps:

1. In HubSpot, navigate to *Reporting & Data > Integrations > Connected apps > Amplitude*.
2. Select *Uninstall* from the *Actions* dropdown.
3. Follow the instructions displayed in the confirmation modal that appears.
4. Click *Uninstall*.

This won’t delete any existing Amplitude data in HubSpot, but it will no longer be updated.

## Common issues

### User discrepancies between Amplitude and HubSpot

- Some destinations like HubSpot may return a 2XXs response indicating the cohort sync has synced successfully out from Amplitude. However sometimes, the 3rd party destination will silently drop users who don't meet their criteria, and this exclusion might not be communicated back to Amplitude. To check whether a user was successfully transferred, you can review the CSV file from Amplitude. While Amplitude strives to identify cases where users aren't included at third-party platforms by analyzing response codes, fully detecting every instance of silent user exclusion due to technical constraints may not always be achievable. If you encounter issues or have queries, check out this [guide](https://help.amplitude.com/hc/en-us/articles/360060055531-Sync-to-third-party-destinations) for more information on how you can investigate and diagnose cohort sync discrepancies in a self-serve manner.