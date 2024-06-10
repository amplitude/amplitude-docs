---
id: 18378ff1-dab9-4f2c-bc42-5f2810cdb0fc
blueprint: analytic
title: 'Define a new cohort'
source: 'https://help.amplitude.com/hc/en-us/articles/19528328446363-Define-a-new-cohort'
this_article_will_help_you:
  - 'Learn how to quickly define a new cohort to use in your analyses and charts'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717623969
---

## Define the cohort

To define a new [cohort](/docs/analytics/behavioral-cohorts), follow these steps:

1. Click *Create New > Cohort*. This will take you to the a new cohort page, where you can set the parameters of a new cohort, upload a CSV of users into a new cohort, or [create a prediction for a predictive cohort](/docs/cdp/audiences/predictions).
2. You can click any of the conditions (performed event, had been active, had been new, had property, or had propensity) listed to begin defining your cohort. However, since this is a behavioral cohort, let's start by clicking *...performed event*. You can add other conditions to your cohort definition later.
3. Click *Select event...* and select the event you're interested in.
4. Begin setting the parameters that will define your behavioral cohort:

    ![behavioral_cohorts_define_new.png](/docs/output/img/analytics/behavioral_cohorts_define_new.png)

    First, tell Amplitude how you want it to count events. You have six options, all of which can be accessed from the **with** dropdown:

    * **Count**. Your cohort will be based on the number of times your event is triggered. For example, all users who triggered Favorite Song or Video more than five times during the last 30 days. See our [Behavioral cohorts FAQ](https://help.amplitude.com/hc/en-us/articles/4402840043789) to learn more about how to create a cohort of users who lack user properties or did not perform an event.
    * **Relative count.** Amplitude will compare two different event frequencies. For example, all users who triggered Play Song or Video at a greater frequency than Favorite Song or Video during the last 30 days. You have the option to add "where" clauses for both events under comparison.
    * **Total sum of property**. Filters for users who triggered events with a particular event or user property sum. These event or user properties must have numerical values. For example, all users in the last 30 days who triggered Play or Search Song with total Duration value greater than 60 seconds.
    * **Distinct values of property.** Filter for event or user properties down to a specific value or set of values you are analyzing. For example, only those users who favorited a song or video on more than one device.
    * **Historical count.** Your cohort will contain users who performed the event a specific number of times, between one and five. See our Help Center article on [how Historical Count works in Amplitude](/docs/analytics/historical-count-1) to learn more.
    * **Count in interval**. Filter for users who triggered the event **at least once** on each of the number of **distinct days** within a given interval. This enables you to specify behavior that occurred within distinct days in a defined time period. For example, you could filter for users who triggered the event at least once on each of a certain number of distinct days (you define how many) within a given interval. This differs from daily, weekly, or monthly behavior, which doesn't require the behavior to occur on different days.  

    See the article on [how stickiness analysis works in Amplitude](/docs/analytics/charts/stickiness/stickiness-interpret) to learn more.

5. Set the **operator** (equal to, greater than, less than, etc) and the **value** (i.e., the count value) of this parameter.
6. Now you'll have to tell Amplitude **when** these events should have taken place. Here, too, you have some options, accessible from the **any time** dropdown:

    * **During.** Includes all events triggered within the **date range** you choose in the date picker. This can be a range between two specific dates, or it can be something more dynamic, like *Last 30 Days*. In the latter case, the range will update every day, and users who have not triggered the event in X number of days will be dropped from the cohort.
    * **Since.** Includes all events triggered since the **calendar date** you choose in the date picker.
    * **Within.** Looks at events triggered within each cohort member's X days of first use. This is useful when you're interested in the group of users who triggered a specific event within X days of becoming a new user.

7. You can add more events by clicking *...then* and repeating the previous steps.  
  
	Adding an event using *...then* means users must trigger **both** events **in that order** to be included in the cohort. If you want to add another event **without** requiring users trigger them in a specific order, use *+ Add,* as described in the next step.

8. Next, you can add an *...or* clause, or you can add another event, property, propensity, cohort or new user. To see your options for an Or clause, hover the cursor over the cohort definition you've built so far. To see your options for adding to your cohort definition, click *+ Add* just below your current cohort definition.

![behavioral_cohort_add_more.png](/docs/output/img/analytics/behavioral_cohort_add_more.png)

When you add a condition using an *Or* clause, Amplitude will include users who meet **either** of those conditions. When you add to your cohort definition via *+ Add*, Amplitude treats that as an *And* clause: A user must meet **both** conditions to be included in the cohort.

When you use *+ Add* to add new components to your cohort, you can specify them for either **inclusion** or **exclusion**. Do this by selecting *did not* for events, user properties, and propensities; *not part* for cohorts; and *had not been* for new users.

![behavioral_cohorts_exclude.png](/docs/output/img/analytics/behavioral_cohorts_exclude.png)

Items meeting the exclusion condition will be excluded from the cohort, **even if** they meet all the other conditions you've specified.

In this example, the cohort is defined as users who've triggered the Play or Search Song event more than eight times, **and also** triggered the Favorited a Song or Video event more than four times between April 1 to April 30, **and** are from the United States.

![behavioral_cohort_example.png](/docs/output/img/analytics/behavioral_cohort_example.png)

{{partial:admonition type="note" heading=""}}
For the most accurate results, put a date range around any user properties you include.
{{/partial:admonition}}

## User property clauses

When you include a user property condition in a cohort, you're looking not at events, but at user properties. You're telling Amplitude that all users who had a specific value for a specific user property at a certain point in time should be included in your cohort. Properties and events are different things, and for that reason, the available options for the user property condition are different:

* **Most recently:** This will select only users whose **most recent value** for the user property you're interested in matches the value you've specified. This value will be drawn from a user's most recent active event. This is useful if you have a user property where the values change frequently, but you want the cohort to look at the most recent value only. For example, you might want to only include users whose push notifications are enabled, since most new users (those in their first 30 days) will have them disabled at first.
  
{{partial:admonition type="note" heading=""}}
For numerical property values, Amplitude interprets a missing value as 0.
{{/partial:admonition}}

* **Any time:** This will select users who had the specified value for the user property you're interested in at **any time in the date range** you select. For example, users who had the Country property of United States anytime during the last 30 days: Even if some users may have left the United States (which would mean their most recent Country property value is different), this cohort definition would still include them.

## Group-level cohorts

If you have instrumented group types, you can create group cohorts from the cohort detail page (where you define or upload a cohort). To do this, when defining your cohort, select the group name on the left side of the definition. In this example, the group name is "company(s)."

![group cohort selection.png](/docs/output/img/analytics/group-cohort-selection.png)

When applying the group cohort to a chart, add the group by clicking *+ Filter by*, and then *Cohort*. Then select the group name from the list.

Group cohorts are compatible with all Amplitude chart types except Personas and Compass.