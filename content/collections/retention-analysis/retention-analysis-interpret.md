---
id: 32b704e4-319e-4386-9e63-afbd109bc359
blueprint: retention-analysi
title: 'Interpret your retention analysis'
source: 'https://help.amplitude.com/hc/en-us/articles/360050153551-Interpret-your-retention-analysis'
this_article_will_help_you:
  - 'Read a retention analysis'
  - "Understand the Retention Analysis chart's retention view"
  - 'Understand the different ways to measure retention'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103005
landing: true
landing_blurb: 'Understand the different ways to measure retention'
---
Amplitude’s **Retention Analysis** chart helps you drive product adoption by showing you how often users return to your product after triggering an initial event. This article will describe how the Retention Analysis chart works, and how you should interpret the data it contains.

Analyzing your retention analysis data takes place in the chart area. There, you will be able to:

* Specify the method Amplitude uses to measure retention ([Return On or After](#return-on-or-after-formerly-known-as-unbounded), [Return On](#return-on-formerly-known-as-n-dayn), or [Return On (Custom)](#return-on-custom-formerly-known-as-customM))
* View data for either [Retention or Change Over Time](#retention-vs-change-over-time)
* Define how Amplitude measures days when it calculates retention (24-hour windows or strict calendar dates)
* Specify the timezone and set the time frame for your analysis using the date picker

## Before you begin

If you haven’t already read the overview of [Amplitude’s Retention Analysis chart](/docs/analytics/charts/retention-analysis/retention-analysis-build), you should start with those before continuing.

If you find yourself confused by the references to time in this article, this Help Center article explains [how time works in a retention analysis](/docs/analytics/charts/retention-analysis/retention-analysis-time).

## Interpret your Retention Analysis chart: Retention view

Interpreting your Retention Analysis chart is more straightforward than it may at first appear, mostly because you can read through the parameters like a sentence. For example, the following chart shows you (1) new users who came back and triggered (2) any event (3) on or after the first day of your retention analysis over (4) the last 45 days:

![](/docs/output/img/retention-analysis/74DES2Jrsevos_3NFQVcflLDYPUdiRChuZRqCMus-r_OV3iKrStpaxhSDz3WLbenhBk9B7ghd2UKpUZxIvpYMu_DuuysPfbmmO8C_kYjytdx3BcaQ718RPW3FUb6wSNiT01ELWajOExzzVTEAX1Trac)

All these parameters can be easily changed to reflect the needs of your analysis.

In the rest of this section, we’ll explain how you measure retention, what all the parameter options mean, and how you can use them to generate the data you want.

## Different ways to measure retention

The Retention Analysis chart offers several options for measuring retention, based on when your users triggered their [return event](https://help.amplitude.com/hc/en-us/articles/230543327):

* To discover how many of your users triggered your return event **on a specific day or after** triggering your starting event, use [**Return On or After**](#h_01GXB4EFQ2VXSYEZ0CRMF09AJS) retention.
* To learn what percentage of users came back to fire your return event **only on a specific day** after they performed your starting event, use [**Return On**](#h_01GXB4F62TJEH50T03FGGH0HY4) retention.
* If you want to create custom brackets for your Return On retention instead of using pre-defined units of time (like weeks or days) as retention brackets, use [**Return On (Custom)**](#h_01GXB4G5DKK9F46NHPXCP7QAXM) retention.

In all cases, the day a user triggers the starting event is their **cohort entry date**, an important concept when seeking to understand [how retention is calculated in Amplitude Analytics](/docs/analytics/charts/retention-analysis/retention-analysis-calculation).

### Return On or After (formerly known as Unbounded)

Return On or After retention tells you how many of your users triggered your return event **on a specific day or after** they triggered your starting event. When using Return On or After, the retention value for Day 7 tells you the percentage of users who returned seven days or more after their first use.

![](/docs/output/img/retention-analysis/G0je2VZ6bC5-8FgVpR447ORVYTh6K5oioQYWUeGAf4jBgUxbrY73AS90DYAZoGBSJnRC_LGBkcmU5-Nr25uOqnhcAHiQF39zTzsI9OzLLyE61aBwstzxdVReyBmeB4aSZ2AFNUslFYrnnF1T3c1QMpA)

When you first open the Retention Analysis chart, the Return On or After retention graph will by default show retention for new users who returned any event. To see exact percentages, hover over the data point for the day you’re interested in, or click it to inspect the users at that interval (see the Help Center article on [Amplitude’s Microscope feature](/docs/analytics/microscope) to learn more).

To see this data as a bar chart, click the *Line chart* dropdown. You can still use Microscope to get more details on users who were not retained.

![](/docs/output/img/retention-analysis/gth-d_Zj_Z5fVEFTF9pLi-jpzxMMeuxzFJGGGFEG95hKNuWZ5U3VN5vTAsYAzE6HAe491gGmyLTD7eRg42LzdF48B18vIPW69mR4436Ynvt9EfpXx2IFm7LAPDp-TPKfQnZTpZIRynys-xsodwwPMN0)

{{partial:admonition type='note'}}
In bar chart format, the X axis will include the most common units of time (days, weeks, months) by default. 
{{/partial:admonition}}

Amplitude also displays a detailed table breaking down the data, broken out by each user cohort and into individual day buckets.

![](/docs/output/img/retention-analysis/3KUJ9cZEpmZSzFT4nW3EnJx3bI0_RjsTA-2_P0xLxGEX0pBCgfBBf4-4ENWWCg7NKm1NMR78zWuI7b-SH04HDTaGOM0oJFc2OwFEU0rbDRJljqhxBskurC9I3aFRGZrtUPBygOV-ajmfQcT-_Yq4ZAU)

The method Amplitude uses to calculate Return On or After retention depends on whether you’re looking at retention for all users, or for a specific cohort entry date for your segment. Both the chart and the first row of the breakdown table below it show overall retention by default.

![](/docs/output/img/retention-analysis/KgKmhbVAqbTfY3xL01ZIXXwEAvoOhEgTo1gDO0r7wt2Jo-SCaI0vUlg826rnXWCB51t9yEWx7nq971tHC3p87norNkE9TgrpYVYl8eNIpEzqfYTiFt2-322WOuffmIhCXhU86lq_2NdkFc5FuTDDfOs)

[Learn more about how the Retention Analysis chart calculates retention](/docs/analytics/charts/retention-analysis/retention-analysis-calculation).

### Return On (formerly known as N-Day)

Return On retention tells you the percentage of users that came back to trigger your return event **on a specific day** after triggering your starting event. The retention value for day 7, for example, tells you the percentage of users who returned on day 7 after their first use.

Regardless of whether you are looking at retention for all users or for specific cohort entry dates, Amplitude will use only one method to calculate Return On retention (unlike [Return On or After](#h_01GXB4EFQ2VXSYEZ0CRMF09AJS)). Both the chart and the first row of the breakdown table below it show overall retention by default.

![](/docs/output/img/retention-analysis/bRG3OPRhMIRWdC_WcGmL-UrlhHJHoR42SWDFwmzirvTGgdI-p0g4HjFTpa0UtiBoDUhDlIhC6RD4jtv-M3ZkecC11Z-5FCHc8TBGQjwdZ5KydLB_KkuWS_4yH3mbWCNa9fU4uQi5Hj2SXjC5Ug-tvLU)

[Learn more about how the Retention Analysis chart calculates retention](/docs/analytics/charts/retention-analysis/retention-analysis-calculation).

### Return On (Custom) (formerly known as Custom)

By default, Amplitude assumes you’ll want to use predefined units of time — days, weeks, months, etc. — as retention brackets for your retention analyses. But you can change this by using Return On (Custom) and instead create custom brackets for your Return On retention.

![](/docs/output/img/retention-analysis/kkaC2HwoVknNxGVNU9ea2FQasGOvWv0kjjL4xp4RShlvm5hvX8yUyiz3L3eX8LkYt88u7A6fL4fOIGUQvT3pQ6sepIOMY64uKvqDMjiUPz5vb6Rmp7izDWC7ARxdgGRYIp3ONrPwKxGG1fLsemX-_Nk)

Because the custom brackets feature uses the same logic as Return On retention, you can use it to generate the equivalent of a Return On retention chart while defining the relevant units of time yourself. 

In the image above, there are four custom brackets defined:

* First bracket: one day (Day Zero)
* Second bracket: three days (Day 1-3)
* Third bracket: three days (Day 4-6)
* Fourth bracket: five days (Day 7-11)

The line graph shows the weighted averages of all of the bracket retention numbers from the user cohorts within the selected timeframe.

![](/docs/output/img/retention-analysis/xPk8bYZIWfjtWTgFlyAkh6AZEtjwNrmmjHwNO-2Qy5JJZeBSwo-VYz_jwxqcEJ9_Hvs8s85nwK-_WIjLZga2ZEaWrftx9Sj3tdyI-8aVGxvCDPYW_dRLmAGMn6Szv0Rk_S4b59ifcE6kG5BWayuSt0s)

In the table below, on Jan 4th there were 3,172 new users:

![interpret_retention_table_0.png](/docs/output/img/retention-analysis/interpret-retention-table-0-png.png)

The Day 1-3 retention is 75.1%, meaning that 2,382 of the 3,172 users triggered the return event anywhere between one and three days after their starting event.

The Day 4-6 retention is 99.7%, meaning that 3,164 of the 3,172 users triggered the return event four to six days after their starting event.

Each chart is permitted a maximum of 100 custom brackets. Results for days with incomplete data will have an asterisk.

## Retention vs change over time

Sometimes you may need more than a straightforward view of your retention rates on specific days. You might want to know how a new release has affected your product’s Day 1 retention rates, or if a new training program has had an impact on your Day 14 retention rates. In these cases, you can view your retention data over time, by selecting *Change Over Time* from the *Shown as* dropdown.

![](/docs/output/img/retention-analysis/wppKdelVUz71mcpUDdpDnRsoWwnF0JOZqfSBUlwp_YjfNlga71UAoGiXKe8Nj4TlyGg1sxGmu2BmSk3q-uwe9AKbD3d7XGCPquZzzdmOEBoZAA3NDFGza3u9mYQfvE9Os4JVYu7cmj7wkkRq-niT9nY)

In this chart, we’re looking at all users who were new on January 1st. 100% of them triggered the return event on Day 1, and 72.1% triggered it on Day 7.

![](/docs/output/img/retention-analysis/bie2TdPnLluRZk2yMW2X2n7aKX09-koowjpWrDsbWRca8RW-4hhLyJYHIP0sO1TdBBdbpk-_Q9d0kEjSPppMa2iqcO4QpccuQV6sKC_GEoYaFemoA8uDAvFzZH5T_sxJCMWpwQs0XpYKjBdnuCNlQdM)

Amplitude calculates this percentage by dividing 1) the number of users from each new user cohort who triggered the return event on each retention day, by 2) the number of users who were new on the selected day.

{{partial:admonition type='note'}}
 The Return On Change Over Time data table shows the same data as the Return On Retention data table, but with the X-axis and Y-axis switched.
{{/partial:admonition}}

## Further reading

The retention view is only one way of working with a Retention Analysis chart. You can also use the [usage interval](/docs/analytics/charts/retention-analysis/retention-analysis-interpret-usage) view to see the percentage of active users who’ve triggered your selected events with a specified daily, weekly, or monthly median frequency.

Understanding [how time works in a retention analysis](/docs/analytics/charts/retention-analysis/retention-analysis-time) is crucial to correctly interpreting your results.

You may also need more details on [how the Retention Analysis chart calculates retention](/docs/analytics/charts/retention-analysis/retention-analysis-calculation).