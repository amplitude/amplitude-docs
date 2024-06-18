---
id: b7cc9d54-870a-40bc-93d8-a2ac15375e75
blueprint: browser_sdk
title: 'Migrate from Javascript SDK to Browser SDK 1.0'
sdk_status: maintenance
article_type: migration
supported_languages:
  - js
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1714669940
parent: e6b6889d-9d39-4f04-89a1-87f78db80f49
exclude_from_sitemap: false
source: https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/migration/
sdk_version_comparison:
  -
    cells:
      - Feature
      - 'Browser SDK 1.0'
      - 'Javascript SDK'
  -
    cells:
      - Package
      - '[@amplitude/analytics-browser@1.13.4](https://www.npmjs.com/package/@amplitude/analytics-browser/v/1.13.4)'
      - '[amplitude-js](https://www.npmjs.com/package/amplitude-js)'
  -
    cells:
      - 'Logger provider'
      - 'Amplitude Logger by Default. Fully customizable.'
      - 'Amplitude Logger by default. Not customizable.'
  -
    cells:
      - 'Storage provider'
      - 'LocalStorage by default. Fully customizable.'
      - 'Limited storage - cookies, localStorage, sessionStorage, or none available. Not able to be customized.'
  -
    cells:
      - Customization
      - Plugins
      - 'Not supported'
  -
    cells:
      - 'Bundle size'
      - 'Tree shaking for optimization'
      - 'No Optimization'
  -
    cells:
      - 'Server endpoint'
      - 'HTTP V2 API'
      - 'HTTP V1 API'
  -
    cells:
      - 'Batch API'
      - 'Supported, with configuration.'
      - 'Not supported'
---

Amplitude Browser SDK 1.0 (`@amplitude/analytics-browser`) features a plugin architecture, built-in type definition and broader support for front-end frameworks. Browser SDK 1.0 isn't backwards compatible with `amplitude-js`. 

To migrate to `@amplitude/analytics-browser`, update your dependencies and instrumentation.

{{partial:admonition type="note" heading="Browser SDK 2.0"}}
An improved version of the Amplitude Browser SDK is now available. Amplitude Browser SDK 2.0 features default event tracking, improved marketing attribution tracking, simplified interface and a lighter weight package. Amplitude recommends the Browser SDK 2.0 for both product analytics and marketing analytics use cases. Upgrade to the latest [Browser SDK 2.0](/docs/sdks/analytics/browser/browser-sdk-2). 
{{/partial:admonition}}

{{partial:admonition type="warning" heading="Breaking changes"}}
Migration to `@amplitude/analytics-browser` may result in changes that can cause disruption to Web Attribution in your implementation. Before you upgrade, you can choose if attribution occurs during a session, or not. After you upgrade, attribution can happen during the session, and is no longer configurable.

In both versions, attribution can happen during initialization.
{{/partial:admonition}}

## Terminology

* `amplitude-js`: Maintenance Browser SDK
* `@amplitude/analytics-browser`: Browser SDK 1.0

## Dependency

For snippet installation, update your project's [snippet loader](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/analytics-browser#using-script-loader).

For Node projects, update your dependency list in package.json.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```json
{
  "dependencies": {
    "amplitude-js": "^8"
  }
}
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```json
{
  "dependencies": {
    "@amplitude/analytics-browser": "^1"
  }
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Instrumentation

Browser SDK 1.0 offers an API to instrument events. To migrate to the Browser SDK 1.0, you need to update a few calls. The following sections detail which calls have changed.

## Initialization

Like all other calls, `getInstance()` has been removed. To initialize the SDK, call `init()`, with the same parameters. However, `config` comes in a different shape. See [Configuration](#configuration).

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
import amplitude from "amplitude-js"

amplitude.getInstance().init(API_KEY, OPTIONAL_USER_ID, config)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
import * as amplitude from "@amplitude/analytics-browser"

amplitude.init(API_KEY, OPTIONAL_USER_ID, config)
```
{{/partial:tab}}
{{/partial:tabs}}

## Configuration

{{partial:collapse name="Configuration options"}}
|amplitude-js|@amplitude/analytics-browser|
|-|-|
|`config.apiEndpoint`|`config.serverUrl`|
|`config.batchEvents`|`config.flushQueueSize`|
|`config.cookieExpiration`|`config.cookieExpiration`|
|`config.cookieName`|NOT SUPPORTED|
|`config.sameSiteCookie`|`config.cookieSameSite`|
|`config.cookieForceUpgrade`|NOT SUPPORTED|
|`config.deferInitialization`|NOT SUPPORTED. See [Defer initialization](#defer-initialization).|
|`config.disableCookies`|`config.disableCookies`|
|`config.deviceId`|`config.deviceId`|
|`config.deviceIdFromUrlParam`|NOT SUPPORTED|
|`config.domain`|NOT SUPPORTED|
|`config.eventUploadPeriodMillis`|`config.flushIntervalMillis`|
|`config.eventUploadThreshold`|`config.flushQueueSize`|
|`config.forceHttps`|NOT SUPPORTED|
|`config.includeFbclid`|NOT SUPPORTED. See [Web attribution](#web-attribution).|
|`config.includeGclid`|NOT SUPPORTED. See [Web attribution](#web-attribution).|
|`config.includeReferrer`|NOT SUPPORTED. See [Web attribution](#web-attribution).|
|`config.includeUtm`|NOT SUPPORTED. See [Web attribution](#web-attribution).|
|`config.language`|NOT SUPPORTED. See [Plugins](#plugins).|
|`config.library`|NOT SUPPORTED. See [Plugins](#plugins).|
|`config.logLevel`|`config.logLevel`|
|`config.logAttributionCapturedEvent`|NOT SUPPORTED|
|`config.optOut`|`config.optOut`|
|`config.onError`|NOT SUPPORTED|
|`config.onExitPage`|NOT SUPPORTED. See [Flush](#flush-or-onexitpage).|
|`config.platform`|NOT SUPPORTED. `platform` is not supported at configuration level. But it still exist in event object. You can overwrite this by either assign a platform while tracking an event, or enriching the event.platform using enrichment plugin. See [Plugins](#plugins).|
|`config.savedMaxCount`|NOT SUPPORTED|
|`config.saveEvents`|NOT SUPPORTED|
|`config.saveParamsReferrerOncePerSession`|`config.attribution.trackNewCampaigns`. Opposite of `saveParamsReferrerOncePerSession`. See [configuration](../#configuration). |
|`config.secureCookie`|`config.cookieSecure`|
|`config.sessionTimeout`|`config.sessionTimeout`|
|`config.storage`|`config.storageProvider`|
|`config.trackingOptions`|`config.trackingOptions`|
|`config.transport`|`config.transportProvider`|
|`config.unsetParamsReferrerOnNewSession`|NOT SUPPORTED. Default behavior.|
|`config.unsentKey`|NOT SUPPORTED|
|`config.unsentIdentifyKey`|NOT SUPPORTED|
|`config.uploadBatchSize`|`config.flushQueueSize`|
|`config.headers`|NOT SUPPORTED|
|`config.serverZone`|`config.serverZone`|
|`config.useDynamicConfig`|NOT SUPPORTED|
|`config.serverZoneBasedApi`|NOT SUPPORTED|
|`config.sessionId`|`config.sessionId`|
|`config.partnerId`|`config.partnerId`|

{{/partial:collapse}}

## Tracking events

The maintenance Browser SDK offered a variety of `logEvent` APIs like `logEventWithTimestamp`, `logEventWithGroups` to override specific properties in the event payload. Amplitude has simplified all these variations into a unified `track` API in `@amplitude/analytics-browser`.

### logEvent()

The `logEvent()` API maps to `track()`.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
const eventType = "Button Clicked"
const eventProperties = {
  type: "primary",
}
amplitude.getInstance().logEvent(
  eventType,
  eventProperties,
)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const eventType = "Button Clicked"
const eventProperties = {
  type: "primary",
}
amplitude.track(
  eventType,
  eventProperties,
)
```
{{/partial:tab}}
{{/partial:tabs}}

### logEventWithTimestamp()

The `logEventWithTimestamp()` API maps to `track()`.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
const eventType = "Button Clicked"
const eventProperties = {
  type: "primary",
}
const timestamp = Date.now()
amplitude.getInstance().logEventWithTimestamp(
  eventType,
  eventProperties,
  timestamp,
)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const eventType = "Button Clicked"
const eventProperties = {
  type: "primary",
}
const eventOptions = {
  time = Date.now()
}
amplitude.track(
  eventType,
  eventProperties,
  eventOptions
)
```
{{/partial:tab}}
{{/partial:tabs}}

### logEventWithGroups()

The `logEventWithGroups()` API maps to `track()`.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
const eventType = "Button Clicked"
const eventProperties = {
  type: "primary",
}
const groups = {
  orgId: "12345",
}
amplitude.getInstance().logEventWithGroups(
  eventType,
  eventProperties,
  groups,
)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const event_type = "Button Clicked"
const event_properties = {
  type: "primary",
}
const groups = {
  orgId: "12345",
}
const event = {
  event_type,
  event_properties,
  groups
}
amplitude.track(event)
```
{{/partial:tab}}
{{/partial:tabs}}

### `sendEvents()`

The `sendEvents()` API maps to `flush()`.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
amplitude.getInstance().sendEvents()
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
amplitude.flush()
```
{{/partial:tab}}
{{/partial:tabs}}

## Set user properties

The APIs for setting user properties are the same, except for the removal of `getInstance()`. Here are code snippets to migrate APIs for user properties.

### setUserId()


{{partial:admonition type="warning" heading="Minimum identifier length"}}
The maintenance SDK uses an old SDK endpoint (`api2.amplitude.com`) which enforces no length limit for `deviceId` and `userId`. The latest SDK uses Amplitude's Http V2 API (`api2.amplitude.com/2/httpapi`) and requires identifiers to be at least 5 characters by default. When you migrate to the latest SDK, set `config.minIdLength` to a smaller value if you allowed identifiers with fewer than 5 characters.
{{/partial:admonition}}

Set a `userId` when you invoke `amplitude` without calling `getInstance()`

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
const userId = "1"
amplitude.getInstance().setUserId(userId)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const userId = "1"
amplitude.setUserId(userId)
```
{{/partial:tab}}
{{/partial:tabs}}

### setDeviceId()

{{partial:admonition type="warning" heading="Minimum identifier length"}}
The maintenance SDK uses an old SDK endpoint (`api2.amplitude.com`) which enforces no length limit for `deviceId` and `userId`. The latest SDK uses Amplitude's Http V2 API (`api2.amplitude.com/2/httpapi`) and requires identifiers to be at least 5 characters by default. When you migrate to the latest SDK, set `config.minIdLength` to a smaller value if you allowed identifiers with fewer than 5 characters.
{{/partial:admonition}}

Set a `deviceId` when you invoke `amplitude` without calling `getInstance()`

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
const deviceId = "1"
amplitude.getInstance().setDeviceId(deviceId)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const deviceId = "1"
amplitude.setDeviceId(deviceId)
```
{{/partial:tab}}
{{/partial:tabs}}

### setSessionId()

Set a `sessionId` when you invoke `amplitude` without calling `getInstance()`

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
const sessionId = Date.now()
amplitude.getInstance().setSessionId(sessionId)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const sessionId = Date.now()
amplitude.setSessionId(sessionId)
```
{{/partial:tab}}
{{/partial:tabs}}

### clearUserProperties()

The `clearUserProperties` API has been removed, use the unified `identify` API to remove user properties. 

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
amplitude.getInstance().clearUserProperties()
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
amplitude.identify(
  new amplitude.Identify().identify.clearAll()
)
```
{{/partial:tab}}
{{/partial:tabs}}

### setUserProperties()

The `setUserProperties` API has been removed, use the unified `identify` API to add user properties. 

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
amplitude.getInstance().setUserProperties({
  membership, "paid",
  payment, "bank",
})
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const identify = new amplitude.Identify()
identify
  .set("membership", "paid")
  .set("payment", "bank")
amplitude.identify(identify)
```
{{/partial:tab}}
{{/partial:tabs}}

### identify()

Make an identify call on `amplitude` without calling `getInstance()`.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
const identify = new amplitude.Identify()
identify.set("membership", "paid")
amplitude.getInstance().identify(identify)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const identify = new amplitude.Identify()
identify.set("membership", "paid")
amplitude.identify(identify)
```
{{/partial:tab}}
{{/partial:tabs}}

## Set group properties

### groupIdentify()

Make an identify call on `amplitude` without calling `getInstance()`.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
const identify = new amplitude.Identify()
identify.set("membership", "paid")
amplitude.getInstance().groupIdentify(identify)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const identify = new amplitude.Identify()
identify.set("membership", "paid")
amplitude.groupIdentify(identify)
```
{{/partial:tab}}
{{/partial:tabs}}

## Track revenue

### logRevenueV2()

Track revenue using `revenue()` API on `amplitude` without calling `getInstance()`.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
const revenue = new amplitude.Revenue()
revenue
  .setProductId("productId")
  .setPrice(10)
amplitude.getInstance().logRevenueV2(revenue)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
```typescript
const revenue = new amplitude.Revenue()
revenue
  .setProductId("productId")
  .setPrice(10)
amplitude.revenue(revenue)
```
{{/partial:tab}}
{{/partial:tabs}}

## Patterns

### Plugins

The configs `config.language`, `config.library`, `config.platform` were available in `amplitude-js` to allow modification of event payloads for these specific fields. Although `@amplitude/analytics-browser` doesn't support these configurations, you can add plugins to the new Browser SDK to enrich event payloads.

```ts
import { BrowserConfig, EnrichmentPlugin, Event, PluginType } from "@amplitude/analytics-types"

export class LibraryModifierPlugin implements EnrichmentPlugin {
  name = 'library-modifier'
  type = PluginType.ENRICHMENT as const

  /**
  * setup() is called on plugin installation
  * example: client.add(new LibraryModifierPlugin());
  */
  setup(config: BrowserConfig): Promise<undefined> {
    this.config = config
  }

  /**
  * execute() is called on each event instrumented
  * example: client.track('New Event');
  */
  execute(event: Event): Promise<Event> {
    event.library = 'my-library-name/1.0.0'
    return Promise.resolve(event)
  }
}
```

To install your custom plugin, use `add()` with your custom plugin as parameter.

```typescript
import { add } from "@amplitude/analytics-browser"

add(new LibraryModifierPlugin())
```

### Defer initialization

To defer initialization in `amplitude-js`, call init with `config.deferInitialization` set to `true`, and eventually call `enableTracking()` to formalize initialization and send all enqueued events.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
amplitude.getInstance().init(API_KEY, OPTIONAL_USER_ID, {
  deferInitialization: true,
})

amplitude.getInstance().logEvent("Event 1")
amplitude.getInstance().logEvent("Event 2")
amplitude.getInstance().logEvent("Event 3")

amplitude.getInstance().enableTracking()
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
Call `init()` at a later time than `track()`. All `track()` calls are then processed after initialization completes.

```typescript
amplitude.track("Event 1")
amplitude.track("Event 2")
amplitude.track("Event 3")

amplitude.init(API_KEY, OPTIONAL_USER_ID)
```
{{/partial:tab}}
{{/partial:tabs}}

### Web attribution

In `amplitude-js`, web attribution is enabled by enabling the following configurations:

* `config.includeGclid`
* `config.includeFbclid`
* `config.includeReferrer`
* `config.includeUtm`

In `@amplitude/analytics-browser`, the web attribution is controlled by a single configuration `config.attribution.disabled` which by default is set to `false` and captures all campaign parameters. This configuration collects the same campaign parameters supported in `amplitude-js`.

### Flush or onExitPage

There are certain scenarios that warrant sending events immediately, like when a user navigates away from a page. This is a common scenario when tracking button clicks that directs the user to another page while sending event payload in batches.

In `amplitude-js` do this by using `onExitPage()` callback.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser"}}
{{partial:tab name="amplitude-js"}}
```javascript
amplitude.getInstance().init(API_KEY, OPTIONAL_USER_ID, {
  onExitPage: () => {
    amplitude.sendEvents()
  },
})
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser"}}
Add your own event listener for the `pagehide` event.
```javascript
window.addEventListener('pagehide', () => {
  // Set https transport to use sendBeacon API
  amplitude.setTransport('beacon')
  // Send all pending events to server
  amplitude.flush()
});
```
{{/partial:tab}}
{{/partial:tabs}}

### Callback

For `amplitude-js`, one `init` callback function for executing any function after initialization and two separate callback functions are passed for success and error network request. With `@amplitude/analytics-browser` supporting Promises (and async/await), the asynchronous methods like `init()`, `track()`, `identify()`, `groupIdentify()` return a custom promise interface.

```javascript
const initResult = await amplitude.init("YOUR_API_KEY").promise
if (initResult.code === 200) {
  // success logic
} else {
  // error logic
}

const result = await amplitude.track("Button Clicked").promise
if (result.code === 200) {
  // success logic
} else {
  // error logic
}
```
