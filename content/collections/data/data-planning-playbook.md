---
id: 2886ff4d-cb6d-4327-a412-83c4e5c3aff7
blueprint: data
title: 'Data planning playbook'
source: 'https://help.amplitude.com/hc/en-us/articles/115000465251-Data-planning-playbook'
this_article_will_help_you:
  - 'Understand the basics of users, events, and properties'
  - 'Learn techniques for planning your taxonomy'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717612672
---
Using Amplitude effectively will first require you to identify the events and properties you want to track. Designing a solid, scalable taxonomy can help make your analyses easier, avoid data gaps, and prevent future data issues.

This playbook will review the strategy and considerations for creating your tracking plan.

### Feature availability

This feature is available to users on **all Amplitude plans**.

## What's a taxonomy?

A taxonomy is a set of hierarchical classifications and naming conventions for your data. It's a way to identify and categorize your event and user data so that Amplitude can generate relevant and valuable insights from it. The process of setting up a taxonomy in Amplitude will differ from organization to organization, but the heart of it is selecting the events you want to track, identifying event properties and user properties you want to track, and then naming them.

## Users, events, and properties: An introduction

Amplitude's analyses use a combination of events and properties associated with your users.

### Users

A user represents a unique individual taking an action or engaging in an activity related to your application. Amplitude uses multiple methods to identify and reconcile your users across various devices.

You can learn how Amplitude tracks unique users, including how to reconcile anonymous users before login.

### Events

An event is a **distinct action or activity** performed by a user within your product. Events can be **active** when a user has interacted with your app (for example, starting a game or adding to their cart) or they can be **inactive** (the user receives a push notification). 

When naming events, Amplitude recommends establishing a consistent naming convention that uses:

* **Consistent capitalization**: Amplitude will capture `Song Played` and `song played` as two separate events, so this naming convention will help prevent messy data, especially when multiple teams are sending the same event.
* **A consistent syntax**: Similarly, `Song Played` and `Played Song` will also be considered separate events. For example, a standard of `[Noun]` + `[Past-Tense Verb]` will make sure all your events are consistent.
* **A consistent actor**: Does `Message
 Sent` mean that the user sent a message or that we sent a message to the user? If all your events are always from the user's perspective, you'd know that this means the user sent a message.

Default events are Title Cased from the user's perspective, with a `[Noun]` + `[Past Tense Verb]`. You can follow establish your own convention if you wish, but the most important thing is that you remain consistent.

### Properties

Properties are **attributes** that help define details around your events and users. At a high level:

* **Event properties** are attributes that help describe details specific to the particular instance of an event. For example, if you had a `Purchase Completed` event, you could specify what the user purchased, the total value of the order, and the payment method used.
* **User properties** are traits describing the user and apply across all their future events until the properties are modified. Amplitude's SDK captures several user properties by default, and you can also set up your own properties to track.

You can learn more about the differences between how [events and user properties behave in this article](/docs/data/user-properties-and-events). Also, as with events, we recommend establishing a naming convention with a consistent casing.

## Step 1: Define your business objectives

Starting with your goals and metrics helps to ensure you've prioritized the most important ones for your implementation. For example:

* What are you and your team working towards?
* What metric are you trying to optimize for?
* What questions are you looking to answer with data?

Some typical goals Amplitude customers pursue include:

* Improving acquisition ROI
* Finding the "aha" moment in the product
* Optimizing conversion
* Increasing user retention and LTV

Once you've identified your organization's overarching goals, it's easier to break them down into individual metrics and ensure your tracking plan measures your desired outcome.

Let's say, for example, you have an e-commerce app and are looking to increase purchases. You could do this by:

* Increasing the conversion rate of users through your purchase flow
* Increase the number of users who make multiple purchases
* Increasing the number of users coming to your app

Each of these could be your input metrics to achieve your goal. Prioritize these input metrics so you'll answer the most important question first. We recommend you adopt an iterative approach, in which you plan and instrument your most important metrics and iterate later to add more.

## Step 2: Break down your key metrics

Now that you know your ultimate goal and have some hypotheses about how to accomplish that goal, you can break down those input metrics even further. What critical paths do your users take, and how do they involve each of those metrics? What actions are essential to each of those paths?

Let's say you're starting with increasing the conversion rate of users through your purchase flow. What are users' critical interactions with your application through the purchase flow? They could be:

* **Search completed:** The user has searched for an item to purchase
* **Product details viewed:** The user has viewed the details of an item
* **Product added:** The user has added an item to their order to purchase
* **Order reviewed**: The user has viewed the items in their order prior to purchase
* **Order completed**: The user has made a purchase and completed their order

For each of these, you can also think about the various factors involved in each step. For example:

* When using search, what term did the user search for?
* When they viewed an item, what was the `Product ID` for the item purchased?

One helpful technique is to think about the objects involved with each of these actions and make sure to have attributes of those actions in each event. For example, an item in your system likely has an ID, a category, and a price—all properties you can add to events related to your items.

## Step 3: Optimize your events and properties

Lastly, you'll want to do some final optimizations on your plan. Ask yourself these questions:

### Do you have multiple events for similar actions?

Suppose you have two user actions you could capture as two separate events, or as a single event with a property distinguishing the two distinct cases.

For example, perhaps you believe payment method is a critical factor, and you're wondering whether to instrument:

* `Order Completed` as a single event with a `Payment Method` property that captures `Credit Card` or `Apple Pay`, or
* Separate events for `Credit Card Order Completed` and `Apple Pay Order
 Completed`

There are a few things to consider:

* Start with your key metrics. In this case, while the purchase method is important, our key metric is our purchase flow conversion. A single `Order Completed` event would be easier to include in a funnel to see the overall purchase flow conversion.
* Is the event scalable? In this case, what happens when you introduce PayPal as a new payment method? Any chart measuring overall conversion would have to be updated. You'd also be using three events for an interaction where you could use one.
* Do you want to identify these separately in [Journeys](/docs/analytics/user-data-lookup)? If so, a single `Order Completed` event is probably fine. However, if you took this to an extreme and made all your events `Page Clicked`, you could see how having a series of generic `Page Clicked` events wouldn't be very helpful when looking at a user flow.

### Are your property definitions consistent across your events?

Even though event properties are specific to each event, you should ensure they're defined consistently across your taxonomy. For example, instead of having a property called `Type` that could represent a type of an item in one event and a type of payment in another, we recommend having separate properties: `Item Type` and `Payment Type.`

### Are your properties captured across all applicable events?

One typical use case for event properties is tracking values that must be remain constant to count toward funnel conversion. For example, perhaps you want to know how often users add to cart after viewing details:

* Step 1: `Product Details Viewed`
* Step 2: `Product Added`

Here, users should count as converted through the funnel **only** if they triggered the event on the **same** product. To ensure this, instrument the event property `Product ID` and require the funnel to hold this value constant. Every event in the funnel must have that property for the holding constant feature to work.

* Step 1: `Product Details Viewed`
	* `Product ID` = `3345`
* Step 2: `Product Added`
	* `Product ID` = `3345`
	* `quantity` = `1`

In this example, you can see how often a user adds to their cart after viewing an item. Without the `Product ID`, you'd be analyzing how often a user adds any item to their cart after viewing any item.

## Next steps

You can refer to the steps in this playbook as you add new features or iterate on your product analytics. Amplitude Data provides ways to create and iterate on your plan directly in the product, or by importing a CSV file.

If you're interested in seeing more specific examples, check out our industry-specific best practices guides to see sample use cases and business questions, a recommended taxonomy, and a complementary dashboard that you can use for your implementation. We've tailored each to meet the specific needs of the following sectors:

* [E-commerce](https://analytics.amplitude.com/share/8f32b20708e743e597b75c99b7a766d5)
* [Fintech](https://analytics.amplitude.com/share/cbb3827995aa4d03852a3cdf9a3c46b0)
* [Publications](https://analytics.amplitude.com/share/5940753342e04394bd0379cdd952cc18)
* [Streaming Media](https://analytics.amplitude.com/share/6f40a915c14144b8ac992a5a8d7cf7cb)
* [B2B](https://analytics.amplitude.com/share/0f7a78fadfc145d0b99e365eb41d9262)
* [Healthcare](https://app.amplitude.com/analytics/share/6e938acce69d459bbb81561b2f942079)