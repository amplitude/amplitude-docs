---
id: f4980c6a-e723-4b23-aacb-8cea42acd406
blueprint: experiment_feature_flag
title: 'Flag Prerequisites'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1741626367
---
When running experiments or rolling out feature flags, some features may only be relevant if another feature is enabled. You can evaluate these dependencies first and use the results in your flag or experiment evaluation.

Amplitude Experiment lets you create dependencies based on prerequisite flags or experiments.

### Feature availability

This feature is available to Enterprise plan users who have purchased Amplitude Experiment. See the [pricing page](https://amplitude.com/pricing) for more details.

## Configuring flag prerequisites

You can configure flag prerequisites in the Dependencies card, located below the Overview card for experiments and below the Settings card for flags.

This card provides a summary of all flag dependencies, including prerequisite flags, experiments, mutual exclusions, and holdout groups, as well as a list of flags and experiments dependent on it.

1. To configure new prerequisites, click Edit.
2. In the Dependencies edit drawer, click _Add Dependency_ to add a new prerequisite flag or experiment.
3. Select the flag or experiment you want to create the dependency on.

	{{partial:admonition type='note'}}
	Flags and experiments are eligible to be used as a prerequisite if:

	- They're in the same project.
	- They've compatible evaluation modes. Local evaluation mode flags and experiments can only have local evaluation mode prerequisites, while remote evaluation mode flags and experiments can have both remote and local prerequisites.

	You can’t add a prerequisite that are prerequisites of each other.
	{{/partial:admonition}}

1. Select the variants that you want to be dependent on.`off` is a special value that represents when users weren't included in the prerequisite flag or experiment.
2. To finish adding the dependency, select Save.

## Workflow considerations

Before you activate a flag or start an experiment, ensure that prerequisite flags are active and variant assignment works as intended. You need to activate prerequisite flags and experiments before starting the experiment.

For flags and experiments with dependents, Amplitude prevents the following actions:

- Deleting a variant or changing the variant key of a variant that another flag or experiment depends on.

- Archiving that flag or experiment.

## Example with evaluation details

This example provides more information about how evaluation works when there are prerequisite flags.

Example scenario: You want to ensure that my new feature flag (Flag-B) rolls out to users who have seen another feature (Flag-A). In Flag-B, I’ve added a dependency for the `on` variant of Flag-A and activated both flags.

When Amplitude evaluates users for Flag-B:

1. First, check if the user is in Flag-B’s testers.

   - If the user is a member of the testers, serve the configured variant to the user.
 
2. Evaluate the user for dependencies, in this case: Flag-A. 

   - If the user doesn't receive the `on` variant for Flag-A, Amplitude excludes them from Flag-B.

3. Evaluate the user for Flag-B.

Targeting for Flag-B determines what variant (if any) the user receives, and the flag dependency on Flag-A has no effect at this point.

## Common use cases

Flag prerequisites are extremely flexible and have many use cases. That said, here are some common examples.

### Release groups

Use flag prerequisites to build a primary feature with multiple sub-features. Sub-features require the primary feature to be `on`, unless a you include an individual user as a tester in one of the sub-features. Targeting and bucketing options that apply to the primary feature apply to all sub-features that list the primary feature as a prerequisite.

Common use cases for release groups include:

- Actively developing large feature releases with many developers and teams.
- Provisioning users to primary SKUs with add-ons.
- Simplifying feature flag logic in the code.

![Diagram of example release group.](/docs/output/img/experiment/release-group.drawio.svg)

This example contains a `primary-feature` flag and `sub-feature` flags that list the primary feature as a prerequisite.

The `primary-feature` flag targets all users where the user property premium is true with 100% allocation. Therefore, `sub-features` are only evaluated if the user has the required user property and meets the sub-feature's criteria—unless the user is individually included in the sub-feature's testers section.

- The `sub-feature-1` flag includes additional targeting criteria for users where the user property `beta` is `true`. A user must have both the `premium` and `beta` user properties set to true before they can set to `sub-feature-1`.
- The `sub-feature-2` flag allocates 100% of users. All users with the `premium` user property set to `true` receive the flag.
- The `sub-feature-3` flag allocates 0% of users. No users have `sub-feature-3`, even if the `premium` user property is `true`.

### Chained mutual exclusion groups

Use flag prerequisites to build complex hierarchies of mutually exclusive experiments that start at different times. Dependent experiments list a prerequisite on an existing active experiment evaluating to off. This effectively targets all users who weren’t allocated to the existing experiment. Continue this chain to add more mutually exclusive experiments if the previous experiment doesn't allow all users.

![Diagram of example mutual exclusion group](/docs/output/img/experiment/advanced-mutex-group.drawio.svg)

In this example, experiment-1 is running, and experiment-2, which is mutually exclusive to experiment-1, is set to run.

- The `experiment-1` experiment allocates 20% of users to a 50/50 control/treatment split.
- The `experiment-2` experiment lists `experiment-1` as a prerequisite and allocates 100% of users to a 50/50 control/treatment split.

The experiment assigns 20% of users to `experiment-1` and assigns the remaining 80% to `experiment-2`. The experiment assigns no users to variants for either `experiment-1` or `experiment-2`, unless they're testers.