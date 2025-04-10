---
id: b6d9db0a-6c66-4f90-809b-a0b6f021048b
blueprint: destination-catalog
use_cases:
  - 'The TikTok Ads Event Streaming Integration allows you to seamlessly stream event data from Amplitude to TikTok Ads using the TikTok Events API. With this integration, growth and marketing teams can fully leverage their first-party behavioral data by syncing key user actions—such as sign-ups, purchases, and engagement events—directly into TikTok Ads in real time.'
short_description: 'TikTok is the world’s leading destination for short-form mobile videos. The TikTok Ads integration allows you to seamlessly stream event data from Amplitude to TikTok Ads.'
integration_category:
  - ad-networks
integration_type:
  - event-streaming
title: 'TikTok Ads (Event streaming)'
source: 'https://docs.developers.amplitude.com/data/destinations/tiktok-ads'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/tiktok.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1744300433
---
[TikTok](https://www.tiktok.com/) is the world's leading destination for short-form mobile videos. Their mission is to capture and present the world's creativity, knowledge, and moments that matter in everyday life.

The TikTok Ads Event Streaming Integration allows you to seamlessly stream event data from Amplitude to TikTok Ads using the TikTok Events API. With this integration, growth and marketing teams can fully leverage their first-party behavioral data by syncing key user actions—such as sign-ups, purchases, and engagement events—directly into TikTok Ads in real time.

By enabling real-time data sharing, this integration helps teams:
- Improve ad targeting with richer audience insights
- Enhance conversion tracking accuracy
- Optimize campaign performance through smarter segmentation and retargeting

This powerful connection bridges the gap between product analytics and advertising outcomes, helping you drive higher ROI and make more data-informed decisions on your TikTok ad campaigns.

## Considerations

- TikTok Ads requires SHA256 encryption for identifiers (External ID, Email, Phone Number). If your Amplitude property isn't pre-encrypted, Amplitude applies SHA256 when it sends the property to TikTok Ads.
- This connector use TikTok Ads event tracking API: https://business-api.tiktok.com/open_api/v1.3/event/track/
    - Documentation: [TikTok Events API](https://business-api.tiktok.com/portal/docs?id=1771101303285761)
- Type requirements:
    - Phone Number must be in the E.164 format (for example, `+14155552671`)
    - Currency values must use ISO 4217 currency codes (for example, `USD`, `EUR`, `JPY`).
    - Price and value must be in number format (e.g., 19.99)
    - Quantity must be an integer (e.g., 2)

## Setup

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Events section, click **TikTok Ads** to to configure a new event streaming sync.
3. Fill in the required fields in the setup form:
    - Pixel ID: You can find this in TikTok Ads Manager under Management > Events.
    - Access Token: Get this from your TikTok developer account. It must have permissions for the TikTok Events API.
    - Test Event Code (optional): Used to test and validate events before sending live traffic. You can find your Test Event Code in your TikTok Events Manager under the “Test Event” tab.
    - Content Type: Use "Product" when the event relates to a specific item or SKU, and use "Product Group" when the event involves a broader category or collection of products (for example, a product listing page or variant group).
4. Under Mappings, define how Amplitude user properties should map to TikTok Ads identifiers. Supported TikTok Ads properties include: External ID, Email, Phone Number, TikTok Click ID, Cookie ID, IP Address, User Agent
5. Under Select & filter events, choose the Amplitude events you want to stream and map them to TikTok Ads event names. You can select from TikTok Ads' predefined event names, such as:
    - AddPaymentInfo
    - AddToCart
    - AddToWishlist
    - ClickButton
    - CompletePayment
    - CompleteRegistration
    - Contact
    - Download
    - InitiateCheckout
    - PlaceAnOrder
    - Search
    - SubmitForm
    - Subscribe
    - ViewContent
    - CustomizeProduct
    - FindLocation
    - Schedule
    - Alternatively, use a custom event name from the dropdown if you already use custom event name on TikTok Ads.

6. Map event-level properties from Amplitude to TikTok Ads fields to enrich your event payloads. Supported TikTok Ads properties include:
    - Price
    - Quantity
    - Content ID
    - Content Category
    - Content Name
    - Brand
    - Currency
    - Value
    - Query
    - Description
    - URL
    - Referrer