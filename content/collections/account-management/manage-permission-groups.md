---
title: "Manage permissions at scale with permission groups"
source: "https://help.amplitude.com/hc/en-us/articles/360044588191-Manage-permissions-at-scale-with-permission-groups"
id: 4f8ff2b3-3a37-4d4e-82db-9de672b7149f
---

#### This article will help you:

* Efficiently assign and manage permissions for large numbers of users

With permission groups, you can assign multiple users sets of permissions in a single step, based on membership in a specific group, streamlining the process of provisioning and managing your Amplitude organization. 

For example, you might create groups like "Marketing Team" or "Payments Team," add users to them, and assign project permissions to each group, instead of to each individual team member. Anyone assigned to a group will have the permission level you assigned to the group. Users can be assigned to multiple groups, and the only way to change a specific group member's permission level is to remove them from the group.

Amplitude will grant the highest level of permissions assigned to a user. If a user is assigned to a group, they will inherit its project permissions. If a user has their own set of project permissions, their new set of permissions will be a combination of the two, with projects taking on the highest role.

### Feature availability

This feature is available to users on **Enterprise plans only**.

## Before you begin

* Only Admins in the organization can edit groups.
* Permission groups can be managed via the [User Management API](/admin/account-management/scim-provision) (a SCIM API).
* You should be familiar with Amplitude's [user permissions model](/admin/account-management/user-roles-permissions) before proceeding.

## Create a group

To create a new group, follow these steps:

1. Navigate to ![gear icon for settings.png](/output/img/account-management/gear-icon-for-settings-png.png) > *Organization settings*. Then click*Members & Groups*.   
![manage_permissions_at_scale_1.png](/output/img/account-management/manage-permissions-at-scale-1-png.png)
2. From the *Groups* tab, click *+ New Group.* The *Create New Group* pane will open.
3. In the *General* tab, name your group and add a description, if desired.
4. If desired, select from the [Team Spaces](/analytics/collaborate-with-spaces) drop-down any team spaces you want to automatically add group members to. Existing members of the selected Team Spaces will **not** be automatically added to this group.
5. Select the appropriate group type from the drop-down.
6. Next, click *+ Add Project* and select the projects to which this group will have access. You can add any number of projects to the group.
7. For each project, select the appropriate project role. All group members will have the permission level that is attached to that project role.

![permission groups 1a.png](/output/img/account-management/permission-groups-1a-png.png)

**NOTE**: If a group member already has access to a project individually or via another group, Amplitude will treat them according to the **highest** level of permission they have. For example, if a user has a "Member" role for a project via Group A, but is also part of Group B that grants them "Manager" access to the project, the user will have manager access to this project. Please see below for more [example scenarios](#Example-Scenarios).

8. Next, open the *Members* tab and click *+ Add Members*. Select the users you'd like to add from the drop-down. You can also skip this step for now, if you are not yet ready to add members.
9. Click *Save* to finish creating your group.

## Edit a group

You can modify the group's permission levels, add or remove group members, change the group type or the team spaces associated with the group, or add projects to a group at any time.

To **remove a member** from the group, navigate to the *Members* tab and check the box next to the member's name. Then click *Remove*.

To **modify the group's permission level** for a specific project, navigate to the *General* tab and check the box next to the project's name. Click the *Edit Project Role* dropdown and select the appropriate project role for the group, or click *Remove Project Access* to prevent access to the project from members of this group.

## Assign groups when inviting new users

When [inviting new users](/admin/account-management/manage-users) to your organization, you can assign them to a group and/or assign individual project permissions during the 'Assign Access' step.

## Things to consider when assigning user permissions

User permissions can be assigned either via groups, or individually via User Management. It is recommended that Admins decide on a method for assigning user permissions, whether it is one method over the other or a hybrid of the two. The table below contains information to help decide which method is best suited for your organization. 

| **Method** | **Pros** | **Cons** |
| --- | --- | --- |
| Groups | Organize permissions and scale easily.
Integrate with other permissions models in the future.  | Harder to manage individual overrides to user permissions. Requires creating a new Group for exceptions. |
| User Management | Customized permissions for each user. | Difficult to manage at larger scales.
Difficult to keep organized.  |
| Hybrid | Benefits of both methods - organization and scale along with individually assigned permissions for one-off cases. | Difficult to know which assignment is the source of truth.  |

If your organization uses third-party identity and access management softwares (eg. Okta, GSuite, SailPoint, etc), you can integrate these with Amplitude in the future. Consider setting up groups within Amplitude that align with the company structure and standard sets of permissions and roles in your organization. Access management integrations can only be managed via groups. 

## Example scenarios

When a user has multiple permission levels for a single project (either through group membership or individual assignment), the user will enjoy the highest permission level available to them. 

**Example A**: Oleg is assigned to a group that provides Member permissions to a project.

* * You can individually upgrade Oleg to a higher role, via User Management.
	* If you later decide to re-assign Oleg to the lower-level Member role, you can individually downgrade him to that permission level.

If a user is assigned permissions via User Management, those permissions cannot be removed, downgraded, or limited via a group's permission levels. Conversely, if a user is assigned permissions through membership in a group, those permissions cannot be removed, downgraded, or limited via User Management.

**Example B**: Akiko is a Manager of a project through membership in a group with Manager-level permissions.

* * You cannot individually downgrade Akiko to a Member or Viewer via User Management.

If a user is removed from a group, then permissions granted via the group will be revoked. If a user also has project permissions via User Management, those permissions will remain intact. 

**Example C**: Marco is individually assigned Viewer permissions for Project A. He is also granted Manager permissions for Project A and Project B through group membership.

* * Marco is a Manager of Project A and Project B, because this is the highest permission level granted to him.
	* If Marco is removed from the group, he will only be a Viewer for Project A.
	* If Marco is added back to the group later, he will recover the union of all the user-specified and group-specified permissions—in this case, he will become a Manager for Project A and Project B again.

If a user was not assigned any permissions individually or through group membership, that user will not be able to view any content within your Amplitude organization.

**Example D**: Tyra does not have any individually assigned project permissions but is assigned to a group that grants Member permissions for Project A.

* * If Tyra is removed from the group, she will no longer have access to any content in the organization.
