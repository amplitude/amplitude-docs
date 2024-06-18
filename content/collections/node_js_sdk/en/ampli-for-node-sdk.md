---
id: 5f0a9b3c-627c-4014-bb2e-d1ac1c465db9
blueprint: node_js_sdk
title: 'Ampli for Node SDK'
sdk_status: current
article_type: ampli
source: https://www.docs.developers.amplitude.com/data/sdks/node/ampli/
supported_languages:
  - js
  - ts
bundle_url: 'https://www.npmjs.com/package/@amplitude/ampli?activeTab=readme'
parent: 8cbcfa2a-a300-48c8-b551-aee1b1423cdb
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1710272806
---
The [Ampli Wrapper](/docs/sdks/ampli#ampli-wrapper) is a generated, strongly typed API for tracking Analytics events based on your Tracking Plan in Amplitude Data. The tracking library exposes a function for every event in your teamâs tracking plan. The functionâs arguments correspond to the eventâs properties.

[Ampli](/docs/sdks/ampli) can benefit your app by providing autocompletion for events & properties defined in Data and enforce your event schemas in code to prevent bad instrumentation.

{{partial:admonition type="tip" title="Enable real-time type checking for JavaScript"}}
Because JavaScript isn't a type-safe language, static type checking isn't built in like TypeScript. Some common IDEs allow for real-time type checks in JavaScript based on JSDoc.

For a better development experience Ampli generates JSDocs for all methods and classes.

To enable real-time type checking in VSCode for JavaScript:

1. Go to **Preferences > Settings** then search for **checkJs**.
2. Select **JS/TS > Implicit Project Config: Check JS**.

After it's activated, type errors appear directly in the IDE.

Jetbrains provides similar support:

1. Go to **Preferences > Editor > Inspections > JavaScript and TypeScript > General**.
2. In **Signature mismatch** and **Type mismatch**, set the **Severity** to Warning or Error based on your desired level of strictness.
{{/partial:admonition}}

{{partial:admonition type="tip" title="Linting with Prettier"}}
To prevent linting errors for eslint and tslint, the SDK-generated files have the following to disable the linters: 

`/* tslint:disable */`

`/* eslint-disable */`


There's no corresponding “in-code” functionality with Prettier. Instead, add the generated `path/to/ampli` to your `.prettierignore` file. You can get the path with `ampli pull`. See the [Prettier documentation](https://prettier.io/docs/en/ignore.html) for more information.
{{/partial:admonition}}

## Quick start

1. [(Prerequisite) Create a Tracking Plan in Amplitude Data](/docs/data/create-tracking-plan)

2. [Install the Amplitude SDK](#install-the-amplitude-sdk)

```bash
npm install @amplitude/node@^1.10.2 @amplitude/identify@^1.10.2 @amplitude/types@^1.10.2

```
3. [Install the Ampli CLI](#install-the-ampli-cli)

```bash
npm install -g @amplitude/ampli

```
4. [Pull the Ampli Wrapper into your project](#pull)

```bash
ampli pull [--path ./src/ampli]
```
5. [Initialize the Ampli Wrapper](#load)

```js
import { ampli } from './src/ampli';

ampli.load({ client: { apiKey: AMPLITUDE_API_KEY } });

```
6. [Identify users and set user properties](#identify)

```js
ampli.identify('user-id', {
 userProp: 'A trait associated with this user'
});

```
7. [Track events with strongly typed methods and classes](#track)

```js
ampli.songPlayed('ampli-user-id', { songId: 'song-1' });
ampli.track('ampli-user-id', new SongPlayed({ songId: 'song-2' });

```
8. [Flush events before application exit](#flush)

```js
ampli.flush();

```
9. [Verify implementation status with CLI](#status)

```bash
ampli status [--update]
```

## Install the SDK

If you haven't already, install the core Amplitude SDK dependencies.

```bash
npm install @amplitude/node@^1.10.2 @amplitude/identify@^1.10.2 @amplitude/types@^1.10.2

```

## Install Ampli

You can install the [Ampli CLI](/docs/sdks/ampli/ampli-cli) from Homebrew or NPM.

{{partial:tabs tabs="npm, brew"}}
{{partial:tab name="npm"}}
```bash
npm install -g @amplitude/ampli
```
{{/partial:tab}}
{{partial:tab name="brew"}}
```bash
brew tap amplitude/ampli
brew install ampli
```
{{/partial:tab}}
{{/partial:tabs}}

## Pull the Ampi wrapper into your project

Run the Ampli CLI `pull` command to log in to Amplitude Data and download the strongly typed Ampli Wrapper for your tracking plan. Ampli CLI commands are usually run from the project root directory.

```bash
ampli pull
```

## Initialize Ampli

Initialize Ampli in your code.

{{partial:tabs tabs="TypeScript, JavaScript"}}
{{partial:tab name="TypeScript"}}
```ts
import { ampli } from './ampli';
ampli.load({ client: { apiKey: AMPLITUDE_API_KEY } });
```
{{/partial:tab}}
{{partial:tab name="JavaScript"}}
```js
const { ampli } = require('./ampli');
ampli.load({ client: { apiKey: AMPLITUDE_API_KEY } });
```
{{/partial:tab}}
{{/partial:tabs}}

The `load()` function requires an options object to configure the SDK's behavior:

| Option | Type | Required | Description |
| --- | --- | --- | --- |
| `disabled` | `Boolean` | optional | Specifies whether the Ampli Wrapper does any work. When `true`, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.Defaults to `false`. |
| `client.instance` | `AmplitudeClient` | required if `client.apiKey` isn't set | Specifies an Amplitude instance. By default Ampli creates an instance for you. |
| `client.apiKey` | `String` | required if `client.instance` isn't set | Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan. |
| `client.options` | `Amplitude.Options` | optional | Overrides the default configuration for the AmplitudeClient. |

## Identify

Call `identify()` to set user properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user `properties`, and optional `options`.

For example, your tracking plan contains a user property called `role`. The property's type is a string.

```js
ampli.identify('user-id', {
 role: 'Admin'
});

```

The options argument allows you to pass [Amplitude fields](/docs/apis/analytics/http-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

TypeScriptJavaScript

```js
ampli.identify('user-id', {
 role: 'admin'
}, {
 deviceId: 'my-device-id'
});
```

## Group

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.


```js
ampli.setGroup('user-id', 'Group name', 'Group Value');

```

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's groupType, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').

Your code might look like this:

```js
ampli.setGroup('user-id', 'orgId', ['10', '20']);

```
{{/partial:admonition}}

## Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

```js
ampli.eventName(
 userId: string | undefined,
 properties: EventProperties,
 options: EventOptions,
 extra: MiddlewareExtra
)
```

`userId` in multi-tenant, server environments a `userId` must be provided for each tracking call to associate it to a

`properties` passes in event properties specific to this event in the tracking plan.

The `options` argument allows you to pass [Amplitude fields](/docs/apis/analytics/http-v2#properties-1), like `price`, `quantity` and `revenue`.

The `extra` argument lets you pass data to middleware.

For example, your tracking plan contains an event called Song Played. The SDK generates the `songPlayed` function for the event, using camel case to make it valid JavaScript. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

The event has two Amplitude fields defined: `price`, and `quantity`. Learn more about Amplitude fields [here](/docs/apis/analytics/http-v2#properties-1). The event has one MiddlewareExtra defined: `myMiddleware`. Learn more about [middleware](/docs/sdks/sdk-middleware).


```js
ampli.songPlayed('ampli-user-id', {
 songId: 'songId', // string,
 songFavorited: true, // boolean
}, {
 price: 1.23,
 quantity: 2
}, {
 myMiddleware: { myMiddlewareProp: "value to send to middleware" }
});
```

Ampli also generates a class for each event.

```js
const myEventObject = new SongPlayed({
 songId: 'songId', // string,
 songFavorited: true, // boolean
});

```

Track Event objects using Ampli `track`:

```js
ampli.track('ampli-user-id', new SongPlayed({
 songId: 'songId', // string,
 songFavorited: true, // boolean
}));

```

## Flush
The Ampli wrapper queues events and sends them on an interval based on the configuration.

Call `flush()` to immediately send any pending events.

The `flush()` method returns a promise that can be used to ensure all pending events have been sent before continuing.
This can be useful to call prior to application exit.

Ampli flushes events in the buffer automatically when `flushQueueSize` or `flushInterval` are reached.

Ampli sends events automatically without calling `flush()`, but using `flush()` is useful if you need to send events before the application exits.

```js
ampli.flush();

```

## Pull

The `pull` command downloads the Ampli Wrapper code to your project. Run the `pull` command from the project root.

```bash
ampli pull

```

You will be prompted to log in to your workspace and select a source.

```bash
➜ ampli pull
Ampli project is not initialized. No existing `ampli.json` configuration found.
? Create a new Ampli project here? Yes
? Organization: Amplitude
? Workspace: My Workspace
? Source: My Source
```

## Status

Verify that events are implemented in your code with the status command:

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