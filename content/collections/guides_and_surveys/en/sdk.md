---
id: f422c82d-a9d7-404a-8f56-211e014453c6
blueprint: guides_and_survey
title: 'Guides and Surveys SDK'
landing: true
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738949573
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

### Third-party analytics provider

If you don't use the Amplitude Analytics [Browser SDK 2](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2), you can still use Guides and Surveys but you need to configure the SDK to work with your third-party analytics provider. First, add the SDK to your project using the script tag, or through npm or Yarn as outlined above.
But, instead of calling `amplitude.add(window.engagement.plugin())`, you need to call `init` and `boot`.

#### Initialize SDK

Calling `init` fully initializes the bundle and registers `engagement` on the global window object.

```js
engagement.init(apiKey: string, options: { serverZone: "US" | "EU", logger: Logger, logLevel: LogLevel }): void
```

| Parameter                | Type                                                                                                                         | Description                                                                                                                                                                    |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `apiKey`                 | `string`                                                                                                                     | Required. API key of the Amplitude project you want to use.                                                                                                                    |
| `initOptions.serverZone` | `EU` or `US`                                                                                                                 | Optional. Sets the Amplitude server zone. Set this to EU for Amplitude projects created in EU data center. Default: `US`                                                       |
| `initOptions.logger`     | [Logger interface](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-types/src/logger.ts#L1-L8) | Optional. Sets a custom logging provider class. Default: [Amplitude Logger](https://github.com/amplitude/Amplitude-TypeScript/blob/main/packages/analytics-core/src/logger.ts) |
| `initOptions.logLevel`   | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`.                            | Optional. Sets the log level. Default: `LogLevel.Warn`                                                                                                                         |

After calling this function, you can access `window.engagement` and call the SDK functions. However, Guides and Surveys isn't fully functional until you call `boot`.

#### Boot user

The final step before guides and surveys can show to your end-users is to call `boot`. This method triggers targeting resolution of your live guides and surveys. It also establishes the connection from the Guides and Surveys SDK to your third-party analytics provider. This method should be called only once for a given session unless you want to change the active user.



```js
engagement.boot(options: BootOptions): Promise<void>
```

| Parameter              | Type                           | Description                                                                                                                               |
| ---------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `options.user`         | `EndUser` or `(() => EndUser)` | Required. User information or a function that returns user information.                                                                   |
| `options.integrations` | `Array<Integration>`           | Optional. An array of integrations for tracking events. Enables sending Guides and Surveys events to your third-party Analytics provider. |

```js
await window.engagement.boot({
  user: {
    // Guides and Surveys requires at least one of user_id or device_id for user identification
    user_id: 'USER_ID', //[tl! ~~:1]
    device_id: 'DEVICE_ID',
    user_properties: {},
  },
  integrations: [
    {
      track: (event) => {
        analytics.track(event.event_type, event.event_properties)
      }
    },
  ],
});
```

Finally, if you want to use *On event tracked* [triggers](/docs/guides-and-surveys/guides/guides/setup-and-target#triggers), you need to forward events from your third-party analytics provider to Guides and Surveys. These events are not sent to the server.

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

| Parameter | Type                              | Description                          |
| --------- | --------------------------------- | ------------------------------------ |
| `mode`    | `light_mode`, `dark_mode`, `auto` | Required. Select the theme to apply. |

```js
// Automatically detect user's system preferences
window.engagement.setThemeMode("auto");

// Set dark mode explicitly
window.engagement.setThemeMode("dark_mode");

// Set light mode explicitly
window.engagement.setThemeMode("light_mode");
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

Display a specific guide or survey. This will ignore any targeting rules and limits except for page targeting.

```js
engagement.gs.show(key: string, stepIndex?: number): void
```

| Parameter   | Type     | Description                                                                             |
| ----------- | -------- | --------------------------------------------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                                    |
| `stepIndex` | `number` | The zero-based index of the step to show. Defaults to the initial step if not provided. |

## Forward event

Forwared third-party Analytics events to the Guides and Surveys SDK to trigger guides and surveys that use the `*On event tracked*` [trigger](/docs/guides-and-surveys/guides/guides/setup-and-target#triggers).

```js
engagement.forwardEvent(event: Event): void
```

| Parameter | Type  | Description                                                                                                                                            |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `event`   | Event | Required. An [event](/docs/sdks/analytics/browser/browser-sdk-2#track-an-event) object. It will trigger a guide or survey if its `event_type` matches. |


## Close all

Close all active guides and surveys.

```js
engagement.gs.closeAll(): void
```
