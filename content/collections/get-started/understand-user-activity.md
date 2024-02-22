---
title: "Understand your users' activity"
source: "https://help.amplitude.com/hc/en-us/articles/16798159501723-Understand-your-users-activity"
id: 6351af1c-e7e9-4488-bbe7-34648487d173
---

#### This article will help you:

* Use a template to generate a user activity report in Amplitude Analytics

The charts included on the User Activity Report template deliver insights into the frequency and duration of your users' engagement with your product. There’s no setup required, though you can easily customize the template itself and the individual charts included with it if you need to.

The User Activity Report template includes the following charts:

* How many users are active each day?
* What percent of active users are new users?
* What percent of active users are returning?
* How long is the average session?
* When do these users come back?
* Breakdown of these users by device family
* Breakdown of these users by country
* Breakdown of these users by platform

For a more detailed view into any of these questions, you can simply click the title of the chart you’re interested in, and you’ll be taken directly to it.

## Customize the User Activity template

You can customize this or any template by first converting it into a **dashboard**. In Amplitude, templates and dashboards are related but distinct concepts. A [dashboard](/analytics/dashboard-create) is a single, convenient view of several related charts; you’d use a dashboard to share insights with other stakeholders in your Amplitude project. A template is a re-usable version of a dashboard; you’d use it to make other, similar dashboards, which you could then customize to meet the specific needs of a different project.

To turn the template into a dashboard, follow these steps:

1. From the *Replace Projects* dropdown, select the Amplitude project you’ll want to use this dashboard to track. If you want it to track the current project, just leave it as-is.
2. From the *Replace Events* dropdowns, select the events you want to use in place of `New User` and `Any Active Event`.  
  
If you want to replace the `New User` event, you should choose an event that signals activity in your product from a new user—for example, `User Sign Up` or `Account Registration`.  
  
If you want to replace the `Any Active User` event with something more specific, scroll until you find the event you’re interested in and select it.  
  
You are **not required** to replace either the `New User` or the `Any Active Event` events if you’d prefer not to.
3. Click *Save As New Dashboard* and select *Keep and display saved replacement parameters*. Then click *Next*.
4. Give your new dashboard a name and select the location where it will be saved. Then click *Save*.

Your dashboard is now ready for use.

Check out [this article in our Help Center to learn more about dashboards](/analytics/dashboard-create), and [this article to learn more about templates in Amplitude](/analytics/templates).
