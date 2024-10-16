---
id: ccca14e2-fca6-4932-902f-5cac8f528c9a
blueprint: under-the-hood
title: 'Flag Dependencies'
landing: false
source: 'https://www.docs.developers.amplitude.com/experiment/general/flag-dependencies/'
updated_by: 924ab613-3300-4c23-b6d6-2030761a8ea7
updated_at: 1718742410
---
Flag dependencies define relationships between flags to ensure evaluation order. The result of each flag's evaluation is then passed to all subsequent evaluations to decide if dependent flags should [evaluate](/docs/feature-experiment/implementation#flag-dependencies) based on the result of the dependency.

Flag dependencies are used to implement:

- [Flag prerequisites](/docs/feature-experiment/advanced-techniques/flag-prerequisites)
- [Mutual exclusion groups](/docs/feature-experiment/advanced-techniques/mutually-exclusive-experiments)
- [Holdout groups](/docs/feature-experiment/advanced-techniques/holdout-groups-exclude-users)

## Flag prerequisites

![Flag prerequisites](/docs/output/img/experiment/release-group.drawio.svg)

*Available for flags and experiments*

Flag prerequisites is a generic implementation of flag dependencies to allow any flags or experiments to depend on any other flags or experiments. Evaluation of the prerequisites can check specific variants or target users who weren't included in the prerequisite flag or experiment.

Use flag prerequisites to:

- Actively develop large feature releases with many developers and teams.
- Build provisioning for users to primary SKUs with add-ons.
- Simplifying complex feature flag logic in code.
- Build complex hierarchies of mutually exclusive experiments which start at different times

For more information, see [Flag Prerequisites](/docs/feature-experiment/advanced-techniques/flag-prerequisites)

## Mutual exclusion groups

![Mutual exclusion group](statamic://asset::help_center_conversions::experiment/mutex-group.drawio.png)

*Available for experiments only*

A mutual exclusion group ensures that, on evaluation, at most one of the experiments within the group is assigned. In Amplitude Experiment, a mutual exclusion group defines multiple slots, each with a percentage of traffic allocated to that slot. The mutual exclusion group is actually just a flag with a variant for each slot. Experiments in the group add a dependency on one or more slots (variants) of the mutual exclusion group flag.

The variant result of a mutual exclusion group's evaluation isn't returned and not assigned as a user property.

For more information, see [Set up and run mutually exclusive experiments](/docs/feature-experiment/advanced-techniques/mutually-exclusive-experiments)

## Holdout groups

![](statamic://asset::help_center_conversions::experiment/holdout-group.drawio.png)

*Available for experiments only*

A holdout group withholds a percentage of traffic from a group of experiments, allowing measurement of the long-term and combined impact of multiple experiments. Amplitude Experiment implements a holdout group using a flag with two variants: `holdout` and `on`, where the `holdout` variant is allocated the holdout percentage defined on creation. Experiments in the group depend on the holdout group's variant `on`.

The variant result of a holdout group's evaluation isn't returned but is assigned as a user property to enable holdout analysis.

For more information, see [Holdout Groups](/docs/feature-experiment/advanced-techniques/holdout-groups-exclude-users)

## Local evaluation support

Flag dependencies (mutual exclusion and holdout groups) is only supported after certain version of SDKs.

{{partial:admonition type="warning" heading="Older local evaluation SDK versions"}}
Prior local evaluation SDK versions don't consider mutual exclusion or holdout groups at all. In other words, **two experiments in a mutual exclusion group evaluated with an old local evaluation SDK version aren't mutually exclusive**.
{{/partial:admonition}}

| SDK | Local Evaluation Flag Dependencies Support |
| --- | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) | `1.4.0+` |
| [Ruby](/docs/sdks/experiment-sdks/experiment-ruby) | `1.1.0+` |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) | `1.1.0+` |
| [Go](/docs/sdks/experiment-sdks/experiment-go) | `1.1.0+` |
| [Python](/docs/sdks/experiment-sdks/experiment-python) | `1.1.0+` |
| [PHP](/docs/sdks/experiment-sdks/experiment-php) | `1.0.0+` |
