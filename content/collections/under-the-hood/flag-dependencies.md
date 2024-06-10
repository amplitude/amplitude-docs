---
id: ccca14e2-fca6-4932-902f-5cac8f528c9a
blueprint: under-the-hood
title: 'Flag Dependencies'
landing: false
source: 'https://www.docs.developers.amplitude.com/experiment/general/flag-dependencies/'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716926567
---
Flag dependencies define relationships between flags to ensure evaluation order. The result of each flag's evaluation is then passed to all subsequent evaluations to decide if dependent flags should [evaluate](/docs/experiment/implementation#flag-dependencies) based on the result of the dependency.

Flag dependencies are currently used to implement mutual exclusion and holdout groups.

## Mutual exclusion groups

![Mutual exclusion group](statamic://asset::help_center_conversions::experiment/mutex-group.drawio.png)

A mutual exclusion group ensures that, on evaluation, at most one of the experiments within the group is assigned. In Amplitude Experiment, a mutual exclusion group defines multiple slots, each with a percentage of traffic allocated to that slot. The mutual exclusion group is actually just a flag with a variant for each slot. Experiments in the group add a dependency on one or more slots (variants) of the mutual exclusion group flag.

The variant result of a mutual exclusion group's evaluation isn't returned and not assigned as a user property.

For more information, see [Set up and run mutually exclusive experiments
](/docs/experiment/advanced-techniques/mutually-exclusive-experiments)

## Holdout groups

![](statamic://asset::help_center_conversions::experiment/holdout-group.drawio.png)

A holdout group withholds a percentage of traffic from a group of experiments, allowing measurement of the long-term and combined impact of multiple experiments. In Amplitude Experiment, a holdout group is implemented using a flag with two variants: `holdout` and `on`, where the `holdout` variant is allocated the holdout percentage defined on creation. Experiments in the group depend on the holdout group's variant `on`.

The variant result of a holdout group's evaluation isn't returned but is assigned as a user property to enable holdout analysis.

For more information, see [Holdout Groups](/docs/experiment/advanced-techniques/holdout-groups-exclude-users)
## Local evaluation support

Flag dependencies (mutual exclusion and holdout groups) is only supported after certain version of SDKs.

{{partial:admonition type="warning" heading="Older local evaluation SDK versions"}}
Prior local evaluation SDK versions don't consider mutual exclusion or holdout groups at all. In other words, **two experiments in a mutual exclusion group evaluated with an old local evaluation SDK version aren't mutually exclusive**.
{{/partial:admonition}}

| SDK | Local Evaluation Flag Dependencies Support |
| --- | --- |
| [:material-nodejs: Node.js](/docs/sdks/experiment/experiment-node-js) | `1.4.0+` |
| [:material-language-ruby: Ruby](/docs/sdks/experiment/experiment-ruby) | `1.1.0+` |
| [:material-language-java: JVM](/docs/sdks/experiment/experiment-jvm) | `1.1.0+` |
| [:fontawesome-brands-golang: Go](/docs/sdks/experiment/experiment-go) | `1.1.0+` |
| [:material-language-python: Python](/docs/sdks/experiment/experiment-python) | `1.1.0+` |