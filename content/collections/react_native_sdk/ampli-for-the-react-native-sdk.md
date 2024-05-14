---
id: 4029875a-0e71-4ad0-869b-289dea48b625
blueprint: react_native_sdk
title: 'Ampli for the React Native SDK'
sdk_status: current
article_type: ampli
supported_languages:
  - js
  - ts
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715717973
---
The [Ampli Wrapper](/sdks/ampi/ampli-wrapper) is a generated, strongly typed API for tracking Analytics events based on your Tracking Plan in Amplitude Data. The tracking library exposes a function for every event in your team’s tracking plan. The function’s arguments correspond to the event’s properties.

[Ampli](/sdks/ampli) can benefit your app by providing autocompletion for events & properties defined in Data and enforce your event schemas in code to prevent bad instrumentation. 

Amplitude Data supports tracking analytics events from React Native apps written in JavaScript (ES6 and higher) and TypeScript (2.1 and higher). The generated tracking library is packaged as a CJS module.

## Quick start

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```shell
    npm install @amplitude/analytics-react-native @react-native-async-storage/async-storage
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```shell
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```shell
    ampli pull [--path ./src/ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```js
    import { ampli } from './src/ampli';
    
    ampli.load({ client: { apiKey: AMPLITUDE_API_KEY } });
    ```

5. [Identify users and set user properties](#identify)

    ```js
    ampli.identify('user-id', {
        userProp: 'A trait associated with this user'
    });
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```js
    ampli.songPlayed({ songId: 'song-1' });
    ampli.track(new SongPlayed({ songId: 'song-2' }));
    ```

7. [Flush events before application exit](#flush)

    ```js
    ampli.flush();
    ```

8. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Install the Amplitude SDK

If you haven't already, install the core Amplitude SDK dependencies.

{{partial:tabs tabs="npm, yarn"}}
{{partial:tab name="npm"}}
```bash
npm install @amplitude/analytics-react-native @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{partial:tab name="yarn"}}
```bash
yarn add @amplitude/analytics-react-native @react-native-async-storage/async-storage
```
{{/partial:tab}}
{{/partial:tabs}}

## Install Ampli CLI

You can install the Ampli CLI from Homebrew or npm.

{{partial:tabs tabs="brew, npm"}}
{{partial:tab name="brew"}}
```bash
brew tap amplitude/ampli
brew install ampli
```
{{/partial:tab}}
{{partial:tab name="npm"}}
```bash
npm install -g @amplitude/ampli
```
{{/partial:tab}}
{{/partial:tabs}}

### Pull the Ampli Wrapper into your project

Run the Ampli CLI `pull` command to log in to Amplitude Data and download the strongly typed Ampli Wrapper for your tracking plan. Ampli CLI commands are usually run from the project root directory.

```bash
ampli pull
```

## API

Ampli generates a thin facade over the Amplitude SDK which provides convenience methods. The Ampli Wrapper also grants access to every method of the underlying Amplitude SDK through `ampli.client`. [More details](/sdks/ampli#wrapping-the-amplitude-sdk).

### Load

Initialize Ampli in your code.
The `load()` function requires an options object to configure the SDK's behavior:

| Option |Description|
|----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|`disabled`| Optional. Boolean. Specifies whether the Ampli Wrapper does any work. When `true`, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.<br /><br />Defaults to `false`.|
|`client.instance`| <span class="required">Required if `client.apiKey` isn't set</span>. `AmplitudeClient`. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`client.apiKey`| <span class="required">Required if `client.instance` isn't set</span>. `String`. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
|`client.configuration`| Optional. `Amplitude.Config`. Overrides the default configuration for the AmplitudeClient.|

Example of initialization with `load` to override the default configuration:

```js
ampli.load({
  client: {
    apiKey: AMPLITUDE_API_KEY,
    configuration: {
      minIdLength: 10,
    }
  }
});
```

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as the Ampli Wrapper creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example, your tracking plan contains a user property called `role`. The property's type is a string.

```ts
ampli.identify('user-id', {
  role: 'admin'
});
```

The options argument allows you to pass [Amplitude fields](/apis/http-api-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

```ts
ampli.identify('user-id', {
  role: 'admin'
}, {
  deviceId: 'my-device-id'
});
```

### Group

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.

 ```ts
ampli.client.setGroup('groupType', 'groupName');
```

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to show that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]'.

Your code might look like this:

```ts
ampli.client.setGroup('orgId', ['10', '20']);
```

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call structure is like this:

```ts
ampli.eventName(properties: EventNameProperties, options: EventOptions)
```

The `properties` argument passes event properties.

The `options` argument allows you to pass [Amplitude fields](/apis/http-api-v2#properties-1), like `price`, `quantity` and `revenue`.

For example, in the following code, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited`.
 The property type for `songId` is string, and `songFavorited` is a boolean.

The event has an Amplitude field defined: `deviceId`. Learn more about Amplitude fields [here](/apis/http-v2-api/#keys-for-the-event-argument).

```ts
ampli.songPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
}, {
  deviceId: 'a-device-id',
});
```

Ampli also generates a class for each event.

```ts
const myEventObject = new SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
});
```

Track Event objects using Ampli `track`:

```ts
ampli.track(new SongPlayed({
  songId: 'songId', // string,
  songFavorited: true, // boolean
}));
```

### Flush

The Ampli wrapper queues events and sends them on an interval based on the configuration.

Call `flush()` to immediately send any pending events.

The `flush()` method returns a promise you can use to ensure all pending events send before continuing.
This can be useful to call prior to application exit.

```typescript
ampli.flush();
```

### Plugin

Plugins allow you to extend the Amplitude behavior, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type).

First you need to define your plugin. Enrichment Plugin example:

{{partial:tabs tabs="TypeScript, JavaScript"}}
{{partial:tab name="TypeScript"}}
```ts
import { BrowserConfig, EnrichmentPlugin, Event } from '@amplitude/analytics-types';

export class AddEventIdPlugin implements EnrichmentPlugin {
  name = 'add-event-id';
  type = 'enrichment' as const;
  currentId = 100;

  /**
    * setup() is called on plugin installation
    * example: client.add(new AddEventIdPlugin());
    */
  setup(config: BrowserConfig): Promise<undefined> {
      this.config = config;
  }

  /**
    * execute() is called on each event instrumented
    * example: client.track('New Event');
    */
  execute(event: Event): Promise<Event> {
    event.event_id = this.currentId++;
    return event;
  }
}
```
{{/partial:tab}}
{{partial:tab name="JavaScript"}}
```js
export class AddEventIdPlugin {
  name = 'add-event-id';
  type = 'enrichment';
  currentId = 100;

  /**
   * setup() is called on plugin installation
   * example: client.add(new AddEventIdPlugin());
   */
  setup(config) {
      this.config = config;
  }

  /**
   * execute() is called on each event instrumented
   * example: client.track('New Event');
   */
  execute(event) {
    event.event_id = this.currentId++;
    return event;
  }
}
```
{{/partial:tab}}
{{/partial:tabs}}

Add your plugin after init Ampli.

```ts
ampli.client.add(new AddEventIdPlugin())
```

## Ampli CLI

### Pull

The `pull` command downloads the Ampli Wrapper code to your project. Run the `pull` command from the project root.

```bash
ampli pull
```

Log in to your workspace when prompted and select a source.

```bash
➜ ampli pull
Ampli project is not initialized. No existing `ampli.json` configuration found.
? Create a new Ampli project here? Yes
? Organization: Amplitude
? Workspace: My Workspace
? Source: My Source
```

Learn more about [`ampli pull`](/sdks/ampli/ampli-cli#ampli-pull).

### Status

Verify that events are in your code with the status command:

```bash
ampli status [--update]
```

The output displays status and indicates what events are missing.

```bash
➜ ampli status
✘ Verifying event tracking implementation in source code
 ✔ Song Played (1 location)
 ✘ Song Stopped Called when a user stops playing a song.
Events Tracked: 1 missed, 2 total
```

Learn more about [`ampli status`](/sdks/ampli/ampli-cli#ampli-status).
