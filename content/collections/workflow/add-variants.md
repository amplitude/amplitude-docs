---
id: 50d1c589-2a92-427b-84d0-eb664f55678d
blueprint: workflow
title: 'Add variants to your experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/4405832771995-Add-variants-to-your-experiment'
this_article_will_help_you:
  - 'Create new variants, which will be compared to the control (or baseline)'
  - 'Add additional code to your variants, to create more dynamic user experiences'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714514203
---
The next step in designing your experiment is to **create at least one variant**. Amplitude Experiment will compare your variants with the **control**, which is usually your product’s current user experience. (This way, Amplitude Experiment measures the performance of the variant against a known quantity, the performance of your app as it is today.)

## Add and manage variants

Amplitude Experiment will automatically create your initial variant; by default, it will be named treatment, though you can edit the variant and give it a different name if you prefer.

To add additional variants, follow these steps:

1. Click *+ Add a variant*. The *Create Variant* panel will open.
2. Give your variant a name and a **value**. The value is a string that you’ll use as a **flag** in your codebase.
3. Add a description of the variant. This step is optional, but recommended.
4. Add an optional **payload**. A payload is a JSON object that can dynamically change a variant’s experience without requiring you to write more code.

For example, imagine you’re testing a new splash screen on a marketing webpage. You might get early results that suggest different content might improve the performance of the splash. Instead of going into your codebase and making changes to the variant there, you can just include those changes in a payload, and Amplitude Experiment will implement them automatically.

Paste or type your code into the window. 

5. Click *Apply*.

There is **no limit to the number of variants** you can add to an experiment, but adding too many can [make it harder for your experiment to reach statistical significance](/experiment/advanced-techniques/multiple-hypothesis-testing). Try to keep your experiments limited to a handful of variants, at most.

Amplitude Experiment will always use the first variant listed as the control. You can change this by dragging a different variant to the top of the list. Whichever variant is labeled *A* when your experiment launches will be the control.

## Distribute traffic to your variations

Unless you specify otherwise, Amplitude Experiment will split traffic evenly between your variations. However, you can opt to send more traffic to specific variations by customizing your variant distribution. Click *Customize* and manually set the traffic percentages for each variation. The percentages must add up to 100%.

## Stratified sampling and experiment bias

Sometimes, you may want to allocate traffic differently for each user segment you’ve included:

* Segment 1: Country = USA || 80% treatment, 20% control
* Segment 2: Country = Canada || 50% treatment, 50% control

This can introduce bias into your experiment results. You should generally adhere to **uniform allocation ratios** across all user segments in an experiment. 

Non-uniform allocation ratios often happen inadvertently, when users change their rollouts and variants while an experiment is running.

Amplitude Experiment gives you the option to use stratified sampling (i.e., non-uniform allocation ratios) if you need it. Just switch the *Allow rollout controls per segment* toggle to On. (This option will only be visible if you've selected [*Targeted Users*](/experiment/workflow/define-audience).)

This switch is visible only for experiments, and not for feature flags. It is disabled while your experiment is active.

When you’re ready, click Continue to move on to the rollout phase.

## Rollout percentage

The next step is to set the **rollout percentage** for this experiment. This is the percentage of the users included in the experiment’s user segments who will participate in the experiment. It can be found in the *Rollout* section of the experiment design panel.

Manually enter the percentage of your audience that should be eligible for bucketing into the experiment. If you roll your experiment out to less than 100% of your users, the balance will see your default product experience, and will not be included in any experiment calculations.

Note that Amplitude Experiment evaluates for users included in rule-based user segments before those not covered by a user segment. However, it evaluates for any [individual user or device IDs](https://help.amplitude.com/hc/en-us/articles/360061687131#qa-before-rollout) prior to both. For more information, see [this article](https://www.docs.developers.amplitude.com/experiment/general/evaluation/implementation/).

Next, it's time to [finalize your experiment's statistical settings](/experiment/workflow/finalize-statistical-preferences).