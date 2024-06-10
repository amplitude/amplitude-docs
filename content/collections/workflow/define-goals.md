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
An experiment can’t tell you anything without events to track. Adding metrics to your experiment occurs in the Goals segment of the experiment design panel. Here, you’ll tell Amplitude Experiment what you want your **primary metric** to be, as well as define any **secondary metrics**. The primary metric determines whether your hypothesis has been accepted or rejected—and therefore, whether your experiment has succeeded or failed.

There’s a lot riding on your primary metric, so it’s important to select the right one. If you’re not experienced in A/B testing, it can be hard to know which one that is. But if you know what to look for, your odds of a successful [variant](/docs/experiment/workflow/add-variants) improve dramatically:

* Try to identify the **single user action** that will tell you if your variant is successful.
* Measure an event that is **directly affected** by the change you’ve made in your variant.
* Pick an event that **fully captures** the user behavior you’re trying to affect.

One common mistake is defaulting to a revenue metric when it’s not appropriate. This happens when your variant introduces a change that is separate from the metric you’ve selected. If your variant changes how your product page looks and functions, you should choose a metric on that page as your primary metric, instead of a revenue metric that might not come into play for several more steps down the funnel. 

Amplitude Experiment lets you define multiple metrics when running an experiment. Unlike a primary metric, secondary metrics aren’t required—but they are often helpful. They can not only improve the quality of your analysis, but help evaluate whether it’s even worthwhile to roll out your experiment at all.

To set up the metrics for your experiment, follow these steps:

1. In the *Goals* section of the experiment design panel, select your primary metric. You can do this from the *Metric* drop-down. You can also [create a custom metric](/docs/experiment/workflow/define-goals) instead.
2. Next to *Direction*, specify whether you’re expecting the metric to increase or decrease.
3. Optionally, set the minimally acceptable goal for the experiment, otherwise known as the **[minimum detectable effect](/docs/experiment/experiment-theory/experiment-set-mde)**. This is the minimum amount of difference between the control and the variant there should be in order for the experiment to be considered a success.
4. To add secondary metrics, click *+ Add Metric* and repeat this process for each secondary metrics you want to include.

The [duration estimator](/docs/experiment/key-terms). 

## Create a custom metric

If you don’t want to use any of the metrics in the drop-down list, you can create a new metric. To do so, follow these steps:

1. Under *Metric*, click *Create a custom metric*.
2. In the *Metric* panel that opens, give your new metric a name and a description, then select its **type**. A metric can be one of six specific types: unique conversions, average event totals, formula, funnel conversions, sum of property value, or the average of property value.
3. Click *Select event …* to choose the metric event, which is the event that best represents that metric. Then click *Create*.

{{partial:admonition type='note'}}
 By default, the Retention metric does not support [CUPED](/docs/experiment/workflow/finalize-statistical-preferences), exposure attribution settings, nor calendar day windows. Instead, the metric will calculate exposure attribution settings using any exposure and the nth day value based on 24-hour window increments. [See this FAQ help center article for more information on how the Retention metric is calculated](https://help.amplitude.com/hc/en-us/articles/17986231773595).
{{/partial:admonition}}

## Define the exposure event

On your experiment’s Plan tab, choose the **exposure event**. This is the event that users will have to trigger before joining the experiment. Anyone who does so will be bucketed into the experiment.  It is strongly recommended that you use the **Amplitude Exposure** event, as that is the most accurate and reliable way to track user exposures to your experiment’s variants.

The Amplitude exposure event is sent when your app calls .variant(). It sets the user properties Amplitude Experiment uses to conduct its analyses. When you use the Amplitude exposure event, you can be certain your app will trigger the event at the correct time.

That said, you can also select a custom exposure event instead. Click *Custom Exposure*, then *Select event …* to do so. Be aware that there is a much greater risk of triggering a custom exposure event at the wrong time; this can lead to a [sample ratio mismatch](/docs/experiment/advanced-techniques/sample-ratio-mismatch).

For more information, see [this article about exposure events in Amplitude Experiment](https://www.docs.developers.amplitude.com/experiment/general/exposure-tracking/).

The next step is defining your experiment's audience.