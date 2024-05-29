---
id: ddf41127-c15a-422c-be5b-9bdc91d6c721
blueprint: compass
title: 'Interpret your Compass chart, part 2: Correlation and cohorts'
source: 'https://help.amplitude.com/hc/en-us/articles/20963736374299-Interpret-your-Compass-chart-part-2-Correlation-and-cohorts'
this_article_will_help_you:
  - 'Understand correlation and why Compass uses it'
  - 'Create a cohort from your Compass chart results'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717019110
---
This article will further explain correlation and how it is applies to your Compass chart, and how to create a cohort from its results. See [Interpret your Compass chart, part 1](/analytics/charts/compass/compass-interpret-1) for a breakdown of how to read and interpret a Compass chart.

## Understanding correlation

Correlation is a measure of how two statistical variables relate to each other. Possible values range from -1 to 1, with a score of zero indicating there is no statistical relationship between the variables at all. A score of one indicates perfect positive correlation, while a score of -1 indicates perfect negative correlation.

Amplitude categorizes correlation scores like this:

* **Highly Predictive**: correlation >= 0.4
* **Moderately Predictive**: 0.3 <= correlation < 0.4
* **Slightly Predictive**: 0.2 <= correlation < 0.3
* **Not Predictive**: correlation < 0.2

In a Compass chart, the two variables to be correlated are:

* Did the user trigger the event in question at least a certain number of times; and
* Was the user retained in the target cohort?

You may have heard of different variations and definitions of correlation. Well-known examples include Matthews correlation, Pearson correlation, phi coefficient, and R-value. In this case, all these different methods generate equivalent results, because Compass looks at pairs of binary random variables.

Remember, **correlation is not causation**, so any hypotheses you come up with via a Compass analysis must still be **tested and verified** in the real world.

{{partial:admonition type='note'}}
 Use [Amplitude Experiment](/experiment/overview) to determine causality. 
{{/partial:admonition}}

### Why is correlation a good metric to use here?

When you're looking for that one metric that captures your users' "a-ha" moment, you want one where most users above a certain threshold go on to be retained, and most users below the threshold end up not being retained. Such a metric would have a threshold with a good [positive predictive value (PPV)](/analytics/charts/compass/compass-find-inflection-metrics).

However, you also have to consider is how easy it will be to move users across that threshold. If you find a threshold with a very strong PPV and NPV, but discover that it's very difficult to move users across it, that metric will not be of much help in growing your user base. A tell-tale sign of this would be if few of your users have crossed the threshold, or almost all of your users have already crossed it. This isn't always the case, of course—but in the absence of more specific information, it's generally a good assumption.

That's why Compass uses correlation to locate these thresholds: correlation accounts for PPV, NPV, and the proportion above the threshold. If the PPV is higher, the NPV is higher, or the fraction of users above the threshold is closer to 50%, then the correlation will also be higher. Likewise, if the PPV is lower, the NPV is lower, or the fraction of users above the threshold is further from 50%, then the correlation will be lower.

{{partial:admonition type='note'}}
This gets a little less clear-cut when it comes to negative correlations, but you won't typically be looking at negative correlations when using Compass.
{{/partial:admonition}}

## Create a cohort from your results

You can create a cohort from your results by clicking *Create Cohort.* Then Amplitude will automatically compare their retention to new user retention.

This comparison is based on **`Any Active Event`**, and not simply `Any Event`.

Clicking *Show* (next to *Correlation Table*) will bring up a detailed [contingency table](/analytics/charts/compass/compass-find-inflection-metrics) that shows the count of users in your base cohort in each of four categories: true positives, false positives, false negatives, and true negatives. 

![](/output/img/compass/Screen_Shot_2016-12-06_at_2.59.32_PM.png)

Likewise, you can see detailed statistics on your cohort by clicking *Show* (next to *Detailed Statistics*):  

![](/output/img/compass/Screen_Shot_2016-11-16_at_11.15.49_AM.png)

You can read more about these statistics [here](/analytics/charts/compass/compass-find-inflection-metrics).

Next, be sure to read the Help Center article on how to use [Compass to identify the moments in the user journey that are critical to driving growth](/analytics/charts/compass/compass-find-inflection-metrics).