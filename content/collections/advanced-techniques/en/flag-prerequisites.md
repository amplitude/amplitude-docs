---
id: 18d1ed19-14ba-4e8a-bd27-3774f931f02a
blueprint: advanced-technique
title: 'Flag Prerequisites'
exclude_from_sitemap: false
updated_by: 04dfbed9-a0fd-4d6a-bf64-d31bebb05bdc
updated_at: 1719252081
---
As you run new experiments or roll out new feature flags, you may have features that are only relevant to users if another feature is also enabled. You may want to evaluate those dependencies first and then use those results in the evaluation of your flag or experiment.

Experiment lets you create dependencies for your flags and experiments on prerequisite flags or experiments.

### Feature availability

This feature is available to users on Enterprise plans. Go to the [pricing page](https://amplitude.com/pricing) for more details.

## Configuring flag prerequisites

Configure flag prerequisites in the Dependencies card for the feature flag. Go to *Experiment > Feature Flags > your feature flag* and then scrolling to the Dependencies card.

This card provides a summary of all dependencies for that feature flag including its prerequisite flags, experiments, mutual exclusions, and holdout groups. Also included is a list of the flags and experiments that are dependent on it.

1. To configure new prerequisites, click the **edit** icon.
2. Click **Add Dependency** to add a new prerequisite flag or experiment.
3. Click **Select a flag or experiment** and then select the item you want. 

	{{partial:admonition type='note'}}
	Flags and experiments are eligible as a prerequisite if:

	- They're in the same project.
	- They have compatible evaluation modes. Local evaluation mode flags and experiments can only have local evaluation mode prerequisites. Remote evaluation mode flags and experiments can have both remote and local prerequisites.

	You can't add a prerequisite that would cause a circular dependency loop.
	{{/partial:admonition}}

4. Select the variants that you want to be dependent on. There is a special variant, "Off"  that represents when users aren't included in the prerequisite flag or experiment.
5. Click **Save**.

## Workflow considerations

Before you activate a flag or start an experiment, ensure that prerequisite flags are active and that your variant assignment works as expected. You can't start the experiment until your prerequisite flags and experiments are active.

For flags and experiments with dependents, Amplitude prevents the following actions:

- Deleting a variant or changing the variant key of a variant if another another flag or experiment depends on it.
- Archiving that flag or experiment.

## Example with evaluation details

This example provides you more information about how evaluation works when there are prerequisite flags.

For example: You want to ensure that your new feature flag (Flag-B) rolls out to users who have first seen a different feature (Flag-A). In Flag-B, you have added a dependency for the `On` variant of Flag-A and activated both flags.

When Amplitude evaluates users for Flag-B:

1. First, it checks if the user is in Flag-B’s cohort.

   - If the user is a member of the cohort, it serves the configured variant to the user.
 
2. Evaluates the user for dependencies, in this case: Flag-A. 

   - If the user doesn't receive the `On` variant for Flag-A, Amplitude excludes them from Flag-B.

3. Evaluates the user for Flag-B.

Targeting for Flag-B determines what variant (if any) the user receives. The flag dependency on Flag-A has no effect at this point.

## Common use cases

Flag prerequisites are flexible and have many use cases. Here are some common examples:

### Release groups

Use flag prerequisites to build a primary feature with multiple sub-features. Sub-features require the primary feature to be `On` unless a user is individually included as part of the cohort in one of the sub-features. Targeting and bucketing applied to the primary feature are also applied to all sub-features which list the primary feature as a prerequisite. Otherwise, there would be a mismatch between the users receiving the primary and the sub-features.

Common use cases for release groups are:

- Actively developing large feature releases with many developers and teams.
- Provisioning users to primary SKUs with add-ons.
- Simplifying feature flag logic in code.

![Diagram of example release group.](/docs/output/img/experiment/release-group.drawio.svg)

This example contains a `primary-feature` flag and `sub-feature` flags which list the primary feature as a prerequisite.

The `primary-feature` flag targets all users where user property `premium` is `true` with 100% allocation. Sub-features only evaluate if the user has the required user property and meet the sub-feature's criteria. The only exception is if a user is individually included in the sub-feature. Typically, this only occurs during a testing phase.

- The `sub-feature-1` flag contains an extra targeting criteria for users where the user property `beta` is `true`. To receive `sub-feature-1`, a user must have the `premium` and `beta` user properties equal to `true`.
- The `sub-feature-2` flag allocates 100% of users. All users are assigned to this feature where the `premium` user property is `true`.
- The `sub-feature-3` flag allocates 0% of users. No users are allocated to `sub-feature-3`, even if the `premium` user property is `true`.

### Chained mutual exclusion groups

Use flag prerequisites to build complex hierarchies of mutually exclusive experiments that start at different times. Dependent experiments list a prerequisite on an existing active experiment evaluating to `off`. This targets all users who weren't allocated to the existing experiment. Continue this chain to add more mutually exclusive experiments if the previous experiment doesn't all users.

![Diagram of example mutual exclusion group](/docs/output/img/experiment/advanced-mutex-group.drawio.svg)

In this example, `experiment-1` is running, and `experiment-2`, which is mutually exclusive to `experiment-1`, is set to run at a later time.

- The `experiment-1` experiment allocates 20% of users 50/50 control/treatment.
- The `experiment-2` experiment lists `experiment-1` as a prerequisite, and allocates 100% of users 50/50 control/treatment.

Experiment assigns 20% of users to `experiment-1` and then assigns the remaining 80% to `experiment-2`. Experiment doesn't assign any user variants for both `experiment-1` and `experiment-2`.
