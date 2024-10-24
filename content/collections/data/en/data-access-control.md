---
id: 371fc9ac-cc84-4c44-b058-c6150127ccde
blueprint: data
title: 'Manage access to sensitive data with Data Access Control'
this_article_will_help_you:
  - 'Easily prevent users from accessing sensitive or restricted information in Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1726163345
---
Enterprise-level organizations often collect data that can include revenue data, personally identifiable information (PII), and other sensitive information. Amplitude’s **data access control (DAC)** feature enables these organizations to easily manage access to these categories of data, in a way that prevents unauthorized users from gaining access to it, and that helps prevent the data from inadvertently leaking out.

DAC works within Amplitude’s Groups framework. Admins grant or restrict access to PII, revenue data, and sensitive information to all members of a group. From there, they can [add or remove users from these groups](/docs/admin/account-management/manage-permission-groups#edit-a-group) as access requirements change, either on an individual or organizational level.

For example, when an unauthorized user tries to view a chart that includes restricted information, Amplitude blocks the chart from loading on the user’s screen. Those users are also unable to create new charts that might include restricted data. This is true not only for charts, but also for cohorts, dashboards, notebooks, and user sessions.

{{partial:admonition type='note'}}
Organization admins always have access to all data classifications, regardless of any DAC restrictions.
{{/partial:admonition}}

When a user encounters a chart they’re unable to view because of the presence of restricted data, Amplitude specifies the properties or cohorts DAC has blocked. 

![chart_with_pii.png](/docs/output/img/account-management/chart_with_pii.png)

The user can then exclude the restricted data and view the chart (or cohort, dashboard, notebook, or user session) without it.

## Set access for specific categories of sensitive data

Setting access levels is a two-stage process. First, **classify** your data. When that’s complete, you can set up **permissions**.

{{partial:admonition type='note'}}
DAC applies only to properties. It **doesn’t** apply to definitions or metadata.
{{/partial:admonition}}

### Classify properties

1. In Amplitude Data, navigate to *Properties* and select the tab that contains the properties you want to classify. 
2. Click the name of the property you’re interested in. You can manage event, user, and group properties directly; derived properties inherit all the classifications of their parent properties.
3. In the details panel that opens, click the *Classification* drop-down and select all relevant classifications for this property. Then click *Send*.
4. Repeat steps 2 and 3 for each property you want to classify.

### Set up permissions

1. Navigate to *Settings > Organization settings > Groups* and click the name of the group you’re interested in. You can also [create a new group](/docs/admin/account-management/manage-permission-groups#create-a-group).
2. Open the group’s *Data Access* tab. All three controllable classifications are visible here: PII, revenue, and sensitive.
3. For each classification, select *Yes* to allow members of the group to view this data, or *No* to deny them access.
4. When you’re done, click *Save*.

## Overview page

{{partial:admonition type="note" heading=""}}
This page is available to users with the Administrator role.
{{/partial:admonition}}

Navigate to Organization Settings > Data Access Controls to see the Data Access Controls overview page. There, find information about the following:

* The number of groups with access to data classified as `PII`, `Sensitive`, or `Revenue`.
* The number of users who have access to data classified as `PII`, `Sensitive`, or `Revenue`.
* All event, user, and group properties classified as `PII`, `Sensitive`, or `Revenue`.

Drill in to any cell in the table for a detailed view where you can see the specific users or groups with access to each classification, or more detailed information about the properties in each classification.

Update user and group access from the Overview page, or navigate to Data to update any property classification.

Use the project switcher to see classifications for each project, and click *Classify Data* to open that project's tracking plan, where you can manually classify properties.

## Notifications

Users who navigate to a restricted chart or cohort have the option to contact an administrator in their organization to request access. Amplitude sends this request to all organization administrators.

{{partial:admonition type="note" heading="Turn off access request notifications"}}
Administrators can deselect the `Someone requests access to a property classified by Data Access Controls` notification in *Personal Settings > Notifications* to opt out of these notifications.
{{/partial:admonition}}

## Manage classifications with the Taxonomy API

The [Taxonomy API](/docs/apis/analytics/taxonomy) enables you to manage classifications for all your properties, at scale. 