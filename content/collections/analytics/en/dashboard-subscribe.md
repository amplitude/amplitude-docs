---
id: bec01e15-549f-4bce-958c-8530830146ef
blueprint: analytic
title: 'Subscribe to a dashboard'
source: 'https://help.amplitude.com/hc/en-us/articles/19465059724827-Subscribe-to-a-dashboard'
this_article_will_help_you:
  - 'Receive updates to a dashboard through email or Slack'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717692886
---
When you subscribe to a dashboard, you receive an HTML-formatted email report with optional CSV files. Send dashboard subscription emails can to anyone, including people who aren't members of your Amplitude organization. 

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

To subscribe to a dashboard—either your own, or someone else's—follow these steps: 

1. From within the dashboard you want to subscribe to, click *More,* then select *Subscribe* from the drop-down menu. The *Subscribe to Dashboard Reports* modal opens.
2. In the *Email* tab, your name should already appear in the *Subscribe yourself* field. Set your preferred update frequency and click *Add*.  
  
  {{partial:admonition type='note'}}
  If you own or co-own the dashboard, you can also add other subscribers, the *Subscribe yourself* field changes to *Add subscribers*; there, you can add subscribers other than yourself.
  {{/partial:admonition}}

3. To subscribe a Slack channel to the dashboard, click the *Slack* tab. In the *Add new subscribers* field, enter the names of the Slack channels you want to subscribe to this dashboard. Notifications take the form of automated recurring dashboard PDFs, paired with a link back to the dashboard, sent to Slack channels you designate.

![DB_Reports_Sample.png](/docs/output/img/analytics/db-reports-sample-png.png)

Dashboard owners can add subscribers to a dashboard and set the update frequency (for example every Monday at 12 PM UTC), with or without an attached .CSV file. Dashboard owners can also customize the frequency of email reports on a person-by-person basis.

View and manage the dashboards you subscribed to by clicking *Settings > Organization Settings >* *Content Access > Dashboard Subscriptions*. You can cancel subscriptions you no longer need or use, change the day of the week and time Amplitude sends the email, and specify whether the email should include a .CSV file. 

{{partial:admonition type="note" heading="Subscription duration"}}
Dashboard subscriptions remain active for one year from the date of creation. Two months before the subscription expires, Amplitude sends subscribers an alert, through which they can renew the subscription.
{{/partial:admonition}}

Admins can view and delete any dashboard subscriptions in their organization.

![Screenshot](/docs/output/img/analytics/screenshot.png)
