---
id: 8136107b-d371-498e-be08-0544a426cbc2
blueprint: analytic
title: 'Debug Analytics'
landing: false
source: 'https://www.docs.developers.amplitude.com/data/debugger/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718307740
---
Data validation is a critical step in the instrumentation process. 

### Before you begin: Instrument your events

**If you haven't instrumented any events, Amplitude's servers don't receive data, and no data is available in Amplitude itself**. Amplitude strongly recommends that you create a test app to test and validate your first event data.

## Ingestion debugger

Use the Ingestion Debugger in Amplitude to check your requests, events and identify counts, and throttled users or devices:

1. Log in to Amplitude.
2. Click on **Data** in the top nav bar and select [**Source**](https://data.amplitude.com/amp-dev-docs/sources) from the left nav bar.
3. Click on the **Ingestion Debugger** tab to access it.

The ingestion debugger is a trio of charts showing data for successful requests, events and identify counts, and error requests for the endpoints you specify. You can specify a timeframe of either one hour or one week. 

Below the ingestion debugger is the list of throttled users and devices. Here you can see a list of which users and device IDs have been throttled in the last 30 minutes, as well as a list of silenced device IDs.

## User lookup

### Step 1: Find yourself

After you have instrumented your events, the first step is to manually fire some of those events on your own device. After you have done so, follow these steps:

1. Navigate to the [**User Look-Up**](http://analytics.amplitude.com/amp-dev-docs/activity) tab in the nav bar at the top of your Amplitude.
2. Click on the **User** tab to make sure you're viewing user-level details, and not account-level details.
3. Search by user ID, device ID, Amplitude ID, or user property values.

### Step 2: Analyze the event stream

After you find your user profile, scroll down to the [Event Stream](/docs/analytics/user-data-lookup#individual-event-stream) section. The event stream displays a user's entire event history, grouped by session. The most recent activity appears at the top of the list, and events populate the stream in ten seconds to one minute.

Clicking on an event gives you detailed information about it, including the user property and event property values **at the time of that event**.

Because the event stream can update in real-time, you can use it to make sure you're capturing new events correctly, or troubleshoot or debug instrumentation errors. For example, if you trigger an event only one time but the event stream consistently displays two instances of the event, then there could be an instrumentation error.

You can view more information and the raw data of an event by clicking Raw.

## Instrumentation Explorer

The Amplitude Instrumentation Explorer is an extension in the Google Chrome Web Store that helps you examine and **debug your Amplitude Browser SDK instrumentation** just by interacting with your product. It captures each Amplitude event you trigger and display it in the extension popup. [Download it here.](https://chrome.google.com/webstore/detail/amplitude-event-explorer/acehfjhnmhbmgkedjmjlobpgdicnhkbp)

### View your triggered events

In the Instrumentation Explorer, the **Events** tab is where you can find detailed insights into the parameters of each event you trigger on your website. This includes `user_id`, `device_id`, `event_properties`, and `user_properties`.