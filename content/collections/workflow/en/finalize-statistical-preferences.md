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

##### To set advanced settings

1. In your experiment, scroll down to the Advanced section and click the **edit** icon.
2. Set your preferences (review the definitions and explanations below).
3. Click **Save and Close**.

After you have saved your settings, you can [test your experiment](/docs/workflow/experiment-test). 

## Exposure settings

Exposure settings are the configuration rules that define when and how a user is marked as exposed to an experiment or feature. These settings determine the logic that triggers an exposure event, such as whether a user is considered exposed the first time they qualify for an experiment, the first time they actively interact with a feature, or under more custom criteria.

In your Experiment Design options, click **Advanced** and then click **Exposure Settings** to specify the settings you want. You can modify any of the following: 

### Exposure event

An exposure event is the moment when a user becomes eligible for a particular experiment variant or feature. They're shown the experiment variant regardless of whether they actively interact with it. This event serves as the anchor point for experiment analysis and ensures that all downstream behaviors and outcomes are accurately attributed to the correct variant. By logging exposure events, Experiment prevents biases such as double counting or misattribution. It also establishes a consistent link between user actions and the experiment they were exposed to.

You can specify:

* **Exposure Event**: Decide which exposure event you want to trigger the experiment. By default, this is set to Amplitude Exposure event. It's recommended to leave this setting as is. However, you can specify a custom exposure event. 
* **Proxy Exposure Event**: For Feature Experiments, a proxy exposure event is a placeholder used to estimate the duration of the experiment based on historical data of that event. By default, this is set to Any Active Event. You can specify any recorded event as the proxy.
* **Custom Exposure Settings**: Decide if you want to further customize your exposure settings with:
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

The random bucketing process can sometimes deliver unbalanced groups of users to each variant. This is known as pre-exposure bias, and it’s one of the things CUPED is meant to address. If you don’t use CUPED for your experiment, this bias persists. This is why you may notice differences in the mean-per-variant when running the same experiment with and without CUPED. 

For a more technical explanation, go to this [detailed blog post](https://bytepawn.com/reducing-variance-in-ab-testing-with-cuped.html).

Read more about CUPED and how it can affect your experiment results in this [blog](https://amplitude.com/blog/amplitude-experiment-cuped). 

### Bonferroni Correction

Amplitude Experiment uses the Bonferroni correction to address potential problems with [multiple hypothesis testing.](/docs/feature-experiment/advanced-techniques/multiple-hypothesis-testing) Although a trusted statistical method, there are situations where you may not want to use it when analyzing your experiment results. One might be if you want to compare results with those generated by an internal system that doesn't support the Bonferroni method. In this case, and if you're willing to accept higher false positive rates, toggle the **Bonferroni Correction** off.

### Statistical Method

Select which statistical method you want to use:

* **Sequential testing**: A statistical method where results are analyzed continuously as data comes in instead of only at a fixed sample size. This approach allows teams to continuously review experiment results without inflating false positive risk. Because the method corrects for repeated looks at the data, it’s useful for making faster decisions when effects are strong but requires careful setup to avoid bias. Go to [Sequential Testing](/docs/feature-experiment/under-the-hood/experiment-sequential-testing) for more information.
* **T-Testing**: A traditional statistical test that compares the means of two groups (such as the control and treatment groups) to determine if differences are statistically significant. It assumes normally distributed data and fixed sample sizes. While simple and widely understood, a t-test is less flexible if you want to check results continuously or deal with more complex outcome distributions. Go to [T-testing](/docs/feature-experiment/experiment-theory/analyze-with-t-test) for more information.
* **Bayesian**: A statistical method that compares groups by calculating the probability that one variant outperforms another. Unlike traditional methods that rely on p-values and fixed hypothesis testing, Bayesian statistics provides direct probability estimates that align more closely with how teams naturally make decisions. Bayesian methods excel when you want continuous insight into your experiment's performance. They're particularly valuable when you need to incorporate prior knowledge, make decisions with smaller sample sizes, or require probability statements that directly answer business questions like "How likely is this variant to succeed?" Go to [Bayesian Statistics](/docs/feature-experiment/experiment-theory/bayesian-statistics) for more information.
* **Thompson Sampling**: A [Bayesian](https://www.andrew.cmu.edu/course/18-847F/lectures/18687Nov182019.pdf) bandit approach that dynamically allocates more traffic to variants that appear to perform better. Instead of waiting until an experiment ends, it balances exploration and exploitation in real time. This improves user experience by gradually sending more users to promising variants. It doesn’t provide a classic p-value but instead relies on posterior probabilities, making it a great choice when adaptive decision-making is desired.

### Confidence Level
The confidence level measures how confident Experiment is that it would generate the same results for the experiment if you were to roll it out again and again. The default confidence level of 95% means that 5% of the time, you might interpret the results as statistically significant when they're not. Lowering your experiment’s confidence level will make it more likely that your experiment reaches statistical significance, but the likelihood of a false positive goes up. You shouldn't go below 80%, as the experiment's results may no longer be reliable at this point.

## Bucketing options

Specify how you want bucketing to work in your experiment. You can specify: 

* **Evaluation Mode**: Select whether this will be remotely evaluated on Amplitude servers or locally on your own machine. By default, experiments are set to be remotely evaluated on Amplitude servers. Go to [Performance and Caching](/docs/feature-experiment/under-the-hood/performance-and-caching) for more information. 
* **Sticky Bucketing**: Specify if you want to serve users the same variant after they have been allocated, even if the rollout or targeting criteria is updated. If sticky bucketing is enabled, it means that users won't be re-bucketed if the targeting criteria changes. By default, sticky bucketing is turned off. Go to [Sticky Bucketing](/docs/feature-experiment/advanced-techniques/sticky-bucketing#how-sticky-bucketing-works) for more information.
* **Bucketing Salt**: A string value that's used as part of the hashing process. It assigns users deterministically into experiment variants. By combining the bucketing salt with identifiers such as the user ID and experiment key, Experiment generates a random-looking, but repeatable, hash that ensures each user is consistently placed into the same variant across sessions. Changing the bucketing salt reshuffles assignments and re-randomizes users for that experiment. 
