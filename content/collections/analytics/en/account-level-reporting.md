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
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1731619126
---
In Amplitude, the default level of reporting is the **individual user**, meaning your charts and analyses rely on data drawn from individual users. Sometimes, you may need reports built around an **aggregated** unit of measurement—say, accounts, order IDs, or charts.

The Amplitude Accounts add-on enables you to do exactly this, by giving you analytical capabilities at the **group** level.

A group is an object that a set of users might belong to—such as a company of customers, a team of users, or a playlist with listeners. Analyzing at the group level helps you understand how specific accounts interact with your product, instead of just seeing the individual users in those companies.  

### Feature availability

This feature is available to users on **Plus**, **Growth**, and **Enterprise** **plans** only.

* Use of this feature requires the Accounts add-on.

## Before you begin

* With the Accounts add-on, you are able to instrument up to five different group types per project. You can manage and remove groups using Amplitude Data.
* Account-level properties have a limit of 1000 per project.
* Changes to account groups and group properties apply to new data moving forward, and don't affect historical data.
* To [instrument account-level reporting in Amplitude, see our Help Center documentation](/docs/analytics/account-level-reporting-setup).

## Group-level reporting: An overview

Once you've [set up groups](/docs/analytics/account-level-reporting-setup), Amplitude includes them in a drop-down list in the [Segmentation Module](/docs/analytics/charts/build-charts-add-user-segments). From there, you can report at the group level instead of the individual user level.

![account_level_reporting_1.png](/docs/output/img/analytics/account_level_reporting_1.png)

An analysis using group-level reporting performs its counts by distinct user property groups. When might this be useful? Here are some potential use cases:

* Analyzing how many distinct accounts were active, or fired a certain event (group by account ID)
* Tracking how many charts users in your organization copy, save, and modify, and then identifying which ones people use most often (group by chart ID)
* Discovering how conversion rates change between different types of orders (group by order ID)
* Using group-level reporting in funnel analyses: 
	* such as determining how many accounts have converted from free trials to paid accounts (group by either account ID or project ID), or tracking how frequently users draft posts they don't publish in your social media platform (group by post ID)

In a standard [funnel analysis](/docs/analytics/charts/funnel-analysis), the same person must complete all steps of the funnel to count as a conversion. With group-level reporting, different members of the group can complete different steps in the funnel, and Amplitude still interprets that as a conversion. 

This is useful for multi-sided marketplaces or B2B2C companies whose conversion processes involve multiple people. An example of this is a product that allows medical practices to bill patients for expenses. Their conversion funnel might include steps like “send invoice” and “send payment.” The former is an admin task, while the latter is for the patient to complete. In situations like these, group-level reporting is the only way to accurately measure total invoice conversion.

### Event-level vs user-level group definitions

Groups in Amplitude can be defined at either the **event level** or the **user level**. What's the difference?

* An **event-level** group is one that **only** includes specific events in the users' journey. Users aren't affected by the events, meaning future events triggered by the users **aren't** added to the group **unless** explicitly assigned.
* By contrast, membership in a **user-level** group is **independent** of specific events. After the [Identify API](/docs/apis/analytics/identify) assigns users to the group, they remain in it for all future events. This is useful when you want to attribute all events a user triggers to a particular group.

{{partial:admonition type='note'}}
You can't un-set a user's group type. You can only overwrite it.
{{/partial:admonition}}

### Add groups to charts

All chart and report types in Amplitude support [group-level reporting](#account-level-reporting), except the Personas and Compass reports. To use a group you have instrumented in your chart, select the group you want to analyze your data by in the *Users* dropdown, located in the [Segmentation Module](/docs/analytics/charts/build-charts-add-user-segments).

For example, if you wanted to track the number of daily active organizations and group them by region, you can set up an [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart like this:

![segmentby_grpids.png](/docs/output/img/analytics/segmentby_grpids.png)

### Groups in Experiment

{{partial:admonition type="beta" heading=""}}
There are two usages of groups in experiment:  

1. What property do you want to randomize on  
2. What unit you want to analyze on  

For example, as a B2B company you may want to randomize by customer id and analyze by customer id. If you are analyzing an onboarding funnel, you might not care if one person does step 1 and another person does step 2 as long as they are part of the same company. See [this](/docs/feature-experiment/data-model#users) for how to evaluate groups and group properties. See [this](/docs/feature-experiment/overview) for how to set the bucketing unit.
{{/partial:admonition}}

### Create group-level behavioral cohorts

To create a group-level [behavioral cohort](/docs/analytics/behavioral-cohorts), use the dropdown on the left to specify if you want to create a cohort out of one of your groups.

![account_level_group_behavioral_cohorts.png](/docs/output/img/analytics/account_level_group_behavioral_cohorts.png)

For example, we can create a behavioral cohort of companies who triggered the event `Create customized report`, and apply that cohort to a Retention Analysis chart to see the differences in retention between companies that fired that event versus companies that didn't.

You can also import a cohort of groups from a file. The file must contain exactly one group name per line. 

![Screenshot_2022-01-07_at_14.23.29.png](/docs/output/img/analytics/Screenshot_2022-01-07_at_14.23.29.png)

### View and download groups with Microscope

You can also use the [Microscope](/docs/analytics/microscope) feature with account-level reporting. This is useful if you are performing an account-level analysis and want to dig deeper into a single data point or bucket.

For example, imagine you have an instant messaging application, and you want to increase the number of new user invites. To do so, create a funnel analysis with steps from 'Activate Account' to 'Invite New Contact':

![account_level_view_groups_microscope.png](/docs/output/img/analytics/account_level_view_groups_microscope.png)

Then use Microscope to view the groups in the last step's drop-off, or download the groups to understand why those groups drop off before inviting additional co-workers. You can also create a group-level cohort of those accounts, apply that cohort to other charts, or open [Investigate Conversion Drivers](/docs/analytics/charts/funnel-analysis/funnel-analysis-identify-conversion-drivers) to perform a detailed analysis.

## Explore the behavior of a specific account

Accounts allow you to drill into a single group’s behavior, much like the User Activity section. 

![image1.png](/docs/output/img/analytics/image1.png)

In this example, the group type is `org id`, and the group value is `12345678` (listed under *Group Name*).

To access the Accounts tab:

1. Click *User Look-Up*.
2. Click the *Account* toggle.
3. Click one or all of the groups you have instrumented.
4. Optionally, search for a specific group or group property.

Group property searches must follow the syntax of `name = value`. These searches only cover groups that have been active in the last six months. Amplitude searches across all historical values held by the property, and not just most recent group property value. Use quotes for multi-word strings. Avoid delimiters like commas or semi-colons whenever possible. Spaces are optional.

Clicking on an account takes you to that account’s page, where you can view the account’s properties and activities.

![account-profile.png](/docs/output/img/analytics/account-profile.png)

Find the account’s most recent properties in the top panel. Set the account's properties with one of the following:

- the [Group Identify API](/docs/apis/analytics/group-identify)
- the [Salesforce integration](/docs/data/source-catalog/salesforce-group)
- Event Segmentation to create dynamic properties. 

Use these properties to describe the account as whole (for example, `30 day active users`, `account manager`, `plan type`, or `renewal date`)

If you're using the User Look-up to verify events and the properties set with them, they aren't visible in the *Info* view. You can find them by clicking *Raw* instead.

![](/docs/output/img/analytics/5jUOdenf9FPpODdA5UVd6qzJ_paC2Bf2gm2RPSK2S-WQPeI1yzNzCVE3yXKc8uu_iJYlNydjbnR38sJGPK7XvIf8iz8a4r642Kq-cL4w6Jco0EtIudeA0LDHHTeFmewzt2LgcE-vlcdgSQbXiSKAYfI.png)

## Set properties at the group level

**Group properties** are simply properties at the account level. These properties apply to all users who fall into that account.

### Dynamic group properties

You can turn your KPIs into dynamically updating group properties. Add group properties such as “Last 7 Day Active Users” or “Monthly Active Users” to each account in your product. Admin-level users create dynamic group properties through an [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart, with the following steps:

1. **Save a single time series Event Segmentation chart:** Save a user-level chart with a single time series metric that you want to track.

	Dynamic properties aren't supported on frequency and property distribution metrics, or on custom formulas.

2. **Determine time interval:** Set the time interval you would like to update the group property on. For example, a rolling window of “last 7 day active users” updates every day, while “weekly active users” updates once every calendar week.
	
    Dynamic properties aren't supported on static time ranges.

3. **Name group property:** Choose your group type and name for the group property.

	Editing the chart used to create the dynamic group property doesn't affect the property.

### Create group properties using the Salesforce integration

To learn how to create **group properties** using Amplitude's Salesforce integration, see [Salesforce](/docs/data/source-catalog/salesforce) in Amplitude Sources.