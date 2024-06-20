---
id: bc5910fc-7b2b-4784-92f0-6872992ffe89
blueprint: faq_and_troubleshooting
title: 'Segment-Amplitude integration'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/4416658374427'
---
This article covers some frequently asked questions about Segment integration in Amplitude.

## Missing events

Why am I not seeing any data in Amplitude?
Before you consider an event missing from Amplitude, remember that if the event is not in Segment then it will not be in Amplitude. Also, make sure that your requests from Segment received a successful response before considering an event missing.

Once you make sure that the event is in Segment and got a successful response, here are the first 3 things you should confirm:

1. Has Amplitude been enabled as a destination?

Amplitude must be explicitly added as an integration for each source in your Segment instance: ![](/docs/output/img/faq/QpwKm80Os8pLe1u4k8s8ap7S-yHmN9wey71-xrChVBwH3pzyw4ISEdutcCkbd6FmB__jtY4kyllLD5BmxggVTDriQivEsW8vanXFvtNPKhSfB430v3uV9aQYptZJ85vQ9rLDYpxgKNCf9ckaFHhwdFU)

2. Has the correct API Key been inputted?

Double-check the Amplitude API Key value in project settings in your Amplitude UI to make sure the correct one is used in Segment.  

3. Is the syntax correct?

Sometimes it is not obvious that there are instrumentation errors, so always double-check the code for syntax errors (Browser’s ‘Console’ tab can be helpful):

#### 

After going through the above steps and confirming those requirements are correct, send data to Amplitude by calling `track`. Data will be visible after you track your first event.

Are you over the event-type instrumentation limit?
If you went [over the limit](https://help.amplitude.com/hc/en-us/articles/115002923888-Limits-How-much-data-can-you-send-to-Amplitude-), any data sent after that will not be ingested. If you want to ingest more event types you have to [delete events](https://help.amplitude.com/hc/en-us/articles/360033373451-Learn-how-to-delete-event-types) to get back under the limit.

Is the event Deleted/blocked from Amplitude?
Check your deleted/blocked events. Deleting event types also blocks all future instances of events with the same name. If you send any data to a deleted or blocked event name in Amplitude it won't come through.

Are there any Errors in Segment's debugger?
Check your Debugger tab to see if there are any errors. If there are no instances of the missing event in the Debugger, try to send a test event of that event type. If the event never comes through to Segment in the first place, then it won't show up in Amplitude.  

Does the event exist in Segment?
For track calls, you can choose to only send *certain* events to *certain* integrations. So double-check if the event is sending and that Amplitude is enabled.

![](/docs/output/img/faq/X6J2v1mpAkIfrHIeyVNzu1a4M7ueyYTbB8mhrYLYP1GOITiCkq-zzg8-gtXodvRwCaDZobzGa-EusbXLeJ-MsmKXfBXssMXetjtw1BWgLIgVpSve3ZwC6tG4olmXU4QFULORluMUrJXt6yc0VDABTao)  
  
You can also enable/disable specific integrations directly in the instrumentation code, so check that Amplitude isn't disabled in the actual code. 

For page/screen calls, there's no way to see all the individual names of the pages but you can see from the activity if page calls are being received by Segment.

![](/docs/output/img/faq/trD1_iJdBU0ZjyBW_JXR033OlYWBl3and11_02_82tgE_83K_GXK5-asml3ZQhoQy7guxYuLDvEtnZh08KCdUQxvUFxVm4-gGTfe_qXQmzC16lflBcew6KFnx0xTNsCRyf_aQaZhwmMYPRJZgrpHXq4)

#### You can also check the raw JSON of the requests to verify if the Amplitude integration has been turned off:

#### Screenshot 2023-08-03 at 11.25.57 PM.png

## Missing properties

What is the difference between an event property and a user property?
[This article](/docs/data/user-properties-and-events) explains the difference between the two types of properties. 

Why do I not see any user properties or only [Amplitude] user properties?
In order to send user properties via [Segment](https://segment.com/), you would have to call `identify` and include your user properties in the `traits` field. You can read more about an `identify` call in the [Segment documentation](https://segment.com/docs/spec/identify/).

Are you over the event property type instrumentation limit?
If you went [over the limit](https://help.amplitude.com/hc/en-us/articles/115002923888-Limits-How-much-data-can-you-send-to-Amplitude-), then that may be why you are missing properties in Amplitude. Any data sent after you are over the limit will not be ingested. You will need to delete the properties to get back under the limit to ingest new properties.

Is the property deleted/blocked from Amplitude?
Check your deleted/blocked properties. Deleting properties also blocks all future instances of properties with the same name. If you attempt to send any data to Amplitude with the deleted or block property name, it won't come through. 

Did the property come through in the raw payload to Segment?
If you don't see it in Segment, you won't see it in Amplitude. Check your Segment's debugger to make sure that the property appeared in Segment first.

![](/docs/output/img/faq/bbsBU7nqkd31kTAsn7ZnOR5q3v6uXqzrhbjcbdJf0Fqv-Fq6dWc5n3OLPfifv_T_rrEhkJujl05OKnCPsbpkVZHyqJSYbM8PHJpq0oewVrglqa7EMKbmU88pBuNy28CQxUzrlVJziKXCIz5aYuYYUps) 

Does the property exist in Segment's schema?
Check your tracked properties and make sure they exist in Segment.

**![](/docs/output/img/faq/htx-ue7Ui7vxzyJ3AO_JRlE1o1NDljJuL-lpg-q6U9OtXve-VdOi-oCDUw5XMqFgJnRXuO0mnmUCUOY9NN5y28v0s1rydJhj10au6BShK6jr5JOSVxqlofh8oN1tR1L_x5xHT00GMFD2y3_7MWlMYp8)**

Spot any syntax code errors/other instrumentation errors?
Sometimes it is not obvious that there are instrumentation errors, so always double-check the code for syntax errors (Browser’s ‘Console’ tab can be helpful):

![](/docs/output/img/faq/kuyVWsA6a5dmr8Sd-FL_iKf0ulhVJdeAUJGTMF0aieaINz3EZ6uce1WDYKchv81nbjUWbHL39bduZImCclVjg0YgGE5uyx3y6oTCgBlmOwTJLEX1mW1ACbpcmNmGVw6_MU9DnaJb4U4J-ge6IkYsVkc)

See Segment's specs [here](https://segment.com/docs/spec/) on the best way to format your data. 

Amplitude also has a [limit of 1024 characters](https://help.amplitude.com/hc/en-us/articles/115002923888#string-character-limit), so if the property value is too long, this might be the reason why it is not showing up in Amplitude. 

Why is the location information (city and/or country) from Segment's data different from the location information in Amplitude's data?
Amplitude attempts to determine the user's location from their IP address, if available. This may be different from the location information recorded by Segment.

## Incorrectly-tracked sessions

What is the definition of a session?
A session is defined as a period of time that the user has the application open in the foreground. If session tracking is available, events logged within the same session will have the same session ID. A new session is started if the application enters the foreground after being in the background or closed for more than five minutes.

Why do all of my events have a `sessionId` of -1?
If you are using the Amplitude Classic integration in Cloud mode, Segment does not provide session tracking by default, so you will see Session ID = -1 in Amplitude. Segment doesn’t have a [concept for a session](https://segment.com/blog/facts-vs-stories-why-segment-has-no-sessions-api/). You will have to pass in the sessionId for your server-side calls from Segment to Amplitude see details [here.](https://segment.com/docs/integrations/amplitude/#sessionid%C2%A0) 

If you use Segment's client-side bundled integration it will use Amplitude's native SDKs. They will track Session IDs for you here are the options from Segment:

* Use the integration in device mode and utilize Amplitude's native SDKs' default session-tracking details [here.](https://www.docs.developers.amplitude.com/data/sources/segment/#client-side-bundled-integration%C2%A0)
* If you use the Amplitude Actions integration from Segment there is session tracking is available in Segment's new libraries [Analytics.js 2.0](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/), [Swift](https://github.com/segmentio/analytics-swift) or [Kotlin](https://github.com/segmentio/analytics-kotlin) details [here](https://segment.com/docs/connections/destinations/catalog/actions-amplitude/#connection-modes-for-amplitude-actions-destination).

Why are there no session length calculations in Amplitude Dashboard?
See the previous answer.

What if their SDK doesn’t support feature X? [device-mode]
Segment SDK might not have all the APIs provided by the Amplitude SDK; however, you can still access features by directly calling Amplitude's SDKs.

Still have questions?
Submit a Support ticket with the following details:

* What type of connection are you using? ([cloud-mode or device-mode](https://segment.com/docs/connections/destinations/#connection-modes))
* Do you have any destination filters enabled?
* Do you see any errors in the *Event Delivery* tab?
* Confirm that the correct API Key has been used for the Amplitude destination.

Lastly, share the raw data for an event that should've been in Amplitude, but is missing. We need a full payload of the event, including the endpoint used, header, body, etc. 

This information will help us investigate the issue further!
