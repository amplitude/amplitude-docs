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

Amplitude provides options to match sessions directly, match events based on time, or Amplitude session ID.

### Match Amplitude sessions (recommended)

Match Amplitude sessions based on your project's session definition. This method respects how you configure sessions in your Amplitude project settings, including sessions you define with event properties, timeout windows, or start/end events.

If you use the default `session_id`, Session Replay works automatically with no additional configuration.

If you use a custom session property (a custom session definition in Amplitude), configure the Session Replay SDK to extract and send that same property value. Session Replay then matches sessions using your project's custom session definition, providing the most accurate alignment between replay data and analytics sessions.

#### Requirements for custom session definitions

**Minimum SDK versions:**
- Browser SDK Plugin: `@amplitude/plugin-session-replay-browser` version 1.10.0 or later.
- Standalone SDK: `@amplitude/session-replay-browser` version 1.17.0 or later.

**Project configuration:**
- Configure your custom session definition in *Settings > Projects > Session Definitions*.
- Use the "Counted based on <> Property" option to define sessions by a specific property.
- For more details, see [Track sessions](/docs/data/sources/instrument-track-sessions).

**Constraints:**
- Custom session ID values can't contain the "/" character, as Session Replay uses it as a delimiter in the session replay ID format (`<deviceId>/<sessionId>`).
- Allowed characters: `a-z A-Z 0-9 _ - . | @ : =`.
- If you need an additional character, contact support.

#### Configure the SDK for custom session definitions

These code examples apply only if you've configured a custom session definition in your Amplitude project settings.

**Browser SDK Plugin:**

Pass a method that extracts the custom session ID from Amplitude events:

```javascript
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

const sessionReplayTracking = sessionReplayPlugin({
  customSessionId: (event) => {
    const props = event.event_properties;
    if (!props) {
      return;
    }
    const sessionId = props["your_custom_session_id_property"];
    return sessionId;
  },
});
amplitude.add(sessionReplayTracking);

amplitude.init(AMPLITUDE_API_KEY);
```

**Standalone SDK:**

The standalone SDK treats custom session IDs and timestamp-based session IDs the same way. Pass the session ID to the standalone SDK, and send that same session ID to Amplitude as an event property that matches your project's custom session definition:

```javascript
import * as sessionReplay from '@amplitude/session-replay-browser';

// Initialize Session Replay with session ID
sessionReplay.init(AMPLITUDE_API_KEY, {
  customSessionId: (event) => {
    const props = event.event_properties;
    if (!props) {
      return;
    }
    const sessionId = props["your_custom_session_id_property"];
    return sessionId;
  },
});
```

Ensure the session ID property name matches the property configured in your project's custom session definition (*Settings > Projects > Session Definitions*).

### Time-based event matching

Build sessions using 30- or 60-minute time windows based on event activity. Use this option if you can't send a session ID from your frontend due to technical or architectural constraints.

While slightly less precise than true session matching, time-based matching still delivers a reliable and useful journey view.

### Session ID matching (legacy)

Match based on the Amplitude `session_id`, even if it doesn't align with custom session definitions. This option exists for backward compatibility and requires no changes.

## Choose a matching option

Match Amplitude sessions whenever possible. This includes custom session definitions, as long as you send the same session ID to both Amplitude and Session Replay.

If you can't send session IDs from your frontend, use time-based event matching. This option works well when technical or architectural constraints prevent you from sending session IDs.

## Configure session matching

You configure session matching at the organization level, not at the project level. Configure your session matching option in *Organization Settings > Session Replay*. For more information, see [Session Replay and Heatmap Settings](/docs/session-replay/session-replay-settings).

{{partial:admonition type="note" heading="Organization-level configuration"}}
Session matching applies to all projects in your organization. You configure this setting in *Organization Settings*, not per project.
{{/partial:admonition}}

To configure session matching in your Session Replay SDK implementation, the exact steps depend on which SDK you use:

- **Browser SDK Plugin**: See [Session Replay Browser SDK Plugin](/docs/session-replay/session-replay-plugin) for configuration details.
- **Standalone SDK**: See [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk) for configuration details.
- **Mobile SDKs**: See the relevant mobile SDK documentation for your platform.

When using custom session IDs, ensure the Session Replay SDK sends the same session ID value that you use in Amplitude. This ensures sessions match correctly.

Session matching changes are quick and reversible. You can change your matching option at any time without losing data.

{{partial:admonition type="note" heading="Historical data"}}
Changing your session matching option doesn't affect historical data. The change impacts how Amplitude matches and views replays going forward.
{{/partial:admonition}}

## Frequently asked questions

### Does this require re-instrumentation?

Usually no. If you use custom sessions, you only need to ensure the Session Replay SDK sends the same session ID value already used in Amplitude.

### What are the tradeoffs with time-based matching?

Time-based matching has slightly less precision at session boundaries, but still provides a clear and actionable view of the user journey.

### Can I change this later?

Yes. You can change session matching quickly, and you can fully reverse the change.

### Does this affect historical data?

You don't lose any data. The change impacts how Amplitude matches and views replays going forward.

### Is Amplitude deprecating session ID matching?

No. Amplitude continues to support session ID matching, though Amplitude recommends newer options for most use cases.
