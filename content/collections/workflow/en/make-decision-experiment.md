---
id: 7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d
blueprint: workflow
title: 'Make a decision on your experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/360061687611-Test-and-launch-your-experiment'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714517033
---
After your experiment reaches statistical significance or its end date, make a decision about what to do next. This article covers how to end your experiment and the options available to you.

## End your experiment

When you want to end the experiment, click **Complete Experiment**. End the experiment when you reach the experiment's end date or when the experiment reaches statistical significance.

From there, you can do one of the following:

* **Roll out** the winning variant.
* **Roll back** everything and return to a pre-experiment state.
* **Continue** the experiment.

You can always revisit this decision after you've made it.

## When your experiment ends

When you complete your experiment, Amplitude stops collecting new data for analysis. The experiment remains visible in your experiment list, but it no longer assigns new users to variants. Historical data and analysis remain available for review.

If you roll out or roll back your experiment, Amplitude applies the changes you select. If you choose to continue the experiment, it remains active with the new end date you specify.

### Roll out variants

If you want to roll out the winning variant to all users, Amplitude:

* Sets the rollout percentage to 100%.
* Changes the distribution weight of the variant you roll out to 100 for the winning variant and 0 for all other variants.
* Disables [sticky bucketing](/docs/feature-experiment/advanced-techniques/sticky-bucketing) (sets it to `false`).

If you roll out your experiment to a custom percentage of users, the automatic changes listed above don't occur. You must apply changes manually after confirming your rollout decision.

You can also roll out to "only the targeted users." This option helps avoid situations that generalize your experiment's results. For example: You target users in the United States and find a 5% improvement in your results. These results don't mean that if you roll out to all users, there is a lift of 5% outside of the United States. Sometimes, you may experience a 5% lift for U.S users but find a -2% lift for all other users.

### Roll back an experiment

If you roll back your experiment, Amplitude:

* Turns the flag off.
* Sets percentage rollouts to 0%.

### Continue your experiment

If you want to continue running your experiment, enter a new end date to gather more information and click **Start Experiment**.

If you need to restart your experiment to gather fresh results (for example, if you had instrumentation issues that affected data quality), [create a new experiment run](/docs/feature-experiment/troubleshooting/new-experiment-run). Creating a new run excludes previous user data from monitoring and analysis.

## Clean up feature flags

After you make a decision on your experiment, clean up your feature flags to avoid unnecessary overhead and potential confusion.

### Deactivate or archive your experiment

After you roll out, roll back, or decide to continue your experiment, deactivate or archive it in Amplitude. This removes unnecessary logic and prevents accidental reactivation or analysis confusion.

To deactivate or archive your experiment:

1. Navigate to your experiment in Amplitude Experiment.
2. Click the menu next to **Complete Experiment** or **Turn off flag**.
3. Select **Archive** to archive the experiment.

Archived experiments are visible in your Experiment List but are marked as archived. You can unarchive them if needed.

### Remove experiment code

If you roll out the winning variant, work with your engineering team to implement the winning experience directly in your production code base. This removes the need to keep the experiment active with 100% traffic allocation to the winning variant.

After your engineering team implements the chosen variant in code, you can remove the experiment logic from your codebase. This reduces technical debt and improves performance.

{{partial:admonition type="tip" heading="Use feature flags for ongoing control"}}
If your change requires the ability to rollback or an incremental rollout, use a [feature flag](/docs/feature-experiment/workflow/feature-flag-rollouts) instead of keeping the experiment active. Feature flags enable ongoing control without the overhead required to support experiment logic and metadata.
{{/partial:admonition}}
