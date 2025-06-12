---
id: 662a82d8-e7c8-43c8-8890-6d31587fffd8
blueprint: retention-analysi
title: 'How time works in a retention analysis'
source: 'https://help.amplitude.com/hc/en-us/articles/14309817756827-How-time-works-in-a-retention-analysis'
this_article_will_help_you:
  - 'Understand the different ways time can affect your Retention Analysis chart'
  - 'Choose the most appropriate time calculation for your analysis'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103033
landing: true
landing_blurb: 'Understand the different ways time can affect your Retention Analysis chart'
---
In a Retention Analysis chart, there are two ways to define a day: a rolling **24-hour window** or a **strict calendar date**. The method you choose can affect your results.

![](/docs/output/img/retention-analysis/20460042102939.png)

Amplitude treats a day as a **rolling 24-hour window** by default, which is different for each user. Each day will be **exactly the same length**, no matter when the user triggered the starting event. For example:

* The beginning of the 24-hour window starts when a user triggers the starting event (Day Zero).
* Day 1 runs from hour 24 to hour 48.
* Day 2 from hour 48 to hour 72, and so on.

When using **strict calendar dates**, a day starts when the calendar day starts, and ends when the calendar day ends. Daily retention is then determined by:

* The timezone specified in your project settings.
* The **specific calendar day** instead of on an hourly basis.

## Retention using 24-hour windows

The way Amplitude calculates retention depends on whether you're looking for daily, weekly, or monthly retention rates. When using a 24-hour window to measure a day, Amplitude will calculate the retention rates as the following:

* **Daily**: Daily retention is computed on an **hourly basis**. Event timestamps are **rounded down** to the most recent hour. This means an event triggered at 4:59 pm will have a timestamp of 4:00 pm. The user is counted as **next-day retained** if they trigger any event during or after the 24th-incremented hour, but before the 48th-incremented hour.

When a user triggers the initial event multiple times, Amplitude will start multiple 24-hour buckets for them. This means it’s possible for one return event to define a user as both Day 1 and Day 2 retained.

* **Weekly**: Weekly retention is computed on a **daily basis**. A week is defined as **seven days**.
* **Monthly**: Monthly retention is computed on a **daily basis**. A month is defined as **30 days**.

For instance, let's assume we have three users that triggered the following events. **User 1** will be measured for daily retention, **User 2** for weekly retention, and **User 3** for monthly retention.

* **Wednesday, December 1st**
	* User 1 triggered their first event at 5:59 PM.
	* User 2 triggered their first event.
* **Thursday, December 2nd** 
	* User 1 triggered their second event at at 5:00 PM.
* **Monday, December 6th** 
	* User 2 triggered their second event.
	* User 3 triggered their first event.
* **Sunday, December 12th**
	* User 3 triggered their second event.

Amplitude would count **User 1** as **Day 1 retained** (next-day retained), because their second event's timestamp (5:00 PM) was during the 24th-incremented hour **after** the timestamp on the original event (5:59 PM).

**User 2** would be considered **Week Zero retained** because they triggered their second event (December 1st) within seven days from the first event (December 6th). They would have been considered Week 1 retained if they had triggered an event on any day between December 8th and December 14th (days 8-14).

When considering **User 3** for monthly retention, Amplitude would count them as **Month Zero retained** because they triggered the return event within the 30 days from the original event (event one on December 6th and event two on December 12th).

{{partial:admonition type='note'}}
Any retention computations that include dates of August 17, 2015 or earlier will be computed by calendar time instead.
{{/partial:admonition}}

## Retention using strict calendar dates

Amplitude can also measure retention by strict calendar dates, where day X is measured from the calendar date the event was triggered. As mentioned in the previous section, the way retention is calculated depends on if you're looking at retention on a daily, weekly, or monthly basis. 

When a day is measured by strict calendar dates, Amplitude will measure retention by the following:

* **Daily**: Daily calendar dates start when the calendar day starts, and end when the calendar day ends. The calendar view is determined by the timezone specified in your project settings. Under the strict calendar view, daily retention is based on the calendar day instead of on an hourly basis.
* **Weekly**: Weekly calendar dates determine the beginning and end of each week. A week is defined based on the timezone specified in your project settings. There you’ll also find the option to specify the first day of your week.
* **Monthly**: Monthly calendar dates determine the beginning and end of each month. The definition of a month is based on the timezone specified in your project settings.

Using the user activity example from the previous section, we'll find the following retention rates: 

* **Daily retention for User 1**: This user would be counted as **next-day retained** because they fired their second event during the next calendar day (December 2nd). Had they fired their return event on December 1st before 11:59 PM, they would have been considered Day Zero retained.
* **Weekly retention for User 2**: If a week starts on Monday, User 2 would be considered **Week 1 retained** because they triggered their return event on December 6th, **after** the end of the week of their original event (Monday, December 1st to Sunday, December 5th).
* **Monthly retention for User 3**: Amplitude would count User 3 as **Month Zero retained** because they triggered both their original and return events within the same month (December).

Users who trigger the starting event multiple times are still restricted to the calendar day they first triggered the starting event. The exception to this is when a user triggers the starting events on multiple calendar days; in this case, that user will be included in multiple interval cohorts.

## Retention types

For **new user** retention, filter conditions applied in the *Segmentation* module are only satisfied if they are true during the same time frame the `new user` event was triggered. For charts using strict calendar dates, this is the same as the chart interval. For charts using unaligned ranges, the time frame is more granular: e.g., the first day for seven-day windows and the first hour for 24-hour windows.

This table further delineates the differences between 24-hour windows and strict calendar dates by retention types [Return on or After and Return On](/docs/analytics/charts/retention-analysis/retention-analysis-calculation).

| Retention type      | A single cohort entry date retention | Explanation (strict calendar days)                                                                           | Explanation(by 24-hour windows)                                                                            |
| ------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| Return On  or After | 168 / 254 = 66.1%                    | 168 users triggered the return event on June 10 or after /254 users who triggered the start event on June 7. | 168 users triggered the return event 72 hours or after /254 users who triggered the start event on June 7. |
| Return On           | 72 / 254 = 28.3%                     | 72 users triggered the return event on June 10 /254 users who triggered the start event on June 7.           | 72 users triggered the return event 72-96 hours later /254 users who triggered the start event on June 7.  |