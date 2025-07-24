---
id: e39f9287-bec8-4403-ba60-8b04da56b5f9
blueprint: experiment
title: Notifications
this_article_will_help_you:
  - 'Understand the type of notifications you can set for experiments'
  - 'Create notification alerts for your experiments'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753390854
---
You can set up notifications (alerts) for your experiments. These notifications can push alerts when your experiments transition status, when they start or end, or when major changes occur.

You specify if you want to receive notifications for projects, deployments, or only for specific tags.

 You can receive notifications through: 

- Slack
- Webhook

For Slack, you must specify the Slack organization you want and then you can specify specific channels. Use different channels if you want to receive notifications for different projects or notificaitons by tag. 

When setting notifications through webhook, you must provide the URL and valid [signing key](https://docs.knock.app/developer-tools/outbound-webhooks/overview#verifying-the-signature).

##### To connect a Slack organization to your experiment notifications

You only need to connect your Slack organization to your experiment notifications once.

1. Go to *Experiment > Experiments*. 
2. Click **Alerts** in the top right.
3. Click **Connect To Slack**.
4. Click **Allow** to confirm that you want to connect Amplitude to Slack.

## Setting up an alert

After you have connected your Slack organization to. Amplitude, you can create notifications for your experiments. 

{{partial:admonition type="note" heading=""}}
If you want to send notificaitons through webhooks, you can specify your webhook at the same time that you create the alert.
{{/partial:admonition}}

##### To set up an alert

1. Go to *Experiment > Experiments*. 
2. Click **Alerts** in the top right.
3. Specify the project that you want.
4. Set the scope. You can select one of:
    - **All In the Project**: Receive notifications for all experiments in the project.
    - **By Deployment**: Receive notificaitons for all experiments in your entire deployment.
    If you are receiving alerts by deployment, you must specify the deployment by ID number.
    - **By Tag**: Receive notificaitons only for experiments that have been tagged with specific labels. 
    For more information about tags, go to[ Web Experiment Implementation](/docs/web-experiment/implementation#tag-managers). 
5. Choose how you want to receive your notifications:
    - If you're using Slack, click the dropdown to choose the channel for your alerts.
    - If you're using a Webhook, enter the URL and your signing key.
6. Name your alert.
7. Click **Create Alert**.