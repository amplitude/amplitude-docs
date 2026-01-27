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

Identify and manage feature flags and experiments that are ready for cleanup. Stale flag management helps you maintain a clean codebase by identifying flags that have been rolled out or rolled back for an extended period. By understanding how long it's been since you've interacted with a feature flag, you can maintain your list of flags to only the ones that are currently relevant.

## How flags and experiments become stale

A feature flag or experiment becomes stale when it meets one of these conditions:

* **Rolled out**: The flag or experiment has been rolled out to 100% of users for more than 30 days.
* **Rolled back**: The flag or experiment is inactive or rolled out to 0% for more than 30 days.

After a flag or experiment becomes stale, it's ready for cleanup. You should remove the flag from your codebase and archive it.

### Filtering in the table view

In the Feature Flags list, the stale status appears as a secondary status badge next to the primary status. Click the **Stale** option which filters the table to show only stale flags.

## Working with stale flags

Hover over the Stale badge on a flag. Information appears that displays when that specific flag became stale. The information pop-up contains information on the Rollout status of the flag. From this pop-up, you can choos to archive the flag or to unmark the flag as stale.

## Setting stale dates

As you roll out or roll back a flag or experiment, you can set a custom stale date. This date determines when the flag or experiment becomes stale.

### Default stale date

By default, Amplitude sets the stale date to 30 days after you roll out or roll back the flag or experiment. You can change this date or remove it if the flag is long-lived and doesn't need a cleanup date.

### Updating stale dates

If you change the rollout after a stale date is already set, you can update the stale date. For example:

* On January 3, you roll out a flag to 100% and set the stale date to February 3.
* On January 5, you add a segment to the flag that is rolled out to 0%.
* When saving, you're prompted to update the stale date.

## Notifications

Amplitude can send you notifications when flags become stale. Notifications are sent once each day to all owners of stale flags and experiments that became stale in the last 24 hours.

You can receive notifications through:

* Email
* Slack
* Webhooks

Configure [notification preferences](/docs/feature-experiment/notifications) in your organization settings.

## Bulk archving stale flags

After a flag becomes stale, remove them from your list.

1. **Remove the flag from your codebase**: Remove the feature flag code from your application. If the flag is deployed across multiple services or codebases, remove it from each location.
2. **Archive the flag in Amplitude**: Archive the flag or experiment in Amplitude to remove it from your active flags list.

##### To remove a stale flag from Amplitud

1. Select the flag you want to remove.
2. Click **Archive**.

### Handling multiple variants

If a flag or experiment has multiple variants and one variant is rolled out to 100%, keep that variant in your application while removing the others. This ensures the winning variant remains active.

## Using Amplitude AI or MCP

You can use Amplitude AI or Amplit MCP to highlight stale flags and either update the stale date or archive them. Within the agent window, ask Amplitude to generate a list of your stale flags. After it gives you the list, you can continue the conversation to archive or modify your stale flags.