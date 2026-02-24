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
Your experiment needs at least one variant. Experiment compares a variant experience with the control experience, which is usually your product’s current user experience (UX). Experiment measures the performance of the variant against a known quantity: the performance of your app today.

## Adding and managing variants

Experiment creates your initial variant automatically. By default, this variant is named `treatment`. You can edit the variant name if you want to rename the variant to something more descriptive of the experiment you're running. .

##### To add additional variants

1. In the Experiment section, either create a new experiment or open an existing one. 
2. Click **Add a variant**. 
3. Enter a name for your variant and then include a value. By default, the value is a hyphenated (otherwise known as a slug) version of the variant name.

    {{partial:admonition type="tip" heading="Use variant value in your code"}}
    When you implement the experiment on your codebase, use the value of the variant to reference it. Experiment SDKs return variant values, which are all lower case, and don't contain spaces.
    {{/partial:admonition}}

4. Add a description of the variant. Be specific enough so that other people can understand what your experiment is doing.
5. Add an optional **payload**. A payload is a JSON object that can dynamically change a variant’s experience without requiring you to write more code.

    For example, imagine you’re testing a new splash screen on a marketing webpage. You might get early results that suggest different content might improve the performance of the splash. Instead of going into your codebase and making changes to the variant there, you can just include those changes in a payload, and Experiment implements them automatically.

    Paste or type your code into the window. 

6. Click **Apply**.

There is no limit to the number of variants you can add to an experiment, but adding too many can [make it harder for your experiment to reach statistical significance](/docs/feature-experiment/advanced-techniques/bonferroni-correction). Try to keep your experiments limited to the absolute minimum of variants needed.

You can drag and drop your variants in any order you want. However, the variant that contains the `control` label is always considered the control variant, regardless of where it appears in the list.

## Distribute traffic to your variants

Unless you specify otherwise, Experiment splits traffic evenly between your variants. However, you can opt to send more traffic to specific variations by customizing your variant distribution. In your experiment, go to *Targeting > Distribution* to change the distribution percentage. 

## Stratified sampling and experiment bias

Sometimes, you may want to spread traffic differently for each user segment you’ve included:

* Segment 1: `Country = USA || 80% treatment, 20% control`
* Segment 2: `Country = Canada || 50% treatment, 50% control`

This can introduce bias into your experiment results. In general, adhere to uniform allocation ratios across all user segments in an experiment. 

Non-uniform allocation ratios often happen inadvertently, when users change their rollouts and variants while an experiment is running.

Amplitude Experiment gives you the option to use stratified sampling (for example, non-uniform allocation ratios) if you need it. Just switch the Allow rollout controls per segment toggle to **On**. (This option is only visible if you've selected [**Targeted Users**](/docs/feature-experiment/workflow/define-audience).)

This switch is visible only for experiments, and not for feature flags. Amplitude disables it while your experiment is active.

Click **Continue** to move on to the rollout phase.

## Rollout percentage

The next step is to set the rollout percentage for this experiment. This is the percentage of the users included in the experiment’s user segments who take part in the experiment. Find it in the Rollout section of the experiment design panel.

Manually enter the percentage of your audience that should be eligible for bucketing into the experiment. If you roll your experiment out to less than 100% of your users, the balance sees your default product experience, and aren't included in any experiment calculations.

Experiment evaluates for users included in rule-based user segments before those not covered by a user segment. However, it evaluates for any individual user or device IDs prior to both.

Next, it's time to [finalize your experiment's statistical settings](/docs/feature-experiment/workflow/finalize-statistical-preferences).