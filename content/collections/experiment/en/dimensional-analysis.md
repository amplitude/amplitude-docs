---
id: f544b5a1-0689-4137-ab14-690903ae7902
blueprint: experiment
title: 'Dimensional Analysis'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1740515903
---
Sometimes, you might want to remove QA users or other internal traffic from your analyses because they're not representative of your customer base, and may skew results.

Amplitude's Dimensional Analysis capabilities enable you to exclude groups of users that you define from analysis on a per-experiment basis.

## Define your testers

In Feature Experiment, use the Targeting settings to define your test users.

![](statamic://asset::help_center_conversions::experiment/targeting-test-users.png)

Add users by `User ID` or `Device ID`, or using a cohort. Test users are assigned a variant, which Amplitude ensures they see each time they're exposed.

## Filter test users

![](statamic://asset::help_center_conversions::experiment/exclude-testers.png)

If you want to remove QA users or internal traffic from analysis because those users aren't representative of your customer base and may skew results. To remove users from an analysis, click the **All exposed users* dropdown and select `Exclude testers`. This removes the users in the "Testing" section on the "Settings" tab from the analysis. 

If you selected multiple targeting segments, analyze each segment individually because you may see a lift in one segment. Click the segment name in the "All Users" dropdown. This also filters testing users from your analysis

It can be helpful to investigate the impact of experiments on specific user segments. Experiments that aren't statistically significant can often contain a small group of users for which the result is statistically significant. Likewise, for statistically significant results, small segments of users can drive performance of the experiment.

