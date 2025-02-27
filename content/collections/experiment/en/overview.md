---
id: 8bfbe6f6-89ae-4878-abfe-89bcc113cddf
blueprint: experiment
title: Overview
source: 'https://help.amplitude.com/hc/en-us/articles/360061270232-Amplitude-Experiment-overview-Optimize-your-product-experience-through-A-B-testing'
this_article_will_help_you:
  - 'Understand the value of experimentation in general, and how Amplitude Experiment can help your company make better decisions and build better products'
  - 'Familiarize yourself with the concepts and processes involved in creating an experiment or feature flag in Amplitude Experiment'
landing: true
exclude_from_sitemap: false
updated_by: 13054dd3-3dcd-4d55-aaaf-13bb99388147
updated_at: 1740433491
sourxe: 'https://help.amplitude.com/hc/en-us/articles/360061270232-Amplitude-Experiment-overview-Optimize-your-product-experience-through-A-B-testing'
landing_blurb: 'Learn the value of experimentation in your product.'
---
For decades, product teams have relied on **experimentation** as a way to prioritize and implement product adjustments. But it’s never been easy. Because of that, these experiments often just tweak peripheral issues around the margins, instead of driving the big-picture changes that optimize the overall product experience.

Amplitude Experiment is a workflow-driven behavioral experimentation platform that actually **accelerates your roadmaps**, letting you focus on making better decisions and building better products.

With Experiment, you can easily **modify and configure product experiences** for unique audiences through:

* **Product experimentation**: Improve key KPIs by **running experiments and A/B tests** to onboard new users, reduce friction for checkout experiences, roll out new features, and more.
* **Progressive feature delivery:** Pre-plan and **stage new features** for beta testers, a percentage of your users, or even specific target audiences.
* **Dynamic in-product experiences:** Deploy and adapt **custom experiences** at scale.

Amplitude Experiment enables all this through **flags**—easy-to-set up switches that let you modify your product's experience without having to change code. Use them to set up experiments in your product, or to stage and roll out new features straight to your users. Your code uses the [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [REST API](/docs/apis/experiment) to communicate with Amplitude Experiment.

{{partial:admonition type='note'}}
Amplitude Experiment defaults to a **sequential testing** statistical model in all experiments, but you can opt for a [T-test](/docs/feature-experiment/experiment-theory/analyze-with-t-test) instead.
{{/partial:admonition}}

This article will provide a high-level overview of the Amplitude Experiment workflow: we’ll start with the workflow for **creating an experiment**, and follow that with the workflow for **creating a feature flag**.

## Creating an experiment: an overview

Many experimentation programs fail in the first step of the process—nobody can **articulate the problem** experimentation is supposed to solve. If you can’t explain—in clear, simple language—why you’re running an experiment, you can’t realistically hope to learn anything useful from it. 

Before doing anything else, spend some time coming up with a strong mission statement for your experiment. It should, at the very least, answer these two questions: What’s the problem, and how can running an experiment help you solve it? The effort you put in at this stage will pay big dividends later.

Once you’ve done that, you’re ready to **configure your experiment**. This means creating a new deployment (or choosing one you’ve created earlier) for the experiment, and installing the SDK you’ll be using.