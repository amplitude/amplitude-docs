---
title: "How Amplitude handles segmenting on a user property in a Funnel Analysis chart"
published: false
source: "https://amplitude.com/docs/analytics/charts/funnel-analysis/funnel-analysis-how-amplitude-handles-segmenting"
id: 43f380ea-7e18-462f-ba73-e7ce7366dfdb
---

When you [segment the data on a user property](/docs/analytics/charts/build-charts-add-events), Amplitude will apply the segmentation to the first step of your funnel.

For example, suppose Event A is the first step of your funnel, and a user triggered:

* Event B with the user property `[Amplitude] Country` = `Canada`; and then
* Event A with the user property `[Amplitude] Country` = `United
 States`

If you were to segment "...by Active country(s)," Amplitude will show this user in the `[Amplitude] Country` = `United States` segment in the Event A step.
