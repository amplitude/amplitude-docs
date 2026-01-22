---
id: 471c8803-2fdc-4ef6-8bd3-cc7b0cf6f001
blueprint: faq_and_troubleshooting
title: 'Experiment Analysis'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/17986231773595'
category: experiment
---
This article covers frequently asked questions about [Amplitude's Experiment Results chart](/docs/analytics/charts/experiment-results/experiment-results-dig-deeper).


{{partial:collapse name="Why is my graph displaying an error state?"}}
A common mistake is to attempt to generate a chart using only one variant.

The Experiment Results chart must have two or more variants so that it can display comparison results. If you neglect to include both the control and at least one variant, your chart won't display anything.
{{/partial:collapse}}


{{partial:collapse name="Why is reaching significance taking longer than it should?"}}
When using a [T-test](/docs/feature-experiment/experiment-theory/analyze-with-t-test), you must wait until your experiment reaches the specified sample size before Experiment Results runs the p-value and confidence interval computations.

With sequential testing, even with a large MDE, it can take some time to reach statistical significance if your experiment’s lift is small. A T-test generally requires fewer samples to detect the same lift.
{{/partial:collapse}}

{{partial:collapse name="How is the Retention metric calculated?"}}
Amplitude uses three parameters to calculate Return On for the Retention metric:

* **The starting event**: The event that occurs **after** the exposure event. This marks the beginning of the retention window.
* **The return event**: The event you hope the user performs after the starting event. The user is counted as retained if they trigger the return event.
* **Return on the nth day/week/month**: The number of days/weeks/months between a user performing the starting event and the return event. This parameter is calculated in 24 hour increments and doesn't use calendar dates.

For example, a user performs an exposure event, a starting event, and a return event:

* Exposure event: `Page Viewed`
* Starting event: `Sign Up`
* Return event: `Add to cart`

With a return on the **nth day** value of seven (seven days), the user is counted as retained **if** the `Add to cart` event is triggered **between** seven days and seven days plus 24 hours from performing the `Sign Up` starting event.

If the return on value shifts to an **nth week** value of one (one week or seven days), the user is counted as retained **if** they perform `Add to cart` anytime **between** days seven (week one) and 14 (week two) since performing `Sign Up`. 

For a return on **nth month** value of one (30 days), the user is counted as retained **if** they perform `Add to cart` anytime **between** days 30 (month one) and 60 (month two) since performing `Sign Up`. 

{{/partial:collapse}}