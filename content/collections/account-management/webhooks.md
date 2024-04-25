---
title: "Webhooks for custom monitors"
source: "https://help.amplitude.com/hc/en-us/articles/360055808391-Webhooks-for-custom-monitors"
id: ed6b3562-8e62-476b-9dcd-b0b1526552eb
---

#### This article will help you:

* Set up a webhook and assign custom monitors to it
* Post monitors directly into a Slack channel

Webhooks are automated messages your application sends when something happens. They include a message (or **payload**) and are sent to a unique endpoint. They're an efficient way for one application to deliver real-time information to other applications, without having to wait for your API to poll data.

[Custom alerts](/analytics/insights) notify you when your most important KPIs change in meaningful ways.

With **webhooks for custom monitors**, you can use a webhook to send triggered monitors to an endpoint for a number of applications whenever user behavior changes in a way that affects your KPIs.

{{partial:admonition type='note'}}
 This feature is only available to Enterprise customers and those with the Insights package.
{{/partial:admonition}}

## Create and configure a webhook

To create and configure a webhook, follow these steps:

1. Navigate to ![gear_icon_for_settings.png](/output/img/account-management/gear-icon-for-settings-png.png)
2. Click the name of the project you want to receive notifications for.
3. Click the *Webhooks* tab. This is where you can manage your webhooks, as well as your automatic and custom monitors. The owner of the webhook, managers, and admins can edit or delete webhooks.
4. To create a new webhook, click *+**Create.*
5. Give your webhook a name and paste the URL for the endpoint you’d like to send the message to.
6. At the bottom, select the custom monitors to be sent to the endpoint you’ve configured.

Once you’ve chosen your custom monitors, you can test your endpoint by clicking *Send a test message* to see how the message will be posted to your endpoint.

## Send monitors to Slack

One of the most common applications of webhooks and custom monitors is to send triggered monitors to a Slack channel. 

To post monitors to your Slack workspace, you’ll need to have a Slack app created. If you don’t have one, Slack outlines the process [here](https://api.slack.com/messaging/webhooks#getting_started__1.-create-a-slack-app-if-you-dont-have-one-already). 

If you do have an existing Slack app, follow these steps:

1. In Slack, navigate to the app [management page.](https://api.slack.com/apps)
2. Click your own app to reach the Settings page.
3. Click *Incoming Webhooks* in the sidebar, then toggle the *Activate Incoming Webhooks* switch to On.
4. Now that incoming webhooks are enabled, the settings page will refresh, displaying some additional options. Click *Add New Webhook to Workspace*.
5. Pick a Slack channel where the monitors will post, and then click to authorize the app. You'll be sent back to your app’s settings page. You should now see a new entry under the Webhook URLs for Your Workspace section, with a webhook URL that'll look something like this:

`https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`

6. Copy the URL generated, and paste it into the *URL* field from the Create Webhook flow in Amplitude.

Form there, you can select the monitors you want posted to your Slack channel and test the URL. Now, the monitors you’ve selected will also post to your Slack channel when triggered.
