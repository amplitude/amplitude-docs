---
id: 52e1fdb9-b354-4012-b8de-d378c68cbf26
blueprint: experiment
title: 'Set app-level user permissions in Amplitude Experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/4416438117147-Set-app-level-user-permissions-in-Experiment'
this_article_will_help_you:
  - 'Set user permissions for Amplitude Experiment that are independent of and separate from those used in Amplitude Analytics'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1728408045
experiment_type:
  - feature
  - web
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

When flag-level access controls are enabled, users in your organization can't save changes to restricted flags and experiments unless they're specifically designated as an editor for it. 

### Default access for new flags and experiments

You can set the default access for new flags and experiments to a restricted list of editors, or all users in your organization.

This is controlled by a organization-wide setting in *Experiment > Permissions > Organization Settings*. Only users with the admin role can modify this setting.

The default sets new flags and experiments as editable by all users in your organization. If you create a new flag or experiment, you can manually restrict access to that item after you create it.

If you change the default and make new flags and experiments **viewable** instead of editable, only editors can modify new flags and experiments. Remove this restriction after you create the flag or experiment.

If you create a flag or experiment through the [Management API](/docs/apis/experiment/experiment-management-api), it defaults to **editable** regardless of the organization setting.

### Managing access to flags and experiments

To edit the list of approved editors, navigate to *[flag or experiment] > More Actions > Manage Access*. Here, you can add individual users, or specify that the flag is editable by all users in your organization.

After you grant a user editor permissions to your flag, Amplitude Experiment checks permissions and verifies that user 's role has edit access. For example, if you assign a user the viewer role and later add them as an editor to your flag, they can't save changes until you give them a role with editing privileges.

Users get a notification when you add them as an editor to a flag or experiment. You can control your notification settings in *Personal settings > Notifications > Updates about my experiments*

### Bypassing access restrictions

There are two ways to to make modifications to a restricted flag or experiment when no editor users are available: 

1. Admin users can edit restricted flags and experiments, even if they aren't on the list of editors.
2. Use the management API to edit all flags and experiments, regardless of the item's restricted access.

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