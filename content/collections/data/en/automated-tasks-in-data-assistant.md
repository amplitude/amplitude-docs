---
id: bef1ff7c-2c93-4677-b05e-1588205fbd4d
blueprint: data
title: 'Automated Tasks'
this_article_will_help_you:
  - 'Understand how automated tasks can help keep your data clean'
  - 'Learn how to set up and run automated tasks'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1754950505
---
Automated Tasks are part of Amplitude’s [Data Assistant](/docs/data/use-ai-data-assistant) feature. Automated Tasks let data governors define conditions and actions that the system then performs automatically. This feature automates repetitive clean-up workflows by transforming Data Assistant recommendations into automatic actions. For example, an automated task can automatically delete events if they have been unused for 90 days. 

After you create them, Automated Tasks run daily. 

Automated tasks is only available on Enterprise plans. Go to the [pricing](https://amplitude.com/pricing) page for more details.

{{partial:admonition type="note" heading=""}}
Automated Tasks are only available for users with manager or admin permissions. Contact your administrator if you can't access Automated Tasks as an option for Data Assistant.
{{/partial:admonition}}

You can access your Automated Tasks from the Data Assistant by going to *Data > Assistant > Automated Tasks*. 
If you have active automations, those are displays along with a current count of the events affected by that specific automation. If you don't have any active automations, you'll have the opportunity to set them up. 

By default, Automated Tasks operate across all projects within a workspace. You can, however, specify for the automation to only search through a single project.

## Types of Automated Tasks

You can select one, or any, of the following types of tasks to automate: 

* Clean up stale events
* Clean up single-day events
* Clean up unused events

### Clean up stale events
This task removes events that haven't experiences any recent volume. This indicates that the events aren't being ingested and are no longer of value. The task inspects your organization for events that have a `last seen` date in a configurable number of days. For example, events that haven't been ingested in 90 days.

Historical charts or data aren't affected. 

### Clean up single-day events
This task removes accidental or one-time test events that can negatively impact or clutter up your taxonomy. The task inspects your organization for events that:

* Have the same first seen and last seen dates and;
* That date is more than a configuraable number of days before the inspection date. (For example, 90 days before the inspection date.)

When the automated task finds events that match those criteria, it schedules those events for deletion. All people using those events are notified through email or Slack about the impending deletion. Anywhere the events are being used (for example, in a chart), a banner appears notifying users about the upcoming deletion. If anyone wants to keep the event, they can do so through the email or banner notification. If no one elects to keep the event within 30 days, the event is deleted. Deleted events no longer appear in the event drop-down menu and are blocked from future ingestion.

Historical charts or data aren't affected. 

### Clean up unused events
{{partial:admonition type="tip" heading="Manually enabled"}}
The Clean up unused events automated task can affect events that you want to keep. Therefore, the task must be manually enabled for each account. Reach out to your Amplitude representative or [Amplitude Support](https://gethelp.amplitude.com/hc/en-us/requests/new) for more information or to get this task enabled. 
{{/partial:admonition}}

This task optimizes your event volume by ensuring that all your ingested events are being actively used. The task inspects your organization for events that haven't been queried in 90 days. When it finds those events, it can notify you about them, schedule to delete those events within 30 days, and notify you when those events get deleted. 

Your users can save events. They can save the event either through the notification from the automated task or through the Data Assistant. Saved events aren't deleted, even if they're not queried during the time window. 

If the task deletes an event, this also blocks future ingestion of that event. Historical charts or data aren't affected. The deleted event still appears in them. 

You can manually [recover a deleted event](#recovering-deleted-events) at any time. 

## Setting up an automated task

You can manually set up an automated task. Alternately, the [Data Assistant](/docs/data/use-ai-data-assistant) can proactively identify tasks for you.

##### To manually set up an automated task
1. Go to *Data > Assistant > Automated Tasks tab*.
2. Click **Get Started**.
3. Complete the set up prompts. This includes:
    * Setting the threshold (in days). By default, this is 30 days for single-day events and 90 days for stale events.
    * Specifying any event tags that the automation rule should ignore. For example, if you never want to remove creation events, add a `create` tag to the ignore field. Review your events to make sure you are specifying the exact tag that's applied to your event.
4. Click **Set Up Automation**.

##### To set up an automated task through the Data Assistant

If Amplitude detects events that meet a task’s criteria, those suggested tasks appear in the Suggestions view under *Data > Assistant*. If automation is available for that task, a banner appears above the suggestion. 

Click the banner to turn on automation for future matching events.

## Removing an automation
You can remove any current automation. When removing an automation, you can specify if you want to affect any pending changes or to only affect future changes.  

##### To remove an automated task

1. Go to *Data > Assistant > Automated Tasks*. 
2. Click **View Automation**. 
3. In the automated task window, click the **three-dot** option menu. 
4. Click **Remove Automation**.
5. Confirm whether you want to also remove any pending changes from the task and then click **Remove**.

## Recovering deleted events
You can recover any deleted event at any time.

##### To recover a deleted event

1. Go to *Data > Events*.
2. Click **Deleted Events**.
3. Select the event you want and click **Restore**.