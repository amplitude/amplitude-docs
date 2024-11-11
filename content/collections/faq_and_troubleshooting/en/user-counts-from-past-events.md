---
id: 5373e9b6-531e-42ad-9c06-d783488cef88
blueprint: faq_and_troubleshooting
title: 'User counts from past events'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/18151693456923'
---
The user count for an earlier date can fluctuate as time goes by. When you view your data on different days, the number of users for an earlier date may increase or decrease.

The user count can **increase** when events that occurred in the past are ingested into Amplitude later. Most frequently, it happens for one of the following reasons:

* Amplitude's mobile SDKs batch events, with a threshold of every 30 seconds, or every 30 events. When users don't meet this threshold, their events may not be sent to Amplitude until they return to your product and trigger more events.
	* To resolve this, adjust the event upload frequency. For [Android Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk#configure-the-sdk), configure `flushIntervalMillis` and/or `flushQueueSize`. For [iOS SDK](/docs/sdks/analytics/ios/ios-swift-sdk#configure-the-sdk), configure eventUploadPeriodSeconds and/or eventUploadThreshold. See [SDK documentation](/docs/sdks/analytics) to learn more about configuring the threshold on other SDKs.
* Amplitude's Batch API/server-side integrations have inherent delays.
	* To resolve this, schedule batches more frequently.
* If the user's cellular or WiFi connection was not strong enough when they triggered events, those events will be held until the connection is stronger.
	* There is no remedy for this issue.

The user count can **decrease** when user records are merged.

Amplitude uses a system of user IDs, device IDs, and Amplitude IDs to [track unique users](/docs/data/sources/instrument-track-unique-users). If some of your users don't have user IDs, or if you have a lot of anonymous events, these anonymous events are first assigned to an anonymous profile, and then later merged into a known profile.

Your data will eventually stabilize, as anonymous users come back and merge into existing profiles. The amount of time this takes depends on user behavior (how often they return to your product) as well as your settings (how often you batch events). Users who interact with your product every day will display shorter delays in merging, while those who return less frequently will have longer delays.
