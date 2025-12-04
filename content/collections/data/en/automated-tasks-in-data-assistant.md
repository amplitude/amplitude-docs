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
Automated Tasks are part of Amplitude’s [Data Assistant](/docs/data/use-ai-data-assistant) feature. Automated tasks let data governors define conditions and actions that the system then performs automatically. It automates repetitive clean-up workflows by taking the recommendations provided by the Data Assistant and transforming those recommendations into automatic actions. For example, an automated task can automatically delete events if they have been unused for 90 days. 

After they have been created, automated tasks run daily. 

Automated tasks is only available on Enterprise plans. Go to the [pricing](https://amplitude.com/pricing) page for more details.

{{partial:admonition type="note" heading=""}}
Automated tasks are only available for users with manager or admin permissions. Contact your administrator if you can't access Automated tasks as an option for Data Assistant.
{{/partial:admonition}}

You can access your automated tasks from the Data Assistant by going to *Data > Assistant > Automated Tasks*. 
If you have active automations, those are displays along with a current count of the events affected by that specific automation. If you don't have any active automations, you'll have the opportunity to set them up. 

By default, automated tasks operate across all projects within a workspace. You can, however, specify for the automation to only search through a single project.

## Types of automated tasks

You can select one, or any, of the following types of tasks to automate: 

* Clean up unused events
* Clean up single-day events
* Clean up stale events

### Clean up unused events
This task optimizes your event volume by ensuring that all your ingested events are being actively used. The tasks inspects your organization for events that haven't been queried in 90 days. When it finds those events, it can notify you about them, schedule to delete those events within 30 days, and notify you when those events get deleted. 

Your users can save events. They can save the event either through the notification from the automated task or through the Data Assistant. Saved events aren't deleted, even if they're not queried during the time window. 

If the task deletes an event, this also blocks future ingestion of that event. Historical charts or data aren't affected. The deleted event still appears in them. 

You can manually recover a deleted event at any time. 

{{partial:admonition type="tip" heading="Manually enabled"}}
The Clean up unused events automated task must be manually enabled for each account. Reach out to your Amplitude representative or [Amplitude Support](https://gethelp.amplitude.com/hc/en-us/requests/new) to get this task enabled. 
{{/partial:admonition}}

### Clean up single-day events
This task removes accidental or one-time test events that can negatively impact or clutter up your taxonomy. The task inspects your organization for events that:

* Have the same first seen and last seen dates and;
* That date is more than 30 days before the inspection date

When the automated task finds events that match those criteria, it automatically deletes those events. After they're deleted, those one-time testing events no longer appear in the event dropdown menu and are blocked from future ingestion.

Historical charts or data aren't affected. 

### Clean up stale events
This tasks audits and deletes events that haven't happened recently. For example, this task identifies events that haven't been ingested in 90 days. It also can notify users about the impending deletion and then schedule the deletion activity 30 days after the notification is sent. 

## Setting up an automated task

1. Go to *Data > Assistant > Automated Tasks tab*.
2. Click **Get Started**.
3. Complete the set up prompts. This includes:
    * Setting the threshold (in days) for unused events. By default, this is 90 days for unused events and 30 days for test events.
    * Specifying any event tags that the automation rule should ignore. For example, if you never want to remove creation events, add a `create` tag to the ignore field. Review your events to make sure you are specifying the exact tag that's applied to your event.
4. Click **Set Up Automation**.

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