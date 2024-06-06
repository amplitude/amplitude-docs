---
id: 9667df7f-0f3b-4544-a74e-b090f28f6490
blueprint: user-session
title: 'User Sessions: Track engagement frequency and duration'
source: 'https://help.amplitude.com/hc/en-us/articles/231275508-The-User-Sessions-chart-Track-engagement-frequency-and-duration'
this_article_will_help_you:
  - 'Understand the differences between a User Sessions chart and other Amplitude chart types'
  - 'Build a user sessions analysis'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717104670
landing: true
landing_blurb: 'Build a user sessions analysis'
---
The User Sessions chart helps analyze your users through various session-based metrics. By showing you the distribution of session lengths, average session length, and average sessions per user, it can help you answer questions like:

* How frequently are users engaging with your product?
* How long are they engaging with your product?
* How do these metrics compare to other segments of users?

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin

Be sure to read our article on [building charts in Amplitude](/docs/get-started/helpful-definitions).

You'll also want to read up on [session IDs and how Amplitude tracks sessions,](/docs/cdp/sources/instrument-track-sessions).

{{partial:admonition type='note'}}
 This article describes features that are not yet available to all users.
{{/partial:admonition}}

## Set up a User Sessions chart

Most Amplitude charts rely on the Events Module to build an analysis. The User Sessions chart works a little differently because it uses a Sessions Module. 

![sessionsModule.png](/docs/output/img/user-sessions/sessionsmodule-png.png)

A user sessions analysis will **break out your users into groups** based on certain characteristics of their sessions spent using your product.

You can also use this chart to **count the number of events users fire during their sessions**. This lets you assess engagement during a particular period of activity, as opposed to during an entire day, week or month.

### Build a User Sessions chart

To build your own user sessions chart, follow these steps:

1. In the Sessions Module (where you'd ordinarily find an Events Module), use the *Count* drop-down to specify whether you'd like your User Sessions chart to measure sessions or events performed within sessions.

	![user_sessions_2.png](/docs/output/img/user-sessions/user-sessions-2-png.png)

2. If you're **counting events performed within sessions**, specify the event you're interested in counting by clicking *Select Event* under *Event Count*. If you're measuring sessions instead, skip this step.  

	![eventCount.png](/docs/output/img/user-sessions/eventcount-png.png)

3. Add properties to your starting event by clicking on *+ Filter by* and choosing one of the available properties: `Session Duration`, `Contains Event`, `First Property` value, or `Last Property` value.

	![sessionProperties.png](/docs/output/img/user-sessions/sessionproperties-png.png)

	Enter the session's minimum length in seconds, minutes, hours, or days if you're using`Session Duration`. Choose an event the user must trigger during each session if you're using `Contains Event`. Or choose a property each session must contain if using `First Property` value or `Last Property` value.

4. If desired, group your sessions by a property by clicking *+ Group by* and choosing the desired property. Multiple group-bys are allowed in both the Sessions and Segment By modules.
5. If you selected ***Sessions*** in Step 1, choose from the following options in the Measured As Module:
    * **Total Sessions:** Graphs the total number of sessions across all users, which is calculated by counting the total number of valid sessions within the interval. (When session IDs are instrumented, "valid" means a session with an ID other than 'none' or '-1.') Total Sessions does **not** count sessions containing only inactive events.
    * **Time Spent:** Graphs the total sum of all session lengths within the interval.
    * **Time Spent per User**: Graphs the average amount of time spent in sessions per interval which is calculated by taking the sum of all session lengths within the interval, and dividing by the total number of active users in the interval.
    * **Avg Length:** Graphs the average session length, which is calculated by taking the sum of all session lengths within the interval, and dividing it by the total number of sessions in that interval.
    * **Length Distribution:** Displays the distribution of session lengths in a histogram. Customize the shape of the distribution by setting the minimum and maximum session lengths. The minimum value is inclusive, and the maximum value is exclusive. The example above shows session length distribution for sessions between 1 and 30 minutes in length in intervals of 5 minutes.
    * **Avg Per User:** Graphs the average number of sessions per user, which is calculated by dividing the total number of valid sessions in an interval by the total number of active users in the same interval.
    * **Formula**: With formulas, users can create their own custom metrics, such as bounce, entry, and exit rates. The following metric formulas are available in User Sessions analyses: EVENTTOTALS, HIST, PROPSUM, SESSIONTOTALS and UNIQUES. These metric formulas work similarly to the definitions in [the custom metric formulas Help Center article](/docs/analytics/charts/event-segmentation/event-segmentation-custom-formulas), but the syntax refers to **sessions** instead of events.

	If, on the other hand, you selected ***Events performed within sessions***, choose from the following chart options instead:  

	* **Average Events per Sessions**: Graphs the average number of times a selected event is performed per session. The time series returned will plot the number of times the event is performed by users in a session per interval (day, week, month, etc.). Use this to analyze average engagement.
	* **Total Events Across Sessions**: Graphs the total number of times a selected event is performed within sessions. Like plotting totals in Event Segmentation, this shows the number of times users have performed a particular action across all sessions in an interval.
	* **Distribution**: Graphs a distribution of the number of sessions that include a selected event. The x-axis shows a range of the number of times the selected event is performed, and the y-axis plots the number of sessions in the time range. This analysis can help show which of your users have the highest, or lowest in-session engagement. Click *Set buckets* to set individual ranges for each bucket:  
	
    ![userSessions_setBuckets.png](/docs/output/img/user-sessions/usersessions-setbuckets-png.png)

6. In the Segment By module, identify the user segment you want to include in this analysis. You can import a previously-saved segment by clicking *Saved* and selecting the one you want from the list. Otherwise, Amplitude begins from the assumption that your analysis will target all users.

7. If you do not want to import a previously-saved user segment, you can start building your own by adding properties. To do so, click *+ Filter by*, choose the property you want to include, and specify the property value you’re interested in.

8. You can narrow your focus even further by telling Amplitude you only want to include users who have already performed certain actions. To do so, click *+ Performed*, then choose the event you’re interested in.

9. If desired, add another user segment by clicking *+ Add Segment* and repeating steps 5 through 7.

10. Use the datepicker to set the timeframe of your analysis.

{{partial:admonition type='note'}}
Sessions lasting longer than a day are excluded from analyses.
{{/partial:admonition}}

Read on to learn more about [interpreting your User Sessions chart](/docs/analytics/charts/user-sessions/user-sessions-interpret).