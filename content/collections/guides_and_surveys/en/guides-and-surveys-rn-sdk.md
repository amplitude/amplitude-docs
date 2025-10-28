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

## Install the SDK

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

## Initialize the SDK

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

{{partial:admonition type="note" heading=""}}
At this point, you are technically done installing. While optional, it is highly recommended to [set up URL handling for preview mode](/docs/guides-and-surveys/guides-and-surveys-rn-sdk#configure-linking).
{{/partial:admonition}}

## Configure linking

If your app doesn't have deep linking enabled, follow the [React Native instructions](https://reactnative.dev/docs/linking#enabling-deep-links) to add support for deep linking. Previewing Guides and Surveys on a device requires this support.

### Locate the mobile URL scheme

In Amplitude, navigate to your Project's settings.

On the **General** tab, locate the **URL scheme (mobile)** field. Copy its value, for example, `amp-abc123`.

## Changelog
You can access the changelog [here](/docs/guides-and-surveys/guides-and-surveys-mobile-sdk-changelog).