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
---
The Unified SDK provides a single entry point for all Amplitude features, including Analytics, Experiment, and Session Replay. It simplifies the integration process by handling the initialization and configuration of all components.

{{partial:admonition type="beta" heading="Beta Release"}}
The Browser Unified SDK is currently in beta. There may be breaking changes before the stable release. Amplitude recommends testing thoroughly in a development environment before you deploy to production.
{{/partial:admonition}}

{{partial:admonition type="info" heading="Individual Product Installation"}}
The Unified SDK installs Analytics, Experiment, and Session Replay. If you're concerned about bundle size and only need specific products, you can install them individually:

- [Analytics](/docs/sdks/analytics/browser/browser-sdk-2) - For tracking user events and behavior
- [Experiment](/docs/sdks/experiment-sdks/experiment-javascript) - For running A/B tests and feature flags
- [Session Replay](/docs/session-replay/session-replay-standalone-sdk) - For capturing and replaying user sessions

The Unified SDK doesn't support Guides and Surveys. If you need Guides and Surveys functionality, use the [Guides and Surveys SDK](/docs/guides-and-surveys/sdk) directly.
{{/partial:admonition}}

## Install the SDK

Install the dependency with npm or yarn.

{{partial:tabs tabs="npm, yarn"}}
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
{{/partial:tabs}}

## Initialize the SDK

The Unified SDK provides a single initialization method that initializes all Amplitude features.

```typescript
import { initAll } from '@amplitude/unified';

initAll('YOUR_API_KEY');
```

## Access SDK features

The Unified SDK provides access to all Amplitude features through a single interface:

{{partial:admonition type="info" heading="Feature Documentation"}}
For detailed information about each product's features and APIs, refer to their respective documentation:
- [Analytics Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2)
- [Experiment JavaScript SDK](/docs/sdks/experiment-sdks/experiment-javascript)
- [Session Replay Standalone SDK](/docs/session-replay/session-replay-standalone-sdk)
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

initAll('YOUR_API_KEY', {
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
