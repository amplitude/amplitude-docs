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

### Browser SDK 2 unified script

Amplitude recommends using the unified Browser SDK installation. For more information, see [Browser SDK 2](/docs/sdks/analytics/browser/browser-sdk-2).

{{partial:partials/code/snippet autocapture="true" unified="true"}}

### Browser SDK 2 classic script

If you use Browser SDK 2, but aren't migrated to the unified script, add the Guides and Surveys standalone SDK *below* the Browser SDK script.

```html
<script src="https://cdn.amplitude.com/libs/analytics-browser-{{sdk_versions.browser}}-min.js.gz"></script>
<script src="https://cdn.amplitude.com/script/API_KEY.engagement.js"></script>
```

### Package managers

Install the Guides and Surveys SDK as a package with npm or Yarn.

{{partial:tabs tabs="npm, yarn"}}
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

### Snippet installation

Amplitude provides a snippet you can add to your site for testing.

```html
<script>REPLACE PRIOR TO LAUNCH -- BREAKS SYNTAX HIGHLIGHTING DUE TO SIZE</script>
<script>window.amplitude.add(window.engagement.plugin({ serverUrl: url }));</script>
```

### With third-party analytics

If you use an analytics provider other than Amplitude, install the standalone Guides and Surveys SDK.

{{partial:tabs tabs="Script, npm, yarn"}}
{{partial:tab name="Script"}}
```html
<script src="https://cdn.amplitude.com/script/API_KEY.engagement.js"></script>
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

#### Initialize the SDK

Using the Guides and Surveys standalone SDK with a third-party analytics provider requires extra configuration to help map properties to Amplitude. This initialization code accepts parameters that define the user and any integrations.

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

## Integrations

Add tracking capability to the Guides and Surveys SDK to enable monitoring of survey interactions.

```js
addIntegration(integration: Integration): void
```

| Parameter     | Type          | Description                                               |
| ------------- | ------------- | --------------------------------------------------------- |
| `integration` | `Integration` | Required. Integration implementation for tracking events. |

```js
interface Integration {
  track: (event: Event) => void;
}
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

## Forward event

Trigger Guides and Surveys programmatically.

```js
forwardEvent(event: Event): void
```

| Parameter | Type    | Description                                                                                                             |
| --------- | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `event`   | `Event` | Required. An [event](/docs/sdks/analytics/browser/browser-sdk-2#track-an-event) object that launches a guide or survey. |


## Reset

Reset a guide or survey to a specific step.

```js
gs.reset(key: string, stepIndex?: number)
```

| Parameter   | Type     | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                       |
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

| Parameter   | Type     | Description                                                                |
| ----------- | -------- | -------------------------------------------------------------------------- |
| `key`       | `string` | Required. The guide or survey's key.                                       |
| `stepIndex` | `number` | Required. The zero-based index of the step to show. Defaults to the initial step. |

## Close all

Close all active guides and surveys.

```js
gs.closeAll(): void
```