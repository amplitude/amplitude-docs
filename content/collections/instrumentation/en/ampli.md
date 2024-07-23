---
id: ba956cb4-9ae1-456a-b122-984b491048f6
blueprint: instrumentation
title: Ampli
source: 'https://www.docs.developers.amplitude.com/sdks/ampli-overview/'
nav_title: developers
---
**Ampli** dynamically generates a light-weight wrapper for the **Amplitude SDK** based on your analytics tracking plan in **Amplitude Data** making event tracking easier and less error-prone.

This document provides a high-level overview of Ampli. For more information, see [Amplitude Academy](https://academy.amplitude.com/instrumenting-events-with-amplitude-data-and-the-ampli-cli).


The **Ampli Wrapper** provides types and methods that prevent human error by strictly enforcing event names and property values. The wrapper code enables autocompletion for all events and properties in your tracking plan, as well as static type checks at development and compile time.

```typescript
import { ampli, SongPlayed } from './ampli';

// These 2 events are tracked as expected.
ampli.songPlayed({ title: 'Happy Birthday' });
ampli.track(new SongPlayed({ title: 'Song 2' }));

// The following 2 events won't track due to data quality issues.
// Instead they generate type errors at build time with information
// about the expected property names and types.

// Error: Event 'Song Played' is missing required property 'title'
ampli.songPlayed({ name: 'I Knew You Were Trouble' });

// Error: Property 'title' received 'boolean' expected type 'String'
ampli.songPlayed({ title: true });
```

Compare this to the general purpose **Amplitude SDK**. Sending events with hand entered values can create data quality issues and require close coordination between data governors and engineers.

```typescript
import * as amplitude from '@amplitude/analytics-browser';

// These 2 events are tracked as expected
amplitude.track('Song Played', { title: 'Happy Birthday'});
amplitude.track({
    event_type: 'Song Played',
    event_properties: {title: 'Song 2'}
});

// The following 2 events are tracked but have data quality issues making them
// difficult to include in analysis. Typos and type errors are easy to create
// and hard to find & fix.

// Charts based on 'title' will not include this event, which sets 'name' instead.
amplitude.track('Song Played', { name: 'I Knew You Were Trouble' });

// This event will not be included in charts based on event_type='Song Played'.
// Also it sets 'title' to boolean 'true' instead of the expected type 'String'.
amplitude.track('sonG Playd', { title: true });
```

The **Ampli CLI** generates the **Ampli Wrapper** and can verify the instrumentation status of your events. This makes it easy to know if you missed any event tracking calls giving you confidence that you successfully completed your implementation.

```shell
➜ ampli status
✔ Verifying event tracking implementation in source code
  ✔ Song Played (1 location)
✔ All events tracked: 1 found, 1 total
```

## Supported platforms

| Platform     | Ampli Support | Supported Amplitude SDK(s)                                                                                                                                                                                                                                                 |
| ------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Browser      | Yes           | [`@amplitude/analytics-browser`](/docs/sdks/analytics/browser/browser-sdk-1/)<br/> [Ampli documentation](/docs/sdks/analytics/browser/ampli-for-browser-sdk-1-0/)<br/><br/> [`amplitude-js`](/docs/sdks/analytics/browser/javascript-sdk)<br/>[Ampli documentation](/docs/sdks/analytics/browser/ampli-for-javascript-sdk)                               |
| Android      | Yes           | [`com.amplitude:analytics-android`](/docs/sdks/analytics/android/android-kotlin-sdk)<br/> [Ampli documentation](/docs/sdks/analytics/android/ampli-for-android-kotlin-sdk)                            |
| iOS          | Yes           | [`Amplitude`](/docs/sdks/analytics/ios/ios-swift-sdk)<br/>[Ampli documentation](/docs/sdks/analytics/ios/ampli-for-ios-swift-sdk)                                                                                                                                                                                            |
| React Native | Yes           | [`@amplitude/analytics-react-native`](/docs/sdks/analytics/react-native/react-native-sdk)<br/> [Ampli documentation](/docs/sdks/analytics/react-native/ampli-for-the-react-native-sdk) |
| Node         | Yes           | [`@amplitude/analytics-node`](/docs/sdks/analytics/node/node-js-sdk)<br/> [Ampli documentation](/docs/sdks/analytics/node/node-js-ampli-wrapper)                                                 |
| Go           | Yes           | [`github.com/amplitude/analytics-go`](/docs/sdks/analytics/go/go-sdk/)<br/>[Ampli documentation](/docs/sdks/analytics/go/ampli-for-go)                                                                                                                                                                      |
| Python       | Yes           | [`amplitude-analytics`](/docs/sdks/analytics-sdks/python/python-sdk)<br/>[Ampli documentation](/docs/sdks/analytics-sdks/python/ampli-for-python-sdk/)                                                                                                                                                                            |
| Java         | Yes           | [`com.amplitude:java-sdk`](/docs/sdks/analytics/java/jre-java-sdk)<br/>[Ampli documentation](/docs/sdks/analytics/java/ampli-for-java-sdk)                                                                                                                                                                             |
| Flutter      | No            |                                                                                                                                                                                                                                                                            |
| Unity        | No            |                                                                                                                                                                                                                                                                            |
| Unreal       | No            |                                                                                                                                                                                                                                                                            |

## Amplitude Data

**Amplitude Data** allows you to plan your analytics by defining the events and properties you want to track in your application. **Ampli** requires a tracking plan in **Amplitude Data** with events added to an **SDK source**.

The following examples will reference this tracking plan.

- Browser SDK source named `web`
- Event `Song Played` with required property `title` of type `String`
- Event `Song Played` is added to source `web`
- Environment named `production`

## Ampli CLI

The Ampli CLI connects to Amplitude Data and uses the schema information for a given Source to generate and verify the Ampli Wrapper in your project.

### Install Ampli CLI

{{partial:tabs tabs="brew, npm"}}
{{partial:tab name="brew"}}
```shell
brew tap amplitude/ampli
brew install ampli
```
{{/partial:tab}}
{{partial:tab name="npm"}}
```shell
npm install -g @amplitude/ampli
```
{{/partial:tab}}
{{/partial:tabs}}

### Generate the Ampli wrapper

Running `ampli pull` connects to Amplitude Data and downloads the Ampli Wrapper for your tracking plan.

```shell
ampli pull [source-name] [--path ./path/for/generated/ampli/wrapper]
```

The Ampli Wrapper is associated to a specific Source in Amplitude Data. You can optionally provide the desired Source name as a parameter, if not you will be prompted to select one.

```shell
? Select a Source: web
```

The first time you run ampli pull on a source you will be asked to select a development language and an underlying Amplitude SDK. If you want to change the Source configuration later you can run ampli configure to select a different platform, language, or Amplitude SDK.

```shell
? Select a platform: Browser
? Select a language: TypeScript
? Select a SDK: @amplitude/analytics-browser@^1.0 (recommended)
```

The generated Ampli Wrapper will then be available in the provided path. If no path was provided, the Ampli CLI provides a sensible default based on the platform of your Source.

```shell
✔ Tracking library generated successfully.
  ↳ Path: ./ampli
```

## Verify event instrumentation


Running `ampli status` scans the source code in your project directory and checks for event tracking calls e.g. `ampli.songPlayed({ ... })`. It will output the number of times each event is detected.

```shell
➜ ampli status
✔ Verifying event tracking implementation in source code
  ✔ Song Played (1 location)
✔ All events tracked: 1 found, 1 total
```

If there are events in your tracking plan that are not implemented ampli status will return an error. For example, if you were to add a new event `Song Favorited` to the tracking plan but not instrument it in the project.

```shell
➜ ampli status
✔ Verifying event tracking implementation in source code
  ✔ Song Played (1 location)
  ✘ Song Favorited
✘ ERROR Event tracking incomplete: 1 missed, 2 total
```

## Ampli Wrapper

### A generated SDK for your tracking plan

The **Ampli Wrapper** is a thin facade over the **Amplitude SDK** that provides convenience methods e.g. `ampli.songPlayed()` and classes e.g. `new SongPlayed()` for all events in your tracking plan.

```typescript
import { ampli, SongPlayed } from './ampli';

ampli.load({ client: { apiKey: AMPLITUDE_API_KEY } });

ampli.client.setUserId('ampli@amplitude.com');

ampli.songPlayed({ title: 'Happy Birthday' });

ampli.track(new SongPlayed({ title: 'Song 2'}));

ampli.flush();
```

### Wrapping the Amplitude SDK

The **Ampli Wrapper** provides access to all methods of the underlying **Amplitude SDK** instance via `ampli.client`.  It is possible to configure the instance directly or provide an existing one. If none is provided a default instance of the Amplitude SDK is used.

```typescript
import * as amplitude from '@amplitude/analytics-browser';
import { ampli } from './ampli';
import { CustomPlugin } from './plugins';

// Initialize the Amplitude SDK instance
amplitude.init(AMPLITUDE_API_KEY);

// Provide the Amplitude SDK instance to Ampli
ampli.load({ client: { instance: amplitude }});
assertEqual(ampli.client, amplitude);

// Call methods directly on the Amplitude SDK
ampli.client.add(CustomPlugin);
ampli.client.setUserId('ampli@amplitude.com');
ampli.client.setGroup('team', 'awesome');
```

To configure the underlying Amplitude SDK instance without creating it directly provide `client.configuration` to `ampli.load()`. All configuration options of the underlying Amplitude SDK are supported.

```typescript
ampli.load({ client: { apiKey: AMPLITUDE_API_KEY, configuration: { serverZone: 'EU' } }});
```

### Add the Ampli Wrapper to your project and track events

Use the **Ampli CLI** to download the **Ampli Wrapper**.

```shell
ampli pull [--path ./ampli]
```

The downloaded source code in `path` and `ampli.json` should be added to your repository and source control.

```shell
git add ./ampli ampli.json
git commit -m "Added Ampli wrapper"
```

Depending on the **Amplitude SDK** selected for your Source your will need to install the corresponding dependency.

```shell
npm install @amplitude/analytics-browser
```

Once the **Ampli Wrapper** has been downloaded with `ampli pull` and dependencies installed you can start using it to track events in your code.

```typescript
import { ampli, SongPlayed } from './ampli';

ampli.load({ client: { apiKey: AMPLITUDE_API_KEY } });
ampli.songPlayed({ title: 'Happy Birthday' });
ampli.flush();
```

Use the **Ampli CLI** to verify instrumentation status of the **Ampli Wrapper** in your project.

```shell
ampli status
```