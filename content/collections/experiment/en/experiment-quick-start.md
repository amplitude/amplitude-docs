---
id: 1dc8fb12-66f4-4ff0-bf73-e2e52fcd78b1
blueprint: experiment
title: 'Experiment Quick Start'
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
* **Web experimentation**: Perform A/B testing directly on your website.

Experiment enables experimentation through either Feature Experiment or Web Experiment: 

* Feature Experiment enables experimentation through [feature flags](/docs/feature-experiment/workflow/feature-flag-rollouts). Feature flags are switches that let you modify your product's experience without having to change code.
* Web Experiment enables experimentation through the [Visual Editor](/docs/web-experiment/set-up-a-web-experiment#the-visual-editor). The Visual Editor places a dynamic, customizable layer over your existing website. Through the Visual Editor, you can customize any element of your website without having to make changes directly to the site's underlying code or structure.  

For more information about the use cases for each type of experimentation, go to [Feature and Web Experiment Use Cases](/docs/feature-experiment/feature-vs-web-experimentation).

This page is divided into quick start information for Feature and for Web Experiment. Click the tab for the experiment type you want to set up.

{{partial:admonition type="warning" heading=""}}
This quick start guide contains only the basic information needed to implement Experiment. Review the entire set of [Experiment documentation](/docs/feature-experiment/overview) to understand the full complexity of the product.
{{/partial:admonition}}

{{partial:tabs tabs="Feature Experiment, Web Experiment"}}
{{partial:tab name="Feature Experiment"}}

 Experiments and feature flags use the [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [REST API](/docs/apis/experiment) to communicate with Amplitude Experiment.

Setting up an experiment is a multi-stage process encompassing the following procedures:
1. Installing and setting up SDKs and deployments
2. Creating feature flags
3. Selecting the deployment and creating a payload
4. Creating variations and sending payloads
5. Designing experiments

## Prerequisites

Before you can begin using experiments:

- Confirm you have developer write access to the [Experiment SDK](/docs/sdks/experiment-sdks).
- Make sure you have access to the Experiment feature. 
- Ensure you have developer access to the application where you'll integrate your feature flags.

## Setting up the SDK

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

## Setting up a deployment

Experiment uses the same projects as Amplitude Analytics. As a best practice, create one project for each product and each environment. Because [flags](#flags-and-experiments), [experiments](#flags-and-experiments), and [deployments](#deployments) only exist within a single project, you must duplicate these objects across projects within the same product.

In Amplitude Experiment, a deployment serves a group of flags or experiments for use in an application. Each [project](#projects) has a deployment using the project API key as the deployment key, available by default. On creation, a randomly generated deployment key is assigned to each deployment, which Experiment uses to identify the deployment and authorize requests to the evaluation servers.

{{partial:admonition type="note" heading="Client vs. server deployments"}}
Deployments are either client or server deployments. Use client-side deployments to initialize client-side SDKs and server-side deployments to initialize server-side SDKs or authorize requests to the Evaluation API.
{{/partial:admonition}}

Deployments belong to Amplitude Analytics projects, and a project can have multiple deployments. Amplitude recommends that you name deployments after the platform (client-side) or service (server-side) to which Experiment serves variants (for example: `android`, `ios`, `web`). The default project API key deployment is useful for getting started. Try to use explicit deployments for each platform or service for larger organizations or teams that may share the same Amplitude project across multiple platforms for the same application. Each deployment receives a unique key for use in your application.

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
3. In the Create Flag section, select the project you want from the dropdown list and then give your flag a name. 
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
If you change the bucketing salt, users can switch between variants in your experiment. For that reason, Amplitude recommends not to change the bucketing salt unless you know what you're doing. For more information, go to [How randomization works in Amplitude Experiment](/docs/feature-experiment/under-the-hood/experiment-randomization).
{{/partial:admonition}} 
 
 ## Creating variations

 A variant exists within a flag or an experiment, and represents a variable experience for a user. Variants comprise the actual A/B changes that you want to experiment with. All feature flags must contain at least one variant. You can add as many variants as you want to a flag. 

 ##### To add a variant

 1. Go to your *Experiment > Feature Flags* and select your flag.
 2. In the Variants section, click the **Plus** icon to create a variant.
 3. Enter the name, value, and description of your variant.
 4. Click **Apply**.
 
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

## Add Targeting to the flag

In the Assignment section, define the user segments that you want to experience your new feature. Defining a user segment limits your rollout to users in specific geographical locations, certain demographic groups, or who meet certain usage thresholds in your product (for example power users). For more information on segmenting, go to [Define your Audience](/docs/feature-experiment/workflow/define-audience). 

##### To add targeting
1. Specify the percentage of users receiving the variant.
2. To define a user segment, go to the Rule Based User Segments section and click **Segment 1**. Then follow the same steps you’d use to build a [user segment](/docs/analytics/charts/build-charts-modify-user-segment) in Amplitude Analytics.

##  Finalizing the flag

After you set up the flag, associate it to a deployment, set up your variants or payloads, and target your users, finalize the feature flag. 
Finalizing the flag activates it and makes it available. 

##### To finalize a feature flag

1. Go to your feature flag.
2. Click **Activate flag**.

## Designing the experiment

You can directly create an experiment or convert an existing flag to an experiment. 

Remember when designing your experiment: 
- Set metrics for the experiment
- Set up any further variations and payloads

Adding goals (or metrics) lets you track the success rate of your experiment. All experiments should have at least one metric. Tell Amplitude Experiment what you want your primary metric to be, as well as define any secondary metrics. The primary metric determines whether your hypothesis is accepted or rejected, and therefore, whether your experiment has succeeded or failed.

##### To add metrics

1. Open your experiment and navigate to the Metrics section.
2. Select your recommended metric from the Metric dropdown or create a custom metric. 
2. Select the metric type using "should" or "should not": 
    - "Should": A Success metric states the goal changes by the goal amount and direction. 
    - "Should not": A Guardrail metric states the goal won't change by the goal amount and direction.
3. Specify whether you’re expecting the metric to increase or decrease.
4. (_Optional_) Set the minimally acceptable goal for the experiment, otherwise known as the [minimum detectable effect](/docs/feature-experiment/experiment-theory/experiment-set-mde). This is the minimum amount of difference between the control and the variant for the experiment to be considered a positive result.
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

{{/partial:tab}}
{{partial:tab name="Web Experiment"}}

Web Experiment requires that you implement the Web Experiment script on your site before you begin. 

Paste the script into the `<head>` element of your site, as high as possible to avoid flickering.

The script tracks [impression events](/docs/web-experiment/tracking#impressions) with the [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) already installed on your site, or a [third-party analytics SDK](#integrate-with-a-third-party-cdp).


## Add the experiment script

Replace `API_KEY` with your project's API key in one of the synchronous scripts below, depending on your region:

{{partial:tabs tabs="US Data Center, EU Data Center"}}
{{partial:tab name="US Data Center"}}
```html
<script src="https://cdn.amplitude.com/script/API_KEY.experiment.js"></script>
```
{{/partial:tab}}
{{partial:tab name="EU Data Center"}}
```html
<script src="https://cdn.eu.amplitude.com/script/API_KEY.experiment.js"></script>
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading="Security headers"}}
Your site may need the following security header adjustments to work with Web Experiment.

{{partial:tabs tabs="Content Security Policy, Cross-Origin-Opener-Policy"}}
{{partial:tab name="Content Security Policy"}}
If your site defines the `script-src` content policy directive, add `*.amplitude.com` and `unsafe-inline` to the policy values. These changes enable loading the Web Experiment script and visual editor on your site.

```text
Content-Security-Policy: script-src *.amplitude.com unsafe-inline;
```
{{/partial:tab}}
{{partial:tab name="Cross-Origin-Opener-Policy"}}
If your site sets the `Cross-Origin-Opener-Policy` header, you can either remove it or set it to `unsafe-none`. This allows the visual editor to load on your site.

```text
Cross-Origin-Opener-Policy: unsafe-none
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:admonition}}

## Set up a web experiment

To set up a web experiment, follow these steps:

1. In Amplitude Experiment, navigate to *Experiments > Create Experiment > Web Experiment*.
2. In the New Experiment modal, give your experiment a name. Enter the URL of a page this experiment targets. Amplitude must be instrumented on that page—and select the appropriate project from the drop-down. This URL will be used to create your first [Page](/docs/web-experiment/pages).
3. If the script is present on the page you specified, Amplitude Experiment opens the page in the [Visual Editor](#the-visual-editor), as a new variant in your experiment.

    You have two options for the treatment variant action: [element changes](/docs/web-experiment/actions#element-changes) or [URL redirect](/docs/web-experiment/actions#url-redirect).

    ![web-exp-1.png](/docs/output/img/workflow/web-exp-1.png)

    {{partial:admonition type='warning'}}
    If the script isn’t present on the page you specify, or if you have an ad blocker or other privacy extension enabled, Amplitude Experiment can’t open the Visual Editor, and opens the Site Setup panel and prompt you to [implement](/docs/web-experiment/implementation) the script.
    {{/partial:admonition}}

4. To change text, colors, or other elements of the page’s UI, click *Element Changes*.
5. Click the element you want to change.
6. The editing toolbar opens beside the selected element with quick actions such as editing the element’s content, or [move element](/docs/web-experiment/set-up-a-web-experiment#move).

    ![](statamic://asset::help_center_conversions::workflow/web-exp-2-update.png)    

    Clicking the expand icon opens the drawer allowing you to edit CSS style properties. When you're done, click *Apply*.

    ![web-exp-3.png](/docs/output/img/workflow/web-exp-3.png)

7. Repeat this process for each element you want to change for your experiment.
8. If needed, click *+* to add another variant.
9. When you’re done, click *Continue*.
10. Next, [define your experiment's goals](/docs/feature-experiment/workflow/define-goals).
11. In the *Pages* tab, configure which [Pages](/docs/web-experiment/pages) your experiment should target. You can create new Pages or reuse existing saved Pages. If you're only targeting the page you originally set on creation, you can skip this step. From the *Include pages where* dropdown, specify how you want Amplitude Experiment to identify these pages.

    ![web-exp-4.png](/docs/output/img/workflow/web-exp-4.png)

    Use the same pattern to exclude experiment from the pages you select. Learn more about [managing Pages](/docs/web-experiment/pages) for precise experiment targeting.

12. Next, target the users you want to include in this experiment. If you're familiar with feature experiment targeting, Web Experiment [audience targeting](/docs/web-experiment/targeting#audience-targeting) works differently.
13. The *Advanced* tab provides several [additional options](/docs/feature-experiment/workflow/finalize-statistical-preferences) for your experiment.
14. When you’re ready, click *Save and Close* to finish creating your Web Experiment.

{{partial:admonition type="tip" heading="Create a new run of an existing experiment"}}
If you have an experiment that you need to re-run, review [New Experiment Run](/docs/feature-experiment/troubleshooting/new-experiment-run)
{{/partial:admonition}}

### Test and preview your web experiment

Before running your web experiment, Amplitude recommends that you test and preview each variant. When you're ready:

1. Click *Test & Preview*. This puts your experiment in test instrumentation mode, but it **doesn't** start your experiment. Only users who open the page with the preview link can view your changes.
2. In the modal, click *Preview* to open a new tab that applies the changes you made for that variant. Click the chain link icon to copy the URL so you can share it with others.

Test each variant at least one time, preferably more. Test each variant on more than one page if your experiment targets multiple pages.

If your changes aren't apparent, you may need to wait up to 60 seconds for caches to refresh. If the changes don't appear correctly after that time, there might be something wrong with the configuration.

{{partial:admonition type="warning" heading="Ad blockers"}}
Ad blocking plugins or extensions may prevent you from testing and previewing your experiment.
{{/partial:admonition}}

## Adding Actions

Actions define how variants modify your site. Actions relate to variants rather than a specific page, and are applied to specific [Pages](/docs/web-experiment/pages) to control exactly where they apply.

Experiment applies variant actions during evaluation. This happens on the initial page load and any time state pushes to or pops from the session history. History state changes also cause the SDK to revert all applied element change and custom code actions before reevaluating and reapplying actions with the update page in mind.

Actions include: 

* [Element changes](/docs/web-experiment/actions#element-changes)
* [URL redirects](/docs/web-experiment/actions#url-redirect)
* [Custom code](/docs/web-experiment/actions#custom-code)

Click through the above links for more information about each action.

### Action examples

{{partial:admonition type="tip"}}
Generative AI like ChatGPT or equivalents can create HTML and CSS for simple elements. The modal and banner examples below were both initially generated initially by ChatGPT, then modified.
{{/partial:admonition}}

#### Insert an element

To insert an element onto your page, follow this simple pattern.

1. Write the HTML and CSS for the element you want to add to the page.
2. Identify the selector of the part element you want to insert your new element into. This is often just the `body`.
3. Paste the following JavaScript code, and update `PARENT_SELECTOR` with the parent element selector from step 2.

    ```js
    utils.waitForElement("PARENT_SELECTOR")
      .then(function (e) {
        e.appendChild(html);
        utils.remove = function () {
            html.remove();
        }
      });
    ```

If you want to insert your element into the parent element at a specific position, use `insertBefore()` instead of `appendChild()`.

#### Add a banner

This example adds a discount code banner to the top of the page.

{{partial:tabs tabs="JS, CSS, HTML"}}
{{partial:tab name="JS"}}
```js
utils.waitForElement("body")
  .then(function (e) {
    e.insertBefore(html, e.firstChild);
    utils.remove = function () {
      html.remove();
    }
  });
```
{{/partial:tab}}
{{partial:tab name="CSS"}}
```css
.announcement-banner {
 background-color: #fafafa;
 color: #333;
 padding: 10px;
 text-align: center;
 font-family: Arial, sans-serif;
 border-bottom: solid #e5e5e5;
 border-bottom-width: 1px;
}

.announcement-banner p {
 margin: 0;
 font-size: 16px;
}
```
{{/partial:tab}}
{{partial:tab name="HTML"}}
```html
<div class="announcement-banner">
 <p>🎉 Big Sale: Get 25% off on all items! Use code <strong>SAVE25</strong></p>
</div>
```
{{/partial:tab}}
{{/partial:tabs}}

## Working with pages

In a Web Experiment, Pages control where your experiment variants apply on your site. They help scope experiments to specific URLs, enabling you to run tests on targeted pages, without impacting unrelated parts of your site.

A Page defines the conditions under which a web experiment applies to your site, and includes:

* A unique name
* URL targeting conditions
* A Visual Editor URL to help preview the experiment

### Create a page

When you create a new Web Experiment, specify a page by:

* **Manual URL input**: Enter a specific URL to define the page.
* **Import a saved page**: Select a page from a previous experiment.

After you add the page, continue with experiment setup, or go directly to the Visual Editor.

### Update a page or create another

To update a page definition, navigate to the Pages tab of the Experiment Setup flow, or click the pencil icon on the Pages section of the Settings tab. From there, rename the page, update its Visual Editor URL, or update the page targeting rules.

#### Page targeting rules

| Operator            | Description                                                            | Examples                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| URL Matches         | Match the page URL, ignore query parameters or hash fragments.         | `https://example.com/pricing` <br /> ✅ https://example.com/pricing#details <br /> ❌https://example.com/pricing/enterprise                    |
| URL Matches Exactly | Match the full page URL exactly.                                       | `https://example.com/pricing?utm_source=facebook` <br /> ❌https://example.com/pricing <br /> ❌ https://example.com/pricing?utm_source=tiktok |
| URL Matches Pattern | Match the full page URL, including wildcards (`*`).                    | `https://example.com/blog/*` <br /> ✅ https://example.com/blog/my-first-post <br /> ✅ https://example.com/blog/my-second-post#get-started    |
| URL Contains        | Match the full page URL, where the URL contains a specific substring.  | `/blog/my-first` <br /> ✅ https://example.com/blog/my-first-post <br /> ❌ https://example.com/blog/my-second-post                            |
| URL Starts With     | Match the full page URL, where the URL starts with an exact substring. | `https://example.com/blog` <br /> ✅ https://example.com/blog/my-first-post <br />❌ https://example.com/pricing                               |
| URL Ends WIth       | Match the full page URL, where the URL ends with an exact substring.   | `/blog/my-first-post` <br /> ✅ https://example.com/blog/my-first-post <br /> ❌ https://example.com/blog/my-first-post#get-started            |
| URL Matches Regex   | Match the full page URL with a regular expression you define.          | [Learn Regex](https://www.regular-expressions.info/quickstart.html) <br /> [Test Regex](https://regex101.com/)                               |


### Manage page scope for variants

In a web experiment, you can scope each variant to a specific page to ensure that the variants changes apply only where you intend. This is the case for all variant types.

#### Visual editor

When you use the Visual Editor to make changes, for example text edits or style updates, those changes associate with the page you select during the preview session. For each change, specify the page or pages it applies to.

This enables you to:

* Assign updates or changes to a specific page
* Avoid applying the same change across all views
* Maintain better isolation and clarity across your experiment setup

{{partial:admonition type="tip" heading="Double-check the page scope"}}
Check the page scope for each change to ensure you don't introduce cross-page conflicts or unintended edits.
{{/partial:admonition}}

#### Custom code

When you add custom code or URL redirects as variants, you can explicitly define which page or pages the variant applies to.

This enables you to create a single experiment that includes custom code with different behaviors, depending on the active page.

## Targeting

Web Experiments target both pages and audiences. Amplitude evaluates first page targeting and then audience targeting. Both targeting methods evaluate locally in the browser when the page first loads.

Web Experiments use [Pages](/docs/web-experiment/pages) to precisely control where experiment variants apply on your website. Pages define the conditions under which a web experiment should apply, including targeting conditions to match specific URLs and visual editor URLs for previewing experiments.

### Audience targeting

By default, a new Web Experiment targets all users. Audience targeting enables you to target specific users for your experiment. Users who aren't targeted in the experiment receive the default experience and don't count towards analysis.

If any segments match, Amplitude buckets that user into a variant based on the configured rollout and variant distribution. For a segment to match, it must meet all conditions you set. Go to[ Web Experiment targeting](/docs/web-experiment/targeting) for more details. 

### Web Experiment performance

Web Experiment intentionally minimizes its impact on page performance.

### Script size

The Web Experiment script is dynamic, and includes all your experiment configurations to avoid making multiple synchronous downloads. This means that the script size starts with a base size, and scales with each experiment.

|               | Uncompressed | Compressed |
| ------------- | ------------ | ---------- |
| Base script   | 79KB         | 20KB       |
| Per-flag size | ~1KB         | ~100B      |

To avoid constantly increasing script sizes, deactivate or archive experiments when they're complete. 

{{partial:admonition type="note" heading="Custom code impact on flag size"}}
Custom code increases the size of a flag's code because of the size of the custom code itself.
{{/partial:admonition}}

### Caching

Web Experiment uses two layers of caching: CDN and Browser. This helps to provide more reliable script delivery to your site.

#### CDN cache

Amplitude caches the Web Experiment script on a CDN. When a user requests the script, their browser loads it from the CDN if another user loaded it in the same geographic area. The CDN cache has a max age of one minute, and serves stale content while the script reloads for up to one hour. The script serves a stale response if the origin returns an error for the maximum amount of time possible.

The cache control response header that configures CDN caching is:

`max-age=60,stale-while-revalidate=3600,stale-if-error=31536000`

#### Browser cache

The browser cache serves the Web Experiment script without making a network request for 60 seconds, or the maximum amount of time if the server returns an error. This caching layer serves the script from memory (0ms latency) if a user loads multiple pages on your site, or reloads the same page within a one minute window.

The cache control response header that configures browser caching is:

`max-age=60,stale-while-revalidate=3600`

{{/partial:tab}}
{{/partial:tabs}}
