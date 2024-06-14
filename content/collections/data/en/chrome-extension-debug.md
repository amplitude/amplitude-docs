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
updated_at: 1718057120
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

To view the [configuration options](https://www.docs.developers.amplitude.com/data/sdks/javascript/#configuration) you've set for each project's SDK, click the *API Options* tab:

![Plugin options](statamic://asset::help_center_conversions::data/plugin-options.png)

## View your hidden events

To see a list of your hidden events or to display events on the webpage as they are triggered, click the *Settings* tab.

![Hide events](statamic://asset::help_center_conversions::data/plugin-hide-events.png)