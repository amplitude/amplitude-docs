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
updated_at: 1715362928
---
User permissions define the level of Amplitude access a user in your organization will have. Usually, permissions are based on a user's role, though [project-level permissions](/docs/admin/account-management/manage-users) and [permission groups](/docs/admin/account-management/manage-permission-groups) are available for Enterprise customers who need the ability to better target levels of security.

{{partial:admonition type='note'}}
You may also find [this course](https://academy.amplitude.com/amplitude-analytics-admin-essentials) on administering Amplitude helpful.
{{/partial:admonition}}

The person who sets user permissions is the **admin**. The admin is the first user of any Amplitude organization, and each organization must have at least one admin (any admin can designate other users as admins as well). When new users are first invited to an organization, they are assigned the **viewer** role by default.

In Amplitude, user permissions exist at the **organization** level. Once assigned a permission level, a user in an organization will then have the same level of access to *all* projects within that organization. 

[Learn more about how to create and manage organizations and projects](/docs/admin/account-management/manage-users).

## User roles and permissions in Amplitude


### Viewer
Recommended role for third parties, if you do not want them creating content that the rest of the organization can find.

* Create, edit, and delete undiscoverable dashboards, charts, and behavioral cohorts. Viewers must be the owner of the content to edit and delete it.
* Co-own undiscoverable content made by another user.
* View [project settings](https://help.amplitude.com/hc/en-us/articles/360058073772#01H8M5S1432YFZ868JDCB51B52)
* View data sources and data destinations
* Connect user account to [Slack](https://help.amplitude.com/hc/en-us/articles/227613388)
* Edit their own profile (name, title, team, password)
* Edit their own [email subscriptions](https://help.amplitude.com/hc/en-us/articles/229505188#h_01EF0JV5AH4SYEJMNMYNVYMR4D)
* Set custom [monitors](https://help.amplitude.com/hc/en-us/articles/115001764612) and subscribe to them
* Share content they create with others

Note that viewers:
* *Cannot* create anything that is discoverable, including saved segments
* *Cannot* create shareable links
* *Cannot* export data to third-party integration partners

### Member
Recommended for the majority of Amplitude users in your organization. Members have all viewer-level permissions, plus:

* Create discoverable dashboards, charts, behavioral cohorts, and saved segments
* Mark content as "Official Content"
* Create [custom events](https://help.amplitude.com/hc/en-us/articles/16805886899483-Custom-events)
* Create [team spaces](https://help.amplitude.com/hc/en-us/articles/360016524911)
* Edit [releases](https://help.amplitude.com/hc/en-us/articles/360017800371)

Note that members:

* *Cannot* search for content that is undiscoverable.
 
### Manager
Recommended for users who need access to all content created within Amplitude (does not include undiscoverable dashboards and charts) and ability to make changes to project settings. Managers have all member-level permissions, plus:

* Add and remove users
* Edit user role (permissions)
* Create, edit, and delete [annotations](/docs/analytics/microscope)
* Visibility of API keys and secret keys in project settings
* Remove and edit saved segments
* Create new projects
* Edit project settings
* Add and edit data sources and data destinations
* Transfer ownership of content they don’t own

### Admin
The highest-level permissions set in an organization. We recommend limiting the number of users in an organization who are Admins. The Admin role can only be granted or revoked by existing admins. Admins have all manager-level permissions, plus:

* Remove shared chart and dashboard links
* Change sampling settings
* Create [permission groups](/docs/admin/account-management/manage-permission-groups)
* Delete organization or change organization name and URL (the Admin must submit this request to the Amplitude Support team)
* Change org Admins

### All users
* *Cannot* change full name of other users
* *Cannot* change or reset password for other users
* *Cannot* change their own role in the organization
* *Cannot* remove themselves from the organization. To do so, request an admin or manager remove you from the organization.
* *Cannot* permanently delete another user’s content. Admins can archive users content but only owners can delete their content after archiving.