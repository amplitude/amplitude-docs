---
id: 13a22669-5b4e-4d55-b942-3b842ad48b56
blueprint: source-catalog
use_cases:
  - "Receiving events from Amplitude to Snowflake facilitates the integration of Amplitude's event data into Snowflake's cloud-based data warehousing platform. This integration allows businesses to centralize their data storage and analysis, leveraging Snowflake's scalable architecture and advanced analytics capabilities. By setting up recurring syncs through the Amplitude UI, organizations can ensure that their Snowflake data is continuously updated with the latest Amplitude events, providing real-time insights into user behavior and engagement patterns."
  - "Sending events from Snowflake to Amplitude streamlines the process of exporting data from Snowflake directly into Amplitude for further analysis and visualization. This integration enables organizations to preprocess and manipulate their data within Snowflake before sending it to Amplitude, enhancing data quality and accuracy. Businesses can leverage Snowflake's powerful querying and transformation capabilities to perform complex data operations and derive valuable insights, which can then be utilized within Amplitude to drive informed decision-making and personalized user experiences."
short_description: 'Snowflake makes it easy to amass all your data, enable rapid analytics, and derive data-driven insights for all your business users.'
integration_category:
  - data-warehouse-data-lake
integration_type:
  - raw-events
  - group-properties
  - user-properties
partner_doc_link: 'https://app.snowflake.com/marketplace/providers/GZSNZQLF0/Amplitude?search=amplitude'
title: 'Snowflake Data Import'
source: 'https://www.docs.developers.amplitude.com/data/sources/snowflake/'
category: Warehouse
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/snowflake.svg
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1726777780
---
With Amplitude's Snowflake integration, you can ingest Snowflake data directly into your Amplitude project. The integration supports four strategies to import your Snowflake data, depending on the data types you select.

{{partial:admonition type="note" heading="Amplitude regional IP addresses"}}
Depending on your company's network policy, you may need to add these IP addresses to your allowlist in order for Amplitude's servers to access your Snowflake instance:

| Region | IP Addresses                                    |
| ------ | ----------------------------------------------- |
| US     | `52.33.3.219`, `35.162.216.242`, `52.27.10.221` |
| EU     | `3.124.22.25`, `18.157.59.125`, `18.192.47.195` |

{{/partial:admonition}}

## Limits

- Maximum running time for a single Snowflake SQL query is 12 hours.
- Max batch size for a single Snowflake SQL query is 1B events. 

{{partial:admonition type="warning" title="User and Group properties sync"}}
Amplitude's Data Warehouse Import sometimes processes events in parallel, so time-ordered syncing of user and group properties on events isn't guaranteed in the same way as submitting events directly to the Identify and Group Identify APIs. 
{{/partial:admonition}}

{{partial:admonition type="note" heading="Long running queries"}}
To ensure your import queries aren’t canceled, Amplitude sets `ABORT_DETACHED_QUERY = FALSE` at the session level.
{{/partial:admonition}}

## Add and configure the Snowflake source

Complete the following steps to configure the Snowflake source:

1. [Set up and verify the connection](#set-up-and-verify-the-connection)
2. [Select data](#select-data)
3. [Select the import strategy](#select-the-import-strategy)
4. [Map your data](#map-your-data)
5. [Schedule your sync](#schedule-your-sync)

### Set up and verify the connection

To add Snowflake as a data source in your Amplitude project, follow these steps:

1. In Amplitude Data, navigate to *Catalog → Sources*.
2. In the Warehouse Sources section, click *Snowflake*.
3. Enter the required credentials for the Snowflake instance you want to connect:

    - **Account**: Snowflake account identifier. Case sensitive. This is the first part of your Snowflake URL, before `snowflakecomputing.com`. Don't include ".snowflakecomputing.com" in your account name.
    - **Database**: Name of the database where Amplitude can find the data.
    - **Warehouse**: Used by Amplitude to execute SQL.
    - **Username**: Used by Amplitude for authentication.
    - **Password**: Used by Amplitude for authentication.

   Amplitude offers password-based and key pair authentication for Snowflake.

    - If you want to use password authentication, select *Password* and enter your password in the *Password* field.
    - If you want to use key pair authentication, select *Key pair* and then click *Generate Key*. Then provide the organization and account names in the format `ORGNAME-ACCOUNTNAME`.

4. **(Optional)** Configure S3 Storage Integration with Stage for Snowflake **(Open Beta)**: You can set up a storage integration with stage to provide an additional layer of security when Amplitude accesses your Snowflake data. For more information, review Snowflake's [Snowflake storage integration](https://docs.snowflake.com/en/user-guide/data-load-s3-config-storage-integration) documentation.

5. Copy the autogenerated SQL query and run it in Snowflake to give Amplitude the proper permissions.

6. After running the query, click *Next* to test the connection.

7. After the test succeeds, click *Next* again to move on to the data selection stage.

### Select the data type

The data type you select defines the strategies and settings available to you for configuration.

| Data Type        | Description                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Event            | Includes user actions associated with either a user ID or a device ID and may also include event properties.                                                             |
| User Properties  | Includes dictionaries of user attributes you can use to segment users. Each property is associated with a user ID.                                                       |
| Group Properties | Includes dictionaries of group attributes that apply to a a group of users. Each property is associated with a group name.                                               |
| Profiles         | Includes dictionaries of properties that relate to a user profile. Profiles display the most current data synced from your warehouse, and are associated with a user ID. |

### Select the import strategy

Select from the following strategies, depending on your data type selection. 

| Strategy         | Description                                                                                                                                                                                                                                                             |
|------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Full Sync        | Ingests the entire dataset on a defined schedule. This option is useful for datasets that change over time, but can't show which rows change.                                                                                                                      |
| Timestamp        | Ingests the most recent rows on a schedule, as determined by the Timestamp column.                                                                                                                                                                                      |
| Append Only Sync | Ingests the most recent rows of data on a schedule, as determined by Snowflake's Change Data Capture feature. This method supports all of Amplitude's out-of-the-box enrichment services.                                                                                      |
| Mirror Sync      | Directly mirror the data in your warehouse with insert, update, and delete operations. This deactivates Amplitude's enrichment services (user property syncing, group property syncing, taxonomy validation) for this data to remain in sync with your source of truth. |

See the following table to understand which data types are compatible with which import strategies.

| Data type        | Supported import strategies              |
|------------------|------------------------------------------|
| Event            | Mirror Sync, Append Only Sync, Timestamp |
| User properties  | Full Sync, Timestamp                     |
| Group Properties | Full Sync, Timestamp                     |
| Profiles         | Mirror Sync                              |

{{partial:admonition type="note" heading="Change Data Capture options"}}
For the `Event` data type, the Sync Strategies support configuration of the CDC feed type. 

Select *Append Only Sync* to ingest from your warehouse and include Amplitude's enrichment services like ID Resolution, property and attribution syncing, and location resolution.

Select *Mirror Sync* to mirror your Snowflake data with support for `insert`, `update`, and `delete` operations. This option deactivates Amplitude's enrichment services to ensure you remain in sync with your source-of-truth.

*Mirror Sync* also supports Data Mutability settings. Select which options to enable, `update` or `delete`. `insert` operations are always on.
{{/partial:admonition}}

### Map your data

Depending on the import strategy you choose, either map your data with a SQL statement to transform the data (Timestamp, Full Sync) or use the data selection tool to map column names directly to Amplitude properties.

For the `Event` data type and Append-Only or Timestamp Ingestion, optionally select *Sync User Properties* or *Sync Group Properties* to sync the corresponding properties **within** an event.

### Schedule your sync

Provide a name for the source, and set the frequency with which Amplitude imports your data. Daily syncs can run at  a specific hour in the day. Weekly and Monthly syncs can run at a specific day and hour.

## Choose the best integration for your use case

When choosing an integration strategy, consider the following:

- **Full Sync**: Choose this option if you need to periodically ingest the entire dataset and can't track which rows have changed. This method is best for smaller datasets where tracking incrementally isn't possible. This method isn't suitable for large datasets due to the overhead required to ingest all data each time.

- **Timestamp Import**: Choose this option if you can incrementally import data using a monotonically increasing timestamp column that indicates when records when Snowflake loads the records. This is efficient and works well when you append new data with timestamps.

- **Append Only Sync**: Choose this option to import data based on changes detected by Snowflake's CDC feature while still using Amplitude's enrichment services. This method only supports reading `INSERT` operations from the CDC

- **Mirror Sync**: Choose this option to directly mirror the data in Snowflake with `INSERT`, `UPDATE`, and `DELETE` operations based on changes detected by Snowflake's CDC feature. This method disables enrichment services to keep a mirror of Snowflake data in Amplitude. `UPDATE` and `DELETE` operations mutate data in Amplitude.

{{partial:partials/data/snowflake-strat-comp}}

## Prerequisites and considerations for CDC

{{partial:admonition type="note" heading="CDC and event volume"}}
By using CDC, Snowflake sends consolidated row `INSERT`, `UPDATE`, and `DELETE` operations to Amplitude based on your sync frequency. This means that multiple operations made to an event during the sync window only count as one event against your existing event volume. However, any operation made to an event outside of the sync window counts as an additional event against your existing event volume. This may impact the rate at which you use your existing event volume. Contact sales to purchase additional event volume, if needed.
{{/partial:admonition}}

When using Mirror Sync Sync, keep the following things in mind:

- **Enable Change Tracking**: Enable change tracking for the source table or view. See [Enabling Change Tracking on Views and Underlying Tables](https://docs.snowflake.com/en/user-guide/streams-manage.html#label-enabling-change-tracking-views) in Snowflake's documentation.

- **Data Retention Settings**: `DATA_RETENTION_TIME_IN_DAYS` must be greater than or equal to one, but Amplitude recommends at least seven days. Otherwise, the change-based import fails. For more details, see [Time Travel](https://docs.snowflake.com/en/user-guide/data-time-travel) in Snowflake's documentation. Setting `DATA_RETENTION_TIME_IN_DAYS` to `0` disables the change tracking and renders the connection unrecoverable. If this happens, recreate the source.

- **Disable Change Tracking**: If you disable change tracking in Snowflake, or disconnect the Amplitude source for a period longer than the value of `DATA_RETENTION_TIME_IN_DAYS`, Amplitude loses the ability to track historical changes. In this case, recreate the connection. To avoid duplicate events, ensure all events have an `insert_id` set, and recreate the connection within seven days.

- **Unique and Immutable `insert_id`**: Ensure the data to be imported has a unique and immutable `insert_id` for each row to prevent data duplication if there are any unexpected issues. More about Amplitude deduplication and `insert_id` is available in [Event Deduplication](/docs/apis/analytics/http-v2/#event-deduplication).

- **Complex SQL Statements**: If a data source is represented as a complex SQL `SELECT` statement (for instance, with a `JOIN` clause), create a `VIEW` in your Snowflake account that wraps the data source to use it with a change-based import strategy. See [Streams on Views](https://docs.snowflake.com/en/user-guide/streams-intro#streams-on-views) for considerations when using CDC with views in Snowflake.

- **Views with JOINs**: While Snowflake CDC is efficient, using views that contain JOINs can have performance implications. Consider syncing joined data as user profiles instead.

- **Avoid table deletion and re-creation**: Don't delete and recreate tables with the same name, as Snowflake CDC doesn't capture changes in this scenario. Use [incremental models](https://docs.getdbt.com/docs/build/incremental-models) with tools like [dbt](https://www.getdbt.com/) to prevent table replacement.

- **Handling schema changes**: CDC supports adding new columns with default `NULL` values to CDC-tracked tables or views. Amplitude recommends against other kinds of schema changes. Snowflake CDC only reflects changes from DML statements. DDL statements that logically modify data (such as adding new columns with default values, dropping existing columns, or renaming columns) affect future data sent to Amplitude, but Snowflake doesn't update historical data with changes caused by DDL statements. As a result, Amplitude doesn't reflect these updates for historical data.

- **Amplitude enrichment services disabled**: When using **Mirror Sync**, Amplitude disables enrichment services like ID resolution, property and attribution syncing, and resolving location info to remain in sync with your source of truth.

- **User Privacy API**: The [User Privacy API](/docs/apis/analytics/user-privacy) deletes previously ingested data and doesn't prevent Amplitude from processing new information about a user. When you use CDC, you must stop sending data about a user before you delete them with the User Privacy API. This ensures that Amplitude doesn't recreate the user in the next sync. 
  
  To delete all data associated with an end-user from Amplitude's systems, deleting the user from your data warehouse isn't enough. This process requires a User Privacy API request to ensure the user's data is removed from Amplitude's systems

- Mirror Sync events and mutations don't support unknown users. Rows must contain a user id or Amplitude drops the event. If you have a high volume of anonymous events, Amplitude recommends against using this mode. 

## Migrate to Change Data Capture (CDC) Mirror Sync

Amplitude recommends that you create a new project to test sending and mutating data. When you confirm that data is mapped and mutated correctly, complete the following steps in your main project:

1. Modify your existing connection to have a filtering definition like `WHERE time < {cutOffDate}`, where `time` is the event time and `cutOffDate` is tomorrow in milliseconds since epoch.
2. Wait until the `cutOffDate` you set in the previous step.
3. Verify that no new data flows in with the existing source connection.
4. Create a **new** source with a filtering definition like `WHERE time >= {cutOffDate}`, where `time` is event time and `cutOffDate` is tomorrow in milliseconds since epoch.
5. Delete the source connection you modified in step 1.

## Data fields

Include the mandatory fields for the data type when you create the SQL query. These tables outline the mandatory and optional fields for each data type. Find a list of other supported fields for events in the [HTTP V2 API documentation](/docs/apis/analytics/http-v2/#keys-for-the-event-argument) and  for user properties in the [Identify API documentation](/docs/apis/analytics/identify/#identification-parameter-keys). Add any columns not in those lists to either `event_properties` or `user_properties`, otherwise it's ignored. 

### Events
<!-- vale off-->
| Column name (must be lowercase) | Mandatory                           | Column data type                     | Example                                       |
| ------------------------------- | ----------------------------------- | ------------------------------------ | --------------------------------------------- |
| `user_id`                       | Yes, unless `device_id` is used     | VARCHAR                              | datamonster@gmail.com                         |
| `device_id`                     | Yes, unless `user_id` is used       | VARCHAR                              | C8F9E604-F01A-4BD9                            |
| `event_type`                    | Yes                                 | VARCHAR                              | watch_tutorial                                |
| `time`                          | Yes                                 | Milliseconds since epoch (Timestamp) | 1396381378123                                 |
| `event_properties`              | Yes                                 | VARIANT (JSON Object)                | {"source":"notification", "server":"host-us"} |
| `user_properties`               | No                                  | VARIANT (JSON Object)                | {"city":"chicago", "gender":"female"}         |
| `update_time_column`            | No (Yes if using time based import) | TIMESTAMP_NTZ                        | 2013-04-05 01:02:03.000                       |

Find other supported fields can in the [HTTP V2 API documentation](/docs/apis/analytics/http-v2/#upload-request-headers).

### User properties

| Column name (must be lowercase) | Mandatory                           | Column data type      | Example                               |
| ------------------------------- | ----------------------------------- | --------------------- | ------------------------------------- |
| `user_id`                       | Yes                                 | VARCHAR               | datamonster@gmail.com                 |
| `user_properties`               | Yes                                 | VARIANT (JSON Object) | {"city":"chicago", "gender":"female"} |
| `update_time_column`            | No (Yes if using time based import) | TIMESTAMP_NTZ         | 2013-04-05 01:02:03.000               |

Find other supported fields in the [Identify API documentation](/docs/apis/analytics/identify/#identification-parameter-keys).

<!--vale on-->
### Group properties

| Column name (must be lowercase) | Mandatory                           | Column data type      | Example                                                |
| ------------------------------- | ----------------------------------- | --------------------- | ------------------------------------------------------ |
| `groups`                        | Yes                                 | VARIANT (JSON Object) | {"company":"amplitude", "team":["marketing", "sales"]} |
| `group_properties`              | Yes                                 | VARIANT (JSON Object) | {"location":"seattle", "active":"true"}                |
| `update_time_column`            | No (Yes if using time based import) | TIMESTAMP_NTZ         | 2013-04-05 01:02:03.000                                |

Each group property in `group_properties` would apply to every group in `groups`.

To use a group property:

- Set group properties. The following is an example of how you can do it in Snowflake Group Property Import:

  ```SQL
  SELECT OBJECT_CONSTRUCT('customerId', account_id)                      AS "groups",          -- must be JSON
        OBJECT_CONSTRUCT('companyName', name, 'customerType', type) AS "group_properties" -- must be JSON
  FROM "AMPLITUDE"."DWH"."ACCOUNTS"
  ```

- Send events with group properties associated. These can be dummy events, so long as the user ID and groups are there. Specify the following in your Snowflake Event Import:

  ```SQL
  "groups": {"customerId": <account_id>}
  ```

## SQL query examples

To make the data selection step easier, here are few example SQL snippets to get you started.

### Event data example

```sql
SELECT
    EVENT_TYPE_COLUMN AS "event_type",
    EVENT_PROPERTIES_VARIANT_COLUMN AS "event_properties",
    TIME_EPOCH_MS_COLUMN AS "time",
    USER_ID_COLUMN AS "user_id",
    USER_PROPERTIES_VARIANT_COLUMN AS "user_properties"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

### User property example

```sql
SELECT
    USER_ID_COLUMN AS "user_id",
    USER_PROPERTIES_VARIANT_COLUMN AS "user_properties"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

### Group property example

```sql
SELECT
    GROUPS_OBJ AS "groups",
    GROUP_PROPS_OBJ AS "group_properties"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

### Common snippets

Create a JSON Object:

```sql
OBJECT_CONSTRUCT('city', CITY, 'state', STATE) as "user_properties"
```

Convert a timestamp column to milliseconds:

```sql
DATE_PART('EPOCH_MILLISECOND', TIMESTAMP_COLUMN) as "time"
```

Convert milliseconds to the `TIMESTAMP_NTZ` format needed for time-based import. This example uses the `scale` argument set to `3` to convert to milliseconds. See the [Snowflake documentation](https://docs.snowflake.com/en/sql-reference/functions/to_timestamp.html) for more details.

```sql
TO_TIMESTAMP_NTZ(TIME_COLUMN_IN_MILLIS, 3) as "update_time_column"
```

Convert a timestamp column with a timezone to `TIMESTAMP_NTZ` format needed for time-based import.

```sql
TO_TIMESTAMP_NTZ(CONVERT_TIMEZONE('UTC', TIMESTAMP_TZ_COLUMN)) as "update_time_column"
```

## SQL troubleshooting

The following sections provide example SQL queries you can use to configure your import connectors.

### Required event properties

The Snowflake SQL queries you write for Amplitude's data warehouse import connectors must return specific columns that match Amplitude's Event API schema. Use the following examples to help structure your query.

{{partial:tabs tabs="Basic template, Complete template"}}
{{partial:tab name="Basic template"}}
```sql
SELECT
    event_type,             -- String: Name of the event
    user_id,                -- String: Unique identifier for the user
    EXTRACT(EPOCH_MILLISECOND FROM event_timestamp) as time  -- Timestamp in milliseconds
FROM your_events_table
```
{{/partial:tab}}
{{partial:tab name="Complete template"}}
```sql
SELECT
    event_name as event_type,
    user_identifier as user_id,
    EXTRACT(EPOCH_MILLISECOND FROM event_timestamp) as time,
    device_id,
    session_id,
    
    -- Event Properties as JSON object using OBJECT_CONSTRUCT
    OBJECT_CONSTRUCT(
        'property1', property1_value,
        'property2', property2_value,
        'category', category,
        'value', amount
    ) as event_properties,
    -- [tl! collapse:start ]
    -- User Properties as JSON object
    OBJECT_CONSTRUCT(
        'user_type', user_type,
        'subscription_status', subscription_status,
        'city', data:address:city::string,
        'last_updated', TO_VARCHAR(last_updated)
    ) as user_properties,

    app_version,
    platform,
    os_name,
    os_version,
    device_brand,
    device_manufacturer,
    device_model,
    carrier,
    country,
    region,
    city,
    dma,
    language,
    price::FLOAT as price,
    quantity::INTEGER as quantity,
    revenue::FLOAT as revenue,
    product_id as productId,
    revenue_type as revenueType,
    location_lat::FLOAT as location_lat,
    location_lng::FLOAT as location_lng,
    ip
    -- [tl! collapse:end ]
FROM your_events_table
WHERE event_timestamp >= DATEADD(day, -7, CURRENT_DATE())
```
{{/partial:tab}}
{{/partial:tabs}}

### Basic event query with properties

```sql
SELECT
    event_name as event_type,
    user_id,
    EXTRACT(EPOCH_MILLISECOND FROM event_timestamp) as time,
    device_id,
    -- Construct event properties from multiple columns
    OBJECT_CONSTRUCT(
        'page_name', page_name,
        'button_id', button_id,
        'interaction_type', interaction_type,
        'duration_ms', duration_ms
    ) as event_properties,
    -- Construct user properties
    OBJECT_CONSTRUCT(
        'account_type', account_type,
        'subscription_tier', subscription_tier,
        'last_login', TO_VARCHAR(last_login_date)
    ) as user_properties,
    platform,
    app_version
FROM app_events
WHERE event_timestamp >= DATEADD(day, -7, CURRENT_DATE())
```

### Snowflake-specific features and best practices

The following are examples of Snowflake-specific features and best practices.

#### Working with JSON

```sql
-- Combining multiple JSON objects
SELECT
    event_type,
    user_id,
    EXTRACT(EPOCH_MILLISECOND FROM event_timestamp) as time,
    OBJECT_CONSTRUCT(
        'base_properties', base_properties,  -- existing JSON column
        'additional_data', OBJECT_CONSTRUCT(
            'new_field1', value1,
            'new_field2', value2
        )
    ) as event_properties
FROM events

-- Parsing JSON fields
SELECT
    event_type,
    user_id,
    time,
    PARSE_JSON(raw_properties):field_name::string as extracted_value
FROM events
```

#### Handling timestamps

```sql
-- Converting different timestamp formats
SELECT
    event_type,
    user_id,
    CASE
        WHEN TRY_TO_TIMESTAMP(timestamp_string) IS NOT NULL 
            THEN EXTRACT(EPOCH_MILLISECOND FROM TRY_TO_TIMESTAMP(timestamp_string))
        WHEN TRY_TO_TIMESTAMP_NTZ(timestamp_string) IS NOT NULL 
            THEN EXTRACT(EPOCH_MILLISECOND FROM TRY_TO_TIMESTAMP_NTZ(timestamp_string))
        ELSE NULL
    END as time
FROM events
```

#### Data validation queries

```sql
-- Validate required fields
SELECT COUNT(*)
FROM (
    YOUR_QUERY_HERE
) t
WHERE event_type IS NULL
    OR user_id IS NULL
    OR time IS NULL;

-- Validate JSON structure
SELECT COUNT(*)
FROM (
    YOUR_QUERY_HERE
) t
WHERE NOT (
    TRY_CAST(event_properties AS OBJECT) IS NOT NULL
    AND TRY_CAST(user_properties AS OBJECT) IS NOT NULL
);

-- Validate timestamp range
SELECT
    MIN(time) as min_time,
    MAX(time) as max_time,
    TIMEADD(millisecond, MIN(time), '1970-01-01'::timestamp) as min_readable_time,
    TIMEADD(millisecond, MAX(time), '1970-01-01'::timestamp) as max_readable_time
FROM (
    YOUR_QUERY_HERE
) t;
```

## Performance optimization tips

Use the following examples to help optimize the performance of your integration.

### Use clustering keys

Use the appropriate clusting keys on your source tables.

```sql
ALTER TABLE your_events_table CLUSTER BY (event_timestamp, user_id);
```

### Use materialized views

Use materialized views for complex transformations.

```sql
CREATE MATERIALIZED VIEW amplitude_ready_events AS
SELECT
    -- Your transformed columns here
FROM source_events;
```

### Date partitioning in WHERE clauses

```sql
WHERE event_timestamp >= DATEADD(day, -7, CURRENT_DATE())
  AND event_timestamp < CURRENT_DATE()
```

### Micro-partitions

```sql
SELECT ...
FROM your_table
WHERE TO_DATE(event_timestamp) BETWEEN '2024-01-01' AND '2024-01-31'
```

## Troubleshooting

1. **Error: `SQL compilation error: Invalid identifier INFORMATION_SCHEMA.QUERY_HISTORY_BY_SESSION. Results not generated.`**

- **Cause**: This occurs when the Snowflake role used for the integration no longer has permission to access the `INFORMATION_SCHEMA` of the specified Snowflake database. Amplitude requires access to this schema to check the status of queries running on the customer's Snowflake instance.
- **Solution**: Ensure that the role used for the integration has the necessary permissions to access the `INFORMATION_SCHEMA` in the target Snowflake database. This issue often arises if the role was recently changed or updated without maintaining the appropriate access.

1. Error: `JWT token is invalid.`

- **Cause**: This error appears when there is a mismatch between the public key attached to the given user and the private key Amplitude generates for key pair authentication.
- **Solution**: Ensure that the public key is properly set on the given user, and that you provide the account in the format `ORGNAME-ACCOUNTNAME`. If the account has an account locator at the end, key pair authentication may not succeed, even if the public key is set properly. To get the account identifier in the correct format, run `SELECT CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME();` in your Snowflake instance.

## Frequently asked questions

Review the list topics below if you encounter issues with your Snowflake integration.

### What happens when a Snowflake query times out?

When a Snowflake query times out, Amplitude automatically retries the query using an exponential backoff strategy. Each retry attempt waits progressively longer than the previous one, giving Snowflake more time to process the request successfully.

### How many times does Amplitude retry failed queries?

Amplitude attempts up to 8 retries (9 total attempts including the initial query) before marking an import job as failed. Each retry attempt starts fresh, ensuring a consistent approach to retrieving your data.

### Why is ABORT_DETACHED_QUERY set to FALSE?

Setting `ABORT_DETACHED_QUERY = FALSE` at the account level prevents Snowflake from silently canceling import queries that run longer than 5 minutes. Without this setting:

- Snowflake cancels long-running queries without notification
- Amplitude interprets this as a temporary failure and retries
- This can lead to duplicate events and inflated event counts

While this setting doesn't change Amplitude's retry mechanism, it prevents unnecessary retries caused by Snowflake's automatic query cancellation.

### How can I prevent duplicate data during imports?

To prevent duplicate data during retries and overlapping imports:

- **Include an `insert_id`**: This unique identifier allows Amplitude to detect and ignore duplicate events
- **Set proper retry settings**: Configure `ABORT_DETACHED_QUERY = FALSE` to prevent unnecessary retries

Without an `insert_id`, Amplitude treats every incoming event as new, potentially leading to duplicate data, inflated event counts, and inaccurate analytics.

### Is there any risk of data loss during query timeouts?

No, there is no risk of data loss when Amplitude import jobs time out. Here's why:

- **Read-only operations**: Amplitude only reads data from your Snowflake instance—it never modifies, deletes, or writes to your tables
- **Source data protection**: Timeouts occur during data transfer, not during any operation that could affect your source data  
- **Automatic retries**: Failed imports are automatically retried up to 8 times, giving your data multiple opportunities to be successfully imported

Your Snowflake data remains completely safe and unchanged regardless of import job outcomes.
