---
id: f544b5a1-0689-4137-ab14-690903ae7902
blueprint: experiment
title: 'Dimensional Analysis'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1737480058
---

Sometimes, you might want to remove QA users or other internal traffic from your analyses because they're not representative of your customer base, and may skew results.

Amplitude's Dimensional Analysis capabilities enable you to exclude groups of users that you define from analysis on a per-experiment basis.

## Define your testers

In your Feature Experiment, use Targeting settings to define your test users.

Oftentimes you may want to remove QA users or your internal traffic from analysis because those users are not representative of your customer base and may skew results. You can do this by clicking on the "All Users" dropdown and selecting "All Users without testing users". Doing so will remove the users in the "Testing" section on the "Settings" tab from the analysis you are seeing. If you have selected multiple targeting segments, you may want to analyze each of the segments individually because you may see a lift in iOS for example but not on android. You can do this with a single click by clicking on the segment name in the "All Users" dropdown. The users in
"Testing" section on the "Settings" tab will also be filtered out from the analysis and diagnostics charts.
It can be helpful to investigate the impact of experiments on specific user segments. Experiments that are not statistically significant overall can often contain a small group of users for which the result is statistically significant. Likewise, for statistically significant results, the overall performance can be driven by a small segment of users.
You can further investigate the impact of the experiment on specific user segments by clicking on the "All Users" button to look at particular Amplitude out of the box segments, saved segments, or cohorts. If you want to add other user property filters, you can click on the "Add Filter" button.