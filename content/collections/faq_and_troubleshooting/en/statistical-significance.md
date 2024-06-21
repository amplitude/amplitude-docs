---
id: 05e6e78c-dcda-41d1-8bbe-92c7e578f785
blueprint: faq_and_troubleshooting
title: 'Statistical significance'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360053484751'
---
Amplitude's A/B testing features rely on standard statistical techniques to determine its statistical significance. This article covers some frequently asked questions about those calculations.


{{partial:collapse name="How does Amplitude calculate improvement over baseline?"}}
Improvement over baseline is the ratio of the mean variant (A) over the mean baseline (B), ![improvement over baseline.png](/docs/output/img/faq/improvement-over-baseline-png.png){.inline}.

Mean of variant (A): ![mean of variant.png](/docs/output/img/faq/mean-of-variant-png.png){.inline}

Mean of baseline (B): ![mean baseline.png](/docs/output/img/faq/mean-baseline-png.png){.inline}

![k.png](/docs/output/img/faq/k-png.png){.inline} = number of conversions

![n.png](/docs/output/img/faq/n-png.png){.inline} = sample size
{{/partial:collapse}}


{{partial:collapse name="Why are unique conversions considered in the calculations but not totals?"}}
Amplitude uses unique conversions instead of totals when looking for statistical significance. This is because looking at totals makes false assumptions about a user's behavior in the funnel - meaning, the aggregate sum assumes that each time the user enters the funnel is independent of the previous time they entered. This behavior cannot be assumed when calculating for statistical significance, however reviewing totals could be beneficial for other analyses in the [experiment results chart](/docs/analytics/charts/experiment-results/experiment-results-dig-deeper) or the [Experiment end-to-end product](/docs/experiment/overview).
{{/partial:collapse}}


{{partial:collapse name="How does Amplitude calculate statistical significance?"}}
Amplitude uses standardized statistical methods to calculate statistical significance. Keep in mind that the method used—either sequential testing or a two-tailed T-test—can vary depending on the feature you're using for analysis. By default, Amplitude Experiment and the Experiment Results chart use sequential testing, while the Funnel Analysis chart uses the two-tailed T-test. This means that if you're looking for similar results between analyses, the p-values may not match if your charts use different testing methods. 

{{partial:admonition type='note'}}
 If you want to use the T-test to analyze your end-to-end Experiment or Experiment Results chart data, follow the steps in this [Help Center article](/docs/experiment/experiment-theory/analyze-with-t-test).  
{{/partial:admonition}}

**Interpreting stat sig results**

For both sequential testing and the T-test, Amplitude uses a false positive rate of 5% to judge results, and it only looks at the best-performing variant. By default, Amplitude uses a 5% false positive rate, the threshold for significance is (1- p value) > 95%. You can set a different false positive rate in [Amplitude Experiment](/docs/analytics/charts/experiment-results/experiment-results-dig-deeper). You cannot change the false positive rate in the Funnel Analysis chart.

To help reduce false positives, Amplitude sets a minimum sample size before it declares significance. Currently, this minimum is set to 30 samples, five conversions, and five non-conversions, for each variant. Tests that do not meet these minimums are automatically considered not statistically significant.

When a test has reached statistical significance, you will see this green text:

![FAQ_AB_9.png](/docs/output/img/faq/faq-ab-9-png.png)

Otherwise, you will see the following red text:

![FAQ_AB_10.png](/docs/output/img/faq/faq-ab-10-png.png)
{{/partial:collapse}}
