---
title: "How to organize your team for implementation"
source: "https://help.amplitude.com/hc/en-us/articles/360039862012-How-to-organize-your-team-for-implementation"
id: 67184865-248e-4d6c-9a46-3e7495c2e072
---

#### This article will help you:

* Identify and understand team roles that are critical to successfully using Amplitude

As you prepare to implement Amplitude, it's important to assign these three roles to the members of your implementation team:

**Project Lead**

Also known as the Adoption Lead, this is usually the main point of contact between your company and Amplitude (especially if you've purchased a paid plan). Depending on the team that implements Amplitude, this role is often filled by a product manager or someone from the data science team.

Example tasks and responsibilities:

* Coordinate with your Success Manager (Growth/Enterprise plans only) to organize training or other workshops with your team(s).
* Drive Amplitude adoption and usage across teams at your company.
* Manage implementation where needed. For example, if you need to expand Amplitude to a new platform or product, you make sure a [tracking plan (taxonomy)](/data/data-planning-playbook) is built and engineering resources are available.

**Data Governor** 

This person is responsible for designing your team's tracking plan and, later on, maintaining your Amplitude data quality. This person will also need to be able to align your business goals to the data you need to track in Amplitude. The role is often filled by a product manager, an analyst or someone else from the data science team.

Example tasks and responsibilities:

* Establish a consistent naming convention and build the taxonomy you need to send data to Amplitude.
* Make sure what is tracked is in line with any privacy policies or legislation you need to adhere to.
* Design and manage the process for ongoing tracking development. For example, when a new feature is planned, the data governor challenges the product manager on measuring the success of that feature. Once you decide what to measure, you'll need to connect with an engineering resource to track the relevant events and properties to Amplitude.
* One data governor can oversee multiple products/projects or you can have one data governor per project.

**Instrumentation Lead**

The instrumentation lead is primarily responsible for instrumenting new Amplitude events. The role is often filled by a senior developer or dev lead, especially if data is sourced across multiple locations.

Example tasks and responsibilities:

* Acquire or have the expertise to instrument Amplitude events and, where needed, guide other developers on the topic.
* If data is sent from sources other than client-side SDKs, understand and document these sources and their constraints. For example, how "real-time" back-end data actually is.
* Work with the Data Governor to validate Amplitude data. Troubleshoot potential duplicate events and other data issues.
* Depending on your developer team structure, you can split this role by platform (IOS/Android/Web) or by product.
