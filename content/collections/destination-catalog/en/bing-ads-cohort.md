---
id: 8f3c5e7a-9d2b-4f1e-a8c6-3b9d7e5f2a1c
blueprint: destination-catalog
use_cases:
  - "Sending cohorts from Amplitude to Bing Ads enables businesses to target specific groups of users on the Microsoft Advertising Network. By leveraging first-party behavioral data from Amplitude, organizations can create custom cohorts tailored to specific user segments—whether that's high-value customers, returning users, or those at risk of churning—and sync them directly to Bing Ads for precise audience targeting."
short_description: 'Send Amplitude cohorts to Bing Ads to create customer lists for more personalized campaigns on the Microsoft Advertising Network.'
integration_category:
  - ad-networks
integration_type:
  - cohorts
title: "Bing Ads (Cohort Sync)"
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/bing.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1730332800
---

Send Amplitude cohorts to Bing Ads to create customer lists for more personalized campaigns. This integration enables you to upload and sync behavioral cohorts directly to the Microsoft Advertising Network for campaign targeting.

## Considerations

- You should have an understanding of Amplitude Activation and behavioral cohorts before setting up this integration.
- You need a Microsoft Advertising account.
- Bing Ads customer match lists only support email as an identifier. You should already have identified an Amplitude user property that maps to a user's email address.
- Email addresses must be provided as plain text (not pre-hashed). Amplitude automatically hashes all email addresses using SHA-256 before sending them to Bing Ads.
- Bing Ads only ingests users that have an email identifier set. Users without valid email addresses are excluded from the sync.
- The list needs to have at least 300 people on the Microsoft Advertising Network in order for it to be eligible to serve.
- It may take up to 24 hours for a customer list to be fully populated with members after syncing from Amplitude.

## Setup

### Prerequisites

You need a [Microsoft Advertising account](https://ads.microsoft.com/).

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Bing Ads**.
3. Log into your Microsoft Advertising account (via OAuth) to authenticate and grant Amplitude permission to manage your audiences.
4. After you're redirected to the Amplitude dashboard, map your Bing Ads users to your Amplitude users. Configure the email property mapping to specify which Amplitude user property contains the email address.
5. When finished, save your work.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Bing Ads.
2. Select the destination.
3. Select the sync cadence.
4. Save your work.

{{partial:admonition type="note" title=""}}
For scheduled cohort syncs, only the initial sync will include the full cohort. All subsequent syncs will include only additions and removals since the last sync.
{{/partial:admonition}}

After you send your Amplitude cohort to Bing Ads, you can see it in the _Tools > Audiences_ section of the Microsoft Advertising dashboard. Cohorts sent by Amplitude include an `[Amplitude]` prefix in the name, formatted as: _[Amplitude] {cohort_name}: {cohort_id}_.

For example, a cohort named "High Value Users" with ID "abc123" will appear as: _[Amplitude] High Value Users: abc123_.

Keep in mind that it may take up to 24 hours to populate the list with the users.

## Common issues

### User discrepancies between Amplitude and Bing Ads

Some users may be excluded from the sync if they don't meet certain requirements:

- **Unresolved Mapping**: Users without an email property set in Amplitude
- **Partner Requirement Unmet**: Users with a malformed email (e.g. iloveamplitude.com)

#### Example

{{partial:admonition type="example" title=""}}
User A, User B, and User C are in the Amplitude cohort (Cohort 1). User A has a valid email (`user@example.com`), User B has no email property set, and User C has an invalid email (`invalid`). Bing Ads creates a customer list that includes only User A. User B is excluded with "Unresolved Mapping" and User C is excluded with "Partner Requirement Unmet".
{{/partial:admonition}}

To check whether a user was successfully transferred, you can review the CSV file from Amplitude. While Amplitude strives to identify cases where users aren't included at third-party platforms by analyzing response codes, fully detecting every instance of silent user exclusion due to technical constraints may not always be achievable. If you encounter issues or have queries, check out [this guide](https://help.amplitude.com/hc/en-us/articles/360060055531-Sync-to-third-party-destinations) for more information on how you can investigate and diagnose cohort sync discrepancies in a self-serve manner.

### Cohort name not updating in Bing Ads

Customer list names are set when the list is first created and cannot be updated through subsequent syncs. It is recommended to keep the cohort name unchanged.
