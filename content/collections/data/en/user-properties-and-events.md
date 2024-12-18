---
id: 57f6f8ee-4044-4a3e-af34-c6d6eca409dc
blueprint: data
title: 'About user properties and event properties'
source: 'https://help.amplitude.com/hc/en-us/articles/115002380567-Overview-of-user-properties-and-event-properties-in-Amplitude'
this_article_will_help_you:
  - 'Articulate the differences between user properties and event properties, and use each type appropriately and effectively in your analyses'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722895468
---
In Amplitude, properties are attributes that provide additional context around your users and the events they trigger. There are two types of properties in Amplitude:

1. **User properties:** User properties are the attributes of individual users. Common user properties include device type, location, User ID, and whether the user is a paying customer or not. An attribute can reflect either current or previous values, depending on its nature and how often it updates.
2. **Event properties:** Event properties are attributes of a particular event. The values they contain are current for the moment at which the event occurred. For example, the event  `JoinCommunity`  could have an event property of  `Type` , which denotes the kind of community joined **at the time** of that event.

This article describes what user and event properties do, how Amplitude updates and applies them, and how you can hide individual properties in an Amplitude project.

{{partial:admonition type="info" heading=""}}
For more on events, users and properties, take this course in [the Amplitude Academy](https://academy.amplitude.com/amplitude-getting-started-with-analytics/1092674/scorm/40m548g557cd).
{{/partial:admonition}}

## User properties

As mentioned above, a user property is an attribute that describes a useful detail about the user it's attached to. Amplitude sends user properties with every event. 

Amplitude's SDKs track the following user properties by default:

* Platform
* Device Type
* Device Family
* Country
* City
* Region
* Start Version
* Version
* Carrier
* OS
* Language
* Library
* IP Address

You can find the definitions of each property [here](/docs/get-started/user-property-definitions).

You can also set up custom user properties. Choose characteristics and traits that are intrinsic to the user or to the device they're using; otherwise, the data you collect from your user properties isn't as useful. Some common examples of custom user properties include referral source, plan type, number of friends, or current level in a game.

You can tell the difference between default Amplitude user properties and custom user properties by looking for the Amplitude logo. If you see it, you've located a default user property. The names of custom user properties aren't prefixed by that logo.

Amplitude customers typically implement up to 20 custom user properties, along with the default properties.

### How Amplitude updates user properties

When a user triggers an event that Amplitude captures, it includes the current values for each user property, but these values can change over time. For example, a user might move from New York to Dallas, or convert from a free user to a paying one. When this happens, Amplitude updates the user properties and applies the new values to the events the user sends from that point forward. Updates to user property values aren't applied retroactively and the older values remain in your historical data. In other words, the property values should always reflect the values at the time of the event. 

For example, in the image below, this user viewed an article at 10:11 AM. The value for the  `City` property became `San Francisco`.

![overview of properties.png](/docs/output/img/data/overview-of-properties-png.png)

This user also viewed an article about a week earlier. When you select that event, the  `City` property displays as `New York`, which was the value at the time the user triggered the  `view article` event.

![overview of properties 2.png](/docs/output/img/data/overview-of-properties-2-png.png)

The user properties displayed with each event in a user's [individual event stream](/docs/analytics/user-data-lookup) capture the value of the user property *at the time of the event*. Amplitude derives this information from either the most recent event sent with an Identify call.

{{partial:admonition type="note" heading=""}}
You don't need to send custom user properties with every event. Once a user property is set, its value  persists, and Amplitude applies it to all subsequent events until the value changes. If you forget to apply custom user properties to your events, you can update user properties later through the [Identify API](/docs/apis/analytics/identify). If you query on this event in Amplitude later, the updated user property doesn't appear with the event and will only apply to events from that point forward. 
{{/partial:admonition}}

#### When old and new user property values overlap

When a user property's value changes, Amplitude charts can show the user in both the new and the old user property categories. This overlap only applies for the specific day on which the property value changed.

Here's an example of how that might work: On July 1st, a user logs into your game app—currently at version 1.8—and plays a few games. Later that day, she updates to the brand-new version 2.0 and plays some more. If you segment the daily active user chart by version, and then compare version 1.0 and 2.0, that user appears in both segments for that day. However, beginning July 2nd, she appears only in the version 2.0 segment, until she updates to a newer version.

Something similar can happen when you've applied a user segment to a chart. Amplitude shows  `(none)`  values if the user had no value for a user property at the time of the event. If a user initially had  `isPaying`  =  `(none)`  for their first  `PlaySong`  event, but then had  `isPaying`  =  `True` for the next  `PlaySong`  event, the user shows up in both buckets. If you look at the [User Activity](/docs/analytics/user-data-lookup) page for that user, only their most recent value for that property appears in the top section of their profile.

### How Amplitude applies user properties to events

You can apply user properties to events in three ways:

1. Update the user property before you send an event. Update the property's value in the user property table and apply it to the next event you send to Amplitude. This is the recommended and expected method for updating user properties so that the updated property value is correctly applied to the event.

2. Update the user property after you send an event. You send an event to Amplitude, and then update the property's value in the user property table. The updated value isn't reflected in the user interface until you send another event.
  * If you send an Identify call after the event, the updated value isn't reflected with the event. It displays at the top of the user's profile, but doesn't appear in chart results until you send another event after the Identify call.s

3. Send a user property with an event. For events sent through the [HTTP API](/docs/apis/analytics/http-v2), you can include user properties with the server-side call. This updated property displays in the user interface as soon as Amplitude receives the event. The user property table also updates after Amplitude ingests the event. Future events have the updated property value until it updates again.

Send an event with, or directly after a new property value to ensure it displays in the UI. You can update User properties can with the [Identify API](/docs/apis/analytics/identify). Read and understand the Identify API documentation fully before using it.

![pasted_image_at_2017_04_11_06_16_pm.png](/docs/output/img/data/pasted-image-at-2017-04-11-06-16-pm-png.png)

## Event properties

Event properties are attributes of the events your users trigger, and which you then send to Amplitude. Each event has its own set of event properties. The nature of these properties depends on both the type of product you have, and the specific information you're most interested in discovering. For instance, if  `Swipe`  is an event you're tracking, the event property  `Direction`  could have the values  `Left`  or  `Right` .

Some example event properties are description, category, type, duration, level, percent completed, count, source, status, number, lives, authenticated, error number, rank, action, and mode. Use event properties to reduce the number of events you're tracking and/or better analyze your events.

{{partial:admonition type="note" heading=""}}
Amplitude is an event-based platform. As a results, it logs events with event and user properties at the time a user triggers an event. Amplitude's charts reflect this. If your chart doesn't return the expected results, your query may reference the wrong property type.
{{/partial:admonition}}
  
For example, if you have a user property and an event property both called `email`, verify the property you query on in a chart. Otherwise, your chart returns data that you may not expect.

## Hide properties

You can [hide old or buggy properties as needed](/docs/data/remove-invalid-data). Hiding event or user properties will only hide them from appearing on the platform UI and doesn't delete them. You can unhide the properties if you change your mind.

## Automatic deletion of user properties

Amplitude automatically deletes the user properties for users with no event data in the last 14 months. As long as a user has activity in your application or website over the last 14 months, Amplitude retains user properties associated with them.