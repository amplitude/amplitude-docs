---
id: 02e1a247-91b8-48ac-aabb-e1ab3b46042f
blueprint: source
title: 'Track revenue'
source: 'https://help.amplitude.com/hc/en-us/articles/115003116888-Track-revenue'
this_article_will_help_you:
  - 'Understand your options for tracking revenue in Amplitude'
  - 'Learn how to track in-app and non-in-app purchases and validate revenue data'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718137658
---
When you begin sending revenue events to Amplitude, you can choose from a handful of different configuration options.

{{partial:admonition type='note'}}
Amplitude currently **does not support currency conversion**. All revenue data should be normalized to your currency of choice **before** being sent to Amplitude. 
{{/partial:admonition}}

All revenue events that send revenue as [revenue properties](#h_7a841611-ad4f-459a-98ce-073a4a1fe8e5) will appear in the [Revenue LTV](/analytics/charts/revenue-ltv/revenue-ltv-track-new-user-monetization) chart (including both verified and unverified events). See the following documentation for more information on sending revenue events:

* [iOS SDK](/docs/sdks/analytics/ios/ios-swift-sdk)
* [Android SDK](/docs/sdks/analytics/android/android-kotlin-sdk)
* [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2)
* [HTTP API](/docs/apis/analytics/http-v2) (set the `price`, `quantity`, and `revenue` fields to record the event as a revenue event)

Amplitude will only count events that you send and that are processed through the Amplitude ingestion system. Any computed events **are not counted separately.** Therefore, any additional events attached to revenue events (e.g verified / unverified) **will not be counted** towards your limit.

## Revenue properties

Amplitude needs certain information in order to track revenue:

* The `$revenue` property, which can be passed directly, **OR**
* The `$price` property. In most cases, you will also want to include the `$quantity` property, as Amplitude calculates revenue using a formula of `$price * $quantity`. If `$quantity` is not present, Amplitude will use a default value of 1 in its place.

| **Name** | **Type** | **Description** | **Default** |
| --- | --- | --- | --- |
| $revenue | Double | The total revenue of your user's purchase (can be negative). This is **required** if you wish the revenue event to appear in a Revenue LTV chart. | null |
| $price | Double | The price of the products purchased (can be negative).  | null |
| $productId | String | An identifier for the product. | null |
| $quantity | Integer | The quantity of products purchased. Defaults to one if not specified. | 1 |
| $revenueType | String | The type of revenue (e.g. tax, refund, income). | null |
| eventProperties | Object | An object of event properties to include in the revenue event. You will only be able to segment on these properties in the [Event Segmentation](/docs/analytics/charts/event-segmentation) chart. | null |

Note that these properties must be explicitly sent **by you** via Amplitude's SDKs or server-side when you log revenue events.

## Track non-in-app purchases

For purchases **other than** in-app purchases, there are three ways to send revenue data to Amplitude:

* Use Amplitude's [SDKs](/docs/sdks/analytics) to call the `logRevenueV2` function (this generates the `Revenue` events).
* Use Amplitude's SDKs to call the `logEvent` function, provided you include the `$revenue` property.
* Use Amplitude's HTTP API (by setting the `price`,  `quantity`, or `revenue` fields - you will need to add your own event name, for example, "Purchase completed").

{{partial:admonition type='note'}}
Verified revenue checks are only performed for in-app purchases.
{{/partial:admonition}}

## Track in-app purchases (IAPs)

To track IAPs, send revenue events the same way you would send regular revenue events, by using `logRevenueV2` or `logEvent` (with the `$revenue` property) in Amplitude's SDKs. The difference is that you can validate your IAPs by passing in receipt data with the revenue event.

### Enable revenue verification

To enable revenue verification, copy your iTunes Connect In App Purchase Shared Secret or your Google Play License Public Key into the Sources section of your project in Amplitude Data. You must include a key for each Amplitude project where you want revenue verification. You will also need to pass in receipt data in order for Amplitude to verify the revenue event.

There are three different types of revenue events in Amplitude that correspond to the `logRevenue` call within the SDK; they are separate from the revenue events sent server-side via HTTP API:

1. **Revenue** This event will always be logged for revenue events, regardless of whether revenue verification is turned on. However, this event will not populate the `$revenue` property; the `Revenue (Verified/Unverified)` events do this. If you want the event to appear in a Revenue LTV chart, you must turn revenue verification on. If you have revenue verification turned on and only see a `Revenue` event in the user activity stream with no corresponding `Revenue (Verified/Unverified)` event, this means that the revenue failed verification.
2. **Revenue (Verified):** This verified event will be logged whenever there is a legitimate transaction. As a result, the difference between `Revenue` and `Revenue (Verified)` is the number of illegitimate app purchases that have been made. By default, revenue events recorded on the SDKs appear in Amplitude dashboards as unverified revenue events. You will have to enable revenue verification in order to see `Revenue (Verified)` events.
3. **Revenue (Unverified):** If a revenue event is unverified, that **does not mean** it failed verification. It means Amplitude did not attempt to verify it since it came through the HTTP API, Javascript SDK, or because your project did not include any revenue verification keys. If verification is not on, this event will be logged for all revenue events.

{{partial:admonition type='note'}}
Verification can only be switched on or off for mobile. Web will always track `Revenue` and `Revenue (Unverified)`.
{{/partial:admonition}}

Amplitude will display any revenue that does not fail verification. This means you may see both `Revenue (Verified)` and `Revenue (Unverified)` if, for example, you are sending both mobile and web revenue events through our SDKs.

### Receipt validation

Amplitude validates based on the receipt from [Apple](https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html#//apple_ref/doc/uid/TP40010573-CH104-SW1) or [Google](https://developer.android.com/google/play/billing/billing_integrate.html#Purchase).

### Discrepancies

The discrepancy between reports in the app store and Amplitude can be attributed to factors like time zone differences, event generation bugs, or even piracy.

If the discrepancy is minor and consistent on a day-to-day basis, the most likely cause is the difference in time zone reporting between the app store and Amplitude. Because Amplitude uses UTC, a purchase event uploaded on a certain day according to Amplitude may be reported by the app store as occurring on a different day if the app store is using a different time zone, and vice versa. No data are being lost.

Major discrepancies can be the result of client-side errors, such as the store purchase callback getting called multiple times for a single purchase. A good practice is to only call these events upon return from a successful store purchase. An example call, which tracks the event property and revenue amount, is:

```
AmplitudeClient.getInstance().logEvent('IAP', {type='Sale Special'})

```

```
AmplitudeClient.getInstance().logRevenueV2("com.company.productid", 1, 2.99)

```

Another cause for major discrepancies is piracy. A user can circumvent the app store and make purchases that do not show up in the app store reports. To avoid seeing pirated revenue events in your data, we recommend using Amplitude's revenue verification method to track revenue events. If you suspect your data are being skewed heavily because of piracy, then please contact us [here](/hc/en-us/requests/new).

### Considerations for Developers

Regarding tracking revenue events, there are a few things to take into consideration. 

* **Backwards compatibility**: The existing `logRevenue` methods still work but are deprecated. Fields such as `revenueType` will be missing from events logged with the old methods, so the ability to segment on those revenue events will be limited in the Amplitude platform.
* **Opting user out of logging**: You can turn off logging for a given user by calling `setOptOut`:

```
amplitude.getInstance().setOptOut(true);

```

No events will be saved or sent to the server while this is enabled. The opt out setting will persist across page loads. You can reenable logging by calling:

```
amplitude.getInstance().setOptOut(false);

```