---
id: 1a53abd1-868a-4fe0-9e13-64773a18c209
blueprint: source-catalog
use_cases:
  - "Transfer event data from Amplitude to BigQuery, leveraging BigQuery's advanced analytics tools for in-depth analysis and visualization."
  - 'Schedule recurring syncs of Amplitude event data, ensuring that data in BigQuery remains up-to-date. This allows users to track user trends, evaluate marketing efforts, and make informed decisions based on the latest data..'
short_description: "BigQuery is Google's fully managed, petabyte scale, low cost analytics data warehouse."
integration_category:
  - data-warehouse-data-lake
integration_type:
  - group-properties
  - user-properties
  - raw-events
title: 'BigQuery Data Import'
source: 'https://www.docs.developers.amplitude.com/data/sources/bigquery/'
category: Warehouse
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/bigquery.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713820220
---

With Amplitude's BigQuery integration, you can ingest BigQuery data directly into your Amplitude project.

{{partial:admonition type="note" title="BigQuery Import for Google Analytics 4 Beta"}}
Amplitude is working on a beta version of BigQuery Import specifically for GA4. To join this beta, [contact Amplitude Support](https://amplitude.zendesk.com/hc/en-us/requests/new). 
{{/partial:admonition}}

## Prerequisites

To get started with importing from BigQuery, you need to take care of a few prerequisites.

- You need a table (or tables) in BigQuery. This is where you want to import data from.
- Create a GCS bucket. Amplitude recommends one dedicated to this purpose. The ingestion process must offload data to a GCS bucket before ingesting it into Amplitude. This is due to BigQuery's limited export options.
- Create a Service Account with permissions granted for the bucket and tables you want to ingest, then get the service account key. The Service Account must have the following roles granted to it:
    - **BigQuery**:
        - BigQuery Job User at the project level.
        - BigQuery Data Viewer at the resource level necessary to access your data to be ingested. If your data is in a single table, just grant the service account BigQuery Data Viewer for that table resource. If the query requires multiple tables or datasets, grant BigQuery Data Viewer on all tables or datasets in the query.
    - **Cloud Storage**:
        - Storage Admin on the GCS bucket you're using for ingestion.
- Depending on your company's network policy, you may need to add the following IP addresses to your allowlist to allow Amplitude's servers to access your BigQuery instance:

    - Amplitude US IP addresses:
        - 52.33.3.219
        - 35.162.216.242
        - 52.27.10.221 
    - Amplitude EU IP addresses:
        - 3.124.22.25
        - 18.157.59.125
        - 18.192.47.195

{{partial:admonition type="warning" title="User and Group properties sync"}}
Amplitude's Data Warehouse Import sometimes processes events in parallel, so time-ordered syncing of user and group properties on events isn't guaranteed in the same way as submitting events directly to the Identify and Group Identify APIs. 
{{/partial:admonition}}

## Add BigQuery as a source

To add BigQuery as a data source in your Amplitude project, follow these steps.

1. In Amplitude Data, click **Catalog** and select the **Sources** tab.
2. In the Warehouse Sources section, click **BigQuery**.
3. Add the service account key and specify a GCS bucket name.
4. Click **Next** to test the connection to make sure it's working.
5. After you confirm your credentials, click **Next** to select data. You have several configuration options to choose from here:
    - Type of data: This tells Amplitude whether you're ingesting event data, user property or group property data.
    - Type of import:
          - Full Sync: Amplitude periodically imports the entire dataset, regardless of whether the data is already imported. This is good for data sets where the row data changes over time, but there is no easy way to tell which rows have changed. Otherwise, the more efficient option would be a time-based import. This option isn't supported for ingesting event data.
          - Time-based: Amplitude periodically ingests the most recent rows in the data, as determined by the provided Timestamp column. The first import ingests all available data, and later imports ingest any data with timestamps after the time of the most recent import. To use this option, include the timestamp column in the output of your SQL statement.
    - Frequency: Choose from several scheduling options ranging from five minutes to one month (when this is selected, ingestion happens on the first of the month).
    - SQL query: This is the code for the query Amplitude uses to ingest the right data.
6. After you've set your configuration options, click **Test SQL** to see how the data is coming through from your BigQuery instance. If there are any errors, they appear under the Test SQL button.
7. If there are no errors, click **Finish**. You get a notification indicating you've successfully enabled the new BigQuery source. Finally, you're redirected to the Sources listing page, where you can see the newly created BigQuery source.

If you have any issues or questions while following this flow, contact the Amplitude team.

## Time-based import

For Amplitude's time-based import option, it's best practice to use a monotonically increasing timestamp value. This value should indicate **when** the record was loaded into the source table the SQL configuration is querying from (often referred to as a "server upload time"). The warehouse import tool brings data into Amplitude is by continually updating the maximum value of the column referenced in the *Timestamp Column Name* input within the Import Config UI with each subsequent import.

{{partial:admonition type="example" title=""}}
Upon first import, Amplitude imports all the data returned from the query configured in the Import Config. Amplitude saves a reference of the maximum timestamp referenced in the *Timestamp Column Name*: `timestamp_1`. Upon subsequent import, Amplitude imports all data from the previously saved timestamp (`timestamp_1`), to what's now the new maximum timestamp (`timestamp_2`). Then after that import, Amplitude saves `timestamp_2` as the new maximum timestamp.
{{/partial:admonition}}

## BigQuery export statement limitations

When creating SQL queries for BigQuery imports, it's important to be aware of certain limitations with BigQuery's export statements. Amplitude uses BigQuery's export functionality to extract data for ingestion.

{{partial:admonition type="warning" title="Meta tables restriction"}}
BigQuery export statements cannot reference meta tables in queries. This includes INFORMATION_SCHEMA views, system tables, or wildcard tables. If your query references any of these meta tables, you'll receive an error similar to: `EXPORT DATA statement cannot reference meta tables in the queries`.
{{/partial:admonition}}

To avoid this limitation:
- Ensure your SQL query only references standard tables and views
- Do not include references to INFORMATION_SCHEMA views
- Avoid using system tables in your query
- Do not use wildcard tables in your import queries

For more information on BigQuery export statement limitations, refer to the [BigQuery documentation](https://cloud.google.com/bigquery/docs/reference/standard-sql/export-statements).

## Mandatory data fields

Include the mandatory fields for the data type when you create the SQL query. These tables outline the mandatory and optional fields for each data type. Find a list of other supported fields for events in the [HTTP V2 API documentation](/docs/apis/analytics/http-v2#keys-for-the-event-argument) and  for user properties in the [Identify API documentation](/docs/apis/analytics/identify#identification-parameter-keys). Add any columns not in those lists to either `event_properties` or `user_properties`, otherwise it's ignored. 

### Events

| Column name (must be lowercase) | Mandatory | Column data type | Example |
|---|---|---|---|
| `user_id` | Yes, unless `device_id` is used | VARCHAR | datamonster@gmail.com |
| `device_id` | Yes, unless `user_id` is used | VARCHAR | C8F9E604-F01A-4BD9 |
| `event_type` | Yes | VARCHAR | watch_tutorial | 
| `time` | Yes | Milliseconds since epoch (Timestamp) | 1396381378123 |
| `event_properties` | Yes | JSON | {"source":"notification", "server":"host-us"} |
| `user_properties` | No | JSON | {"city":"chicago", "gender":"female"} |
| `update_time_column` | No (Yes if using time based import) | TIMESTAMP | 2013-04-05 01:02:03.000 |

Find other supported fields in the [HTTP V2 API documentation](/docs/apis/analytics/http-v2#upload-request-headers).

### User properties

| Column name (must be lowercase) | Mandatory | Column data type | Example |
|---|---|---|---|
| `user_id` | Yes | VARCHAR | datamonster@gmail.com |
| `user_properties` | Yes | JSON | {"city":"chicago", "gender":"female"} |
| `update_time_column` | No (Yes if using time based import) | TIMESTAMP | 2013-04-05 01:02:03.000 |

Find other supported fields in the [Identify API documentation](/docs/apis/analytics/identify#identification-parameter-keys).

### Group properties

| Column name (must be lowercase) | Mandatory | Column data type | Example |
|---|---|---|---|
| `groups` | Yes | JSON | {"company":"amplitude", "team":["marketing", "sales"]} |
| `group_properties` | Yes | JSON | {"location":"seattle", "active":"true"} |
| `update_time_column` | No (Yes if using time based import) | TIMESTAMP | 2013-04-05 01:02:03.000 |

Each group property in `group_properties` would be applied to every group in `groups`

## Update your BigQuery service account key

To update the [Service Account](https://cloud.google.com/iam/docs/service-account-overview) used for your BigQuery Source, select the existing BigQuery Source within the Sources section of Data and click the ⚙️ (gear) icon. Within the modal, upload the new Service Account Key you want Amplitude to use moving forward. 

{{partial:admonition type="warning" title="Service account data access"}}
Before you update your Service Account Key, ensure the new Service Account Key has the proper data access to ensure Amplitude can successfully import any relevant data. 
{{/partial:admonition}}

## BigQuery SQL helper

### Properties fields

Many Amplitude features are powered by "properties" fields, which are composed of property keys and property values. The most common of these properties fields are `event_properties` and `user_properties`.

In order for these sets of keys and values to be correctly ingested into Amplitude, they must be exported from BigQuery as raw JSON, not as JSON strings. BigQuery doesn't have great support for JSON, but the following describes how to make sure your data is exported from BigQuery and imported to Amplitude without errors.

The properties fields are sourced from columns with a [STRUCT](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#struct_type) type. The struct type is the field type that represents a key-value structure and is exported from BigQuery in raw JSON format.

If your source table doesn't have the event or user properties organized in a struct type column, you can create it in your select SQL. For example, if your event properties are all flattened into their own columns, you can compose your `event_properties` into a struct like so:

```sql
SELECT STRUCT(
    event_property_column_1 AS event_property_name_1,
    event_property_column_2 AS event_property_name_2
) as event_properties
FROM your_table;
```

{{partial:admonition type="warning" title=""}}
You can't have spaces in struct field names even if they're enclosed in back ticks or single quotes.
{{/partial:admonition}}

#### Reconstructing Event or User Properties from RECORD Type and REPEATED Mode Fields

If you have `event_properties` or `user_properties` fields with RECORD type and REPEATED mode, you may need to transform them into a valid format before ingesting them into Amplitude.

Here are two approaches to achieve this transformation:

- Reconstruct the properties into a JSON object using PARSE_JSON, ensuring all values are properly formatted:

``` sql
PARSE_JSON(CONCAT('{',
    (
      SELECT STRING_AGG(
          CONCAT('"', key, '":"',
            COALESCE(
              NULLIF(CODE_POINTS_TO_STRING(
                ARRAY((
                  SELECT * FROM UNNEST((
                    SELECT TO_CODE_POINTS(CAST(value.string_value AS STRING))
                  )) AS code_points
                  WHERE code_points > 31 AND code_points != 34 AND code_points != 92
                ))
              ), ''),
              NULLIF(CAST(value.int_value AS STRING), ''),
              NULLIF(CAST(value.float_value AS STRING), ''), 
              NULLIF(CAST(value.double_value AS STRING), '')
            ),
            '"'
          )
      ) FROM UNNEST(event_properties)
    ),
    '}'
  )) AS event_properties
```

- Extract individual key-value pairs directly:

```sql
(SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'key1') AS key1,
(SELECT value.string_value FROM UNNEST(event_params) WHERE key = 'key2') AS key2
```

Once you’ve transformed the event properties, you need to format them as a STRUCT to be ingested by Amplitude:

```sql
STRUCT
(
  action AS action,
  field AS field
) AS event_properties
```

### Properties from a JSON string field

If you have your event or user properties formatted as JSON as a string field, you still must reconstruct the properties field in the select SQL as a STRUCT. BigQuery exports String fields as String even if the contents are JSON. Amplitude's event validation rejects these.

You can extract values from your JSON String field, though, to use in your properties STRUCT. Use the [JSON_EXTRACT_SCALAR](https://cloud.google.com/bigquery/docs/reference/standard-sql/json_functions#json_extract_scalar) function to access the values in your string as follows. If your EVENT_PROPERTIES column in the table contains a JSON String like:

`"{\"record count\":\"50\",\"region\":\"eu-central-1\"}"` which is shown in the BigQuery UI like `{"record count":"50","region":"eu-central-1"})`, then you can extract the values from the JSON String like this:

```sql
SELECT STRUCT(
    JSON_EXTRACT_SCALAR(EVENT_PROPERTIES, "$.record count") AS record_count,
   JSON_EXTRACT_SCALAR(EVENT_PROPERTIES, "$.region") AS region
) as event_properties
FROM your_table;
```

### String literals

Be aware that, unlike other data warehouse products, BigQuery treats "double-quoted strings" as string literals. 
This means that you can't use them to quote identifiers like column names or table names, or the SQL fails to execute in BigQuery.