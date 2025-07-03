---
id: f422c82d-a9d7-404a-8f56-211e014453c6
blueprint: guides_and_survey
title: 'Guides and Surveys Web SDK'
landing: true
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1750710864
landing_blurb: 'Ensure your site or application is ready for Guides and Surveys.'
---
Amplitude's Guides and Surveys SDK enables you to deploy [Guides and Surveys](/docs/guides-and-surveys) on your website or application.

## Install the SDK

Guides and Surveys supports different installation options to work best with your existing Amplitude implementation, if you have one.

### Amplitude Browser SDK

Install the Guides and Surveys SDK with a script, or as a package with npm or Yarn.

{{partial:tabs tabs="script, npm, yarn"}}
{{partial:tab name="script"}}
Place the script tag below your Amplitude script tag.
```html
<script src="https://cdn.amplitude.com/script/API_KEY.engagement.js"></script>
<script>amplitude.add(window.engagement.plugin())</script>
```
{{/partial:tab}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/engagement-browser
```
Import Guides and Surveys into your project:
```ts
import { plugin as engagementPlugin } from '@amplitude/engagement-browser';
amplitude.add(engagementPlugin());
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/engagement-browser
```
Import Guides and Surveys into your project:
```ts
import { plugin as engagementPlugin } from '@amplitude/engagement-browser';
amplitude.add(engagementPlugin());
```
{{/partial:tab}}
{{/partial:tabs}}


For additional configuration, supply `InitOptions` to the `plugin` function. See [Initialize the SDK](#initialize-the-sdk) below for the available options.




### Other Amplitude SDK's and third-party analytics providers 

If you don't use the Amplitude Analytics [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2), you can still use Guides and Surveys but you need to configure the SDK to work with your other Amplitude Analytics SDK or third-party analytics provider. First, add the SDK to your project using the script tag, or through npm or Yarn as outlined above.
But, instead of calling `amplitude.add(window.engagement.plugin())`, you need to call `init` and `boot`.

#### Initialize the SDK

Call `init` to  fully initialize the bundle and register `engagement` on the global window object.

```js
engagement.init(apiKey: string, options: { serverZone: "US" | "EU", serverUrl: string, cdnUrl: string, logger: Logger, logLevel: LogLevel, locale: string }): void
```

| Parameter                | Type                                                                                                                         | Description                                                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiKey`                 | `string`                                                                                                                     | Required. API key of the Amplitude project you want to use.                                                                                                                    |
| `initOptions.serverZone` | `EU` or `US`                                                                                                                 | Optional. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center. Default: `US`                                                       |
| `initOptions.serverUrl`  | `string`                                                                                                                     | Optional. Sets a custom server URL for API requests. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://gs.amplitude.com` (US) or `https://gs.eu.amplitude.com` (EU) |
| `initOptions.cdnUrl`     | `string`                                                                                                                     | Optional. Sets a custom CDN URL for static assets. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://cdn.amplitude.com` (US) or `https://cdn.eu.amplitude.com` (EU) |
| `initOptions.logger`     | [Logger interface](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-types/src/logger.ts#L1-L8) | Optional. Sets a custom logging provider class. Default: [Amplitude Logger](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-core/src/logger.ts) |
| `initOptions.logLevel`   | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`.                            | Optional. Sets the log level. Default: `LogLevel.Warn`                                                                                                                         |
| `initOptions.locale`     | `string`                                                                                                                     | Optional. Sets the locale for [localization](/docs/guides-and-surveys/sdk#localization). Default: `undefined`. Not setting a language means the default language is used.      |

##### Example: Basic initialization

```js
engagement.init("YOUR_API_KEY", {
  serverZone: "US",
  logLevel: LogLevel.Warn
});
```

##### Example: Initialization with proxy

For [proxy setups](/docs/guides-and-surveys/proxy), specify both `serverUrl` and `cdnUrl`:

```js
engagement.init("YOUR_API_KEY", {
  serverUrl: "https://your-proxy-domain.cloudfront.net",
  cdnUrl: "https://your-proxy-domain.cloudfront.net"
});
```

After calling this function, you can access `window.engagement` and call the SDK functions. However, Guides and Surveys isn't fully functional until you call `boot`.

#### Boot user

The final step before guides and surveys can show to your end-users is to call `boot`. This method triggers targeting resolution of your live guides and surveys. It also establishes the connection from the Guides and Surveys SDK to your third-party analytics provider. Call this method only once for a given session unless you want to change the active user.



```js
engagement.boot(options: BootOptions): Promise<void>
```

| Parameter              | Type                           | Description                                                                                                                               |
| ---------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `options.user`         | `EndUser` or `(() => EndUser)` | Required. User information or a function that returns user information.                                                                   |
| `options.integrations` | `Array<Integration>`           | Optional but strongly encouraged. An array of integrations for tracking events. Enables sending Guides and Surveys events to your third-party Analytics provider. These events are necessary to receive guide insights, survey insights, and survey responses to populate as expected. Otherwise, content is empty. |

```js
await window.engagement.boot({
  user: {
    // Guides and Surveys requires at least one of user_id or device_id for user identification
    user_id: 'USER_ID', 
    device_id: 'DEVICE_ID',
    user_properties: {},
  },
  // needed for insights and responses to populate
  integrations: [
    {
      track: (event) => {
        analytics.track(event.event_type, event.event_properties)
      }
    },
  ],
});
```

To use *On event tracked* [triggers](/docs/guides-and-surveys/guides/setup-and-target#triggers),  forward events from your third-party analytics provider to Guides and Surveys. The Guides and Surveys SDK doesn't send these events to the server.

```js
analytics.on('track', (event, properties, options) => { // Example for Segment Analytics
  window.engagement.forwardEvent({ event_type: event, event_properties: properties});
});
```


{{partial:collapse name="Initialize with Segment analytics"}}
Initializing the SDK and launching a guide or survey with third-party analytics requires a few more steps.

First, the initialization code requires you to map the `user_id` and `device_id` fields, and optionally configure event forwarding to enable event-based triggers.


{{partial:tabs tabs="script, npm, yarn"}}
{{partial:tab name="script"}}
Make sure you've added the Engagement script tag to your site before continuing.
```js
window.engagement.init("API_KEY", { serverZone: "US" });

analytics.ready(() => {
  await window.engagement.boot({
    user: {
      // User Provider: Guides and Surveys requires either user_id or device_id for user identification
      user_id: analytics.user().id(),
      device_id: analytics.user().anonymousId(),
      user_properties: {},
    },
    integrations: [
      {
        // Tracking Provider: Pass Guides and Surveys events to the 3rd party analytics provier
        track: (event) => {
          analytics.track(event.event_type, event.event_properties)
        }
      },
    ],
  });

  // (Optional) Forward events from segment to do event-based triggers for Guides and Surveys. These events aren't sent to the server
  analytics.on('track', (event, properties, options) => {
    window.engagement.forwardEvent({ event_type: event, event_properties: properties});
  });

  analytics.on('page', (event, properties, options) => {
    window.engagement.forwardEvent({ event_type: event, event_properties: properties});
  });
});
```
{{/partial:tab}}
{{partial:tab name="npm"}}
Import the Guides and Surveys package
```bash
npm install @amplitude/engagement-browser
```

Connect Guides and Surveys with Segment:
```ts
import { init as engagementInit } from '@amplitude/engagement-browser';

engagementInit("API_KEY", { serverZone: "US" });

analytics.ready(() => {
  await window.engagement.boot({
    user: {
      // User Provider: Guides and Surveys requires either user_id or device_id for user identification
      user_id: analytics.user().id(),
      device_id: analytics.user().anonymousId(),
      user_properties: {},
    },
    integrations: [
      {
        // Tracking Provider: Pass Guides and Surveys events to the 3rd party analytics provier
        track: (event) => {
          analytics.track(event.event_type, event.event_properties)
        }
      },
    ],
  });

  // (Optional) Forward events from segment to do event-based triggers for Guides and Surveys. These events aren't sent to the server
  analytics.on('track', (event, properties, options) => {
    window.engagement.forwardEvent({ event_type: event, event_properties: properties});
  });

  analytics.on('page', (event, properties, options) => {
    window.engagement.forwardEvent({ event_type: event, event_properties: properties});
  });
});
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
Import the Guides and Surveys package
```bash
yarn add @amplitude/engagement-browser
```

Connect Guides and Surveys with Segment:
```ts
import { init as engagementInit } from '@amplitude/engagement-browser';

engagementInit("API_KEY", { serverZone: "US" });

analytics.ready(() => {
  await window.engagement.boot({
    user: {
      // User Provider: Guides and Surveys requires either user_id or device_id for user identification
      user_id: analytics.user().id(),
      device_id: analytics.user().anonymousId(),
      user_properties: {},
    },
    integrations: [
      {
        // Tracking Provider: Pass Guides and Surveys events to the 3rd party analytics provier
        track: (event) => {
          analytics.track(event.event_type, event.event_properties)
        }
      },
    ],
  });

  // (Optional) Forward events from segment to do event-based triggers for Guides and Surveys. These events aren't sent to the server
  analytics.on('track', (event, properties, options) => {
    window.engagement.forwardEvent({ event_type: event, event_properties: properties});
  });

  analytics.on('page', (event, properties, options) => {
    window.engagement.forwardEvent({ event_type: event, event_properties: properties});
  });
});
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Google Tag Manager

If you haven't already, update to the latest version of the Amplitude template. Find the update icon on the Templates page in GTM.

Next, on the Tags page, enable Guides and Surveys.

![google_tag_manager.png](/docs/output/img/guides-surveys/google-tag-manager.png)

{{partial:admonition type="info" heading=""}}
The Amplitude template doesn't enable Guides and Surveys by default. This prevents organizations who enable automatic template updates from enabling Guides and Surveys accidentally.
{{/partial:admonition}}

### Verify installation and initialization

To verify that the Guides and Surveys SDK is running on your site or dev environment, open your browser's Developer Tools, and enter the following in the console:

```js
window.engagement
```

If the response is `undefined`, Guides and Surveys isn't installed properly.

#### Content Security Policy (CSP)

If your organization has a strict Content Security Policy (CSP), Guides and Surveys requires some additions to ensure smooth operation. Add the following CSP directives to your policy:

```text
script-src: https://*.amplitude.com;
connect-src: https://*.amplitude.com;
img-src: https://*.amplitude.com;
media-src: https://*.amplitude.com;
style-src: https://*.amplitude.com;
```


## Manage themes

Configure the visual theme mode if your app supports light and dark modes.

```js
engagement.setThemeMode(mode: ThemeMode): void
```

| Parameter | Type                            | Description                          |
| --------- | ------------------------------- | ------------------------------------ |
| `mode`    | `lightMode`, `darkMode`, `auto` | Required. Select the theme to apply. |

```js
// Automatically detect user's system preferences
window.engagement.setThemeMode("auto");

// Set dark mode explicitly
window.engagement.setThemeMode("darkMode");

// Set light mode explicitly
window.engagement.setThemeMode("lightMode");
```

## Register a callback

Register a callback with the Guides and Surveys SDK. Set the Callback action on a guide or survey button to execute the callback.

```js
engagement.addCallback(name: string, callback: () => void): void
```

| Parameter  | Type         | Description                                                                                   |
| ---------- | ------------ | --------------------------------------------------------------------------------------------- |
| `name`     | `string`     | Required. Refer to this callback by name when setting a callback action on a guide or survey. |
| `callback` | `() => void` | Required. The callback to execute.                                                            |

```js
window.engagement.addCallback("toggle_dark_mode", () => {
  setTheme("darkMode");
  window.engagement.setThemeMode("darkMode");
});
```

## Router configuration

Configure how Guides and Surveys handles URLs in a single page application (SPA).

```js
engagement.setRouter(routerFn: (url: string) => void): void
```

| Parameter  | Type                    | Description                                           |
| ---------- | ----------------------- | ----------------------------------------------------- |
| `routerFn` | `(url: string) => void` | Required. A function that handles changes to the URL. |

```js
// React Router v6 implementation
import { useNavigate } from "react-router-dom";

const MyComponent = () => {
  const navigate = useNavigate();

  React.useEffect(() => {
    window.engagement.setRouter((newUrl) => navigate(newUrl));
  }, []);
};
```

## Localization

Set the `locale` option during initialization to localize a guide or survey.

* If you use the [Amplitude Browser SDK](#amplitude-browser-sdk) plugin, set it in `InitOptions`.
* If you use a  [third-party analytics provider](#third-party-analytics-provider), set it in `options` within the `engagement.init()` method.

To dynamically update the language after the SDK initializes, use the `updateLanguage` method documented below. Calling `updateLanguage` re-fetches the configuration with the new locale.

```js
engagement.updateLanguage(locale: string): Promise<void>
```

| Parameter | Type     | Description                                                                              |
| --------- | -------- | ---------------------------------------------------------------------------------------- |
| `locale`  | `string` | Required. The new language code (for example, `en`, `es`, `fr`) to set for localization. |

```js
// Example: Update language to French
await window.engagement.updateLanguage("fr");

// Example: Update language to English
await window.engagement.updateLanguage("en");
```

## Reset

Reset a guide or survey to a specific step.

```js
engagement.gs.reset(key: string, stepIndex?: number)
```

| Parameter   | Type     | Description                                                                           |
| ----------- | -------- | ------------------------------------------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                                  |
| `stepIndex` | `number` | Required. The zero-based index of the step to reset to. Defaults to the initial step. |

## List

Retrieve a list of all live guides and surveys along with their status.

```js
engagement.gs.list(): Array<GuideOrSurvey>
```

```js
interface GuideOrSuvey {
  id: number;
  status: "visible" | "active";
  step: number;
  title: string
}
```

## Show

Display a specific guide or survey. This ignores any targeting rules and limits except for page targeting.

```js
engagement.gs.show(key: string, stepIndex?: number): void
```

| Parameter   | Type     | Description                                                                             |
| ----------- | -------- | --------------------------------------------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                                    |
| `stepIndex` | `number` | The zero-based index of the step to show. Defaults to the initial step if not provided. |

## Forward event

Forward third-party Analytics events to the Guides and Surveys SDK to trigger guides and surveys that use the *On event tracked* [trigger](/docs/guides-and-surveys/guides/setup-and-target#triggers).

```js
engagement.forwardEvent(event: Event): void
```

| Parameter | Type  | Description                                                                                                                                        |
| --------- | ----- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `event`   | Event | Required. An [event](/docs/sdks/analytics/browser/browser-sdk-2#track-an-event) object. It triggers a guide or survey if its `event_type` matches. |


## Close all

Close all active guides and surveys.

```js
engagement.gs.closeAll(): void
```

## Troubleshoot your installation

If your Guides and Surveys instrumentation doesn't work, verify the following topics.

### Verify Guides and Surveys is installed

1. Open your browser's developer console, and enter `window.engagement`. If the return is `undefined`, Guides and Surveys installation wasn't successful.

2. If `window.engagement` returns a valid response, enter `window.engagement._.user`. A return of `undefined` indicates an issue with the plugin configuration.

3. For additional debugging, enter `window.engagement._debugStatus()`. The output should look like:

```json
{
    "user": {
        "user_id": "test-base-user-1vxxkg",
        "device_id": "62c5e45a-94ab-4090-b053-3f28e848763f",
        "user_properties": {
            "foo": "bar"
        }
    },
    "apiKey": "6ae8d3d7d48eadfb0b2489db692e14c9",
    "stateInitialized": true,
    "decideSuccessful": true,
    "num_guides_surveys": 2,
    "analyticsIntegrations": 1
}
```

Verify that:
- the `user` object is present
- `apiKey` is set
- `stateInitialized` is `true`
- `decideSuccessful` is `true`
- `num_guides_surveys` is a non-zero integer if a guide or survey should be display on the page.

### Verify plugin configuration

If you use Amplitude Browser SDK 2.0, check the browser's console for errors. If there are none, verify that your code matches code provided in the installation instructions. In particular, ensure that  `amplitude.add(window.engagement.plugin())` is present in the code.

If you see something like `amplitude is not defined` and `cannot read properties of undefined .add()`, this means that the G&S is trying to load before the Amplitude SDK loads. Check your code to ensure that the Amplitude Browser SDK loads before the Guides and Surveys SDK.

If you use Google Tag Manager, ensure you update to the latest Amplitude template.

Guides and Surveys requires Browser SDK 2 and doesn't support the legacy Amplitude JavaScript SDK.

### Common root causes

This section contains some common errors that may prevent running Guides and Surveys.

#### `boot` is called more than once

This results in unexpected behavior, especially for guides and surveys that should appear immediately.

{{partial:admonition type="info" heading=""}}
If you implement Guides and Surveys with `amplitude.add(window.engagement.plugin())`, don't call `boot`. The `add()` method includes this call with a very specific set of parameters.
{{/partial:admonition}}

#### Wrong project used

Ensure the API key you provide:

- is the same key you use to initialize the Browser SDK
- belongs to the project that contains the Guides and Surveys configuration