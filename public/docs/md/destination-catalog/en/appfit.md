---
id: b9792555-2543-447e-ab44-4446ea024765
blueprint: destination-catalog
title: Appfit
source: 'https://docs.developers.amplitude.com/data/destinations/appfit'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
  - cohorts
integration_category:
  - attribution
partner_doc_link: 'https://support.appsflyer.com/hc/en-us/articles/211200306-Amplitude-integration-with-AppsFlyer'
short_description: 'AppsFlyer helps brands make good choices for their business and their customers with its advanced measurement, data analytics, deep linking, engagement, fraud protection, data clean room, and privacy-preserving technologies.'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1729279891
partner_maintained: false
integration_icon: partner-icons/appfit.svg
---
Connect AppFit to your Amplitude account and get a top-level dashboard for your mobile phone, as well as weekly reminders to review your metrics. If you see a metric that doesn't look right, AppFit lets you flag it and add comments so everyone can discuss what's going on right from their phone.

## Before you begin

Keep these things in mind when sending events to AppFit:

* You must enable this integration in each Amplitude project you want to use it in.
* You need an AppFit account to enable this integration.
* Amplitude sends selected user, event, and group properties along with the event.

## Setup
For more detailed information on setting up this integration than what's contained in this section, see the Appfit documentation.

### Appfit setup

To configure an event streaming integration from Amplitude to Appfit, you need the Server Secret Key from Appfit.

### Amplitude setup

1. In Amplitude Data, navigate to *Catalog > Destinations*.
2. In the Event Streaming section, click *Appfit*.
3. Enter a sync name, then click *Create Sync*.
4. Toggle *Status* from disabled to enabled.
5. Paste your Appfit Server Secret Key.
6. Toggle the *Send events* filter to select the events to send. You can send all events, but Amplitude recommends choosing only the most important ones.
7. When finished, enable the destination and save.

## Typical use cases

### Early-stage teams

* Weekly metrics reviews for quick progress assessment
* Team goal-setting and progress tracking for alignment and focus
* Data automation from various sources to save time on data entry

### Mature development teams

* Focused metrics tracking to monitor specific product or business metrics
* Customized goal-setting for tailored objectives
* Progress visualization for data-driven decision making

### High-level executives

* Weekly business overview with key metrics and trends
* Goal tracking at a glance across departments or business units
* Timely reminders and notifications to make informed decisions