---
id: 1367ad78-90fa-465b-be63-45e9102cdcec
blueprint: audience
title: "Recommendations: Help users reach the goals you've set for them"
source: 'https://help.amplitude.com/hc/en-us/articles/360059624172-Recommendations-Help-users-reach-the-goals-you-ve-set-for-them'
this_article_will_help_you:
  - 'Determine if recommendations are a good fit for your organization'
  - 'Understand the use-cases best suited to recommendations'
  - 'Understand the data requirements for recommendations'
exclude_from_sitemap: false
landing: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715121430
---
Once you’ve identified a predictive goal for your users, the next step is making the **recommendations** that are most likely to drive users to reach it. Amplitude’s AutoML determines which items are most likely to maximize each user’s predictive goal, and then places those items in front of the user.

Amplitude Audiences's machine learning algorithm clusters your selected users into groups of similar users. This similarity is determined by shared user properties and behaviors taken in the past. Next, it analyzes historical data to see which items are most likely to increase each cluster’s propensity to convert. Finally, it assigns a ranked list of items to each user, based on their respective assigned cluster.

The algorithm re-trains every hour, so it’s always incorporating new information on properties and behaviors into its results.

{{partial:admonition type='note'}}
Recommendations are available for standard event properties only. They are not available for merged, derived, or transformed properties.
{{/partial:admonition}}

## Who should use recommendations?

Amplitude Audiences is optimized for **user-based personalization**, not account-based. As such, its recommendations will be most useful for companies that need to showcase an array of items—products, articles, shows—in some kind of product carousel, product list, or cart flow. In particular, ecommerce and marketplace companies, as well as B2C and subscription software companies, are the best fit for Amplitude Audiences.

Enterprise B2B companies, on the other hand, are unlikely to benefit from using recommendations.

## When should you use recommendations?

It’s important to keep in mind that Amplitude Audiences is **not an analytics feature**; instead, it’s a personalization feature that helps you improve in-product / digital experiences to maximize lift. Its recommendations are optimized for user-based digital commerce use cases, and are most effective for three types of personalization: Assortment, next-best action, and cross sell.

* **Assortment**: An assortment ranks items to be displayed on a homepage or within a category page. These items can be SKUs, articles, shows, etc. Assortments are appropriate for **increasing engagement**.
* **Next-best action**: This scheme identifies a second item the user might be interested in and places it into the checkout or carousel flow, or in an email after purchase. Here, the objective is to **increase conversions**.
* **Cross sell**: Cross-sell personalization ranks items that signify discrete stages of your customer lifecycle the user hasn’t yet achieved. These items are usually categories, products, or subscription types, and the primary objective here is to **increase LTV**.

Support for other use cases—like in-session recommendations and new item recommendations—is currently in development.

{{partial:admonition type='note'}}
Recommendations are only available to Amplitude Audiences customers.
{{/partial:admonition}}

## Data requirements for a recommendation

There are three data components to configuring a recommendation: the outcome event, the exposure event, and the event property. The data behind these components [**must be instrumented**](https://help.amplitude.com/hc/en-us/articles/360000748812) in your taxonomy for recommendations to work:

* The **outcome event** is the objective goal for your recommendation. Often, it’s something like “purchase” or “subscribe.” You’ll need to be tracking this outcome as an event in Amplitude Analytics.
* The **exposure event** is an action taken by the user prior to the outcome event. Typical exposure events include “add to cart,” “click product,” or some other event that would have an event property to configure as an item to be recommended. This event must be tracked as an event **upstream in the conversion funnel** of the outcome event.
* The event property is the “item” that will actually appear in the recommendation. It’s often a property like “SKU,” “ID,” “name,” “category,” or “brand.” In order for your recommendation to work, you’ll have to be storing this information as an **event property on the exposure event**.

It’s recommended that you work closely with your Amplitude CSM to ensure these conditions are met.

To learn more, read on to find out [how to build a recommendation](/cdp/audiences/recommendations-build) and [how to use recommendations in your personalization campaigns](/cdp/audiences/recommendations-use).