---
id: 787229f3-9b4a-4819-a7cb-41554a29fd8b
blueprint: experiment-result
title: 'Using formula metrics in Experiment Results'
source: 'https://help.amplitude.com/hc/en-us/articles/13885412065179-Using-formula-metrics-in-Experiment-Results'
this_article_will_help_you:
  - 'Understand the different kinds of formula metrics supported by the Experiment Results chart'
  - 'Understand how Amplitude calculates statistical significance for formula metrics'
landing: true
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103685
landing_blurb: 'Understand the different kinds of formula metrics supported by the Experiment Results chart'
---
In an Experiment Results chart, using a **formula metric** offers you greater flexibility when performing analyses. A formula metric is a metric that consists of:

* at least one event, and
* a mathematical operation through which the events interact with each other.

If you've used [custom formulas in Event Segmentation](/analytics/charts/event-segmentation/event-segmentation-custom-formulas), this should be familiar to you. If not, take a minute to go back and read over that article before proceeding.

## Create a formula metric

To add a formula metric to your Experiment Results chart, follow the below steps:

1. In the Primary Metric module, click *+ Add Metric* and choose a formula from the *Formula* drop down options.

  ![select_formula.png](/output/img/experiment-results/select-formula-png.png)

2. Click *+ Define single-use metric*, then select *Formula* from the *Metric Type* dropdown in the modal that appears.  
  
  ![Screenshot 2023-07-31 at 2.13.04 PM.png](/output/img/experiment-results/screenshot-2023-07-31-at-2-13-04-pm-png.png)

3. Click *Select event ...* to begin selecting events to include in your formula metric. Repeat this step until all events are included.

2. In the *Formula* box, enter the formula that will calculate your formula metric. [Click here for a list of formulas that are supported by Experiment Results](#h_01GYB55B59PZ793RCSC6B32KJ7), or [here for an explanation of formula syntax](#h_01GYB56QRGWM2BZHNV2VSG53TW).

3. Add a name for this new formula metric. Click *Apply* when you're done. The metric will be added to your Experiment Results chart.

You can also view this metric in the [object management center](/data/object-management).

## Supported formula functions

The following formula functions are supported in Experiment Results:

**UNIQUES:**

**Syntax**: UNIQUES(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events Module.

Returns the number of unique users who triggered the event. 

**TOTALS:**

**Syntax**: TOTALS(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events Module.

Returns the total number of times the event was triggered.

**PROPSUM:**

**Syntax**: PROPSUM(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events Module.

This function will only work if you are grouping by a numerical property on the event. If grouping by multiple properties, the formula will perform the calculation with the first group-by clause.

Returns the sum of the property values you are grouping the specified event by.

**PROPAVG:**

**Syntax**: PROPAVG(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events Module.

This function will only work if you are grouping by a numerical property on the event. If grouping by multiple properties, the formula will perform the calculation with the first group-by clause.

Returns the average of the property values you are grouping by. This function is equivalent to `PROPSUM(event)/TOTALS(event)`. [Learn more about how Amplitude calculates PROPAVG and PROPSUM in this article](/experiment/under-the-hood/experiment-analysis-chart-calculation)

**CONVERSIONRATE (closed beta):**

**Syntax:** CONVERSIONRATE(array of events, conversion window, latency offset)

* **Array of Events:** Refer to the events in the funnel.
* **Conversion window:** Refers to the conversion window of the funnel. The unit is in seconds.
* **Latency Offset** (optional): Refers to latency in the data ingestion to Amplitude. The unit is in seconds.

{{partial:admonition type='note'}}
This function is supported for Experiment metrics only, and is currently only available to certain customers. To gain access, contact your Amplitude Customer Success Manager.
{{/partial:admonition}}

Returns the conversion rate (< 1) from 1st event to nth event of the array. This function internally uses Funnel Query to get the conversion rate.

![](/output/img/experiment-results/23576087044507)

**CONVERSIONAVG (closed beta):**

**Syntax:** CONVERSIONAVG(array of events, conversion window, latency offset)

* **Array of Events:** Refer to the events in the funnel.
* **Conversion window:** Refers to the conversion window of the funnel. The unit is in seconds.
* **Latency Offset** (optional): Refers to latency in the data ingestion to Amplitude. The unit is in seconds.

{{partial:admonition type='note'}}
This function is supported for Experiment metrics only, and is currently only available to certain customers. To gain access, contact your Amplitude Customer Success Manager. Also, this function will only work when grouping by a numerical property on the last event.
{{/partial:admonition}}

Returns the average value of the given property among all the users who completed the conversion. This function internally uses Funnel Query to get the average value among the converted users.

## Formula syntax

In your formulas, refer to events selected in the Events Module by their corresponding letter. The functions and the parameters are not case sensitive. You can also perform the following arithmetic operations:

* Parenthesis ()
* Addition (+)
* Subtraction (-)
* Multiplication (\*)
* Division (/)

## How Amplitude calculates experiment data for formula metrics

Before understanding how experiment data is calculated for formula metrics, it’s important to understand the overall [Experiment Analysis view](/experiment/analysis-view), which provides details for your experiment.

For formula metrics, Amplitude computes the results for each function independently to find the mean and variance of each one. The arithmetic operators are then applied on the results of these individual functions.   

Imagine you have defined a formula metric as `TOTALS(A) + TOTALS(B)`. Amplitude will calculate the variances and means of both components of this metric, as well as the covariance.

If we set X equal to TOTALS(A) and Y equal to TOTALS(B), the following statements hold:

* `V[X]` = Variance of X
* `E[X]` = Mean of X
* `V[Y]` = Variance of Y
* `E[Y]` = Mean of Y
* `Cov[X, Y]` = Covariance of X and Y, assumed to be zero for all mathematical operations.

* **Addition:**Variance: V[X + Y] = nV[X] + nV[Y]  
Mean: E[X + Y] = E[X] + E[Y]
* **Subtraction:**`Variance: V[X - Y] = nV[X] + nV[Y]  
Mean: E[X - Y] = E[X] - E[Y]`
* **Multiplication:**`Variance: V[X \* Y] = n^3 mu\_y^2 sigma\_x^2 + n^3 sigma\_y^2 mu\_x^2 + n^2 sigma\_x^2 sigma\_y^2  
Mean: E[X \* Y] = E[X] \* E[Y]`
* **Division:**`Variance:**![](/output/img/experiment-results/23576087077403)**Mean: E[X / Y] = E[X] / E[Y]`

Once we have the mean and variance of the overall formula metric, we can calculate the confidence interval chart and the p-values.

`Formula / Metric: TOTALS(A) / TOTALS(B)`