---
id: 6f2a3532-cb82-4114-9d9a-4e0d8de49fff
blueprint: source-catalog
title: 'Google Tag Manager (legacy)'
partner_maintained: false
package_name: 'Amplitude Analytics Legacy'
bundle_url: 'https://tagmanager.google.com/gallery/#/owners/amplitude/templates/amplitude-gtm-template'
github_link: 'https://github.com/amplitude/amplitude-gtm-template'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719616159
---

This is the client-side Google Tag Manager Template for Amplitude Analytics. The tag uses the [Maintenance Amplitude JavaScript SDK](/docs/sdks/analytics/browser/javascript-sdk) for data collection.

{{partial:admonition type="deprecated" heading="This is a legacy template"}}
This is a legacy GTM template. Use the [latest template](/docs/data/source-catalog/google-tag-manager) for the most up-to-date implementation.
{{/partial:admonition}}

## Migration

The Amplitude Analytics Legacy template, currently utilizing the [Maintenance Amplitude JavaScript SDK](/docs/sdks/analytics/browser/javascript-sdk) for data collection, is only slated for bug fixes until its eventual deprecation. use the [latest GTM template](/docs/data/source-catalog/google-tag-manager) that uses Amplitude's Marketing Analytics SDK for data collection. This not only ensures better support but also offers access to a host of new features.

- The latest template isn't backwards compatible with this legacy template due to the non-backwards compatibility of the internal SDK. It does a cookie migration logic to help the transition of legacy cookies information to the latest cookie storage system.
- For a comprehensive migration guide, see the [Migration guide](/docs/sdks/analytics/browser/migrate-from-javascript-sdk-to-browser-sdk-1-0).
- To understand the behavioral differences between the old and new templates, see the [comparison section](/docs/sdks/analytics/browser/migrate-from-javascript-sdk-to-browser-sdk-1-0#comparison).

Here are the breaking changes:

| <div class="big-column">Change Area</div>  | Amplitude Analytics Browser SDK (GTM Client Template Latest) | Amplitude Analytics Legacy (GTM Client Template Maintenance)|
| --- | --- | --- |
| Core SDK | [Marketing Analytics Browser SDK](/docs/sdks/analytics/browser/marketing-analytics-sdk). | [Maintenance Amplitude JavaScript SDK](/docs/sdks/analytics/browser/javascript-sdk). |
| Amplitude initialization | The `init` function is a separate tag type that requires a dedicated tag. This accommodates deferred initialization, which allows the `init` tag to be called even after an event track call. However, it's critical to note that events won't be dispatched to Amplitude until the `init` tag is explicitly activated.  | The `init` is called by default. As there's no separate init tag, the initialization process runs as soon as the template is loaded. |
| Web Attribution | Collects more click IDs and is much easier to configure. Simply enable attribution tracking in the `init` type tag for default behavior. Further details are [available](/docs/data/source-catalog/google-tag-manager). | Set the `initialization Options` for each tag type is required unless you are using default configuration. Refer to [this comparison](/docs/sdks/analytics/browser/migrate-from-javascript-sdk-to-browser-sdk-1-0#comparison) for the differences in web attribution behavior between the core SDKs. For configuration mapping between the core SDKs, see the [Migration guide](/docs/sdks/analytics/browser/migrate-from-javascript-sdk-to-browser-sdk-1-0#configuration). |
| Page View Tracking | Includes built-in `Page View` Tracking which can be configured in the `init` type tag. You can set up the page view tracking trigger and decide whether to track history events automatically. | No built-in Page View Tracking. You can implement your page view tracking using the `track` type tag. For Single Page Applications (SPAs), the All Pages trigger isn't sufficient for tracking history changes. `All Pages` and `History Changes` triggers should be added as trigger for the page view tracking accuracy. If you wish to add some automatic variables provided by the `History Change` trigger, navigate to the variable section, configure, and activate all checkboxes under History. Once enabled, you'll see these history variables in the Variables tab in the GTM preview pane. |


## EU data residency 

For EU data residency, you must set up your project inside Amplitude EU and use the API key from Amplitude EU. You can configure the server zone by checking the checkbox **EU Data Residency** under **Tag Configuration** -> **Initialization**.