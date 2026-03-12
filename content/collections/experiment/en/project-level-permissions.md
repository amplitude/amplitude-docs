---
id: 52e1fdb9-b354-4012-b8de-d378c68cbf26
blueprint: experiment
title: 'Set project-level user permissions in Amplitude Experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/4416438117147-Set-project-level-user-permissions-in-Experiment'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720719003
---
Experiment project-level permissions let Amplitude admins manage access to Experiment separately from [Analytics permissions](/docs/admin/account-management/user-roles-permissions). Use this when you want to:

* Prevent analytics team members from releasing features through Experiment.
* Prevent product development team members from affecting data taxonomy, or key dashboards and charts in Analytics.
* Allow all team members to keep higher permission levels in their primary apps.

{{partial:admonition type='note'}}
Project-level user permissions in Experiment are only available to Enterprise customers.
{{/partial:admonition}}

### Set project-level user permissions

1. In Experiment, select **Permissions**. The *Experiment Permissions* page opens with the **Joined Users** tab active.
2. In the **Search** field, type the name or email of the user you want. Select the checkbox next to their name. The action buttons above the table become active.
3. Select **Manage Project Access** to search for the project where you want to adjust permissions.
4. In the dropdown showing the current permission level, select the updated access level. Select **Next**.
5. To confirm your changes, select **Submit**.

## Flag-level access controls

{{partial:admonition type='note'}}
This feature is only available to users on Enterprise plans.
{{/partial:admonition}}

With flag-level access controls, you can decide which Experiment users can make changes to specific flags or experiments.

When flag-level access controls are enabled, users in your organization can't save changes to restricted flags and experiments unless they're specifically designated as an editor for them.

### Default access for new flags and experiments

You can set the default access for new flags and experiments to a restricted list of editors, or all users in your organization.

An organization-wide setting controls this. Go to *Experiment > Permissions > Organization Settings* to access the setting.

Only users with the admin role can modify this setting.

The default sets new flags and experiments as editable by all users in your organization. If you create a new flag or experiment, you can manually restrict access to that item after you create it.

If you change the default and make new flags and experiments viewable instead of editable, only editors can modify new flags and experiments. Remove this restriction after you create the flag or experiment.

If you create a flag or experiment through the [Management API](/docs/apis/experiment/experiment-management-api), it defaults to editable regardless of the organization setting.

### Manage access to flags and experiments

To edit the list of approved editors, navigate to *[flag or experiment] > More Actions > Manage Access*.
You can add individual users, or specify that the flag is editable by all users in your organization.

After you grant a user editor permissions to your flag, Amplitude Experiment checks permissions and verifies that user's role has edit access. For example, if you assign a user the viewer role and later add them as an editor to your flag, they can't save changes until you give them a role with editing privileges.

Users get a notification when you add them as an editor to a flag or experiment. Go to *Personal settings > Notifications > Updates about my experiments* to control your notification settings.

### Bypass access restrictions

There are two ways to make modifications to a restricted flag or experiment when no editor users are available:

1. Admin users can edit restricted flags and experiments, even if they aren't on the list of editors.
2. Use the management API to edit all flags and experiments, regardless of the item's restricted access.

## Permissions matrix

This table describes the various permissions included with each permission level.

{{partial:admonition type="note" heading="Role-based Access Controls (RBAC)"}}
For Enterprise organizations with Role-based Access Controls (RBAC) enabled, go to [Experiment Roles and Permissions](/docs/admin/account-management/role-based-access-controls-rbac#rbac-permission-reference).
{{/partial:admonition}}

| **Component**         | Viewer | Member     | Manager (Project) | Admin (Org) |
| --------------------- | ------ | ---------- | ----------------- | ----------- |
| Deployments           | Read   | Read/Write | Read/Write        | Read/Write  |
| Activate              | Read   | Read/Write | Read/Write        | Read/Write  |
| Variants              | Read   | Read/Write | Read/Write        | Read/Write  |
| Allocation            | Read   | Read/Write | Read/Write        | Read/Write  |
| Analysis              | Read   | Read/Write | Read/Write        | Read/Write  |
| Metrics               | Read   | Read/Write | Read/Write        | Read/Write  |


| **Experiments and flags** | Viewer | Member | Manager (Project) | Admin (Org) |
| ------------------------- | ------ | ------ | ----------------- | ----------- |
| Read                      | Y      | Y      | Y                 | Y           |
| Create                    |        | Y      | Y                 | Y           |
| Edit                      |        | Y      | Y                 | Y           |
| Delete                    |        | Y      | Y                 | Y           |


| **Deployments** | Viewer | Member | Manager (Project) | Admin (Org) |
| ---------------- | ------ | ------ | ----------------- | ----------- |
| Read             | Y      | Y      | Y                 | Y           |
| Create           |        | Y      | Y                 | Y           |
| Edit             |        | Y      | Y                 | Y           |
| Delete           |        | Y      | Y                 | Y           |


| **Mutual exclusion groups** | Viewer | Member | Manager (Project) | Admin (Org) |
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

| **Other**            | Viewer | Member | Manager (Project) | Admin (Org) |
| -------------------- | ------ | ------ | ----------------- | ----------- |
| View project API key | Y      | Y      | Y                 | Y           |
