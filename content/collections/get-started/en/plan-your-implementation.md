---
id: 2caa7dc1-796d-4f1f-b423-add51b091335
blueprint: get-started
title: 'Plan your implementation'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718901888
source: /docs/analytics/plan-your-set-up
---
This article describes how to successfully set up and get familiar with Amplitude basics.

Amplitude is an event-based analytics tool that tracks the behaviors of users based on in-product interactions and analyzes user behaviors in real-time. 

## Send data

Without a data source, Amplitude can't show you who your customers are and their behavior with your product. Pick one source to start with and add more later if you need to. Send data to Amplitude client-side, server-side, or through a third party.

There are two main ways to send data into Amplitude:

1. [Import existing data](#import-existing-data) if you have data stored elsewhere
2. [Track data](#track-product-data) using Amplitude SDKs and APIs if you are starting from scratch

After your source is set up, use the [debugging guide](/docs/analytics/debug-analytics) to check your initial setup.

### Import existing data

If you already collect data outside Amplitude, you can stream events directly from your chosen source by adding a [source](/docs/data/source-catalog) or [SDK](/docs/sdks/analytics).

### Track product data 

You can track your product data using Amplitude SDKs or APIs:

1. Determine which data source works best for your product (refer to [client-side vs server-side sources](/docs/sdks/client-side-vs-server-side))
2. Install a data source with an [SDK](/docs/sdks/analytics) or [API](/docs/apis/analytics/http-v2) 
3. Tag a few [important events](#what-events-to-track) upfront.

## What events to track

{{partial:admonition type="note" heading="Know key concepts before you get started"}}
See [What is Amplitude?](/docs/get-started/what-is-amplitude/) for definitions of users, events, and properties.
{{/partial:admonition}}

If you're just starting out, **resisting the urge to track everything** upfront. The number of events you should track depends on the complexity of your product. 

Consider starting with two important events in your product to give you some initial insights.

Here are some sample questions to get you thinking:

| Questions                                                                                      | Events                                        |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------- |
| How many daily active users or how many logins per week do I get?                              | **Login** event                               |
| What percentage of users who add an item to their cart successfully check out?                 | **Add to Cart** event and **Checkout** event  |
| What percentage of sign-ups request a demo?                                                    | **Sign Up** event and **Request Demo** event  |
| What's the retention rate? How many users come back to the product two weeks after signing up? | **Sign Up** event and **Session Start** event |

After successfully tracking these events, you can [track more](/docs/data/data-planning-playbook).

## Create a tracking plan

As you advance, it’s critical to [create a tracking plan](/docs/data/create-tracking-plan) document that outlines what events and properties to track, why you're tracking them, and where they're tracked. A tracking plan should derive from the business outcomes you’re trying to measure or improve.

If you're using Amplitude SDKs, Ampli Wrapper is a lightweight wrapper over the Amplitude SDK that provides type safety, supports linting, and enables features like input validation. Ampli CLI works together with the Ampli wrapper to bring a tracking library into your project. Learn more about [Ampli](../../data/ampli/).
