---
id: de1a0693-01c3-4477-8a5e-549ae19c83ac
blueprint: experiment
title: 'Dynamically allocate experiment traffic with multi-armed bandits'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1718650763
---
In a traditional A/B test, Amplitude Experiment assesses all the variants in your experiment until it reaches a statistically-significant result. From there, you can choose to roll out the winning variant, or roll all users back to the control variant instead. Your decisions will often depend on why a particular variant outperformed the others.

But sometimes, that reason isn’t relevant. All you want is to determine which variant is performing the best and send as much traffic as possible to it. For example:

- Optimizing hero images, messaging, color changes to UI elements, etc.
- In-product layout changes, like information hierarchy or order of operations
- Optimizing menus or navigation
- Ad optimization for seasonal or time-sensitive promotions or events
- Hyperparameter tuning for ML models

In cases like these, a **multi-armed bandit** is often a better choice for your experiment. A multi-armed bandit **dynamically** allocates traffic based on the real-time performance of each variant. This approach balances the **exploration** approach of the traditional A/B test (testing different variants to see which one performs best) with **exploitation** (dynamically allocating resources to the best-performing variant). The result is faster learning and more efficient resource allocation.

## Feature availability
This feature is available to users on **Enterprise plans** who have purchased **Amplitude Experiment**. See our pricing page for more details.

Unlike in a traditional A/B test, multi-armed bandits do not use statistical significance as a determinant of success. Nor do they use a control or baseline variant. There are also differences in how Amplitude Experiment displays results for both experiment types; those are covered later in this article.

Multi-armed bandit experiments use [Thompson sampling](https://en.wikipedia.org/wiki/Thompson_sampling). No other statistical methodologies are available to use with a multi-armed bandit in Amplitude Experiment.

## Before you begin
- Multi-armed bandit experiments may be evaluated locally or remotely.
- Multi-armed bandit experiments can be set to reallocate traffic hourly, daily, or weekly.
- Amplitude Experiment requires at least 100 exposures in each variant before it will reallocate traffic.
- Multi-armed bandits respect all mutual exclusion groups and holdouts that you associate with it.
- The reallocation is visible in the flag config history. Entries edited by “ampex_data_monster” were made by Amplitude.

## Create a multi-armed bandit experiment

Building a multi-armed bandit experiment is almost identical to [building an A/B test in Amplitude Experiment](https://help.amplitude.com/hc/en-us/sections/360013708911-The-experimentation-workflow). The only difference is that you’ll have to select *Multi-Armed Bandit* as the experiment type in the *Basics* panel of the design wizard. The rest of the process is identical, though there are nuances to the way Amplitude Experiment handles a multi-armed bandit experiment that you should be aware of. These are covered in the next section.

## Differences between multi-armed bandits and A/B tests

### Metrics
A multi-armed bandit experiment requires a primary metric. This is the metric Amplitude Experiment will use to optimize your experiment. You can include secondary metrics, but those will be used for reporting purposes only.

In an A/B test, your primary metric can be a **guardrail metric**: in other words, one that you don’t want to be negatively affected by your experiment. Clickthrough rate is a good example of a guardrail metric. Because a multi-armed bandit experiment is about optimization, this would not make sense—you can’t optimize for a change that you don’t want to occur. For that reason, primary metrics for multi-armed bandit experiments **must be success metrics** (“will increase” or “will decrease”). Amplitude Experiment supports both binary metrics and continuous metrics.

If you want to optimize two metrics in your multi-armed bandit experiment, create a new custom metric that is a weighted average of both. Sometimes, you may face a tradeoff between metrics that you want to optimize, in which case, you should consider running an A/B test instead.

### Traffic allocation
Allocation for a multi-armed bandit experiment always begins with a uniform distribution, as the model has no way to know which variant is the most effective before it has collected any data. This will change once that data begins coming in.

A multi-armed bandit adjusts the allocation **between the variants only**; it does not adjust the percentage rollout.

### Confidence level
The confidence level in a multi-armed bandit experiment has a different role than in an A/B test. Here, it can accelerate traffic to the winning variant. For example, if your experiment’s confidence level is set to 95%, and the multi-armed bandit has already allocated at least 95% of the experiment’s traffic to the winning variant, Amplitude Experiment will assume confidence, and will allocate 100% of traffic to that variant from that point on.

##Duration estimate and MDE
In multi-armed bandit experiments, the role of the minimum detectable effect (MDE) is to help calculate the duration estimate. Since these experiments are automated and about optimization, the MDE does not affect the experiment once it’s running.

When calculating the duration estimate prior to starting the experiment, Amplitude Experiment simulates what would happen if the same baseline mean (computed from historical data) is shared by all variants except one: when measuring an increase, this variant would have `mean * (1+MDE)`; when measuring a decrease, it would be `mean * (1-MDE)`. From there, Amplitude Experiment calculates how long it could take for the multi-armed bandit to assign all traffic to one variant. The duration estimate is capped at 31 days.

### Displayed results
Amplitude Experiment does not display variant jumping while a multi-armed bandit is running. That’s because variant jumping is expected behavior in these experiments.

The data quality card is not visible for multi-armed bandit experiments. Most of the checks conducted for this display don’t make sense for this experiment type. You cannot make changes to the experiment that will affect traffic allocation while the experiment is running.

The Bandits card is very similar to the non-cumulative exposure chart in the Monitor card, but is normalized to 100%, enabling you to easily visualize the percentage of traffic each variant is getting on that day.

## Notifications

When a multi-armed bandit allocates 70%, 80%, 90%, and 100% of an experiment’s traffic to a variant, Amplitude Experiment will send a notification to the creator of the experiment. These can be via either Slack or email. 

To set up your notifications, navigate to _Settings > Personal settings > Notifications_.