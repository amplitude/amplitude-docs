---
id: cea4db38-5323-4b0b-b401-8077084a0a0a
blueprint: instrumentation
title: 'SDK Troubleshooting and Debugging'
source: 'https://www.docs.developers.amplitude.com/data/sdk-troubleshooting-and-debugging/'
nav_title: developers
---

Data validation is a critical step in the instrumentation process. To streamline this process and enhance your debugging efforts, Amplitude provides some tools to convenience your debugging process. These resources facilitate the smooth implementation and operation of your projects.

The following sections outline common issues that you may encounter, along with their respective solutions or explanations to aid in resolving these problems. 

## Events not showing in Amplitude

If you are not able to ingest any event, check the following questions:

* Are you using the correct API key? 
Check that you have correctly set the API during init(). If you have enabled data residency in the EU, you'll need to retrieve your API key from `https://analytics.eu.amplitude.com/`. This is where your specific API details are located due to data locality regulations.

* Are you using multiple instances? 
If you are using the right instance. Ensure that you're using the correct instance. If multiple versions of SDKs exist, they might cause conflict issues. To avoid this, provide different instance names for each instance. For the latest SDKs, you might need to create separate variables in order to instantiate them differently.

* Are you using Amplitude Data? 
If you are using Amplitude Data, check that the event hasn't been blocked.

* Are you setting valid userId and deviceId?
Check if your deviceId or userId are valid, the 400 error can be caused by this. [More details](/docs/apis/analytics/http-v2#device-ids-and-user-ids-minimum-length).

* Did you hit the `flushQueueSize` or `flushIntervalMillis`?
Events are queued and sent in batches by default. That means events are not sent immediately to the server. The exact values differ by platform, check to make sure you have waited for events to be sent to the server before checking for them in charts.

## Privacy 

If you've already disabled IP, it's still possible to see the IP in your user lookup if you're using the latest SDK. Amplitude sends the data to the HTTP API (HTTP API V1 for maintenance SDK and HTTP API V2 for the latest SDK). If you disabled the IP address midway, it's possible that the user's previous IP address was saved in our backend. Our backend will retrieve the IP from the database, if there's any. If it's a test user, it's probably fine. It won't affect incoming new users after you disable the IP. If this affects all users, you might need to create a new workspace.

## `Client Event Time` shows unexpected value

`Client Event Time` is the local timestamp (UTC) when the device logged the event. Check [here](https://help.amplitude.com/hc/en-us/articles/229313067#Raw-Data-Fields) for different timestamps explanations at Amplitude.

* `Client Event Time` shows a future time
Check this section if you're seeing `client_upload_time` appearing as a time in the future. The `client_upload_time` is determined by the customer's device. It's possible that it may show a time in the future if the customer's clock is incorrectly set. You can remove the time in the Event payload via the Enrichment Plugin if you are using latest SDK. This will stop using the customer's device clock and instead rely on server_upload_time. However, be aware that this approach has a downside. If events are not uploaded immediately, the recorded event time can differ significantly from the original time the event was fired.

* `Client Event Time` different with `Client Upload Time`
`Client Event Time` may differ from `Client Upload Time`. To support high-performance environments, the SDK contains logic to send events in batches. Every event logged by the `track` method is queued on the client side. Events are batched and flushed when either `flushQueueSize` or `flushIntervalMillis` meets the defined value first. Therefore, it's possible to track an event and upload it later. Adjust `flushQueueSize` and `flushIntervalMillis` or manually call `flush()` to send events more frequently.

## Device family is not appropriate

* For web, Amplitude uses a [third party library](https://github.com/faisalman/ua-parser-js) library to parse the `Navigator.userAgent` info, except @amplitude/analytics-browser@^2.0. If you find an inappropriate device family, make sure the value of `Navigator.userAgent` as expected first. Starting from Chrome 110, a fixed value for Android version and device model has been introduced. Device info might be effect by [Chrome's user‑agent reduction](https://developer.chrome.com/blog/user-agent-reduction-android-model-and-version/#fixed-android-version-and-device-model-starting-from-chrome-110).

* For mobile SDKs, we rely on server device mapping. We refer to [this resource](http://storage.googleapis.com/play_public/supported_devices.html), [this resource](https://en.wikipedia.org/wiki/List_of_Android_smartphones) for Android, and [this resource](https://en.wikipedia.org/wiki/Comparison_of_tablet_computers) for iOS. If you find an inappropriate device family that doesn't exist in any of these files, submit a ticket. 

## `user_properties` through identify call showing up late

A race condition might occur if there's no deviceId in the request or if it has not been sent through the batch API. We have partition logic in our backend. Not having the same deviceId or not sending through the [batch API](/docs/apis/analytics/batch-event-upload) could cause two different calls to fall into separate buckets. The processing time in different buckets within different queues cannot be ensured. Therefore, to maintain the order of `identify` calls and other `track` calls, make sure the calls have the same deviceId and have been sent to our batch API.

To reduce the amount of requests made by the SDK, the latest mobile SDKs will queue and consolidate certain Identify updates and wait to send them along with the next non-Identify event sent via `track()`. If you need user properties to update immediately you can `flush()`.

## Event times are very inaccurate

If you notice that some sessions from certain users report inaccurate event times (for example, hundreds of years in the future, or hundreds of years in the past) the most likely cause may be:
- the end user has an anomalous configuration that causes their device to an incorrect date 
- they use a browser extension that causes inaccurate time reporting

These issues don't indicate an error or mistake in your instrumentation.