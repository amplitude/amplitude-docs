---
id: 1017e95b-5dd2-46fc-82b4-54e61d4fb755
blueprint: data
title: Autocapture
landing: true
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1742328571
landing_blurb: 'Autocapture is the fastest way to capture information about your website or app with minimal setup.'
academy_course:
  - fcefbf26-273d-49a9-adbf-89440c8cb48b
---
Amplitude's Autocapture is the fastest way to capture information about your website or app with minimal setup. After it's enabled through the Browser SDK, Autocapture captures user interactions on your digital products with a single code snippet. It lets you get started and uncover insights with minimal setup activity.

## Availability

Autocapture is available for all Amplitude plans.

* On your website, a single [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) snippet lets you capture sessions, page views, clicks, form interactions, file downloads, marketing attribution, and element interactions. You can also use visual labeling to navigate your site and create new events from the click information.
* On iOS and Android, the [iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk) and [Android-Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk) capture application installs and upgrades, sessions, and screen views.

## Autocapture and precision tracking

Amplitude offers two primary ways to capture events:

* Autocapture allows you to automatically collect a predefined set of events and properties in a standardized taxonomy using Amplitude SDKs.
* Precision tracking allows you to instrument events and properties specific to your business needs and wanted analyses.

With Autocapture, you get out of the box analytics with minimal engineering. From the moment you install the SDK, Amplitude automatically collects data to gain insights into feature usage, funnel conversion rates, and even specific click analysis on the web. Autocapture lets you focus on speed when setting up your analysis.

When you want to drill deeper into specific actions in your application requiring additional metadata, or have some events (like a purchase event) that may be core to your business, Amplitude provides precision tracking. Precise tracking in code allows you to send these events with a robust set of properties to perform even deeper analyses.

With Amplitude, you don't need to choose. The solutions go hand-in-hand, and you can use a combination of Autocapture and precision tracking data in your analyses.

For example, imagine you're releasing a new feature and don't have the time to implement precision tracking. Autocapture can serve as a safety net for collecting baseline metrics and answering engagement questions. After you have these insights and want to go deeper, you can work with your team to implement precisely tracked events and get the best of both worlds.

## Optimize your event volume

Autocapture provides several configuration options to help you adjust your implementation to your needs. You can turn individual Autocapture events on and off as needed, and even tune those events further to optimize your event volume.

The default configuration should provide the right balance of automatically capturing events that matter while excluding ones that don't. This balance is critical when capturing clicks. By default, Amplitude captures clicks on interactive elements (for example: links, text fields, dropdowns, and other form elements). Amplitude also captures other clicks on elements that result in a change on the page (for example, a new visual element) or a navigation to a new page. This configuration excludes clicks on blank areas, a user highlighting text, and other similar actions to ensure you aren't paying for low-value user behaviors.

Amplitude recommends monitoring your event volume (go to *Settings > Plans & Billing*) as you make changes to ensure it matches your expectations. At any time, you can change your configuration to only capture clicks on specified elements (or elements with certain classes), track on specific pages, or turn click tracking off while still taking advantage of other Autocapture data (page views, sessions, and so forth.).

## Your taxonomy with Autocapture

Keeping your taxonomy clean and organized is essential to ensuring users can find what they need. When you enable Autocapture, you get a predefined set of event and property types for ingestion. For example, the SDK captures click interactions as two events ("Element Clicked" and "Element Changed") with a predefined set of properties rather than a stream of noisy user interactions.

[Visual labeling](/docs/data/visual-labeling) allows users within your organization to create events, so there are some additional considerations to make when thinking about your taxonomy:

* Be sure you set up the correct permissions for each user. Users with a Member role or higher can create labeled events.
* Align your naming convention with your existing taxonomy for labeled events.
* Add descriptions to your labeled events to help other users understand their purpose.

Some additional things to know about your labeled events:

* Labeled events have a separate tab within *Data > Events* to help you manage them differently from your raw ingested events. This tab displays who created the labeled events as well the creation date for each event.
* Labeled events have a different icon in the event dropdown so you and your users can distinguish them from other events.

## Privacy and security

For many organizations, data privacy, security, and PII are critical factors when setting up their data collection strategy. Your business needs, the purpose of your digital products, and your compliance requirements between jurisdictions may vary. There's no one-size-fits-all solution that works in every situation.

Amplitude's Autocapture feature provides flexible configuration options to enable you to adhere to your company's privacy and security policies and requirements. While it's your responsibility to ensure your use of Amplitude complies with your data privacy policies and requirements, these settings are designed to help you do so.

### Autocapture protections

You control what information you collect with Autocapture and send to the Amplitude platform. For information about how to update the events that Autocapture sends to Amplitude, go to [Browser SDK | Disable Autocapture](/docs/sdks/analytics/browser/browser-sdk-2#disable-autocapture).

Autocapture's default settings for capturing clicks and changes on page elements ("Element Clicked" and "Element Changed" events) also include the following privacy and security considerations:
* For sensitive elements such as end user text inputs, selects, text area elements, and any HTML elements with `contenteditable=”true”` as an attribute. The SDK only collects class names and the type attribute. Any end user-inputted text is excluded.
* Autocapture’s default settings further restrict your collection of sensitive input fields, like passwords or form fields with the hidden attribute, and only captures class and type attribute values. Autocapture doesn't capture other details about these elements, including any of the content of the input fields an end user may populate.
* Autocapture captures the text your website or app displays. For example, the content (`textContent`) of the element clicked and its children. It's not recommended that you use Autocapture's element interaction tracking on pages that may contain sensitive information. Amplitude uses pattern matching to automatically exclude from your collection any text content that looks like a credit card number, social security number, or email address.
* The exception to these attribute collection rules is when an element has an explicit attribute added with the prefix *data-amp-track-*. This allows data in these attributes to be intentionally passed back to Amplitude.
* Autocapture automatically removes value, event handlers, style, and react attributes.

Additional autocapture protections include: 

#### Precise text and title masking

Precise text, otherwise known as title masking, excludes text capture from specific elements on the page, including the page title. This lets you use Autocapture on the page without capturing the text displayed in specific elements.

To prevent capturing an element's text, add the attribute `data-amp-mask` to the it. If, for example you have the following on a button: 

```html
<div data-amp-mask>John Doe</div>
```
The above example still tracks the click on the div. However, the text content "John Doe" doesn't appear in the Autocapture data. This exclusion works on the SDK level. 

Precise text works recursively so that any text contained in an element is masked. For example: 

```html
<div data-amp-mask>
  John Doe
  <div>Jane Doe</div>
</div>
```
In the above example, both names are masked with `*****`.

#### Email address masking

Email address masking automatically hides or otherwise obscures email addresses. Amplitude uses pattern matching to automatically exclude content that looks like an email address. Email address masking is recursive. Any email addresses captured within an element is masked such as `*****`.

#### Pattern (Regex) masking

You can mask information based on patterns that you specify (regular expressions or Regex). If you aren't familiar with Regex, review this page on [regular expressions](https://www.regular-expressions.info/quickstart.html).

Specify a pattern of information that you want Amplitude to mask. This configuration occurs in the [SDK](/docs/sdks) and is an additional layer of protection to the default patterns Amplitude uses to mask email, credit cards, and social security numbers. Regex filters mask values in any fields where it may be possible to include this data. This includes both visible fields as well as hidden attributes on the page. 

For example, you can set a Regex pattern to filter account numbers such as "#0236732." If Amplitude finds account numbers that match the pattern you set, those numbers are masked such as: `*****`. 

#### Page URL allow list and block list

Page URL block- and allow- lists let you specify unique URL page patterns to either be excluded or included from Amplitude. 

For example, you can exclude user activity from specific sub-domains on your URL such as from your user's account settings or URLs that only include testing data. 

Alternately, if you host your site in multiple domains such as .com and .co.uk, you could specify that you only want to collect data from the .co.uk domain. In this scenario, you'd add the .co.uk domain to the allow list.

#### Precise attribute redaction

Precise attribute redaction excludes specific elements from capture. This lets you use Autocapture on a page without capturing attributes in a specified element. 

For example, if you include the following attribute:

```html
<div data-amp-mask-attributes="name">
     <span name="John D">Account</span>
</div>
```
on a button or link, the name "John D" is masked with `*****`. 

{{partial:admonition type="note" heading=""}}
You can't redact information from ID and Class elements. This is because of their importance for [Visual Labeling](/docs/data/visual-labeling).
{{/partial:admonition}}

### Autocapture security options

Amplitude also provides flexibility to refine the pages for which you configure Autocapture. Use these capabilities when setting up Autocapture, especially if your organization requires stronger restrictions or safeguards, or your website or app may contain pages with highly sensitive data, such as those in financial services, healthcare, and medical technologies.

#### Limit click tracking

To support visual labeling, Autocapture captures interaction information about both the elements clicked or changed and information about the element's parents in the HTML structure. Depending on your site's structure, you can:

* Refine the elements allowed for click and change tracking. You can configure the `cssSelectorAllowlist` and `actionClickAllowlist` options to change the list of elements that Autocapture can track. You can even remove all common HTML elements and restrict to elements with a specific class.
* Restrict the pages allowed for click and change tracking. You can configure the `pageUrlAllowlist` to limit the collection of these events to specific URLs (or URL patterns).

#### Turn off Autocapture events

You can also turn off Autocapture entirely and use precision tracking for data collection. Amplitude includes robust data management tools and workflows that support planning and implementing a custom taxonomy.

You can [turn off any or all Autocapture events](/docs/sdks/analytics/browser/browser-sdk-2#disable-autocapture) through your SDK configuration.