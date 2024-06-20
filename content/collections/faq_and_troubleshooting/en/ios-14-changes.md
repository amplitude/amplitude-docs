---
id: 5dc53136-fa98-4e18-909c-08db3bf2be0a
blueprint: faq_and_troubleshooting
title: 'iOS 14 changes'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360047228311'
---
At WWDC 2020, Apple announced that iOS 14 will require users to opt in to tracking. This means that the IDFA will only be present for users who explicitly opt-in. It's likely that the percentage of users who choose to do so will be relatively low.

![Screenshot_2020-08-03_at_11.00.41.png](/docs/output/img/faq/screenshot-2020-08-03-at-11-00-41-png.png)

This article covers some frequently asked questions about Apple's iOS 14 IDFA changes.

Does Amplitude accept IDFA (Identifier for Advertisers) as the device identifier on iOS?
By default, Amplitude’s iOS SDK uses IDFV (Identifier for Vendor) for the device ID. You can always change this and opt to use whatever you want as the device identifier. The SDK includes an option to use IDFA as the device ID, but this will only work if the user has permitted the application to use IDFA.

What are the implications of Apple’s IDFA changes on user tracking?
For all logged-in users, there will be no impact. Even if the device ID changes, events will continue to merge from devices when Amplitude receives a common user ID. There is some potential for impacts on anonymous users, however.

For anonymous users, there will be no changes in most cases, because the vast majority of Amplitude customers do not set IDFA as the device ID. For customers who are doing this, the device ID was stored when the SDK was originally initialized, and it will continue to send Amplitude the same ID as long as the application remains installed on the device.

If a user deletes and reinstalls an application that does use IDFA for device ID, the former device ID will not be retained. Instead, a new random device ID will be generated, unless the user grants the application permission to use IDFA.

For all new application installs, the SDK will accept IDFA if both the user has opted in and the application chooses to use IDFA.

Does Amplitude require IDFA on attribution events?
No. Amplitude’s attribution API will accept both IDFA and IDFV, and will attempt to match those IDs to user events it receives subsequently. In some cases, IDFV will be enough to make a match, but some of our customers’ attribution providers only send IDFA. For these customers, Amplitude will no longer be able to match attribution events, unless the user has **explicitly opted-in** to both the referring and installed application.

It's likely that some attribution vendors will stop sending any individual attribution events. However, it's unlikely that aggregated data will be sent to Amplitude (due to the nature of the platform itself), unless customers or attribution vendors can segment that data and use it to set user properties. 

How will this affect outbound integrations?
If you're sending data to outbound integrations, there will be a lower match rate if you use IDFA to match devices between Amplitude and the integration. We recommend that you switch to IDFV or another common identifier instead.
