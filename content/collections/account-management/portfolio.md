---
title: "Portfolio: Conduct cross-project analysis in Amplitude"
source: "https://help.amplitude.com/hc/en-us/articles/360002750712-Portfolio-Conduct-cross-project-analysis-in-Amplitude"
id: 99fc5402-2a04-4afc-a248-2973b368033b
---

#### This article will help you:

* View and understand the behavior of your users across multiple products
* Reconcile users with multiple user IDs across your products

With Portfolio, you can easily generate a holistic view of how your users interact with your **entire product portfolio**. If you've instrumented multiple platforms or product lines, Portfolio can give you unparalleled insight into your users’ complete journey.

**NOTE:** Be sure to understand [project settings](/admin/account-management/manage-orgs-projects) in Amplitude before getting started.

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only.

How it works

The foundation of Portfolio's ability to create cross-product analyses is the **View**. Views are collections of Amplitude Projects or data sources that consolidate the goings-on in each project into a single display. A View, with one or more data sources, allows you to analyze users across multiple projects at once. 

**NOTE:** Views cannot ingest data themselves, but you can change and update them at any point. 

Amplitude assumes that if it sees the same user ID (or device ID) in different projects, they're attached to the same user. 

However, user properties **are** siloed on a per-project basis: User properties on events triggered in a particular project will be the user property values for that project, **and that project only**. 

For example, assume you have two projects named iOS and Android. One user has a user property called `Version`, with a value of 1.0 in the iOS project and a value of 2.0 in the Android project. In this case, events triggered by this user in the iOS project will have the value of `Version` set to 1.0, and events triggered in the Android project will have the value of `Version` set to 2.0.

**NOTE:** If an event type has the same name on two or more projects, it will be considered the same event in the dropdown.

While cohort export for portfolio projects is supported for all destinations, when you select Amplitude User Property, only `device_id` and `user_id` will be available.

## Create a Portfolio view

Admins and managers in an organization can access and create the Portfolio view by clicking ![gear_icon_for_settings.png](/output/img/account-management/gear-icon-for-settings-png.png) and navigating to *Organization settings > Projects > Create Portfolio View*. A modal will appear; in it, you can name the portfolio view and set user permissions.

At this point, you'll be able to connect multiple projects into this cross-project view. Just click *Update Source Projects* to select the projects that should be consolidated into a single view. 

## User mapping (aliasing)

It's not uncommon for user IDs for the same user to differ across projects within the same organization. The [User Mapping API](https://www.docs.developers.amplitude.com/analytics/apis/aliasing-api/) endpoint allows you to merge two users together who would otherwise be tracked by different user IDs in Amplitude. Note that this **cannot be done** through the UI, and is only available as an API call.

In the example below, three user records—each with a different users ID—are all merged into the user ID `mike@hooli.com` . This new user ID will be that user’s “global” user ID in the cross-project view. This way, you can get an accurate count of the number of unique users across your entire product portfolio.

![](/output/img/account-management/360003724891)

When users are mapped, user properties **are not merged**—this means the user properties attached to each event will be those from the original user who triggered the event in the first place.

Read more about accessing the current API endpoint, mapping, and unmapping users in [Amplitude's Developer Center](https://www.docs.developers.amplitude.com/analytics/apis/aliasing-api/#usage).
