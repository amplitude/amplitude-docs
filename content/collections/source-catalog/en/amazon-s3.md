---
id: 4bec08ca-4ec3-4ea6-8c17-2a9d56fdcbe6
blueprint: source-catalog
use_cases:
  - 'You can configure Amplitude to send raw event data directly to Amazon S3. This data can include user interactions with your product, such as clicks, views, or purchases. Storing this data in S3 allows for scalable and secure data management.'
  - 'Amplitude can also import data from an S3 bucket. This enables you to combine external data sources with your Amplitude analytics, providing a more comprehensive view of your data and user interactions.'
  - 'Cohorts in Amplitude are groups of users segmented based on specific behaviors or characteristics. By sending these cohorts to Amazon S3, you can synchronize this valuable segmentation with other databases or processes that you have in place, outside of Amplitude.'
short_description: 'Provides a simple web-services interface that can be used to store and retrieve any amount of data, at any time, from anywhere on the web.'
integration_category:
  - storage
integration_type:
  - user-properties
  - group-properties
  - raw-events
title: 'Amazon S3 Import'
source: 'https://www.docs.developers.amplitude.com/data/sources/amazon-s3/'
category: 'Cloud Storage'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/amazon-s3.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713819912
---
With Amplitude’s Amazon S3 Import, you can import and mutate event data, and sync user or group properties into your Amplitude projects from an AWS S3 bucket. Use Amazon S3 Import to backfill large amounts of existing data, connect existing data pipelines to Amplitude, and ingest large volumes of data where you need high throughput and latency is less sensitive.

During setup, you configure conversion rules to control how events are instrumented. After Amazon S3 Import is set up and enabled, Amplitude's ingestion service continuously discovers data files in S3 buckets and then converts and ingest events.

{{partial:admonition type="note" heading="Amplitude regional IP addresses"}}
Depending on your company's network policy, you may need to add these IP addresses to your allowlist in order for Amplitude's servers to access your S3 buckets:

| Region | IP Addresses                                    |
| ------ | ----------------------------------------------- |
| US     | `52.33.3.219`, `35.162.216.242`, `52.27.10.221` |
| EU     | `3.124.22.25`, `18.157.59.125`, `18.192.47.195` |

{{/partial:admonition}}

## Prerequisites

Before you start, make sure you meet the following prerequisites.

- An Amplitude project exists to receive the data. If not, create a new project.
  - You're an Admin or Manager of the Amplitude project.
- Your S3 bucket has data files ready for Amplitude to ingest. They must conform to the mappings that you outline in your converter file.
- The data to be imported must have a unique and immutable `insert_id` for each row. This helps prevent data duplication if unexpected issues arise. For more information, see [Deduplication with `insert_id`](#deduplication-with-insert_id).
- Mirror Syncs require a user ID. If a row doesn't contain a user ID, Amplitude drops the event.

## File requirements

The files you want to send to Amplitude must follow some basic requirements:

- Files contain events, with one event per line.
- Files are uploaded in the events’ chronological order.
- Filenames are unique.
- File size must be greater than 1MB and smaller than 1GB.
- Files are compressed or uncompressed JSON, CSV, or parquet files.
- For Mirror Sync, which supports mutations, the following constraints exist:
  - Mutations to events require a user ID. If a row doesn't contain a user ID, Amplitude drops the event. If you have a high volume of anonymous events, Amplitude recommends against using this mode.
  - Amplitude permits the following mutation types: `INSERT`, `UPDATE`, and `DELETE`. If you don't provide a mutation type, the process defaults to `UPDATE`.

{{partial:admonition type="warning" heading="File processing"}}
Amplitude processes files exactly once. You can’t edit files once you upload them to the S3 bucket. If you do edit a file after you upload it, there’s no guarantee that Amplitude processes the most recent version of the file.

After an S3 import source ingests a file, the same source doesn't process the file again, even if the file receives an update.
{{/partial:admonition}}

## Limits

For each Amplitude project, AWS S3 import can ingest:

- Up to 50 files per second.
- Up to 30k events per second.

### Deduplication with `insert_id`

For ingestion syncs only, Amplitude uses a unique identifier, `insert_id`, to match against incoming events and prevent duplicates. If within the same project, Amplitude receives an event with `insert_id` and `device_id` values that match the `insert_id` and `device_id` of a different event received within the last 7 days, Amplitude drops the most recent event.

Amplitude recommends that you set a custom `insert_id` for each event to prevent duplication. To set a custom `insert_id`, create a field that holds unique values, like random alphanumeric strings, in your dataset. Map the field as an extra property named `insert_id` in the guided converter configuration.

### Give Amplitude access to your S3 bucket

Follow these steps to give Amplitude read access to your AWS S3 bucket.

1. Create a new IAM role, for example: `AmplitudeReadRole`.
2. Go to **Trust Relationships** for the role and add Amplitude’s account to the trust relationship policy to allow Amplitude to assume the role using the following example.

    - `amplitude_account`: `358203115967` for Amplitude US data center. `202493300829` for Amplitude EU data center. 
    - `external_id` : unique identifiers used when Amplitude assumes the role. You can generate it with help from [third party tools](https://www.uuidgenerator.net/). Example external id can be `vzup2dfp-5gj9-8gxh-5294-sd9wsncks7dc`.

    ``` json hl_lines="7 12"
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {
            "AWS": "arn:aws:iam::<amplitude_account>:root" //[tl! ~~]
          },
          "Action": "sts:AssumeRole",
          "Condition": {
            "StringEquals": {
              "sts:ExternalId": "<external_id>" //[tl! ~~]
            }
          }
        }
      ]
    }
    ```

3. Create a new IAM policy, for example, `AmplitudeS3ReadOnlyAccess`. Use the entire example code that follows, but be sure to update **<>** in highlighted text.

    - **<bucket_name>**: the s3 bucket name where your data is imported from.
    - **\<prefix\>**: the optional prefix of files that you want to import, for example `filePrefix`. For folders, make sure prefix ends with `/`, for example `folder/`. For the root folder, keep prefix as empty.

    Example 1: IAM policy without prefix:

    ```json hl_lines="16 29 40"
    {
      "Version":"2012-10-17",
      "Statement":[
        {
          "Sid":"AllowListingOfDataFolder",
          "Action":[
            "s3:ListBucket"
          ],
          "Effect":"Allow",
          "Resource":[
            "arn:aws:s3:::<bucket_name>"
          ],
          "Condition":{
            "StringLike":{
              "s3:prefix":[
                "*" //[tl! ~~]
              ]
            }
          }
        },
        {
          "Sid":"AllowAllS3ReadActionsInDataFolder",
          "Effect":"Allow",
          "Action":[
            "s3:GetObject",
            "s3:ListBucket"
          ],
          "Resource":[
            "arn:aws:s3:::<bucket_name>/*" //[tl! ~~]
          ]
        },
        {
          "Sid":"AllowUpdateS3EventNotification",
          "Effect":"Allow",
          "Action":[
            "s3:PutBucketNotification",
            "s3:GetBucketNotification"
          ],
          "Resource":[
            "arn:aws:s3:::<bucket_name>" //[tl! ~~]
          ]
        }
      ]
    }
    ```
  
    Example 2: IAM policy with a prefix. For a folder, make sure the prefix ends with `/`, for example `folder/`:
    
    ```json hl_lines="16 29 40"
    {
      "Version":"2012-10-17",
      "Statement":[
        {
          "Sid":"AllowListingOfDataFolder",
          "Action":[
            "s3:ListBucket"
          ],
          "Effect":"Allow",
          "Resource":[
            "arn:aws:s3:::<bucket_name>"
          ],
          "Condition":{
            "StringLike":{
              "s3:prefix":[
                "<prefix>*" //[tl! ~~]
              ]
            }
          }
        },
        {
          "Sid":"AllowAllS3ReadActionsInDataFolder",
          "Effect":"Allow",
          "Action":[
            "s3:GetObject",
            "s3:ListBucket"
          ],
          "Resource":[
            "arn:aws:s3:::<bucket_name>/<prefix>*" //[tl! ~~]
          ]
        },
        {
          "Sid":"AllowUpdateS3EventNotification",
          "Effect":"Allow",
          "Action":[
            "s3:PutBucketNotification",
            "s3:GetBucketNotification"
          ],
          "Resource":[
            "arn:aws:s3:::<bucket_name>" //[tl! ~~]
          ]
        }
      ]
    }
    ```
   
4. Go to **Permissions** for the role. Attach the policy created in step3 to the role.

## Add and configure the Amazon S3 source

Complete the following steps to configure the Amazon S3 source:

1. [Configure and verify the connection](#configure-and-verify-the-connection)
2. [Select the file](#select-the-file)
3. [Create the converter configuration](#create-the-converter-configuration)
4. [Enable the source](#enable-the-source)

### Configure and verify the connection

In Amplitude, create the S3 Import source.

{{partial:admonition type="tip" title=""}}
Amplitude recommends that you create a test project or development environment for each production project to test your instrumentation.
{{/partial:admonition}}

To create the data source in Amplitude, gather information about your S3 bucket:

- IAM role ARN: The IAM role that Amplitude uses to access your S3 bucket. This is the role created in [Give Amplitude access to your S3 bucket](#give-amplitude-access-to-your-s3-bucket).
- IAM role external id: The external id for the IAM role that Amplitude uses to access your S3 bucket. This is the external id created in [Give Amplitude access to your S3 bucket](#give-amplitude-access-to-your-s3-bucket).
- S3 bucket name: The name of the S3 bucket with your data.
- S3 bucket prefix: The S3 folder with your data.
- S3 bucket region: The region where S3 bucket resides.

When you have your bucket details, create the Amazon S3 Import source.

1. In Amplitude Data, click **Catalog** and select the **Sources** tab.
2. In the Warehouse Sources section, click **Amazon S3**.
3. Select **Amazon S3**, then click **Next**. If this source doesn’t appear in the list, contact your Amplitude Solutions Architect.
4. Complete the **Configure S3 location** section on the Set up S3 Bucket page:

    - **Bucket Name**: Name of bucket you created to store the files. For example, `com-amplitude-vacuum-<customername>.` This tells Amplitude where to look for your files.
    - **Prefix**: Prefix of files to be imported. If it's a folder, prefix must end with "/". For example, dev/event-data/. For root folder, leave it as empty.
    - **AWS Role ARN**. Required.
    - **AWS External ID**. Required.
    - **AWS Region**, Required.
5. Optional: enable **S3 Event Notification**. 
  
  * Event notification enables Amplitude's ingestion service discover data in your S3 bucket faster. Compared to the approach of scanning buckets, the ingestion service discovers new data based on notifications that S3 publishes. This feature reduces the time it takes to find new data.
  * Use this feature if you want near-real-time import. Amplitude discovers new data within 30 seconds with notifications enabled.
  * Before you enable notifications, keep the following in mind:
    * The IAM role you use most have permission to configure bucket event notifications.
    * The bucket can't have existing event notifications. This is a limit that Amazon imposes on S3 buckets.
    * Notifications don't apply retroactively.
6. Click **Test Credentials** after you’ve filled out all the values. You can’t edit these values from the UI after you create the source, so make sure that all the info is correct before clicking **Next**.
7. Enter a **Data Source Name** and a **Description** (optional) and save your source. You can edit these details from Settings.

 Next, create your converter configuration.

Amplitude continuously scans buckets to discover new files as they're added.

### Select the file

1. Specify the file type, compression type, and regular expression pattern for your files. The boilerplate of your converter file prepopulates based on the selections you make during this step. Click **See Preview** to test the configuration.
2. Click Next.

{{partial:admonition type="note" heading=""}}
If you add new fields or change the source data format, update your converter configuration
{{/partial:admonition}}

### Create the converter configuration

The converter configuration gives the S3 vacuum this information:

- A pattern that tells Amplitude what a valid data file looks like. For example: `\w+\_\d{4}-\d{2}-\d{2}.json.gz`
- Whether the file is compressed, and if so, how.
- The file’s format. For example: CSV (with a particular delimiter), or lines of JSON objects.
- How to map each row from the file to an Amplitude event or mutation.

#### Select the data type

You can import event, user property, and group property data.

| Data Type        | Description                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Event            | Includes user actions associated with either a user ID or a device ID and may also include event properties.                                                             |
| User Properties  | Includes dictionaries of user attributes you can use to segment users. Each property is associated with a user ID.                                                       |
| Group Properties | Includes dictionaries of group attributes that apply to a a group of users. Each property is associated with a group name.                                               |
| Profiles         | Includes dictionaries of properties that relate to a user profile. Profiles display the most current data synced from your warehouse, and are associated with a user ID. |

#### Select the import strategy

Select from the following strategies, depending on your data type selection. 

| Strategy            | Description                                                                                                                                                                                                                                                                  |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mirror Sync         | Directly mirrors the data in S3 with `INSERT`, `UPDATE`, and `DELETE` operations. To keep the data in sync with your source of truth, this strategy deactivates Amplitude's enrichment services like user property syncing, group property syncing, and taxonomy validation. |
| Ingestion Only Sync | Imports new rows with Amplitude's standard enrichment services.                                                                                                                                                                                                              |

See the following table to understand which data types are compatible with which import strategies.

| Data type        | Supported import strategies |
| ---------------- | --------------------------- |
| Event            | Mirror and Ingestion        |
| User properties  | Ingestion                   |
| Group properties | Ingestion                   |
| Profiles         | Mirror                      |


{{partial:admonition type="note" heading="Mutations and event volume"}}
When you use mutations, Amplitude doesn't merge `INSERT`, `UPDATE`, or `DELETE` operations to per-row mutations based on your sync frequency. This means that when more than one operation is made to an event during the sync window, they may apply out of order. Each operation also counts toward your event volume. As a result, you may use your existing event volume more quickly than you otherwise would. Contact sales to purchase additional event volume.
{{/partial:admonition}}

Find a list of supported fields for events in the [HTTP V2 API documentation](/docs/apis/analytics/http-v2#keys-for-the-event-argument) and  for user properties in the [Identify API documentation](/docs/apis/analytics/identify#identification-parameter-keys). Add any columns not in those lists to either `event_properties` or `user_properties`, otherwise it's ignored. 

After you add all the fields you wish to import, view samples of this configuration in the Data Preview section. Data Preview automatically updates as you include or remove fields and properties. In Data Preview, you can look at a few sample records based on the source records along with how that data is imported into Amplitude. This ensures that you are bringing in all the data points you need into Amplitude. You can look at 10 different sample source records and their corresponding Amplitude events.


{{partial:admonition type="note" title=""}}
The group properties import feature requires that groups are set in the [HTTP API event format](/docs/apis/analytics/http-v2). The converter expects a `groups` object and a `group_properties` object.
{{/partial:admonition}}

#### Manual converter creation

The converter file tells Amplitude how to process the ingested files. Create it in two steps: first, configure the compression type, file name, and escape characters for your files.

Then use JSON to describe the rules your converter follows.

The converter language describes extraction of a value given a JSON element. You specify this with a SOURCE_DESCRIPTION, which includes:

- BASIC_PATH
- LIST_OPERATOR
- JSON_OBJECT

{{partial:admonition type="example" title="Example converters"}}
See the [Converter Configuration reference](/docs/data/converter-configuration-reference) for more help.
{{/partial:admonition}}

### Enable the source

When your converter is configured, click **Save and Enable** to enable the source.

## Troubleshooting

- Make sure you give access to the correct Amplitude account. Use the same data center as your organization. For more information, see [Give Amplitude access to your S3 bucket](#give-amplitude-access-to-your-s3-bucket).
- Amplitude doesn't support dot characters in bucket names. Ensure your bucket names consist of lower-case letters, numbers, and dashes.
- You can use an existing bucket that you own. Update the bucket's policy with the output from the Amplitude wizard to ensure compatibility.
