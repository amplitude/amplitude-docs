---
id: 1ae531b1-d015-4e67-a80d-e66e32b037cc
blueprint: faq_and_troubleshooting
title: Instrumentation
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360052358472'
landing: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738264824
---
This article covers some frequently asked questions about Amplitude instrumentation.

{{partial:collapse name="Can values be deleted or altered after ingestion?"}}
Once data is ingested into Amplitude, it cannot be altered. Amplitude's current architecture is based on pre-aggregated sets by the hour, day, week, and month, for both users and events. This allows Amplitude to easily perform large-scale queries, but it does require the data to be immutable. 

Data can be deleted at the individual user level in compliance with GDPR and other privacy laws via the User Privacy API. More details on this API can be found [here](/docs/apis/analytics/user-privacy).
{{/partial:collapse}}


{{partial:collapse name="How is Device ID set?"}}
Device IDs are set differently when sending client-side events (using Amplitude's SDKs) vs server-side events (HTTP API). 

* SDKs
	* The Device ID for Android is by default randomly generated UUID, unless you opt to use Google's Advertising ID as the Device ID.
	* For iOS SDK, Device IDs are set to the Identifier for Vendor (IDFV) if available; otherwise they are randomly generated. You can choose instead to use the Advertising Identifier (IDFA) as well, if available.
* Server-side (HTTP API)
	* For server-side events, Device ID must be manually sent in the event. If there is no Device ID available, the Device ID will be set to a randomly-generated hashed version of the `user_id`. More details [here](/docs/apis/analytics/http-v2).
	* If the same Device ID set-up is not maintained for server-side events and client-side events, the same user will have different Device IDs even if the device model, language and carrier are the same.
{{/partial:collapse}}


{{partial:collapse name="Can two different events have the same name?"}}
No. Each event name must be unique across an entire project. Two events with the same name will be considered the same event. If you notice two events in a project with the same name, it's possible that the display name for one of them was inadvertently set to the same name as another event. You can confirm by expanding the event in Amplitude Data to see more details.

Can array values be sent into Amplitude?
Yes. However, Amplitude doesn't support exact matching on array properties. The contains operator can be used to filter for values within an array. 

* SDK
	* * [User Property Array](/docs/sdks/analytics/browser/browser-sdk-2#arrays-in-user-properties)
		* [Event Property Array](/docs/sdks/analytics/browser/javascript-sdk#arrays-in-event-properties)
* [HTTP API Array](/docs/apis/analytics/http-v2)
{{/partial:collapse}}


{{partial:collapse name="Why is device information (like Device Type or Device Family) returning ‘null’ in my project?"}}
A null value will be returned if Amplitude is unable to parse device information from the device or browser, or if the device is not mapped in Amplitude's system. If you would like new device values to be mapped, please reach out to Amplitude's support team with the following information:

* Manufacturer (ex: samsung)
* Model (ex: sm-g930u)
* Device Family (ex: Samsung Galaxy Phone)
* Device Type (ex: Samsung Galaxy S7)
{{/partial:collapse}}


{{partial:collapse name="Why are my sessions generating new Session ID values?"}}
The events ingested through Amplitude's SDK will maintain the same session *if* the events are coming from the same device. Session ID changes every time the Device ID changes.

The default session time-out for JavaScript SDK is 30 minutes. For iOS/Android, it's five minutes.
{{/partial:collapse}}


{{partial:collapse name="How can recurring revenue subscription events be sent in?"}}
After the first revenue event related to subscription, Apple or Google will have to validate whether or not a subscription is active. If it is, the subscription revenue event should be received by Amplitude at the time interval of that subscription. 
{{/partial:collapse}}


{{partial:collapse name="How do I filter out bot traffic users?"}}
While Amplitude SDKs use the User Agent to populate some user properties (such as device type), the User Agent itself is not collected or stored. Some customers implement logic to store User Agent as a custom user property and remove bot users that way. 

Alternatively, if you're able to determine the IP address of a suspected bot user, you can also use Data Filters to block events from that IP address. To learn more, see Amplitude's help center article on [blocking bot web traffic](/docs/data/block-bot-traffic).
{{/partial:collapse}}