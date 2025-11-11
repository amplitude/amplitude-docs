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

- Name your project, and specify the naming conventions you use for events and properties
- Specify whether you require team reviews for all changes to main
- Set the Amplitude projects for your environments
- Add integrations
- Generate API tokens
- Delete your Amplitude Data project

Find these settings and features on five different tabs: General, Environments, Integrations, API Tokens, and Schema Settings. This article describes each tab below.

{{partial:admonition type="note" heading=""}}
Make sure you’ve configured your settings **before** setting up your first Amplitude Data project.
{{/partial:admonition}}

## Roles and permissions in Amplitude Data

{{partial:admonition type="note" heading="Role-based Access Controls (RBAC)"}}
For Enterprise organizations with Role-based Access Controls (RBAC) enabled, review the available [Data Roles and Permissions](/docs/admin/account-management/role-based-access-controls-rbac#rbac-permission-reference). 
{{/partial:admonition}}

| Role    | Permissions                                                                               |
| ------- | ----------------------------------------------------------------------------------------- |
| Admin   | Configure workspace settings, approve tracking plan changes, and modify the tracking plan |
| Manager | Approve tracking plan changes and modify the tracking plan                                |
| Member  | Modify the tracking plan for approval                                                     |
| Viewer  | View the tracking plan and comment                                                        |

You may also restrict data management access while keeping permissions the same for other areas of Amplitude. Review [The Permissions Tab](#the-permissions-tab) for more details.

{{partial:admonition type="info" heading=""}}
If you disable the **Require team reviews to make changes to the main branch** option in the project settings, members can modify the tracking plan; however, receiving approval would no longer be required. All other permissions remain the same.

{{/partial:admonition}}

## General

The General tab is where you give your project a **name**, set the event and property **naming conventions**, set **team review requirements** for making changes on main, and **delete your project**. It's also where you find a **public link** to a read-only version of your tracking plan, so you can share it with stakeholders across your organization.

### Naming conventions

Amplitude Data requires you to set a consistent naming convention for events and properties. Without one, your tracking plan becomes much harder to read and manage, as there could be multiple events or properties using the same name with different capitalization rules.

Specify a custom naming convention, or choose from the following:

- lower case
- Sentence case
- Title Case
- CamelCase
- lowerCamelCase
- snake_case

### Team reviews

For larger teams and organizations, it's good practice to require team reviews for any changes made to main. With this option, make any changes to your tracking plan in a branch other than main. You can specify the number of reviewers required for approval—up to seven—here as well.

{{partial:admonition type='note'}}
To find out if this feature is available on your Amplitude plan, [visit the pricing page](https://amplitude.com/pricing).
{{/partial:admonition}}

### Public link to your tracking plan

If you ever want to share your tracking plan, you can do so using the public link provided here on the **General** tab. Just copy it to your clipboard and paste it into an email or Slack message. Stakeholders can read it, but they can’t make any changes themselves.

You can also enable or disable the public link, which changes the availability for the selected project. Click **Create Public Link** or **Delete Public Link**.

## Integrations

You can integrate Amplitude Data with your existing tools to streamline your analytics workflow. To integrate a platform, simply click **Connect** or **Add** next to its name.

## API Tokens

Use API tokens to authenticate to Amplitude Data using credentials other than your email address and a password. Tokens authorize applications to enjoy the same roles and permissions you have when you log in personally.

To create an API token, click **Create Token**. Amplitude Data generates the token and displays it in a modal window.

Click **Copy to clipboard** now, as you can't retrieve the token later.

## Schema Settings

Sometimes, Amplitude Data might receive data from your app that it doesn't know what to do with. This is usually the result of a schema violation, and it means your schema doesn't account for the received data. This is usually the result of failing to plan for that particular data type or value when you first set up your schema.

You can tell Amplitude how to handle these situations by configuring your schema settings.

For any unplanned events, event properties, event property types, user properties, or user property types, you can tell Amplitude Data to either mark them as **unexpected**, or to **reject** them outright. Amplitude Data ingests any unexpected events or properties and sends a notification to everyone subscribed to this schema. If you choose to reject unexpected data, however, Amplitude Data doesn't ingest or store the rejected data. Subscribers still receive a notification.

Click **Save** to implement any changes you make to your schema settings.

## The Permissions tab

With data permissions restrictions, you can limit who can perform Data Management functions. For example, you might want most of your users to have the Member role so they can create dashboards and charts, but limit custom event creation and other data management features to managers or administrators.

In the permissions tab, you can add additional restrictions for selected roles, limiting data management access while keeping other permissions unchanged for those roles.

Under Restrict access in Amplitude Data, specify from the following options to restrict permissions to the viewer level on a per-project basis:

- Use Default Restrictions
- Restrict Members
- Restrict Members and Managers

Then, click **Save**.

Permission restrictions are available for Enterprise customers only. Only administrators can access the Permissions tab.

### Copy to other projects

Click **Copy to Other Projects** to apply the current permission restriction settings to another project.

## Autocapture 

The Autocapture settings in Amplitude Data let you change the configuration of the Analytics Browser SDK directly from within Amplitude, enabling you to make changes without code changes or releases. These settings merge with any configuration you've defined locally in your SDK initialization code on your website.

### Availability

Autocapture settings are enabled on projects that use version 2.10.0 or higher of the [Amplitude Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) where the SDK has `fetchRemoteConfig` enabled.

To disable remote configuration, set `fetchRemoteConfig` to `false`. Disabling `fetchRemoteConfig` doesn't disable the remote configuration options in Data Settings. 

{{partial:admonition type="note" heading="Remote configuration by default"}}
SDK version 2.16.1 and higher enable `fetchRemoteConfig` by default.
{{/partial:admonition}}

### How it works

When the SDK initializes with `fetchRemoteConfig` enabled, it retrieves configuration settings from Amplitude's servers using the project's API key. These remote settings merge with any local configuration you define on your site. After merging, the SDK completes its initialization process along with any plugins using this combined configuration. Remote configuration doesn't impact the load time of pages on your site, but may impact SDK initialization time.

{{partial:admonition type="note" heading="Configuration timeout"}}
In the event it takes the configuration longer than 5 seconds to load from Amplitude's servers, the SDK falls back to the local configuration set during initialization.
{{/partial:admonition}}

On the Settings Page, each configuration category offers three options:

* **Default**: Keeps the local configuration in the SDK as-is. Settings in the UI don't override it.  
* **On**: Overrides the local configuration and sets the category to true. All settings within the category (for example, Element Interactions) follow the configuration in the UI.  
* **Off**: Overrides the local configuration and sets the category to false.

{{partial:admonition type="note" heading="Disabling Session Tracking"}}
If you use Session Replay, ensure your Session Replay SDK version is 1.12.1 or above.
{{/partial:admonition}}

Changes made through the UI take effect after 10 minutes.

### Element interactions

When you enable Element Interactions, several options appear:

| Option                 | Purpose                                                                                                                                                                                                             |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CSS Selector Allowlist | This list contains selectors for elements that users interact with. For example, links and form elements. If you have custom, or non-standard elements, that your users interact with, specify them here. |
| Action Click Allowlist | Amplitude tracks the elements in this list only when a user clicks them, and they result in a page or DOM change.                                                                                               |
| Page URL Allowlist     | Specify URLs or URL patterns (using glob or regular expression) on which Amplitude tracks element click and change events.                                                                                          |
| Data Attribute Prefix  | Specify a prefix for data attributes, for example `data-amp-track`. Amplitude saves the value of these attributes as event properties.                                                                              |
 
{{partial:admonition type="tip" heading="Lower event volume"}}
These options can help you control event volume. By ignoring dead clicks, Action Click Allowlist is the most efficient method to reduce volume, while still tracking relevant interactions.
{{/partial:admonition}}