---
id: c454ef9c-c0f1-4c74-bd2f-3029cd1a6107
blueprint: source-catalog
title: RevenueCat
source: 'https://www.docs.developers.amplitude.com/data/sources/revenuecat'
category: 'Subscription Management'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/revenuecat.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825606
---
[RevenueCat](https://www.revenuecat.com/) provides subscription infrastructure for mobile apps. It allows developers to deploy cross-platform subscriptions, manage products and subscribers, and analyze customer data without managing servers or writing backend code.

Use this integration to create a behavioral cohort of customers based on specific actions, like performing an event after subscribing, or measure the path of a user from viewing marketing content to subscribing.

## Considerations

- For complete information on the kinds of events sent by RevenueCat, see the [RevenueCat documentation](https://docs.revenuecat.com/docs/amplitude).
- If you have any feedback about the RevenueCat source and its documentation, reach out to RevenueCat's[community forum](https://community.revenuecat.com/) or [RevenueCat Support team](mailto:support@revenuecat.com).

## Setup

### Amplitude setup

Before you begin, you need your Amplitude project API key. 

If you're using an Amplitude SDK, set user ID to match the RevenueCat user ID to match users. See [RevenueCat's documentation](https://docs.revenuecat.com/docs/amplitude#setup) for detailed instructions. 

### RevenueCat setup

1. In RevenueCat, navigate to your project in the dashboard and find the **Integrations** card in the left menu.
2. Choose Amplitude from the Integration Menu.
3. Enter your Amplitude API key.
4. Name the events that RevenueCat sends, or choose to use default event names.
5. Choose whether you want RevenueCat to report proceeds (after app store cut) or revenue (gross sales).
6. When finished, select **Add Integration**.

See detailed instructions for this integration in the [RevenueCat documentation](https://docs.revenuecat.com/docs/amplitude).