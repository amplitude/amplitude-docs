---
id: be90c5e4-8e23-46eb-a492-604883e0c0e4
blueprint: session-replay
instrumentation_guide: false
title: 'Session Replay integration with Segment'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1741112613
---
Session Replay supports other analytics providers. Follow the information below to add Session Replay to an existing Segment-instrumented site.

- [Amplitude (Actions) destination](#amplitude-actions-destination)
- [Amplitude Classic destination (Device-mode)](#amplitude-classic-destination-device-mode)
- [Amplitude Classic destination (Cloud-mode)](#amplitude-classic-destination-cloud-mode)
- [Troubleshoot Segment integration](#troubleshoot-segment-integration)

{{partial:admonition type="note" heading="Replay Captured event"}}
Amplitude automatically creates the `[Amplitude] Replay Captured` event when Session Replay captures a session. Amplitude receives this event directly, it is not sent through Segment. If you don't see this event in Amplitude, contact [Amplitude support](https://gethelp.amplitude.com/hc/en-us/requests/new).
{{/partial:admonition}}

### Amplitude (Actions) destination

Amplitude (Actions) tracks sessions automatically. When a user starts a new session, Amplitude sets an `analytics_session_id` cookie on the users browser. Configure your implementation to listen for changes in value to `analytics_session_id`, which you can do with Segment's [Source Middleware](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/middleware/).

This code snippet shows how to configure Session Replay with Segment's Amplitude (Actions) integration, and update the session ID when `analytics_session_id` changes.

```javascript
import * as sessionReplay from "@amplitude/session-replay-browser";
import { AnalyticsBrowser } from "@segment/analytics-next";

const segmentAnalytics = AnalyticsBrowser.load({
  writeKey: "segment-key",
});

const AMPLITUDE_API_KEY = 'api-key' // must match that saved with Segment
const getStoredSessionId = () => {
 return cookie.get("analytics_session_id") || 0;
}

const user = await segmentAnalytics.user();
const storedSessionId = getStoredSessionId();

await sessionReplay.init(AMPLITUDE_API_KEY, { 
  sessionId: storedSessionId,
  deviceId: user.anonymousId()
}).promise;

// Add middleware to check if the session id has changed, 
// and update the session replay instance
segmentAnalytics.addSourceMiddleware(({ payload, next, integrations }) => {
  const storedSessionId = getStoredSessionId();
  const nextSessionId = payload.obj.integrations['Actions Amplitude'].session_id || 0
  if (storedSessionId < nextSessionId) {
    cookie.set("analytics_session_id", nextSessionId);
    sessionReplay.setSessionId(nextSessionId);
  }
  next(payload);
});
```
### Amplitude Classic destination (Device-mode)

This version of the Amplitude destination installs the Amplitude JavaScript SDK (5.2.2) on the client, and sends events directly to `api.amplitude.com`.

The Device-mode integration tracks sessions by default, since it includes the amplitude-js SDK. The included SDK version (5.2.2) doesn't include an event for session changes. As a result, use Segment's middleware to update Session Replay when the session ID changes.

```javascript
import * as sessionReplay from "@amplitude/session-replay-browser";
import { AnalyticsBrowser } from "@segment/analytics-next";

const segmentAnalytics = AnalyticsBrowser.load({
  writeKey: "segment-key",
});

const AMPLITUDE_API_KEY = 'api-key' // must match that saved with Segment
const getAmpSessionId = () => {
  const sessionId = window.amplitude.getInstance().getSessionId();
  cookie.set("analytics_session_id", sessionId);
  return sessionId;
};

// Wait for the amplitude-js SDK to initialize,
// then initialize session replay with the correct device id and session id
window.amplitude.getInstance().onInit(() => {
  const sessionId = getAmpSessionId();
  sessionReplay.init(AMPLITUDE_API_KEY, {
    deviceId: window.amplitude.getInstance().options.deviceId,
    sessionId: getAmpSessionId(),
  });
});

// Add middleware to check if the session id has changed, 
// and update the session replay instance
segmentAnalytics.addSourceMiddleware(({ payload, next, integrations }) => {
  const nextSessionId = window.amplitude.getInstance().getSessionId();
  const storedSessionId = cookie.get("analytics_session_id") || 0;
  if (storedSessionId < nextSessionId) {
    cookie.set("analytics_session_id", nextSessionId);
    sessionReplay.setSessionId(nextSessionId);
  }
  next(payload);
});
```

### Amplitude Classic destination (Cloud-mode)

This version of the Amplitude destination sends events to Segment's backend, which forwards them to Amplitude. The Cloud-mode destination doesn't track sessions by default. To overcome this, use the Browser SDK as a shell to manage sessions, and use Session Replay as a plugin, as shown below.

```javascript
import { sessionReplayPlugin } from "@amplitude/plugin-session-replay-browser";
import { AnalyticsBrowser } from "@segment/analytics-next";

const segmentAnalytics = AnalyticsBrowser.load({
  writeKey: "segment-key",
});

// A plugin must be added so that events sent through Segment will have
// session replay properties and the correct session id
const segmentPlugin = () => {
  return {
    name: "segment",
    type: "destination",
    execute: async (event) => {
      const properties = event.event_properties || {};
      segmentAnalytics.track(event.event_type, properties, {
        integrations: {
          Amplitude: {
            session_id: amplitude.getSessionId(),
          },
        },
      });
      return {
        code: 200,
        event: event,
        message: "OK",
      };
    },
  };
}; 

const AMPLITUDE_API_KEY = 'api-key' // must match that saved with Segment

// Add the session replay plugin first, then the segment plugin
await amplitude.add(sessionReplayPlugin()).promise;
await amplitude.add(segmentPlugin()).promise;

const user = await segmentAnalytics.user();
await amplitude.init(AMPLITUDE_API_KEY, { 
  instanceName: 'session-replay',
  sessionTimeout: Number.MAX_SAFE_INTEGER,
  defaultTracking: false,
  deviceId: user.anonymousId()
}).promise;
amplitude.remove('amplitude');
// Events must be tracked through the shell Browser SDK to properly attach
// session replay properties
amplitude.track('event name')
```

### Troubleshoot Segment integration
If the instance returns empty, your Segment middleware may not have populated the values for the Amplitude integration field `payload.obj.integrations['Actions Amplitude']`. If this happens, add the following `setTimeout` wrapper to ensure this field populate with a valid value.

```js
segmentAnalytics.addSourceMiddleware(({ payload, next, integrations }) => {
    const storedSessionId = getStoredSessionId()
    setTimeout(() => { 
      ... // Rest of the Segment integrations code
    }, 0) 
    next(payload)
});
```

