---
id: e36530aa-b74b-464f-8395-94a40276e384
blueprint: session-replay
title: 'Targeted Replay Capture'
landing: false
exclude_from_sitemap: false
updated_by: system
updated_at: 1735000000
---
Targeted Replay Capture (TRC) is an advanced feature in Amplitude Session Replay that lets you selectively capture session replays based on specific criteria, rather than capturing all sessions or relying solely on random sampling. This helps you focus your replay quota on the most important user behaviors, workflows, or segments.

{{partial:admonition type="note" heading="Add-on requirement"}}
Targeted Replay Capture is only available to customers who have purchased the Session Replay add-on.
{{/partial:admonition}}

Targeted Replay Capture lets you customize capture criteria using specific conditions like multiple events, event properties, or user properties. You can combine these criteria within a single filter or across filters using OR logic. The Session Replay SDK fetches targeting configurations from a remote config service and evaluates them at runtime to decide whether to capture a session.

## Key capabilities

TRC enables you to define the criteria that Amplitude uses to decide to capture a session, and more efficiently manage your Session Replay quota.

### Custom capture criteria

Define rules to capture replays only when certain conditions are met:

- **Specific events**: For example, `Checkout Started`.
- **Event properties**: For example, `plan = Pro`.
- **User properties**: For example, `country = US`.
- **Combinations**: Combine the above using `OR` logic.

### Configuration and quota management

Manage TRC through the [Session Replay settings page](/docs/session-replay/session-replay-settings), where you can add, edit, and manage your targeting conditions. The UI provides an estimate of how much quota each condition uses, based on historical traffic. You can set different sample rates for different conditions, giving you granular control over which sessions you capture and how much of your quota you use.

## Use cases

- Capture replays only for users who encounter errors or drop off at key points.
- Focus on high-value user segments or critical product flows.
- Reduce noise and cost by avoiding unnecessary replay capture.

## Prerequisites

Before you configure Targeted Replay Capture, ensure you meet these requirements:

- You have purchased the Session Replay add-on. Targeted Replay Capture is only available to customers with the Session Replay add-on.
- You use the [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin). TRC doesn't work with the standalone SDK.
- You have the appropriate permissions to manage settings in your org and project. For more information, review [Manage Session Replay and Heatmap settings](/docs/admin/account-management/user-roles-permissions#manage-session-replay-and-heatmap-settings).

## Configure Targeted Replay Capture

To configure Targeted Replay Capture:

1. Navigate to *Settings > Organizational Settings > Session Replay Settings*. For more information, review [Session Replay settings page](/docs/session-replay/session-replay-settings).
2. Select the project. Each project has its own settings.
3. Configure your targeting conditions using the UI.

You can add multiple conditions and combine them using OR logic. Each condition can include:

- Event types.
- Event properties.
- User properties.

{{partial:admonition type="note" heading=""}}
You must capture and send events, event properties, and user properties to Amplitude during the session for targeting conditions to work properly.
{{/partial:admonition}}

## SDK support

Targeted Replay Capture requires the Amplitude Browser Analytics SDK with the Session Replay Browser SDK Plugin. To use TRC, ensure you have both the Amplitude Browser Analytics SDK and the Session Replay Plugin integrated into your setup.

{{partial:admonition type="warning" heading="Standalone SDK not supported"}}
Targeted Replay Capture doesn't support the standalone SDK. Use the [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin) instead.
{{/partial:admonition}}

## Evaluation timing

The SDK fetches the targeting configuration at session start and uses it for the entire session. If an event matches later in the session, the SDK evaluates it against that original configuration. Updates to targeting rules only take effect for new sessions.

{{partial:admonition type="note" heading="Capture timing"}}
Session replay capture begins only after the target event occurs. TRC has no "lookback" period—replays don't capture events that happened before the targeting condition triggers. The replay starts from the point when the target event triggers, not from the beginning of the session.
{{/partial:admonition}}
