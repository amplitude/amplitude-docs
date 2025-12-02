---
id: 8f3a2b1c-4d5e-6f7a-8b9c-0d1e2f3a4b5c
blueprint: get-started
title: 'Developer quickstart'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1732147200
---
Get Amplitude running in your app quickly. This quickstart walks you through installing the SDK, initializing it, and sending your first event.

## Before you begin

You need:
- An [Amplitude account](/docs/get-started/create-a-new-account).
- A project with an API key. Find your API key in *Settings > Projects > [Your Project] > General*.

## Step 1: Install the SDK

Choose your platform and install the Amplitude SDK.

{{partial:tabs tabs="Web (Browser), React Native, iOS, Android, Node.js"}}
{{partial:tab name="Web (Browser)"}}

Install with npm, yarn, or use the script loader.

```bash
npm install @amplitude/analytics-browser
```

Or add the script tag to your HTML:

```html
<script type="text/javascript">
!function(){"use strict";!function(e,t){var r=e.amplitude||{_q:[]};if(r.invoked)e.console&&console.error&&console.error("Amplitude snippet has been loaded.");else{r.invoked=!0;var n=t.createElement("script");n.type="text/javascript",n.integrity="sha384-PPfHw98myKtJkA9OdPBMQ6n8yvUaYk0EyUQccFSIQGmB05K6aAqcb92mLQH4lMnm",n.crossOrigin="anonymous",n.async=!0,n.src="https://cdn.amplitude.com/libs/analytics-browser-2.11.0-min.js.gz",n.onload=function(){e.amplitude.runQueuedFunctions||console.log("[Amplitude] Error: could not load SDK")};var s=t.getElementsByTagName("script")[0];s.parentNode.insertBefore(n,s);for(var o=function(){return this._q.push(Array.prototype.slice.call(arguments,0)),this},i=["add","append","clearAll","prepend","set","setOnce","unset","preInsert","postInsert","remove","getUserProperties"],a=function(e){r[e]=o},c=0;c<i.length;c++)a(i[c]);e.amplitude=r}}(window,document)}();
</script>
```

{{/partial:tab}}
{{partial:tab name="React Native"}}

```bash
npm install @amplitude/analytics-react-native
```

For Expo projects:

```bash
npx expo install @amplitude/analytics-react-native @react-native-async-storage/async-storage
```

{{/partial:tab}}
{{partial:tab name="iOS"}}

Add via Swift Package Manager in Xcode:

1. Open *File > Add Package Dependencies*.
2. Enter the URL: `https://github.com/amplitude/Amplitude-Swift`.
3. Select **Up to Next Major Version** and click **Add Package**.

Or use CocoaPods:

```ruby
pod 'AmplitudeSwift', '~> 1.0'
```

{{/partial:tab}}
{{partial:tab name="Android"}}

Add to your `build.gradle`:

```groovy
dependencies {
    implementation 'com.amplitude:analytics-android:1.+'
}
```

{{/partial:tab}}
{{partial:tab name="Node.js"}}

```bash
npm install @amplitude/analytics-node
```

{{/partial:tab}}
{{/partial:tabs}}

## Step 2: Initialize the SDK

Initialize Amplitude with your API key when your app starts.

{{partial:tabs tabs="Web (Browser), React Native, iOS, Android, Node.js"}}
{{partial:tab name="Web (Browser)"}}

```javascript
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('AMPLITUDE_API_KEY');
```

{{/partial:tab}}
{{partial:tab name="React Native"}}

```javascript
import * as amplitude from '@amplitude/analytics-react-native';

amplitude.init('AMPLITUDE_API_KEY');
```

{{/partial:tab}}
{{partial:tab name="iOS"}}

```swift
import AmplitudeSwift

let amplitude = Amplitude(configuration: Configuration(apiKey: "AMPLITUDE_API_KEY"))
```

{{/partial:tab}}
{{partial:tab name="Android"}}

```kotlin
import com.amplitude.android.Amplitude

val amplitude = Amplitude(
    Configuration(
        apiKey = "AMPLITUDE_API_KEY",
        context = applicationContext
    )
)
```

{{/partial:tab}}
{{partial:tab name="Node.js"}}

```javascript
import { Amplitude } from '@amplitude/analytics-node';

const amplitude = new Amplitude('AMPLITUDE_API_KEY');
```

{{/partial:tab}}
{{/partial:tabs}}

Replace `AMPLITUDE_API_KEY` with your project's API key.

## Step 3: Track an event

Send your first event to verify the integration works.

{{partial:tabs tabs="Web (Browser), React Native, iOS, Android, Node.js"}}
{{partial:tab name="Web (Browser)"}}

```javascript
amplitude.track('Button Clicked', {
  buttonName: 'Sign Up',
  page: 'Homepage'
});
```

{{/partial:tab}}
{{partial:tab name="React Native"}}

```javascript
amplitude.track('Button Clicked', {
  buttonName: 'Sign Up',
  page: 'Homepage'
});
```

{{/partial:tab}}
{{partial:tab name="iOS"}}

```swift
amplitude.track(eventType: "Button Clicked", eventProperties: [
    "buttonName": "Sign Up",
    "page": "Homepage"
])
```

{{/partial:tab}}
{{partial:tab name="Android"}}

```kotlin
amplitude.track("Button Clicked", mapOf(
    "buttonName" to "Sign Up",
    "page" to "Homepage"
))
```

{{/partial:tab}}
{{partial:tab name="Node.js"}}

```javascript
amplitude.track('Button Clicked', {
  buttonName: 'Sign Up',
  page: 'Homepage'
}, {
  user_id: 'user@example.com'
});
```

{{/partial:tab}}
{{/partial:tabs}}

## Step 4: Verify in Amplitude

1. Navigate to *Analytics > User Lookup* in Amplitude.
2. Search for your device or user ID.
3. Confirm your "Button Clicked" event appears in the event stream.

Events typically appear within seconds, but can take up to 2 minutes.

## What's next?

You've successfully integrated Amplitude. Here's what to do next:

| Goal | Resource |
|------|----------|
| Track the right events | [Select events to track](/docs/get-started/select-events) |
| Identify users | [Identify users](/docs/get-started/identify-users) |
| Use Autocapture | [Autocapture guide](/docs/get-started/autocapture) |
| Explore SDK features | [SDK documentation](/docs/sdks) |
| Build your first chart | [Create a chart](/docs/get-started/create-a-chart) |

## Common issues

### Events aren't appearing

- **Check your API key**: Make sure you're using the correct API key for your project.
- **Wait a few minutes**: Events can take up to 2 minutes to appear.
- **Check the network tab**: Look for requests to `api.amplitude.com` and verify they return 200.
- **Verify initialization**: Ensure `init()` is called before `track()`.

### Getting a 400 error

- **Invalid API key**: Double-check your API key in project settings.
- **Malformed event**: Ensure event names are strings and properties are valid JSON.

### Events appear but user ID is wrong

- **Set user ID explicitly**: Call `setUserId()` after a user logs in.
- **Check anonymous tracking**: By default, Amplitude uses device IDs for anonymous users.

## Related resources

- [Introduction to Amplitude SDKs](/docs/get-started/sdk-introduction).
- [Full SDK reference](/docs/sdks).
- [Track your progress](/docs/get-started/track-your-progress).
- [Plan your implementation](/docs/get-started/plan-your-implementation).

