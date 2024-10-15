---
id: 1623ff4b-4f76-411c-bbe4-2f38614ffc9a
blueprint: workflow
title: 'Create a new experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/360061687551-Create-a-new-experiment'
this_article_will_help_you:
  - 'Create and initialize a new experiment'
  - 'Add context to your experiment description, so other stakeholders will understand it'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724885023
landing: true
landing_blurb: 'Create a new experiment in Amplitude.'
---
The decisions you make in the **design** phase set the stage for your experiment’s success. By putting more thought into your experiment’s purpose and goals before you start, you’ll be far more likely to glean useful, actionable insights from it.

To create a new experiment, [install an SDK](/docs/sdks/experiment-sdks) or call the [evaluation REST API](/docs/apis/experiment/experiment-evaluation-api).  Then follow these steps:

1. Click *Create > Experiment*, and select *Web* or *Feature*.
2. In the *New Experiment* modal, complete the fields:
    - **Name**: Enter the name of the experiment for future reference.
    - **Project**: Select the project in which this experiment operates.
    - **Experiment Type**: Select from the following:
      - *A/B Test*: Test one or more variants with a goal of improving a metric. Run A/B tests using hypothesis testing or do-no-harm methodologies. For more information, see [Define your experiment's goals](/docs/feature-experiment/workflow/define-goals).
      - *Multi-Armed Bandit*: Amplitude allocates an increasing amount of traffic to the winning variant, based on the primary metric, until it hits 100% allocation.
    - For Web Experiments, enter the *Targeted Page URL*, on which this experiment runs.
3. Optionally, complete the following fields:
   - *Key*: Keys are unique to experiments and tell which experiments a user participates in. You can edit keys until you run the experiment.
   - *Evaluation Mode*: Select if the experiment runs locally or on Amplitude's Experiment servers. For more information, see [Local evaluation](/docs/feature-experiment/local-evaluation) and [Remote evaluation](/docs/feature-experiment/remote-evaluation)
   - *Bucketing Unit*: Select the unit Amplitude uses to assign variants, either `User` or `Group`.
4. Click **Create**.
  
For example, you've chosen to run a hypothesis testing experiment with a direction setting of "increase" and a minimum goal (MDE) of 2%. This means you believe the metric should increase by at least 2%. If you change the experiment type to *Do No Harm*, you expect the metric to "*not* increase by 2%." A good use case for a Do No Harm experiment is launching a service agreement in your app and then testing for a lack of change in user retention.

Click *Continue* to move on to the next step—[defining your experiment’s goals](/docs/feature-experiment/workflow/define-goals).
