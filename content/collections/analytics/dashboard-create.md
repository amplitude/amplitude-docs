---
id: 19c03845-d834-4777-af7c-904a6fa82cd7
blueprint: analytic
title: 'Create, edit, and manage dashboards'
source: 'https://help.amplitude.com/hc/en-us/articles/229505188-Create-edit-and-manage-dashboards'
---
#### This article will help you:

* Create and edit dashboards
* Comment on your dashboards
* Manage your dashboards

With dashboards, you can collect all your relevant charts into a single, convenient view. You can save multiple reports into a single page view, rather than viewing each individual report in isolation. You can even save cross-project charts into the same dashboard, for side-by-side comparisons.  

**NOTE:** You may also find [this Academy course](https://academy.amplitude.com/use-dashboards-and-starter-templates-to-monitor-important-metrics/1372313/scorm/w84tdkh3z11p) on dashboards helpful.

## Before you begin

Dashboards are available to all all Amplitude customers. However, certain features are only available for customers on [Scholarship](https://help.amplitude.com/hc/en-us/articles/360053028152), [Growth and Enterprise](https://amplitude.com/pricing) plans:

* * Adding behavioral cohorts to a dashboard
	* Dashboard date range (bulk filter)
	* Dashboard user segment (bulk filter)
	* Comment
	* Adding target metrics

You'll have to save your charts before adding them to a dashboard. Read more about creating and saving charts [here](/get-started/create-a-chart).

Also, be aware that [Pathfinder Users](/analytics/charts/journeys/journeys-understand-paths) is currently not supported by dashboards, and that customers on Starter plans are limited to 50 dashboard subscriptions (i.e., they can subscribe to 50 different dashboards).

You may also find the following dashboards articles useful:

* [Change your dashboard's display preferences](/analytics/dashboard-preferences)
* [Filter your dashboards](/analytics/dashboard-filter)
* [Subscribe to a dashboard](/analytics/dashboard-subscribe)
* [Turn your dashboard into a template](/analytics/dashboard-create-template)

## Create a dashboard

To create a dashboard, follow these steps:

1. Navigate to *Create New > Report > Dashboard* to create a dashboard from scratch. Alternatively, click *+ Add to* from within an existing chart and select *+ Create a new dashboard* from the menu.
2. Type the name of your new dashboard where it reads *Untitled Dashboard*. Amplitude will save your new, still-empty dashboard.
3. To add content to your dashboard, click *Add Content* and select the type of content you want to include from the drop-down. Then select the specific items from the panel that opens on the right.  
  
**NOTE:** You can also build your dashboard from an existing template, by clicking *Start With A Template* and choosing from the drop-down list.

## Edit a dashboard

If you're the owner or co-owner of a dashboard, you'll be able to make edits to it. These include adding charts or cohorts to the dashboard and designating the dashboard as an official source of truth within your organization.

### Add charts to your dashboard

You can add charts to your dashboard either from inside the dashboard, or from within the chart itself. To populate your new dashboard with charts **from within your dashboard**, follow these steps:

1. From within the dashboard, click *+ Add Content* and select the type of content you want to include from the drop-down. Then select the specific items from the panel that opens on the right.
2. Repeat step 1 until you've added all the content you need for your dashboard.

### Add cohorts to your dashboard

You can add a [behavioral cohort](/analytics/behavioral-cohorts) to a dashboard. This will display the number of users in a cohort and when it was last computed. 

**NOTE:** This feature is only available to customers on a Scholarship, Growth, or Enterprise plan.

To add a cohort to your dashboard, follow these steps:

1. Save your cohort and click *+ Add to.*
2. Select the dashboard you'd like to add this cohort to from the list.   
  
**NOTE:** You can also add a cohort to your dashboard from within the dashboard itself: just select *Add Chart or Cohort* from the *More* menu.

You can view any cohort on your dashboard by current cohort population, or the cohort population over time. To switch to viewing the cohort population over time, click •••. Then select *Population Over Time*.

**NOTE:** For any chart or query that segments on a cohort, the segmented cohort will automatically recompute itself whenever the chart is generated. Cohorts added to dashboards will also refresh.

### Designate your dashboard as "official"

In many organizations, it can be challenging for Amplitude users to identify the charts and dashboards they can rely on as a “source of truth”—in other words, dashboards that can be trusted to be accurate, up to date, and relevant. This is especially true in analysis-heavy organizations, where source-of-truth content can be overwhelmed by the sheer volume of ad hoc analyses generated. By making this content easier to find and reference, Amplitude’s Official Dashboards feature can help newer users find their footing more quickly, and ramp up to generating productive analyses sooner.

By designating a dashboard as “official,” you’re telling all Amplitude users in your organization that they can trust the content they find on it to be current, accurate, and vetted. It’s an excellent tool for tracking and broadcasting company-wide KPIs, team-specific KPIs, final analysis for a feature or experiment, or for onboarding new employees and team members.

This feature is only available for users on Growth, Scholarship, and Enterprise plans.

**NOTE**: Only an admin or manager can designate an official dashboard.

To label a dashboard as official, follow these steps:

1. Open the dashboard you’d like to make official.
2. Hover over the ![official_icon.png](/output/img/analytics/official_icon.png) icon next to the dashboard’s title.
3. In the popup that appears, click *Confirm*.

You will now be a co-owner of the dashboard; this will include editing privileges. If you are not the original owner of the dashboard, that person will receive a notification.

**NOTE:** Removing a dashboard’s official designation works the same way.

## Comment on your dashboard

You can start a discussion around your analyses right alongside your charts on a dashboard. This is useful for teams to discuss and iterate on their findings. 

**NOTE:** This feature is only available to customers on a Scholarship, Growth, or Enterprise plan.

To comment, click *More > Comment*. You can also mention colleagues by typing their name after "@". They will receive an Amplitude notification.

You can also receive a notification via Slack. More information on how to integrate Slack can be found [here](/analytics/integrate-slack).  

## Copy, download, export, refresh, or archive your dashboard

The *More* menu contains several administrative functions not discussed above:

![dashboards_final_section_more_menu_image.png](/output/img/analytics/dashboards_final_section_more_menu_image.png)

* Refreshing all charts will update all charts and cohorts included in your dashboard, so that it displays the most up-to-date information.
* When downloading a .CSV of a chart, the downloaded file will contain a summary of the chart, the dashboard URL, and all events, segments, and user properties.
* When exporting your dashboards, you can choose between .PDF and .PNG formats.
* When copying a dashboard, you will be the owner of the copied version, regardless of whether you own the original version.
* Dashboards cannot be deleted, but they can be archived. You should archive a dashboard when it is no longer supported or used. Users can still search for archived charts in the Search tab. Archiving a dashboard will not archive the charts within the dashboard.

## Dashboard cache times

Amplitude caches chart results. The cache time is dependent on the interval (daily, weekly, monthly) and the length of time covered. Cache times for charts can be found [here](/analytics/charts/chart-basics). Cache times for dashboards and CSV downloads are twice as long as the times listed.

To manually refresh all charts and cohorts on a dashboard, click *More > Refresh Dashboard*. 
