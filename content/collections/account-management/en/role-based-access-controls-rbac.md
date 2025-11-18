---
id: 7346a8c9-efe7-48e5-a2df-28b1da5300a0
blueprint: account-management
title: 'Role-based Access Controls (RBAC)'
landing: true
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1762801028
landing_blurb: 'Manage who can access features within your Amplitude Org and the actions they can perform.'
---
Role-based Access Control (RBAC) lets you manage who can access specific areas of Amplitude and the actions they can perform in those areas. By offering granular access controls, your Amplitude administrators can scale Amplitude adoption and prevent unauthorized actions.

RBAC provides administrators a centralized location for assigning permissions to individual users or [groups](/docs/admin/account-management/manage-permission-groups). For example, if your organization has an `Analyst` role, you can assign the same base permissions to that role. When a new analyst joins the team and is assigned `Analyst`, they automatically inherit the same set of permissions as everyone else with the `Analyst` role.

{{partial:admonition type="tip" heading="RBAC: Key benefits"}}   
RBAC Provides the following benefits to your enterprise:

* **Improved security**: Limit data access based on job responsibilities.  
* **Operational efficiency**: Simplify user management across large organizations.  
* **Compliance support**: Supports regulatory requirements around access control and auditing.  
* **Scalability**: Manages access for growing teams and multiple business units. 

{{/partial:admonition}}


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

If a user has conflicting roles for the same project through group assignment (for example, Group A assigns them Viewer for Project A, but Group B assigns them Manager for Project A), they get the union of both sets of permissions. On the Members page, that user's role shows as "multiple" with an error warning icon.

If you set a user's permission at the individual level (directly in the Members page), that role overrides any other assignments.

### Groups

Groups enable you to manage users at scale. They define the projects that a member of the group has access to, and their role within those projects. Groups most often map to teams in your organization. For example, the Business Intelligence team has a defined set of Amplitude projects where they do their work, and a set of permissions they need to do that work. As a result, you may have a group called "Business Intelligence," with access to Project A and Project B, with the `Analyst` role.

{{partial:admonition type="note" heading="Permission conflicts"}}   
When you assign roles to users both individually and through groups, the permissions may conflict. When this happens, Amplitude provides grants the user the combination of roles assigned individually and through groups, and displays a warning in the UI.
{{/partial:admonition}}

## RBAC permission reference

{{partial:collapse name="RBAC Permissions"}}
{{partial:partials/rbac-permissions-table}}
{{/partial:collapse}}