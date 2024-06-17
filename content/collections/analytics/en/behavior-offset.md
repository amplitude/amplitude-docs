---
id: 26102630-8a48-4f72-bafe-35060873335b
blueprint: analytic
title: 'Behavior offset: Segment users over two distinct time periods'
source: 'https://help.amplitude.com/hc/en-us/articles/360040965352-Behavior-offset-Segment-users-over-two-distinct-time-periods'
---
#### This article will help you:

* Track customer milestones
* Compare user behavior between two cohorts
* Understand the difference between behavior offset and behavioral cohorts
* Determine when using a behavior offset is appropriate, and when it isn't

With Amplitude's [behavioral cohorts](/docs/analytics/behavioral-cohorts), you can create groups of users who share a pattern of behavior. The **behavior offset** feature gives you the power to further segment these users based on behaviors they've displayed in two distinct time periods.

Common use cases for behavior offsets include:

* Identifying users who made at least one purchase during the past week (the current period) who have also made at least two more purchases over the preceding 90 days. This can be used as a proxy for customer satisfaction.
* Measuring users who installed the app but did *not* make a purchase during the 45 days after install. This information can help you target re-engagement campaigns with the goal of convincing these new users to convert into paying customers.
* For media companies, behavior offsets can identify users who purchase a subscription but don’t read an article in the following two weeks. This can help identify users who haven’t built a habit of reading content, who you can then target in your churn prevention efforts.
* Conversely, identifying users who read one article in a given week and then read two or more articles the following week can help you target engaged readers for subscription offers.

Notice that in each of these use cases, there are two cohorts in play, separated from each other by the passage of time: In the second example, they are:

* Users who installed the app, and
* Users who did not make a purchase in the subsequent 45 days

Behavior offsets make it easy to segment the users who appear in both of these cohorts.

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only.

## Before you begin

Before getting started, we suggest you read up on [behavioral cohorts](/docs/analytics/behavioral-cohorts)—and [rolling windows](/docs/analytics/charts/event-segmentation/event-segmentation-interpret-2) until you're comfortable with both concepts.

## Add a behavior offset to an in-line cohort

In this section, we'll be following along with the first example in the bulleted list above: segmenting for users who made at least one purchase in the current period, but also made two or more purchases in the last 90 days. To add this behavior offset, follow these steps:

1. In the Segmentation Module, click *+ Performed* to begin creating a new [in-line cohort](/docs/analytics/behavioral-cohorts).
2. Start by defining the **previous period event**. In this example, our previous period event is `Complete Purchase`.
3. Adjust the operator and event frequency, if necessary.
4. From the *More Options* menu for this event, click *Add rolling*.   
  
![add rolling.png](/docs/output/img/analytics/add rolling.png)  
  
In the *rolling over* field that appears, enter the number of days you want to allow for the current period event to occur. Keeping with our example scenario, we enter 90.

**NOTE:** You can change the default durations from per day to weekly, hourly, monthly, or quarterly by changing the setting in the Metrics Module's date picker.  
  
Also, when using a *during* cohort (as opposed to *in each*; [see this article on in-line cohorts in Amplitude for a more detailed explanation](/docs/analytics/behavioral-cohorts)), the *offset* function will allow you to create daily offsets, regardless of the interval specified in the date picker.  

![behavioral_offset_duration_dropdown.png](/docs/output/img/analytics/behavioral_offset_duration_dropdown.png)

5. From the same menu as in step 4, click *Add offset*. In the *offset* field that appears, enter the number of days after the occurrence of the previous period event that you want to wait before the rolling window (see step 4 above) begins. In this example, we do not want to include the day of the previous period event in the rolling window, so we enter 1. If you want to include that day in your analysis, do not include an offset.
6. Click *+ Performed* again. From the *and who performed* drop-down, select the **current period event**. Continuing with our example, this will once again be `Complete Purchase`.

Your in-line cohort— in which you’re segmenting for users who completed one or more purchases in the current period, and completed two or more purchases in the previous period (90 days, in this case)—should now look like this:

![in-line cohort segment.png](/docs/output/img/analytics/in-line cohort segment.png)

By applying the rolling window and offset to the previous period event, we've essentially shifted this cohort to a time in the past. Bear in mind that this process offsets **only** the in-line cohort, and **not** the event selected in the Event Module. 

**NOTE:** In-line offset for *in each* cohorts is available on **Event Segmentation** charts. In-line offset for *during* cohorts is available on **all chart types except** Compass. When using a *during* cohort, your date range must be defined in days.