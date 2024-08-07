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
When you [Autocapture plugin](/docs/get-started/autocapture), you can begin to create **labeled events** by clicking specific elements on your site, using Amplitude Data's Visual Labeling feature. This way, non-technical Amplitude users can create these events without needing to understand the structure of the page.

Amplitude maintains labeled events separately from events you've created in other ways. If there are issues with data for labeled events, make adjustments from within the _Labeled Events_ tab, instead of involving your engineering team.

## Feature availability
This feature is available on all plans, and requires the following:

* [Amplitude Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) 2.10.0 or higher
* The SDK's `config.autocapture.elementInteractions` option set to `true`. For more information, see [Browser SDK Configuration](/docs/sdks/analytics/browser/browser-sdk-2#configure-the-sdk).


## Create a labeled event with Visual Labeling

To use Visual Labeling to create new labeled events, follow these steps:

1. Open Amplitude Data and click *Visual Labeling* in the left rail. The Launch Visual Labeling modal appears.
2. Enter the URL of the site or application you want to label, and click *Start Labeling*. Amplitude opens your website or app in a new tab, with the Visual Labeling toolbar at the top of the page.
3. Click an element you want to label, the Visual Labeling overlay appears. Click *Navigate* to navigate to a different part of site that you want to label.
4. In the Visual Labeling overlay, enter a name and description for your labeled event. Select if tracking should happen when a user clicks the element, or when it changes. Visual Labeling uses the `clicked` event by default. Refine the definition and select filters as needed. When you're done, click *Save*.
5. Amplitude saves the labeled event and displays a confirmation with an option to view the labeled event.
6. Repeat steps three through five for each event you want to label.
7. When you're done labeling, return to Amplitude. Here, you can manually update the tag, text, selector, and page URL of each labeled event.

    {{partial:admonition type='note'}}
    If you leave any fields blank, Amplitude interprets that as `[any value]`. For example, if you leave the URL field blank, the tracking for that event fires on any page.
    {{/partial:admonition}}

8. If this is the only action you want to include in the labeled event, click Save. To add more actions:
   1. Click *Select action...* and choose the action to add.
   2. Enter the properties of the element you want to label, or click Switch to Visual Element Selection and repeat this process. You can add as many actions as you want.
   3. When you're done, click *Save*. The modal closes, and the Labeled Events tab loads, where your new events appear.

## Edit a labeled event

To edit a labeled event, click it on the *Labeled Events* tab.

In the event's fly-out tab, you can:

- Click *Edit* to edit the details of the event.
- Add the event directly to a new chart by clicking *Create Chart*.

## Labeled events and event volume

When you enable Autocapture, Amplitude begins tracking click and page change events on your site. These events count towards your total event volume. Labeled events act like a virtual layer on top of these events, and help define a specific type of click and use that click in an analysis. As a result, labeled events don't impact event volume beyond Autocapture.

For example, a well-instrumented site may see 10,000 events per day, and Autocapture may add as many as 2,000 events per day. This means the site would see a 20% increase in daily events. A less-instrumented site may see only 1,000 instrumented events per day. The plugin adding another 2,000 events counts as a 200% increase.

In both cases, the increase in daily events comes from tracking click and page change events. Labeled events don't impact the event count.

## Limitations

* **Event Streams**: Labeled events don't appear in the Live Event Stream, user lookup event stream, or Session Replay streams. You can view raw `Element clicked` and `Element changed` events.
* **Google Chrome extension**: The Amplitude Event Explorer Chrome extensions displays raw events sent from the browser only.

## Troubleshooting

**I don't see the visual labeling experience on my site**

If you don't see the Visual Labeling tools on your site, check the following:

* If you have pop-up or adblocking tools enabled, they can interfere with the Visual Labeling experience. Disable the adblocker and retry.
* If the URL you entered redirects to another URL, the Visual Labeling experience may not load. For security reasons, the domain of the page you're labeling needs to match the domain that you entered in Amplitude.