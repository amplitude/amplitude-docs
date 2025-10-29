---
id: 5fda151f-b240-41ab-bf74-74b473434036
blueprint: account-management
title: 'Manage RBAC Roles'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1761686429
---
Administrators in your organization can create new roles and update existing roles. Both new roles and roles you update take effect immediately.

As a best practice, Amplitude recommends you follow the principle of least privilege. This states that when you create or edit a role, grant the minimum necessary permissions that enable a user with that role to do their job. Adding “just in case” permissions can open unnecessary security risks. Amplitude’s RBAC system is flexible, so you can update roles to add permissions later, as needed.

## Creating a new role

If you’re an org administrator, navigate to *Org Settings > Role Management*. This page lists existing roles in your organization, and includes a description, the type of role, and the user who last modified the role.

##### Creating a new role

1. Click **+New Role.**  
2. Provide a Role Name and Description. Amplitude recommends using a descriptive role name with a maximum of 30 characters, like “Analyst” or “Marketing,” and a short description of the role. Click **Create** to continue.  
3. Amplitude organizes permissions by product area, and displays only the products and features available to your organization.  
4. All new roles inherit permissions of the default `Member` role.  
5. For each product area, the Role describes “Base permissions,” “Expanded permissions,” or “Full permissions.”  
* **Base permissions**: The permissions that Amplitude provides by default to non-Admin users.  
* **Expanded permissions**: Permissions beyond what Amplitude provides by default, but aren’t full permissions.  
* **Full permissions**: All permissions enabled for the specific product area.  
6. Within each product area, select the individual permissions to grant to the role.  
7. When the role’s permissions are set, click **Save Changes**.

After you create a role, it’s immediately available to assign to users or groups.

## Edit an existing role

Org administrators can edit and update existing roles following the same flow as creating a new role. Navigate to *Org Settings > Role Management* to begin.

##### Editing a role

1. Click the role to edit.  
2. Update the permissions on the role.  
3. Click **Save**.

Upon saving the role, the permissions update applies immediately to users with that role assignment. Before you update a role, Amplitude recommends that you audit where your organization uses that role to help minimize disruption.  
