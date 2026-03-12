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

## Setting up approvals

Turn on approvals by going to _Organization Settings > Experiment > Approvals_. 

Only users who have manager or admin roles can modify approvals settings.

Add the individual projects that you would like to require approvals for.

For each project, you can specify one of the following options: 

1. **Peer approvals**: Any users with access can respond to pending approval requests
2. **Specific approvers**: Only the users designated can respond to pending approval requests

Additionally, admin users can respond to pending approvals.

## Requesting and responding to approval requests

### Requiring approvals to activate flags and experiments

After approvals are enabled for a project, Amplitude recommends that you follow this approval process: 

1. When starting or scheduling an experiment or activating or scheduling a feature flag, the requestor selects one or more approver to notify.
2. The experiment displays a “Pending Approval” status until it's approved.
3. Approvers can review the experiment and either approve the requested changes or reject the changes.
4. The approval or rejection automatically notifies the original requestor of the response.

While the approval is pending, users can make additional changes to the flag or experiment configuration, enter or exit testing mode, or cancel the request at any time.

When the scheduled flag or experiment gains approval, the flag or experiment is considered live and requires approvals for critical changes.

### Requiring approvals for critical changes to live flags and experiments

When a flag or experiment is active, certain updates also require approval:

| Field    | Type of Change    |
| --- | --- |
| Target Segments | Adding and removing segments, modifying conditions or bucketing.    |
| Variants | Any changes, including adding, renaming or removing variants.    |
| Variant Distribution | Any changes |
| Exposure Event | Any changes |
| Bucketing Salt | Any changes | 
| Sticky Bucketing | Enabling / Disabling | 

When reviewing these approval requests, users can view the full list of changes in the approval banner.

When approvals are pending, the flag or experiment is locked. This prevents users with access from making other changes until the previous approval request is completed or cancelled.