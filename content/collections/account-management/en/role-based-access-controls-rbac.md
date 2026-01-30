---
id: 7346a8c9-efe7-48e5-a2df-28b1da5300a0
blueprint: account-management
title: 'Role-based Access Controls (RBAC)'
landing: true
exclude_from_sitemap: false
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1765488153
landing_blurb: 'Manage who can access features within your Amplitude Org and the actions they can perform.'
academy_course:
  - bbb19f3a-7715-49c9-9b72-d63a07249d03
---
Role-based Access Control (RBAC) lets you manage who can access specific areas of Amplitude and the actions they can perform in those areas. By offering granular access controls, your Amplitude administrators can scale Amplitude adoption and prevent unauthorized actions.

RBAC provides administrators a centralized location for assigning permissions to individual users or [groups](/docs/admin/account-management/manage-permission-groups). For example, if your organization has an `Analyst` role, you can assign the same base permissions to that role. When a new analyst joins the team and is assigned `Analyst`, they automatically inherit the same set of permissions as everyone else with the `Analyst` role.

RBAC Provides the following benefits to your enterprise:

* **Improved security**: Limit data access based on job responsibilities.  
* **Operational efficiency**: Simplify user management across large organizations.  
* **Compliance support**: Supports regulatory requirements around access control and auditing.  
* **Scalability**: Manages access for growing teams and multiple business units. 

{{partial:admonition type="note" heading="Feature availability"}}

RBAC is available to organizations on any Enterprise plan. If you aren't on an Enterprise plan, go to your Account Management [roles and permissions](/docs/admin/account-management/user-roles-permissions).

{{/partial:admonition}}

To learn more, take the [Manage roles and permissions with RBAC](https://academy.amplitude.com/manage-roles-and-permissions-with-role-based-access-controls-rbac) course on Amplitude Academy.

## Amplitude RBAC concepts

Amplitude's RBAC contains three main layers: Roles, Permissions, and Actions. Roles contain permissions, and Permissions contain actions. An action is a singular task, editing a metric, or creating an annotation.

### Roles

By default, your Amplitude organization contains four default roles, in order of increasing access:

* Viewer  
* Member  
* Manager  
* Admin

{{partial:admonition type="tip" heading="Admin role"}}   
The Administrator (Admin) role is the only default role that doesn’t support updating permissions. If you require administrators to carry different permissions in your org, create a new role to reflect those permissions.  
{{/partial:admonition}}

Amplitude’s default roles cover most common use cases, but every organization has unique structures and responsibilities. Custom roles enable your organization to fine tune access for:

* Specialized teams, for example Growth Engineering or Data Governance, can have finely scoped permissions.  
* Hybrid roles created for employees who straddle functions. For example, a product manager who is also in charge of creating official dashboards and metrics.

This flexibility enables your organization to follow the security best practice of providing the least amount of access that enables users to complete their work.

### Permissions

Permissions define the specific actions Amplitude users can perform. They’re the building blocks of RBAC. Most permissions define a user’s ability to create, edit, or delete items in specific areas. Some permissions provide access to a single action, like marking a dashboard or metric as official.

Amplitude organizes permissions by product area:

* Administration  
* Charts & Metrics  
* Data Management  
* Audiences  
* Integrations  
* Session Replay & Heatmaps  
* Experiment  
* Guides & Surveys  
* Resource Center & Content

### Projects

In Amplitude, you assign roles to users for each project. This means that project membership determines access to that project, and roles within the project determine what a user can do.

### Groups

Groups enable you to manage users at scale. They define the projects that a member of the group has access to, and their role within those projects. Groups most often map to teams in your organization. For example, the Business Intelligence team has a defined set of Amplitude projects where they do their work, and a set of permissions they need to do that work. As a result, you may have a group called "Business Intelligence," with access to Project A and Project B, with the `Analyst` role.

#### Group permission prioritization

When you add a user to a group, admins can't change their permissions at the individual level for projects where access is granted through that group. This ensures permission consistency and simplifies troubleshooting when determining why a user has certain access levels.

When you try to modify permissions for a user who has group-assigned access, a tooltip appears stating "User(s) are assigned access to this project via Group(s)".

To change a user's permissions for projects they access through a group:

- Remove the user from the group and assign permissions directly, or
- Modify the group's permissions for that project

### Permission assignment warnings

Amplitude displays warning indicators when permission assignments require attention:

**Multiple**: Displayed when a user has different roles for the same project, typically because they belong to multiple groups with different permission levels. When this occurs, Amplitude grants the user the union of all assigned role permissions for that project.

**Conflict**: Displayed when you manage roles for multiple users simultaneously and those users have a permissions mismatch for the same project.

### Access definitions

The **ACCESS VIA** column in the User Overview panel indicates how a user received their project access:

| Access Via   | Meaning                                                                        |
| ------------ | ------------------------------------------------------------------------------ |
| Direct       | Role was assigned to the user directly through the Manage Project Access modal |
| [Group Name] | Role was assigned to the user through membership in the specified group        |

## RBAC permission reference

{{partial:collapse name="RBAC Permissions"}}
{{partial:partials/rbac-permissions-table}}
{{/partial:collapse}}