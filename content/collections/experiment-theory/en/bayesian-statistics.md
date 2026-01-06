---
id: 16863948-0e45-4c77-a816-6aafd1e02eee
blueprint: experiment-theory
title: 'Bayesian Statistics'
this_article_will_help_you:
  - 'Understand the basics of Bayes statistics'
  - 'Understand how Bayesian statistics work in Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 83fbb88a-75e7-45dc-aed3-39c10967893c
updated_at: 1767716632
---

Bayesian statistics is a statistical method that compares groups by calculating the probability that one variant outperforms another. Unlike traditional methods that rely on [p-values](https://en.wikipedia.org/wiki/P-value) and [fixed hypothesis](/docs/feature-experiment/overview#create-a-hypothesis) testing, Bayesian statistics provides direct probability estimates that align more closely with how teams naturally make decisions.

## Understanding Bayesian statistics

Bayesian methodology is built on three core concepts that work together to evaluate your experiment results:

**Priors**: Represents your initial expectations about a parameter or hypothesis before you collect data. Experiment uses uninformative priors to remain neutral about expected outcomes. For binary metrics, this is a Beta(1,1) prior (a uniform distribution). For continuous metrics, Experiment uses an uninformative normal prior.

**Likelihoods**: Measures the probability of observing your collected results given a particular set of parameter values. As users interact with your variants, the likelihood function incorporates this observed data into the analysis.

**Posteriors**: Combines your priors with the observed likelihoods to produce updated beliefs about your experiment outcomes. The posterior distribution provides a complete picture of possible results, including the most likely values and the uncertainty around those estimates. This posterior forms the basis for all metrics displayed in Amplitude Experiment, including relative lift, absolute lift, and variant means.

With Bayesian methodology, you can test whether the control mean differs from the treatment mean. Rather than setting an arbitrary significance threshold, you examine the entire distribution of possible outcomes and make decisions that best fit your business goals and risk tolerance.

Bayesian statistics treats experimentation as an ongoing process of learning and updating expectations. As you gather more data over time, the posterior distribution continuously refines to reflect your accumulated knowledge. This approach enables more responsive decisions based on market changes and customer preferences.

### Key Bayesian Concepts

Review the following concepts to better understand Bayesian statistics:

**Chance to Beat Control** provides the probability that the treatment variant performs better than the control. This differs from the frequentist p-value, which only tells you the probability of seeing your results (or more extreme results) if no true effect exists. Bayesian analysis answers the more intuitive question: "What's the probability this variant is actually better?"

**Credible Interval** represents the range where the difference between treatment and control means lies with a specified probability. Unlike confidence intervals in frequentist statistics, Bayesian credible intervals directly describe the parameter's likely values. A 95% credible interval means there's a 95% probability the true difference falls within that range.

**Chance to Be Best** appears when your experiment includes more than two variants. This metric shows the probability that each variant outperforms all other variants. With only two variants, this metric equals the chance to beat control.

### When to use Bayesian Statistics

Bayesian methods excel when you want continuous insight into your experiment's performance without inflating false positive risk. They're particularly valuable when you need to incorporate prior knowledge, make decisions with smaller sample sizes, or require probability statements that directly answer business questions like "How likely is this variant to succeed?"

For teams running standard product experiments with straightforward decision criteria, Amplitude Experiment defaults to sequential testing, which offers fast results with strong false positive control. You can switch to Bayesian analysis at any point to gain additional perspective on your experiment outcomes.

## Setting up Bayesian statistics

To use Bayesian statistics for your experiment, complete the following:

1. Go to your Experiments page.
2. Open an existing experiment or click **Create Experiment**.
3. Scroll to the Advance (Optional) settings and then click **Stats Preferences**. 
4. Click the **Statistical Method** drop-down and select **Bayesian**. 

If your experiment is already running, you can switch to Bayesian analysis in the Experiment Results Chart by clicking the **Gear icon > Statistical Method** and selecting **Bayesian**.

### Configuring the Chance to Outperform Threshold

You can adjust the Chance to Outperform Threshold anywhere from 0% to 100%. Because Amplitude conducts a [two-tailed Bayesian test](https://www.statsig.com/perspectives/twotail-hypothesis-definition-examples-applications), setting this threshold at 95% means your experiment reaches significance when the chance to outperform is greater than or equal to 97.5% or less than or equal to 2.5%. This corresponds to a 95% credible interval.

### Understanding posterior-based metrics

All metrics in Bayesian analysis: relative lift, absolute lift, and mean values, are based on the posterior distribution. This means you might experience scenarios where an experiment with minimal data still displays a mean value, because the prior distribution contributes to the calculation. For example, with one exposure and zero conversions, the control mean displays as 33.3% because the prior adds one conversion and one non-conversion, resulting in a posterior mean of `(0+1) / (1 + 1 + 1)`.

To view the mean without the prior distribution's influence, hover over the metric you want Analysis section. The mean over time chart shows the posterior mean in cumulative view and the data's raw mean in non-cumulative view.

### Minimum data requirements

To ensure reliable results, Experiment applies minimum thresholds before displaying credible intervals and chance to beat control:

- **Binary metrics**: At least 25 conversions and 100 exposures in each variant.
- **Numeric metrics**: At least 100 exposures in each variant.

## False Positive Control and Multiple Comparisons

Bayesian statistics does not guarantee false positive control in the traditional sense. Amplitude disables Bonferroni correction when using this method. Instead, Bayesian analysis controls expected loss, providing a more nuanced approach to decision-making under uncertainty. This approach follows established research on Bayesian multiple comparison methodology.

## Limitations

Experiment Bayesian implementation does not support CUPED (variance reduction) or custom prior distributions. The platform uses standard uninformative priors to maintain objectivity in your experiment analysis.