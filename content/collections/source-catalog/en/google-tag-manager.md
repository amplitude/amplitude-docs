---
id: 7d5c2ee4-29ff-45be-8e6e-0bfd213412d3
blueprint: source-catalog
use_cases:
  - "The use case with Google Tag Manager involves simplifying website tracking and measurement by allowing users to add, update, and manage tags for conversion tracking, site analytics, remarketing, and more, without requiring coding knowledge. This empowers businesses to track their website's performance, gain valuable insights into user behavior, and enhance their online presence."
  - 'Streaming events directly to Google Tag Manager enables businesses to leverage its advertising and analytics platform to track and measure website activity in real-time. This integration facilitates the seamless transmission of event data from various sources to Google Tag Manager, providing businesses with immediate access to actionable insights for optimizing their marketing strategies and improving user engagement.'
short_description: 'Google Tag Manager is a free, unified advertising and analytics platform for the web.'
integration_category:
  - marketing-analytics
integration_type:
  - raw-events
  - event-streaming
title: 'Google Tag Manager (client)'
source: 'https://www.docs.developers.amplitude.com/data/sources/google-tag-manager'
category: 'Marketing Analytics'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/google-tag-manager.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719615487
package_name: 'Amplitude Analytics Browser SDK'
bundle_url: 'https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-browser-sdk-gtm-template'
github_link: 'https://github.com/amplitude/amplitude-browser-sdk-gtm-template'
---
This is the client-side Google Tag Manager Template for Amplitude Analytics. The tag uses the [Amplitude Browser SDK 2.0](/docs/sdks/analytics/browser/browser-sdk-2/) for data collection.

{{partial:admonition type="warning" title="Breaking Changes Checklist from the version 240a7, Aug, 2023"}}
Starting from the version `240a7`, August, 2023, this template uses [Amplitude Browser SDK 2.0](/docs/sdks/analytics/browser/browser-sdk-2/) instead of [Marketing Analytics SDK(Deprecated)](/docs/sdks/analytics/browser/marketing-analytics-sdk/), offering better support, enhanced functionality, and additional features. 
 
While this updated template offers additional features and improvements, it may result in different behavior that could affect your existing analytics charts. You can enable or disable these changes keep consistency. If you wish to retain the legacy behavior, it's essential to review the following [list of breaking changes](#breaking-changes-checklist) and adjust your configuration.

Check the breaking changes checklist at [here](#breaking-changes-checklist).
{{/partial:admonition}}

{{partial:admonition type="note" title=""}}
Ensure to consistently update your Amplitude GTM template to the latest version for an enhanced feature set, crucial bug fixes, and a significantly improved user experience.
{{/partial:admonition}}

## Create a container

If you're working on a new implementation, configure your container first.

1. Name the container using your site's URL.
2. Select the `Web` target platform.
3. Click *Create*.

## Add the template

From the Workspace tab, click *Templates*. In the *Tag Templates* section, click *Search Gallery*. Search for `Amplitude` and select *Amplitude Analytics Browser SDK*. Click *Add to workspace*, and confirm adding the community template.

## Create tags

Navigate to the *Tags* tab. Click *New*, and select the Amplitude Analytics Browser SDK template.

## Configure the tag

### Instance name

If you plan to run more than one Amplitude instance, each with distinct API keys or initialization options, assign an `Instance Name` to each one. Amplitude links tags with the same `Instance Name` and uses the API key of the Initialization tag for that `Instance Name`.

{{partial:admonition type="note" heading=""}}
This approach can also prevent missing events if different versions of the Amplitude SDK coexist in your system.
{{/partial:admonition}}

You can access `amplitude` instance in a Custom HTML tag.

```js
// For amplitude-js-gtm@3.1.4 and above
amplitudeGTM.getDeviceId();

// Others
amplitude.getDeviceId();
```

#### With customized instance name

```js
// For amplitude-js-gtm@3.1.4 and above
amplitudeGTM._iq["yourInstanceName"].getDeviceId();

// Others
amplitude._iq["yourInstanceName"].getDeviceId();
```

## Select a tag type

A tag type allows you to specify the type of action or event to track in your application. The following tag types are supported in Amplitude GTM template.

### Initialize

{{partial:admonition type="note" title=""}}
`init` operates as a separate tag type that you need to create. Although Amplitude provides deferred initialization, events aren't sent to Amplitude until the `init` fires.
{{/partial:admonition}}

Amplitude generates cookies at the initialization stage. For more information on managing cookies, see the [cookie management details](/docs/sdks/analytics/browser/browser-sdk-2#cookie-management). Amplitude recommends that you initialize after obtaining cookie consent. Amplitude supports deferred initialization, and captures any events that take place before the `init` command.

#### API Key

Copy your Amplitude project API Key in the API Key field. For EU residency, your project API Key is under `analytics.eu.amplitude.com`. Each project has different API Key, make sure you are copy the API Key from the right project. Go to **Settings -> Projects -> click the right project name from the list** to find your project API Key. For more information, see [API Authentication(/docs/apis/authentication).

#### Autocapture options

Enable *Autocapture events* to enable autocapture for the following event types:

- Track Marketing Attribution
- Track Page Views
- Track Sessions
- Track Form Interactions
- Track File Downloads
- Track Element Interactions

For more information, see [Browser SDK 2 | Autocapture](/docs/sdks/analytics/browser/browser-sdk-2#autocapture)

| Name                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Default Value |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Initial Empty Value`           | `string`. Customize the initial empty value for attribution related user properties to any string value.                                                                                                                                                                                                                                                                                                                                                                                                  | `EMPTY`       |
| `Exclude Referrers`             | `string` or `string1, string2`. The `referring_domain` you want to exclude the attribution tracking. If you exclude a `referring_domain`, it doesn't track web attribution, and maps to `(none)` in chart analysis. By default, it also excludes a referral section to track attribution of all subdomains of the input domain. See [Subdomain attribution tracking](#subdomain-attribution-tracking) for more information. | `[]`          |
| `Reset session on new campaign` | `boolean`. Configures Amplitude to start a new session if any campaign parameter changes. | `false`       |

##### Page view tracking

Check this box to enable page view tracking. The following configurations are available page view tracking options. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#tracking-page-views).

{{partial:collapse name="Default configurations"}}
| Name                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Default Value                                                                                                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Use the legacy page view properties` | `check box`. Whether use the legacy page view properties. [More Details](./#breaking-changes-checklist).                                                                                                                                                                                                                                                                                                                                                                           | `Enabled`. Use the latest page view event type and properties as in [Amplitude Browser 2.0](/docs/sdks/analytics/browser/browser-sdk-2/#tracking-page-views). |
| `Page View Type`                      | `string`. The event type for page view event.                                                                                                                                                                                                                                                                                                                                                                                                                                      | `[Amplitude] Page Viewed`                                                                                                                                     |
| `Page View trigger`                   | `Page Loads` or `Only with Attribution changes` or a `Variable Configuration`.  The trigger of page view event. A variable configuration can be either build-in or customized that returns a function with a true or false return value. If the function returns true, then Page Views are tracked automatically, if it returns false then Page Views are not tracked. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#advanced-configuration-for-tracking-page-views). | `Page Loads` if enable page view tracking.                                                                                                                    |
| `Track history events automatically`  | `All history changes` or `Only when page path changes`. Whether to track history events. This is for tracking page view on SPA. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2#advanced-configuration-for-tracking-page-views).                                                                                                                                                                                                                                         | `All history changes`                                                                                                                                         |

{{/partial:collapse}}

##### Session tracking

Check this box to enable sessions tracking. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#tracking-sessions).

###### Form interaction tracking

Check this box to enable form interactions tracking. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#tracking-form-interactions).

###### File downloads tracking

Check this box to enable file downloads tracking. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#tracking-file-downloads).
    

#### EU data residency

For EU data residency, create your project inside Amplitude EU and use the API key from Amplitude EU. You can configure the server zone by checking the checkbox **EU Data Residency** under **Tag Configuration** -> **Initialization** of the `init` tag. The initialization section only shows up when tag type is set to `init`. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2#eu-data-residency).

#### User ID

If the user ID is already available you can:

- Initialize the instance with it by inputting it in the "User ID" input box of the `init` tag
- Use the `setUserId` tag type to set the use ID at a later time. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#custom-user-id).

#### Configuration

Choose from the following options:

- `Use default values`. The initialization uses each configuration option's default value.
- `Set configuration manually`. Set By selecting the corresponding option. The following configurations are the available ones with the value type in GTM template.
- `Select a **GTM variable** from the list`. It's necessary to return an object containing the key-value pairs you wish to use for instance configuration. Ensure that the keys are part of the available configurations.

{{partial:collapse name="Configuration options"}}
| Name                  | Description                                                                                                                                                                                                                                                                    | Default Value                           |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| `instanceName`        | `string`. The instance name.                                                                                                                                                                                                                                                   | `$default_instance`                     |
| `flushIntervalMillis` | `number`. Sets the interval of uploading events to Amplitude in milliseconds.                                                                                                                                                                                                  | 1,000 (1 second)                        |
| `flushQueueSize`      | `number`. Sets the maximum number of events that are batched in a single upload attempt.                                                                                                                                                                                       | 30 events                               |
| `flushMaxRetries`     | `number`. Sets the maximum number of retries for failed upload attempts. This is only applicable to retryable errors.                                                                                                                                                          | 5 times.                                |
| `logLevel`            | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. Sets the log level.                                                                                                                                                          | `LogLevel.Warn`                         |
| `loggerProvider `     | `Logger`. Sets a custom `loggerProvider` class from the Logger to emit log messages to desired destination.                                                                                                                                                                    | `Amplitude Logger`                      |
| `minIdLength`         | `number`. Sets the minimum length for the value of `userId` and `deviceId` properties.                                                                                                                                                                                         | `5`                                     |
| `optOut`              | `boolean`. Sets permission to track events. Setting a value of `true` prevents Amplitude from tracking and uploading events.                                                                                                                                                   | `false`                                 |
| `serverUrl`           | `string`. Sets the URL where events are upload to.                                                                                                                                                                                                                             | `https://api2.amplitude.com/2/httpapi`  |
| `serverZone`          | `EU` or  `US`. Sets the Amplitude server zone. Set this to `EU` for Amplitude projects created in `EU` data center.                                                                                                                                                            | `US`                                    |
| `useBatch`            | `boolean`. Sets whether to upload events to Batch API instead of the default HTTP V2 API or not.                                                                                                                                                                               | `false`                                 |
| `appVersion`          | `string`. Sets an app version for events tracked. This can be the version of your application. For example: "1.0.0"                                                                                                                                                            | `undefined`                             |
| `deviceId`            | `string`. Sets an identifier for the device running your application.                                                                                                                                                                                                          | `UUID()`                                |
| `cookieExpiration`    | `number`. Sets expiration of cookies created in days.                                                                                                                                                                                                                          | 365 days                                |
| `cookieSameSite`      | `string`. Sets `SameSite` property of cookies created.                                                                                                                                                                                                                         | `Lax`                                   |
| `cookieSecure`        | `boolean`. Sets `Secure` property of cookies created.                                                                                                                                                                                                                          | `false`                                 |
| `cookieStorage`       | `Storage<UserSession>`. Sets a custom implementation of `Storage<UserSession>` to persist user identity.                                                                                                                                                                       | `MemoryStorage<UserSession>`            |
| `cookieUpgrade`       | `boolean`. Sets upgrading from cookies created by [maintenance Browser SDK](/docs/sdks/analytics/browser/javascript-sdk). If true, new Browser SDK deletes cookies created by maintenance Browser SDK. If false, Browser SDK keeps cookies created by maintenance Browser SDK. | `true`                                  |
| `disableCookies`      | `boolean`. Sets permission to use cookies. If value is `true`, `localStorage` API is used to persist user identity.                                                                                                                                                              | The cookies is enable by default.       |
| `domain`              | `string`. Sets the domain property of cookies created.                                                                                                                                                                                                                         | `undefined`                             |
| `partnerId`           | `string`. Sets partner ID. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`.                                                                                                                             | `undefined`                             |
| `sessionTimeout`      | `number`. Sets the period of inactivity from the last tracked event before a session expires in milliseconds.                                                                                                                                                                  | 1,800,000 milliseconds (30 minutes)     |
| `userId`              | `number`. Sets an identifier for the tracked user. Must have a minimum length of 5 characters unless overridden with the `minIdLength` option.                                                                                                                           | `undefined`                             |
| `trackingOptions`     | `TrackingOptions`. Configures tracking of additional properties. Please refer to `Optional tracking` section for more information.                                                                                                                                             | Enable all tracking options by default. |

{{/partial:collapse}}


{{partial:collapse name="GTM configuration options"}}
| Name                  | Description                                                                                                                                                       | Default Value                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `flushIntervalMillis` | `number`. The amount of time waiting to upload the event to the server in milliseconds.                                                                           | 1 second.                               |
| `flushQueueSize`      | `number`. The maximum number of events that can be stored locally before forcing an upload.                                                                       | 30 events.                              |
| `flushMaxRetries`     | `number`. The max retry limits.                                                                                                                                   | 5 times.                                |
| `logLevel`            | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`. The log level.                                                  | `LogLevel.Warn`                         |
| `minIdLength`         | `number`. Overrides the minimum length of `user_id` & `device_id` fields.                                                                                         | `5`                                     |
| `optOut`              | `boolean`. If `optOut` is `true`, the event isn't sent to Amplitude's servers.                                                                                    | `false`                                 |
| `serverUrl`           | `string`. The server URL events upload to.                                                                                                                        | `https://api2.amplitude.com/2/httpapi`  |
| `useBatch`            | `boolean`. When `true`, uses the Batch API instead of the HTTP V2 API.                                                                                            | `false`                                 |
| `appVersion`          | `string`. The current version of your application. For example: "1.0.0"                                                                                           | `null`                                  |
| `deviceId`            | `string`. A device-specific identifier.                                                                                                                           | `UUID()`                                |
| `cookieExpiration`    | `number`. The days when the cookie expires.                                                                                                                       | 365 days.                               |
| `cookieSameSite`      | `string`. The SameSite attribute of the Set-Cookie HTTP response header.                                                                                          | `LAX`                                   |
| `cookieSecure`        | `boolean`. If restrict access to cookies or not. A cookie with the Secure attribute is only sent to the server with an encrypted request over the HTTPS protocol. | `false`                                 |
| `disableCookies`      | `boolean`. If disable cookies or not. If cookies is disable, using LocalStorage or MemoryStorage.                                                                 | The cookies is enable by default.       |
| `domain`              | `string`. Set the top level domain.                                                                                                                               | `null`                                  |
| `partnerId`           | `string`. The partner Id value. Amplitude requires the customer who built an event ingestion integration to add the partner identifier to `partner_id`.           | `null`                                  |
| `sessionTimeout`      | `number`. How long one session expire.                                                                                                                            | `30` minutes.                           |
| `userId`              | `number`. ID for the user. Must have a minimum length of 5 characters unless overridden with the `minIdLength` option.                                            | `undefined`                             |
| `trackingOptions`     | `TrackingOptions`. Check the `Optional tracking` section for more tracking options configuration.                                                                 | Enable all tracking options by default. |
| `transport`           | `TransportType.XHR` or `TransportType.SendBeacon` or `TransportType.Fetch`. Set the transport type.                                                               | `TransportType.Fetch`                   |

{{/partial:collapse}}

### Track event

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to note.

The `track` tag type tracks an event under a specific trigger.

#### Event type

| Name         | Description                      |
| ------------ | -------------------------------- |
| `Event Type` | `string`. The name of the event. |

#### Individual event properties

| Name             | Description                                |
| ---------------- | ------------------------------------------ |
| `Property Name`  | `string`. The name of the event property.  |
| `Property Value` | `string`. The value of the event property. |

#### Event properties object

Select a GTM variable that returns a valid event properties object. This overwrites the **Individual Event Properties** event properties if there are any duplicate keys. Amplitude ignores any inputs not in the object format and any value under `user_properties` key.

```javascript
    {
        'eventPropKey' : 'eventPropValue',
        'otherEventPropKey': 'otherEventPropValue',
    }
```

To establish a scalable approach for defining properties, you can use the **Google Tag: Event Settings** variable in GTM. GTM **Google Tag: Event Settings** variable provides a way to let you reuse the event settings in multiple tags. For more information, see [Browser SDK 2](https://support.google.com/tagmanager/answer/13438771?hl=en). You can take advantage of it to create properties and reuse it across several tags.

The format of **Google Tag: Event Settings** variable:

```javascript
    {
        'eventPropKey' : 'eventPropValue',
        'otherEventPropKey': 'otherEventPropValue',
        'user_properties': {
            'user_property_key': 'user_property_value'
        }
    }
```

Notice that choosing Google Tag: Event Settings variable as an input in Event Properties Object, the value under `user_properties` is ignored.

#### Custom timestamp 

| Name                | Description                                                                                 | Default Value      |
| ------------------- | ------------------------------------------------------------------------------------------- | ------------------ |
| `Custom Timestamp ` | `number` or `null`. timestamp in UNIX time (milliseconds). Leave empty to use current time. | Current timestamp. |

##### Track with groups

Set event level groups. With event-level groups, the group designation applies only to the specific logged event, and doesn't persist on the user unless explicitly set with `setGroup`. For more information, see [Browser SDK 2 | User Groups](/docs/sdks/analytics/browser/browser-sdk-2/#user-groups).

| Name         | Description                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Group Type` | `string`. The type of group for which you're setting the name. For example, `Customer Name`.                                                                     |
| `Group Name` | `string` or `string1,string2...`. The name of the group. The value can be a single group name (for example, `15`) or a comma-separated list (for example, `2,12,24`) of group names. |

### Set user properties

{{partial:admonition type="note" heading=""}}
Identify calls *don't* appear in user look up. The identify calls sets the user properties, and those updated user properties appear only after the next event fired by the user.
{{/partial:admonition}}

Add individual user property operations each as its own row in the table. You can add as many as you like, but note that you can only include a specific User Property in a single operation. The operations execute in order. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#user-properties).

| Name            | Description                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `Method Call`   | `Add`, `Append`, `Prepend`, `Set`, `Set Once`, `Remove`, `Preinsert`, `Postinsert`, `Clear All`. The operation for the identify call.   |
| `User Property` | `string`. The key of user properties.                                                                                                   |
| `Value`         | `string` or others. The value of specific user property. If you want to pass other types, please use GTM variable(Data Layer Variable). |

### Set group

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#user-groups).

| Name            | Description                                                                                                                                                      | Default Value |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Group Type`    | `string`. The group type.                                                                                                                                        |
| `Group Name(s)` | `string` or `string,string...`. The group names under the group type. You can add a single group name or a comma-separated list ( 2,12,24) of group names. |               |

### Set group properties

Use the Group Identify API to set or update the properties of particular groups. These updates only affect events going forward. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#user-properties).

| Name            | Description                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `Group Type`    | `string`. The group type.                                                                                                               |
| `Group Name(s)` | `string`. The group names under the group type.                                                                                       |
| `Method Call`   | `Add`, `Append`, `Prepend`, `Set`, `Set Once`, `Remove`, `Preinsert`, `Postinsert`, `Clear All`. The operation for the identify call.   |
| `User Property` | `string`. The key of user properties.                                                                                                   |
| `Value`         | `string` or others. The value of specific user property. If you want to pass other types, please use GTM variable(Data Layer Variable). |

### Track revenue

Tracking the revenue event for a user. Revenue instances store each revenue transaction and allow you to define several special revenue properties (such as `revenueType` and `productIdentifier`) that are used in Amplitude's Event Segmentation and Revenue LTV charts.

| Name | Description                                                                                                                                                           | Default Value |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `product_id`                       | Required. `string`. An identifier for the product. Amplitude recommend something like the Google Play Store product ID.                                               | ``            |
| `quantity`                         | Required. `number`. The quantity of products purchased. For version after marketing-analytics-browser-gtm 0.5.4 , we auto assign `revenue = quantity * price`. &&&&&& | `1`           |
| `price`                            | Required. `number`. The price of the products purchased, and this can be negative. Note: revenue = quantity* price.                                                   | `null`        |
| `revenue_type`                     | Optional, but required for revenue verification. `string`. The revenue type (for example, tax, refund, income).                                                       | `null`        |
| `event properties`                 | Optional. `{ [key: string]: any }`. An object of event properties to include in the revenue event.                                                                    | `null`        |

### Flush events

The flush method prompts the client to send [buffered events](/docs/sdks/analytics/browser/browser-sdk-2/#flush-the-event-buffer). You don't need to call the `flush` tag type manually, it triggers based on either `flushIntervalMillis` or `flushQueueSize`, whichever comes first. To avoid event loss due to browser closure, consider setting `transport` in the configuration options to `beacon`, or call `amplitude.setTransport('beacon')` at the event `pagehide`. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2#set-the-transport-to-use-beacon-only-when-exiting-page).

Reduce the `flushQueueSize` and `flushIntervalMillis` according to your event traffic load, ensuring events don't get stuck on the client.

### Set user ID

If you want to reset the `userId` and deviceId after logout, please check `reset` tag type instead.

| Name      | Description                                                                                      | Default Value |
| --------- | ------------------------------------------------------------------------------------------------ | ------------- |
| `User ID` | `undefined` or `string`. Set the `userId`. Leave empty if you want to set the `userId` to undefined. | `undefined`   |

#### Set device ID

If you want to reset the `userId` and deviceId after logout, please check `reset` tag type instead.

| Name        | Description                                                                                                                                                                                                                                                                                                                                                                                                 | Default Value |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `Device ID` | `string`. Set the deviceId for the current user. Amplitude assigns an unique identifier for the `deviceId` by default. For the cross domain use case, Amplitude  captures the `deviceId` from URL parameter and assigns the value to `deviceId`. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#custom-device-id) | `UUID`        |

#### Set session ID

Session logic is auto handled by Amplitude. You might need to set the `sessionId` to `-1` if you want to out of session control. Please make sure the value is in milliseconds since epoch (Unix Timestamp) or `-1`. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#custom-session-id).

### Reset 

Use `reset` when a user has logs  out. It includes 2 operations: `setUserId(undefined)` and `setDeviceId(UUID())`. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#reset-when-user-logs-out).

### Set opt-out

Check the `Opt current user out of tracking` checkbox to opt user out of tracking. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2/#opt-users-out-of-tracking).

## Define your trigger

All tags fire based on events. When Google Tag Manager registers an event, it evaluates event triggers and fires tags. See [Trigger types](https://support.google.com/tagmanager/topic/7679108?sjid=4311393792871502449-NA) for the available triggers in GTM. 

{{partial:admonition type="note" title=""}}
In most cases, the `init` tag is the first thing you need to fire on the page. It's common to fire the `init` tag using the `All Pages` or `Initialization - All Pages` triggers. You can defer the `init` tag until you receive a signal and fire it with customized triggers, such as a consent grant. All other tags wait for the `init` tag to fire before they can send to Amplitude.
{{/partial:admonition}}

## Add a custom plugin

Plugins allow you to modify events. To learn more, refer to the [Browser SDK plugins documentation](/docs/sdks/analytics/browser/browser-sdk-2#plugins). You can add custom plugins by using a custom HTML tag.

For example, the HTML to add an event property to default page view events:

```HTML
<script>
  window.amplitudeGTM.add({
    name: "page-view-enrichment-plugin",
    execute: function(event) {  
      if(event.event_type === "[Amplitude] Page Viewed"){
        event.event_properties["custom_key"] = "custom_value";
      }
      return event;
    }
  });
</script>
```

GTM loads templates only when a tag based on that template fires. As a result, it's important to configure the sequencing of tags to ensure the plugin loads at the beginning, and applies to all following events. To do this, create a custom HTML tag that adds the plugin as the setup tag for the init tag. Then, configure a flush tag as the setup tag for the custom HTML tag. Be sure to sequence the tags in this order:

* Flush
* Custom HTML
* init

## Common Issues

These are common issues encountered with the GTM template. For further troubleshooting of your GTM instance, please refer to the GTM Help Center.

- [Troubleshoot issues](https://support.google.com/tagmanager/answer/6103683?hl=en)
- [Preview and debug containers](https://support.google.com/tagmanager/answer/6107056?hl=en)

### Does Amplitude GTM template support React Native (Android or iOS) apps?

No. The Amplitude Analytics Browser SDK only supports the web container, designed for desktop and mobile browsers. Amplitude doesn't provide support for GTM templates for mobile apps. To request this feature, please submit a feature request [here](https://help.amplitude.com/hc/en-us/requests/new).

### Can we add some logic to Amplitude template?

Yes, but it's not recommended. Modified Community Gallery Templates don't receive updates provided by the developer but you can always restore the template to start receiving notifications again.

### Missing events

- Check if you have multiple versions of Amplitude browser SDK installed. There may be collision between different versions of SDKs. Try giving a different instance name for your GTM instance. 
- If your website blocks script that our Template is trying to inject. Check your browser's Console or Network tab to see if it blocks any scripts or if you're getting any errors.
- Init web attribution event is missing. If you have installed cookies consent, check if the value of `document.referrer` updates to your current domain. The campaign from the current domain aren't tracked.
- Ensure that you have selected the appropriate Tag firing options. Choosing `Once per event` causes your tag to fire each time a user performs a Trigger event. Selecting `Once per Page` fires your Tag just once. This discrepancy could lead to events not sending as expected.

### Overall user counts to increase

Verify whether cookies are altered or removed inadvertently. [Cookies](/docs/sdks/analytics/browser/browser-sdk-2/#cookie-data) store critical user session data and marketing campaign information. If these cookies are deleted, it triggers a reset of user identifiers (such as user ID and device ID), invariably leading to a surge in the user count. Additionally, the erasure of last-viewed campaign parameters can result in an increase in organic/direct traffic, among other effects.

### Cross domain tracking

To retain user identification across domains, create a custom HTML tag to attach the user's `deviceId` to the domain link you wish to track. When you append `ampDeviceId=YourDeviceId` to the URL, the Amplitude Browser SDK uses the URL parameter value rather than generate a new `deviceId`. For more information see an [example script](https://github.com/amplitude/GTM-cross-domain-script) on GitHub.

Starting from template version `15cce` (library version `amplitude-ts-gtm/3.7.12`), the template supports getting the session ID from the URL parameter `ampSessionId` to keep the same session. For more information, see [Cross-domain tracking](/docs/sdks/analytics/browser/browser-sdk-2#cross-domain-tracking) with Browser SDK 2.0.

### How to pass other types for identify/groupIdentify value

Hard coding the value in your tag forces the input into a `string` type. To use other types like `number` or `boolean`, create a GTM variable, specifically a Data Layer Variable.

### Why my data layer is correct but events are wrong?

This issue occurs when a tag reads a value from a variable the data layer, and two values are pushed to the data layer within a short time. The expected behavior is that two events are tracked with different values. However, what actually happens is that both events have the second (most recently pushed) value.

This happens because when the first value is pushed to the data layer, the data layer updates the value but doesn’t trigger the event. When the second value is pushed, the data layer updats the value again and triggers two events, both reading the second value.

{{partial:admonition type="note" title=""}}
This is a known limitation of GTM. Follow [Google's documentation](https://developers.google.com/tag-platform/devguides/datalayer?hl=en#how_data_layer_information_is_processed) to resolve it by adding an event name.
{{/partial:admonition}}

If you've already added an event name to a message and this issue still happens, check whether the track tag has a setup tag. Setup tag can delay the track tag, causing it to read the data layer variable after it has been overwritten with the latest value. Removing the setup tag should resolve this issue.

## Breaking changes checklist

### Page View event's name and properties

The new template changes the default page view events to include `[Amplitude]` prefixes. If you want to continue using the older page view events check `Use legacy page view properties` checkbox. See full details in table. 

| Before                                                                                                               | Current                                                                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <ul><li>Event Name: `Page View`</li><li>Properties: `page_location`, `page_path`, `page_title`. `page_url`</li></ul> | <ul><li>Event Name:  `[Amplitude] Page Viewed`</li><li>Properties: `[Amplitude] Page Domain`, `[Amplitude] Page Location`, `[Amplitude] Page Path`, `[Amplitude] Page Title`, `[Amplitude] Page URL`</li></ul> |

### Subdomain attribution tracking 

Traffic from one subdomain to another (like `analytics.amplitude.com` to `experiment.amplitude.com`) isn't tracked by default. If you want to exclude the attribution tracking on `location.hostname`, but not other subdomains, add the string value of `location.hostname` in the `Exclude Referrers` input under the `Track marketing attribution` section. See full details in table. 

| Before                               | Current                                                      |
| ------------------------------------ | ------------------------------------------------------------ |
| Track attribution of all subdomains. | Excludes all subdomains of the same root domain as referrer. |

### User agent parser

The new template changes the way to parse the device related info which might affect the value of OS, Device Type, Device Family (`event.os_name`, `event.os_version`, `event.device_model`, `event.device_manufacturer`), and related properties. If you want to continue using the older way to parse user agent, check `(Legacy) Enable client side user agent enrichment` checkbox. See full details in table.

| Before                                                                       | Current                                                          |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| [Client-side user agent parsing](https://github.com/amplitude/ua-parser-js). | Server-side user agent parsing by Amplitude ingestion endpoints. |