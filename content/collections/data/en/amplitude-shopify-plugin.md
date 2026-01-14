---
id: d7658703-c1c3-4cc4-a5e3-3b5674e41405
blueprint: data
title: 'Amplitude Shopify Plugin'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1729791421
---

[Shopify](https://www.shopify.com/) is an all-in-one commerce platform that allows businesses of any size to create, /docs/feature-experiment/workflow/createcustomize, and manage online stores with ease. It offers tools for product listings, payments, shipping, and customer engagement, streamlining the selling process online, across social media, and in person.

The [Amplitude Shopify Plugin](https://apps.shopify.com/amplitude) enables you to bring data from your Shopify store into Amplitude, unlocking valuable insights from funnel analytics, user behavior trends and charts, ROI analysis, Session Replay and more.

## Overview

The Shopify plugin installs a version of the [Amplitude Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) and adds the script before the `</head>` tag of your site's pages. The script includes [Session Replay](/docs/session-replay) and [Web Experiment](/docs/web-experiment/set-up-a-web-experiment).

{{partial:admonition type="warning" heading="Shopify and flickering"}}
The method Shopify uses to loads Amplitude's Shopify app causes flickering. To avoid this, add the [asynchronous web script with the anti-flicker snippet](/docs/web-experiment/implementation#async-script-with-anti-flicker-snippet) to your `theme.liquid` file.
{{/partial:admonition}}

The Shopify plugin captures Amplitude's default events, including [marketing attribution](/docs/sdks/analytics/browser/browser-sdk-2#track-marketing-attribution) and Shopify's standard [events](https://shopify.dev/docs/api/web-pixels-api/standard-events).

{{partial:collapse name="Shopify plugin events and event properties"}}

| Event                            | Source    | Properties                                                                                                                                                                                                                                                                |
| -------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Page viewed                      | Amplitude | Page counter, Page domain, Page location, Page path, Page title, Page URL, Session Replay ID (if enabled), Referrer, [Attribution](/docs/sdks/analytics/browser/browser-sdk-2#track-marketing-attribution), [User properties](/docs/sdks/analytics/browser/browser-sdk-2#user-properties).                                                                          |
| Start session                    | Amplitude | Session Replay ID (if enabled), [User properties](/docs/sdks/analytics/browser/browser-sdk-2#user-properties).                                                                                                                                                                                                      |
| End session                      | Amplitude | [User properties](/docs/sdks/analytics/browser/browser-sdk-2#user-properties).                                                                                                                                                                                                                                      |
| Form started                     | Amplitude | Form destination, Session Replay ID (if enabled), [User properties](/docs/sdks/analytics/browser/browser-sdk-2#user-properties).                                                                                                                                                                                    |
| Form submitted                   | Amplitude | Form destination, Session Replay ID (if enabled), [User properties](/docs/sdks/analytics/browser/browser-sdk-2#user-properties).                                                                                                                                                                                    |
| File downloaded                  | Amplitude | File extension, File name, Link text, Link URL, Session Replay ID (if enabled),                                                                                                                                                                                           |
| Element clicked                  | Amplitude | Element Aria Label, Element Class, Element Hierarchy, Element href, Element ID, Element Parent Label, Element Position Left, Element Position Top, Element Selector, Element Tag, Element Text, Page Title, Page URL, Session Replay ID, Viewport Height, Viewport Width. |
| Element changed                  | Amplitude | Element Class, Element Hierarchy, Element ID, Element Parent Label, Element Position Left, Element Position Top, Element Tag, Page Title, Page URL, Session Replay ID, Viewport Height, Viewport Width.                                                                   |
| Collection viewed                | Shopify   | Collection title                                                                                                                                                                                                                                                          |
| Product viewed                   | Shopify   | Quantity, SKU, Price, Currency Code, Type, Variant Title, Title, Vendor, Products                                                                                                                                                                                         |
| Product added to cart            | Shopify   | Quantity, SKU, Price, Currency Code, Type, Variant Title, Title, Vendor, Products                                                                                                                                                                                         |
| Product removed from cart        | Shopify   | Quantity, SKU, Price, Currency Code, Type, Variant Title, Title, Vendor, Products                                                                                                                                                                                         |
| Checkout started                 | Shopify   | Discounted amount, Total price, Currency code, Products                                                                                                                                                                                                                   |
| Checkout contact info submitted  | Shopify   | --                                                                                                                                                                                                                                                                        |
| Checkout address info submitted  | Shopify   | --                                                                                                                                                                                                                                                                        |
| Checkout shipping info submitted | Shopify   | --                                                                                                                                                                                                                                                                        |
| Checkout completed               | Shopify   | Total tax, Discount amount, Subtotal price, Currency code, Customer id, Products                                                                                                                                                                                          |
| Order created                    | Shopify   | Customer, Products                                                                                                                                                                                                                                                        |
| Search submitted                 | Shopify   | Search query                                                                                                                                                                                                                                                              |

{{/partial:collapse}}

In most scenarios, when a customer completes the checkout flow, Shopify fires the Checkout complete event, then the Order created event. If you create an order manually from your store's Admin page, only the Order created event fires. The Checkout complete event is specific to a customer completing the checkout flow.

User ID is set using the email address or phone number the customer enters in the Contact section of the checkout.

{{partial:admonition type="note" heading="Shopify checkout page"}}
Shopify prevents third-party packages from loading on your store's checkout page. As a result, Amplitude doesn't receive events from the checkout page, and you can't run experiments on it.
{{/partial:admonition}}

### Performance impact

The packages that Amplitude adds to your Shopify pages weigh ~167kb. Internal testing showed Lighthouse performance reports averaging 98 without the plugin, and 96 with the plugin.

## Install the plugin

The method you use to install the Shopify plugin depends on if you have an existing Amplitude organization. 

### Install without an existing Amplitude organization

1. Find the [Amplitude Shopify plugin](https://apps.shopify.com/amplitude) in the Shopify App Store.
2. Click **Install** and confirm access to add it to your Shopify store.
3. Navigate to the [Amplitude Get Started page](https://analytics.amplitude.com/login?utm_source=shopify_app) and click to create your Amplitude account. Complete the form, agree to terms, and click **Continue**.

    {{partial:admonition type="note" heading="Data Storage Locaiton"}}
    Amplitude provides data storage in the US and EU. Choose the appropriate option based on your location.
    {{/partial:admonition}}

4. After you create your account, from the Amplitude setup page, click **Shopify** in the *Other ways to install* section.
5. In the resulting modal, copy your Amplitude project's API key.
6. Return to the Amplitude Settings screen in Shopify, enter the API key, and click **Connect**.

### Install into an existing Amplitude organization

1. Log in to Amplitude, and navigate to your organization's settings.
2. Select the project within your organization that you want to connect to Shopify.
3. Find the Project's API key and copy it.
4. Return to the Amplitude Settings screen in Shopify, enter the API key, and click **Connect**.

### Configure Session Replay sample rates

1. Log in to Amplitude as a manager and navigate to your organization's settings.
2. click **Session Replay & Heatmaps** in the sidebar.
3. Select the project that matches the API key you used to install the Shopify app.
5. Input the sample rate you want under the Sampling section.
6. Save the settings.