---
id: eb4533a3-2075-49a0-83fa-e703afea78e7
blueprint: browser_sdk
title: 'Migrate from Marketing Analytics to Browser SDK 2.0'
sdk_status: maintenance
article_type: migration
supported_languages:
  - js
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1714515060
exclude_from_sitemap: false
parent: 25904c6b-609d-4365-9660-2782ef50d52d
source: https://www.docs.developers.amplitude.com/data/sdks/marketing-analytics-browser/migration/
---

Amplitude Browser SDK 2.0 (`@amplitude/analytics-browser`) features default event tracking, improved marketing attribution tracking, simplified interface and a lighter weight package.

Browser SDK 2.0 is compatible with [Amplitude Session Replay](/docs/session-replay).

## Terminology

* `@amplitude/marketing-analytics-browser@1`: Marketing Analytics Browser SDK
* `@amplitude/analytics-browser@2`:  Browser SDK 2.0

## Dependency

For snippet installation, update your project's [snippet loader](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser#using-script-loader).

For Node projects, update your dependency list in package.json.

```json
{
  "dependencies": {
     "@amplitude/marketing-analytics-browser": "^1", //[tl! --]
     "@amplitude/analytics-browser": "^2", //[tl! ]
  }
}
```

## Default event tracking

Starting with Browser SDK 2.0, default tracking is enabled by default. Default tracking is implicit tracking performed by Amplitude on your behalf, and includes page views, sessions, file downloads, form interactions, and marketing attribution.

To opt out of default tracking, set `options.defaultTracking` to `false`.

```ts
amplitude.init(API_KEY, undefined, {
  defaultTracking: false,
});
```

Additionally, you can pick and choose which events you want tracked by Amplitude. For example, if you only want default tracking for marketing attribution and page views, you can use the code below.

```ts
amplitude.init(API_KEY, undefined, {
  defaultTracking: {
    attribution: true,
    pageViews: true,
    sessions: false,
    fileDownload: false,
    formInteractions: false,
  },
});
```

## Marketing attribution tracking

Starting with Browser SDK 2.0, Amplitude consolidates Browser SDK and Marketing Analytics SDK to provide a single solution for both product and marketing analytics use case.

Marketing attribution tracking excludes all subdomains of the same root domain as referrer. This means traffic from one subdomain to another (ie analytics.amplitude.com to experiment.amplitude.com) are not tracked with no additional configuration.

Marketing Analytics Browser SDK by default, allows other subdomains to be tracked as referrer. If this is behavior is desired, refer to the code below.

```js
amplitude.init(API_KEY, undefined, {
  defaultTracking: { //[tl! ++:5]
    attribution: {
      excludeReferrers: [location.hostname]
    },
  },
});
```

### Moved options.attribution to options.defaultTracking.attribution

This consolidates attribution options together with other default tracking options.

```js
amplitude.init(API_KEY, undefined, {
  attribution: { //[tl! --:1]
    excludeReferrers: [location.hostname]
  defaultTracking: { //[tl! ++:3]
    attribution: {
      excludeReferrers: [location.hostname]
    },
  },
});
```

### Disabling marketing attribution tracking

This provides a simpler and consistent interface to opt out of marketing attribution tracking.

```js
amplitude.init(API_KEY, undefined, {
attribution: { //[tl! --:1]
    disabled: true
  defaultTracking: { //[tl! ++:1]
    attribution: false, 
  },
});
```

## Page view tracking

The following page view tracking options are changed.

### Moved options.pageViewTracking to options.defaultTracking.pageViews

```js
  amplitude.init(API_KEY, undefined, {
   pageViewTracking: { //[tl! --:3]
     trackOn: 'attribution',
     trackHistoryChanges: 'pathOnly', 
     eventType: 'Page View',
   defaultTracking: { //[tl! ++:4]
     pageViews: {
       trackOn: 'attribution',
       trackHistoryChanges: 'pathOnly',
       eventType:'Page View',
   }
    },
  });
```

### Disable page view tracking

This provides a simpler and consistent interface to opt out of page view tracking.

```js
  amplitude.init(API_KEY, undefined, {
   pageViewTracking: false, //[tl! --]
   defaultTracking: { //[tl! --:1]
     pageViews: false,
    },
  });
```

### Updates to page view tracking

* The event type of page view has been changed from `Page View` to `[Amplitude] Page Viewed`.
* The event properties name also be updated. Check [here](/docs/sdks/analytics/browser/browser-sdk-2#track-default-events) for more info.

| property           | Browser SDK 2.0           | Marketing Analytics Browser SDK |
| ------------------ | ------------------------- | ------------------------------- |
| `Event Type`       | `[Amplitude] Page Viewed` | `Page View`                     |
| `Event Properties` | `page_domain`             | `[Amplitude] Page Domain`       |
|                    | `page_location`           | `[Amplitude] Page Location`     |
|                    | `page_path`               | `[Amplitude] Page Path`         |
|                    | `page_title`              | `[Amplitude] Page Title`        |
|                    | `page_url`                | `[Amplitude] Page URL`          |

## Cookie options

Starting Browser SDK 2.0, Amplitude has simplified the options to manage the use of cookies. By default, user identity is stored on browser cookies.

### Using an alternative storage API

```ts
amplitude.init(API_KEY, undefined, {
  disableCookies: true,                  //[tl! --]
  identityStorage: 'localStorage',       //[tl! ++]
});
```

### Disabling user identity persistence

```ts
import { MemoryStorage } from '@amplitude/analytics-core'; //[tl! --]

amplitude.init(API_KEY, undefined, {
  cookieStorageProvider: new MemoryStorage(),           //[tl! --]
  identityStorage: 'none',                              //[tl! ++]
});
```

### Configuring cookie options

The options to manage cookie usage are now nested under `options.cookieOptions` for a more discoverable interface.

```ts
amplitude.init(API_KEY, undefined, {
  cookieExpiration: 365, //[tl! --:4]
  cookieSameSite: 'Lax',
  cookieSecure: false,
  cookieUpgrade: true,
  domain: '',
  cookieOptions: {    //[tl! ++:5]
    expiration: 365,
    sameSite: 'Lax',
    secure: false,
    upgrade: true,
    domain: '',
  },
});
```

## Deprecates user agent client-side parsing

Starting Browser SDK 2.0, Amplitude replaced enrichment of user properties relating to user agent from client-side to server-side. The enriched user properties include `os_name`, `os_version`, `device_model`, `device_manufacturer`. While the new enrichment strategy yields more accurate results, it also yields slightly different results than Browser SDK 1.0 and may impact your existing analytics charts that query these properties. To prevent this breaking change from impacting you, install [@amplitude/plugin-user-agent-enrichment-browser](https://www.npmjs.com/package/@amplitude/plugin-user-agent-enrichment-browser) to configure Amplitude to enrich these user properties on the client-side and yield enrichment results similar to Browser SDK 1.0. See [NPM](https://www.npmjs.com/package/@amplitude/plugin-user-agent-enrichment-browser) for more details.

## No enums

Amplitude no longer requires the use of enums specifically `TransportType`, `ServerZone` and `PluginType`, and accepts its literal values.

Setting transport provider on initialization

```ts
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init(API_KEY, USER_ID, {
  transport: amplitude.Types.TransportType.Fetch,     //[tl! --]
  transport: 'fetch',                                 //[tl! ++]
});
```

Setting transport provider using setTransport()

```ts
import * as amplitude from '@amplitude/analytics-browser';

amplitude.setTransport(amplitude.Types.TransportProvider.Fetch); //[tl! --]
amplitude.setTransport('fetch');                                 //[tl! ++]
```

Setting server zone on initialization

```ts
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init(API_KEY, USER_ID, {
  serverZone: amplitude.Types.ServerZone.US, //[tl! --]
  serverZone: 'US',                         //[tl! ++]
});
```

## Simplified plugin interface

Amplitude has made it easier to create your own plugins, requiring less properties for faster authoring.

### plugin.name [optional]

The name field is an optional property that allows you to reference the plugin for deletion purposes. If not provided, Amplitude will assign a random name when the plugin is added. If you do not plan to delete your plugin, you can skip assigning a name.

### plugin.type [optional]

The type field is an optional property that defines the type of plugin you are creating. Refer to `execute()` function below to distinguish the two types. If not defined, the plugin defaults to an enrichment type.

### plugin.setup() [optional]

The setup function is an optional method and is called when the plugin is added or on first init whichever happens later. This function accepts two parameters: 

1. Amplitude configuration
2. Amplitude instance
  
This is useful for setup operations and tasks that depend on either the Amplitude configuration or instance. Examples include assigning baseline values to variables, setting up event listeners, and many more.

### plugin.execute() [optional for type: enrichment]

For enrichment plugins, execute function is an optional method and is called on each event. This function must return a new event, otherwise, the passed event is dropped from the queue. This is useful for cases where you need to add/remove properties from events, filter events, or perform any operation for each event tracked.

For destination plugins, execute function is a required method and is called on each event. This function must return a response object with keys: `event` (BaseEvent), `code` (number), and `message` (string). This is useful for sending events for third-party endpoints.

### plugin.teardown() [optional]

The teardown function is an optional method and is called when Amplitude re-initializes. This is useful for resetting unneeded persistent state created/set by setup or execute methods. Examples include removing event listeners, mutation observers, etc.

## Web attribution v2 vs web attribution  v1

| Web Attribution V2 | Web Attribution V1 |
| --- | --- |
| <ul><li>Enabled by default.</li> <li>Tracks attribution on init with a new campaign regardless of session context (new or existing). Not configurable.</li> <li>Default value for all initial touch attribution properties is `"EMPTY"`. Configurable with `config.initialEmptyValue`. Value is configurable.</li> <li>Does not start a new session on new campaign. Configurable with `config.resetSessionOnNewCampaign = true`.</li><li>Tracks ad click IDs.</li></ul> | <ul><li>Enabled by default.</li> <li>Tracks attribution on init with a new session. Not configurable.</li> <li>Does not track attribution on init with a new campaign. Configurable with `config.trackNewCampaigns`.</li> <li>Default value for all initial touch attribution properties is `"EMPTY"`. Configurable with `config.initialEmptyValue`.</li> <li>Does not start a new session on new campaign. Configurable with `config.resetOnNewCampaign`.</li><li>Tracks ad click IDs.</li> |

