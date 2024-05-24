---
id: d79e04a5-67cb-4278-9fc1-5f924d78ffd3
blueprint: get-started
title: 'Understand the conversion rate of an important flow'
source: 'https://help.amplitude.com/hc/en-us/articles/16797878206747-Understand-the-conversion-rate-of-an-important-flow'
this_article_will_help_you:
  - 'Generate a conversion report from a pre-built template'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1716571931
---
The charts included on the **Conversion Report template** give you a deeper understanding of the customer behaviors linked to conversion and drop-off. You can easily apply it to any important in-product flow. There’s no setup required, though you can easily customize the template itself and the individual charts included with it if you need to.

The Conversion Report template includes the following charts:

* What is the conversion rate of this funnel?
* How is the conversion rate changing over time?
* How long does it take users to convert?
* How many times do users do `New User` before doing `Any Active Event`?
* What paths do users take to get to `Any Active Event`?

For a more detailed view into any of these questions, you can simply click the title of the chart you’re interested in, and you’ll be taken directly to it.

## Customize the User Activity template

You can customize this or any template by first converting it into a **dashboard**. In Amplitude, templates and dashboards are related but distinct concepts. A [dashboard](/analytics/dashboard-create) is a single, convenient view of several related charts; you’d use a dashboard to share insights with other stakeholders in your Amplitude project. A template is a re-usable version of a dashboard; you’d use it to make other, similar dashboards, which you could then customize to meet the specific needs of a different project.

To turn the template into a dashboard, follow these steps:

1. From the *Replace Projects* dropdown, select the Amplitude project you’ll want to use this dashboard to track. If you want it to track the current project, just leave it as-is.
2. From the *Replace Events* dropdowns, select the events you want to use in place of `New User` and `Any Active Event`.  
  
If you want to replace the `New User` event, select an event that signifies the beginning of your funnel. This could be a frequent session-starting event like `Log in`  
  
You may want to replace the `Any Active User` event with something more specific. If so, consider selecting an event that clearly reflects the desired user behavior. For a streaming service, this might be `Video Watched`, while for an ecommerce company, it might be `Complete Purchase`.  
  
Scroll until you find the event you’re interested in and select it.  
  
You are **not required** to replace either the `New User` or the `Any Active Event` events if you’d prefer not to.

3. Click *Save As New Dashboard* and select *Keep and display saved replacement parameters*. Then click *Next*.
4. Give your new dashboard a name and select the location where it will be saved. Then click *Save*.

Your dashboard is now ready for use.

Check out [this article to learn more about dashboards](/analytics/dashboard-create), and [this article to learn more about templates in Amplitude](/analytics/templates).