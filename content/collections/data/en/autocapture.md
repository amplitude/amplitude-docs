---
id: 1017e95b-5dd2-46fc-82b4-54e61d4fb755
blueprint: data
title: Autocapture
landing: true
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1723072396
landing_blurb: 'Autocapture is the fastest way to capture information about your website or app with minimal setup.'
---
Amplitude's Autocapture is the fastest way to capture information about your website or app with minimal setup. Once enabled via our Browser SDK, Autocapture captures user interactions on your digital products with a single code snippet. It's a great way to get started and uncover insights quickly.

## Availability

Autocapture is available for all Amplitude plans.

* On your website, a single [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) snippet lets you capture sessions, page views, clicks, form interactions, file downloads, marketing attribution, and element interactions. You can also use visual labeling to navigate your site and create new events from the click information.
* On iOS and Android, the [iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk) and [Android-Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk) capture application installs and upgrades, sessions, and screen views.

## Autocapture and precision tracking

Amplitude offers two primary ways to capture events:

* Autocapture is designed so you can automatically collect a predefined set of events and properties in a standardized taxonomy using our SDKs.
* Precision tracking allows you to instrument events and properties specific to your business needs and desired analyses.

With Autocapture, you get out of the box analytics with minimal engineering. From the moment you install the SDK, Amplitude automatically collects data to gain insights into feature usage, funnel conversion rates, and even specific click analysis on the web. This solution is the best option to help you get up and running quickly.

When you want to drill deeper into specific actions in your application requiring additional metadata, or have some events (like a purchase event) that may be core to your business, Amplitude provides precision tracking. Precise tracking in code allows you to send these events with a robust set of properties to perform even deeper analyses.

With Amplitude, you don't need to choose. The solutions go hand-in-hand, and you can use a combination of Autocapture and precision tracking data in your analyses.

For example, imagine you're releasing a new feature and don't have the time to implement precision tracking. Autocapture can serve as a safety net for collecting baseline metrics and answering engagement questions. Once you have these insights and want to go deeper, you can work with your team to implement precisely tracked events and get the best of both worlds.

## Optimize your event volume

Autocapture provides several configuration options to help you adjust your implementation to your needs. You can turn individual Autocapture events on and off as needed, and even tune those events further to optimize your event volume.

The default configuration should provide the right balance of automatically capturing events that matter while excluding ones that don't. This balance is critical when capturing clicks. By default, Amplitude captures clicks on interactable elements (for example, links, text fields, dropdowns, and other form elements). Amplitude also captures other clicks on elements that result in a change on the page (for example, a new visual element) or a navigation to a new page. This configuration excludes clicks on blank areas, a user highlighting text, and other similar actions to ensure you aren't paying for low-value user behaviors.

Amplitude recommends monitoring your event volume (in Settings > Plans & Billing) as you make changes to ensure it matches your expectations. You can change your configuration at any time to only capture clicks on specified elements (or elements with certain classes), track on specific pages, or turn click tracking off while still taking advantage of other Autocapture data (page views, sessions, etc.).

## Your taxonomy with Autocapture

Keeping your taxonomy clean and organized is essential to ensuring users can find what they need. When you enable Autocapture, you're getting a predefined set of event and property types for ingestion. For example, the SDK captures click interactions as two events ("Element Clicked" and "Element Changed") with a predefined set of properties rather than a stream of noisy user interactions.

[Visual labeling](/docs/data/visual-labeling) allows users within your organization to create events, so there are some additional considerations to make when thinking about your taxonomy:

* Be sure you set up the correct permissions for each user. Users with a Member role or higher can create labeled events.
* Align your naming convention with your existing taxonomy for labeled events.
* Add descriptions to your labeled events to help other users understand their purpose.

Some additional things to know about your labeled events:

* Labeled events have a separate tab within Data > Events to help you manage them differently from your raw ingested events. Here, you can see who created the labeled events and when they were created.
* Labeled events have a different icon in the event dropdown so you and your users can distinguish them from other events.

## Privacy and security

For many organizations, data privacy, security, and PII are critical factors when setting up their data collection strategy. Your business needs, the purpose of your digital product(s), and your compliance requirements between jurisdictions can vary greatly. There's no one-size-fits-all solution that will work in every situation.

Amplitude's Autocapture feature provides flexible configuration options to enable you to adhere to your company's privacy and security policies and requirements. While it is your responsibility to ensure your use of Amplitude is in compliance with your data privacy policies and requirements, these settings are designed to help you do so.

### Autocapture protections

You control what information you collect with Autocapture and send to the Amplitude platform. For information about how to update the events that Autocapture sends to Amplitude, see [Browser SDK | Disable Autocapture](/docs/sdks/analytics/browser/browser-sdk-2#disable-autocapture).

Autocapture's default settings for capturing clicks and changes on page elements ("Element Clicked" and "Element Changed" events) also include the following privacy and security considerations:
* For sensitive elements—such as end user text inputs, selects, textarea elements, and any HTML elements with contenteditable=”true” as an attribute—the SDK only collects class names and the type attribute. Any end user-inputted text is excluded.
* Autocapture’s default settings further restrict your collection of sensitive input fields, like passwords or form fields with the hidden attribute, and only captures class and type attribute values. Autocapture doesn't capture other details about these elements, including any of the content of the input fields an end user may populate.
* Autocapture will capture the text your website or app is displaying - i.e., the content (textContent) of the element clicked and its children. While we recommend not implementing Autocapture's element interaction tracking on pages that may contain sensitive information (see below), we also use pattern matching to automatically exclude your collection of any text content that looks like a credit card or social security number.
* The exception to these attribute collection rules is when an element has an explicit attribute added with the prefix “data-amp-track-”. This allows data in these attributes to be intentionally passed back to Amplitude.
* Autocapture automatically removes value, event handlers, style, and react attributes.

### Autocapture security options

Amplitude also provides flexibility to refine the pages for which you configure Autocapture. We recommend you utilize these capabilities, especially if your organization requires higher restrictions or safeguards and/or your website or app may contain pages with highly sensitive data, such as those in financial services, healthcare, and medical technologies.

#### Limit click tracking

To support visual labeling, Autocapture captures interaction information about both the elements clicked or changed and information about the element's parents in the HTML structure. Depending on your site's structure, you can:

* Refine the elements allowed for click and change tracking. You can configure the `cssSelectorAllowlist` and `actionClickAllowlist` options to change the list of elements that Autocapture can track. You can even remove all common HTML elements and restrict to elements with a specific class.
* Restrict the pages allowed for click and change tracking. You can configure the `pageUrlAllowlist` to limit the collection of these events to specific URLs (or URL patterns).

#### Turn off Autocapture events

Amplitude also allows you to turn off Autocapture entirely and use precision tracking for data collection. We provide robust data management tools and workflows that support the planning and implementation of a custom taxonomy.

You can [turn off any or all Autocapture events](/docs/sdks/analytics/browser/browser-sdk-2#disable-autocapture) through your SDK configuration.
