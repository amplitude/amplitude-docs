---
id: 67dcf1d2-5749-4a4e-a81d-670404e919c3
blueprint: session-replay
title: 'Session Replay Android Standalone SDK'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1730306287
instrumentation_guide: true
platform: android
public: false
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
description: 'Choose this option if you use a third-party analytics provider to instrument your Android application.'
---
This article covers the installation of Session Replay for Android using the standalone SDK. If you use a provider other than Amplitude for in-product analytics, choose this option. If your app is already instrumented with Amplitude Android SDK, use the [Session Replay Android SDK Plugin](/docs/session-replay/session-replay-android-plugin).

{{partial:admonition type="tip" heading="Report issues"}}
To report issues with Session Replay for Android, see the [AmplitudeSessionReplay-Android GitHub repository](https://github.com/amplitude/AmplitudeSessionReplay-Android).
{{/partial:admonition}}

{{partial:partials/session-replay/sr-android-performance}}

## Before you begin

Use the latest version of the Session Replay SDK above version `{{sdk_versions:session_replay_android_standalone}}`. For a list of available versions, see the [release versions](https://central.sonatype.com/artifact/com.amplitude/session-replay-android/versions) on Maven Central.

Session Replay Standalone SDK requires that:

1. Your application is Android-based.
2. You track sessions with a timestamp, which you can pass to the SDK. You inform the SDK whenever a session timestamp changes.
3. You can provide a device ID to the SDK.
4. The `Session ID` and `Device ID` you pass to the Standalone SDK must match those sent as event properties to Amplitude.

The Standalone SDK doesn't provide Session management capabilities. Your application or a third-party integration must update the SDK with changes to `Session ID` and `Device ID`. 

{{partial:partials/session-replay/sr-android-supported-versions}}

## Quickstart

Add the [latest version](https://central.sonatype.com/artifact/com.amplitude/session-replay-android/versions) Session Replay SDK to your project dependencies.

```kotlin
implementation("com.amplitude:session-replay-android:{{sdk_versions:session_replay_android_standalone}}")
```

Configure your application code.

1. Create a  `val sessionReplay = SessionReplay()` object to begin collecting replays. Pass the API key, session identifier, and device identifier.
2. When the session identifier changes, pass the new value to Amplitude with `sessionReplay.setSessionId`.
3. Collect Session Replay properties to send with other event properties with `sessionReplay.getSessionReplayProperties`
4. Call `sessionReplay.flush` to send session replay data to Amplitude. Always call `flush` before exiting the app or sending it to the background. For longer sessions, call `flush` often to prevent high memory use (alpha).

```kotlin
import com.amplitude.android.sessionreplay.SessionReplay
import com.example.ThirdPartyAnalytics

// Initialize the standalone session replay SDK
val sessionReplay = SessionReplay(
    apiKey = "api-key",
    context = applicationContext,
    deviceId = "device-id",
    sessionId = Date().time,
    sampleRate = 1.0,
)

// Track an event
// Get session replay properties for this session
val sessionReplayProperties = sessionReplay.getSessionReplayProperties()
// Add session replay properties to the event before tracking
ThirdPartyAnalytics.track(
    eventName,
    if (eventProperties == null) sessionReplayProperties else eventProperties + sessionReplayProperties
)

// Handle session ID change
// Whenever the session ID changes
ThirdPartyAnalytics.setSessionId(sessionId)
// Update the session ID in session replay
sessionReplay.setSessionId(ThirdPartyAnalytics.getSessionId())

// Send session replay data to the server
// This should always be called before app exit
sessionReplay.flush()
```

## Configuration

Pass the following configuration options when you initialize the Session Replay SDK.

| Name      | Type      | Required | Default         | Description                                                                                                                                                                                                                                                                                                                   |
| --------- |-----------| -------- |-----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `deviceId` | `String`  | Yes      | `null`          | Sets an identifier for the device running your application.                                                                                                                                                                                                                                                                   |
| `sessionId` | `Long`    | Yes      | `null`          | Sets an identifier for the users current session. The value must be in milliseconds since epoch (Unix Timestamp).                                                                                                                                                                                                             |
| `sampleRate` | `Number`  | No       | `0.0`           | Use this option to control how many sessions to select for replay collection. <br></br>The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. |
| `optOut`  | `Boolean` | No       | `false`         | Sets permission to collect replays for sessions. Setting a value of true prevents Amplitude from collecting session replays.                                                                                                                                                                                                  |
| `logger`  | `Logger`  | No       | `LogcatLogger`  | Sets a custom `logger` class from the Logger to emit log messages to desired destination. Set to `null` to disable logging.                                                                                                                                                                                                   |
| `serverZone` | `ServerZone`  | No       | `ServerZone.US` | `ServerZone.EU` or `ServerZone.US`. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center.     
| `enableRemoteConfig`  | `boolean` | No       | `true`           | Enables or disables [remote configuration ](#remote-configuration) for this instance of Session Replay.                                                                                                                                                                                                              |

{{partial:partials/session-replay/sr-remote-config-test}}

{{partial:partials/session-replay/sr-android-mask-data}}

### User opt-out

Session Replay provides an option for opt-out configuration. This prevents Amplitude from collecting session replays when passed as part of initialization. For example:

```kotlin
// Pass a boolean value to indicate a users opt-out status
val sessionReplay = SessionReplay(
    apiKey = API_KEY,
    optOpt = true,
    /* other session replay options */
)
```

{{partial:partials/session-replay/sr-eu-data-residency}}

```kotlin
// Set serverZone to EU
val sessionReplay = SessionReplay(
    apiKey = API_KEY,
    serverZone = ServerZone.EU,
    /* other session replay options */
)
```

{{partial:partials/session-replay/sr-sampling-rate}}

```kotlin
// This configuration samples 1% of all sessions
val sessionReplay = SessionReplay(
    apiKey = API_KEY,
    sampleRate = 0.01,
    /* other session replay options */
)
```

### Disable replay collection

Once enabled, Session Replay runs on your app until either:

- The user leaves your app
- You call `sessionReplay.shutdown()`

Call `sessionReplay.shutdown()` before a user navigates to a restricted area of your app to disable replay collection while the user is in that area. 

Create a new instance `sessionReplay = SessionReplay(apiKey = API_KEY, /* options */)` to re-enable replay collection when the return to an unrestricted area of your app.

You can also use a feature flag product like Amplitude Experiment to create logic that enables or disables replay collection based on criteria like location. For example, you can create a feature flag that targets a specific user group, and add that to your initialization logic:

```kotlin
import com.amplitude.android.sessionreplay.SessionReplay
import com.example.ThirdPartyAnalytics

val sessionReplay = SessionReplay(
    apiKey = API_KEY,
    deviceId = "device-id",
    sessionId = Date().time,
    sampleRate = 1.0,
    /* other session replay options */
)

if (nonEUCountryFlagEnabled) {
  val sessionReplayProperties = sessionReplay.getSessionReplayProperties()
  ThirdPartyAnalytics.track(
      eventName = 'event',
      eventProperties = eventProperties + sessionReplayProperties
  )
}
```

{{partial:partials/session-replay/sr-data-retention}}

{{partial:partials/session-replay/sr-android-storage}}

{{partial:partials/session-replay/sr-android-known-limitations}}

{{partial:partials/session-replay/sr-android-troubleshooting}}

### Session replays don't appear in Amplitude 

Session replays may not appear in Amplitude due to:

- Lack of connectivity
- Failed to flush recording before exiting the app
- Sampling

#### Lack of connectivity

Ensure your app has access to the internet then try again.

#### Sampling

As mentioned above, the default `sampleRate` for Session Replay is `0`. Update the rate to a higher number. For more information see, [Sampling rate](#sampling-rate).

#### Some sessions don't include the Session Replay ID property

Session replay doesn't require that all events in a session have the `[Amplitude] Session Replay ID` property, only that one event in the session has it. Reasons why `[Amplitude] Session Replay ID`  may not be present in an event include:

- The user may have opted out or may not be part of the sample set given the current `sampleRate`. Increasing the `sampleRate` captures more sessions.
- Amplitude events may still send through your provider, but `getSessionReplayProperties()` doesn't return the `[Amplitude] Session Replay ID` property. This can result from `optOut` and `sampleRate` configuration settings. Check that `optOut` and `sampleRate` are set to include the session.

### Session Replay processing errors

In general, replays should be available within minutes of ingestion. Delays or errors may be the result of one or more of the following:

- Mismatching API keys or Device IDs. This can happen if Session Replay and standard event instrumentation use different API keys or Device IDs.
- Session Replay references the wrong project.
- Short sessions. If a users bounces within a few seconds of initialization, the SDK may not have time to upload replay data.
- Page instrumentation. If Session Replay isn't implemented on all pages a user visits, their session may not capture properly.
- Replays older than the set [retention period](#retention-period) (defaults to 90 days).