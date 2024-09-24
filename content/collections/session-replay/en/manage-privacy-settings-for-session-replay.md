---
id: 7ad57931-a43f-4f50-97a9-5f2d69ea538a
blueprint: session-replay
title: 'Manage privacy settings for Session Replay'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720719132
source: 'https://help.amplitude.com/hc/en-us/articles/26605783882779-Manage-privacy-settings-for-Session-Replay'
this_article_will_help_you:
  - 'Ensure your use of Session Replay complies with data privacy requirements'
---
For many organizations, data privacy, security, and PII are more pressing concerns than they’ve ever been before. Because the potential for legal exposure varies from jurisdiction to jurisdiction, and because specific business needs vary considerably, no one-size-fits-all solution works for everyone.

This is why Amplitude’s Session Replay feature enables you to specify the types of user data displayed during a replay. These privacy settings are flexible enough to adhere to your company’s legal and security requirements, no matter what they are. Once they’re set, you can enjoy the peace of mind that comes with knowing that nothing can inadvertently fall through the cracks.

When these privacy settings are active, Amplitude **masks** the user data you specify in all session replays you create and view. Masking data prevents Amplitude from collecting it from your product in the first place. It **doesn't** remove the data from your own product data repository.

## Masking levels

There are three out-of-the-box privacy levels for Session Replay. You can also implement custom overrides when necessary.

- **Conservative**. This option is for companies that retain a large amount of sensitive customer data. Selecting this choice masks **all text and all form fields**. This includes  HTML text, user input, and links. It **doesn't** mask text in pictures, videos, thumbnails, or other static assets. [Use CSS Selectors](https://https://www.w3schools.com/cssref/css_selectors.php) to exclude any pictures, videos, or thumbnails that contain sensitive information. Examples of companies that might choose this option are financial services firms, CRM systems, online betting companies, geospatial technology companies, and companies in the healthcare and medical technology industries—all sectors in which the inadvertent release of sensitive user data could have serious repercussions.

- **Light**. This option is for companies that retain very little sensitive customer data, and those who want to get up and running quickly and selectively choose any relevant fields to mask. Selecting this choice will only mask a **subset** of sensitive inputs: things like passwords, credit card numbers, telephone numbers, or email addresses. Examples of companies that might choose this option are business productivity app developers, restaurant- or appointment-booking software companies, and ecommerce sites.

- **Medium**. This is the default option for Session Replay privacy settings. When selected, it masks all form fields and text inputs; Amplitude captures all other text as-is.

Any changes you make to these privacy levels take precedence over privacy definitions set in the SDK.

## Set your privacy level

To set the Session Replay privacy level, navigate to _Settings > Organizational Settings > Session Replay Settings_ and select the appropriate project. Each project has its own settings. You can always see a summary of your masking level and overrides for each project on the main Session Replay Settings page.

### Override preset policy levels

You can override the out-of-the-box masking settings for individual elements by editing the elements’ matching [CSS selectors](https://www.w3schools.com/cssref/css_selectors.php).

To do so, right-click on your application and select Inspect mode. Under *Masking Overrides*, enter the CSS selector you want to change and click *+ Add Selector*. This process can be used to mask, unmask, or exclude individual elements.

**Unmasking** an element also unmasks its child elements. If needed, you can re-mask these child elements using the process described above. However, when you **mask** an element using CSS selectors, you **also** mask its child elements. You **can't** then unmask these child elements.

When you **exclude** an element using CSS selectors, Amplitude replaces the element with an empty placeholder element of the same dimensions. It also excludes any child elements.

{{partial:tabs tabs="mask, unmask, exclude"}}
{{partial:tab name="mask"}}
![](statamic://asset::help_center_conversions::session-replay/image2.png)
{{/partial:tab}}
{{partial:tab name="unmask"}}
![](statamic://asset::help_center_conversions::session-replay/image1.png)
{{/partial:tab}}
{{partial:tab name="exclude"}}
![](statamic://asset::help_center_conversions::session-replay/image3.png)
{{/partial:tab}}

{{/partial:tabs}}

{{partial:admonition type="tip" heading="Avoid site performance issues with masking"}}
If you experience site performance degredation due to the number of masking rules you create, Amplitude recommends excluding content, rather than masking it.
{{/partial:admonition}}

## How Session Replay resolves conflicts between the SDK and the UI

When there are conflicts between the SDK and the Session Replay settings page around the handling of a particular element—whether Amplitude should mask, unmask, or exclude it—the **Session Replay settings page takes precedence**.

For example, imagine you’ve used the Session Replay settings page to mask `.selector1` and unmask `.selector2`. But an engineer has made a change to the SDK that masks `.selector3`—and at the same time, they inadvertently **un**masked `.selector1`.

When this happens, Session Replay combines the settings from the SDK and the UI, but the settings specified for `.selector1` in the UI take precedence:

|	| .selector1	| .selector2	| .selector3 |
|---|-----------|-----------|----------|
|Session Replay settings| MASK | UNMASK | |	
|SDK settings |	UNMASK | | MASK |
|End results | MASK | UNMASK | MASK |

### CSS selectors

Session Replay's configuration supports many types of [CSS Selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors). Specify an element tag (`h1` or `textarea`), a class name (`.hidden`) or a data attribute.

Data attributes may be useful if your class names change often due to hashing. To use  data attributes, add a custom attribute like `data-amp-unmask` or `data-amp-mask` to any HTML element. For example, `<textarea data-amp-unmask></textarea>`, then enclose the attribute in square brackets when you specify the selector, `[data-amp-unmask]`.