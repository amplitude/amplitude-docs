---
id: c18235b8-e6a1-4c1b-bfc1-c0a3a85dc2c5
blueprint: source-catalog
use_cases:
  - 'Enable seamless data transfer from Google Analytics 4 (GA4) to Amplitude by leveraging GA4’s BigQuery link, utilizing advanced analytics to enhance event tracking and user behavior insights in Amplitude.'
short_description: 'Google Analytics 4 (GA4) is a platform for tracking user behavior across websites and apps with event-based data and advanced insights.'
integration_category:
  - data-warehouse-data-lake
integration_type:
  - group-properties
  - user-properties
  - raw-events
title: 'Google Analytics 4 Import'
source: 'https://www.docs.developers.amplitude.com/data/sources/ga4/'
category: Warehouse
connection: source
partner_maintained: false
integration_icon: partner-icons/ga4.svg
exclude_from_sitemap: false
---
With Amplitude's Google Analytics 4 integration, you can ingest Google Analytics 4 data into your Amplitude project.

## Prerequisites

To get started with import from GA4, you need to take care of a few prerequisites.

* [Set up a BigQuery Link.](https://support.google.com/analytics/answer/9823238?hl=en)
* [Create a GCS bucket.](https://cloud.google.com/storage/docs/creating-buckets) Amplitude recommends one dedicated to this purpose. The ingestion process must offload data to a GCS bucket before ingesting it into Amplitude. This is due to BigQuery's limited export options.
* [Create a Service Account](https://cloud.google.com/iam/docs/service-accounts-create#console) with permissions granted for the bucket and tables you want to ingest, then [get the service account key](https://cloud.google.com/iam/docs/keys-create-delete). The Service Account must have the following roles granted to it:
  * **BigQuery**
    * BigQuery Job User at the project level.
    * BigQuery Data Viewer at the resource level necessary to access your data to be ingested. If your data is in a single table, just grant the service account BigQuery Data Viewer for that table resource. If the query requires multiple tables or datasets, grant BigQuery Data Viewer on all tables or datasets in the query.
  * **Cloud Storage**
    * Storage Admin on the GCS bucket you're using for ingestion.
* Depending on your company's network policy, you may need to add the following IP addresses to your allowlist to allow Amplitude's servers to access your BigQuery instance:
  * Amplitude US IP addresses:
    * 52.33.3.219
    * 35.162.216.242
    * 52.27.10.221
  * Amplitude EU IP addresses:
    * 3.124.22.25
    * 18.157.59.125
    * 18.192.47.195

## How Amplitude imports your GA4 data

Here’s a step-by-step breakdown of how Amplitude imports your GA4 data:

1. Export GA4 Data to BigQuery

    First, your GA4 data is exported to your BigQuery project through BigQuery Linking. This process sets up an automated flow of event data from GA4 to BigQuery.

2. Unload Data from BigQuery to Your GCS Bucket

    To handle BigQuery’s export limitations (for example, export size restrictions), we unload your data from BigQuery to the GCS bucket you provided. This ensures data readiness for ingestion into Amplitude.

    * Delay Handling:

      To ensure your data is complete, we account for [delays caused by GA4’s export process](https://support.google.com/analytics/answer/9358801?hl=en):
      * 72 hours for daily exports.
      * 24 hours for streaming exports.

    * Catch-up Importing:

        If there’s a backlog, we use a catch-up strategy to process data in batches of 10 tables per day. For example:

        * If you configure your import to start from the event table on 2025-01-01, and today’s date is 2025-01-24, we import:
          * 2025-01-01 to 2025-01-10 in the first batch on 2025-01-24.
          * 2025-01-11 to 2025-01-20 in the second batch on 2025-01-25.
          * 2025-01-21 to 2025-01-23 in the thrid batch on 2025-01-26.
          * 2025-01-24 on 2025-01-27 (due to the 72-hour delay for daily exports).

    During the unload process, we also transform your data into the format required by Amplitude for seamless ingestion.

3. Import Data from GCS to Amplitude

    Once data is ready in GCS bucket, we will import data into Amplitude on your behalf.

## Add GA4 as a source

To add GA4 as a data source in your Amplitude project, follow these steps.

1. From your home page, click **Data**, **Catalog** and select the **Sources** tab.

2. In the **Data Warehouse** section, Click **Google Analytics 4**.

3. Add the service account key and specify a GCS bucket name.

4. After confirming your credentials, click **Next** to configure table selection. Follow these options:
    * Select Table Type: Choose the table type based on the export type you configured in BigQuery Linking:
      * Daily: Select if you configured it with daily.
      * Streaming: Select if you configured it with streaming.
      * Both: If both were selected, select `Daily`.
    * Input Table Name: Provide the table name in the format `projectId.datasetName.tableName`.
      * Important Notes: Amplitude imports data continuously, starting from the first table provided. However, due to [GA4’s data export delays](https://support.google.com/analytics/answer/9358801?hl=en):
        * Daily tables have a 72-hour delay.
        * Streaming tables have a 24-hour delay.
      * For example, if you start importing on 2025-01-01 and today’s date is 2025-01-05, Amplitude will import data for 2025-01-01 and 2025-01-02 first. On the next day (2025-01-06), the import will include 2025-01-03. This process ensures complete data import, as importing too early may result in incomplete data.
  
5. After configuring your options, click **Next**. Amplitude will execute a pre-defined SQL query to verify data import from BigQuery. GA4 data will be transformed into a format compatible with Amplitude. Refer to the [Amplitude HTTP V2 API documentation](https://amplitude.com/docs/apis/analytics/http-v2#event-array-keys) for required fields.

    * Editing SQL:  The pre-defined query typically handles all required fields, but you can customize it to include additional fields if needed.

6. If no errors occur, click **Next**. Enter a source name and click **Save**. A notification will confirm that the GA4 source has been successfully enabled. You’ll then be redirected to the Sources listing page, where the newly created GA4 source will appear.

If you encounter any issues or have questions during the setup process, reach out to the Amplitude team for support: [Contact Support](https://gethelp.amplitude.com/hc/en-us/requests/new)

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
You can't have spaces in struct field names even if they are enclosed in back ticks or single quotes.
{{/partial:admonition}}

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

Be aware that, unlike other data warehouse products, BigQuery treats "double-quoted strings" as string literals. This means that you can't use them to quote identifiers like column names or table names, or the SQL fails to execute in BigQuery.
