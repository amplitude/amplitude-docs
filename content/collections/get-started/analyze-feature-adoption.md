---
title: "Analyze the adoption of a feature"
source: "https://help.amplitude.com/hc/en-us/articles/16797955580955-Analyze-the-adoption-of-a-feature"
id: 07fcc029-bad9-40ad-9841-f288943fae48
---

#### This article will help you:

* Generate a feature adoption report from a pre-built template

The charts included on the **Feature Adoption Report template** help you gain a deeper understanding of the customer behaviors linked to conversion and drop-off. There’s no setup required, though you can easily customize the template itself and the individual charts included with it if you need to.

The Feature Adoption Report template includes the following charts:

* How many unique users do `Any Active Event` each day?
* How many times does `Any Active Event` happen each day?
* What percentage of active users do `Any Active Event` each day?
* What percentage of unique users do `Any Active Event` for the first time each day?
* On average, how many times does each user do `Any Active Event` each day?
* On average, how many times does `Any Active Event` happen per session?
* How many times does each unique user do `Any Active Event` in 30 days?
* How many users return to do `Any Active Event` after their first time?

For a more detailed view into any of these questions, you can simply click the title of the chart you’re interested in, and you’ll be taken directly to it.

## Customize the Feature Adoption Report template

You can customize this or any template by first converting it into a **dashboard**. In Amplitude, templates and dashboards are related but distinct concepts. A [dashboard](/analytics/dashboard-create) is a single, convenient view of several related charts; you’d use a dashboard to share insights with other stakeholders in your Amplitude project. A template is a re-usable version of a dashboard; you’d use it to make other, similar dashboards, which you could then customize to meet the specific needs of a different project.

To turn the template into a dashboard, follow these steps:

1. From the *Replace Projects* dropdown, select the Amplitude project you’ll want to use this dashboard to track. If you want it to track the current project, just leave it as-is.
2. If you want to replace the Any Active User event with something more specific, click the *Replace Events* dropdown and select the event you want to use in place of `Any Active Event`.  
  
For example, if you’re interested in questions around feature discovery, select an event that signals successful feature usage. If you’re more interested in conversion, you should select an event that reflects the desired user behavior. For a streaming service, this might be `Video Watched`, while for an ecommerce company it might be `Complete Purchase`.  
  
You are **not required** to replace the `Any Active Event` event if you’d prefer not to.
3. Click *Save As New Dashboard* and select *Keep and display saved replacement parameters*. Then click *Next*.
4. Give your new dashboard a name and select the location where it will be saved. Then click *Save*.

Your dashboard is now ready for use.

Check out [this article in our Help Center to learn more about dashboards](/analytics/dashboard-create), and [this article to learn more about templates in Amplitude](/analytics/templates).
