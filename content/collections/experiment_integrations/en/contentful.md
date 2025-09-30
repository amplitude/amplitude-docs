---
id: 401dbba7-8405-4a22-96ff-5161ec1c969e
blueprint: experiment_integration
title: Contentful
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718575288
---
The Contentful plugin for Amplitude Experiment enables businesses to create variations of content in Contentful, and use Experiment to control which variant users experience, and track performance of those variants.

## Features

- Run A/B tests on Amplitude Experiment and author content in Contentful.
- Read different properties (refreshed every 5 seconds) from Amplitude Experiment and build your content around this information.

## Requirements

To use the plugin, ensure you have the following:

- Access to an Amplitude plan with Amplitude Experiment enabled.
- Your Amplitude Org URL value. This value appears in the URL you use to access Amplitude: `https://app.amplitude.com/experiment/<ORG_URL>/dashboard`
- A Management API key, which you can find in the Experiment side bar.

## Installation and use

Complete the following steps in Contentful and Amplitude to add and activate the Contentful plugin for Amplitude Experiment.

##### Install the plugin

1. Install the [plugin](https://www.contentful.com/marketplace/app/amplitude-experiment/) from the Contentful marketplace.
2. In the plugin configuration, enter the data center, Org URL and Management API key you created in Experiment. 
3. Click **Install to selected environments**.
4. Click **Save** to complete the plugin setup.

When you enable the plugin, a `Variant Container` content model appears on the Content Model tab.

### Adding a variant container to one of your content models

The variant container in Contentful works with Amplitude Experiment to decide which variant of your experiment displays to each user.

For best results, Amplitude recommends you a **Reference** content type to hold experiments. In the Reference content type

##### To add a variant container

1. Open the content model of the page to which you'll add the variant container.
2. Click **Add field**. Select a **Reference** field.
3. Provide a name for the field. For best results, enter a name that corresponds with the purpose of the field. For example, `Hero Banner` or `Demo CTA`.
4. Select **One reference** as the Type. 
5. Click **Add and configure.**
6. On the Name and field ID tab of the field configuration, select **Accept only specified entry type**, and then select **Variant container**. 
This ensures consistency with the Contentful API response when it serves page content.
7. Click **Confirm** to create the field and then click **Save** to update the content model.

### Adding content

After you configure the variant container and reference field, open the page on which you want to add an experiment.

##### To add content to your experiment

1. In the Content editor, select the page.
2. Find the field you created in the previous step and click the associated **Add content** selector. 
3. Select **Variant Container** as the content to add.
4. In the field configuration, enter the **Flag Key** of the experiment. The Flag Key field shows matching keys as you type.
5. When you select the Flag Key, any variants associated with that key appear in the **Variants** section.
6. For each variant, select either **Link an existing entry** or **Create new content type** to populate the variant.
7. Click **Publish** to publish the variant container.
8. Click **Publish** to publish the updated page with the experiment enabled.

### Integrate with your front end

Contentful returns JSON when a user requests the page.

```json
{
 "__typename": "PageLanding",
 "sys": {
   "id": "2cayfg7wVF5WezADCHgSgL",
   "spaceId": "4y4crvvoco9a"
 },
 "internalName": "Homepage",
 "heroBanner": {
   "__typename": "VariationContainer",
   "experiment": {
     "id": "183980",
     "key": "contentful-hero-banner",
     "name": "contentful-hero-banner",
     "tags": [],
     "state": "running",
     "deleted": false,
     "enabled": true,
     "endDate": null,
     "decision": null,
     "variants": [
       {
         "key": "control"
       },
       {
         "key": "treatment"
       }
     ],
     "projectId": "289220",
     "startDate": "2024-02-22",
     "deployments": ["14"],
     "description": "",
     "bucketingKey": "amplitude_id",
     "bucketingSalt": "28fWNw1M",
     "bucketingUnit": "User",
     "decisionReason": null,
     "evaluationMode": "remote",
     "experimentType": "hypothesis-testing",
     "rolloutWeights": {
       "control": 1,
       "treatment": 1
     },
     "targetSegments": [],
     "stickyBucketing": false,
     "rolledOutVariant": null,
     "rolloutPercentage": 0
   },
   "experimentId": "contentful-hero-banner",
   "meta": {
     "control": "6rmYK8YKYtTkKcFRY9Pf2w",
     "treatment": "kwDjI2f2vKE2GvQoeqq1d"
   },
   "variationsCollection": {
     "items": [
       {
         "__typename": "Hero",
         "sys": {
           "id": "6rmYK8YKYtTkKcFRY9Pf2w",
           "spaceId": "4y4crvvoco9a"
         },
         "preHeadline": "Organic Products",
         "headline": "100% Fresh Food",
         "cta": "Shop Now",
         "description": "Whatever you want from your local stores, brought right to your door. \t\t\t\t\t\t\t",
         "image": {
           "__typename": "Asset",
           "sys": {
             "id": "6PkraSxWWd96AU6FTYVssd"
           },
           "title": "Fresh food",
           "description": "",
           "width": 2560,
           "height": 960,
           "url": "https://images.ctfassets.net/4y4crvvoco9a/6PkraSxWWd96AU6FTYVssd/69b8d7f7cabb9f578097d50f2bf8aa70/Hero-3-1-scaled.jpg",
           "contentType": "image/jpeg"
         }
       },
       {
         "__typename": "Hero",
         "sys": {
           "id": "kwDjI2f2vKE2GvQoeqq1d",
           "spaceId": "4y4crvvoco9a"
         },
         "preHeadline": "Exclusive Offer",
         "headline": "Loyalty Program",
         "cta": "Get Free Shipping",
         "description": "We missed you! Finish your order today and get free shipping when you join our loyalty program.",
         "image": {
           "__typename": "Asset",
           "sys": {
             "id": "6WFOK0460CwrW7aChl1QjM"
           },
           "title": "Loyalty Green",
           "description": "",
           "width": 1920,
           "height": 720,
           "url": "https://images.ctfassets.net/4y4crvvoco9a/6WFOK0460CwrW7aChl1QjM/e52fb2129b848203f6006ff9881309d9/Hero-_-loyalty-green.jpg",
           "contentType": "image/jpeg"
         }
       }
     ]
   }
 }
}
```

The `experiment` object contains helpful metadata about the experiment. To render the front end and include the experiment, use the `meta` and `variationsCollection` objects. Amplitude Experiment delivers the variant identifier, and matches it to an option in the `meta` object. After you set the variant, you can:

- Iterate through items in the `variationsCollection` object to show the variation with the matching ID. 
- Make a direct call to Contentful with the variant ID to avoid searching through the array.

For more information, review the following React / Typescript example:

```typescript
import React, { useEffect, useState } from 'react';
import { Experiment } from '@amplitude/experiment-js-client';
import sdk from 'contentful-sdk';

// --- Types (adjust to your schema) ---
type Hero = {
  __typename: 'Hero';
  sys: { id: string };
  // ...other fields you render
};

type HeroBanner = {
  experimentId?: string; // key you use in Amplitude Experiment
  meta?: Record<string, string>; // maps variant key -> variation id
  variationsCollection?: { items: Array<Hero | null | undefined> };
};

// --- Experiment init ---
const CLIENT_KEY = process.env.NEXT_PUBLIC_AMPLITUDE_EXPERIMENT_CLIENT_KEY ?? '';
export const experiment = Experiment.initialize(CLIENT_KEY, {
  // Only enable verbose logging in dev if you like:
  debug: process.env.NODE_ENV !== 'production',
});

// --- Component hook snippet ---
export function useHeroVariant(userId: string | undefined) {
  const [hero, setHero] = useState<Hero | null>(null);

  useEffect(() => {
    // Skip until we have a user id
    if (!userId) return;

    let isMounted = true;

    (async () => {
      try {
        // 1) Fetch variants for this user
        await experiment.fetch({ user_id: userId });

        // 2) Load the banner/experiment mapping from Contentful
        const heroBanner = await sdk.getEntry<HeroBanner>('ENTRY_ID_HERE');
        if (!heroBanner) return;

        // 3) Resolve the variant key from the experiment
        const experimentKey = heroBanner.experimentId ?? 'control';
        const { value: variantKey } = experiment.variant(experimentKey);
        if (!variantKey) return;

        // 4) Map the variant key -> variation id via Contentful metadata
        const variationId = heroBanner.meta?.[variantKey];
        if (!variationId) return;

        // 5) Find the matching Hero item
        const match = heroBanner.variationsCollection?.items.find(
          (item): item is Hero =>
            !!item &&
            item.__typename === 'Hero' &&
            item.sys?.id === variationId
        ) ?? null;

        if (isMounted) setHero(match);
      } catch (err) {
        // Consider forwarding to your logger
        console.error('Failed to resolve hero variant', err);
        if (isMounted) setHero(null);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [userId]); // Note: don't include heroBanner (it's local) or setHero

  return hero;
}
```

Be sure to account for cases where users receive `off` as the value that `experiment.variant()` returns.