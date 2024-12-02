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

The Shopify plugin captures Amplitude's default events and Shopify's standard [events](https://shopify.dev/docs/api/web-pixels-api/standard-events).

{{partial:collapse name="Shopify plugin events and event properties"}}

| Event                            | Source    | Properties                                                                                                                                                                                                                                                                |
| -------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page viewed                      | Amplitude | Page counter, Page domain, Page location, Page path, Page title, Page URL, Session Replay ID (if enabled), Referrer, [Attribution](#marketing-attribution), [User properties](#user-properties).                                                                          |
| Start session                    | Amplitude | Session Replay ID (if enabled), [User properties](#user-properties).                                                                                                                                                                                                      |
| End session                      | Amplitude | [User properties](#user-properties).                                                                                                                                                                                                                                      |
| Form started                     | Amplitude | Form destination, Session Replay ID (if enabled), [User properties](#user-properties).                                                                                                                                                                                    |
| Form submitted                   | Amplitude | Form destination, Session Replay ID (if enabled), [User properties](#user-properties).                                                                                                                                                                                    |
| File downloaded                  | Amplitude | File extension, File name, Link text, Link URL, Session Replay ID (if enabled),                                                                                                                                                                                           |
| Element clicked                  | Amplitude | Element Aria Label, Element Class, Element Hierarchy, Element Href, Element ID, Element Parent Label, Element Position Left, Element Position Top, Element Selector, Element Tag, Element Text, Page Title, Page URL, Session Replay ID, Viewport Height, Viewport Width. |
| Element changed                  | Amplitude | Element Class, Element Hierarchy, Element ID, Element Parent Label, Element Position Left, Element Position Top, Element Tag, Page Title, Page URL, Session Replay ID, Viewport Height, Viewport Width.                                                                   |
| Collection viewed                | Shopify   | Collection title                                                                                                                                                                                                                                                          |
| Product viewed                   | Shopify   | Quantity, SKU, Price, Currency Code, Type, Variant Title, Title, Vendor, Products                                                                                                                                                                                         |
| Product added to cart            | Shopify   | Quantity, SKU, Price, Currency Code, Type, Variant Title, Title, Vendor, Products                                                                                                                                                                                         |
| Product removed from cart        | Shopify   | Quantity, SKU, Price, Currency Code, Type, Variant Title, Title, Vendor, Products                                                                                                                                                                                         |
| Checkout started                 | Shopify   | Discounted amount, Total price, Currency code, Products                                                                                                                                                                                                                   |
| Checkout contact info submitted  | Shopify   | --                                                                                                                                                                                                                                                                        |
| Checkout address info submitted  | Shopify   | --                                                                                                                                                                                                                                                                        |
| Checkout shipping info submitted | Shopify   | --                                                                                                                                                                                                                                                                        |
| Order created                    | Shopify   | Customer, Products                                                                                                                                                                                                                                                        |
| Search submitted                 | Shopify   | Search query                                                                                                                                                                                                                                                              |

{{/partial:collapse}}

### Session Replay


### Web Experimentation




## Install the plugin

To add the plugin to your Shopify store:

1. Log in to your Shopify account and find the plugin in the [Shopify App Store](https://apps.shopify.com/amplitude). Click *Install*.
2. Confirm the required plugin permissions and click *Install*.
3. Locate your project's API key and add it to the Amplitude Settings page in Shopify.
4. Specify where you'll store your data. Click *Connect*.

    {{partial:admonition type="note" heading="Ad blocking software"}}
    If any ad blocking software is running in your browser, disable it to ensure the plugin setup step can communicate with Amplitude.
    {{/partial:admonition}}

A "Connection successful" message indicates the plugin is enabled and connected with Amplitude.

A successful connection enables Amplitude to stream events and properties from your Shopify store to Amplitude, where you can create charts, view session replays, define new events with [Visual Labeling](/docs/data/visual-labeling), and more.