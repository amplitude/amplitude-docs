---
id: 2634b65f-264c-413f-bccd-8d8fb5dcd88f
blueprint: data
title: 'Visual Labeling'
this_article_will_help_you:
  - 'Create and edit labeled events with no new code required'
landing: false
source: 'https://help.amplitude.com/hc/en-us/articles/24094812669979-Visual-Labeling-Quickly-create-no-code-events-from-your-site-s-existing-elements'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718657270
---
When you enable [the Autocapture plugin](https://www.docs.developers.amplitude.com/data/sdks/browser-2/autocapture/), you can begin to create **labeled events** by clicking specific elements on your site, using Amplitude Data's Visual Labeling feature. This way, non-technical Amplitude users can create these events without needing to understand the structure of the page.

Labeled events are maintained separately from events you've created in other ways. If there are issues with data for labeled events, simply make adjustments from within the _Labeled Events_ tab, instead of involving your engineering team.

This is **not** a tag management solution that allows you to manage or insert marketing tags on your site. Instead, Visual Labeling is designed to **reduce instrumentation barriers**, so you can accelerate your insights without waiting for assistance from an engineer.

## Feature availability
This feature is available to users on Starter plans who onboarded on or after April 1st, 2024. See our [pricing page](https://amplitude.com/pricing) for more details.

{{partial:admonition type='note'}}
Labeled events are limited to the specific interactions captured by the Autocapture plugin. As with other types of events, Amplitude Data will automatically associate user and group properties to these events, but no additional event properties will be captured.
{{/partial:admonition}}

Visual Labeling is available for web applications and requires installation of the following:

- Amplitude Browser SDK
- Autocapture plugin

## Create a labeled event with Visual Labeling

To use Visual Labeling to create new labeled events, follow these steps:

1. Open Amplitude Data and click *Events* in the left rail.
2. Select the *Labeled Events* tab. If someone in your organization has created labeled events before, they will appear here. Otherwise, this tab will be empty.
3. Click *+Create labeled event*. The *Open Event Tagger* modal will appear.
4. Enter the URL of the site or application you want to tag, then click *Start Tagging*. The app will open in a new tab.
5. In the app, click the element you want to tag. Amplitude Data will tag the element and return you to the Amplitude environment.
6. In the *Save Labeled Event* modal, enter the name and description of your labeled event.
7. You have two options for registering user activity with this element: when it is clicked, or when it is changed. Select the correct action from the *When this* drop-down menu.
8. To replace this element with a different one, click *Replace Element*. Amplitude Data will return you to step 4 of this procedure.
9. To edit the element’s properties manually, click *Edit Manually*. Here you can change the tag, text, selector, or page URL.

{{partial:admonition type='note'}}
If you leave a field blank, Amplitude Data will interpret that as [any value]. For example, leaving the URL field blank results in the tag / text / selector combination you specified firing on any page.
{{/partial:admonition}}

10. If this is the only action you wish to include in your labeled event, click *Save*. Otherwise, proceed to the next step to add more actions.
11. To add another action to your labeled event, click *Select action…* and choose the appropriate action.
12. Enter the properties of the element you want to tag, or click *Switch to Visual Element Selection* and repeat this process. You can add as many actions as you want.
13. When you're done, click *Save*. The modal will close, and you will be returned to the *Labeled Events* tab. Your new event will be visible there.


{{partial:admonition type='note'}}
You can only use default properties with a labeled event created via Visual Labeling. To define your own properties, track the event in your code instead.
{{/partial:admonition}}

## Edit a labeled event

To edit a labeled event, click on it from within the *Labeled Events* tab.

In the event's fly-out tab, you can:

- Click *Edit* to edit the details of the event.
- Add the event directly to a new chart by clicking *Create Chart*.

## Labeled events and event volume

Once you have enabled the Autocapture plugin, Amplitude will begin tracking click and page change events on your site. **These events do count** towards your event volume. Labeled events act as a **virtual** layer **on top** of these events, to help define a specific type of click and use it in an analysis. Therefore, **labeled events don't impact** your event volume.

For example, a well-instrumented site may see 10,000 events per day, and this plugin might add as many as 2,000 events per day. This site would therefore see a 20% increase in daily events. On the other hand, 1,000 events per day might be the norm for a similar site with only rudimentary instrumentation. Because this plugin will add the same number of events—2,000 per day—this site will see a 200% increase in daily events.

In both cases, the increase in daily events comes from tracking the click and page change events on your site. Labeled events do not affect the event count either way.