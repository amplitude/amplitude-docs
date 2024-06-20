---
id: 6727b885-1795-411d-abf2-1f72b758c633
blueprint: faq_and_troubleshooting
title: 'The dotted line in Amplitude charts'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360043977571'
---
This article covers some frequently asked questions about a dotted line in an Amplitude chart.

Why does my chart show a dotted line?
Whenever you see a dotted line in an Amplitude chart, that means Amplitude is still receiving events for that day or data point. Once all relevant data has been collected, the dotted line will become a solid line.

What's an example of a chart showing a dotted line?
Let's say a new user performed their first event on March 13 at 7pm. On March 15 at 9 am, you check the retention chart and see this:

![dotted_line_in_chart.png](/docs/output/img/faq/dotted-line-in-chart-png.png)

The dotted line extending to the March 13 data point tells you there still may be outstanding events for that day. This happens because the [Change Over Time](https://help.amplitude.com/hc/en-us/articles/230543327-Retention-Analysis#Change-Over-Time) metric is calculated in **24-hour-windows**. And at 9 am on March 15, we are still within the user’s Day 1 retention period:

* **Day 0** retention was from **June 13 at 7 pm** to **June 14 at 7 pm**
* **Day 1** retention is from **June 14 at 7 pm** to **June 15 at 7 pm**
* **Day 7** retention will be from **June 19 at 7 pm** to **June 20 at 7 pm**

As of 9 am on March 15, this user's Day 1 is not over, which means this data point could still change. 
