---
id: 18d1ed19-14ba-4e8a-bd27-3774f931f02a
blueprint: advanced-technique
title: 'Flag Prerequisites'
exclude_from_sitemap: false
updated_by: 04dfbed9-a0fd-4d6a-bf64-d31bebb05bdc
updated_at: 1719252081
---
When running experiments or rolling out feature flags, some features may only be relevant if another feature is enabled. You can evaluate these dependencies first and use the results in your flag or experiment evaluation.

Amplitude Experiment lets you create dependencies based on prerequisite flags or experiments.

### Feature availability

This feature is available to Enterprise plan users who have purchased Amplitude Experiment. See the [pricing page](https://amplitude.com/pricing) for more details.

## Configuring flag prerequisites

You can configure flag prerequisites in the Dependencies card, located below the Overview card for experiments and below the Settings card for flags.

This card provides a summary of all flag dependencies, including prerequisite flags, experiments, mutual exclusions, and holdout groups, as well as a list of flags and experiments dependent on it.

1. To configure new prerequisites, select the edit icon.
2. In the Dependencies edit drawer, select _Add Dependency_ to add a new prerequisite flag or experiment.
3. Select the flag or experiment you want to create the dependency on.

	{{partial:admonition type='note'}}
	Flags and experiments are eligible to be used as a prerequisite if:

	- They're in the same project.
	- They've compatible evaluation modes. Local evaluation mode flags and experiments can only have local evaluation mode prerequisites, while remote evaluation mode flags and experiments can have both remote and local prerequisites.

	You can’t add a prerequisite that would create a circular dependency loop.
	{{/partial:admonition}}

1. Then, select the variants that you want to be dependent on. Off is a special value that represents when users weren't included in the prerequisite flag or experiment.
2. To finish adding the dependency, select Save.

## Workflow considerations

Before you activate a flag or start an experiment, ensure that prerequisite flags are active and variant assignment works as intended. You can't start the experiment until prerequisite flags and experiments are activated.

For flags and experiments with dependents, Amplitude prevents the following actions:

- Deleting a variant or changing the variant key of a variant that another flag or experiment depends on.

- Archiving that flag or experiment.

## Example with evaluation details

This example provides more information about how evaluation works when there are prerequisite flags.

Example scenario: I want to ensure that my new feature flag (Flag-B) rolls out to users who have seen another feature (Flag-A). In Flag-B, I’ve added a dependency for the on variant of Flag-A and activated both flags.

When Amplitude evaluates users for Flag-B:

1. First, check if the user is in Flag-B’s testers.

   - If the user is a member of the testers, serve the configured variant to the user.
 
2. Evaluate the user for dependencies, in this case: Flag-A. 

   - If the user doesn't receive the on variant for Flag-A, Amplitude excludes them from Flag-B.

3. Evaluate the user for Flag-B.

Targeting for Flag-B determines what variant (if any) the user receives, and the flag dependency on Flag-A has no effect at this point.

## Common use cases

Flag prerequisites are extremely flexible and have many use cases. That said, here are some common examples.

### Release groups

Use flag prerequisites to build a primary feature with multiple sub-features. Sub-features require the primary feature to be on, unless a user is individually included as a tester in one of the sub-features. Targeting and bucketing applied to the primary feature are also applied to all sub-features that list the primary feature as a prerequisite.

Common use cases for release groups include:

- Actively developing large feature releases with many developers and teams.
- Provisioning users to primary SKUs with add-ons.
- Simplifying feature flag logic in the code.

![Diagram of example release group.](/docs/output/img/experiment/release-group.drawio.svg)

This example contains a `primary-feature` flag and `sub-feature` flags which list the primary feature as a prerequisite.

The `primary-feature` flag targets all users where user property `premium` is `true` with 100% allocation. Therefore, sub-features only evaluate if the user has the required user property, and meet the sub-feature's criteria -- unless the user is individually included in the sub-feature's testers section.

- The `sub-feature-1` flag contains an extra targeting criteria for users where the user property `beta` is `true`. To be assigned `sub-feature-1` a user have the `premium` and `beta` user properties equal to `true`.
- The `sub-feature-2` flag allocates 100% of users. All users where the `premium` user property is `true` is assigned.
- The `sub-feature-3` flag allocates 0% of users. No users are assigned to `sub-feature-3`, even if the `premium` user property is `true`.

### Chained mutual exclusion groups

Use flag prerequisites to build complex hierarchies of mutually exclusive experiments which start at different times. Dependent experiments list a prerequisite on an existing active experiment evaluating to `off`. This effectively targets all users who weren't allocated to the existing experiment. Continue this chain to add more mutually exclusive experiments if the previous experiment doesn't all users.

![Diagram of example mutual exclusion group](/docs/output/img/experiment/advanced-mutex-group.drawio.svg)

In this example, `experiment-1` is running, and `experiment-2`, which is mutually exclusive to `experiment-1`, is set to run.

- The `experiment-1` experiment allocates 20% of users 50/50 control/treatment.
- The `experiment-2` experiment lists `experiment-1` as a prerequisite, and allocates 100% of users 50/50 control/treatment.

Experiment assigns 20% of users to `experiment-1` and the assigns the remaining 80% to `experiment-2`. Experiment assigns no users variants for both `experiment-1` and `experiment-2`, unless they're a tester.
