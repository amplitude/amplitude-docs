---
id: 8471af8b-e132-4073-8330-d5dd7bbbd8ae
blueprint: browser_sdk
title: 'Browser SDK 1'
sdk_status: current
article_type: core
supported_languages:
  - js
  - ts
github_link: 'https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser'
releases_url: 'https://github.com/amplitude/Amplitude-TypeScript/releases?q=analytics-browser&expanded=true'
bundle_url: 'https://www.npmjs.com/package/@amplitude/analytics-browser/v/1.13.4'
api_reference_url: 'https://amplitude.github.io/Amplitude-TypeScript/'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/analytics-browser/v1.svg'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718056305
major_version: 1
ampli_article: f7989230-bf1c-48aa-ad61-2bc2b3e15a8c
migration_guide:
  - 9b155be9-bb32-428c-9f49-6e00f9630547
exclude_from_sitemap: false
source: https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/
---
The Browser SDK lets you send events to Amplitude.

{{partial:admonition type="note" title="Browser SDK 2.0 now available"}}
An improved version of Amplitude Browser SDK is now available. Amplitude [Browser SDK 2.0](/docs/sdks/analytics/browser/browser-sdk-2) features default event tracking, improved marketing attribution tracking, simplified interface and a lighter weight package. Amplitude recommends the Browser SDK 2.0 for both product analytics and marketing analytics use cases. Upgrade to the latest Browser SDK 2.0. See the [Migration Guide](/docs/sdks/analytics/browser/migrate-from-browser-sdk-1-0-to-2-0) for more information.

## Initialize the SDK

{{partial:admonition type="note" heading="Sending events"}}
This SDK uses the [Http V2](/docs/apis/analytics/http-v2) API and follows the same constraints for events. Make sure that all events logged in the SDK have the `event_type` field and at least one of `deviceId`  (included by default) or `userId`, and follow the Http API's constraints on each of those fields.

To prevent instrumentation issues, device IDs and user IDs must be strings with a length of 5 characters or more. If an event contains a device ID or user ID that's too short, the ID value is removed from the event. If the event doesn't have a `userId` or `deviceId` value, Amplitude may reject the upload with a 400 status. Override the default minimum length of 5 characters by setting the `minIdLength` config option.
{{/partial:admonition}}

You must initialize the SDK before you can instrument any events. Your Amplitude project's API key is required. You can pass an optional user ID and config object in this call. You can use the SDK anywhere after it's initialized anywhere in an application.

```ts
// Option 1, initialize with API_KEY only
amplitude.init(API_KEY);

// Option 2, initialize with user ID if it's already known
amplitude.init(API_KEY, 'user@amplitude.com');

// Option 3, initialize with configuration
amplitude.init(API_KEY, 'user@amplitude.com', options);
```

## Configure the SDK

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
|`useBatch`| `boolean`. Sets whether to upload events to Batch API instead of the default Http V2 API or not. | `false` |
|`appVersion` | `string`. Sets an app version for events tracked. This can be the version of your application. For example: "1.0.0" | `undefined` |
|`deviceId` | `string`. Sets an identifier for the device running your application. | `UUID()` |
|`cookieExpiration` | `number`. Sets expiration of cookies created in days. | 365 days |
|`cookieSameSite` | `string`. Sets `SameSite` property of cookies created. | `Lax` |
|`cookieSecure` | `boolean`. Sets `Secure` property of cookies created. | `false` |
|`cookieStorage` | `Storage<UserSession>`. Sets a custom implementation of `Storage<UserSession>` to persist user identity. | `MemoryStorage<UserSession>` |
|`cookieUpgrade`| `boolean`. Sets upgrading from cookies created by [maintenance Browser SDK](/docs/sdks/analytics/browser/javascript-sdk). If true, new Browser SDK deletes cookies created by maintenance Browser SDK. If false, Browser SDK keeps cookies created by maintenance Browser SDK. | `true` |
|`disableCookies`| `boolean`. Sets permission to use cookies. If value is `true`, localStorage API is used to persist user identity. | The cookies is enable by default. |
|`domain` | `string`. Sets the domain property of cookies created. | `undefined` |
|`partnerId` | `string`. Sets partner ID. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`. | `undefined` |
|`sessionTimeout` | `number`. Sets the period of inactivity from the last tracked event before a session expires in milliseconds. | 1,800,000 milliseconds (30 minutes) |
|`userId` | `number`. Sets an identifier for the user being tracked. Must have a minimum length of 5 characters unless overridden with the `minIdLength` option. | `undefined` |
|`trackingOptions`| `TrackingOptions`. Configures tracking of additional properties. See the `Optional tracking` section for more information. | Enable all tracking options by default. |

{{/partial:collapse}}

Along with the basic configuration options, you can configure attribution.

{{partial:collapse name="Attribution options"}}
| Name | Description| Default Value|
|---|----|---|
|`config.attribution.disabled`| `boolean`. Whether disable the attribution tracking. | `false` |
|`config.attribution.excludeReferrers`| `string[]`. Exclude the attribution tracking for the provided referrers string | Including all referrers by default. |
|`config.attribution.initialEmptyValue`| `string`. Customize the initial empty value for attribution related user properties to any string value. | `EMPTY` |
|`config.attribution.resetSessionOnNewCampaign`| `boolean`. Whether to reset user sessions when a new campaign is detected. Note a new| `false` |
|`config.attribution.trackNewCampaigns`| `boolean`. Whether tracking new campaigns on the current session. | `false` | 
|`config.attribution.trackPageViews`| `boolean`. Whether track page view on attribution. Note that `config.defaultTracking.pageViews` has higher priority over this configuration. Learn more about it [here](./#tracking-page-views). | `false` |

{{/partial:collapse}}

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. The `track` method queues in memory every event it logs. The SDK flushes events in batches in the background. Customize batch behavior with `flushQueueSize` and `flushIntervalMillis`. By default, the `serverUrl` is `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, set `useBatch` to `true` to set `setServerUrl` to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same events upload threshold and flush time intervals.

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

Configure the server zone when you initialize the client data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

{{partial:admonition type="note" title=""}}
For EU data residency, create your project in and use an API key from Amplitude EU.
{{/partial:admonition}}

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  serverZone: 'EU',
});
```

### Debugging

Control the level of logs the SDK prints to the console with the following `logLevel` settings:

| Log level | Description |
| --------| ------------|
| `none` | Suppresses all log messages |
| `error` | Shows error messages only | 
| `warn` | Default. Shows error and warning messages. |
| `verbose` | Shows informative messages. |
| `debug` | Shows all messages, including function context information for each public method the SDK invokes. Amplitude recommends this log level for development only. |

Set the `logLevel` parameter.

```ts
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  logLevel: amplitude.Types.LogLevel.Warn,
});
```

The default logger outputs log to the developer console. You can provide your own logger implementation based on the `Logger` interface for any customization purpose. For example, collecting any error messages from the SDK in a production environment.

Set the logger by configuring the `loggerProvider` with your own implementation.

```ts
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  loggerProvider: new MyLogger(),
});
```

#### Debug mode

Enable the debug mode by setting the `logLevel` to "Debug", for example:

```ts
amplitude.init(AMPLITUDE_API_KEY, OPTIONAL_USER_ID, {
  logLevel: amplitude.Types.LogLevel.Debug,
});
```

With the default logger, extra function context information is output to the developer console when invoking any SDK public method, including:

- `type`: Category of this context, for example "invoke public method".
- `name`: Name of invoked function, for example "track".
- `args`: Arguments of the invoked function.
- `stacktrace`: Stacktrace of the invoked function.
- `time`: Start and end timestamp of the function invocation.
- `states`: Useful internal states snapshot before and after the function invocation.

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

- Page views
- Sessions
- Form interactions
- File downloads

|Name|Value|Description|
|-|-|-|
`config.defaultTracking.pageViews` | Optional. `boolean` | Enables default page view tracking. If value is `true`, Amplitude tracks page view events on initialization. Default value is `false`.<br /><br />Event properties tracked includes: `[Amplitude] Page Domain`, `[Amplitude] Page Location`, `[Amplitude] Page Path`, `[Amplitude] Page Title`, `[Amplitude] Page URL`<br /><br />See [Tracking page views](#tracking-page-views) for more information.|
`config.defaultTracking.sessions` | Optional. `boolean` | Enables session tracking. If value is `true`, Amplitude tracks session start and session end events. Default value is `false`.<br /><br />See [Tracking sessions](#tracking-sessions) for more information.|
`config.defaultTracking.formInteractions` | Optional. `boolean` | Enables form interaction tracking. If value is `true`, Amplitude tracks form start and form submit events. Default value is `false`.<br /><br />Event properties tracked includes: `[Amplitude]  Form ID`, `[Amplitude] Form Name`, `[Amplitude] Form Destination`<br /><br />See [Tracking form interactions](#tracking-form-interactions) for more information.|
`config.defaultTracking.fileDownloads` | Optional. `boolean` | Enables file download tracking. If value is `true`, Amplitude tracks file download events. Default value is `false`.<br /><br />Event properties tracked includes: `[Amplitude] File Extension`, `[Amplitude] File Name`, `[Amplitude] Link ID`, `[Amplitude] Link Text`, `[Amplitude] Link URL`<br /><br />See [Tracking file downloads](#tracking-file-downloads) for more information.|

Use the following code sample to start tracking all default events. Or, omit the configuration to keep them disabled.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    pageViews: true,
    sessions: true,
    formInteractions: true,
    fileDownloads: true,
  },
});
```

To track all default events, you can also set `config.defaultTracking` to `true`. This setting enables the SDK to track any new default events that Amplitude may add.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: true,
});
```

### Track page views

When you set `config.defaultTracking.pageViews` to true, Amplitude uses default page view tracking behavior. This sends a page view event on initialization and appears in Amplitude as `[Amplitude] Page Viewed`.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    pageViews: true,
  },
});
```

{{partial:admonition type="note" title="Page view event configuration priority"}}
You may notice that both `config.defaultTracking.pageViews` and `config.attribution.trackPageViews` have configurations for whether to enable page view tracking especially when you are using the web attribution plugin. Notice that `config.defaultTracking.pageViews` has higher priority over `config.attribution.trackPageViews` which means that `config.defaultTracking.pageViews` overwrites the setting of the attribution page view event. When `config.attribution.trackPageViews` is enabled, the SDK tracks page view events only when attribution changed. When `config.defaultTracking.pageViews` is enabled, the SDK tracks page view events when page changed.
{{/partial:admonition}}

#### Advanced configuration for tracking page views

Use advanced configuration for better control of when the SDK sends page view events.

|Name|Value|Description|
|-|-|-|
`config.defaultTracking.pageViews.trackOn` | Optional. `"attribution"` or `() => boolean` | Provides advanced control on when page view events are tracked.<br /><br />You can omit or set the value to `undefined`,  and configure page view events to be tracked on initialization.<br /><br />You can set the value to `"attribution"` and configure page view events to be tracked only when web attribution are tracked.<br /><br />You can set the value to a function that returns a boolean (`true` or `false`) and configure page view events to be tracked based on your criteria.|
`config.defaultTracking.pageViews.trackHistoryChanges` | Optional. `"pathOnly"` or `"all"` | Provides advanced control for single page application on when page views are tracked.<br /><br />You can omit or set the value to `"all"`, and configure page view events to be tracked on any navigation change to the URL within your single page application. For example: navigating from `https://amplitude.com/#company` to `https://amplitude.com/#blog`.<br /><br />Set the value to "pathOnly",  and configure page view events to be tracked on navigation change to the URL path only within your single page application. For example: navigating from `https://amplitude.com/company` to `https://amplitude.com/blog`.|
`config.defaultTracking.pageViews.eventType` | Optional. `string` | Customize the `event_type` for page view event. |

For example, you can configure Amplitude to track page views only when the URL path contains a certain substring, for example `home`. 

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

Amplitude tracks the following information with page view events.

|Name| Description| Default Value|
|---|----|---|
|`event_type`| `string`. The event type for page view event. Configurable through `defaultTracking.pageViews.eventType` or enrichment plugin. | `[Amplitude] Page Viewed` from version 1.9.1. |
|`event_properties.[Amplitude] Page Domain`| `string`. The page domain. | location.hostname or ''. |
|`event_properties.[Amplitude] Page Location`| `string`. The page location. | location.href or ''. |
|`event_properties.[Amplitude] Page Path`| `string`. The page path. | location.path or ''.|
|`event_properties.[Amplitude] Page Title`| `string`. The page title. | document.title or ''.|
|`event_properties.[Amplitude] Page URL`| `string`. The value of page URL. | location.href.split('?')[0] or ``.|
|`event_properties.${CampaignParam}`| `string`. The value of `UTMParameters` `ReferrerParameters` `ClickIdParameters` if has any. Check [here](./#tracking-default-events) for the possible keys. | Any undefined `campaignParam` or `undefined`. |

Check [this example](https://github.com/amplitude/Amplitude-TypeScript/blob/main/examples/plugins/page-view-tracking-enrichment/index.ts) to understand how to enrich default page view events, such as adding more properties along with page view tracking.

For more information, see [this example](https://github.com/amplitude/Amplitude-TypeScript/blob/main/examples/plugins/page-view-tracking-enrichment/index.ts) to understand how to enrich default page view events, such as adding more properties along with page view tracking.

### Track sessions

Set `config.defaultTracking.sessions` to `true` to enable Amplitude to track sessions.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    sessions: true,
  },
});
```

A session is the period of time a user has your website open. See [How Amplitude defines sessions](/docs/cdp/sources/instrument-track-sessions) for more information. When a new session starts, Amplitude tracks a session start event is and is the first event of the session. The event type for session start is `[Amplitude] Start Session`. When an existing session ends, Amplitude tracks `[Amplitude] End Sessions`, which is the last event of the session.

### Track form interactions

Set `config.defaultTracking.formInteractions` to `true` to enable Amplitude to track form interactions.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    formInteractions: true,
  },
});
```

Amplitued tracks `[Amplitude] Form Started` when the user initially interacts with the form. An initial interaction can be the first change to a text input, radio button, or dropdown.

Amplitude tracks `[Amplitude] Form Submitted` when the user submits the form. If the user submits a form with no initial change to any form fields, Amplitude sends both `[Amplitude] Form Started` and `[Amplitude] Form Submitted` events.

Amplitude can track forms that built with `<form>` tags and `<input>` tags nested. For example:

```html
<form id="subscriber-form" name="subscriber-form" action="/subscribe">
  <input type="text" />
  <input type="submit" />
</form>
```

### Track file downloads

Set `config.defaultTracking.fileDownloads` to `true` to enable Amplitude to track file downloads.

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  defaultTracking: {
    fileDownloads: true,
  },
});
```

Amplitude tracks a file download event when an anchor or `<a>` tag linked to a file is clicked. The event type for file download is `[Amplitude] File Downloaded`. Amplitude determines that the anchor or `<a>` tag linked to a file if the file extension matches the following regex:

`pdf|xlsx?|docx?|txt|rtf|csv|exe|key|pp(s|t|tx)|7z|pkg|rar|gz|zip|avi|mov|mp4|mpe?g|wmv|midi?|mp3|wav|wma`

## User properties

User properties are details like device details, user preferences, or language to help you understand your users at the time they performed an action in your app.

Identify is for setting the user properties of a particular user without sending any event. The SDK supports the operations `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove` on individual user properties. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object. The Identify object is then passed to the Amplitude client to send to the server.

{{partial:admonition type="note" title=""}}
If you send the Identify call is sent after the event, the results of operations are visible immediately in the dashboard user’s profile area. However, they don't appear in chart results until another event is sent after the Identify call. The identify call only affects events going forward. More details [here](/docs/data/user-properties-and-events#applying-user-properties-to-events).

{{/partial:admonition}}

### Set a user property

The Identify object provides controls over setting user properties. It works like this: first, instantiate an Identify object, then call Identify methods on it, and finally, the client can make a call with the Identify object.

```ts
const identifyEvent = new amplitude.Identify();
amplitude.identify(identifyEvent);
```

### Identify.set

This method sets the value of a user property. For example, you can set a role property of a user.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.set('location', 'LAX');

amplitude.identify(identifyEvent);
```

### Identify.setOnce

This method sets the value of a user property only one time. Subsequent calls using `setOnce()` are ignored. For example, you can set an initial login method for a user and because only the initial value is tracked, `setOnce()` ignores later calls.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.setOnce('initial-location', 'SFO');

identify(identifyEvent);
```

### Identify.add

This method increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before it's incremented. For example, you can track a user's travel count.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.add('travel-count', 1);

amplitude.identify(identifyEvent);
```

### Arrays in user properties

You can use arrays as user properties. Directly set arrays or use `prepend`, `append`, `preInsert` and `postInsert` to generate an array.

### Identify.prepend

This method prepends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
const identifyEvent = new Identify();
identifyEvent.prepend('visited-locations', 'LAX');

identify(identifyEvent);
```

### Identify.append

This method appends a value or values to a user property array. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are prepended.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.append('visited-locations', 'SFO');

amplitude.identify(identifyEvent);
```

### Identify.preInsert

This method pre-inserts a value or values to a user property if it doesn't exist in the user property yet. Pre-insert means inserting the values at the beginning of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, this method is a no-op.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.preInsert('unique-locations', 'LAX');

identify(identifyEvent);
```

### Identify.postInsert

This method post-inserts a value or values to a user property if it doesn't exist in the user property yet. Post-insert means inserting the values at the end of a given list. If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are post-inserted. If the user property has an existing value, this method is a no-op..

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.postInsert('unique-locations', 'SFO');

amplitude.identify(identifyEvent);
```

### Identify.remove

This method removes a value or values to a user property if it exists in the user property. Remove means remove the existing values from the given list. If the user property has an existing value, this method is a no-op.

```ts
const identifyEvent = new amplitude.Identify();
identifyEvent.remove('unique-locations', 'JFK')

amplitude.identify(identifyEvent);
```

## User groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to tell that a user is in multiple groups.

{{partial:admonition type="example" title=""}}
If Joe is in 'orgId' '15', then the `groupName` would be '15'.

```ts
// set group with a single group name
amplitude.setGroup('orgId', '15');
```

If Joe is in 'sport' 'soccer' and 'tennis', then the `groupName` would be '["tennis", "soccer"]'.

```ts
// set group with multiple group names
amplitude.setGroup('sport', ['soccer', 'tennis']);
```
{{/partial:admonition}}

You can also set **event-level groups** by passing an `Event` Object with `groups` to `track`. With event-level groups, the group designation applies only to the specific event being logged, and doesn't persist on the user unless you explicitly set it with `setGroup`.

```ts
amplitude.track({
  event_type: 'event type',
  event_properties: { eventPropertyKey: 'event property value' },
  groups: { 'orgId': '15' }
})
```

## Track revenue

The preferred method of tracking revenue for a user is to use `revenue()` in conjunction with the provided Revenue interface. Revenue instances store each revenue transaction and allow you to define several special revenue properties (such as 'revenueType' and 'productIdentifier') that are used in Amplitude's Event Segmentation and Revenue LTV charts. These Revenue instance objects are then passed into `revenue()` to send as revenue events to Amplitude. This lets automatically display data relevant to revenue in the platform. You can use this to track both in-app and non-in-app purchases.

<!--vale on-->

To track revenue from a user, call revenue each time a user generates revenue. In this example, 3 units of a product were purchased at $3.99.

```ts
const event = new amplitude.Revenue()
  .setProductId('com.company.productId')
  .setPrice(3.99)
  .setQuantity(3);

amplitude.revenue(event);
```

### Revenue interface

| Name  | Description | Default Value |
| --- | --- | --- |
|`product_id` | Optional. `string`. An identifier for the product. Amplitude recommend something like the Google Play Store product ID. | Empty string. |
|`quantity` | Required. `number`. The quantity of products purchased. Note: revenue = quantity * price. | `1` |
|`price` | Required. `number`. The price of the products purchased, and this can be negative. Note: revenue = quantity * price. | `null` |
|`revenue_type` | Optional, but required for revenue verification. `string`. The revenue type (for example, tax, refund, income). | `null` |
|`receipt`| Optional. `string`. The receipt identifier of the revenue. | `null` |
|`receipt_sig`| Optional, but required for revenue verification. `string`. The receipt signature of the revenue. | `null` |
|`properties`| Optional. `{ [key: string]: any }`. An object of event properties to include in the revenue event. | `null` |

## Flush the event buffer

The `flush` method triggers the client to send buffered events immediately.

```ts
amplitude.flush();
```

By default, `flush` is called automatically in an interval, if you want to flush the events altogether, you can control the async flow with the optional Promise interface, for example:

```ts
amplitude.init(API_KEY).promise.then(function() {
  amplitude.track('Button Clicked');
  amplitude.flush();
});
```

## Custom user ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

```ts
amplitude.setUserId('user@amplitude.com');
```

You can also assign the User ID as an argument to the init call.

```ts
amplitude.init(API_KEY, 'user@amplitude.com');
```

## Custom session ID

You can assign a new Session ID using `setSessionId`. When setting a custom session ID, make sure the value is in milliseconds since epoch (Unix Timestamp).

```ts
amplitude.setSessionId(Date.now());
```

## Custom device ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

You can assign a new device ID using `deviceId`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```ts
amplitude.setDeviceId(uuid());
```

## Reset when a user logs out

`reset` is a shortcut to anonymize users after they log out, by:

* setting `userId` to `undefined`
* setting `deviceId` to a new UUID value

With an undefined `userId` and a completely new `deviceId`, the current user would appear as a brand new user in dashboard.

```ts
amplitude.reset();
```

## Opt users out of tracking

You can turn off logging for a given user by setting `setOptOut` to `true`.

```ts
amplitude.setOptOut(true);
```

Events aren't saved or sent to the server while `setOptOut` is enabled, and the setting persists across page loads. 

Re-enable logging by setting `setOptOut` to `false`.

```ts
amplitude.setOptOut(false);
```

## Optional tracking

By default, the SDK tracks these properties automatically. You can override this behavior by passing a configuration called `trackingOptions` when initializing the SDK, setting the appropriate options to false.

| Tracking Options | Default |
| --- | --- |
| `deviceManufacturer` | `true` |
| `deviceModel` | `true` |
| `ipAddress` | `true` |
| `language` | `true` |
| `osName` | `true` |
| `osVersion` | `true` |
| `platform` | `true` |

```ts
amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  trackingOptions: {
    deviceManufacturer: false,
    deviceModel: false,
    ipAddress: false,
    language: false,
    osName: false,
    osVersion: false,
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

Plugins allow you to extend Amplitude SDK's behavior by, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type). A plugin is an object with methods `setup()` and `execute()`.

### `add`

The `add` method adds a plugin to Amplitude. Plugins can help processing and sending events.

```ts
amplitude.add(new Plugin());
```

### `remove`

The `remove` method removes the given plugin name from the client instance if it exists.

```ts
amplitude.remove(plugin.name);
```

### Create your custom plugin

#### Plugin.setup

This method contains logic for preparing the plugin for use and has config as a parameter. The expected return value is undefined. A typical use for this method, is to copy configuration from config or instantiate plugin dependencies. This method is called when the plugin is registered to the client via `amplitude.add()`.

#### Plugin.execute

This method contains the logic for processing events and has event as parameter. If used as enrichment type plugin, the expected return value is the modified/enriched event. If used as a destination type plugin, the expected return value is a map with keys: `event` (BaseEvent), `code` (number), and `message` (string). This method is called for each event that's instrumented using the client interface, including Identify, GroupIdentify and Revenue events.

### Plugin examples

#### Destination type plugin

Here's an example of a plugin that sends each event that's instrumented to a target server URL using your preferred Http client.

```ts
function myDestinationPlugin (serverUrl) {
  const name = 'my-destination-plugin';
  const type = amplitude.Types.PluginType.DESTINATION;
  let amplitudeConfig;
  
  /**
   * setup() is called on plugin installation
   * example: amplitude.add(new myDestinationPlugin());
   */
  const setup = function (config) {
    amplitudeConfig = config;
  }

  /**
   * execute() is called on each event instrumented
   * example: amplitude.track('New Event');
   */
  const execute = function (event) {
    const payload = {
      key: 'secret',
      data: event,
    };
    return fetch(this.serverUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
      },
      body: JSON.stringify(payload),
    }).then(function(response) {
      return {
        code: response.status,
        event: event,
        message: response.statusText,
      };
    });
  }

  return {
    name,
    type,
    setup,
    execute,
  },
}

amplitude.init(API_KEY);
amplitude.add(myDestinationPlugin('https://custom.domain.com'));
```

#### Enrichment type plugin

Here's an example of a plugin that modifies each event that's instrumented by adding an increment integer to `event_id` property of an event starting from 100.

```ts
const addEventIdPlugin = () => {
  const name = 'add-event-id';
  const type = amplitude.Types.PluginType.ENRICHMENT;
  let currentId = 100;
  let amplitudeConfig;

  /**
   * setup() is called on plugin installation
   * example: amplitude.add(new AddEventIdPlugin());
   */
  const setup = function (config) {
    amplitudeConfig = config;
  }

  /**
   * execute() is called on each event instrumented
   * example: client.track('New Event');
   */
  const execute = function (event: Event) {
    event.event_id = currentId++;
    return event;
  }

  return {
    name,
    type,
    setup,
    execute,
  }
}

amplitude.init(API_KEY);
amplitude.add(addEventIdPlugin());
```

#### Web attribution enrichment plugin

Download the `plugin-web-attribution-browser` package and add the `webAttributionPlugin` before you call the `init` method. 


{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/plugin-web-attribution-browser
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/plugin-web-attribution-browser
```
{{/partial:tab}}
{{/partial:tabs}}

Add the plugin to the Amplitude instance.

```ts
amplitude.add(webAttributionPlugin());
amplitude.init(API_KEY);
```

See the [configuration options](/docs/sdks/analytics/browser/marketing-analytics-sdk#configuration).

Learn more about what the [Web Attribution Plugin](/docs/sdks/analytics/browser/marketing-analytics-sdk#web-attribution) supports.

##### Differences from the base SDK

Enabling the Attribution plugin overwrites the default attribution tracking behavior of the SDK.

The SDK’s built in attribution tracking only tracks attribution at the start of sessions. This mean if a user re-enters the site through a new campaign channel (such as direct or an ad) in the middle of a session, this new channel isn't recorded.

If the `trackNewCampaigns` option is set to `true`, the campaigns are tracked, and the user’s session is reset when a new campaign is detected.

The Attribution plugin tracks all campaigns, regardless of whether the user is at the start of a session.

Set the `resetSessionOnNewCampaign` option to `true` to cause the user’s session to be reset when a new campaign is detected. The session isn't reset in the case where the referrer is just a different subdomain of your site.

#### Page view enrichment plugin

Download the `plugin-page-view-tracking-browser` and add `pageViewTrackingPlugin` before calling the init method.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/plugin-page-view-tracking-browser
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/plugin-page-view-tracking-browser
```
{{/partial:tab}}
{{/partial:tabs}} 

Add plugin to the Amplitude instance.

```ts
amplitude.add(pageViewTrackingPlugin());
amplitude.init(API_KEY);
```

See the [configuration options](/docs/sdks/analytics/browser/marketing-analytics-sdk#configuration).
Learn more about what the [Page View Plugin](/docs/sdks/analytics/browser/marketing-analytics-sdk#page-view) supports.

##### Differences from base SDK

The base SDK sends Page View events when a user’s campaign is tracked if the `attribution.trackPageViews` option is set to `true`.

The page view plugin sends a Page View event on each page a user visits by default. It also offers options to customize this behavior.

## Troubleshooting and debugging

Debugging in a browser can help you identify problems related to your code's implementation, as well as potential issues within the SDKs you're using. Here's a basic guide on how to use the browser's built-in Developer Tools (DevTools) for debugging.

### Console

You can find JavaScript errors under **Inspect > Console**, which might have the details about the line of code and file that caused the problem. The console also allows you to execute JavaScript code in real time.

* Enable debug mode by following these [instructions](#debug-mode). Then With the default logger, extra function context information will be output to the developer console when any SDK public method is invoked, which can be helpful for debugging.

* Amplitude supports SDK deferred initialization. Events tracked before initialization will be dispatched after the initialization call. If you cannot send events but can send the event successfully after entering `amplitude.init(API_KEY, 'USER_ID')` in the browser console, it indicates that your `amplitude.init` call might not have been triggered in your codebase or you aren't using the correct Amplitude instance during initialization."

### Network Request

Use the **Inspect > Network** tab to view all network requests made by your page. Search for the Amplitude request.

Check the response code and ensure that the response payload is as expected.

### Instrumentation Explorer/Chrome Extension

The Amplitude Instrumentation Explorer is an extension available in the Google Chrome Web Store. The extension captures each Amplitude event you trigger and displays it in the extension popup. It's important to ensure that the event has been sent out successfully and to check the context in the event payload.

Check [here](/docs/analytics/debug-analytics#step-2-analyze-the-event-stream) for more details.

## Common Issues

The following are common issues specific to Browser SDK. For additional general common issues, see [SDK Troubleshooting and Debugging](/docs/sdks/sdk-debugging).

### AD Blocker

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

### Cookies related

Here is the [information](#cookie-management) SDK stored in the cookies. This means that client behavior, like disabling cookies or using a private browser/window/tab, will affect the persistence of these saved values in the cookies. If these values aren't persistent or aren't increasing by one, that could be the reason.

### CORS

Cross-Origin Resource Sharing (CORS) is a security measure implemented by browsers to restrict how resources on a web page can be requested from a different domain. It might cause this issue if you used `setServerURL`.

```Access to fetch at 'xxx' from origin 'xxx' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.```

Cross-origin resource sharing (CORS) prevents a malicious site from reading another site's data without permission. The error message suggests that the server you're trying to access isn't allowing your origin to access the requested resource. This is due to the lack of the `Access-Control-Allow-Origin` header in the server's response.

* If you have control over the server, you can "Update the server's CORS policy". Add the `Access-Control-Allow-Origin` header to the server's responses. This would allow your origin to make requests. The value of `Access-Control-Allow-Origin` can be * to allow all origins, or it can be the specific URL of your web page.

* If you don't have control over the server, you can set up a proxy server that adds the necessary CORS headers. The web page makes requests to the proxy, which then makes requests to the actual server. The proxy adds the `Access-Control-Allow-Origin` header to the response before sending it back to the web page.

If you have set up an API proxy and run into configuration issues related to that on a platform you’ve selected, that’s no longer an SDK issue but an integration issue between your application and the service provider.

### Events fired but no network requests

If you [set the logger to "Debug" level](#debug-mode), and see track calls in the developer console, the `track()` method has been called. If you don't see the corresponding event in Amplitude, the Amplitude Instrumentation Explorer Chrome extension, or the network request tab of the browser, the event wasn't sent to Amplitude. Events are fired and placed in the SDK's internal queue upon a successful `track()` call, but sometimes these queued events may not send successfully. This can happen when an in-progress HTTP request is cancelled. For example, if you close the browser or leave the page.

There are two ways to address this issue:

1. If you use standard network requests, set the transport to `beacon` during initialization or set the transport to `beacon` upon page exit. `sendBeacon` doesn't work in this case because it sends events in the background, and doesn't return server responses like `4xx` or `5xx`. As a result, it doesn't retry on failure. `sendBeacon` sends only scheduled requests in the background. For more information, see the [sendBeacon](./#use-sendbeacon) section.

2. To make track() synchronous, [add the `await` keyword](./#callback) before the call.

## Advanced topics

### Cross-domain tracking

You can track anonymous behavior across two different domains. Amplitude identifies anonymous users by their device IDs which must be passed between the domains. For example:

* Site 1: `www.example.com`
* Site 2: `www.example.org`

Users who start on Site 1 and then navigate to Site 2 must have the device ID generated from Site 1 passed as a parameter to Site 2. Site 2 then needs to initialize the SDK with the device ID.

The SDK can parse the URL parameter automatically if `deviceId` is in the URL query parameters.

1. From Site 1, grab the device ID from `getDeviceId()`.
2. Pass the device ID to Site 2 via a URL parameter when the user navigates. (for example: `www.example.com?deviceId=device_id_from_site_1`)
3. Initialize the Amplitude SDK on Site 2 with `init('API_KEY', null)`.

If the `deviceId` isn't provided with the `init` like `init('API_KEY', null, { deviceId: 'custom-device-id' })`, then it automatically fallbacks to using the URL parameter.

### Custom Http client

You can provide an implementation of `Transport` interface to the `transportProvider` configuration option for customization purpose, for example, sending requests to your proxy server with customized Http request headers.

```ts
class MyTransport {
  send(serverUrl, payload) {
    // check example: https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-client-common/src/transports/fetch.ts
  }
}

amplitude.init(API_KEY, OPTIONAL_USER_ID, {
  transportProvider: new MyTransport(),
});
```

### Use sendBeacon

Unlike standard network requests, sendBeacon sends events in the background, even if the user closes the browser or leaves the page.

{{partial:admonition type="warning" title=""}}
`sendBeacon` sends events in the background, which means events dispatched from `sendBeacon` don't return a server response and can't be retried when they encounter failures like 4xx or 5xx errors. You can address these retry issues by sending one event/request, but this could increase the network load and the likelihood of throttling.
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

Amplitude recommends adding your own event listener for `pagehide` event.

```ts
window.addEventListener('pagehide',
  () => {
    amplitude.setTransport('beacon') 
    // Sets https transport to use `sendBeacon` API
    amplitude.flush()
  },
);
```

### Content security policy (CSP)

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
|Name| Description|
|---|----|
|`optOut`|<span class="required">Required</span>. A flag to opt this device out of Amplitude tracking. If this flag is set, no additional information will be stored for the user|
|`userId`|Upon user log-in, if you send this value, it is stored in the cookie. Set this to uniquely identify their users (non-anonymous navigation). It is stored encoded using Base64|
|`deviceId`|A randomly generated string. It will persist unless a user clears their browser cookies and/ or is browsing in private mode. Even if a user consistently uses the same the device and browser, the device ID can still vary|
|`sessionId`|A randomly generated string for each session|
|`lastEventTime`|Time of the last event, used to determine when to expire and create a new session Id|
|`lastEventId`|Id of the last event|

{{/partial:collapse}}

{{partial:collapse name="Marketing campaign cookies"}}
|Name| Description|
| --- | --- |
|`utm_campaign`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_content` | This identifies what brought the user to the site and is commonly used for A/B testing (for example, "banner-link", "text-link") |
|`utm_id`|An optional parameter for tracking unique IDs or transaction IDs associated with the link.|
|`utm_medium`| This identifies a specific campaign used (for example, "summer_sale") |
|`utm_source`| This identifies which website sent the traffic (for example, Google, Facebook) |
|`utm_term`| This identifies paid search terms used (for example, product+analytics) |
|`referrer`|The last page the user was on (for example, `https://amplitude.com/behavioral-analytics-platform?ref=nav`)|
|`referring_domain`|The domain that the user was last on (for example, `https://amplitude.com`)|
|`dclid`|Google campaign manager Click Identifier|
|`gbraid`|Google Click Identifier for iOS device from Web to App|
|`gclid`|Google Click Identifier from URL parameters|
|`fbclid`|Facebook Click Identifier from URL parameters|
|`ko_click_id`|Kochava Click Identifier from URL parameters|
|`msclkid`|Microsoft Click Identifier|
|`ttclid`|TikTok Click Identifier|
|`twclid`|Twitter Click Identifier from URL parameter|
|`wbraid`|Google Click Identifier for iOS device from App to Web|
|`li_fat_id`|LinkedIn member indirect identifier for Members for conversion tracking, retargeting, analytics|
|`rtd_cid`|Reddit Click Identifier| 

{{/partial:collapse}}

#### Disable cookies

You can opt-out of using cookies by setting `disableCookies` to `true` so that the SDK will use `LocalStorage` instead. `LocalStorage` is a great alternative, but because access to `LocalStorage` is restricted by subdomain, you can't track anonymous users across subdomains of your product (for example: `www.amplitude.com` vs `analytics.amplitude.com`).

### Device ID lifecycle

The SDK initializes the device ID in the following order, with the device ID being set to the first valid value encountered:

1. Device id in configuration on initialization
2. "deviceId" value from URL param, for example `http://example.com/?deviceId=123456789`. See  [cross domain tracking](#cross-domain-tracking) for more details
3. Device id in cookie storage. Refer to [cookie management](#cookie-management) for more details
4. Device id in cookie storage of Browser SDK. Refer to [cookie management](/docs/sdks/analytics/browser/browser-sdk-2#cookie-management) for more details
5. A randomly generated 36-character UUID

#### When does a device ID change

A device ID changes in many scenarios:

{{partial:admonition type="note" title="Amplitude Analytics SDKs share an identity store with Experiment SDKS"}}
`setDeviceId` also updates the identity store to propagate new user info to experiment SDK and trigger a fetch if device ID has changed.
{{/partial:admonition}}

- `setDeviceId()` is called explicitly
-  By default the SDK stores device IDs in cookies, so a device ID will change if a user clears cookies, uses another device, or uses privacy mode
- On initialization, a device ID is passed in from URL param `deviceId`
- `reset()` is called

#### Custom device ID

You can assign a new device ID using `setDeviceId()`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```ts
amplitude.setDeviceId(uuid());
```

#### Get device ID

You can use the helper method `getDeviceId()` to get the value of the current `deviceId`.

```ts
const deviceId = amplitude.getDeviceId();
```
