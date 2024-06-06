---
id: 9771eb95-0cac-4de7-a34b-c65f7e157f67
blueprint: data
title: 'Understand IP address and location properties'
source: 'https://help.amplitude.com/hc/en-us/articles/17646803703323-Understand-IP-address-and-location-properties'
this_article_will_help_you:
  - 'Understand Amplitude defines and uses location properties to enhance your analyses'
  - 'Understand how Amplitude tracks location properties when IP addresses are blocked or filtered out'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717612556
---
Data that highlights user location properties, such as a user's city and country, are crucial for generating insights related to the geographical distribution of your users. They can show you how user preferences and behaviors differ from region to region, and help you better optimize your product. 

## How Amplitude tracks location properties

Amplitude uses the [MaxMind](https://www.maxmind.com/en/home) database to look up location information from the user's IP address. Even though MaxMind data is generally highly reliable, the [accuracy and availability of city and region information can vary by country](https://www.maxmind.com/en/geoip2-city-accuracy-comparison?country=&resolution=50).

By default, Amplitude uses the GeoIP to gather location property values based on `location_lat` and `location_long`. You may explicitly define how a user's location properties will be tracked server-side. Amplitude's [Http API](/docs/apis/analytics/http-v2) allows you to send your own `[Amplitude] City`, `[Amplitude] DMA`, `[Amplitude] Region`, and `[Amplitude] Country` values with your events.

{{partial:admonition type="note" heading=""}}
If you choose to send these values, Amplitude will not modify them to reflect GeoIP. Always update all four fields together, as setting any one of the fields will automatically reset the others.
{{/partial:admonition}}

## How Amplitude determines location properties when IP address is blocked or filtered out

Even if you have chosen to block or filter IP addresses in your data ingestion, Amplitude will still use the IP address to determine location properties. The following steps outline how this works in the backend:

1. An event is uploaded with an IP address.
2. Amplitude uses the IP address to determine the location data, and adds all the relevant fields to the event.
3. The system looks at the tracking options and filters for the project, excluding blocked or filtered fields as applicable.
4. When you look at this specific event in Amplitude, it will not have an associated IP address. However, it will have related location properties, such as city and country.

{{partial:admonition type="note" heading=""}}
Any IP address currently known for a user will be synced to all future events by default. To change it, you can unset the IP address with the [identify API](/docs/apis/analytics/identify).
{{/partial:admonition}}

If you are using an SDK and want Amplitude to drop IP addresses, configure the options within the [SDK](/docs/sdks/analytics). If you want to remove IP addresses on events moving forward, file a Service Task request on the Support form.