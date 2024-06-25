---
id: 9ca72079-8ffd-4208-a9cb-d2dcedda62e6
blueprint: faq_and_troubleshooting
title: 'HTTP v2 API vs Batch Event Upload API'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/17678790790427'
category: other
---
Data can be sent to Amplitude in different ways: via SDKs, Amplitude's integrations with third-party apps, integrations with cloud solutions, etc. However, one of the most popular ways of sending data is by using [Amplitude APIs](/docs/apis/analytics). Two of the most popular APIs are the [HTTP V2 API](/docs/apis/analytics/http-v2) and [Batch API](/docs/apis/analytics/batch-event-upload).

This article covers some frequently asked questions about which API you should choose for ingestion.


{{partial:collapse name="Who should use the HTTP V2 API?"}}
The HTTP V2 API will help Amplitude users who: 

* Want to send low-volume data partitions fast
* Want to ingest data as real-time as possible
* Prefer to have the flexibility of adjusting the data on the go

The HTTP V2 API sends the data directly from your server to the HTTP V2 endpoint.
{{/partial:collapse}}


{{partial:collapse name="What are the pros and cons of using the HTTP V2 API?"}}
Once data is received by our servers, it is available in your instance within a relatively short time. This makes the HTTP V2 the most preferred method when it comes to working with real-time or live streaming data. 

Additionally, events sent with the HTTP V2 API (for the same device\_id) are processed in the exact same order in which they are received. This doesn’t always matter for your analysis, but it can have a critical impact in case your analysis is time-sensitive (ex. in specific Funnel charts).

{{partial:admonition type='note'}}
If the same user is sending data on multiple devices, there is no ordering guarantee between those events.
{{/partial:admonition}}

The downside of using the HTTP V2 API is that Amplitude throttles requests for users and devices that exceed our limit of 30 events per second (measured as an average over a recent time window). 

This means that if you exceed the limit, you will get an error, and you will have to pause sending events for that user or device for a period of 30 seconds before retrying it until you no longer receive an error response.

The HTTP V2 API would be a poor choice if you have high volumes of data or are concerned with scale.
{{/partial:collapse}}


{{partial:collapse name="What are examples of HTTP V2 API use cases?"}}
In general, the HTTP V2 API will be most useful in the following situations:

* Working with real-time data
* Working with low volumes of data
* Working with small chunks of partitioned data
{{/partial:collapse}}


{{partial:collapse name="Who should use the Batch Event Upload API?"}}
The Batch Event Upload API will help Amplitude users who:

* Plan to bulk ingest data
* Use other platforms and want to send this data to Amplitude
* Run into throttling limits

The Batch Event Upload API lets you upload large amounts of event data at once. One of the most important aspects of sending data to Amplitude is dealing with the concept of **throttling** (which you might run into when using the HTTP V2 API).

Due to how the data processing pipeline works, it can be challenging to process a high volume of events for a single device or user and that’s when the concept of throttling arises. We consider a rate of 10 events/second (EPS) for a single user/device (EPUS/EPDS) to be high and 30 EPS to be **spammy**, so we throttle these requests, as humans don’t typically produce events at such high rates, and it’s often indicative of something being broken or of spam data coming in.

However, there are still a few use cases that justify sending such big volumes of data, mostly around **batch** uploads.

For example, some customers will not upload event data until the day ended (so they can add extra information, for example). So, if a user produced 10,000 events that day and you try to send them all together in a single minute, you’ll average more 100 EPUS (which the HTTP API V2 would not be able to handle).

To help absorb these types of bursts, we created the Batch Event Upload API, which has much higher limits. It also buffers data for a longer time than the HTTP V2 API.
{{/partial:collapse}}


{{partial:collapse name="What are some Batch Event Upload API use cases?"}}
In general, the Batch Event Upload API will be most useful in the following situations:

* Backfills (sending a historical dataset all at once)
* Data migrations from another system
* Non-realtime workloads
* Working with data you don’t need in Amplitude immediately
{{/partial:collapse}}


{{partial:collapse name="What are other options?"}}
So there are pros and cons both to Batch and HTTP endpoints, but generally speaking - one is better for batch processing (Batch), and the other one is better for real-time workloads (HTTP). However, the HTTP V2 API and the Batch Event Upload API are far from the only ways to get data into Amplitude.

We also offer a range of Software Development Kits (SDKs), that makes it easy for websites, mobile apps, and desktop applications to get data to Amplitude. And there is also an option to use one of our Cloud Storage solutions or integrate your Amplitude instance with a third-party app of your choice.

You can see our growing list of sources that let you import data into Amplitude (including third-party platforms) here: [Sources Overview](/docs/data/source-catalog).
{{/partial:collapse}}
