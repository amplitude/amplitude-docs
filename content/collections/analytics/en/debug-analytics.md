---
id: 8136107b-d371-498e-be08-0544a426cbc2
blueprint: analytic
title: 'Debug Analytics'
landing: false
source: 'https://www.docs.developers.amplitude.com/data/debugger/'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724882199
---
Data validation is a critical step in the instrumentation process. 

### Before you begin

Before you can debug, **you must instrument your events**. If you haven't instrumented any events, Amplitude's servers don't receive data, and no data is available in Amplitude itself. Create a test app to test and validate your first event data.

## Ingestion debugger

Use the Ingestion Debugger in Amplitude to check your requests, events and identify counts, and throttled users or devices:

1. Log in to Amplitude.
2. Click **Data** in the top nav bar and select [**Sources**](https://data.amplitude.com/amp-dev-docs/sources) from the left nav bar.
3. Click on the **Ingestion Debugger** tab to access it.

The ingestion debugger is a trio of charts showing data for successful requests, events and identify counts, and error requests for the endpoints you specify. You can specify a timeframe of either one hour or one week. 

Below the ingestion debugger is the list of throttled users and devices. Here you can see a list of which users and device IDs have been throttled in the last 30 minutes, as well as a list of silenced device IDs.

## User lookup

### Step 1: Find yourself

After you instrument your events, trigger some of those events on your own device. Once you've done that, open Amplitude Analytics and navigate to [*Users > User Profiles*](https://analytics.amplitude.com/amp-dev-docs/activity). Here, you can search for yourself by user ID or device ID.

### Step 2: Analyze the event stream

In the user profile, the [event stream](/docs/analytics/user-data-lookup#view-a-users-details-and-event-stream) displays a user's entire event history, grouped by session. The most recent activity appears at the top of the list, and events populate the stream in ten seconds to one minute.

Clicking an event gives you detailed information about it, including the user property and event property values **at the time of that event**.

Because the event stream can update in real time, you can use it to make sure you're capturing new events correctly, or to troubleshoot or debug instrumentation errors. For example, if you trigger an event only one time but the event stream consistently displays two instances of the event, there could be an instrumentation error.

Click *Raw* to see more information and the event's raw data.

## Instrumentation Explorer

The Amplitude Instrumentation Explorer is an extension in the Google Chrome Web Store that helps you examine and **debug your Amplitude Browser SDK instrumentation** just by interacting with your product. It captures each Amplitude event you trigger and display it in the extension popup. [Download it here.](https://chrome.google.com/webstore/detail/amplitude-event-explorer/acehfjhnmhbmgkedjmjlobpgdicnhkbp)

### View your triggered events

In the Instrumentation Explorer, the **Events** tab is where you can find detailed insights into the parameters of each event you trigger on your website. This includes `user_id`, `device_id`, `event_properties`, and `user_properties`.