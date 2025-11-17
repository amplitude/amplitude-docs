---
id: 4c9bc7b0-f786-4694-97c0-4668958ad1de
blueprint: under-the-hood
title: 'Sequential testing for statistical inference'
source: 'https://help.amplitude.com/hc/en-us/articles/4403176829709-How-Amplitude-Experiment-uses-sequential-testing-for-statistical-inference'
this_article_will_help_you:
  - 'Familiarize yourself with the statistical testing method used by Amplitude Experiment'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721759869
landing: false
enable_math: true
---
Experiment uses a sequential testing method of statistical inference. With sequential testing, results are valid whenever you view them. You can decide to end an experiment early based on observations made to that point. The number of observations you’ll need to make an informed decision is, on average, much lower than the number you’d need with [T-tests](/docs/feature-experiment/experiment-theory/analyze-with-t-test) or similar procedures. You can experiment rapidly, incorporating what you learn into your product and escalating the pace of your experimentation program.

Sequential testing has several advantages over T-tests. Primarily, you don’t need to know the number of observations necessary to achieve significance before you start the experiment. You can use both sequential testing and T-tests for binary metrics and continuous metrics. If you have concerns related to long tailed distributions affecting the Central Limit Theorem assumption, read this article about [outliers](/docs/feature-experiment/advanced-techniques/find-and-resolve-outliers-in-your-data). 

Given enough time, the statistical power of sequential testing method is 1. If there is an effect size to be detected, this approach can detect it.

This article explains the basics of sequential testing, how it fits into Amplitude Experiment, and how you can make it work for you.

## Hypothesis testing in Amplitude Experiment

When you run an A/B test, Experiment conducts an hypothesis test using a randomized control trial. In this trial, users are randomly assigned to either a treatment variant or the control. The control represents your product in its current state, while each treatment includes a set of potential changes to your current baseline product. With a predetermined metric, Experiment compares the performance of these two populations using a test statistic. 

In a hypothesis test, you’re looking for performance differences between the control and your treatment variants. Amplitude Experiment tests the null hypothesis 

$$
H_0:\ \delta = 0
$$

where 

$$
\delta = \mu_{\text{treatment}} - \mu_{\text{control}}
$$

states there’s no difference between treatment’s mean and control’s mean.

For example, you want to measure the conversion rate of a treatment variant. The null hypothesis posits that the conversion rates of your treatment variants and your control are the same.

The alternative hypothesis states that there is a difference between the treatment and control. Experiment’s statistical model uses sequential testing to look for any difference between treatments and control.

There are many different sequential testing options. Amplitude Experiment uses a family of sequential tests called mixture sequential probability ratio test (mSPRT). The weight function, H, is the mixing distribution. The following mixture of likelihood ratios against the null hypothesis is such that:

$$
\Lambda_{n}^{H,\theta_0} = \int_{\Theta} \prod_{m=1}^{n} \frac{f_{\theta}(X_m)}{f_{\theta_0}(X_m)}\, h(\theta)\,\mathrm{d}\theta .
$$

## Frequently asked questions about sequential testing

{{partial:collapse name="Why hasn’t the p-value or confidence interval changed, even though the number of exposures is greater than 0?"}}
For uniques, Amplitude Experiment doesn't compute p-values and confidence intervals until there are at least 25 conversions and 100 exposures each for both the treatment and control.

For average totals and sum of property, Experiment waits until it has at least 100 exposures each for the treatment and control.
{{/partial:collapse}}

{{partial:collapse name="Why don’t I see any confidence interval on the Confidence Interval Over Time chart?"}}
This is because the thresholds haven’t yet been reached. 

For uniques, Experiment waits until there are at least 25 conversions and 100 exposures each for the treatment and control. After those thresholds, it starts computing the p-values and confidence intervals.

For average totals and sum of property, Experiment waits until it has at least 100 exposures each for the treatment and control.
{{/partial:collapse}}

{{partial:collapse name="What are we estimating when we choose Uniques?"}}
This measures whether your visitors fired a specific event. The result is the proportion of the population that has taken this action. It’s a comparison of proportions, or the conversion rates between treatment and control.
{{/partial:collapse}}

{{partial:collapse name="What are we estimating when we choose Average Totals?"}}
This counts the average number of times a visitor has fired an event. For each visitor, Experiment counts the number of times they took the action you’re interested in, and then averages that across the sample within both the control and treatment. The result is a comparison of the average totals between the treatment and control.
{{/partial:collapse}}


{{partial:collapse name="What are we estimating when we choose Average Sum of Property?"}}
This sums the values of an event per user on a specific property. For example, if you’re interested in getting the total cart value of a user across all times, you’d pick the event “add to cart,” with the property of “cart value.” The result of this specific example is a comparison of the average cart value between treatment and control.
{{/partial:collapse}}

{{partial:collapse name="What is absolute lift?"}}
This is the absolute difference between treatment and control.
{{/partial:collapse}}


{{partial:collapse name="What is relative lift?"}}
This is the absolute lift scaled by the mean of the control. Some people find this value useful to determine the relative change a treatment has with respect to the baseline.
{{/partial:collapse}}


{{partial:collapse name="Why does absolute lift exit the confidence interval?"}}
Occasionally you may find that the absolute lift exit the confidence interval, which can cause confidence bounds to flip. This happens when the parameter you’re estimating (for example absolute lift) changes over time and the allocation for your treatment and control has changed. The underlying assumption in the statistical model Experiment uses is that the absolute lift and variant allocation don't change over time. 

![graph showing uniques with confidence level over time. Confidence bounds have flipped midway through the chart.](/docs/output/img/faq/image6-png.png)

Experiment’s approach incorporates symmetric time variation, which occurs when both the treatment and control maintain their absolute difference over time and their means vary in sync.

An option for you is to choose a different starting date (or date range) where the absolute lift is more stable and the allocation is static.

This may also happen if there is novelty effect or a drift in lift over time. Sequential testing allows for a flexible sample size. Whenever there is a large time delay between exposure and conversion for your test metrics, don't stop the test before considering the impact of exposed users who haven't yet had time to convert. To do this, you could:

* Compare the average time to convert for each variant using a funnel chart.
* Adjust the date range when analyzing the experiment results to include users who were exposed but converted after you stopped the test.
{{/partial:collapse}}

{{partial:collapse name="How does sequential testing compare to a T-test?"}}
Using sequential testing lets you look at the results whenever you like. However, fixed-horizon tests—such as T-tests can give you inflated false positives if you review results while your experiment is running.

Below is a visualization of p-values over time in a simulation of 100 A/A tests for a particular configuration (alpha=0.05, beta=0.2). As a T-test was run on data coming in, results are reviewed at regular intervals. Whenever the p-value falls below alpha, the test is stopped and you conclude that it has reached statistical significance.

![a visualization of p-values over time in a simulation of 100 A/A tests for a particular configuration (alpha=0.05, beta=0.2).](/docs/output/img/faq/image7-png.png)

In this example, the p-values fluctuate, even before the end of the test when it reaches 10,000 visitors. By reviewing results early, you inflate the number of false positives. The table below summarizes the number of rejections recorded for different configurations of the experiment when a T-test is run.

|   | alpha | beta  | baseline  | delta\_true  | num\_reject  |
|-----|-----|-----|-----|-----|-----|
| 0 | 0.05  | 0.2 | 0.01 |  0.0 | 0 |
| 1 | 0.05  | 0.2 | 0.05  | 0.0 | 0 |
| 2 | 0.05  | 0.2 | 0.10  | 0.0 | 1 |
| 3 | 0.05  | 0.2 | 0.20  | 0.0 | 0 |

In the table, the baseline is the conversion rate of the control variant, and delta\_true is the absolute difference between the treatment and the control. Because this is an A/A test, there is no difference. With alpha set to 0.05, the number of rejections far exceeds that of the threshold set for Type 1 error. If you peek at the results, num\_reject should never be higher than 5.

Compare that to a sequential testing approach. In this example, there are, again, 100 A/A tests, and alpha is set to 0.05. Peeking at your results on a regular interval and the p-value goes below alpha. You can conclude that the test has reached statistical significance. As a result of using this statistical method, the number of false positives stays below this threshold:

![Image showing sequential testing approach that includes peeking at the results before the end of the experiment. Results conclude the experiment has reached statistical significance.](/docs/output/img/faq/image5-png.png)

With always-valid results, you can end your test any time the p-value goes below the threshold. From 100 trials where alpha = 0.05, the number of those that fall below that threshold is 4, so Type 1 errors are still controlled.

The table below summarizes the number of rejections for different configurations of the experiment when you run a sequential test with mSPRT:

|   | alpha | beta  | baseline  | delta\_true  | num\_reject  |
|-----|-----|-----|-----|-----|-----|
| 0 | 0.05  | 0.2 | 0.01 |  0.0 | 0 |
| 1 | 0.05  | 0.2 | 0.05  | 0.0 | 0 |
| 2 | 0.05  | 0.2 | 0.10  | 0.0 | 1 |
| 3 | 0.05  | 0.2 | 0.20  | 0.0 | 0 |

Using the same basic configurations as before, the number of rejections (out of 100 trials) is within the predetermined threshold of alpha = 0.05. With alpha set to 0.05, only 5% of the experiments yield false positives, as opposed to 30-50% when using a T-test. 
{{/partial:collapse}}