---
id: 8f8e25db-62c1-4492-bf0d-e44dba323d5d
blueprint: data
title: 'Autocapture Remote Configuration'
this_article_will_help_you:
  - 'Understand what remote configuration is'
  - 'Set up Autocapture remote configuration'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1755299403
---
Autocapture Remote Configuration lets you make adjustments to your implementation and send additional metadata into Amplitude. Use Remote Configuration either when you are setting up [Autocapture](/docs/data/autocapture) or after Autocapture is running. After you analyze your first data capture, use Remote Configuration to update autocapture's settings without needing a code update. 

With remote configuration you can:

* Modify the SDK settings to adjust which events you want to capture. For example:
  * Turning specific Autocapture events on or off.
  * Configuring Autocapture events such as allowed elements or allowed pages and add sub-configurations.
  * Capturing additional properties such as page referrer or page URL across all events.

{{partial:admonition type="note" heading=""}}
Autocapture Remote Configuration works with [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) v2.10.0+ when `fetchRemoteConfig` is enabled. Browser SDK v2.16.1 enables Remote Configuration by default.
{{/partial:admonition}}

##### To set up remote configuration for autocapture
1. Go to *Data > Settings > Autocapture*. 
2. Specify which elements you want to capture. By default, all elements are captured. You can capture or not capture any of the following elements:
   * **File downloads**: Track when a user clicks an anchor or `<a>` tag linked to a file. 
   * **Form Interactions**: Track a user's interaction with the form element.
   * **Sessions**: Track the period of time that a user has your website open. Amplitude tracks both Start Session and End Session events.
   * **Page Views**: Track when a user navigates to a page.
   * **Element Interactions**: Track when users click links, buttons, inputs and so forth.
3. For Element Interactions, you can specify the following additional aspects:
   * **CSS Selector Allowlist**: CSS selectors that specify which elements on the page should always be tracked.
   * **Action Click Allowlist**: Additional CSS selectors that must be tracked when clicked.
   * **Page URL Allowlist**: Defines one or more URLs or URL patterns on which Amplitude tracks element click and change events. 
   * **Page URL Exclude List**: Defines one or more URLs or URL patterns from Amplitude tracking any element clicks or change events. **Note**: Using RegEx or glob patterns requires your SDK version to be 2.23.7 or higher.
   * **Text Masking RegEx Patterns**: Defines the RegEx patterns that you want to mask for event properties in Autocapture. **Note:** Using this masking feature requires your SDK version to be 2.23.7 or higher. 
   * **Data Attribute Prefix**: Lets the Amplitude capture data attributes as an event property. 
   * **Frustration interactions**: Frustration interactions (rage or dead clicks) performed by the user. Rage clicks are clicks that occurs four or more times in a second. Dead clicks are clicks on an interactive element but resulted in no visible change within three seconds. 
4. Click **Save Changes**.
