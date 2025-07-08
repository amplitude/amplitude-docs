---
id: cd959cf2-2c2e-4672-9616-a5aa254e17c6
blueprint: under-the-hood
title: 'Performance and scaling'
source: 'https://help.amplitude.com/hc/en-us/articles/360061687371-Performance-and-scaling-in-Amplitude-Experiment'
this_article_will_help_you:
  - "Understand how Amplitude Experiment's architecture supports fast and reliable service"
  - 'Learn more about implementation recommendations to ensure the best experience'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716329160
ai_summary: "To run a successful experimentation program, you need a robust identity resolution system, user metadata access, and behavioral cohorts. Amplitude Experiment provides all three. For the best results, make individual user requests to Amplitude Experiment's endpoint. Use local defaults and client-side SDKs for improved performance. The architecture relies on Fastly CDN and reliable AWS services for high availability."
---
In order to run a powerful, insight-generating experimentation program, you’ll need three things:

* A robust identity resolution system
* Access to a store of user metadata
* Access to behavioral cohorts

If you’re looking to launch an experimentation program at your company, you should know that **Amplitude Experiment has all three**.

To get the most out of these capabilities, make a request to Amplitude Experiment’s endpoint for each individual user.

## Implementation recommendations

To provide the best experience to your users, we recommend the following:

* **Use local defaults**. All Amplitude SDKs support local defaults for experiments. To accommodate the rare occurrence that Amplitude’s systems might be down, we recommend using local defaults for all your experiments
* **Use local storage (cache) on Client SDKs**. Amplitude’s client-side SDKs store user variants in local storage. This can help reduce the number of network calls coming from the client. Read more about performance and caching [here](https://www.docs.developers.amplitude.com/experiment/general/performance-and-caching/).

## Architecture

The Amplitude Experiment architecture is built on two components:

* **Fastly CDN**. All requests to Amplitude servers are routed through Fastly, one of the best CDNs out there.
* **Reliable hosted AWS services**. Amplitude uses Application Load Balancer, Relational Databases, and DynamoDB, which guarantee high availability.

![experiment_architecture.png](/docs/output/img/under-the-hood/experiment-architecture-png.png)