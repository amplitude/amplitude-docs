---
id: 471c8803-2fdc-4ef6-8bd3-cc7b0cf6f001
blueprint: faq_and_troubleshooting
title: 'Experiment Analysis'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/17986231773595'
category: experiment
---
This article covers frequently-asked questions about [Amplitude's Experiment Results chart](/docs/analytics/charts/experiment-results/experiment-results-dig-deeper).


{{partial:collapse name="Why is my graph displaying an error state?"}}
A common mistake is to attempt to generate a chart using only one variant.

The Experiment Results chart needs something to compare your control to in order to generate results. If you neglect to include **both** the control and **at least one** variant, your chart will not display anything.
{{/partial:collapse}}


{{partial:collapse name="Why is reaching significance taking longer than it should?"}}
When using a [T-test](/docs/experiment/experiment-theory/analyze-with-t-test), you will have to wait until your experiment reaches the specified sample size before Experiment Results will run the p-value and confidence interval computations.

With sequential testing, even with a large MDE, it can take some time to reach statistical significance if your experiment’s lift is small. A T-test will generally require fewer samples to detect the same lift.
{{/partial:collapse}}

{{partial:collapse name="How is the Retention metric calculated?"}}
Amplitude uses two parameters to calculate Return On for the Retention metric:

* **The return event**: The event you hope the user performs **after** the exposure event (aka, the starting event). The user is counted as retained if they trigger the return event.
* **Return on the nth day/week/month**: The number of days/weeks/months you want to see between a user performing the exposure event and the return event. This parameter is calculated in 24 hour increments and does not use calendar dates.

For example, a user performs an exposure event and a return event:

* Exposure event: `Page Viewed`
* Return event: `Add to cart`

With a return on the **nth day** value of seven (seven days), the user will be counted as retained **if** the `Add to cart` event is triggered **between** seven days and seven days plus 24 hours from performing the `Page Viewed` exposure event.

If the return on value shifts to an **nth week** value of one (one week or seven days), the user will be counted as retained **if** they perform `Add to cart` anytime **between** days seven (week one) and 14 (week two) since performing `Page Viewed`. 

For a return on **nth month** value of one (30 days), the user will be counted as retained **if** they perform `Add to cart` anytime **between** days 30 (month one) and 60 (month two) since performing `Page Viewed`. 

{{/partial:collapse}}