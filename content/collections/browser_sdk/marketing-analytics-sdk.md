---
id: 25904c6b-609d-4365-9660-2782ef50d52d
blueprint: browser_sdk
title: 'Marketing Analytics SDK'
sdk_status: maintenance
article_type: core
supported_languages:
  - js
github_link: 'https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/marketing-analytics-browser'
releases_url: 'https://github.com/amplitude/Amplitude-TypeScript/releases?q=marketing-analytics-browser&expanded=true'
bundle_url: 'https://www.npmjs.com/package/@amplitude/marketing-analytics-browser'
api_reference_url: 'https://amplitude.github.io/Amplitude-TypeScript/modules/_amplitude_marketing_analytics_browser.html'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/marketing-analytics-browser.svg'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1714515055
migration_guide:
  - eb4533a3-2075-49a0-83fa-e703afea78e7
exclude_from_sitemap: false
---
The Marketing Analytics Browser SDK extends the Browser SDK to identify users and events based on marketing channels. This library is open-source, check it out on [GitHub](https://github.com/amplitude/Amplitude-TypeScript/tree/v1.x/packages/marketing-analytics-browser).

{{partial:admonition type="deprecated" heading=""}}
This is a maintenance SDK and will only receive bug fixes until deprecation. An improved version of Amplitude Browser SDK is now available. Amplitude Browser SDK 2.0 features default event tracking, improved marketing attribution tracking, simplified interface and a lighter weight package. Amplitude recommends the Browser SDK 2.0 for both product analytics and marketing analytics use cases. Upgrade to the latest [Browser SDK 2.0](/docs/sdks/analytics/browser/browser-sdk-2).
{{/partial:admonition}}

## Install the SDK

To get started with using Marketing Analytics Browser SDK, install the package in your project with npm or script loader.

### Install the Node package

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/marketing-analytics-browser
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/marketing-analytics-browser
```
{{/partial:tab}}
{{/partial:tabs}}

### Install with the script loader

This package is also distributed through a CDN. Copy and paste this script in your HTML file.

```
<script type="text/javascript">
!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[],_iq:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{var n=function(e,t){e.prototype[t]=function(){return this._q.push({name:t,args:Array.prototype.slice.call(arguments,0)}),this}},s=function(e,t,r){return function(n){e._q.push({name:t,args:Array.prototype.slice.call(r,0),resolve:n})}},o=function(e,t,r){e[t]=function(){if(r)return{promise:new Promise(s(e,t,Array.prototype.slice.call(arguments)))}}},i=function(e){for(var t=0;t<m.length;t++)o(e,m[t],!1);for(var r=0;r<y.length;r++)o(e,y[r],!0)};r.invoked=!0;var a=t.createElement("script");a.type="text/javascript",a.integrity="sha384-PPfHw98myKtJkA9OdPBMQ6n8yvUaYk0EyUQccFSIQGmB05K6aAMZwvv8z50a5hT2",a.crossOrigin="anonymous",a.async=!0,a.src="https://cdn.amplitude.com/libs/marketing-analytics-browser-0.3.2-min.js.gz",a.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var c=t.getElementsByTagName("script")[0];c.parentNode.insertBefore(a,c);for(var u=function(){return this._q=[],this},p=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],l=0;l<p.length;l++)n(u,p[l]);r.Identify=u;for(var d=function(){return this._q=[],this},v=["getEventProperties","setProductId","setQuantity","setPrice","setRevenue","setRevenueType","setEventProperties"],f=0;f<v.length;f++)n(d,v[f]);r.Revenue=d;var m=["getDeviceId","setDeviceId","getSessionId","setSessionId","getUserId","setUserId","setOptOut","setTransport","reset"],y=["init","add","remove","track","logEvent","identify","groupIdentify","setGroup","revenue","flush"];i(r),r.createInstance=function(){var e=r._iq.push({_q:[]})-1;return i(r._iq[e]),r._iq[e]},e.amplitude=r}}(window,document)}();

amplitude.init("YOUR_API_KEY_HERE");
</script>
```

### Configuration

{{partial:collapse name="Configuration options"}}
| Name  | Description | Default Value |
| --- | --- | --- |
|`instanceName`| `string`. The instance name. | `$default_instance` |
|`flushIntervalMillis`| `number`. Sets the interval of uploading events to Amplitude in milliseconds. | 1,000 (1 second) |
|`flushQueueSize`| `number`. Sets the maximum number of events that are batched in a single upload attempt. | 30 events |
|`flushMaxRetries`| `number`. Sets the maximum number of retries for failed upload attempts. This is only applicable to retryable errors. | 5 times.|
|`logLevel` | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level. | `LogLevel.Warn` |
|`loggerProvider `| `Logger`. Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination. | `Amplitude Logger` |
|`minIdLength`|  `number`. Sets the minimum length for the value of `userId` and `deviceId` properties. | `5` |
|`optOut` | `boolean`. Sets permission to track events. Setting a value of `true` prevents Amplitude from tracking and uploading events. | `false` |
|`serverUrl`| `string`. Sets the URL where events are upload to. | `https://api2.amplitude.com/2/httpapi` | 
|`serverZone`| `EU` or  `US`. Sets the Amplitude server zone. Set this to `EU` for Amplitude projects created in `EU` data center. | `US` |
|`useBatch`| `boolean`. Sets whether to upload events to Batch API instead of the default HTTP V2 API or not. | `false` |
|`appVersion` | `string`. Sets an app version for events tracked. This can be the version of your application. For example: "1.0.0" | `undefined` |
|`deviceId` | `string`. Sets an identifier for the device running your application. | `UUID()` |
|`cookieExpiration` | `number`. Sets expiration of cookies created in days. | 365 days |
|`cookieSameSite` | `string`. Sets `SameSite` property of cookies created. | `Lax` |
|`cookieSecure` | `boolean`. Sets `Secure` property of cookies created. | `false` |
|`cookieStorage` | `Storage<UserSession>`. Sets a custom implementation of `Storage<UserSession>` to persist user identity. | `MemoryStorage<UserSession>` |
|`cookieUpgrade`| `boolean`. Sets upgrading from cookies created by [maintenance Browser SDK](/docs/data/sdks/javascript/). If true, new Browser SDK deletes cookies created by maintenance Browser SDK. If false, Browser SDK keeps cookies created by maintenance Browser SDK. | `true` |
|`disableCookies`| `boolean`. Sets permission to use cookies. If value is `true`, localStorage API is used to persist user identity. | The cookies is enable by default. |
|`domain` | `string`. Sets the domain property of cookies created. | `undefined` |
|`partnerId` | `string`. Sets partner ID. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`. | `undefined` |
|`sessionTimeout` | `number`. Sets the period of inactivity from the last tracked event before a session expires in milliseconds. | 1,800,000 milliseconds (30 minutes) |
|`userId` | `number`. Sets an identifier for the user being tracked. Must have a minimum length of 5 characters unless overridden with the `minIdLength` option. | `undefined` |
|`trackingOptions`| `TrackingOptions`. Configures tracking of additional properties. See the `Optional tracking` section for more information. | Enable all tracking options by default. |
|`storageProvider`| `Storage<Event[]>`. Implements a custom `storageProvider` class from Storage. | `LocalStorage` |

{{/partial:collapse}}

The Marketing Analytics SDK supports the following options to configure web attribution and page view tracking.

|Name| Description| Default Value|
|---|----|---|
|`attribution.disabled`| `boolean`. Whether disable the attribution tracking.| `false` |
|`attribution.excludeReferrers`| `string[]`. Exclude the attribution tracking for the provided referrers string | Including all referrers by default. | 
|`attribution.initialEmptyValue`| `string`. Customize the initial empty value for attribution related user properties to any string value. | `EMPTY` |
|`attribution.resetSessionOnNewCampaign`| `boolean`. Whether reset the `sessionId` on a new campaign. | SDK won't create a new session for new campaign by default. | 
|`pageViewTracking.trackOn`| `attribution` or `() => boolean`. `attribution` - Fire a page view event attribution information changes. `undefined` - Fire a page view event on page load or on history changes for single page application, default behavior. `() => boolean` - Fire a page view events based on a `trackOn` functions| `undefined` |
|`pageViewTracking.trackHistoryChanges`  | `pathOnly` or `all` or `undefined`. Use this option to subscribe to page view changes in a single page application like React.js. `pathOnly` - Compare the path only changes for page view tracking. `all`- Compare the full url changes for page view tracking. `undefined` - Default behavior. Page view changes in single page applications does not trigger a page view event. | `undefined` |

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by the `track` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `flushQueueSize` and `flushIntervalMillis`. By default, the serverUrl will be `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, set `useBatch` to `true` to set `setServerUrl` to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same events upload threshold and flush time intervals.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  // Events queued in memory will flush when number of events exceed upload threshold
  // Default value is 30
  flushQueueSize: 50, 
  // Events queue will flush every certain milliseconds based on setting
  // Default value is 10000 milliseconds
  flushIntervalMillis: 20000,
  // Using batch mode with batch API endpoint, `https://api2.amplitude.com/batch`
  useBatch: true
});
```

### EU data residency

You can configure the server zone when you initialize the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

{{partial:admonition type="note" heading=""}}
For EU data residency, the project must be set up inside Amplitude EU. You must initialize the SDK with the API key from Amplitude EU.
{{/partial:admonition}}

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  serverZone: 'EU',
});
```

## Marketing attribution

Amplitude tracks marketing attribution to identify your user's traffic source using the UTM, referrer and click ID parameters.

#### UTM parameters

UTM (Urchin Traffic Monitor) parameters are useful for analyzing the effectiveness of different ad campaigns and referring sites. UTM parameters are case-sensitive, so they're treated as different values when the capitalization varies.

There are five different standard UTM parameters:

|Name|Description|
|-|-|
|`utm_source`| This identifies which website sent the traffic (for example, Google, Facebook) |
|`utm_medium`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_campaign`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_term`| This identifies paid search terms used (for example, product+analytics) |
|`utm_content` | This identifies what brought the user to the site and is commonly used for A/B testing (for example, "banner-link", "text-link") |

Here is an example URL with UTM parameters:

`https://www.amplitude.com/?utm_source=newsletter&utm_campaign=product_analytics_playbook&utm_medium=email&utm_term=product%20analytics&utm_content=banner-link`

#### Referrer parameters

Referrer is the URL of the page that linked to the destination page. Amplitude tracks the following parameters:

|Name|Description|
|-|-|
|`referrer`| The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`) |
|`referring_domain`| The domain that the user was last on (for example, `https://amplitude.com`) |

Referrer is an empty string (`''`) if the user navigated to the destination page directly.

#### Click ID parameters

Click IDs are campaign identifiers included as URL query parameters. Ad platforms use these IDs to identify the campaign and other attributes. While Amplitude doesn't have access to further campaign attributes associated to Click IDs, Amplitude can track Click ID values specified in the following table.

|Name|Description|
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
|`twclid`| Linkedin Click identifier |
|`wbraid`| Reddit campaign tracking/attribution Click identifier |

#### First-touch attribution

Amplitude captures the initial attribution data at the start of the first session. The first-touch attribution values are set when a user's attribution data are seen for the first time. The following user properties are set one time:

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

For every new campaign (when new attribution data is seen), Amplitude captures the changes regardless of the state of the user session. You can configure `resetSessionOnNewCampaign` to `true` to reset the session on every new campaign. The default behavior is to not reset the session on new campaign.

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

For users who initially visits a page directly or organically, by default, the initial value is set to `"EMPTY"`. If you prefer a different initial value, set `attribution.initialEmptyValue` to any string value.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    initialEmptyValue: 'none',
  }
});
```

#### Exclude the referrers from specific domain

You can configure Amplitude to opt out of collection of attribution data for a given list of referrers.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    excludeReferrers: ['www.test.com'],
  }
});
```

#### Reset the session on a new campaign

You can configure Amplitude to start a new session if any campaign parameter changes. Do this by setting `attribution.resetSessionOnNewCampaign` to `true`. By default `attribution.resetSessionOnNewCampaign` is set to `false`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    resetSessionOnNewCampaign: true,
  }
});
```

#### Disable attribution tracking

You can configure Amplitude to opt out of automatic collection of attribution data. Do this by setting `attribution.disabled` to `true`. By default `attribution.disabled` is set to `false`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  attribution: {
    disabled: true,
  }
});
```

### Page view

Enable page view tracking by setting `pageViewTracking` to `true`. The page view event is fired when the page loads.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  pageViewTracking: true
});
```

You can set `pageViewTracking` to an object to pass more options.

#### Track the page view event when the attribution changed

Set the `trackOn` option to `'attribution'` to send Page View events _only_ when attribution information changes.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  pageViewTracking: {
    trackOn: 'attribution',
  }
});
```

#### Track the page view event based on specific criteria

`trackOn` can also be set to a function callback to fully customize when a Page View event is sent.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  pageViewTracking: {
    trackOn: () => {
      return window.location.pathname === '/landing_page'
    },
  }
});
```

#### Single page app page view tracking

If you have a single page app that uses a [history](https://developer.mozilla.org/en-US/docs/Web/API/History) based router such as react-router, you can enable `trackHistoryChanges` to send Page View events when users navigate between pages.
Possible values for `trackHistoryChanges`:

|Name|Description|
|---|---|
|`all`| All pushes and pops from history send a page view. |
|`pathOnly`| Page Views are sent if the [URL pathname](https://developer.mozilla.org/en-US/docs/Web/API/URL/pathname) changes. This prevents changes to the query string or hash from sending events. |

You can set the `trackHistoryChanges` to `pathOnly` to only track the on path changes. By default, full page URL is considered into the page view changes.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  pageViewTracking: {
    trackHistoryChanges: 'pathOnly' // or 'all'
  }
});
```

The following information is tracked in the page view events.

|Name| Description| Default Value|
|---|----|---|
|`event_type`| `string`. The event type for page view event. Configurable through enrichment plugin. | `Page View`. |
|`event_properties.page_domain`| `string`. The page domain. | `location.hostname` or ''. |
|`event_properties.page_location`| `string`. The page location. | `location.href` or ''. |
|`event_properties.page_path`| `string`. The page path. | `location.path` or ''.|
|`event_properties.page_title`| `string`. The page title. | `document.title` or ''.|
|`event_properties.page_url`| `string`. The value of page url. | `location.href.split('?')[0]` or ``.|
|`event_properties.[CampaignParam]`| `string`. The value of `UTMParameters` `ReferrerParameters` `ClickIdParameters` if has any. Check [here](./#web-attribution) for the possible keys. | Any undefined campaignParam or `undefined`. |

### Use the Marketing Analytics SDK with Ampli

You can use Ampli with this SDK by passing an instance of the Marketing Analytics SDK to `ampli.load()`. See the [Ampli documentation](/docs/sdks/sdk-catalog/browser/ampli-for-browser-sdk-1-0) for the Browser SDK for more details on configuration. 

1. Add the Marketing Analytics Browser SDK to your project.
2. Create an instance of the SDK.
3. Pass the instance into `ampli.load()`

This example passes the "amplitude" instance to `ampli.load`.

```ts
amplitude.init(REACT_APP_AMPLITUDE_API_KEY, undefined, { ...DefaultConfiguration, logLevel: 3 });
ampli.load({ 
  client: { 
    instance: amplitude 
  } 
});
```