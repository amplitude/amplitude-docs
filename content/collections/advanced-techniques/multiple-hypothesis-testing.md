---
id: cf260863-11d8-434d-a2de-22c8256e83b6
blueprint: advanced-technique
title: 'Multiple hypothesis testing in Amplitude Experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/8807757689499-Multiple-hypothesis-testing-in-Amplitude-Experiment'
this_article_will_help_you:
  - 'Understand the differences between multiple hypothesis testing and single-hypothesis testing'
  - 'Learn how Amplitude combats potential problems with multiple hypothesis testing'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714079662
---
In an experiment, think of each variant or metric you include as its own hypothesis. For example, by adding a new variant, you’re putting forth the hypothesis that whatever potential changes are included in that variant will have a detectable impact on the experiment’s results. 

The simplest experiments have only a single hypothesis. Single-hypothesis tests can yield valuable insights. However, it’s often more efficient or enlightening to include more than one metric or variant, or **multiple hypotheses**.

That said, multiple hypothesis testing has the potential to introduce errors into your calculations of statistical significance, via the [multiple comparisons problem](https://en.wikipedia.org/wiki/Multiple_comparisons_problem) (also known as multiplicity or the look-elsewhere effect): The probability of making an error increases rapidly with the number of hypothesis tests you are running.

## Problems with multiple hypotheses testing

For example, imagine you want to run an experiment around the color of your site’s “Buy now” button. Currently, it’s blue (making it the **control**), but you also want to test out green (variant #1) and purple (variant #2). If your false positive rate is 0.05 (five percent) for each individual hypothesis test, the probability of finding a statistically significant result when the null hypothesis is **true** is:

`1 - 0.95^2 = 0.0975`

(This assumes the tests are independent.)

In other words, if you run enough tests, you’ll eventually get a statistically significant result no matter what. With a 0.05 false positive rate, you can expect that one out of every 20 hypothesis tests will be statistically significant by random chance alone.

The question asked by multiple hypothesis correction is, “is this stat sig result due to chance, or is it genuine?”

## False positives

You may already be familiar with the idea of a false positive rate. It’s the ratio between:  

* the amount of negative events **falsely** described as positive, and
* the total amount of **actual** negative events.

Every experiment carries the risk of a false positive result. This happens when an experiment reports a conclusive result in either direction, when there’s actually no real difference between variations.

The risk of a false positive result increases with each metric or variant you add to your experiment. This is true even though the false positive rate stays the same for each individual metric or variant.

Fortunately, there are statistical tools used to compensate and correct for the multiple comparisons problem. Amplitude uses the **Bonferroni correction** to accomplish this.

{{partial:admonition type='note'}}
 By default, the Bonferroni correction is set to on. In certain circumstances, you may manually toggle it off in your [statistical settings](/experiment/workflow/finalize-statistical-preferences). 
{{/partial:admonition}}

## Bonferroni correction

The Bonferroni correction is the simplest statistical method for counteracting the multiple comparisons problem. It’s also one of the more conservative methods, and carries with it a greater risk of false negatives than other techniques. The Bonferroni correction does not, for example, consider the distribution of [p-values](https://en.wikipedia.org/wiki/P-value) across all comparisons, which we would consider to be uniform if the null hypothesis is true for all hypotheses.

The Bonferroni correction does, however, control for family-wise error rate and applies to the confidence interval. In the button color example above, dividing 0.1 by 2 equals .05, which is what we want. Thus, the [family wise error rate](https://en.wikipedia.org/wiki/Family-wise_error_rate) (the probability of rejecting at least one hypothesis) is controlled. 

![image1.png](/output/img/advanced-techniques/image1-png.png)

**NOTE:** The proof follows from [Boole’s inequality](https://en.wikipedia.org/wiki/Boole%27s_inequality).

Mathematically, the Bonferroni correction works by dividing the false positive rate by the number of hypothesis tests you are running; this is equivalent to multiplying the p-value by the number of hypothesis tests.

Amplitude Experiment performs Bonferroni corrections on both the number of treatments, and the number primary and secondary metrics: 

* Bonferroni is only applied to the primary metric when there is more than one treatment.
* Bonferroni is applied to the secondary metric if there are multiple secondary metrics or multiple treatments.

In either case, you will see an info icon in the significance column when Bonferroni correction is applied. The tooltip will show the corrected and uncorrected p-value. 

![eadb7a2f-6963-4e41-9876-71b7ec29c325.png](/output/img/advanced-techniques/eadb7a2f-6963-4e41-9876-71b7ec29c325-png.png)