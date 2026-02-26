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

{{partial:admonition type="tip" heading="Amplitude Global Agent"}}
The Amplitude Slack app is updated to support the Amplitude Global Agent. For more information, review [Global Agent in Slack](/docs/amplitude-ai/slack).
{{/partial:admonition}}

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

## Update your Slack connection

As Amplitude adds new features to the Slack integration, the app occasionally requires updated permissions—called "scopes"—to support new functionality. If you installed the Amplitude Slack app before January 1, 2026, you may need to re-authorize the connection to enable the latest features, including Global Agent.

### What are scopes

Scopes are permissions that define what a Slack app can do—for example, posting messages in channels, sending direct messages, or reading channel information. When Amplitude releases new Slack features, those features may require additional scopes that weren't part of the original authorization. Until you re-authorize, those new features don't work correctly.

### When you might need to update

You likely need to update your connection if any of the following apply:

- You installed the Amplitude Slack app before January 1, 2026.
- New features like Global Agent don't respond as expected in Slack.
- Your Amplitude profile settings show an **Update Slack** button instead of **Connect to Slack**.

### IT admin approval

Some Slack workspaces require admin approval before granting an app new permissions. If your organization has this policy, the update process automatically sends an approval request to your IT or Slack admin team on your behalf—you don't need to contact them separately.

- Select **Update Slack** in your Amplitude profile settings.
- Slack displays an authorization screen that lists the new scopes Amplitude requests.
- If your workspace requires admin approval, Slack automatically submits the request to your IT admin—you don't need to take any other action beyond selecting **Allow**.
- Your IT admin reviews and approves the scope update—this is typically a fast, routine approval.
- After approval, Amplitude fully updates your Slack connection, and all new features become available immediately.

### How to update

1. Navigate to *Settings > Personal Settings*, then select *Profile*. You can also go directly to [your profile settings](https://app.amplitude.com/analytics/amplitude/settings/profile).
2. Select **Update Slack** on your profile page.
3. In the Slack OAuth screen, select **Allow** to grant the updated permissions. This refreshes your connection and grants any new scopes the latest features require.
4. Open a direct message with the Amplitude bot in Slack and ask any question to confirm everything works.

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

{{partial:admonition type="note" heading=""}}
You can also use [Global Agent in Slack](/docs/amplitude-ai/slack) to ask natural-language questions about your product data, create and refine charts, and find existing dashboards—all from Slack.
{{/partial:admonition}}