---
id: stale-flag-management
blueprint: experiment
title: 'Stale flag management'
this_article_will_help_you:
  - 'Understand when feature flags and experiments become stale'
  - 'Learn how to identify and manage stale flags and experiments'
  - 'Configure stale dates and receive notifications for cleanup'
landing: false
exclude_from_sitemap: false
---

With Stale Flag Management, you can identify and manage feature flags or experiments that are ready for cleanup. Stale flag management helps you maintain a clean codebase by identifying flags or experiments that have been rolled out or rolled back for an extended period. By understanding how long it's been since you've interacted with a feature flag, your list of flags displays only the ones that are active or relevant.

## How flags and experiments become stale

A feature flag or experiment becomes stale when it meets one of these conditions:

* **Rolled out**: The flag or experiment has been rolled out to 100% of users for more than 30 days.
* **Rolled back**: The flag or experiment is inactive or rolled out to 0% for more than 30 days.

After a flag or experiment becomes stale, it's ready for cleanup. This means you can remove the flag from your codebase and archive it in Amplitude.

## Viewing stale flags and experiments

### Stale status badge

When you're looking at the list of your flags or experiments, a status badge appears next to the flag indicating that it's stale. Hover over the stale badge to view when it became stale and update the stale date if needed.

### Filtering in the table view

In the Feature Flags or Experiments list, the stale status appears as a secondary status badge next to the primary status. Click the **Stale** option which filters the table to show only stale flags.

## Working with stale flags

Hover over the Stale badge on a flag. Information appears that displays when that specific flag became stale. The information pop-up contains information on the rollout status of the flag. From this pop-up, you can choose to archive the flag or to unmark the flag as stale.

### Default stale date

By default, a flag or experiment is considered stale after 30 days from the date of the last update. For example, you set the rollout of a flag to 50% on March 1. If no other updates occur, Amplitude marks the flag as stale 30 days later, or in this example, March 31. If you select the option to keep the flag or deselect the stale value, the flag is considered permanent and won't be marked stale again.

### Updating stale dates

If you change the rollout after you set a stale date, you can update the stale date. For example:

* On January 3, you roll out a flag to 100% and set the stale date to February 3.
* On January 5, you add a segment to the flag that is rolled out to 0%.
* When saving, Amplitude prompts you to update the stale date.

## Notifications

You can receive notifications when flags or experiments become stale. If you are listed as an owner of a flag or experiment, Amplitude sends a message about any flag or notification that becomes stale over the previous 24 hours. These notifications are sent once each day.

You can receive notifications through:

* Email
* Slack
* Webhooks

Configure [notification preferences](/docs/feature-experiment/notifications) in your organization settings.

## Bulk archiving stale flags and experiments

After a flag or experiment becomes stale, remove it from your list.

1. **Remove the flag from your codebase**: Remove the feature flag code from your application. If the flag is deployed across multiple services or codebases, remove it from each location.
2. **Archive the flag or experiment in Amplitude**: Archive the flag or experiment in Amplitude to remove it from your active flags list.

##### To remove a stale item from Amplitude

1. Select the flag or experiment you want to remove.
2. Click **Archive**.

### Handling multiple variants

If a flag or experiment has multiple variants and one variant is rolled out to 100%, keep that variant in your application while removing the others. This ensures the winning variant remains active.

## Using Amplitude AI or MCP

You can use Amplitude AI or Amplitude MCP to highlight stale flags and either update the stale date or archive them. Within the agent window, ask Amplitude to generate a list of your stale flags. After it gives you the list, you can continue the conversation to archive or modify your stale flags.