---
id: ed6b3562-8e62-476b-9dcd-b0b1526552eb
blueprint: account-management
title: 'Webhooks for custom monitors'
source: 'https://help.amplitude.com/hc/en-us/articles/360055808391-Webhooks-for-custom-monitors'
this_article_will_help_you:
  - 'Set up a webhook and assign custom monitors to it'
landing: false
exclude_from_sitemap: false
updated_by: 5343a026-383e-4b6a-ad4d-df18684b6384
updated_at: 1724965850
---
Webhooks are automated messages your application sends when something happens. They include a message (or **payload**) and are sent to a unique endpoint. They're an efficient way for one application to deliver real-time information to other applications, without having to wait for your API to poll data.

[Custom alerts](/docs/analytics/insights) notify you when your most important KPIs change in meaningful ways.

With **webhooks for custom monitors**, you can use a webhook to send triggered monitors to an endpoint for a number of applications whenever user behavior changes in a way that affects your KPIs.

{{partial:admonition type='note'}}
 This feature is only available to Enterprise customers and those with the Insights package.
{{/partial:admonition}}

## Create and configure a webhook

To create and configure a webhook, follow these steps:

1. Navigate to Settings by clicking on the gear icon:

![gear_icon_for_settings.png](/docs/output/img/account-management/gear-icon-for-settings-png.png)

2. Click the name of the project you want to receive notifications for.
3. Click the *Webhooks* tab. This is where you can manage your webhooks, as well as your automatic and custom monitors. The owner of the webhook, managers, and admins can edit or delete webhooks.
4. To create a new webhook, click *+ Create.*
5. Give your webhook a name and paste the URL for the endpoint you’d like to send the message to.
6. At the bottom, select the custom monitors to be sent to the endpoint you’ve configured.

Once you choose your custom monitors, click *Send a test message* to test the endpoint and see how the message posts to your endpoint.