---
id: 18cba191-177e-4f7c-abcb-f5375c155c71
blueprint: experiment-theory
title: 'Set the MDE for your experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/12785071886875-Set-the-MDE-for-your-experiment'
this_article_will_help_you:
  - 'Identify the logic behind setting an MDE so you can more confidently run your experiment'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715102912
---
Before you run a experiment, set an MDE (minimum detectable effect) to estimate how you'll measure success. Think of MDE as the **minimum** change you're hoping to see by running your experiment. Without a fail-safe calculation available for the MDE, it can be tricky to set one. With Amplitude Experiment, the default MDE is 2%; however, as the MDE is strictly linked to your unique business needs, be thoughtful during each experiment's [design phase](/docs/experiment/workflow/define-goals). Considerations for setting the MDE should include:

* The experiment type,
* The primary metric, and
* Associated risks.

## MDE and the experiment type

When you create your experiment, you select between two experiment types: A/B test or Multi-Armed Bandit

See the following case study to dive deeper into how the goal type can alter the MDE.

The marketing director of a small arts organization is using Amplitude Experiment to help plan updates to a ticketing management system. With no data science team, the director must choose whether experiments are needed and, if so, how best to run them. The anticipated updates are:

1. Adding a "quick checkout" option on event pages, to increase conversion of page visits to ticket sales for logged-in users.
2. Adding a new payment option during check out for all users.

Update #1 could benefit from a success metric to ensure the placement of the "quick checkout" button boosts conversion rates by the desired amount. The marketing director notes that their next fiscal quarter goal is to **increase** ticket sale revenue by 3%. These company goals are important when planning for the success metrtic, and steer the test's direction to "increase" and the MDE to 3%.

The second update, is an enhancement required to meet financial requirements. As a non-negotiable enhancement to the check out process, a guardrail metric may help confirm that the additional payment method doesn't **decrease** completed sales for users in the checkout process. Over the last four fiscal quarters, an average of 1% of users abandoned the checkout process once starting it. Therefore, this guardrail metric would have a direction set to "decrease" and an MDE set to 1%.

{{partial:admonition type='note'}}
If running a [T-test](/docs/experiment/workflow/experiment-estimate-duration), Amplitude's duration estimator can also help set the MDE: Give yourself one month to run the experiment to get the estimated MDE.
{{/partial:admonition}}

## MDE and the primary metric

In Amplitude, the MDE is relative to the control mean of the primary metric. For example, if the conversion rate for the control group is 10%, an MDE of 2% (0.2) would mean that a change would be detected if the rate moved outside of the range 9.8% to 10.2%. 

Let's look again at the case study from the previous section. Consider how the primary metric of ticket sale purchases may require a change in the MDE:

* The hypothesis testing experiment would run during an annual sale in ticket prices.
* The number of varying event tickets, which is positively correlated to ticket sales, would be significantly smaller than previous fiscal quarters.
* The experiment would run during a global pandemic that could prohibit large in-person gatherings.

Any unique business needs and circumstances must be considered when planning for an experiment and setting the MDE. Experiments should be run with the goal of causing as little harm as possible.  

{{partial:admonition type='note'}}
 You can also set the MDE when analyzing your experiment results. 
{{/partial:admonition}}

![MDE_test_chart.jpeg](/docs/output/img/experiment-theory/mde-test-chart-jpeg.jpeg)

## MDE and associated risk

Experiments don't produce risk-free results, and running them can take a lot of time and require large sample sets, which mean higher costs and greater potential for adverse effects on users. The most important thing to remember when assessing risk is that the MDE is **inversely related** to sample size, meaning the smaller or more "sensitive" the MDE, the larger the sample size needed to reach statistical significance. 

Here are some additional questions to ask yourself to further assess risk:

* Would the estimated costs or run time of an experiment be worth the desired outcome?
* What are the potentially negative side effects of users exposed to the experiment, and would the outcome be worth potential losses?
* Is an experiment needed at all, or should other options, such as a feature release, be considered instead?
* What's the smallest percentage change you would be happy with? For example, would you be willing to roll out the experiment if you saw a lift of 2%, 3%, or 5%?
* If your experiment resulted in positive outcomes, such as an increase in the number of annual subscribers from 100 to 105, would that be a big enough change to present to leadership?