---
id: 796a351d-cea1-417a-8c0b-2fa7c849b8ad
blueprint: source-catalog
title: SnowcatCloud
partner_maintained: true
exclude_from_sitemap: false
updated_by: 05a6104d-5b58-4e1b-9c95-830dd2fd2e09
updated_at: 1761361075
connection: source
integration_category:
  - cdp
integration_icon: partner-icons/snowcatcloud.svg
use_cases:
  - 'Product Analytics'
  - 'Marketing Analytics'
  - 'Customer 360'
  - CDP
  - 'Fraud Detection'
  - 'Real-time recommendations'
integration_type:
  - event-streaming
  - raw-events
short_description: 'Stream enriched event data from SnowcatCloud into Amplitude for advanced analytics.'
partner_doc_link: 'https://www.snowcatcloud.com/docs'
---
[SnowcatCloud](https://www.snowcatcloud.com) is a cloud-hosted customer data infrastructure built on the open-source [OpenSnowcat](https://opensnowcat.io) platform (Snowplow fork).

SnowcatCloud empowers teams to collect, enrich, and route first-party behavioral data with full transparency. It reliably delivers clean data to data warehouses and streaming infrastructure, and seamlessly integrates with platforms like Amplitude.

{{partial:admonition type="note" title=""}}
SnowcatCloud's integration with Amplitude is fully **server-side**. Beyond the initial setup, you don't need additional instrumentation or client-side changes to deliver events to Amplitude.
{{/partial:admonition}}


## Setup overview

To send data from SnowcatCloud to Amplitude:

1. Configure your SnowcatCloud pipeline to use the **Amplitude destination**.
2. Select the **Standard** or **EU residency** Amplitude endpoint.
3. Provide your **Amplitude API key** in the destination configuration.
4. Send a test event

Key features:

* **Batch uploads** to Amplitude’s HTTP V2 API
* **Automatic field mapping** to Amplitude’s schema
* **Rich contextual data** - including session, geographic, and device information


## Field mapping overview

SnowcatCloud uses this field mapping to translate enriched events into Amplitude-compatible payloads:

| Category     | Amplitude Field | Source Field (SnowcatCloud Enriched)                                         | Format/Notes       |
| ------------ | --------------- | ----------------------------------------------------------------------- | ------------------ |
| Event Type   | `event_type`    | `event_name` (unstruct) / `event` (page_view)                           | Trimmed            |
| Insert ID    | `insert_id`     | `event_id`                                                              |                    |
| User ID      | `user_id`       | `user_id`                                                               | Sanitized          |
| Device ID    | `device_id`     | `network_userid`                                                        | Resolved device ID |
| Timestamp    | `timestamp`     | `dvce_created_tstamp`                                                   | Unix ms            |
| User Agent   | `user_agent`    | `useragent`                                                             |                    |
| Platform     | `platform`      | `platform`                                                              |                    |
| OS Name      | `os_name`       | `contexts_com_snowplowanalytics_snowplow_ua_parser_context_1.osFamily`  |                    |
| OS Version   | `os_version`    | `contexts_com_snowplowanalytics_snowplow_ua_parser_context_1.osVersion` |                    |
| Device Brand | `device_brand`  | `contexts_nl_basjes_yauaa_context_1.deviceBrand`                        |                    |
| Device Model | `device_model`  | `contexts_nl_basjes_yauaa_context_1.deviceName`                         |                    |
| Country      | `country`       | `contexts_com_dbip_location_1.country.names.en`                         |                    |
| City         | `city`          | `contexts_com_dbip_location_1.city.names.en`                            |                    |
| Latitude     | `location_lat`  | `contexts_com_dbip_location_1.location.latitude`                        |                    |
| Longitude    | `location_lng`  | `contexts_com_dbip_location_1.location.longitude`                       |                    |

### Event properties

| Property         | Source          |
| ---------------- | --------------- |
| `raw_event_name` | `event`         |
| `page_encoding`  | `doc_charset`   |
| `page_location`  | `page_url`      |
| `page_referrer`  | `page_referrer` |
| `page_title`     | `page_title`    |

### User properties

| Property       | Source         |
| -------------- | -------------- |
| `utm_campaign` | `mkt_campaign` |
| `utm_source`   | `mkt_source`   |
| `utm_medium`   | `mkt_medium`   |
| `utm_content`  | `mkt_content`  |
| `utm_network`  | `mkt_network`  |
| `utm_term`     | `mkt_term`     |


## More help

Contact SnowcatCloud support ([support@snowcatcloud.com](mailto:support@snowcatcloud.com)) or Amplitude support.