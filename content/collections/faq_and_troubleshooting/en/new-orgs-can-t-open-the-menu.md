---
id: 8cab66c2-7105-4601-a7c8-40093fddff0b
blueprint: faq_and_troubleshooting
title: "New orgs can't open the menu"
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360058925232'
---
This article covers a frequently asked question about a new organization's limitations within Amplitude.

Why can't new users navigate the left-hand menu?
When a new org is created on Amplitude, all team members will start on the Amplitude *Settings* page. There will be no option to open the left-hand menu. This can make it seem like the user is "stuck" on the *Settings* page, or that they cannot navigate to any other page on Amplitude.

This happens because Amplitude cannot populate any charts until it has data to work with. To open the left hand menu, you must first correctly set up your data sources and send data to Amplitude. Once the charts have data to query on, your left menu will uncollapse. You will then be able to navigate through the Amplitude UI.

You can use the developer's docs linked [here](https://developers.amplitude.com/docs/how-amplitude-works) to start sending your events through one of Amplitude's SDKs, APIs, or partner integrations.
