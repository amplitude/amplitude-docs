---
id: 539a49b4-601c-455a-acc3-5a0e3865ca34
blueprint: destination-catalog
title: 'Snowflake Data Share'
source: 'https://docs.developers.amplitude.com/data/destinations/snowflake-data-share'
category: Warehouse
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713811610
connection: destination
integration_category:
  - storage
integration_icon: partner-icons/snowflake.svg
---
Get access to your Amplitude events via Snowflake's Data Share product.

Amplitude supports [Snowflake’s Data Share](https://docs.snowflake.com/en/user-guide/data-sharing-intro.html) integration to give customers access to their event data that lives within Amplitude. Amplitude’s integration currently supports sharing a Raw Events table and a Merged ID table. 

{{partial:admonition type="info" title="Add-on feature"}}
Amplitude's Snowflake Data Share Export is a paid add on to your Amplitude contract.
{{/partial:admonition}}

## Limits

Snowflake only supports data share within same region and same cloud. Amplitude's Snowflake is in US West (Oregon) region and using Amazon Web Services. To enable cross region cross cloud data share, reach out to your Account Manager at Amplitude or contact Amplitude Support.

Amplitude supports only one Snowflake Data Share per project for events and merge user queries.

## Set up a recurring data export to Snowflake with Data Share

To set up a recurring export of your Amplitude data to Snowflake, follow these steps:

{{partial:admonition type="note" title="Required user permissions"}}
You need admin/manager privileges in Amplitude, as well as a role that allows you to enable resources in Snowflake.
{{/partial:admonition}}

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Warehouse Destinations section, click **Snowflake Data Share**.
3. Under *Access Data via Snowflake Data Share*, enter the following information:
      - **Account Name**: This is the account name on your Snowflake account. It's the first part of your Snowflake URL, after `https://` and before 'snowflakecomputing.com'. For example, if your Snowflake URL is `http://amplitude.snowflakecomputing.com`, then you should enter `amplitude`.
      - **Org Name**: This is the name of your Snowflake organization.
4. Choose which data to include in this export: *Raw events every 5 minutes*, *Merged IDs every hour*, or both. For events, you can also specify filtering conditions to only export events that meet certain criteria.
5. Click **Next**, enter the name of this Snowflake export and click Finish.

When complete, Amplitude sends all future events to Snowflake with Data Share.

### Backfill data

After the Share is set up between Amplitude and your Snowflake cluster, Amplitude only loads data from that point forward. To backfill historical data from a period before the connection, specify this in the request when setting up the share. 

{{partial:admonition type="warning" title="Data backfill incures extra cost"}}
Contact your Amplitude Account Manager for pricing.
{{/partial:admonition}}

## Remove Data Share from Amplitude

To remove the Amplitude data set made available through the Data Share,  reach out to your Account Manager at Amplitude or fill out a support request [here](https://help.amplitude.com/hc/en-us/requests/new).

## Snowflake export format

| Schema Name| Description      |
| ----------------------------------------- | ---------------- |
| `DB_{ORG_ID}`                             | Database         |
| `SCHEMA_{PROJECT_ID}`                     | Schema           |
| `EVENTS_{PROJECT_ID}`                     | Events Table     |
| `MERGE_IDS_{PROJECT_ID}`                  | Merge User Table |

### Event table schema

The **Event** table schema includes the following columns:

- `adid`
- `amplitude_event_type`
- `amplitude_id`
- `app`
- `city`
- `client_event_time`
- `client_upload_time`
- `country`
- `data`
- `device_brand`
- `device_carrier`
- `device_family`
- `device_id`
- `device_manufacturer`
- `device_model`
- `device_type`
- `dma`
- `event_id`
- `event_properties`
- `event_time`
- `event_type`
- `followed_an_identify`
- `group_properties`
- `groups`
- `idfa`
- `ip_address`
- `is_attribution_event`
- `language`
- `library`
- `location_lat`
- `location_lng`
- `os_name`
- `os_version`
- `paying`
- `platform`
- `processed_time`
- `region`
- `sample_rate`
- `server_upload_time`
- `session_id`
- `start_version`
- `user_creation_time`
- `user_id`
- `user_properties`
- `uuid`
- `version_name`
- `amplitude_attribution_ids`
- `server_received_time`
- `global_user_properties`
- `partner_id`
- `plan`
- `source_id`
- `data_type`

For more information, see the [Event Table Schema](/docs/data/destination-catalog/snowflake#event-table-schema) section of the Snowflake Export documentation.

### Merged User table schema

The Merged User table schema contains the following:  

- `amplitude_id`
- `merge_event_time`
- `merge_server_time`
- `merged_amplitude_id`

For more information,  see the [Merged User table schema](/docs/data/destination-catalog/snowflake#merged-user-table-schema) section of the Snowflake Export documentation.