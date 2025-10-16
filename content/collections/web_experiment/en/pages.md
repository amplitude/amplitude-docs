---
id: b87d183d-4b47-4f19-a2cf-e9d31c5faf47
blueprint: web_experiment
title: 'Web Experiment Pages'
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1758917857
---
In a Web Experiment, Pages control where your experiment variants apply on your site. They help scope experiments to specific URLs, enabling you to run tests on targeted pages, without impacting unrelated parts of your site.

A Page defines the conditions under which a web experiment applies to your site, and includes:

* A unique name
* URL targeting conditions
* A Visual Editor URL to help preview the experiment

## Create a page

When you create a new Web Experiment, specify a page by:

* **Manual URL input**: Enter a specific URL to define the page.
* **Import a saved page**: Select a page from a previous experiment.

After you add the page, continue with experiment setup, or go directly to the Visual Editor.

## Update a page or create another

To update a page definition, navigate to the Pages tab of the Experiment Setup flow, or click the pencil icon on the Pages section of the Settings tab. From there, rename the page, update its Visual Editor URL, or update the page targeting rules.

### Page targeting rules

| Operator            | Description                                                            | Examples                                                                                                                                     |
| ------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| URL Matches         | Match the page URL, ignore query parameters or hash fragments.         | `https://example.com/pricing` <br /> ✅ https://example.com/pricing#details <br /> ❌https://example.com/pricing/enterprise                    |
| URL Matches Exactly | Match the full page URL exactly.                                       | `https://example.com/pricing?utm_source=facebook` <br /> ❌https://example.com/pricing <br /> ❌ https://example.com/pricing?utm_source=tiktok |
| URL Matches Pattern | Match the full page URL, including wildcards (`*`).                    | `https://example.com/blog/*` <br /> ✅ https://example.com/blog/my-first-post <br /> ✅ https://example.com/blog/my-second-post#get-started    |
| URL Contains        | Match the full page URL, where the URL contains a specific substring.  | `/blog/my-first` <br /> ✅ https://example.com/blog/my-first-post <br /> ❌ https://example.com/blog/my-second-post                            |
| URL Starts With     | Match the full page URL, where the URL starts with an exact substring. | `https://example.com/blog` <br /> ✅ https://example.com/blog/my-first-post <br />❌ https://example.com/pricing                               |
| URL Ends WIth       | Match the full page URL, where the URL ends with an exact substring.   | `/blog/my-first-post` <br /> ✅ https://example.com/blog/my-first-post <br /> ❌ https://example.com/blog/my-first-post#get-started            |
| URL Matches Regex   | Match the full page URL with a regular expression you define.          | [Learn Regex](https://www.regular-expressions.info/quickstart.html) <br /> [Test Regex](https://regex101.com/)                               |


## Manage page scope for variants

In a web experiment, you can scope each variant to a specific page to ensure that the variants changes apply only where you intend. This is the case for all variant types.

### Visual editor

When you use the Visual Editor to make changes, for example text edits or style updates, those changes associate with the page you select during the preview session. For each change, specify the page or pages it applies to.

This enables you to:

* Assign updates or changes to a specific page
* Avoid applying the same change across all views
* Maintain better isolation and clarity across your experiment setup

{{partial:admonition type="tip" heading="Double-check the page scope"}}
Check the page scope for each change to ensure you don't introduce cross-page conflicts or unintended edits.
{{/partial:admonition}}

### Custom code

When you add custom code or URL redirects as variants, you can explicitly define which page or pages the variant applies to.

This enables you to create a single experiment that includes custom code with different behaviors, depending on the active page.

### URL redirect

Select the page in the the URL redirect variant's settings. Scoping the redirect to a specific page or set of pages ensures that the experiment redirects users only if the the specified page is active.

## Technical details

* Experiment evaluates pages after bucketing. This ensures that a page's variant impacts only users who are in the experiment. 
* Amplitude deactivates pages that conflict with other pages in your experiment. 

## Known limitations

* Pages aren't supported in:
  * Feature Flags
  * Experiment Templates
  * Management API
  * Experiments converted to templates or flags.
* You can't delete or archive a page.
* Amplitude doesn't include pages in universal search or experiment table views.
* Pages don't appear in alerts or notifications.