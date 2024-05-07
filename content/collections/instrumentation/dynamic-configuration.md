---
id: a0da41b8-4d51-4efc-9edf-30e7cf7c7929
blueprint: instrumentation
title: 'Dynamic Configuration'
source: 'https://www.docs.developers.amplitude.com/data/dynamic-configuration/'
---
Some Amplitude SDK versions (iOS 5.3.0+, Android 2.28.0+, JavaScript 8.9.0+, React Native, Unity, and Flutter) let you set your apps to use dynamic configuration.

 Dynamic configuration finds the best Amplitude server URL based on app users' location.

## Considerations

- If you have your own proxy server and use `setServerUrl` API, don't use dynamic configuration.
- If you have users in Mainland China, Amplitude recommends that you use dynamic configuration.
- By default, this feature is off. You must explicitly enable it to use it.

## Use cases

### Region-based

Send users from different regions to the server for their region.

``` mermaid
stateDiagram-v2
  s1: Dynamic Config Server
  cn_user: User in China
  us_user: User in United States
    s1 --> cn_user : api2.amplitude.com
    s1 --> us_user : api.amplitude.com

```

### Dynamically adjust server URLs

If a server URL becomes unreachable for some reason, Amplitude can change the address in the dynamic configuration server.
 This makes the ingestion endpoint dynamic, so you don't need to release a new version of your app.

``` mermaid
stateDiagram-v2
  s1: Dynamic Config Server
  user: User
    s1 --> user : new.amplitude.com (new URL)
    s1 --> user : old.amplitude.com (broken URL)
```

## Usage

Enable the `useDynamicConfig` flag.

{{partial:tabs tabs="iOS, Android, Flutter, JavaScript, React Native, Unity"}}
{{partial:tab name="iOS"}}
```objc
[Amplitude instance].useDynamicConfig = YES;
```
{{/partial:tab}}
{{partial:tab name="Android"}}
```java
AmplitudeClient.getInstance().setUseDynamicConfig(true);
```
{{/partial:tab}}
{{partial:tab name="Flutter"}}
```dart
Amplitude.getInstance().setUseDynamicConfig(true);
```
{{/partial:tab}}
{{partial:tab name="JavaScript"}}
```js
amplitude.getInstance().init(euApiKey, null, {
    useDynamicConfig: true,
});
```
{{/partial:tab}}
{{partial:tab name="React Native"}}
```ts
Amplitude.getInstance().setUseDynamicConfig(true);
```
{{/partial:tab}}
{{partial:tab name="Unity"}}
```c#
amplitude.setUseDynamicConfig(true);
```
{{/partial:tab}}
{{/partial:tabs}}