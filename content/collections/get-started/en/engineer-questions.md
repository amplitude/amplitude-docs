---
id: 1ec657a2-1a00-4264-af01-78e7c34fe98d
blueprint: get-started
title: 'Questions your engineer might ask you'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
source: https://help.amplitude.com/hc/en-us/articles/16798497073947-Questions-your-engineer-may-ask-you
updated_at: 1718660315
this_article_will_help_you:
  - 'Supply your engineering team with information they may require during the instrumentation and implementation process '
---
Sometimes, your engineer may have questions for you about how you want to use and classify data in Amplitude. Here are some of the more common ones, along with some resources to help you answer them.

## Could you provide a sample or example payload of the data issue you’re seeing?

The [User Lookup](/docs/analytics/user-data-lookup) lets you explore real-time data streams from actual users. You can also start by using [Microscope](/docs/analytics/microscope) in a chart, and then selecting View User Streams to drill down to User Lookup.

## What specific user/group properties are you certain you’ll need?
Here is a [guide](/docs/get-started/select-events) to the events and properties that companies in specific industries will need to get the most from Amplitude. Start there first.

## How frequently do you anticipate user properties will need updating? Is updating upon profile changes sufficient?

User properties reflect the state of the user. They [apply across all of their future events](/docs/data/user-properties-and-events) until the properties are updated again. You do not have to send user properties with every event, because Amplitude will automatically fill in existing user property values to an event until they are updated.


## Why is this classified as an event property rather than a user property?

The type of property is determined by the subject of the property value. If a property describes a characteristic of a user—like their location, language, device type, or referral source, among many others—then it's a user property. Likewise, if a property adds context to an event the user triggered—like the direction of a finger swipe or the title of a viewed article, for example—then it's an event property.

If your engineer is asking this, you should look closely at the event to make sure you've classified it correctly.