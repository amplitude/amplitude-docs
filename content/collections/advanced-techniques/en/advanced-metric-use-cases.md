---
id: e05c2f18-2f1f-4391-ae18-cc1248444688
blueprint: advanced-technique
title: 'Advanced metric use cases'
source: 'https://help.amplitude.com/hc/en-us/articles/18888080184475-Advanced-metric-use-cases-in-Amplitude-Experiment'
this_article_will_help_you:
  - "Learn how to use your experiment's metrics in a funnel analysis"
  - 'Analyze your experiment results based on a subset of users'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716329332
---
This article reviews advanced use cases that you may face while analyzing your experiment's results. 

## Case 1: Create a funnel analysis based on your experiment's metrics

Imagine a conversion funnel with five steps, where step three represents the exposure event for your experiment. To reduce noise and increase the likelihood of reaching statistical significance, Amplitude Experiment only counts metric events **after** the exposure event. If the exposure event is step three of the funnel, and you include the whole funnel as a metric, the number of conversions for the funnel is zero. The best way to measure the actual conversion rate of your funnel is to make steps three through five a standalone metric in your experiment.

Sometimes, you may need further analysis of your experiment's conversion rates in a funnel analysis. 

Follow these steps to use your experiment's metrics in a [Funnel Analysis chart](/docs/analytics/charts/funnel-analysis/funnel-analysis-get-the-most):

1. Add the events for your funnel analysis in the Events module.
2. In the *Measured as* module, choose the *Conversion* time window, then specify the counting method (unique users or totals)*.*
3. Select your analysis unit or group type (for example, *Any Users*) in the Segment By module.
4. Create a user segment for each variant of your experiment.

  ![](/docs/output/img/advanced-techniques/20464390610203.png)

5. Click *+ Performed* to add filters with your experiment's flag key and variant.
6. Set the date range for *any time since* to match the start date of your experiment.

The results of your Funnel Analysis chart may vary slightly from those of your experiment. This is because funnel analyses and experiments don't handle users who [variant jump](/docs/feature-experiment/troubleshooting/variant-jumping) the same way. 

For example, a funnel analysis includes all users who meet its filter requirements; then, based on those filtered users, it computes the conversion rate of the funnel. This means the funnel analysis may include a user **even if** they were exposed to your experiment's exposure event **after** they completed the funnel. 

### Analyze your experiment data using other Amplitude Analytics metrics

Amplitude Analytics offers metrics that Amplitude Experiment doesn't. You can also use the steps in the previous section to analyze things like time to convert or [return on or after retention](/docs/analytics/charts/retention-analysis/retention-analysis-build) (though these measurements only consider a user's first conversion). 

Read this [Help Center article on funnel analysis' FAQs](https://help.amplitude.com/hc/en-us/articles/360054203872) to learn more.

## Case 2: Analyze your experiment's results based on a subset of users

Imagine your experiment targets all users, but you want to take a deeper look at the experiment's effect on a subset of users, such as exposed users in the United States only. It may be tempting to simply add a filter on the country property; however, this doesn't generate the results you expect. 

When you create a metric, Amplitude computes that metric on **all** exposed users. If you add a filter for users in the United States to the metric event, the numerator includes the filter but the denominator doesn't.

Follow these steps to filter a subset of users in your experiment results:

1. From the *Analyze* tab in your experiment, click *Open in Chart.*
2. In the *Variants performed by* section, click *+Filter by* to add a filter for the Country property.

![](/docs/output/img/advanced-techniques/20464386075547.png)

{{partial:admonition type='note'}}
This method filters both the numerator and the denominator of the mean values so that you may correctly analyze the desired subset of users exposed to your experiment. 
{{/partial:admonition}}

Be cautious of analyzing your experiment's results based on just one subset. You may encounter a false positive when looking for true statistically significant results.

Remember that when you run a [multiple hypothesis test](/docs/feature-experiment/advanced-techniques/multiple-hypothesis-testing) in this situation, you're actually running a separate hypothesis test for each segment. You may see a positive lift with one subset and a negative with another subset. Your decision whether to roll out or roll back in these situations isn't clear-cut. One option is to roll out only to the group that shows positive lift.

## Case 3: Threshold Metrics

Sometimes you want to define a success as a user doing an event multiple times. In other words, if the user needs to buy something 3 times to count as a conversion. You can achieve this by creating a funnel counting by uniques with 3 purchase events.
