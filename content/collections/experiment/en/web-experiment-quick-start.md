---
id: 7242bf21-ed65-4edf-800c-949f21470c44
blueprint: experiment
title: 'Web Experiment quick start'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753137993
---

Web Experiment lets you run A/B tests on your website without code changes. You implement a single script on your site, then use the Visual Editor to create and preview variant changes directly in your browser.

{{partial:admonition type="warning" heading=""}}
This quick start guide contains only the basic information needed to implement Web Experiment. Go to the complete [Experiment documentation](/docs/feature-experiment/overview) to understand the full complexity of the product.
{{/partial:admonition}}

Before you begin, paste the Web Experiment script into the `<head>` element of your site, as high as possible to avoid flickering. The script tracks [impression events](/docs/web-experiment/tracking#impressions) with the [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) already installed on your site, or a third-party analytics SDK.

## Add the experiment script

Replace `API_KEY` with your project's API key in one of the synchronous scripts below, depending on your region:

{{partial:tabs tabs="US Data Center, EU Data Center"}}
{{partial:tab name="US Data Center"}}
```html
<script src="https://cdn.amplitude.com/script/API_KEY.experiment.js"></script>
```
{{/partial:tab}}
{{partial:tab name="EU Data Center"}}
```html
<script src="https://cdn.eu.amplitude.com/script/API_KEY.experiment.js"></script>
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading="Security headers"}}
Your site may need the following security header adjustments to work with Web Experiment.

{{partial:tabs tabs="Content Security Policy, Cross-Origin-Opener-Policy"}}
{{partial:tab name="Content Security Policy"}}
If your site defines the `script-src` content policy directive, add `*.amplitude.com` and `unsafe-inline` to the policy values. These changes enable loading the Web Experiment script and Visual Editor on your site.

```text
Content-Security-Policy: script-src *.amplitude.com unsafe-inline;
```
{{/partial:tab}}
{{partial:tab name="Cross-Origin-Opener-Policy"}}
If your site sets the `Cross-Origin-Opener-Policy` header, remove it or set it to `unsafe-none`. This allows the Visual Editor to load on your site.

```text
Cross-Origin-Opener-Policy: unsafe-none
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:admonition}}

## Set up a web experiment

1. In Amplitude Experiment, navigate to *Experiments > Create Experiment > Web Experiment*.
2. In the *New Experiment* modal, enter a name for your experiment and the URL of the page to target. Amplitude must be instrumented on the target page. Select the appropriate project from the dropdown.
3. If the script is present on the page you specified, Amplitude Experiment opens the page in the [Visual Editor](/docs/web-experiment/set-up-a-web-experiment#the-visual-editor) as a new variant in your experiment.

    You have two options for the treatment variant action: [element changes](/docs/web-experiment/actions#element-changes) or [URL redirect](/docs/web-experiment/actions#url-redirect).

    ![Web Experiment Visual Editor showing element changes and URL redirect options for a treatment variant](/docs/output/img/workflow/web-exp-1.png)

    {{partial:admonition type='warning'}}
    If the script isn't present on the page you specify, or if you have an ad blocker or other privacy extension enabled, Amplitude Experiment can't open the Visual Editor. Instead, it opens the *Site Setup* panel and prompts you to [implement](/docs/web-experiment/implementation) the script.
    {{/partial:admonition}}

4. To change text, colors, or other elements of the page's UI, select **Element Changes**.
5. Select the element you want to change.
6. The editing toolbar opens beside the selected element with quick actions, such as editing the element's content or [moving the element](/docs/web-experiment/set-up-a-web-experiment#move).

    ![Editing toolbar in the Visual Editor showing quick action buttons beside a selected page element](statamic://asset::help_center_conversions::workflow/web-exp-2-update.png)

    Select the expand icon to open the drawer and edit CSS style properties. When you're done, select **Apply**.

    ![CSS style properties drawer in the Visual Editor with Apply button](/docs/output/img/workflow/web-exp-3.png)

7. Repeat this process for each element you want to change for your experiment.
8. If needed, select **+** to add another variant.
9. When you're done, select **Continue**.
10. [Define your experiment's goals](/docs/feature-experiment/workflow/define-goals).
11. In the **Pages** tab, configure which [pages](/docs/web-experiment/pages) your experiment targets. You can create new pages or reuse existing saved pages. If you're only targeting the page you set at creation, skip this step. From the **Include pages where** dropdown, specify how Amplitude Experiment should identify these pages.

    ![Pages tab in experiment setup showing URL targeting configuration with Include pages where dropdown](/docs/output/img/workflow/web-exp-4.png)

    Use the same pattern to exclude the experiment from specific pages. To learn more about precise experiment targeting, go to [managing pages](/docs/web-experiment/pages).

12. Target the users you want to include in this experiment. Web Experiment [audience targeting](/docs/web-experiment/targeting#audience-targeting) works differently from Feature Experiment targeting.
13. The **Advanced** tab provides [additional options](/docs/feature-experiment/workflow/finalize-statistical-preferences) for your experiment.
14. When you're ready, select **Save and Close** to finish creating your web experiment.

{{partial:admonition type="tip" heading="Create a new run of an existing experiment"}}
If you need to re-run an experiment, go to [New Experiment Run](/docs/feature-experiment/troubleshooting/new-experiment-run).
{{/partial:admonition}}

### Test and preview your web experiment

Before running your web experiment, test and preview each variant. When you're ready:

1. Select **Test & Preview**. This puts your experiment in test instrumentation mode, but doesn't start your experiment. Only users who open the page with the preview link can view your changes.
2. In the modal, select **Preview** to open a new tab that applies the changes for that variant. Select the link icon to copy the URL so you can share it with others.

Test each variant at least one time, preferably more. If your experiment targets multiple pages, test each variant on more than one page.

If your changes aren't apparent, wait up to 60 seconds for caches to refresh. If the changes don't appear correctly after that time, the configuration may have an issue.

{{partial:admonition type="warning" heading="Ad blockers"}}
Ad blocking plugins or extensions may prevent you from testing and previewing your experiment.
{{/partial:admonition}}

## Add actions

Actions define how variants modify your site. Actions relate to variants rather than a specific page, and apply to specific [pages](/docs/web-experiment/pages) to control exactly where they apply.

Experiment applies variant actions during evaluation. This happens on the initial page load and any time state pushes to or pops from the session history. History state changes cause the SDK to revert all applied element change and custom code actions before reevaluating and reapplying actions for the updated page.

Actions include:

- [Element changes](/docs/web-experiment/actions#element-changes).
- [URL redirects](/docs/web-experiment/actions#url-redirect).
- [Custom code](/docs/web-experiment/actions#custom-code).

### Action examples

{{partial:admonition type="tip"}}
Generative AI tools such as ChatGPT can create HTML and CSS for simple elements. ChatGPT generated the examples below.
{{/partial:admonition}}

#### Insert an element

To insert an element onto your page, follow this pattern:

1. Write the HTML and CSS for the element you want to add.
2. Identify the selector of the parent element you want to insert your new element into. This is often just the `body`.
3. Paste the following JavaScript code, and update `PARENT_SELECTOR` with the parent element selector from step 2.

    ```js
    utils.waitForElement("PARENT_SELECTOR")
      .then(function (e) {
        e.appendChild(html);
        utils.remove = function () {
            html.remove();
        }
      });
    ```

If you want to insert your element at a specific position within the parent, use `insertBefore()` instead of `appendChild()`.

#### Add a banner

This example adds a discount code banner to the top of the page.

{{partial:tabs tabs="JS, CSS, HTML"}}
{{partial:tab name="JS"}}
```js
utils.waitForElement("body")
  .then(function (e) {
    e.insertBefore(html, e.firstChild);
    utils.remove = function () {
      html.remove();
    }
  });
```
{{/partial:tab}}
{{partial:tab name="CSS"}}
```css
.announcement-banner {
 background-color: #fafafa;
 color: #333;
 padding: 10px;
 text-align: center;
 font-family: Arial, sans-serif;
 border-bottom: solid #e5e5e5;
 border-bottom-width: 1px;
}

.announcement-banner p {
 margin: 0;
 font-size: 16px;
}
```
{{/partial:tab}}
{{partial:tab name="HTML"}}
```html
<div class="announcement-banner">
 <p>🎉 Big Sale: Get 25% off on all items! Use code <strong>SAVE25</strong></p>
</div>
```
{{/partial:tab}}
{{/partial:tabs}}

## Work with pages

In a web experiment, pages control where your experiment variants apply on your site. They scope experiments to specific URLs so you can run tests on targeted pages without impacting unrelated parts of your site.

A page defines the conditions under which a web experiment applies to your site, and includes:

- A unique name.
- URL targeting conditions.
- A Visual Editor URL to help preview the experiment.

### Create a page

When you create a new web experiment, specify a page using one of these methods:

- **Manual URL input**: Enter a specific URL to define the page.
- **Import a saved page**: Select a page from a previous experiment.

After you add the page, continue with experiment setup or go directly to the Visual Editor.

### Update a page or create another

To update a page definition, go to the **Pages** tab of the experiment setup flow, or select the pencil icon in the *Pages* section of the **Settings** tab. From there, rename the page, update its Visual Editor URL, or update the page targeting rules.

#### Page targeting rules

| Operator | Description | Examples |
| --- | --- | --- |
| URL Matches | Match the page URL, ignoring query parameters or hash fragments. | `https://example.com/pricing` ✅ https://example.com/pricing#details ❌ https://example.com/pricing/enterprise |
| URL Matches Exactly | Match the full page URL exactly. | `https://example.com/pricing?utm_source=facebook` ❌ https://example.com/pricing ❌ https://example.com/pricing?utm_source=tiktok |
| URL Matches Pattern | Match the full page URL, including wildcards (`*`). | `https://example.com/blog/*` ✅ https://example.com/blog/my-first-post ✅ https://example.com/blog/my-second-post#get-started |
| URL Contains | Match the full page URL where the URL contains a specific substring. | `/blog/my-first` ✅ https://example.com/blog/my-first-post ❌ https://example.com/blog/my-second-post |
| URL Starts With | Match the full page URL where the URL starts with an exact substring. | `https://example.com/blog` ✅ https://example.com/blog/my-first-post ❌ https://example.com/pricing |
| URL Ends With | Match the full page URL where the URL ends with an exact substring. | `/blog/my-first-post` ✅ https://example.com/blog/my-first-post ❌ https://example.com/blog/my-first-post#get-started |
| URL Matches Regex | Match the full page URL with a regular expression you define. | [Learn Regex](https://www.regular-expressions.info/quickstart.html) [Test Regex](https://regex101.com/) |

### Manage page scope for variants

In a web experiment, you can scope each variant to a specific page to ensure that variant changes apply only where you intend. This applies to all variant types.

#### Visual Editor

When you use the Visual Editor to make changes—for example, text edits or style updates—those changes associate with the page you select during the preview session. For each change, specify the page or pages it applies to.

You can:

- Assign updates or changes to a specific page.
- Avoid applying the same change across all views.
- Maintain better isolation and clarity across your experiment setup.

{{partial:admonition type="tip" heading="Double-check the page scope"}}
Check the page scope for each change to ensure you don't introduce cross-page conflicts or unintended edits.
{{/partial:admonition}}

#### Custom code

When you add custom code or URL redirects as variants, you can explicitly define which page or pages the variant applies to. This lets you create a single experiment with custom code that behaves differently depending on the active page.

## Targeting

Web Experiments target both pages and audiences. Amplitude evaluates page targeting first, then audience targeting. Both targeting methods evaluate locally in the browser when the page first loads.

Web Experiments use [pages](/docs/web-experiment/pages) to precisely control where experiment variants apply on your website. Pages define the conditions under which a web experiment applies, including URL targeting conditions and Visual Editor URLs for previewing experiments.

### Audience targeting

By default, a new web experiment targets all users. Audience targeting lets you target specific users. Users who aren't targeted in the experiment receive the default experience and don't count toward analysis.

If any segments match, Amplitude buckets the user into a variant based on the configured rollout and variant distribution. For a segment to match, it must meet all conditions you set. Go to [Web Experiment targeting](/docs/web-experiment/targeting) for more details.

### Web Experiment performance

Web Experiment intentionally minimizes its impact on page performance.

#### Script size

The Web Experiment script is dynamic, and includes all your experiment configurations to avoid making multiple synchronous downloads. The script size starts with a base size and scales with each experiment.

|  | Uncompressed | Compressed |
| --- | --- | --- |
| Base script | 79 KB | 20 KB |
| Per-flag size | ~1 KB | ~100 B |

To avoid constantly increasing script sizes, deactivate or archive experiments when they're complete.

{{partial:admonition type="note" heading="Custom code impact on flag size"}}
Custom code increases the size of a flag's code because of the size of the custom code itself.
{{/partial:admonition}}

#### CDN caching

Amplitude caches the Web Experiment script on a CDN. When a user requests the script, their browser loads it from the CDN if another user loaded it in the same geographic area. The CDN cache has a max age of one minute, and serves stale content while the script reloads for up to one hour. The script serves a stale response if the origin returns an error for the maximum amount of time possible.

The cache control response header that configures CDN caching is:

`max-age=60,stale-while-revalidate=3600,stale-if-error=31536000`

#### Browser caching

The browser cache serves the Web Experiment script without making a network request for 60 seconds, or as long as possible if the server returns an error. This caching layer serves the script from memory (0 ms latency) if a user loads multiple pages on your site or reloads the same page within a one-minute window.

The cache control response header that configures browser caching is:

`max-age=60,stale-while-revalidate=3600`

To run feature flag-based experiments in your code, go to [Feature Experiment quick start](/docs/feature-experiment/experiment-quick-start).
