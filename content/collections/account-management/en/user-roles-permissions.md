---
id: 9dc3e28c-3335-4026-a3d0-6c5dd011b2bc
blueprint: account-management
title: 'User roles and permissions in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/229672228-User-roles-and-permissions-in-Amplitude'
this_article_will_help_you:
  - "Understand the different permissions associated with Amplitude's user roles"
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720214133
---
User permissions define the level of Amplitude access a user in your organization has. Amplitude bases permissions on a user's role, though [project-level permissions](/docs/admin/account-management/manage-users) and [permission groups](/docs/admin/account-management/manage-permission-groups) are available for Enterprise customers who need more targeted security controls. For more information about permissions in Amplitude Experiment, go to [App-level user permissions](/docs/admin/account-management/user-roles-permissions).

{{partial:admonition type='note'}}
You may also find [this course](https://academy.amplitude.com/amplitude-analytics-admin-essentials) on administering Amplitude helpful.
{{/partial:admonition}}

The **admin** sets user permissions. The admin is the first user of any Amplitude organization, and each organization must have at least one admin. Any admin can designate other users as admins. When you invite new users to an organization, they're assigned the **viewer** role by default.

## User roles and permissions in Amplitude

By default, user permissions in Amplitude exist at the **organization** level. With the default configuration, a user in an organization has the same level of access to all projects within that organization.

Enterprise and Growth customers can enable project-level permissions, which allow users to have different roles for different projects within the same organization. For example, a user could be a Manager in one project but only a Viewer in another. Go to [Project-level permissions](/docs/admin/account-management/manage-users#project-level-permissions) for more information.

Go to [Manage users, organizations, and projects](/docs/admin/account-management/manage-users) to learn more about creating and managing organizations and projects.


### Viewer

The Viewer role is ideal for third-party collaborators or users who need to view content without creating items discoverable to the entire organization.

**Viewer permissions:**

* Create, edit, and delete undiscoverable dashboards, charts, and behavioral cohorts (Viewers must own the content to edit and delete it)
* Co-own undiscoverable content created by another user
* View [project settings](/docs/admin/account-management/manage-orgs-projects)
* View data sources and data destinations
* Connect their account to [Slack](/docs/analytics/integrate-slack)
* Edit their own profile (name, title, team, password)
* Edit their own [email subscriptions](/docs/analytics/dashboard-create)
* Set and subscribe to custom [monitors](/docs/analytics/insights)
* Share content they create with others
* View Guides and Surveys
* Create and view [Heatmaps](/docs/session-replay/heatmaps)
* Open project details from notification alerts

**Viewer restrictions:**

* Can't save discoverable content such as charts, dashboards, notebooks, cohorts, or saved segments
* Can't create shareable links
* Can't export data to third-party integration partners
* Can't create a guide or survey

### Member

The Member role is suited for most users within an organization who need to create and manage discoverable content.

**Member permissions:**

* All Viewer-level permissions
* Create discoverable dashboards, charts, behavioral cohorts, and saved segments
* Create [custom events](/docs/data/custom-events)
* Create and manage [team spaces](/docs/analytics/collaborate-with-spaces), including adding content, inviting users to spaces, and archiving spaces
* Edit [releases](/docs/analytics/releases)
* Label events with [Visual Labeling](/docs/data/visual-labeling)
* Edit unpublished guides or surveys
* Create and manage experiment notification alerts

**Member restrictions:**

* Can't search for undiscoverable content
* Can't add or remove users from the organization (can only invite users to team spaces)
* Can't edit project settings
 
### Manager

The Manager role is designed for users who require comprehensive access to content and the ability to modify project settings.

**Manager permissions:**

* All Member-level permissions
* Add and remove users from the organization
* Edit user roles (permissions)
* Create, edit, and delete [annotations](/docs/analytics/microscope)
* View API keys and secret keys in project settings
* Remove and edit saved segments
* Create new projects
* Edit project settings
* Mark content as "Official Content"
* Add and edit data sources and data destinations
* Transfer ownership of content they don't own
* Create, modify, and delete derived properties
* Full access to Guides and Surveys

### Admin

The Admin role is the highest-level role, granting extensive control over the organization and its settings. Amplitude recommends limiting the number of users in an organization who are Admins. Only existing administrators can grant or revoke the Admin role.

**Admin permissions:**

* All Manager-level permissions
* Remove shared chart and dashboard links
* Change sampling settings
* Create [permission groups](/docs/admin/account-management/manage-permission-groups)
* Delete the organization or change its name and URL (requires submission to Amplitude Support)
* Change organization Admins
* Full access to Guides and Surveys

## General restrictions for all users

Regardless of role, all users have the following restrictions:

* Can't change the full name of other users
* Can't change or reset passwords for other users
* Can't change their own role within the organization
* Can't remove themselves from the organization (an admin or manager must perform this action)
* Can't permanently delete another user's content (only content owners can delete their content after archiving)
