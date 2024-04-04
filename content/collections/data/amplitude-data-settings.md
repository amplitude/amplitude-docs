---
title: "Configure and manage your Amplitude Data settings"
source: "https://help.amplitude.com/hc/en-us/articles/5078848559259-Configure-and-manage-your-Amplitude-Data-settings"
id: 9fbd24d0-c90c-497c-8cca-5b345f1058d6
---

#### This article will help you:

* Understand and manage all settings related to your Amplitude Data projects

In the Settings page, you will:

* Name your project, and specify the naming conventions you’ll use for events and properties
* Specify whether you’ll require team reviews for all changes to main
* Set the Amplitude projects for your environments
* Add integrations
* Generate API tokens
* Delete your Amplitude Data project

These settings and features are broken out into five different tabs: General; Environments; Integrations; API Tokens; and Schema Settings, each of which is described below.

**![data_settings.png](/output/img/data/data-settings-png.png)**

**NOTE:** Make sure you’ve configured your settings **before** setting up your first Amplitude Data project.

## Roles and permissions in Amplitude Data

| Role | Permissions |
| --- | --- |
| Admin | Configure workspace settings, approve tracking plan changes, and modify the tracking plan |
| Manager | Approve tracking plan changes and modify the tracking plan |
| Member | Modify the tracking plan for approval |
| Viewer | View the tracking plan and comment |

{{partial:admonition type="info" title=""}}
If the *Require team reviews to make changes to the main branch* option is disabled in the project settings, members will have the ability to modify the tracking plan; however, receiving approval would no longer be required. All other permissions remain the same.
{{/partial:admonition}}

## The General tab

The General tab is where you’ll give your project a **name**, set the event and property **naming conventions**, set **team review requirements** for making changes on main, and **delete your project**. It’s also where you’ll find a **public link** to a read-only version of your tracking plan, so you can easily and safely share it with stakeholders across your organization.

![general.png](/output/img/data/general-png.png)

### Naming conventions

Amplitude Data requires you to set a consistent naming convention for events and properties. Without one, your tracking plan can become much harder to read and manage, as there could be multiple events or properties using the same name with different capitalization rules.

Specify a custom naming convention, or choose from the following:

* lower case
* Sentence case
* Title Case
* CamelCase
* lowerCamelCase
* snake\_case

### Team reviews

For larger teams and organizations, it’s good practice to require team reviews for any changes made to main. When this option is selected, any changes to your tracking plan must be made in a branch other than main. You can specify the number of reviewers required for approval—up to seven—here as well.

### Public link to your tracking plan

If you ever want to share your tracking plan, you can do so using the public link provided here on the *General* tab. Just copy it to your clipboard and paste it into an email or Slack message. Stakeholders can read it, but they can’t make any changes themselves.

You can also enable or disable the public link, which will change the availability for the selected project. Just click *Create Public Link* or *Delete Public Link*.

## The Integrations tab

You can integrate Amplitude Data with your existing tools to streamline your analytics workflow. To integrate a platform, simply click *Connect* or *Add* next to its name.

![integrations.png](/output/img/data/integrations-png.png)

## The API Tokens tab

Use API tokens to authenticate to Amplitude Data using credentials other than your email address and a password. Tokens authorize applications to enjoy the same roles and permissions granted to you when you log in personally.

To create an API token, click *Create Token*. Amplitude Data will generate the token and display it in a modal window.

![create_token.png](/output/img/data/create-token-png.png)

Be sure to click *Copy to clipboard* now, as you won’t be able to retrieve the token later.

## The Schema Settings tab

Sometimes, Amplitude Data might receive data from your app that it doesn't know what to do with. This is usually the result of a **schema violation,**and it means the received data is not accounted for in your schema. This is usually the result of failing to plan for that particular data type or value when you first set up your schema.

You can tell Amplitude how to handle these situations by configuring your schema settings.

![schema.png](/output/img/data/schema-png.png)

For any unplanned events, event properties, event property types, user properties, or user property types, you can tell Amplitude Data to either mark them as **unexpected**, or to **reject** them outright. Amplitude Data will collect any events or properties marked as unexpected and send a notification to everyone subscribed to this schema. If you choose to reject unexpected data, however, Amplitude Data will not collect or store the rejected data. Subscribers will still receive a notification.

Click *Save* to implement any changes you make to your schema settings.
