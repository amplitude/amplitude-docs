---
id: 986ba08a-28dd-4d28-9107-0bfffb4dd599
blueprint: destination-catalog
title: 'Azure Blob Storage'
source: 'https://www.docs.developers.amplitude.com/data/destinations/azure-blob-storage/'
category: 'Cloud storage'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718993413
connection: destination
integration_type:
  - event-streaming
integration_category:
  - storage
integration_icon: partner-icons/azure-blob-storage.svg
---
Amplitude's Azure Blob Storage destination enables you to export Amplitude event data and merged user data to your Azure Blob Storage container. You can use Azure Blob Storage's container policies to manage and export this data programmatically into an Azure container. Amplitude allows recurring syncs as often as once per hour.

## Azure prerequisites for Amplitude Data Export

Before you can export data from Amplitude to Azure Blob Storage, ensure your Azure environment meets the following prerequisites:

1. **Set Up Azure Storage Account and Container:**

    If you haven't already set up an Azure Storage Account and a Blob Storage container, follow these guides:

    - [Create an Azure Storage Account](https://docs.microsoft.com/en-us/azure/storage/common/storage-account-create)
    - [Create a container in Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal)

2. **Create an Azure Service Principal**:

    Create a service principal in Azure for Amplitude to use to access your Blob Storage. Copy the `tenantId`, `clientId`, and `clientSecret`, Amplitude requires these details to set up the connection with Azure. Follow this guide to create a service principal:

    - [Create a service principal in Azure](https://docs.microsoft.com/en-us/azure/active-directory/develop/howto-create-service-principal-portal)

3. **Grant Required Permissions to Service Principal**:

    Assign the necessary permissions for Azure Blob Storage to your service principal:

{{partial:admonition type="note" title="Amplitude requires the following Azure permissions"}}
- `read` to ensure data isn't exported more than once for recurring exports.
- `delete` to enable deduplication during a manual export, for example when you export backfill data.
{{/partial:admonition}}
    - `Microsoft.Storage/storageAccounts/blobServices/containers/blobs/write`
    - `Microsoft.Storage/storageAccounts/blobServices/containers/blobs/read`
    - `Microsoft.Storage/storageAccounts/blobServices/containers/blobs/delete`

    For instructions on assigning these permissions for Azure Blob Storage, refer to:

    - [Assign Azure Blob Storage permissions to a service principal](https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-portal)
    - [Tutorial: Add a role assignment condition to restrict access to blobs using the Azure portal](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-auth-abac-portal)

4. **Configure Network Access**:

    Ensure the Firewalls and Virtual Networks settings of your Azure Storage account allow access from the following Amplitude IP addresses:

    - Amplitude US IP addresses:
        - `52.33.3.219`
        - `35.162.216.242`
        - `52.27.10.221`
    - Amplitude EU IP addresses:
        - `3.124.22.25`
        - `18.157.59.125`
        - `18.192.47.195`

    For guidance on modifying these settings, see:

    - [Configure Azure Storage firewalls and virtual networks](https://docs.microsoft.com/en-us/azure/storage/common/storage-network-security)

Once complete, these steps ensure your Azure environment is ready to receive secure data exports from Amplitude.

## Set up a recurring data export to Azure Blob Storage

To export your Amplitude data to Azure Blob Storage:

1. In Amplitude, navigate to **Data -> Manage -> Destinations -> Add Destination**.
2. Select **Azure Blob Storage - Events & Merged Users**.
3. On the **Getting Started** tab, select the data to export. Options include *Export events ingested today and moving forward*, *Export all merged Amplitude IDs*, or both. For events, you can also specify filtering conditions to only export events that meet certain criteria.

{{partial:admonition type="note" title=""}}
You can export these two different data types to separate containers, if you prefer. You'll just need to complete the setup flow twice: once for each data type.
{{/partial:admonition}}

4. Review the Event table and Merge IDs table schemas and click **Next**.
2. In the *Set Up Credentials* section, enter the `tenantId`, `clientId`, and `clientSecret` from the service principal you created.
3. Complete the Azure Blob Storage container details in the *Azure Blob Storage Container Details* section. Click **Next**.
4. Click **Next**. Amplitude attempts a test upload to check that the entered credentials work. If the upload is successful, click **Finish** to complete the Azure Blob Storage destination configuration and activation.

When complete, Amplitude sends all future events/merged users to your Azure Blob Storage once per hour.

## Run a manual export

Complete a manual export to backfill and send historical data to Azure Blob Storage.

1. Open the instance of the Azure Blob Storage destination you created above. Navigate to the Export Connection page.
2. Go to **Backfills** tab.
3. Select the date range to export.
4. Click **Start Backfill**.

If the backfill date range overlaps with the date range of already exported data, Amplitude de-duplicates any overlapping data.

![](statamic://asset::help_center_conversions::destinations/integrations-gcs-export-manual-export.png)

## Exported data format

### Raw event file and data format

Amplitude exports data hourly as a zipped archive of JSON files, partitioned by the hour with one or more files per hour. Each file contains one event JSON object per line.

File names have the following syntax, where the time represents when the data was uploaded to Amplitude servers in UTC (for example, `server_upload_time`):

`projectID_yyyy-MM-dd_H#partitionInteger.json.gz`

For example, the first partition of data uploaded to this project, on Jan 25, 2020, between 5 PM and 6 PM UTC, is in the file:

`187520_2020-01-25_17#1.json.gz`

The exported data JSON object schema is:

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
   "user_creation_time": UTC ISO-8601 timestamp,
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

File names have the following syntax, where the time represents when the data was uploaded to Amplitude servers in UTC (for example `server_upload_time`):

`-OrgID_yyyy-MM-dd_H.json.gz`

For example, data uploaded to this project, on Jan 25, 2020, between 5 PM and 6 PM UTC, is in the file:

`-189524_2020-01-25_17.json.gz`

The exported data JSON object schema is:

```json
{
  "scope": int,
  "merge_time": long,
  "merge_server_time": long,
  "amplitude_id": long,
  "merged_amplitude_id": long
}
```