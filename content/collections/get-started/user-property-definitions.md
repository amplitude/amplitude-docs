---
id: 4d421b64-f9f4-45c7-b0d6-ea0708c21b78
blueprint: get-started
title: 'User property definitions'
source: 'https://help.amplitude.com/hc/en-us/articles/215562387-User-property-definitions'
this_article_will_help_you:
  - 'Understand how Amplitude defines user properties'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1716572205
---
By default, Amplitude tracks the user properties listed in the table below automatically, via client-side [SDKs](https://www.docs.developers.amplitude.com/data/sdks/sdk-overview/#analytics-sdks). All these properties will be prefixed with

![amplitude_logo.png](/output/img/get-started/amplitude_logo.png) 

whenever you encounter them in Amplitude. If you prefer, configure Amplitude's SDKs to disable automatic tracking of these properties:

* [Browser SDK](https://www.docs.developers.amplitude.com/data/sdks/browser-2/#optional-tracking)
* [iOS SDK](https://www.docs.developers.amplitude.com/data/sdks/ios-swift/#disable-tracking)
* [Android SDK](https://www.docs.developers.amplitude.com/data/sdks/android-kotlin/#disable-tracking)

Amplitude uses the collected IP address to determine a user's location properties (`City`, `Country` , `Region`, and `DMA`) using the [MaxMind](https://www.maxmind.com/en/home) database. MaxMind is widely accepted as the most reliable digital mapping source.

In Amplitude charts, if you choose to segment by device ID, event ID, latitude, longitude, server upload time, session ID, user ID, or ID, you'll have to supply the exact values you're looking yourself. Additionally, you will not be able to group by event ID, latitude, longitude, server upload time, or ID.

**NOTE:** If you’re sending data server-side instead of using an SDK, Amplitude cannot track these user properties automatically. You must instead set these properties explicitly. 

| **Property** | **Value Definition** |
| --- | --- |
| Cohort | [Behavioral cohort](https://help.amplitude.com/hc/en-us/articles/231881448-Amplitude-2-0-Behavioral-Cohorts) name: "Cohort Name" |
| Country | Country of the event. This is pulled using GeoIP. "United States" |
| City | City of the event. This is pulled using GeoIP. "San Francisco" |
| Region | Region (e.g. state, province, county) of the event. This is pulled using GeoIP. "California" |
| DMA | Designated Market Area (DMA) of the event. This is pulled using GeoIP. "San Francisco-Oakland-San Jose, CA" |
| Language | Language of the device. "English" |
| Paying | Paying is set to null for all users by default. The property value changes to "true" at the time of the user's first revenue event (or first verified revenue event, if [validation](https://help.amplitude.com/hc/en-us/articles/115003116888-Revenue-Technical-#verification) is on). Once a property is set to "true", it will not change. You can manually change this value via Amplitude's [Identify API](/hc/articles/205406617): "true", null/none |
| Platform | Platform of the product. "iOS", "Android", or "Web" |
| OS | `OS` = `os_name` + `os_version`. `os_name` is the name of the user's mobile operating system or browser. `os_version` is the version of the users' mobile operating system or browser. "ios 9.1", "Chrome 46" |
| Device Family | Family of the device. "Apple iPhone", "Samsung Galaxy Tablet", "Windows" |
| Device Type | Specific type of the device. "Apple iPhone 6", "Samsung Galaxy Note 4", "Windows". Events tracked by Amplitude's [Javascript SDK](https://developers.amplitude.com/docs/javascript) will display device family values e.g. "Apple iPhone" etc. This SDK does not track the specific type of device. |
| Carrier | The device's carrier. "Verizon" |
| Start version | First version of your application identified for the user. This can change if the user reinstalls the app. "1.0.0" |
| Version | Current version of your application identified for the user. "1.0.0" |
| Library | Library used to send the event. "amplitude-ios/3.2.1", "http/1.0" |
| IP Address | IP address of the user. "127.0.0.1" |
| Device ID | The device ID of the user. "C8F9E604-F01A-4BD9-95C6-8E5357DF265D" |
| Latitude | The latitude of the user. "42.3296" |
| Longitude | The longitude of the user. "-88.9995" |
| User ID | The user ID of the user. This should be a unique user identifier of the user and should never change for the same user, e.g. a hashed string of the user's username.This is explicitly set by the customer; Amplitude does not auto-populate this field. "abc123" |
| ID | The Amplitude ID of the user. "16342233234" |