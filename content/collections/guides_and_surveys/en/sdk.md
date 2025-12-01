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

### Amplitude Browser SDK 2

Install the Guides and Surveys SDK with a script, or as a package with npm or Yarn.

{{partial:tabs tabs="script, npm, yarn"}}
{{partial:tab name="script"}}
Place the script tag below your Amplitude script tag.
```html
<script src="https://cdn.amplitude.com/script/API_KEY.engagement.js"></script>
<script>amplitude.add(window.engagement.plugin())</script>
```

{{partial:admonition type="warning" heading="Load scripts synchronously"}}
When using script tags to load Analytics and Engagement SDKs, don't set `async = true` on your Amplitude Analytics script tag. The Analytics SDK must load before the Engagement SDK. Loading them asynchronously can cause initialization errors.
{{/partial:admonition}}

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

For additional configuration, supply `InitOptions` to the `plugin` function. Go to [Initialize the SDK](#initialize-the-sdk) below for the available options.

{{partial:admonition type="note" heading=""}}
After the installation steps are complete, by default all Guides and Surveys events are sent to your project.
{{/partial:admonition}}

{{partial:admonition type="warning" heading="Use the same API key for Guides & Surveys and Analytics"}}
To avoid analytics mismatches and ensure accurate data collection, use the same API key for both Guides & Surveys and your Analytics SDK. Both should reference the same Amplitude project. Using different API keys can cause:

- The SDK to fetch guides and surveys from the wrong project
- Analytics data to appear in different projects
- Insights and survey responses are incomplete or mismatched

Make sure the API key you provide to Guides & Surveys matches the API key used to initialize your Amplitude Analytics SDK.
{{/partial:admonition}}

{{partial:admonition type="note" heading="No need to call init or boot"}}
When using the plugin with `amplitude.add(engagementPlugin())`, don't call `engagement.init()` or `engagement.boot()`. The plugin handles initialization automatically.

Only call `init` and `boot` manually if you need to:
- Use a proxy (see [Proxy configuration](/docs/guides-and-surveys/proxy))
- Customize event handling with the `integrations` option (see [Other analytics providers](/docs/guides-and-surveys/sdk#other-amplitude-sdks-and-third-party-analytics-providers))

This option can only be used with the [Amplitude Analytics Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2).
{{/partial:admonition}}

### Amplitude Unified SDK

If you're using the [Amplitude Unified SDK](/docs/sdks/analytics/browser/browser-unified-sdk), Guides and Surveys comes out of the box. Just provide the engagement options during initialization:

```ts
import { initAll } from '@amplitude/unified';

initAll('YOUR_API_KEY', {
    // Other Amplitude SDK options...
  engagement: {
        // Guides and Surveys options go here...
  }
});
```

Enable Guides and Surveys in your Amplitude project settings before guides and surveys can display. Go to [Unified SDK documentation](/docs/sdks/analytics/browser/browser-unified-sdk#guides-and-surveys-options) for details.

### Other Amplitude SDK's and third-party analytics providers

If you don't use the [Amplitude Analytics Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2) or the [Amplitude Analytics Unified SDK](/docs/sdks/analytics/browser/browser-unified-sdk), you can still use Guides and Surveys but you need to configure the SDK to work with your other Amplitude Analytics SDK or third-party analytics provider. First, add the SDK to your project using the script tag, or through npm or Yarn as outlined above.
But, instead of calling `amplitude.add(window.engagement.plugin())`, you need to call `init` and `boot`.

#### Initialize the SDK

Call `init` to fully initialize the bundle and register `engagement` on the global window object.

```js
engagement.init(apiKey: string, options: { serverZone: "US" | "EU", serverUrl: string, cdnUrl: string, mediaUrl: string, logger: Logger, logLevel: LogLevel, locale: string, nonce: string }): void
```

| Parameter                | Type                                                                                                                         | Description                                                                                                                                                                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiKey`                 | `string`                                                                                                                     | Required. API key of the Amplitude project you want to use.                                                                                                                                                                                            |
| `initOptions.serverZone` | `EU` or `US`                                                                                                                 | Optional. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center. Default: `US`                                                                                                                               |
| `initOptions.serverUrl`  | `string`                                                                                                                     | Optional. Sets a custom server URL for API requests. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://gs.amplitude.com` (US) or `https://gs.eu.amplitude.com` (EU)                                                         |
| `initOptions.cdnUrl`     | `string`                                                                                                                     | Optional. Sets a custom CDN URL for static assets. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://cdn.amplitude.com` (US) or `https://cdn.eu.amplitude.com` (EU)                                                         |
| `initOptions.mediaUrl`   | `string`                                                                                                                     | Optional. Sets a custom URL for proxying nudge images. Useful for [proxy setups](/docs/guides-and-surveys/proxy) when images are blocked. Default: `https://engagement-static.amplitude.com` (US) or `https://engagement-static.eu.amplitude.com` (EU) |
| `initOptions.logger`     | [Logger interface](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-types/src/logger.ts#L1-L8) | Optional. Sets a custom logging provider class. Default: [Amplitude Logger](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-core/src/logger.ts)                                                                         |
| `initOptions.logLevel`   | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`.                            | Optional. Sets the log level. Default: `LogLevel.Warn`                                                                                                                                                                                                 |
| `initOptions.locale`     | `string`                                                                                                                     | Optional. Sets the locale for [localization](/docs/guides-and-surveys/sdk#localization). Default: `undefined`. Not setting a language means the default language is used.                                                                              |
| `initOptions.nonce`      | `string`                                                                                                                     | Optional. Sets a nonce value for Content Security Policy (CSP) compliance. This allows inline styles required by Guides and Surveys to be executed when CSP is enabled. Default: `undefined`                                                           |

##### Example: Basic initialization

```js
engagement.init("YOUR_API_KEY", {
  serverZone: "US",
  logLevel: LogLevel.Warn
});
```

##### Example: Initialization with proxy

For [proxy setups](/docs/guides-and-surveys/proxy), specify `serverUrl`, `cdnUrl`, and `mediaUrl`:

```js
engagement.init("YOUR_API_KEY", {
  serverUrl: "https://your-proxy-domain.cloudfront.net",
  cdnUrl: "https://your-proxy-domain.cloudfront.net",
  mediaUrl: "https://your-proxy-domain.cloudfront.net",
});
```

{{partial:admonition type="note" heading=""}}
When using a proxy, call `window.engagement.boot` to fully install Guides and Surveys, even if you are using the Browser SDK v2. Make sure to set up event handling through the `integrations` option.
{{/partial:admonition}}

##### Example: Initialization with CSP nonce

For Content Security Policy (CSP) compliance, include a nonce value:

```js
engagement.init("YOUR_API_KEY", {
  nonce: "YOUR_NONCE"
});
```

After calling this function, you can access `window.engagement` and call the SDK functions. However, Guides and Surveys isn't fully functional until you call `boot`.

#### Boot user

The final step before guides and surveys can show to your end-users is to call `boot`. This method triggers targeting resolution of your live guides and surveys. It also establishes the connection from the Guides and Surveys SDK to your third-party analytics provider. Call this method only once for a given session unless you want to change the active user.



```js
engagement.boot(options: BootOptions): Promise<void>
```

| Parameter              | Type                           | Description                                                                                                                                                                                                                                                                                                         |
| ---------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options.user`         | `EndUser` or `(() => EndUser)` | Required. User information or a function that returns user information.                                                                                                                                                                                                                                             |
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
        amplitude.track(event.event_type, event.event_properties)
      }
    },
  ],
});
```

To use *On event tracked* [triggers](/docs/guides-and-surveys/guides/setup-and-target#triggers),  forward events from your third-party analytics provider to Guides and Surveys. The Guides and Surveys SDK doesn't send these events to the server.

```js
analytics.on('track', (event, properties, options) => {
  // Example for Segment Analytics
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
      user_properties: analytics.user().traits(),
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

For environments with stricter CSP requirements that block inline styles, you can use the `nonce` parameter during initialization. This allows Guides and Surveys to execute necessary inline styles by including your CSP nonce value:

```js
engagement.init("YOUR_API_KEY", {
  nonce: "YOUR_NONCE"
});
```

#### iframe support and limitations

Guides and Surveys has limited support for applications that use iframes. Consider these important limitations when implementing Guides and Surveys in iframe-based applications.

**Targeting elements inside iframes:**
- Pins and tooltips can't target elements inside an iframe from the parent application
- Each iframe requires its own SDK instance to display guides or surveys within that iframe
- CSS selectors can't cross iframe boundaries, which prevents the SDK from locating elements inside iframes

**SDK instances and multi-step experiences:**
- Each iframe requires a separate SDK instance, initialized with the same API key as the parent application
- Multi-step tours that span across the parent application and iframes aren't supported
- Each SDK instance operates independently and can't coordinate steps across different contexts

**Event tracking and user identification:**
- Events tracked in an iframe are independent from events in the parent application
- Ensure consistent user identification (user ID and device ID) across all SDK instances
- Each SDK instance maintains its own state and doesn't share data with other instances

**Recommended approach:**
- Install the SDK in both the parent application and each iframe that needs to display guides or surveys
- Use the same API key for all SDK instances to ensure consistent user identification
- Design guides and surveys to work within a single context (either parent or a specific iframe)

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
{{partial:admonition type="note" heading="Update URL behavior"}}
After you configure the router with `setRouter()`, update the URL behavior setting in the Guides and Surveys interface. For any link actions in your guides or surveys, change the URL behavior from Same tab or New tab to **Use router**. This ensures that the guide or survey uses the custom router function instead of the default browser navigation.
{{/partial:admonition}}
## Localization

Set the `locale` option during initialization to localize a guide or survey.

* If you use the [Amplitude Browser SDK](#amplitude-browser-sdk) plugin, set it in `InitOptions`.
* If you use a  [third-party analytics provider](#other-amplitude-sdks-and-third-party-analytics-providers), set it in `options` within the `engagement.init()` method.

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

## Refresh targeting

Re-fetch targeting evaluation from the backend by making a new request to the decide endpoint. This allows you to refresh which guides and surveys are eligible to show based on the latest targeting rules and user state. Targeting is automatically refreshed when the user or its properties change. Manually refreshing targeting through this method is useful when you update user properties server-side or to get the latest cohort membership states.


```js
engagement.decide(): Promise<void>
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


## Set user properties
Set user properties for the current session. These properties can be used as variables inside guides and surveys content with the `@{{ property.propertyName }}` syntax.

If you use `amplitude.identify()` to share user properties, you don't need to use `_setUserProperties()`.

{{partial:admonition type="tip" heading=""}}
Ensure that user properties load during the current client-side session and before the guide or survey displays. Properties shared from prior sessions aren't available.
{{/partial:admonition}}

```js
engagement._setUserProperties(userProperties: Record<string, any>): void
```

| Parameter        | Type                  | Description                                                                                                                     |
| ---------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `userProperties` | `Record<string, any>` | Required. An object that contains user properties as key-value pairs. Reference these properties in guides and surveys content. |
### Example

```js
// Supply user properties manually via engagement SDK
const userProperties = {firstName: 'john'}
engagement._setUserProperties(userProperties)

// For testing, view the current user properties
engagement._.user.user_properties
```

## Set session properties

Set session properties for the current session. Session properties provide an additional way to restrict when guides and surveys are triggered. At the time of trigger, the configured session property conditions must be met for the guide or survey to display.

When a session property changes, the SDK checks if there are any guides or surveys that can now be shown. This means session properties work with the "immediately" trigger and display content as soon as the session property conditions become true.

```js
engagement.setSessionProperty(key: string, value: any): void
```

| Parameter | Type      | Description                                              |
| --------- | --------- | -------------------------------------------------------- |
| `key`     | `string`  | Required. The session property key to set.              |
| `value`   | `any` | Required. The value to set for the session property.    |

{{partial:admonition type="note" heading="Feature availability"}}
Session properties are a feature-flagged capability. Contact Amplitude support if you want to use this feature in your implementation.
{{/partial:admonition}}

### Example

```js
// Various session properties to control guide/survey targeting
window.engagement.setSessionProperty("subscriptionTier", "premium");
window.engagement.setSessionProperty("isFeatureXEnabled", true);
window.engagement.setSessionProperty("userScore", 85);
```

## Close all

Close all active guides and surveys.

```js
engagement.gs.closeAll(): void
```

## Preview mode for desktop apps

If you are using the SDK within a desktop framework, you must perform extra instrumentation to support previewing Guides & Surveys.

The Amplitude dashboard will pass your app a special query parameter through a deep link (for example, `your-app://?gs-debug-id=123`). You will need to add logic within your app to listen for this query parameter on a deep link and call the `_startNudgeDebug` SDK method with it.

Review below for specific framework examples.

### Electron

Use the following as a minimal example on how to implement Guides & Surveys within Electron:
1. Register an inter-process communication function during preload.
2. In the main process: listen for and parse the `gs-debug-id` query parameter.
3. In the renderer process: listen for a message from the main process and pass the debug parameter to the Engagement SDK.

{{partial:tabs tabs="main.js, preload.js, renderer.js"}}
{{partial:tab name="main.js"}}
```javascript
const { app } = require('electron');

// Handle deep link on macOS
app.on('open-url', (event, url) => {
  const parsedUrl = new URL(url);
  const debugId = parsedUrl.searchParams.get('gs-debug-id');

  if (debugId) {
    mainWindow.webContents.send('start-engagement-debug', {
      debugId: debugId,
    });
  }
});

// Handle deep link on Windows/Linux
app.on('second-instance', (event, commandLine, workingDirectory) => {
  // Find the deep link URL in command line arguments
  const url = commandLine.find(arg => arg.startsWith(PROTOCOL + '://'));

  if (url) {
    const parsedUrl = new URL(url);
    const debugId = parsedUrl.searchParams.get('gs-debug-id');

    if (debugId) {
      mainWindow.webContents.send('start-engagement-debug', {
        debugId: debugId,
      });
    }
  }
});
```
{{/partial:tab}}
{{partial:tab name="preload.js"}}
```javascript
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startEngagementDebug: (callback) => {
    ipcRenderer.on('start-engagement-debug', (_event, data) => callback(data));
  },
});
```
{{/partial:tab}}
{{partial:tab name="renderer.js"}}
```javascript
window.electronAPI.startEngagementDebug((data) => {
  window.engagement._startNudgeDebug({
    nudge: { variantId: Number(data.debugId) }
  });
});
```
{{/partial:tab}}
{{/partial:tabs}}

## Troubleshoot your installation

If your Guides and Surveys instrumentation doesn't work, verify the following topics:

{{partial:admonition type="tip"}}
Use the [Amplitude Chrome extension](/docs/data/chrome-extension-debug) to debug Guides & Surveys. The extension includes tools to verify SDK setup, troubleshoot why guides or surveys aren't showing, and test event-based triggers.
{{/partial:admonition}}

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

Guides and Surveys requires Browser SDK 2 and doesn't support the legacy Amplitude JavaScript SDK.

### Google Tag Manager configuration

If you use Google Tag Manager, ensure you update to the latest Amplitude template.

{{partial:admonition type="warning" heading="Google Tag Manager custom tags"}}
If Guides and Surveys doesn't work with a Google Tag Manager (GTM) custom HTML tag, verify that the **Support document.write** checkbox in the tag configuration is enabled. This setting is required for Guides and Surveys to load properly through GTM.

To enable this setting:

1. In GTM, navigate to your Amplitude tag.
2. Expand the **Advanced Settings** section.
3. Check the **Support document.write** checkbox.
4. Save and publish your changes.
{{/partial:admonition}}

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

Using different API keys for Guides & Surveys and Analytics causes the SDK to fetch guides and surveys from the wrong project and results in incomplete or mismatched analytics data. Always use the same API key for both SDKs to ensure they're tied to the same Amplitude project.
