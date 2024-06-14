---
id: f8f8b50e-f22a-4c92-8845-01e630b6f7d6
blueprint: billing-use
title: 'Usage reports: Understand how your organization uses Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/360049166012-Usage-reports-Understand-how-your-organization-uses-Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715291365
this_article_will_help_you:
  - 'Interpret the different charts within usage reports'
---
Amplitude’s **usage reports** will help you identify trends and patterns of Amplitude usage within your organization. Use it to better understand where your company’s analytics practice is strongest, as well as opportunities to further maximize the value your organization gets from Amplitude. 

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only. See our [pricing page](https://amplitude.com/pricing) for more details.

## Access usage reports

Usage reports include ten charts (visible on the User Metrics tab) that deliver the metrics you need to effectively drive Amplitude adoption in your organization, as well as a report (visible on the Event Usage tab) that describes how your ingested events are being used within Amplitude across all projects in your organization.

Usage reports are accessible by navigating to *Settings >* *Organization settings >* *Usage Reports*.

{{partial:admonition type='note'}}
 Only admins or managers on all projects can view usage reports.
{{/partial:admonition}}

## The User Metrics tab

### Summary metrics

The Summary Metrics chart displays the total number of users in your organization, along with several metrics summarizing key aspects of Amplitude adoption and engagement. The three trend over time metrics give you the percentage change in retention, weekly learning users, broadcasted learnings, and engagement by team over the past 90 days.

### User metrics

![usage_reports_user_metrics.png](/docs/output/img/billing-use/usage-reports-user-metrics-png.png)

The User Metrics panel is where you will find information on active user count, top users and teams, and depth of engagement. You can set the active users chart to display data on a monthly, weekly, or daily basis by clicking on the appropriate buttons in the top corner. The summary statistics included in this chart work the same as the ones you’ll find in the [KPI view](#h_01ES43BE6YJMSD6KZTR7XH7ZN0). 

If you want to know which users or teams in your organization performed the most queries in Amplitude, the Top Users and Teams chart in the lower left will tell you. Here, a “query” is defined as occurring whenever a chart, dashboard, or notebook is loaded or created. When you switch from top users to top teams, the values shown are based on the teams selected by users when they created an Amplitude account. 

Amplitude calculates depth of engagement using the number of edits per session as a proxy. More edits suggest users are highly engaged in the charts they’re viewing.

### Detailed KPIs

The Detailed KPIs panel gives you a more in-depth look at some of the metrics shared in the Summary Metrics panel. **Weekly learning users** is a way to measure the breadth of Amplitude engagement in your organization: it’s the count of active Amplitude users who’ve shared a learning which is then consumed by at least two other people in the previous seven days. 

**Broadcasted learnings**, by contrast, is designed to measure depth. It’s based on a count of charts, dashboards, and notebooks consumed by two or more people in a seven-day period. [Learn more about the metrics and why they're important](https://amplitude.com/north-star/amplitudes-north-star-metric-and-inputs).

### Content Usage

![usage_reports_content_usage.png](/docs/output/img/billing-use/usage-reports-content-usage-png.png)  

The Content Usage panel gives you insight into the Amplitude features and content—chart types, dashboards, and notebooks—your people rely on most. You can view content by clicking the titles, provided you have the proper permissions to do so.

### Export the usage report

To export the report as a PDF or PNG, click the export icon in the upper-right corner.

![usage_reports_export.png](/docs/output/img/billing-use/usage-reports-export-png.png)

## The Event Usage tab

On the Events Usage tab, you'll find a downloadable, **organization-level** usage report in .CSV or JSON format, detailing usage of events across all projects and portfolios within your org. This is intended for organization admins to review Amplitude usage across your company. Generate an up-to-date report whenever you like by clicking *Generate Report*.

In Amplitude, event usage is measured by **queries**. Amplitude defines a query as the **selection of an event** in the definition of a chart, segment, or cohort. When you use [custom events](/docs/analytics/charts/event-segmentation/event-segmentation-in-line-events) or metrics that are composed of multiple events, queries for **each component event** are tallied separately.

![Screenshot_2023-04-24_at_17.47.39.png](/docs/output/img/billing-use/screenshot-2023-04-24-at-17-47-39-png.png)

Events queried in [cross-project views](/docs/analytics/user-data-lookup), or when an event appears in the path in a [pathfinder analysis](/docs/analytics/charts/journeys/journeys-understand-paths).

{{partial:admonition type='note'}}
If you do not have access to the query counts feature, contact Amplitude Support to enable it.
{{/partial:admonition}}

All events that have ever been included in Amplitude are part of both files. This includes both blocked and deleted events.

#### CSV fields and definitions

* **Event volume**: Total event volume ingested by Amplitude
* **First Seen & Last Seen**: First and last date the event was ingested
* **N Day Queries**: Count of queries in the last N days
* **N Day Volume**: Total count of event ingestion in the last N days
* **# of Users**: Total number of users who have ever queried an event
* **# of Charts**: Total count of all charts that have ever included the event in their definitions
* **# of Cohorts**: Total count of cohorts that have ever included the event in their definitions
* **User IDs**: A list of the email addresses \*
* **Chart IDs**: A list of the chart IDs \*
* **Cohort IDs**: A list of the cohort IDs \*

\* These lists detail the counts of the previous three columns. They can be very long, often exceeding the cell size limit in spreadsheets.

#### JSON fields and definitions

* **Event volume**: Total event volume ingested by Amplitude
* **Query count**: Count of queries against an event when used in charts, cohorts, custom events
* **Last\_seen**: Last date of event ingestion
* **First\_seen**: First date of event ingestion
* **Views**: Total number of views on charts and cohorts for an event
* **Owners**: Current owners of a chart, cohort, or custom event
* **Viewers**: Unique viewers for charts and cohorts

{{partial:admonition type='note'}}
Amplitude Analytics also provides a project-level usage report. It is accessible from within Govern.
{{/partial:admonition}}