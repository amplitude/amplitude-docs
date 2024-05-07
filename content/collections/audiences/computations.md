---
title: "Computations: Create new user properties on the fly"
source: "https://help.amplitude.com/hc/en-us/articles/360060044791-Computations-Create-new-user-properties-on-the-fly"
id: 8dfd33d5-b99e-468d-82e9-548bdc2667bc
---

#### This article will help you:

* Streamline the segmentation process by understanding the difference between computations and cohorts
* Create and deploy a computed property from an existing event or event property
* Sync your computed properties to an external destination

Like cohorts, computations are a **segmentation tool**. But where cohorts create lists of users, computations work by: 

* Transforming an event or event property into a **computed user property**.
* Allowing you to **segment your users** by the computed property as a configurable filter in any Amplitude chart.
* Providing a **personalization tool** with the option to sync the computed property to an external destination.

Here’s an example. If you want to segment your users by the number of purchases they’ve made, you can use cohorts to do this—however, you’d have to create a different cohort to correspond to each possible number of purchases, an approach that could quickly become cumbersome and time-consuming.

As an alternative, you could create a computed property (number of orders, say), which will store the relevant number as a single integer, attached to each individual user. And while either a cohort or a computation would get the job done, in this use case, a computed property would be the more elegant and flexible choice.

{{partial:admonition type='note'}}
 To use your computed property as a filter in a chart, first choose your computed property as a filter parameter in a cohort; then save the cohort. From there, you can select that cohort in any Amplitude chart as a segmentation parameter. You can also query directly on a computed property in a chart, as either a property filter or a group-by option.  
{{/partial:admonition}}
  
Grouping by computations is only available on Event Segmentation, Funnel Analysis, Retention Analysis, and composition charts.

Computed properties are ideal tools for personalization campaigns. There are three types of computed properties:

* **Event count**: This property type counts the number of times a user has fired an event over a defined period of time.
* **Aggregation**: This property type aggregates the sum, minimum, maximum, or average of the values of an event property over a defined period of time.
* **First/last value**: This property type includes only the first or last value of the selected property in charts.

**NOTE:** Computations are available for standard event properties only. They are not available for merged, derived, or transformed properties.

## Create a computed property

To create a new computed property, follow these steps:

1. Navigate to *Computations → Create Computation*.
2. Under *Computation Type*, select the type of computed property you want to create and click *Next >*.
3. Under *Select an Event*, choose the event you’re interested in building your computed property from:

* * For **event count** computed properties, you can filter the event using *+ where* clauses to add any conditions you may wish to include.
	* For **aggregation** computed properties, select an event and the related event property you want to aggregate. Specify if you want to compute an average, minimum, maximum, or sum value.
	* For **first/last value** computed properties, select the aggregation type *First Value* or *Last Value*. Specify the appropriate event and property.

**NOTE:** The event property value must be expressed as an integer for the aggregation to work.

4. Set the time range for your computed property. When you’re done, click *Next >*.
5. Name your computation and, if desired, enter a description. This name will appear as a user property on every user. Then click *Next >*.
6. Finally, take a moment to review your results. The computation will take a few seconds to generate.

Amplitude Cohorts & Audiences will apply the computation to all users who were **active** during your specified date range. In the details view, you can see the configuration details of the computation, as well as a distribution of all users, the number of users who’ve fired the event at different counts (event count only), and a distribution of all users by distinct binned aggregation values (aggregation only).

## Delete a computation

You can delete a computation at any time after you've created it. To do so, follow these steps:

1. Click *Computations* in the left-side rail.
2. Click the name of the computation you wish to delete.
3. From the *More* drop-down menu, click *Delete*.
4. Confirm that you want to delete this computation.

When you delete a computation, it will no longer show up as an available user property for your cohorts. You will be unable to sync it or filter from it within your cohorts. At the same time, deleting unneeded computations will free up space for you to create new, more useful ones.

## Use computed properties in campaigns with external destinations

Computed properties are most often used in **personalization campaigns**. Just sync the computed property as a user property to external destinations, like a database or third-party marketing platform.

For example, you can use a computed property to calculate the total number of orders a user has placed, and then use that information to trigger a different canvas in Braze if that number reaches a certain amount. You could also use computed properties to calculate users’ average order values, sync to the Profile API, and then show users different interstitials in the app, based on their average order values.

{{partial:admonition type='note'}}
 Amplitude Audiences supports Braze, S3, and the Profile API as destinations for computed property syncs. Note that the process of syncing to Braze will accrue more data points in your Braze plan, which may result in an additional charge from Braze.
{{/partial:admonition}}

To sync your computed property with a personalization tool, follow the instructions in our article on [syncing properties, recommendations, and cohorts to third-party destinations](/cdp/audiences/third-party-syncs).
