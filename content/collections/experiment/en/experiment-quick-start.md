---
id: 1dc8fb12-66f4-4ff0-bf73-e2e52fcd78b1
blueprint: experiment
title: 'Experiment Quick Start'
this_article_will_help_you:
  - 'Setup the SDK and deployment for your experiments'
  - 'Create feature flags, variants, and payloads'
  - 'Design and implement the experiment'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753114211
---

Amplitude Experiment is a workflow-driven behavioral experimentation platform that accelerates the process of creating different variants of features and websites for experimentation.

With Experiment, you can modify and configure product experiences for unique audiences through:

* **Product experimentation**: running experiments and A/B tests to onboard new users, reduce friction for checkout experiences, roll out new features, and more.
* **Progressive feature delivery:** Pre-plan and stage new features for beta testers, a percentage of your users, or even specific target audiences.
* **Dynamic in-product experiences:** Deploy and adapt custom experiences at scale.

Amplitude Experiment enables experimentation through feature flags. Feature flags are switches that let you modify your product's experience without having to change code. Experiment and feature flags use the [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [REST API](/docs/apis/experiment) to communicate with Amplitude Experiment.

This quick start guide takes you through:
- SDK and deployment setup
- Creating feature flags
- Creating variations and sending payloads
- Designing experiments

{{partial:admonition type="warning" heading=""}}
This quick start guide is designed to provide the least amount of information needed to implement Experiment. Make sure you review the full set of documentation to understand the full set of Experiment features and functionality.
{{/partial:admonition}}

## Prerequisites
Before you can begin using experiments, you must first:

- Have access to the [Experiment SDK](/docs/sdks/experiment-sdks).
- Make sure you have access to the Experiment feature. 
- Ensure you have developer access to the application where you'll integrate your feature flags.

## Setting up the SDK

Install the Amplitude SDK with the Experiment client. For example, through javascript:
```bash

npm install @amplitude/analytics-browser @amplitude/experiment-browser

import * as amplitude from '@amplitude/analytics-browser'; import { Experiment } from '@amplitude/experiment-browser'; amplitude.init('AMPLITUDE_API_KEY');  const experiment = Experiment.initialize('EXPERIMENT_API_KEY'); await experiment.start();
```

