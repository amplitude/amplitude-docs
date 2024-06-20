---
id: 5eef86cd-c803-4b4f-ad19-6ddd8a361ae1
blueprint: faq_and_troubleshooting
title: 'Funnel Analysis'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360054203872'
category: charts
---
This article covers frequently asked questions about the [Funnel Analysis](/docs/analytics/charts/funnel-analysis) chart.

## Funnel Metrics

{{partial:collapse name="Do funnels count by unique users or by event totals?"}}
Either one. To switch from unique users to event totals, select *Totals* from the *Counting by* dropdown:

![funnels_FAQ_totals.png](/docs/output/img/faq/funnels-faq-totals-png.png)

{{partial:admonition type='note'}}
For event totals, the earliest-longest logic no longer applies. Amplitude considers **all** conversion paths taken or attempted rather than just the earliest-longest path per user. The paths are then attributed to the property for the event in the step it was broken down by.
{{/partial:admonition}}

You can use the Holding Property Constant feature to count by unique user-property pairs as well. For example, if you hold `Session ID` constant, you can count a user multiple times if they performed the funnel events in different sessions.

{{partial:admonition type='note'}}
In order to hold a property constant, it must exist in all events of the funnel.
{{/partial:admonition}}

{{/partial:collapse}}

{{partial:collapse name="Do funnel charts count conversion in 24-hour windows or by calendar dates?"}}
The conversion window uses a **24-hour window** when looking at conversion from Step 1 to Step 2. It is not based on strict calendar dates.

![funnels_FAQ_24_hour_window.png](/docs/output/img/faq/funnels-faq-24-hour-window-png.png)
{{/partial:collapse}}


{{partial:collapse name="How can I tie revenue to funnel conversions?"}}
In the Measured As module, check *Calculate sum of property for final step* from within the *Advanced* dropdown. Then, in the field labeled *Property sum for final step*, select the revenue property you want Amplitude to calculate.

![funnels_calculate_sum_of_property_for_final_step.png](/docs/output/img/faq/funnels-calculate-sum-of-property-for-final-step-png.png)

The result will appear in the breakdown table.
{{/partial:collapse}}


{{partial:collapse name="Why is my conversion over time chart showing lower conversion rates than my regular funnel analysis chart?"}}
By default, the conversion Funnel Analysis chart counts unique users. This means a single user can only appear in the chart once. However, the Conversion Over Time funnel chart can count a user in multiple data points.

For example, imagine you have a user who triggered Step 1 of your funnel on January 1, January 5, and January 20, and then triggered Step 2 of the funnel on January 2 and January 6. In a Conversion Funnel chart (with a date range of January 1-31), the user would be considered 100% converted because they completed the funnel steps within those dates. In a Conversion Over Time Funnel chart, the user would be considered 100% converted for January 1 and January 5, but 0% converted on January 20. Therefore, the conversion rate for January 20th may be lower than what you see in the regular conversion chart.
{{/partial:collapse}}


{{partial:collapse name="I select the same events in the event segmentation and funnel charts. Why do I see different results between these charts?"}}
The event segmentation and funnel charts are different types of analyses, and as such, they could show different results.

In a funnel chart, users must perform the first step within the selected date range in the date picker to enter the funnel. Then they must complete the remaining steps in a defined order within the conversion window to be counted as converted.

In an event segmentation chart, users must fire the chosen events within the selected date range in the date picker to be included in the chart.

In addition, if you apply a segment filter in the segmentation module, the filter only applies to the first step in the funnel chart, but in segmentation chart it applies to every event.

See more in [this help center article](/docs/analytics/charts/funnel-analysis/funnel-analysis-how-amplitude-computes-conversions) and [community post](https://community.amplitude.com/building-and-sharing-your-analysis-58/what-is-the-difference-between-funnel-and-event-segmentation-charts-1873).
{{/partial:collapse}}


{{partial:collapse name="How is the median time to convert calculated?"}}
When the funnel chart looks at the median time to convert in distribution view, it only takes the first conversion per user in the entire date range into account. When you switch to the time to convert over time view, we take the first conversion of each user in each day of the date range (e.g. If users can convert more than once in a day, only the first conversion of that day is considered).

In both cases, we use [an approximate algorithm](https://metamarkets.com/2013/histograms/) to estimate the median time to convert. The median time to convert is only an approximation.

![](/docs/output/img/faq/dpaf3D_0L1RNCWkqjfbc-I8KU0Wv12nsedi50Y7wlC0uukjqOmY9T4cMVwiSYvhA_qvCozNmAoZgvS2D3CF4n_UkMQMzwvJzpZgo7w5H8TVf_0FBeosPEBfG7grX5tnIJNkVYM8NpYKRbu_JOtDrlHE)
{{/partial:collapse}}


{{partial:collapse name="Is the median time to convert calculated using the entire data set or using the bin min/max I enter?"}}
It is calculated using the entire data set. The percentages on the Y-axis are calculated using the bin min/max limits.
{{/partial:collapse}}


{{partial:collapse name="I exclude some events from the funnel, but why do excluded events appear in the Show User Paths of converted users?"}}
Users who performed the excluded steps are not necessarily considered dropped off. Because users can have multiple conversions in the funnel; as long as at least one of their conversions satisfies the exclusion constraint, they will be considered converted.
{{/partial:collapse}}


{{partial:collapse name="Can I use the holding constant feature if the property is an array?"}}
Yes, you can hold an array property constant in a funnel. Amplitude treats each item in the array as an independent value. 

Let’s have a look at a two-step funnel (Event A > Event B). A user performed the events with the following `item_id` property values:

Event A where `item_id = [1, 2, 3]`

Event B where `item_id = 3`

When the funnel holds `item_id` constant, the user is counted as converted because the `item_id` value in Event B matches one of the values in the array in Event A. In other words, the value of the property being held constant isn’t necessarily the same across all the funnel events.
{{/partial:collapse}}

## Funnel order (this order, any order, exact order)


{{partial:collapse name="In an 'Any Order' funnel, do users need to complete the first event as the first step?"}}
"Any Order" requires users to perform the first event within the date range to be considered part of the funnel. Users who fire the later events without firing the first event are not considered to be part of the funnel. In other words, users do not have to perform the first event as the first step in their sequence to count as converted.
{{/partial:collapse}}


{{partial:collapse name="Why do the numbers change when I move the first and last step of an ‘Any Order’ funnel chart?"}}
In an "Any Order" funnel, the number of the first event will be the number of users who fire the first event to enter the funnel. Users must do all the events in the funnel to be considered in the last step since no step can be skipped. Although users can complete the events in any order, they must have completed all the other steps and the last step in the funnel to count as converted for the last step. If there are only two or three events in the funnel chart, moving around the first and last funnel events will cause a change in results because the ordering of the first and last events still matters.
{{/partial:collapse}}


{{partial:collapse name="In an 'Exact Order' funnel, why are users counted as converted even if they perform an event that is not included in the funnel?"}}
In an "Exact Order" funnel, if an event that is not part of the funnel definition is simultaneously fired in the same second, the user will still be counted as converted. This is because a second is the default resolution we currently support.

This also applies to excluding events from a funnel. If the event that is being excluded is performed in the same second as an event that is included in the funnel, the user will still be counted as converted.

Should you require a more detailed level of time resolution, you can select Millisecond resolution in the Advanced drop-down.
{{/partial:collapse}}

## Usability


{{partial:collapse name="If I create a cohort via Microscope in a funnel chart, will it be static?"}}
Cohorts created directly from Microscope on a Funnel Analysis chart will be **dynamic if only events were added** to the chart. If the chart utilizes the "holding property constant", "broken down by", or any inline cohorting, then the cohort will be **static**.

Also, dynamic cohorts **cannot** be created from funnel charts that contain exclusions. Any such cohorts will be static.
{{/partial:collapse}}


{{partial:collapse name="How does the segment filter on the Segmentation module apply to the funnel chart?"}}
In a funnel chart, the segment filter only applies to the first funnel event. You will have to add individual filters to each step in the Event module if you want them to apply to each funnel event. For more information, please see [How filters work in a Funnel Analysis chart](/docs/analytics/charts/funnel-analysis/funnel-analysis-how-filters-work).
{{/partial:collapse}}


{{partial:collapse name="How can I export the data of a funnel chart?"}}
You can click the Export CSV button in the breakdown table to export the data. Keep in mind that if a group-by filter is applied in the funnel chart,  there is a limit of up to 300 group-by values you can export. Learn more about [CSV download limits](/docs/faq/limits).

Alternatively, you can export the funnel result via [the Dashboard REST API](/docs/apis/analytics/dashboard-rest). By default, the limit of group-by values is 100, but you can edit the `limit` parameter to export up to 1000 group-by values.
{{/partial:collapse}}
