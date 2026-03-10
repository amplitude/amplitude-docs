---
id: e39f9287-bec8-4403-ba60-8b04da56b5f9
blueprint: experiment
title: 'Notifications through Slack channel or webhook'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753814210
---
Set up notification alerts for your Web and Feature experiments or for individual feature flags. There are two ways to receive notifications for different types of events:

- **Email / Slack direct messages**: Sends notifications for experiments (Web and Feature) about to start or end, if a sample-ratio mismatch (SRM) is detected, or if statistical significance for a recommendation metric is reached.
- **Slack channel notifications / webhooks / Email**: Sends notifications for any changes to an active flag configuration that generates a new history version, or when flags are activated or deactivated.

This page covers setting up and maintaining notification alerts through Slack channels, webhooks, and email. Only notifications created through the Experiment Alerts function are sent this way.

All other experiment alerts are sent through email or Slack direct message. To manage these other notification types, go to [Account Settings Notifications](/docs/feature-experiment/workflow/experiment-learnings#interpret-notifications) or [Integrate Slack](/docs/analytics/integrate-slack).

If you use Microsoft Teams, send an [email to your Teams channel](https://support.microsoft.com/en-us/office/send-an-email-to-a-channel-in-microsoft-teams-d91db004-d9d7-4a47-82e6-fb1b16dfd51e) or a [webhook](https://support.microsoft.com/en-us/office/create-incoming-webhooks-with-workflows-for-microsoft-teams-8ae491c7-0394-4861-ba59-055e33f75498).

If you use Google Chat, send an [email](https://support.google.com/chat/answer/14929313?hl=en) or [webhook](https://docs.cloud.google.com/workflows/docs/notify-google-chat).

To integrate your Amplitude flags and experiments with Sentry, go to [Sentry's documentation](https://docs.sentry.io/organization/integrations/feature-flag/generic/).

{{partial:admonition type="note" heading=""}}
You must have [Member permissions](/docs/admin/account-management/user-roles-permissions) to create, edit, or delete notification alerts. You don't need permissions to receive notifications if you're also a member of the dedicated Slack channel or webhook. However, you must have Viewer permissions to open the notification for more details. Contact your Admin if you need different permissions.
{{/partial:admonition}}

### Connect a Slack workspace to your experiment notifications

1. Go to *Experiment* and then click *Experiments*.
You can also access alerts by going to *Settings > Organization settings > Experiment* and then selecting **Add alert**.
2. Select **Alerts** in the top right.
3. Select **Connect To Slack**.
4. Select **Allow** to confirm that you want to connect Amplitude to Slack.

{{partial:admonition type="note" heading=""}}
If a Slack channel ID appears instead of a channel name, make sure you have connected Amplitude to your Slack. If you've already done that, make sure you're a member of the Slack channel. You can contact the person who created the alert (displayed in the *Created* column of the table) to add you to the channel.
{{/partial:admonition}}

## Experiment activities that generate alerts

Specify whether to receive alerts for the following experiment activities:

- Flags created, updated, or deleted.
- Stale flags.

## Set up an alert

After you connect your Slack organization to Amplitude, create notifications for your experiments.

To send notifications through webhooks, provide the URL and a valid [signing key](https://docs.knock.app/developer-tools/outbound-webhooks/overview#verifying-the-signature). You can specify your webhook when you create the alert.

Webhook schema:

```json
{
  "flagId": number
  "flagName": string (This is the flag key and not the flag name. If you want the flag name, use `flag.name`)
  "scope": "exp_deployment" | "project" | "exp_tags"
  "scopeParam": number | undefined
  "scopeParamName": string | undefined
  "action": "created" | "deleted" | "updated"
  "modifiedBy": string
  "flag": JSON
  "oldFlag": JSON
  }
```

{{partial:admonition type="note" heading="JSON schemas"}}
View the JSON schema for the `flag` and `oldFlag` parameters in the [Experiment Management API Flag Endpoints](/docs/apis/experiment/experiment-management-api-flags#get-details) documentation.
{{/partial:admonition}}

### Create an alert

1. Go to *Experiment* and then select *Experiments*.
You can also access alerts by going to *Settings > Organization settings > Experiment* and then selecting **Add alert**.
2. Select **Alerts** in the top right.
3. Specify the project you want.
4. Set the scope. Select one of:
    - **All In the Project**: Receive notifications for all experiments and flags in the project.
    - **By Deployment**: Receive notifications for all experiments and flags in your entire deployment. You must specify the deployment by label. Web Experiments and Guides & Surveys experiments use the Project API Key deployment. Go to [Deployments](/docs/feature-experiment/data-model#deployments) for more information.
    - **By Tag**: Receive notifications only for experiments and flags tagged with specific labels.
5. Choose how to receive your notifications:
    - If you're using Slack, select the dropdown to choose the channel for your alerts.
    - If you're using a webhook, enter the URL and your signing key.
    - If you're using email, enter an email address.
6. Name your alert.
7. Select **Create Alert**.
