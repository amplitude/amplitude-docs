---
id: 51fd1430-6852-4203-9a8d-b0beba4834b7
blueprint: guides_and_survey
title: 'Notifications'
exclude_from_sitemap: false
---
Set up notification alerts for your surveys in Guides and Surveys. When someone submits a survey response, Amplitude can send a notification to a Slack channel or a webhook so your team stays informed in real time.

This page covers creating and managing notification alerts through the Guides and Surveys project settings. To learn how to connect your Slack workspace to Amplitude, go to [Integrate Slack](/docs/analytics/integrate-slack).

If you use Microsoft Teams, you can send notifications to a [Teams webhook](https://support.microsoft.com/en-us/office/create-incoming-webhooks-with-workflows-for-microsoft-teams-8ae491c7-0394-4861-ba59-055e33f75498).

If you use Google Chat, you can send notifications through a [webhook](https://docs.cloud.google.com/workflows/docs/notify-google-chat).

{{partial:admonition type="note" heading="Guides and Surveys permissions*"}}
You must have Guides and Surveys project settings permissions to create, edit, or delete notification alerts. You don't need any special permissions to receive notifications if you're a member of the Slack channel or webhook endpoint. Talk to your Admin if you need different permissions.
{{/partial:admonition}}

## Connect a Slack workspace

Before you can send alerts to a Slack channel, connect your Slack workspace to Amplitude.

##### To connect a Slack workspace to your survey notifications

1. Go to *Settings > Projects*, select your project, then click **Guides & Surveys**.
2. Expand the **Alerts** card.
3. Click **Connect To Slack**.
4. Click **Allow** to confirm that you want to connect Amplitude to Slack.

{{partial:admonition type="note" heading=""}}
If a Slack channel ID appears instead of the channel name, make sure you have connected Amplitude to your Slack workspace. If you have already done that, make sure you are a member of the Slack channel. You can reach out to the person who created the alert to add you to the channel.
{{/partial:admonition}}

## Survey activities that generate alerts

You receive alerts when a survey response is submitted. This includes responses from any active survey that matches the scope you configure for the alert.

## Set up an alert

After you have connected your Slack workspace to Amplitude, you can create notification alerts for your surveys. If you want to send notifications through a webhook, you can provide the URL and signing key when you create the alert.

##### To set up an alert

1. Go to *Settings > Projects*, select your project, then click *Guides & Surveys*.
You can also click the bell icon on the *Guides & Surveys* list page and choose **Add Alert**.
2. Expand the **Alerts** card and click **Add Alert**.
3. Set the scope. You can select one of:
    - **All in Project**: Receive notifications for all survey responses in the project.
    - **By Tag**: Receive notifications only for surveys with a specific tag.
    - **By Survey**: Receive notifications for a single survey.
4. Choose how you want to receive your notifications:
    - If you're using Slack, click the dropdown to choose the channel for your alerts.
    - If you're using a webhook, enter the URL and your signing key.
5. Name your alert.
6. Click **Create Alert**.
