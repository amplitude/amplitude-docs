---
id: 17fb8743-12c4-4b7f-ab11-238dd5498658
blueprint: analytic
title: 'Templates: Re-use your analyses'
source: 'https://help.amplitude.com/hc/en-us/articles/360043053552-Templates-Re-use-your-analyses'
this_article_will_help_you:
  - 'Create templates and update the data they display'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717693091
---
At some point, you've probably wanted to reuse an analysis you'd already created instead of building an identical version from scratch. In Amplitude Analytics, **templates** help teams efficiently recreate common analyses and share best practices with just a few clicks. 

You can create templates from any saved dashboards and choose any events, properties, cohorts, dates, projects, or titles appearing in those charts to templatize. You and your teammates can standardize reporting and create new dashboards from those templates.

Save time when repeating common analyses and make it simpler for new team members to measure impact:

* Create a standard A/B test methodology so anyone can see and evaluate the results
* Establish a common set of analyses for new releases to measure performance and adoption
* Roll out regional dashboards for leadership and local teams with just a few clicks
* Replicate KPI measurements across accounts, platforms, and core features

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only.

## Before you begin

* [Permissions](#h_099bd27f-05f2-43d7-a046-bf07278b75b1) function similarly to dashboard permissions.
* [Use cases](#h_09abb12c-6c2b-4a5a-94ff-1462aaea0f73) for templates and the bulk filter feature on Dashboards are different.

## Create a template

Templates are created from dashboards. For detailed instructions, see the section on [templatizing a dashboard in this Help Center article](/docs/analytics/dashboard-create).

If you're new to Amplitude, you can take advantage of a set of pre-built **starter templates.** These dashboard templates come with pre-formatted charts, so you can quickly acclimatize yourself to analyses of common product questions. The starter templates vary by type, **use case** or **industry**:

### Use Case

* Funnel Analysis
* Feature Adoption
* Getting Started KPIs (Web)
* Product KPIs
* Session Engagement
* Marketing Analytics
* User Activity

### Industry

* B2B SaaS
* FinTech
* E-commerce
* Media
* Marketing analytics

## Use an existing template

Once you've templatized your dashboard, you'll be able to temporarily update the data in the charts your template contains:

![image1.png](/docs/output/img/analytics/image1.png)

To add more parameters, under *Find & Replace*, you'll have the option to update any **properties**, **events**, **projects**, or **text** parameters of your templated dashboard’s charts. This will not affect the values in the original charts.

![image3.png](/docs/output/img/analytics/image3.png)

After you've made changes, you can click *Reset to Default* to revert back to the original chart definitions, or *Save onto Charts* to push the updates you've made onto the original charts.

To share the template with a colleague, either click *Share* or copy the URL and send them that.

## Common template use cases

Some common use cases for templates include:

* **A/B testing:** swap out user or event properties or cohorts with each new experiment’s variants
* **Releases:** swap out version, campaign, region, etc. to track performance or key metrics for new releases
* **Usage or engagement dashboards:** segment by feature/product, region, device, customer, channels, etc. to analyze metrics like engagement with critical events or specific funnels that are notable to a feature or company
* **B2B or partner use cases:** create different dashboards segmented by the customer account or partner
* **Amplitude new user onboarding:** companies often build templates for the above use cases to help onboard new Amplitude users at their company to their teams’ common analyses

## Template permissions

Permissions for templates function the same way they do for dashboards: 

* Admins can edit all templates.
* If a template includes charts from a project you do not have access to, you will not be able to view it.
* Templates can have multiple owners. Click *Share* to add an owner.
* All users will be able to create templates but only members and above can publish them to the gallery. As a viewer, you may still share a direct link to your template with others.