---
id: 7f2e8a4c-9b3d-4e1a-8f5c-2d6e9a1b4c8e
blueprint: web_experiment
title: 'Proxy Web Experiment'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1734984000
---


Some organizations prefer not to load third-party experimentation scripts directly from vendor-hosted domains nor do they want to perform client-side experiment evaluation. They may not want to do this for a variety of reasons including security policies, privacy controls, or tighter infrastructure ownership.

Proxy-based experimentation architecture lets teams retain full control over script delivery, evaluation, and exposure tracking while continuing to use a centralized experimentation platform.

This document outlines common proxy patterns and the key implementation details required to support them.

## Script delivery proxy

Customers host a lightweight endpoint that proxies requests for the experimentation JavaScript SDK. End users load the script from a customer-owned domain rather than a third-party domain.

This lets you: 

* Reduce third-party script exposure.
* Better align with internal security or compliance requirements

### CDN configuration

* **Origin**: `https://cdn.amplitude.com`
* **Path rewrite**: `/script/{API_KEY}.experiment.js → /script/{API_KEY}.experiment.js`
* **Cache TTL**: 1–5 minutes (balances freshness with performance)
* **Cache key**: Full URL including `API_KEY`

**Before (direct to Amplitude):**

```html
<script src="https://cdn.amplitude.com/script/abc123def456.experiment.js"></script>
```

**After (through your proxy):**

```html
<script src="https://experiments.acme.com/script/abc123def456.experiment.js"></script>
```

## Remote evaluation proxy

The Web Experiment script calls a single endpoint for remote evaluation. An experiment requires remote evaluation when its targeting rules contain at least one property that is not available locally on the client.

This lets you:

* Centralize control over evaluation logic.
* Enrich requests with server-side context

### Exposing your proxy evaluation endpoint

Create and expose an HTTPS endpoint for remote evaluation for the Web Experiment SDK:

**Example URLs:**

* **Full path**: `https://experiments.acme.com/sdk/v2/flags?delivery_method=web`
* **Base URL**: `https://experiments.acme.com/`

The SDK uses this base URL for all evaluation requests.

### Configuring the Web Experiment script

Configure the Web Experiment script/SDK to call your new endpoint instead of the Amplitude-hosted URLs (`flag.lab.amplitude.com` or `flag.lab.eu.amplitude.com`). Put the following code above the Web Experiment script.

```html
<script>
window.experimentConfig = {
  flagsServerUrl: 'https://experiments.acme.com/',
}
</script>
```

### Implementing proxy logic

For each incoming browser request, the proxy must:

**Accept request**

* **Method:** GET
* **Query Parameters:** `delivery_method=web`

**Forward to Amplitude**

* **US Projects:** `https://flag.lab.amplitude.com/sdk/v2/flags?delivery_method=web`
* **EU Projects:** `https://flag.lab.eu.amplitude.com/sdk/v2/flags?delivery_method=web`

**Inject Headers**

| Header Name       | Value                                 | Notes                                                                                 |
| ----------------- | ------------------------------------- | ------------------------------------------------------------------------------------- |
| Authorization     | `Api-Key <AMPLITUDE_PROJECT_API_KEY>` | Stored and managed only on the server. Never exposed to the browser.                  |
| X-Amp-Exp-User    | `<base64-encoded user object>`        | Forward from browser as-is. Contains `{"user_id": "...", "device_id": "..."}`         |


**Return Response**:
Return Amplitude’s JSON response unchanged to the browser.

---

#### Example request flow

**Browser to Proxy**:

```
GET https://experiments.acme.com/sdk/v2/flags?delivery_method=web
X-Amp-Exp-User: eyJ1c2VyX2lkIjoidXNlciIsImRldmljZV9pZCI6ImRldmljZSJ9
```

**Proxy to Amplitude**:

```
GET https://flag.lab.amplitude.com/sdk/v2/flags?delivery_method=web
Authorization: Api-Key <PROJECT_API_KEY>
X-Amp-Exp-User: eyJ1c2VyX2lkIjoidXNlciIsImRldmljZV9pZCI6ImRldmljZSJ9
```

**Proxy to Browser**:
Returns Amplitude's evaluation response.

#### Response format

The endpoint returns a JSON array of experiment flag objects pre-evaluated for the user.

**Flag object schema**:

| Field    | Description                                                                                                                        |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| key      | Unique flag key identifying the experiment.                                                                                         |
| segments | Targeting and bucketing rules pre-evaluated with the user’s properties. Conditions that are true are included; others are removed. |
| variants | Available variants, including key, metadata, and web experiment actions (mutations, custom code, URL redirects).                   |
| metadata | Experiment metadata: version, deployment status, and re-run indicators.                                                             |

---

#### Example response

```json
[
  {
    "key": "example",
    "metadata": {
      "deliveryMethod": "web",
      "deployed": true,
      "evaluationMode": "local",
      "experimentKey": "exp-1",
      "exposureEvent": "$impression",
      "flagType": "experiment",
      "flagVersion": 5
    },
    "segments": [
      {
        "bucket": {
          "allocations": [
            {
              "distributions": [
                { "range": [0, 21474837], "variant": "control" },
                { "range": [21474836, 42949673], "variant": "treatment" }
              ],
              "range": [0, 100]
            }
          ],
          "salt": "G0U0BTSK",
          "selector": ["context", "user", "web_exp_id"]
        },
        "conditions": [
          [
            { "op": "is", "selector": ["context", "user", "device_category"], "values": ["desktop"] }
          ]
        ],
        "metadata": { "segmentName": "Segment 1" },
        "variant": "off"
      },
      {
        "metadata": { "segmentName": "All Other Users" },
        "variant": "off"
      }
    ],
    "variants": {
      "control": {
        "key": "control",
        "payload": [{ "action": "mutate", "data": { "mutations": [] } }],
        "value": "control"
      },
      "off": { "key": "off", "metadata": { "default": true } },
      "treatment": {
        "key": "treatment",
        "payload": [
          {
            "action": "mutate",
            "data": {
              "mutations": [
                {
                  "action": "set",
                  "attribute": "html",
                  "metadata": { "scope": ["89e01141-6e35-4bc0-bb66-0e1bc0fd4823"], "type": "text" },
                  "selector": ".md\\:max-w-max:nth-child(1)",
                  "value": "updated text"
                }
              ]
            }
          }
        ],
        "value": "treatment"
      }
    }
  }
]
```

---

## Impression (Exposure) event forwarding

Impression (exposure) events are sent from customer-controlled backend systems to the experimentation platform rather than directly from the browser.

This lets you:

* Unify event pipelines.
* Make compliance with data governance policies easier.

If you are already using Amplitude's Analytics SDK, you can update the tracking endpoint for the browser SDK through `serverUrl`.

If you are not using Amplitude's Analytics SDK, you can add the following script before the Web Experiment script.

**Important**: The impression event forwarding script must be placed above the Web Experiment script.

```html
<script>
// TODO: Replace this object with your tracker implementation.
const customTracker = {
  track: (eventType, eventProperties) => {
    // TODO: Send eventType and eventProperties to your analytics tool.
    console.log({ eventType, eventProperties });
  },
};

window.experimentIntegration = {
  getUser: () => {
    // TODO: Return user.
    return {
      user_id: "user",
      device_id: "device",
    };
  },

  track: (e) => {
    // TODO: Track event
    customTracker.track(e.eventType, e.eventProperties);
    return true;
  },
};
</script>
```
