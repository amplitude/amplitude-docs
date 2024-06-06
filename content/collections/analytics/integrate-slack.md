---
id: 4be51454-e583-4b1f-93b1-de647114ea68
blueprint: analytic
title: 'Integrate Slack with Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/227613388-Integrate-Slack-with-Amplitude'
this_article_will_help_you:
  - 'Connect your Slack and Amplitude accounts and receive updates in Slack'
  - 'Set up an Amplitude Data project to send updates to a specific Slack channel'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717696292
---
With Amplitude's app for [Slack](https://www.slack.com/), you can:

* Get updates about new comments you receive in Amplitude
* Unfurl chart and cohort links into detailed previews
* Add charts to dashboards or pin dashboards to your sidebar without ever leaving the conversation
* Connect Amplitude Team Spaces to specific Slack channels and receive notifications whenever your team creates new analyses

To connect Amplitude to Slack, you can either follow the steps below, or you can use the Amplitude integration in the Slack app store: 

![Add to Slack](statamic://asset::help_center_conversions::analytics/add-to-slack.png.png)

{{partial:admonition type="note" heading=""}}
If your company uses Amplitude's EU data center, there is a different Slack app intended specifically for EU customers. It can be found in the Slack app directory under “[Amplitude - EU](https://amplitude.slack.com/apps/A042J2XCRS9-amplitude-eu).”  Install it by clicking [this link](https://links.amplitude.com/ZFSte8rMWtuwkP5jE/l/0POygAjvJypciVq4d?messageId=6nK7UeyixFZbdLPAQ&rn=&re=gIt92YuUGZ1RXasBXbhB0cul2akVnauYmZlpmI&sc=false), or by following the instructions below.
{{/partial:admonition}}

### Feature availability

This feature is available to users on **all Amplitude plans**.

## Connect to Slack

Follow these steps whether you are integrating Amplitude and Slack for the first time, or updating to the current Amplitude app for Slack experience.

To connect your Amplitude account to Slack, follow these steps:

1. Navigate to *Settings> Personal Settings*.
2. Click *Profile,* then *Connect to Slack*.

	![integrate_slack_with_amplitude.png](/output/img/analytics/integrate_slack_with_amplitude.png)

3. In the new browser tab that opens, click *Allow* to grant Amplitude access to your Slack account.

![slack_connection.png](/docs/output/img/analytics/slack_connection.png)

You will immediately receive a Slack message from Amplitude, which includes a link to a brief explanation of how to use the integration.

Once you've authenticated via this process, Slack will automatically **unfurl** (or preview) any links to Amplitude charts, both in Slack channels and direct messages (**DM**s).

![unfurled_chart_in_Slack.png](/docs/output/img/analytics/unfurled_chart_in_Slack.png)

Slack will not unfurl Pathfinder, Compass, and Persona charts.

### Connect an Amplitude Data project to Slack

You can also subscribe a Slack channel to real-time notifications of all branch changes or publishing updates occurring within an Amplitude Data project’s tracking plan. These include:

* Branch Created / Deleted / Merged / Approved
* Version Published

To receive these notifications, you will have to set up the Amplitude app for Slack for the Amplitude Data project you are interested in receiving updates from. To do so, follow these steps:

1. In Amplitude Data, navigate to *Settings > Integrations*.
2. If you haven’t previously enabled the Amplitude Slack App, you’ll be prompted to grant Amplitude permission in your Slack workspace. Specify a channel where notifications about this project should be sent.  
  
	![slack_for_data.png](/output/img/analytics/slack_for_data.png)

3. Click *Add* to complete the process.

### Turn on link previews

If a shareable link doesn't unfurl when you post it in Slack, it may be because you have not enabled link previews in your Slack settings. To do this, see [Slack's documentation](https://get.slack.help/hc/en-us/articles/204399343-Sharing-links-in-Slack).

## Receive Amplitude comments directly in Slack

Once you've connected your Slack account to Amplitude, you will receive Slack notifications when you are @ mentioned in an Amplitude comment, or a comment is left on any content you own. 

Use this integration to quickly get questions answered about your analysis, share an insight, or leave notes to yourself.

![Screenshot_2019-08-05_17.37.06.png](/docs/output/img/analytics/Screenshot_2019-08-05_17.37.06.png)

Use the content link within the Slack message to quickly access the Amplitude chart, dashboard, or notebook referenced.

![Screenshot_2019-08-05_17.36.57.png](/docs/output/img/analytics/Screenshot_2019-08-05_17.36.57.png)

You can also use this integration to leave reminders or notes for yourself. Simply @ mention your own Amplitude account, and you will receive a Slack notification.

![Screenshot_2019-08-05_17.36.05.png](/docs/output/img/analytics/Screenshot_2019-08-05_17.36.05.png)

## Connect with team spaces

Connect Amplitude team spaces to specific Slack channels to receive notifications when your team creates new analyses. When new content is added to that team space, it will automatically appear in the Slack channel. Click *Connect with Slack* from within a team space to set this up:

![slack_team_space.gif](/docs/output/img/analytics/slack_team_space.gif)

To disconnect your team space from Slack, click the same button which should now read *Connected to [YourTeamSpaceName]* and select *Disconnect Slack.*