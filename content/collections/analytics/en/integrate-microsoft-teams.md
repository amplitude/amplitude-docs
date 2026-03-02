---
id: 73ce4fcf-eadd-403b-8154-244b6945e615
blueprint: analytic
title: 'Integrate Microsoft Teams with Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1740566400
---

{{partial:admonition type="tip" heading="Amplitude Global Agent"}}
The Amplitude Microsoft Teams app supports the Amplitude Global Agent. You can ask natural-language questions about your Amplitude data, create and refine charts, and find existing dashboards—all from Microsoft Teams. For more information, refer to [Global Agent in Slack and Microsoft Teams](/docs/amplitude-ai/slack-teams).
{{/partial:admonition}}

With Amplitude's app for Microsoft Teams, you can:

* Get updates about new comments you receive in Amplitude.
* Unfurl chart and cohort links into detailed previews directly in Teams channels.
* Add charts to dashboards or pin dashboards to your sidebar without leaving the conversation.
* Connect Amplitude Team Spaces to specific Teams channels and receive notifications whenever your team creates new analyses.

To connect Amplitude to Microsoft Teams, follow the steps below, or search for "Amplitude" in the Microsoft Teams App Store and install it from there.

## Connect to Microsoft Teams

Follow these steps whether you're integrating Amplitude and Microsoft Teams for the first time, or updating to the Amplitude app for Teams.

To connect your Amplitude account to Microsoft Teams:

1. Navigate to *Settings > Personal Settings*.
2. Click *Profile*, then click **Connect to Microsoft Teams**.
3. In the new browser tab that opens, click **Allow** to grant Amplitude access to your Microsoft Teams account. If you see the **Consent on behalf of your organization** checkbox, enable it to grant access for all members of your organization.
4. The Amplitude bot sends you a Teams message that confirms the connection and explains how to use the integration.

After you authenticate, Teams unfurls any links to Amplitude charts in Teams channels and direct messages. Teams doesn't unfurl Pathfinder, Compass, and Persona charts.

## Install the Amplitude app in Microsoft Teams

After you connect your Amplitude account, install the Amplitude app in your Microsoft Teams workspace.

1. On the *Profile* page in Amplitude (*Settings > Personal Settings > Profile*), click **Install app**. This opens the Amplitude app listing in the Microsoft Teams App Store.
2. Click **Get it now**, then confirm the installation.

### Admin approval

If you're a Microsoft Teams admin, the installation process redirects you to the Microsoft Teams admin center. If you aren't an admin, Teams sends an approval request to your organization's admin.

To approve the app, the admin navigates to the *Manage apps* section of the Microsoft Teams admin center and sets the Amplitude app permission policy to allow **Everyone**.

{{partial:admonition type="note" heading=""}}
There may be a delay before the admin receives the approval request, and another delay before the app becomes available after approval.
{{/partial:admonition}}

## Add the Amplitude bot to a team

After you install the Amplitude app and your admin approves it, add the Amplitude bot to the team where you want to use it.

1. In Microsoft Teams, open the team you want to add the bot to. Click **Apps** in the bottom-left corner of the Teams sidebar.
   - Alternatively, type `@` in the message compose box of any channel and select **Get agents and bots**.
2. Search for "Amplitude" and follow the on-screen instructions to add the bot to your team.

After you add the bot, a welcome message appears in the team channel. When you type `@Amplitude` in the message compose box, the mention displays as a blue tag, which indicates the bot is active.

### Verify bot availability

To confirm the bot is active in a team, type `@Amplitude hi` in any channel under that team. If the text displays in black instead of as a blue tag, the bot isn't available in that team yet.

You can also check the *Apps* section within the team's settings to verify that Amplitude appears in the list of installed apps.

### Use the Amplitude bot

Tag the bot with `@Amplitude` in any channel where it's active, followed by your question or request. The bot responds in the channel with answers based on your Amplitude data.

## Connect an Amplitude Data project to Microsoft Teams

You can subscribe a Teams channel to real-time notifications of all branch changes or publishing updates within an Amplitude Data project's tracking plan. These include:

* Branch Created / Deleted / Merged / Approved.
* Version Published.

To receive these notifications, set up the Amplitude app for Microsoft Teams for the Amplitude Data project you want updates from.

### Configure notifications

1. In Amplitude, navigate to *Data > Catalog > Integrations*.
2. If you haven't enabled the Amplitude Microsoft Teams App, grant Amplitude permission to your Teams workspace.
3. Specify the channel you want Amplitude to send notifications to.
4. Click **Add** to complete the process.

## Turn on link previews

If a shareable link doesn't unfurl when you post it in a Teams channel, you may need to enable link previews. Ensure the Amplitude Teams app has the necessary message extension permissions in your Teams admin center. Confirm that your organization's Teams policies don't disable link unfurling.

## Receive Amplitude comments in Microsoft Teams

After you connect your Teams account, Amplitude sends notifications when:

- Someone `@` messages you in an Amplitude comment.
- Someone leaves a comment on content you own.

Use this integration to get questions answered about your analysis, share an insight, or leave notes for yourself. Use the content link in the Teams message to access the Amplitude chart, dashboard, or notebook.

## Connect with team spaces

Connect Amplitude team spaces to specific Teams channels to receive notifications when your team creates new analyses. When someone adds new content to that team space, it appears in the Teams channel.

Click **Connect with Teams** from within a team space to set this up.

To disconnect your team space from Teams, click the same button—which reads *Connected to [YourTeamSpaceName]*—and click **Disconnect Teams**.

## Global Agent requirements

The Amplitude Global Agent feature in Microsoft Teams uses Large Language Model (LLM) technology to answer questions about your Amplitude data. AI-generated responses may occasionally be inaccurate or incomplete. Always verify critical business insights directly in your Amplitude workspace.

{{partial:admonition type="note" heading=""}}
You can use [Global Agent in Slack and Microsoft Teams](/docs/amplitude-ai/slack-teams) to ask natural-language questions about your product data, create and refine charts, and find existing dashboards—all from Microsoft Teams.
{{/partial:admonition}}
