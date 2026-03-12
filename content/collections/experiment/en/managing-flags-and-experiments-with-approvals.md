---
id: c7210fe3-77ed-43ee-9f76-7ad20736c439
blueprint: experiment
title: 'Managing flags and experiments with approvals'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1759851028
---
Improve the governance of your experimentation program and decrease the risk of unintended changes by requiring approvals for critical changes to experiment configuration.

Experiment Approvals is only available to Growth and Enterprise customers.

## Set up approvals

Turn on approvals by going to *Organization Settings > Experiment > Approvals*.

Only users with manager or admin roles can modify approvals settings.

Add the projects that require approvals.

For each project, specify one of the following options:

- **Peer approvals**: Any user with access can respond to pending approval requests.
- **Specific approvers**: Only the designated users can respond to pending approval requests.

Admin users can also respond to pending approvals.

## Request and respond to approvals

### Require approvals to activate flags and experiments

After approvals are enabled for a project, follow this approval process:

1. When starting or scheduling an experiment, or activating or scheduling a feature flag, the requestor selects one or more approvers to notify.
2. The experiment displays a "Pending Approval" status until Amplitude approves it.
3. Approvers can review the experiment and either approve or reject the requested changes.
4. The approval or rejection automatically notifies the original requestor.

While approval is pending, users can make additional changes to the flag or experiment configuration, enter or exit testing mode, or cancel the request at any time.

When a scheduled flag or experiment gains approval, Amplitude considers it live and requires approvals for critical changes.

### Require approvals for critical changes to live flags and experiments

When a flag or experiment is active, certain updates also require approval:

| Field | Type of change |
| --- | --- |
| Target segments | Adding and removing segments, or modifying conditions or bucketing. |
| Variants | Any changes, including adding, renaming, or removing variants. |
| Variant distribution | Any changes. |
| Exposure event | Any changes. |
| Bucketing salt | Any changes. |
| Sticky bucketing | Enabling or disabling. |

When reviewing these approval requests, users can view the full list of changes in the approval banner.

When approvals are pending, the flag or experiment is locked. This prevents users from making other changes until the previous approval request resolves or is cancelled.
