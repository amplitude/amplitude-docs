---
id: 67184865-248e-4d6c-9a46-3e7495c2e072
blueprint: get-started
title: 'How to organize your team for implementation'
source: 'https://help.amplitude.com/hc/en-us/articles/360039862012-How-to-organize-your-team-for-implementation'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1716572397
this_article_will_help_you:
  - 'Identify and understand team roles that are critical to successfully using Amplitude'
ai_summary: |-
  In preparing to use Amplitude, you assign three key roles to your team:

  1. **Project Lead:** Main contact with Amplitude, organizes training, drives adoption.
  2. **Data Governor:** Designs tracking plan, ensures data quality, aligns business goals.
  3. **Instrumentation Lead:** Instruments new events, guides developers, validates data.

  Each role has specific tasks and responsibilities to help your team effectively implement and utilize Amplitude for tracking and analyzing data.
---
As you prepare to implement Amplitude, it's important to assign these three roles to the members of your implementation team:

## Project Lead

Also known as the Adoption Lead, this is usually the main point of contact between your company and Amplitude (especially if you've purchased a paid plan). Depending on the team that implements Amplitude, this role is often filled by a product manager or someone from the data science team.

Example tasks and responsibilities:

* Coordinate with your Success Manager (Growth/Enterprise plans only) to organize training or other workshops with your teams.
* Drive Amplitude adoption and usage across teams at your company.
* Manage implementation where needed. For example, if you need to expand Amplitude to a new platform or product, you make sure a [tracking plan (taxonomy)](/docs/data/data-planning-playbook) exists and engineering resources are available.

## Data Governor

This person is responsible for designing your team's tracking plan and, later on, maintaining your Amplitude data quality. This person must be able to align your business goals to the data you need to track in Amplitude. The role is often filled by a product manager, an analyst or someone else from the data science team.

Example tasks and responsibilities:

* Establish a consistent naming convention and build the taxonomy you need to send data to Amplitude.
* Make sure you aren't tracking data that may violate privacy policies or legislation you are subject to.
* Design and manage the process for ongoing tracking development. For example, when planning a new feature, the data governor challenges the product manager on measuring the success of that feature. Once you decide what to measure, connect with an engineering resource to track the relevant events and properties to Amplitude.
* One data governor can oversee multiple products/projects or you can have one data governor per project.

## Instrumentation Lead

The instrumentation lead is primarily responsible for instrumenting new Amplitude events. The role is often filled by a senior developer or dev lead, especially if data comes from multiple locations.

Example tasks and responsibilities:

* Ensure you have the expertise to instrument Amplitude events and, where needed, guide other developers on the topic.
* If data comes from sources other than client-side SDKs, understand and document these sources and their constraints. For example, how "real-time" back-end data actually is.
* Work with the Data Governor to validate Amplitude data. Troubleshoot potential duplicate events and other data issues.
* Depending on your developer team structure, you can split this role by platform (IOS/Android/Web) or by product.