---
id: 4f8ff2b3-3a37-4d4e-82db-9de672b7149f
blueprint: account-management
title: 'Manage permissions at scale with permission groups'
source: 'https://help.amplitude.com/hc/en-us/articles/360044588191-Manage-permissions-at-scale-with-permission-groups'
this_article_will_help_you:
  - 'Efficiently assign and manage permissions for large numbers of users'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715294338
---
With permission groups, you can assign multiple users sets of permissions in a single step, based on membership in a specific group, streamlining the process of provisioning and managing your Amplitude organization. 

For example, you might create groups like "Marketing Team" or "Payments Team," add users to them, and assign project permissions to each group, instead of to each individual team member. Anyone you assign to a group receives the permission level you assigned to the group. You can assign users to multiple groups, and the only way to change a specific group member's permission level is to remove them from the group.

Amplitude grants the highest level of permissions assigned to a user. When you assign a user to a group, they inherit its project permissions. If a user has their own set of project permissions, their new set of permissions are a combination of the two, with projects taking on the highest role.

### Feature availability

This feature is available to users on **Enterprise plans only**. Review the [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin

* Only Admins in the organization can edit groups.
* Permission groups can be managed through the [User Management API](/docs/admin/account-management/scim-provision) (a SCIM API).
* You should be familiar with Amplitude's [user permissions model](/docs/admin/account-management/user-roles-permissions) before proceeding.

{{partial:admonition type='note'}}
Permission groups are different from [team spaces](/docs/analytics/collaborate-with-spaces). Permission groups control project-level access across the organization (Admin-only feature), while team spaces are collaborative workspaces that Members, Managers, and Admins can all create and manage.
{{/partial:admonition}}

## Create a group

To create a new group, follow these steps:

1. Navigate to *Settings* > *Organization settings*. Then click *Members & Groups*.

![manage_permissions_at_scale_1.png](/docs/output/img/account-management/manage-permissions-at-scale-1-png.png)

2. From the *Groups* tab, click *+ New Group.* The *Create New Group* pane opens.
3. In the *General* tab, name your group and add a description, if you want.
4. If you want, select from the [Team Spaces](/docs/analytics/collaborate-with-spaces) drop-down any team spaces you want to automatically add group members to. Amplitude doesn't automatically add existing members of the selected Team Spaces to this group.
5. Select the appropriate group type from the drop-down.
6. Next, click *+ Add Project* and select the projects to which this group has access. You can add any number of projects to the group.
7. For each project, select the appropriate project role. All group members have the permission level that's attached to that project role.

![permission groups 1a.png](/docs/output/img/account-management/permission-groups-1a-png.png)

{{partial:admonition type='note'}}
 If a group member already has access to a project individually or through another group, Amplitude treats them according to the **highest** level of permission they have. For example, if a user has a "Member" role for a project through Group A, but is also part of Group B that grants them "Manager" access to the project, the user has manager access to this project. Find more [example scenarios here](#Example-Scenarios).
{{/partial:admonition}}

8. Next, open the *Members* tab and click *+ Add Members*. Select the users you'd like to add from the drop-down. You can also skip this step for now, if you aren't yet ready to add members.
9. Click *Save* to finish creating your group.

## Edit a group

You can modify the group's permission levels, add or remove group members, change the group type or the team spaces associated with the group, or add projects to a group at any time.

To **remove a member** from the group, navigate to the *Members* tab and check the box next to the member's name. Then click *Remove*.

To **modify the group's permission level** for a specific project, navigate to the *General* tab and check the box next to the project's name. Click the *Edit Project Role* dropdown and select the appropriate project role for the group, or click *Remove Project Access* to prevent access to the project from members of this group.

## Assign groups when inviting new users

When [inviting new users](/docs/admin/account-management/manage-users) to your organization, you can assign them to a group and/or assign individual project permissions during the 'Assign Access' step.

## Things to consider when assigning user permissions

You can assign user permissions either through groups, or individually through User Management. Admins should decide on a method for assigning user permissions, whether it's one method over the other or a hybrid of the two. The table below contains information to help decide which method is best suited for your organization. 

| **Method** | **Pros** | **Cons** |
| --- | --- | --- |
| Groups | Organize permissions and scale. Integrate with other permissions models in the future.  | Harder to manage individual overrides to user permissions. Requires creating a new Group for exceptions. |
| User Management | Customized permissions for each user. | Difficult to manage at larger scales. Difficult to keep organized.  |
| Hybrid | Benefits of both methods - organization and scale along with individually assigned permissions for one-off cases. | Difficult to know which assignment is the source of truth.  |

If your organization uses third-party identity and access management software (for example, Okta, Google Workspace, SailPoint), you can integrate these with Amplitude in the future. Consider setting up groups within Amplitude that align with the company structure and standard sets of permissions and roles in your organization. Access management integrations can only be managed through groups. 

## Example scenarios

When a user has multiple permission levels for a single project (either through group membership or individual assignment), the user enjoys the highest permission level available to them. 

**Example A**: You assign Oleg to a group that provides Member permissions to a project.

* You can individually upgrade Oleg to a higher role through User Management.
* If you later decide to re-assign Oleg to the lower-level Member role, you can individually downgrade him to that permission level.

If you assign permissions to a user through User Management, those permissions can't be removed, downgraded, or limited through a group's permission levels. Conversely, if you assign permissions to a user through membership in a group, those permissions can't be removed, downgraded, or limited through User Management.

**Example B**: Akiko is a Manager of a project through membership in a group with Manager-level permissions.

* You can't individually downgrade Akiko to a Member or Viewer through User Management.

If you remove a user from a group, Amplitude revokes the permissions granted through the group. If a user also has project permissions through User Management, those permissions remain intact. 

**Example C**: You individually assign Marco Viewer permissions for Project A. Marco also receives Manager permissions for Project A and Project B through group membership.

* Marco is a Manager of Project A and Project B, because this is the highest permission level he has.
* If you remove Marco from the group, he's only a Viewer for Project A.
* If you add Marco back to the group later, he recovers the union of all the user-specified and group-specified permissions—in this case, he becomes a Manager for Project A and Project B again.

If you don't assign any permissions to a user individually or through group membership, that user can't view any content within your Amplitude organization.

**Example D**: Tyra doesn't have any individually assigned project permissions but belongs to a group that grants Member permissions for Project A.

* If you remove Tyra from the group, she no longer has access to any content in the organization.