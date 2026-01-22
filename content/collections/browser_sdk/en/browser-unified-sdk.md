---
id: 9d42e657-b743-4cb3-8e32-1c75c1e8f580
blueprint: browser_sdk
title: 'Browser Unified SDK'
sdk_status: beta
article_type: core
supported_languages:
  - js
  - ts
github_link: 'https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/unified'
releases_url: 'https://github.com/amplitude/Amplitude-TypeScript/releases?q=unified&expanded=true'
bundle_url: 'https://www.npmjs.com/package/@amplitude/unified'
shields_io_badge: 'https://img.shields.io/npm/v/@amplitude/unified/latest.svg'
major_version: 1
exclude_from_sitemap: false
source: 'https://www.docs.developers.amplitude.com/data/sdks/unified/'
package_name: '@amplitude/unified'
platform: Browser
full_details: true
---
The Unified SDK provides a single entry point for all Amplitude features, including Analytics, Experiment, Session Replay, and Guides and Surveys. It simplifies the integration process by handling the initialization and configuration of all components.

{{partial:admonition type="beta" heading="Beta Release"}}
The Browser Unified SDK is currently in beta. There may be breaking changes before the stable release. Amplitude recommends testing thoroughly in a development environment before you deploy to production.
{{/partial:admonition}}

{{partial:admonition type="info" heading="Individual Product Installation"}}
The Unified SDK installs Analytics, Experiment, Session Replay, and Guides and Surveys. If you're concerned about bundle size and only need specific products, you can install them individually:

- [Analytics](/docs/sdks/analytics/browser/browser-sdk-2) - For tracking user events and behavior
- [Experiment](/docs/sdks/experiment-sdks/experiment-javascript) - For running A/B tests and feature flags
- [Session Replay](/docs/session-replay/session-replay-standalone-sdk) - For capturing and replaying user sessions
- [Guides and Surveys](/docs/guides-and-surveys/sdk) - For in-product messaging and surveys
{{/partial:admonition}}

## Install the SDK

Install the dependency with npm or yarn.

{{partial:tabs tabs="npm, yarn, AI prompt, Snippet"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/unified
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/unified
```
{{/partial:tab}}
{{partial:tab name="AI prompt"}}
Paste the prompt below into your terminal or AI tools like Copilot, Cursor, Replit or Bolt.

Click the Key icon to insert your Amplitude API key.

```text
You are an Amplitude Analytics installation wizard, an expert AI programming assistant that implements Amplitude Analytics and Session Replay for JavaScript-based applications.

Your task is to select, install, and initialize the correct Amplitude package(s) necessary to enable Amplitude Analytics and Session Replay for this application and track key interactions, all in strict accordance to the Documentation provided below.

Rules
- Do not make any code changes if this is not a JavaScript-based application
- Ensure ALL the code added ONLY runs client-side and never server-side
- Ensure amplitude is only initialized once during the lifecycle of the application

Context
---

## Documentation
1. Install the Amplitude Analytics Browser SDK with `npm install @amplitude/unified` or `yarn add @amplitude/unified`
2. Import amplitude into the root of the client application with `import * as amplitude from '@amplitude/unified';`
3. Initialize amplitude with `amplitude.initAll('AMPLITUDE_API_KEY', {"analytics":{"autocapture":true},"sessionReplay":{"sampleRate":1}});`
```
{{/partial:tab}}
{{partial:tab name="Snippet"}}
Paste this snippet into the `<head>` of your site to track engagement.

Click the Key icon to insert your Amplitude API key.
```html
<script src="https://cdn.amplitude.com/script/AMPLITUDE_API_KEY.js"></script><script>window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));window.amplitude.init('AMPLITUDE_API_KEY', {"fetchRemoteConfig":true,"autocapture":{"attribution":true,"fileDownloads":true,"formInteractions":true,"pageViews":true,"sessions":true,"elementInteractions":true,"networkTracking":true,"webVitals":true,"frustrationInteractions":true}});</script>
```
{{/partial:tab}}
{{/partial:tabs}}

## Initialize the SDK

The Unified SDK provides a single initialization method that initializes all Amplitude features.

```typescript
import { initAll } from '@amplitude/unified';

initAll('AMPLITUDE_API_KEY');
```

## Access SDK features

The Unified SDK provides access to all Amplitude features through a single interface:

{{partial:admonition type="info" heading="Feature Documentation"}}
For detailed information about each product's features and APIs, refer to their respective documentation:
- [Analytics Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2)
- [Experiment JavaScript SDK](/docs/sdks/experiment-sdks/experiment-javascript)
- [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk)
- [Guides and Surveys Web SDK](/docs/guides-and-surveys/sdk)
{{/partial:admonition}}

```typescript
import { 
  track, 
  identify, 
  experiment, 
  sessionReplay 
} from '@amplitude/unified';

// Track events
track('Button Clicked', { buttonName: 'Sign Up' });

// Identify users
identify(new Identify().set('userType', 'premium'));

// Access Experiment features
const variant = await experiment.fetch('experiment-key');

// Access Session Replay features
sessionReplay.flush();
```

## Configuration

The Unified SDK supports configuration options for all Amplitude features. You can configure each product individually while sharing some common options.

```typescript
import { initAll } from '@amplitude/unified';

initAll('AMPLITUDE_API_KEY', {
  // Shared options for all SDKs (optional)
  serverZone: 'US', // or 'EU'
  instanceName: 'my-instance',
  
  // Analytics options
  analytics: {
    // Analytics configuration options
  },
  
  // Session Replay options
  sessionReplay: {
    // Session Replay configuration options
    sampleRate: 1 // To enable session replay
  },
  
  // Experiment options
  experiment: {
    // Experiment configuration options
  },
  
  // Guides and Surveys options
  engagement: {
    // Guides and Surveys configuration options
  }
});
```

### Shared options

|Name|Type|Default|Description|
|-|-|-|-|
|`serverZone`|`'US'` or `'EU'`|`'US'`|The server zone to use for all SDKs.|
|`instanceName`|`string`|`$default_instance`|A unique name for this instance of the SDK.|

### Analytics options

All options from `@amplitude/analytics-browser` are supported. See the [Analytics Browser SDK documentation](/docs/sdks/analytics/browser/browser-sdk-2#initialize-the-sdk) for details.

### Session Replay options

The Unified Browser SDK supports all options from `@amplitude/plugin-session-replay-browser`. See the [Session Replay Plugin documentation](/docs/session-replay/session-replay-plugin#configuration) for more information. Set `config.sessionReplay.sampleRate` to a non-zero value to enable session replay. 

Sample Rate controls the rate at which Amplitude captures session replays. For example, if you set `config.sessionReplay.sampleRate` to `0.5`, Session Replay captures roughly half of all sessions.


### Experiment options

All options from `@amplitude/plugin-experiment-browser` are supported. See the [Experiment documentation](/docs/sdks/experiment-sdks/experiment-javascript#configuration) for details.

### Guides and Surveys options

The Unified Browser SDK supports all [Guides and Surveys options](/docs/guides-and-surveys/sdk#initialize-the-sdk). The engagement plugin initializes automatically when you pass engagement options in the configuration.
