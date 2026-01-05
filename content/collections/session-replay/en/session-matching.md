---
id: 900c21f5-2b95-4c45-b078-2eb439b39c62
blueprint: session-replay
instrumentation_guide: false
title: Session matching
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1736115600
---
Session Replay matches replays to Amplitude data to provide a complete view of the user journey. This matching links device and session information from Session Replay to Amplitude sessions.

Session Replay offers multiple session matching options to fit your setup. Choose the option that works best for your technical constraints and session definitions.

## Session matching options

### Match Amplitude sessions (recommended)

Match Amplitude sessions to fully align Session Replay with Amplitude sessions, including custom session definitions. This provides the most accurate end-to-end view of the user journey.

{{partial:admonition type="note" heading="Custom session IDs"}}
If you use a custom session ID in Amplitude, the Session Replay SDK must send **the same session ID value** so sessions can be matched correctly.
{{/partial:admonition}}

### Time-based event matching

Build sessions using 30- or 60-minute time windows based on event activity. Use this option if you can't send a session ID from your frontend due to technical or architectural constraints.

While slightly less precise than true session matching, time-based matching still delivers a reliable and useful journey view.

### Legacy matching

Match based on the Amplitude `session_id`, even if it doesn't align with custom session definitions. This option exists for backward compatibility and requires no changes.

## Choose a matching option

Match Amplitude sessions whenever possible. This includes custom session definitions, as long as the same session ID is sent to both Amplitude and Session Replay.

If you can't send session IDs from your frontend, use time-based event matching. This option works well when technical or architectural constraints prevent you from sending session IDs.

## Configure session matching

Session matching is configured at the organization level, not at the project level. Configure your session matching option in your organization settings under Session Replay. For more information, see [Session Replay and Heatmap Settings](/docs/session-replay/session-replay-settings).

{{partial:admonition type="note" heading="Organization-level configuration"}}
Session matching applies to all projects in your organization. You configure this setting once in your organization settings, not per project.
{{/partial:admonition}}

To configure session matching in your Session Replay SDK implementation, the exact steps depend on which SDK you use:

- **Browser SDK Plugin**: See [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin) for configuration details.
- **Standalone SDK**: See [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk) for configuration details.
- **Mobile SDKs**: See the relevant mobile SDK documentation for your platform.

When using custom session IDs, ensure the Session Replay SDK sends the same session ID value that you use in Amplitude. This ensures sessions match correctly.

Session matching changes are quick and reversible. You can change your matching option at any time without losing data.

{{partial:admonition type="note" heading="Historical data"}}
Changing your session matching option doesn't affect historical data. The change impacts how replays are matched and viewed going forward.
{{/partial:admonition}}

## Frequently asked questions

### Does this require re-instrumentation?

Usually no. If you use custom sessions, the only requirement is ensuring the Session Replay SDK sends the same session ID value already used in Amplitude.

### What are the tradeoffs with time-based matching?

Time-based matching has slightly less precision at session boundaries, but still provides a clear and actionable view of the user journey.

### Can I change this later?

Yes. Session matching is quick to change and fully reversible.

### Does this affect historical data?

No data is lost. The change impacts how replays are matched and viewed going forward.

### Is legacy matching being deprecated?

No. Legacy matching remains supported, though newer options are recommended for most use cases.
