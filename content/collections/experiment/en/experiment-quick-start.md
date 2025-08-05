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
updated_at: 1753137993
---

Experiment is a workflow-driven behavioral experimentation platform that accelerates the process of creating different variants of features and websites for experimentation.

With Experiment, you can modify and configure product experiences for unique audiences through:

* **Product experimentation**: running experiments and A/B tests to onboard new users, reduce friction for checkout experiences, roll out new features, and more.
* **Progressive feature delivery:** Pre-plan and stage new features for beta testers, a percentage of your users, or even specific target audiences.
* **Dynamic in-product experiences:** Deploy and adapt custom experiences at scale.

Experiment enables experimentation through feature flags. Feature flags are switches that let you modify your product's experience without having to change code. Experiments and feature flags use the [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [REST API](/docs/apis/experiment) to communicate with Amplitude Experiment.

Setting up an experiment is a multi-stage process encompassing the following procedures:
1. Installing and setting up SDKs and deployments
2. Creating feature flags
3. Selecting the deployment and creating a payload
4. Creating variations and sending payloads
5. Designing experiments

{{partial:admonition type="warning" heading=""}}
This quick start guide contains only the basic information needed to implement Experiment. Review the entire set of [Experiment documentation](docs/feature-experiment) to understand the full complexity of the product.
{{/partial:admonition}}

## Prerequisites

Before you can begin using experiments:

- Confirm you have developer write access to the [Experiment SDK](/docs/sdks/experiment-sdks).
- Make sure you have access to the Experiment feature. 
- Ensure you have developer access to the application where you'll integrate your feature flags.

## Setting up the SDK

Install the Amplitude SDK with the Experiment client. For example:

```bash
npm install @amplitude/analytics-browser @amplitude/experiment-browser
```

```ts
import * as amplitude from '@amplitude/analytics-browser'; 
import { Experiment } from '@amplitude/experiment-browser'; 
amplitude.init('AMPLITUDE_API_KEY');  
const experiment = Experiment.initialize('DEPLOYMENT_API_KEY'); 
await experiment.start();
```

## Setting up a deployment

Experiment uses the same projects as Amplitude Analytics. As a best practice, create one project for each product and each environment. Because [flags](#flags-and-experiments), [experiments](#flags-and-experiments), and [deployments](#deployments) only exist within a single project, you must duplicate these objects across projects within the same product.

In Amplitude Experiment, a deployment serves a group of flags or experiments for use in an application. Each [project](#projects) has a deployment using the project API key as the deployment key, available by default. On creation, a randomly generated deployment key is assigned to each deployment, which Experiment uses to identify the deployment and authorize requests to the evaluation servers.

{{partial:admonition type="note" heading="Client vs. server deployments"}}
Deployments are either client or server deployments. Use client-side deployments to initialize client-side SDKs and server-side deployments to initialize server-side SDKs or authorize requests to the Evaluation API.
{{/partial:admonition}}

Deployments belong to Amplitude Analytics projects, and a project can have multiple deployments. Amplitude recommends that you name deployments after the platform (client-side) or service (server-side) to which Experiment serves variants (for example: `android`, `ios`, `web`). The default project API key deployment is useful for getting started. However, you may find it useful to use explicit deployments for each platform or service for larger organizations or teams that may share the same Amplitude project across multiple platforms for the same application. Each deployment receives a unique key for use in your application.

##### To create a deployment

1. Go to *Experiments > Deployments*.
2. Click **Create Deployment**.
3. Select the project you want from the dropdown list.
4. Name your deployment.
5. Select whether your deployment is for **Client** or **Server**.
6. Click **Create a Deployment.**
For full details go to [Configure your experiment](/docs/feature-experiment/workflow/configure)

##  Creating a new flag

A flag is a way for you to enable or disable a function or feature in your product, without having to deploy new code each time. Flags drive both experiments and feature rollouts. They're ideal for launching experiments and ending them after you’ve collected enough data or for rolling out new features (and rolling them back, if needed).

##### To create a new feature flag

1. Go to *Experiment > Feature Flags*. 
2. Click **Create Feature Flag**.
3. In the Create Flag section, select the project yoou want from the dropdown list and then give your flag a name. 
Amplitude Experiment generates the flag key from the name you choose. The flag key is an identifier for the flag used in your codebase.
4. Specify the [evaluation mode](/docs/feature-experiment/local-evaluation) for your experiment. Select either **Remote** or **Local**. 
5. Specify the **bucketing unit** you want to use for this experiment.  
  
    {{partial:admonition type='tip'}}
    The best bucketing unit is typically the user. However, in some B2B use cases, you might want to use company ID or city as the bucketing unit. For example, bucketing by company ID ensures that all users in a particular company have the same user experience. Be sure the [Stable Unit Treatment Value Assumption](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him) holds for whichever unit you choose.
    {{/partial:admonition}}

6. Click **Create**. 
Experiment opens a blank template for your flag.
7. Choose the deployment you want from the Deployment dropdown menu. 
8. (*Optional*) Click **Advanced Settings** to modify the [bucketing salt](/docs/feature-experiment/implementation#consistent-bucketing) options. 
{{partial:admonition type="note" heading=""}}
If you change the bucketing salt, users will switch between variants in your experiment. For that reason, Amplitude recommends not to change the bucketing salt unless you know what you're doing. For more information, go to [How randomization works in Amplitude Experiment](/docs/feature-experiment/under-the-hood/experiment-randomization).
{{/partial:admonition}} 
 
 ## Creating variations

 A variant exists within a flag or an experiment, and represents a variable experience for a user. Variants comprise the actual A/B changes that you want to experiment with. All feature flags must contain at least one variant. You can add as many variants as you want to a flag. 

 ##### To add a variant

 1. Go to your *Experiment > Feature Flags* and select your flag.
 2. In the Variants section, click the **Plus** icon to create a variant.
 3. Enter the name, value, and description of your variant.
 4. In the Assignment section, define the **user segments** you want to experience your new feature. For more information on segmenting, go to [Define your Audience](/docs/feature-experiment/workflow/define-audience)
    1. Specify the percentage of users receiving the variant.
    Defining a user segment is useful if you’d like to limit your rollout to users in a specific geographical location, or those who belong to certain demographic groups, or those who meet certain usage thresholds in your product (for example power users).
    2. To define a user segment, go to the Rule Based User Segments section and click into **Segment 1**. Then follow the same steps you’d use to build a [user segment](/docs/analytics/charts/build-charts-modify-user-segment) in Amplitude Analytics.
 5. Click **Apply**.
 
 {{partial:admonition type='note'}}
If you want, you can send a payload with your variant. A payload is a JSON-coded set of variables that can remotely change flags and experiments without requiring a manual code change. Because you can send a payload with your control, it's not necessary to create a variant for the control itself. 

Add JSON content to the Payload field when creating a variant. Payload content is similar to: 
```json
{
  "layout": "cards",
  "titlePosition": "above",
  "gradient": false,
  "showDescription": true,
  "cardCount": 3 
}
```
{{/partial:admonition}}

##  Finalizing the flag

After you set up the flag, associate it to a deployment, set up your variants or payloads, and target your users, finalize the feature flag. 
Finalizing the flag activates and converts the flag to an actual experiment. 

##### To finalize a feature flag

1. Go to your feature flag.
2. Click **Activate flag**.
3. From the Activate flag dropdown, select **Convert to experiment**.

## Designing the experiment

After you convert your flag to an experiment, finalize the experiment. To finalize an experiment:
- Set a goal for the experiment
- Set up any further variations and payloads

Adding goals (or metrics) lets you track the success rate of your experiment. All experiments should have at least one goal. Tell Amplitude Experiment what you want your recommendation metric to be, as well as define any secondary metrics. The recommendation metric determines whether your hypothesis is accepted or rejected, and therefore, whether your experiment has succeeded or failed.

##### To add a goal

1. Open your experiment and navigate to the Goals section.
2. Select your recommended metric from the Metric dropdown or create a custom metric. 
2. Select the metric type: 
    - A Success metric states the goal changes by the goal amount and direction. 
    - A Guardrail metric states the goal won't change by the goal amount and direction.
3. Specify whether you’re expecting the metric to increase or decrease.
4. (_Optional_) Set the minimally acceptable goal for the experiment, otherwise known as the [minimum detectable effect](/docs/feature-experiment/experiment-theory/experiment-set-mde). This is the minimum amount of difference between the control and the variant there should be for the experiment to be considered a positive result.
5. To add secondary metrics, click **Add Metric** and repeat this process for each additional metric you want to include.

##### To add additional variations and payloads

Repeat the steps above in your flag to create additional variations and payloads.

## Starting your experiment

After you have completed designing your experiment, click **Start Experiment** to begin. 

## Code examples

The following code examples describe the code for a feature flag and a JSON payload:

{{partial:tabs tabs="Feature flag, Payload"}}
{{partial:tab name="Feature flag"}}

```js
import { useState, useEffect } from 'react';
import { getBlogLayoutFlag } from '../services/featureFlags'; // Adjust to wherever you fetch your Amplitude flag
import type { BlogPost } from '../types';

type LayoutFlag = {
  layout: 'cards' | 'list' | 'carousel';
  titlePosition: 'above' | 'below' | 'center';
  gradient: boolean;
  showDescription: boolean;
  cardCount: number;
};

export default function BlogPostLayoutClient({ posts }: { posts: BlogPost[] }) {
  const [layoutFlag, setLayoutFlag] = useState<LayoutFlag | null>(null);

  useEffect(() => {
    getBlogLayoutFlag().then((flag) => {
      console.log(':magic_wand: Received Flag from Amplitude:', flag);
      if (flag) {
        setLayoutFlag(flag);
      } else {
        console.log(':warning: No flag returned, falling back to default layout');
        setLayoutFlag({
          layout: 'cards',
          titlePosition: 'above',
          gradient: false,
          showDescription: true,
          cardCount: 3,
        });
      }
    });
  }, []);

  if (!layoutFlag) {
    // You might render a loader here
    return null;
  }

  // Render your posts according to layoutFlag...
  return (
    <div>
      {/* e.g. layoutFlag.layout === 'cards' ? <CardGrid posts={posts} /> : ... */}
    </div>
  );
}

```

{{/partial:tab}}
{{partial:tab name="Payload"}}

```js
// services/featureFlags.ts
import { experiment } from '@amplitude/experiment-js';  // adjust import to your SDK
import type { LayoutFlag } from '../types';              // reuse the same LayoutFlag type

export const getBlogLayoutFlag = async (): Promise<LayoutFlag> => {
  try {
    // In dev, clear any stale flags
    if (process.env.NODE_ENV === 'development') {
      localStorage.clear();
      console.warn('Cleared localStorage in dev mode');
    }

    // Initialize the experiment SDK
    await experiment.start();

    // Grab the variant for our blog layout test
    const variant = experiment.variant('blog_post_layout');
    console.log(':movie_camera: Full Variant Object:', variant);

    // Some payloads come in `payload`, some in `value`
    const value = variant?.payload ?? variant?.value;
    console.log('Cleaned Flag Payload:', value);

    // If there's no usable object, fall back to defaults
    if (!value || typeof value !== 'object' || Object.keys(value).length === 0) {
      console.warn('No valid layout flag found, using fallback layout');
      return {
        layout: 'carousel',
        titlePosition: 'above',
        gradient: false,
        showDescription: true,
        cardCount: 3,
      };
    }

    // Otherwise assume it's Amplitude's LayoutFlag shape
    return value as LayoutFlag;

  } catch (error) {
    console.error('Error fetching blog layout flag:', error);

    // On error, also fall back
    return {
      layout: 'carousel',
      titlePosition: 'above',
      gradient: false,
      showDescription: true,
      cardCount: 3,
    };
  }
};
```

{{/partial:tab}}
{{/partial:tabs}}
