---
id: b623aa10-2002-4cf6-8bc1-0597f6e380fe
blueprint: guides_and_survey
title: 'Guides and Surveys React Native SDK'
---
Amplitude's Guides and Surveys SDK enables you to deploy [Guides and Surveys](/docs/guides-and-surveys) on your website or application.

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

## Configure linking

If your app doesn't have deep linking enabled, follow the [React Native instructions](https://reactnative.dev/docs/linking#enabling-deep-links) to add support for deep linking. Previewing Guides and Surveys on a device requires this support.

### Locate the mobile URL scheme

In Amplitude, navigate to your Project's settings.

On the **General** tab, locate the **URL scheme (mobile)** field. Copy its value, for example, `amp-abc123`.

## Boot the plugin

When you "boot" the plugin with a user ID, Guides and Surveys are 

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