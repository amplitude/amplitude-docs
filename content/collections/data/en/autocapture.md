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
Autocapture is the fastest way to capture information about your website or app with minimal setup. After it's enabled through the [Browser SDK](/docs/sdks/analytics/browser), Autocapture captures user interactions on your digital products with a single code snippet. It lets you get started and uncover insights with minimal setup activity.

* On your website, a single [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) snippet lets you capture sessions, page views, clicks, form interactions, file downloads, marketing attribution, page URL enrichment, and element interactions. You can also use visual labeling to navigate your site and create new events from the click information.
* On iOS and Android, the [iOS Swift SDK](/docs/sdks/analytics/ios/ios-swift-sdk) and [Android-Kotlin SDK](/docs/sdks/analytics/android/android-kotlin-sdk) capture application installs and upgrades, sessions, and screen views.

## Autocapture and precision tracking

Amplitude offers two primary ways to capture events:

* Autocapture to automatically collect a predefined set of events and properties in a standardized taxonomy using Amplitude SDKs.
* Precision tracking to instrument events and properties specific to your business needs and wanted analyses.

From the moment you install the SDK, Amplitude automatically collects data to gain insights into feature usage, funnel conversion rates, and even specific click analysis on the web. The Browser SDK also enriches all events with page URL information, including previous page tracking and page type classification. Autocapture lets you focus on speed when setting up your analysis.

When you want to investigate specific actions in your application requiring additional metadata, or have some events (like a purchase event) that may be core to your business, use precision tracking. Precise tracking in code allows you to send these events with a robust set of properties to perform even deeper analyses.

The solutions are compatible together, which means you can use a combination of Autocapture and precision tracking data in your analyses.

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

For many organizations, data privacy, security, and personally identifying information (PII) are critical factors when setting up their data collection strategy. Your business needs, the purpose of your digital products, and your compliance requirements between jurisdictions may vary. There's no one-size-fits-all solution that works in every situation.

Autocapture provides flexible configuration options to enable you to adhere to your company's privacy and security policies and requirements. While it's your responsibility to ensure your use of Amplitude complies with your data privacy policies and requirements, these settings help you reach compliance.

### Default Autocapture protections

You control what information you collect with Autocapture and send to the Amplitude platform. For information about how to update the events that Autocapture sends to Amplitude, go to [Browser SDK | Disable Autocapture](/docs/sdks/analytics/browser/browser-sdk-2#disable-autocapture). 

The following list is Autocapture's default settings for capturing clicks and changes on page elements ("Element Clicked" and "Element Changed" events). It also include the following privacy and security considerations. You don't need to do anything to turn these protections on. They're always active for you.

* For sensitive elements such as end user text inputs, selects, text area elements, and any HTML elements with `contenteditable=”true”` as an attribute. The SDK only collects class names and the type attribute. Any end user-inputted text is excluded.
* Autocapture’s default settings further restrict your collection of sensitive input fields, like passwords or form fields with the hidden attribute, and only captures class and type attribute values. Autocapture doesn't capture other details about these elements, including any of the content of the input fields an end user may populate.
* Autocapture captures the text your website or app displays. For example, the content (`textContent`) of the element clicked and its children. It's not recommended that you use Autocapture's element interaction tracking on pages that may contain sensitive information. Amplitude uses pattern matching to automatically mask any text content that looks like a credit card number, social security number, or email addresses.
* The exception to these attribute collection rules is when an element has an explicit attribute added with the prefix `data-amp-track-`. This allows data in these attributes to be intentionally passed back to Amplitude.
* Autocapture automatically removes value, event handlers, style, and react attributes.
* Page titles can be masked in page view events by adding the `data-amp-mask` attribute to the `<title>` element, which replaces the actual title with a masked value to protect sensitive information. For implementation details, go to [Browser SDK page title masking](/docs/sdks/analytics/browser/browser-sdk-2#page-title-masking).

### Manual Autocapture protections

The following Autocapture protections are available if you choose to implement them. By default, they're not enabled. You can enable all, or some, of the protections listed below. 

For some of these protections, you must add an attribute to your elements. Some of these protections are enabled through the *Data Settings > Autocapture* page. The documentation for each protection indicates how to enable it.

#### Precise text masking

Precise text masking redacts text capture from specific elements on the page. Adding this attribute lets you track clicks while redacting text displayed in particular elements. 

To mask an element's text, add the attribute `data-amp-mask` to it. If, for example, you have the following on a button: 

```html
<div data-amp-mask>John Doe</div>
```
Autocapture still tracks the click on the div element. However, the text content "John Doe" is replaced with `*****` in the Autocapture data. This exclusion works on the SDK level. 

Precise text works recursively so that any text contained in an element is masked. For example: 

```html
<div data-amp-mask>
  John Doe
  <div>Jane Doe</div>
</div>
```
In the above example, both names are masked with `*****`.

#### Precise attribute masking

Precise attribute masking redacts specific HTML attributes from capture. Defining which attributes you want to mask lets you track clicks with Autocapture while redacting attributes in your HTML. Specifying attributes on an element masks that attribute on all child elements as well. 

For example, if you include the following attribute:

```html
<div data-amp-mask-attributes="name">
     <span name="John D">Account</span>
</div>
```
on a button or link, the name "John D" is masked with `*****`. 

You can also use a list to specify more than one attribute to be masked. When using a list, format the masking attributes as `data-amp-mask-attributes="name,ssn"`.

{{partial:admonition type="note" heading=""}}
You can't mask information from ID and Class attributes. This is because of their importance for [Visual Labeling](/docs/data/visual-labeling).
{{/partial:admonition}}

#### Pattern (RegEx) masking

You can mask information based on patterns that you specify (regular expressions or RegEx). If you aren't familiar with RegEx, review this page on [regular expressions](https://www.regular-expressions.info/quickstart.html).

Specify a pattern of information that you want Autocapture to mask. This configuration occurs in the [SDK](/docs/sdks) and is an additional layer of protection to the default patterns used to mask email, credit cards, and social security numbers. RegEx filters mask values in any fields where it may be possible to include this data. This includes both visible fields as well as hidden attributes on the page. 

For example, you can set a RegEx pattern to filter out credit card numbers such as `****-**** **** 1234`. In this example, you want to fully mask the credit card information including the final four digits. You can add the RegEx filter `/(?i)ends\s*in\s*[0-9]{4}/` and, if Amplitude finds credit card information that match the pattern, those numbers are masked like: `*****`. 

Enable this through the *Data Settings > Autocapture > Element Interactions* page.

#### Page URL exclude and allows lists

Page URL exclude- and allow- lists let you specify unique URL page patterns to either be excluded from or included into Autocapture. Use these capabilities if your organization requires stronger restrictions or safeguards. Or, if your website or app may contain pages with highly sensitive data, such as those in financial services, healthcare, and medical technologies.

For example, you can exclude user activity from specific sub-domains on your URL such as from your user's account settings or URLs that only include testing data.

Iff you host your site in multiple domains such as .com and .co.uk, you can specify that you only want to include data from the .co.uk domain. 

**Examples**
Using the example of .com and .co.uk above, here are examples of the exclude and allow lists:

**Exclude list** 
* Add `https://example.co.uk/account/*` as a glob pattern to the exclude list and this pattern captures everything on the .co.uk domain except for the account section. 

**Allow list**
* Add `https://example.co.uk/*` as a glob pattern to the allow list and only data coming from the .co.uk domain is captured. Data coming from the .com domain isn't captured.

{{partial:admonition type="note" heading=""}}
Remember that the exclude list always takes priority over the allow list. This is to prevent you capturing data that you don't want. If you include the same pattern in both the exclude and allow lists, that pattern is excluded and won't be captured.
{{/partial:admonition}}

Enable this through the *Data Settings > Autocapture > Element Interactions* page.

#### Limit click tracking

To support visual labeling, Autocapture captures interaction information about both the elements clicked or changed and information about the element's parents in the HTML structure. Depending on your site's structure, you can:

* Refine the elements allowed for click and change tracking. You can configure the `cssSelectorAllowlist` and `actionClickAllowlist` options to change the list of elements that Autocapture can track. You can even remove all common HTML elements and restrict to elements with a specific class.

Enable this through the *Data Settings > Autocapture > Element Interactions* page.

#### Turn off Autocapture events

You can also turn off Autocapture entirely and use precision tracking for data collection. Amplitude includes robust data management tools and workflows that support planning and implementing a custom taxonomy.

You can [turn off any or all Autocapture events](/docs/sdks/analytics/browser/browser-sdk-2#disable-autocapture) through your SDK configuration.