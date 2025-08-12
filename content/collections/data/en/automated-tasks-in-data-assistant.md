---
id: bef1ff7c-2c93-4677-b05e-1588205fbd4d
blueprint: data
title: 'Automated tasks in Data Assistant'
this_article_will_help_you:
  - 'Understand how automated tasks can help keep your data clean'
  - 'Learn how to set up and run automated tasks'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1754950505
---
Automated Tasks are part of Amplitude’s [Data Assistant](/docs/data/use-ai-data-assistant) feature, which helps you improve your tracking plan with actionable, prioritized suggestions.

Automated Tasks takes the recommendations provided by the Data Assistant and transforms those recommendations into actions. Automated. tasks can perform certain types of tasks automatically. This means no manual review required. 

Automated tasks can run daily and help you maintain a clean, consistent tracking plan. 

## Feature availability

Automated tasks is only available on Enterprise plans. Go to the [pricing](https://amplitude.com/pricing) page for more details.

## Types of automated tasks

You can select one, or any, of the following types of tasks to automate: 

* Delete unused events
* Delete test events

### Delete unused events
This task optimizes your event volume by ensuring that all your ingested events are being actively used. The tasks inspects your organization for events that haven't been queried in 90 days. When it finds those events, it can notify you about them, schedule to delete those events within 30 days, and notify you when those events get deleted. 

Your users can save events. They can save the event either through the notification from the automated task or through the Data Assistant. Saved events aren't deleted, even if they're not queried during the time window. 

If the task deletes an event, this also blocks future ingestion of that event. Historical charts or data aren't affected. The deleted event still appears in them. 

You can manually recover a deleted event at any time. 

### Delete test events
This task removes accidental or one-time test events that can negatively impact or clutter up your taxonomy. The task inspects your organization for events that:

* Have the same first seen and last seen dates and;
* That date is more than 30 days before the inspection date

When the automated task finds events that match those criteria, it automatically deletes those events. After they're deleted, those one-time testing events no longer appear in the event dropdown menu and are blocked from future ingestion.

Historical charts or data aren't affected. 

## Setting up an automated task

There are two ways to set up an automated task:

* From the Automated Tasks tab
* Through the Data Assistant

##### To set up a task through the Automated Task tab

1. Go to *Data > Assistant > Automated Task tab*.
2. Click **Set Up Automation** under the type of task you want.
3. Complete the set up prompts. This includes:
    * Set the threshold (in days) for unused events. By default, this is 90 days for unused events and 30 days for test events.
    * Specify any event tags that the automation rule should ignore. For example, if you never want to remove creation events, add a `create` tag to the ignore field. Review your events to make sure you are specifying the exact tag that's applied to your event.
4. Click **Set Up Automation**.


##### To set up a task through the Data Assistant

If Amplitude detects events that meet a task’s criteria, those suggested tasks appear in the Suggestions view under *Data > Assistant*. If automation is available for that task, a banner appears above the suggestion. 

Click the banner to turn on automation for future matching events.

## Working with automated tasks
Automated Tasks offers a number of different interactions:

* **Notify you of events that can be deleted**: In this scenario, all the events that Automated Tasks has identified as being able to be deleted are visible for your review. You review the list and then manually delete the events that you want. 
* **Notify you that events have been deleted**: In this scenario, Automated Tasks has found and deleted events that are no longer needed. This notification is to let you know that those events have been removed. You can manually recover deleted events if you want. 
* **Fully automate the removal of events**: In this scenario, Automated Tasks finds and removes events that are no longer needed and will not send you a notification that they were deleted. You can manually recover deleted events if you want.