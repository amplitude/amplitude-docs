---
id: 4c9bc7b0-f786-4694-97c0-4668958ad1de
blueprint: under-the-hood
title: 'Sequential testing for statistical inference'
source: 'https://help.amplitude.com/hc/en-us/articles/4403176829709-How-Amplitude-Experiment-uses-sequential-testing-for-statistical-inference'
this_article_will_help_you:
  - 'Familiarize yourself with the statistical testing method used by Amplitude Experiment'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721759869
landing: false
enable_math: true
---
Experiment uses a sequential testing method of statistical inference. With sequential testing, results are valid whenever you view them. You can decide to end an experiment early based on observations made to that point. The number of observations you’ll need to make an informed decision is, on average, much lower than the number you’d need with [T-tests](/docs/feature-experiment/experiment-theory/analyze-with-t-test) or similar procedures. You can experiment more quickly, incorporating what you learn into your product and escalating the pace of your experimentation program.

Sequential testing has several advantages over T-tests. Primarily, you don’t need to know the number of observations necessary to achieve significance before you start the experiment. You can use both sequential testing and T-tests for binary metrics and continuous metrics. If you have concerns related to long tailed distributions affecting the Central Limit Theorem assumption, read this article about [outliers](/docs/feature-experiment/advanced-techniques/find-and-resolve-outliers-in-your-data). 

This article explains the basics of sequential testing, how it fits into Amplitude Experiment, and how you can make it work for you.

## Hypothesis testing in Amplitude Experiment

When you run an A/B test, Experiment conducts an hypothesis test using a randomized control trial. In this trial, users are randomly assigned to either a treatment variant or the control. The control represents your product in its current state, while each treatment includes a set of potential changes to your current baseline product. With a predetermined metric, Experiment compares the performance of these two populations using a test statistic. 

In a hypothesis test, you’re looking for performance differences between the control and your treatment variants. Amplitude Experiment tests the null hypothesis 

$$
H_0:\ \delta = 0
$$

where 

$$
\delta = \mu_{\text{treatment}} - \mu_{\text{control}}
$$

states there’s no difference between treatment’s mean and control’s mean.

For example, you want to measure the conversion rate of a treatment variant. The null hypothesis posits that the conversion rates of your treatment variants and your control are the same.

The alternative hypothesis states that there is a difference between the treatment and control. Experiment’s statistical model uses sequential testing to look for any difference between treatments and control.

There are many different sequential testing options. Amplitude Experiment uses a family of sequential tests called mixture sequential probability ratio test (mSPRT). The weight function, H, is the mixing distribution. The following mixture of likelihood ratios against the null hypothesis is such that:

$$
\[
\Lambda_{n}^{H,\theta_0}
= \int_{\Theta} \prod_{m=1}^{n}
\frac{f_{\theta}(X_m)}{f_{\theta_0}(X_m)}\, h(\theta)\,\mathrm{d}\theta .
\]
$$

{{partial:admonition type='note'}}
 Read more about sequential testing in this [article on frequently asked questions](/docs/faq/sequential-testing).
{{/partial:admonition}}

