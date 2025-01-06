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
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1731622844
landing_blurb: 'Understand the different kinds of formula metrics supported by the Experiment Results chart'
---
In an Experiment Results chart, using a **formula metric** offers you greater flexibility when performing analyses. A formula metric is a metric that consists of:

* at least one event, and
* a mathematical operation through which the events interact with each other.

If you've used [custom formulas in Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas), this should be familiar to you. If not, take a minute to go back and read over that article before proceeding.

## Create a formula metric

To add a formula metric to your Experiment Results chart, follow these steps:

1. In the Primary Metric module, click *+ Add Metric* and choose a formula from the *Formula* drop down options.

  ![select_formula.png](/docs/output/img/experiment-results/select-formula-png.png)

2. Click *+ Define single-use metric*, then select *Formula* from the *Metric Type* dropdown in the modal that appears.  
  
  ![Screenshot 2023-07-31 at 2.13.04 PM.png](/docs/output/img/experiment-results/untitled-metric.png)

3. Click *Select event ...* to begin selecting events to include in your formula metric. Repeat this step until you've selected all the events you need.

2. In the *Formula* box, enter the formula for calculating your formula metric. [Click here for a list of formulas Experiment Results supports](#Supported-formula-functions), or [here for an explanation of formula syntax](#Formula-syntax).

3. Add a name for this new formula metric. Click *Apply* when you're done. The metric now appears in your Experiment Results chart.

You can also view this metric in the [object management center](/docs/data/object-management).

## Supported formula functions

Experiment Results supports the formula functions listed here:

### UNIQUES

**Syntax**: `UNIQUES(event)`

* **Event:** Refers to the event you're interested in. This must be a letter corresponding to an event in the Events Module.

Returns the number of unique users who triggered the event. 

### TOTALS

**Syntax**: `TOTALS(event)`

* **Event:** Refers to the event you're interested in. This must be a letter corresponding to an event in the Events Module.

Returns the total number of times users triggered the event.

### PROPSUM

**Syntax**: `PROPSUM(event)`

* **Event:** Refers to the event you're interested in. This must be a letter corresponding to an event in the Events Module.

This function only works when grouping by a numerical property on the event. If grouping by multiple properties, the formula runs the calculation with the first group-by clause.

Returns the sum of the property values you're grouping the specified event by.

### PROPAVG

**Syntax**: `PROPAVG(event)`

* **Event:** Refers to the event you're interested in. This must be a letter corresponding to an event in the Events Module.

This function only works when grouping by a numerical property on the event. If grouping by multiple properties, the formula runs the calculation with the first group-by clause.

Returns the average of the property values you're grouping by. This function is the same as `PROPSUM(event)/TOTALS(event)`. [Learn more about how Amplitude calculates PROPAVG and PROPSUM in this article](/docs/feature-experiment/under-the-hood/experiment-analysis-chart-calculation)

### PROPCOUNT

**Syntax**: `PROPCOUNT(event)`

* Event: Refers to the event that interests you. This must be a letter that corresponds to an event in the Events card. The event property must be a number. If grouping by multiple properties, the formula runs the calculation with the first group by clause.
   
   Returns the number of distinct property values for the property the event is grouped by.

   `PROPCOUNT` is an estimate of distinct property values. This estimate comes from a [HyperLogLog algorithm](https://en.wikipedia.org/wiki/HyperLogLog), and its accuracy depends on amount of data it has to work with. Expect a relative error in the range of 0.1% for less than 12,000 unique values, and up to 0.5% for more than 12,000 unique property values, depending on the cardinality of the property.

### PROPMAX

**Syntax:** `PROPMAX(event)`

* **Event:** Returns the maximum value of the property you're grouping the specified event by. The property must be numeric. If grouping by multiple properties, the calculation uses the first group-by clause.

### PROPMIN

**Syntax**: `PROPMIN(event)`

* **Event:** Returns the minimum value of the property you're grouping the specified event by. The property must be numeric. If grouping by multiple properties, the calculation uses the first group-by clause.

### CONVERSIONRATE (closed beta)

**Syntax:** `CONVERSIONRATE(array of events, conversion window, latency offset)`

* **Array of Events:** Refer to the events in the funnel.
* **Conversion window:** Refers to the conversion window of the funnel. The unit is in seconds.
* **Latency Offset** (optional): Refers to latency in the data ingestion to Amplitude. The unit is in seconds.

{{partial:admonition type='note'}}
This function is supported for Experiment metrics only, and is currently only available to certain customers. To gain access, contact your Amplitude Customer Success Manager.
{{/partial:admonition}}

Returns the conversion rate (< 1) from 1st event to nth event of the array. This function internally uses Funnel Query to get the conversion rate.

![](/docs/output/img/experiment-results/23576087044507)

### CONVERSIONAVG (closed beta)

**Syntax:** `CONVERSIONAVG(array of events, conversion window, latency offset)`

* **Array of Events:** Refer to the events in the funnel.
* **Conversion window:** Refers to the conversion window of the funnel. The unit is in seconds.
* **Latency Offset** (optional): Refers to latency in the data ingestion to Amplitude. The unit is in seconds.

{{partial:admonition type='note'}}
This function is supported for Experiment metrics only, and is currently only available to certain customers. To gain access, contact your Amplitude Customer Success Manager. 

This function only works when grouping by a numerical property on the last event.
{{/partial:admonition}}

Returns the average value of the given property among all the users who completed the conversion. This function internally uses Funnel Query to get the average value among the converted users.

### PROPCOUNT

**Syntax:** `PROPCOUNT(event)`

* **Event:** Refers to the event that interests you. This must be a letter that corresponds to an event in the Events card. If grouping by multiple properties, the formula runs the calculation with the first group by clause.

Returns the number of distinct property values for the property the event is grouped by. In this setup, the formula retrieves the number of different departments covering all the items for which details were viewed:

![propcount_sidecontrols.png](/docs/output/img/experiment-results/propcount-sidecontrols-png.png)

`PROPCOUNT` is an **estimate** of distinct property values. This estimate comes from a [HyperLogLog algorithm,](https://en.wikipedia.org/wiki/HyperLogLog) and its accuracy depends on amount of data it has to work with. Expect a relative error in the range of 0.1% for less than 12,000 unique values, and up to 0.5% for more than 12,000 unique property values, depending on the cardinality of the property.

{{partial:admonition type="note" heading=""}}
`PROPCOUNT` supports only numeric event properties in Experiment.
{{/partial:admonition}}

### REVENUETOTAL

**Syntax:** `$:REVENUETOTAL(event)`

* **Event:** Refers to the revenue event. This must be a letter that corresponds to an event in the Event card. 
* This function only works if you are grouping by a numerical property on the event. 

Returns the aggregate sum of the property, formatted as a currency. It's the same as `PROPSUM(event)`. The `$:` prefix is optional. Its presence ensures the output format is a currency.

## Formula syntax

In your formulas, refer to events selected in the Events Module by their corresponding letter. The functions and the parameters aren't case-sensitive. You can also perform the following arithmetic operations:

* Parenthesis ()
* Addition (+)
* Subtraction (-)
* Multiplication (*)
* Division (/)

## How Amplitude calculates experiment data for formula metrics

Before getting into how calculations of formula metrics work with experiment data, it’s important to understand the [Experiment Analysis view](/docs/feature-experiment/analysis-view), which provides details for your experiment.

For formula metrics, Amplitude computes the results for each function independently to find the mean and variance of each one. It then applies the arithmetic operators to the results of these individual functions.   

Imagine you've defined a formula metric as `TOTALS(A) + TOTALS(B)`. Amplitude calculates the variances and means of both components of this metric, as well as the covariance.

If you set X equal to TOTALS(A) and Y equal to TOTALS(B), the following statements hold:

* `V[X]` = Variance of X
* `E[X]` = Mean of X
* `V[Y]` = Variance of Y
* `E[Y]` = Mean of Y
* `Cov[X, Y]` = Covariance of X and Y, assumed to be zero for all mathematical operations.

* **Addition:** 
    Variance: `V[X + Y] = nV[X] + nV[Y]`  
    Mean: `E[X + Y] = E[X] + E[Y]`

* **Subtraction:** 
    Variance: `V[X - Y] = nV[X] + nV[Y]`  
    Mean: `E[X - Y] = E[X] - E[Y]`

* **Multiplication:**
    Variance: `V[X * Y] = n^3 mu_y^2 sigma_x^2 + n^3 sigma_y^2 mu_x^2 + n^2 sigma_x^2 sigma_y^2`  
    Mean: `E[X * Y] = E[X] * E[Y]`
* **Division:** 
    Variance: ![](/docs/output/img/experiment-results/23576087077403){.inline}
    Mean: `E[X / Y] = E[X] / E[Y]`

Once you have the mean and variance of the formula metric, you can calculate the confidence interval chart and the p-values.

`Formula / Metric: TOTALS(A) / TOTALS(B)`
