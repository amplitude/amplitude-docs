---
id: 3fc06830-001c-4c85-9d1f-6fc7c5ea7a39
blueprint: chart
title: 'Group-bys: How Amplitude prunes and orders chart results'
source: 'https://help.amplitude.com/hc/en-us/articles/360031259831-Group-bys-How-Amplitude-prunes-and-orders-chart-results'
this_article_will_help_you:
  - 'Understand when and why Amplitude Analytics truncates group-by query results'
  - 'Understand how Amplitude Analytics prioritizes group-by results'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720212375
---
In its basic form, Amplitude's **group-by** feature is a tool for categorizing events for aggregation. 

![group_by.png](/docs/output/img/charts/group-by-png.png)

For example, when you want to count the number of events by country, you'd use a group-by:

![group_by_2.png](/docs/output/img/charts/group-by-2-png.png)  

Check out [this article for a more detailed look at group-by visualization in Amplitude's Event Segmentation charts](/docs/analytics/charts/build-charts-add-events).

## Group-by result limits

For performance purposes, Amplitude sets a maximum limit on the number of groups a query result can return. When this limit is exceeded, the top groups are kept, while the rest are pruned from the query result. The top groups are determined in accordance with the table below.

With a single group-by in the Event Segmentation chart, results may be limited to 100 group-by results. For double group-bys, results may be limited to 500 group by results, in which each group by value pair is counted as a single result.

[See this article for more details about limits in Amplitude](/docs/faq/limits).

## Group ordering

This table shows how Amplitude prioritizes group-bys for display in the Breakdown Table:

|  |  |
| --- | --- |
| **Metric** | **Ordering** |
| Uniques | Number of unique users |
| Totals | Total number of events |
| % Active | Number of unique users |
| Average | Total number of events |
| Frequency | Number of unique users |
| Distribution of Property Value | Total number of events |
| Sum of Property Value | Sum of property values |
| Average of Property Value | Sum of property values |
| Distinct Property Values Per User | Total number of (user, property value) pairs |
| Formulas: Percentile | Total number of events |
| Formulas: Frequency Percentile | Total number of events |
| Formulas: Property Count | Number of unique properties |
| Formulas: Property Count Average | Total number of (user, property) pairs |
| Formulas: Default | Number of unique users |

## Formulas with group ordering

For formulas *without* a group-by, this ordering is only used if every metric in the formula uses the same ordering. Otherwise, Amplitude uses the default formulas ordering.

For formulas *with* a group-by, Amplitude ranks the groups by the largest overall values *per group* summed across all formulas in a single expression.

{{partial:admonition type='note'}}
If group-by pruning occurs with multiple formula terms combined with operators, formulas may take longer to load because Amplitude runs additional queries to make sure that all formula terms are querying the same groups.
{{/partial:admonition}}

## Group By in Experiment

Everything in this doc so far is for analytics chart excluding experiment results. In Experiment end to end and experiment results, we limit the number of group by groups returned to 10. The rows are sorted by the sum of exposures across all the variants. Some rows may have "(none)" which means the property is missing. See this [doc](docs/faq/unexpected-values-in-user-counts) for more information. The group by is applied to the exposure event.

On the statistics side of things, people may worry about [multiple hypothesis testing](docs/feature-experiment/advanced-techniques/multiple-hypothesis-testing) when using a group by. Amplitude experiment does not do any additional corrections for using a group by because we don't know how much slicing and dicing you are going to do before the analysis. Also, using group bys is more doing exploratory work and it will get very hard to reach stat sig if you have doing lots of hypothesis tests. If you are worried that you might have found a false positive, one way is to split your experiment into to date ranges, and do all the peeking and hypothesis testing you want on one dataset and then see if those results are reproducible on the second date range. You can think of this as similar to doing a [train-test split](https://machinelearningmastery.com/train-test-split-for-evaluating-machine-learning-algorithms/) when you are training a Machine Learning model where you do the hyperparameter tuning on the training set and then evaluate the model on the unseen test set so you get an unbiased error estimate.

### Limitations

If the value of the property you are grouping by on changes between the exposure event and the metric event. For example, if you are grouping by Country and you are looking at the row Country = Spain, the denominator is unique number of exposures in Spain and the numerator is people who did the metric event in Spain. So you can end up with conversion rates greater than 100% since someone can do a metric event in Spain but never do the exposure event in Spain. So they would get counted in the numerator but not the denominator. The opposite is also true where the numerator gets undercounted instead of overcounted. If you group by Platform and look at the Platform = Web row and the exposure event has platform = web and the metric event has platform != web, those metric events will not get counted in the numerator.
