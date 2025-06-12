---
id: 9c708cb5-e9b4-464b-9d43-cf5411e43cfe
blueprint: advanced-technique
title: 'Holdout groups: Advanced use cases'
source: 'https://help.amplitude.com/hc/en-us/articles/20085827191963-Holdout-groups-Advanced-use-cases'
this_article_will_help_you:
  - 'Best manage experiments with multiple holdout groups'
  - 'Rollout experiments with holdout groups and mutual exclusion'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714079443
---
This article reviews advanced use cases you may run into while using [holdout groups](/docs/feature-experiment/advanced-techniques/holdout-groups-exclude-users) in Amplitude Experiment. 

## Case 1: Streamline multiple experiments and holdout groups

Adding an experiment to multiple holdout groups may limit an experiment's traffic. This is because each user must be evaluated for each holdout group they belong to.

For example, imagine two holdout groups: 

* **Holdout group 1**: This group contains **experiment A** and **experiment B**, with a holdout percentage of 5%.
* **Holdout group 2**: The second group contains **experiment A** and **experiment C**, also with a holdout percentage of 5%.

Since **experiment A** is part of both holdout groups (1 and 2), it will receive the majority of the total traffic: 

0.95 \* 0.95 = 0.9025 (90.25%)

Instead of adding an experiment to multiple holdout groups, create a single group with all the relevant experiments instead. This will allow for a more even distribution of traffic across experiments. 

In the example above, you would create just **one** holdout group containing all three experiments (A, B, and C).

## Case 2: Handle experiments with holdout groups and mutual exclusion

Adding an experiment to a holdout group **and** a mutual exclusion group can also further limit the amount of traffic to the experiment. Each user will be evaluated for both the holdout group **and** the mutual exclusion group.

For example, imagine the following holdout group and mutual exclusion group: 

* **The holdout group** has a holdout percentage of 5% and contains **experiment A**.
* **The mutual exclusion group** has half the traffic directed to **experiment A in slot 1**, with the other half going to **experiment B in slot 2**.

In this scenario, experiment A receives about half of the total traffic:

0.95 \* 0.5 = 0.475 (47.5%)

Using holdout groups with mutual exclusion isn't forbidden, but be cautious of the potential traffic limits as you plan and roll out your experiments. 

Learn more in this [article about mutual exclusion groups](/docs/feature-experiment/advanced-techniques/mutually-exclusive-experiments).