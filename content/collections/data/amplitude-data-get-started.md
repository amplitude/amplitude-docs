---
title: "Getting set up with Amplitude Data"
source: "https://help.amplitude.com/hc/en-us/articles/5078704508571-Getting-set-up-with-Amplitude-Data"
id: 1bca668a-d50d-4e07-a0a9-a77016d8d5d3
description: "Data ingestion methods, tracking plans, and best practices."
---

#### This article will help you:

* Decide on the best method for ingesting data into Amplitude
* Understand how to decide what you want to track
* Follow best practices during the Amplitude Data setup phase

Amplitude Data provides you with a complete set of tools for the entire lifecycle of your data, from planning and instrumentation, maintenance, and deprecation. We've designed the product to be flexible enough to accomodate various workflows, so you can choose which tools you need.

## Getting data into Amplitude

There are several different methods for getting data into Amplitude. You can collect data from your app using our [SDKs](/docs/get-started/get-data-in).

### Which ingestion method should you use?

There are a few things you should consider when deciding which ingestion method will work best for your organization.

#### Using Amplitude SDKs

Amplitude's SDKs are a great way to integrate if you're getting started with analytics. You'll have the option of using Ampli to keep your instrumentation clean from the start while still having the flexibility to send data to [various destinations](https://www.docs.developers.amplitude.com/data/destinations/ "https://www.docs.developers.amplitude.com/data/destinations/") later.

One decision you'll need to make when using our SDKs is whether to send events from the front-end clients or the back-end servers:

* **Client-side tracking**: In this method, you'd add client-side SDKs to your web and mobile apps. This method can be more straightforward, as you can take advantage of default event tracking and capture both client-side and server-side interactions with your application. However, events that span all your clients will require deployment changes across all your apps. On mobile, this can sometimes take time, depending on how log it takes your customers to update their apps.
* **Server-side tracking**: You can also send your events directly from your servers to Amplitude. For example, if you're tracking an order completion, you'd fire the event from the back-end server processing the order. This centralized approach is generally the most reliable, as you have a single place within your control sending the events. You also won't have to wait for your customers to update their app version.

We recommend implementing server-side tracking on events requiring high precision, while using client-side tracking for everything else.

#### Using cloud storage, warehouses, and event streaming

If you already have an existing source of reliable data, connecting to those sources can be the fastest way to get up and running with Amplitude. Customers often use these methods to connect with their current sources of truth and draw upon Amplitude's self-serve capabilities to expand data access across their company.

If you connect with an existing source, you can still use Amplitude's data management capabilities.

## What should you track?

An essential step to help maximize your data is identifying and planning the events and properties you want to track. A solid tracking plan ensures you can answer your business questions and prevent gaps and issues with your analyses.

Here are several resources to help you decide what to track, and to get you started on the right foot:

* If you want to get started as quickly as possible, start by reading up on [what events you'll need](/docs/get-started/select-events). This article provides recommendations on events and properties commonly asked in each industry.
* Check out our [data planning playbook](/docs/data/data-planning-playbook) if you want a deeper understanding of creating a taxonomy from scratch.
* If you've determined the events and properties you want to track and are looking for how to get them into Amplitude, see our article on [creating your tracking plan](/docs/data/create-tracking-plan).

## Best practices

Following these will help ensure good results, both initially and as you scale with Amplitude Data.

### Establish a naming convention

Simple, self-explanatory names that follow a consistent convention are essential to making your plan understandable across your organization. They're also necessary to prevent data quality issues. Two events with different capitalizations, such as `Song Played` and `song played`, will appear as two separate events.

You can set your naming convention in settings, and Amplitude Data will automatically prompt anyone creating events to follow that convention.

### Use a separate environment for testing

Keep your data clean by using separate projects for development and production. Different projects allow you to test your implementation without worrying about affecting your final business reports. It's also a great place to try the data management tools before applying them to your production data. See this article on [creating a project in Amplitude](/docs/get-started/create-project).
