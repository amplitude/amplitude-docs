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
updated_at: 1722891854
major_version: 2
ampli_article: 5afa91b7-c12d-425a-b4b6-661061e5843a
exclude_from_sitemap: false
source: 'https://www.docs.developers.amplitude.com/data/sdks/browser-2/'
package_name: '@amplitude/analytics-browser'
platform: Browser
migration_guide:
  - 9b155be9-bb32-428c-9f49-6e00f9630547
---
Amplitude's Browser SDK 2 lets you send events to Amplitude.

## Install the SDK

Install the dependency with npm, yarn, or the script loader.

{{partial:tabs tabs="Script loader, npm, yarn"}}
{{partial:tab name="Script loader"}}
When you use the script loader and enable Autocapture, Browser SDK track interactions on your site automatically. For more information, see [Autocapture](#autocapture).
{{partial:partials/code/snippet autocapture="true"}}
{{/partial:tab}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/analytics-browser
```
Import Amplitude into your project
```js
import * as amplitude from '@amplitude/analytics-browser';
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/analytics-browser
```
Import Amplitude into your project
```js
import * as amplitude from '@amplitude/analytics-browser';
```
{{/partial:tab}}
{{/partial:tabs}}


## Initialize the SDK

{{partial:admonition type="note" heading="Sending events"}}
This SDK uses the [HTTP V2](/docs/apis/analytics/http-v2) API and follows the same constraints for events. Make sure that all events logged in the SDK have the `event_type` field and at least one of `deviceId`  (included by default) or `userId`, and follow the HTTP API's constraints on each of those fields.

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
| Name                       | Description                                                                                                                                                                                                                                                                        | Default Value                                     |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| `instanceName`             | `string`. The instance name.                                                                                                                                                                                                                                                       | `$default_instance`                               |
| `flushIntervalMillis`      | `number`. Sets the interval of uploading events to Amplitude in milliseconds.                                                                                                                                                                                                      | 1,000 (1 second)                                  |
| `flushQueueSize`           | `number`. Sets the maximum number of events batched in a single upload attempt.                                                                                                                                                                                                    | 30 events                                         |
| `flushMaxRetries`          | `number`. Sets the maximum number of retries for failed upload attempts. This is only applicable to errors that the SDK can retry.                                                                                                                                                 | 5 times.                                          |
| `logLevel`                 | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level.                                                                                                                                                              | `LogLevel.Warn`                                   |
| `loggerProvider `          | `Logger`. Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination.                                                                                                                                                                        | `Amplitude Logger`                                |
| `minIdLength`              | `number`. Sets the minimum length for the value of `userId` and `deviceId` properties.                                                                                                                                                                                             | `5`                                               |
| `optOut`                   | `boolean`. Sets permission to track events. Setting a value of `true` prevents Amplitude from tracking and uploading events.                                                                                                                                                       | `false`                                           |
| `serverUrl`                | `string`. Sets the URL where events are upload to.                                                                                                                                                                                                                                 | `https://api2.amplitude.com/2/httpapi`            |
| `serverZone`               | `EU` or  `US`. Sets the Amplitude server zone. Set this to `EU` for Amplitude projects created in `EU` data center.                                                                                                                                                                | `US`                                              |
| `useBatch`                 | `boolean`. Sets whether to upload events to Batch API instead of the default HTTP V2 API or not.                                                                                                                                                                                   | `false`                                           |
| `appVersion`               | `string`. Sets an app version for events tracked. This can be the version of your application. For example: "1.0.0"                                                                                                                                                                | `undefined`                                       |
| `autocapture`              | `boolean\|AutocaptureOptions`. Configures autocapture tracking. See [Autocapture](#autocapture).                                                                                                                                                                                    |  |
| `autocapture`          | `boolean`. Deprecated. Use `autocapture` instead. Configures default event tracking.                                                                                                                                                                                  |  `true` |
| `deviceId`                 | `string`. Sets an identifier for the device running your application.                                                                                                                                                                                                              | `UUID()`                                          |
| `cookieOptions.domain`     | `string`. Sets the domain property of cookies created.                                                                                                                                                                                                                             | `undefined`                                       |
| `cookieOptions.expiration` | `number`. Sets expiration of cookies created in days.                                                                                                                                                                                                                              | 365 days                                          |
| `cookieOptions.sameSite`   | `string`. Sets `SameSite` property of cookies created.                                                                                                                                                                                                                             | `Lax`                                             |
| `cookieOptions.secure`     | `boolean`. Sets `Secure` property of cookies created.                                                                                                                                                                                                                              | `false`                                           |
| `cookieOptions.upgrade`    | `boolean`. Sets upgrading from cookies created by [maintenance Browser SDK](/docs/sdks/analytics/browser/javascript-sdk). If `true`, new Browser SDK deletes cookies created by maintenance Browser SDK. If `false`, Browser SDK keeps cookies created by maintenance Browser SDK. | `true`                                            |
| `identityStorage`          | `string`. Sets storage API for user identity. Options include `cookie` for `document.cookie`, `localStorage` for `localStorage`, or `none` to opt-out of persisting user identity.                                                                                                 | `cookie`                                          |
| `partnerId`                | `string`. Sets partner ID. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`.                                                                                                                                 | `undefined`                                       |
| `sessionTimeout`           | `number`. Sets the period of inactivity from the last tracked event before a session expires in milliseconds.                                                                                                                                                                      | 1,800,000 milliseconds (30 minutes)               |
| `storageProvider`          | `Storage<Event[]>`. Sets a custom implementation of `Storage<Event[]>` to persist unsent events.                                                                                                                                                                                   | `LocalStorage`                                    |
| `userId`                   | `number`. Sets an identifier for the tracked user. Must have a minimum length of 5 characters unless overridden with the `minIdLength` option.                                                                                                                                     | `undefined`                                       |
| `trackingOptions`          | `TrackingOptions`. Configures tracking of extra properties.                                                                                                                                                                                                                        | Enable all tracking options by default.           |
| `transport`                | `string`. Sets request API to use by name. Options include `fetch` for fetch, `xhr` for `XMLHTTPRequest`, or  `beacon` for `navigator.sendBeacon`.                                                                                                                                 | `fetch`                                           |
| `offline`                  | `boolean`. Whether the SDK connects to the network. See [Offline mode](#offline-mode)                                                                                                                                                                                            | `false`                                           |
| `fetchRemoteConfig`        | `boolean`. Whether the SDK fetches remote configuration. See [Remote configurations](#remote-configuration)                                                                                                                                                                                    | `false`                                           |

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

{{partial:admonition type="note" heading="Data residency"}}
To send data to Amplitude's EU servers, use `https://app.eu.amplitude.com` to create your project, and use the API key from that project.
{{/partial:admonition}}

### Debugging

Control the level of logs the SDK prints to the console with the following `logLevel` settings:

| Log level | Description                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `none`    | Suppresses all log messages                                                                                                                                  |
| `error`   | Shows error messages only                                                                                                                                    |
| `warn`    | Default. Shows error and warning messages.                                                                                                                   |
| `verbose` | Shows informative messages.                                                                                                                                  |
| `debug`   | Shows all messages, including function context information for each public method the SDK invokes. Amplitude recommends this log level for development only. |

## Autocapture

Starting in SDK version 2.10.0, the Browser SDK can autocapture events when you enable it, and adds a configuration to control the collection of autocaptured events. Browser SDK can autocapture the following event types:

- Attribution
- Page views
- Sessions
- Form interactions
- File downloads
- Element interactions

{{partial:collapse name="Autocapture options"}}
| Name                                      | Value               | Description                                                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.autocapture.attribution`      | Optional. `boolean` | Enables/disables marketing attribution tracking. If `true`, Amplitude tracks marketing attribution events. Default value is `true`.                                                                                                                                                                                                                                                                    |
| `config.autocapture.pageViews`        | Optional. `boolean` | Enables/disables default page view tracking. If `true`, Amplitude tracks page view events on initialization. Default value is `true`.<br /><br />Event properties tracked includes: `[Amplitude] Page Domain`, `[Amplitude] Page Location`, `[Amplitude] Page Path`, `[Amplitude] Page Title`, `[Amplitude] Page URL`. <br /><br />See [Track page views](#track-page-views) for more information. |
| `config.autocapture.sessions`         | Optional. `boolean` | Enables/disables session tracking. If `true`, Amplitude tracks session start and session end events otherwise, Amplitude doesn't track session events. When this setting is `false`, Amplitude tracks `sessionId` only.<br /><br />See [Track sessions](#track-sessions) for more information.                                                                                                   |
| `config.autocapture.formInteractions` | Optional. `boolean` | Enables/disables form interaction tracking. If `true`, Amplitude tracks form start and form submit events. Default value is `true`.<br /><br />Event properties tracked includes: `[Amplitude]  Form ID`, `[Amplitude] Form Name`, `[Amplitude] Form Destination`.<br /><br />See [Track form interactions](#track-form-interactions) for more information.                                       |
| `config.autocapture.fileDownloads`    | Optional. `boolean` | Enables/disables file download tracking. If `true`, Amplitude tracks file download events otherwise. Default value is `true`.<br /><br />Event properties tracked includes: `[Amplitude] File Extension`, `[Amplitude] File Name`, `[Amplitude] Link ID`, `[Amplitude] Link Text`, `[Amplitude] Link URL`.<br /><br />See [Track file downloads](#track-file-downloads) for more information.     |
| `config.autocapture.elementInteractions` | Optional. `boolean` | Enables/disables element interaction tracking. If `true`, Amplitude tracks interactions with all elements on the page.<br /><br />See [Track element interactions](#track-element-interactions) for more information and configuration options.  |

{{/partial:collapse}}

### Disable Autocapture

To disable Autocapture, see the following code sample.

```ts
// Disable individual default tracked events
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: {
    attribution: false,
    pageViews: false,
    sessions: false,
    formInteractions: false,
    fileDownloads: false,
    elementInteractions: false,
  },
});

// Disable all default tracked events
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: false,
});
```

### Track marketing attribution

Amplitude tracks marketing attribution by default. Browser SDK 2 captures UTM parameters, referrer information, and click IDs as user properties.

{{partial:collapse name="Attribution overview"}}
Amplitude tracks marketing attribution to identify your user's traffic source using the UTM, referrer and click ID parameters.

#### UTM parameters

UTM (Urchin Traffic Monitor) parameters are useful for analyzing the effectiveness of different ad campaigns and referring sites. UTM parameters are case-sensitive, so they're treated as different values when the capitalization varies.

There are five different standard UTM parameters:

| Name           | Description                                                                                                                      |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `utm_source`   | This identifies which website sent the traffic (for example, Google, Facebook)                                                   |
| `utm_medium`   | This identifies a specific campaign used (for example, "summer_sale")                                                            |
| `utm_campaign` | This identifies a specific campaign used (for example, "summer_sale")                                                            |
| `utm_term`     | This identifies paid search terms used (for example, product+analytics)                                                          |
| `utm_content`  | This identifies what brought the user to the site and is commonly used for A/B testing (for example, "banner-link", "text-link") |

Here is an example URL with UTM parameters:

```curl
https://www.amplitude.com/?utm_source=newsletter&utm_campaign=product_analytics_playbook&utm_medium=email&utm_term=product%20analytics&utm_content=banner-link
```

#### Referrer parameters

Referrer is the URL of the page that linked to the destination page. Amplitude tracks the following parameters:

| Name               | Description                                                                                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `referrer`         | The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`) |
| `referring_domain` | The domain that the user was last on (for example, `https://amplitude.com`)                                |

Referrer is an empty string (`''`) if the user navigated to the destination page directly.

#### Click ID parameters

Click IDs are campaign identifiers included as URL query parameters. Ad platforms use these IDs to identify the campaign and other attributes. While Amplitude doesn't have access to further campaign attributes associated to Click IDs, Amplitude can track Click ID values specified in the following table.

| Name          | Description                                                |
| ------------- | ---------------------------------------------------------- |
| `dclid`       | Google Marketing Platform click identifier                 |
| `fbclid`      | Facebook click identifier                                  |
| `gbraid`      | Google click identifdier on iOS for web-to-app measurement |
| `wbraid`      | Google click identidier on iOS for app-to-web measurement  |
| `gclid`       | Google click identifier                                    |
| `ko_click_id` | Kochava click identifier                                   |
| `li_fat_id`   | LinkedIn click identifier                                  |
| `msclkid`     | Microsoft click identifier                                 |
| `rtd_cid`     | Reddit click identifier                                    |
| `ttclid`      | TikTok click identidier                                    |
| `twclid`      | Twitter click identifier                                   |



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

Set `config.autocapture.attribution` to `false` to disable marketing attribution tracking.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: {
    attribution: false, //[tl! highlight]
  },
});
```

#### Advanced configuration for marketing attribution tracking

{{partial:collapse name="Marketing attribution configuration"}}
| Name                                                           | Value                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `config.autocapture.attribution.excludeReferrers`          | Optional. Array of `string` or `RegExp` | Sets rules to decide which referrers to exclude from tracking as traffic source. Use string values for exact matching and RegExp values for pattern matching against the referring domain. When this option isn't set, the SDK excludes the current domain (and its subdomains). If explicitly adding an external referrer to exclude, you must also add the current domain (and its subdomains) as more referrers to exclude. |
| `config.autocapture.attribution.initialEmptyValue`         | Optional. `string`                      | Sets the value to represent undefined/no initial campaign parameter for first-touch attribution. The default value is `"EMPTY`.                                                                                                                                                                                                                                                                                                |
| `config.autocapture.attribution.resetSessionOnNewCampaign` | Optional. `boolean`                     | Configures Amplitude to start a new session if any campaign parameter changes. The default value is `false`.                                                                                                                                                                                                                                                                                                                   |

{{/partial:collapse}}

##### Exclude referrers

{{partial:admonition type="note" heading=""}}
All sub-configurations of `config.autocapture.attribution` take effect only on user properties and do **NOT** affect the event properties of the default page view events. 
{{/partial:admonition}}

The default value of `config.autocapture.attribution.excludeReferrers` is the top level domain with cookie storage enabled. For example, if you initialize the SDK on `https://www.docs.developers.amplitude.com/`, the SDK first checks `amplitude.com`. If it doesn't allow cookie storage, then the SDK checks `developers.amplitude.com` and subsequent subdomains. If it allows cookie storage, then the SDK sets `excludeReferrers` to an RegExp object `/amplitude\.com$/` which matches and then exlucdes tracking referrers from all subdomains of `amplitude.com`, for example, `data.amplitude.com`, `analytics.amplitude.com` and etc. 

In addition to excluding referrers from the default configuration, you can add other domains by setting the custom `excludeReferrers`. Custom `excludeReferrers` overrides the default values. For example, to also exclude referrers from `google.com`, set `excludeReferrers` to `[/amplitude\.com$/, 'google.com']`.

{{partial:collapse name="Example of including all referrers"}}
Track complete web attribution, including self-referrals, for comprehensive insight.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: {
    attribution: {
      // Override the default setting to exclude all subdomains
      excludeReferrers: [],
    },
  },
});
```
{{/partial:collapse}}

{{partial:collapse name="Example of excluding all self-referrals and other subdomains"}}
For customers who want to exclude tracking campaign from any referrers across all subdomains of `your-domain.com`, as well as from a specific subdomain.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
    autocapture: {
    attribution: {
      excludeReferrers: [/your-domain\.com$/, 'www.test.com'],
    },
  },
});
```
{{/partial:collapse}}

{{partial:collapse name="Exclude referrers that match a specific pattern"}}
For customers who want to exclude tracking campaign from all referrers across all subdomains of `test.com`.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: {
    attribution: {
      excludeReferrers: [/test\.com$/],
    },
  },
});
```
{{/partial:collapse}}

### Track page views

Amplitude tracks page view events by default. The default behavior sends a page view event on initialization. The event type for this event is `[Amplitude] Page Viewed`.

Set `config.autocapture.pageViews` to `false` to disable page view tracking.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: {
    pageViews: false, //[tl! highlight]
  },
});
```

#### Advanced configuration for tracking page views

Use the advanced configuration to better control when the SDK sends page view events.

{{partial:collapse name="Tracking page views options"}}
| Name                                                   | Value                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.autocapture.pageViews.trackOn`             | Optional. `"attribution"` or `() => boolean` | Provides advanced control for when the SDK tracks page view events. Omit or set the value to `undefined`, and configure the SDK to track page view events to on initialization. Set the value to `"attribution"` and configure the SDK to track page view events to only when it tracks web attribution. Set the value to a function that returns a boolean (`true` or `false`) and configure the SDK to track page view events to based on your criteria.                                                                                                                                                     |
| `config.autocapture.pageViews.trackHistoryChanges` | Optional. `"pathOnly"` or `"all"`            | Provides advanced control for single page application for when the SDK tracks page views. Omit or set the value to `"all"`, and configure the SDK to track page view events on any navigation change to the URL within your single page application. For example: navigating from `https://amplitude.com/#company` to `https://amplitude.com/#blog`. Set the value to `pathOnly`, and configure the SDK to track page view events on navigation change to the URL path only within your single page application. For example: navigating from `https://amplitude.com/company` to `https://amplitude.com/blog`. |
| `config.autocapture.pageViews.eventType`           | Optional. `string`                           | Customize the event\_type for page view event.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

{{/partial:collapse}}

For example, you can configure Amplitude to track page views only when the URL path contains a certain substring.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  autocapture: {
    pageViews: { //[tl! highlight:2]
      trackOn: () => {
        return window.location.pathname.includes('home');
      },
    },
  },
});
```

Browser SDK tracks the following information in page view events.

| Name                                         | Description                                                                                                                                         | Default Value                                 |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `event_type`                                 | `string`. The event type for page view event. Configurable through `autocapture.pageViews.eventType` or enrichment plugin.                      | `[Amplitude] Page Viewed` from version 1.9.1. |
| `event_properties.[Amplitude] Page Domain`   | `string`. The page domain.                                                                                                                          | location.hostname or ''.                      |
| `event_properties.[Amplitude] Page Location` | `string`. The page location.                                                                                                                        | location.href or ''.                          |
| `event_properties.[Amplitude] Page Path`     | `string`. The page path.                                                                                                                            | location.path or ''.                          |
| `event_properties.[Amplitude] Page Title`    | `string`. The page title.                                                                                                                           | document.title or ''.                         |
| `event_properties.[Amplitude] Page URL`      | `string`. The value of page URL.                                                                                                                    | location.href.split('?')[0] or ``.            |
| `event_properties.${CampaignParam}`          | `string`. The value of `UTMParameters` `ReferrerParameters` `ClickIdParameters` if has any. Check [here](./#web-attribution) for the possible keys. | Any undefined `campaignParam` or `undefined`. |

See [this example](https://github.com/amplitude/Amplitude-TypeScript/blob/main/examples/plugins/page-view-tracking-enrichment/index.ts) to understand how to enrich default page view events, such as adding more properties along with page view tracking.

### Track sessions

Amplitude tracks session events by default. A session is the period of time a user has your website open. See [How Amplitude defines sessions](https://help.amplitude.com/hc/en-us/articles/115002323627-Track-sessions-in-Amplitude#how-amplitude-defines-sessions) for more information. When a new session starts, Amplitude tracks a session start event and is the first event of the session. The event type for session start is `[Amplitude] Start Session`. When an existing session ends, Amplitude tracks a session end event, which is the last event of the session. The event type for session end is `[Amplitude] End Session`.

You can opt out of tracking session events by setting `config.autocapture.sessions` to `false`. Refer to the code sample below.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: {
    sessions: false, //[tl! highlight]
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

Set `config.autocapture.formInteractions` to `false` to disable form interaction tracking

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: {
    formInteractions: false, //[tl! highlight]
  },
});
```

### Track file downloads

Amplitude tracks file download events by default. The SDK tracks `[Amplitude] File Downloaded` when the user clicks an anchor or `<a>` tag linked to a file. Amplitude determines that the anchor or `<a>` tag linked to a file if the file extension matches the following regex:

`pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma`

Set `config.autocapture.fileDownloads` to `false` to disable file download tracking.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: {
    fileDownloads: false,
  },
});
```

### Track element interactions

You can enable element interaction tracking to capture clicks and changes for elements on your page, which is required for [Visual labeling](/docs/data/visual-labeling). Review our page on [Autocapture privacy and security](/docs/data/autocapture#privacy-and-security) for more information about the data collected with these events. 

Set `config.autocapture.elementInteractions` to `true` to enable element click and change tracking.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  autocapture: {
    elementInteractions: true, //[tl! highlight]
  },
});
```

#### Advanced configuration for element interactions

Use the advanced configuration to control element interaction tracking.

{{partial:collapse name="Tracking element interaction options"}}

| Name                                                                      | Value                              | Description                                                                 |
| ------------------------------------------------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `config.autocapture.elementInteractions.cssSelectorAllowlist`  | Optional. `(string)[]`        | Accepts one or more CSS selectors that define which elements on the page should always be tracked. By default, this is set to `['a','button','input','select','textarea','label','video','audio','[contenteditable="true" i]','[data-amp-default-track]','.amp-default-track']` |
| `config.autocapture.elementInteractions.actionClickAllowlist`             | Optional. `(string)[]`                 | Accepts one or more CSS selectors that define which elements on the page should be tracked when the page changes (for example, a new visual element appears) or the click takes a user to a new page. By default, this is set to `['div', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']` |
| `config.autocapture.elementInteractions.pageUrlAllowlist`                 | Optional. `(string\|RegExp)[]`     | Defines the URL, URLs, or URL pattern on which Amplitude tracks element click and change events. By default, element interactions will be captured on any URL if undefined. |
| `config.autocapture.elementInteractions.dataAttributePrefix`              | Optional. `(string\|RegExp)[]`     | Allows the SDK to capture data attributes as an event property. By default, this is set to `data-amp-track`. |

{{/partial:collapse}}

For example, you could configure Amplitude only to capture clicks on elements with a class of `amp-tracking` on the blog pages of a site as follows:

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  autocapture: {
    cssSelectorAllowlist: [
      '.amp-tracking'
    ],
    pageUrlAllowlist: [
      new RegExp('https://amplitude.com/blog/*')
    ],
  },
});
```

By default, if you don't use these settings, Amplitude tracks the default selectors on all page on which you enable the plugin.

{{partial:admonition type="note" heading=""}}
When specify the CSS selectors to track, your selection overrides the default. To retain the default selectors import the `DEFAULT_CSS_SELECTOR_ALLOWLIST` and include it in your code.

```js
import { DEFAULT_CSS_SELECTOR_ALLOWLIST } from '@amplitude/plugin-autocapture-browser';

const selectors = [
  ...DEFAULT_CSS_SELECTOR_ALLOWLIST,
  '.class-of-a-thing-i-want-to-track',
];
```
{{/partial:admonition}}

{{partial:collapse name="Element interaction events"}} 
When you enable element interactions for Autocapture, Amplitude sends two events, from which you can create labeled events with [visual labeling](/docs/data/visual-labeling):

- `[Amplitude] Element Clicked`
- `[Amplitude] Element Changed`

These two events capture properties that describe the corresponding element and other context about the user's browser:

<!-- vale off-->
- `[Amplitude] Element ID`
- `[Amplitude] Element Class`
- `[Amplitude] Element Tag`
- `[Amplitude] Element Text` (Collected for `[Amplitude] Element Clicked`, only) 
- `[Amplitude] Element Href` (Collected for `[Amplitude] Element Clicked`, only)
- `[Amplitude] Element Position Left`
- `[Amplitude] Element Position Top`
- `[Amplitude] Viewport Height`
- `[Amplitude] Viewport Width`
- `[Amplitude] Page URL`
- `[Amplitude] Page Title`
- `[Amplitude] Element Selector`
- `[Amplitude] Element Hierarchy`
- `[Amplitude] Element Attributes`
- `[Amplitude] Element Aria Label`
- `[Amplitude] Element Parent Label`
<!-- vale on-->
{{/partial:collapse}}


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

## User properties

User properties are details like device details, user preferences, or language to help you understand your users at the time they performed an action in your app.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

{{partial:admonition type="note" heading="Identify calls"}}
If the SDK sends the Identify call after the event, the details of the call appear immediately in the user's profile in Amplitude. Results don't appear in chart results until the SDK sends another event after Identify. Identify calls affect events that happen after it. For more information, see [Overview of user properties and event properties](/docs/data/user-properties-and-events).
{{/partial:admonition}}

### Set a user property

The Identify object provides controls for setting user properties. To set a user property:

1. Instantiate an Identify object
2. Call methods on that object
3. Instruct the SDK to make a call with the Identify object

```ts
const identifyEvent = new amplitude.Identify();
// Use methods in the following sections to update the Identify object
amplitude.identify(identifyEvent);
```

#### Identify.set
This method sets the value of a user property. For example, you can set a role property of a user.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.set('location', 'LA'); //[tl! highlight]
amplitude.identify(identifyEvent);
```

#### Identify.setOnce

This method sets the value of a user property only one time. Subsequent calls using `setOnce()` are ignored. For example, you can set an initial login method for a user. `setOnce()` ignores later calls.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.setOnce('initial-location', 'SF'); //[tl! highlight]
identify(identifyEvent);
```

#### Identify.add

This method increments a user property by a numerical value. If the user property doesn't have a value set yet, it's initialized to `0` before it's incremented. For example, you can track a user's travel count.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.add('travel-count', 1); //[tl! highlight]
amplitude.identify(identifyEvent);
```

### Arrays in user properties

Call the `prepend`, `append`, `preInsert`, or `postInsert` methods to use arrays as user properties.

#### Identify.prepend

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
const identifyEvent = new Identify();
identifyEvent.prepend('visited-locations', 'LAX'); //[tl! highlight]
identify(identifyEvent);
```

#### Identify.append

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.append('visited-locations', 'SFO'); //[tl! highlight]
amplitude.identify(identifyEvent);
```

#### Identify.postInsert

This method post-inserts a value or values to a user property if it doesn't exist in the user property yet. Post-insert means inserting the values at the end of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are post-inserted. If the user property has an existing value, this method is a no-op.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.postInsert('unique-locations', 'SFO'); //[tl! highlight]
amplitude.identify(identifyEvent);
```

#### Identify.remove

This method removes a value or values to a user property if it exists in the user property. Remove means remove the existing values from the given list. If the user property has an existing value, this method is a no-op.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.remove('unique-locations', 'JFK') //[tl! highlight]
amplitude.identify(identifyEvent);
```

## User groups

{{partial:admonition type="info" heading="User group availability"}}
User Groups requires the Accounts add-on to your Plus, Growth, or Enterprise plan. For more information, see the [Pricing](https://amplitude.com/pricing) page.
{{/partial:admonition}}

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to tell that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
If Joe is in 'orgId' '15', then the `groupName` is `15`.

```ts
// set group with a single group name
amplitude.setGroup('orgId', '15');
```

If Joe is in 'sport' 'soccer' and 'tennis', then the `groupName` is `["tennis", "soccer"]`.

```ts
// set group with multiple group names
amplitude.setGroup('sport', ['soccer', 'tennis']);
```
{{/partial:admonition}}

Pass an `Event` object with `groups` to a Track call to set an **event-level group**. With event-level groups, the group designation applies only to the specific logged event, and doesn't persist to the user unless you explicitly set it with `setGroup`.

```ts
amplitude.track({
  event_type: 'event type',
  event_properties: { eventPropertyKey: 'event property value' },
  groups: { 'orgId': '15' }
})
```

## Group properties

{{partial:admonition type="info" heading="Group properties availability"}}
Group Properties requires the Accounts add-on to your Plus, Growth, or Enterprise plan. For more information, see the [Pricing](https://amplitude.com/pricing) page.
{{/partial:admonition}}

Use the Group Identify API to set or update the properties of particular groups. These updates only affect events going forward.

The `groupIdentify()` method accepts a group type and group name string parameter, as well as an Identify object that's applied to the group.

```ts
const groupType = 'plan';
const groupName = 'enterprise';
const groupIdentifyEvent = new amplitude.Identify()
groupIdentifyEvent.set('key1', 'value1');
amplitude.groupIdentify(groupType, groupName, groupIdentifyEvent); //[tl! highlight]
```

## Track revenue

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances store each revenue transaction and allow you to define several special revenue properties (like `revenueType` and `productIdentifier`) that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

To track revenue from a user, call revenue each time a user generates revenue. In this example, the user purchased 3 units of a product at $3.99.

```ts
const event = new amplitude.Revenue()
  .setProductId('com.company.productId')
  .setPrice(3.99)
  .setQuantity(3);

amplitude.revenue(event);
```

### Revenue interface

| Name           | Description                                                                                                             | Default Value |
| -------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------- |
| `product_id`   | Optional. `string`. An identifier for the product. Amplitude recommend something like the Google Play Store product ID. | Empty string. |
| `quantity`     | Required. `number`. The quantity of products purchased. Note: revenue = quantity \* price.                              | `1`           |
| `price`        | Required. `number`. The price of the products purchased, and this can be negative. Note: revenue = quantity \* price.   | `null`        |
| `revenue_type` | Optional, but required for revenue verification. `string`. The revenue type (for example, tax, refund, income).         | `null`        |
| `receipt`      | Optional. `string`. The receipt identifier of the revenue.                                                              | `null`        |
| `receipt_sig`  | Optional, but required for revenue verification. `string`. The receipt signature of the revenue.                        | `null`        |
| `properties`   | Optional. `{ [key: string]: any }`. An object of event properties to include in the revenue event.                      | `null`        |

## Flush the event buffer

The `flush` method triggers the client to send buffered events immediately.

```ts
amplitude.flush();
```

By default, Browser SDK calls`flush` automatically at an interval. If you want to flush all events, control the async flow with the optional Promise interface, for example:

```ts
amplitude.init(API\_KEY).promise.then(function() {
  amplitude.track('Button Clicked');
  amplitude.flush();
});
```

## Custom user identifier

If your application has a login system that you want to track users with, call `setUserId` to update the user's identifier.

```ts
amplitude.setUserId('user@amplitude.com');
```

## Custom session identifier

Assign a new session ID with `setSessionId`. When you set a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

```ts
amplitude.setSessionId(Date.now());
```

## Custom device identifier

Assign a new device ID with `deviceId`. When you set a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```ts
amplitude.setDeviceId(uuid());
```

## Reset when the user logs out

Use `reset` as a shortcut to anonymize users after they log out. `reset` does the following:

1. Sets `userId` to `undefined`.
2. Sets `deviceId` to a new UUID value.

With an undefined `userId` and a new `deviceId`, the user appears to Amplitude as a new user.

```ts
amplitude.reset();
```

## Opt users out of tracking

Set `setOptOut` to `true` to disable logging for a specific user.

```ts
amplitude.setOptOut(true);
```
Amplitude doesn't save or send events to the server while `setOptOut` is enabled. The setting persists across page loads.

Set `setOptOut` to `false` to re-enable logging.

```ts
amplitude.setOptOut(false);
```

## Optional tracking

By default, the SDK tracks these properties automatically. You can override this behavior by passing a configuration called `trackingOptions` when initializing the SDK, setting the appropriate options to false.

| Tracking Options | Default |
| ---------------- | ------- |
| `ipAddress`      | `true`  |
| `language`       | `true`  |
| `platform`       | `true`  |

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  trackingOptions: {
    ipAddress: false,
    language: false,
    platform: false,
  },
});
```

## Callback

All asynchronous APIs are optionally awaitable through a Promise interface. This also serves as a callback interface.

{{partial:tabs tabs="Promise, async/await"}}
{{partial:tab name="Promise"}}
```ts
amplitude.init("apikey", "12321.com").promise.then(function(result) { 
 // init callback
})

amplitude.track('Button Clicked').promise.then(function(result) {
 result.event; // {...} (The final event object sent to Amplitude)
 result.code; // 200 (The HTTP response status code of the request.
 result.message; // "Event tracked successfully" (The response message)
});
```
{{/partial:tab}}
{{partial:tab name="async/await"}}
```ts
// Using async/await
const initResult = await amplitude.init("apikey", "12321.com").promise;

const results = await amplitude.track('Button Clicked').promise;
result.event; // {...} (The final event object sent to Amplitude)
result.code; // 200 (The HTTP response status code of the request.
result.message; // "Event tracked successfully" (The response message)
```
{{/partial:tab}}
{{/partial:tabs}}

## Plugins

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment plugin) or sending to third-party endpoints (destination plugin). A plugin is an `Object` with optional fields `name` and `type` and methods `setup()`, `execute()` and `teardown()`.

### add

The `add` method adds a plugin to Amplitude.

```ts
amplitude.add(new Plugin());
```

### remove

The `remove` method removes the given plugin name from the client instance if it exists.

```ts
amplitude.remove(plugin.name);
```

### Create a custom plugin

| Field / Function    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `plugin.name`       | Optional. The name field is an optional property that allows you to reference the plugin for deletion purposes. If not provided, Amplitude assigns a random name when you add the plugin. If you don't plan to delete your plugin, you can skip assigning a name.                                                                                                                                                                                                                                                                                                                                                                                   |
| `plugin.type`       | Optional. The type field is an optional property that defines the type of plugin you are creating. See `plugin.execute()` function below to distinguish the two types. If not defined, the plugin defaults to an enrichment type.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `plugin.setup()`    | Optional. The setup function is an optional method called when you add the plugin or on first init whichever happens later. This function accepts two parameters: 1) Amplitude configuration; and 2) Amplitude instance. This is useful for setup operations and tasks that depend on either the Amplitude configuration or instance. Examples include assigning baseline values to variables, setting up event listeners, and many more.                                                                                                                                                                                                           |
| `plugin.execute()`  | Optional for type:enrichment. For enrichment plugins, execute function is an optional method called on each event. This function must return a new event, otherwise, the SDK drops the passed event from the queue. This is useful for cases where you need to add/remove properties from events, filter events, or perform any operation for each event tracked. <br/><br/> For destination plugins, execute function is a required method called on each event. This function must return a response object with keys: `event` (BaseEvent), `code` (number), and `message` (string). This is useful for sending events for third-party endpoints. |
| `plugin.teardown()` | Optional. The teardown function is an optional method called when Amplitude re-initializes. This is useful for resetting unneeded persistent state created/set by setup or execute methods. Examples include removing event listeners or mutation observers.                                                                                                                                                                                                                                                                                                                                                                                        |

### Plugin examples

{{partial:tabs tabs="Enrichment, Destination"}}
{{partial:tab name="Enrichment"}}
Here's an example of an enrichment plugin that includes an extra event property `page_url` to all events.

```ts
const enrichPageUrlPlugin = (): EnrichmentPlugin => {
  return {
    execute: async (event: Event) => {
      event.event_properties = {
        ...event.event_properties,
        page_url: location.href,
      };
      return event;
    },
  }
}
 
amplitude.add(enrichPageUrlPlugin());
amplitude.init(API_KEY);
```
{{/partial:tab}}
{{partial:tab name="Destination"}}
Here's an example of a destination plugin that sends each tracked event to a custom server URL using Fetch API.

```ts
const customDestination = (customUrl: string): DestinationPlugin => {
  return {
    type: 'destination',
    execute: async (event: Event) => {
      const payload = {
        k: 'apikey',
        d: event,
      };

      const response = await fetch(customUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: '\*/\*',
        },
        body: JSON.stringify(payload),
      });

      return {
        code: response.status,
        event: event,
        message: response.statusText,
      };
    },
  };
};

amplitude.init(API_KEY);
amplitude.add(myDestinationPlugin('https://custom.url.com'));
```
{{/partial:tab}}
{{/partial:tabs}}

## Troubleshooting and debugging

Debugging in a browser can help you identify problems related to your code's implementation, as well as potential issues within the SDKs you're using. Here's a basic guide on how to use the browser's built-in Developer Tools (DevTools) for debugging.

### Console

You can find JavaScript errors under **Inspect > Console**, which might have the details about the line of code and file that caused the problem. The console also allows you to execute JavaScript code in real time.

* Enable debug mode by following these [instructions](#debugging). Then With the default logger, extra function context information will be output to the developer console when any SDK public method is invoked, which can be helpful for debugging.

* Amplitude supports SDK deferred initialization. Events tracked before initialization will be dispatched after the initialization call. If you cannot send events but can send the event successfully after entering `amplitude.init(API_KEY, 'USER_ID')` in the browser console, it indicates that your `amplitude.init` call might not have been triggered in your codebase or you aren't using the correct Amplitude instance during initialization. Therefore,  check your implementation."

### Network Request

Use the **Inspect > Network** tab to view all network requests made by your page. Search for the Amplitude request.

Check the response code and ensure that the response payload is as expected.

### Instrumentation Explorer/Chrome Extension

The Amplitude Instrumentation Explorer is an extension available in the Google Chrome Web Store. The extension captures each Amplitude event you trigger and displays it in the extension popup. It's important to ensure that the event has been sent out successfully and to check the context in the event payload.

### Common Issues

The following are common issues specific to Browser SDK. For more general common issues, see [SDK Troubleshooting and Debugging](/docs/sdks/sdk-debugging).

#### Ad blocker

`Ad Blocker` might lead to event dropping. The following errors indicate that the tracking has been affected by `Ad Blocker`. When loading via a script tag, an error may appear in the console/network tab while loading the SDK script. When loaded with npm package, there could be errors in the network tab when trying to send events to the server. The errors might vary depending on the browser.

* Chrome (Ubuntu, MacOS)
Console: error net::ERR_BLOCKED_BY_CLIENT
Network: status (blocked:other)
* Firefox (Ubuntu)
Console: error text doesn’t contain any blocking-specific info
Network: Transferred column contains the name of plugin Blocked by uBlock Origin
* Safari (MacOS)
Console: error contains text Content Blocker prevented frame ... from loading a resource from ...
Network: it looks like blocked requests aren't listed. Not sure if it’s possible to show them.

Amplitude recommends using a proxy server to avoid this situation.

#### Cookies related

Here is the [information](./#cookie-management) SDK stored in the cookies. This means that client behavior, like disabling cookies or using a private browser/window/tab, will affect the persistence of these saved values in the cookies. If these values aren't persistent or aren't increasing by one, that could be the reason.

#### CORS

Cross-Origin Resource Sharing (CORS) is a security measure implemented by browsers to restrict how resources on a web page can be requested from a different domain. It might cause this issue if you used `setServerURL`.

```Access to fetch at 'xxx' from origin 'xxx' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.```

Cross-origin resource sharing (CORS) prevents a malicious site from reading another site's data without permission. The error message suggests that the server you're trying to access isn't allowing your origin to access the requested resource. This is due to the lack of the `Access-Control-Allow-Origin` header in the server's response.

* If you have control over the server, you can "Update the server's CORS policy". Add the `Access-Control-Allow-Origin` header to the server's responses. This would allow your origin to make requests. The value of `Access-Control-Allow-Origin` can be * to allow all origins, or it can be the specific URL of your web page.

* If you don't have control over the server, you can set up a proxy server that adds the necessary CORS headers. The web page makes requests to the proxy, which then makes requests to the actual server. The proxy adds the `Access-Control-Allow-Origin` header to the response before sending it back to the web page.

If you have set up an API proxy and run into configuration issues related to that on a platform you’ve selected, that’s no longer an SDK issue but an integration issue between your application and the service provider.

#### Events fired but no network requests

If you [set the logger to "Debug" level](#debugging), and see track calls in the developer console, the `track()` method has been called. If you don't see the corresponding event in Amplitude, the Amplitude Instrumentation Explorer Chrome extension, or the network request tab of the browser, the event wasn't sent to Amplitude. Events are fired and placed in the SDK's internal queue upon a successful `track()` call, but sometimes these queued events may not send successfully. This can happen when an in-progress HTTP request is cancelled. For example, if you close the browser or leave the page.

There are two ways to address this issue:

1. If you use standard network requests, set the transport to `beacon` during initialization or set the transport to `beacon` upon page exit. `sendBeacon` doesn't work in this case because it sends events in the background, and doesn't return server responses like `4xx` or `5xx`. As a result, it doesn't retry on failure. `sendBeacon` sends only scheduled requests in the background. For more information, see the [sendBeacon](./#use-sendbeacon) section.

2. To make track() synchronous, [add the `await` keyword](#callback) before the call.

## Advanced topics

### Cross-domain tracking

You can track anonymous behavior across two different domains. Amplitude identifies anonymous users by their device IDs which must be passed between the domains. To maintain the same session and ensure a continuous user journey, also pass session IDs to the other domain. 

{{partial:admonition type="note" heading=""}}
Starting from `v2.8.0` the SDK supports getting the device ID from the URL paramter `ampDeviceId`. The SDK configuration, for example, `init('API_KEY', { deviceId: 'custom-device-id' })` still takes precedence over the URL parameter. Previous versions of the SDK supported the `deviceId` URL parameter, this option is still supported for backward compatibility but `ampDeviceId` will take precedence if both are set. You don't need to change your code if upgrade to versions higher than `v2.8.0` but it is recommended.
{{/partial:admonition}}

For example:

* Site 1: `www.example.com`
* Site 2: `www.example.org`

Users who start on Site 1 and then navigate to Site 2 must have the device ID generated from Site 1 passed as a parameter to Site 2. Site 2 then needs to initialize the SDK with the device ID.
 The SDK can parse the URL parameter automatically if `deviceId` is in the URL query parameters.

Starting from `v2.8.0`, the SDK can automatically get session ID from the URL to maintain the same session and ensure a continuous user journey.

1. From Site 1, grab the device ID from `getDeviceId()` and the session ID from `getSessionId()`.
2. Pass the device ID and session ID to Site 2 via a URL parameter when the user navigates. (for example: `www.example.com?ampDeviceId=device_id_from_site_1&ampSessionId=1716245958483`)
3. Initialize the Amplitude SDK on Site 2 with `init('API_KEY', null)`.

If the `deviceId` and `sessionId` aren't set in `init('API_KEY', null, { deviceId: 'custom-device-id', sessionId: 1716245958483 })`, the SDK automatically falls back to using the URL parameters respectively.

It's recommended to follow the same session ID format as the Browser SDK by using `Date.now()`. Because the SDK checks whether an event is in session every time an event is tracked. For example, 

```typescript
// if session ID is set to 12345
// https://www.example.com?ampDeviceId=my-device-id&ampSessionId=12345
amplitude.init(API_KEY)
// session ID is set to 12345 after init()

amplitude.track("event")
// session ID is set back to Date.now() 
// because the tracked "event" is not in the previous session 12345
```

### Use sendBeacon

Unlike standard network requests, sendBeacon sends events in the background, even if the user closes the browser or leaves the page.

{{partial:admonition type="warning" heading=""}}
Because `sendBeacon` sends events in the background, events dispatched from `sendBeacon` don't return a server response and can't be retried when they encounter failures like 4xx or 5xx errors. You can address these retry issues by sending one event/request, but this could increase the network load and the likelihood of throttling.
{{/partial:admonition}}

#### Set the transport to use sendBeacon for all events

To send an event using `sendBeacon`, set the transport SDK option to 'beacon' in one of two ways

```ts
amplitude.init(API_KEY, 'user@amplitude.com', 
  {
    transport: TransportType.SendBeacon,
    // To make sure the event will be scheduled right away.
    flushIntervalMillis: 0,
    flushQueueSize: 1,
  }
);
```

#### Set the transport to use beacon only when exiting page

Amplitude recommends adding your own event listener for pagehide event.

```ts
window.addEventListener('pagehide',
  () => {
    amplitude.setTransport('beacon') 
    // Sets https transport to use `sendBeacon` API
    amplitude.flush()
  },
);
```

### Content Security Policy (CSP)

If your web app configures the strict Content Security Policy (CSP) for security concerns, adjust the policy to whitelist the Amplitude domains:

* When using ["Script Loader"](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser#installing-via-script-loader), add `https://*.amplitude.com` to `script-src`.
* Add `https://*.amplitude.com` to `connect-src`.

### Cookie management

The Browser SDK uses cookie storage to persist information that multiple subdomains of the same domain may likely want to share. This includes information like user sessions and marketing campaigns, which are stored in separate cookie entries.

#### Cookie prefix

* **AMP**: The SDK creates user session cookies with `AMP` prefix and the first ten digits of the API key: `AMP_{first_ten_digits_API_KEY}`.
* **AMP_MKTG**: The SDK creates marketing campaign cookies with `AMP_MKTG` and the first ten digits of the API key: `AMP_MKTG_{first_ten_digits_API_KEY}`. 
* **AMP_TEST**: On initialization, the SDK creates a cookie with `AMP_TEST` prefix to check whether the cookie storage is working properly. Then the SDK sets the value as the current time, retrieves the cookie by a key and checks if the retrieved value matches the original set time. You **can safely delete** the `AMP_TEST` prefix cookies if, for some reason, they're not successfully deleted.
* **AMP_TDLTEST**: On initialization, the SDK creates a cookie with `AMP_TDLTEST` prefix to find a subdomain that supports cookie storage. For example, when checking for cookie support on `https://analytics.amplitude.com/amplitude/home` the SDK first tries to find a subdomain that matches the root domain (`amplitude.com`) and then falls back to the full domain (`analytics.amplitude.com`). You **can safely delete** the `AMP_TDLTEST` prefix cookies if, for some reason, they're not successfully deleted.

#### Cookie domain

By default, the SDK assigns these cookies to the top-level domain which supports cookie storage. Cookies can be shared on multiple subdomains which allows for a seamless user experience across all subdomains.

For example, if a user logs into the website on one subdomain (`data.amplitude.com`) where the SDK is initialized. On initialization, the SDK assigns cookies to `.amplitude.com`. If the user then navigates to another subdomain (`analytics.amplitude.com`), the login information can be seamlessly shared by shared cookies.

#### Cookie data

The SDK creates two types of cookies: user session cookies and marketing campaign cookies.




{{partial:collapse name="User session cookies"}}
| <div class="big-column">Name</div> | Description                                                                                                                                                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `optOut`                           | <span class="required">Required</span>. A flag to opt this device out of Amplitude tracking. If this flag is set, no additional information will be stored for the user                                                     |
| `userId`                           | Upon user log-in, if you send this value, it is stored in the cookie. Set this to uniquely identify their users (non-anonymous navigation). It is stored encoded using Base64                                               |
| `deviceId`                         | A randomly generated string. It will persist unless a user clears their browser cookies and/ or is browsing in private mode. Even if a user consistently uses the same the device and browser, the device ID can still vary |
| `sessionId`                        | A randomly generated string for each session                                                                                                                                                                                |
| `lastEventTime`                    | Time of the last event, used to determine when to expire and create a new session Id                                                                                                                                        |
| `lastEventId`                      | Id of the last event                                                                                                                                                                                                        |

{{/partial:collapse}}


{{partial:collapse name="Marketing campaign cookies"}}
| <div class="big-column">Name</div> | Description                                                                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `utm_campaign`                     | This identifies a specific campaign used (for example, "summer_sale")                                                            |
| `utm_content`                      | This identifies what brought the user to the site and is commonly used for A/B testing (for example, "banner-link", "text-link") |
| `utm_id`                           | An optional parameter for tracking unique IDs or transaction IDs associated with the link.                                       |
| `utm_medium`                       | This identifies a specific campaign used (for example, "summer_sale")                                                            |
| `utm_source`                       | This identifies which website sent the traffic (for example, Google, Facebook)                                                   |
| `utm_term`                         | This identifies paid search terms used (for example, product+analytics)                                                          |
| `referrer`                         | The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`)                       |
| `referring_domain`                 | The domain that the user was last on (for example, `https://amplitude.com`)                                                      |
| `dclid`                            | Google campaign manager Click Identifier                                                                                         |
| `gbraid`                           | Google Click Identifier for iOS device from Web to App                                                                           |
| `gclid`                            | Google Click Identifier from URL parameters                                                                                      |
| `fbclid`                           | Facebook Click Identifier from URL parameters                                                                                    |
| `ko_click_id`                      | Kochava Click Identifier from URL parameters                                                                                     |
| `msclkid`                          | Microsoft Click Identifier                                                                                                       |
| `ttclid`                           | TikTok Click Identifier                                                                                                          |
| `twclid`                           | Twitter Click Identifier from URL parameter                                                                                      |
| `wbraid`                           | Google Click Identifier for iOS device from App to Web                                                                           |
| `li_fat_id`                        | LinkedIn member indirect identifier for Members for conversion tracking, retargeting, analytics                                  |
| `rtd_cid`                          | Reddit Click Identifier                                                                                                          |

{{/partial:collapse}}

#### Disable cookies

Opt-out of using cookies by setting `identityStorage` to `localStorage` so that the SDK will use `LocalStorage` instead. `LocalStorage` is a great alternative, but because access to `LocalStorage` is restricted by subdomain, you can't track anonymous users across subdomains of your product (for example: `www.amplitude.com` vs `analytics.amplitude.com`).

```ts
amplitude.init("api-key", null, {
  identityStorage: "localStorage",
});
```

### Offline mode

{{partial:admonition type="note" heading="Auto-flush when reconnecting"}}
Setting `config.flushIntervalMillis` to a small value like `1` may cause an `ERR_NETWORK_CHANGED` error.
{{/partial:admonition}}

Beginning with version 2.4.0, the Amplitude Browser SDK supports offline mode. The SDK checks network connectivity every time it tracks an event. If the device is connected to network, the SDK schedules a flush. If not, it saves the event to storage. The SDK also listens for changes in network connectivity and schedules a flush of all stored events when the device reconnects, based on the `config.flushIntervalMillis` setting.

To disable offline mode, add `offline: amplitude.Types.OfflineDisabled` to the `amplitude.init()` call as shown below.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  offline: amplitude.Types.OfflineDisabled
});
```

### Marketing Attribution Tracking

Amplitude tracks marketing attribution and exclude all the referrer from all subdomain by default. Once you enable marketing attribution tracking, Amplitude generates `identify` events to assign the campaign value in certain cases. This ensures that user properties update and influence future events.

#### Tracking scenarios

Amplitude track marketing attribution changes while

##### Amplitude SDK initialization (Hard page refresh)

- At the start of a session, the referrer isn't excluded and campaign has any change or customer first visit.
- In the middle of the session, the referrer isn't excluded, not direct traffic, and campaign has any change.

##### Processing the event

- At the start of a session, the referrer isn't excluded, and campaign has any change.

For more information, see the scenarios outlined below that demonstrate when Amplitude does or doesn't track marketing attribution. These examples are illustrative, not exhaustive.

Tracking occurs when either of the following applies:

| Rule                                                                 | Example                                                                                                                                                            |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| The current subdomain is not an excluded referrer.                   | The referrer does not originates from the same domain or the current subdomain is not match any referrer in `config.autocapture.attribution.excludeReferrers`. |
| No previous campaign.                                                | A user's initial visit.                                                                                                                                            |
| There is an introduction of new UTM parameter or Click ID parameter. | If any utm parameters or Click ID parameters have been dropped during a session, we will unset it.                                                                 |
| The referrer domain changes to a new one.                            | Referrer domain changed from `a.test.com` to `b.test-new.com`                                                                                                      |

Amplitude doesn't track marketing attribution under any of the following conditions:

| Rule                                                                                                                   | Example                                                                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| The referrer originates from the same domain with default configuration.                                               | The landing page is `a.test.com`, with the referrer set to `b.test.com`.                                                                                   |
| A specific referrer domain is explicitly excluded.                                                                     | When setting `config.autocapture.attribution.excludeReferrers` = `[a.test.com]`, and the referrer domain is `a.test.com` for the current page.         |
| The subdomain is specified or matches the regular expression in `config.autocapture.attribution.excludeReferrers`. | Configuration of excludeReferrers involves specific string arrays or a regular expression.                                                                 |
| The user engages in direct traffic within the same session.                                                            | During a session, a user clicks on a link without any campaign attribution parameters, including the absence of UTM and click id parameters from an email. |
| SPA redirect without page reloading                                                                                    | During a session, a user clicks on a link without any campaign attribution parameters, including the absence of UTM and click id parameters from an email. |

#### Rogue referral problem for SPAs

SPA typically don't experience a true page load after a visitor enters the site, which means the referrer information doesn't update when clicking internal links. UTM parameters may be dropped during SPA redirects, while the referrer remains unchanged. This is a known issue in the industry. To address this problem, you can either:

- Control the page and location parameters and / or
- Unset the referrer after the first hit

### Remote configuration

Beginning with version 2.10.0, the Amplitude Browser SDK supports remote configuration. By default, the SDK disables this feature.

To enable remote config, add `fetchRemoteConfig: true` to the `amplitude.init()` call as shown below.

```ts
amplitude.init(AMPLITUDE_API_KEY, {
  fetchRemoteConfig: true
});
```

When remote config is enabled, the SDK checks if remote configuration has been fetched within the same session. If so, it uses the remote configuration stored in the indexedDB. Otherwise, it fetches the remote configuration from the remote configuration endpoint.

{{partial:admonition type="note" heading=""}}
Remote configuration supports Autocapture settings, and overrides settings you configure locally.
{{/partial:admonition}}

In Amplitude, navigate to *Data > Manage > Settings > Autocapture* to add or update a remote configuration.
