---
id: 90fa43b0-481f-49b4-bb5f-55afbb2edf35
blueprint: account-management
title: 'RBAC Best Practices'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1761596446
---
Amplitude’s Role-based Access Controls (RBAC) system unifies permissions across all Amplitude products and features. This guide describes best practices for designing and governing access at the project level, and not separately for each project.

## Projects in Amplitude

In Amplitude, projects define the data users can view or modify, the Amplitude products and features they can use, and the actions they can perform within that project.

When you configure and manage permissions by project, users in your organization receive consistent access across all Amplitude products within that project.

## System architecture

Follow these guidelines to help ensure your RBAC implementation meets your organization’s access and security requirements.

### Use Groups as the default management layer

Groups are the foundation for managing access at scale. In Amplitude, a group defines:

* The projects that the group’s members have access to  
* The roles users hold in those projects  
* Any [Data Access Controls](https://amplitude-docs.test/docs/data/data-access-control) that apply

All members of a group inherit the same set of permissions for the same projects. This helps simplify onboarding, offboarding, and audits.

{{partial:admonition type="tip" heading="Don’t mix management methods"}}  
If a user belongs to a group, ensure their permissions derive from that group, and aren’t manually overridden.  
{{/partial:admonition}}

### Use direct role assignment only when necessary

Use individual user-level permissions only when group membership isn’t practical. For example:

* Contractors or temporary collaborators  
* Executives who need read-only access  
* Service or system accounts

If you assign permissions directly to a user, document the reason internally.

{{partial:admonition type="tip" heading="Be consistent"}}  
As much as possible, ensure that you manage each user through a group or individually. Avoid using both methods for the same user.  
{{/partial:admonition}}

### Standardize roles across the organization

Define a small set of core, reusable roles that apply across projects and products. This creates a shared mental model, and reduces administrative overhead. Review the following table for examples of roles you might create, their intended use, and the permissions they provide.

| Role                | Intended For                          | Permissions Summary                                                                  |
| ------------------- | ------------------------------------- | ------------------------------------------------------------------------------------ |
| **Viewer**          | Executives, stakeholders              | Read-only access to all Amplitude products within assigned projects                  |
| **Analyst**         | PMs, analysts                         | Can build and share charts and dashboards only (no data model or experiment editing) |
| **Data Governor**   | Data stewards, admins                 | Manages event taxonomy, tracking plans, and naming conventions across products       |
| **Engineer**        | Experiment owners, feature developers | Manages feature flags, experiment setups, and validation within Experiment           |
| **Growth Marketer** | Lifecycle and activation teams        | Manages Guides & Surveys, CDP audiences, and cohort syncs                            |

{{partial:admonition type="tip" heading="Keep it simple"}}  
Most organizations succeed with between five and seven roles. Add custom roles only when governance or compliance requires it.  
{{/partial:admonition}}

### Design groups

Groups are the foundation of scalable access in Amplitude’s RBAC system. Amplitude recommends building groups that combine function and scope into one logical structure by considering:

* The way in which users in your organization use Amplitude  
* The projects those users need to access

#### Anchor groups to both workflow and project scope

As you plan your groups, make sure to design groups that capture:

* How teams in your organization use Amplitude.  
* The projects each team should access.

In other words, consider both the team’s function or use case, and the data or product context they need to do their job.

Ensure each group describes what the members of the group do, and where they do it.

#### Keep groups project-scoped and purposeful

A well designed group is one that provides a clear function, a set of projects, and a consistent role.

To achieve this:

* Assign each group to the specific projects they need. Avoid granting access to the entire workspace.  
* If a team works across projects, assign those within the same group.  
* Avoid overlapping or nesting groups to keep access clear and auditable.

#### Apply clear and consistent naming

Use a predictable, readable naming format that reflects the role and the project scope:

`Function / Use Case - Role - Projects`

The following table contains a list of group names using this format.

| Group                                                   | Users                                                                    |
| :------------------------------------------------------ | :----------------------------------------------------------------------- |
| Product Analytics - Analysts (Web App + iOS App)        | Analysts who create charts and dashboards for both web and mobile.       |
| Experiment Owners - Engineers (Android App)             | Engineers who make feature flags and experiments in the Android project. |
| Marketing Ops - Growth Marketers (web App)              | Marketers who manage Guides, Surveys, and cohort syncs for the Web App.  |
| Data Governance Council - Data Governors (All Projects) | Data stewards who maintain the taxonomy and tracking plans.              |

Consistent naming makes it clear who belongs in the group, and the content and features they can access.

#### Keep membership manageable

Think of groups as access blueprints. Each one should have a clear purpose, ownership, and lifecycle management.

* Try to keep your groups to between 10 and 50 members.  
* Split groups when their project roles or responsibilities diverge. For example, `Experimentation – Engineer – Android App` or `Experimentation – Engineer – iOS App`.  
* Avoid catchall groups like `All Analysts` or `Marketing Team`. They can create confusion, and overexpose parts of your Amplitude environment.