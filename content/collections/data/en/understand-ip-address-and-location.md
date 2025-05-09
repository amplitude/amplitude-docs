---
id: 9771eb95-0cac-4de7-a34b-c65f7e157f67
blueprint: data
title: 'IP address, location, and device properties'
source: 'https://help.amplitude.com/hc/en-us/articles/17646803703323-Understand-IP-address-and-location-properties'
this_article_will_help_you:
  - 'Understand how Amplitude defines and uses location properties to enhance your analyses'
  - 'Understand how Amplitude tracks location properties when IP addresses are blocked or filtered out'
  - 'Understand how Amplitude parses user agent data to determine device and platform information'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722895713
---
Data that highlights user location properties, such as a user's city and country, are crucial for generating insights related to the geographical distribution of your users. They can show you how user preferences and behaviors differ from region to region, and help you better optimize your product. Similarly, device and platform information helps you understand which devices and operating systems your users are using.

## How Amplitude tracks location properties

Amplitude uses the [MaxMind](https://www.maxmind.com/en/home) database to look up location information from the user's IP address. Even though MaxMind data is generally highly reliable, the [accuracy and availability of city and region information can vary by country](https://www.maxmind.com/en/geoip2-city-accuracy-comparison?country=&resolution=50).

By default, Amplitude uses the GeoIP to gather location property values based on `location_lat` and `location_long`. You may explicitly define how Amplitude tracks a user's location properties server-side. Amplitude's [HTTP API](/docs/apis/analytics/http-v2) allows you to send your own `[Amplitude] City`, `[Amplitude] DMA`, `[Amplitude] Region`, and `[Amplitude] Country` values with your events.

{{partial:admonition type="note" heading=""}}
If you choose to send these values, Amplitude doesn't modify them to reflect GeoIP. Always update all four fields together, as setting any one of the fields resets the others.
{{/partial:admonition}}

## How Amplitude determines location properties when IP address is blocked or filtered out

Even if you have chosen to block or filter IP addresses in your data ingestion, Amplitude uses the IP address to find location properties. The following steps outline how this works in the backend:

1. An event is uploaded with an IP address.
2. Amplitude uses the IP address to find the location data, and adds all the relevant fields to the event.
3. The system looks at the tracking options and filters for the project, excluding blocked or filtered fields as applicable.
4. When you look at this specific event in Amplitude, it doesn't have an associated IP address. However, it has related location properties, such as city and country.

If you are using an SDK and want Amplitude to drop IP addresses, configure the options within the [SDK](/docs/sdks/analytics). If you want to remove IP addresses on events moving forward, file a Service Task request on the Support form.

## How Amplitude parses user agent and device information

Amplitude automatically parses the user agent string from client-side SDKs to extract valuable device and platform information. This information is then added to your events as properties, allowing you to segment and analyze user behavior across different devices and platforms.

### User agent parsing

When client-side SDKS (for example, Browser, iOS, Android) send events, Amplitude automatically captures and parses the user agent string to find:

1. **Device model**: The specific device model (for example, `iPhone 13`, `Samsung Galaxy S21`)
2. **Operating system**: The OS and its version (for example, `iOS 15.4`, `Android 12`")
3. **Browser**: For web traffic, the browser and its version (for example, `Chrome 98.0.4758.102`)
4. **Platform**: The general platform category (for example, `iOS`, `Android`, `Web`)
5. **Manufacturer**: The device manufacturer (for example, `Apple`, `Samsung`)

### Device properties

Amplitude automatically adds the following device-related properties to events:

| Property              | Description                                                        | Example Values                      |
| --------------------- | ------------------------------------------------------------------ | ----------------------------------- |
| `device_brand`        | The manufacturer of the device                                     | "Apple", "Samsung", "Google"        |
| `device_manufacturer` | Like `device_brand`, but may contain more specific information | "Apple Inc.", "Samsung Electronics" |
| `device_model`        | The specific model of the device                                   | "iPhone13,2", "SM-G998U"            |
| `device_type`         | The type of device                                                 | "iPhone", "Android"                 |
| `os_name`             | The name of the operating system                                   | "iOS", "Android", "Windows"         |
| `os_version`          | The version of the operating system                                | "15.4", "12.0", "11"                |
| `platform`            | The platform category                                              | "iOS", "Android", "Web"             |
| `browser`             | For web traffic, the browser used                                  | "Chrome", "Safari", "Firefox"       |
| `browser_version`     | For web traffic, the browser version                               | "98.0.4758.102", "15.3"             |

### How user agent parsing works

1. **Client-side collection**: The SDK automatically collects the user agent string from the client device.
2. **Server-side parsing**: When Amplitude receives the event, it parses the user agent string using a combination of regular expressions and user agent parsing libraries.
3. **Property assignment**: Amplitude adds the parsed information to the event as properties.
4. **Analysis availability**: These properties are then available for segmentation, filtering, and analysis in Amplitude.

### Controlling device property tracking

If you want to disable the automatic tracking of certain device properties, you can use the `trackingOptions` configuration in the SDK. For example, in the Browser SDK:

```javascript
amplitude.init(AMPLITUDE_API_KEY, {
  trackingOptions: {
    platform: false,
    language: false
  }
});
```

### Mobile-specific device information

For mobile SDKs (iOS, Android), Amplitude collects additional device information:

1. **iOS**: Device model, OS version, and carrier information when available
2. **Android**: Device model, manufacturer, OS version, carrier, and screen dimensions

This information can help you understand how your app performs across different device types and OS versions.

### Custom device properties

If you need to track additional device information not automatically captured by Amplitude, you can add custom properties to your events:

```javascript
// Example of adding custom device properties
amplitude.track('Button Clicked', {
  'screen_resolution': '1920x1080',
  'connection_type': 'wifi',
  'battery_level': 85
});
```