---
id: 1dc8fb12-66f4-4ff0-bf73-e2e52fcd78b1
blueprint: experiment
title: 'Feature Experiment quick start'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753137993
---

Feature Experiment lets you run A/B tests and feature rollouts using [feature flags](/docs/feature-experiment/workflow/feature-flag-rollouts). The [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [REST API](/docs/apis/experiment) communicates with Amplitude Experiment to evaluate flags and deliver variants.

Setting up a Feature Experiment is a multi-stage process:

1. Install and set up SDKs and deployments.
2. Create feature flags.
3. Select the deployment and create a payload.
4. Create variations and send payloads.
5. Design the experiment.

{{partial:admonition type="warning" heading=""}}
This quick start guide contains only the basic information needed to implement Experiment. Go to the complete [Experiment documentation](/docs/feature-experiment/overview) to understand the full complexity of the product.
{{/partial:admonition}}

## Before you begin

Before you begin:

- Confirm you have developer write access to the [Experiment SDK](/docs/sdks/experiment-sdks).
- Ensure you have access to the Experiment feature.
- Ensure you have developer access to the application where you'll integrate your feature flags.

## Set up the SDK

Install the Amplitude SDK with the Experiment client. For example:

```bash
npm install @amplitude/analytics-browser @amplitude/experiment-js-client
```

```ts
import * as amplitude from '@amplitude/analytics-browser';
import { Experiment } from '@amplitude/experiment-js-client';
amplitude.init('AMPLITUDE_API_KEY');
const experiment = Experiment.initialize('DEPLOYMENT_API_KEY');
await experiment.start();
```

## Set up a deployment

Experiment uses the same projects as Amplitude Analytics. As a best practice, create one project for each product and each environment. Because flags, experiments, and deployments only exist within a single project, you must duplicate these objects across projects within the same product.

In Amplitude Experiment, a deployment serves a group of flags or experiments for use in an application. Each project has a deployment using the project API key as the deployment key, available by default. On creation, Experiment assigns a randomly generated deployment key to each deployment, which it uses to identify the deployment and authorize requests to the evaluation servers.

{{partial:admonition type="note" heading="Client compared to server deployments"}}
Deployments are either client or server deployments. Use client-side deployments to initialize client-side SDKs and server-side deployments to initialize server-side SDKs or authorize requests to the Evaluation API.
{{/partial:admonition}}

Deployments belong to Amplitude Analytics projects, and a project can have multiple deployments. Amplitude recommends naming deployments after the platform (client-side) or service (server-side) to which Experiment serves variants—for example, `android`, `ios`, or `web`. The default project API key deployment is useful for getting started. For larger organizations or teams that share the same Amplitude project across multiple platforms for the same application, use explicit deployments for each platform or service. Each deployment receives a unique key for use in your application.

### Create a deployment

1. Go to *Experiments > Deployments*.
2. Select **Create Deployment**.
3. Select the project you want from the dropdown list.
4. Name your deployment.
5. Select whether your deployment is for **Client** or **Server**.
6. Select **Create a Deployment**.

To learn more, go to [Configure your experiment](/docs/feature-experiment/workflow/configure).

## Create a new flag

A flag lets you enable or disable a function or feature in your product without deploying new code each time. Flags drive both experiments and feature rollouts. They're ideal for launching experiments, ending them after you've collected enough data, or rolling out new features—and rolling them back if needed.

### Create a feature flag

1. Go to *Experiment > Feature Flags*.
2. Select **Create Feature Flag**.
3. In the *Create Flag* section, select the project you want from the dropdown list and give your flag a name.
   Amplitude Experiment generates the flag key from the name you choose. The flag key identifies the flag in your codebase.
4. Specify the [evaluation mode](/docs/feature-experiment/local-evaluation) for your experiment. Select either **Remote** or **Local**.
5. Specify the **Bucketing Unit** you want to use for this experiment.

    {{partial:admonition type='tip'}}
    The best bucketing unit is typically the user. However, in some B2B use cases, you might want to use company ID or city as the bucketing unit. For example, bucketing by company ID ensures that all users in a particular company have the same experience. Ensure the [Stable Unit Treatment Value Assumption](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him) holds for whichever unit you choose.
    {{/partial:admonition}}

6. Select **Create**.
   Experiment opens a blank template for your flag.
7. Choose the deployment you want from the **Deployment** dropdown.
8. (Optional) Select **Advanced Settings** to modify the [bucketing salt](/docs/feature-experiment/implementation#consistent-bucketing) options.

{{partial:admonition type="note" heading=""}}
If you change the bucketing salt, users can switch between variants in your experiment. Amplitude recommends not changing the bucketing salt unless you understand the impact. To learn more, go to [How randomization works in Amplitude Experiment](/docs/feature-experiment/under-the-hood/experiment-randomization).
{{/partial:admonition}}

## Create variations

A variant exists within a flag or an experiment and represents a variable experience for a user. Variants comprise the A/B changes you want to experiment with. All feature flags must contain at least one variant. You can add as many variants as you want to a flag.

### Add a variant

1. Go to *Experiment > Feature Flags* and select your flag.
2. In the *Variants* section, select the **Plus** icon to create a variant.
3. Enter the name, value, and description of your variant.
4. Select **Apply**.

{{partial:admonition type='note'}}
You can send a payload with your variant. A payload is a JSON-coded set of variables that remotely changes flags and experiments without a manual code change. Because you can send a payload with your control, you don't need to create a variant for the control itself.

Add JSON content to the **Payload** field when creating a variant. Payload content is similar to:

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

## Add targeting to the flag

In the *Assignment* section, define the user segments you want to experience your new feature. Defining a user segment limits your rollout to users in specific geographical locations, certain demographic groups, or who meet certain usage thresholds in your product—for example, power users. To learn more about segmenting, go to [Define your audience](/docs/feature-experiment/workflow/define-audience).

### Add targeting

1. Specify the percentage of users receiving the variant.
2. To define a user segment, go to the *Rule Based User Segments* section and select **Segment 1**. Then follow the same steps you use to build a [user segment](/docs/analytics/charts/build-charts-modify-user-segment) in Amplitude Analytics.

## Finalize the flag

After you set up the flag, associate it with a deployment, set up your variants or payloads, and target your users, finalize the feature flag. Finalizing the flag activates it and makes it available.

### Finalize a feature flag

1. Go to your feature flag.
2. Select **Activate flag**.

## Design the experiment

You can directly create an experiment or convert an existing flag to an experiment.

When designing your experiment:

- Set metrics for the experiment.
- Set up any further variations and payloads.

Metrics let you track the success rate of your experiment. All experiments must have at least one metric. Define your primary metric and any secondary metrics. The primary metric determines whether your hypothesis is accepted or rejected, and therefore whether your experiment succeeded or failed.

### Add metrics

1. Open your experiment and navigate to the *Metrics* section.
2. Select your recommended metric from the **Metric** dropdown or create a custom metric.
3. Select the metric type using "should" or "should not":
    - **Should**: A success metric states the goal changes by the goal amount and direction.
    - **Should not**: A guardrail metric states the goal won't change by the goal amount and direction.
4. Specify whether you expect the metric to increase or decrease.
5. (Optional) Set the minimally acceptable goal for the experiment, also known as the [minimum detectable effect](/docs/feature-experiment/experiment-theory/experiment-set-mde). This is the minimum difference between the control and the variant for the experiment to be a positive result.
6. To add secondary metrics, select **Add Metric** and repeat this process for each additional metric.

### Add additional variations and payloads

Repeat the steps in [Create a new flag](#create-a-new-flag) to create additional variations and payloads.

## Start your experiment

After you complete designing your experiment, select **Start Experiment** to begin.

## Code examples

The following code examples show a feature flag and a JSON payload:

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

To run experiments on your website without code changes, go to [Web Experiment quick start](/docs/feature-experiment/web-experiment-quick-start).
