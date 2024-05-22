---
id: 52e1fdb9-b354-4012-b8de-d378c68cbf26
blueprint: experiment
title: 'App-level user permissions'
source: 'https://help.amplitude.com/hc/en-us/articles/4416438117147-Set-app-level-user-permissions-in-Experiment'
this_article_will_help_you:
  - 'Set user permissions for Amplitude Experiment that are independent of and separate from those used in Amplitude Analytics'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716329073
---
Experiment app-level permissions enable Amplitude admins to manage access to Amplitude Experiment separately from Amplitude Analytics. Use this when you want to:

* **Prevent** analytics team members from releasing features through Experiment, **and/or**
* **Prevent** product development team members from affecting data taxonomy, or key dashboards and charts in Analytics, **while**
* **Allowing** all team members to maintain higher permission levels in their primary apps, enabling them to do their jobs efficiently and effectively.

{{partial:admonition type='note'}}
 setting app-level user permissions in Experiment is only available to Enterprise customers. 
{{/partial:admonition}}

To set app-level user permissions in Experiment, follow these steps:

1. In Experiment, click *Permissions* in the left-hand sidebar. The Experiment Permissions page will display, with the Joined Users tab open.
2. In the *Search* field, type the name or email of the user you're looking for. Then click the checkbox next to their name. The actions above the table should now be selectable in blue.
3. Click *Manage Project Access* to search for the project where you want to adjust permissions.
4. From the dropdown displaying the current permission level for the selected user, select their updated access level. Then click *Next*.  
  
![manage_project_access_modal.png](/output/img/experiment/manage-project-access-modal-png.png)

5. If you're sure you want to make these changes, click *Submit*.

## Flag-level access controls

{{partial:admonition type='note'}}
This feature is in open beta and is available to users on Enterprise plans only.
{{/partial:admonition}}

With flag-level access controls, you can determine which Amplitude Experiment users can make changes to specific flags or experiments. 

When flag-level access controls are enabled, users in your organization will be unable to save changes to a flag or experiment unless they are specifically designated as an editor for it.

For new flags and experiments, this access will default to prohibiting edits from other users; you will have to manually add any users to the list of those permitted to edit them.

To edit the list of approved editors, navigate to *Permissions > [flag or experiment] > More Actions > Manage Access*. Here, you can add individual users, or specify that the flag is editable by all users in your organization.

However, even after you grant a user editor permissions to your flag, Amplitude Experiment will still check permissions, and that user will still need edit access through their role. For example, if a user is assigned the Viewer role and you add them as an editor to your flag, they will still be unable to save changes until you assign them a role with editing privileges

## Permissions matrix

This table describes the various permissions included with each permission level.

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
|  | **Viewer** | **Member** | **Manager (Project)** | **Admin (Org)** |
| **Experiments and Flags** |  |  |  |  |
| Read | Y | Y | Y | Y |
| Create |  | Y | Y | Y |
| Edit |  | Y | Y | Y |
| Delete |  | Y | Y | Y |
|  |  |  |  |  |
| Targeted Environments | Read | Read/Write | Read/Write | Read/Write |
| Active | Read | Read/Write | Read/Write | Read/Write |
| Variants | Read | Read/Write | Read/Write | Read/Write |
| Allocation | Read | Read/Write | Read/Write | Read/Write |
| Analysis | Read | Read/Write | Read/Write | Read/Write |
| Metrics | Read | Read/Write | Read/Write | Read/Write |
|  |  |  |  |  |
| **Environments** |  |  |  |  |
| Read | Y | Y | Y | Y |
| Create |  | Y | Y | Y |
| Edit |  | Y | Y | Y |
| Delete |  | Y | Y | Y |
|  |  |  |  |  |
| **Mutual Exclusion Groups** |  |  |  |  |
| Read | Y | Y | Y | Y |
| Create |  | Y | Y | Y |
| Edit |  | Y | Y | Y |
| Delete |  | Y | Y | Y |
|  |  |  |  |  |
| **Users** |  |  |  |  |
| Add user to a project |  |  | Y | Y |
| Edit project role |  |  | Y | Y |
| Add user to organization |  |  |  | Y |
| Edit organization role |  |  |  | Y |