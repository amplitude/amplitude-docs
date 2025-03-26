---
id: 57ba371b-f74f-4606-bc62-6405b4375f61
blueprint: browser_sdk
title: 'Migrate from Javascript SDK to Browser SDK 2.0'
sdk_status: maintenance
article_type: migration
supported_languages:
  - js
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1714669940
parent: e6b6889d-9d39-4f04-89a1-87f78db80f49
exclude_from_sitemap: false
source: 'https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/migration/'
sdk_version_comparison:
  -
    cells:
      - Feature
      - 'Browser SDK 2.0'
      - 'Javascript SDK'
  -
    cells:
      - Package
      - '[@amplitude/analytics-browser@2+](https://www.npmjs.com/package/@amplitude/analytics-browser)'
      - '[amplitude-js](https://www.npmjs.com/package/amplitude-js)'
  -
    cells:
      - 'Logger provider'
      - 'Amplitude Logger by Default. Fully customizable.'
      - 'Amplitude Logger by default. Not customizable.'
  -
    cells:
      - 'Storage provider for unsent events'
      - 'LocalStorage by default. Fully customizable.'
      - 'LocalStorage. Not configurable'
  -
    cells:
      - 'Identity storage'
      - 'Cookie stoage by default. local storage, session storage and no storage supported'
      - 'The same'
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
Amplitude Browser SDK 2.0 (`@amplitude/analytics-browser@2+`) features:

* Plugin architecture
* Built-in type definition
* Broader support for front-end frameworks
* Autocapture
* Improved marketing attribution tracking
* Identical interfaces across platform with other Amplitude SDKs

Browser SDK 2.0 isn't backwards compatible with `amplitude-js`.

To migrate to `@amplitude/analytics-browser@2+`, update your dependencies and instrumentation.

{{partial:admonition type="warning" heading="Breaking changes"}}
When migrating to `@amplitude/analytics-browser@2+`, your implementation may experience disruption to web attribution. Before you upgrade, choose whether attribution occurs during a session. After upgrading, attribution can happen during the session, and is no longer configurable.

In both versions, attribution can occur during initialization.
{{/partial:admonition}}

{{partial:admonition type="warning" heading="Cookie migration"}}
Browser SDK 2.0 automatically migrates cookies from the JavaScript SDK, version 6.0.0 or above:

* Old cookie name `AMP_{first 6 digit of api key}` from JavaScript SDK 6.0.0 and above
* New cookie name `AMP_{first 10 digit of api key}` from Browser SDK 2

Migrating from a JavaScript SDK version prior to 6.0.0 requires manual cookie migration.

To manually migrate cookies:

1. Read the values from the old cookie.
2. Pass those values to `amplitude.init()` in the SDK configuration.

```ts
this.init('API_KEY', {
  deviceId: 'device_id',
  userId: 'user_id',
});
```

{{/partial:admonition}}

## Terminology

* `amplitude-js`: Maintenance Browser SDK
* `@amplitude/analytics-browser@2+`: Browser SDK 2.0

## Dependency

For snippet installation, update your project's [snippet loader](/docs/sdks/analytics/browser/browser-sdk-2#install-the-sdk).

For Node projects, update your dependency list in package.json.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```json
{
  "dependencies": {
    "amplitude-js": "^8"
  }
}
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
```json
{
  "dependencies": {
    "@amplitude/analytics-browser": "^2.11.8"
  }
}
```
{{/partial:tab}}
{{/partial:tabs}}

## Instrumentation

Browser SDK 2.0 offers an API to instrument events. To migrate to the Browser SDK 2.0, update a few calls. The following sections detail which calls have changed.

## Initialization

`getInstance()` has been removed. To initialize the SDK, call `init()`, with the same parameters. However, `config` comes in a different shape. See [Configuration](#configuration).

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
import amplitude from "amplitude-js"

amplitude.getInstance().init(API_KEY, OPTIONAL_USER_ID, config)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
```typescript
import * as amplitude from "@amplitude/analytics-browser"

amplitude.init(API_KEY, OPTIONAL_USER_ID, config)
```
{{/partial:tab}}
{{/partial:tabs}}

## Configuration

{{partial:collapse name="Configuration options"}}
|amplitude-js|@amplitude/analytics-browser@2+|
|-|-|
|`config.apiEndpoint`|`config.serverUrl`|
|`config.batchEvents`|`config.flushQueueSize`|
|`config.cookieExpiration`|`config.cookieOptions.expiration`|
|`config.secureCookie`|`config.cookieOptions.secure`|
|`config.sameSiteCookie`|`config.cookieOptions.sameSite`|
|`config.cookieName`|NOT SUPPORTED|
|`config.cookieForceUpgrade`|NOT SUPPORTED|
|`config.deferInitialization`|NOT SUPPORTED. See [Defer initialization](#defer-initialization).|
|`config.disableCookies`|`config.identityStorage`. Set it to `'localStorage'` to disable cookies|
|`config.deviceId`|`config.deviceId`|
|`config.deviceIdFromUrlParam`|Device Id is pulled from URL parameter by default. See [Browser SDK 2.0 Cross-domain tracking](/docs/sdks/analytics/browser/browser-sdk-2#cross-domain-tracking).|
|`config.domain`|NOT SUPPORTED|
|`config.eventUploadPeriodMillis`|`config.flushIntervalMillis`|
|`config.eventUploadThreshold`|`config.flushQueueSize`|
|`config.forceHTTPs`|NOT SUPPORTED|
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
|`config.platform`|NOT SUPPORTED. `platform` isn't supported at the configuration level, but it does still exist in the event object. Overwrite this by either assigning a platform while tracking an event, or enriching the event.platform using the enrichment plugin. See [Plugins](#plugins).|
|`config.savedMaxCount`|NOT SUPPORTED|
|`config.saveEvents`|NOT SUPPORTED|
|`config.saveParamsReferrerOncePerSession`|NOT SUPPORTED.|
|`config.sessionTimeout`|`config.sessionTimeout`|
|`config.storage`|`config.identityStorage`|
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

The maintenance Browser SDK offered a variety of `logEvent` APIs like `logEventWithTimestamp`, `logEventWithGroups` to override specific properties in the event payload. Instead of these, use the unified `track` API in `@amplitude/analytics-browser@2+`.

### logEvent()

The `logEvent()` API maps to `track()`.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
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
{{partial:tab name="@amplitude/analytics-browser@2+"}}
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

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
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
{{partial:tab name="@amplitude/analytics-browser@2+"}}
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

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
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
{{partial:tab name="@amplitude/analytics-browser@2+"}}
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

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
amplitude.getInstance().sendEvents()
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
```typescript
amplitude.flush()
```
{{/partial:tab}}
{{/partial:tabs}}

## Set user properties

The APIs for setting user properties are the same, except for the removal of `getInstance()`. Here are code snippets to migrate APIs for user properties.

### setUserId()

{{partial:admonition type="warning" heading="Minimum identifier length"}}
The maintenance SDK uses an old SDK endpoint (`api2.amplitude.com`) which enforces no length limit for `deviceId` and `userId`. The latest SDK uses Amplitude's HTTP V2 API (`api2.amplitude.com/2/httpapi`) and requires identifiers to be at least five characters by default. When you migrate to the latest SDK, set `config.minIdLength` to a smaller value if you allowed identifiers with fewer than five characters.
{{/partial:admonition}}

Set a `userId` when you invoke `amplitude` without calling `getInstance()`

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
const userId = "1"
amplitude.getInstance().setUserId(userId)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
```typescript
const userId = "1"
amplitude.setUserId(userId)
```
{{/partial:tab}}
{{/partial:tabs}}

### setDeviceId()

{{partial:admonition type="warning" heading="Minimum identifier length"}}
The maintenance SDK uses an old SDK endpoint (`api2.amplitude.com`) which enforces no length limit for `deviceId` and `userId`. The latest SDK uses Amplitude's HTTP V2 API (`api2.amplitude.com/2/httpapi`) and requires identifiers to be at least five characters by default. When you migrate to the latest SDK, set `config.minIdLength` to a smaller value if you allowed identifiers with fewer than five characters.
{{/partial:admonition}}

Set a `deviceId` when you invoke `amplitude` without calling `getInstance()`

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
const deviceId = "1"
amplitude.getInstance().setDeviceId(deviceId)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
```typescript
const deviceId = "1"
amplitude.setDeviceId(deviceId)
```
{{/partial:tab}}
{{/partial:tabs}}

### setSessionId()

Set a `sessionId` when you invoke `amplitude` without calling `getInstance()`

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
const sessionId = Date.now()
amplitude.getInstance().setSessionId(sessionId)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
```typescript
const sessionId = Date.now()
amplitude.setSessionId(sessionId)
```
{{/partial:tab}}
{{/partial:tabs}}

### clearUserProperties()

The `clearUserProperties` API has been removed. Use the unified `identify` API to remove user properties. 

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
amplitude.getInstance().clearUserProperties()
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
```typescript
amplitude.identify(
  new amplitude.Identify().identify.clearAll()
)
```
{{/partial:tab}}
{{/partial:tabs}}

### setUserProperties()

The `setUserProperties` API has been removed. Use the unified `identify` API to add user properties. 

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
amplitude.getInstance().setUserProperties({
  membership, "paid",
  payment, "bank",
})
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
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

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
const identify = new amplitude.Identify()
identify.set("membership", "paid")
amplitude.getInstance().identify(identify)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
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

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
const identify = new amplitude.Identify()
identify.set("membership", "paid")
amplitude.getInstance().groupIdentify(identify)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
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

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
const revenue = new amplitude.Revenue()
revenue
  .setProductId("productId")
  .setPrice(10)
amplitude.getInstance().logRevenueV2(revenue)
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
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

The configs `config.language`, `config.library`, `config.platform` were available in `amplitude-js` to allow modification of event payloads for these specific fields. Although `@amplitude/analytics-browser@2+` doesn't support these configurations, you can add plugins to the new Browser SDK to enrich event payloads.

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

To install your custom plugin, use `add()` with your custom plugin as a parameter.

```typescript
import * as amplitude from '@amplitude/analytics-browser'

amplitude.add(new LibraryModifierPlugin())
amplitude.init(API_KEY, OPTIONAL_USER_ID)
```

### Defer initialization

To defer initialization in `amplitude-js`, call init with `config.deferInitialization` set to `true`, and eventually call `enableTracking()` to formalize initialization and send all enqueued events.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
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
{{partial:tab name="@amplitude/analytics-browser@2+"}}
Call `init()` at a later time than `track()`. All `track()` calls are processed after initialization completes.

```typescript
amplitude.track("Event 1")
amplitude.track("Event 2")
amplitude.track("Event 3")

amplitude.init(API_KEY, OPTIONAL_USER_ID)
```
{{/partial:tab}}
{{/partial:tabs}}

### Web attribution

In `amplitude-js`, enable web attribution through the following configurations:

* `config.includeGclid`
* `config.includeFbclid`
* `config.includeReferrer`
* `config.includeUtm`

In `@amplitude/analytics-browser@2+`, the single configuration `config.autocapture.attribution` controls the web attribution. This configuration's default setting is `true`, and it captures all campaign parameters. These are the same campaign parameters supported in `amplitude-js`.

### Flush or onExitPage

Sometimes you should send events immediately, like when a user navigates away from a page. This is common when tracking button clicks that direct the user to another page while sending event payload in batches.

In `amplitude-js` do this by using `onExitPage()` callback.

{{partial:tabs tabs="amplitude-js, @amplitude/analytics-browser@2+"}}
{{partial:tab name="amplitude-js"}}
```javascript
amplitude.getInstance().init(API_KEY, OPTIONAL_USER_ID, {
  onExitPage: () => {
    amplitude.sendEvents()
  },
})
```
{{/partial:tab}}
{{partial:tab name="@amplitude/analytics-browser@2+"}}
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

`amplitude-js` passes one `init` callback function for executing any function after initialization and two separate callback functions for success and error network requests. With `@amplitude/analytics-browser@2+` supporting promises (and async/await), the asynchronous methods like `init()`, `track()`, `identify()`, `groupIdentify()` return a custom promise interface.

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
