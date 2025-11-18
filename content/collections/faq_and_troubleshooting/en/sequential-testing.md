---
id: 9321f1f0-9d43-4d74-848d-8f0a056ca412
blueprint: faq_and_troubleshooting
title: 'Sequential testing'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/17767898439835'
hide_content: true
---
This article covers some frequently asked questions about [sequential testing](/docs/feature-experiment/under-the-hood/experiment-sequential-testing).


{{partial:collapse name="What is the statistical power of this approach?"}}
Given enough time, the statistical power of Amplitude's sequential testing method is 1. If there is an effect size to be detected, this approach detects it.
{{/partial:collapse}}

{{partial:collapse name="Why don’t I see any confidence interval on the Confidence Interval Over Time chart?"}}
This is because the thresholds haven’t been met yet. 

For uniques, Experiment waits until there are at least 25 conversions and 100 exposures each for the treatment and control. Then it starts computing the p-values and confidence intervals.

For average totals and sum of property, Experiment waits until it has at least 100 exposures each for the treatment and control.
{{/partial:collapse}}

{{unless hide_content}}

{{partial:collapse name="Why hasn’t the p-value or confidence interval changed, even though the number of exposures is greater than 0?"}}
For uniques, Amplitude Experiment doesn't compute p-values and confidence intervals until there are at least 25 conversions and 100 exposures each for both the treatment and control.

For average totals and sum of property, Experiment waits until it has at least 100 exposures each for the treatment and control.
{{/partial:collapse}}

{{partial:collapse name="What are we estimating when we choose Uniques?"}}
This measures whether or not your visitors fired a specific event. The result is the proportion of the population that has taken this action. It’s a comparison of proportions, or the conversion rates between treatment and control.
{{/partial:collapse}}


{{partial:collapse name="What are we estimating when we choose Average Totals?"}}
This counts the average **number of times** a visitor has fired an event. For each visitor, Experiment counts the number of times they took the action you’re interested in, and then averages that across the sample within both the control and treatment. The result is a comparison of the average totals between the treatment and control.
{{/partial:collapse}}

{{partial:collapse name="What are we estimating when we choose Average Sum of Property?"}}
This sums the values of an event per user on a specific property. For example, if you’re interested in getting the total cart value of a user across all times, you’d pick the event “add to cart,” with the property of “cart value”. The result of this specific example is a comparison of the average cart value between treatment and control.
{{/partial:collapse}}

{{partial:collapse name="What is absolute lift?"}}
This is the absolute difference between treatment and control.
{{/partial:collapse}}

{{partial:collapse name="What is relative lift?"}}
This is the absolute lift scaled by the mean of the control. Some people find this value useful to determine the relative change a treatment has with respect to the baseline.
{{/partial:collapse}}
{{/unless}}

{{partial:collapse name="Why does absolute lift exit the confidence interval?"}}
Occasionally you may find the absolute lift exit the confidence interval, which can cause confidence bounds to flip. This happens when the parameter you’re estimating (in other words, absolute lift) changes over time and the allocation for your treatment and control has changed. The underlying assumption in the statistical model Experiment uses is that the absolute lift and variant allocation don't change over time. 

![Graph displaying values that show that the absolute lift and variant allocation remaining constant over time.](/docs/output/img/faq/image6-png.png)

The good thing about Experiment’s approach is that it’s robust to handle **symmetric time variation**, which occurs when both the treatment and control maintain their absolute difference over time, and their means vary in sync.

One option is to choose a different starting date (or date range) where the absolute lift is more stable and the allocation is static.

This may also happen if there is novelty effect or a drift in lift over time. Sequential testing allows for a flexible sample size. Because of this, whenever there is a large time delay between exposure and conversion for your test metrics, you shouldn't stop the test before considering the impact of exposed users who haven't yet had time to convert. To do this, you could:

* Compare the average time to convert for each variant using a funnel chart
* Adjust the date range when analyzing the experiment results to include users who were exposed but converted after you stopped the test
{{/partial:collapse}}


{{partial:collapse name="How does sequential testing compare to a T-test?"}}
Using sequential testing lets you look at the results whenever you like. But fixed-horizon tests—such as T-tests, for example—can give you inflated false positives if you peek while your experiment is running.

Below is a visualization of p-values over time in a simulation run of 100 A/A tests for a particular configuration (alpha=0.05, beta=0.2). A T-test run on data coming in, you can peek at the results at regular intervals. Whenever you find the p-value fall below alpha, you can stop the test and conclude that it has reached statistical significance.

![P-values over time where 100 A/A tests were run for a consistent time frame. Displays statistical significance.](/docs/output/img/faq/image7-png.png)

Within the example, p-values fluctuate, even before the end of the test when you have reached 10,000 visitors. By peeking, you are **inflating the number of false positives**. The table below summarizes the number of rejections for different configurations of the experiment when running a T-test.

![Table describing fluctuations in p-values with the num-reject numbers movoving from 38-59 to signify a fluctuation in p-values.](/docs/output/img/faq/image9-png.png)

Here, **baseline** is the conversion rate of the control variant, and **delta\_true** is the absolute difference between the treatment and the control. Since this is an A/A test, there is no difference. With alpha set to 0.05, the number of rejections far exceeds that of the threshold that's set for Type 1 error **if we peek at our results**—num\_reject should never be higher than 5 in this example.

Now compare that to a sequential testing approach. Again, there are 100 A/A tests, and alpha is set to 0.05. 
Peeking at the results on a regular interval and if the p-value goes below alpha, you can conclude that the test has reached statistical significance. As a result of using this statistical method, the number of false positives stays below this threshold:

![Graph of a sequential testing approach. Describes the results of 100 A/A tests over time. Because the p-values goes below alpha, the test reaches statistical significance.](/docs/output/img/faq/image5-png.png)

With always-valid results, you can end the test any time the p-value goes below the threshold. From 100 trials where alpha = 0.05, the number of those that fall below four, so Type 1 errors are still controlled.

The table below summarizes the number of rejections for different configurations of the experiment when we run a sequential test with mSPRT:

![Table describing the number of rejections for different configurations.](/docs/output/img/faq/image8-png.png)

Using the same basic configurations as before, the number of rejections (out of 100 trials) is within the predetermined threshold of alpha = 0.05. With alpha set to 0.05, we know that only 5% of experiments yield false positives, as opposed to 30-50% when using a T-test. With sequential testing, you can confidently review the results and conclude experiments at any time, without worrying about inflating false positives.

{{partial:admonition type='note'}}
 Read about the [T-test in this help center article](/docs/feature-experiment/experiment-theory/analyze-with-t-test), and more about the difference in testing options [in this blog](https://amplitude.com/blog/sequential-test-vs-t-test).
{{/partial:admonition}}

{{/partial:collapse}}