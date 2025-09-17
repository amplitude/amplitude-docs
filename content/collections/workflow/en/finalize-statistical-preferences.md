---
id: ec448015-b432-434a-93a0-6392b4474d67
blueprint: workflow
title: "Finalize your experiment's advanced settings"
source: 'https://help.amplitude.com/hc/en-us/articles/13448368364187-Finalize-your-experiment-s-statistical-preferences'
this_article_will_help_you:
  - "Understand the default statistical preferences in your experiment's results"
  - 'Understand when to modify the default settings'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714517514
---
The final step in creating your experiment is to specify any advanced settings you want. These settings encompass:

* **Exposure settings**: Settings for the exposure event that must be triggered before your audience receives your experiment. 
* **Stats Preferences**: Statistical settings for experiment analysis.
* **Bucketing options**: Further settings related to bucketing and targeting your audience.

## Exposure settings

Exposure settings are the configuration rules that define when and how a user is marked as exposed to an experiment or feature. These settings determine the logic that triggers an exposure event, such as whether a user is considered exposed the first time they qualify for an experiment, the first time they actively interact with a feature, or under more custom criteria.

In your Experiment Design options, click **Advanced** and then click **Exposure Settings** to specify the settings you want. You can modify any of the following: 

### Exposure event

An exposure event is the moment when a user becomes eligible for a particular experiment variant or feature. They are shown the experiment variant regardless of whether they actively interact with it. This event serves as the anchor point for experiment analysis and ensures that all downstream behaviors and outcomes are accurately attributed to the correct variant. By logging exposure events, Experiment prevents biases such as double counting or misattribution. It also establishes a consistent link between user actions and the experiment they were exposed to.

You can specify:

* **Exposure Event**: Decide which exposure event you want to trigger the experiment. By default, this is set to Amplitude Exposure event. It's recommended to leave this setting as is. However, you can specify a custom exposure event. 
* **Proxy Exposure Event**: For Feature Experiments, a proxy exposure event is a placeholder used to estimate the duration of the experiment based on historical data of that event. By default, this is set to Any Active Event. You can specify any recorded event as the proxy.
* **Custom Exposure Settings**: Decide if you want to further customize your expsure settings with:
  * **Attribution**: If you want the exposure event to activate only on the first instance of the user triggering it or at any instance of a single user triggering the event. 
  * **Window**: If you want the experiment to trigger within a specific time period of the event.

## Stats Preferences

Statistical preferences are the configurable settings that determine how experiment results are analyzed and displayed. These preferences let teams choose parameters such as:

* [*CUPED*](#cuped) toggled off
* [*Bonferroni Correction*](#bonferroni-correction) toggled on
* [*Custom Exposure Settings*](#custom-exposure-settings) toggled off
* [*Test Type*](#test-type) set to Sequential
* [*Confidence Level*](#confidence-level) set to 95%

You can modify the Stats Preferences at any step of an experiment, however, they're most beneficial for the final analysis after the experiment has ended.

{{partial:admonition type='note'}}
 This article continues directly from the [Help Center article on learning from your experiment](/docs/feature-experiment/workflow/experiment-learnings). If you haven’t read that, do so before continuing here.
{{/partial:admonition}}

### CUPED

Controlled-experiment using pre-existing data, also known as CUPED, is an optional statistical technique meant to reduce variance in Amplitude Experiment. Toggling CUPED on means that Amplitude Experiment will account for possible varying treatment effects for different user segments. There are situations where CUPED would not be the best choice for your experiment, such as targeting only new users in your test.

The random bucketing process can sometimes deliver unbalanced groups of users to each variant. This is known as pre-exposure bias, and it’s one of the things CUPED is meant to address. If you don’t use CUPED for your experiment, this bias will persist. This is why you may notice differences in the mean-per-variant when running the same experiment with and without CUPED. 

For a more technical explanation, see this [detailed blog post](https://bytepawn.com/reducing-variance-in-ab-testing-with-cuped.html).

Read more about CUPED and how it can affect your experiment results in this [blog](https://amplitude.com/blog/amplitude-experiment-cuped). 

### Bonferroni Correction

Amplitude Experiment uses the Bonferroni correction to address potential problems with [multiple hypothesis testing.](/docs/feature-experiment/advanced-techniques/multiple-hypothesis-testing) Although a trusted statistical method, there are situations where you may not want to use it when analyzing your experiment results. One might be if you want to compare results with those generated by an internal system that does not support the Bonferroni method. In this case, and if you're willing to accept higher false positive rates, toggle the *Bonferroni Correction* off.

### Statistical Method