---
id: f4d3ad91-b9c5-4271-b06d-3ac81d3dba0f
blueprint: chart
title: 'Event Explorer: View event streams in real time'
source: 'https://help.amplitude.com/hc/en-us/articles/360050836071-Event-Explorer-View-event-streams-in-real-time'
this_article_will_help_you:
  - 'Identify and select the right events for your analysis, especially when your events are not clearly labeled'
  - 'QA instrumentation issues with your product'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717691104
ai_summary: "Amplitude's Event Explorer helps you see real-time events and properties to analyze relevant data. You can find and add events to charts as you trigger them. This feature is available on all Amplitude plans. Event Explorer is useful for choosing events, QA on instrumentation, and verifying event implementation. You can view events in real-time, search for users, and add events to charts. The tool helps you understand data taxonomy and identify gaps in events. Use Event Explorer to improve analysis accuracy and verify event implementation."
---
Even with clean data, knowing which data to use in an analysis isn't always as straightforward as we would like: taxonomies can sometimes be unclear or counterintuitive; out-of-date events can persist well after the point when they should have been deprecated; events can sometimes break unexpectedly.

{{partial:admonition type='note'}}
You may also find [this video](https://academy.amplitude.com/use-event-explorer-to-learn-about-your-taxonomy/1311428) on Event Explorer helpful.
{{/partial:admonition}}

Amplitude’s Event Explorer helps you overcome these and similar challenges by surfacing events and properties in real time for any user flow, so you can immediately see which data is relevant.

![event_explorer.png](/docs/output/img/charts/event-explorer-png.png)

Simply find your test account ID and click through the area of your product you want to analyze. Event Explorer shows the events you’re triggering **as you trigger them**. You’ll know exactly which events correspond with the user actions you’re interested in analyzing, and you can immediately add them to any Amplitude chart.

### Feature availability

This feature is available to users on **all Amplitude plans**. See the [pricing page](https://amplitude.com/pricing) for more details.

{{partial:admonition type="note" heading=""}}
Starter and Plus plan users have limited event explorer functionality.
{{/partial:admonition}}

## Who should use Event Explorer?

Event Explorer helps Amplitude users who: 

* Are unsure which events to use or fear coming to wrong conclusions using the wrong data
* Are part of a large organization with a centralized team doing most of the instrumentation that others must rely on for analysis
* Are unfamiliar with their data's taxonomy, dealing with poor or messy data, or data dictionaries that are hard to keep current
* Want to conduct QA on instrumentation-related issues
* Help other team members decide which events to use in their analyses

## Event Explorer use cases

In general, Event Explorer is most useful in two situations:

* Help new and existing users choose the right events to answer their questions and self-serve the taxonomy questions currently asked of the analytics team. For example, a company could use Event Explorer to help Amplitude users in their different organizations learn the taxonomy created by the central team, or use it to onboard new Amplitude users on how to make an accurate chart or find an event.
* Quickly **verify and QA instrumentation** in real time to identify any gaps or issues with events. An engineer could use Event Explorer to verify whether she has implemented a new event, or implemented it correctly. Data and Engineering teams can see in real-time if any given event is properly firing, either within a flow or on its own.

## View a real-time event stream using Event Explorer

To use Event Explorer to view events as they're triggered, follow these steps:

1. In any Amplitude chart, click *Event Explorer*. It may take up to a minute for events to appear when first launched.

![click_event_explorer.png](/docs/output/img/charts/click-event-explorer-png.png)

2. Click *+* *Add new user* from the target dropdown.

![add_new_user2.png](/docs/output/img/charts/add-new-user2-png.png)

1. In the modal that opens, search for a user by [IP address, user ID, device ID,](#find-your-user-id-or-device-id) or user property. IP address is the default search criteria, and returns all users with the same IP address.

![event_explorer_setup.png](/docs/output/img/charts/event-explorer-setup-png.png)

If you haven't set up targeting, the *Event Explorer Setup* modal opens when you click *Event Explorer*.

1. Choose the desired user from your search results and click *Save User For Targeting*. You only need to save a user once.
2. Log into or open your product with your IP address, user ID or device ID, and begin using it. Open Event Explorer for the project the user is triggering events in, and watch as the events roll in, in near-real time.   
  
{{partial:admonition type='note'}}
If you send events periodically to Amplitude (for example, batched), they don't appear until Amplitude receives them.   
{{/partial:admonition}}

`Identify` events aren't visible in Event Explorer. However, you can view them with the Amplitude Event Explorer Chrome extension.

Once you’ve found the events that are most relevant to your analysis, you can add them directly to any Amplitude chart. To do so, follow these steps:

1. In Event Explorer, click the event you want to include. The properties of that event appear in the right frame.
2. Select any properties you want to include in your analysis. (This step is optional.)
3. Click *Add Event to Chart* to add this event.

### Find your user ID or device ID

Once you locate your ID, Amplitude remembers it for you; you don't need to find it again. This ID must have been active in your product during the last 30 days.

{{partial:admonition type='note'}}
There may be situations where you want to surface events in Event Explorer while logged out. To do this, we suggest you search by your device ID or IP address to locate yourself.
{{/partial:admonition}}

Methods you can use to locate your ID include:

* Searching by IP address: this is Amplitude's default search ID.
* Searching by device ID or user ID: click *IP address* and choose either *User ID* or *Device ID* from the dropdown.
* Searching on any user property: click *IP address* and choose a different property from the dropdown (e.g. choose *email* and enter your email).

**Other methods:**

* The [Instrumentation Explorer](/docs/data/chrome-extension-debug) Chrome plugin, which works for our JS SDK, identifies your user ID.
* If you use Amplitude's iOS SDK or Android SDK, [there is a tool](https://www.docs.developers.amplitude.com/data/debugger/) to identify your user ID and device ID when running under a debug version.
* Your company may have an internal tool or method to find your ID. Consider asking someone in your organization for tips.
* Try firing some events that are your users are unlikely to trigger. Then use *Filter by events* on the [User Lookup](/docs/analytics/user-data-lookup) page to locate the ID that just fired those events. This is your user ID.