---
id: 99fc5402-2a04-4afc-a248-2973b368033b
blueprint: account-management
title: 'Portfolio: Conduct cross-project analysis in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/360002750712-Portfolio-Conduct-cross-project-analysis-in-Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715362483
this_article_will_help_you:
  - 'View and understand the behavior of your users across multiple products'
  - 'Reconcile users with multiple user IDs across your products'
---
With Portfolio, you can build a holistic view of how your users interact with your entire product portfolio. If you've instrumented multiple platforms or product lines, Portfolio can give you unparalleled insight into your users’ complete journey.

{{partial:admonition type="note" heading="Portfolio project limits"}}
Portfolios support up to five projects. If your use case requires more, contact your account team to unlock up to 10 projects in a portfolio.
{{/partial:admonition}}

### Feature availability

This feature is available to users on **Enterprise plans only**. See our [pricing page](https://amplitude.com/pricing) for more details.

## How it works

The foundation of Portfolio's ability to create cross-product analyses is the **View**. Views are collections of Amplitude Projects or data sources that merge the goings-on in each project into a single display. A View, with one or more data sources, allows you to analyze users across multiple projects at once. 

{{partial:admonition type='note'}}
Views can't ingest data themselves, but you can change and update them at any point. 
{{/partial:admonition}}

Amplitude assumes that if it sees the same user ID (or device ID) in different projects, they're attached to the same user. 

However, silos user properties on a per-project basis: User properties on events triggered in a particular project are the user property values for that project, and that project only. 

For example, you have two projects named `iOS` and `Android`. One user has a user property called `Version`, with a value of `1.0` in the iOS project and a value of `2.0` in the Android project. In this case, events triggered by this user in the iOS project have the value of `Version` set to `1.0`, and events triggered in the Android project have the value of `Version` set to 2.0.

{{partial:admonition type='note'}}
If an event type has the same name on two or more projects, Amplitude considers it to be the same event in the dropdown.
{{/partial:admonition}}

While cohort export for portfolio projects is supported for all destinations, when you select Amplitude User Property, only `device_id` and `user_id` are available.

## Create a Portfolio view

Admins and managers in an organization can access and create the Portfolio view by clicking the Settings icon

![gear_icon_for_settings.png](/docs/output/img/account-management/gear-icon-for-settings-png.png)

and navigating to *Organization settings > Projects > Create Portfolio View*. A modal appears; in it, you can name the portfolio view and set user permissions.

At this point, you can connect multiple projects into this cross-project view. Just click *Update Source Projects* to select the projects that should merge into a single view. 

## User mapping (aliasing)

It's not uncommon for user IDs for the same user to differ across projects within the same organization. The [User Mapping API](/docs/apis/analytics/user-mapping) endpoint allows you to merge two users together who Amplitude would otherwise identify by different user IDs. This isn't possible through the UI, and is only available as an API call.

In the example below, three user records, each with a different users ID, are all merged into the user ID `mike@hooli.com` . This new user ID is that user’s "global" user ID in the cross-project view. This way, you can get an accurate count of the number of unique users across your entire product portfolio.

![](/docs/output/img/account-management/360003724891)

When Amplitude maps users, it doesn't merge user properties. This means the user properties attached to each event are those from the original user who triggered the event in the first place.

Read more about accessing the User Mapping (Aliasing) API, mapping, and unmapping users in [User Mapping (Aliasing) API](/docs/apis/analytics/user-mapping#usage).