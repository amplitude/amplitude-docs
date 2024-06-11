---
title: "Understand the data differences between Amplitude, Snowflake, and the Export API"
source: "https://help.amplitude.com/hc/en-us/articles/360043976571-Understand-the-data-differences-between-Amplitude-Snowflake-and-the-Export-API"
id: 69cefed6-2b87-4333-8cc6-ba5bac1b41e5
---

In some cases, you may notice differences between your Amplitude data and the data in both Snowflake and Redshift, or data exported using the Export API. Often, these are related to the [event time](/docs/analytics/user-data-lookup) used by each platform. In [Snowflake](/docs/data/destination-catalog/snowflake), as well as data exported using the [Export API](/docs/apis/analytics/export), event time is specified in UTC timezone. The data shown in Amplitude charts depends on the timezone settings for the project.

## Difference between Amplitude and Snowflake

If the timezone setting for the Amplitude project is different than UTC, you will likely see differences in the data shown in Amplitude charts compared to the data in Snowflake. 

When comparing data, make sure you are comparing the same queries. For example, if you query data for event totals in Snowflake, be sure to check the event totals tab in the Event Segmentation chart. Learn more in our Help Center article on [SQL in Amplitude](/analytics/charts/other-charts/other-charts-amplitude-sql).

## Difference between Amplitude and Export API

The specified date range for the export query is the time of when the event data was uploaded to Amplitude servers (see `server_upload_time`  definition).

For that reason, you can expect differences in the data shown in Amplitude charts when compared with the data from the export API.
