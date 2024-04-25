---
id: 994fcfe6-557c-43ed-903e-dbf0bc71bb4c
blueprint: advanced-technique
title: 'Interpret the cumulative exposures graph: Divergent lines'
source: 'https://help.amplitude.com/hc/en-us/articles/20722853103643-Interpret-the-cumulative-exposures-graph-Divergent-lines'
this_article_will_help_you:
  - 'Understand potential causes of divergent lines in the cumulative exposures graph'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714079368
---
This article will review divergent lines with similar slopes versus divergent lines with varying slopes. Divergent lines refer to lines that start from a common point but slowly spread apart from each other. 

## Divergent lines with similar slopes

Sometimes your cumulative exposure graph will show divergent lines with **similar slopes**. This could be because your experiment started before all variants were ready.

![image8.png](/output/img/advanced-techniques/image8-png.png) 

In this example, the two variants began receiving traffic on two separate days, February 23 and February 28, resulting in a pair of staggered lines on the graph.

Ideally, you should not begin an experiment until all variants are ready to receive traffic. Adding a new variant after the experiment is underway can present a misleading picture of the results, since all variants were not subject to the same conditions for the same length of time. 

### The novelty effect

Another potential issue is the **novelty effect**: where the newness (novelty) of a treatment can sway experiment results. In the example above, users exposed to the green variant may have had more time to adjust to the new experience. Finally, users exposed to that green variant have had more opportunities to trigger the primary metric, especially if it’s an unbounded time metric, thus making the comparison between variants unequal.

A central requirement of experimentation is to make sure that the only difference between treatment and control is the feature you are testing. This way, you know any differences you see are the result of causation, and not just correlation. 

## Divergent lines with different slopes

There are a number of reasons why you'll see divergent lines with **different slopes** in your cumulative exposures graph. If you’re using a custom exposure event, users may see old, cached variants of your experiment if they keep triggering the exposure event without triggering the assignment event.

For example, a user could be assigned to the control variant without triggering the exposure event. If in the future you set the traffic allocation for the control variant to 0%, that user could return afterwards and trigger the exposure event **without triggering a new assignment event**. That user will be counted as a control exposure.

This reasoning also holds for experiments with sticky bucketing on.

 ![image5.png](/output/img/advanced-techniques/image5-png.png)

In this example, on March 15, this user rolled out their experiment to 100% for the control variant. Since sticky bucketing was turned on, we still see the number of “on” users increasing even after the traffic allocation is set to 0%. This happens because allocation occurs when the variant is requested via the SDK or API, so the variant can become “stuck” even without the user having been exposed to it. 

### Sticky bucketing and traffic allocation

You should keep in mind that when you select sticky bucketing **and** change the traffic allocation, you **will not get** the desired traffic allocation. Instead, you’ll get a **weighted average** between the two allocations, since the users who were previously bucketed will stay in their bucket. You’ll have to wait a bit to get close to the desired traffic allocation. 

If your experiment has sticky bucketing turned on, and you’re planning to roll out a variant after it ends, you should delete the appropriate branch in the code and remove the feature flag. If you do not want to make a code deployment, you can also turn off sticky bucketing.