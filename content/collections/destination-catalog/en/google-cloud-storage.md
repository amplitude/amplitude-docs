---
id: c05d3b92-f00e-4a7a-8702-a04b1317dd35
blueprint: destination-catalog
title: 'Google Cloud Storage'
source: 'https://docs.developers.amplitude.com/data/destinations/google-cloud-storage'
category: 'Cloud storage'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713821685
connection: destination
integration_type:
  - merged-user-ids
  - raw-events
integration_category:
  - storage
integration_icon: partner-icons/google-cloud-platform.svg
---
Amplitude users can now export Amplitude event data and merged user data to their Google Cloud Storage (GCS) account. Google Cloud's bucket policies allow you to manage and programmatically export this data into a Google Cloud bucket. Using the Amplitude UI, you can set up recurring syncs as often as once per hour. 

## Create a GCS service account and set permissions

If you haven't already, [create a service account](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for Amplitude within the Google Cloud console. This allows Amplitude to export your data to your Google Cloud project.

After you create a service account, generate and download the service account key file and upload it to Amplitude. **Make sure you export Amplitude's account key in JSON format**.

Add this service account as a member to the bucket you'd like to export data to. Give this member the **storage admin** role to make sure Amplitude has the necessary permissions to export the data to your bucket.

You can also create your own role, if you prefer.

Keep in mind that the export process requires, at a minimum, the following permissions:

- `storage.buckets.get`
- `storage.objects.get`
- `storage.objects.create`
- `storage.objects.delete`
- `storage.objects.list`

## Set up a recurring data export to GCS

To set up a recurring export of your Amplitude data to GCS, follow these steps:

{{partial:admonition type="note" title=""}}
You need admin privileges in Amplitude, as well as a role that allows you to enable resources in GCS.
{{/partial:admonition}}


1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Warehouse Destination section, click **Google Cloud Storage**.
3. On the **Getting Started** tab, select the data you'd like to export. You can *Export events ingested today and moving forward*, *Export all merged Amplitude IDs*, or both. For events, you can also specify filtering conditions to only export events that meet certain criteria.

{{partial:admonition type="note" title=""}}
You can export these two different data types to separate buckets. Complete the setup flow twice: once for each data type.
{{/partial:admonition}}

4. Review the Event table and Merge IDs table schemas and click **Next**. 
2. In the *Google Cloud Credentials For Amplitude* section, upload the Service Account Key file. This file must be in JSON format.
3. After the account service key is uploaded, fill out the Google Cloud bucket details in the *Google Cloud Bucket Details* section.
4. Click **Next**. Amplitude attempts a test upload to check that the entered credentials work. If the upload is successful, click **Finish** to complete the GCS destination configuration and activation.

All future events/merged users are automatically sent to GCS. Amplitude exports files to your GCS account on a best-effort basis. Exports typically run hourly and contain one hour of data, but may run less frequently and contain multiple hours of data.

## Run a manual export

You can backfill historical data to GCS by manually exporting data.

1. Go to the Google Cloud Storage export connection page created in the section above.
2. Go to **Backfills** tab.
3. Select the desired date range. 
4. Click **Start Backfill**. 

If the backfill range overlaps with the range of previously exported data, Amplitude will de-duplicate overlapping data.

## Exported data format

When you configure a GCS export, you specify a bucket name and an optional folder/prefix. This prefix determines where your exported data appears inside the bucket. If you leave the prefix empty, Amplitude writes objects directly at the bucket root.

### Raw event file and data format

Amplitude exports data as a zipped archive of JSON files, partitioned by the hour with one or more files per hour. Each file contains one event JSON object per line.

#### Object key structure

Amplitude organizes exported event files under a directory named by your project/app ID. The full object key structure is:

`{gcsPrefix}/{appId}/{filename}`

If you don't configure a prefix, the path simplifies to:

`{appId}/{filename}`

Where:

- `{gcsPrefix}` is the optional folder/prefix you configure in the Amplitude UI.
- `{appId}` is your Amplitude project ID (the same ID that appears in the filename).
- `{filename}` follows the format below.

#### Filename format

File names have the following syntax, where the time represents when the data was uploaded to Amplitude servers in UTC (for example, `server_upload_time`):

`projectID_yyyy-MM-dd_H#partitionInteger.json.gz`

For example, the first partition of data uploaded to this project, on Jan 25, 2020, between 5 PM and 6 PM UTC, is in the file:

`187520_2020-01-25_17#1.json.gz`

#### Example

If your bucket is `amplitude-data`, your prefix is `events`, and your project ID is `187520`, the full GCS path for this file is:

`gs://amplitude-data/events/187520/187520_2020-01-25_17#1.json.gz`

Here is the exported data JSON object schema:

```json
{
  "server_received_time": UTC ISO-8601 timestamp,
  "app": int,
  "device_carrier": string,
  "$schema":int,
  "city": string,
  "user_id": string,
  "uuid": UUID,
  "event_time": UTC ISO-8601 timestamp,
  "platform": string,
  "os_version": string,
  "amplitude_id": long,
  "processed_time": UTC ISO-8601 timestamp,
  "version_name": string,
  "ip_address": string,
  "paying": boolean,
  "dma": string,
  "group_properties": dict,
  "user_properties": dict,
  "client_upload_time": UTC ISO-8601 timestamp,
  "$insert_id": string,
  "event_type": string,
  "library":string,
  "amplitude_attribution_ids": string,
  "device_type": string,
  "device_manufacturer": string,
  "start_version": string,
  "location_lng": float,
  "server_upload_time": UTC ISO-8601 timestamp,
  "event_id": int,
  "location_lat": float,
  "os_name": string,
  "amplitude_event_type": string,
  "device_brand": string,
  "groups": dict,
  "event_properties": dict,
  "data": dict,
  "device_id": string,
  "language": string,
  "device_model": string,
  "country": string,
  "region": string,
  "is_attribution_event": bool,
  "adid": string,
  "session_id": long,
  "device_family": string,
  "sample_rate": null,
  "idfa": string,
  "client_event_time": UTC ISO-8601 timestamp,
 }
```

### Merged Amplitude IDs file and data format

Amplitude exports data as a zipped archive of JSON files. Each file contains one merged Amplitude ID JSON object per line.

#### Object key structure

Amplitude organizes merged ID files under a scope directory. The scope determines the directory name and corresponds to either your organization ID (for cross-app orgs) or your app ID (for legacy single-app configurations). The full object key structure is:

`{gcsPrefix}/{scope}/{filename}`

If you don't configure a prefix, the path simplifies to:

`{scope}/{filename}`

#### Cross-app organizations (standard behavior)

For organizations with cross-app user tracking enabled, the scope is a negative org ID. Both the directory and filename use this negative org ID format:

- **Directory:** `-{orgId}/`
- **Filename:** `-{orgId}_yyyy-MM-dd_H.json.gz`

For example, if your bucket is `amplitude-data`, your prefix is `merged`, and your org ID is `189524`, a merged ID file from Jan 25, 2020, between 5 PM and 6 PM UTC appears at:

`gs://amplitude-data/merged/-189524/-189524_2020-01-25_17.json.gz`

#### Legacy single-app behavior

A small number of legacy organizations that haven't migrated to cross-app user tracking may still export merged IDs with the app ID as the scope. In this configuration:

- **Directory:** `{appId}/`
- **Filename:** `{appId}_yyyy-MM-dd_H.json.gz` (no leading `-`)

If you're unsure which behavior applies to your organization, contact Amplitude Support or your Customer Success Manager. They can confirm your current configuration and provide migration details if needed.

#### Filename format

File names have the following syntax, where the time represents when the data was uploaded to Amplitude servers in UTC (for example `server_upload_time`):

`-OrgID_yyyy-MM-dd_H.json.gz`

For example, data uploaded to this project, on Jan 25, 2020, between 5 PM and 6 PM UTC, is in the file:

`-189524_2020-01-25_17.json.gz`

Merged ID JSON objects have the following schema:

```json
{
 "scope": int,
 "merge_time": long,
 "merge_server_time": long,
 "amplitude_id": long,
 "merged_amplitude_id": long
}
```