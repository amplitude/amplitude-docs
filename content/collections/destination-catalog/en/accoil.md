---
id: 
blueprint: destination-catalog
title: 'Accoil (Event Stream)'
author: 
connection: destination
integration_type:
  - event-streaming
partner_maintained: false
integration_icon: partner-icons/accoil.svg
exclude_from_sitemap: false
updated_by: 
source: 'https://www.docs.developers.amplitude.com/data/destinations/accoil/'
updated_at: 1762739061
integration_category:
  - customer-engagement
---

Amplitude customers use Accoil to operationalize product data around **accounts**—not just users.

Accoil helps Customer Success, Support, Sales, and Marketing teams:

* Track **account health** in real time, based on product usage
* Monitor **engagement changes** across the customer base
* Identify **at-risk accounts** before churn happens
* Surface **product-qualified accounts** based on usage signals
* Power proactive workflows across the customer journey

With the Amplitude integration, account and user events stream directly into Accoil—no extra instrumentation required—keeping your account-level insights live and actionable.

***

## Setup

### Prerequisites

Before configuring the integration, make sure you have:

* An active **Accoil workspace**
* An **API Key** from your Accoil account

#### How to Get Your Accoil API Key

1. Log in to your **Accoil workspace**
2. Go to **Workspace > Settings > Account Settings > General**
3. Copy the **API Key** for the relevant product

***

## Create a New Sync in Amplitude

1. In **Amplitude** go to **Data**, go to **Catalog** and select the **Destinations** tab.
2. Under **Customer Engagement**,  select **Accoil**.
3. Enter a **Sync Name**, then click **Create Sync**.

***

## Enter Credentials

1. Paste your **Accoil API Key** into the input field.
2. Under **1. Select & filter events** select **All Events**
3. Click **Test Connection**.

   * Accoil will validate the connection.
   * ✅ If successful, data streaming can begin immediately.
   * ⏱ **Note:** After enabling the connection, it may take **1 to 2 minutes** for user events to appear in Accoil.
***

## Configure Sync Settings

### 1. Select & Filter Events

By default, **all events** in Amplitude are selected for forwarding.
This is the recommended setting, and we suggest keeping it enabled to maximize visibility into product usage across the user lifecycle.

You may optionally:

* Filter to include only events with a `User ID`
* Manually select specific event types to send

> ⚠️ Accoil requires events to include a valid **User ID** to process them correctly. Add filters if needed to exclude anonymous events.

***

### 2. Map Properties to Destination

You’ll need to map a unique user identifier from Amplitude to Accoil.

* **Amplitude Property:** Select the user property that uniquely identifies users in your product (e.g., `user_id`, `email`, or a custom ID)
* **Accoil Property:** This automatically maps to `userId`

This ensures all event data is associated with the correct user profile in Accoil.

***

### 3. Select Additional Properties (Optional)

Here you can specify **additional event or user properties** you want to send to Accoil. These will be included as metadata with each event.

* Use this to enrich the data available for segmentation, filtering, and targeting within Accoil.
* Examples:
  `trial_end`, `plan_type`, `api_key`, `api_token_id`, `status`

<Callout icon="💡" theme="default">
  ### Send any attributes that may be useful for building user cohorts, recipes, or dashboards—even if you’re not using them immediately.
</Callout>

***

## Finalize & Enable Sync

1. Review your configuration
2. Toggle the **Status** switch to **Enabled**
3. Click **Save**

Your Amplitude events will now stream to Accoil in real time.



***

# Mapping Group/Account Information to Accoil

When streaming events from Amplitude to Accoil, group-level data—such as account identifiers and associated metadata—is extracted from the Amplitude event payload and mapped into a structure that Accoil can process for account-level insights.

## Where group/account data comes from

Amplitude events can include:

* A `groups` object — identifies which group(s) the event is associated with (e.g. an `Account`)
* A `group_properties` object — contains metadata for each group (e.g. `domain`, `name`, or other custom traits)

These two fields are used together to determine which account (or group) each event belongs to and what traits should be attached to that account in Accoil.

***

### 1. Identifying groups in the event

If both `groups` and `group_properties` are present in the event, the mapping logic:

* Iterates through all group types (e.g. `Account`)
* Collects the group IDs under each type
* Retrieves associated metadata (traits) for each group ID from `group_properties`

This results in a list of candidate groups, each containing:

* `groupId` — the unique identifier for the group
* `traits` — metadata fields like `domain`, `name`, and any other relevant attributes

***

### 2. Selecting a primary group

If multiple groups are present, they are sorted by `groupId` (ascending), and the first group is selected as the _primary group_. This ensures consistency in how group data is attached to events.

> Most implementations use a single group type (e.g. `Account`) per event, so this logic typically results in the expected group being selected by default.

***

### 3. Mapping group traits into the Accoil payload

Once the primary group is selected, its identifier and metadata are formatted into the Accoil-compatible structure under the `groupTraits` field.

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

These traits are used in Accoil to:

* Enrich account profiles
* Support segmentation and cohort analysis
* Enable filtering and targeting within recipes and dashboards

***

### Summary

* Amplitude events must include both `groups` and `group_properties` to pass account-level data to Accoil
* A single group is selected per event, based on a predictable sort order
* Group metadata is included in the payload and used to build rich account-level context in Accoil

This mapping ensures account data is structured correctly for use across Accoil's segmentation, analytics, and activation workflows.