---
id: 29f79d9a-140e-4e0f-bd51-2b4fc47f5739
blueprint: java_sdk
title: 'JRE Java SDK'
sdk_status: current
article_type: core
supported_languages:
  - java
github_link: 'https://github.com/amplitude/Amplitude-Java'
releases_url: 'https://github.com/amplitude/Amplitude-Java/releases'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718572695
ampli_article: 0128c1e3-dbc5-4612-982f-aefef4ad4db0
---
This is the documentation for the Amplitude Analytics Java SDK.

## Import the SDK

Import Amplitude into any file that uses it. Amplitude uses the open source `JSONObject` library to conveniently create JSON key-value objects.

```java
import com.amplitude.Amplitude;
import org.json.JSONObject;
```

## Initialize the SDK

You must initialize the SDK before any events are instrumented. The API key for your Amplitude project is required.

```java
Amplitude client = Amplitude.getInstance();
client.init(AMPLITUDE_API_KEY);
```

`Amplitude.getInstance(String name)` may optionally take a name which uniquely holds settings.

```java
Amplitude client = Amplitude.getInstance("YOUR_INSTANCE_NAME");
client.init(AMPLITUDE_API_KEY);
```

## Configure the SDK

| Name  | Description | Default Value |
| --- | --- | --- |
| `setServerUrl()` | `String`. The server url events are uploaded to. For example, `Amplitude.getInstance().setServerUrl("https://www.your-server-url.com")`. | `https://api2.amplitude.com/2/httpapi` |
| `useBatchMode()` | `Boolean`. Whether to use [batch API](/docs/apis/analytics/batch-event-upload). By default, the SDK will use the default `serverUrl`. For example, `Amplitude.getInstance().useBatchMode(true)`. | `false` |
| `setLogMode()` | `AmplitudeLog.LogMode`. The level at which to filter out debug messages. For example, `Amplitude.getInstance().setLogMode(AmplitudeLog.LogMode.DEBUG);`. | `AmplitudeLog.LogMode.ERROR` |
| `setEventUploadThreshold()` | `int`. SDK will attempt to upload once unsent event count exceeds the event upload threshold or reach eventUploadPeriodSeconds interval. For example, `Amplitude.getInstance().setEventUploadThreshold(50);`. | `10` |
| `setEventUploadPeriodMillis()` | `int`. The amount of time SDK will attempt to upload the unsent events to the server or reach eventUploadThreshold threshold. The input parameter is in milliseconds. For example, `Amplitude.getInstance().setEventUploadPeriodMillis(200000);`. | `10 seconds` |
| `setCallbacks()` | `AmplitudeCallbacks`. Event callback which are triggered after event sent. | `null`|
| `setProxy()` | `Proxy`. Custom proxy for https requests. For example, `Amplitude.getInstance().setProxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("proxy.domain.com", port)));`. | `Proxy.NO_PROXY` |
| `setFlushTimeout()` | `long`. Events flushing thread timeout in milliseconds. For example, `Amplitude.getInstance().setFlushTimeout(2000L);`. | `0` |
| `setOptions()` | `Options`. A dictionary of key-value pairs that represent additional instructions for server save operation. For example, `Amplitude.getInstance().setOptions(new Options().setMinIdLength(8));`. | See the [available options](/docs/#options). |

### Options

| Name  | Description | Default Value |
| --- | --- | --- |
| `Options.setMinIdLength()` | `Integer`. Set the minimum length for user id or device id. For example, `Amplitude.getInstance().setOptions(new Options().setMinIdLength(8));`. | `5` |
| `Options.setHeaders()` | `Map<String, String>`. Set the custom headers. For example, `Amplitude.getInstance().setOptions(new Options().setHeaders(new HashMap<>(Map.of("Custom Header", "value"))));`. | `{"Content-Type", "application/json", "Accept", "application/json"}` |
| `Options.addHeader()` | `String, String`. Add more custom headers. For example, `Amplitude.getInstance().setOptions(new Options().addHeader("Custom Header", "value"));`. | `{"Content-Type", "application/json", "Accept", "application/json"}` |

### Configure batching behavior

To support high-performance environments, the SDK sends events in batches. Every event logged by `logEvent` method is queued in memory. Events are flushed in batches in background. You can customize batch behavior with `setEventUploadThreshold` and `setEventUploadPeriodMillis`. By default, the SDK is in regular mode with `serverUrl` to `https://api2.amplitude.com/2/httpapi`. For customers who want to send large batches of data at a time, switch to batch mode by setting `useBatchMode` to `true` to set setServerUrl to batch event upload API `https://api2.amplitude.com/batch`. Both the regular mode and the batch mode use the same flush queue size and flush intervals.

```java
Amplitude client = Amplitude.getInstance();
// Events queued in memory will flush when number of events exceed upload threshold
// Default value is 10
client.setEventUploadThreshold(20);

// Events queue will flush every certain milliseconds based on setting
// Default value is 10,000 milliseconds
client.setEventUploadPeriodMillis(5000);

// Using batch mode with batch API endpoint, `https://api2.amplitude.com/batch`
client.useBatchMode(true);
```

You can also flush events on demand.

```java
client.flushEvents();
```

For customers who want to send large batches of data at a time, for example through scheduled jobs, rather than in a continuous real-time stream, Amplitude provides the batch mode.

Both the regular mode and the batch mode use the same events upload threshold and flush time intervals. The batch mode allows larger payload size (20MB) and has a higher throttling limit.

Due to the higher rate of data that's permitted by this mode, data sent by batch mode may be delayed based on load. You can see a usage example in [this project](https://github.com/amplitude/Amplitude-Java/blob/main/src/demo/java/com/demo/amplitude/LocalUploadDemo.java) on GitHub.

```java
// Enable batch mode
client.useBatchMode(true);

// Disable batch mode
client.useBatchMode(false);
```

### Configure a custom Http proxy

New in version 1.9.0. Set and unset custom proxy for Http requests.

```java
// Set proxy for http requests
client.setProxy(new Proxy(Proxy.Type.HTTP, new InetSocketAddress("proxy.domain.com", port)));

// Unset proxy
client.setProxy(Proxy.NO_PROXY);
```

### Configure a custom logger

New in version 1.10.0. Set a customized logger for the Amplitude client.

```java
// Set logger 
client.setLogger(new AmplitudeLog() {
  @Override
  public void log(String tag, String message, LogMode messageMode) {
    if (messageMode.level >= logMode.level) {
      // implement using custom logging framework and format
    }
  }
});
```

### Configure minIdLength and header

Amplitude Java SDK supports customizing the min length of ID and header on the version later than 1.7.0.

```java
// Set logger 
client.setOptions(new Options()
      .addHeader("Custom Header", "value")
      .setMinIdLength(5));
```

### Configure event flushing and thread timeout

New in version 1.10.0. Set events flushing thread timeout in milliseconds. If set to a positive long integer, events flushing tasks time out and trigger callbacks for those events.

```java
client.setFlushTimeout(2000L); // 2 seconds
```

## Shutdown client and release resource

New in version 1.10.0. Stops the Amplitude client from accepting new events and shuts down the threads pool. Events in the buffer trigger callbacks. A new instance is created and returned if you call `Amplitude.getInstance(INSTANCE_NAME)` with the same instance name.

```java
client.shutdown();
```

## Send events

{{partial:admonition type="note" heading=""}}
This SDK uses the [Http V2](/docs/apis/analytics/http-v2) API and follows the same constraints for events. Make sure that all events logged in the SDK have the `event_type` field and at least one of `device_id` or `user_id`, and follow the HTTP API's constraints on each of those fields.

To prevent instrumentation issues, device IDs and user IDs must be strings with a length of 5 characters or more. If an event contains a device ID or user ID that's too short, the ID value is removed from the event. If the event doesn't have a `user_id` or `device_id` value, the upload may be rejected with a 400 status. Override the default minimum length of 5 characters by passing the `min_id_length` option with the request.
{{/partial:admonition}}

Events represent how users interact with your application. For example, "Button Clicked" may be an action you want to track. In Java, `logEvent` only accepts an event object. See the [Http V2 API](/docs/apis/analytics/http-v2) for available event object keys.

{{partial:admonition type="note" heading=""}}
For testing the Java SDK, make sure your main thread continues until the background daemon thread that has the Amplitude Http request is finished. Otherwise, the main thread terminated earlier than the daemon thread will lead `logEvent` to fail silently.
{{/partial:admonition}}

```java
Amplitude client = Amplitude.getInstance();
client.logEvent(new Event("Button Clicked", "test_user_id"));
```

### Events with properties

Events can also contain properties. They provide context about the event taken. For example, "hover time" may be a relevant event property to "button click."

```java
JSONObject eventProps = new JSONObject()
    .put("Hover Time", 10)
    .put("prop_2", "value_2");

Event event = new Event("Button Clicked", userId);
event.eventProperties = eventProps;

client.logEvent(event);
```

### Events witih groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's groupType, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="tip" heading=""}}
See examples of group functionality in the [demo application](https://github.com/amplitude/Amplitude-Java/blob/main/src/demo/java/com/demo/amplitude/LocalUploadDemo.java#L44-L71).
{{/partial:admonition}}

{{partial:admonition type="example" heading=""}}
If Joe is in 'orgId' '10', then the `groupName` would be '10':

```java
JSONObject groups = new JSONObject();
groups.put("orgId", 10);

Event setGroupEvent = new Event("$identify", userId);
setGroupEvent.groups = groups;
setGroupEvent.userProperties = groups;
client.logEvent(setGroupEvent);
```

If Joe is in 'sport' 'tennis' and 'soccer', then the `groupName` would be '["tennis", "soccer"]'.

```java
JSONObject groups = new JSONObject();
groups.put("sport", new String[] {"tennis", "soccer"});

Event setGroupsEvent = new Event("$identify", userId);
setGroupsEvent.groups = groupProps;
setGroupsEvent.userProperties = groups;

client.logEvent(setGroupsEvent);
```
{{/partial:admonition}}

You can also use `logEvent` to set **event-level groups**. With event-level groups, the group designation applies only to the specific event being logged, and doesn't persist on the user.

```java
JSONObject groups = new JSONObject();
groups.put("orgId", 10);

Event event = new Event('event type', userId);
event.groups = groups;

client.logEvent(event);
```

After setting groups, you can then set or update the properties of particular groups. However, these updates will only affect events going forward. 

```java
JSONObject groups = new JSONObject()
    .put("org", "engineering")
    .put("department", "sdk");
JSONObject groupProps = new JSONObject()
    .put("technology", "java")
    .put("location", "sf");

Event event = new Event("$groupidentify", userId);
event.groups = groups;
event.groupProperties = groupProps;

client.logEvent(event);
```

### Set user properties

{{partial:admonition type="warning" heading=""}}
Don't track any user data that may be against your privacy terms. 
{{/partial:admonition}}


Use `event.userProperties` as a shorthand to set multiple user properties at one time.

```java
Event event = new Event("Button Clicked", "test_user_id");

JSONObject userProps = new JSONObject();
double[] arr = {1,2,4,8};
try {
  userProps.put("team", "red").put("running_times", arr);
} catch (JSONException e) {
  e.printStackTrace();
  System.err.println("Invalid JSON");
}

event.userProperties = userProps;
client.logEvent(event);
```

### Set device information

Unlike the Android SDK or iOS SDK, device information in Java SDK isn't collected via SDK. Device information like device id, device brand, device manufacturer, and device model can be set as properties in each event.

```java
Event event = new Event("Button Clicked", "test_user_id");
event.deviceId = "device_id";
event.deviceBrand = "device_brand";
event.deviceManufacturer = "device_manufacturer";
event.deviceModel = "device_model";
client.logEvent(event);
```

### Set session information

You can set `sessionId` in an event. This pattern also applies to other properties like `city` and `price`. You can see a full list of events properties in [Event.java](https://github.com/amplitude/Amplitude-Java/blob/main/src/main/java/com/amplitude/Event.java).

```java
Event event = new Event("Button Clicked", "test_user_id");
event.sessionId = 1;
client.logEvent(event);
```

## Amplitude callbacks

Support for AmplitudeCallBacks is available beginning with 1.4.0. You can trigger a callback when event is sent to server or failed after retries.

```java
Amplitude client = Amplitude.getInstance();
AmplitudeCallbacks callbacks =
  new AmplitudeCallbacks() {
  @Override
    public void onLogEventServerResponse(Event event, int status, String message) {
    // Event: Event processed.
    // status: response code, like 200, 400, etc.
    // message: success or error message.
  }
};
client.setCallbacks(callbacks);
```

From 1.5.0, callbacks can be added to event level and triggered when the event is sent to server or failed after retries. One event can trigger both client level callbacks and event level callbacks.

```java
Amplitude client = Amplitude.getInstance();
AmplitudeCallbacks eventCallbacks =
  new AmplitudeCallbacks() {
  @Override
    public void onLogEventServerResponse(Event event, int status, String message) {
    // Event: Event processed.
    // status: response code, like 200, 400, etc.
    // message: success or error message.
  }
};
client.logEvent(event, eventCallbacks)
```

## Middleware

Middleware allows you to extend Amplitude by running a sequence of custom code on every event.
 This pattern is flexible and can be used to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple interface with a run method:

```java
void run(MiddlewarePayload payload, MiddlewareNext next);
```

The `payload` contains the `event` being sent as well as an optional `extra` that allows you to pass custom data to your own middleware implementations.

To invoke the next middleware in the queue, use the `next` function. You must call `next.run(payload)` to continue the middleware chain.
 If a middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Add middleware to Amplitude via `client.addEventMiddleware`. You can add as many middleware as you like. Each middleware runs in the order in which it was added.

You can find examples for [Java](https://github.com/amplitude/ampli-examples/blob/main/jre/java/AmpliApp/src/main/java/org/example/LoggingMiddleware.java) and [Kotlin](https://github.com/amplitude/ampli-examples/blob/main/jre/kotlin/AmpliApp/src/main/kotlin/LoggingMiddleware.kt).

## Troubleshooting

When debugging, check the logs. The SDK prints error messages.

If you have problems, open an issue on the [GitHub issues page](https://github.com/amplitude/Amplitude-Java/issues).