---
id: c71d80ea-d8a8-4bf2-8c78-fa3e8f061a95
blueprint: go_sdk
title: 'Ampli for Go'
sdk_status: current
article_type: ampli
supported_languages:
  - go
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715275857
---
Amplitude Data supports tracking analytics events from Go apps. The generated tracking library is packaged as a Go package.

## Quick start

1. (Prerequisite) Create a Tracking Plan in Amplitude Data

    Plan your events and properties in [Amplitude Data](https://data.amplitude.com/). See detailed instructions [here](/docs/data/create-tracking-plan)

2. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```shell
    go get github.com/amplitude/analytics-go
    ```

3. [Install the Ampli CLI](#install-the-ampli-cli)

    ```shell
    npm install -g @amplitude/ampli
    ```

4. [Pull the Ampli Wrapper into your project](#pull)

    ```shell
    ampli pull [--path ./ampli]
    ```

5. [Initialize the Ampli Wrapper](#load)

    ```golang
    import "<your-module-name>/ampli"

    ampli.Instance.Load(ampli.LoadOptions{
        Client: ampli.LoadClientOptions{
            Configuration: ampli.NewClientConfig(AMPLITUDE_API_KEY),
        },
    })
    ```

6. [Identify users and set user properties](#identify)

    ```golang
    ampli.Instance.Identify(userID, ampli.Identify.Builder().
        UserProp("A trait associated with this user").
        Build(),
    )
    ```

7. [Track events with strongly typed methods and classes](#track)

    ```golang
    ampli.Instance.SongPlayed("user_id", ampli.SongPlayed.Builder().SongId("song-1").Build())
    ampli.Instance.Track("user_id", ampli.SongFavorited.Builder().SongId("song-2").Build())
    ```

8. [Flush events before application exit](#flush)

    ```golang
    ampli.Instance.Flush()
    ```

9. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Install the SDK

If you haven't already, install the core Amplitude SDK dependencies `analytics-go` using `go get`:

```shell
go get github.com/amplitude/analytics-go
```

## Install Ampli CLI

You can install the [Ampli CLI](/docs/data/ampli/cli/) from Homebrew or NPM.

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

## Ampli API

Ampli supports the following methods.

### Load

Initialize Ampli in your code. The `Load()` method requires a configuration options parameter:

```Go
import  "<your-module-name>/ampli"

ampli.Instance.Load(ampli.LoadOptions{
  Client: ampli.LoadClientOptions{
    Configuration: ampli.NewClientConfig(AMPLITUDE_API_KEY),
  },
})
```

| Arg of load() | Description |
|-|-|
|`options`| Required. A instance of LoadOptions. Specifies configuration options for the Ampli Wrapper.|

| <div class ="big-column">Arg of LoadOptions</div> | Description |
|-|-|
|`Instance`| <span class="required">Required if `APIKey` isn't set</span>. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`APIKey`| <span class="required">Required if `Instance` isn't set</span>. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
|`Disabled`|Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
|`Client`| A instance of LoadClientOptions specifies configuration options for the Amplitude core SDK client.|

| <div class ="big-column">Arg of LoadClientOptions</div> | Description |
|-|-|
|`Configuration`| Specifies the Amplitude configuration. This option overrides the default configuration.|

### Identify

Call `Identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `Identify()` function accepts a string `userID`, an Identify event instance, and optional `amplitude.EventOptions`.

All properties are passed in as parameters of methods to `ampli.Identify.Builder()`. For example your tracking plan only contains a required user property called `role`. The property's type is a string.

```Go
ampli.Instance.Identify(
    "user_id",
    ampli.Identify.Builder().Role("admin").Build(),
)
```

The options argument allows you to pass [Amplitude fields](/docs/apis/http-v2#keys-for-the-event-argument) for this call, such as `DeviceID`.

```Go
ampli.Instance.Identify(
    "user_id",
    ampli.Identify.Builder().Role("admin").Build(),
    amplitude.EventOptions{
        DeviceID: "device_id",
    },
)
```

### Groups

### Groups

The Amplitude Go SDK and Go Ampli Wrapper don't support Groups. If you're interested in this feature, submit a feature request through the widget on the Amplitude dashboard, or through a [support ticket](https://support.amplitude.com).

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

```Go
ampli.Instance.EventName(userID, ampli.EventName.Builder().EventProp(true).Build())
```

Optional `EventOptions` argument allows you to pass [Amplitude fields](/docs/apis/http-v2#keys-for-the-event-argument), like `DeviceID`.

For example, in the following code snippet, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

```Go
ampli.Instance.SongPlayed("user_id", ampli.SongPlayed.Builder().
    SongId("songId").
    SongPlayed(true).
    Build(),
    amplitude.EventOptions{}
)
```

Ampli also generates a builder for each event. Use `EventName.Builder()` to get the corresponding builder for each event.

```Go
ampli.Instance.SongPlayed.Builder().
    SongId("songId").
    SongPlayed(true).
    Build()
```

Send event objects using the generic track method.

```Go
ampli.Instance.Track("user-id", ampli.SongPlayed.Builder().
    SongId("songId").
    SongPlayed(true).
    Build(),
)
```

### Flush

The Ampli wrapper queues events and sends them on an interval based on the configuration.

Call `Flush()` to immediately send any pending events.

```go
ampli.Instance.Flush()
```

### Plugin

Plugins allow you to extend the Amplitude behavior, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type).

First you need to define your plugin: [plugin examples](/docs/sdks/analytics/go/go-sdk#plugins).

Add your plugin after init Ampli:

```Go
ampli.Instance.Client.Add(myDestinationPlugin)
```

## Ampli CLI

### Pull

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

### Status

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
