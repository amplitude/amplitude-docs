---
id: 40e5e616-40b7-4b5e-96a0-ac70689b6150
blueprint: data
title: 'Persistent Properties'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1762540974
---
Persistent properties are event properties to related to metrics and events beyond the specific event where the value was originally captured. Property persistence determines how long a property value is accessible and to which events it is associated after it's observed. 

For example, a customer clicks a Facebook add to reach your website. Clicking the add generates the property `utm_source = facebook`. By making that property value persisted, you can specify that you want to apply that value to all subsequent clicks your customer makes on your website. This means that you know which products are sold, which pages are visited, how long the customers stayed on your site, and so on, based on the visit that originated from that Facebook ad.

You can set the persistence to any length of time you want. Using the previous example, you could set the persistence for the `utm_source = facebook` property for seven (7) days. 

Persistences relies on the following concepts:

* **Allocation**: Which value receives credit for the property.
* **Expiration**: When that credit expires.

## Allocation

Over time, multiple values could appear for the same property. Allocation determines which value is retained when multiple values for a property are available. 

For example, you have a customer who visits your site through a Facebook ad, by directly entering your website's URL, and by Googling your website and then clicking through the search results. 
. 
You can set the allocation to be one of: 

* **Most recent**: The latest value, the one most recently received, is used. 
* **Original**: The first value received is used and never updated.
* **All**: Every value received gets credit simultaneously.
* **First known**: The earliest value received is applied to all events, even ones that happened before the value was captured.
* **Last known**: The final value received is applied to all events, even ones that happened before the value was captured. 

## Expiration

Expiration when you want a specific property persisted and available for allocation. This is typically expressed as how long you want a value to receive credit for the property. 

You can set the expiration in the following ways:

* **Session**: The value expires at the end of a session.
* **User**: The value does not expire because it's tied to the user, not a time limit. 
{{partial:admonition type="note" heading="User time limit"}}
Although the User expiration setting doesn't expire, there is a functional limit of about 365 days to this setting.
{{/partial:admonition}}
* **Custom Time**: The value expires after a specific period of time such as 24 hours, 30 days, 90 minutes, and so forth.
* **Event**: The value expires after a specific event occurs. For example, the expiration event could be a purchase or lead submission. Expiration events are only available for Original and Most Recent allocation settings. 

### Basic allocation and expiration example

The following describes a basic example of persistent properties and how different allocation and expiration settings can affect the value of a persistent property. This is considered a basic example because it is the most common usage for persistent properties.

In this example, your customer has visited your website three times in a week and has made a purchase. The property you want to persist is `utm_source`. This means that you want to track where how the customer arrived at your website.

* Day 1: User clicks Facebook ad `utm_source = "facebook"`.
* Day 2: User returns to your website by typing your URL directly `utm_source = "(direct)"`.
* Day 5: User clicks a Google ad `utm_source = "google"`.  
* Day 7: User completes a purchase.

The different allocation and expiration settings generate the following persisted (credited) values:

| Allocation |  Expiration  | Purchase credited to  |
|   -----   |   -----   |   -----   |
|   Most Recent |   7 days  |   Google (last value within the date window)  |
|   Original    |   7 days  |   Facebook (fist value, never overwritten)    |
|   All |   7 days  |   Facebook, Direct, and Google (all three values) |
|   Most Recent | Session   |   Google (if purchase happened in same session as google add) |
|   Most Recent |   3 days  |   Google (Facebook and Direct fall outside the date window)   |

### Advanced merchandising example

The following describes an advanced example of persistent properties. Typically, advanced persistent properties only relate to merchandising properties and events. 

In this example, 

## Designate persistent properties

You can designate almost any property to be a persistent property. However, not all allocations and expirations are compatible. Only compatible allocation/expiration combinations are selectable

1. Go to *Data > Properties*. Then, click property you want.
2. In the Details tab, select if you want a basic persistent property or if you want a more advanced marketing persistent property. The example above aligns with basic persistent properties.
3. Select the allocation for how you want the value persisted. You can select one of:
   * Most recent
   * Original
   * All
   * First known
   * Last known
4. Select the expiration you want for the persisted value. You can select one of:
   * Session
   * User 
   * Custom Time
   * Event 
5. Click **Save**.