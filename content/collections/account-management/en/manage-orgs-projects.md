---
id: 4ac86a5c-028a-4bd7-8b78-e74aa4ee3238
blueprint: account-management
title: 'Manage organizations and projects'
source: 'https://help.amplitude.com/hc/en-us/articles/360058073772-Manage-organizations-and-projects'
this_article_will_help_you:
  - 'Organize, update, and delete your Amplitude organization and projects'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715292596
---
Once you've created your [account](/docs/get-started/create-a-new-account) and your [first project](/docs/get-started/create-project), you will from time to time need to manage and update them. This article explains how to perform common tasks related to organization and project management in Amplitude.

{{partial:admonition type='note'}}
You may want to take [this course](https://academy.amplitude.com/amplitude-analytics-admin-essentials) on administering Amplitude in our Academy.
{{/partial:admonition}}

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Approve and provision new users in your organization

New users joining an existing open organization or who are accepting an invitation to join receive immediate access. For organizations requiring admin approval, however, new users can't access the organization until they're granted approval. 

Admins receive email notifications whenever a new user joins. If access requires admin approval, you can approve join requests by opening the email and clicking *Review access request*. Otherwise, you can assign permissions to the new user by clicking on the button in the email (either *Assign Project Permissions* or *Go to Settings*, depending on whether you use project-level permissions).

## View and edit your project information

Navigate to *Settings* > *Organization* *Settings > Projects* and click the name of the project you’d like to view or edit. This opens the General tab, where you’ll find the following information about your project:

| **Term**            | **Definition**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project ID          | This is the project’s unique Amplitude-generated ID.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| API Key             | This is the project’s API key, used for calling Amplitude’s APIs. Only admins and managers can view the API key.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| Secret Key          | This is the project's secret key, which is also used for calling Amplitude’s APIs. Only admins and managers can view the secret key.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Session Definition  | This identifies the value Amplitude is currently using for this project to group events for sessions-based charts. The default setting is *Session ID*, but you can choose to group sessions by an event or user property instead.                                                                                                                                                                                                                                                                                                                                                             |
| Query Time Sampling | This enables you to speed up your queries by restricting your analyses to a 10% sample of your users. It's **disabled by default**.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| Time Zone           | This is the time zone displayed on charts for this project. You can edit this value by selecting a new time zone from the drop-down menu; Amplitude shifts the timestamps of this project’s events to match. The default time zone is UTC (Universal Time Coordinated). This setting affects all Amplitude users and queries, which includes the [Dashboard Rest API](https://developers.amplitude.com/docs/dashboard-rest-api). It doesn't affect the [HTTP API](https://developers.amplitude.com/docs/http-api-v2) or your raw data, as event ingestion continues to be in UTC. |
| Weeks Start On      | Specifies the day each week begins.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Quarter Starts In   | Specifies the month in which the current quarter begins.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Currency Display    | [The unit of currency displayed for revenue metrics](https://help.amplitude.com/hc/en-us/articles/15581410157339-Change-the-unit-of-currency-your-project-uses-).                                                                                                                                                                                                                                                                                                                                                                                                                              |
| User Downloads      | This is where you can enable or disable the [download users](https://help.amplitude.com/hc/en-us/articles/236032527#download-users) feature in the Microscope, in the export cohorts feature, and the export breakdown tables.                                                                                                                                                                                                                                                                                                                                                                 |
| Event Types         | Shows your project's current distinct count of event types sent to Amplitude.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Event Properties    | Shows your project's current distinct count of event properties sent to Amplitude.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| User Properties     | Shows your project's current distinct count of user properties being sent to Amplitude.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Events This Month   | Shows the number of events your project has sent to Amplitude this month.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Events Last Month   | Shows the number of events your project sent to Amplitude last month.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |

{{partial:admonition type='note'}}
Only admins and managers can edit project settings. All project information except the API key and secret key are available to viewers and members.
{{/partial:admonition}}

You can add, remove, and edit [annotations](/docs/analytics/microscope#add-annotation) easily from the *Annotations* tab.

With [Insights](/docs/analytics/insights), you can bulk manage your automatic and custom monitors from the *Insights* tab.

## Delete a project

To delete a project, follow these steps:

1. Navigate to *Settings > Projects*.
2. From the list, select the project you want to delete.
3. Click *Delete*.

## Change your name or URL, or delete your organization

If you're a **Growth** or **Enterprise** customer, contact your CSM to help you change your organization's name or URL, or delete your organization. If you don't know your CSM, use Amplitude's in-product chat.

1. Log in to your account:
   * US Region: [https://app.amplitude.com/login ](https://app.amplitude.com/login)
   * EU Region: [https://app.eu.amplitude.com/login](https://app.eu.amplitude.com/login)

2. In the upper-right corner of the Amplitude app, click the Help icon, then click *Chat with us*.
3. Click *Get answer now with AI*, and enter `Talk to a person` in the chat. A dialog appears with your CSM's name and contact email.

If you're on another plan type, and don't have a CSM or AE:

{{partial:admonition type="note" heading=""}}
Amplitude requires that you use the same email address listed on the Team Members page, and can't process requests from an unknown email address.
{{/partial:admonition}}

1. To request an organization URL or name change, go to [https://support.amplitude.com](https://support.amplitude.com), select the *Service Task* request type, and *Org url/name change* as the service task.

2. To request an organization deletion, go to [https://support.amplitude.com](https://support.amplitude.com), select the *Service Task* request type, and *Org Deletion* as the service task.

3. Click *Submit* to complete the form. Amplitude dsends a copy of the request to your email, and responds by email when the request is complete.

{{partial:admonition type='note'}}
The Amplitude Support team responds to these requests the first Monday of each month, or the following Tuesday if Monday is an observed holiday. The support team includes all requests sent before 9 AM Pacific Time on the first Monday of each month in the batch. 
{{/partial:admonition}}

## How to rotate your project's API key or secret key

Amplitude doesn't support rotating API keys due to the inherent public nature of API keys. Changing this key can affect ingestion and data loss if misused. However, with Admin approval Amplitude can re-generate your project's secret key on the backend. If you would like to submit a request to change the secret key, submit a support request [here](https://help.amplitude.com/hc/en-us/requests/new) with the following information: 

* The name and ID of the project in question.
* Three suggested times within the next three days for Amplitude to make the change. An agent will coordinate the exact time with you.
* Approval from an admin of the project. If you're not an admin, you must copy an admin in the request.