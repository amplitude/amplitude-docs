---
id: e05c2f18-2f1f-4391-ae18-cc1248444688
blueprint: advanced-technique
title: 'Advanced Metric Use Cases'
source: 'https://help.amplitude.com/hc/en-us/articles/18888080184475-Advanced-metric-use-cases-in-Amplitude-Experiment'
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