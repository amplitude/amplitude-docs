---
id: 9fbd24d0-c90c-497c-8cca-5b345f1058d6
blueprint: data
title: "Manage your Amplitude Data settings"
source: "https://help.amplitude.com/hc/en-us/articles/5078848559259-Configure-and-manage-your-Amplitude-Data-settings"
this_article_will_help_you:
  - "Understand and manage all settings related to your Amplitude Data projects"
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1725397992
---

In the Settings page, you can:

- Name your project, and specify the naming conventions you’ll use for events and properties
- Specify whether you’ll require team reviews for all changes to main
- Set the Amplitude projects for your environments
- Add integrations
- Generate API tokens
- Delete your Amplitude Data project

Find these settings and features on five different tabs: General; Environments; Integrations; API Tokens; and Schema Settings. This article describes each tab below.

{{partial:admonition type="note" heading=""}}
Make sure you’ve configured your settings **before** setting up your first Amplitude Data project.
{{/partial:admonition}}

## Roles and permissions in Amplitude Data

| Role    | Permissions                                                                               |
| ------- | ----------------------------------------------------------------------------------------- |
| Admin   | Configure workspace settings, approve tracking plan changes, and modify the tracking plan |
| Manager | Approve tracking plan changes and modify the tracking plan                                |
| Member  | Modify the tracking plan for approval                                                     |
| Viewer  | View the tracking plan and comment                                                        |

You may also restrict data management access while keeping permissions the same for other areas of Amplitude. See [The Permissions Tab](#the-permissions-tab) for more details.

{{partial:admonition type="info" heading=""}}
If you disable the _Require team reviews to make changes to the main branch_ option in the project settings, members can modify the tracking plan; however, receiving approval would no longer be required. All other permissions remain the same.

{{/partial:admonition}}

## The General tab

The General tab is where you’ll give your project a **name**, set the event and property **naming conventions**, set **team review requirements** for making changes on main, and **delete your project**. It’s also where you’ll find a **public link** to a read-only version of your tracking plan, so you can easily and safely share it with stakeholders across your organization.

### Naming conventions

Amplitude Data requires you to set a consistent naming convention for events and properties. Without one, your tracking plan can become much harder to read and manage, as there could be multiple events or properties using the same name with different capitalization rules.

Specify a custom naming convention, or choose from the following:

- lower case
- Sentence case
- Title Case
- CamelCase
- lowerCamelCase
- snake_case

### Team reviews

For larger teams and organizations, it’s good practice to require team reviews for any changes made to main. With this option, you must make any changes to your tracking plan in a branch other than main. You can specify the number of reviewers required for approval—up to seven—here as well.

{{partial:admonition type='note'}}
To find out if this feature is available on your Amplitude plan, [visit the pricing page](https://amplitude.com/pricing).
{{/partial:admonition}}

### Public link to your tracking plan

If you ever want to share your tracking plan, you can do so using the public link provided here on the _General_ tab. Just copy it to your clipboard and paste it into an email or Slack message. Stakeholders can read it, but they can’t make any changes themselves.

You can also enable or disable the public link, which changes the availability for the selected project. Just click _Create Public Link_ or _Delete Public Link_.

## The Integrations tab

You can integrate Amplitude Data with your existing tools to streamline your analytics workflow. To integrate a platform, simply click _Connect_ or _Add_ next to its name.

## The API Tokens tab

Use API tokens to authenticate to Amplitude Data using credentials other than your email address and a password. Tokens authorize applications to enjoy the same roles and permissions granted to you when you log in personally.

To create an API token, click _Create Token_. Amplitude Data generates the token and display it in a modal window.

Be sure to click _Copy to clipboard_ now, as you won’t be able to retrieve the token later.

## The Schema Settings tab

Sometimes, Amplitude Data might receive data from your app that it doesn't know what to do with. This is usually the result of a **schema violation,**and it means the received data isn't accounted for in your schema. This is usually the result of failing to plan for that particular data type or value when you first set up your schema.

You can tell Amplitude how to handle these situations by configuring your schema settings.

For any unplanned events, event properties, event property types, user properties, or user property types, you can tell Amplitude Data to either mark them as **unexpected**, or to **reject** them outright. Amplitude Data ingests any events or properties marked as unexpected and send a notification to everyone subscribed to this schema. If you choose to reject unexpected data, however, Amplitude Data doesn't ingest or store the rejected data. Subscribers still receive a notification.

Click _Save_ to implement any changes you make to your schema settings.

## The Permissions tab

With data permissions restrictions, you can limit who can perform Data Management functions. For example, you might want most of your users to have the Member role so they can create dashboards and charts, but limit custom event creation and other data management features to managers or administrators.

In the permissions tab, you can add additional restrictions for selected roles, limiting data management access while keeping other permissions unchanged for those roles.

Under Restrict access in Amplitude Data, specify from the following options to restrict permissions to the viewer level on a per-project basis:

- Use Default Restrictions
- Restrict Members
- Restrict Members and Managers

Then, click _Save_.

Permission restrictions are available for Enterprise customers only and the Permissions tab is only visible to administrators.

### Copy to other projects

Click _Copy to Other Projects_ to apply the current permission restriction settings to another project.
