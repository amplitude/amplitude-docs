---
id: 5f5f262d-2ff8-42bb-b0a5-138711b47595
blueprint: faq_and_troubleshooting
title: 'Instrument on third-party site builders'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360044374851'
category: other
---
This article covers some frequently asked questions about using Amplitude with third-party website builders.  

{{partial:admonition type='note'}}
These instructions may become outdated as the third-party platforms under discussion here make changes and upgrades. Amplitude's Support team will provide support for the instructions and processes contained in this article only; they cannot provide recommendations for anything not included here.
{{/partial:admonition}}


{{partial:collapse name="How do I instrument Amplitude on a third-party website builder?"}}
Your website may not be natively built, but is instead built on a third-party website builder like Wix or Squarespace. Like a website built natively, most third-party website builders have an underlying code base you can use. Add Amplitude's [Javascript SDK](/docs/sdks/analytics/browser/javascript-sdk) to that space, as if you were adding the SDK to your natively-built website. Generally, you will need to add the [JS SDK snippet](/docs/sdks/analytics/browser/javascript-sdk#install) to the header and the rest of the JS SDK code in the body. 

If you don't have access to the header or underlying source code for the third-party's website, you should still be able to use [webhooks](https://en.wikipedia.org/wiki/Webhook) to combine a [trigger](https://support.zendesk.com/hc/en-us/articles/203662106) or [automation](https://support.zendesk.com/hc/en-us/articles/203662126) with an HTTP [target](https://support.zendesk.com/hc/en-us/articles/203662136) to Amplitude's server-side endpoint - [HTTP v2](/docs/apis/analytics/http-v2).
{{/partial:collapse}}


{{partial:collapse name="How do I instrument Amplitude on Wix?"}}
Wix has a Tracking Tools & Analytics feature, which you can use to embed Amplitude’s JS SDK snippet and code to your site.

To do so, follow these steps:

1. Go to[*Settings* in your site's dashboard](https://www.wix.com/my-account/site-selector/?buttonText=Manage%20Settings&title=Select%20a%20Site&autoSelectOnSingleSite=true&actionUrl=https://www.wix.com/dashboard/%7B%7BmetaSiteId%7D%7D/manage-website).
2. Click the *Tracking & Analytics* tab, under *Advanced Settings*.
3. Click *+ New Tool* and select *Custom*.
4. Set up your custom code:
	1. Enter your custom code.
	2. Select the relevant domain. This option will appear only if you have multiple domains.
	3. Enter a name for your custom code.
	4. Add Code to Pages: Select which pages to add your code to:
		* All Pages: Click the dropdown and select either *Load code once*, or [*Load code on each new page*](https://support.wix.com/en/article/custom-code-loading-options).
		* Choose specific pages: Begin typing the name of the relevant pages. Then click the checkbox next to the relevant page.
	5. Place Code in: Select where the code snippet in placed in your site's code.
		* Head: this is where the [JS SDK install snippet](/docs/sdks/analytics/browser/javascript-sdk#install) should be on every page you wish to track analytics.
		* Body: this is where all other calls—[logEvent](https://www.docs.developers.amplitude.com/data/sdks/typescript-browser/migration/?h=logevent#tracking-events), [user properties](/docs/sdks/analytics/browser/migrate-from-javascript-sdk-to-browser-sdk-1-0#set-user-properties)—should go.
5. Click *Apply*.

Some customers have told us that Wix allows you to add header scripts, but not to call functions from them. One suggested workaround is putting the necessary script in the Public folder.

**Further reading on Wix**

* [Adding custom code to your site](https://support.wix.com/en/article/about-tracking-tools-analytics)
* [Embedding custom code on your site](https://support.wix.com/en/article/embedding-custom-code-to-your-site)
{{/partial:collapse}}


{{partial:collapse name="How do I instrument Amplitude on Squarespace?"}}
Squarespace's Code Injection and Code Block features let you embed Amplitude’s JS SDK snippet and code to your site.

{{partial:admonition type='note'}}
These features may be premium features, only available in Business and Commerce plans.
{{/partial:admonition}}

**Code Injection**

Use Code Injection to add Amplitude’s JS SDK install snippet and other scripts that enhance specific parts of your site, like an order confirmation page.

To add JavaScript to a Code Injection field, surround the code with <script></script> tags. There are site-wide code injection and per-page code injection options. See [this page](https://support.squarespace.com/hc/en-us/articles/205815908) for a per-page code injection option. If you add code to Code Injection, Squarespace may ask you to [disable it while editing your site](https://support.squarespace.com/hc/articles/205815908#toc-disable-scripts-in-preview).

Next, add the JS SDK install snippet with Code Injection by following these steps:

1. Open Code Injection. In the *Home* menu, navigate to *Settings* *> Advanced >* *Code Injection*.
2. Add JS SDK code into the appropriate Code Injection fields for the header, footer, lock page, or order confirmation page.
	* Header: Code added here is injected into the <head> tag on every page in your site.**This is where the Amplitude JS SDK install snippet will be.**
	* Learn more about your other three options [here](https://support.squarespace.com/hc/en-us/articles/205815908).
3. After adding your code, click *Save*.

**Code Block**

Use Code Block to set up logEvent, user properties etc calls. To add JavaScript to a Code Block field, surround the code with <script></script> tags.

To add a Code Block, follow these steps:

1. Edit a page or post, click an insert point, and select *Code* from the menu. For help, visit [Adding content with blocks](https://support.squarespace.com/hc/articles/206543757).
2. [Add your code](https://support.squarespace.com/hc/en-us/articles/206543167#toc-add-code) in the text field: see our [Using the SDKs](/docs/sdks/analytics/browser/browser-sdk-2#track-an-event) documentation for the event and properties calls.
3. If you're using the Code Block to [display code snippets](https://support.squarespace.com/hc/en-us/articles/206543167#toc-display-source), check *Display Source*.
4. Click *Apply* to save your changes.
{{/partial:collapse}}