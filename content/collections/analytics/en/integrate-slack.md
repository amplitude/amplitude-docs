---
id: 4be51454-e583-4b1f-93b1-de647114ea68
blueprint: analytic
title: 'Integrate Slack with Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/227613388-Integrate-Slack-with-Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724882676
---
With Amplitude's app for [Slack](https://www.slack.com/), you can:

* Get updates about new comments you receive in Amplitude
* Unfurl chart and cohort links into detailed previews
* Add charts to dashboards or pin dashboards to your sidebar without ever leaving the conversation
* Connect Amplitude Team Spaces to specific Slack channels and receive notifications whenever your team creates new analyses

To connect Amplitude to Slack, you can either follow the steps below, or you can use the Amplitude integration in the Slack app store: 

![Add to Slack](statamic://asset::help_center_conversions::analytics/add-to-slack.png.png)

{{partial:admonition type="note" heading=""}}
If your company uses Amplitude's EU data center, there is a different Slack app intended specifically for EU customers. Find it in the Slack app directory under “[Amplitude - EU](https://amplitude.slack.com/apps/A042J2XCRS9-amplitude-eu).”  Install it by clicking [this link](https://links.amplitude.com/ZFSte8rMWtuwkP5jE/l/0POygAjvJypciVq4d?messageId=6nK7UeyixFZbdLPAQ&rn=&re=gIt92YuUGZ1RXasBXbhB0cul2akVnauYmZlpmI&sc=false), or by following the instructions below.
{{/partial:admonition}}


## Connect to Slack

Follow these steps whether you are integrating Amplitude and Slack for the first time, or updating to the current Amplitude app for Slack experience.

To connect your Amplitude account to Slack, follow these steps:

1. Navigate to *Settings > Personal Settings*.
2. Click *Profile,* then *Connect to Slack*.

	![integrate_slack_with_amplitude.png](/docs/output/img/analytics/integrate_slack_with_amplitude.png)

3. In the new browser tab that opens, click *Allow* to grant Amplitude access to your Slack account.

![slack_connection.png](/docs/output/img/analytics/slack_connection.png)

You will immediately receive a Slack message from Amplitude, which includes a link to a brief explanation of how to use the integration.

After you authenticate, Slack unfurls any links to Amplitude charts, both in Slack channels and direct messages.

![unfurled_chart_in_Slack.png](/docs/output/img/analytics/unfurled_chart_in_Slack.png)

Slack will not unfurl Pathfinder, Compass, and Persona charts.

### Connect an Amplitude Data project to Slack

You can also subscribe a Slack channel to real-time notifications of all branch changes or publishing updates occurring within an Amplitude Data project’s tracking plan. These include:

* Branch Created / Deleted / Merged / Approved
* Version Published

To receive these notifications, set up the Amplitude app for Slack for the Amplitude Data project you want to receive updates from.

##### Configure notifications

1. In Amplitude, navigate to *Data > Catalog > Integrations*.
2. If you haven’t previously enabled the Amplitude Slack App, grant Amplitude permission to your Slack workspace. Specify the channel you want Amplitude to send notifications to.
  
	![slack_for_data.png](/docs/output/img/analytics/slack_for_data.png)

3. Click *Add* to complete the process.

### Turn on link previews

If a shareable link doesn't unfurl when you post it in Slack, you may need to enable link previews in your Slack settings. To do this, review [Slack's documentation](https://get.slack.help/hc/en-us/articles/204399343-Sharing-links-in-Slack).

## Receive Amplitude comments directly in Slack

After you connect your Slack account, Amplitude sends notifications when:

- Someone `@` messages you in an Amplitude comment.
- Someone leaves a comment on content you own.

Use this integration get questions answered about your analysis, share an insight, or leave notes to yourself.

![Screenshot_2019-08-05_17.37.06.png](/docs/output/img/analytics/Screenshot_2019-08-05_17.37.06.png)

Use the content link within the Slack message to access the Amplitude chart, dashboard, or notebook referenced.

![Screenshot_2019-08-05_17.36.57.png](/docs/output/img/analytics/Screenshot_2019-08-05_17.36.57.png)

## Connect with team spaces

Connect Amplitude team spaces to specific Slack channels to receive notifications when your team creates new analyses. When someone adds new content to that team space, it appears in the Slack channel. Click *Connect with Slack* from within a team space to set this up:

![slack_team_space.gif](/docs/output/img/analytics/slack_team_space.gif)

To disconnect your team space from Slack, click the same button which should now read *Connected to [YourTeamSpaceName]* and select *Disconnect Slack.*

## AskAI requirements

The Amplitude AskAI feature requires a paid Slack plan to access within the Slack app container. This is due to Slack's platform requirements for AI-powered features. However, all other Amplitude features continue to work on free Slack plans.

The Amplitude AskAI feature uses Large Language Model (LLM) technology to answer questions about your Amplitude data. While designed to be helpful, AI-generated responses may occasionally be inaccurate or incomplete. Always verify critical business insights directly in your Amplitude workspace.