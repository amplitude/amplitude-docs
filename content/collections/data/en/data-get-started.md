---
id: 4a750149-5c99-4e90-9309-7b2944f076e3
blueprint: data
title: 'Getting started with Amplitude'
source: 'https://www.docs.developers.amplitude.com/getting-started/'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1721926346
---

In this article, find technical best practices for getting up and running with Amplitude.

## Instrumentation best practices

Before getting into the details, here are some recommended best practices for instrumenting Amplitude:

- **Always test your instrumentation:** Amplitude recommends having a testing project for every production project in your organization. This gives you a reliable way to test your instrumentation before sending production data to Amplitude
- **Amplitude can't retroactively change historical data**, so if your instrumentation is wrong, you can't clean up the data you collect later.
- **Set up at least two Amplitude projects:** One for your development or staging environment, one for your production environment. This keeps testing data separate from production data. 
- **Send the right keys:** If you are sending data server-side with the HTTP API, be sure to send a `session_id `and `insert_id `with each event. 
 
## How Amplitude receives data

You can send data to Amplitude through SDKs, or through a third party:

- [SDK Catalog](/docs/sdks/analytics)
- You can also choose to send data with a third party like [Segment](https://segment.com/), [mParticle](https://www.mparticle.com/), or [Tealium](https://tealium.com/). 

## Amplitude APIs

Amplitude has many APIs you can use in conjunction with the platform

See all the [API references](./docs/apis/analytics). 

## Amplitude schema

Amplitude's [Data Planning Playbook](/docs/data/data-planning-playbook) can help you understand more about the Amplitude schema, and Amplitude recommends reading it before continuing. 

### Naming conventions for events

After you instrument an event, you can never change the name of that event type in the raw data. For example, in v1.0 of your app, a developer instruments the following event type:

`Amplitude.getInstance().logEvent('Play song');`

Later on, in v2.0 of your app, a developer instruments this event type:

`Amplitude.getInstance().logEvent('play song');`

Strings passed to Amplitude are case-sensitive, and so Amplitude interprets these two event types as separate events. **Make sure** your event names follow a consistent syntax during instrumentation.

### Instrument user properties

[User properties](/docs/data/user-properties-and-events) are attributes specific to individual users. Examples of user properties include location, language, account type, money spent, or player type.

For recommendations around which user properties to track, see [the Amplitude Data Taxonomy Playbook](/docs/data/data-planning-playbook#user-properties). 

Amplitude SDKs include several user property operations you can use to update user property values:

- **`set`:** Set or overwrite the property value
- **`setOnce`:** Set the value only if the value hasn't already been set
- **`unset`:** Unset the value to `null`
- **`add`:** Increment the numerical value by a specified number
- **`append`:** Append the value to the property array
- **`prepend`:** Prepend the value to the property array

You can also use the [Identify API](/docs/apis/analytics/identify) to update the values of a user's user properties without having to send another event. The new values apply to the next event sent organically by that user. 

### Instrument group types

To use Amplitude's [account-level reporting](/docs/analytics/account-level-reporting) feature, you have to instrument group types. Account-level reporting lets you count by a distinct user property group, which in turn enables you to process data at the groups level, instead of the individual users level. Amplitude allows a maximum of five group types. If you're using a third party tool to instrument Amplitude (mParticle, Segment, Tealium), this maximum threshold may be lower based on the partner's limitations. 

## How Amplitude tracks unique users and sessions

Amplitude tracks unique users through a system of user IDs, device IDs, and Amplitude IDs. To learn more, check out this article on [tracking unique users](/docs/data/sources/instrument-track-unique-users).

In Amplitude, a session is a single continuous period of time a user is active within your product. Session IDs send with every event, enabling Amplitude to track them. To find out more about how this works, see the Help Center article on [tracking sessions in Amplitude](/docs/data/sources/instrument-track-sessions).

## Popular SDK configuration options

This section details some Amplitude SDK configuration options that are popularly modified.

- **`minTimeBetweenSessions` (iOS/Android):** The minimum time your app must be backgrounded before a new session begins.
- **`sessionTimeout` (Web):** The minimum time between events that must elapse before a new session begins.
- **`batchEvents`:** This is enabled by default for mobile SDKs and is optional for Web.
- **`eventUploadPeriodMillis`:** If batchEvents is enabled, this denotes the time between event batch uploads.
- **`eventUploadThreshold`:** If batchEvents is enabled, this sets the minimum number of events per batch.
- **`optOut`:** When enabled, opts the current user out of tracking.
- **`offline`:** Prevents the sending of events.
- **`saveEvents`:** This is enabled by default for all the SDKs, and allows the SDK to save unsent events onto the device.
- **`savedMaxCount`:** The maximum number of unsent events saved on a device. The default is 1000. 

## Backfilling data

You may want to consider backfilling data if:

1. **You wish to analyze historic data in Amplitude.** See the [Data Backfill Guide](/docs/data/data-backfill) for detailed instructions on backfilling data into Amplitude.
2. **Your product already has existing users**. You want to accurately reflect when these [users were new](/docs/faq/event-segmentation) in Amplitude.

