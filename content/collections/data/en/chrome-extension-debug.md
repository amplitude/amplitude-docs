---
id: 8160e521-d064-46f7-bf1b-595dc1c56327
blueprint: data
title: 'Debug with the Amplitude Chrome extension'
source: 'https://help.amplitude.com/hc/en-us/articles/360003032451-Debug-with-the-Amplitude-Chrome-extension'
this_article_will_help_you:
  - 'Debug your instrumentation in real time, without opening Amplitude Analytics'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719614507
package_name: 'Amplitude Event Explorer'
bundle_url: 'https://chrome.google.com/webstore/detail/amplitude-event-explorer/acehfjhnmhbmgkedjmjlobpgdicnhkbp'
---
The Amplitude Instrumentation Explorer is an extension in the Google Chrome Web Store that helps you examine and debug your Amplitude JS SDK instrumentation just by interacting with your product. It will capture each Amplitude event you trigger and display it in the extension popup. [Download it here.](https://chrome.google.com/webstore/detail/amplitude-instrumentation/acehfjhnmhbmgkedjmjlobpgdicnhkbp)

{{partial:admonition type="" title=""}}
The Instrumentation Explorer displays the `event_type` , even when it has a different display name.  
{{/partial:admonition}}

## View your triggered events

In the Instrumentation Explorer, the *Events* tab is where you'll find detailed insights into the parameters of each event **you** trigger on your website. This includes `user_id`, `device_id`, `event_properties`, and `user_properties`.

![](statamic://asset::help_center_conversions::data/plugin.png)

To switch between the different Amplitude projects that are receiving your events, select it from the Project dropdown. Each Amplitude project is distinguished by an abbreviated API key.

To clear all the events from your popup, click *Clear Events.*

To hide specific event types, click the "Invisible" icon:

![hide_events.png](/docs/output/img/data/hide-events-png.png)

To copy your events' event and user property parameters, click the "Copy" icons:

![Copy your events](statamic://asset::help_center_conversions::data/plugin-copy.png)

## View your configuration options

To view the [configuration options](/docs/sdks/analytics/browser/browser-sdk-2#configure-the-sdk) you've set for each project's SDK, click the *API Options* tab:

![Plugin options](statamic://asset::help_center_conversions::data/plugin-options.png)

## View your hidden events

To see a list of your hidden events or to display events on the webpage as they are triggered, click the *Settings* tab.

![Hide events](statamic://asset::help_center_conversions::data/plugin-hide-events.png)

## Guides and surveys

The extension includes tools to help you debug Guides & Surveys. Use these features to verify SDK setup, troubleshoot why guides or surveys aren't showing, and test event-based triggers.

{{partial:admonition type="tip"}}
The Guides & Surveys tab doesn't update live. Wait for the page to finish loading before you review its information.
{{/partial:admonition}}

### SDK setup

Verify that the Guides & Surveys SDK is installed and running correctly on the page before troubleshooting specific guides or surveys.

The SDK setup section shows the status of four steps:
- **Installed**: The SDK is installed on the page
- **Initialized**: The SDK is initialized with your configuration
- **Analytics Connected**: The SDK is connected to atleast one analytics SDK
- **Booted**: The SDK has been provided user info and is now ready to display guides and surveys based-on triggers

If all checks pass but guides or surveys still aren't working, verify these settings:

- **Configuration**: Use **Show config** to verify the API key matches the project where your guide or survey is published.
- **User identification**: Use **Show user info** to verify the `user_id` matches the expected user.
- **SDK installation**: The Guides & Surveys SDK might be installed on some pages but not others. Verify it's installed on all pages where you plan to set up a guide or survey.
- **Boot step**: The boot step might be conditional on certain environments or user types. Ensure it's always called regardless of environment or user type.

### Troubleshooting guides and surveys

The troubleshooting section shows all published guides and surveys that could appear on the current page. Each guide or survey displays its trigger conditions and whether those conditions are met.

Open a preview of any guide or survey to see the Preview toolbar and debug individual steps. The preview helps you test the guide's behavior and identify issues with specific steps.

The expanded section also shows why a guide or survey may not be showing without opening a preview. Check the trigger conditions to see which requirements aren't met:
- **Should show if triggered**: Whether the guide would show if all trigger conditions were met
- **Trigger conditions**: Built-in throttles, custom throttles, limits, page targeting, snooze settings, and user targeting

### Forwarded Events

View all events that the Guides & Surveys SDK can see client-side. The SDK only sees client-side events and doesn't have access to server-side events.

Use the Forwarded Events section to:
- View events that the SDK has received
- Simulate test events to trigger guides that depend on specific events

To test an event-based trigger, enter the event name in the input field and click **Test Event**. The event appears in the logged events list with its timestamp and full event payload.
