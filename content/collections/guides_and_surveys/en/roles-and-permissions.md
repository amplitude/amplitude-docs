---
id: b0118c93-d3b3-41eb-80fd-f37a53b03340
blueprint: guides_and_survey
title: 'Roles and Permissions'
---
Guides and Surveys permissions enable you to override a user's base level Amplitude [role](/docs/admin/account-management/user-roles-permissions) to grant a different level of access specifically for Guides and Surveys.

| Guides and Surveys role | Access                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| No access               | Can't view the Guides and Surveys section.                                                                   |
| Viewer                  | Can view Guides and Surveys, but can't edit or run experiments.                                              |
| Member                  | Can edit draft Guides and Surveys. Can't publish or edit published guides or surveys. Can't run experiments. |
| Manager                 | Full access to Guides and Surveys.                                                                           |
| Administrator           | Full access to Guides and Surveys.                                                                           |

To update a user's access to Guides and Surveys:

1. Navigate to *Guides and Surveys > Permissions*. A list of your organization's users appears.
2. Select one or more users, then click **Manage Project Access**.
3. If your organization has more than one project, select the individual projects for which you need to update the user's role.
4. Select the update role on a per-project basis.

{{partial:admonition type="note" heading="Role-based Access Controls (RBAC)"}}
For Enterprise organizations with Role-based Access Controls (RBAC) enabled, review the available [Guides & Surveys Roles and Permissions](/docs/admin/account-management/role-based-access-controls-rbac#rbac-permission-reference). 
{{/partial:admonition}}