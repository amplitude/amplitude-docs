---
id: 0556731c-f68a-495e-b85f-8e813640d6b0
blueprint: data
title: 'Integrate Jira with Amplitude Data'
source: 'https://help.amplitude.com/hc/en-us/articles/6816905540251-Integrate-Jira-with-Amplitude-Data'
this_article_will_help_you:
  - 'Set up Jira integration within Amplitude Data.'
  - 'Create Jira issues automatically when changes are made on a feature branch.'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717622968
ai_summary: 'Amplitude Data lets you connect with Jira to create new issues when you make changes to a feature branch. This feature is available on all Amplitude plans. To set up the integration, go to *Settings > Integrations* in Amplitude Data, and authenticate Jira access. Then, create a feature branch, make changes, and in Amplitude Data, you can create or link Jira issues. You can also unlink issues if needed. Any published changes will automatically comment on the linked Jira issue.'
---
Amplitude Data allows you to integrate with Jira to quickly create new Jira issues whenever you make changes to a feature branch. You can only create issues from within the feature branch, and only changes can be associated with a Jira ticket.

### Feature availability

This feature is available to users on **all Amplitude plans**.

## Set up the integration

To set up and use the integration, follow these steps:

1. In Amplitude Data, navigate to *Settings > Integrations* and find the Atlassian Jira panel. Click *Add*, and in the modal that appears, click *Authenticate* to start the authentication flow.
   
    ![image5.png](/docs/output/img/data/image5-png.png)

2. Another modal will appear, this one asking you to authorize Jira access for your site. From the drop-down in the modal, select the site you want to authorize. Then click *Accept*.

## Create a Jira issue in Amplitude Data

To create a new Jira ticket from within Amplitude Data, follow these steps:

1. First, create a feature branch and make your changes there. You can only use this integration from within a feature branch.
2. Your changes will appear grouped by sources under the Home page. If you successfully integrate with Jira, you can create a Jira Issue for each source here inside Amplitude Data.  
  
    Click *+Jira* to create a new issue or link an existing issue to current changes.

3. To unlink an issue from your feature branch, hover over the issue tag and click *Unlink Jira*. In the modal that appears, click *Unlink* to confirm the unlink action.

![image3.png](/docs/output/img/data/image3-png.png)

Once an issue is linked to a source, any subsequent published changes will automatically leave a comment on the Jira issue.