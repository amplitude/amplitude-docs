---
id: e25b5210-6f1c-4c0c-a571-82bf8a15b366
blueprint: faq_and_troubleshooting
title: 'Experiment duration estimates'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/9198556822299'
category: experiment
---
This article covers frequently asked questions about Amplitude Experiment's duration estimate. 


{{partial:collapse name="How does the duration estimate work?"}}
The experiment duration estimate predicts the length of time your experiment needs to generate statistically significant results. It can only be used with the primary metric and sequential testing. It's not supported in Experiment Results. 

Amplitude Experiment uses the means, variances, and exposures of your control and variants to forecast expected behavior and calculate the number of days your experiment takes to reach statistical significance. As Amplitude Experiment receives more data over time, this prediction improves. If any of these inputs change significantly during the experiment, the accuracy of the prediction is likely to decrease.
{{/partial:collapse}}


{{partial:collapse name="What is the difference between the duration estimate and the duration estimator?"}}
Amplitude calculates the duration estimate using sequential testing **as the experiment is running**. The duration estimator, however, uses [T-test](/docs/feature-experiment/workflow/experiment-estimate-duration). 
{{/partial:collapse}}


{{partial:collapse name="Why is the duration estimate not showing?"}}
The duration estimate is visible when your experiment meets the follow criteria:

* Your experiment meets the following statistical assumptions:
	* The absolute lift is outside the confidence interval
	* The confidence interval **flips** (lower confidence interval > upper confidence interval). This can happen if, while the experiment is running, the mean for either the treatment or the control fluctuates, or if the experiment’s rollout weights or targeting segments change
	* The standard error is very small
	* The variance is negative
	* The conversion rate > 1 or < 0 (if applicable)
* The metric hasn't yet reached statistical significance
* The end date of the analysis window is in the past
* The experiment has enough observations
* The experiment is rolled out or rolled back

If the estimate isn't showing, it likely means that one or more of these criteria aren't met.
{{/partial:collapse}}


{{partial:collapse name="Is there a cap for the duration estimate?"}}
Yes. The duration estimate is currently capped at 40 days, for the following reasons:

* The duration estimate uses real-time simulations, where latency scales with the number of days simulated.
* Usually, the means and standard deviations don't change over time, especially for experiments with longer running times.
* Short-term predictions are easier to make accurately than long-term predictions. (This is why, for example, you rarely see weather forecasts for more than ten days in the future—and even those change frequently as the day in question grows closer.)
* Most experiments shouldn't take 40 days to complete.
{{/partial:collapse}}


{{partial:collapse name="How does Amplitude Experiment determine the number of exposures per day?"}}
Amplitude Experiment assumes a constant number of exposures per day. Amplitude Experiment calculates exposures per day by dividing the cumulative exposures (as of today) by the number of days the experiment has been running so far.
{{/partial:collapse}}


{{partial:collapse name="What types of errors are there?"}}
The experiment duration estimate is still an estimate; don't take it as truth. Here are some error types you might encounter. 

**Irreducible error**

Irreducible error is error inherent to the estimation process; unfortunately, you can't correct for it.

In simulations, each one reaches statistical significance at different times: this difference is the main reason to run multiple simulations. The time it takes for an experiment to reach statistical significance is a random variable itself. It depends on the p-value, which in turn depends on the data your experiment collects. Even if you know the control mean, control standard deviation, treatment mean, and treatment standard deviation, and if we force normal distribution and independence on everything, Experiment still can't reduce error all the way to zero. 

See this [video on irreducible error and bias](https://www.youtube.com/watch?v=uoV1g3i9Qmw&ab_channel=MachineLearningTV) for more information.

**Incorrect estimates**

When Amplitude Experiment generates a duration estimate, it estimates the control population mean and control population standard deviation, among other things, with the sample estimates. These estimates are as good as they can be. That said, there is potential for error here also. 

**Drift**

For example, if today the control mean equals 5, and ten days from now the control mean equals 15, there is drift in the control mean. A common example of drift is seasonality. If there is any drift in any of the statistics, the estimate does poorly. The estimate assumes no drift when doing hypothesis testing.
{{/partial:collapse}}


{{partial:collapse name="What does 'Threshold reached' mean?"}}
If your experiment displays the message "Threshold reached" with "0 days left" in the duration estimator, it's because the confidence interval doesn't contain the MDE (aka, threshold in this instance).

This isn't necessarily a bad result if your recommendation metric is a guardrail metric, since the effect size would be smaller than the allowed amount.

Conversely, it's a bad sign if your recommendation metric is a success metric the effect size would be smaller than what you hoped for. It's recommended to end the experiment if this happens; even if you would have reached statistical significance, the lift would be smaller than what's practically significant and you wouldn't have moved the metric like you were hoping to.
{{/partial:collapse}}


{{partial:collapse name="What does 'Statistical significance may never reach' mean?"}}
When the duration estimator shows 40 or more days to complete an experiment, Amplitude may assume that it's not likely to reach statistical significance after running for two weeks. In those cases, Experiment shows this message.
{{/partial:collapse}}
