---
id: 7d085b28-60c9-4103-a734-8817ce3688f1
blueprint: analytic
title: 'Use sessions, channels, and attribution to drive marketing analytics'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719528358
this_article_will_help_you:
  - 'Understand how Amplitude tracks users, events, and sessions, and how they relate to marketing channel classifiers and attribution models'
---
To get the best view of user behavior and product engagement, it's important to first understand the differences between events, users, and sessions. It’s also critical to understand how channel classifiers, attribution models, and session entries and exits work in Amplitude.

This article explains how Amplitude defines sessions and related metrics, the fundamental concepts of channel classifiers and attribution, and how they're counted and distinguished from one another.

## Sessions

Events are at the core of Amplitude Analytics, but tracking users and sessions also help to build the full picture of user engagement and the customer journey:

* **Users**: Distinct individuals who interact with your product. Amplitude identifies users through cookies, device IDs, or other tracking mechanisms. [Read more about how Amplitude tracks unique users in this article](/docs/data/sources/instrument-track-unique-users).
* **Events**: Individual actions or interactions that occur within the product, such as page views, button clicks, form submissions, or purchases. Each event is timestamped and carries relevant attributes that Amplitude calls properties. [See the article on determining events to track for more details](/docs/get-started/select-events).
* **Sessions**: A series of events that represent a user's visit or engagement with your product. Think of sessions like chapters in a book that group events together chronologically. Sessions typically have a start time (the first event) and an end time (after a period of inactivity). [See the session definition article for more information](/docs/data/sources/instrument-track-sessions).

To better understand the differences between users, events, and sessions, look at an example of how they’re tracked.

The following timelines illustrate **five distinct sessions** completed by **two unique users**, User 1 and User 2:

![Session vs Page vs User.png](/docs/output/img/analytics/session-vs-page-vs-user-png.png)

Notice that both User 1 and User 2 completed similar events during their sessions, such as page views and purchases.

The unique counts and overall totals for both users’ events can be seen in the table below:

![Event_Session_User.png](/docs/output/img/analytics/event-session-user-png.png)

The unique counts are tied to the count of distinct users, and the event totals are a cumulative sum of both users’ events. User 1 and User 2 both triggered purchases, so there's a unique count of two. User 1 completed three purchases and User 2 completed two purchases, giving us a purchase event total of five.

## Channel Classifiers

Channel classifiers can help to uncover what is driving the most traffic to your product. They apply to **individual events**, and are defined as a sequential (executed top to bottom) set of rules that determine the marketing channel that originated each event.

{{partial:admonition type='note'}}
 Channel classifier rules are applied to the events at query time, meaning that the assigned values aren't persisted and may be changed if the classifier rules are changed. [Read more about channel classifiers in this article](/docs/data/channels).
{{/partial:admonition}}

The timelines below show sessions for User 1 and User 2 with their respective channels:

![Channel Classifier_timeline.png](/docs/output/img/analytics/channel-classifier-timeline-png.png)

For example, User 1’s first session included four events with two distinct channels, email and direct.

This table shows how these channels are defined based on UTM and Referrer values:

![Channel classifier_definition.png](/docs/output/img/analytics/channel-classifier-definition-png.png)

{{partial:admonition type='note'}}
 Values that are blank or not present on the event aren't the same as `(none)`.
{{/partial:admonition}}

Notice that the organic search channel has rules in place to include referrer values of google.com and bing.com.

Since channel classifiers apply to **events**, this table shows the differences between unique counts and page view event totals by channel:

![Events by channel.png](/docs/output/img/analytics/events-by-channel-png.png)

There were two unique page views based on two distinct users. The event totals, however, are a cumulative sum of all events and can be tied to each channel. Since both User 1 and User 2 triggered page view events via the direct channel, there were two unique page views and four total page views for direct.

## Session metrics

Amplitude also tracks the following session-based metrics:

* **Session Totals**: The sum of sessions by each observed property value (each session is attributed to the property values that occur during the session). This is why the sum of group-by values can be greater than the total number of sessions.
* **Session Entries**: The first non-null property value observed within a session, also known as the entry point for the session.
* **Session Exits**: The final non-null property value observed within a session, also known as the exit point for the session.

These session-based measures help to better grasp how users first engage with or last engage with your product, as well as how much time they’re spending within it. [See the session definition article for more information](/docs/data/sources/instrument-track-sessions).

The next example showcases sessions for User 1 and User 2, but notice the channel for each event, as well as each session’s entry and exit points:

![Entry, Exit.png](/docs/output/img/analytics/entry-exit-png.png)

Notice that User 1’s first session’s entry point was via the email channel, whereas User 2’s second session’s entry point was via an organic social channel.

This table shows the overall totals of these session-based measures by channel:

![Session Metrics.png](/docs/output/img/analytics/session-metrics-png.png)

There were five distinct sessions, but each event and session can be tied to a channel. For example, the direct channel was tied to four of the five sessions, whereas the organic search channel was tied to three.

{{partial:admonition type='note'}}
 Session totals for channels are tied to each distinct session. This is why the session total for the email channel is one and not two. 
{{/partial:admonition}}

## Attribution models

Attribution models can help to pinpoint which activities lead your users to desired outcomes. Similar to channel classifiers, attribution is linked to **individual events** and doesn't apply to sessions or users. [Read more about how Amplitude uses attribution models to give credit to acquisition touch points](/docs/analytics/charts/data-tables/data-tables-attribute-credit).

In this final example, consider two attribution models:

* **First-touch**: Credits the **initial marketing channel** a user encountered within a lookback window, highlighting the journey's starting point.
* **Last-touch**: Attributes the purchase to the **final marketing channel** a user interacted with before conversion, emphasizing the crucial closing touch point.

The timelines below visualize sessions for User 1 and User 2, attributing purchase events to marketing channels and first and last touch points: 

![First, Last _ new.png](/docs/output/img/analytics/first-last-new-png.png)

For sessions with attribution, notice the first and last touches defined. User 1’s first session had a first-touch of email and a last-touch of direct. User 2’s second session had a first-touch of organic search and a last-touch of paid social.

The unique counts and event totals by channel and attribution are seen in the table below:

![Attribution table.png](/docs/output/img/analytics/attribution-table-png.png)

This example's unique counts are tied to the distinct users and the totals are a cumulative sum that can also be tied to relevant channels. The direct channel demonstrates this, showing two unique page views, four total page views, one unique last-touch purchase, and two total last-touch purchases. This is because both User 1 and User 2 triggered page views during sessions with no attribution, but only User 1 completed purchases after a last-touch from a direct channel.