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

