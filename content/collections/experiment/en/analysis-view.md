---
id: c43935f9-32e2-4ac9-82ed-9513d66203b8
blueprint: experiment
title: 'The Experiment Analysis view'
source: 'https://help.amplitude.com/hc/en-us/articles/8485952382235-Understand-the-Experiment-Analysis-view'
this_article_will_help_you:
  - 'Understand what the *Analysis* view tells you about your experiment, and how to access it'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716329050
---
Within Amplitude Experiment, the **Experiment Analysis** view is where you’ll find the details of your experiment. Visible on the *Analysis* card under the *Activity* tab, it gives you a convenient way to quickly take in the most important, high-level statistical measurements that help you decide if your experiment was a success.

This article describes what each of the columns in this table means, and how they relate to your experiment.

## Metric name and variant

The first two columns, **Metric name** and **Variant**, are straightforward. The first contains the names of the metrics that you currently have selected. The top metric is the [recommendation metric](/docs/experiment/key-terms); all other metrics are secondary metrics. The second contains the names of the variants in the experiment. This includes the control and all treatments.

Hover over a metric's name to see its definition. 

Click the metric dropdown below the table to update analysis charts for that metric: confidence interval over time, mean over time, and the bar chart or funnel chart.

{{partial:admonition type='note'}}
If you want to look at segments of users, from the *Analysis* card click *Open in Chart,* then add a *where* clause by clicking on *Select property... .* This allows you to review results by a specific group of users. 
{{/partial:admonition}}

##  Significance

**Significance** is the likelihood that the performance displayed for each test variant is actually different from zero, and isn't due to random fluctuations in the data. The higher this value is, the more confident you can be in your results. More formally, this is *1 - p-value*.

## Relative performance

**Relative performance** measures the relative difference between how the variant performed and how the control performed. In other words, it measures the difference between how the variant performed and how the control performed. (In other products, this is often called **relative lift**.) You can cross-check this value by expanding a single metric’s section and then dividing the absolute lift for a variant by the absolute value of the control for that metric. 

## Absolute value

The specific meaning of the **absolute value** column depends on the metric type. For **unique** conversions, Experiment expresses values as a percentage, indicating the percentage of users (over the total number of exposed users) who converted for each variant. The numerator (Conversions) and denominator (Exposures) appear below the percentage. 

Otherwise, the value indicates the **aggregate** (total events, sum of property value, average of property value) per exposed user. The denominator used here is the total number of exposures. For example, 10 total events / 4 exposures = on average, an exposed user had 2.5 conversion events.

## Confidence interval

The **confidence interval** column displays the [confidence interval](https://en.wikipedia.org/wiki/Confidence_interval) of the **difference** between treatment and control.  

You can understand this as a range of values that includes the parameter you’re trying to measure, which in this case is the difference in the [**means**](https://en.wikipedia.org/wiki/Arithmetic_mean) between the variant and the control. This isn't a probability. Instead, interpret it this way: If you conduct this experiment 100 times and have the confidence level set at 95, you expect the true value of the parameter to fall within this range at least 95 times.

The confidence interval shown reveals characteristics about what the experiment has observed thus far:

* Confidence Interval **contains** 0: There’s not enough evidence to decide whether there’s a difference between control and treatment.
* Confidence Interval **greater than** 0: The interval (upper and lower confidence bounds) is greater than zero. Amplitude Experiment has accumulated enough observations to reach statistical significance, and you can conclude that the variant has a **positive effect** compared to control. For example, if you look at lift, expect a variant with a confidence interval greater than zero can to perform better than the control.
* Confidence Interval **less than** 0: Amplitude Experiment has accumulated enough observations to reach statistical significance, and you can conclude that the variant has a **negative effect** compared to control. If, as in the last example, you look at lift, expect a variant with a confidence interval less than zero to perform worse than the control.

If you have multiple variants, select the one you want to view in the confidence interval chart from the drop-down above the chart.