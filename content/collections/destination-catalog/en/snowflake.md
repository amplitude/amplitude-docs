---
id: c68f8956-b5b9-4e55-b55e-695b2c68840b
blueprint: destination-catalog
use_cases:
  - "Receiving events from Amplitude to Snowflake facilitates the integration of Amplitude's event data into Snowflake's cloud-based data warehousing platform. This integration allows businesses to centralize their data storage and analysis, leveraging Snowflake's scalable architecture and advanced analytics capabilities. By setting up recurring syncs through the Amplitude UI, organizations can ensure that their Snowflake data is continuously updated with the latest Amplitude events, providing real-time insights into user behavior and engagement patterns."
  - "Sending events from Snowflake to Amplitude streamlines the process of exporting data from Snowflake directly into Amplitude for further analysis and visualization. This integration enables organizations to preprocess and manipulate their data within Snowflake before sending it to Amplitude, enhancing data quality and accuracy. Businesses can leverage Snowflake's powerful querying and transformation capabilities to perform complex data operations and derive valuable insights, which can then be utilized within Amplitude to drive informed decision-making and personalized user experiences."
short_description: 'Snowflake makes it easy to amass all your data, enable rapid analytics, and derive data-driven insights for all your business users.'
integration_category:
  - data-warehouse-data-lake
integration_type:
  - merged-users-ids
  - merged-user-ids
  - raw-events
partner_doc_link: 'https://app.snowflake.com/marketplace/providers/GZSNZQLF0/Amplitude?search=amplitude'
title: Snowflake
source: 'https://docs.developers.amplitude.com/data/destinations/snowflake'
category: Warehouse
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/snowflake.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713812264
---
Load your Amplitude event data into your Snowflake account. You can set up recurring syncs through the Amplitude UI, as well as manually start a sync of your historical data.

## Considerations

- Depending on your company's network policy, you may need add these IP addresses to your allowlist in order for Amplitude's servers to access your Snowflake instance:

    - Amplitude US IP addresses:
        - 52.33.3.219
        - 35.162.216.242
        - 52.27.10.221 
    - Amplitude EU IP addresses:
        - 3.124.22.25
        - 18.157.59.125
        - 18.192.47.195

## Limits

- Maximum running time for a single Snowflake SQL query is 12 hours.

## Set up a recurring data export to Snowflake

Creating a recurring data export is a simple, three-step process you can handle yourself. Each sync completes within five to ten minutes, though often it's much closer to real time. 
This method also lets you watch jobs.

To set up a recurring export of your Amplitude data to Snowflake, follow these steps:

{{partial:admonition type="note" heading="Required user permissions"}}
You need admin/manager privileges in Amplitude, as well as a role that allows you to enable resources in Snowflake.
{{/partial:admonition}}

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Warehouse Destinations section, click **Snowflake**.
3. Under *Export Data to Snowflake*, choose which data you'd like to include in this export: *Export events ingested today and moving forward*, *Export all merged Amplitude IDs*, or export both. For events, you can also specify filtering conditions to only export events that meet certain criteria.
4. Review the Event table and Merge IDs table schemas and click **Next**.
5. In the *Snowflake Credentials For Amplitude* section, enter the following information:

   - **Account Name**: This is the account name on your Snowflake account. It's the first part of your Snowflake URL, before 'snowflakecomputing.com'.
   - **Warehouse**: The warehouse Amplitude uses to load the data. For best results, this should be a warehouse dedicated to loading Amplitude data to ensure other Snowflake operations aren't disrupted.
   - **Database**: The database where Amplitude stores data. Dedicate this database specifically to Amplitude data.
   - **Role**: The role that the connection uses to write this data. The default value of role is `AMPLITUDE` only.
   - **Username**: The username Amplitude uses to connect to the Snowflake account.
      
    Amplitude offers password-based and key pair authentication for Snowflake. 

    {{partial:admonition type="warning" heading=""}}
    If you use password-based authentication, note that your password is case-sensitive.
    {{/partial:admonition}}

    If you want to use password authentication, select the **Password** option and then enter your password in the **Password** field. If you want to use key pair authentication, select the **Key pair** option and then click **Generate Key**. 
    To use key pair authentication, provide the organization and account names in the format `ORGNAME-ACCOUNTNAME`.

    {{partial:admonition type="tip" heading=""}}
    When using key pair authentication, you must use the format `ORGNAME-ACCOUNTNAME`. Without this specific format, Snowflake will generate a `JWT token is invalid` error.
    {{/partial:admonition}}
   

6. Copy the autogenerated SQL query and run it in Snowflake to give Amplitude the proper permissions.         
7. Click **Next**. Amplitude attempts to upload test data using the credentials you entered. If the upload is successful, click **Finish**.

All future events are automatically sent to Snowflake.

From here, Amplitude generates micro-batch files at five-minute intervals and loads them to customer-owned Snowflake accounts directly every 10 minutes. 
You are able to see the data in your Snowflake accounts within 20 minutes after Amplitude receives the events.

## Export historical Amplitude data to Snowflake

To export your historical data from Amplitude into Snowflake, navigate to the integration, then click **Export Data** and select a date range.


This process can take anywhere from a single day to several weeks. It depends on your data volume, warehouse size, cluster count, network bandwidth, and number of concurrent historical data exports you currently have, among other factors.

## Reduce your Snowflake computation costs

If you are looking to reduce the Snowflake computation costs when receiving data from Amplitude, try these methods:

{{partial:admonition type="note" title=""}}
The effectiveness of these recommendations depends on the frequency with which you export to your Snowflake instance.
{{/partial:admonition}}

- Modify warehouse **size** and **number of clusters**. For shorter export cadences (15 to 30 minutes), try starting with `xsmall` or `small`. Then upgrade as needed.
- When backfilling data into Snowflake, start with a small warehouse and upgrade as needed.
- You can also try reducing the auto suspend time to 60s. This option might not be available within the Snowflake UI, but can be manually set via direct Snowflake query.

## Snowflake export format

### Event table schema

The **Event** table schema includes the following columns:
<!--vale off -->
| Column | Type          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `amplitude_attribution_ids`          | ARRAY         | Hashed attribution ids on the event                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `amplitude_id`                       | NUMBER        | The original Amplitude ID for the user. Use this field to automatically handle merged users. Example: 2234540891                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `app`                                | NUMBER        | Project ID found in your project's Settings page. Example: 123456                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `city`                               | VARCHAR       | City. Example: “San Francisco”                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `client_event_time`                  | TIMESTAMP_NTZ | Local timestamp (UTC) of when the device logged the event. Example: `2015-08-10T12:00:00.000000`                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `client_upload_time`                 | TIMESTAMP_NTZ | The local timestamp (UTC) of when the device uploaded the event. Example: `2015-08-10T12:00:00.000000`                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `country`                            | VARCHAR       | Country. Example: "United States"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `data`                               | VARIANT       | Dictionary where certain fields such as `first_event` and `merged_amplitude_id` are stored                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `device_carrier`                     | VARCHAR       | Device Carrier. Example: Verizon                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `device_family`                      | VARCHAR       | Device family. Example: Apple iPhone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `device_id`                          | VARCHAR       | The device specific identifier. Example: C8F9E604-F01A-4BD9-95C6-8E5357DF265D                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `device_type`                        | VARCHAR       | Device type. Example: Apple iPhone 5s                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `dma`                                | VARCHAR       | Designated marketing area (DMA). Example; San Francisco-Oakland-San Jose, CA                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `event_id`                           | NUMBER        | A counter that distinguishes events. Example: 1                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `event_properties`                   | VARIANT       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `event_time`                         | TIMESTAMP_NTZ | Amplitude timestamp (UTC) which is the `client_event_time` adjusted by the difference between `server_received_time` and `client_upload_time`, specifically: `event_time` = `client_event_time` + (`server_received_time` - `client_upload_time`)   Amplitude uses this timestamp is used to organize events on Amplitude charts. NOTE: If the difference between server_received_time and client_upload_time is less than 60 seconds, the `event_time` isn't adjusted and equals the `client_event_time`. Example: `2015-08-10T12:00:00.000000` |
| `event_type`                         | VARCHAR       | Event type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `group_properties`                   | VARIANT       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `groups`                             | VARIANT       | Group types. See the Accounts documentation for more information.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `ip_address`                         | VARCHAR       | IP address. Example: "123.11.111.11"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `language`                           | VARCHAR       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `library`                            | VARCHAR       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `location_lat`                       | FLOAT         | Latitude. Example: 12.3456789                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `location_lng`                       | FLOAT         | Longitude. Example: -123.4567890                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `os_name`                            | VARCHAR       | OS name. Example: ios                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `os_version`                         | VARCHAR       | OS version.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `paying`                             | VARCHAR       | True if the user has ever logged any revenue, otherwise (none).   Note: The property value can be modified via the Identify API. Example: true                                                                                                                                                                                                                                                                                                                                                                                                   |
| `platform`                           | VARCHAR       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `processed_time`                     | TIMESTAMP_NTZ |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `region`                             | VARCHAR       | Region. Example: California                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `sample_rate`                        | NUMBER        |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `server_received_time`               | TIMESTAMP_NTZ |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `server_upload_time`                 | TIMESTAMP_NTZ | Amplitude timestamp (UTC) of when Amplitude servers received the event. Example:  `2015-08-10T12:00:00.000000`                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `session_id`                         | NUMBER        | The session start time in milliseconds since epoch. Example: 1396381378123                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `start_version`                      | VARCHAR       | App version the user was first tracked on. Example: 1.0.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `user_id`                            | VARCHAR       | A readable ID specified by you. Should be something that doesn't change; for that reason, using the user's email address isn't recommended.                                                                                                                                                                                                                                                                                                                                                                                                      |
| `user_properties`                    | VARIANT       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `uuid`                               | VARCHAR       | A unique identifier per row (event sent). Example: bf0b9b2a-304d-11e6-934f-22000b56058f                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `version_name`                       | VARCHAR       | The app version. Example: 1.0.0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

<!-- vale on-->

### Merged User table schema

The Merged User table schema contains the following:  

| Column | Type         | Description                                                                                                  |
| ------------------------------------ | ------------ | ------------------------------------------------------------------------------------------------------------ |
| `amplitude_id`                       | NUMBER(38,0) | The Amplitude ID being merged into a user's original Amplitude ID.                                           |
| `merge_event_time`                   | TIMESTAMP    | The time of the event a user's new Amplitude ID was associated with their original Amplitude ID.             |
| `merge_server_time`                  | TIMESTAMP    | The server time of the event when a user's new Amplitude ID was associated with their original Amplitude ID. |
| `merged_amplitude_id`                | NUMBER(38,0) | The originally assigned Amplitude ID when the user is first created.                                         |
