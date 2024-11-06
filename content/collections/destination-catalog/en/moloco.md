---
id: 263e2efd-9386-4843-b5ef-bfbcb3ff6920
blueprint: destination-catalog
title: Moloco
source: 'https://docs.developers.amplitude.com/data/destinations/moloco'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
integration_category:
  - marketing-automation
partner_maintained: false
integration_icon: partner-icons/moloco.svg
short_description: 'Launch a new profit center with your own ad business.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480427
---

[Moloco](https://www.linkedin.com/company/moloco/) is a machine learning company that provides performance solutions for digital advertising. Their products include the Moloco Cloud DSP for mobile advertising and the Moloco Commerce Media (MCM) for online retailers. Both products are powered by Moloco's machine-learning engine, which optimizes campaigns and provides personalized recommendations to customers.

This integration lets you stream events and event properties from Amplitude to Moloco Commerce Media (MCM).

## Considerations

Keep these things in mind when sending events to Moloco Commerce Media (MCM):

- You must enable this integration in each Amplitude project you want to use it in.
- The Amplitude integration is only compatible with Moloco Commerce Media (MCM). 
- You need a Moloco Commerce Media (MCM) account to enable this integration.
- Amplitude matches the **user ID** to the ID field within Moloco Commerce Media (MCM) to associated events. If a user with that ID doesn't exist within Moloco Commerce Media (MCM), Amplitude creates one. Make sure that the Amplitude `user_id` field matches the Moloco **Identity ID** to avoid user duplication.
- Amplitude sends all user properties along with the event.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Moloco Commerce Media (MCM), you need the following information from Moloco Commerce Media (MCM):

- **REST API Key:** To send data into Moloco Commerce Media (MCM), you need an API Key. Moloco uses this key to authenticate your requests to the API and connect the data with your account. Find this in your Moloco Commerce Media (MCM) account. 

### Amplitude setup

1. In Amplitude Data, click *Catalog* and select the *Destinations* tab.
2. In the Event Streaming section, click *Moloco*.
3. Enter a sync name using one of the following values. Then click *Create Sync*. Create a sync for each event type.
  - `ADD_TO_CART`
  - `ADD_TO_WISHLIST`
  - `HOME`
  - `ITEM_SEARCH_VIEW`
  - `LAND`
  - `PAGE_VIEW`
  - `PURHCASE`
  - `SEARCH`
4. Toggle Status from **Disabled** to **Enabled**.
5. Fill in the following fields
    1. **REST API Key**: This is the API key provided by moloco
    2. **Platform ID**: Identifier of the platform (for example, `Moloco Demo Test`)
    3. **Event Type** Type of the event this destination delivers. See the available options in step 3 above.
    4. **Platform Name**: Name of the platform. Should be all lower-cased and replace underscore `_` and empty spaces with a hyphen `-`
6. Toggle the **Send events**.
7. In **Select and filter events** choose which events you want to send. Choose only the events you need in Moloco. *Transformed events aren't supported.*
8. Under *Map properties to destination*, choose your user identifier and map specific Amplitude properties from Amplitude to Moloco.
9. When satisfied with your configuration, click *Save*.

### Event types

The following chart provides detailed information for each event type.

| Event Type      | Description                                                                                 | Additional Required Fields                                                                             |
| --------------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| HOME            | A shopper viewed your website's main or home page.                                          |                                                                                                        |
| PAGE_VIEW       | A shopper visited a page other than the product detail pages or the home page of your site. | `page_id` <br> *Anything that can identify the page uniquely. Use `window.location.pathname` if unsure.* |
| ITEM_PAGE_VIEW  | A shopper visited a product detail page.                                                    | `items`                                                                                                  |
| ADD_TO_CART     | A shopper added an item to the cart.                                                        | `items`                                                                                                  |
| ADD_TO_WISHLIST | A shopper put an item into the wish list.                                                   | `items`                                                                                                  |
| SEARCH          | A shopper searches items with keywords or phrases from your site.                           | `search_query`                                                                                           |
| PURCHASE        | A shopper purchased a product.                                                              | `items`, `revenue`                                                                                         |
| LAND            | A shopper visited your website from an external source (for example, Google Shopping).      | `referrer_page_id`                                                                                       |

### Mapping chart

See the following chart for the mapping section.

| Moloco Field               | Type   | Required | Native      | Amplitude Property | Description                                                                                                                                                                                                   | Example                                                                           |
| -------------------------- | ------ | -------- | ----------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `platform`                 | string | Y        | Platform    |                    | The type of the channel                                                                                                                                                                                       | Android                                                                           |
| `event_id`                 | int    | Y        | Event ID    |                    | Unique identifier of an event                                                                                                                                                                                 | 1234567890                                                                        |
| `user_id`                  | string | N        | User ID     |                    | Unique identifier of a user                                                                                                                                                                                   | testUserID                                                                        |
| `os_name`                  | string | N        |             |                    | The device’s OS                                                                                                                                                                                               | Android                                                                           |
| `os_version`               | string | N        |             |                    | The version of the device’s OS                                                                                                                                                                                | 9.1                                                                               |
| `device_type`              | string | N        | Device type |                    | The model of the device                                                                                                                                                                                       | Samsung Galaxy Note 4                                                             |
| `device_persistent_id`     | string | N        | Device ID   |                    | The UDID of the device used for the event                                                                                                                                                                     | English                                                                           |
| `custom_id`                | string | N        | Session ID  |                    | Session ID                                                                                                                                                                                                    | 12345678912345678                                                                 |
| `language`                 | string | N        | Language    |                    | Language setting of the device                                                                                                                                                                                | English                                                                           |
| `ip_address`               | string | N        | IP Address  |                    | IP Address of the device                                                                                                                                                                                      | 198.0.0.1                                                                         |
| `library`                  | string | N        | Library     |                    | Library/User Agent of the device                                                                                                                                                                              | amplitude-android/3.2.1                                                           |
| `shipping_charge_currency` | string | N        |             |                    | The shipping charge’s currency in ISO-4217                                                                                                                                                                    | USD                                                                               |
| `shipping_charge_amount`   | double | N        |             |                    | The shipping charge without currency (15.5 if $15.5)                                                                                                                                                          | 15.5                                                                              |
| `revenue_currency`         | string | N        |             |                    | The revenue’s currency in ISO-4217                                                                                                                                                                            | USD                                                                               |
| `revenue_amount`           | double | N        |             |                    | The entire revenue of the event without currency (15.5 if $15.5)                                                                                                                                              | 15.5                                                                              |
| `page_id`                  | string | N        |             |                    | Page ID should be a uniquely assigned value for each page in the app or website. Provide a string that can identify the context of the event. Any value will be acceptable if it helps identify unique pages. | - electronics <br> - categories/12312 <br> - Azd911d <br> - /classes/foo/lectures |
| `referrer_page_id`         | string | N        |             |                    | Similar to the referrer in HTTP, this value indicates which page the user came to the current page from.                                                                                                      | https://mycommerce.com/category/furniture                                         |
| `search_query`             | string | N        |             |                    | Query string for the search                                                                                                                                                                                   | microwave ovens                                                                   |
| `items`                    | obj    | N        |             |                    | Items information. Details can be found below.                                                                                                                                                                |                                                                                   |

## Use cases

* **Real-time user segmentation:** By sending streaming data from Amplitude to Moloco, you can create real-time user segments based on various attributes and behaviors. This enables you to target specific user groups with personalized advertisements and optimize campaign performance accordingly.
* **Dynamic Ad Creative Optimization:** By integrating Amplitude's streaming data with Moloco's machine learning engine, you can leverage real-time user insights to dynamically optimize ad creative elements. This includes dynamically adjusting ad content, images, offers, and calls to action based on user preferences and behaviors, resulting in more engaging and effective advertisements.
* **Behavioral Retargeting:** Amplitude captures user behavior data across various touchpoints, providing valuable insights into user engagement and conversion patterns. By streaming this data to Moloco, you can implement behavioral retargeting strategies, where users who have shown specific behaviors or indicated interest in certain products or services are retargeted with relevant ads across different channels and devices.
