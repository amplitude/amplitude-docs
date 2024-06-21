---
id: 9321f1f0-9d43-4d74-848d-8f0a056ca412
blueprint: faq_and_troubleshooting
title: 'Sequential testing'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/17767898439835'
---
This article covers some frequently asked questions about [sequential testing](/docs/experiment/under-the-hood/experiment-sequential-testing).


{{partial:collapse name="What is the statistical power of this approach?"}}
Given enough time, the statistical power of our sequential testing method is 1. If there is an effect size to be detected, this approach will detect it.
{{/partial:collapse}}

{{partial:collapse name="Why hasn’t the p-value or confidence interval changed, even though the number of exposures is greater than 0?"}}
For uniques, Amplitude Experiment does not compute p-values and confidence intervals until there are at least 25 conversions and 100 exposures each for both the treatment and control.

For average totals and sum of property, Experiment waits until it has at least 100 exposures each for the treatment and control.
{{/partial:collapse}}


{{partial:collapse name="Why don’t I see any confidence interval on the Confidence Interval Over Time chart?"}}
This is because the thresholds haven’t been met yet. 

For uniques, Experiment waits until there are at least 25 conversions and 100 exposures each for the treatment and control. Then it will start computing the p-values and confidence intervals.

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


{{partial:collapse name="Why does absolute lift exit the confidence interval?"}}
Occasionally you may see the absolute lift exit the confidence interval, which can cause confidence bounds to flip. This happens when the parameter you’re estimating (i.e. absolute lift) changes over time and the allocation for your treatment and control has changed. The underlying assumption in the statistical model Experiment uses is that the absolute lift and variant allocation **do not** change over time. 

![image6.png](/docs/output/img/faq/image6-png.png)

The good thing about Experiment’s approach is that it’s robust to handle **symmetric time variation**, which occurs when both the treatment and control maintain their absolute difference over time, and their means vary in sync.

One option is to choose a different starting date (or date range) where the absolute lift is more stable and the allocation is static.

This may also happen if there is novelty effect or a drift in lift over time. Sequential testing allows for a flexible sample size. Because of this, whenever there is a large time delay between exposure and conversion for your test metrics, you **should not** stop the test before considering the impact of exposed users who have not yet had time to convert. To do this, you could:

* Compare the average time to convert for each variant using a funnel chart
* Adjust the date range when analyzing the experiment results to include users who were exposed but converted after you stopped the test
{{/partial:collapse}}


{{partial:collapse name="How does sequential testing compare to a T-test?"}}
Using sequential testing lets you look at the results whenever you like. But fixed-horizon tests—such as T-tests, for example—can give you inflated false positives if you peek while your experiment is running.

Below is a visualization of p-values over time in a simulation we ran of 100 A/A tests for a particular configuration (alpha=0.05, beta=0.2). As we ran a T-test on data coming in, we peeked at our results at regular intervals. Whenever we see the p-value fall below alpha, we stop the test and conclude that it has reached statistical significance.

![image7.png](/docs/output/img/faq/image7-png.png)

You can see the p-values fluctuate quite a bit, even before the end of our test when we’ve reached 10,000 visitors. By peeking, we are **inflating the number of false positives**. The table below summarizes the number of rejections we have for different configurations of our experiment when we run a T-test.

![image9.png](/docs/output/img/faq/image9-png.png)

Here, **baseline** is the conversion rate of our control variant, and **delta\_true** is the absolute difference between our treatment and the control. Since this is an A/A test, there is no difference. With alpha set to 0.05, we can see that the number of rejections far exceeds that of our threshold that we set for our Type 1 error **if we peek at our results**—num\_reject should never be higher than 5 in this example.

Now compare that to a sequential testing approach. Again, we have 100 A/A tests, and alpha is set to 0.05. We peek at our results on a regular interval and if we see the p-value go below alpha, we conclude that the test has reached statistical significance. As a result of using this statistical method, the number of false positives stays below this threshold:

![image5.png](/docs/output/img/faq/image5-png.png)

With always-valid results, we can end our test any time the p-value goes below the threshold. From 100 trials where alpha = 0.05, the number of those that fall below that is four, so Type 1 errors are still controlled.

The table below summarizes the number of rejections we have for different configurations of our experiment when we run a sequential test with mSPRT:

![image8.png](/docs/output/img/faq/image8-png.png)

Using the same basic configurations as before, we see that the number of rejections (out of 100 trials) is within our predetermined threshold of alpha = 0.05. With alpha set to 0.05, we know that only 5% of our experiments will yield false positives, as opposed to 30-50% when using a T-test. With sequential testing, we can confidently look at our results and conclude experiments at any time, without worrying about inflating false positives.

{{partial:admonition type='note'}}
 Read about the [T-test in this help center article](/docs/experiment/experiment-theory/analyze-with-t-test), and more about the difference in testing options [in this blog](https://amplitude.com/blog/sequential-test-vs-t-test).
{{/partial:admonition}}

{{/partial:collapse}}