---
id: d7658703-c1c3-4cc4-a5e3-3b5674e41405
blueprint: data
title: 'Amplitude Shopify Plugin'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1729791421
---

[Shopify](https://www.shopify.com/) is an all-in-one commerce platform that allows businesses of any size to create, customize, and manage online stores with ease. It offers tools for product listings, payments, shipping, and customer engagement, streamlining the selling process online, across social media, and in person. With built-in marketing features, analytics, and integrations with third-party apps, Shopify helps business owners track performance and drive sales.

The [Amplitude Shopify Plugin](https://apps.shopify.com/amplitude) enables you to instrument your Shopify store with an Amplitude features including [Autocapture](/docs/data/autocapture) and [Session Replay](/docs/session-replay).

## Considerations

* Performance: The packages Amplitude provides are roughly 167kb total size, but vary depending on which products you use. In testing, Shopify stores with Amplitude installed registered an average lighthouse score of 96, compared to an average score of 98 without Amplitude.

## Plugin details

The Shopify plugin installs a version of the [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2), and adds the script before the `</head>` tag on each of your site's pages.

By default, the Shopify plugin captures the following event properties:

- `[Amplitude] Quantity`
- `[Amplitude] SKU`
- `[Amplitude] Price`
- `[Amplitude] Currency Code`
- `[Amplitude] Type`
- `[Amplitude] Variant Title`
- `[Amplitude] Title`
- `[Amplitude] Vendor`
- `[Amplitude] Products`
  - `[Amplitude] Quantity`
  - `[Amplitude] SKU`
  - `[Amplitude] Price`
  - `[Amplitude] Currency Code`
  - `[Amplitude] Type`
  - `[Amplitude] Variant Title`
  - `[Amplitude] Title`
  - `[Amplitude] Vendor`

### Session Replay


### Web Experimentation




## Install the plugin

To add the plugin to your Shopify store:

1. Log in to your Shopify account and find the plugin in the [Shopify App Store](https://apps.shopify.com/amplitude). Click *Install*.
2. Confirm the required plugin permissions and click *Install*.
3. Locate your project's API key and add it to the Amplitude Settings page in Shopify. Click *Connect*.

    {{partial:admonition type="note" heading="Ad blocking software"}}
    If any ad blocking software is running in your browser, disable it to ensure the plugin setup step can communicate with Amplitude.
    {{/partial:admonition}}

A "Connection successful" message indicates the plugin is enabled and connected with Amplitude.

A successful connection enables Amplitude to stream events and properties from your Shopify store to Amplitude, where you can create charts, view session replays, define new events with [Visual Labeling](/docs/data/visual-labeling), and more.