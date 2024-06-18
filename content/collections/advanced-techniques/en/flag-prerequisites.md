---
id: 18d1ed19-14ba-4e8a-bd27-3774f931f02a
blueprint: advanced-technique
title: 'Flag Prerequisites'
exclude_from_sitemap: false
updated_by: 924ab613-3300-4c23-b6d6-2030761a8ea7
updated_at: 1718742008
---
As you are running new experiments or rolling out new feature flags, you may have features that are only relevant to users if another feature has been enabled for them. You may want to make sure that those dependencies are evaluated first and then the results of that are used in the evaluation of your flag or experiment.

Amplitude Experiment allows you to create dependencies for your flags and experiments on prerequisite flags or experiments.

### Feature availability

This feature is available to users on **Enterprise plans** who have **purchased Amplitude Experiment**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Configuring flag prerequisites 

Flag prerequisites are configured in the _Dependencies card_, which is found below the _Overview card_ for experiments and below the _Settings card_ for flags. 

For a given flag or experiment, this card provides a summary of all flag dependencies including its prerequisite flags, experiments, mutual exclusion, and holdout groups as well as a list of the flags and experiments that are dependent on it.

1. To configure new prerequisites, click the edit icon.
2. In the Dependencies edit drawer, you can click _Add Dependency_ to add a new prerequisite flag or experiment.
3. You will first select the flag or experiment you wish to create the dependency on.

{{partial:admonition type='note'}}
Flags and experiments are eligible to be used as a prerequisite if:
- They are in the same project.
- They have compatible evaluation modes. Local evaluation mode flags and experiments can only have local evaluation mode prerequisites. Remote evaluation mode flags and experiments can have both remote and local prerequisites.

You cannot add a prerequisite that would cause a circular dependency loop.
{{/partial:admonition}}

4. Then, you will select the variants that you want to be dependent on. _Off_ is a special value that represents when users were not included in the prerequisite flag or experiment.
5. To finish adding the dependency, click _Save_.

## Workflow considerations

Before activating your flag or starting your experiment, you will want to make sure that prerequisite flags are active and variant assignment is working as intended. You will be unable to start the experiment until prerequisite flags and experiments are activated.

Additionally, flags and experiments with dependents, you will be prevented from taking certain actions:
- Deleting a variant or changing the variant key of a variant that another flag or experiment is dependent on.
- Archiving that flag or experiment.

## Example with evaluation details

This example will give you more information about how evaluation works when there are prerequisite flags.

Example scenario: I want to ensure that my new feature flag (Flag-B) is rolled out to users who have seen another feature (Flag-A). In Flag-B, I have added a dependency for the _on_ variant of Flag-A and activated both flags.

When users are evaluated for Flag-B:

1. First, we check if the user is in Flag-B’s testers.
- If the user is a member of the testers, the configured variant is served to the user.
2. The user is then evaluated for dependencies, in this case: Flag-A. 
- If the user does not receive the _on_ variant for Flag-A, the user is excluded from Flag-B.
3. The user will then be evaluated for Flag-B.

Note that the targeting for Flag-B will determine what variant (if any) the user receives, and the flag dependency on Flag-A has no effect at this point.