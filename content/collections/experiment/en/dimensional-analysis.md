---
id: f544b5a1-0689-4137-ab14-690903ae7902
blueprint: experiment
title: 'Dimensional analysis'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1740515903
---
QA users and internal traffic aren't representative of your customer base and can skew experiment results. Amplitude's dimensional analysis capabilities let you exclude groups of users that you define from analysis on a per-experiment basis.

## Define your testers

In Feature Experiment, use the **Inclusions** section to define your test users.

![Feature Experiment targeting panel showing the Inclusions section for adding test users by User ID, Device ID, or cohort](statamic://asset::help_center_conversions::experiment/targeting-test-users.png)

Add users by `User ID` or `Device ID`, or use a cohort. Experiment assigns each test user a variant, and they experience that variant when interacting with the experiment.

## Filter test users

To remove QA users or internal traffic from analysis, select the **All exposed users** dropdown and choose **Exclude testers**.

![Experiment analysis view showing the All exposed users dropdown with the Exclude testers option selected](statamic://asset::help_center_conversions::experiment/exclude-testers.png)

If you selected multiple targeting segments, analyze each segment individually, because you may see a lift in one segment but not others. Select the segment name in the **All Users** dropdown. This also filters test users from your analysis.

Investigating the impact of experiments on specific user segments can reveal hidden patterns. Experiments that aren't statistically significant overall can contain a small group of users for whom the result is statistically significant. Conversely, for statistically significant results, small user segments can drive the experiment's overall performance.
