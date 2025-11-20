---
id: 1623ff4b-4f76-411c-bbe4-2f38614ffc9a
blueprint: workflow
title: 'Create a new experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/360061687551-Create-a-new-experiment'
this_article_will_help_you:
  - 'Create and initialize a new experiment'
  - 'Add context to your experiment description, so other stakeholders will understand it'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1743538242
landing: true
landing_blurb: 'Create a new experiment in Amplitude.'
academy_course:
  - efd79a40-83e3-4c3d-a343-c0f81a41cdab
---
The decisions you make in the [design](/docs/feature-experiment/workflow/define-goals) phase define your experiment’s success. By putting thought into your experiment’s purpose and goals before you start, you’ll be far more likely to glean useful, actionable insights from it.

To create a new experiment, [install an SDK](/docs/sdks/experiment-sdks) or call the [evaluation API](/docs/apis/experiment/experiment-evaluation-api).  Then follow these steps:

1. Click **Create > Experiment**, and select **Web** or **Feature**.
2. Complete the following fields:
    - **Name**: Enter the name of the experiment for future reference.
    - **Project**: Select the project in which this experiment operates.
    - **Experiment Type**: Select from the following:
      - **A/B Test**: Test one or more variants with a goal of improving a metric. Run A/B tests using hypothesis testing or do-no-harm methodologies. For more information, go to [Define your experiment's goals](/docs/feature-experiment/workflow/define-goals).
      - **Multi-Armed Bandit**: Amplitude allocates an increasing amount of traffic to the winning variant, based on the primary metric, until it hits 100% allocation.
    - For Web Experiments, enter the *Targeted Page URL*, on which this experiment runs.
3. Optionally, complete the following fields:
   - **Key**: Keys are unique to experiments and tell which experiments a user participates in. You can edit keys until you run the experiment.
   - **Evaluation Mode**: Select if the experiment runs locally or on Amplitude's Experiment servers. For more information, go to [Local evaluation](/docs/feature-experiment/local-evaluation) and [Remote evaluation](/docs/feature-experiment/remote-evaluation)
   - **Bucketing Unit**: Select the unit Amplitude uses to assign variants, either `User` or `Group`.
4. Click **Create**.
  
For example, you've chosen to run a hypothesis testing experiment with a direction setting of "increase" and a minimum goal (MDE) of 2%. This means you believe the metric should increase by at least 2%. If you change the experiment type to *Do No Harm*, you expect the metric to "not increase by 2%." A good use case for a Do No Harm experiment is launching a service agreement in your app and then testing for a lack of change in user retention.

After the experiment has been created, you must configure additional aspects of the experiment. Go to [Define your experiment's goals](/docs/workflow/define-goals) for next steps. 