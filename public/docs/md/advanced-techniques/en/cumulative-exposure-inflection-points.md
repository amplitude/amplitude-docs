---
id: 6b86591a-0640-488d-b94c-5973aea3308b
blueprint: advanced-technique
title: 'The cumulative exposures graph: Inflection points and flattened slopes'
source: 'https://help.amplitude.com/hc/en-us/articles/20722788163995-Interpret-the-cumulative-exposures-graph-Inflection-points-and-flattened-slopes'
this_article_will_help_you:
  - 'Interpret the meaning of an inflection point in your cumulative exposures graph'
  - "Determine why you're seeing a flattened slope"
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720544857
---
## Inflection point

Sometimes, lines have an **inflection point** caused sudden increase or decrease in the count of exposures per day.

![image2.png](/docs/output/img/advanced-techniques/cumulative-exposures-inflection-1.png)

You can see here that on February 27, the slope of all three lines changed a bit, from around 70 users per day per variant, to about 100 users per day per variant. (Note that the slope can also flatten after an inflection point.)

There are several reasons why this could happen:

* Traffic to your experiment increased
* Traffic allocations increased for each variant (If you had increased traffic to a single variant, then only one line would show this inflection point)
* The targeting criteria changed (for example, originally you were targeting users from California, but then decided to target users from California and Florida)
* There was some external event (like an increase in the advertising budget or the release of a new feature, either of which could have driven more users to your experiment)

### Settings changes during a live experiment

**You shouldn't change** settings for traffic or traffic allocations to variants in the middle of an experiment. Doing so can introduce [Simpson’s paradox](https://en.wikipedia.org/wiki/Simpson's_paradox) into your results. If you have changed the traffic allocation, try restarting the experiment by choosing a new start date. Avoid including any users who were already targeted.

{{partial:admonition type='note'}}
 Read more about [Simpson's paradox in this article](https://www.exp-platform.com/Documents/2009-ExPpitfalls.pdf).
{{/partial:admonition}}

Likewise, you shouldn’t change the targeting criteria during an experiment because the sample is then not representative of what would happen if you rolled out a variant to 100% of your users. Instead, consider gradually increasing traffic to the **entire** experiment, or doing a **gradual feature rollout** instead of an experiment.

For example, imagine that in the first week of your experiment, you target only Android users, and 100 of them see your experiment. The following week, you change the targeting criteria to include iOS users, and 20 of them see your experiment. 

To this point, 220 users have seen your experiment after two weeks; 9% of them (20/220 = 1/11 = 9%) are iOS users. However, when you release your experiment to 100% traffic, you discover the true percentage of iOS users is actually 16.7%. In this case, you're **underestimating the effect** of iOS users. If the experiment shows a positive lift for Android users but a negative lift for iOS users, you may be rolling out a feature based on what you think is a positive experiment, but it's actually a negative.

### Consider changing the experiment's end date

Once you have answered the question of why the slope changed, consider whether you should adjust the end date of the experiment. With more traffic, you’ll reach statistical significance faster. If you're getting less traffic, statistical significance comes more slowly.

## Flattened slope

![image3.png](/docs/output/img/advanced-techniques/cumulative-exposures-inflection-2.png)  

Focusing on the data from March 4 to March 11, the graph is fairly flat. This indicates that very few new users joined to the experiment during that time period. Potential explanations include:

* You’ve run out of users to add to the experiment
* There is a bug in the sending of exposure events
* Your product’s usage is strongly affected by seasonality

You can see a strong illustration of that last bullet point in this hourly chart:

![image7.png](/docs/output/img/advanced-techniques/image7-png.png)

Between March 21 at 7 PM and March 22 at 9 AM (the rightmost section of the graph), very few users were exposed to this experiment. But just before that, starting at around 5 AM, a large number of users were exposed. Yet on the left hand side of the graph, the pattern is one of users slowly trickling in. When you consider that an online gambling company is running this experiment, it makes sense that there would be these spikes in traffic when they run their jackpots.