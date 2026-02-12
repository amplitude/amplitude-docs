---
id: ccba4195-2a37-4b32-a335-5260e89262f4
blueprint: session-replay
instrumentation_guide: false
title: 'Session Replay and Heatmap Settings'
landing: false
exclude_from_sitemap: false
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1764787582
---
{{partial:admonition type="tip" heading="To learn more, take an Amplitude Academy course!"}}
[Contextualize user experience with Session Replay](https://academy.amplitude.com/contextualize-user-experience-with-session-replay)
{{/partial:admonition}}

Use Session Replay settings to manage replay capture across your organization's projects. From these settings, you can control sample rates, enable or disable capture, and monitor quota usage.

The organizational settings also let admins and managers view or modify [Session Replay](/docs/session-replay) settings for the projects they have access to.

The main settings page displays your organization's total session replay capture plan allowance, current use, and a list of projects from which you can toggle session capture and heatmap capture, and view the sample rate, instrumentation status, masking setting, and maksing overrides.

On each project's settings page, find project-level controls for:

- Sampling
- Masking Level
- Masking Overrides
- Console Tracking

## Sampling

View and set the sampling rate for any condition you define. Thet section displays a monthly estimate of sessions that include the conditions you define, and estimate the number of sessions that Amplitude captures. By default, Session Replay uses the **Any Session** condition. For more information about conditions, review [Targeted Replay Capture](/docs/session-replay/targeted-replay-capture).

## Masking level

Set the [masking level](/docs/session-replay/manage-privacy-settings-for-session-replay#masking-levels) for all captured sessions.

## Masking overrides

Defined the overrides to the masking level you define. For more information, review [Manage privacy settings for Session Replay](/docs/session-replay/manage-privacy-settings-for-session-replay#override-preset-policy-levels).

## Console tracking

Toggle console tracking on or off, and set the types of console information you want to capture. Select one or more from `Info`, `Log`, `Warn`, and `Error`.

## Multi-tab behavior

Session Replay captures activity on the currently focused tab. When the user switches between tabs, the replay follows their focus and automatically switches to show whichever tab they're actively viewing.

When the user switches tabs, the replay cuts directly to the new tab with a fresh snapshot reflecting its current state. Background tabs aren't actively captured while out of focus. The event timeline captures and displays events from all tabs, regardless of whether they were happening on the focused tab at the time.

While viewing a Session Replay, you can't manually switch to view background tabs; the replay strictly follows the user's actual focus. If the user switches away from the browser entirely, the replay shows an inactive period while displaying the last focused tab.
