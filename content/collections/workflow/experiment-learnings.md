---
title: "Learn from your experiment"
source: "https://help.amplitude.com/hc/en-us/articles/360061687631-Learn-from-your-experiment"
id: 2e357f69-a007-4912-8603-5e568d6ddcb8
---

#### This article will help you:

* See your experimental results
* Understand and interpret those results

You’ve designed your experiment, rolled it out to your users, and given them enough time to interact with your new variants. Now it’s time to see if your hypothesis was correct.

In the *Analysis* card, you’ll be able to tell at a glance whether your experiment has yielded **statistically-significant** results, as well as what those results actually are. Amplitude Experiment takes the information you gave it during the design and rollout phases and plugs them in for you automatically, so there’s no repetition of effort. It breaks the results out by variant, and provides you with a convenient, detailed tabular breakdown.

**NOTE:** This article continues directly from the [article in our Help Center on rolling out your experiment](/experiment/workflow/experiment-test). If you haven’t read that and followed the process it describes, do so before continuing here.

Amplitude will not generate p-values or confidence intervals for experiments using binary metrics (i.e., unique conversions) until each variant has 100 users **and** 25 conversions. Experiments using non-binary metrics need only to reach 100 users per variant.

## View results

To generate and view experimental results, follow these steps:  

1. In your experiment, the *Activity* page includes two sections to view your results. The *Summary* section and the *Analysis* card. The *Summary* section will describe your experiment's hypothesis and note whether it has or has not reached statistical significance.  

An experiment is said to be **statistically significant** when we can confidently say that the results are highly unlikely to have occurred due to random chance. (More technically, it’s when we reject the null hypothesis.) That might sound pretty subjective, but it’s grounded solidly in statistics. Stat sig relies on a variant’s **p-value**, which is the probability of observing the data we see, assuming there is no difference between the variant and the control. If this probability drops below a certain threshold (statisticians refer to this threshold as the **alpha**), then we consider our experiment to have achieved statistical significance.

The *Summary* section will display a badge labeled *Significant* if stat sig was met, and a badge labeled *Not Significant* if stat sig was not met.

The *Summary* section may include multiple badges simultaneously:

* * * *Inconclusive*: the test was inconclusive for the primary metric.
		* *Above Goal* or *Below Goal:* the primary metric's mean was either **above** or **below** its goal depending on the direction of the test (increase = above, decrease = below).
		* *Above Control* or *Below Control:* the primary metric's mean was either **above** or **below** the control's mean, depending on the direction of the test (increase = above, decrease = below). These badges are only relevant to stat sig results.

![summary.png](/output/img/workflow/summary-png.png)

2. At the top of the *Analysis* section is an overview of how your experiment performed, broken down by metric and variant. Below that is the experiment's **exposure definition:** how many variants were shown, what the primary metric was, and what the **exposure event** was. This is the event users will have to fire before being included in an experiment.  
  
{{partial:admonition type='note'}}
 The exposure event is **not the same thing** as the assignment event. If, for example, you’re running an experiment on your pricing page, a user might be evaluated on the home page for the experiment—but if they don’t visit the pricing page, they'll never actually be exposed to it. For that reason, this user should not be considered to be part of the experiment.  
{{/partial:admonition}}
  
To learn more about exposure events, see [this article in the Amplitude Developer Center](https://www.docs.developers.amplitude.com/experiment/general/exposure-tracking/).  
  
The exposure definition's default state is collapsed. Expand it by clicking ![expandIcon.png](/output/img/workflow/expandicon-png.png) (the expand icon) below the metric table.  
  
You can also create a chart in Amplitude Analytics from this experiment by clicking *Open in Chart*.  
  
**NOTE:** If you are running an A/B/n test, Amplitude Experiment displays the confidence interval / p-value for the control against each treatment individually. To instead see the comparison between two non-control treatments, either change the control variant, or open the test in Analytics and create a chart using the two treatments you're interested in.
3. If desired, adjust the experiment’s **confidence level**. The default is 95%. You can also [choose between a sequential test and a T-test](/experiment/workflow/finalize-statistical-preferences).   
  
**NOTE:** Lowering your experiment’s confidence level will make it more likely that your experiment achieves statistical significance, but the trade-off is that doing so increases the likelihood of a false positive.
4. Set the **time frame** for your experiment analysis, either from the selection of pre-set durations, or by opening the date picker and choosing a custom date range.

The tables, graphs, and charts shown in the Analysis section are explained in depth in our Help Center articles on [understanding the Experiment Analysis view](/experiment/analysis-view) and [interpreting the cumulative exposures graph in Amplitude Experiment](/experiment/advanced-techniques/cumulative-exposure-change-slope).

**NOTE:** Amplitude Experiment needs something to compare your control to in order to generate results. If you neglect to include **both** the control and **at least one** variant, your chart will not display anything.

Congratulations! You’ve successfully designed, rolled out, and analyzed your experiment.

## Interpret notifications

Your preferred [notification](/analytics/integrate-slack). 

![experiment notification settings.png](/output/img/workflow/experiment-notification-settings-png.png)

Click the check box next to the desired notification:

* **Experiment end reached:** You will receive this notification when your experiment is complete.
* **SRM detected:** You will receive this notification if a data quality issue is identified.
* **Long-running experiments:** You will receive this notification when your long-running experiment is complete.
* **Statsig for the primary metric is reached:** You will receive this notification when your experiment's primary metric has reached stat sig.

## What’s next?

It’s important to remember that no experiment is a failure. Even if you didn’t get the results you were hoping for, you can still learn something from the process—even if your test didn’t reach stat sig. Use your results as a springboard to asking hard questions about the changes you made, the outcomes you saw, what your customers expect from your product, and how you can deliver that.

In general, the next step should be deciding whether to conduct another experiment that supports your hypothesis to gather more evidence, or to go ahead and implement the variant that delivered the best results. You can also export your experiment to the Experiment Analysis in Amplitude Analytics and conduct a deeper dive there, where you can segment your users there and hopefully generate more useful insights.
