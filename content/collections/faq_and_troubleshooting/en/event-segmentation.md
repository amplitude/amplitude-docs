---
id: b4246de7-7e38-476c-86bd-b28e13443ba5
blueprint: faq_and_troubleshooting
title: 'Event Segmentation'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360052734691'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718920625
category: charts
---
This article covers some frequently asked questions about the [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart.

## Chart setup


{{partial:collapse name="How do I analyze event and user properties and not just events?"}}
After selecting an event to analyze in a chart, you can use *+Group-by* and *+Filter by* to query event and user properties further. The *+Filter by* will filter your results for specific property values. The *+Group-by* will group your results by your selected property. 
{{/partial:collapse}}


{{partial:collapse name="How do I look at data prior to the last 30 days?"}}
To see data beyond the last 30 days, use the date picker and date interval options to select different date ranges of data. The date options are found in the top right of your chart.

For example, if you’d like to see data for the last 90 days, click *Last 90 days*. If you’d like to see data for a specific date range, click the calendar to open the custom date range fly-out. Enter your custom dates in the *Between* section, and click *Apply* to save. Your chart will then be updated with the custom date range.

![Screenshot 2023-12-07 at 4.04.45 PM.png](/docs/output/img/faq/screenshot-2023-12-07-at-4-04-45-pm-png.png)
{{/partial:collapse}}


{{partial:collapse name="How do I find the average of this property?"}}
In the Measured as section of the Event Segmentation chart, select *Average of Property Value* from the *Properties* drop-down shown below to calculate the average value: 

![segmentation_FAQs_average_property_value_.png](/docs/output/img/faq/segmentation-faqs-average-property-value-png.png)
{{/partial:collapse}}


{{partial:collapse name="How do I segment by user’s past performance?"}}
Customers on Scholarship, Growth, or Enterprise plans can add a *who performed* filter to the specified users in the Segment By module. To add an in-line behavioral cohort, follow these steps:

1. Click More options and choose *Add who performed*.
2. Click the Amplitude logo *Any Event* and choose the event you want the cohort to have performed.
3. Enter the desired number of events next to *count*.
4. Choose the timeframe by clicking on *Last 30 Days*. This option is like the date picker, and allows you to choose a date range in the last number or days or a custom date range.
5. If desired, click More options next to the date picker and choose *Add offset*.

![Screenshot 2023-12-07 at 4.08.50 PM.png](/docs/output/img/faq/screenshot-2023-12-07-at-4-08-50-pm-png.png)

You can also define and save a cohort in the Segment By module, which can then be used in other charts. 
{{/partial:collapse}}


{{partial:collapse name="How do I filter by accounts instead of users?"}}
In the Segment By module, there is a drop-down menu where you can select *Accounts* instead of *Users*.

![segmentation faqs inline cohort copy.png](/docs/output/img/faq/segmentation-faqs-inline-cohort-copy-png.png)
{{/partial:collapse}}


{{partial:collapse name="What is the maximum date range in the Event Segmentation chart? "}}
For daily and weekly, the maximum date range you can query is 365 days. For monthly, you can look up the last 36 months.
{{/partial:collapse}}


{{partial:collapse name="How can I compare this year's data to last year's?"}}
Use the [Compare](/docs/analytics/charts/event-segmentation/event-segmentation-interpret-2) drop down to choose the desired comparison. From your chart, click *Compare* and choose *Previous year* to compare the current year's data to last year's. The *Compare* feature allows you to choose a custom date range by clicking *Select custom date range*. Enter your end date in the modal that appears and click *Apply*. 
{{/partial:collapse}}


{{partial:collapse name="How can I set a goal line or horizontal annotation in my chart?"}}
Amplitude doesn't support creating goal lines nor horizontal annotations.

However, for a similar result, try using a custom formula to set a "target" for a specific metric. In the below example, the Measured As module contains the following custom formula: 

`UNIQUES(A); UNIQUES(A) * 0 + 90000`

As a result, the custom formula produces a goal line. If desired, you can then rename the y-axis to identify the desired goal.

![](/docs/output/img/faq/21035735213467)
{{/partial:collapse}}

## Custom formulas


{{partial:collapse name="How do I calculate a ratio as a percentage?"}}
As an example, you'd like to see how many users downloaded a song or video compared to all the users who favorited a song or video each day. You could use a custom formula to calculate the ratio of those events as a percentage. To create that custom formula, follow the below steps:

1. From the *Measured as* module, click *Advanced*.
2. Enter the formula's syntax: `%:UNIQUES(A) / UNIQUES(B)`.
3. The ratio will then display as a percentage in your chart.

![segmentation_faqs_use_formula_tab.gif](/docs/output/img/faq/segmentation-faqs-use-formula-tab-gif.gif)

How do I create a DAU or a MAU chart?
Use the [`ROLLWIN` custom formula](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas) in the Event Segmentation chart. Rolling windows track a rolling total of unique users over the desired time frame (hours, days, weeks, or months).

For more information, see [how custom formulas work in Amplitude Analytics](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas) for more information.
{{/partial:collapse}}


{{partial:collapse name="How are null values handled in `PROP()` formulas?"}}
Null values aren't considered in the calculation for `PROP()` formulas.
{{/partial:collapse}}


{{partial:collapse name="Why are my `PROP()` formulas not returning any values?"}}
The `PROP()` formulas will only consider integer values in their calculations. For example, a value of $30 will not be calculable, but a value of 30 will be. 
{{/partial:collapse}}

## Results


{{partial:collapse name="Why don’t my line chart data points add up to my bar chart total?"}}
Line charts return values per date interval (eg. per day, per week, per month) while bar charts return values for the entire date range. The date interval selected will not matter when using a bar chart. If a user triggers an event on multiple days, the line chart counts a user for each day they triggered the event, while the bar chart will only count the user once. In other words, the bar chart will deduplicate the counts.

For example, if a user triggered event A on November 2nd and November 6th, and you have a chart that counts uniques daily between November 1st and November 30th, this user will be counted twice in the line chart but only once in the bar chart. Thus the bar chart will return a count smaller than the sum of each daily data point. 
{{/partial:collapse}} 


{{partial:collapse name="What does New User mean?"}}
A new user is a user who has logged an event to Amplitude for the first time (this includes inactive events). The time of when the user is new is the time of when they logged their earliest event. 

In an Event Segmentation chart, when choosing *New Users*, Amplitude will look for the events triggered by new users within each day/week/month (whichever interval was chosen) that the user was new. For example, if the interval is set to *daily* and a user was new on July 17, only the events that happened on July 17 will appear on the chart, regardless if the user also triggered events the next day, on July 18.

[Find the definitions of Amplitude user properties here](/docs/get-started/user-property-definitions).
{{/partial:collapse}}


{{partial:collapse name="What is the definition of `Active %`?"}}
The `Active %`metric graphs the percentage of users who triggered a specific event, compared to the total number of active users (users who have triggered any active event) at each data point.

![Active___Formula.png](/docs/output/img/faq/active-formula-png.png)

If you have a cohort or segment filters applied to the chart, the denominator will only include users who have triggered an active event and meet your segmentation requirements. 

For more information on how each metric is defined, see [this article on interpreting your event segmentation analysis](/docs/analytics/charts/event-segmentation/event-segmentation-interpret-1). 
{{/partial:collapse}}


{{partial:collapse name="Why do I get a different result for `Active %` when I apply the group-by on the Events module versus the Segment By module?"}}
Because of the definition of the `Active %` metric, the denominator changes when you apply a group-by in the Events module versus the Segment By module.

When you apply group by in the **Events** module, the group-by is applied **only** to the event (numerator). The formula for `Active %` will be:

 `count of users who performed the event and who meet the group by property`

 `/``number of active users * 100`

However, when you apply a group-by in the Segment By module, the `Active %` metric will take into account the **number of active users** matching the group-by property in both the numerator and the denominator. The formula in this case will be:

`count of users who performed the event and who meet the group by property`

`/``number of active users **who meet the group by property** * 100`
{{/partial:collapse}}


{{partial:collapse name="Why is my `Active %` metric more than 100%? "}}
This is usually because you are querying on an inactive event. It's possible that the number of users who have performed an inactive event is higher than the number of active users.
{{/partial:collapse}}


{{partial:collapse name="Why am I getting an incomplete data error?"}}
Amplitude servers ingest high volumes of data, and there is the potential for some data processing delays. Rest assured that no data is lost. Incomplete data means only that data has been received by Amplitude, but the servers are taking longer to ingest and process the data for you to query.

To stay up to date, see the Amplitude status page: <https://status.amplitude.com/>
{{/partial:collapse}}

## Usability


{{partial:collapse name="How do I download a list of users?"}}
* **Microscope**: In a chart, click on a data point you're interested in. A popup will appear; click *Download users*.
* **Cohort**: Create a cohort definition and click *Export CSV*.
* **Create a chart**: Use *Any Active Event,* grouped by Amplitude or user ID. Then click *Export CSV* in the breakdown table below the chart.
{{/partial:collapse}}



{{partial:collapse name="Why don't I see a specific value that I know has been ingested into Amplitude?"}}
Sometimes users instrument event and user properties that have the same naming convention. When choosing the property make sure you are selecting the correct type of property. For example, 'url' could be used as a name for both an event property and user property. If you're filtering or grouping by the 'url' user property instead of the 'url' event property, you may see different results returned in the chart than expected.
{{/partial:collapse}}


{{partial:collapse name="Why isn't my chart displaying all possible values for this event/user property?"}}
Amplitude will only display the top 100 property values in the breakdown table. If you export the breakdown table to CSV, the file will max out at the first 10,000 values.
{{/partial:collapse}}


{{partial:collapse name="Why isn't my glob match filter returning and results?"}}
An important note regarding the glob match feature is that the asterisk only matches non-"/" characters. To search for strings that contain "/", you will have to use two asterisks, because "\*\*" can match anything. In this case, since the referrer property contains URLs, there are going to be lots of "/" characters.

More information on glob matching can be found [here](https://en.wikipedia.org/wiki/Glob_(programming)).
{{/partial:collapse}}

{{partial:collapse name="Why is my CSV Export missing values, even though the data is under the 10,000 values group-by limit stated in your documentation"}}
When there are multiple segments, Amplitude “splits” the group by cap between each segment. This means with 2 segments, each segment only gets 5000 group-by values, hence the limiting seen in the exported CSV. This behavior is similar to how when there are multiple events, we will reduce the number of rows allotted to each event.
{{/partial:collapse}}