---
id: stale-flag-management
blueprint: experiment
title: 'Stale flag management'
landing: false
exclude_from_sitemap: false
---

Stale flag management helps you maintain a clean codebase by identifying feature flags that have been completely rolled out or rolled back for a set period of time.

## How flags and experiments become stale

A feature flag or experiment becomes stale when it meets one of these conditions:

* **Rolled out**: The flag or experiment has been rolled out to 100% of users for more than 30 days.
* **Rolled back**: The flag or experiment is inactive or rolled out to 0% for more than 30 days.

After a flag or experiment becomes stale, it's ready for cleanup. You can remove the flag from your codebase and archive it in Amplitude.

## View stale flags and experiments

### Stale status badge

When viewing your flags or experiments list, a stale badge appears next to the flag. Hover over the badge to see when it became stale, and update the stale date if needed.

### Filter by stale status

In the Feature Flags or Experiments list, the stale status appears as a secondary badge next to the primary status. Select the **Stale** option to filter the table and show only stale flags.

## Work with stale flags

Hover over the stale badge on a flag. The pop-up shows when the flag became stale and its rollout status. From this pop-up, archive the flag or unmark it as stale.

### Default stale date

By default, Amplitude marks a flag or experiment stale after 30 days from the date of the last update. For example, if you set the rollout of a flag to 100% on March 1 and no other updates occur, Amplitude marks the flag as stale on March 31. If you deselect the stale value, Amplitude considers the flag permanent and won't mark it stale again.

### Update stale dates

If you change the rollout after you set a stale date, you can update the stale date. For example:

* On January 3, you roll out a flag to 100% and set the stale date to February 3.
* On January 5, you add a segment to the flag that is rolled out to 0%.
* When saving, Amplitude prompts you to update the stale date.

## Notifications

Amplitude can notify you when flags or experiments become stale. If you're an owner of a flag or experiment, Amplitude sends a message about any flag or experiment that becomes stale over the previous 24 hours. Amplitude sends these notifications once each day.

You can receive notifications through:

* Email.
* Slack.

Configure [notification preferences](/docs/feature-experiment/notifications) in your organization settings.

## Bulk archive stale flags and experiments

After a flag or experiment becomes stale, remove it from your list.

1. **Remove the flag from your codebase**: Remove the feature flag code from your application. If the flag is deployed across multiple services or codebases, remove it from each location.
2. **Archive the flag or experiment in Amplitude**: Archive the flag or experiment in Amplitude to remove it from your active flags list.

### Remove a stale item from Amplitude

1. Select the flag or experiment you want to remove.
2. Select **Archive**.

### Handle multiple variants

If a flag or experiment has multiple variants and one variant is rolled out to 100%, keep that variant in your application while removing the others. This ensures the winning variant remains active.

## Use Amplitude AI or MCP

You can use Amplitude AI or Amplitude MCP to highlight stale flags and either update the stale date or archive them. In the agent window, ask Amplitude to generate a list of your stale flags. After Amplitude gives you the list, continue the conversation to archive or modify your stale flags.
