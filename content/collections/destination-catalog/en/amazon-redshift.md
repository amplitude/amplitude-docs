---
id: 4a00b066-abc7-4ecf-8820-2ffd766d5832
blueprint: destination-catalog
title: 'Amazon RedShift'
source: 'https://docs.developers.amplitude.com/data/destinations/amazon-redshift'
category: Warehouse
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
integration_category:
  - data-warehouse-data-lake
partner_maintained: false
integration_icon: partner-icons/redshift.svg
use_cases:
  - "Leverage the power of Amazon Redshift's fast, fully managed, petabyte-scale data warehouse to analyze vast amounts of data quickly and easily. By ingesting events from Redshift into Amplitude, businesses can run and scale analytics in seconds on all their data without the need to manage complex data warehouse infrastructure, enabling seamless data analysis and driving growth strategies forward."
short_description: 'A fast, fully managed, petabyte-scale data warehouse that makes it simple and cost-effective to analyze all your data using your existing business intelligence tools.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479832
---
{{partial:admonition type="note" heading=""}}
Event filtering for warehouses isn't available in the EU region.
{{/partial:admonition}}

Upload your Amplitude event data into your Redshift account. You can set up recurring syncs through the Amplitude UI, as well as manually start a sync of your historical data.

## Limits

- Maximum running time for a single Redshift SQL query is 12 hours.

## Setup

### Prerequisites

You need admin privileges in Amplitude, and a role that allows you to enable resources in Redshift.

By default, Redshift clusters don't allow any incoming traffic.
You must first allowlist Amplitude's IP addresses in the security group for your Redshift cluster. For more help, see the [Redshift documentation](https://docs.aws.amazon.com/redshift/latest/mgmt/managing-vpc-security-groups.html). 

From the page for the security group associated with your Redshift cluster, add an inbound rule. For more detailed instructions, see the [Redshift Documentation](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules). 

To find the security group assigned to your Redshift cluster:

1. Navigate to your Redshift cluster. 
2. Go to the **Properties** tab, and use the link for **VPC security group** under *Network and security settings*.

    Add the following information:

    - **Protocol**: TCP
    - **Port Range**: The number of the open port used by the data source.
    - **Source**: Custom IP (default). Add the correct IP addresses based on whether you're using EU or US Amplitude data centers. 
        - Amplitude US IP addresses:
            - 52.33.3.219
            - 35.162.216.242
            - 52.27.10.221 
        - Amplitude EU IP addresses:
            - 3.124.22.25
            - 18.157.59.125
            - 18.192.47.195 
    - **Description**: A description for the rule. 

### Set up a recurring data export to Redshift

Creating a recurring data export is a three-step process. Each sync completes within five to ten minutes, and you can monitor the status of each job.

To set up a recurring export of your Amplitude data to Redshift, follow these steps:

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Warehouse Destinations section, click **Redshift**.
3. Under *Export Data to Redshift*, select the data you'd like to export. You can choose *Export events ingested today and moving forward*, *Export all merged Amplitude ID*, or both. For events, you can also specify filtering conditions to only export events that meet certain criteria.
4. Review the Event table and Merge IDs table schemas and click **Next**.
5. In the *Redshift Credentials For Amplitude* section, enter the following information:

     - **User**: The Redshift user account that Amplitude uses to connect to your Redshift instance.
     - **Password**: The password associated with the user.
     - **Database**: The database where the data should be exported to and stored. Amplitude recommends dedicating a database for Amplitude data.
     - **Cluster Host Address**: This is the address of the endpoint of the cluster that hosts your database.
     - **Port**: The port of the Cluster Host Address.  This may only contain digits. The default value is 5439.

6. Next to the credentials section, Amplitude dynamically creates the query it uses to create Redshift objects. To copy it to the clipboard, click **Copy**. You can now paste it into the Redshift CLI.
7. Click **Next**. Amplitude attempts to upload test data using the credentials you entered. If the upload is successful, click **Finish**.

All future events are automatically sent to Redshift.

From here, Amplitude generates micro-batch files at five-minute intervals and loads them to customer-owned Redshift accounts directly every 10 minutes. You can see the data in your Redshift accounts within 20 minutes after Amplitude receives the events.

## Export historical Amplitude data to Redshift

To export your historical data from Amplitude into Redshift, navigate to the *Backfills* tab, select a date range, and click **Start Backfill**.

This process can take anywhere from a single day to several weeks, depending on your data volume, warehouse size, cluster count, network bandwidth, and number of concurrent historical data exports you currently have, among other factors.

If the backfill range overlaps with the range of previously exported data, Amplitude will de-duplicate overlapping data.

## Redshift export format

The **Event** table schema includes the following columns:

| <div class="big-column">Column</div>| Type | Description |
|---|---|---|
| `Adid` | String | (Android) Google Play Services advertising ID (ADID). Example: AEBE52E7-03EE-455A-B3C4-E57283966239 |
| `amplitude_event_type` | VARCHAR(1677721) | Amplitude specific identifiers based on events Amplitude generates. This is a legacy field so `event_type` should suffice for all queries  |
| `amplitude_id` | BIGNUMERIC | The original Amplitude ID for the user. Use this field to automatically handle merged users. Example: 2234540891 |
| `app` | INT64 | Project ID found in your project's Settings page. Example: 123456 |
| `city` | STRING | City | “San Francisco” |
| `client_event_time` | TIMESTAMP | Local timestamp (UTC) of when the device logged the event. Example: `2015-08-10T12:00:00.000000` |
| `client_upload_time` | TIMESTAMP | The local timestamp (UTC) of when the device uploaded the event. Example: `2015-08-10T12:00:00.000000` |
| `country` | STRING | Country. Example: "United States" |
| `data` | SUPER | Dictionary that stores certain fields such as `first_event` and `merged_amplitude_id`. |   |
| `device_brand` | STRING | Device brand. Example: Apple |
| `device_carrier` | STRING | Device Carrier. Example: Verizon |
| `device_family` | STRING | Device family. Example: Apple iPhone |
| `device_id` | STRING | The device specific identifier. Example: C8F9E604-F01A-4BD9-95C6-8E5357DF265D |
| `device_manufacturer` | STRING | Device manufacturer. Example: Apple |
| `device_model` | STRING | Device model. Example: iPad Mini |
| `device_type` | STRING | Device type. Example: Apple iPhone 5s |
| `dma` | STRING | Designated marketing area (DMA). Example; San Francisco-Oakland-San Jose, CA |
| `event_id` | INT64 | A counter that distinguishes events. Example: 1 |
| `event_properties` | SUPER |    |
| `event_time` | TIMESTAMP | Amplitude timestamp (UTC) which is the `client_event_time` adjusted by the difference between `server_received_time` and `client_upload_time`, specifically: `event_time` = `client_event_time` + (`server_received_time` - `client_upload_time`)   Amplitude uses this timestamp to organize events on Amplitude charts. NOTE: If the difference between `server_received_time` and `client_upload_time` is less than 60 seconds, the `event_time` isn't adjusted and is equal to the `client_event_time`. Example: `2015-08-10T12:00:00.000000` |
| `event_type` | STRING |    |
| `followed_an_identify` | BOOL | True if there was an identify event between this current SDK event and the last SDK event seen. Example: `True` |
| `group_properties` | SUPER |    |
| `groups` | SUPER | Group types. See the Accounts documentation for more information.   |
| `idfa` | STRING | (iOS) Identifier for Advertiser. Example: AEBE52E7-03EE-455A-B3C4-E57283966239 |
| `ip_address` | STRING | IP address. Example: "123.11.111.11" |
| `is_attribution_event` | BOOL |     |
| `language` | STRING |     |
| `library` | STRING |     |
| `location_lat` | FLOAT64 | Latitude. Example: 12.3456789 |
| `location_lng` | FLOAT64 | Longitude. Example: -123.4567890 |
| `os_name` | STRING | OS name. Example: `ios` |
| `os_version` | STRING | OS version. | 1.0 |
| `paying` | STRING | True if the user has ever logged any revenue, otherwise (none). You can modify The property value via the Identify API. Example: true |
| `platform` | STRING |    |
| `processed_time` | TIMESTAMP |    |
| `region` | STRING | Region. Example: California |
| `sample_rate` | BIGNUMERIC |    |
| `server_received_time` | TIMESTAMP |    |
| `server_upload_time` | TIMESTAMP | Amplitude timestamp (UTC) of when Amplitude servers received the event. Example:  `2015-08-10T12:00:00.000000` |
| `session_id` | BIGNUMERIC | The session start time in milliseconds since epoch. Example: 1396381378123 |
| `start_version` | STRING | App version the user was first tracked on. Example: 1.0.0 |
| `user_id` | STRING | A readable ID specified by you. This should be something that doesn't change; for that reason, using the user's email address isn't recommended.  |
| `user_properties` | SUPER |    |
| `uuid` | STRING | A unique identifier per row (event sent). Example: bf0b9b2a-304d-11e6-934f-22000b56058f |
| `version_name` | STRING | The app version. Example: 1.0.0 |

### Merged User table schema

The Merged User table schema contains the following:  

| <div class="big-column">Column</div> |Type| Description  |
|---|---|---|
| `amplitude_id`| NUMBER(38,0) | The Amplitude ID being merged into a user's original Amplitude ID.  |
| `merge_event_time` |TIMESTAMP | The time of the event a user's new Amplitude ID was associated with their original Amplitude ID.  |
| `merge_server_time` | TIMESTAMP | The server time of the event when a user's new Amplitude ID was associated with their original Amplitude ID. |
| `merged_amplitude_id` | NUMBER(38,0) | The originally assigned Amplitude ID when the user is first created.  |

## Common errors and solutions

When exporting data to Redshift, you may encounter some common errors. Below are a running list of the errors and their associated solutions.

### String length exceeded DDL error

This error occurs when the length of a string exceeds the maximum allowed length defined in the table schema. To avoid this error, please ensure that the data being exported conforms to the schema definitions.

**Solution:**
1. **Validate Data Length:** Before exporting data, validate the length of string fields to ensure they don't exceed the maximum allowed length.
2. **Adjust Schema:** If necessary, adjust the schema to accommodate longer strings by increasing the length of the VARCHAR fields.
