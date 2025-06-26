---
id: 41097e1a-f0a3-4500-8157-f6620fb760a6
published: false
blueprint: experiment
title: 'Amplitude Experiment'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715274213
---
```ts
amplitude.init(AMPLITUDE_API_KEY, {
  defaultTracking: {
    fileDownloads: false,
  },
});
```

```html
<form id="subscriber-form" name="subscriber-form" action="/subscribe">
  <input type="text" />
  <input type="submit" />
</form>
```

```kotlin
amplitude = Amplitude(
    Configuration(
        apiKey = AMPLITUDE_API_KEY,
        context = applicationContext,
        defaultTracking = DefaultTrackingOptions(
            sessions = false
        )
    )
)
```

```objc
AMPConfiguration* configuration = [AMPConfiguration initWithApiKey:AMPLITUDE_API_KEY];
configuration.minTimeBetweenSessionsMillis = 1000;
Amplitude* amplitude = [Amplitude initWithConfiguration:configuration];
```


```swift
let amplitude = Amplitude(configuration: Configuration(
    apiKey: AMPLITUDE_API_KEY,
    defaultTracking: DefaultTrackingOptions(
        sessions: false
    )
    ))
```

```python
from amplitude import Amplitude, BaseEvent


client = Amplitude(AMPLITUDE_API_KEY)

# Track a basic event
# One of user_id and device_id is required
event = BaseEvent(event_type="Button Clicked", user_id="User Id")
client.track(event)

# Track events with optional properties
client.track(
    BaseEvent(
        event_type="type of event",
        user_id="USER_ID",
        device_id="DEVICE_ID",
        event_properties={
            "source": "notification"
        }
))
```