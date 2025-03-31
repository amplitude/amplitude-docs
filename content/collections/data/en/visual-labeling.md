---
id: 2634b65f-264c-413f-bccd-8d8fb5dcd88f
blueprint: data
title: 'Visual Labeling'
this_article_will_help_you:
  - 'Create and edit labeled events with no new code required'
landing: true
source: 'https://help.amplitude.com/hc/en-us/articles/24094812669979-Visual-Labeling-Quickly-create-no-code-events-from-your-site-s-existing-elements'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1723072454
landing_blurb: 'Enable non-technical Amplitude users to create events with Visual Labeling.'
---
After enabling [Autocapture](/docs/data/autocapture) on your site, you can begin to create **labeled events** by clicking specific elements on your site, using Amplitude Data's visual labeling feature. This way, non-technical Amplitude users can create these events without needing to understand the structure of the page.

Amplitude maintains labeled events separately from events you've created in other ways. If there are issues with data for labeled events, make adjustments from within the _Labeled Events_ tab, instead of involving your engineering team.

## Feature availability
This feature is available on all plans, and requires the following:

* [Amplitude Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) 2.10.0 or higher
* The SDK's `config.autocapture.elementInteractions` option set to `true`. For more information, see [Browser SDK Configuration](/docs/sdks/analytics/browser/browser-sdk-2#configure-the-sdk).

{{partial:admonition type="note" heading=""}}
Visual Labeling is available to Amplitude users with the role **Member** and above.
{{/partial:admonition}}

## Create a labeled event with visual labeling

To use Visual Labeling to create new labeled events, follow these steps:

1. Open Amplitude Data and click *Visual Labeling* in the left rail. The Launch Visual Labeling modal appears.
2. Enter the URL of the site or application you want to label, and click *Start Labeling*. Amplitude opens your website or app in a new tab, with the visual labeling toolbar at the top of the page.
3. Click an element you want to label, the visual labeling overlay appears. Click *Navigate* to navigate to a different part of site that you want to label.
4. In the visual labeling overlay, enter a name and description for your labeled event. Select if tracking should happen when a user clicks the element, or when it changes. Visual labeling uses the `clicked` event by default. Refine the definition and select filters as needed. When you're done, click *Save*. If you have labeled events that have the same definition, a warning appears to help you avoid duplication.
5. Amplitude saves the labeled event and displays a confirmation with an option to view the labeled event. Visual Labeling prevents saving events with duplicate names or definitions.
6. Repeat steps three through five for each event you want to label.
7. When you're done labeling, return to Amplitude. Here, you can manually update the tag, text, selector, and page URL of each labeled event.

    {{partial:admonition type='note'}}
    If you leave any fields blank, Amplitude interprets that as `[any value]`. For example, if you leave the URL field blank, the tracking for that event fires on any page.
    {{/partial:admonition}}

8. You can select another element to continue labeling or click "Back to Amplitude" if you're done.

### Avoid event duplication

Amplitude detects events that you label which:

* Have a similar definition to other labeled events
* Have the same name as another labeled event

When you see the `Event has a similar definition` warning, click **View** to compare your new event to the existing events. When you click through the similar definitions, Amplitude highlights elements on screen that define your event.

When you see the `This labeled event already exists` warning, click **View** to open the existing event.

## Edit a labeled event

When your site's code changes, you may need to update the definition of your labeled events to match. Since Autocapture consistently captures the raw click events, you can update the definition of your labeled events and fix any gaps in your data.

To edit your labeled events, follow these steps:

1. Open Amplitude Data and click *Events* in the left rail. Then click the *Labeled Events* tab.
2. Select the labeled event you want to edit. In the flyout tab, click *Edit*.
3. If your event is no longer collecting data because of a site change, add another condition on the bottom by clicking *Select action...*. Once added, add a new condition based on your new site structure.

### Repair a labeled event

Sometimes, changes to your site's DOM can break Visual Labeling's reference to the specific element on your site. In situations like this, Visual Labeling supports repairing events you already labeled.

To repair a labeled event:

1. Open Amplitude Data and click *Events* in the left rail. In the main section, click the Labeled Events tab.
2. Select a labeled event. In the flyout tab, you can see:
   1. A chart that depicts the number of times the event Amplitude saw over the last 30 days.
   2. Charts for each definition you've added to the labeled event.
3. To repair an event that doesn't have event volume, click *Repair*. This opens the Visual Labeling flow with the context of the selected event. 
4. Select a new element on the page to update the labeled event's definition.
5. Click *Save* to exit the Visual Labeler and apply the updated definition

### Find misconfigured events

Amplitude provides information to let you know if a labeled event isn't working as it should.

Navigate to *Data > Events*, and open the Labeled Events tab. The **Recency** column shows the last time Amplitude tracked each event. Events that weren't seen recently may show an issue with the event definition.

## Labeled events and event volume

When you enable Autocapture, Amplitude begins tracking click and page change events on your site. These events count towards your total event volume. Labeled events act like a virtual layer on top of these events, and help define a specific type of click and use that click in an analysis. As a result, labeled events don't impact event volume beyond Autocapture.

For example, a well-instrumented site may see 10,000 events per day, and Autocapture may add as many as 2,000 events per day. This means the site would see a 20% increase in daily events. A less-instrumented site may see only 1,000 instrumented events per day. The plugin adding another 2,000 events counts as a 200% increase.

In both cases, the increase in daily events comes from tracking click and page change events. Labeled events don't impact the event count.

## Limitations

* **Event streams**: Labeled events aren't available in live events, or in the event stream in user lookup and Session Replay. The raw `Element clicked` and `Element changed` events are visible instead.
* **Google Chrome extension**: The Amplitude Event Explorer Chrome extension only displays raw events from the browser, so labeled events don't appear.
* **Destination event streaming**: You can't send labeled events to destinations with [event streaming](/docs/data/destination-event-streaming-overview). You can use your labeled events to define cohorts and then use cohort syncing to integrate with (other destinations)[/docs/data/destination-catalog].
* **Content Security Policy (CSP)**: Amplitude requires cross-tab communication between your site and Amplitude. If you're CSP is set to `cross-origin-opener-policy: same-origin`, Visual Labeling may not function.

## Troubleshooting

**I don't see the visual labeling experience on my site**

If you don't see the visual labeling tools on your site, check the following:

* If you have pop-up or adblocking tools enabled, they can interfere with the Visual Labeling experience. Disable the adblocker and retry.
* If the URL you entered redirects to another URL, the visual labeling experience may not load. For security reasons, the domain of the page you're labeling must match the domain you entered in Amplitude. Try using the final URL after any redirects are complete.
