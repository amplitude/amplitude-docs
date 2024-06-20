---
id: 9bb576da-f4d0-48aa-862b-5560800b1f39
blueprint: faq_and_troubleshooting
title: 'Retention Analysis'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/4402840087181'
---
This article covers some frequently asked questions about the [Retention Analysis](https://help.amplitude.com/hc/en-us/articles/230543327-The-Retention-Analysis-chart-an-overview) chart.

How are the data points calculated?
Amplitude uses a "[weighted average](https://en.wikipedia.org/wiki/Weighted_arithmetic_mean)" to calculate each data point percentage in the Retention Analysis chart. The data point is the number of unique users who have triggered the return event during a specified timeframe (day, week, or month) divided by the total number of unique users who have reached that point in time. In other words, it calculates a weighted average of the below-row values.

The calculation uses **unique** users, so the user will only be counted in each numerator one time; if a user triggers the first event and the return event multiple times, Amplitude only counts them once in the denominator.

**Return On**

For **Return On** retention specifically, the numerator would be the unique count of users who trigger the return event on the day, week, or month indicated, while the denominator would be the total number of unique users who triggered the starting event on the first day, week, or month of the specified time frame. A user who triggers the start and return events multiple times in a time frame will be only counted once in the denominator. However, they may be included in the numerator once per day/week/month of each data point interval. [Get more details in this Community article](https://community.amplitude.com/building-and-sharing-your-analysis-58/retention-how-is-retention-calculated-n-day-retention-82). 

**Return On of After**

For **Return On or After** retention, the denominator for a specific day, week, or month (let's call this number X) is users who have completed that day (or week, or month). It's counted towards the overall Return On or After retention as long as X days, weeks, or months have passed since that user's starting event. The numerator would be the unique count of users who triggered the return event on the Xth day (or week, or month) or later.

Since Return On or After retention measures users returned on that Xth day or later, a user will be included in all data points prior to when they triggered an event. A user who triggers the event on day two, for example, will also be included in the data point for days one and zero.

Why are the recent periods asterisked?
Results for days with incomplete data will have an asterisk. For example, let's say some users trigger the starting event on July 15th (Day 0). You are looking at Day 6 data on July 21st and see an asterisk next to the computed results. Since July 21st is Day 6 and the day is not yet over in this example, the data point is incomplete until the day ends. This gives users from Day 0 a chance to become Day 6 retained.

![](/docs/output/img/faq/tk8pnv-xD45BxNxggxWbdkMHvU5CG9hym3inE7tE5sJo82hOjQ--5NWgjGoJaGPZUXrKnjSgog8BWj7llR-x1llsh2uadcmnSUovNtCXYZKuqEOKJDrnz5VNEAJPs5vD_WX81Tw2BahHgZgQiX_jA68)

In the breakdown table, why doesn't the user count for the interval equal the number shown in the total users row?
The total user count of the retention analysis breakdown table sums **unique** users who triggered the start event within the entire time period. Say a user triggered the start action on July 17th and the 18th. The user is unique to July 17th and 18th, and will therefore be counted in the user totals for both days. However, this user will only be counted **once** for the overall user total. This is one reason why the sum of each day user totals will not always equal the total user count.

Another reason is that the current day is excluded from this sum because it's not over yet; Amplitude is still collecting the day's events and performing calculations with them.

On the breakdown table, any value with an asterisk indicates a data point that is still calculating because the time frame is not yet over. Amplitude will not include these users in the overall retention calculation until the time frame is complete:

![](/docs/output/img/faq/tk8pnv-xD45BxNxggxWbdkMHvU5CG9hym3inE7tE5sJo82hOjQ--5NWgjGoJaGPZUXrKnjSgog8BWj7llR-x1llsh2uadcmnSUovNtCXYZKuqEOKJDrnz5VNEAJPs5vD_WX81Tw2BahHgZgQiX_jA68)

Why is my overall retention higher or lower than expected?
There are two potential explanations for this:

1. Incomplete data points are not included in the retention calculation. If all the data points are higher or lower than the values in the breakdown table, it may be the case that many of these users have not completed the full time frame yet. Incomplete values that have not been included in the data points have an asterisk beside them.
2. The data points are a deduplicated calculation of all users in the time frame. In that case in the overall retention calculation, Amplitude will only count that user once, but in the breakdown table, you may see the user more than once, making your retention appear higher than expected.

I can only see 12 months/365 days of data in this retention chart—how can I see more?
Use Amplitude's [custom bracket](/docs/analytics/charts/retention-analysis/retention-analysis-interpret) feature which is available via the Return On (custom) measure to add additional time frames beyond the default limits:

![](/docs/output/img/faq/GspVbHdu5J_AYJ3mOlpRurO4hLOpo5ORLCkw3r-5hcodyhoPlXWKyeVW5m3SD7cL1uRI-DdgjB1rNxsDd9lVygKuVxAf4b0UJdsD5wojJeedEOgqxJj51Db3WCLC3_-Zz1S2pM543K-xrtJijUMwxN4)

Why does the retention curve go up?
If you are looking at data that is currently ongoing, you may see your retention curve upwards. This is because users are only included in the weighted average calculation once they have had enough time to convert.

For example, if we were looking at the last 30 days, a user can only be in the Day 4 data point once four days have elapsed since they triggered the starting event. Since users are only included once they pass that milestone, the later data points may seem higher. This is because the users who did not retain never passed that milestone. This usually occurs when only a small percentage of users have finished the chart's entire time frame. Once more users do so, you'll see your chart start to even out and more accurately reflect retention.

[Get more details in this Community article](https://community.amplitude.com/building-and-sharing-your-analysis-58/retention-why-does-the-retention-curve-go-up-73). 

How far out does Return On or After retention go?
Return On or After retention will extend to the current day. The last point in a Return On or After retention chart will show users who have triggered the return event on or after a specific day, week, or month, and will check if they triggered that event as recently as yesterday.

Why does the denominator in the data points change over time?
The denominator changes on a daily basis because it is based on a cumulative count of unique users who have reached a **specific day** (Day 5, Day 10, etc.).

For example, let's say user A and user B perform events on the following days within a specified timeframe of March 20th to March 22nd:

* March 20th - user A performs starting event
* March 21st - user A performs return event
* March 21st - user B performs starting event
* March 22nd - user A performs return event

For user A, March 20th is Day 0, March 21st is Day 1, and March 22nd is Day 2; therefore, user A would be included in each day's denominator (Day 0 to Day 2). User B, however, triggered the starting event on March 21st (Day 0) and didn't trigger any other events. User B would only be counted in the Day 0 denominator for the specified timeframe.
