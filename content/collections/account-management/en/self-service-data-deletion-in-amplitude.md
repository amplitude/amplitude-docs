---
id: 1b48f869-0e38-45ac-a6d5-03184a2ac77d
blueprint: account-management
title: 'Self-service data deletion in Amplitude'
this_article_will_help_you:
  - 'Delete data from Amplitude permanently'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1728428160
---
Sometimes, you may need to permanently remove data from your Amplitude projects in a timely manner. For example, maybe your product sent incorrect data to Amplitude last month, but that data has since been corrected, and you’d like to remove the original, incorrect events or properties.

Amplitude’s **self-service data deletion** feature lets you do this, without involving Amplitude personnel. Specify which events or properties you want to delete and send your deletion request to the Amplitude deletion queue.

## Before you begin

This feature is available to users on Growth and Enterprise plans. Growth users get one deletion task, to include up to one billion events scanned, per month. Enterprise users get 10 tasks, each of which can include as many as one billion events scanned, per month.

Only users with Admin permissions can use this feature.

**You can’t cancel your request** to delete data once your submitted request is in the Amplitude deletion queue.

## Submit a data deletion task

To delete your Amplitude data, you must create a **task**. You can request to delete events or properties. When you delete events, Amplitude will also delete all properties and property data associated with those events. When deleting properties, specify whether you want to limit deletion to properties attached to specific events, or to delete these properties for all events.

You can add up to five clauses to each deletion task.

To create and submit a data deletion task, follow these steps:

1. Click the gear icon and navigate to *Organization settings > Self Service Data Deletion*.
2. Click *New Deletion Task*.
3. Name the task and specify the project holding the data you want to delete.
4. Under *Time Range*, set the beginning and ending dates for the data you want to delete. Times are based on server upload time, in UTC.
5. Under *Delete*, click *Add events or properties*.
6. From the dropdown, select the type of data you want to delete: an event, an event property, or a user property.
7. For **events**, select the specific events you’d like to delete. Amplitude will delete those events **and all properties associated** with them.

For **properties**, select the properties you’d like to delete, and specify whether you want to delete them for **all** events or **specific** events only. If you want to delete for specific events only, select them in the next drop-down that appears.

8. Click *Next* to move to the verification screen. If your task is set up the way you want it, click *Next* to confirm.
9. Follow the instructions in the modal that appears and click *Delete*. **You can’t undo this action**.

Go to the homepage at any time to view the statuses of all existing tasks. The speed at which Amplitude processes your deletion request depends on the current volume of requests.