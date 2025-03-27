---
id: 4a49ddd0-6bd6-4758-9985-85149b794f13
blueprint: ios_sdk
title: 'Ampli for iOS Swift SDK'
sdk_status: current
article_type: ampli
supported_languages:
  - swift
  - obj-c
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721151464
source: 'https://www.docs.developers.amplitude.com/data/sdks/ios-swift/ampli/'
ampli_examples:
  -
    id: lyop4qhh
    ampli_language: Objective-C
    ampli_example_link: 'https://github.com/amplitude/ampli-examples/blob/main/ios/objective-c/v2/AmpliObjectiveCSampleApp'
  -
    id: lyop4rh4
    ampli_language: Swift
    ampli_example_link: 'https://github.com/amplitude/ampli-examples/blob/main/ios/swift/v2/AmpliSwiftSampleApp'
---
Amplitude Data supports tracking analytics events from iOS apps written in Swift and Objective-C.

## Quick Start

1. [Install the Amplitude SDK](#install-the-amplitude-sdk)

    ```bash
    pod 'AmplitudeSwift', '~> 1.0'
    ```

2. [Install the Ampli CLI](#install-the-ampli-cli)

    ```bash
    npm install -g @amplitude/ampli
    ```

3. [Pull the Ampli Wrapper into your project](#pull)

    ```bash
    ampli pull [--path ./Ampli]
    ```

4. [Initialize the Ampli Wrapper](#load)

    ```swift
    Ampli.instance.load(LoadOptions(
      environment: AmpliEnvironment.Production
    ))
    ```

5. [Identify users and set user properties](#identify)

    ```swift
    Ampli.instance.identify("userID", Identify(
        userProp: "A trait associated with this user"
    ))
    ```

6. [Track events with strongly typed methods and classes](#track)

    ```swift
    Ampli.instance.songPlayed(SongPlayed(songId: "song-1")
    Ampli.instance.track(SongFavorited(songId: "song-2")
    ```

7. [Flush events before application exit](#flush)

    ```swift
    Ampli.instance.flush()
    ```

8. [Verify implementation status with CLI](#status)

    ```shell
    ampli status [--update]
    ```

## Install the SDK

Install the Amplitude Analytics iOS SDK with CocoaPods, Carthage, or Swift Package Manager. 


{{partial:tabs tabs="CocoaPods, Swift Package Manager, Carthage"}}
{{partial:tab name="CocoaPods"}}
1. Add the dependency to your `Podfile`:

    ```bash
    pod 'AmplitudeSwift', '~> 1.0'
    ```
2. Run `pod install` in the project directory.
{{/partial:tab}}
{{partial:tab name="Swift Package Manager"}}
1. Navigate to `File` > `Swift Package Manager` > `Add Package Dependency`. This opens a dialog that allows you to add a package dependency. 
2. Enter the URL `https://github.com/amplitude/Amplitude-Swift` in the search bar. 
3. Xcode will automatically resolve to the latest version. Or you can select a specific version. 
4. Click the "Next" button to confirm the addition of the package as a dependency. 
5. Build your project to make sure the package is properly integrated.
{{/partial:tab}}
{{partial:tab name="Carthage"}}
Add the following line to your `Cartfile`.
```bash
github "amplitude/
```
Check out the [Carthage docs](https://github.com/Carthage/Carthage#adding-frameworks-to-an-application) for more info.
{{/partial:tab}}
{{/partial:tabs}}

## Install Ampli CLI

Install the [Ampli CLI](/docs/sdks/ampli/ampli-cli) from Homebrew or npm.

{{partial:tabs tabs="Homebrew, npm"}}
{{partial:tab name="Homebrew"}}
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

## Use Ampli

Ampli generates a thin facade over the Amplitude SDK which provides convenience methods. The Ampli Wrapper also grants access to every method of the underlying Amplitude SDK through `Ampli.instance.client`. [More details](/docs/sdks/ampli#wrapping-the-amplitude-sdk).

### Load

Initialize Ampli in your code. The `load()` method accepts configuration option arguments:

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Ampli.instance.load(LoadOptions(
    client: LoadClientOptions(apiKey: AMPLITUDE_API_KEY)
));
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objectivec
[Ampli.instance load:[LoadOptions initWithApiKey:AMPLITUDE_API_KEY]];
```
{{/partial:tab}}
{{/partial:tabs}}

| Arg | Description |
|-|-|
|`LoadOptions`| Required. Specifies configuration options for the Ampli Wrapper.|
|`instance`| <span class="required">Required if `apiKey` isn't set</span>. Specifies an Amplitude instance. By default Ampli creates an instance for you.|
|`apiKey`| <span class="required">Required if `instance` isn't set</span>. Specifies an API Key. This option overrides the default, which is the API Key configured in your tracking plan.|
|`disabled`|Optional. Specifies whether the Ampli Wrapper does any work. When true, all calls to the Ampli Wrapper are no-ops. Useful in local or development environments.|

### Identify

Call `identify()` to identify a user in your app and associate all future events with their identity, or to set their properties.

Just as the Ampli Wrapper creates types for events and their properties, it creates types for user properties.

The `identify()` function accepts an optional `userId`, optional user properties, and optional `options`.

For example your tracking plan contains a user property called `userProp`. The property's type is a string.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Ampli.instance.identify("userID", Identify(
    requiredUserProp: "A trait associated with this user"
));
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objectivec
[Ampli.instance identify:@"userID" identify:[Identify
    requiredUserProp: @"value"
    builderBlock:^(IdentifyBuilder *b) {
        b.optionalUserProp = true;
    }]
];
```
{{/partial:tab}}
{{/partial:tabs}}

The options argument allows you to pass [Amplitude fields](/docs/apis/analytics/http-v2#keys-for-the-event-argument) for this call, such as `deviceId`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Ampli.instance.identify("userID", Identify(deviceID: "my_device_id")
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objectivec
[Ampli.instance identify:@"userID" identify:[Identify builderBlock:^(IdentifyBuilder *b) {
    b.deviceId = @"my_device_id";
}]];
```
{{/partial:tab}}
{{/partial:tabs}}

### Group

Call `setGroup()` to associate a user with their group (for example, their department or company). The `setGroup()` function accepts a required `groupType`, and `groupName`.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Ampli.instance.client.setGroup(groupType:"group type", groupName:"group name")
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objectivec
[Ampli.instance.client setGroup:@"group type" groupName:@"group name"];
```
{{/partial:tab}}
{{/partial:tabs}}

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.
<!-- vale off-->
Setting a group also sets the groupType:groupName' as a user property, and overwrites any existing groupName value set for that user's groupType, and the corresponding user property value. groupType is a string, and groupName can be either a string or an array of strings to indicate that a user is in multiple groups. For example, if Joe is in 'orgId' '10' and '20', then the `groupName` is '[10, 20]').
<!--vale on-->
 Your code might look like this:

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Ampli.instance.client.setGroup(groupType: "orgID", groupName: ["10", "20"])
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objectivec
[Ampli.instance.client setGroup:@"group type" groupName:@[@"10", @"20]];
```
{{/partial:tab}}
{{/partial:tabs}}

### Track

To track an event, call the event's corresponding function. Every event in your tracking plan gets its own function in the Ampli Wrapper. The call is structured like this:

```swift
Ampli.instance.track(_ event: Event, options: EventOptions)
```

The `options` argument allows you to pass [Amplitude fields](/docs/apis/analytics/http-v2#properties-1), like `deviceID`.

{{partial:admonition type="note" heading=""}}
EventOptions are set via generic track and aren't exposed on the strongly typed event methods such as `Ampli.instance.songPlayed(songId: 'id', songFavorited: true)`.
{{/partial:admonition}}

For example, in the following code snippet, your tracking plan contains an event called `songPlayed`. The event is defined with two required properties: `songId` and `songFavorited.` The property type for `songId` is string, and `songFavorited` is a boolean.

The event has two Amplitude fields defined: `price`, and `quantity`. Learn more about Amplitude fields [here](/docs/apis/analytics/http-v2#properties-1).

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Ampli.instance.track(
    SongPlayed(songId: 'songId', songFavorited: true),
    options: EventOptions(
        deviceId: 'deviceId',
        price: 0.99,
        quantity: 1
    )
);
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objectivec
AMPEventOptions *options = [AMPEventOptions new];
options.deviceId = @"deviceId";
options.price = 0.99;
options.quantity = 1;

[Ampli.instance track:[SongPlayed songId:@"songId" songFavorited:true]
                options:options
];
```
{{/partial:tab}}
{{/partial:tabs}}

Ampli also generates a class for each event.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
let myEventObject = SongPlayed(
    songId: 'songId', // String,
    songFavorited: true, // Bool
);
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objectivec
AMPBaseEvent *myEventObject = [SongPlayed
    songId:@"songId"
    songFavorited:true
];
```
{{/partial:tab}}
{{/partial:tabs}}

Send all Event objects using the generic track method.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Ampli.instance.track(SongPlayed(
    songId: 'songId', // String,
    songFavorited: true, // Bool
);
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objectivec
[Ampli.instance track:[SongPlayed
    songId:@"songId"
    songFavorited:true
]];
```
{{/partial:tab}}
{{/partial:tabs}}

### Flush

The Ampli wrapper queues events and sends them on an interval based on the configuration.

Call `flush()` to immediately send any pending events.

The `flush()` method returns a promise that can be used to ensure all pending events have been sent before continuing.
This can be useful to call prior to application exit.

Ampli flushes events in the buffer automatically when `flushQueueSize` or `flushInterval` are reached.

Ampli sends events automatically without calling `flush()`, but using `flush()` is useful if you need to send events before the application exits.

{{partial:tabs tabs="Swift, Obj-c"}}
{{partial:tab name="Swift"}}
```swift
Ampli.instance.flush()
```
{{/partial:tab}}
{{partial:tab name="Obj-c"}}
```objectivec
[Ampli.instance flush];
```
{{/partial:tab}}
{{/partial:tabs}}

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

Learn more about [`ampli status`](/docs/sdks/ampli/ampli-cli#ampli-status).