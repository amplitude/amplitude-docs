---
id: 183eec11-905d-4333-afaf-089e46ca0b55
blueprint: workflow
title: 'Estimate the duration of your experiments'
source: 'https://help.amplitude.com/hc/en-us/articles/11502996649371-Estimate-the-duration-of-your-experiments'
this_article_will_help_you:
  - 'Understand the components of the duration estimator'
  - 'Use the duration estimator to plan experiment sample size and run time needed to reach statistical significance'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714516648
---
The duration estimator can help you determine the sample size and experiment run time needed to reach [statistical significance](https://en.wikipedia.org/wiki/Statistical_significance) in your Amplitude experiment, and to help you decide if an experiment would be worthwhile.

{{partial:admonition type='note'}}
 While Amplitude Experiment supports sequential testing, the duration estimator solely supports determining the sample size for a T-test. Click [here](https://amplitude.com/blog/sequential-test-vs-t-test) to read more about the difference between sequential tests and T-tests. 
{{/partial:admonition}}

## Understand the duration estimator

This table describes the components involved in generating the duration estimate.

|  |  |  |
| --- | --- | --- |
| **Component name and default setting** | **Definition and *data validation*** | **Relation to sample size needed for statistical significance** |
| *Confidence Level:* 95% | The confidence level is a measure of your own tolerance for false positives in the results. For example, if you were to set the confidence level at 95%, that means that if you were to roll out the same experiment again and again, you would expect to get the same results 95% of the time. For the remaining 5%, you might interpret the results as statistically significant when they're not (i.e., a false positive). The confidence interval must be between 1% and 99%. Amplitude recommends a **minimum** of 80%. The experiment's results may no longer be reliable for any level below that. | Larger the confidence level, larger the sample size |
| *Control Mean: A*utomatically computed when you select the primary metric | The control mean is the average value of the selected primary metric over the last seven days (not including today) for users who completed the proxy exposure event. Consider adjusting the mean if there was a recent special event or holiday that may have impacted the average in the last seven days. This value cannot be zero, regardless of metric type. For conversion metrics, it cannot be one. For conversion metrics, .5 means 50%, and not .5%. | Smaller the control mean, larger the sample size |
| *Standard Deviation:* Automatically computed for you when you select the primary metric | Standard deviation signifies the variance, or the spread, in the data (average between each data point and the mean). It only shows up for numerical metrics and not for binary or 0-1 conversion rates. The automatic calculation will be based on the standard deviation of the primary metric over the last seven days (not including today) for users that completed the proxy exposure event. This value can be any positive number. | Larger the standard deviation, larger the sample size |
| *Power:* 80% | Power is the percentage of true positives. It can help measure the change's error rate. Think of power as the precision you need in your experiment, or what risk you're willing to take for potential erroneous results. This value must be between 1% and 99%. Do not set below 70%. | Larger the power, larger the sample size |
| *Test Type:* 2-sided | A 1-sided t-test will look for either an increase or a decrease of the change compared to the mean, whereas a 2-sided t-test will look for **both** an increase and a decrease. | 2-sided will require a larger sample size than 1-sided |
| *Minimum Effect (MDE):* 2% | The MDE, aka the minimum goal or effect size, is *relative* to the control mean of the primary metric; it is not absolute nor standardized. For example, if the conversion rate for control is 10%, an MDE of 2% would mean that a change would be detected if the rate moved outside of 9.8% to 10.2%. Use the smallest possible change desired to help determine if the experiment would be a success.  This value can be any positive percentage. | Smaller the MDE, larger the sample size |

## Interpret the duration estimator results

Once all components have been entered, the duration estimator will display a result. This will be the estimated **number of days** needed to reach statistical significance when conducting your experiment.

The duration estimator will provide solutions if your results are greater than the optimal 30 days, such as removing a variant or two. If results are within a reasonable timeframe for your organization, the duration estimator will state that the estimated number of days "is the optimal amount of time to run your experiment." 

## Reduce experiment run time

Sometimes, the results of the duration estimator indicate longer run time than is desired. Consider these options to decrease your experiment's run time:

* Modify error rates to reduce the sample size needed
* Change the primary metric and exposure event
* Target more users
* Modify the standard deviation so that outliers don't carry as much weight
* Decide if the experiment is worth the run time in the first place. If not, consider scrapping it.

Ultimately, the value of the duration estimator is based on the unique needs of your business goals and the risks that you're able to take to run them. [Read more about the experiment design phase here](https://help.amplitude.com/hc/en-us/articles/4405839607579-Define-your-experiment-s-goals).