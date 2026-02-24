---
id: e39f9287-bec8-4403-ba60-8b04da56b5f9
blueprint: experiment
title: 'Notifications through Slack Channel or Webhook'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753814210
---
Set up notification alerts for your Web and Feature experiments or for individual feature flags. There are two ways to receive notifications for different types of events:

- **Email / Slack direct messages**: Sends notifications for Experiments (Web and Feature) about to start or end, if a sample-ratio mismatch (SRM) is detected, or a statsig for a recommendation metric reached.
- **Slack channel notifications / webhooks**: Sends notifications for any changes to an active flag configuration that generates a new history version or when flags are activated or deactivated.

This page discusses setting up and maintaining notification alerts through Slack channels and webhooks. Only notifications created through the Experiment Alerts function are sent in this way. 

All other experiment alerts are sent either through email or Slack direct message. For more information on these other types of notification, go to [Account Settings Notifications](/docs/feature-experiment/workflow/experiment-learnings#interpret-notifications) or [Integrate Slack](/docs/analytics/integrate-slack) to know how to manage your Slack workspace integration. 

{{partial:admonition type="note" heading=""}}
You must have [Member permissions](/docs/admin/account-management/user-roles-permissions) to create/edit/delete any notification alerts. You don't need any permissions to receive notifications if you also a member of the dedicated slack channel or webhook. However, you must have Viewer permissions to open the notification for more details. Talk to your Admin if you need different permissions.
{{/partial:admonition}}

##### To connect a Slack workspace to your experiment notifications

1. Go to *Experiment* and then click *Experiments*. 
You can also access alerts by going to *Settings > Organization settings > Experiment* and then clicking **Add alert**. 
2. Click **Alerts** in the top right.
3. Click **Connect To Slack**.
4. Click **Allow** to confirm that you want to connect Amplitude to Slack.

{{partial:admonition type="note" heading=""}}
If a slack channel id instead of a slack channel name appears, make sure you have connected Amplitude to your Slack. If you have already done that then make sure you are a member of the slack channel. You can reach out to the person who created the alert (displayed in the Created column of the table) to add you to the slack channel.
{{/partial:admonition}}

## Experiment activities that generate alerts
You can specify if you want to receive alerts for the following experiment activities:

- Flags created, updated, or deleted
- Stale flags

## Setting up an alert

After you have connected your Slack organization to Amplitude, you can create notifications for your experiments. 

If you want to send notifications through webhooks, you must provide the URL and valid [signing key](https://docs.knock.app/developer-tools/outbound-webhooks/overview#verifying-the-signature). You can specify your webhook at the same time that you create the alert. 

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

{{partial:admonition type="note" heading="JSON Schemas"}}
View the JSON schema for the `flag` and `oldFlag` parameters in the [Experiment Management API Flag Endpoints](/docs/apis/experiment/experiment-management-api-flags#get-details) documentation.
{{/partial:admonition}}

##### To set up an alert

1. Go to *Experiment* and then click *Experiments*. 
You can also access alerts by going to *Settings > Organization settings > Experiment* and then clicking **Add alert**. 
2. Click **Alerts** in the top right.
3. Specify the project that you want.
4. Set the scope. You can select one of:
    - **All In the Project**: Receive notifications for all experiments and flags in the project.
    - **By Deployment**: Receive notifications for all experiments and flags in your entire deployment.
    If you are receiving alerts by deployment, you must specify the deployment by the label. Go to [Deployments](/docs/feature-experiment/data-model#deployments) for more information. Remember that Web Experiments and Guides and Surveys experiments have the Project API Key deployment.
    - **By Tag**: Receive notifications only for experiments and flags tagged with specific labels. 
5. Choose how you want to receive your notifications:
    - If you're using Slack, click the dropdown to choose the channel for your alerts.
    - If you're using a Webhook, enter the URL and your signing key.
6. Name your alert.
7. Click **Create Alert**.
