---
id: ada3fc20-dc33-492a-a98d-dcd98200f733
blueprint: faq_and_troubleshooting
title: 'Unexpected values in user counts'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360016257391'
---
While grouping your events by an event or user property, you may have noticed that some of your results have been sorted into a group called `(none)`. In Amplitude, `(none)` represents a null value.

But why do some of your users have null event or user property values?

This article answers some frequently asked questions about why your users have null and unexpected property values.

Why my event property being sorted into the `(none)` bucket?
Amplitude is an **event based** analytics platform, and all charts and cohorts query at the event level. Charts will return the event property value **at the time of an event**.

Because an event property is a component of an event, event property values can be unique at the event level. If you send an event with a null value at the time of the event, grouping by that event property will sort some events or users into the `(none)` bucket.

Here's an example. User A triggered `Send Message` once on January 1st and once on February 1st. The `Audience` event property was instrumented on January 15th, and thus was not available when the user triggered `Send Message` on January 1st. The `Audience` property can only have values equal to `Default` and `Mentioned_Contacts.` When User A fired `Send Message` on February 1st, it had an event property of `Audience = Default.`

Based on that information, how will User A be counted in the chart below?

![none_groupby.png](/docs/output/img/faq/none-groupby-png.png)

User A will be counted once in the `Default` bucket and once in the `(none)` bucket. User A had `Audience = Default` at the time of the February 1st event, and `Audience = (none)` at the time of the January 1st event.

Events and users will be sorted according to the property value that was sent **at the time of the event.**

Why is my user property not showing an expected value?
Like event properties, charts will return the user property value **at the time of an event**.

User properties are stored in a separate table and applied to events according to the process described [here](/hc/en-us/articles/207108327-Step-4-Set-User-Properties-and-Event-Properties#applying-user-properties-to-events). When a user's user property values update, the user property values attached to historical events will **not** change.

Why is my custom property showing a null value?
The custom user properties attached to your users' events will reflect the user property values present at the time of the event.

Here's another example. You've instrumented a user property type called `Account_Type` on January 15th. User A is a registered user who has an account type of `Shopper`, and she triggered `Add Item to Cart` once on January 1st and once on February 1st.

Based on that information, how will User A be counted in the chart below?

![none_account_type.jpeg](/docs/output/img/faq/none-account-type-jpeg.jpeg)

Because the `Account_Type` user property was not instrumented until January 15th, all events triggered **prior** to January 15th have a null value for `Account_Type.` User A will be counted once in the `(none)` bucket and once in the `Shopper` bucket.

When results are measured by Uniques, users are deduplicated within each **unique** bucket. This means that if User A triggered `Add Item to Cart` with their `Shopper` account type on February 1st **and** February 2nd, User A will still be counted only once in the `Shopper` bucket above.

This same logic holds when you send non-null user property values. Events and users will be sorted according to the property value that was applied **at the time of the event.**

We have this logic implemented because user attributes can change over time. `City` , for example, is an attribute that can change by the hour as users travel to different cities and trigger events there. Understanding where the user was located at the time of the event can be more valuable than understanding where the user was most recently located.

My location property shows a `(none)` value. How do I fix it?
Location user properties (such as `![amplitude_logo.png](/docs/output/img/faq/amplitude-logo-png.png)
 City`, `![amplitude_logo.png](/docs/output/img/faq/amplitude-logo-png.png)
 DMA`, `![amplitude_logo.png](/docs/output/img/faq/amplitude-logo-png.png)
 Region`, and `![amplitude_logo.png](/docs/output/img/faq/amplitude-logo-png.png)
 Country`) are determined by GeoIP. Amplitude uses the [MaxMind](https://www.maxmind.com/en/home) database, which is widely accepted as the most reliable digital mapping source, to look up location information from the user's IP address.

For client-side events, location properties can have `(none)` values if MaxMind returns null for that IP address. Even through MaxMind is considered as the most reliable source, accuracy and availability of city/region information can vary by country (more info [here](https://www.maxmind.com/en/geoip2-city-accuracy-comparison?country=&resolution=50)).

For server-side events, location property values are determined either by GeoIP (which falls back on `location_lat` and `location_long` if unavailable), or explicitly defined in your API call. Amplitude's [HTTP API](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/) allows you to send custom `City` , `DMA` , `Region` , and `Country` values with your events. If you choose to send these values, Amplitude will not modify them to reflect GeoIP. Please be sure to update all four fields together; setting any one of these fields will automatically reset all others (see Footnotes 1 [here](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/#503-service-unavailable)).

Why is my device property showing a `(none)` value?
Amplitude determines `![amplitude_logo.png](/docs/output/img/faq/amplitude-logo-png.png)
 Device family` and `![amplitude_logo.png](/docs/output/img/faq/amplitude-logo-png.png)
 Device type` by grabbing `device_brand`, `device_manufacturer`, and `device_model` strings directly from your user's device and then mapping these strings to our repository of device types.

With each new phone model that comes out globally, there may be some device types that have not yet been mapped. In these cases, `![amplitude_logo.png](/docs/output/img/faq/amplitude-logo-png.png)
 Device type` will be `(none)`.

Outside of device mapping, server-side events may also have null device information if these fields (`platform`, `os_name`, `os_version`, `device_brand`, `device_manufacturer`, `device_model`, and `carrier`) were not updated together. Setting any of these fields will automatically reset all of the other property values to null if they are not also explicitly set for the same event.
