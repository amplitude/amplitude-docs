---
id: 6b49a561-a125-4eb2-a1e7-73c37350265e
blueprint: account-management
title: 'Manage users and permissions'
source: 'https://help.amplitude.com/hc/en-us/articles/360058531591-Manage-users-and-permissions'
this_article_will_help_you:
  - 'Enable users to access Amplitude projects in your organization, and manage how they do it'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715294465
---
Before a user can gain access to any Amplitude projects, you will have to add them to your Amplitude organization. You should do this immediately after creating an organization. Additionally, you’ll probably need to add new team members on a case-by-case basis as your organization changes and grows.

## Manage new users and user access

User management is done from the Members page, which you can reach by navigating to *Settings > Organization settings > Members & Groups*.

At the top of the page, you’ll find an overview of users for your organization: the number of total users, joined users, pending users, and users requesting access. 

This section will review some common user management tasks.

### Invite new users

Only admins and managers can add or remove users. 

To invite new users, follow these steps:

1. From the Members page, click *Invite New Users.* The *Invite New Users* modal will appear.
2. Type the new user’s email address into the text box. You can add more than one email address at a time. Press the Enter key after each email address you type.
3. For each email you entered, select the appropriate team. Then click *Next*.
4. If you are an Enterprise customer with Groups enabled, choose the group or groups this user will belong to from the *Select Groups* drop-down menu. The user will then inherit all the project permissions of those groups. Then click *Next*.
5. Select the individual projects the user will have access to. For each project, choose the appropriate role from the drop-down menu on the right. If you’ve assigned the user to a group in the previous step, you cannot downgrade those permissions here. Then click *Next*.
6. Specify the user’s default project, and select the appropriate team spaces for them. The default project sets the user's dropdown menus to that project when they first log into Amplitude. The team spaces will appear under *Team Spaces* in the left-hand rail when the user logs into Amplitude. Then click *Next*.
7. Review your invitation. If it’s ready to go, click *Send*.

### Allow team members to request access

In addition to inviting users to the organization, you can also allow team members to request access. They’ll be able to request it from the login page, an action that will prompt admin approval.

To turn this setting on, navigate to *Advanced Settings* and switch the *Allow Team Members to Request Access* toggle to Enabled.

### Change an Amplitude email address

At this time, user email address cannot be changed because it is a unique identifier for Amplitude user accounts. To work around this, you can follow these steps:

1. Invite your new email address to your Amplitude organization.
2. Create your new Amplitude account with your new email address.
3. Log in with your existing email address and [transfer ownership](#01H8M96ZXZ1REHKB3Z16QN389D) of all content to your new email address.
4. Remove your old email address from your Amplitude org.

{{partial:admonition type='note'}}
Repeat the process for other users who also need to change their email address.
{{/partial:admonition}}

## Change user roles and permissions

All current users will be visible in the *Joined Users* view, while *Pending Users* shows those who still have an outstanding invite. An admin or manager can adjust any user's organization role or [permissions](/docs/admin/account-management/user-roles-permissions) with the dropdown menu in the *Role* column. Enterprise customers with project-level permissions enabled will need to select the checkbox next to a user's name to manage their individual permissions.

To change user permissions in Amplitude, follow these steps:

1. Navigate to *Settings* > *Organization settings* > *[Members & Groups](/docs/admin/account-management/manage-users).* The Team Members page will open.
2. Check the box next to the name of the user whose permissions you'd like to edit. You can select multiple users at once.
3. Click *Manage Project Access*.
4. In the modal that appears, find the project you want to adjust permissions for and check the checkbox next to it. You can select multiple projects at once.
5. From the *Role* dropdown, choose the new permission level you'd like to assign to the users you selected in step 2, for each project you selected in step 4.  
  
{{partial:admonition type='note'}}
You will not be able to change the role for the only Admin in an organization.
{{/partial:admonition}}

6. To remove a user's permissions, click *Remove*. Doing so will remove the user from the organization and eliminate all access provisions.

{{partial:admonition type='note'}}
When you remove a user, all their content (charts, dashboards and cohorts) will be designated as unassigned. Admins can transfer ownership of unassigned content to other users.
{{/partial:admonition}}

### Project-level permissions

With project-level permissions, a user can have a different role for each project within an organization. This enables multiple teams in your company to operate autonomously and manage their own datasets. For example, a user may have Manager-level permission in one project, but Viewer-level permission in another. Users without access to a project cannot view any content that belongs in that project.

![mceclip2.png](/docs/output/img/account-management/mceclip2-png.png)

{{partial:admonition type='note'}}
Project-level permissions are available to customers on an Enterprise plan only.
{{/partial:admonition}}

When viewing all members of your organization, members will either be listed as *User* or *Admin*. If you are an Admin or Manager of a project in the organization, you can view and modify an individual member's role per project by clicking the checkbox next to the member's name and selecting "Manage Project Access". Managers will only be able to modify a user's role for the project where they are a Manager.

Please reach out to your Customer Success Manager to enable project-level permissions as this is not enabled by default.

### Transfer ownership of content from one user to another

When a user leaves the company or is otherwise no longer part of an Amplitude organization, any content they created will no longer have an owner. Depending on the nature of that content, situations like this can significantly hamper your company’s analytics work.

Admins can avoid this by using the **bulk transfer ownership** feature to designate another user as the owner of that orphaned content. Navigate to *Settings > Organization settings > Members & Groups*, and then click *Bulk Transfer Edit Access*.

{{partial:admonition type='note'}}
This process cannot be reversed, so use it with care.
{{/partial:admonition}}

You can also transfer content when you’re removing a user. Simply check the box on the *Remove Members?* modal, and Amplitude will give you the option to transfer each removed user's content to another existing user.

Note that you can only transfer a user’s content **before** they are deleted from the organization. The user who receives the content must have logged into Amplitude at least once in the 30 days prior, and you may have to explicitly grant them the permissions they need to access the content you’ve given them.

## Request an email domain change

Things to know before doing an email domain migration:

* **What gets migrated**: Permissions levels including App-Level Permissions, Admin Status, Group Membership; and content including Cohorts, Charts, Dashboards, and Notebooks
* **What doesn't get migrated**: User spaces and the content contained within these spaces
* **Active users will be redirected**: Anyone in an active session will be redirected to an error page. Let your team know they may not have access to Amplitude while the domain change is being made.
* **Turn off SSO**: If you have SSO enabled in your organization, turn it off before the migration. You will have to set up the SSO again after the migration.

To request an email domain change, submit a [ticket](https://help.amplitude.com/hc/en-us/requests/new) with the following information:

* Your org ID
* The old email domain
* the new email domain

An admin must request email domain changes. If you are not an admin of the organization, CC an admin in your request.