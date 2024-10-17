---
id: 34dec17f-acb6-4cfe-98fb-674fe2295f8a
blueprint: analytic
title: 'Out-of-the-box Product Analytics'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722362576
---
Amplitude's Out-of-the-box Product Analytics provides a single location in Amplitude where you can track metrics that provide insight into how users engage with your product. Track metrics like new and active users, retention, conversion, engagement, and more.

## Feature availability

This feature is available on all Amplitude plans. For more information, see the [pricing page](https://amplitude.com/pricing).

### Permissions

Product Analytics permissions for editing views depend on both your role within a project, and your organization's [plan](https://amplitude.com/pricing).

{{partial:collapse name="Product Analytics edit permissions"}}

**Starter and Plus**

| Role    | Default view | Custom view (yours) | Custom view (others) |
| ------- | ------------ | ------------------- | -------------------- |
| Admin   | ✅            | ✅                   | ✅                    |
| Manager | ✅            | ✅                   | ✅                    |
| Member  | ✅            | ✅                   | ✅                    |

**Growth and Enterprise**

| Role    | Default view | Custom view (yours) | Custom view (others) |
| ------- | ------------ | ------------------- | -------------------- |
| Admin   | ✅            | ✅                   | ✅                    |
| Manager | ❌            | ✅                   | ✅                    |
| Member  | ❌            | ✅                   | ✅                    |

{{/partial:collapse}}

{{partial:partials/web-product-analytics hub="Product"}}

### Basic settings

On the Basic Settings page, select the event that represents an active action in your product. By default, Amplitude sets `[Amplitude] Any Active Event` as the event.

Next, select the retention intervals that are most meaningful to you. Set both Daily and Weekly intervals. Use Amplitude's [usage interval analysis](/docs/analytics/charts/retention-analysis/retention-analysis-usage-interval) to learn how long users go between triggering your critical event.

Configure breakdown properties for the Product Overview, Onboarding, and Retention views. Select up to three.

Click **Save** to commit changes.

### Onboarding funnel

Select events that represent the steps in your onboarding funnel. For example start with a broad event like `App installed` and move down the funnel to more specific actions that users can take as part of onboarding, like `Profile completed`. Add up to five events to your funnel.

### Features

Select specific features for which you want to track engagement. Define features with tracked events (including custom events) or [Feature Flags](/docs/feature-experiment/workflow/feature-flag-rollouts) that are a part of an experiment running in your product. Features you define are available on the Feature Engagement tab.

To create a new feature based on an event:

1. From the *Features* tab of the *Customize page*, click *+ Create Feature*.
2. Choose to define the feature with an event.
3. Name the feature, and select the Value Moment, or the event that represents when a user realized value from the feature.

## Product Analytics views

Out-of-the-box Product Analytics provides four views, each of which share filtering and segmentation controls.

* Product overview
* Onboarding
* Feature engagement
* Retention

The Product Overview, Onboarding, and Retention views also take advantage of the breakdown properties you defined during configuration.

### Product overview

The product overview displays the baseline metrics:

* Active users (unique)
* New users (unique)
* Avg. session duration
* New user retention, based on the interval you set.
* Weekly active users

### Onboarding

Onboarding displays a conversion funnel based on the events you defined during configuration.

Break down conversion with the properties you defined during configuration. Breakdown shows conversion rate per value, and raw conversion numbers for each event.

### Feature engagement

{{partial:admonition type="note" heading=""}}
Features are a specific function or characteristic of a product that provides value to customers.
{{/partial:admonition}}

Feature engagement displays an engagement matrix that enables you to compare the features you define. The matrix plots features according to adoption (or the percentage of active users that engaged with the feature), and the average frequency with which users engaged with the feature.

### Retention

Retention contains three tabs that reflect your product's user retention, retention over time, and  usage interval.

Retention over time uses the retention interval values you set during configuration.
