---
id: 57f6f8ee-4044-4a3e-af34-c6d6eca409dc
blueprint: data
title: 'Overview of user properties and event properties in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/115002380567-Overview-of-user-properties-and-event-properties-in-Amplitude'
this_article_will_help_you:
  - 'Articulate the differences between user properties and event properties, and use each type appropriately and effectively in your analyses'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717611656
---
In Amplitude, **properties** are attributes that provide additional context around your users and the events they trigger. There are two types of properties in Amplitude:

1. **User properties:** User properties are the attributes of individual users. Common user properties include device type, location, User ID, and whether the user is a paying customer or not. An attribute can reflect either current or previous values, depending on its nature and how often it is updated.
2. **Event properties:** Event properties are attributes of a particular event. The values they contain are current for the moment at which the event was triggered. For example, the event  `JoinCommunity`  could have an event property of  `Type` , which denotes the kind of community joined **at the time** of that event.

This article will describe what user and event properties do, how Amplitude updates and applies them, and how you can hide individual properties in an Amplitude project.

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

You can also set up custom user properties. Be sure to choose characteristics and traits that are intrinsic to the user or to the device they're using; otherwise, the data you collect from your user properties won't be as useful. Some common examples of custom user properties include referral source, plan type, number of friends, or current level in a game.

You can tell the difference between default Amplitude user properties and custom user properties by looking for the Amplitude logo. If you see it, you've located a default user property. The names of custom user properties will not be prefixed by that logo.

Amplitude customers typically implement up to 20 custom user properties, in addition to the default properties.

### How Amplitude updates user properties

When a user triggers an event that is captured by Amplitude, it includes the current values for each user property, but these values can change over time. For example, a user might relocate from New York to Dallas, or convert from a free user to a paying one. When this happens, Amplitude updates the user properties and applies the new values to the events the user sends from that point forward. Updates to user property values aren't applied retroactively and the older values are maintained in your historical data. In other words, the property values should always reflect the values at the time of the event. 

For example, in the image below, this user viewed an article at 10:11 am. The value for the  `City` property became `San Francisco`.

![overview of properties.png](/docs/output/img/data/overview-of-properties-png.png)

This user also viewed an article about a week earlier. When that event is selected, the  `City` property is shown as `New York`—which was the value at the time that the  `view article` event was triggered.

![overview of properties 2.png](/docs/output/img/data/overview-of-properties-2-png.png)

The user properties displayed with each event in a user's [individual event stream](/docs/analytics/user-data-lookup) capture the value of the user property *at the time of the event*. This information is derived from either the most recent event sent via an Identify call.

{{partial:admonition type="note" heading=""}}
You do not have to send custom user properties with every event. Once a user property is set, its value will persist, and Amplitude will apply it to all subsequent events until the value is changed. Don't worry if you forget to apply custom user properties to your events, as you can update user properties later via the [Identify API](/docs/apis/analytics/identify), however note that if you query on this event in Amplitude later, the updated user property will not appear with the event and will only apply to events from that point forward. 
{{/partial:admonition}}

#### When old and new user property values overlap

When a user property's value changes, Amplitude charts can show the user in both the new and the old user property categories. This overlap only applies for the specific day on which the property value changed.

Here's an example of how that might work: On July 1st, a user logs into your game app—currently at version 1.8—and plays a few games. Later that day, she updates to the brand-new version 2.0 and plays some more. If you segment the daily active user chart by version, and then compare version 1.0 and 2.0, that user will appear in both segments for that day. However, beginning July 2nd, she'll only appear in the version 2.0 segment, until she updates to a newer version.

Something similar can happen when you've applied a user segment to a chart. Amplitude will show  `(none)`  values if the user had no value for a user property at the time of the event. If a user initially had  `isPaying`  =  `(none)`  for their first  `PlaySong`  event, but then had  `isPaying`  =  `True` for the next  `PlaySong`  event, the user will show up in both buckets. If you look at the [User Activity](/docs/analytics/user-data-lookup) page for that user, only their most recent value for that property will appear in the top section of their profile.

### How Amplitude applies user properties to events

User properties can be applied to events in three different ways:

1. **User property is updated *before* an event is sent:** The property's value is updated in the user property table and is applied to the next event that is sent to Amplitude. This is the recommended and expected method for updating user properties so that the updated property value is correctly applied to the event.
2. **User property is updated *after* an event is sent:** The event is sent to Amplitude, and then the property's value is updated in the user property table. The updated value is not reflected in the UI until another event is sent.
	* If an Identify call is sent after the event, the updated value is *not* reflected with the event. It will be reflected at the top of a user's profile, but will not appear in chart results until another event is sent after the Identify call.
3. **User property is sent *with* an event:** For events sent via Amplitude's [HTTP API](/docs/apis/analytics/http-v2), you can include user properties with the server-side call. The updated user property value is reflected in the UI as soon as the event is received by Amplitude; the user property table is also updated once the event is ingested. Future events will have the updated user property value until the value in the user property table is updated again.

For a new user property value to be reflected in the UI, an event must follow or be sent with the update. User properties can be updated via the [Identify API](/docs/apis/analytics/identify). Read and understand the Identify API documentation fully before using it.

![pasted_image_at_2017_04_11_06_16_pm.png](/docs/output/img/data/pasted-image-at-2017-04-11-06-16-pm-png.png)

## Event properties

Event properties are attributes of the events your users trigger, and which you then send to Amplitude. Each event will have its own set of event properties. The nature of these properties depends on both the type of product you have, and the specific information you're most interested in discovering. For instance, if  `Swipe`  is an event you're tracking, the event property  `Direction`  could have the values  `Left`  or  `Right` .

Some example event properties are description, category, type, duration, level, percent completed, count, source, status, number, lives, authenticated, error number, rank, action, and mode. Use event properties to reduce the number of events you're tracking and/or better analyze your events.

**NOTE:** Because Amplitude is an event-based platform, events are logged with the event properties and the user properties present at the time the event was triggered. This is reflected in your charts. If your chart is not be returning the expected results, you may be querying on the wrong property type.  
  
For example, imagine you have a user property called `email` and a separate event property also called `email`. The user property `email` stores all the data, but if instead you're querying on the event property `email`, your chart will return unexpected results. If you scroll up or down in the dropdown list, you will see *Event Properties* and *User Properties*—be sure to select the correct one!

## Hide properties

You can [hide old or buggy properties as needed](/docs/data/remove-invalid-data). Hiding event or user properties will only hide them from appearing on the platform UI and does not delete them. You can always unhide the properties if you change your mind.
