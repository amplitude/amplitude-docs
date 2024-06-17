---
id: 99eb2927-ad52-424a-a04d-7e90a0ddfeb7
blueprint: experiment
title: 'Create a new web experiment'
this_article_will_help_you:
  - 'Install the web experiment script in your website.'
  - 'Create and configure a new web experiment.'
landing: false
sourxe: 'https://www.docs.developers.amplitude.com/experiment/web/'
exclude_from_sitemap: false
updated_by: c0ecd457-5b72-4dc9-b683-18a736413d32
updated_at: 1718652695
---

Amplitude's web experimentation provides a no-code solution running experiments on the web. [Copy the script snippet](#implement-the-script-snippet) for your Amplitude project into your site and begin running experiments immediately.

{{partial:admonition type="beta" heading="Web Experimentation is in Beta"}}
**URL Redirect** tests are in open *Beta*.
{{/partial:admonition}}

## Implement the script snippet

To implement Amplitude's web experimentation, copy and paste the standalone Amplitude experiment script into your website. Paste the script into the `<head>` element of your site as high up as possible to avoid flickering.

This script snippet tracks [experiment events](../general/experiment-event-tracking.md) through the Amplitude Analytics SDK installed on your site. Replace `API_KEY` with your project's API key.

{{partial:tabs tabs="US Data Center, EU Data Center"}}
{{partial:tab name="US Data Center"}}

  ```html
  <script src="https://cdn.lab.amplitude.com/web/v1/script/API_KEY.js"><script>
  ```

{{/partial:tab}}
{{partial:tab name="EU Data Center"}}

  ```html
  <script src="https://cdn.lab.eu.amplitude.com/web/v1/script/API_KEY.js"></script>
  ```

{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="info" heading="Install Amplitude Analytics"}}
You must install Amplitude Analytics on your website to enable [Experiment event tracking](../general/experiment-event-tracking.md) to Amplitude for analysis. Install the analytics SDK using a [script tag](https://github.com/amplitude/Amplitude-TypeScript/tree/main/packages/analytics-browser#installing-via-script-loader) or using your preferred [package manager](https://www.docs.developers.amplitude.com/data/sdks/sdk-quickstart/#install-the-dependency) (for example npm, yarn etc.)
{{/partial:admonition}}

## Web vs feature experimentation

Web experimentation builds off of Amplitude's end-to-end [feature experimentation platform](../index.md) to enable no-code experimentation on the web, but differs in a few key ways:

| Web Experimentation | Feature Experimentation |
| --- | --- |
| Requires implementation using Experiment script snippet | Generally implemented using a SDK or an API. |
| Enables no-code experimentation. | Requires engineering work to implement features and flags. |
| Only supported on Web platforms. | Supports on any platform or system. |

**Use web experimentation if...**

- You want to drive growth or other outcomes on a web based platform.
- You have limited engineering resources available implement and support feature flags.

**Use feature experimentation if...**

- You want to experiment or release arbitrary features on web or non-web (mobile, server, etc.) platforms.
- You work on a product team with engineering resources available.

## Create a new web experiment

To set up a web experiment, follow these steps:

1. In Amplitude, navigate to *Create > Experiment > Use a URL Redirect.*
2. In the *Variants* panel, add each URL you want to test as a separate variant.
3. In the *Analysis Settings* panel, copy the code snippet to paste between the `<head>` and `</head>` tags of your site. Also, make sure your site has the Amplitude Analytics SDK installed, to properly monitor your exposures.
4. For the rest of the setup process, follow the guidance provided in our experimentation workflow documentation.

### Preview and test

As with feature-level experimentation (using flags), you can test the behavior of the redirect before deploying it. The preview is available after you’ve attached URLs to all your variants.

When you preview and test, you can specify which variant you want to verify for the redirect behavior.

### Configuration limits

There are limits imposed on experiment configuration when using visual experimentation and Amplitude’s low-code implementation:

- **Evaluation mode**: This is limited to local, in order to optimize test performance and minimize any latency impact to end-users.
- **Bucketing unit**: Because evaluation mode is limited to local, this must also be limited to User.
- **Keys**: Because evaluation mode is limited to local, this must also be limited to deviceID.
- **Audience**: This is limited to all users, because the URL redirect logic will trigger before user tracking loads on the site.
- **Deployment**: This is limited to the project API key, in order to simplify setup requirements.