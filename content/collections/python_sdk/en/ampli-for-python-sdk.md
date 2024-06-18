---
id: 1af7ad64-aaae-45df-b562-e7ebe3470288
blueprint: python_sdk
title: 'Ampli for Python SDK'
sdk_status: current
article_type: ampli
supported_languages:
  - python
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715796464
source: https://www.docs.developers.amplitude.com/data/sdks/python/ampli/
---
Amplitude Data supports tracking analytics events from Python apps (Python 3.6 or higher). The generated tracking library is packaged as a python package.

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```shell
    pip install amplitude-analytics
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```shell
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```shell
    ampli pull [--path ./ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```python
    from .ampli import *
    

    ampli.load(LoadOptions(
      client=LoadClientOptions(AMPLITUDE_API_KEY)
    ))
    ```

5. [Identify users and set user properties](#identify)

    ```python
    ampli.identify("user_id", Identify(userProp="A trait associated with this user"))
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```python
    ampli.song_played('user_id', SongPlayed(song_id="song-1"))
    ampli.track('user-id', new SongFavorited(song_id="song-2"));
    ```

7. [Flush events before application exit](#flush)

    ```python
    ampli.flush();
    ```

8. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Install the Amplitude SDK

If you haven't already, install the core Amplitude SDK dependencies.

```bash
pip install amplitude-analytics
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

Initialize Ampli in your code. The `load()` method requires a configuration options parameter:

```python
from .ampli import *

ampli.load(LoadOptions(
   client=LoadClientOptions(AMPLITUDE_API_KEY)
))
```

| Arg of load() | Description |
|-|-|
|`options`| Required. An instance of LoadOptions. Specifies configuration options for the Ampli Wrapper.|

| Arg of LoadOptions | Description |
|-|-|
|`disabled`|Optional. Defaults to False. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|
|`client`|Optional. Defaults to None. A instance of LoadClientOptions specifies configuration options for the Amplitude core SDK client.|

| Arg of LoadClientOptions | Description |
|-|-|
|`instance`| <span class="required">Required if `apiKey` isn't set</span>. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`api_key`| <span class="required">Required if `instance` isn't set</span>. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
|`configuration`|Optional. Defaults to None. Specifies the Amplitude configuration. This option overrides the default configuration.|

## Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as Ampli creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts a string `user_id`, an Identify event instance, and an optional `EventOptions`.

For example your tracking plan contains a user property called `role`. The property's type is a string.

```python
ampli.identify("user_id", Identify(role="admin"))
```

The options argument allows you to pass [Amplitude fields](/docs/apis/analytics/http-v2#keys-for-the-event-argument) for this call, such as `device_id`.

```python
ampli.identify("user_id", Identify(role="admin"), EventOptions(device_id="device_id"))
```

## Group identify

Call `group_identify()` to identify a group in your app and set/update group properties.

Just as Ampli creates types for events and their properties, it creates types for group properties.

The `group_identify()` function accepts a string `group_type`, a string `group_name`, an Group event instance, and an optional `EventOptions`.

For example your tracking plan contains a group `sport:football` has a property called `total_member`. The property's type is a int.

```python
ampli.group_identify("sport", "football", Group(total_member=23))
```

## Set group

Call `set_group()` to associate a user with their group (for example, their department or company). The `set_group()` function accept `user_id` `group_type`, `group_name` and an optional EventOptions.

```python
ampli.set_group("user_id", "sport", "football")
```

`group_name` can be one group name string or multiple group names list.

```python
ampli.set_group("user_id", "sport", ["football", "basketball"])
```

## Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

```python
ampli.event_name("user_id", EventName(...), EventOptions(...))
```

The optional `EventOptions` argument allows you to pass [Amplitude fields](/docs/apis/analytics/http-v2#keys-for-the-event-argument), like `device_id`.

For example, in the following code snippet, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

```python
ampli.song_played('user_id', SongPlayed(
  song_id = 'songId', # str,
  song_favorited = True, # bool
))
```

Ampli also generates a class for each event.

```python
my_event = SongPlayed(
  song_id = 'songId', # str,
  song_favorited = True, # bool
)
```

Send event objects using the generic track method.

```python
ampli.track('user_id', SongPlayed(
  song_id = 'songId', # str,
  song_favorited = True, # bool
), EventOptions(device_id="device_id"))
```

## Flush

The Ampli wrapper queues events and sends them on an interval based on the configuration.

Call `flush()` to immediately send any pending events.

The `flush()` method returns a promise that can be used to ensure all pending events have been sent before continuing.
This can be useful to call prior to application exit.

Ampli flushes events in the buffer automatically when `flushQueueSize` or `flushInterval` are reached.

Ampli sends events automatically without calling `flush()`, but using `flush()` is useful if you need to send events before the application exits.

```python
ampli.flush();
```

## Plugin

Plugins allow you to extend the Amplitude behavior, for example, modifying event properties (enrichment type) or sending to third-party APIs (destination type).

First you need to define your plugin. Destination Plugin example:

```python
from amplitude import DestinationPlugin, PluginType, BaseEvent, IdentifyEvent
from analytics import Client as SegmentClient


class SegmentPlugin(DestinationPlugin):

    def __init__(self, write_key):
        self.plugin_type = PluginType.DESTINATION
        self.configuration = None
        self.segment = SegmentClient(write_key)

    def setup(self, client):
        self.configuration = client.configuration

    def execute(self, event: BaseEvent) -> None:
        if isinstance(event, IdentifyEvent):
            self.segment.identify(event.user_id, event.user_properties)
        elif isinstance(event, BaseEvent):
            self.segment.track(event.user_id, event.event_type, event.event_properties)
```

Add your plugin after init Ampli:

```python
ampli.client.add(SegmentPlugin("write_key"))
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