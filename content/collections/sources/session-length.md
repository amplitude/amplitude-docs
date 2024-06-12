---
title: "How Amplitude calculates session length"
source: "https://help.amplitude.com/hc/en-us/articles/18749912891419-How-Amplitude-calculates-session-length"
id: 07896d14-1d29-42a8-a812-5dc97915c3fe
---

Amplitude calculates session length via the following formula when session ID is used as the session property:

```
*max(client\_event\_time) - min(client\_event\_time)*
```

Where:

* `client_event_time` is the local timestamp (UTC) when the device logged the event
* `max(client_event_time)` is the local timestamp (UTC) of the last event logged by the device

Additionally, hidden, inactive, and deleted events will **not** be included in the session length calculation. For example, let's say you have the following series of events:

Event A --> Event B --> Event C --> Event D

If Event C and Event D are [hidden, inactive, or deleted](https://help.amplitude.com/hc/en-us/sections/16805649563163-Clean-up-your-data), then the `max(client_event_time)` is taken from Event B instead of Event D. 

Read more about how Amplitude tracks sessions in this [help center article](/docs/cdp/sources/instrument-track-sessions). 
