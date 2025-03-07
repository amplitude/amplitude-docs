---
id: 5062badd-ff0e-4efd-9c1a-d8d0809e6bdd
blueprint: data
title: 'Object management'
source: 'https://help.amplitude.com/hc/en-us/articles/9980355191579-Object-management-Manage-the-building-blocks-of-your-analyses'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1741388007
---
Amplitude's object management feature lets you centrally manage analysis objects. Analysis objects are the reusable building blocks of your analyses, including [custom events](/docs/data/custom-events), [metrics](#metrics), [segments](/docs/analytics/behavioral-cohorts). 

With object management, you can:

* Create and update analysis objects
* Remove duplicate analysis objects
* View an analysis object's definition, and the charts it's used in
* Bulk delete analysis objects

## Availability

Object management is available to accounts on Enterprise plans. For more information, see Amplitude's [pricing page](https://amplitude.com/pricing).

## Common use cases

* Look for similar metrics, custom events, or segments during the object creation process to decide if there are any already-existing objects you can use, instead of creating another duplicate.
* Use the metadata—for example, sorting by L30D query volume—to identify the most underutilized objects and remove them from the system.
* Filter by object owner to find their own content quickly, or find objects created by experts and power users in your organization
* Admins can designate metrics, custom events, segments, and cohorts as "official," so users know which objects are safe to use.

## Manage your analysis objects

Access Object Management from the left nav.

From the *Object Management* page, click *+ Create New* and select the type of object you'd like to create. Follow the prompts in the modal that appears (it's different for each type).

{{partial:admonition type="note" heading=""}}
A **metric** is an event-and-measurement pairing saved as a single block, which can then be re-used across charts and experiments. A **custom metric** is an event object made up of a user-defined combination of events and filters.
{{/partial:admonition}}

As you define the object (by adding events for custom events and metrics, or by specifying users to include in your cohorts or segments), Amplitude Analytics shows you a list of similar objects, at the bottom of the modal. You can check your new object against this list, to guard against creating unnecessary duplicate objects.

Designate the object as "official" by clicking the checkmark next to the title. This validates the object for use in charts and analyses, and Amplitude Analytics considers it to be a source of truth.

Once you've created an analysis object, you can edit it by clicking on its name in the list. The object's drawer opens; click *Edit*.

![object_management_drawer.png](/docs/output/img/data/object-management-drawer-png.png)

You can also see which charts a metric or custom event is being used in by clicking the *Charts* tab.

To create a new chart from an analysis object, click *Open in Chart* from within the object's drawer. You can change the chart type if you need to.

To duplicate, delete, or copy a link to the analysis object, click ... and select the appropriate choice from the drop-down.

To bulk-delete analysis objects, navigate to the appropriate tab *Custom Events, Metrics, Segments*, or *Cohorts* and click the checkboxes of each object you'd like to delete. Then click *Delete*.

## Permissions

Amplitude users with the role of [Member](/docs/admin/account-management/user-roles-permissions#member) or higher can create analysis objects, and update or delete analysis objects they own. Only administrators can delete objects created by anyone.