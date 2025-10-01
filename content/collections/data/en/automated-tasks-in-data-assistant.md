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
Automated Tasks are part of Amplitude’s [Data Assistant](/docs/data/use-ai-data-assistant) feature, helping to improve your tracking plan with actionable, prioritized suggestions. Automated Tasks takes the recommendations provided by the Data Assistant and transforms those recommendations into actions by performing specific tasks automatically. This means that you don't have to manually review every single task suggested by the Data Assistant. 

Automated tasks is only available on Enterprise plans. Go to the [pricing](https://amplitude.com/pricing) page for more details.

After they have been created, automated tasks run daily. 

You can access your automated tasks from the Data Assistant by going to *Data > Assistant > Automated Tasks*. 
If you have active automations, the Automated Tasks home page displays them as well as a current count of the events affected by the automation. If you don't have any active automations, you have the opportunity to set them up. 

By default, automated tasks operate across all projects within a workspace. You can, however, specify for the automation to only search one project at a time.

## Types of automated tasks

You can select one, or any, of the following types of tasks to automate: 

* Clean-up unused events
* Clean-up Single Day events
* Clean-up stale events

### Clean-up unused events
This task optimizes your event volume by ensuring that all your ingested events are being actively used. The tasks inspects your organization for events that haven't been queried in 90 days. When it finds those events, it can notify you about them, schedule to delete those events within 30 days, and notify you when those events get deleted. 

Your users can save events. They can save the event either through the notification from the automated task or through the Data Assistant. Saved events aren't deleted, even if they're not queried during the time window. 

If the task deletes an event, this also blocks future ingestion of that event. Historical charts or data aren't affected. The deleted event still appears in them. 

You can manually recover a deleted event at any time. 

### Clean-up Single Day events
This task removes accidental or one-time test events that can negatively impact or clutter up your taxonomy. The task inspects your organization for events that:

* Have the same first seen and last seen dates and;
* That date is more than 30 days before the inspection date

When the automated task finds events that match those criteria, it automatically deletes those events. After they're deleted, those one-time testing events no longer appear in the event dropdown menu and are blocked from future ingestion.

Historical charts or data aren't affected. 

### Clean-up stale events
This tasks audits and deletes events that have not happened recently. For example, this task identifies events that have not been ingested in 90 days. It also can notify previous users that their events will be delete and to delete those identified events 30 days after the notification is sent. 

## Recovering deleted events
You can recover any deleted event at any time.

##### To recover a deleted event
  
1. Go to *Data > Events*.
2. Click **Deleted events**.
3. Select the event you want and click **Restore**.

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

## Removing an automation
You can remove any current automation. When removing an automation, you can specify if you want to affect any pending changes or to only affect future changes.  

##### To remove an automated task
1. Go to *Data > Assistant > Automated Tasks*. 
2. Click **View Automation** for the automation you want to remove. 
3. In the automated task window, click the **three-dot** option menu. 
4. Click **Remove Automation**.
5. Confirm whether you want to also remove any pending changes from the task and then click **Remove**.