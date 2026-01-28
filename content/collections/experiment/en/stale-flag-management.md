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

Stale flag management helps you maintain a clean codebase by identifying feature flags that have either been completely rolled out or have been rolled back for a specific period of time.

## When flags and experiments become stale

A feature flag or experiment becomes stale when it meets one of these conditions:

* **Rolled out**: The flag or experiment has been rolled out to 100% of users for more than 30 days.
* **Rolled back**: The flag or experiment is inactive or rolled out to 0% for more than 30 days.

After a flag or experiment becomes stale, it's ready for cleanup. This means you should remove the flag from your codebase and archive it in Amplitude.

## Viewing stale flags and experiments

### Stale status badge

When you view a flag or experiment that is stale, a stale status badge appears next to the other status badges in the header. Hover over the stale badge to see when it became stale and update the stale date if needed.

### Filtering in the table view

In the flags and experiments table, the stale status appears as a secondary status badge next to the primary status. You can filter the table to show only stale flags and experiments.

## Setting stale dates

When you roll out or roll back a flag or experiment, you can set a custom stale date. This date determines when the flag or experiment becomes stale.

### Default stale date

By default, Amplitude sets the stale date to 30 days after you roll out or roll back the flag or experiment. You can change this date or remove it if the flag is long-lived and doesn't need a cleanup date.

### Updating stale dates

If you change the rollout after a stale date is already set, you can update the stale date. For example:

1. On January 3, you roll out a flag to 100% and set the stale date to February 3.
2. On January 5, you add a segment to the flag that is rolled out to 0%.
3. When saving, you're prompted to update the stale date.

## Notifications

Amplitude sends notifications when flags and experiments become stale. Notifications are sent once per day to all owners of stale flags and experiments that became stale in the last 24 hours.

You can receive notifications through:

* Email
* Slack
* Webhooks

Configure notification preferences in your organization settings.

## Cleaning up stale flags

After a flag or experiment becomes stale, take these steps:

1. **Remove the flag from your codebase**: Remove the feature flag code from your application. If the flag is deployed across multiple services or codebases, remove it from each location.
2. **Archive the flag in Amplitude**: Archive the flag or experiment in Amplitude to remove it from your active flags list.

### Handling multiple variants

If a flag or experiment has multiple variants and one variant is rolled out to 100%, keep that variant in your application while removing the others. This ensures the winning variant remains active.

### Using AI coding tools

You can use AI coding tools to help remove feature flags from your code. These tools can identify flag references and generate code changes to remove them.

## Best practices

* **Review stale flags regularly**: Check your stale flags list weekly or monthly to keep your codebase clean.
* **Set appropriate stale dates**: When rolling out flags, set stale dates that align with your team's cleanup schedule.
* **Coordinate with your team**: Before removing flags, coordinate with team members who might be using them.
* **Document long-lived flags**: If a flag is intentionally long-lived, remove the stale date to prevent unnecessary notifications.
