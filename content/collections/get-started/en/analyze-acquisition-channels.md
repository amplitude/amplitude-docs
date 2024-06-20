---
id: 3bed8b1f-3e50-4a2f-aaf9-148e3663fc89
blueprint: get-started
title: 'Analyze your acquisition channels'
source: 'https://help.amplitude.com/hc/en-us/articles/16798045496859-Analyze-your-acquisition-channels'
this_article_will_help_you:
  - 'Use a pre-built template to generate a customer acquisition analysis for ecommerce companies'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1716571204
---
Understanding how many and where your customers are coming from is crucial for any business, but particularly those in the e-commerce sector. Amplitude helps you understand how many customers are finding your store, how effective different campaigns are at creating new revenue, and which channels drive the most engagement.

Armed with this knowledge, you can focus your efforts on optimizing ad spend, marketing efforts, and product enhancements.

You’ll find this information in the Ecommerce Report template. There’s no setup required, though you can easily customize the template itself and the individual charts included with it if you need to.

The Ecommerce Report template includes the following charts related to customer acquisition:

* How are customers finding my shop?
* How many customers have visited my shop in the last 30 days?

For a more detailed view into any of these questions, simply click the title of the chart you’re interested in.

## Customize the Ecommerce Report template

You can customize this or any template by first converting it into a **dashboard**. In Amplitude, templates and dashboards are related but distinct concepts. A [dashboard](/docs/analytics/dashboard-create) is a single, convenient view of several related charts; you’d use a dashboard to share insights with other stakeholders in your Amplitude project. A template is a re-usable version of a dashboard; you’d use it to make other, similar dashboards, which you could then customize to meet the specific needs of a different project.

To turn the template into a dashboard, follow these steps:

1. From the *Replace Projects* dropdown, select the Amplitude project you’ll want to use this dashboard to track. If you want it to track the current project, just leave it as-is.
2. From the *Replace Events* dropdowns, select the events you want to use in place of `New User` and `Any Active Event`.  
  
If you want to replace the New User event, you should choose an event that signals activity in your product from a new user—for example, `User Sign Up` or `Account Registration`.  
  
If you want to replace the `Any Active User` event with something more specific, scroll until you find the event you’re interested in and select it.  
  
For example, you could select a page view / navigation event to generate an understanding of traffic as it enters your site, and general navigation throughout. Or if you’re more interested in identifying traffic sources, you could select a property of your page view / navigation event that tracks the user's source. This is often a UTM parameter like `utm_source`.  
  
You are **not required** to replace either the New User or the Any Active Event events if you’d prefer not to.
3. Click *Save As New Dashboard* and select *Keep and display saved replacement parameters*. Then click *Next*.
4. Give your new dashboard a name and select a location to save it in. Then click *Save*.

Your dashboard is now ready for use.

Check out [this article to learn more about dashboards](/docs/analytics/dashboard-create), and [this article to learn more about templates in Amplitude](/docs/analytics/templates).