---
id: 18d1ed19-14ba-4e8a-bd27-3774f931f02a
blueprint: advanced-technique
title: 'Flag Prerequisites'
exclude_from_sitemap: false
updated_by: 04dfbed9-a0fd-4d6a-bf64-d31bebb05bdc
updated_at: 1719252081
---
As you run new experiments or roll out new feature flags, you may have features that are only relevant to users if another feature has been enabled for them. You may want to evaluate those dependencies first and then use those results in the evaluation of your flag or experiment.

Amplitude Experiment allows you to create dependencies for your flags and experiments on prerequisite flags or experiments.

### Feature availability

This feature is available to users on **Enterprise plans** who have **purchased Amplitude Experiment**. See the [pricing page](https://amplitude.com/pricing) for more details.

## Configuring flag prerequisites

Configure flag prerequisites in the _Dependencies card_, which you can find below the _Overview card_ for experiments and below the _Settings card_ for flags.

For a given flag or experiment, this card provides a summary of all flag dependencies including its prerequisite flags, experiments, mutual exclusion, and holdout groups as well as a list of the flags and experiments that are dependent on it.

1. To configure new prerequisites, click the edit icon.
2. In the Dependencies edit drawer, click _Add Dependency_ to add a new prerequisite flag or experiment.
3. Select the flag or experiment you wish to create the dependency on.

	{{partial:admonition type='note'}}
	Flags and experiments are eligible to be used as a prerequisite if:

	- They're in the same project.
	- They have compatible evaluation modes. Local evaluation mode flags and experiments can only have local evaluation mode prerequisites. Remote evaluation mode flags and experiments can have both remote and local prerequisites.

	You can't add a prerequisite that would cause a circular dependency loop.
	{{/partial:admonition}}

1. Then, select the variants that you want to be dependent on. _Off_ is a special value that represents when users weren't included in the prerequisite flag or experiment.
2. To finish adding the dependency, click _Save_.

## Workflow considerations

Before you activate a flag or start an experiment, ensure that prerequisite flags are active and variant assignment works as intended. You can't start the experiment until prerequisite flags and activate experiments.

For flags and experiments with dependents, Amplitude prevents the following actions:

- Deleting a variant or changing the variant key of a variant that another flag or experiment is dependent on.
- Archiving that flag or experiment.

## Example with evaluation details

This example provides you more information about how evaluation works when there are prerequisite flags.

Example scenario: I want to ensure that my new feature flag (Flag-B) rolls out to users who have seen another feature (Flag-A). In Flag-B, I have added a dependency for the _on_ variant of Flag-A and activated both flags.

When Amplitude evaluates users for Flag-B:

1. First, check if the user is in Flag-B’s testers.

   - If the user is a member of the testers, serve the configured variant to the user.
 
2. Evaluate the user for dependencies, in this case: Flag-A. 

   - If the user doesn't receive the _on_ variant for Flag-A, Amplitude excludes them from Flag-B.

3. Evaluate the user for Flag-B.

Targeting for Flag-B determines what variant (if any) the user receives, and the flag dependency on Flag-A has no effect at this point.

## Common use cases

Flag prerequisites are extremely flexible and have many use cases. That said, here are some common examples.

### Release groups

Use flag prerequisites to build a primary feature with multiple sub-features. Sub-features require the primary feature to be `on`, unless a user is individually included as a tester in one of the sub-features. Targeting and bucketing applied to the primary feature are effectively applied to all sub-features which list the primary feature as a prerequisite.

Common use cases for release groups are:

- Actively developing large feature releases with many developers and teams.
- Provisioning users to primary SKUs with add-ons.
- Simplifying feature flag logic in code.

![Diagram of example release group.](/docs/output/img/experiment/release-group.drawio.svg)

This example contains a `primary-feature` flag and `sub-feature` flags which list the primary feature as a prerequisite.

The `primary-feature` flag targets all users where user property `premium` is `true` with 100% allocation. Therefore, sub-features only evaluate if the user has the required user property, and meet the sub-feature's criteria -- unless the user is individually included in the sub-feature's testers section.

- The `sub-feature-1` flag contains an extra targeting criteria for users where the user property `beta` is `true`. To be assigned `sub-feature-1` a user have the `premium` and `beta` user properties equal to `true`.
- The `sub-feature-2` flag allocates 100% of users. All users where the `premium` user property is `true` is assigned.
- The `sub-feature-3` flag allocates 0% of users. No users are assigned to `sub-feature-3`, even if the `premium` user property is `true`.

### Chained mutual exclusion groups

Use flag prerequisites to build complex hierarchies of mutually exclusive experiments which start at different times. Dependent experiments list a prerequisite on an existing active experiment evaluating to `off`. This effectively targets all users who were not allocated to the existing experiment. You main continue this chain to add more mutually exclusive experiments if the previous experiment does not all users.

![Diagram of example mutual exclusion group](/docs/output/img/experiment/advanced-mutex-group.drawio.svg)

In this example, `experiment-1` is currently running, and we want to run another experiment, `experiment-2`, which is mutually exclusive to `experiment-1`.

- The `experiment-1` experiment allocates 20% of users 50/50 control/treatment.
- The `experiment-2` experiment lists `experiment-1` as a prerequisite, and allocates 100% of users 50/50 control/treatment.

Overall, 20% of users are assigned to `experiment-1` and the remaining 80% are assigned to `experiment-2`. No users are assigned variants for both `experiment-1` and `experiment-2`, unless they are included as a tester.
