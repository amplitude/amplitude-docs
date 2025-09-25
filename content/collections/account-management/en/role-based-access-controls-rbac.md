---
id: 7346a8c9-efe7-48e5-a2df-28b1da5300a0
blueprint: account-management
title: 'Role-based Access Controls (RBAC)'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1758821106
---
Role-based Access Controls (RBAC) provides Amplitudes Enterprise customers with granular controls to manage who can access specific areas of Amplitudes and the actions they can perform in those areas. This enables an organization's Amplitude administrators to scale Amplitude adoption and prevent unauthorized actions.

RBAC provides administrators a centralized location for assigning permissions to individual users or groups of users. For example, if your organization has an `Analyst` role, you can assign the same base permissions to that role. When a new analyst joins the team and is assigned `Analyst`, they automatically inherit the same set of permissions as other analysts.

{{partial:admonition type="tip" heading="RBAC: Key benefits"}}
RBAC Provides the following benefits to your enterprise:

* **Improved security**: Limit data access based on job responsibilities.
* **Operational efficiency**: Simplify user management across large organizations.
* **Compliance support**: Supports regulatory requirements around access control and auditing.
* **Scalability**: Manages access for growing teams and multiple business units.
{{/partial:admonition}}

## RBAC concepts

Amplitude's RBAC contains three main layers: Roles, Permissions, and Actions. Roles contain permissions, and permissions contain actions. An action is a singular task, editing a metric, or creating an annotation.

### Roles

By default, your Amplitude organization contains four default roles:

* Viewer
* Member
* Manager
* Admin

Each default role carries a set of base permissions


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

{{partial:collapse name="RBAC Permissions"}}
{{partial:partials/rbac-permissions}}
{{/partial:collapse}}