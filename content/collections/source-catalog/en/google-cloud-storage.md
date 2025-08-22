---
id: 78fc91cb-7fae-4dca-9f2b-3bc3197abe54
blueprint: source-catalog
title: 'Google Cloud Storage (GCS)'
source: 'https://www.docs.developers.amplitude.com/data/sources/google-cloud-storage/'
category: 'Cloud Storage'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
integration_type:
  - group-properties
  - raw-events
  - user-properties
integration_category:
  - storage
partner_maintained: false
integration_icon: partner-icons/google-cloud-platform.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713821847
---
Amplitude's GCS Import feature lets you import event or user properties into your Amplitude projects from an GCS bucket. This article helps you configure this data source within Amplitude.

## Getting started

### Prerequisites

Before you start, make sure you’ve taken care of some prerequisites.

- Make sure you have a GCS service account with the appropriate permissions. [Learn more](#create-a-gcs-service-account-and-set-permissions).
- Make sure that an Amplitude project exists to receive the data. If not, create a new project.
- Make sure you are an Admin or Manager of the Amplitude project.
- Make sure your GCS bucket has data files ready for ingestion. They must conform to the mappings that you outline in your converter file.
- Make sure the data in your GCS bucket follows the format outlined in [Amplitude's HTTP API v2 spec](/docs/apis/analytics/http-v2#keys-for-the-event-argument).

### File requirements

The files you want to send to Amplitude must follow some basic requirements:

- Files contain events, with one event per line.
- Files are uploaded in the events’ chronological order.
- Filenames are unique.
- File size must be greater than 1MB and smaller than 5GB. For customers with large event volumes, Amplitude recommends file sizes close to 500MB for optimal performance.
- Files are compressed or uncompressed JSON, CSV, or parquet files.

### Create a GCS service account and set permissions

If you haven't already, [create a service account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for Amplitude within the Google Cloud console. This allows Amplitude to export your data to your Google Cloud project.

After you create a service account, generate and download the service account key file and upload it to Amplitude. **Make sure you export Amplitude's account key in JSON format**.

Add this service account as a member to the bucket you'd like to export data to. Make sure to give this member the **storage admin** role to make sure Amplitude has the necessary permissions to export the data to your bucket.

You can also create your own role, if you prefer.

Keep in mind that the export process requires, at a minimum, the following permissions:

- `storage.buckets.get`
- `storage.objects.get`
- `storage.objects.create`
- `storage.objects.delete`
- `storage.objects.list`

## Add a new GCS source

To add a new GCS data source for Amplitude to draw data from, follow these steps:

1. In Amplitude Data, click **Catalog** and select the **Sources** tab.
2. In the Warehouse Sources section, click **GCS**.
3. Upload your Service Account Key file. This gives Amplitude the permissions to pull data from your GCS bucket.
4. After you've uploaded the Service Account Key file, enter the bucket name and folder where the data resides.
5. Click **Next** to test the credentials. If all your information checks out, Amplitude displays a success message. Click *Next >* to continue the process.
6. In the *Enable Data Source* panel, name your data source and give it a description. (You can edit this information later, via *Settings*.) Then click *Save Source*. Amplitude confirms that you've created and enabled your source.
7. Click *Finish* to go back to the list of data sources. If you've already configured the converter, the data import starts in a few moments. Otherwise, it's time to create your data converter.

## Create the converter configuration

The final step in setting up Amplitude's GCS ingestion source is creating the converter file. Your converter configuration gives the integration this information:

- A pattern that tells Amplitude what a valid data file looks like. For example:**“\\w+\_\\d{4}-\\d{2}-\\d{2}.json.gz”**
- Whether the file is compressed, and if so, how.
- The file’s format. For example: CSV (with a particular delimiter), or lines of JSON objects.
- How to map each row from the file to an Amplitude event.

The converter file tells Amplitude how to process the ingested files. Create it in two steps: first, configure the compression type, file name, and escape characters for your files.
 Then use JSON to describe the rules your converter follows.

### Guided converter creation

You can create converters via Amplitude's new guided converter creation interface. This lets you map and transform fields visually, removing the need to manually write a JSON configuration file. Behind the scenes, the UI compiles down to the existing JSON configuration language used at Amplitude.

First, take a look at the different data types you can import: **Event**, **User Property** and **Group Property** data.

{{partial:admonition type="note" title=""}}
Amplitude recommends selecting preview in step 1 of the Data Converter, where you see a sample source record before moving to the next step.
{{/partial:admonition}}

After you have selected a particular field, you can choose to transform the field in your database. You can do this by clicking on "Transform" and choosing the kind of transformation you would like to apply. You can find a short description for each transformation.

After you select a field, you can open the transformation modal and choose from a variety of Transformations.

Depending on the transformation you select, you may be prompted to include more fields. 

After you have all the fields needed for the transformation, you can save it. You can update these if your requirements change.

Although Amplitude needs certain fields to bring data in, it also supports extra fields which you can include by clicking the “Add Mapping” button. Here, Amplitude supports 4 kinds of mappings: Event properties, User Properties, Group Properties and Additional Properties. 

Find a list of supported fields for events in the [HTTP V2 API documentation](/docs/apis/analytics/http-v2#keys-for-the-event-argument) and  for user properties in the [Identify API documentation](/docs/apis/analytics/identify#identification-parameter-keys). Add any columns not in those lists to either `event_properties` or `user_properties`, otherwise it's ignored.  

After you have added all the fields you wish to bring into Amplitude, you can view samples of this configuration in the Data Preview section. Data Preview automatically updates as you include or remove fields and properties. In Data Preview, you can look at a few sample records based on the source records along with how that data is imported into Amplitude. This ensures that you are bringing in all the data points you need into Amplitude. You can look at 10 different sample source records and their corresponding Amplitude events.

The converter language describes extraction of a value given a JSON element. Specify this using a SOURCE_DESCRIPTION, which includes:

- BASIC_PATH
- LIST_OPERATOR
- JSON_OBJECT

{{partial:admonition type="example" title="Example converters"}}
See the [Converter Configuration reference](/docs/data/converter-configuration-reference) for more help.
{{/partial:admonition}}

### Configure converter in Amplitude

1. Click **Edit Import Config** to configure the compression type, file name, and escape characters for your files. The boilerplate of your converter file pre-populates based on the selections made during this step. You can also test whether the configuration works by clicking **Pull File**.
2. Click **Next**.
3. Enter your converter rules in the text editor.
4. Test your conversion. Click **Test Convert**. Examine the conversion preview. Make adjustments to your converter configuration as needed.
5. Click **Finish**.

{{partial:admonition type="note" title=""}}
If you add new fields or change the source data format, you need to update your converter configuration. Note that the updated converter only applies to files `discovered_after_converter` updates are saved.
{{/partial:admonition}}

### Misleading “Malformed File” Error during Preview

If you are seeing an error during preview with converter, it does not always mean your original GCS files are malformed. Amplitude first copies files from GCS to an internal S3. The Preview button reflects files in the S3, not directly in GCS. If your files do not match the required folder structure, they won’t be copied into the Amplitude S3 resulting in nothing being imported or shown in the preview.

## Storage organization requirements

After the initial ingestion, your data organization must conform to this standard for subsequent imports:

`{bucket name}/{GCSPrefix}/{YYYY}/{MM}/{DD}/{HH}/{optional}/{additional}/ {folder}/{structure}/{file name}`

where:

- `{bucket name}` is the name of your GCS bucket;
- `{GCSPrefix}` is the source prefix folder specified in your source setup configuration;
- `{YYYY}/{MM}/{DD}/{HH}` is the required date prefix format to upload new files. You should organize files according to the time they're uploaded to the bucket, and not when the files are generated in your system. Also, you must always use two digits (as opposed to one) to represent the month, day, and hour;
- `{optional}/{additional}/{folder}/{structure} `is where you can add additional folder structure details. These details are strictly optional. If you do include them, an example file path might look like `{bucket name}/{GCSPrefix}/{YYYY}/{MM}/{DD}/{HH}/**cluster-01/node-25**/{file name}`.

{{partial:admonition type="info" title=""}}
These organizational requirements **apply only to new data** you want to import **after** the source is enabled. You don't have to reorganize any pre-existing files, as Amplitude's GCS Import captures the data they contain on the first ingestion scan. After the initial scan, new data uploaded to the bucket must conform to the requirements outlined here.
{{/partial:admonition}}

## File Search Time Window (48 Hours)

Amplitude GCS Import job only searches for files from the past 48 hours based on the folder date in the path.

Example: If the batch job starts at 2024/09/03 00:00, it will only search in:

``` {json}
{bucket name}/{GCSPrefix}/2024/09/01/00/ 
  to  
{bucket name}/{GCSPrefix}/2024/09/03/00/
```

Ensure your data files are uploaded into a folder that falls within this 2-day window, so Amplitude service can detect and import them.
