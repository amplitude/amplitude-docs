---
id: e25b5210-6f1c-4c0c-a571-82bf8a15b366
blueprint: faq_and_troubleshooting
title: 'Experiment duration estimates'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/9198556822299'
category: experiment
---
This article covers frequently asked questions about Amplitude Experiment's duration estimate. 


{{partial:collapse name="How does the duration estimate work?"}}
The experiment duration estimate is designed to predict the length of time your experiment will need to generate statistically significant results. It can only be used with the primary metric and sequential testing. It is not currently supported in Experiment Results. 

Amplitude Experiment uses the means, variances, and exposures of your control and variants to forecast expected behavior and calculate how many days your experiment will take to reach statistical significance. As Amplitude Experiment receives more data over time, this prediction will improve. However, if any of these inputs change significantly during the experiment, the accuracy of the prediction will likely decrease.
{{/partial:collapse}}


{{partial:collapse name="What is the difference between the duration estimate and the duration estimator?"}}
The **duration estimate is calculated** using sequential testing **as the experiment is running**. The duration estimator, however, uses [T-test](/docs/experiment/workflow/experiment-estimate-duration). 
{{/partial:collapse}}


{{partial:collapse name="Why is the duration estimate not showing?"}}
The duration estimate is visible when the follow criteria are met:

* The following statistical assumptions are met:
	* The absolute lift is outside the confidence interval
	* The confidence interval is **flipped** (lower confidence interval > upper confidence interval). This can happen if, while the experiment is running, the mean for either the treatment or the control fluctuates, or if the experiment’s rollout weights or targeting segments are changed
	* The standard error is very small
	* The variance is negative
	* The conversion rate > 1 or < 0 (if applicable)
* The metric has not yet reached statistical significance
* The end date of the analysis window is in the past
* The experiment has enough observations
* The experiment has been rolled out or rolled back

If the estimate is not showing, it likely means that one or more of these criteria have not been met.
{{/partial:collapse}}


{{partial:collapse name="What do worst case, average case, and best case mean?"}}
Amplitude Experiment uses the worst case, average case, and best case to describe the uncertainty inherent in its estimate of the time it will take for a hypothesis test to reach statistical significance: 

* **Best case** estimate of three days: 20% of the time, the experiment will reach stat sig in three days or less
* **Average case** estimate of seven days: 50% of the time, the experiment will reach stat sig in seven days or less
* **Worst case** estimate of ten days: 80% of the time, the experiment will reach stat sig in ten days or less
{{/partial:collapse}}


{{partial:collapse name="Is there a cap for the duration estimate?"}}
Yes. The duration estimate is currently capped at 40 days, for the following reasons:

* The duration estimate uses real-time simulations, where latency scales with the number of days simulated.
* It’s often not wise to assume that the means and standard deviations won't change over time, especially for experiments with longer running times.
* Short-term predictions are easier to make accurately than long-term predictions. (This is why, for example, you rarely see weather forecasts for more than ten days in the future—and even those change frequently as the day in question grows closer.)
* Most experiments should not take 40 days to complete.
{{/partial:collapse}}


{{partial:collapse name="How does Amplitude Experiment determine the number of exposures per day?"}}
Amplitude Experiment assumes a constant number of exposures per day. Exposures per day are calculated by dividing the cumulative exposures (as of today) by the number of days the experiment has been running so far.
{{/partial:collapse}}


{{partial:collapse name="What types of errors are there?"}}
The experiment duration estimate is still an estimate; it should not be taken as ground truth. Here is a list of some of the error types you might encounter. 

**Irreducible error**

Irreducible error is error inherent to the estimation process; unfortunately, it cannot be corrected for.

In simulations, each one will reach statistical significance at different times: this difference is the main reason to run multiple simulations. This is just how randomness works. In fact, the time it takes for an experiment to reach stat sig is actually a random variable itself. It will depend on the p-value, which in turn depends on the data your experiment collects. Even if we cheat and pretend to know the control mean, control standard deviation, treatment mean, and treatment standard deviation, and if we force normal distribution and independence on everything, we still cannot reduce error all the way to zero. 

See this [video on irreducible error and bias](https://www.youtube.com/watch?v=uoV1g3i9Qmw&ab_channel=MachineLearningTV) for more information.

**Incorrect estimates**

When Amplitude Experiment generates a duration estimate, it estimates the control population mean and control population standard deviation, among other things, with the sample estimates. These estimates are as good as they can be. That said, there is potential for error here also. 

**Drift**

For example, if today the control mean equals 5, and ten days from now the control mean equals 15, there is drift in the control mean. A common example of drift is seasonality. If there is any drift in any of the statistics, the estimate will do poorly. The estimate assumes no drift when doing hypothesis testing.
{{/partial:collapse}}


{{partial:collapse name="What does 'Threshold reached' mean?"}}
If your experiment displays the message "Threshold reached" with "0 days left" in the duration estimator, it is because the confidence interval does not contain the MDE (aka, threshold in this instance).

This isn't necessarily a bad result if you were running a do-no-harm experiment, since the effect size would be smaller than the allowed amount.

Conversely, it's a bad sign if you were running a hypothesis test because the effect size would be smaller than what you hoped for. It's recommended to end the experiment if this happens; even if you would have reached statistical significance, the lift would be smaller than what is practically significant and you wouldn't have moved the metric like you were hoping to.
{{/partial:collapse}}


{{partial:collapse name="What does 'Statistical significance may never reach' mean?"}}
When the duration estimator shows 40 or more days to complete an experiment, Amplitude may assume that it's not likely to reach statistical significance after running for two weeks. In those cases, you will see this message.
{{/partial:collapse}}