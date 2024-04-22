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
With Amplitude’s Amazon S3 Import, you can import event, group properties, or user properties into your Amplitude projects from an AWS S3 bucket. Use Amazon S3 Import to backfill large amounts of existing data, connect existing data pipelines to Amplitude, and ingest large volumes of data where you need high throughput and latency is less sensitive.


During setup, you configure conversion rules to control how events are instrumented. After Amazon S3 Import is set up and enabled, Amplitude's ingestion service continuously discovers data files in S3 buckets and then converts and ingest events.

Amazon S3 Import setup has four main phases:

1. Examine your existing dataset.
2. Add a new Amazon S3 Import source in Amplitude.
3. Set up converter configuration.
4. Test.

## Getting started

### Prerequisites

Before you start, make sure you’ve taken care of some prerequisites.

- Make sure that an Amplitude project exists to receive the data. If not, create a new project.
- Make sure you are an Admin or Manager of the Amplitude project.
- Make sure your S3 bucket has data files ready for Amplitude to ingest. They must conform to the mappings that you outline in your converter file.

Before you can ingest data, review your dataset and consider best practices. Make sure your dataset contains the data you want to ingest, and any required fields.

### File requirements

The files you want to send to Amplitude must follow some basic requirements:

- Files contain events, with one event per line.
- Files are uploaded in the events’ chronological order.
- Filenames are unique.
- The file wasn't ingested by the S3 import. After a file is ingested by a S3 import source, the same S3 import source doesn't process the file again, even if the file receives an update.
- File size must be greater than 1MB and smaller than 1GB.
- Files are compressed or uncompressed JSON, CSV, or parquet files.

### Limits

For each Amplitude project, AWS S3 import can ingest:

- Up to 50 files per second.
- Up to 30k events per second.

### Deduplication with `insert_id`

Amplitude uses a unique identifier, `insert_id`, to match against incoming events and prevent duplicates. If within the same project, Amplitude receives an event with `insert_id` and `device_id` values that match the `insert_id` and `device_id` of a different event received within the last 7 days, Amplitude drops the most recent event.

Amplitude highly recommends that you set a custom `insert_id` for each event to prevent duplication. To set a custom `insert_id`, create a field that holds unique values, like random alphanumeric strings, in your dataset. Map the field as an extra property named `insert_id` in the guided converter configuration.

## Set up Amazon S3 Import in Amplitude

When your dataset is ready for ingestion, you can set up Amazon S3 Import in Amplitude.

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
            "AWS": "arn:aws:iam::{{amplitude_account}}:root" //[tl! ~~]
          },
          "Action": "sts:AssumeRole",
          "Condition": {
            "StringEquals": {
              "sts:ExternalId": "{{external_id}}" //[tl! ~~]
            }
          }
        }
      ]
    }
    ```

3. Create a new IAM policy, for example, `AmplitudeS3ReadOnlyAccess`. Use the entire example code that follows, but be sure to update **{{}}** in highlighted text.

    - **{{bucket_name}}**: the s3 bucket name where your data is imported from.
    - **{{prefix}}**: the optional prefix of files that you want to import, for example `filePrefix`. For folders, make sure prefix ends with `/`, for example `folder/`. For the root folder, keep prefix as empty.

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
            "arn:aws:s3:::{{bucket_name}}"
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
            "s3:ListObjects"
          ],
          "Resource":[
            "arn:aws:s3:::{{bucket_name}}/*" //[tl! ~~]
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
            "arn:aws:s3:::{{bucket_name}}" //[tl! ~~]
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
            "arn:aws:s3:::{{bucket_name}}"
          ],
          "Condition":{
            "StringLike":{
              "s3:prefix":[
                "{{prefix}}*" //[tl! ~~]
              ]
            }
          }
        },
        {
          "Sid":"AllowAllS3ReadActionsInDataFolder",
          "Effect":"Allow",
          "Action":[
            "s3:GetObject",
            "s3:ListObjects"
          ],
          "Resource":[
            "arn:aws:s3:::{{bucket_name}}/{{prefix}}*" //[tl! ~~]
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
            "arn:aws:s3:::{{bucket_name}}" //[tl! ~~]
          ]
        }
      ]
    }
    ```
   
4. Go to **Permissions** for the role. Attach the policy created in step3 to the role.

### Create Amazon S3 import source

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
5. Optional: enable **S3 Event Notification**. See [Manage Event Notifications](#optional-manage-event-notifications) for more information.
6. Click **Test Credentials** after you’ve filled out all the values. You can’t edit these values from the UI after you create the source, so make sure that all the info is correct before clicking **Next**.
7. From the Enable Data Source page, enter a **Data Source Name** and a **Description** (optional) and save your source. You can edit these details from Settings.

A banner confirms you’ve created and enabled your source. Click **Finish** to go back to the list of data sources. Next, you must create your converter configuration.

Amplitude continuously scans buckets to discover new files as they're added. Data is available in charts within 30 seconds of ingestion.

### Optional: Manage event notifications

Event Notification lets the Amplitude ingestion service discover data in your S3 bucket faster. Compared to the current approach of scanning buckets, it discovers new data based on notifications published by S3. This feature reduces the time it takes to find new data.

Use this feature if you want to achieve near real-time import with Amplitude Amazon S3 import. Usually, Amplitude discovers new data files within 30 seconds.

#### Considerations

- The IAM role used must have required permission to configure S3 bucket event notifications.
- The bucket can’t already have existing event notifications This is a limitation on the Amazon S3 side.
- The notifications only apply to files uploaded after you enable event notifications.

To enable the feature, you can either enable it when you create the source, or manage the data source and toggle **S3 Event Notification**.

## Create the converter configuration

Your converter configuration gives the S3 vacuum this information:

- A pattern that tells Amplitude what a valid data file looks like. For example:**“\\w+\_\\d{4}-\\d{2}-\\d{2}.json.gz”**
- Whether the file is compressed, and if so, how.
- The file’s format. For example: CSV (with a particular delimiter), or lines of JSON objects.
- How to map each row from the file to an Amplitude event.

### Guided converter creation

You can create converters via Amplitude's new guided converter creation interface. This lets you map and transform fields visually, removing the need to manually write a JSON configuration file. Behind the scenes, the UI compiles down to the existing JSON configuration language used at Amplitude.

First, note the different data types you can import: **Event**, **User Property** and **Group Property** data.

Amplitude recommends selecting preview in step 1 of the Data Converter, where you see a sample source record before moving to the next step.

After you have selected a particular field, you can choose to transform the field in your database. You can do this by clicking **Transform** and choosing the kind of transformation you would like to apply. You can find a short description for each transformation.

After you select a field, you can open the transformation modal and choose from a variety of Transformations.

Depending on the transformation you select, you may need to include more fields. 

After you have all the fields needed for the transformation, you can save it. You can update these fields as needed when your requirements change.

You can include more fields by clicking the **Add Mapping** button. Here Amplitude supports 4 kinds of mappings: Event properties, User Properties, Group Properties and Additional Properties. 

Find a list of supported fields for events in the [HTTP V2 API documentation](/analytics/apis/http-v2-api/#keys-for-the-event-argument) and  for user properties in the [Identify API documentation](/analytics/apis/identify-api/#identification-parameter-keys). Add any columns not in those lists to either `event_properties` or `user_properties`, otherwise it's ignored. 

After you have added all the fields you wish to bring into Amplitude, you can view samples of this configuration in the Data Preview section. Data Preview automatically updates as you include or remove fields and properties. In Data Preview, you can look at a few sample records based on the source records along with how that data is imported into Amplitude. This ensures that you are bringing in all the data points you need into Amplitude. You can look at 10 different sample source records and their corresponding Amplitude events.


{{partial:admonition type="note" title=""}}
The group properties import feature requires that groups are set in the [HTTP API event format](/apis/http-v2-api). The converter expects a `groups` object and a `group_properties` object.
{{/partial:admonition}}

### Manual converter creation

The converter file tells Amplitude how to process the ingested files. Create it in two steps: first, configure the compression type, file name, and escape characters for your files.
 Then use JSON to describe the rules your converter follows.

The converter language describes extraction of a value given a JSON element. You specify this with a SOURCE_DESCRIPTION, which includes:

- BASIC_PATH
- LIST_OPERATOR
- JSON_OBJECT

{{partial:admonition type="example" title="Example converters"}}
See the [Converter Configuration reference](/data/converter-configuration-reference) for more help.
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
## Enable the source

After you’ve created the S3 Import source and the converter configuration, you must enable the source to begin importing data.

To enable the source:

1. Navigate to the source’s page, and click the **gear** icon to manage the data source.
2. Toggle **Status** to active.
3. Confirm your changes.

## Troubleshooting

- Make sure you give access to the correct Amplitude account. Use the same data center as your organization. For more information, see [Give Amplitude access to your S3 bucket](#give-amplitude-access-to-your-s3-bucket).
- Amplitude don't support dot characters in bucket names. Ensure your bucket names consist of lower-case letters, numbers, and dashes.
- You can use an existing bucket that you own. Update the bucket's policy with the output from the Amplitude wizard to ensure compatibility.