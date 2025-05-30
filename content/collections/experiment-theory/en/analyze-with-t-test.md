---
id: dc96227b-0ac7-4206-ab5f-b92d020f88b6
blueprint: experiment-theory
title: 'Analyze your experiment data with the T-test'
source: 'https://help.amplitude.com/hc/en-us/articles/12587885686299-Analyze-your-experiment-data-with-the-T-test'
this_article_will_help_you:
  - "Use the T-test to analyze your Amplitude Experiment's results"
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715102534
---

A T-test is the **comparison of means** amongst two populations of data to decide if the difference is statistically significant. Amplitude uses the [Welch's T-test](https://en.wikipedia.org/wiki/Welch%27s_t-test), which comes with a few assumptions about your dataset:

* The [Central Limit Theorem](https://en.wikipedia.org/wiki/Central_limit_theorem) applies to the metric.
* Neither population shares the same variance.
* You don't run the T-test until you've reached the sample size specified by the duration estimator.

{{partial:admonition type="tip" heading="Looking for a Z-test?"}}
T-test supports many of the same options as a Z-test.
{{/partial:admonition}}

Conduct a T-test as either **two-sided** (which looks for **any** change in the metric, in either direction) or **one-sided** (which looks for an increase **or** a decrease, but not both). T-tests also work for both binary and continuous metrics.

A two-sided test doesn't explicitly state astatistically significant increase or decrease, while a one-sided test does. If you select *Increase*, the upper confidence interval bound is positive infinity; for *Decrease*, the lower confidence interval bound is negative infinity.

{{partial:admonition type='note'}}
If you have yet to run your experiment or your sample size is large enough, you should use sequential testing instead of running a T-test. Read more about the difference in testing options [in this blog](https://amplitude.com/blog/sequential-test-vs-t-test).
{{/partial:admonition}}

## Analyze your data with the T-test

You can access the T-test settings from the *Settings* tab in Amplitude Experiment. The settings depend on the type of T-test that you'd like to run (one-sided or two-sided) and the direction you'd like the metric to move in (increase for up or decrease for down). To set your T-test's settings:

1. Edit the *Goals* panel, select *Increase* or *Decrease* for your metric.
2. Open the *Analysis Settings* panel. Navigate to *Stats Preferences > Advanced*. Select the **T-test** Stats Method. Choose *1-sided* or *2-sided* based on the type of T-test you want to run. For example, if you want to do a two-sided T-test looking for an increase, select *Increase* in the primary metric and *2-sided T-test* in statistical settings.
3. Enter the number of users needed under *Samples Per Variant Needed*. If you're unsure of the sample size to enter in *Samples Per Variant*, use Amplitude's duration estimator. To learn more, see our Help Center article on [planning experiments with the help of the duration estimator](/docs/feature-experiment/workflow/experiment-estimate-duration).

    {{partial:admonition type='note'}}
    The T-test works by first computing the sample size you need before you can control for a specific false positive and false negative rate. Analyzing your data before reaching the sample size threshold increases your error rates. See this [article](https://medium.com/@SkyscannerEng/the-fourth-ghost-of-experimentation-peeking-b33890dcd3de) for more explanation on how peeking can interrupt your experiment process.
    {{/partial:admonition}}

4. Lastly, click *Save* to change the statistical settings to T-test.

## Manage sample size needed for the T-test

You need to reach a minimum sample size before you run a T-test. Experiment warns you if your data set is too small. 

You can find more information on your sample size requirements in the *Cumulative Exposure* graph and its corresponding table. The graph shows a constant, dotted line named *Sample Size Target*, which is the total number of users per variant needed. The table next to the graph highlights the *Exposure Remaining*, which is the number of users needed by each variant. This information can confirm not only the number of users needed before running the T-test, but also provide an estimate of the time you need to complete the experiment before using a T-test to interpret your results.

![](/docs/output/img/experiment-theory/RM3egRnbjtRu6omQuMOnWLzB454XqT8c0Zggca7cXJGi3BM6utiLZjfABHlMD3LEQi3rkWuz1DWXwinwVTJeZ3WQ40aAi9qhQAFzhO769-nlNFWRhYzAhzOVPTk0UHO6k323AO60QDFVCgcZE-AThMY)

Unfortunately, reaching the needed sample size doesn't guarantee your results are statistically significant. For example, if your lift is smaller than the MDE, then your results often aren't be statistically significant.