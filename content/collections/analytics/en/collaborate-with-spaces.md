---
id: 213623de-f09a-461f-aaa0-01186edd7964
blueprint: analytic
title: 'Collaborate on your analyses using spaces'
source: 'https://help.amplitude.com/hc/en-us/articles/360016524911-Collaborate-on-your-analyses-using-spaces'
this_article_will_help_you:
  - 'Collaborate with other team members to generate insights by creating and refining analyses together'
  - 'Organize the content you create in Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1742328269
academy_course:
  - 46517037-8185-4438-afbd-4ba6f18249ea
ai_summary: "You can use Amplitude's Spaces feature to organize content. Join existing spaces, move content, create shortcuts, and manage members. Permissions vary from editing to viewing. Connect spaces to Slack for notifications. Growth and Enterprise plans offer enhanced controls. Admins and managers can manage permissions. Project-level permissions override space-level permissions."
---
This article explains how to take advantage of the different features offered by [spaces](/docs/get-started/spaces) before continuing.

### Feature availability

This feature is available to users on **all Amplitude plans**.

## Join an existing space

To subscribe to an existing space, click the *Spaces* drop-down, then click *View all Spaces*. Scroll down until you find the space you're looking for, and click *Join*.

When you join a space, Amplitude stars it automatically and adds it to your list of joined spaces. You can un-star a space and remove it from your list by clicking the star icon on the space itself.

## Move content to a new space

You can save each piece of content to just a single space. Follow these steps to move content to a new space:

1. Navigate to the space where the content is. Check the box next to its name.
2. In the menu bar above the content list, click *Move*. A navigational flyout panel opens.
3. Navigate to the space or folder you want, or create a new space or folder. Then click *Move*.

## Create a shortcut

A shortcut is a way to add content to multiple spaces and folders. Anyone can create a shortcut to a piece of content, but only an owner of the original content can move the original to a new space.

1. Open a piece of content you'd like to share to multiple spaces.
2. Navigate to *More > Add Shortcut*.
3. Navigate to the space or folder you want, or create a new space or folder. Then click *Add Shortcut*.

## Manage space members

You can add new members to your space, or manage the access permissions of current space members, through the *Manage Members* button. 

When you add a member to a space as a viewer or editor, they can view or edit all content within that space. The only exception is when the member lacks permissions for a particular project with content stored in the space. **Project permissions always take priority over space-level permissions.**

There are three levels of permissions:

* **Can edit**: The user can edit, archive, and save changes to all content in the space.
* **Can add**: The user can add items or folders, or move existing content.
* **Can view**: The user can only view the content residing in the space.

To add a new member to a space, follow these steps:

1. Click *Manage Members* to open the *Manage Members* modal.
2. Click the *Add people* field and select the new member from the drop-down list. Repeat this step for each new user who requires the same permissions level.
3. Set the permissions level for the new user from the drop-down menu.
4. Click *Share*.

To modify a space member's permissions, follow these steps:

1. Click *Manage Members* to open the *Manage Members* modal.
2. Scroll until you find the user whose permissions you want to modify. Open the drop-down opposite their name and select the new permissions level, or click *Remove* to remove the user from the space.

## Slack integration

When you connect spaces to specific Slack channels, you receive notifications whenever your team creates new analyses. When new content gets added to that team space in Amplitude, it's posted in the Slack channel.

To do this, click *Connect with Slack*. Then follow the prompts.

To learn more about our Slack integration, see our [article on integrating Slack with Amplitude](/docs/analytics/integrate-slack).

## Permissions

While only admins, managers, and members can create a team space, all users can add themselves to spaces, regardless of permission level.

Customers on the Growth and Enterprise plans have enhanced controls around user permissions within a space. By default, admins, managers, and members can all add content, invite users to the space, and archive a space. Admins and managers also have the option to manage the space permissions to specify which roles have permissions to add content, invite users, and archive a space.

When you invite a new user to a space, you can grant them access up to your level of access. For example, if you have the "can view" permission on a specific space, you can't invite users with "can add" or "can edit" permissions.

Archiving content from a space you own requires edit permissions within the space.

{{partial:admonition type="note" heading="Space and Project permissions"}}
Permissions set at the project-level override any permissions set at the space level. As a result, a user's permissions within a project may override their permissions within the space.
{{/partial:admonition}}