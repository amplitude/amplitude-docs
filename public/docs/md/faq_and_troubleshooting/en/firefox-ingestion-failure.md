---
id: 5fc5ea00-0297-4253-b1c8-23998e06e05b
blueprint: faq_and_troubleshooting
title: 'Firefox ingestion failure'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/4403261888781'
category: governance
---
This article covers some frequently asked questions about event ingestion failure for Firefox users.


{{partial:collapse name="Why is Firefox blocking the Amplitude SDK?"}}
In Firefox, the **tracking protection** feature is automatically enabled in standard mode. However, Amplitude will not be able to record events when this feature is switched to “strict,” or when a private browser window is being used. This feature blocks trackers for cross-site tracking; its main purpose is to protect user privacy when browsing across the web.

To read more about what tracking protection is and how it affects tracking, read Mozilla’s documentation [here](https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop#w_what-enhanced-tracking-protection-blocks).

Because this feature is designed specifically to prevent cross-site tracking, it **blocks the Amplitude SDK**—Firefox blocks the network requests, which results in events failing ingestion.

The following errors will appear when tracking protection is enabled in the Firefox browser:

Failed POST request:

![image1.png](/docs/output/img/faq/image1-png.png)
{{/partial:collapse}}


{{partial:collapse name="How do I fix the ingestion issue?"}}
According to the engineering team here at Amplitude, the best solution is to build a proxy server and make the JS SDK point to it. Check out our [documentation on how to create a proxy](/docs/analytics/domain-proxy) to learn more.
{{/partial:collapse}}
