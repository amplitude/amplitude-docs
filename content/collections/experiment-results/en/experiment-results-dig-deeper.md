---
id: 48014e0e-3130-40cc-ba15-946d6a16b51b
blueprint: experiment-result
title: 'Dig deeper into experimentation data with Experiment Results'
source: 'https://help.amplitude.com/hc/en-us/articles/360062072631-Dig-deeper-into-experimentation-data-with-Experiment-Results'
this_article_will_help_you:
  - 'Extend the analytic power of A/B tests you create in Amplitude Experiment'
landing: true
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720542850
landing_blurb: 'Extend the analytic power of A/B tests you create in Amplitude Experiment'
---
Experiment results lets you delve into the data that was collected from your experiments. Experiment results can incorporate data and information from non-Amplitude feature-flagging platforms and use that external data within Amplitude's native planning, tracking, and analysis tools. This data is incorporated into Amplitude's A/B tracking data which is generated through Experiment.

The Experiment Results chart is available to growth and enterprise plans. For more information, go to Amplitude's [pricing page](https://amplitude.com/pricing).

## Before you begin

Before using Experiment Results, ensure you’ve instrumented the [metric events](/docs/feature-experiment/advanced-techniques/advanced-metric-use-cases) that are relevant to your experiment. Without metric events, you can't create the success metrics and goals that Experiment Results needs to compare each variant in its analysis.

Additionally, make sure you’ve instrumented the necessary [exposure events](/docs/apis/experiment/experiment-management-api-experiments#exposureevent), which represent the delivery of a variant to a user participating in the experiment.

You may also find information in the [Experiment Results FAQ article](/docs/faq/experiment-analysis) page. 

## Analyze an A/B test using Experiment Results

##### To create an A/B test and view the results

1. Navigate to *Create > Chart > Experiment Results*.
2. In the Metrics module, click **Add Metric** or **Define single-use metric** to define your primary metric.
3. If adding a single-use metric, use the drop-down menu to specify the metric type. You can choose one of:

      * Unique conversions
      * Event totals
      * Sum of property value
      * Average of property value
      * Funnel conversion
      * Formula
    
    {{partial:admonition type="note" heading=""}}
    The Retention metric has been deprecated and is no longer available.
    {{/partial:admonition}}

	The first four are available for individual event metric analyses, while funnel conversion allows you to define a multi-step journey that users must complete for the conversion to count. The Formula metric allows you to [define a formula](/docs/analytics/charts/experiment-results/experiment-results-use-formula-metrics) centered around a selected event or events. 

	{{partial:admonition type='note'}}
	Any of the above metrics can be used as a [custom metric during the design phase in Amplitude Experiment](/docs/feature-experiment/workflow/define-goals). 
	{{/partial:admonition}}

4. Specify the event to use for this metric. You can also filter the event using a **Where** clause. 
5. When you’re finished, click **Done**.   

	![where_filter.png](/docs/output/img/experiment-results/where-filter-png.png)

	Optionally, click **Add Metric** or **Define single-use metric** in the Secondary Metrics module to add a second, subordinate metric to the analysis. You can add multiple secondary metrics as necessary.

6. Click **Add Event** in the Exposure module to define your experiment’s exposure event. The exposure event is the event users must trigger to become part of the experiment.
7. In the Variants performed by module, click **Add Experiment Variant** to add your variants. All experiments require at least one variant, known as the control. 
  
  ![add_variant.png](/docs/output/img/experiment-results/add-variant-png.png)
  
  Choose the properties and values that defines your variant and click **Apply**.

8. Click **Add Experiment Variant** to add additional variants to reflect the experiment setup in your feature flagging system.

Amplitude calculates your statistical results as they're available and displays them in the Results area. The described results let you modify your experiment's [statistical settings](/docs/feature-experiment/workflow/finalize-statistical-preferences), such as from the default Sequential test to a T-test. 

## Interpret your results

While the specifics may vary depending on the metric types you’re using, four charts depict your results:

* **Confidence interval of absolute performance over time**: This chart is for [sequential testing](https://help.amplitude.com/hc/en-us/articles/17767898439835) only. It can help you identify when the experiment reaches statistical significance; which occurs when the confidence interval no longer includes zero.
* [**Cumulative exposure**](/docs/feature-experiment/advanced-techniques/cumulative-exposure-change-slope): This chart details the number of users who receive your experiment over time. The x-axis displays the first date of a user's exposure, and the y-axis displays a cumulative, running total of users exposed to the experiment.
* **Performance by variant**: The title of this chart is the metric you're focused on. The chart shows the number of users who did each step of a funnel, or the means of each variant if the metric isn't a funnel.
* **Mean over time** (cumulative or non-cumulative): On the x-axis, find the date the user was first exposed. On the y-axis is the mean of the selected metric. Click the dropdown under the metric table to select a metric. Amplitude selects the recommendation metric by default for each variant. This chart is like the conversion over time chart except that it also works for non-conversion metrics. From this chart, you can understand if there is any seasonality, novelty effects, or trends over time. Usually, the mean for days near the start of the experiment is larger than the mean for days near the end of the experiment because users at the start of the experiment have had more time to do the metric. This is less of a concern if you use the exposure attribution window. You can look at the cumulative or the non-cumulative view of this chart. The cumulative view can help smooth out some daily noise and make it easier to interpret the chart.

These charts are also helpful when [learning from your end-to-end experiment](/docs/feature-experiment/overview). 

{{partial:admonition type='note'}}
By default, Amplitude selects the primary metric in experiment results. You can choose a different metric in the *Analysis* module. Click the dropdown in the metric table to view the results. 
{{/partial:admonition}}

## Group By

There are more resources on group by in experiment [here](/docs/analytics/charts/group-by) and [here](/docs/feature-experiment/workflow/experiment-learnings).