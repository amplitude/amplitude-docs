---
id: 66c054fb-7251-4793-88e2-9c10b4f5d72b
blueprint: faq_and_troubleshooting
title: 'Data export'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360043781072'
category: governance

---
This article covers some frequently asked questions about exporting data out of Amplitude. 

- How do I export raw data for a chart or event?   
- Can I export the raw event data for the events included in this chart instead of the chart results?   
- How do I export a .CSV of all occurrences of a specific event?   
- How do I see the data that was pulled into this chart?   
- Can I see event and user property values for every instance of this event in the last 30 days?

These questions all have the same answer. There is currently no way to export selected raw data for a chart or all data for selected events. Amplitude was built to perform large-scale, complex analyses inside the application. Because of this, isolating and exporting event data in a SQL-like manner is not supported.

However, there are a few alternatives that might help you.

## Export API

To export all values of an event and its event properties, you can use Amplitude's [Export API](/docs/apis/analytics/export). This API will export **all** events across a specified time range and return them in JSON format. Once exported, you can extract the values of the specific events you are looking for.

If your data exceeds the size limitation of the Export API, consider using the self-service Amazon S3 Export option (described below) instead.

## Query Add-on: Amplitude SQL / Snowflake ETL

With the [Query](/docs/analytics/charts/other-charts/other-charts-amplitude-sql) add-on, you can perform SQL-like queries in an Amplitude-maintained Snowflake instance. For customers who have an existing relationship with Snowflake, Amplitude can also share data from an Amplitude-managed Snowflake account to a customer-managed Snowflake account. This add-on is only available for Growth and Enterprise accounts, and would require an additional purchase on top of a paid plan.

## Amazon S3 Export

You can integrate Amplitude with Amazon S3 to export your event data to an Amazon S3 bucket This integration is available in all accounts, including accounts with free plans. Learn more about [Amazon S3 Export](/docs/data/destination-catalog/amazon-s3).
