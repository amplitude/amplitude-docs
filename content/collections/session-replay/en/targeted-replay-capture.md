---
id: targeted-replay-capture
blueprint: session-replay
title: 'Targeted Replay Capture'
landing: false
exclude_from_sitemap: false
updated_by: system
updated_at: 1735000000
---

Targeted Replay Capture (TRC) is an advanced feature in Amplitude Session Replay that lets you selectively capture session replays based on specific criteria, rather than capturing all sessions or relying solely on random sampling. This helps you focus your replay quota on the most important user behaviors, workflows, or segments.

## How Targeted Replay Capture works

Targeted Replay Capture lets you customize capture criteria using specific conditions like multiple events, event properties, or user properties. You can combine these criteria within a single filter or across filters using OR logic. The Session Replay SDK fetches targeting configurations from a remote config service and evaluates them at runtime to decide whether to capture a session.

## Key capabilities

### Custom capture criteria

Define rules to capture replays only when certain conditions are met:

- **Specific events**: For example, "Checkout Started".
- **Event properties**: For example, "plan = Pro".
- **User properties**: For example, "country = US".
- **Combinations**: Combine the above using OR logic.

### UI for configuration

Manage TRC through the [Session Replay settings page](/docs/admin/account-management/account-settings#session-replay-settings), where you can add, edit, and manage your targeting conditions.

### Quota management

The UI provides an estimate of how much quota each condition uses, based on historical traffic and the sample rate set for each condition.

### Flexible sampling

Set different sample rates for different conditions, giving you granular control over which sessions are captured and how much of your quota is used.

## Use cases

- Capture replays only for users who encounter errors or drop off at key points.
- Focus on high-value user segments or critical product flows.
- Reduce noise and cost by avoiding unnecessary replay capture.

## Prerequisites

Before you configure Targeted Replay Capture, ensure you meet these requirements:

- You use the [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin). TRC doesn't work with the standalone SDK.
- You have the appropriate permissions to manage Session Replay settings. For more information, see [Manage Session Replay and Heatmap settings](/docs/account-management/user-roles-permissions#manage-session-replay-and-heatmap-settings).

## Configure Targeted Replay Capture

To configure Targeted Replay Capture:

1. Navigate to *Settings > Organizational Settings > Session Replay Settings*. For more information, see [Manage privacy settings for Session Replay](/docs/session-replay/manage-privacy-settings-for-session-replay).
2. Select the appropriate project. Each project has its own settings.
3. Configure your targeting conditions using the UI.

You can add multiple conditions and combine them using OR logic. Each condition can include:

- Event types.
- Event properties.
- User properties.

{{partial:admonition type="note" heading=""}}
Events, event properties, and user properties must be captured and sent to Amplitude during the session for targeting conditions to work properly.
{{/partial:admonition}}

The UI shows an estimate of quota usage for each condition based on historical data.

## Technical details

### SDK support

Targeted Replay Capture requires the Amplitude Browser Analytics SDK with the Session Replay Browser SDK Plugin. To use TRC, ensure you have both the Amplitude Browser Analytics SDK and the Session Replay Plugin integrated into your setup.

{{partial:admonition type="warning" heading="Standalone SDK not supported"}}
Targeted Replay Capture doesn't support the standalone SDK. TRC doesn't work with the standalone SDK. Use the [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin) instead.
{{/partial:admonition}}

### Evaluation timing

The SDK fetches the targeting configuration once at session start and uses it for the entire session. If an event matches later in the session, the SDK evaluates it against that original configuration. Updates to targeting rules only take effect for new sessions.

{{partial:admonition type="note" heading="Capture timing"}}
Session replay capture begins only **after** the target event occurs. There is no "lookback" period for TRC—events that happened before the targeting condition is met are not captured in the replay. This means the replay will start from the point when the target event is triggered, not from the beginning of the session.
{{/partial:admonition}}
