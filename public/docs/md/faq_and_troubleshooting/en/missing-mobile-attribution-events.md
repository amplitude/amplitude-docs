---
id: eebd426c-6b43-4347-bc8a-29ff34b90b9f
blueprint: faq_and_troubleshooting
title: 'Missing mobile attribution events'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360051234592'
category: governance
this_article_will_help_you:
  - 'Understand why mobile attribution events are missing, and fix the issue'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718926153
---
Mobile attribution partners identify events using advertising IDs like IDFA / IDFV / ADID. However, Amplitude identifies users based on a combination of `user_id`, `device_id`, and `amplitude_id`. 

Amplitude's [Attribution API](/docs/apis/analytics/attribution) omits these differences and maps attribution events to existing users in Amplitude. Some mobile attribution partners–like, Appsflyer, Adjust, Branch, and Singular–use this API to send their non-custom, standard data with the advertising IDs as the identifier.

Amplitude stores unmapped attribution events for 72 hours. During that time, Amplitude will look for a matching IDFA, IDFV, or ADID on an already-existing user in an Amplitude project. If there is one, Amplitude will route that attribution event to that user. If there isn't, Amplitude will drop the attribution event once those 72 hours have passed.

To facilitate this process, be sure to instrument Amplitude with advertising IDs enabled. 

![Screenshot_2020-10-28_at_17.02.07.png](/docs/output/img/faq/screenshot-2020-10-28-at-17-02-07-png.png)

## Why mobile attribution events may be missing

In some cases, the issue is easily and quickly resolvable:

* The attribution events were not successfully sent to Amplitude. Make sure the attribution partner is receiving a success response (i.e., a 200) when sending events.
* Your project has reached the [instrumentation limit](/docs/faq/limits). You may need to delete event types or properties in order to allow Amplitude Analytics to ingest new event types and properties.
* The event type has been blocked or deleted in the Amplitude project. Restore the event type or property via Amplitude Data to fix the issue.

However, there are other commonly-encountered reasons that can take a little more investigating to resolve:

* There is no existing user in Amplitude with the matching IDFA, IDFV, or ADID
* Mapping was not completed within 72 hours

## Troubleshoot: No existing user in Amplitude with the matching IDFA, IDFV, or ADID

This is the top reason why mobile attribution events are not ingested by Amplitude Analytics. Remember, you do have to instrument Amplitude **before** you can send over mobile attribution events. 

### Determine if you are tracking advertising IDs

Advertising IDs are IDFA, IDFV, or ADID. If you are tracking them in your Amplitude events, Amplitude Analytics will capture their value in the respective property field. However, for security and PII reasons, they **will not appear** as a useable property, and will be removed from your raw data after they have been captured (unless you instrument this as a custom property). 

Amplitude does store a hashed version of the advertising IDs, in a field called `amplitude_attribution_ids`. Use this field to determine whether or not you are instrumenting advertising IDs. If the value of this field is `null`, then no advertising IDs were captured for this user.

Generally, this means either that you have not instrumented Amplitude Analytics to capture advertising IDs, or that the end user has opted out of advertising ID tracking.

User opt-outs **must be honored**. If you know advertising IDs are tracked properly and want to confirm `amplitude_attribution_ids = null`  because of user opt-out, contact Amplitude Support.

### Solution: Tracking advertising IDs

If you are using the Javascript—which lack the ability to track advertising IDs automatically—you will have to send an Amplitude event with the advertising ID via the [HTTP API](/docs/data/sources/instrument-track-unique-users).

## Troubleshoot: Mapping was not made within 72 hours

Amplitude will hold an attribution event for 72 hours. If a match is not made during that time, the event will be dropped.

For example, User A downloads a game app on December 1 but does not open the app until December 7:

* Mobile attribution partners would list an Install event for User A on December 1 and send that event to Amplitude on December 1.
* User A does not record their first event in Amplitude until they open the app on December 7. User A is considered a new user on December 7 in Amplitude.

User A's `Install` event will be dropped because User A did not exist in Amplitude within 72 hours of the attribution event. User A only existed in Amplitude seven days after the `Install` event, which is longer than the 72-hour holding period. 

### Determine if the attribution event came too early

Amplitude's iOS SDKs captures IDFV as `device_id` by default. If you use the default setting for iOS SDKs, you can use an iOS example to troubleshoot this:

1. Identify an iOS SDK user in Amplitude who does not have an `Install` event, even though there is a value for `amplitude_attribution_ids`.
2. Copy the `device_id` (aka IDFV) of that user.
3. With your mobile attribution provider, look for the `Install` event of the IDFV.
4. Check the date on the `Install` event.
5. Compare that date to the New User date in Amplitude.

You will likely see that the date of the `Install` event was sent more than 72 hours before the user existed in Amplitude. 

You can also see whether a user already exists in Amplitude by following a similar process:

1. Identify an iOS Install event from the mobile attribution provider who does not appear in Amplitude yet.
2. Grab the IDFV on that payload.
3. Enter the IDFV in the [user look-up](/docs/analytics/user-data-lookup) feature as the device ID.

You will likely see that the IDFV is not associated to a profile in Amplitude Analytics, which means Amplitude has not seen the user yet. 

### Solution: Create users before real user activity

An end user exists in Amplitude when their first event is received by Amplitude. If you do not want to wait on your end user's actions to trigger a profile creation, you can create a profile for them yourself, by either:

* Sending a dummy event with advertising ID and `device_id` or `user_id` through the HTTP API
* Creating a profile with advertising ID and `device_id` or `user_id` through the Identity API

This is only possible if you can capture the advertising ID on your own. Make sure you maintain the right `device_id` or `user_id`, so that real-world user activity is connected to the right profile.