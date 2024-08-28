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

## Configure the Out-of-the-box Product Analytics

Before you begin, configure the Out-of-the-box Product Analytics to ensure the provided analysis meets your needs.

From the Product Overview page, click **Settings**.

### Basic settings

On the Basic Settings page, select any event that represents an action that a user takes in your product. By default, Amplitude sets `[Amplitude] Any Active Event` as the event.

Next, select the retention intervals that are most meaningful to you. Set both Daily and Weekly intervals.

Configure breakdown properties for the Product Overview, Onboarding, and Retention views. Select up to three.

Click **Save** to commit changes.

### Onboarding funnel

Select events that represent the steps in your onboarding funnel. For example start with a broad event like `[Amplitude] Session Started` and move down the funnel to more specific actions that users can take as part of onboarding, like `Profile completed`. Add up to five events to your funnel.

### Features

Select specific features for which you want to track engagement. Define features with tracked events or [Feature Flags](/docs/experiment/workflow/feature-flag-rollouts) that are a part of an experiment running in your product. Features you define are available on the Feature Engagement tab.

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
* New user retention, based on the daily interval you set.
* Weekly active users

### Onboarding

Onboarding displays a conversion funnel based on the events you defined during configuration.

Break down conversion with the properties you defined during configuration. Breakdown shows overall conversion rate per value, and raw conversion numbers for each event.

### Feature engagement

Feature engagement displays an engagement matrix with the features you defined plotted according to percent of daily active users (DAU) that engaged with the feature, and the average frequency with which users engaged with the feature.

### Retention

Retention contains three tabs that reflect your product's overall user retention, the retention over time, and the usage interval.

Retention over time uses the retention interval values you set during configuration.
