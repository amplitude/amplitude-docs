---
id: 0c16c26c-9a94-4e5b-a136-493fb66f917d
blueprint: analytic
title: 'Account-level reporting in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/115001765532-Account-level-reporting-in-Amplitude'
this_article_will_help_you:
  - 'Build an analysis around aggregated units of measure like accounts, charts, or order IDs'
  - 'Understand how to look up accounts and users to set up account-level reporting'
  - "Use the account-level reporting feature\_when using certain Amplitude integrations, like Segment or Salesforce"
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717696950
---
n Amplitude, the default level of reporting is the **individual user**, meaning your charts and analyses will all be based on data drawn from individual users. In some cases, you may need reports built around an **aggregated** unit of measurement—say, accounts, order IDs, or charts.

The Amplitude Accounts add-on enables you to do exactly this, by giving you analytical capabilities at the **group** level.

A group is an object that a set of users might belong to—such as a company of customers, a team of users, or a playlist with listeners. Analyzing at the group level will help you understand how specific accounts interact with your product, instead of just seeing the individual users in those companies.  

### Feature availability

This feature is available to users on **Plus**, **Growth**, and **Enterprise** **plans** only.

* Use of this feature requires the Accounts add-on.

## Before you begin

* With the Accounts add-on, you are able to instrument up to five different group types per project. You can manage and remove groups via Amplitude Data.
* Account-level properties have a limit of 1000 per project.
* Changes to account groups and group properties will be applied to new data moving forward, and will not affect historical data.
* To [instrument account-level reporting in Amplitude, see our Help Center documentation](/docs/analytics/account-level-reporting-setup).

## Group-level reporting: an overview

Once you've [set up groups](/docs/analytics/account-level-reporting-setup), Amplitude will include them in a drop-down list in the [Segmentation Module](/docs/analytics/charts/build-charts-add-user-segments). From there, you'll be able to report at the group level instead of the individual user level.

![account_level_reporting_1.png](/docs/output/img/analytics/account_level_reporting_1.png)

An analysis using group-level reporting performs its counts by distinct user property groups. When might this be useful? Here are some potential use cases:

* Analyzing how many distinct accounts were active, or fired a certain event (group by account ID)
* Tracking how many charts are copied, saved, and modified in your organization, and then identifying which ones are interacted with most often (group by chart ID)
* Discovering how conversion rates change between different types of orders (group by order ID)
* Using group-level reporting in funnel analyses: 
	* such as, determining how many accounts have converted from free trials to paid accounts (group by either account ID or project ID), or tracking how many posts are drafted but never published in your social media platform (group by post ID)

In a standard [funnel analysis](/docs/hc/en-us/articles/360039976531), the same person must complete all steps of the funnel to count as a conversion. With group-level reporting, different members of the group can complete different steps in the funnel, and Amplitude will still interpret that as a conversion. 

This is useful for multi-sided marketplaces or B2B2C companies whose conversion processes involve multiple people. An example of this is a product that allows medical practices to bill patients for expenses. Their conversion funnel might include steps like “send invoice” and “send payment.” The former is completed by an admin, while the latter is completed by the patient. In situations like these, group-level reporting is the only way to accurately measure total invoice conversion.

### Event-level vs user-level group definitions

Groups in Amplitude can be defined at either the **event level** or the **user level**. What's the difference?

* An **event-level** group is one that **only** incorporates specific events in the users' overall journey. Users are assigned to a group at the time the event is sent, and users **do not** remain in that group **unless** you explicitly assign them to it when the event is sent.
* By contrast, membership in a **user-level** group is **independent** of the events being triggered. This is useful when you want to attribute all events triggered by a user to a particular group. Users are assigned to the group **once**, and they remain in it for all future events.

{{partial:admonition type='note'}}
A user's group type cannot be un-set, and must instead be overwritten.
{{/partial:admonition}}

### Add groups to charts

All chart and report types in Amplitude support [group-level reporting](#account-level-reporting), with the exception of the Personas and Compass reports. To use a group you have instrumented in your chart, select the group you want to analyze your data by in the *Users* dropdown, located in the [Segmentation Module](/docs/analytics/charts/build-charts-add-user-segments).

For example, if you wanted to track the number of daily active organizations and group them by region, you can set up an [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart like this:

![segmentby_grpids.png](/docs/output/img/analytics/segmentby_grpids.png)

### Create group-level behavioral cohorts

To create a group-level [behavioral cohort](/docs/analytics/behavioral-cohorts), use the dropdown on the left to specify if you want to create a cohort out of one of your groups.

![account_level_group_behavioral_cohorts.png](/docs/output/img/analytics/account_level_group_behavioral_cohorts.png)

For example, we can create a behavioral cohort of companies who triggered the event `Create customized report`, and apply that cohort to a Retention Analysis chart to see the differences in retention between companies that fired that event versus companies that did not.

You also have the option to import a cohort of groups from a file. The file must contain exactly one group name per line. 

![Screenshot_2022-01-07_at_14.23.29.png](/docs/output/img/analytics/Screenshot_2022-01-07_at_14.23.29.png)

### View and download groups with Microscope

You can also use the [Microscope](/docs/analytics/microscope) feature with account-level reporting. This is useful if you are performing an account-level analysis and want to dig deeper into a single data point or bucket.

For example, imagine you have an instant messaging application, and you want to increase the number of new user invites. To do so, create a funnel analysis with steps from 'Activate Account' to 'Invite New Contact':

![account_level_view_groups_microscope.png](/docs/output/img/analytics/account_level_view_groups_microscope.png)

Then use Microscope to view the groups in the last step's drop-off, or download the groups to understand why those groups drop off before inviting additional co-workers. You can also create a group-level cohort of those accounts, apply that cohort to other charts, or open [Investigate Conversion Drivers](/docs/analytics/charts/funnel-analysis/funnel-analysis-identify-conversion-drivers) to perform a detailed analysis.

![account_level_microscope_2.png](/docs/output/img/analytics/account_level_microscope_2.png)

## Explore the behavior of a specific account

Accounts allow you to drill into a single group’s behavior, similar to the User Activity section. 

![image1.png](/docs/output/img/analytics/image1.png)

In this example, the group type is `org id`, and the group value is `12345678` (listed under *Group Name*).

To access the Accounts tab:

1. Click *User Look-Up*.
2. Click the *Account* toggle.
3. Click one or all of the groups you have instrumented.
4. Optionally, search for a specific group or group property.

Group property searches must follow the syntax of `name = value`. They are restricted to groups that have been active in the last six months. Amplitude will search across all historical values held by the property, and not just most recent group property value. Use quotes for multi-word strings. Delimiters like commas or semi-colons should not be used. Spaces are optional.

Clicking on an account will take you to that account’s page, where you can view the account’s properties and activities.

![account_level_account_page.png](/docs/output/img/analytics/account_level_account_page.png)

You will find the account’s most recent properties in the top panel. The account’s properties can be set three different ways: the [Group Identify API](https://www.docs.developers.amplitude.com/analytics/apis/group-identify-api/), the [Salesforce integration](https://www.docs.developers.amplitude.com/data/sources/salesforce-group/), and by using Event Segmentation to create dynamic properties. These properties can be used to describe the account as whole (e.g. `30 day active users`, `account
 manager`, `plan type`, `renewal date`, etc.).

If you're using the User Look-up to verify events and the properties set with them, they will not be visible in the *Info* view. You can find them by clicking *Raw* instead.

![](/docs/output/img/analytics/5jUOdenf9FPpODdA5UVd6qzJ_paC2Bf2gm2RPSK2S-WQPeI1yzNzCVE3yXKc8uu_iJYlNydjbnR38sJGPK7XvIf8iz8a4r642Kq-cL4w6Jco0EtIudeA0LDHHTeFmewzt2LgcE-vlcdgSQbXiSKAYfI)

## Set properties at the group level

**Group properties** are simply properties at the account level. These properties will apply to all users who fall into that account.

### Dynamic group properties

You can turn your KPIs into dynamically-updating group properties. Add group properties such as “Last 7 Day Active Users” or “Monthly Active Users” to each account in your product. Dynamic group properties are created by Admin-level users via an [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart with the following steps:

1. **Save a single time series Event Segmentation chart:** Save a user-level chart with a single time series metric that you want to track.

	Dynamic properties are not supported on frequency and property distribution metrics, or on custom formulas.

2. **Determine time interval:** Set the time interval you would like to update the group property on. For example, a rolling window of “last 7 day active users” will update every day, while “weekly active users” will update once every calendar week.
	
    Dynamic properties are not supported on static time ranges.

3. **Name group property:** Choose your group type and name for the group property.

	Editing the chart used to create the dynamic group property will not affect the property.

### Create group properties via the Salesforce integration

To learn how to create **group properties** using Amplitude's Salesforce integration, see [Salesforce](/docs/data/source-catalog/salesforce) in Amplitude Sources.