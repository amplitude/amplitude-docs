---
id: 1b48f869-0e38-45ac-a6d5-03184a2ac77d
blueprint: account-management
title: 'Self-service data deletion in Amplitude'
this_article_will_help_you:
  - 'Delete data from Amplitude permanently'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1748984081
ai_summary: "You can use Amplitude's self-service data deletion feature to permanently remove incorrect data from your projects. This feature is available to users on Growth and Enterprise plans with Administrator privileges. To submit a data deletion task, create a task specifying events or properties you want to delete. Follow the steps to name the task, select the project, set the time range, choose data type, select events or properties, verify the task, and confirm deletion. Once submitted, you can't cancel the request. Check task statuses on the Home page. Amplitude processes deletion requests based on current volume."
---
Sometimes, you may need to permanently remove data from your Amplitude projects. For example, maybe your product sent incorrect data to Amplitude last month. That data has since been corrected, and you’d like to remove the incorrect events or properties.

Amplitude’s **self-service data deletion** feature lets you do this, without involving Amplitude personnel. Specify which events or properties you want to delete and send your deletion request to the Amplitude deletion queue.

## Before you begin

This feature is available to users on Growth and Enterprise plans.

* Accounts on the Growth plan can scan up to one billion (1,000,000,000) events per month.
* Accounts on the Enterprise plan can scan up to ten billion (10,000,000,000) events per month.

Self-service data deletion requires Administrator privileges.

Once you submit your deletion request to Amplitude, you can't cancel it or remove it from the queue.

## Submit a data deletion task

To delete your Amplitude data, you must create a **task**. Self-service data deletion supports both events and properties. 

When you delete events, Amplitude deletes all properties and property data associated with those events. When you delete properties, specify whether you want to limit deletion to properties attached to specific events, or to delete these properties for all events.

Add up to five clauses to each deletion task.

To create and submit a data deletion task, follow these steps:

1. Click the gear icon and navigate to *Organization settings > Self Service Data Deletion*.
2. Click *New Deletion Task*.
3. Name the task and specify the project holding the data you want to delete.
4. Under *Time Range*, set the beginning and ending dates for the data you want to delete. Times are based on server upload time, in UTC.
5. Under *Delete*, click *Add events or properties*.
6. From the dropdown, select the type of data you want to delete: an event, an event property, or a user property.
7. For **events**, select the specific events to delete. Amplitude will delete those events **and all properties associated** with them.

    For **properties**, select the properties you’d like to delete, and specify whether you want to delete them for **all** events or **specific** events only. If you want to delete for specific events only, select them in the next drop-down that appears.

8. Click *Next* to move to the verification screen. If your task is set up the way you want it, click *Next* to confirm.
9. Follow the instructions in the modal that appears and click *Delete*. **You can’t undo this action**.

See the statuses of all existing tasks on the Home page. The speed at which Amplitude processes your deletion request depends on the current volume of requests.