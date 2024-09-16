---
id: 52e1fdb9-b354-4012-b8de-d378c68cbf26
blueprint: experiment
title: 'Set app-level user permissions in Experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/4416438117147-Set-app-level-user-permissions-in-Experiment'
this_article_will_help_you:
  - 'Set user permissions for Amplitude Experiment that are independent of and separate from those used in Amplitude Analytics'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720719003
---
Experiment app-level permissions enable Amplitude admins to manage access to Amplitude Experiment separately from [Amplitude Analytics permissions](/docs/admin/account-management/user-roles-permissions). Use this when you want to:

* **Prevent** analytics team members from releasing features through Experiment, **and/or**
* **Prevent** product development team members from affecting data taxonomy, or key dashboards and charts in Analytics, **while**
* **Allowing** all team members to keep higher permission levels in their primary apps, enabling them to do their jobs efficiently and effectively.

{{partial:admonition type='note'}}
Setting app-level user permissions in Experiment is only available to Enterprise customers. 
{{/partial:admonition}}

To set app-level user permissions in Experiment, follow these steps:

1. In Experiment, click *Permissions* in the left-hand sidebar. The Experiment Permissions page displays, with the Joined Users tab open.
2. In the *Search* field, type the name or email of the user you're looking for. Then click the checkbox next to their name. The actions above the table should now be selectable in blue.
3. Click *Manage Project Access* to search for the project where you want to adjust permissions.
4. From the dropdown displaying the current permission level for the selected user, select their updated access level. Then click *Next*.  
  
  ![manage_project_access_modal.png](/docs/output/img/experiment/manage-project-access-modal-png.png)

5. If you're sure you want to make these changes, click *Submit*.

## Flag-level access controls

{{partial:admonition type='note'}}
This feature is available to users on Enterprise plans only.
{{/partial:admonition}}

With flag-level access controls, you can decide which Amplitude Experiment users can make changes to specific flags or experiments. 

When flag-level access controls are enabled, users in your organization are unable to save changes to restricted flags and experiments unless they're specifically designated as an editor for it. 

### Default access for new flags and experiments

All new flags and experiments can default to being restricted to the list of editors or editable by all users in your organization.

This is controlled by a organization-wide setting in *Experiment > Permissions > Organization Settings*. Only users with the admin role can modify this setting.

The default setting is that new flags and experiments will be *editable* by all users in your organization. Users who create a new flag or experiment can manually restrict access to the item after its creation.

By switching the default setting to making new flags and experiments *viewable* instead of editable, all new flags and experiments will have restricted access to editors only. Users can manually remove this restriction after creating a new flag or experiment.

Flags and experiments created through the management API will default to *editable* regardless of the organization setting.

### Managing access to flags and experiments

To edit the list of approved editors, navigate to *[flag or experiment] > More Actions > Manage Access*. Here, you can add individual users, or specify that the flag is editable by all users in your organization.

After you grant a user editor permissions to your flag, Amplitude Experiment checks permissions, and that user needs edit access through their role. For example, if you assign a user the Viewer role and you add them as an editor to your flag, they can't save changes until you assign them a role with editing privileges.

Users will recieve a notification when they are added as an editor to a flag or experiment. You can control your notification settings in *Personal settings > Notifications > Updates about my experiments*

### Bypassing access restrictions

In situations where you need to make modifications to a restricted flag or experiment when no editor users are available, there are two ways to do this: 

1. There is an exception made for users with the admin role, who are able to edit restricted flags and experiments even if the user is not in the list of editors.
2. The management API is able to be used to edit all flags and experiments regardless of whether the item has restricted access.

## Permissions matrix

This table describes the various permissions included with each permission level.

|                       | Viewer | Member     | Manager (Project) | Admin (Org) |
| --------------------- | ------ | ---------- | ----------------- | ----------- |
| Targeted Environments | Read   | Read/Write | Read/Write        | Read/Write  |
| Activate                | Read   | Read/Write | Read/Write        | Read/Write  |
| Variants              | Read   | Read/Write | Read/Write        | Read/Write  |
| Allocation            | Read   | Read/Write | Read/Write        | Read/Write  |
| Analysis              | Read   | Read/Write | Read/Write        | Read/Write  |
| Metrics               | Read   | Read/Write | Read/Write        | Read/Write  |


| **Experiments and Flags** | Viewer | Member | Manager (Project) | Admin (Org) |
| ------------------------- | ------ | ------ | ----------------- | ----------- |
| Read                      | Y      | Y      | Y                 | Y           |
| Create                    |        | Y      | Y                 | Y           |
| Edit                      |        | Y      | Y                 | Y           |
| Delete                    |        | Y      | Y                 | Y           |


| **Environments** | Viewer | Member | Manager (Project) | Admin (Org) |
| ---------------- | ------ | ------ | ----------------- | ----------- |
| Read             | Y      | Y      | Y                 | Y           |
| Create           |        | Y      | Y                 | Y           |
| Edit             |        | Y      | Y                 | Y           |
| Delete           |        | Y      | Y                 | Y           |


| **Mutual Exclusion Groups** | Viewer | Member | Manager (Project) | Admin (Org) |
| --------------------------- | ------ | ------ | ----------------- | ----------- |
| Read                        | Y      | Y      | Y                 | Y           |
| Create                      |        | Y      | Y                 | Y           |
| Edit                        |        | Y      | Y                 | Y           |
| Delete                      |        | Y      | Y                 | Y           |

| **Users**                | Viewer | Member | Manager (Project) | Admin (Org) |
| ------------------------ | ------ | ------ | ----------------- | ----------- |
| Add user to a project    |        |        | Y                 | Y           |
| Edit project role        |        |        | Y                 | Y           |
| Add user to organization |        |        |                   | Y           |
| Edit organization role   |        |        |                   | Y           |

| **Other**                | Viewer | Member | Manager (Project) | Admin (Org) |
| ------------------------ | ------ | ------ | ----------------- | ----------- |
| View Project API Key     | Y      | Y      | Y                 | Y           |
