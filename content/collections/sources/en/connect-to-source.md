---
id: a1eb1953-5738-45a4-8a4f-e276692b4089
blueprint: source
title: 'Connect to a source'
source: 'https://help.amplitude.com/hc/en-us/articles/16806069264539-Connect-to-a-source'
this_article_will_help_you:
  - 'Gain an understanding of the *Sources* interface that tracks outside data sources, as well as the monitoring of ingested data'
  - 'Add a source to connect third-party data for analysis in Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718126553
---
Amplitude Data makes it easy for you to set up third-party platforms as data **sources**. This enables you to bring data generated with other tools into Amplitude.

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Understand the interface

The *Sources* panel includes two tabs, *Sources List* and *Ingestion Debugger*.

The *Sources List* tab shows you a list of the active data sources for a project, the activity status of each source, and the event volume sent from that source in the last 30 days. 

The Ingestion Debugger is a trio of charts showing data for successful requests, events and identify counts, and error requests for the endpoints you specify. You can specify a time frame of either the last 3 hours or the last 90 days.

Below the Ingestion Debugger is the list of throttled users and devices. Here you can see a list of which users and device IDs have been throttled in the last 30 minutes, as well as a list of silenced device IDs.

{{partial:admonition type='note'}}
 Throttled user IDs and device IDs will only appear in the Ingestion Debugger for users with Manager permissions or higher. User with Member and Viewer permissions won't see anything in this section.
{{/partial:admonition}}

## Add a data source

To add a new data source, follow these steps:

1. In the left-hand rail, click *Catalog*.
2. Look for the tile of the source you want to add. When you find it, click it.
3. At this point, the specifics of what you’ll see on the screen depend on the source. In some cases, you will be redirected to log into your source account. In others, you’ll see a set of instructions on the source’s *Set Up Connection* tab:  
  
Just follow the instructions you see on the screen to complete the setup process for your data source.

## Source Notifications

Notifications alert you when you have an issue with your source. By default, new sources notify the creator and Admins.

### Editing your Notifications:

1. In the left-hand rail, click *Sources*.
2. Look for the source you wish to configure notifications for. When you find it, click it.
3. Look for the *Notifications Button* with an email icon on the right side of your screen. When you hover over it, you should see *Manage Notifications*. Click the button.
4. You can *Subscribe* or *Unsubscribe* yourself. You can also *Manage Notifications* to add or remove other email addresses.

### Adding Notifications to Slack

1. Follow [this guide](https://slack.com/help/articles/206819278-Send-emails-to-Slack#h_01F4WDZG8RTCTNAMR4KJ7D419V) to set up an email for your Slack channel or DM
2. Now, follow *Editing your Notifications* above to add that email to your source's notifications.