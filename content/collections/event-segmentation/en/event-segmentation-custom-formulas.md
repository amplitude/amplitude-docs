---
id: 56c6e293-ea12-4e7c-8fb3-55216749d5ce
blueprint: event-segmentation
title: 'Custom formulas: Syntax and definitions'
source: 'https://help.amplitude.com/hc/en-us/articles/115001163231-Custom-formulas-Syntax-and-definitions'
this_article_will_help_you:
  - 'Understand and use custom formulas in Amplitude to create exactly the analysis you need'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718057055
landing: true
landing_blurb: 'Understand and use custom formulas in Amplitude to create exactly the analysis you need'
exclude_from_sitemap: false
---
In an [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) or [Data Table](/docs/analytics/charts/data-tables/data-tables-multi-dimensional-analysis) chart, the *Formula* option in the Measured As module's *Advanced* drop down offers you greater flexibility when performing analyses. Custom formulas are also useful for comparing various analyses on the same chart.

Choose from more than 20 custom formulas to plot the metrics you need. You can plot up to 10 formulas on the same chart, separated by semicolons. 

This article describes the mechanics of custom formulas, with examples of formulas you can use right now.

{{partial:admonition type='note'}}
While the Experiment Results chart also uses formula metrics, it does so in a different way than either the Event Segmentation or Data Table charts. To learn more about those differences, see [this Help Center article on using formula metrics in Amplitude's Experiment Results chart](/docs/analytics/charts/experiment-results/experiment-results-use-formula-metrics).
{{/partial:admonition}}

### Feature availability

This feature is available to users on **Plus**, **Growth**, and **Enterprise** **plans** only. See our [pricing page](https://amplitude.com/pricing) for more details.

## Formula syntax

In your formulas, refer to events selected in the Events Module by their corresponding letter. The functions and the parameters aren't case sensitive. You can also perform the following arithmetic operations:

* Parenthesis ()
* Addition (+)
* Subtraction (-)
* Multiplication (\*)
* Division (/)

For example, the letter A in the formula `UNIQUES(A)` refers to the event `View Item Details` while the letter B in the formula `UNIQUES(B)` refers to the event `Add Item to Cart`. This setup displays the ratio of users who viewed an item's details to users who placed an item in their cart.

![custom_formulas_1.png](/docs/output/img/event-segmentation/custom-formulas-1-png.png)

You can also write a formula that consists of events, grouping each event by a property or properties. However, for the formula to be valid, the properties must have matching values across all events you are segmenting.

For example, if you have an event called `Page Name`, the following property values would **not** match:

* `Tutorial` and `TUTORIAL` (the matching is case sensitive)
* `1` and `1.0` (non-matching characters)

The order in which you group properties matters as well. Both events must have the *grouped by* values in the same order; otherwise, Amplitude displays a warning that events have no matching group by values.

![custom_formulas_group_by_error.png](/docs/output/img/event-segmentation/custom-formulas-group-by-error-png.png)

You can also use custom formulas to uncover how many more times users in one cohort trigger a particular event than do users in another cohort.

To compare a metric between two different cohorts or user segments, add the number of the segment to the letter designating the event: `UNIQUES(A1)/UNIQUES(A2)`. This displays a ratio of the performance of your cohorts on the same event as a single plotted line on your graph. 

![custom_forumlas_2.png](/docs/output/img/event-segmentation/custom-forumlas-2-png.png)

You can also view your metrics in percentages or dollars by adding the following prefixes to your formula:

* Percentage (%:)
* Dollars ($:)

## List of available formulas

This section lists available formulas by type: Metric, Aggregation, and Function. Click on a formula name to review its syntax.

### Metrics formulas

With metrics formulas, query on a metric for a particular event that interests you. These formulas are color-coded in green. Each metrics formula requires a letter corresponding to the event you're interested in as a parameter.

|                               |                                 |                     |                                   |
| ----------------------------- | ------------------------------- | ------------------- | --------------------------------- |
| [ACTIVE](#active)             | [ARPAU](#arpau)                 | [AVG](#avg)         | [FREQPERCENTILE](#freqpercentile) |
| [HIST](#hist)                 | [PERCENTILE](#percentile)       | [PROPAVG](#propavg) | [PROPCOUNT](#propcount)           |
| [PROPCOUNTAVG](#propcountavg) | [PROPHIST](#prophist)           | [PROPMAX](#propmax) | [PROPMIN](#propmin)               |
| [PROPSUM](#propsum)           | [REVENUETOTAL](#revenuetotal)   | [TOTALS](#totals)   | [UNIQUES](#uniques)               |
| [EVENTTOTALS](#eventtotals)   | [SESSIONTOTALS](#sessiontotals) |                     |                                   |

### Aggregation formulas

Aggregation formulas let you query on a **rolling average or rolling window** for the metric and event interests you. These formulas are color-coded in purple. Each aggregation formula requires **three** components: the metric you are aggregating, the event you are interested in, and the interval to aggregate by.

|                   |                     |                     |                                 |
| ----------------- | ------------------- | ------------------- | ------------------------------- |
| [CUMSUM](#cumsum) | [ROLLAVG](#rollavg) | [ROLLWIN](#rollwin) | [ROLLWINBEFORE](#rollwinbefore) |

### Function formulas

Function formulas let you query on a mathematical function for a particular event and metric you're interested in. These formulas will be color coded in blue. Each function formula requires a value that can be either a constant, or another formula containing an event.

|                 |               |                         |                 |
| --------------- | ------------- | ----------------------- | --------------- |
| [EXP](#exp)     | [LN](#ln)     | [LOG](#log)             | [LOG10](#log10) |
| [POWER](#power) | [SQRT](#sqrt) | [TRENDLINE](#trendline) |                 |

## Metrics formulas

### ACTIVE

**Syntax:** ACTIVE(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.

The `ACTIVE` formula returns the percent of active users who triggered the event. This is the same as the `Active %` [metric](/docs/analytics/charts/data-tables/data-tables-create-metric) in the Measured card, but here it is displayed in decimal fraction form. This setup will display the percentage of active users who have triggered the `View Item Details` event.

![custom_formulas_active.png](/docs/output/img/event-segmentation/custom-formulas-active-png.png)

### ARPAU

**Syntax:** $:ARPAU(event)

* **Event:** Refers to the revenue event. This must be a letter that corresponds to an event in the Events card.
* This function will only work if you are grouping by a numerical property on the event.

Returns the aggregate sum of the revenue event property formatted as a currency, divided by the number of unique active users in that same time period. It is equivalent to `PROPSUM(event) / UNIQUES(any active event)`.

For example, the following setup shows the average revenue per active user of a generic e-commerce company:

![ARPAU_sidecontrols.png](/docs/output/img/event-segmentation/arpau-sidecontrols-png.png)

As you can see in the screenshot above, the `$:` prefix is optional. Its presence simply ensures the output format will be as a currency.

{{partial:admonition type='note'}}
 ARPAU cannot be used in conjunction with [aggregation formulas](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas). 
{{/partial:admonition}}

### AVG

**Syntax:** AVG(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the left module of the chart control panel.

Returns the average number of times the event was triggered. This function is equivalent to `TOTALS(event)/UNIQUES(event)`. This setup will display the ratio of number of times `View Item Details` was triggered to the number of times `Add Item to Cart` was triggered, the average number of times `View
 Item Details` was triggered, as well as the average number of times `Add Item
 to Cart` was triggered on the same chart.

![custom_formulas_avg.png](/docs/output/img/event-segmentation/custom-formulas-avg-png.png)

### FREQPERCENTILE

**Syntax:** FREQPERCENTILE(event, percentage)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.
* **Percentage:** Refers to the percentile you are interested in. This must be a value that is less than or equal to 1.

Returns the inputted [percentile](https://en.wikipedia.org/wiki/Percentile) event frequency across all users. A percentile is a measure that indicates the value below which a given percentage of values fall. For example, the following formula shows the 90th percentile of users who triggered the `View Item Details` event.

![c_f_freqpercentile.png](/docs/output/img/event-segmentation/c-f-freqpercentile-png.png)

You can then take this information and create a [behavioral cohort](/docs/analytics/behavioral-cohorts) of your power users and further analyze them to see what distinguishes them from users who aren't in the cohort.

### HIST

**Syntax:** HIST(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.

Returns the distribution of the event frequency per unique user over the selected time period. The following setup displays the distribution of event frequency for the `Complete Purchase` event.

![custom_formulas_hist.png](/docs/output/img/event-segmentation/custom-formulas-hist-png.png)

We can see that in the last 30 days, 22,075 users completed purchases five times.

The syntax for HIST varies slightly for the [User Sessions chart](https://help.amplitude.com/hc/en-us/articles/231275508-The-User-Sessions-chart-Track-engagement-frequency-and-duration) as sessions are the focus of the metrics. 

**Syntax**: HIST(session)

* **Session:** Refers to the session you are interested in. This must be a letter that corresponds to a session in the Session card.

Returns the distribution of session durations (in seconds) over the selected time period. The following setup displays the distribution of the durations of all sessions.

![HIST_UserSessions.png](/docs/output/img/event-segmentation/hist-usersessions-png.png)

### PERCENTILE

**Syntax:** PERCENTILE(event, percentage)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.
* **Percentage:** Refers to the percentile you are interested in. This must be a value that is less than or equal to 1.

{{partial:admonition type='note'}}
This function will only work if you are grouping by a numerical property on the event.
{{/partial:admonition}}

Returns inputted [percentile](https://en.wikipedia.org/wiki/Percentile) of the property being grouped by. For example, the following formula will return the 90th percentile for revenue of all `Complete Purchase` events.

![c_f_percentile.png](/docs/output/img/event-segmentation/c-f-percentile-png.png)

Another example where the PERCENTILE formula can be useful is if you're tracking load times for your product, trying to ensure that a particular percentage of load times is below a certain threshold.

### PROPAVG

**Syntax:** PROPAVG(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.
* This function will only work if you are grouping by a numerical property on the event. If grouping by multiple properties, the formula will perform the calculation with the first group-by clause.

Returns the average of the property values you are grouping by. This function is equivalent to `PROPSUM(event)/TOTALS(event)`.

{{partial:admonition type='note'}}
 The PROPAVG formula ignores events where the selected property value is `(none)`.
{{/partial:admonition}}

The following setup will show the average of the revenue generated by completed purchases on a given day.

![propavg_sidecontrols.png](/docs/output/img/event-segmentation/propavg-sidecontrols-png.png)

### PROPCOUNT

**Syntax:** PROPCOUNT(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card. If grouping by multiple properties, the formula will perform the calculation with the first group by clause.

Returns the number of distinct property values for the property the event is grouped by. In this setup, the formula will retrieve the number of different departments covering all the items for which details were viewed:

![propcount_sidecontrols.png](/docs/output/img/event-segmentation/propcount-sidecontrols-png.png)

Note that `PROPCOUNT` is an **estimate** of distinct property values. This estimate is generated by a [HyperLogLog algorithm,](https://en.wikipedia.org/wiki/HyperLogLog) and its accuracy depends on amount of data it has to work with. Expect a relative error in the range of 0.1% for less than 12,000 unique values, and up to 0.5% for more than 12,000 unique property values, depending on the cardinality of the property. 

### PROPCOUNTAVG

**Syntax:** PROPCOUNTAVG(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card. If grouping by multiple properties, the formula will perform the calculation with the first group-by clause.

Returns the average number of distinct values each user has for a specified property.

For example, imagine you're interested in the average number of song genres your music app subscribers listen to. Every time a song is played, a `Play Song or
 Video` event will trigger; each played song also captures a `Genre_Type` event property. Running `PROPCOUNTAVG` on `Play Song or Video` grouped by `Genre_Type` will give you the average number of unique `Genre_Type` values users who fire `PlaySong or Video` have.

### PROPHIST

**Syntax:** PROPHIST(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.
* This function will only work if you are grouping by a numerical property on the event. If grouping by multiple properties, the formula will perform the calculation with the first group by clause.

Returns the distribution of the property values you are grouping by over the selected time period. The following setup will display the distribution of revenue over the last 30 days.

![prophist_sidecontrols.png](/docs/output/img/event-segmentation/prophist-sidecontrols-png.png)

### PROPMAX

**Syntax**: PROPMAX(event)

* **Event:** returns the maximum value of the property you are grouping the specified event by. The property must be numeric. If grouping by multiple properties, the calculation will be performed using the first group-by clause.

### PROPMIN

**Syntax**: PROPMIN(event)

* **Event:** returns the minimum value of the property you are grouping the specified event by. The property must be numeric. If grouping by multiple properties, the calculation will be performed using the first group-by clause.

### PROPSUM

**Syntax:** PROPSUM(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card. The event must be grouped by the property you'd like to sum.
* This function will only work if you are grouping by a numerical property on the event. If grouping by multiple properties, the formula will perform the calculation with the first group-by clause.

Returns the sum of the property values you are grouping the specified event by. For example, this visualization shows the total revenue generated by the `Complete Purchase` event.

![c_f_propsum.png](/docs/output/img/event-segmentation/c-f-propsum-png.png)

The syntax for PROPSUM varies slightly for the [User Sessions chart](https://help.amplitude.com/hc/en-us/articles/231275508-The-User-Sessions-chart-Track-engagement-frequency-and-duration) as sessions are the focus of the metrics. 

**Syntax**: PROPSUM(session)

* **Session:** Refers to the session you are interested in. This must be a letter that corresponds to a session in the Session card.

Returns the total time (sum of the duration in seconds) of the specified session. For example, the following chart shows the total time (in seconds) summed across all sessions.

![userSessionsPROPSUM.png](/docs/output/img/event-segmentation/usersessionspropsum-png.png)

### REVENUETOTAL

**Syntax:** $:REVENUETOTAL(event)

* **Event:** Refers to the revenue event. This must be a letter that corresponds to an event in the Event card.
* This function will only work if you are grouping by a numerical property on the event. Also,

Returns the aggregate sum of the property, formatted as a currency. It is equivalent to `PROPSUM(event)`. For example, the following setup shows the total revenue by day generated by purchases:

![revtotal_sidecontrols.png](/docs/output/img/event-segmentation/revtotal-sidecontrols-png.png)

As you can see in the screenshot above, the `$:` prefix is optional. Its presence simply ensures the output format will be as a currency.

### TOTALS

**Syntax:** TOTALS(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the left module of the chart control panel.

Returns the total number of times the event was triggered. This setup will show the total number of times an item's details were viewed, plus the total number of times an item was added to a cart.

![custom_events_totals.png](/docs/output/img/event-segmentation/custom-events-totals-png.png)

### UNIQUES

**Syntax:** UNIQUES(event)

* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.

Returns the number of unique users who triggered the event. For example, the following setup shows the ratio of users who viewed an item's details to the users who added an item to their cart.

![custom_formulas_uniques.png](/docs/output/img/event-segmentation/custom-formulas-uniques-png.png)

The syntax for UNIQUES varies slightly for the [User Sessions chart](https://help.amplitude.com/hc/en-us/articles/231275508-The-User-Sessions-chart-Track-engagement-frequency-and-duration) as sessions are the focus of the metrics. 

**Syntax**: UNIQUES(session)

* **Session:** Refers to the session you are interested in. This must be a letter that corresponds to a session in the Session card.

Returns the number of unique users who engaged in session(s) defined by the specified session. For example, the following setup shows the ratio of users who engaged in sessions longer than one minute to the users who engaged in sessions that contained at least one `Search Items` event.

![userSessionsUNIQUES.png](/docs/output/img/event-segmentation/usersessionsuniques-png.png)

### EVENTTOTALS

**Syntax:** EVENTTOTALS(session)

* **Session:** Refers to the session you are interested in. This must be a letter that corresponds to a session in the Sessions card.

This formula metric is **only** available in the [User Sessions chart](https://help.amplitude.com/hc/en-us/articles/231275508-The-User-Sessions-chart-Track-engagement-frequency-and-duration). Returns the total number of events that were triggered during each session.

For example, the following setup shows the number of `Page Viewed` events across all sessions.

![eventTotals.png](/docs/output/img/event-segmentation/eventtotals-png.png)

### SESSIONTOTALS

**Syntax:** SESSIONTOTALS(session)

* **Session:** Refers to the session you are interested in. This must be a letter that corresponds to a session in the Sessions card.

This formula metric is **only** available in the [User Sessions chart](https://help.amplitude.com/hc/en-us/articles/231275508-The-User-Sessions-chart-Track-engagement-frequency-and-duration). It returns the number of sessions defined by the specified session.

For example, the following setup shows the total number of sessions by day over the last 30 days for all users in the United Kingdom who completed at least one `Add to Cart` event during each session. 

![sessionTotalsChart.png](/docs/output/img/event-segmentation/sessiontotalschart-png.png)

## Aggregation formulas

### CUMSUM

**Syntax:** CUMSUM(metric, event)

* **Metric:** The metric you wish to aggregate. This will be one of the metrics formulas listed above.

Returns the metric for selected event with a running total of days/weeks/months over the chart's timeframe. 

For example, this chart shows a daily [cumulative sum](https://help.amplitude.com/hc/en-us/articles/14056975720091#h_f2ff0863-0770-4a12-9bde-89311a099c64) of revenue from `Complete Purchase` events in the last 30 days. The data point for February 22nd will be a sum of revenue generated on February 20th, 21st, and 22nd.

![CUMSUM_sidecontrols.png](/docs/output/img/event-segmentation/cumsum-sidecontrols-png.png)

For `CUMSUM(UNIQUES,A)`, a deduplicated count of unique users will be returned for each data point. 

### ROLLAVG

**Syntax:** ROLLAVG(metric, event, # of intervals)

* **Metric:** The metric you wish to aggregate. This will be one of the metrics formulas listed above.
* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.
* **Number of intervals:** The number of five-minute intervals, hours, days, weeks, or months to include in the rolling average. For example, a daily chart allows rolling averages over daily intervals only. The maximum ranges for a rolling average are 36 five-minute intervals (this works out to three hours), 72 hours, 90 days, 12 weeks, or 12 months.

Returns the metric for the event selected with a [rolling average](https://help.amplitude.com/hc/en-us/articles/14056975720091) over the interval selected. For example, the following chart shows you your weekly rolling average superimposed on top of your daily active users.

![rollavg_sidecontrols.png](/docs/output/img/event-segmentation/rollavg-sidecontrols-png.png)

The blue line in this chart shows daily active users and the green line shows the weekly rolling average. This is useful to see if your daily active user count is higher or lower than the rolling average.

![rollavg_linechart.png](/docs/output/img/event-segmentation/rollavg-linechart-png.png)

### ROLLWIN

**Syntax:** ROLLWIN(metric, event, # of five-minute intervals/hours/days/weeks/months)

* **Metric:** The metric you wish to aggregate. This will be one of the metrics formulas listed above.
* **Event:** Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.
* **Number of intervals:** The number of five-minute intervals, hours, days, weeks, or months to include in the rolling average. For example, a daily chart allows rolling averages over daily intervals only. The maximum ranges for a rolling average are 36 five-minute intervals (this works out to three hours), 72 hours, 90 days, 12 weeks, or 12 months.

Returns the metric for the event selected with a [rolling window](https://help.amplitude.com/hc/en-us/articles/14056975720091#h_d48f96e2-797c-45d9-bf87-6e5a5ac8ad28) of however many days/weeks/months inputted, where a rolling window aggregation is applied *after* a cohort filter, if one is in use. 

For example, this chart first calculates the new users for each time interval and then performs the rolling window aggregation on top of that.

![rollwin_sidecontrols.png](/docs/output/img/event-segmentation/rollwin-sidecontrols-png.png)

### ROLLWINBEFORE

**Syntax**: ROLLWINBEFORE(metric, event, # of five-minute intervals/hours/days/weeks/months)

* **Metric**: The metric you wish to aggregate. This will be one of the metrics formulas listed above.
* **Event**: Refers to the event you are interested in. This must be a letter that corresponds to an event in the Events card.
* **Number of intervals**: The number of five-minute intervals, hours, days, weeks, or months to include in the rolling average. For example, a daily chart allows rolling averages over daily intervals only. The maximum ranges for a rolling average are 36 five-minute intervals (this works out to three hours), 72 hours, 90 days, 12 weeks, or 12 months.

Returns the metric for the event selected with a [rolling window](https://help.amplitude.com/hc/en-us/articles/14056975720091#h_d48f96e2-797c-45d9-bf87-6e5a5ac8ad28) of however many days/weeks/months inputted, where a rolling window aggregation is applied *before* a cohort filter, if one is in use. 

For example, this chart first calculates the rolling active users for each time interval and then applies the new user cohort filter on top of that.

![rollwinbefore_sidecontrols.png](/docs/output/img/event-segmentation/rollwinbefore-sidecontrols-png.png)

## Function formulas

### EXP

**Syntax:** EXP(value)

* **Value:** The value can be a constant or another function (e.g. the value you pass in could be `UNIQUES` of an event). The maximum value accepted is 700.

Returns [e](https://en.wikipedia.org/wiki/E_(mathematical_constant)) to the power of value you have specified. For example, here we are computing e to the power of the average number of times users purchase tickets.

![expavg_sidecontrols.png](/docs/output/img/event-segmentation/expavg-sidecontrols-png.png)

### LN

**Syntax: LN**(value)

* **Value:** The value can be a constant or another function (e.g. the value you pass in could be `UNIQUES` of an event).

Returns the [natural logarithm](https://en.wikipedia.org/wiki/Natural_logarithm) of the value. This is logarithm to the base of mathematical constant [e](https://en.wikipedia.org/wiki/E_(mathematical_constant)). For example, `LN(UNIQUES(A))` would calculate the natural logarithm of the number of unique users who triggered event A.

### LOG

**Syntax:** LOG(value, base)

* **Value:** The value can be a constant or another function (e.g. the value you pass in could be `TOTALS` of an event).
* **Base:** A constant. The base must be a constant and cannot contain another function.

Returns the [logarithm](https://en.wikipedia.org/wiki/Logarithm) of the value to the base. For example, the following formula will return the logarithm of the count of unique active users to base 3.

![log_sidecontrols.png](/docs/output/img/event-segmentation/log-sidecontrols-png.png)

### LOG10

**Syntax:** LOG10(value)

* **Value:** The value can be a constant or another function (e.g. the value you pass in could be `AVG` of an event).

Returns the [logarithm](https://en.wikipedia.org/wiki/Common_logarithm) of the value to base 10. For example, the following formula will return the logarithm of the average number of times `Complete Purchase` was triggered to base 10.

![log10_sidecontrols.png](/docs/output/img/event-segmentation/log10-sidecontrols-png.png)

### POWER

**Syntax:** POWER(value, exponent)

* **Value:** The value can be a constant or another function (e.g. the value you pass in could be `TOTALS` of an event).
* **Exponent:** A constant. The exponent must be a constant and cannot contain another function.

Returns the inputted value to the power of the exponent specified. For example, `POWER(UNIQUES(A), 2)` returns the number of unique users who triggered event A.

### SQRT

**Syntax: SQRT(value)**

* **Value:** The value can be a constant or another function (e.g. the value you pass in could be AVG of an event).

Returns the [square root](https://en.wikipedia.org/wiki/Square_root) of the value. For example, `SQRT(TOTALS(A))` would return the square root of the total number of times users triggered event A.

### TRENDLINE

**Syntax:** TRENDLINE(value)

* **Value:** The value can be a constant or another function (e.g. the value you pass in could be `UNIQUES` of an event).

Returns the trendline of the value. This is calculated with [ordinary least-squares linear regression](https://en.wikipedia.org/wiki/Ordinary_least_squares). It is highly recommended that you plot another custom formula alongside this one, so you can compare them Otherwise, the `TRENDLINE` function will simply give you a straight line with no context on a chart.

For example, use this function to see the trendline of number of users who purchase a song or video and compare it to the unique number of users.

![trendline_sidecontrols.png](/docs/output/img/event-segmentation/trendline-sidecontrols-png.png)