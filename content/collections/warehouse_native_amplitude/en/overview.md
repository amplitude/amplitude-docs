---
id: 3d639f6c-44b5-4ece-b4a6-7af8b4277da0
blueprint: warehouse_native_amplitude
title: 'Warehouse-native Amplitude: Overview'
this_article_will_help_you:
  - 'Run analyses from data in your own data warehouse'
source: 'https://help.amplitude.com/hc/en-us/articles/26003996242203-Warehouse-native-Amplitude-Run-analyses-from-data-in-your-own-data-warehouse'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720732273
landing: true
landing_blurb: 'Your data warehouse stores critical data on every aspect of your business.'
---
Your data warehouse stores critical data on every aspect of your business. But some of that data never makes its way into Amplitude, making it inaccessible for Amplitude analyses you want to run.

With Warehouse-native Amplitude (WNA), you can create custom analyses using data models based directly on data living in your data warehouse. Because you no longer ingest event and end user data into Amplitude, you can quickly unlock more and newer datasets, especially those that are time-sensitive. And just like standard Amplitude, WNA quickly delivers insights into user behavior, identifies trends, and makes data-driven decisions to improve your business, all based on data sitting in your own data warehouse.

## Create a warehouse-native project

To create a Warehouse-native project in your Amplitude organization: 

1. From Amplitude, navigate to Settings > Organization settings.
2. Click Projects.
3. From the Projects tab, click Create Warehouse Native Project.
4. In the modal that appears, enter a Project name that describes the project. Click Next.
5. Set the Users and roles for your project from your organization's users.
6. Amplitude creates the project, and prompts you to connect your Snowflake instance.

### Connect to Snowflake

Warehouse-native Amplitude uses a direct connection to Snowflake to generate queries and execute them in your data warehouse. You decide the size of the warehouse used to run the Amplitude-generated queries. Create a service account so that Amplitude can access the datasets in your Snowflake instance; Amplitude requires “read” access to these datasets (DB, Schema, and Table). Snowflake charges for costs associated with computing queries that Warehouse-native Amplitude generates.

After you provide the read-only credentials from Snowflake and successfully validate the connection, create your first data model.

{{partial:admonition type="note" heading=""}}
Warehouse-native Amplitude supports a single “connection” (set of credentials that are used for querying) per project. If this is too restrictive for your needs, contact Amplitude Support.
{{/partial:admonition}}

## Performance and optimization

Amplitude recommends using [clustering keys](https://docs.snowflake.com/en/user-guide/tables-clustering-keys) in tables, to improve performance and reduce latency. Consider using the date column as part of the key, since it’s included in most queries.

## Constraints

Warehouse-native Amplitude doesn't support the following [formulas](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas#list-of-available-formulas):

* HIST
* PERCENTILE
* ROLLWINBEFORE
* CUMSUM
* ACTIVE
* ARPAU
* FREQPERCENTILE
* HIST
* PERCENTILE
* PROPCOUNT
* PROPCOUNTAVG
* PROPHIST
* PROPMIN
* PROPMAX
* REVENUETOTAL

Some Amplitude charts include features that warehouse-native projects don't support. Features that aren't available include:

### Event segmentation

* Segmenting by new and active users
* Measuring events as cumulative
* Real-time intervals
* Event dropdown doesn't contain derived events, merged events, drop filters, top global events, any active event, or new user

### Funnel analysis

* Viewing events in exact order
* Measuring events as frequency, improvement, significance, A/B test, or time to convert
* Calculating the sum of X

### Retention

* Custom retention intervals
* Usage interval view
* Microscope

### Cohorts

* Segmenting by new user or propensity
* Event dropdown doesn't contain derived events, merged events, drop filters, computed properties, derived properties, prediction scores, top global events, any active event, or new user.

### Journeys

* Expanding events by property
* Completed within session
* Filter by paths > Expand by property
* Microscope
