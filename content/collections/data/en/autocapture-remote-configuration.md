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
Autocapture remote configuration lets you make adjustments to your implementation to pull in additional metadata that you need into Analytics. Remote configuration is typically used after your initial implementation of Autocapture is live. Use Remove Configuration after you analyze your first data capture and you discover what adjustments to make in the type of data you want. 

With remote configuration you can:

* Modify the SDK settings to adjust which events you want to capture. Such as:
  * Turn specific Autocapture events on or off.
  * Configure Autocapture events such as allowed elements or allowed pages and add sub-configurations.
  * Capture additional properties such as page referrer or page URL across all events.

## Setting up remote configuration

Remote configuration 

##### To set up remote configuration for autocapture
1. Go to *Data > Settings > Autocapture*. 
2. Specify which elements you want to capture. By default, all elements are captured. You can select any of:
   * **File downloads**: Track when a user clicks an anchor or `<a>` tag linked to a file. 
   * **Form Interactions**: Track a user's interaction with the form element.
   * **Sessions**: Track the period of time that a user has your website open. Amplitude tracks both start and end events.
   * **Page Views**: Tack when a user navigates to a page.
   * **Element Interactions**: Track when users click on links, buttons, inputs and so on.
3. For Element Interactions, you can specify the following additional aspects:
   * **CSS Selector Allowlist**: CSS selectors that specify which elements on the page should always be tracked.
   * **Action Click Allowlist**: Additional CSS selectors that must be tracked which clicked.
   * **Page URL Allowlist**: Defines the URL(s) or URL patter on which Amplitude tracks element click and change events.
   * **Data Attribute Prefix**: Lets the SDK capture data attributes as an event property. 
4. Click **Save Changes**.
