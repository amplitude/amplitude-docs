---
id: 18b193bc-6806-48f7-997a-595aff1fbf91
blueprint: compass
title: "Find your company's inflection metrics with Compass"
source: 'https://help.amplitude.com/hc/en-us/articles/115001526027-Find-your-company-s-inflection-metrics-with-Compass'
this_article_will_help_you:
  - 'Use the Compass chart to identify the moments in the user journey that are critical to driving growth'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717018994
---
[Compass](/analytics/charts/compass/compass-aha-moment) is a powerful feature that can help you identify behaviors that are predictive of retention or conversion. It identifies **inflection metrics**—those that capture the moments when a user has reached a critical threshold in your product—which are instrumental in driving user growth.

For example, Facebook found early on that adding seven friends in the first ten days was the strongest signal of long-term retention. More recently, Netflix published an analysis on exactly how many episodes it takes per TV show to get hooked on the show.

![](/output/img/compass/Screen_Shot_2017-01-18_at_4.22.46_PM.png)

Before you proceed, we suggest you [read the Help Center documentation on Compass first](/analytics/charts/compass/compass-aha-moment). The rest of this article assumes that you have a general understanding of how the analysis works.1

For ease of reading, we maintain the new user/retention use case but new user can be replaced with any base cohort, and retained user can be replaced with any target cohort.

To find an inflection metric, you first need to determine your target cohort. Often, the inflection metric is centered on the process of encouraging new users to become retained users. In the examples used in this article, the base cohort is new users and the target cohort is retained users.2

A **base cohort** is an initial set of users you are analyzing (e.g. new users or logged in users). A **target cohort** is a set of users that have successfully completed a targeted action (e.g. retention, conversion).

This is a common use case, and it's the default setup for Compass charts. However, you can easily edit your chart so that it reflects your specific analytic needs.

When looking for an inflection metric, keep in mind that it's not absolute. It doesn't mean that a user will convert specifically at that point; instead, it suggests the type of behavior you want your organization (e.g. the product and marketing team) to encourage in your users. 

## Get started with Compass

The best way to begin using Compass is to ask yourself which events might be good predictors of retention. Once you have selected an event to analyze, you should start thinking about correlations that might have potential to reveal something interesting about user behavior. But before we get into that, let’s explore how to interpret the Compass metrics.

## Proportion above threshold

The **proportion above threshold** tells you how many new users actually triggered the event in their first *N* days. This matters because there must be a large enough sample of users meeting the threshold for Compass to understand how well it correlates with retention.

One way to change the proportion is by increasing the number of performance days in the window (Amplitude allows between one to seven days). More performance days gives users more time to reach the threshold, hence increasing the proportion. In addition, if you are investigating an event property, consider looking at the overall event, as that may have a high enough proportion above the threshold.

Note that there is no perfect proportion above the threshold. Too low and it is unlikely you can get new users to perform that event that many times; too high and you do not have any room for improvement. 3

There are some extreme cases where a low proportion above the threshold can still result in a high correlation. For example, if a web application has high traffic but forces login for all new users.

This metric is important because it takes into account the balancing of finding your inflection metric. Referring back to the Facebook example, getting a new user to add one friend is not a great choice for an inflection metric, because almost all users do that. However, getting a new user to add 100 friends, while highly correlated with retention, is not feasible because a very low percentage of users actually reaches that level.

## True positive ratios: PPV and sensitivity

If you have a reasonable proportion above the threshold, next you 'll want to see the correlation between reaching the event frequency and retention. Do this by looking at the **positive predictive value** **(PPV)** and **sensitivity**.

PPV looks at the ratio of users who reached the event frequency and were retained (known as **true positive**) to all users who reached the event frequency (**true positive + false positive**). Sensitivity looks at the ratio of users that retained and reached the event frequency (true positive) to all users retained (true positive + false negative). You want both to be high.

More reading on true positives, false positives, and other values in a contingency matrix can be found [here](https://en.wikipedia.org/wiki/Confusion_matrix).

| **Event frequency** | **Retained** | **Not retained** |
| --- | --- | --- |
| ≥ n Times | True positive | False positive |
| < n Times | False negative | True negative |

### Example 1: High PPV, low sensitivity

For example, imagine that PPV is high but sensitivity is low. This means that this event **is a predictor** of retention, but **not many new users** are reaching the threshold. It's therefore a promising candidate for experimentation, to see if you can encourage more users to trigger it. It also means that there might be another inflection metric you haven’t looked at yet; something else is likely correlated with retention, since people who aren’t reaching this frequency are still being retained.

| **Event Frequency** | **Retained** | **Not Retained** |
| --- | --- | --- |
| ≥ 5 Times | 10 | 1 |
| < 5 Times | 100 | 10 |

### Example 2: Low PPV, high sensitivity

In this example, the event frequency is capturing a lot of the retained users, but the overall retention for the product is likely low. This is **not a good candidate** for an inflection metric, because either the product’s retention is low, or a high percentage of users meeting the event frequency are not being retained.

| **Event Frequency** | **Retained** | **Not Retained** |
| --- | --- | --- |
| ≥ 5 Times | 10 | 100 |
| < 5 Times | 1 | 10 |

## True negative ratios: NPV and specificity

While the inflection moment should be a positive predictor, you also want to ensure that when a user **fails** to reach the threshold, it will be a **negative** predictor of retention—in other words, churn. This is captured through the **negative predictive value** **(NPV)** and **specificity**.

NPV looks at the ratio of users who both did **not** reach the event frequency and did **not** retain (true negative) to all users who did **not** reach the event frequency (true negative + false negative).

Specificity looks at the ratio of users who both did **not** reach the event frequency and did **not** retain (true negative) to all users who did **not** retain (true negative + false positive). As in the examples above, you are hoping to maximize both of these values.

{{partial:admonition type="tip" heading=""}}
There is, however, an edge case where a high NPV and high specificity can lead to a strong correlation that is inappropriate for use as an inflection metric. This occurs when a very high proportion of users fall into the true negative bucket, and the proportion above the threshold is very low—for example, a website where a very small proportion log in, but doing so blocks every other event from occurring. In this instance, most events will have a high correlation with retention because most users do not trigger any of the events. To prevent this, change the base cohort to better reflect an actual user (e.g. someone who logs in).
{{/partial:admonition}}

### Example 3: High NPV, Low Specificity

In this example, one of two things is likely happening. Either the PPV is also low (as in Example 2), or the proportion above the threshold is so high as to prevent any improvement by encouraging this action. Neither are great inflection metrics.

| **Event Frequency** | **Retained** | **Not Retained** |
| --- | --- | --- |
| ≥ 5 Times | 1000 | 100 |
| < 5 Times | 1 | 10 |

### Example 4: Low NPV, high specificity

Here, either the sensitivity is also low (as in Example 1), or the retention is so high that there aren’t many users to convert—a good problem to have!

| **Event Frequency** | **Retained** | **Not Retained** |
| --- | --- | --- |
| ≥ 5 Times | 1000 | 1 |
| < 5 Times | 100 | 10 |

As you might have guessed by now, we are basically running the Compass analysis to try to uncover event frequencies that maximize the upper left (true positive) and bottom right (true negative) quadrants of the contingency matrix (or, if you are familiar with statistics, minimize the [Type I and Type II errors](https://en.wikipedia.org/wiki/Type_I_and_type_II_errors)).  

These inflection metrics tend to balance all five of the detailed statistics we have described to accomplish this, and depending on the type of product, a good correlation will be in the range of 0.2-0.4 depending on the number of performance days (1-7) for the event.5

It's also important to check that the sample size is sufficient to draw conclusions. There's no magic number for this, as it depends on your overall user volume, but you can see the effect of sample size by clicking on the blue +- number (the 95% confidence interval) next to the correlation. Sample size can be increased by changing the date range: You can use up to 90 days of data.

Understand that Compass exposes **correlations** from your data—hypotheses you can now test by making changes to your product and/or lifecycle marketing. The only way to prove a causal relationship is to run an A/B or split test to isolate those changes. Read more about how you can [analyze A/B test results on Amplitude](https://help.amplitude.com/hc/en-us/articles/115001580108).