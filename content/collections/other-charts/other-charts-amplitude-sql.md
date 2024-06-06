---
id: c7cb6e27-26b0-4f01-a613-3debe6f94fff
blueprint: other-chart
title: 'Amplitude SQL: Getting started with Query'
source: 'https://help.amplitude.com/hc/en-us/articles/115001902492-Amplitude-SQL-Getting-started-with-Query'
this_article_will_help_you:
  - 'Query your Snowflake database using custom SQL'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717104940
landing: true
landing_blurb: 'Query your Snowflake database using custom SQL'
---
#### This article will help you:

* Query your Snowflake database using custom SQL

The Amplitude Query product allows customers to query their raw data via their Amplitude-managed [Snowflake](https://www.snowflake.net/) database. Query also includes a powerful new chart type called **Amplitude SQL** that allows customers to write custom SQL against their Amplitude data directly inside the Amplitude platform.

{{partial:admonition type='note'}}
 Data is loaded into Snowflake every 30 minutes.
{{/partial:admonition}}

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only and requires the **Query add-on**; further, it is no longer available for purchase.

See our [pricing page](https://amplitude.com/pricing) for more details.

This feature is also **not available in the EU**.

## Getting started

Amplitude SQL is accessible just like any other chart type, via *Create New > Chart > All chart types.* It can be saved, shared, and added to a dashboard just like any other chart.

{{partial:admonition type='note'}}
 This feature currently does not support queuing data for [Portfolio Views](/docs/admin/account-management/portfolio).
{{/partial:admonition}}

Alternatively, you can connect directly to your Snowflake database via a terminal or 3rd-party application, such as SQL Workbench or the [Snowflake connector for Python](https://docs.snowflake.net/manuals/user-guide/python-connector.html). Please [reach out to us](/docs/hc/en-us/requests/new) or contact your Success Manager for your Snowflake credentials. 

## Set up and syntax

The Query package uses a [simplified table schema](/docs/analytics/charts/other-charts/other-charts-amplitude-sql-schema) for Snowflake and Amplitude SQL. The schema includes a **single table** that can be referenced using the shorthand `$events`. 

If you want to access other tables, you can use the full name which can be found by clicking *Show Schema*.

With Query, one of the major benefits is the unlimited number of data fields that can exist in the table. Custom user properties and event properties are stored as [variants](https://docs.snowflake.net/manuals/sql-reference/data-types-semistructured.html#variant), and they are queryable as individual columns. Custom user properties are prefixed with `user_properties:` and all event properties are prefixed with `event_properties:`.

{{partial:admonition type='note'}}
 If your user or event properties contain a period or a space, then you will need to wrap the name of the property in quotes. For example, `user_properties:"first name"`.
{{/partial:admonition}}

If you are searching for a certain value, you will have to wrap the value of the property in single quotes. For example, `user_properties:"plan type"='enterprise'`.

By default, Amplitude SQL shows a simple SQL query for events performed in the past 30 days. The SQL syntax includes the following fields:

* `$date` as *Date* (the date of the events)
* `COUNT(DISTINCT $amplitude_id)` with the alias *Uniques* (count of unique users)
* `COUNT($amplitude_id)` as *Totals* (total count of users)

The SQL syntax will be highlighted to help you distinguish SQL commands from the rest of your query. 

![Screen_Shot_2019-10-30_at_10.01.20.png](/docs/output/img/other-charts/screen-shot-2019-10-30-at-10-01-20-png.png)

In addition, Amplitude SQL supports autocomplete of columns in the table. As you type, the query editor will recommend columns to help expedite your typing.

![Screen_Shot_2019-10-30_at_10.02.27.png](/docs/output/img/other-charts/screen-shot-2019-10-30-at-10-02-27-png.png)

## Query results

Once you have completed the desired SQL, click *Compute* to execute your query. When your query has finished running, you will see:

* Query results displayed in a data table.
* A time series chart of the results below the table.

![Screen Shot 2019-10-30 at 10.03.11.png](/docs/output/img/other-charts/screen-shot-2019-10-30-at-10-03-11-png.png)

To customize the time series visualization, there is a set of controls that you can use below the query editor. The options available in the visualization controls are the fields that you return in your SQL `SELECT` statement. For example, in the query above, the 3 fields we can visualize are *DATE*, *UNIQUES*, and *TOTALS*.

* **X-axis column:** Select what is plotted on the X-axis. Currently, only time series are supported.
* **Metric column:** Select which field is returned in your SQL `SELECT` statement to plot it on the Y-axis.

### Applying group-bys

To group the chart by a column, enter the name of the column in the *Label columns* field. Then click *Compute*.

### Sharing and saving queries

Like other Amplitude charts, you are able to export the results as a PNG, PDF, or CSV file by navigating to *More > Export*. You can also save your analysis and share it with your team or even add the visualizations you create to a dashboard in Amplitude.

![Screen_Shot_2019-10-30_at_10.04.39.png](/docs/output/img/other-charts/screen-shot-2019-10-30-at-10-04-39-png.png)

{{partial:admonition type='note'}}
 The results of the data table and the .CSV export are capped at 1,000 rows. 
{{/partial:admonition}}

Next, learn about [**special field shortcuts** to query your Snowflake data more quickly](/docs/analytics/charts/other-charts/other-charts-amplitude-sql-schema) .