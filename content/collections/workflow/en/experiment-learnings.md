---
id: 2e357f69-a007-4912-8603-5e568d6ddcb8
blueprint: workflow
title: 'Learn from your experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/360061687631-Learn-from-your-experiment'
this_article_will_help_you:
  - 'See your experimental results'
  - 'Understand and interpret those results'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714516898
---
You’ve designed your experiment, rolled it out to your users, and given them enough time to interact with your new variants. Now it’s time to see if your hypothesis was correct.

In the *Analysis* card, you’ll be able to tell at a glance whether your experiment has yielded **statistically-significant** results, as well as what those results actually are. Amplitude Experiment takes the information you gave it during the design and rollout phases and plugs them in for you automatically, so there’s no repetition of effort. It breaks the results out by variant, and provides you with a convenient, detailed tabular breakdown.

{{partial:admonition type='note'}}
This article continues directly from the [article in our Help Center on rolling out your experiment](/docs/feature-experiment/workflow/experiment-test). If you haven’t read that and followed the process it describes, do so before continuing here.
{{/partial:admonition}}

Amplitude doesn't generate p-values or confidence intervals for experiments using binary metrics (for example, unique conversions) until each variant has 100 users **and** 25 conversions. Experiments using non-binary metrics need only to reach 100 users per variant.

## View results

To generate and view experimental results, follow these steps:  

1. In your experiment, the *Activity* page includes two sections to view your results. The *Summary* section and the *Analysis* card. The *Summary* section describes your experiment's hypothesis and note if it's reached statistical significance.  

    An experiment is **statistically significant** when Amplitude can confidently say that the results are highly unlikely to have occurred due to random chance. (More technically, it’s when Amplitude rejects the null hypothesis.) That might sound subjective, but it’s grounded solidly in statistics. Statistical significance relies on a variant’s **p-value**, which is the probability of observing the data seen, assuming there is no difference between the variant and the control. If this probability drops below a certain threshold (statisticians refer to this threshold as the **alpha**), then you can consider our experiment to have achieved statistical significance.

    The *Summary* section displays a badge labeled *Significant* if the experiment reached statistical significance, and a badge labeled *Not Significant* if sit didn't.

    The *Summary* section may include multiple badges simultaneously:

    * *Inconclusive*: the test was inconclusive for the primary metric.
    * *Above Goal* or *Below Goal:* the primary metric's mean was either **above** or **below** its goal depending on the direction of the test (increase = above, decrease = below).
    * *Above Control* or *Below Control:* the primary metric's mean was either **above** or **below** the control's mean, depending on the direction of the test (increase = above, decrease = below). These badges are only relevant to stat sig results.

    ![summary.png](/docs/output/img/workflow/summary-png.png)

2. At the top of the *Analysis* section is an overview of how your experiment performed, broken down by metric and variant. Below that, the experiment's **exposure definition** shows the number of Amplitude showed, the primary metric, and the **exposure event**. This is the event users need to fire before Amplitude includes them in an experiment.  
  
    {{partial:admonition type='note'}}
    The exposure event isn't the same thing as the assignment event. If, for example, you run an experiment on your pricing page, Amplitude might evaluate a user might on the home page for the experiment, but if they don’t visit the pricing page, they aren't exposed to it. For that reason, this user shouldn't be part of the experiment.  
    {{/partial:admonition}}
  
    To learn more about exposure events, see [this article in the Amplitude Developer Center](/docs/feature-experiment/under-the-hood/event-tracking).  
      
    Click _Chart Controls_ to see the chart definition. 
      
    You can also create a chart in Amplitude Analytics from this experiment by clicking *Open in Chart*.  
      
    {{partial:admonition type='note'}}If you're running an A/B/n test, Amplitude Experiment displays the confidence interval / p-value for the control against each treatment individually. To instead see the comparison between two non-control treatments in a feature experiment, either change the control variant, or open the test in Analytics and create a chart using the two treatments you're interested in.
    {{/partial:admonition}}

3. If desired, adjust the experiment’s **confidence level**. The default is 95%. You can also [choose between a sequential test and a T-test](/docs/feature-experiment/workflow/finalize-statistical-preferences).   
  
    {{partial:admonition type='note'}}
    Lowering your experiment’s confidence level makes it more likely that your experiment achieves statistical significance, but the trade-off is that doing so increases the likelihood of a false positive.
    {{/partial:admonition}}

4. Set the **time frame** for your experiment analysis, either from the selection of pre-set durations, or by opening the date picker and choosing a custom date range.

    For more information about the tables, graphs, and charts shown in the Analysis section, see [understanding the Experiment Analysis view](/docs/feature-experiment/analysis-view) and [interpreting the cumulative exposures graph in Amplitude Experiment](/docs/feature-experiment/advanced-techniques/cumulative-exposure-change-slope).

    {{partial:admonition type='note'}}
    Amplitude Experiment needs a comparison to your control to generate results. If you neglect to include both the control and at least one variant, your chart doesn't display anything.
    {{/partial:admonition}}


## Interpret notifications

Your preferred notification settings allow you to receive experiment updates by email or [Slack](/docs/analytics/integrate-slack). 

![experiment notification settings.png](/docs/output/img/workflow/experiment-notification-settings-png.png)

Click the check box next to the desired notification:

* **Experiment end reached:** You receive this notification when your experiment is complete.
* **SRM detected:** You receive this notification if Amplitude identifies a [sample ratio mismatch](/docs/feature-experiment/troubleshooting/sample-ratio-mismatch) issue.
* **Long-running experiments:** You receive this notification when your long-running experiment is complete.
* **Statsig for the recommendation metric is reached:** You receive this notification when your experiment's recommendation metric has reached stat sig.

Amplitude Experiment sends a notification to the editors of the experiment.

## Next steps

It’s important to remember that no experiment is a failure. Even if you didn’t get the results you were hoping for, you can still learn something from the process—even if your test didn’t reach stat sig. Use your results as a springboard to asking hard questions about the changes you made, the outcomes you saw, what your customers expect from your product, and how you can deliver that.

In general, the next step should be deciding whether to conduct another experiment that supports your hypothesis to gather more evidence, or to go ahead and implement the variant that delivered the best results. You can also export your experiment to the Experiment Analysis in Amplitude Analytics and conduct a deeper dive there, where you can segment your users there and hopefully generate more useful insights.
