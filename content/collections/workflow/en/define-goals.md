---
id: f8a65f47-6611-4f85-a5e4-3602c5b5821b
blueprint: workflow
title: "Define your experiment's goals"
source: 'https://help.amplitude.com/hc/en-us/articles/4405839607579-Define-your-experiment-s-goals'
this_article_will_help_you:
  - 'Add primary and secondary metrics to your experiment'
  - 'Create new metrics from scratch, and edit existing metrics'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714515123
---
An experiment can’t tell you anything without metrics to track against. Adding metrics to your experiment occurs in the Goals segment of the experiment design panel. 

You’ll tell Experiment what you want your recommendation metric to be, as well as define any secondary metrics. 

A primary metric is any metric that you use to determine whether your hypothesis is accepted or rejected, and therefore, whether your experiment has succeeded or failed. Your primary metric is important to understand the success of your experiment, so it’s important to choose the right one. If you’re not experienced in A/B testing, it can be hard to know which metric to choose. To help you create a successful primary metric, keep in mind the following:

* Try to identify the single user action that tells you if your [variant](/docs/feature-experiment/workflow/add-variants) is successful.
* Measure an event that's directly affected by the change you’ve made in your variant.
* Pick an event that fully captures the user behavior you’re trying to affect.

Experiment lets you define multiple metrics when running an experiment. Unlike a recommended metric, non-recommended metrics aren’t required, but they're often helpful. They not only improve the quality of your analysis, but help evaluate whether it’s even worthwhile to roll out your experiment at all.

{{partial:admonition type="tip" heading="Revenue metrics"}}
One common mistake is defaulting to a revenue metric. This happens when your variant introduces a change that's separate from the metric you’ve selected. If your variant changes how your product page looks and functions, choose a metric on that page as your primary metric instead of a revenue metric that might not be visible for several more steps down the funnel.  
{{/partial:admonition}}

##### To set up the metrics for your experiment

1. Either open an existing experiment or go through the process of [creating an experiment](/docs/feature-experiment/workflow/create) and then scroll to the Metrics section and click the **edit** icon.
2. Click **Add metric** and then select the metric you want from the drop-down list. 
Alternately, click **Create a custom metric** to define your own metric.
1. Select the metric you want. 
Typical metrics are:
   * Event segmentation
   * Retention
   * Funnel analysis
1. Specify if the metric **should** or **should not** **Increase** or **Decrease** and by how many percentages.
2. (*Optional*) For primary metrics, set the minimally acceptable goal for the experiment. This is the smallest relative distance between the control and the variant needed to determine if the experiment was a success or failure. 
3. To add secondary metrics, click ***Add Metric*** and repeat this process.

After you add your metrics, set your [varients](/docs/workflow/add-variants).

### Examples of success and guardrail metrics

**Success metrics** measure the primary outcomes you want to improve:

- **Conversion metrics:** Purchase completion rate, sign-up conversion, add-to-cart rate.
- **Engagement metrics:** Daily active users, average session duration, feature adoption rate.
- **Revenue metrics:** Average order value, revenue for each user, subscription upgrades.
- **Retention metrics:** Day 7 retention rate, return user rate.

**Guardrail metrics** monitor important metrics that shouldn't degrade during the experiment:

- **Performance metrics:** Page load time, API response time, app crash rate.
- **Quality metrics:** Error rate, failed transaction rate, support ticket volume.
- **Core engagement:** Usage of key features unrelated to the experiment, overall session count.
- **Business health:** Subscription cancellation rate, refund rate, negative review rate.

For example, if you're testing a new checkout flow, your success metric might be "Purchase completion rate (Increase)," while your guardrail metrics could include "Checkout page load time (No increase)" and "Payment error rate (No increase)."

The duration estimator estimates the time and sample size you need to achieve significant results in your experiment, given your metric settings. Amplitude Experiment pre-populates reasonable industry defaults based on historical data, but you can adjust the confidence level, statistical power, minimum detectable effect, standard deviation, and test type as needed.

## Creating a custom metric

You can create a new metric if none of the standard metrics meet your needs. 

##### To create a custom metric

1. Click **Create a custom metric**.
2. Name your new metric and add a description. 
3. Define the metric's type. A metric can be one of the following types: 
   * Unique conversions
   * Event totals
   * Formula
   * Funnel conversions
   * Return on retention
   * Sum of property value
   * Average of property value.
4. Set the events that you want by clicking **Add Event** and then choosing your events.
5. Set any key properties you want.
6. Click **Save and Close**.

{{partial:admonition type='note'}}
By default, the Retention metric doesn't support [CUPED](/docs/feature-experiment/workflow/finalize-statistical-preferences), exposure attribution settings, or calendar day windows. Instead, the metric calculates exposure attribution settings using any exposure and the nth day value based on 24-hour window increments, for up to two months.
{{/partial:admonition}}

## Define the exposure event

In your experiment, open the Design Experiment panel, or the Analysis Settings, and choose the **exposure event**. When a user trigger this event, Amplitude Experiment buckets them into the experiment. The Amplitude exposure event is the most accurate and reliable way to track user exposures to your experiment’s variants, so you should use that if possible.

Amplitude sends the `Amplitude exposure` event when your app calls `.variant()`. It sets the user properties Amplitude Experiment uses to conduct its analyses. When you use the Amplitude exposure event, you can be certain your app triggers the event at the correct time.

You can select a custom exposure event instead. Click **Custom Exposure**, then **Select event**. There's a much greater risk of triggering a custom exposure event at the wrong time, which can lead to a [sample ratio mismatch](/docs/feature-experiment/troubleshooting/sample-ratio-mismatch).

For more information, go to this article about [exposure events](https://www.docs.developers.amplitude.com/experiment/general/exposure-tracking/).

## Using Warehouse Metrics in experiments

In addition to event-based metrics, you can use [Warehouse Metrics](/docs/data/warehouse-metrics) as goals in your experiments. Warehouse Metrics are precomputed metrics imported directly from your data warehouse into Amplitude, ensuring consistency between your source of truth and your experimental analysis.

Warehouse Metrics are particularly valuable when your experiment goals involve business metrics that are difficult or impractical to calculate from behavioral events alone, such as:

- **Revenue and financial metrics**: Average order value, credits remaining, or subscription revenue that require complex calculations across multiple data sources
- **Customer health metrics**: Customer lifetime value (LTV), health scores, or churn risk predictions that are modeled in your data warehouse
- **State metrics**: Current subscription tier, activation status, or account-level attributes that track user state rather than discrete events

When you add metrics to your experiment, Warehouse Metrics appear in the metrics picker with a warehouse icon indicator. You can use them as primary or secondary metrics just like event-based metrics. Amplitude displays when each Warehouse Metric was last synced and when the next sync is scheduled, helping you ensure your experiment results reflect the most current data.

For more information about setting up and using Warehouse Metrics, review [Warehouse Metrics Overview](/docs/data/warehouse-metrics).

