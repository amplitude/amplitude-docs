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
Once you've created your [first organization](/get-started/create-org) and your [first project](/get-started/create-project), you will from time to time need to manage and update them. This article explains how to perform common tasks related to organization and project management in Amplitude.

{{partial:admonition type='note'}}
You may want to take [this course](https://academy.amplitude.com/amplitude-analytics-admin-essentials) on administering Amplitude in our Academy.
{{/partial:admonition}}

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Approve and provision new users in your organization

New users joining an existing open organization or who are accepting an invitation to join will receive immediate access. For organizations requiring admin approval, however, new users will be unable to access the organization until approval is granted. 

Admins will receive email notifications whenever a new user joins. If access requires admin approval, you can approve join requests by opening the email and clicking *Review access request*. Otherwise, you can assign permissions to the new user by clicking on the button in the email (either *Assign Project Permissions* or *Go to Settings*, depending on whether you use project-level permissions).

## View and edit your project information

Navigate to *Settings* > *Organization* *Settings > Projects* and click the name of the project you’d like to view or edit. This will open the General tab, where you’ll find the following information about your project:

| **Term** | **Definition** |
| --- | --- |
| Project ID | This is the project’s unique Amplitude-generated ID. |
| API Key | This is the project’s API key, used for calling Amplitude’s APIs. Only admins and managers can view the API key. |
| Secret Key | This is the project's secret key, which is also used for calling Amplitude’s APIs. Only admins and managers can view the secret key. |
| Session Definition | This identifies the value Amplitude is currently using for this project to group events for sessions-based charts. The default setting is *Session ID*, but you can choose to group sessions by an event or user property instead. |
| Query Time Sampling | This enables you to speed up your queries by restricting your analyses to a 10% sample of your users. It is **disabled by default**. |
| Time Zone | This is the time zone displayed on charts for this project. You can edit this value by selecting a new time zone from the drop-down menu; Amplitude will shift the timestamps of this project’s events to match. The default time zone is UTC (Universal Time Coordinated). This setting will affect all Amplitude users and queries, which includes the [Dashboard Rest API](https://developers.amplitude.com/docs/dashboard-rest-api). It will not affect the [HTTP API](https://developers.amplitude.com/docs/http-api-v2) or your raw data, as event ingestion will continue to be in UTC.  |
| Weeks Start On | Specifies the day each week begins.  |
| Quarter Starts In | Specifies the month in which the current quarter begins. |
| Currency Display | [The unit of currency displayed for revenue metrics](https://help.amplitude.com/hc/en-us/articles/15581410157339-Change-the-unit-of-currency-your-project-uses-). |
| User Downloads | This is where you can enable or disable the [download users](https://help.amplitude.com/hc/en-us/articles/236032527#download-users) feature in the Microscope, in the export cohorts feature, and the export breakdown tables. |
| Event Types | Shows your project's current distinct count of event types sent to Amplitude. |
| Event Properties | Shows your project's current distinct count of event properties sent to Amplitude. |
| User Properties | Shows your project's current distinct count of user properties being sent to Amplitude. |
| Events This Month | Shows the number of events your project has sent to Amplitude this month. |
| Events Last Month | Shows the number of events your project sent to Amplitude last month.  |

{{partial:admonition type='note'}}
Only admins and managers can edit project settings. All project information except the API key and secret key can be viewed by viewers and members.
{{/partial:admonition}}

You can add, remove, and edit [annotations](https://help.amplitude.com/hc/en-us/articles/236032527#add-annotation) easily from the *Annotations* tab.

With [Insights](https://help.amplitude.com/hc/en-us/articles/115001764612), you can bulk manage your automatic and custom monitors from the *Insights* tab.

## Delete a project

To delete a project, follow these steps:

1. Navigate to *Settings > Projects*.
2. From the list, select the project you want to delete.
3. Click *Delete*.

## Change your name or URL, or delete your organization

If you are a Growth or Enterprise customer, reach out to your CSM to help you change your organization's name or URL, or to help delete your organization. 

If you are unsure who your CSM is or do not have one, follow the steps below to request a change:

1. To request a URL or name change, go to [support.amplitude.com](https://support.amplitude.com/), select *Service Task* as the request type, and then *Org url/name change* as the service task. 
You must be an admin of your organization in order to submit this request. If there are no admins with your organization, include that fact in the *Why are you making this change?* section of the form.

2. To request to delete an org, go to [support.amplitude.com](https://support.amplitude.com/), select *Service Task* as the request type, and then *Org Deletion* as the service task.
If there are no admins with your organization, include that fact in the *Why are you deleting your Amplitude organization?* section of the form.

3. For each request, you must use the email address that exists on the *Team Members* page.
4. Click *Submit* once you complete the form. You will receive a copy of the submitted request by email.
5. When the request has been processed, you will receive a confirmation email.

{{partial:admonition type='note'}}
The Amplitude Support team responds to these requests the first Monday of each month, or the following Tuesday if Monday is an observed holiday. All requests sent before 9 a.m. Pacific Time on the first Monday of each month will be included in the batch. 
{{/partial:admonition}}

## How to rotate your project's API key or secret key

Amplitude does not support rotating API keys due to the inherent public nature of API keys. Changing this key can affect ingestion and data loss if misused. However, with Admin approval we are able to re-generate your project's secret key on the backend. If you would like to submit a request to change the secret key, submit a support request [here](https://help.amplitude.com/hc/en-us/requests/new) with the following information: 

* The name and ID of the project in question.
* Three suggested times within the next three days for Amplitude to make the change. An agent will coordinate the exact time with you.
* Approval from an admin of the project. If you are not an admin, you must copy an admin in the request.