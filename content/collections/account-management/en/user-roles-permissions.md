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
User permissions define the level of Amplitude access a user in your organization has. Usually, Amplitude bases permissions on a user's role, though [project-level permissions](/docs/admin/account-management/manage-users) and [permission groups](/docs/admin/account-management/manage-permission-groups) are available for Enterprise customers who need the ability to better target levels of security. For more information about permissions in Amplitude Experiment, see [App-level user permissions](/docs/feature-experiment/app-level-permissions).

{{partial:admonition type='note'}}
You may also find [this course](https://academy.amplitude.com/amplitude-analytics-admin-essentials) on administering Amplitude helpful.
{{/partial:admonition}}

The person who sets user permissions is the **admin**. The admin is the first user of any Amplitude organization, and each organization must have at least one admin (any admin can designate other users as admins as well). When new users are first invited to an organization, they're assigned the **viewer** role by default.

In Amplitude, user permissions exist at the **organization** level. Once assigned a permission level, a user in an organization has the same level of access to *all* projects within that organization. 

[Learn more about how to create and manage organizations and projects](/docs/admin/account-management/manage-users).

## User roles and permissions in Amplitude


### Viewer
Recommended role for third parties, if you don't want them creating content that the rest of the organization can find.

* Create, edit, and delete undiscoverable dashboards, charts, and behavioral cohorts. Viewers must be the owner of the content to edit and delete it.
* Co-own undiscoverable content made by another user.
* View [project settings](/docs/admin/account-management/manage-orgs-projects)
* View data sources and data destinations
* Connect user account to [Slack](/docs/analytics/integrate-slack)
* Edit their own profile (name, title, team, password)
* Edit their own [email subscriptions](/docs/analytics/dashboard-create)
* Set custom [monitors](/docs/analytics/insights) and subscribe to them
* Share content they create with others

Note that viewers:
* *Can't* create anything that's discoverable, including saved segments
* *Can't* create shareable links
* *Can't* export data to third-party integration partners

### Member

Recommended for the majority of Amplitude users in your organization. Members have all viewer-level permissions, plus:

* Create discoverable dashboards, charts, behavioral cohorts, and saved segments
* Create [custom events](https://help.amplitude.com/hc/en-us/articles/16805886899483-Custom-events)
* Create [team spaces](https://help.amplitude.com/hc/en-us/articles/360016524911)
* Edit [releases](https://help.amplitude.com/hc/en-us/articles/360017800371)

{{partial:admonition type="note" heading=""}}
Members can't search for undiscoverable content.
{{/partial:admonition}}
 
### Manager

Recommended for users who need access to all content created within Amplitude (doesn't include undiscoverable dashboards and charts) and ability to make changes to project settings. Managers have all member-level permissions, plus:

* Add and remove users
* Edit user role (permissions)
* Create, edit, and delete [annotations](/docs/analytics/microscope)
* Visibility of API keys and secret keys in project settings
* Remove and edit saved segments
* Create new projects
* Edit project settings
* Mark content as "Official Content"
* Add and edit data sources and data destinations
* Transfer ownership of content they don’t own

### Admin
The highest-level permissions set in an organization. Amplitude recommends limiting the number of users in an organization who are Admins. Only existing administrators can grant or revoke the Admin role. Admins have all manager-level permissions, plus:

* Remove shared chart and dashboard links
* Change sampling settings
* Create [permission groups](/docs/admin/account-management/manage-permission-groups)
* Delete organization or change organization name and URL (the Admin must submit this request to the Amplitude Support team)
* Change org Admins

### All users
* *Can't* change full name of other users
* *Can't* change or reset password for other users
* *Can't* change their own role in the organization
* *Can't* remove themselves from the organization. To do so, request an admin or manager remove you from the organization.
* *Can't* permanently delete another user’s content. Admins can archive users content but only owners can delete their content after archiving.