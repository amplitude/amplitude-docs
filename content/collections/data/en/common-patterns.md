---
id: 00c34873-f370-41e4-a4ba-1f476bfb10ca
blueprint: data
title: 'Common Patterns'
landing: false
exclude_from_sitemap: false
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1764624798
---
Amplitude fits into many different data stacks. Most customers use one of four patterns:

1. Amplitude as the primary analytics destination.

2. Amplitude with a Customer Data Platform (CDP) such as Segment.

3. Amplitude with a data warehouse such as Snowflake, BigQuery, Redshift, or Databricks.

4. Amplitude with both a CDP and a data warehouse.

Across all four, Amplitude's web, mobile, and server SDKs give you a single way to collect events, power Session Replay, and then stream that same data to the rest of your stack through Event Stream and exports. After you instrument your product, you rarely need to change application code when you add new destinations.

You can instrument Amplitude Session Replay in several ways. For the browser you can use the Session Replay plugin for the Amplitude Browser SDK, a standalone Session Replay SDK, Google Tag Manager, or a Segment integration. For iOS, Android, and React Native you can use plugins that sit on top of Amplitude's analytics SDKs, standalone Session Replay SDKs, or Segment-based options.

Instrumenting Session Replay together with events gives you three main benefits:

* You can trace every chart, funnel, and cohort back to real user sessions so teams can watch what users actually did.

* Product and engineering teams can debug issues faster by combining quantitative signals such as drop offs or errors with qualitative evidence from replays.

* You get a single set of SDKs and privacy controls for both analytics events and replay, which simplifies governance.

The sections below describe how this works in each data stack pattern.

## Amplitude Only

![](statamic://asset::help_center_conversions::data/amplitude.png)

In this setup, Amplitude and its SDKs are your main event collection, Session Replay, and analytics layer.

### Data flow

Your website, mobile apps, and backend services send behavioral events directly to Amplitude using Amplitude SDKs or HTTP APIs. The same web and mobile SDKs can capture Session Replay data for selected sessions. Amplitude stores and processes everything for product analytics, experimentation, journey analysis, cohorts, and session-level insights. From there you can sync events, cohorts, and optionally selected replay links to downstream tools.

### Role of the SDKs and Session Replay

Because Amplitude SDKs collect events and replay, you can later turn on Event Stream and forward those same events from Amplitude to other tools such as a warehouse, CDP, or marketing systems, without changing tracking in your application. Session Replay shares the same user and session identifiers as your events, so product teams can move from a funnel in Amplitude to a specific session and watch what happened at a critical step.

### When this works well

This pattern is ideal when you're building a new analytics stack, don't yet have a central warehouse or CDP, and want to standardize tracking and replay quickly with one SDK implementation.

### Key benefits

* Fast time to value with minimal infrastructure.

* Single place to define events, properties, identities, and replay settings.

* Ability to use Event Stream from Amplitude as you add new tools later.

* Direct connection between quantitative analysis and qualitative replay for faster debugging and UX improvement.

## Amplitude with a CDP

![](statamic://asset::help_center_conversions::data/amplitude-cdp.png)

Here, a CDP is the primary collection and routing layer, and Amplitude is a downstream analytics and activation destination.

### Data flow

Your product sends events to the CDP using CDP SDKs. The CDP forwards a copy of those events to Amplitude and also routes them to marketing tools and ad platforms. Amplitude uses that behavioral data for product analytics, experimentation, cohorts, and activation.

You can instrument Session Replay in four main ways. The last method is with a CDP:

1. Using [Amplitude Session Replay SDK](/docs/session-replay/session-replay-standalone-sdk).

2. Using [Amplitude Session Replay Browser SDK plugin](/docs/session-replay/session-replay-plugin).

3. Using [Google Tag Manager](/docs/session-replay/session-replay-google-tag-manager).

4. Using [Segment](/docs/session-replay/session-replay-integration-with-segment).

This lets you keep the CDP as the central event router while still getting session-level visibility inside Amplitude.

### Role of the SDKs and Session Replay

Most customers either instrument events only through the CDP SDKs and use Amplitude's SDKs specifically for Session Replay and any extra product-only events, or combine CDP and Amplitude SDKs more broadly for redundancy and lower latency. In all cases Amplitude can still use Event Stream to forward its copy of events to other destinations.

### When this works well

This pattern is common when you've already deployed a CDP that owns identity resolution and audience syncs, and marketing teams are heavily invested in it. Amplitude becomes the main product analytics and Session Replay surface while the CDP remains the system through which events pass.

### Key benefits

* Single event schema in the CDP shared across Amplitude and marketing tools.

* Amplitude benefits from the CDP's unified identities while adding deep product analytics and replay.

* Ability to use Session Replay to explain patterns seen in CDP-driven campaigns and journeys.

* Option to stream Amplitude's enriched event data into other systems.

## Amplitude with a Data Warehouse

![](statamic://asset::help_center_conversions::data/amplitude-warehouse.png)

In this pattern, Amplitude is the product analytics and event collection layer, and the warehouse is the central storage and business intelligence layer.

### Data flow

Your applications send events and Session Replay data into Amplitude using Amplitude SDKs. Amplitude stores and processes events and replay for analytics and troubleshooting. Amplitude then exports raw or modeled event data to your warehouse on a schedule or through streaming. Business intelligence tools query the warehouse to combine Amplitude events with billing, CRM, support, and other data. You can activate this data out of the warehouse with a Reverse ETL tool like Hightouch.

### Role of the SDKs and Session Replay

Amplitude SDKs define a behavioral schema optimized for product analytics and replay. After you instrument, you don't need separate tracking for warehouse use. Events flow first into Amplitude, and then into the warehouse through exports or Event Stream. Session identifiers and user identifiers stay consistent across analytics in Amplitude and tables in the warehouse, so data teams can link warehouse-based models such as churn or lifetime value back to specific replays for qualitative investigation.

### When this works well

This pattern fits organizations where product teams rely on Amplitude for self-service analytics and debugging, while the data team uses the warehouse for cross-domain reporting and modeling.

### Key benefits

* One instrumentation path for both analytics and warehouse use.

* Warehouse receives clean event data that Amplitude has already validated.

* Data teams can join behavioral events with other domains while still using Amplitude for quick analysis and Session Replay.

* Replays give valuable context when investigating anomalies or model outputs discovered in warehouse-based dashboards.

## Amplitude with CDP and Data Warehouse

![](statamic://asset::help_center_conversions::data/amplitude-cdp-warehouse.png)

This pattern combines all three components. The CDP (or a CDI like Snowplow) is the real-time collection and routing layer, the warehouse is the long-term storage and modeling layer, and Amplitude is the product analytics, Session Replay, and activation layer.

### Data flow

Your applications send events into the CDP using its SDKs. The CDP forwards those events to Amplitude and to the warehouse. Amplitude instruments Session Replay through its own SDKs, plugins, or Segment-based integrations, and attaches replays to the sessions that originate from CDP events. The warehouse receives event data from the CDP or Amplitude, and data teams build models and aggregate tables there. You can send modeled attributes and scores back into Amplitude or the CDP with reverse ETL.

### Role of the SDKs and Session Replay

CDP SDKs typically provide the core event stream. Amplitude SDKs focus on Session Replay and any Amplitude-specific instrumentation that you choose to add. Amplitude can still stream enriched events and replay metadata to the warehouse or other tools. This gives you multiple controlled paths for data without duplicating tracking logic in code.

### When this works well

This pattern fits data-mature organizations where:

* The CDP owns event collection, identity resolution, and routing.

* The warehouse owns storage, modeling, and governance.

* Amplitude owns behavioral analytics, experimentation, Session Replay, and product-led activation.

### Key benefits

* Shared behavioral data across product, marketing, sales, and analytics teams.

* Strong governance for schemas and identities with clear ownership in CDP and warehouse.

* Session Replay directly tied to CDP-based journeys and warehouse-based models to explain the why behind metrics.

* Ability to stream Amplitude events and replay context to many downstream tools without new SDK work in the product.

## Choosing the Right Pattern

Many customers evolve through these patterns over time.

1. Start with Amplitude only and instrument both events and Session Replay with Amplitude SDKs to get quick value and a consistent behavioral model.

2. Add a CDP to standardize collection for marketing and other tools while still using Amplitude for analytics and replay.

3. Add a warehouse to centralize storage, join across systems, and support advanced modeling and business intelligence.

4. Connect all three so that the system best suited for each job handles collection, analytics, replay, and storage.

Across all four scenarios, Amplitude’s instrumentation layer for events and Session Replay is reusable and extensible. Once data flows into Amplitude, you can use Event Stream and exports to route events and replay context across your stack, so your architecture can evolve while your tracking plan remains stable.