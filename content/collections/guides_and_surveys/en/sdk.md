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

Using the Guides and Surveys standalone SDK with another analytics provider requires extra configuration to help map properties to Amplitude. This initialization code accepts parameters that define the user and any integrations.

```js
boot(options: BootOptions): Promise<void>
```

| Parameter              | Type                           | Description                                                             |
| ---------------------- | ------------------------------ | ----------------------------------------------------------------------- |
| `options.user`         | `EndUser` or `(() => EndUser)` | Required. User information or a function that returns user information. |
| `options.integrations` | `Array<Integration>`           | Optional. An array of integrations for tracking events.                 |

```js
await window.engagement.boot({
  user: {
    // Guides and Surveys requires either user_id or device_id for user identification
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

{{partial:collapse name="Initialize with Segment analytics"}}
Initializing the SDK and launching a guide or survey with third-party analytics requires a few more steps.

First, the initialization code requires you to map the `user_id` and `device_id` fields, and optionally configure event forwarding to enable event-based triggers.
```js
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

{{/partial:collapse}}

### Verify installation and initialization

To verify that the Guides and Surveys SDK is running on your site or dev environment, open your browser's Developer Tools, and enter the following in the console:

```js
window.engagement
```

If the response is `undefined`, Guides and Surveys isn't installed properly.

#### Content Security Policy (CSP)

If your organization has a strict Content Security Policy (CSP), Guides and Surveys requires some additions to ensure smooth operation.

When you use the Amplitude Browser SDK 2 for analytics, add the following items to your CSP:

```text
script-src: https://*.amplitude.com;
connect-src: https://*.amplitude.com;
```

Regardless of the analytics provider you use, Guides and Surveys requires the following additions:

```text
img-src: https://*.amplitude.com;
media-src: https://*.amplitude.com;
style-src: https://*.amplitude.com;
```


## Manage themes

Configure the visual theme that displays to the user.

```js
setThemeMode(mode: ThemeMode): void
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
setRouter(routerFn: (url: string) => void): void
```

| Parameter  | Type                    | Description                                           |
| ---------- | ----------------------- | ----------------------------------------------------- |
| `routerRn` | `(url: string) => void` | Required. A function that handles changes to the URL. |

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
gs.reset(key: string, stepIndex?: number)
```

| Parameter   | Type     | Description                                                                           |
| ----------- | -------- | ------------------------------------------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                                  |
| `stepIndex` | `number` | Required. The zero-based index of the step to reset to. Defaults to the initial step. |

## List

Retrieve a list of visible guides or surveys

```js
ga.list(): Array<GuideOrSurvey>
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

Display a specific guide or survey.

```js
gs.show(key: string, stepIndex?: number): void
```

| Parameter   | Type     | Description                                                                       |
| ----------- | -------- | --------------------------------------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                              |
| `stepIndex` | `number` | Required. The zero-based index of the step to show. Defaults to the initial step. |

## Forward event

Trigger Guides and Surveys programmatically.

```js
forwardEvent(event: Event): void
```

| Parameter | Type  | Description                                                                                                                       |
| --------- | ----- | --------------------------------------------------------------------------------------------------------------------------------- |
| `event`   | Event | Required. An [event](/docs/sdks/analytics/browser/browser-sdk-2#track-an-event) object that launches a guide or survey. |


## Close all

Close all active guides and surveys.

```js
gs.closeAll(): void
```