---
id: c412bf9e-bbad-4063-bcf4-20cf2b3c2a01
blueprint: session-replay
title: 'Session Replay Android Middleware'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1726763603
alpha: true
instrumentation_guide: true
platform: android
public: false
parent: 467a0fe0-6ad9-4375-96a2-eea5b04a7bcf
---
{{partial:partials/session-replay/sr-android-eap :when="alpha"}}

This article covers the installation of Session Replay using the [Android SDK middleware](/docs/sdks/sdk-middleware). If your app is already instrumented with [(maintenance) Amplitude SDK](/docs/sdks/analytics/android/android-sdk), use this option. 

If your app is already instrumented with [(latest) Amplitude Android SDK](/docs/sdks/analytics/android/android-kotlin-sdk), use the [Session Replay Android SDK Plugin](/docs/session-replay/session-replay-android-plugin).

If you use a provider other than Amplitude for in-product analytics, choose the [standalone implementation](/docs/session-replay/session-replay-android-standalone).

{{partial:partials/session-replay/sr-android-performance}}

## Before you begin

Use the latest version of the Session Replay Middleware above version `{{sdk_versions:session_replay_android_middleware}}`. For a list of available versions, see all [release versions](https://central.sonatype.com/artifact/com.amplitude/middleware-session-replay-android/versions) on Maven Central.

The Session Replay Middleware requires that:

1. Your application is Android-based.
2. You are using `2.40.1` or higher of the [(maintenance) Amplitude Android SDK](/docs/sdks/analytics/android/android-sdk).
3. You can provide a device ID to the SDK.

{{partial:partials/session-replay/sr-android-supported-versions}}

## Quickstart

Add the [latest version](https://central.sonatype.com/artifact/com.amplitude/middleware-session-replay-android/versions) of the session replay middleware to your project dependencies


```kotlin
// Install latest version from Maven Central
implementation("com.amplitude:middleware-session-replay-android:@{$ android.session_replay.version $}")
// You will also need the (maintenance) Amplitude Analytics SDK if it's not already installed
implementation("com.amplitude:android-sdk:[2.40.1,3.0.0]")
```

Configure your application code.

```kotlin
import com.amplitude.api.Amplitude
import com.amplitude.api.SessionReplayMiddleware

// Initialize (maintenance) Amplitude Analytics SDK instance
val amplitude = Amplitude.getInstance()
    .initialize(this, AMPLITUDE_API_KEY)
    // Replay events will be flushed on close as well
    // If setFlushEventsOnClose(false) you must call flush() manually
    .setFlushEventsOnClose(true)

// Create Session Replay Middleware
val sessionReplayMiddleware = SessionReplayMiddleware(amplitude, sampleRate = 1.0)

// Add session replay middleware
// Recording will be handled automatically
amplitude.addEventMiddleware(sessionReplayMiddleware)

// Track events
amplitude.logEvent("Setup (maintenance) Amplitude Android SDK with session replay!")

// Send replay events to the server
amplitude.uploadEvents()

// You can also call flush() on the middleware directly to only send replay events
// sessionReplayMiddleware.flush()

// Always flush before app exit (onPause)
// override fun Activity.onPause() { sessionReplayMiddleware.flush() }
```

## Configuration

Pass the following option when you initialize the Session Replay middleware:

| Name              | Type      | Required | Default         | Description                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------- | --------- | -------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `sampleRate`      | `number`  | No       | `0`             | Use this option to control how many sessions to select for replay collection. <br></br>The number should be a decimal between 0 and 1, for example `0.4`, representing the fraction of sessions to have randomly selected for replay collection. Over a large number of sessions, `0.4` would select `40%` of those sessions. |

{{partial:partials/session-replay/sr-android-mask-data}}

### User opt-out

The Session Replay middleware follows the Android SDK's `optOut` setting, and doesn't support user opt-outs on its own.

```kotlin
import com.amplitude.api.Amplitude
import com.amplitude.api.SessionReplayMiddleware

// Set optOut on the Amplitude SDK
val amplitude = Amplitude.getInstance()
        .initialize(this, AMPLITUDE_API_KEY)
        .setOptOut(true)

amplitude.addEventMiddleware(SessionReplayMiddleware(amplitude, /* session replay options */))
```

{{partial:partials/session-replay/sr-eu-data-residency}}

```kotlin
import com.amplitude.api.Amplitude
import com.amplitude.api.SessionReplayMiddleware

// Set serverZone on the Amplitude SDK
val amplitude = Amplitude.getInstance()
        .initialize(this, AMPLITUDE_API_KEY)
        .setServerZone(AmplitudeServerZone.EU)

amplitude.add(SessionReplayMiddleware(amplitude, /* session replay options */))
```

{{partial:partials/session-replay/sr-sampling-rate}}

```kotlin
// This configuration samples 1% of all sessions
amplitude.addEventMiddleware(SessionReplayMiddleware(amplitude, sampleRate = 0.01))
```

### Disable replay collection

Once enabled, Session Replay runs on your app until either:

- The user leaves your app
- You call `sessionReplayMiddleware.stopRecording()`

Call `sessionReplayMiddleware.stopRecording()` before a user navigates to a restricted area of your app to disable replay collection while the user is in that area.

{{partial:admonition type="note" heading="Keep a reference"}}
This requires keeping a reference to the SessionReplayMiddleware instance `val sessionReplayMiddleware = SessionReplayMiddleware(/* session replay options */)`.
{{/partial:admonition}}

Call `sessionReplayMiddleware.startRecording()` to re-enable replay collection when the return to an unrestricted area of your app.

You can also use a feature flag product like Amplitude Experiment to create logic that enables or disables replay collection based on criteria like location. For example, you can create a feature flag that targets a specific user group, and add that to your initialization logic:

```kotlin
import com.amplitude.api.Amplitude
import com.amplitude.api.SessionReplayMiddleware

// Your existing initialization logic with Android SDK
val amplitude = Amplitude.getInstance().initialize(this, AMPLITUDE_API_KEY)

if (nonEUCountryFlagEnabled) {
  // Create and Install Session Replay Middleware
  val sessionReplayMiddleware = SessionReplayMiddleware(amplitude, sampleRate = 0.5)
  amplitude.addEventMiddleware(sessionReplayMiddleware)
}
```

{{partial:partials/session-replay/sr-data-retention}}

{{partial:partials/session-replay/sr-android-storage}}

Amplitude recommends setting `amplitude.setFlushEventsOnClose(true)` in the Amplitude SDK Configuration (the default) to send session data to the server on each app exit.

{{partial:partials/session-replay/sr-android-known-limitations}}

### Multiple Amplitude instances

Session Replay supports attaching to a single instance of the Amplitude SDK. If you have more than one instance instrumented in your application, make sure to start Session Replay on the instance that most relates to your project.

{{partial:partials/session-replay/sr-android-troubleshooting}}

### Captured sessions contain limited information

Session Replay requires that the Android SDK sets `sessionId` and `deviceId` at a minimum. If you instrument events outside of the Android SDK, Amplitude doesn't tag those events as part of the session replay. This means you can't use tools like Funnel, Segmentation, or Journeys charts to find session replays. You can find session replays with the User Sessions chart or through User Lookup.

If you use a method other than the Android SDK to instrument your events, consider using the [Session Replay Standalone SDK for Android](/docs/session-replay/session-replay-android-standalone).

### Replay length and session length don't match

In some scenarios, the length of a replay may exceed the time between the `[Amplitude] Start Session` and `[Amplitude] End Session` events. This happens when a user closes the `[Amplitude] End Session` occurs, but before the Android SDK and Session Replay middleware can process it. When the user visits the app again, the SDK and middleware process the event and send it to Amplitude, along with the replay. You can verify this scenario occurs if you see a discrepancy between the `End Session Client Event Time` and the `Client Upload Time`.

### Session replays don't appear in Amplitude

Session replays may not appear in Amplitude due to:

- Lack of connectivity
- Failed to flush recording before exiting the app
- No events triggered through the Android SDK in the current session
- Sampling

#### Lack of connectivity

Ensure your app has access to the internet then try again.

#### No events triggered through the Android SDK in the current session

Session Replay requires that at least one event in the user's session has the `[Amplitude] Session Replay ID` property. If you instrument your events with a method other than the [Android SDK](/docs/sdks/analytics/android/android-kotlin-sdk), the Android SDK may send only the default Session Start and Session End events, which don't include this property.

For local testing, you can force a Session Start event to ensure that Session Replay functions.

1. In Amplitude, in the User Lookup Event Stream, you should see a Session Start event that includes the `[Amplitude] Session Replay ID` property. After processing, the Play Session button should appear for that session.

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