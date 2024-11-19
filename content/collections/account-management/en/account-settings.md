---
id: aa69523a-2f70-40bb-b904-f478b24d6587
blueprint: account-management
title: 'The Settings page'
source: 'https://help.amplitude.com/hc/en-us/articles/235649848-The-Settings-page'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1730929932
this_article_will_help_you:
  - 'Manage organizational and project-level settings'
---
Any user within your organization can access the Settings page, but only organization admins and managers can edit it. Here, you can navigate between organization-level settings, your own personal Amplitude settings, and more.

Click the gear icon to open Settings. 

## Organizational settings

The organizational settings area is where you can find everything you need to manage settings at the organization and project level. The default view is the General page. This displays your organization's name, org ID, org URL, and plan type. 

Within the Plans & Billing section, you’ll find more detailed information about your Amplitude usage: the contract start and end date, your organization's event or MTU limit, events or MTUs used by your organization this month and last month, as well as other key pieces of usage information. This helps you track your usage from within Amplitude itself.

Users on Plus plans can also manage billing from here.

The organizational settings also include tools to help you:

* [Create organizations and projects](/docs/admin/account-management/manage-orgs-projects)
* [Manage users](/docs/admin/account-management/manage-users) and assign permissions
* Manage settings for your [identity provider, SSO, and provisioning](/docs/admin/single-sign-on/sso) (if you're an admin)
* [Control access to content](/docs/analytics/share-external) your organization generates in Amplitude (if you're an admin)
* View the [usage reports](/docs/admin/billing-use/usage-reports) dashboard
* Manage [user privacy notifications](/docs/admin/account-management/manage-notifications) (if you're an admin)

For more information on each of these tasks, just follow the links to the relevant Help Center articles.

### Session Replay settings

The organizational settings also allow admins and managers to view or modify [Session Replay](/docs/session-replay) settings.

The session replay settings area displays your total session replay capture plan allowance, current usage, and a list of projects showing sample rate, instrumentation status, and whether a specific project is capturing replays.

Click *View Usage Over Time* in the session capture card to review usage specific to your plan.

From the project list, you can:

- View a list of projects that are capturing replays, along with their sample rate and current instrumentation status.
- Toggle *Session Capture* on or off for a specific project. Turning off session capture for a specific project only applies to future sessions.

    Click a project name to modify the sample rate, or percentage of user sessions captured. Modifying the sample rate in settings overrides the existing SDK implementation's sample rate, and may take several minutes to take effect.
    
    ![session_replay_settings.png](/docs/output/img/account-management/session_replay_settings.png)

    From the sampling module, click *View User Sessions Chart* to view an estimate of the total sessions captured on a monthly basis. 

- Click *+ Select Project* from the bottom of the list to add a project. Projects can't be removed once added.

    By default, the project's session capture is set to `on`, and its sample rate matches the rate set in your SDK implementation. Adding a project with the SDK doesn't automatically add it to the list of projects with Session Replay enabled. If you want to manage Session Replay settings from the Settings page, add it to the list manually with the **Add Project** picker.
     
    For new organizations that implement session replay, replay capture is set to `on`, and the sample rate is set to `1` for testing. Reduce the sample rate before moving to production. You can modify these settings later if you need to do so.

{{partial:admonition type="note" heading=""}}
Replays are captured only if instrumentation is accurate and complete, and a sample rate is set. Be sure to use the most recent [SDK](/docs/sdks) for best results.
{{/partial:admonition}}

[Learn how to manage your Session Replay privacy settings here](https://amplitude.com/docs/session-replay/manage-privacy-settings-for-session-replay).

## Personal settings

The personal settings area is where you can manage your own profile, site settings, and notifications.

### Profile

Your profile page displays information specific to you. You can also set up and manage your Slack integration here, as well as set certain preferences.

The Profile panel shows your organization, role, email, name, and password associated with your Amplitude account. Click the pencil to change your display name or update your password. 

![Settings_2.png](/docs/output/img/account-management/settings-2-png.png)

The Site Settings panel includes a series of toggles you can use to customize your Amplitude experience. They're mostly self-explanatory.

![Settings_3.png](/docs/output/img/account-management/settings-3-png.png)

The "Always Remove Leading Spaces from Export” option tells Amplitude to delete any empty spaces from the beginnings of cells in an export .CSV. With the default setting, these spaces remain in place, which can result in messy data, or more significant data errors. This setting works for positive values, but not for values that start with or are `=` , `+`, `-`, or `@`

If you do keep this option disabled, you should remove these spaces later in Excel or Google Sheets, using the Text to Columns feature.

Please see our Help Center article about [how to manage your Slack integration in Amplitude](/docs/analytics/integrate-slack) for more details.

### Notifications

In the Notifications area, you can to change your Slack and email notification settings for Amplitude's [collaboration features](/docs/analytics/charts/chart-basics). Here, you can enable or disable email notifications relating to you, your organization, or your spaces.

![new_notifications.png](/docs/output/img/account-management/new-notifications-png.png)

### Year in review

The Year in Review provides a high-level summary of your activity during the selected year.  It summarizes your work based on number of active days, queries you have run, and charts and dashboards you've created. It also includes a quick summary of the top followers of your content, as well as the top authors of content you followed.

![settings_4.png](/docs/output/img/account-management/settings-4-png.png)

## Set Amplitude to light or dark mode

The **theme preferences** settings allow you to change the way you view Amplitude. Use the Settings page to access these settings. From there, choose between *Light Mode*, *Dark Mode*, or to automatically match your system's settings.

![theme mode.png](/docs/output/img/account-management/theme-mode-png.png)