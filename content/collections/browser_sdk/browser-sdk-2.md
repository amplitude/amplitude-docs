---
id: 00d74a7b-23bd-4a24-86a1-92c046e7e1b5
blueprint: browser_sdk
title: 'Browser SDK 2'
sdk_status: current
article_type: core
supported_languages:
  - js
  - ts
github_link: 'https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser'
releases_url: 'https://github.com/amplitude/Amplitude-TypeScript/releases?q=analytics-browser&expanded=true'
bundle_url: 'https://www.npmjs.com/package/@amplitude/analytics-browser'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/analytics-browser/latest.svg'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1709671897
major_version: 2
ampli_article: 5afa91b7-c12d-425a-b4b6-661061e5843a
---

Write a new intro here.

## Initialize the SDK

{{partial:admonition type="note" title="Sending events"}}
This SDK uses the [Http V2](/api/http-v2) API and follows the same constraints for events. Make sure that all events logged in the SDK have the `event_type` field and at least one of `deviceId`  (included by default) or `userId`, and follow the Http API's constraints on each of those fields.

To prevent instrumentation issues, device IDs and user IDs must be strings with a length of 5 characters or more. If an event contains a device ID or user ID that's too short, the ID value is removed from the event. If the event doesn't have a `userId` or `deviceId` value, Amplitude may reject the upload with a 400 status. Override the default minimum length of 5 characters by setting the `minIdLength` config option.
{{/partial:admonition}}

This SDK requires initialization before you can instrument any events and requires your Amplitude project's API key. You can pass an optional `userID` and `config` object in this call.

```ts
// Option 1, initialize with Amplitude API key only
amplitude.init(AMPLITUDE_API_KEY);

// Option 2, initialize with options
amplitude.init(AMPLITUDE_API_KEY, options);

// Option 3, initialize with user ID if it's already known
amplitude.init(AMPLITUDE_API_KEY, 'user@amplitude.com');

// Option 4, initialize with a user ID and options
amplitude.init(AMPLITUDE_API_KEY, 'user@amplitude.com', options);
```

## Configure the SDK

{{partial:collapse name="SDK configuration options"}}
| Name  | Description | Default Value |
| --- | --- | --- |
|`instanceName`| `string`. The instance name. | `$default_instance` |
|`flushIntervalMillis`| `number`. Sets the interval of uploading events to Amplitude in milliseconds. | 1,000 (1 second) |
|`flushQueueSize`| `number`. Sets the maximum number of events batched in a single upload attempt. | 30 events |
|`flushMaxRetries`| `number`. Sets the maximum number of retries for failed upload attempts. This is only applicable to errors that the SDK can retry. | 5 times.|
|`logLevel` | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level. | `LogLevel.Warn` |
|`loggerProvider `| `Logger`. Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination. | `Amplitude Logger` |
|`minIdLength`|  `number`. Sets the minimum length for the value of `userId` and `deviceId` properties. | `5` |
|`optOut` | `boolean`. Sets permission to track events. Setting a value of `true` prevents Amplitude from tracking and uploading events. | `false` |
|`serverUrl`| `string`. Sets the URL where events are upload to. | `https://api2.amplitude.com/2/httpapi` | 
|`serverZone`| `EU` or  `US`. Sets the Amplitude server zone. Set this to `EU` for Amplitude projects created in `EU` data center. | `US` |
|`useBatch`| `boolean`. Sets whether to upload events to Batch API instead of the default Http V2 API or not. | `false` |
|`appVersion` | `string`. Sets an app version for events tracked. This can be the version of your application. For example: "1.0.0" | `undefined` |
|`defaultTracking` | `boolean | DefaultTrackingOptions`. Configures default event tracking | Check [tracking default events](./#tracking-default-events)|
|`deviceId` | `string`. Sets an identifier for the device running your application. | `UUID()` |
|`cookieOptions.domain` | `string`. Sets the domain property of cookies created. | `undefined` |
|`cookieOptions.expiration` | `number`. Sets expiration of cookies created in days. | 365 days |
|`cookieOptions.sameSite` | `string`. Sets `SameSite` property of cookies created. | `Lax` |
|`cookieOptions.secure` | `boolean`. Sets `Secure` property of cookies created. | `false` |
|`cookieOptions.upgrade` | `boolean`. Sets upgrading from cookies created by [maintenance Browser SDK](../javascript/). If `true`, new Browser SDK deletes cookies created by maintenance Browser SDK. If `false`, Browser SDK keeps cookies created by maintenance Browser SDK. | `true` |
|`identityStorage` | `string`. Sets storage API for user identity. Options include `cookie` for `document.cookie`, `localStorage` for `localStorage`, or `none` to opt-out of persisting user identity. | `cookie` |
|`partnerId` | `string`. Sets partner ID. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`. | `undefined` |
|`sessionTimeout` | `number`. Sets the period of inactivity from the last tracked event before a session expires in milliseconds. | 1,800,000 milliseconds (30 minutes) |
|`storageProvider`| `Storage<Event[]>`. Sets a custom implementation of `Storage<Event[]>` to persist unsent events. | `LocalStorage` |
|`userId` | `number`. Sets an identifier for the tracked user. Must have a minimum length of 5 characters unless overridden with the `minIdLength` option. | `undefined` |
|`trackingOptions` | `TrackingOptions`. Configures tracking of extra properties. | Enable all tracking options by default. |
|`transport` | `string`. Sets request API to use by name. Options include `fetch` for fetch, `xhr` for `XMLHttpRequest`, or  `beacon` for `navigator.sendBeacon`. | `fetch` |
|`offline` | `boolean | OfflineDisabled`. Whether the SDK connects to the network. Learn more [here](./#offline-mode) | `false` |

{{/partial:collapse}}

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. The SDK queues in memory every event the `track` method logs. Customize this behavior with the `flushQueueSize` and `flushIntervalMillis` configuration parameters. If you plan to send large batches of data at once, set `useBatch` to `true` and `setServerUrl` to the batch API: `https://api2.amplitude.com/batch`. Both standard and batch modes use the same event upload threshold and flush time intervals

### EU data residency

To send data to Amplitude's EU-based servers, set the server zone when you initialize the client. If set, the SDK sends to the region determined by this setting.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  serverZone: 'EU',
});
```

{{partial:admonition type="note" title="Data residency"}}
To send data to Amplitude's EU servers, use `https://app.eu.amplitude.com` to create your project, and use the API key from that project.
{{/partial:admonition}}

### Debugging

Control the level of logs the SDK prints to the console with the following `logLevel` settings:

| Log level | Description |
| --------| ------------|
| `none` | Suppresses all log messages |
| `error` | Shows error messages only | 
| `warn` | Default. Shows error and warning messages. |
| `verbose` | Shows informative messages. |
| `debug` | Shows all messages, including function context information for each public method the SDK invokes. Amplitude recommends this log level for development only. |

## Track an event

Events represent how users interact with your application. For example, "Button Clicked" might be an action you want to track.

```ts
// Track a basic event
amplitude.track('Button Clicked');

// Track events with optional properties
const eventProperties = {
  buttonColor: 'primary',
};
amplitude.track('Button Clicked', eventProperties);
```

You can also pass a `BaseEvent` object to `track`. For more information, see the [BaseEvent](https://amplitude.github.io/Amplitude-TypeScript/interfaces/_amplitude_analytics_browser.Types.BaseEvent.html) interface for all available fields.

```ts
const event_properties = {
  buttonColor: 'primary',
};

const event = {
  event_type: "Button Clicked", 
  event_properties,
  groups: { 'role': 'engineering' },
  group_properties: { 'groupPropertyKey': 'groupPropertyValue' }
};

amplitude.track(event);
```

## Track events to multiple projects

By default, Amplitude SDKs send data to one Amplitude project. To send data to more than one project, add an instance of the Amplitude SDK for each project you want to receive data. Then, pass instance variables to wherever you want to call Amplitude. Each instance allows for independent `apiKey`, `userId`, `deviceId`, and `settings` values.

```ts
const defaultInstance = amplitude.createInstance();
defaultInstance.init(API_KEY_DEFAULT);

const envInstance = amplitude.createInstance();
envInstance.init(API_KEY_ENV, {
  instanceName: 'env',
});
```

## Track default events

Starting in SDK version 1.9.1, the Browser SDK tracks default events, and adds a configuration to control the collection of default events. Browser SDK tracks the following default events:

- Attribution
- Page views
- Sessions
- Form interactions
- File downloads

{{partial:collapse name="Default event tracking options"}}
| Name                                      | Value               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------------- | ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.defaultTracking.attribution`      | Optional. `boolean` | Enables/disables marketing attribution tracking. If value is `true`, Amplitude tracks marketing attribution events. Default value is `true`.                                                                                                                                                                                                                                          |
| `config.defaultTracking.pageViews`        | Optional. `boolean` | Enables/disables default page view tracking. If value is `true`, Amplitude tracks page view events on initialization. Default value is `true`.<br /><br />Event properties tracked includes: `[Amplitude] Page Domain`, `[Amplitude] Page Location`, `[Amplitude] Page Path`, `[Amplitude] Page Title`, `[Amplitude] Page URL`<br /><br />See [Tracking page views](#tracking-page-views) for more information. |
| `config.defaultTracking.sessions`         | Optional. `boolean` | Enables/disables session tracking. If value is `true`, Amplitude tracks session start and session end events otherwise, Amplitude doesn't track session events. When this setting is `false`, Amplitude tracks `sessionId` only.<br /><br />See [Tracking sessions](#tracking-sessions) for more information.                                                                                                                                            |
| `config.defaultTracking.formInteractions` | Optional. `boolean` | Enables/disables form interaction tracking. If value is `true`, Amplitude tracks form start and form submit events. Default value is `true`.<br /><br />Event properties tracked includes: `[Amplitude]  Form ID`, `[Amplitude] Form Name`, `[Amplitude] Form Destination`<br /><br />See [Tracking form interactions](#tracking-form-interactions) for more information.                                |
| `config.defaultTracking.fileDownloads`    | Optional. `boolean` | Enables/disables file download tracking. If value is `true`, Amplitude tracks file download events otherwise. Default value is `true`.<br /><br />Event properties tracked includes: `[Amplitude] File Extension`, `[Amplitude] File Name`, `[Amplitude] Link ID`, `[Amplitude] Link Text`, `[Amplitude] Link URL`<br /><br />See [Tracking file downloads](#tracking-file-downloads) for more information.           |

{{/partial:collapse}}

To disable default tracking, see the following code sample. If you do nothing, the SDK tracks all default events.

```ts
// Disable individual default tracked events
amplitude.init(AMPLITUDE_API_KEY, {
  defaultTracking: {
    attribution: false,
    pageViews: false,
    sessions: false,
    formInteractions: false,
    fileDownloads: false,
  },
});

// Disable all default tracked events
amplitude.init(AMPLITUDE_API_KEY, {
  defaultTracking: false,
});
```

### Track marketing attribution

Amplitude tracks marketing attribution by default. Browser SDK 2 captures UTM parameters, referrer information, and click IDs as user properties.

{{partial:collapse name="Attribution overview"}}
Amplitude tracks marketing attribution to identify your user's traffic source using the UTM, referrer and click ID parameters.

#### UTM parameters

UTM (Urchin Traffic Monitor) parameters are useful for analyzing the effectiveness of different ad campaigns and referring sites. UTM parameters are case-sensitive, so they're treated as different values when the capitalization varies.

There are five different standard UTM parameters:

| Name |Description|
|-|-|
|`utm_source`| This identifies which website sent the traffic (for example, Google, Facebook) |
|`utm_medium`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_campaign`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_term`| This identifies paid search terms used (for example, product+analytics) |
|`utm_content` | This identifies what brought the user to the site and is commonly used for A/B testing (for example, "banner-link", "text-link") |

Here is an example URL with UTM parameters:

```curl
https://www.amplitude.com/?utm_source=newsletter&utm_campaign=product_analytics_playbook&utm_medium=email&utm_term=product%20analytics&utm_content=banner-link
```

#### Referrer parameters

Referrer is the URL of the page that linked to the destination page. Amplitude tracks the following parameters:

| Name |Description|
|-|-|
|`referrer`| The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`) |
|`referring_domain`| The domain that the user was last on (for example, `https://amplitude.com`) |

Referrer is an empty string (`''`) if the user navigated to the destination page directly.

#### Click ID parameters

Click IDs are campaign identifiers included as URL query parameters. Ad platforms use these IDs to identify the campaign and other attributes. While Amplitude doesn't have access to further campaign attributes associated to Click IDs, Amplitude can track Click ID values specified in the following table.

| Name |Description|
|-|-|
|`dclid`| Google Click Identifier from URL parameters |
|`fbclid`| Facebook Click Identifier from URL parameters |
|`gbraid`| Google campaign manager Click Identifier |
|`gclid`| Google Click Identifier for iOS device from Web to App |
|`ko_click_id`| Google Click Identifier for iOS device from App to Web |
|`li_fat_id`| Kochava Click Identifier from URL parameters |
|`msclkid`| Microsoft Click Identifier |
|`rtd_cid`| TikTok Click Identifier |
|`ttclid`| Twitter Click Identifier from URL parameter |
|`twclid`| LinkedIn Click identifier |
|`wbraid`| Reddit campaign tracking/attribution Click identifier |

#### First-touch attribution

Amplitude captures the initial attribution data at the start of the first session. The first-touch attribution values are set when Amplitude sees a user's attribution data for the first time. The following user properties are set one time:

- `initial_utm_source`
- `initial_utm_medium`
- `initial_utm_campaign`
- `initial_utm_term`
- `initial_utm_content`
- `initial_referrer`
- `initial_referring_domain`
- `initial_gclid`
- `initial_fbclid`
- `initial_dclid`
- `initial_gbraid`
- `initial_ko_click_id`
- `initial_msclkid`
- `initial_ttclid`
- `initial_twclid`
- `initial_wbraid`
- `initial_li_fat_id`
- `initial_rdt_cid`

#### Multi-touch attribution

Amplitude captures the attribution data at the start of each session, and sets those values as user properties. For organic or direct traffic, these properties may not be available. Therefore, these user properties are unset from user identity.

For every new campaign, Amplitude captures the changes regardless of the state of the user session. You can configure `resetSessionOnNewCampaign` to `true` to reset the session on every new campaign. The default behavior is to not reset the session on new campaign.

Amplitude tracks the following as user properties:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer`
- `referring_domain`
- `gclid`
- `fbclid`
- `dclid`
- `gbraid`
- `ko_click_id`
- `msclkid`
- `ttclid`
- `twclid`
- `wbraid`
- `li_fat_id`
- `rdt_cid`
{{/partial:collapse}}

Set `config.defaultTracking.attribution` to `false` to disable marketing attribution tracking.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  defaultTracking: {
    attribution: false,
  },
});
```

#### Advanced configuration for marketing attribution tracking

{{partial:collapse name="Marketing attribution configuration"}}
|Name|Value|Description|
|-|-|-|
`config.defaultTracking.attribution.excludeReferrers` | Optional. Array of `string` or `RegExp` | Sets rules to decide which referrers to exclude from tracking as traffic source. Use string values for exact matching and RegExp values for pattern matching against the referring domain. When this option isn't set, the SDK excludes the current domain (and its subdomains). If explicitly adding an external referrer to exclude, you must also add the current domain (and its subdomains) as more referrers to exclude. |
`config.defaultTracking.attribution.initialEmptyValue` | Optional. `string` | Sets the value to represent undefined/no initial campaign parameter for first-touch attribution. The default value is `"EMPTY`. |
`config.defaultTracking.attribution.resetSessionOnNewCampaign` | Optional. `boolean` | Configures Amplitude to start a new session if any campaign parameter changes. The default value is `false`. |

{{/partial:collapse}}

### Track page views

Amplitude tracks page view events by default. The default behavior sends a page view event on initialization. The event type for this event is `[Amplitude] Page Viewed`.

Set `config.defaultTracking.pageViews` to `false` to disable page view tracking.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  defaultTracking: {
    pageViews: false,
  },
});
```

#### Advanced configuration for tracking page views

Use the advanced configuration to better control when the SDK sends page view events.

{{partial:collapse name="Tracking page views options"}}
| Name | Value | Description |
| --- | --- | --- |
| `config.defaultTracking.pageViews.trackOn` | Optional. `"attribution"` or `() => boolean` | Provides advanced control for when the SDK tracks page view events. Omit or set the value to `undefined`, and configure the SDK to track page view events to on initialization. Set the value to `"attribution"` and configure the SDK to track page view events to only when it tracks web attribution. Set the value to a function that returns a boolean (`true` or `false`) and configure the SDK to track page view events to based on your criteria. |
| `config.defaultTracking.pageViews.trackHistoryChanges` | Optional. `"pathOnly"` or `"all"` | Provides advanced control for single page application for when the SDK tracks page views. Omit or set the value to `"all"`, and configure the SDK to track page view events on any navigation change to the URL within your single page application. For example: navigating from `https://amplitude.com/#company` to `https://amplitude.com/#blog`. Set the value to `pathOnly`, and configure the SDK to track page view events on navigation change to the URL path only within your single page application. For example: navigating from `https://amplitude.com/company` to `https://amplitude.com/blog`. |
| `config.defaultTracking.pageViews.eventType` | Optional. `string` | Customize the event\_type for page view event. |

{{/partial:collapse}}

For example, you can configure Amplitude to track page views only when the URL path contains a certain substring, letâs say âhomeâ. Refer to the code sample for how to achieve this.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    pageViews: {
      trackOn: () => {
        return window.location.pathname.includes('home');
      },
    },
  },
});
```

Browser SDK tracks the following information in page view events.

| Name | Description | Default Value |
| --- | --- | --- |
| `event_type` | `string`. The event type for page view event. Configurable through `defaultTracking.pageViews.eventType` or enrichment plugin. | `[Amplitude] Page Viewed` from version 1.9.1. |
| `event_properties.[Amplitude] Page Domain` | `string`. The page domain. | location.hostname or ''. |
| `event_properties.[Amplitude] Page Location` | `string`. The page location. | location.href or ''. |
| `event_properties.[Amplitude] Page Path` | `string`. The page path. | location.path or ''. |
| `event_properties.[Amplitude] Page Title` | `string`. The page title. | document.title or ''. |
| `event_properties.[Amplitude] Page URL` | `string`. The value of page URL. | location.href.split('?')[0] or ``. |
| `event_properties.${CampaignParam}` | `string`. The value of `UTMParameters` `ReferrerParameters` `ClickIdParameters` if has any. Check [here](./#web-attribution) for the possible keys. | Any undefined `campaignParam` or `undefined`. |

See [this example](https://github.com/amplitude/Amplitude-TypeScript/blob/main/examples/plugins/page-view-tracking-enrichment/index.ts) to understand how to enrich default page view events, such as adding more properties along with page view tracking.

### Track sessions

Amplitude tracks session events by default. A session is the period of time a user has your website open. See [How Amplitude defines sessions](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions-in-Amplitude#how-amplitude-defines-sessions) for more information. When a new session starts, Amplitude tracks a session start event and is the first event of the session. The event type for session start is `[Amplitude] Start Session`. When an existing session ends, Amplitude tracks a session end event, which is the last event of the session. The event type for session end is `[Amplitude] End Session`.

You can opt out of tracking session events by setting `config.defaultTracking.sessions` to `false`. Refer to the code sample below.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  defaultTracking: {
    sessions: false,
  },
});
```

### Track form interactions

Amplitude tracks form interaction events by default. The SDK tracks `[Amplitude] Form Started` when the user initially interacts with the form element. An initial interaction can be the first change to a text input, radio button, or dropdown. The SDK tracks a `[Amplitude] Form Submitted` when the user submits the form. If a user submits a form with no initial change to any form fields, Amplitude tracks both `[Amplitude] Form Started` and `[Amplitude] Form Submitted` events.

Amplitude can track forms constructed with `<form>` tags and `<input>` tags nested. For example:

```html
<form id="subscriber-form" name="subscriber-form" action="/subscribe">
  <input type="text" />
  <input type="submit" />
</form>
```

Set `config.defaultTracking.formInteractions` to `false` to disable form interaction tracking

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  defaultTracking: {
    formInteractions: false,
  },
});
```

### Track file downloads

Amplitude tracks file download events by default. The SDK tracks `[Amplitude] File Downloaded` when the user clicks an anchor or `<a>` tag linked to a file. Amplitude determines that the anchor or `<a>` tag linked to a file if the file extension matches the following regex:

`pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma`

Set `config.defaultTracking.fileDownloads` to `false` to disable file download tracking.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  defaultTracking: {
    fileDownloads: false,
  },
});
```

## User properties

