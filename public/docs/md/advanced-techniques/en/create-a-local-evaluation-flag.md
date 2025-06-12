---
id: 517e4c3e-fefb-469c-ae3f-3567188b73bc
published: false
blueprint: advanced-technique
title: 'Create a local evaluation flag'
source: 'https://www.docs.developers.amplitude.com/experiment/guides/create-local-evaluation-flag/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718211686
---
Create a local evaluation flag, or migrate an existing remote evaluation flag to local evaluation.

## Create a local evaluation flag or experiment

1. [Create a flag or experiment](/docs/feature-experiment/workflow/feature-flag-rollouts#create-a-new-flag) as you normally would, but select the **Local** option for the **Evaluation Mode** setting.

	![Create a local evaluation flag](statamic://asset::help_center_conversions::advanced-techniques/local-eval-create-flag-1.png)

2. In your new experiment, set your server-side deployment, configure the allocation (for example, target 100% of users), and activate your flag.

{{partial:admonition type="note" heading=""}}
Your local evaluation experiment is set up and is ready to use a [local evaluation SDK](/docs/feature-experiment/local-evaluation#sdks).
{{/partial:admonition}}

## Migrate an existing remote flag to local evaluation

Change a flags settings and update the bucketing key to transition an existing remote flag to local evaluation mode.

{{partial:admonition type="warning" heading=""}}
Migrating a flag from remote to local evaluation mode changes the bucketing behavior. Before migrating, your flag needs to be inactive. Make sure that all targeting rules abide by the limitations of local evaluation.
{{/partial:admonition}}

1. Change the flag's "Evaluation Mode" setting to "Local" in the Advanced Settings section of the Configure tab.

	![Migrate an existing flag](statamic://asset::help_center_conversions::advanced-techniques/local-eval-migrate-flag-1.png)
   
2. Update the "bucketed by" setting from Amplitude ID to Device ID in each targeted users segment and the "All Other Users" Section.

	![Migrate an existing flag](statamic://asset::help_center_conversions::advanced-techniques/local-eval-migrate-flag-2.png)