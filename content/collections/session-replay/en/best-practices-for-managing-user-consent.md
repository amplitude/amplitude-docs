---
id: 56144a4c-e3e0-4913-b1d3-f6db86468238
blueprint: session-replay
instrumentation_guide: false
title: 'Best practices for managing user consent'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1748626249
---
As privacy laws and regulations continue to evolve, transparency in how companies collect and process user data is more important than ever. If you use Session Replay, it's critical for you to inform your users and get their consent, when necessary.

This article contains best practices to help you share your use of Session Replay in your privacy policy, and get user consent through cookie banners or other notices.

## Disclosure and consent

Session Replay enables you to reconstruct and analyze real user interactions on your site or app. Some jurisdictions may require a notice or consent for this kind of tracking.

## Inclusions for your privacy policy

Amplitude recommends that you update your privacy policy to clearly explain:

* That you use Session Replay technology.
* The kind of data you collect. For example, clicks, navigation patterns, or form interactions.
* The reason you collect this data. For example, to improve usability, troubleshoot issues, or better understand user behavior.
* The way you store, process, and protect data.
* The options that users have to opt out, if applicable.

### Sample disclosure language

Modify or update the following examples to match your company's tone and policy structure.

> We may use cookies and similar technologies to collect information about our customers' interactions with our products and services in a manner that allows us to reproduce and fix issues and to identify areas of improvement for our products and services. You can opt out of the use of this software by contacting us at privacy@company.com.

> We use session replay technology to help us understand how users interact with our website and improve their experience. This technology captures user interactions—such as clicks, scrolling, and typing behavior—so we can identify usability issues and optimize our content. Sensitive information is automatically masked, and we do not use Session Replay to collect or store passwords, credit card numbers, or other sensitive data.

## Cookie banners or consent management tools

In regions that require prior consent, like the EU, you should include Session Replay in your cookie consent banner or Consent Management Platform (CMP). Amplitude's Session Replay SDK makes it easy to integrate Session Replay and its associated cookies with your CMP.

### Cookie and consent banner tips

Keep the following best practices in mind as update your banners:

* Categorize Session Replay under "analytics" or "functional" cookies. Session Replay cookies are **first-party** cookies, and Amplitude never uses your data for its own purposes.
* Don't enable Session Replay by default before consent, if your local laws require it.
* Give users clear control over enabling or disabling Session Replay.
* Consider including a link to your privacy policy or a dedicated Session Replay Information page.

### Sample banner wording

Modify or update the following examples to match your company's tone and style.

> We use cookies on our websites. Your interactions with our website and associated personal data may be collected by us in accordance with our Privacy Policy [hyperlink to privacy policy that includes session replay disclosure].

> We use cookies to personalize content and analyze traffic. We also use tools like session replay to better understand how users navigate our site and improve their experience. You can choose which cookies to allow.

## Amplitude's privacy controls

To help you stay compliant, Session Replay includes:

* Best-in-class [Privacy Settings](https://amplitude.com/blog/session-replay-privacy) to fit your specific privacy requirements.
* Custom masking options that allow you to define which elements Session Replay captures or excludes.
* Configurable data retention to meet your company's data lifecycle policies.

## Addtional resources

* [Building a Privacy-first Session Replay with Amplitude](https://amplitude.com/blog/session-replay-privacy)
* Amplitude's [Trust](https://amplitude.com/trust) page
* [Session Replay Privacy settings](/docs/session-replay/manage-privacy-settings-for-session-replay)

For more detailed legal guidance, consult with your legal team or privacy counsel. 
