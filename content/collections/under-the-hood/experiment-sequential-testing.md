---
id: 4c9bc7b0-f786-4694-97c0-4668958ad1de
blueprint: under-the-hood
title: 'Sequential testing for statistical inference'
source: 'https://help.amplitude.com/hc/en-us/articles/4403176829709-How-Amplitude-Experiment-uses-sequential-testing-for-statistical-inference'
this_article_will_help_you:
  - 'Familiarize yourself with the statistical testing method used by Amplitude Experiment'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716329138
---
Amplitude Experiment uses a **sequential testing** method of statistical inference. Sequential testing has several advantages over **T-tests**, another widely-used method, chief among them being that you don’t need to know how many observations you’ll need to achieve significance before you start the experiment.

Why is this important? With sequential testing, results are valid whenever you view them. That means you can **decide to terminate an experiment early** based on observations made to that point, and that the number of observations you’ll need to make an informed decision is, on average, much lower than the number you’d need when using a T-test or similar procedures. You can **experiment more quickly**, incorporating your new learnings into your product and escalating the pace of your experimentation program.

This article will explain the basics of sequential testing, how it fits into Amplitude Experiment, and how you can make it work for you.

## Hypothesis testing in Amplitude Experiment

When you run an A/B test, Experiment conducts a **hypothesis test** using a randomized control trial, in which users are randomly assigned to either a treatment variant or the control. The control represents your product as it currently is, while each treatment includes a set of potential changes to your current baseline product. With a predetermined metric, Experiment compares the performance of these two populations using a test statistic. 

In a hypothesis test, you’re looking for performance differences between the control and your treatment variants. Amplitude Experiment tests the **null hypothesis** 

![image1.png](/output/img/under-the-hood/image1-png.png) 

where 

![image2.png](/output/img/under-the-hood/image2-png.png) 

states there’s no difference between treatment’s mean and control’s mean.

For example, if you’re interested in measuring the conversion rate of a treatment variant, the null hypothesis posits that the conversion rates of your treatment variants and your control **are the same**.

The **alternative hypothesis** states that there is a difference between the treatment and control. Experiment’s statistical model uses sequential testing to look for **any** difference between treatments and control.

There are a number of different sequential testing options. Amplitude Experiment uses a family of sequential tests called **mixture sequential probability ratio test** (**mSPRT**). The weight function, H, is the mixing distribution. So we get the following mixture of likelihood ratios against the null hypothesis that

![image3.png](/output/img/under-the-hood/image3-png.png)

:

![image4.png](/output/img/under-the-hood/image4-png.png)

Currently, Amplitude only supports a comparison of arithmetic means between the treatment and control variants for uniques, average totals, and sum of property.

{{partial:admonition type='note'}}
 Read more about sequential testing in this [article on frequently asked questions](/experiment/experiment-theory/analyze-with-t-test).
{{/partial:admonition}}