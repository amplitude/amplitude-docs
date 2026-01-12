---
id: b623aa10-2002-4cf6-8bc1-0597f6e380fe
blueprint: guides_and_survey
title: 'Guides and Surveys React Native SDK'
---
Amplitude's Guides and Surveys SDK enables you to deploy [Guides and Surveys](/docs/guides-and-surveys) on your website or application.

{{partial:admonition type="beta" heading="This SDK is in Open Beta"}}
This feature is in open beta and under active development.
{{/partial:admonition}}

## Requirements

The Guides and Surveys React Native SDK requires:

* The ["new" React Native architecture](https://reactnative.dev/architecture/landing-page)
* React Native 0.79.2+
* Android Gradle 8.7.2+
* Gradle 8+
* iOS 15+
* Swift 5.9+

## Installation

### Install the SDK

Install the Guides and Surveys React Native SDK as a package with npm or Yarn.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/plugin-engagement-react-native
npm install @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/plugin-engagement-react-native
yarn add @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading="Async storage"}}
Explicitly adding `@react-native-async-storage/async-storage` ensures the native module links correctly, since the `engagement` native module uses it.
{{/partial:admonition}}

Run `pod install` in the `ios` directory.

```bash
cd ios
bundle exec pod install
```

### Initialize the SDK

```js
//index.js
import {Linking} from 'react-native';

import { init, add } from '@amplitude/analytics-react-native';
import { getPlugin, handleURL } from '@amplitude/plugin-engagement-react-native';

init('<<< YOUR API KEY HERE >>>'); 
add(getPlugin());

Linking.getInitialURL().then(async (url) => {
    if (url) {
    const didHandleURL = await handleURL(url);
    if (didHandleURL) { return; }

    // Handle a non-Amplitude SDK URL
    }
});

Linking.addEventListener('url', async ({ url }) => {
    const didHandleURL = await handleURL(url);
    if (didHandleURL) { return; }

    // Handle a non-Amplitude SDK URL
});
```

{{partial:admonition type="note" heading="Amplitude server zone"}}
The `serverZone` used to initialize `@amplitude/analytics-react-native` will automatically be used (see https://amplitude.com/docs/sdks/analytics/react-native/react-native-sdk#configure-the-sdk), so you don't need to pass `serverZone` in the `options` argument to `init`.
{{/partial:admonition}}


#### Configuration options

| Parameter                | Type                                                                                              | Description                                                                                                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `apiKey`                 | `string`                                                                                          | Required. API key of the Amplitude project you want to use.                                                                                                               |
| `options.serverUrl`  | `string`                                                                                              | Optional. Sets a custom server URL for API requests. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://gs.amplitude.com` (US) or `https://gs.eu.amplitude.com` (EU)                                                         |
| `options.cdnUrl`     | `string`                                                                                              | Optional. Sets a custom CDN URL for static assets. Useful for [proxy setups](/docs/guides-and-surveys/proxy). Default: `https://cdn.amplitude.com` (US) or `https://cdn.eu.amplitude.com` (EU)                                                         |
| `options.mediaUrl`   | `string`                                                                                              | Optional. Sets a custom URL for proxying nudge images. Useful for [proxy setups](/docs/guides-and-surveys/proxy) when images are blocked. Default: `https://engagement-static.amplitude.com` (US) or `https://engagement-static.eu.amplitude.com` (EU) |
| `options.logLevel`   | `LogLevel.None` or `LogLevel.Error` or `LogLevel.Warn` or `LogLevel.Verbose` or `LogLevel.Debug`.     | Optional. Sets the log level. Default: `LogLevel.Warn`                                                                                                                    |
| `options.locale`     | `string`                                                                                              | Optional. Sets the locale for [localization](/docs/guides-and-surveys/sdk#localization). Default: `undefined`. Not setting a language means the default language is used. |

{{partial:admonition type="warning" heading="Use the same API key for Guides & Surveys and Analytics"}}
To avoid analytics mismatches and ensure accurate data collection, use the same API key for both Guides & Surveys and your Analytics SDK. Both should reference the same Amplitude project. Using different API keys can cause:

- The SDK to fetch guides and surveys from the wrong project
- Analytics data to appear in different projects
- Insights and survey responses are incomplete or mismatched

Make sure the API key you provide to Guides & Surveys matches the API key used to initialize your Amplitude Analytics SDK.
{{/partial:admonition}}

### Boot the plugin

Booting the plugin (with a user ID) enables Guides and Surveys to be shown:

```js
import {
  track,
  setDeviceId,
  setUserId,
} from '@amplitude/analytics-react-native';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    //
    // setting the User ID in @amplitude/analytics-react-native
    // --and-- passing it to boot() is necessary
    //
    setUserId('rn-test-user-1');
    setDeviceId('test-device-1');
    getPlugin().boot('rn-test-user-1', 'test-device-1');
  }, []);
}
```

{{partial:admonition type="note" heading=""}}
At this point, you are technically done installing. While optional, Amplitude recommends that you [set up URL handling for preview mode](/docs/guides-and-surveys/guides-and-surveys-rn-sdk#configure-linking).
{{/partial:admonition}}

## Add your application to project settings

After installing the SDK, add your React Native application to your Amplitude project settings so it appears as a platform option when you create guides and surveys.

To add your application:

1. Navigate to *Settings > Projects* in Amplitude.
2. Select your project.
3. Navigate to the **Guides and Surveys** tab.
4. In the **App Management** section, expand and click **+ Add App**.
5. Select **React Native** from the dropdown.

After you add your application, it appears as a platform option when you create or edit guides and surveys. This enables you to deliver guides and surveys to your React Native app users.

## Element targeting

Pin and tooltip guides require the ability for the SDK to target specific views on screen. The Engagement SDK uses the "testID" property on an element in the React Native DOM.

In the example component below, "welcome-banner" is the element targeting string that should be used in the Guides and Surveys dashboard.

```js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * A simple component with a testID that can be targeted
 * by the Amplitude Guides & Surveys SDK.
 */
export default function WelcomeBanner() {
  return (
    <View
      testID="welcome-banner"   // Element targeting via testID
      style={styles.banner}
    >
      <Text style={styles.bannerText}>
        Welcome to the App!
      </Text>
    </View>
  );
}
```

## Configure linking

If your app doesn't have deep linking enabled, follow the [React Native instructions](https://reactnative.dev/docs/linking#enabling-deep-links) to add support for deep linking. **Previewing guides and surveys on a phone, tablet, or simulator requires this configuration.**

### Locate the mobile URL scheme

To locate the URL scheme:
1. Navigate to *Settings > Projects* in Amplitude.
2. Select your project.
3. Navigate to the **General** tab.
4. Find the **URL scheme (mobile)** field.
5. Copy its value, for example, `amp-abcdefgh12345678`.

## Known limitations

### Tab bar element targeting

Pins and tooltips can't target tab bar items in navigation components (such as `@react-navigation/bottom-tabs`). Tab bars use native components that exist outside the standard React Native view hierarchy, which prevents the SDK from reliably locating and attaching guides to these elements.

**Workaround:** Use screen-based targeting or event-based triggers to show guides when users navigate to specific tabs, rather than pinning directly to tab bar items.

## Changelog

You can access the changelog [here](/docs/guides-and-surveys/guides-and-surveys-mobile-sdk-changelog).
