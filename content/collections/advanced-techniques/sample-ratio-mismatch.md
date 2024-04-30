---
id: a8dcb2f4-7dd9-49dd-9a20-4ae79a92646c
blueprint: advanced-technique
title: 'Sample ratio mismatches: Debug issues with experiment allocations'
source: 'https://help.amplitude.com/hc/en-us/articles/8043418569371-Sample-ratio-mismatches-Debug-issues-with-experiment-allocations'
this_article_will_help_you:
  - 'Understand what a sample ratio mismatch is, and why it’s a problem'
  - 'Diagnose the root cause of the issue'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714079753
---
In Amplitude Experiment, a sample ratio mismatch (SRM) occurs when the **observed** allocation for variants **significantly differs** from the **specified** allocation. 

For example, imagine you've set your experiment's traffic allocation to be split equally between the control and treatment variants, but instead, the control receives 55% of the experiment's traffic. 

SRMs point to biases in the data, and if unresolved, can lead to unexpected results. Generally, you should be wary of the results of any experiment affected by a SRM.

Potential causes of SRMs include:

* Instrumentation errors
* Changing traffic allocation in the middle of the experiment
* Adding or removing a variant in the middle of an experiment
* Turning sticky bucketing on or off in the middle of an experiment

The cumulative assignment or exposure charts can help you track down the cause of an SRM. Look for timestamps where the control and treatment time series diverge; often, you'll find the cause there.

In some cases, SRMs are caused by **[variant jumping](https://www.docs.developers.amplitude.com/experiment/guides/troubleshooting/variant-jumping/).** This is when the same user sees two or more variants, which sometimes occurs with authentication patterns that make it difficult to know if a user has already been assigned a variant. Examples include: 

* Applications with short-lived sessions
* Applications with large numbers of anonymous users

You may receive a SRM warning when analyzing a time frame that’s shorter than actual duration of the experiment. You can usually ignore these warnings, as long as your analysis on the full experiment window doesn’t trigger a similar warning.

Users can check for SRM issues in the data quality guide on the *Analyze* tab. Click on *Implementation & Instrumentation* to view a count of any SRM issues detected. 

![sample-ratio_mismatch_detected.png](/output/img/advanced-techniques/sample-ratio-mismatch-detected-png.png)

Learn more about [debugging sample ratio mismatches in Amplitude Experiment](https://www.docs.developers.amplitude.com/experiment/guides/troubleshooting/sample-ratio-mismatch/).