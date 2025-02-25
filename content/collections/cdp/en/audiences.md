---
id: 598de42f-58b0-4349-894d-1c8a8495e953
blueprint: cdp
title: 'Activation overview'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1740517840
source: 'https://help.amplitude.com/hc/en-us/articles/360028552471-Amplitude-Audiences-overview-Drive-conversions-with-true-one-to-one-personalization'
this_article_will_help_you:
  - 'Find the right resources to plan and execute an effective personalization campaign'
---
Personalization in the style of Netflix and Amazon—optimizing the digital experience for the right user with the right message at the right time is the dream of every marketer. 

But the effectiveness of personalization hinges on the data you have access to. By themselves, demographic or behavioral or algorithmic data aren’t enough. To achieve true 1:1 personalization, you need **all three**: only then can you deliver to your users tailored experiences that maximize conversion rates.

Amplitude Audiences is the first **self-serve personalization platform** to work for every job, stage, and stakeholder of the personalization workflow—all without needing a data scientist or engineer.

## How Amplitude Audiences delivers personalized experiences to your users

Many companies approach personalization by simply showing content items in random arrays, or at best, they sort by frequency. This isn't true personalization: these recommendations aren't personalized in any meaningful way, and these companies are losing out on incremental revenue gains a more systematic approach would deliver. 

By contrast, Amplitude Audiences transforms a product from static to dynamic experiences, driving a **15% to 30% lift in conversions** in the process. Here's a bit how it works in practice:

* **Segmentation (right user)**: Marketing can identify the best segments for behavioral personalization with [cohorts](#cohorts) and [computations](#computations)
* **Personalization (right message):** Product can decide the next best action for 1:1 personalization with [predictions](#predictions) and [recommendations](#recommendations)
* **Delivery (right time)**: Engineers can export data into their digital channels for real-time personalization with [APIs](#apis) and [syncs](#syncs)

While the foundation of Amplitude Analytics is user-specific data, Amplitude Audiences has roots in the concept of **cohorts**, groups of users who have something in common. When you apply predictions and recommendations to a cohort, you can give that cohort the deeply personalized experience that maximizes lift. 

## Segmentation

Amplitude Audiences lets you segment your users with **cohorts** or **computations**.

### Cohorts

Amplitude supports two types of cohorts: **behavioral** and **predictive**. 

[**Behavioral** cohorts](/docs/analytics/behavioral-cohorts) are clusters of users grouped together based on their past actions. Create them by segmenting users by events they fired or didn't fire, whether they were active or inactive, and the user properties they have. 

Behavioral cohorts are perfect for engagement-based targeting when you want to reach users at specific stages of your user lifecycle: perhaps they added something to their cart but didn't purchase in the last 24 hours, for example, or they’ve recently activated a subscription.

[**Predictive** cohorts](/docs/cdp/audiences/predictions-build) are clusters of users grouped together based on the actions Amplitude anticipates they may take in the future. Create a predictive cohort by segmenting users by their percentile likelihood: for example, whether they're in the top 10% likelihood to activate, or bottom 25% likelihood to churn. 

Use these cohorts for activation, retention, or engagement based marketing when you want to drive users to the next stage of a user lifecycle: this would include cohorts of users likely to subscribe next week, or users likely to watch a second show next week.

All customers on an Amplitude Growth or Enterprise plan have access to unlimited cohorts.

### Computations

[Computations](/docs/cdp/audiences/computations) work by transforming an event or event property into a computed user property. You can use the computed property as a configurable filter in any Amplitude chart for analysis, or as a personalization tool by syncing it to an external destination.

For example, segmenting your users by the number of purchases they’ve made is possible with cohorts. However, you’d have to create a different cohort to correspond to each possible number of purchases. To streamline the process, you could use computations to create a new, computed property that stores this information as a single integer, for each user. Then segment your users based on their values for this property, taking one step to do what would have taken several before.

All customers on an Amplitude Growth or Enterprise plan have access to 10 computed properties. You can upgrade your plan to include unlimited computed properties. Contact your Amplitude representative for more details.

## Personalization

In Amplitude Audiences, the insightful use of **predictions** and **recommendations** is what enables personalization.

### Predictions

When you [specify a predictive goal](/docs/cdp/audiences/predictions), like a user’s likelihood to subscribe or watch a second show, Recommend leverages all your historical behavioral data to predict future performance based on past performance. Every user has an individual probability to reach your specified goal in the next seven days, recalculated every hour.

Accuracy metrics and predicted-vs-actuals are always front-and-center. You can explore and build cohorts by percentile of user probability. And you can analyze which behaviors and user properties were most important to the prediction for distinguishing high vs low probability users.

You can create unlimited predictions, but only 30 can be active—in other words, refreshing hourly—at any given time. Use predictions to identify the users most likely to take an action, and trigger a personalized communication to them right before they do.

Predictions are only available to Amplitude Audiences customers.

### Recommendations

Once you’ve identified a predictive goal for your users, the next step is making the [recommendations](/docs/cdp/audiences/recommendations) that are most likely to drive users to reach it. Once you’ve specified which event / event property combinations you’re interested in, Amplitude’s AutoML system figures out which items are most likely to maximize each user’s predictive goal, and then get those items in front of the user. The entire process takes minutes instead of weeks, with minimal to no code.

Recommendations are only available to Amplitude Audiences customers.

## Delivery

Amplitude Audiences delivers data with manual or automated **syncs**, and with two **APIs**.

### Syncs

When you [sync your cohorts to a destination](/docs/cdp/audiences/third-party-syncs), like Facebook or Braze, all the userIDs/emails/mobileIDs in your Amplitude cohort are exported to that destination.

Amplitude supports three types of syncs for cohorts, properties, computations and predictions: **on-demand**, **automated**, and **real-time**. On-demand syncs are ad-hoc, one-time syncs, useful for audience testing and one-off campaigns. Automated syncs happen on a daily or hourly cadence—so as your cohort audience membership changes, or the underlying predicted probabilities of the user change, Amplitude Audiences automatically adjust their cohort membership in connected destinations as well. Real-time syncs update each minute and are ideal for interactive use cases where a rapid update is required. No more CSV downloads or manual syncs required—whenever your users take an action in your app, they’ll be automatically synced to your respective ad, email, or testing platform.

All customers on an Amplitude Growth or Enterprise plan have access to unlimited one-time syncs and five automated syncs. You can upgrade your plan to include unlimited automated syncs. Contact your Amplitude representative for more details.

### APIs

You can also integrate Amplitude data directly into your internal systems or app with two APIs:

* Use the [**Cohorts API**](https://developers.amplitude.com/docs/behavioral-cohorts-api) to list all your cohorts in Amplitude, export a cohort, or upload a cohort. Simply query for a specific cohort, and Amplitude returns all the users currently in it.
* Use the **[Profile API](https://www.docs.developers.amplitude.com/analytics/apis/user-profile-api/)** to list data by user. Simply query by userID or deviceID, and you can return their user properties, cohorts, computed properties, predictions, or recommendation values in real time.

All customers on an Amplitude Growth or Enterprise plan have access to 500 Cohort API calls. You can upgrade your plan to include unlimited Cohort API calls and Profile API calls. Contact your Amplitude representative for more details.