---
id: 9f4dcd07-e262-4c9b-b841-ebb721d37a6d
blueprint: android_sdk
title: 'Android SDK'
sdk_status: maintenance
article_type: core
supported_languages:
  - java
  - kotlin
github_link: 'https://github.com/amplitude/Amplitude-Android'
releases_url: 'https://github.com/amplitude/Amplitude-Android/releases'
bundle_url: 'https://mvnrepository.com/artifact/com.amplitude/android-sdk'
api_reference_url: 'https://amplitude.github.io/Amplitude-Android'
shields_io_badge: 'https://img.shields.io/maven-central/v/com.amplitude/android-sdk.svg?label=Maven%20Central&versionPrefix=2'
ampli_article: 56590eed-e958-44c2-bbe3-a95ef1d180af
migration_guide:
  - 016795b7-45ca-4daa-9458-85bf283a35cb
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1710277105
---

This is the official documentation for the Amplitude Analytics Android SDK.

{{partial:admonition type="deprecated" heading=""}}
This is a maintenance SDK and will only receive bug fixes until deprecation. Upgrade to the [Android Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk) which supports plugins, SDK integrations, and more.
{{/partial:admonition}}

## Install the SDK

{{partial:admonition type="tip" heading=""}}
Amplitude recommends Android Studio as an IDE and Gradle to manage dependencies. Use version 2.x, version 3.35.1 is invalid.
{{/partial:admonition}}

1. In the `build.gradle` file, add these dependencies. The SDK requires OkHttp.

    ```java
    dependencies {
    implementation 'com.amplitude:android-sdk:2.+'
    implementation 'com.squareup.okhttp3:okhttp:4.2.2'
    }

    ```
2. Sync project with Gradle files.
3. To report events to Amplitude, add the INTERNET permission to your `AndroidManifest.xml` file:
 `<uses-permission android:name="android.permission.INTERNET" />`
1. For Android 6.0 (Marshmallow) and higher, explicitly add permission to fetch the device [advertising ID](#advertiser-id).

After you've installed the SDK and its dependencies, import Amplitude into any file that uses it.

```java
import com.amplitude.api.Amplitude;
import com.amplitude.api.AmplitudeClient;
/*
Import any more files that are needed, use the SDK reference
http://amplitude.github.io/Amplitude-Android/
*/

```

## Core functions
The following functions make up the core of the Amplitude Analytics Android SDK.

### Initialize the SDK

You must initialize the SDK before you can instrument. The API key for your Amplitude project is required. Amplitude recommends adding this in `onCreate(...)` of your Activity class.

You can use the Android SDK anywhere after it's initialized in an Android application.

Accurate session tracking requires that you enable `enableForegroundTracking(getApplication())`. It's disabled by default.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
AmplitudeClient client = Amplitude.getInstance()
 .initialize(getApplicationContext(), AMPLITUDE_API_KEY)
 .enableForegroundTracking(getApplication());

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val client = Amplitude.getInstance()
 .initialize(getApplicationContext(), AMPLITUDE_API_KEY)
 .enableForegroundTracking(application)

```
{{/partial:tab}}
{{/partial:tabs}}

`Amplitude.getInstance(String name)` can take a name that holds settings. This instance is now linked to the name and you can retrieve it somewhere else.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
AmplitudeClient client1 = Amplitude.getInstance("Andy_Client");
AmplitudeClient client2 = Amplitude.getInstance("Bob_Client");

//In the same file, or a different activity in the app
AmplitudeClient sameClient = Amplitude.getInstance("Andy_Client");

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val client1 = Amplitude.getInstance("Andy_Client")
val client2 = Amplitude.getInstance("Bob_Client")

//In the same file, or a different activity in the app
val sameClient = Amplitude.getInstance("Andy_Client")

```
{{/partial:tab}}
{{/partial:tabs}}

### Configuration options

| Name | Description | Default Value |
| --- | --- | --- |
| `eventUploadPeriodMillis` | The amount of time SDK will attempt to upload the unsent events to the server or reach `eventUploadThreshold` threshold. | `30000` |
| `eventUploadThreshold` | SDK will attempt to upload once unsent event count exceeds the event upload threshold or reach `eventUploadPeriodMillis` interval. | `30` |
| `eventUploadMaxBatchSize` | The maximum number of events sent with each upload request. | `50` |
| `eventMaxCount` | The maximum number of unsent events to keep on the device. | `1000` |
| `identifyBatchIntervalMillis` | The amount of time SDK will attempt to batch intercepted identify events. | `30000` |
| `flushEventsOnClose` | Flushing of unsent events on app close. | `true` |
| `optOut` | Opt the user out of tracking. | `false` |
| `trackingSessionEvents` | Automatic tracking of "Start Session" and "End Session" events that count toward event volume. | `false` |
| `sessionTimeoutMillis` | The amount of time for session timeout if disable foreground tracking. Foreground tracking is disabled by default. | `1800000` |
| `minTimeBetweenSessionsMillis` | The amount of time for session timeout if enable foreground tracking by `enableForegroundTracking()` | `300000` |
| `serverUrl` | The server url events upload to. | `https://api2.amplitude.com/` |
| `useDynamicConfig` | Find the best server url automatically based on users' geo location. | `false` |

### EU data residency

Beginning with version 2.34.0, you can configure the server zone after initializing the client for sending data to Amplitude's EU servers. The SDK sends data based on the server zone if it's set.

The server zone configuration supports dynamic configuration as well.

For earlier versions, you need to configure the `serverURL` property after initializing the client.

```java
// For versions starting from 2.34.0
// No need to call setServerUrl for sending data to Amplitude's EU servers
client.setServerZone(AmplitudeServerZone.EU);

// For earlier versions
client.setServerUrl("https://api.eu.amplitude.com");
```

### Send basic events

Events represent how users interact with your application. For example, the event "button click" may be an action you want to track.

```java
client.logEvent("Button Clicked");
```

### Send events with properties

Events can contain properties, which give more context about the event. For example, "hover time" may be a relevant event property for "button click."

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
JSONObject eventProperties = new JSONObject();
try {
 eventProperties.put("Hover Time", 10).put("prop_2", "value_2");
} catch (JSONException e) {
 System.err.println("Invalid JSON");
 e.printStackTrace();
}
client.logEvent("Button Clicked", eventProperties);
// Note: You will also need to add two JSONObject imports to the code.
// import org.json.JSONException;
// import org.json.JSONObject;

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val eventProperties = JSONObject() 
try {
  eventProperties.put("Hover Time", 10).put("prop_2", "value_2")
} catch (e: JSONException) {
  System.err.println("Invalid JSON")
  e.printStackTrace()
}
client.logEvent("Button Clicked", eventProperties)

```
{{/partial:tab}}
{{/partial:tabs}}

### Flush events


Unset events are stored in a buffer and flushed (sent) on app close by default. Events are flushed based on which criteria is met first: `eventUploadPeriodMillis` or `eventUploadThreshold`. 

You can disable flushing or configure the upload period of the event upload threshold. 

Disable flushingChange upload periodChange default event buffer

```java
client.setFlushEventsOnClose(false); //Don't flush events

```

The default upload period is 30 seconds. Input is in milliseconds.

```java
Amplitude.getInstance(instanceName).setEventUploadPeriodMillis(100000); // Changes event upload period to 100 seconds

```

The default event buffer is 30. Input is an int. 

```java
Amplitude.getInstance(instanceName).setEventUploadThreshold(4); // Changes event upload buffer to 4

```

To force the SDK to upload unsent events, the use the method `uploadEvents`.

### Set user properties

{{partial:admonition type="note" heading="Privacy and tracking"}}
Don't track any user data that's against your privacy terms.
{{/partial:admonition}}

Identify is for setting the user properties of a particular user without sending any event.

The SDK supports these operations on individual user properties: `set`, `setOnce`, `unset`, `add`, `append`, `prepend`, `preInsert`, `postInsert`, and `remove`. Declare the operations via a provided Identify interface. You can chain together multiple operations in a single Identify object.

The Identify object is passed to the Amplitude client to send to the server. Starting from release v2.29.0, identify events with set operations would be batched and sent with fewer events. This change wouldn't affect running the set operations. There is a config `identifyBatchIntervalMillis` managing the intervalto flush the batched identify intercepts.

{{partial:admonition type="note" heading=""}}
If the Identify call is sent after the event, the results of operations is visible immediately in the dashboard user's profile area, but it doesn't appear in chart result until another event is sent after the Identify call. The identify call only affects events going forward.
{{/partial:admonition}}

You can handle the identity of a user using the identify methods. Proper use of these methods can connect events to the correct user as they move across devices, browsers, and other platforms.

Send an identify call containing those user property operations to Amplitude server to tie a user's events with specific user properties.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Identify identify = new Identify();
identify.set("color", "green");
client.identify(identify);

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val identify = Identify()
identify["color"] = "green"
client.identify(identify)

```
{{/partial:tab}}
{{/partial:tabs}}

#### Set

`set` sets the value of a user property. You can also chain together multiple identify calls.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Identify identify = new Identify().set("color", "green");

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val identify = Identify().set("color", "green")

```
{{/partial:tab}}
{{/partial:tabs}}

#### Set once

`setOnce` sets the value of a user property one time. Later calls using `setOnce` are ignored.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Identify identify = new Identify().setOnce("color", "green");

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val identify = Identify().setOnce("color", "green")

```
{{/partial:tab}}
{{/partial:tabs}}

#### Add

`add` increments a user property by some numerical value. If the user property doesn't have a value set yet, it's initialized to 0 before being incremented.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Identify identify = new Identify().set("number_of_clients", 10);
//...
identify.add("number_of_clients", 5); //15
identify.add("annual_revenue", 100); //100

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val identify = Identify().set("number_of_clients", 10)
identify.add("number_of_clients", 5) //15
identify.add("annual_revenue", 100) //100

```
{{/partial:tab}}
{{/partial:tabs}}

#### Set multiple user properties

`logEvent()` method allows you to set the user properties along with event logging. You can use `setUserProperties` as a shorthand to set multiple user properties at one time.

This method is a wrapper around `Identify.set`.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
JSONObject userProperties = new JSONObject();
try {
 userProperties.put("team", "red").put("favorite_food", "cabbage");
} catch (JSONException e) {
 e.printStackTrace();
 System.err.println("Invalid JSON");
}
client.setUserProperties(userProperties);
client.logEvent("event name");

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val userProperties = JSONObject()
try {
 userProperties.put("team", "red").put("favorite_food", "cabbage")
} catch (e: JSONException) {
 e.printStackTrace()
 System.err.println("Invalid JSON")
}
client.setUserProperties(userProperties)
client.logEvent("event name")

```
{{/partial:tab}}
{{/partial:tabs}}

#### Arrays in user properties

You can use arrays as user properties. You can directly set arrays or use `append` to generate an array.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
JSONArray value1 = new JSONArray();
value1.put(1);
value1.put(2);
value1.put(3);

Identify identify = new Identify();
identify.set("array value", value1);

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val value1 = JSONArray()
value1.put(1)
value1.put(2)
value1.put(3)

val identify = Identify()
identify["array value"] = value1

```
{{/partial:tab}}
{{/partial:tabs}}

- `append` appends a value or values to a user property array.
- `prepend` prepends a value or values to a user property.

If the user property doesn't have a value set yet, it's initialized to an empty list before the new values are added. If the user property has an existing value and it's not a list, it's converted into a list with the new value added.

{{partial:admonition type="note" heading=""}}
`append` and `prepend` don't check for duplicates. See `preInsert` and `postInsert` for that.
{{/partial:admonition}}

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
String property1 = "array value";
JSONArray value1 = new JSONArray();
value1.put(1);
value1.put(2);
value1.put(3);
Identify identify = new Identify();
identify.append(property1, value1);
identify.prepend("float value", 0.625f);

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val property1 = "array value"
val value1 = JSONArray()
value1.put(1)
value1.put(2)
value1.put(3)
val identify = Identify()
identify.append(property1, value1)
identify.prepend("float value", 0.625f)

```
{{/partial:tab}}
{{/partial:tabs}}

- `preInsert` inserts a value or values to the front of a user property array if it doesn't exist in the array yet.
- `postInsert` inserts a value or values to the end of a user property array if it doesn't exist in the array yet.

If the user property doesn't exist, it's initialized to an empty list before the new values are pre-inserted. If the user property has an existing value, nothing is inserted.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
String property1 = "array value";
double[] values = {1, 2, 4, 8};
Identify identify = new Identify();
identify.postInsert(property1, values);

// identify should ignore this since duplicate key
identify.postInsert(property1, 3.0);

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val property1 = "array value"
val values = doubleArrayOf(1.0, 2.0, 4.0, 8.0)
val identify = Identify()
identify.postInsert(property1, values)
identify.postInsert(property1, 3.0)

```
{{/partial:tab}}
{{/partial:tabs}}

### Clear user properties

`clearUserProperties` removes all the current user's user properties.
\
{{partial:admonition type="warning" heading="This action is irreversible"}}
If you clear user properties, Amplitude can't sync the user's user property values from before the wipe to any future events.
{{/partial:admonition}}

```java
client.clearUserProperties();

```

#### unset

`unset` unsets and removes a user property.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Identify identify = new Identify().setOnce("favorite_food", "candy");
identify.unset("favorite_food");

```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val identify = Identify().setOnce("favorite_food", "candy")
identify.unset("favorite_food")

```
{{/partial:tab}}
{{/partial:tabs}}

### Set user groups

Amplitude supports assigning users to groups and performing queries, such as Count by Distinct, on those groups. If at least one member of the group has performed the specific event, then the count includes the group.

For example, you want to group your users based on what organization they're in by using an 'orgId'. Joe is in 'orgId' '10', and Sue is in 'orgId' '15'. Sue and Joe both perform a certain event. You can query their organizations in the Event Segmentation Chart.

When setting groups, define a `groupType` and `groupName`. In the previous example, 'orgId' is the `groupType` and '10' and '15' are the values for `groupName`. Another example of a `groupType` could be 'sport' with `groupName` values like 'tennis' and 'baseball'.

Setting a group also sets the `groupType:groupName` as a user property, and overwrites any existing `groupName` value set for that user's `groupType`, and the corresponding user property value. `groupType` is a string, and `groupName` can be either a string or an array of strings to indicate that a user is in multiple groups.

{{partial:admonition type="example" heading=""}}
If Joe is in 'orgId' '10' and '16', then the `groupName` would be '["10", "16"]'. Here is what your code might look like:

```java
Amplitude.getInstance().setGroup("orgID", new JSONArray().put("10").put("16")); // list values
```
{{/partial:admonition}}

You can also use `logEvent` to set event-level groups. This means that the group designation only applies for the specific event being logged and doesn't persist on the user unless you explicitly set it with `setGroup`:

```java
JSONObject eventProperties = new JSONObject().put("key", "value");
JSONObject groups = new JSONObject().put("orgId", 10);

Amplitude.getInstance().logEvent("initialize_game", eventProperties, groups);
```

### Group identify

Use the Group Identify API to set or update the properties of particular groups. Keep these considerations in mind:

- Updates affect only future events, and don't update historical events.
- You can track up to 5 unique group types and 10 total groups.

The `groupIdentify` method accepts a group type string parameter and group name object parameter, and an Identify object that's applied to the group.

```java
String groupType = "plan";
Object groupName = "enterprise";

Identify identify = new Identify().set("key", "value");
Amplitude.getInstance().groupIdentify(groupType, groupName, identify);
```

An optional `outOfSession` boolean input can be supplied as fourth argument to `groupIdentify`.

### Track revenue

Amplitude can track revenue generated by a user. Revenue is tracked through distinct revenue objects, which have special fields used in Amplitude's Event Segmentation and Revenue LTV charts.

This lets Amplitude to automatically display data relevant to revenue in the platform.

To track revenue from a user, call `logRevenueV2` each time a user generates revenue.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
Revenue revenue = new Revenue().setProductId("com.company.productId").setPrice(3.99).setQuantity(3);
client.logRevenueV2(revenue);
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val revenue = Revenue().setProductId("com.company.productId").setPrice(3.99).setQuantity(3)
client.logRevenueV2(revenue)
```
{{/partial:tab}}
{{/partial:tabs}}

Revenue objects support the following special properties, as well as user-defined properties through the `eventProperties` field.

| Name | Description |
| --- | --- |
| `productId` | Optional. String. An identifier for the product. Amplitude recommends something like the "Google Play Store product ID". Defaults to `null`. |
| `quantity` | Required. Integer. The quantity of products purchased. Note: revenue = quantity * price. Defaults to 1. |
| `price` | Required. Double. The price of the products purchased. This can be negative to track revenue lost, like refunds or costs. Note: revenue = quantity * price. Defaults to `null`. |
| `revenueType` | Optional, but required for revenue verification. String. The revenue type. For example: tax, refund, income. Defaults to `null`. |
| `receipt` | Optional. String. The revenue type. For example: tax, refund, income. Defaults to `null` |
| `receiptSignature` | Optional, but required for revenue verification. The revenue type. For example: tax, refund, income. Defaults to `null`. |
| `eventProperties` | Optional. JSONObject. An object of event properties to include in the revenue event. Defaults to `null`. |

{{partial:admonition type="note" heading=""}}
Amplitude doesn't support currency conversion. Normalize all revenue data to your currency of choice before being sent.
{{/partial:admonition}}

### Revenue verification

The `logRevenue` method also supports revenue validation.

By default, revenue events recorded on the Android SDK appear in Amplitude as [Amplitude] Revenue (Unverified) events. To enable revenue verification, copy your Google Play License Public Key into the Sources & Destinations section of your project in Amplitude.

You must put in a key for every single project in Amplitude where you want revenue to be verified.

For more information, see the class specification for the [Purchase class](https://developer.android.com/reference/com/android/billingclient/api/Purchase).

{{partial:tabs tabs="Java: AIDL, Java: Google Play Billing Library, Kotlin: AIDL, Kotlin: Google Play Billing"}}
{{partial:tab name="Java: AIDL"}}
```java
// For AIDL (old deprecated library)

Intent data = ...;

String purchaseData = data.getStringExtra("PURCHASE_DATA");
String dataSignature = data.getStringExtra("DATA_SIGNATURE");

Revenue revenue = new Revenue().setProductId("com.company.productId").setQuantity(1);
revenue.setPrice(3.99).setReceipt(purchaseData, dataSignature);

client.logRevenueV2(revenue);
```
{{/partial:tab}}
{{partial:tab name="Java: Google Play Billing Library"}}
```java
//For Google Play Billing Library
public class MyBillingImpl implements PurchasesUpdatedListener {
    private BillingClient billingClient;
    //...

    public void initialize() {
        billingClient = BillingClient.newBuilder(activity).setListener(this).build();
        billingClient.startConnection(new BillingClientStateListener() {
            @Override
            public void onBillingSetupFinished(BillingResult billingResult) {
                // Logic from ServiceConnection.onServiceConnected should be moved here.
            }

            @Override
            public void onBillingServiceDisconnected() {
                // Logic from ServiceConnection.onServiceDisconnected should be moved here.
            }
        });
    }

    @Override
    public void onPurchasesUpdated(
        @BillingResponse int responseCode, @Nullable List<Purchase> purchases) {
        //Here is the important part. 
        for (Purchase purchase: purchases) {
          Revenue revenue = new Revenue()
            .setProductId("com.company.productId")
            .setQuantity(1)
            .setPrice(price);
          revenue.setReceipt(purchase.getOriginalJson(), purchase.getSignature());
          client.logRevenueV2(revenue);
        }
    }
}
```
{{/partial:tab}}
{{partial:tab name="Kotlin: AIDL"}}
```kotlin
// For AIDL (old deprecated library)

Intent data = ...

val purchaseData: String = data.getStringExtra("PURCHASE_DATA")
val dataSignature: String = data.getStringExtra("DATA_SIGNATURE")

val revenue = Revenue().setProductId("com.company.productId").setQuantity(1)
revenue.setPrice(3.99).setReceipt(purchaseData, dataSignature)

client.logRevenueV2(revenue)
```
{{/partial:tab}}
{{partial:tab name="Kotlin: Google Play Billing"}}
```kotlin
class MyBillingImpl(private var billingClient: BillingClient) : PurchasesUpdatedListener {

    init {
        billingClient = BillingClient.newBuilder(activity).setListener(this).build()
        billingClient.startConnection(object : BillingClientStateListener {
            override fun onBillingSetupFinished(billingResult: BillingResult?) {
                // Logic from ServiceConnection.onServiceConnected should be moved here.
            }

            override fun onBillingServiceDisconnected() {
                // Logic from ServiceConnection.onServiceDisconnected should be moved here.
            }
        })
    }

    override fun onPurchasesUpdated(
        billingResult: BillingResult?,
        purchases: MutableList<Purchase>?
    ) {
        // Logic from onActivityResult should be moved here.
        for (Purchase purchase: purchases) {
          Revenue revenue = new Revenue()
            .setProductId("com.company.productId")
            .setQuantity(1)
            .setPrice(price);
          revenue.setReceipt(purchase.getOriginalJson(), purchase.getSignature());
          client.logRevenueV2(revenue);
        }
    }
}
```
{{/partial:tab}}
{{/partial:tabs}}

### Amazon store revenue verification

For purchases on the Amazon store, you first need to set up Amazon as a data source in Amplitude.

1. In Amplitude, navigate to the **Data Sources** page.
2. Click **I want to import data into Amplitude**, then select **Amazon**.
3. Paste your Amazon Developer Shared Secret in the box and save.

After a successful purchase, send the purchase token (For Amazon IAP 2.0 use receipt ID) as the `receipt` and the User ID as the `receiptSignature`:

```java
// for a purchase request onActivityResult
String purchaseToken = purchaseResponse.getReceipt();
String userId = getUserIdResponse.getUserId();

Revenue revenue = new Revenue().setProductId("com.company.productId").setQuantity(1);
revenue.setPrice(3.99).setReceipt(purchaseToken, userId);

client.logRevenueV2(revenue);
```

## Debugging

Verify the configuration and payload are correct and check if there are any suspicious debug messages during debugging. If everything appears to be right, check the value of `eventUploadThreshold` or `eventUploadPeriodMillis`. Events are queued and sent in batches by default, which means they are not immediately dispatched to the server. Ensure that you have waited for the events to be sent to the server before checking for them in the charts. 

### Log

Set the log level to debug to collect useful information during debugging.

### Callback

Set the setLogCallback to collect any error messages from the SDK in a production environment.

## User sessions

A session on Android is a period of time that a user has the app in the foreground.

Amplitude groups events together by session. Events that are logged within the same session have the same `session_id`. Sessions are handled automatically so you don't have to manually call `startSession()` or `endSession()`.

You can adjust the time window for which sessions are extended.

```java
client.setMinTimeBetweenSessionsMillis(10000); //Must be a 'long'; 10 seconds
```

By default, '[Amplitude] Start Session' and '[Amplitude] End Session' events aren't sent. Even though these events aren't sent, sessions are still tracked by using `session_id`.

To enable those session events, add this line before initializing the SDK.

```java
Amplitude.getInstance().trackSessionEvents(true);
```

You can also log events as out-of-session. Out-of-session events have a `session_id` of `-1` and aren't considered part of the current session, meaning they don't extend the current session.

This might be useful if you are logging events triggered by push notifications, for example. You can log events as out-of-session by setting the input parameter `outOfSession` to true when calling `logEvent()`.

```java
JSONObject eventProperties = //...

//This event is now out of session
client.logEvent("event type", eventProperties, true);
```

You can also log identify events as out-of-session. This is useful if you are updating user properties in the background and don't want to start a new session. You can do this by setting the input parameter outOfSession to true when calling `identify()`.

```java
Identify identify = new Identify().set("key", "value");
Amplitude.getInstance().identify(identify, true);
```

You may also manually start a new session with its own ID.

```java
long sessionId = ...;
client.startNewSessionIfNeeded(sessionId);
```

You can use the helper method `getSessionId` to get the value of the current `sessionId`.

```java
long sessionId = Amplitude.getInstance().getSessionId();
```

{{partial:admonition type="note" heading=""}}
For Android API level 14 and higher, a new session is created when the app comes back into the foreground after being in the background for five or more minutes or when the last event was logged (whichever occurred last).

Otherwise, the background event logged is part of the current session.

You can define your own session expiration time by calling `setMinTimeBetweenSessionsMillis(timeout)`, where the timeout input is in milliseconds.

For Android API level 13 and below, foreground tracking is not available so a new session is automatically started when an event is logged 30 minutes or more after the last logged event. If another event is logged within 30 minutes, it will extend the current session. Note that you can define your own session expiration time here as well by calling `setSessionTimeoutMillis(timeout)`, where the timeout input is in milliseconds. Also note that `enableForegroundTracking(getApplication)` is still safe to call for Android API level 13 and below even though it's not available.
{{/partial:admonition}}

## Set a custom user ID

If your app has its login system that you want to track users with, you can call `setUserId` at any time.

```java
client.setUserId("USER_ID");
```

You can also add the User ID as an argument to the init call.

```java
client.initialize(this, "API_KEY", "USER_ID");

```

Don't assign users a user ID that could change, because each unique user ID is a unique user in Amplitude.

## Log level

You can control the level of logs that print to the developer console.

- 'INFO': Shows informative messages about events.
- 'WARN': Shows error messages and warnings. This level logs issues that might be a problem and cause some oddities in the data. For example, this level would display a warning for properties with null values.
- 'ERROR': Shows error messages only.
- 'DISABLE': Suppresses all log messages.
- 'DEBUG': Shows error messages, warnings, and informative messages that may be useful for debugging.

Set the log level by calling `setLogLevel` with the level you want.

```java
Amplitude.getInstance().setLogLevel(log.DEBUG)

```

## Logged out and anonymous users

Amplitude merges user data, so any events associated with a known `userId` or `deviceId` are linked the existing user.

If a user logs out, Amplitude can merge that user's logged-out events to the user's record. You can change this behavior and log those events to an anonymous user instead.

To log events to an anonymous user:

1. Set the `userId` to null.
2. Generate a new `deviceId`.

Events coming from the current user or device appear as a new user in Amplitude. Note: If you do this, you can't see that the two users were using the same device.

```java
client.setUserId(null);
client.regenerateDeviceId();

```

## Disable tracking

By default the Android SDK tracks several user properties such as `carrier`, `city`, `country`, `ip_address`, `language`, and `platform`.
Use the provided `TrackingOptions` interface to customize and toggle individual fields.

To use the `TrackingOptions` interface, import the class.

```java
import com.amplitude.api.TrackingOptions;

```

Before initializing the SDK with your apiKey, create a `TrackingOptions` instance with your configuration and set it on the SDK instance.

```java
TrackingOptions options = new TrackingOptions().disableCity().disableIpAddress().disableLatLng();
Amplitude.getInstance().setTrackingOptions(options);

```

Tracking for each field can be individually controlled, and has a corresponding method (for example, `disableCountry`, `disableLanguage`).

| Method | Description |
| --- | --- |
| `disableAdid()` | Disable tracking of Google ADID |
| `disableCarrier()` | Disable tracking of device's carrier |
| `disableCity()` | Disable tracking of user's city |
| `disableCountry()` | Disable tracking of user's country |
| `disableDeviceBrand()` | Disable tracking of device brand |
| `disableDeviceModel()` | Disable tracking of device model |
| `disableDma()` | Disable tracking of user's designated market area (DMA). |
| `disableIpAddress()` | Disable tracking of user's IP address |
| `disableLanguage()` | Disable tracking of device's language |
| `disableLatLng()` | Disable tracking of user's current latitude and longitude coordinates |
| `disableOsName()` | Disable tracking of device's OS Name |
| `disableOsVersion()` | Disable tracking of device's OS Version |
| `disablePlatform()` | Disable tracking of device's platform |
| `disableRegion()` | Disable tracking of user's region. |
| `disableVersionName()` | Disable tracking of your app's version name |


{{partial:admonition type="note" heading=""}}
Using `TrackingOptions` only prevents default properties from being tracked on newly created projects, where data has not yet been sent. If you have a project with existing data that you want to stop collecting the default properties for, get help in the [Amplitude Community](https://community.amplitude.com/?utm_source=devdocs&utm_medium=helpcontent&utm_campaign=devdocswebsite). Disabling tracking doesn't delete any existing data in your project.
{{/partial:admonition}}

## Carrier

Amplitude determines the user's mobile carrier using [Android's TelephonyManager](https://developer.android.com/reference/android/telephony/TelephonyManager#getNetworkOperatorName()) `getNetworkOperatorName()`, which returns the current registered operator of the `tower`. 

## COPPA control

COPPA (Children's Online Privacy Protection Act) restrictions on IDFA, IDFV, city, IP address and location tracking can all be enabled or disabled at one time. Apps that ask for information from children under 13 years of age must comply with COPPA.

```java
client.enableCoppaControl(); //Disables ADID, city, IP, and location tracking

```

## Advertiser ID

The Android Advertising ID is a unique identifier provided by the Google Play store. As it's unique to every person and not just their devices, it's useful for mobile attribution. This is similar to the IDFA on iOS. [Mobile attribution](https://www.adjust.com/blog/mobile-ad-attribution-introduction-for-beginners/) is the attribution of an installation of a mobile app to its original source (such as ad campaign, app store search). Users can choose to disable the Advertising ID, and apps targeted to children can't track at all.

Follow these steps to use Android Ad ID.

{{partial:admonition type="warning" heading="Google ad ID and tracking"}}
As of April 1, 2022, Google allows users to opt out of Ad ID tracking. Ad ID may return null or error. You can use am alternative ID called [App Set ID](#app-set-id), which is unique to every app install on a device. [Learn more](https://support.google.com/googleplay/android-developer/answer/6048248?hl=en).
{{/partial:admonition}}

1. Add `play-services-ads-identifier` as a dependency.

    ```java
    dependencies {
    implementation 'com.google.android.gms:play-services-ads-identifier:18.0.1'
    }

    ```
2. `AD_MANAGER_APP` Permission

    If you use Google Mobile Ads SDK version 17.0.0 or higher, you need to add `AD_MANAGER_APP` to `AndroidManifest.xml`.

    ```xml
    <manifest>
    <application>
    <meta-data
    android:name="com.google.android.gms.ads.AD_MANAGER_APP"
    android:value="true"/>
    </application>
    </manifest>

    ```
3. Add ProGuard exception

    Amplitude Android SDK uses Java Reflection to use classes in Google Play Services. For Amplitude SDKs to work in your Android application, add these exceptions to `proguard.pro` for the classes from `play-services-ads`.

4. `AD_ID` Permission 

    When apps update their target to Android 13 or above will need to declare a Google Play services normal permission in the manifest file as follows if you are trying to use the ADID as a deviceId:

    ```xml
    <uses-permission android:name="com.google.android.gms.permission.AD_ID"/>

    ```

### Set advertising ID as device ID

After you set up the logic to fetch the advertising ID, you can use `useAdvertisingIdForDeviceId` to set it as the device ID.

```java
client.useAdvertisingIdForDeviceId();

```

## App set ID

App set ID is a unique identifier for each app install on a device. App set ID is reset by the user manually when they uninstall the app, or after 13 months of not opening the app. Google designed this as a privacy-friendly alternative to Ad ID for users who want to opt out of stronger analytics.

To use App Set ID, follow these steps.

1. Add `play-services-appset` as a dependency. For versions earlier than 2.35.3, use `'com.google.android.gms:play-services-appset:16.0.0-alpha1'`

    ```java
    dependencies {
    implementation 'com.google.android.gms:play-services-appset:16.0.2'
    }

    ```
2. Set app set ID as Device ID.

    ```java
    client.useAppSetIdForDeviceId();

    ```

## Device ID lifecycle

The SDK initializes the device ID in the following order, with the device ID being set to the first valid value encountered:

1. Device ID fetched from the SQLite database
2. ADID if `useAdvertisingIdForDeviceId` is enabled and required module is installed. Learn [more](#advertiser-id)
3. App Set ID with an `S` appended if `useAppSetIdForDeviceId` is enabled and required module is installed. Learn [more](#app-set-id)
4. A randomly generated UUID with an `R` appended

### One user with multiple devices

A single user may have multiple devices, each having a different device ID. To ensure coherence, set the user ID consistently across all these devices. Even though the device IDs differ, Amplitude can still merge them into a single Amplitude ID, thus identifying them as a unique user.

### Transfer to a new device

It's possible for multiple devices to have the same device ID when a user switches to a new device. When transitioning to a new device, users often transfer their applications along with other relevant data. The specific transferred content may vary depending on the application. In general, it includes databases and file directories associated with the app. However, the exact items included depend on the app's design and the choices made by the developers. If databases or file directories have been backed up from one device to another, the device ID stored within them may still be present. Consequently, if the SDK attempts to retrieve it during initialization, different devices might end up using the same device ID.

### Get the device ID

You can use the helper method `getDeviceId()` to get the value of the current `deviceId`.

{{partial:tabs tabs="Java, Kotlin"}}
{{partial:tab name="Java"}}
```java
String deviceId = client.getDeviceId();
```
{{/partial:tab}}
{{partial:tab name="Kotlin"}}
```kotlin
val deviceId = client.getDeviceId();
```
{{/partial:tab}}
{{/partial:tabs}}

### Custom device ID

You can assign a new device ID using `setDeviceId()`. When setting a custom device ID, make sure the value is sufficiently unique. Amplitude recommends using a UUID.

```java
client.setDeviceId("DEVICE-ID");
```

## Location tracking

Amplitude converts the IP of a user event into a location (GeoIP lookup) by default. This information may be overridden by an app's own tracking solution or user data.

By default, Amplitude can use Android location service (if available) to add the specific coordinates (longitude and latitude) for the location from which an event is logged. Control this behavior by calling the `enableLocationListening` or `disableLocationListening` method after initializing.

```java
client.enableLocationListening();
client.disableLocationListening();
```

{{partial:admonition type="note" heading="Proguard obfuscation"}}
If you use ProGuard obfuscation, add the following exception to the file:
`-keep class com.google.android.gms.common.** { *; }`
{{/partial:admonition}}

## Opt users out of tracking

Users may wish to opt out of tracking entirely, which means Amplitude won't track any of their events or browsing history. `setOptOut` provides a way to fulfill a user's requests for privacy.

```java
client.setOptOut(true); //Disables all tracking of events for this user
```

## Push notification events

Don't send push notification events client-side via the Android SDK. Because a user must open the app to initialize the Amplitude SDK to send the event, events aren't sent to Amplitude until the next time they open the app. This can cause data delays.

You can use [mobile marketing automation partners](https://amplitude.com/integrations?category=mobile-marketing-automation) or the [HTTP API V2](https://developers.amplitude.com/docs/http-api-v2) to send push notification events to Amplitude.

## Event explorer

To use Event Explorer, you need either `deviceId` or `userId` to look up live events. This SDK provides a way to view them while using a debug build.

First, add the following code into your `AndroidManifest.xml`.

```xml
<activity
 android:name="com.amplitude.eventexplorer.EventExplorerInfoActivity"
 android:exported="true"
 android:screenOrientation="portrait"
 />

```

Second, add the following code in your root activity's `onCreate` life cycle.

```java
@Override
public void onCreate(Bundle savedInstanceState) {
 //...
 client.showEventExplorer(this);
 //...
}
```

## Dynamic configuration

Android SDK lets you configure your apps to use dynamic configuration. This feature finds the best server URL automatically based on app users' location.

- If you have your own proxy server and use `setServerUrl` API, leave dynamic configuration off.
- If you have users in China Mainland, then Amplitude recommends using dynamic configuration.
- By default, this feature returns server URL of Amplitude's US servers, if you need to send data to Amplitude's EU servers, use `setServerZone` to set it to EU zone.

To use, set `setUseDynamicConfig` to `true`.

```java
client.setUseDynamicConfig(true);
```

## SSL pinning

SSL Pinning is a technique used in the client side to avoid man-in-the-middle attack by validating the server certificates again after SSL handshaking. Only use SSL pinning if you have a specific reason to do so. Contact Support before you ship any products with SSL pinning enabled.

To use SSL Pinning in the Android SDK, use the class `PinnedAmplitudeClient` instead of `AmplitudeClient` to turn it on.

## Set log callback

The Amplitude Android SDK allows the app to set a callback (version 2.32.2+). Create a class and set the callback to help with collecting any error messages from the SDK in a production environment.

```java
class SampleLogCallback implements AmplitudeLogCallback {
 @Override
 public void onError(String tag, String message) {
 // handling of error message
 }
}
SampleLogCallback callback = new SampleLogCallback();
client.setLogCallback(callback);
```

## Offline mode

The Amplitude SDK supports offline usage through the `setOffline(isOffline)` method. By default, offline mode is disabled.

When offline mode is enabled, events are saved to a local storage but will not be sent to the Amplitude servers. 

When offline mode is disabled, any pending events are sent to Amplitude's servers immediately. 

To limit the necessary permissions required by the SDK, the SDK does not automatically detect network connectivity. Instead, you must manually call `setOffline()` to enable or disable offline mode.

```java
client.setOffline(true); // enables offline mode
client.setOffline(false); // disables offline mode
```

## Middlware

Middleware lets you extend Amplitude by running a sequence of custom code on every event.
 This pattern is flexible and you can use it to support event enrichment, transformation, filtering, routing to third-party destinations, and more.

Each middleware is a simple interface with a run method:

```java
void run(MiddlewarePayload payload, MiddlewareNext next);

```

The `payload` contains the `event` and an optional `extra` that allows you to pass custom data to your own middleware implementations.

To invoke the next middleware in the queue, use the `next` function. You must call `next.run(payload)` to continue the middleware chain. If a middleware doesn't call `next`, then the event processing stop executing after the current middleware completes.

Add middleware to Amplitude via `client.addEventMiddleware`. You can add as many middleware as you like. Each middleware runs in the order in which it's added.