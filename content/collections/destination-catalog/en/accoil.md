---
id: 3cd45c2f-5f47-4c44-a2f4-df1395935d51
blueprint: destination-catalog
title: 'Accoil (Event Stream)'
connection: destination
integration_type:
  - event-streaming
partner_maintained: false
integration_icon: partner-icons/accoil.svg
exclude_from_sitemap: false
source: 'https://www.docs.developers.amplitude.com/data/destinations/accoil/'
updated_at: 1762739061
integration_category:
  - customer-engagement
---

Amplitude customers use Accoil to operationalize product data around **accounts**, not just users.

Accoil helps Customer Success, Support, Sales, and Marketing teams:

* Track **account health** in real time based on product usage
* Monitor **engagement changes** across the customer base
* Identify **at-risk accounts** before churn happens
* Surface **product-qualified accounts** based on usage signals
* Power proactive workflows across the customer journey

With the Amplitude integration, account and user events stream directly into Accoil without extra instrumentation, keeping your account-level insights live and actionable.


## Setup

Before configuring the integration, make sure you have:

* An active **Accoil workspace**
* An **API Key** from your Accoil account

### Get your Accoil API key

1. Log in to your **Accoil workspace**.
2. Go to **Workspace > Settings > Account Settings > General**.
3. Copy the **API Key** for the relevant product.


## Create a new sync in Amplitude

1. In **Amplitude**, go to **Data**, go to **Catalog**, and select the **Destinations** tab.
2. Under **Customer Engagement**, select **Accoil**.
3. Enter a **Sync Name**, then select **Create Sync**.


## Enter credentials

1. Paste your **Accoil API Key** into the input field.
2. Under **1. Select & filter events**, select **All Events**.
3. Select **Test Connection**.

   * Accoil validates the connection.
   * ✅ If successful, data streaming can begin immediately.
   
   {{partial:admonition type="note" heading=""}}
   After you enable the connection, it may take one to two minutes for user events to appear in Accoil.
   {{/partial:admonition}}

## Configure sync settings

### Select and filter events

By default, Amplitude selects **all events** for forwarding.
Keep this setting enabled to maximize visibility into product usage across the user lifecycle.

You may optionally:

* Filter to include only events with a `User ID`
* Manually select specific event types to send

{{partial:admonition type="warning" heading=""}}
Events must include a valid **User ID** for Accoil to process them correctly. Add filters if needed to exclude anonymous events.
{{/partial:admonition}}

### Map properties to destination

Map a unique user identifier from Amplitude to Accoil.

* **Amplitude Property:** Select the user property that uniquely identifies users in your product (for example, `user_id`, `email`, or a custom ID)
* **Accoil Property:** This automatically maps to `userId`

This ensures all event data is associated with the correct user profile in Accoil.


### Select additional properties (optional)

Specify **additional event or user properties** to send to Accoil. Amplitude includes these as metadata with each event.

* Use these properties to enrich the data available for segmentation, filtering, and targeting within Accoil.
* Examples:
  `trial_end`, `plan_type`, `api_key`, `api_token_id`, `status`

{{partial:admonition type="tip" heading=""}}
Send any attributes that may be useful for building user cohorts, recipes, or dashboards—even if you aren't using them immediately
{{/partial:admonition}}


## Finalize and enable sync

1. Review your configuration.
2. Toggle the **Status** switch to **Enabled**.
3. Select **Save**.

Your Amplitude events now stream to Accoil in real time.


## Map group and account information to Accoil

When you stream events from Amplitude to Accoil, Amplitude extracts group-level data (such as account identifiers and associated metadata) from the Amplitude event payload and maps it into a structure that Accoil can process for account-level insights.

## Where group and account data comes from

Amplitude events can include:

* A `groups` object that identifies which groups the event is associated with (for example, an `Account`)
* A `group_properties` object that contains metadata for each group (for example, `domain`, `name`, or other custom traits)

Amplitude uses these two fields together to determine which account (or group) each event belongs to and what traits to attach to that account in Accoil.


### Identify groups in the event

If both `groups` and `group_properties` are present in the event, the mapping logic:

* Iterates through all group types (for example, `Account`)
* Collects the group IDs under each type
* Retrieves associated metadata (traits) for each group ID from `group_properties`

This results in a list of candidate groups, each containing:

* `groupId`: the unique identifier for the group
* `traits`: metadata fields like `domain`, `name`, and any other relevant attributes


### Select a primary group

If multiple groups are present, Amplitude sorts them by `groupId` (ascending) and selects the first group as the _primary group_. This ensures consistency in how group data is attached to events.


{{partial:admonition type="note" heading=""}}
Most implementations use a single group type (for example, `Account`) per event, so this logic typically results in the expected group being selected by default.
{{/partial:admonition}}


### Map group traits into the Accoil payload

After you select the primary group, Amplitude formats its identifier and metadata into the Accoil-compatible structure under the `groupTraits` field.

For example:

```json
"groupTraits": [
  {
    "groupId": "210000",
    "traits": {
      "domain": "accoil.com",
      "group_type": "Account",
      "name": "Released Import Test"
    }
  }
]
```

Accoil uses these traits to:

* Enrich account profiles
* Support segmentation and cohort analysis
* Enable filtering and targeting within recipes and dashboards


### Summary

* Amplitude events must include both `groups` and `group_properties` to pass account-level data to Accoil
* Amplitude selects a single group per event based on a predictable sort order
* Amplitude includes group metadata in the payload to build rich account-level context in Accoil

This mapping ensures Accoil structures account data correctly for use across its segmentation, analytics, and activation workflows.