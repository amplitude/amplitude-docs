---
id: 6aa2684c-8d4c-4cd6-8281-10204eb956d3
blueprint: migration
title: 'Migrate From Mixpanel'
source: 'https://www.docs.developers.amplitude.com/guides/mixpanel-migration-guide'
---

The Amplitude Professional Services team has compiled this Mixpanel to Amplitude Implementation Guide to help you implement Amplitude and start getting insights right out of the gate.

With the goal of driving tangible conversion, retention, and product outcomes, this guide provides you with recommended use cases and business questions, a proposed taxonomy, and example charts that can be used for your implementation.

{{partial:admonition type="info" heading="Customer case study"}}
Learn about how Whisk migrated from Mixpanel to Amplitude on the [Amplitude Blog](https://amplitude.com/blog/whisk-product-growth).
{{/partial:admonition}}

## Implementation process

The steps below provide a roadmap to the process of migrating to Amplitude.

### Set product metrics

* Before you dive into the data, ensure all stakeholders and team members agree on what you want to get out of the data. What use cases would the team like to focus on?
* See list of suggested Mixpanel to Amplitude use cases and business questions/metrics down below.

### Design a data taxonomy

* Your data taxonomy should have events and properties that can answer your core metrics.
* See the [Data Taxonomy Playbook](/docs/data/data-planning-playbook) and the sample taxonomy below for best practices.

### Instrument your taxonomy

You can send data to Amplitude client-side, server-side, or through a third party.

## Suggested use cases and business questions

Amplitude provides a workbook with the most common use cases from other Amplitude customers who've migrated from Mixpanel. For more information, see the [Mixpanel to Amplitude Migration Workbook](https://docs.google.com/spreadsheets/d/1lsZa6uZmcUmJdq-_sr5JawckMPiiQDCCzl_ytSYccNg/edit#gid1755544121)

### Common use cases by industry


{{partial:tabs tabs="B2B, Fintech, E-commerce, Streaming media"}}
{{partial:tab name="B2B"}}
**Goal**: Understand product engagement.

**Key points:**

* See how your users convert through critical funnels: acquisition (free trial, sales, partner, POC), onboarding, activation, workflow, cross-sell/upsell funnels.
* Target the right customers at the right time to move them through a critical funnel.
* Find patterns in the way your customers move through key milestones (acquisition, onboarding, activation, renewal).
* Understand different customer segments’ use and adoption to define key personas based on use cases and needs.
* Optimize your product experience to target different customers personas needs and make them more successful.
{{/partial:tab}}
{{partial:tab name="Fintech"}}
**Goal**: Understand what makes your users purchase.

**Key questions:**

* What's the efficiency of marketing channels?
* How many users complete sign-up and money transfer in one session?
* How do users engage with product features?
* What impacts user retention?
* What's the % of users that have used accounts with > 2 currencies in the last 30 days?
* How much revenue do we get from a customer?
* What impacts referrals?
{{/partial:tab}}
{{partial:tab name="E-commerce"}}
**Goal:** Understand revenue and conversion drivers.

**Key questions:**

* How often do users look at products?
* What is our purchase conversion rate?
* And what is the falloff in each step? (rates of- click to category page, click to product, add to cart, view cart, start checkout, order conversion)
* What features do users interact with that lead to conversions?
* What are the drivers that lead from user registration to first purchase?
* How many purchases include more than one item?
* Does the ATC (add to cart) decreased by user or device type?
{{/partial:tab}}
{{partial:tab name="Streaming media"}}
**Goal:** Understand the acquisition and subscription drivers of your users' engagement with your product.

**Key questions:**

* What's the total length of time from content consumption in the Free Trial for churned trials vs. subscription converters?
* What activities are common between users who convert vs don't convert after the Free Trial expires?
* How do users interact with our site and how do they consume content?
* What is the percentage of content consumed per genre?
* What brings users back?
{{/partial:tab}}
{{/partial:tabs}}

## Suggested Mixpanel to Amplitude taxonomy

Amplitude provides the following to help your migration:

* A suggested [Mixpanel to Amplitude Taxonomy](https://docs.google.com/spreadsheets/d/1lsZa6uZmcUmJdq-_sr5JawckMPiiQDCCzl_ytSYccNg/edit#gid434510064)for tracking a minimum set of Events, Event Properties, User Properties.
* A [sample notebook](https://analytics.amplitude.com/share/db099a8a568447fb931b4f476fc0ecf6) containing helpful analysis and charts to get started.

## Recommended instrumentation

Send live event data from your website to Amplitude and/or migrate your existing historical data from Mixpanel to Amplitude.

### Send live event data from your product to Amplitude

Amplitude's recommendation depends on the method you use to track events. 

For client-side event tracking:

* [Amplitude’s SDK Catalog](/docs/sdks/analytics). Use your existing instrumentation method and reference Amplitude mapping to replace instrumentation.

For server-side event tracking:

* [Amplitude's Http API](/docs/apis/analytics/http-v2)

### Map existing Mixpanel methods to Amplitude

Amplitude offers several methods that map to Mixpanel methods.

#### Event tracking

* Mixpanel track events with the `'mixpanel.track()'` method, which takes an event name and sets of properties.
* Amplitude tracks events with the `'amplitude.getinstance().logEvent()'` method. This also takes an event name and set of properties as a JSON object.

#### Property tracking

Super properties in Mixpanel are properties that attach to all subsequent events. Amplitude's User Properties function similarly in that once set, these properties attach to all subsequent events that Amplitude ingests. 

* In Mixpanel, super properties are set with the `'mixpanel.register()'` method.
* In Amplitude, update user properties with the `'amplitude.identify()'` method.

#### User identification

* Mixpanel uses a combination of `distinct_id` (a randomly generated identifier on a specific platform) and `user_id` (explicitly set by the instrumenting teams) to identify a user with the `'mixpanel.identify()'` method.
* Amplitude uses a combination of `device_id` (a randomly generated id on a specific platform) and `user_id` (explicitly set by the instrumenting teams) to identify a user with the `'amplitude.identify()'` method.

For more on how Amplitude resolves user identifies, see [Track unique users](/docs/cdp/sources/instrument-track-unique-users)

### Migrate existing historical data from Mixpanel to Amplitude

Amplitude offers a few options to migrate your historical data from Mixpanel to Amplitude:

* [Amplitude Batch Event Upload API](/docs/apis/analytics/batch-event-upload)
  * Export your data directly out of Mixpanel via [API](https://developer.mixpanel.com/reference/raw-data-export-api) and upload into Amplitude with the Batch API.
  * If you host your data in a another external source, you can also use the batch endpoint to upload data into Amplitude.
* Professional Services
  * For custom services lead by the Amplitude Professional Services team, contact your Amplitude account manager.

### Data privacy considerations

Along with the ingestion methods above, here are some features or areas to consider when managing your customer data:

* [Time to Live (TTL)](/docs/data/time-to-live) - feature within Amplitude to control how long event data lives in your Amplitude instance
* [How to manage Opt-Outs](/docs/sdks/analytics/browser/browser-sdk-2#opt-users-out-of-tracking) - SDK settings to allow your website visitors to disable activity tracking on your website
* [IP Address](/docs/apis/analytics/batch-event-upload) - Amplitude captures IP address and location-based details by default in with client-side tracking. For information about disabling this tracking, see [Browser SDK | Optional Tracking](/docs/sdks/analytics/browser/browser-sdk-2#optional-tracking) 
* [User Privacy API](/docs/apis/analytics/user-privacy) - API to delete all data for a set of known Amplitude IDs or User IDs.
* [Amplitude’s Stance on Security & Privacy](https://amplitude.com/amplitude-security-and-privacy)

## The Mixpanel import tool

Amplitude provides a tool that can import historical Mixpanel events into your Amplitude project. When you add your Mixpanel project's API key or service account credentials, this tool uses [Mixpanel's Export API](https://developer.mixpanel.com/reference/raw-event-export) to export event data from Mixpanel, and import it to your Amplitude project. The integration doesn't support user profile information.

If you need to import user profile information, Amplitude provides the following options:

* Export your data from Mixpanel with the Mixpanel [Export](https://developer.mixpanel.com/reference/raw-event-export) and [Engage](https://developer.mixpanel.com/reference/engage-query) APIs, and import it to Amplitude with the [Batch Event Upload API](/docs/apis/analytics/batch-event-upload).
* If you host your data in another external source, use the [Batch Event Upload API](/docs/apis/analytics/batch-event-upload) directly.
* Contact [Amplitude Support](mailto:support@amplitude.com) or your Amplitude account manager for custom services lead by Amplitude's Professional Services team.

### Troubleshooting

#### The import tool responds with an authentication error

Make sure you provide the correct authentication to the Mixpanel import tool.

If you use your Mixpanel project's API key, be sure to reference the correct project. Each project in Mixpanel has its own API key.

If you use a [Mixpanel service account](https://developer.mixpanel.com/reference/service-accounts), ensure you enter the credentials as follows:

| Service account value | Amplitude field                       |
| --------------------- | ------------------------------------- |
| Username              | The username field in the import tool |
| Password              | The API Key field                     |
| Project ID            | The Project ID field                  |

If you don't have the username and password for your Mixpanel project's service account, create a new service account associated with your project, and copy the values.

Ensure your Mixpanel service account has the necessary permissions to access the information you need. Test your credentials with [Mixpanel's Download Data page](https://developer.mixpanel.com/reference/raw-event-export). If the page responds with a `200` status, your service account has the necessary permissions.

#### The import tool doesn't complete or responds with a generic error

The data set may be too large to process. Try again with a more narrow time range.

#### The tool imports fewer transactions than it should

* Amplitude detects and excludes duplicate events. If your data contains a large number of duplicates, the events that Amplitude imports may be fewer than expected.

* Some Mixpanel events may not be compatible with Amplitude events due to missing information. If your Mixpanel instrumentation doesn't capture fields like `name`, `date`, or `device ID`, Amplitude may not import them.

## GDPR INFORMATION

Amplitude is fully GDPR compliant.

For more information about compliance, see [Security and Privacy](https://amplitude.com/amplitude-security-and-privacy).

Amplitude maintains a [user privacy API](/docs/apis/analytics/user-privacy) that allows you to service end user data deletion requests.

## Feedback or questions

For any feedback or questions on this implementation guide, submit them [here](https://forms.gle/EMh9JeNs1iNCQzx67).