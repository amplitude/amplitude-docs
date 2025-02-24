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

Amplitude doesn't generate p-values or confidence intervals for experiments using binary metrics (for example, unique conversions) until each variant has 100 users **and** 25 conversions. Experiments using non-binary metrics need only to reach 100 users per variant.

## Filter card

On the Filter card, set criteria that updates the analysis on the page. Filter your experiment results with the following:

* Date
* Segment
* Property

### Date filter

The date filter defaults to your experiment's start and end date. Adjust the range to scope experiment results to those specific dates.

### Segment filter

The segment filter enables you to select predefined segments, or create one ad-hoc. Predefined segments include:
* Experiment
  * All exposed users. Users who were exposed to a variant.
  * Testers. Users added as "testers" during experiment configuration.
  * Exclude testers. Excludes users added as "testers" during experiment configuration
  * Exclude users who variant jumped. Excludes users who were exposed to more than one variant.
* Amplitude
  * New user. Users who triggered at least one new user event during the selected date range.
  * Mobile web. Users who triggered events on the web from a mobile device.
  * Desktop web. Users who triggered events on the web from a desktop device.

{{partial:admonition type="note" heading="Support for segments"}}
The Testers and Exclude Testers segments are available on feature experiments that use [Remote evaluation](/docs/feature-experiment/remote-evaluation).

The Exclude users who variant jumped segment is available on experiment types other than [multi-armed bandit](/docs/feature-experiment/workflow/multi-armed-bandit-experiments).
{{/partial:admonition}}

These segments update in real-time.

Click *+Create Segment* to open the Segment builder, where you can define a new segment on the fly. Segments you create in one experiment are available across all other experiments, and appear in the *All Saved Segments* category.

### Property filter

Filter your experiment results based on user properties. For example, create a filter that excludes users from a specific country or geographic region, or users that have a specific account type on your platform.

## Data Quality card

{{partial:admonition type="note" heading="Availability"}}
Data Quality is available to organizations with access to Experiment who have recommendations enabled.
{{/partial:admonition}}

Amplitude doesn't generate p-values or confidence intervals for experiments using binary metrics (for example, unique conversions) until each variant has 100 users **and** 25 conversions. Experiments using non-binary metrics need only to reach 100 users per variant.

When you expand a category, or click *Guide*, the Data Quality Guide opens in a side panel where you can address or dismiss issues 

## Summary card

{{partial:admonition type="note" heading="Availability"}}
Summary is available to organizations with access to Experiment who have recommendations enabled.
{{/partial:admonition}}

The Summary card describes your experiment's hypothesis and lets you know if it's reached statistical significance. 

{{partial:admonition type="note" heading="Statisical significance and Amplitude"}}
Amplitude considers an experiment to be **statistically significant** when Amplitude can confidently say that the results are unlikely to have occurred due to random chance. More technically, it’s when Amplitude rejects the null hypothesis. That may sound subjective, but it’s grounded solidly in statistics. Statistical significance relies on a variant’s **p-value**, which is a value that represents the likelihood that your results occurred by chance. A lower p-value means your results are probably not random, and there's evidence to support your hypothesis. If this value drops below a threshold, Amplitude considers the experiment to be statistically significant.
{{/partial:admonition}}

The Summary card displays a badge labeled *Significant* if the experiment reached statistical significance, and a badge labeled *Not Significant* if it didn't. This card can display several badges at once:

* *Inconclusive*: the test was inconclusive for the primary metric.
* *Above Goal* or *Below Goal:* the primary metric's mean was either **above** or **below** its goal depending on the direction of the test (increase = above, decrease = below).
* *Above Control* or *Below Control:* the primary metric's mean was either **above** or **below** the control's mean, depending on the direction of the test (increase = above, decrease = below). These badges are only relevant to stat sig results.

![summary.png](/docs/output/img/workflow/summary-png.png)


## Analysis card

At the top of the Analysis card is an overview that explains how your experiment performed, broken down by metric and variant. Below that, a collection of experiment results charts, which you can analyze by metric, display information about:

* Confidence intervals
* Cumulative exposure*
* Event totals
* Mean value over time

For more information, see [Dig deeper into experimentation data with Experiment Results](/docs/analytics/charts/experiment-results/experiment-results-dig-deeper#interpret-your-results.)

{{partial:admonition type="tip" heading="Chart filtering"}}
The Experiment Results chart on the Activity tab responds to the selections you make in the [Filter card](#filter-card).
{{/partial:admonition}}
  
Click _Chart Controls_ to see the chart definition. 
    
Click *Open in Chart* to open a copy of the Experiment Results in a new chart.
    
{{partial:admonition type='note'}}
If you are running an A/B/n test, Amplitude Experiment displays the confidence interval / p-value for the control against each treatment individually. To instead see the comparison between two non-control treatments, either change the control variant, or open the test in Analytics and create a chart using the two treatments you're interested in.
{{/partial:admonition}}

If desired, adjust the experiment’s **confidence level**. The default is 95%. You can also [choose between a sequential test and a T-test](/docs/feature-experiment/workflow/finalize-statistical-preferences).   
  
{{partial:admonition type='note'}}
Lowering your experiment’s confidence level makes it more likely that your experiment achieves statistical significance, but the trade-off is that doing so increases the likelihood of a false positive.
{{/partial:admonition}}

## Diagnostics card

The Diagnostics card provides information about how your experiment is delivering. It shows charts about:

* Assignment events (cumulative and non-cumulative)
* Exposure events (cumulative and non-cumulative)
* Assignment to exposure conversion
* [Variant jumping](/docs/feature-experiment/troubleshooting/variant-jumping)
* Anonymous exposures (cumulative and non-cumulative)
* [Exposures without Assignments](/docs/feature-experiment/troubleshooting/exposures-without-assignments) (cumulative and non-cumulative)

For more control, open any of these charts in the chart build.

## Interpret notifications

Your preferred notification settings allow you to receive experiment updates by email or [Slack](/docs/analytics/integrate-slack). 

![experiment notification settings.png](/docs/output/img/workflow/experiment-notification-settings-png.png)

Click the check box next to the desired notification:

* **Experiment end reached:** Amplitude sends this notification when your experiment is complete.
* **SRM detected:** Amplitude sends this notification if it identifies a [sample ratio mismatch](/docs/feature-experiment/troubleshooting/sample-ratio-mismatch) issue.
* **Long-running experiments:** Amplitude sends this notification when your long-running experiment is complete.
* **Statsig for the recommendation metric is reached:** Amplitude sends this notification when your experiment's recommendation metric has reached stat sig.
* **Experiment end reached:** You receive this notification when your experiment is complete.
* **SRM detected:** You receive this notification if Amplitude identifies a [sample ratio mismatch](/docs/feature-experiment/troubleshooting/sample-ratio-mismatch) issue.
* **Long-running experiments:** You receive this notification when your long-running experiment is complete.
* **Statsig for the recommendation metric is reached:** You receive this notification when your experiment's recommendation metric has reached stat sig.

Amplitude Experiment sends a notification to the editors of the experiment.

## Next steps

It’s important to remember that no experiment is a failure. Even if you didn’t get the results you were hoping for, you can still learn something from the process—even if your test didn’t reach stat sig. Use your results as a springboard to asking hard questions about the changes you made, the outcomes you saw, what your customers expect from your product, and how you can deliver that.

In general, the next step should be deciding whether to conduct another experiment that supports your hypothesis to gather more evidence, or to go ahead and implement the variant that delivered the best results. You can also export your experiment to the Experiment Analysis in Amplitude Analytics and conduct a deeper dive there, where you can segment your users there and hopefully generate more useful insights.
