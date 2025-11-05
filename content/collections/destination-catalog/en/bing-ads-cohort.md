---
id: 8f3c5e7a-9d2b-4f1e-a8c6-3b9d7e5f2a1c
blueprint: destination-catalog
use_cases:
  - "Send cohorts from Amplitude to Bing Ads to target specific groups of users on the Microsoft Advertising Network. Leverage first-party behavioral data from Amplitude to create custom cohorts tailored to specific user segments—whether that's high-value customers, returning users, or those at risk of churning—and sync them directly to Bing Ads for precise audience targeting."
short_description: 'Send Amplitude cohorts to Bing Ads to create customer lists for more personalized campaigns on the Microsoft Advertising Network.'
integration_category:
  - ad-networks
integration_type:
  - cohorts
title: 'Bing Ads (Cohort Sync)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/ms-ads.svg
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1762300317
---
Send Amplitude cohorts to Bing Ads to create customer lists for more personalized campaigns. This integration enables you to upload and sync behavioral cohorts directly to the Microsoft Advertising Network for campaign targeting.

## Considerations

- You need a Microsoft Advertising account.
- Bing Ads customer match lists only support email as an identifier. Identify an Amplitude user property that maps to a user's email address before you set up the integration.
- Provide email addresses as plain text or a hashed string (using the SHA-256 algorithm). Amplitude automatically hashes plain text email addresses using SHA-256 before sending them to Bing Ads.
- Bing Ads only ingests users that have an email identifier set. The sync excludes users without valid email addresses.
- The list needs at least 300 people on the Microsoft Advertising Network to be eligible to serve.
- Customer lists can take up to 24 hours to populate with members after syncing from Amplitude.

## Setup

### Prerequisites

You need a [Microsoft Advertising](https://ads.microsoft.com/) account.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the **Cohort** section, click **Bing Ads**.
3. Log into your Microsoft Advertising account (through OAuth) to authenticate and grant Amplitude permission to manage your audiences.
4. After Amplitude redirects you to the dashboard, configure the email property mapping to specify which Amplitude user property contains the email address.
5. Save your work.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose Bing Ads.
2. Select the destination.
3. Select the sync cadence.
4. Save your work.

{{partial:admonition type="note" title=""}}
For scheduled cohort syncs, only the initial sync includes the full cohort. Subsequent syncs include only additions and removals since the last sync.
{{/partial:admonition}}

After you send your Amplitude cohort to Bing Ads, you can view it in the **Tools** > **Audiences** section of the Microsoft Advertising dashboard. Amplitude adds an `[Amplitude]` prefix to cohort names in this format: _[Amplitude] {cohort_name}: {cohort_id}_.

For example, a cohort named "High Value Users" with ID "abc123" appears as: _[Amplitude] High Value Users: abc123_.

Lists can take up to 24 hours to populate with users.

## Common issues

### User discrepancies between Amplitude and Bing Ads

The sync may exclude some users if they don't meet certain requirements:

- **Unresolved mapping**: Users without an email property set in Amplitude
- **Partner requirement unmet**: Users with a malformed email (for example, `iloveamplitude.com`)

#### Example

{{partial:admonition type="example" title=""}}
User A, User B, and User C are in the Amplitude cohort (Cohort 1). User A has a valid email (`user@example.com`), User B has no email property set, and User C has an invalid email (`invalid`). Amplitude excludes User B with "Unresolved mapping" and User C with "Partner requirement unmet." Bing Ads creates a customer list that includes only User A.
{{/partial:admonition}}

To check whether Amplitude successfully transferred a user, review the CSV file from Amplitude. Amplitude identifies cases where users aren't included at third-party platforms by analyzing response codes. However, technical constraints may prevent fully detecting every instance of silent user exclusion. If you encounter issues or have questions, review [this guide](/docs/data/audiences/third-party-syncs) for more information about how you can investigate and diagnose cohort sync discrepancies.

### Cohort name doesn't update in Bing Ads

Bing Ads sets customer list names when it first creates the list and can't update them through subsequent syncs. Keep the cohort name unchanged.
