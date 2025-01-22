---
id: e5e8c350-b75d-4c43-83a0-833ff186a0be
blueprint: source
title: 'Track unique users'
source: 'https://help.amplitude.com/hc/en-us/articles/115003135607-Track-unique-users'
this_article_will_help_you:
  - 'Grasp how Amplitude identifies and tracks unique users with an Amplitude ID'
  - 'Merge unique users with more than one Amplitude ID'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718136543
---
Accurately tracking unique users is critical to getting the most out of Amplitude. Depending on the nature of your product, your users can log in and out at will, browse anonymously, or use multiple devices. This article will describe how Amplitude tracks unique users, and what you can do to ensure that process goes smoothly.

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## How Amplitude identifies unique users

Amplitude uses a system of three different IDs to track users: device ID, user ID, and Amplitude ID:

* **Device ID:** For mobile applications, Amplitude pulls the Identifier for Vendors ([IDFV](/docs/sdks/analytics/ios/ios-swift-sdk#advertiser-id)) or generates a random alphanumeric string for the device ID. For web-based applications, Amplitude will set the device ID to a randomly-generated Universally Unique Identifier ([UUID](/docs/sdks/analytics/flutter/flutter-sdk#set-a-custom-device-id)) by default, which persists unless a user clears their browser cookies and/ or is browsing in private mode.
* **User ID:** This identifier is configured by you. Many products use a username or an internal unique identifier to track their users. A user ID should be something that **does not and will not change**.  
  
Anonymous users **should not be assigned a user ID**. These users will still have Amplitude IDs and device IDs, so it’s possible Amplitude will recognize them as the same user later on.

* **Amplitude ID:** After gathering the device and user IDs, Amplitude generates the Amplitude ID and associates it with the user and device IDs it has already collected for this user. Amplitude only needs one or the other to generate an Amplitude ID; however, the user ID is preferred, as multiple unique users could share the same device.

{{partial:admonition type='note'}}
 If Amplitude encounters a known device ID that is already tied to a user ID in a different project, Amplitude will assume the device ID is tied to that user ID in all projects, even if you do not have the Portfolio add-on. [See our article on Portfolios for more information](/docs/admin/account-management/portfolio).
{{/partial:admonition}}

When multiple projects reside in a single organization, all projects **must** use the same variable as a user ID. This is crucial to prevent discrepancies in tracking. For instance, if one project uses email addresses as user IDs while another project uses phone numbers, these different identifiers **will not be merged** into the same Amplitude user profile. If you are on [MTU billing](/docs/admin/billing-use/mtu-guide), you may incur charges for multiple users.

### Use advertising identifiers as the device ID

You can instruct Amplitude to use the Identifier for Advertiser ([IDFA for iOS](/docs/sdks/analytics/ios/ios-swift-sdk)) and the Advertising Identifier ([AdID for Android](/docs/sdks/analytics/android/android-kotlin-sdk)) as the device ID—see the relevant SDK installation guide for more information. This will cause the device ID to persist across installs.

iOS users have the option of resetting their IDFA on their devices at any time. As of iOS 10, if a user limits ad tracking, this generates an IDFA of all zeros. Amplitude will instead set the device ID as either IDFV or a randomly generated string.

Android users have the option of resetting the AdID on their devices at any time.

### Set up cross domain tracking

You can track anonymous behavior across two different domains. For example, imagine you have the following two domains:

* Site 1: https://www.landingpage.com
* Site 2: https://www.productpage.com

To track an anonymous user who starts on Site 1 and navigates to Site 2, you'll need to pass the device ID from Site 1 as a parameter to Site 2. After that, you'll have to reinitialize the SDK with the passed device ID:

1. From Site 1, grab the device ID from `amplitude.options.deviceId`.
2. Pass the device ID to Site 2 with a URL parameter or third party cookie.
3. Initialize the Amplitude SDK on Site 2 with `amplitude.init('YOUR\_API\_KEY', null, {deviceId: '$DEVICE_ID'})`.

## How Amplitude assigns Amplitude IDs

In this section, we'll explore some common situations Amplitude encounters when trying to track unique users. Each one will include an explanation of how Amplitude uses the device ID or the user ID to either generate a new Amplitude ID, or determine if there is an existing Amplitude ID it can use instead.

### No user ID is assigned

If your product doesn't assign user IDs, an Amplitude ID will be generated when Amplitude sees a particular device ID for the first time.

| Device ID | **User ID** | **Amplitude ID** |
| --- | --- | --- |
| A | null | 1 |
| B | null | 2 |
| B | null | 2 |
| C | null | 3 |
| A | null | 1 |
| C | null | 3 |

There are three unique users in this set.

Here, the first event came from device A. Because there was no record of this device, Amplitude assigned it a new Amplitude ID of 1.

The second event came from device B. Since there was no record of this device, Amplitude assigned it a new Amplitude ID of 2.

The third event also came from device B, and since Amplitude already had a record of this device, it was assigned an Amplitude ID of 2. The same logic applies for device C.

### User ID is assigned after anonymous events

If your product does assign user IDs, Amplitude assumes any previous events logged anonymously on that device belong to a single user, until a user ID is used. The Amplitude ID will then be used for both.

| **Device ID** | **User ID** | **Amplitude ID** |
| --- | --- | --- |
| G | null | 4 |
| G | null | 4 |
| G | John | 4 |

There is one unique user in this set.

Here, the first two events are logged anonymously on device G and are assigned an Amplitude ID of 4. The third event is the first event received from device G that includes a user ID. Amplitude assigns that user ID the same Amplitude ID as the anonymous events. We can then say that user John did all three events.

### Same user ID on multiple device IDs, with *no* anonymous events

Amplitude prioritizes user IDs over device IDs when assigning an Amplitude ID.

| **Device ID** | **User ID** | **Amplitude ID** |
| --- | --- | --- |
| K | Zack | 5 |
| L | Zack | 5 |

There is one unique user in this set.

User Zack fired an event on device K and was assigned an Amplitude ID of 5. Whenever Zack's user ID shows up again on **any** device, Amplitude will automatically assign it an Amplitude ID of 5, regardless of the device ID.

### Multiple user IDs on the same device

If an event is sent anonymously **after** at least one user ID has already been seen associated with that device, Amplitude assumes the anonymous event was fired by the last known user and assigns it that user's Amplitude ID.

| **Device ID** | **User ID** | **Amplitude ID** |
| --- | --- | --- |
| R | Jane | 6 |
| R | null | 6 |
| R | Mary | 7 |
| R | null | 7 |
| R | null | 7 |

There are two unique users in this set.

Here, Jane logs the first event on device R and is assigned an Amplitude ID of 6. The next event is sent anonymously—maybe Jane logged out—but is still assigned an Amplitude ID of 6, because Jane was the last known user.

The third event is fired by Mary on device R and is assigned and Amplitude ID of 7. The next two events are fired anonymously; Amplitude assigns them an Amplitude ID of 7. Mary is assumed to have fired those events because she was the last known user.

If you want to explicitly log users out or log events under an anonymous user, then you will need to set the user ID to null and regenerate a new device ID. Just follow the instructions in our [iOS](/docs/sdks/analytics/ios/ios-swift-sdk) or [Android](/docs/sdks/analytics/android/android-kotlin-sdk) SDK documentation to do so.

### Same user ID on multiple devices, with anonymous events

| **Device ID** | **User ID** | **Amplitude ID** |
| --- | --- | --- |
| Y | David | 8 |
| Z | null | 9 |
| Z | David | 8 |
| Z | null | 8 |

Here, David logs an event on device Y and is assigned an Amplitude ID of 8.

Next, an anonymous user logs an event on device Z and is assigned an Amplitude ID of 9, since there is no user associated with the device.

Then David logs into the product on device Z. This event has an Amplitude ID of 8, because that's David's Amplitude ID.

Finally, an event is logged anonymously on device Z. This events gets an Amplitude ID of 8; David was the last known user, so the event is attributed to him.

In this scenario, the anonymous events on device Z have two different Amplitude IDs, even though there's just one user ID associated with the device. Amplitude interprets this to mean that both Amplitude IDs 8 and 9 refer to a single user: David. When this happens, Amplitude will **merge** these IDs, so only one user will be counted. This merge can only happen because the event with Amplitude ID 9 did not have a User ID present.

{{partial:admonition type='note'}}
if you're using Redshift, the data are immutable, and the anonymous event will still have an Amplitude ID of 9 in the raw data. See the below [merged users](#merged-users) section for more details.
{{/partial:admonition}}

## Merged users

The merged user problem arises when Amplitude determines that an anonymous user, for example, one whose only ID is a device ID—is actually a recognized user with an Amplitude ID.

For example, when a user gets a new device, they'll log events in your product anonymously before signing in. To Amplitude, these anonymous events appear to be coming from a new user, so they're mapped to a new Amplitude ID.

But when the user logs into their existing account, all subsequent events are mapped to that user's existing Amplitude ID. A couple of problems arise from this:

* The user is counted twice in active and new user counts.
* Events received while the user was anonymous are “lost,” in that they won't be attributed to the true Amplitude ID and the user's actual User ID.

Amplitude solves this problem by cross referencing the list of Amplitude IDs with an internal mapping of Amplitude IDs that have been "merged" (those that Amplitude has determined to be the same user). This all occurs when you query on the dashboard. You can view a list of a user's merged IDs in their User Activity page, along with the merge times.

![Tracking_Unique_Users_-_Merged_IDs.png](/docs/output/img/sources/tracking-unique-users-merged-ids-png.png)

**Important Note:**

* User IDs **cannot be merged**. If you create a new user ID for an existing user, Amplitude will only recognize them as different unique users.
* This merged users solution **does not apply** to the raw data in Amazon [Redshift](/docs/data/destination-catalog/amazon-redshift), as the database contains the raw event logs and not a merged users table. Without this merged users logic, we have seen an average change of about 5% in DAU numbers for our users with higher-than-average change for web data. Merged users **are** available in Snowflake with [Query](/docs/analytics/charts/other-charts/other-charts-amplitude-sql).

### Event IDs, device IDs, and merging users

When users are merged, the event ID count continues on a device-by-device basis:

| **Device ID** | **User ID** | **Amplitude ID** | **Event ID** |
| --- | --- | --- | --- |
| A | null | 8 | 1 |
| A | David | 8 | 2 |
| A | David | 8 | 3 |
| B | null | 9 | 1 |
| B | David | 8 | 2 |
| B | David | 8 | 3 |

If the product data is ever cleared (for example, if a user deletes the app and reinstalls), the Event ID will reset to 1 . When a user deletes the app and reinstalls, Amplitude will usually generate a new Device ID as well, which will subsequently trigger a new merging.

When users are merged, the user could "lose" user property values that were never meant to be changed (for example 'Start Version' or initial UTM parameters) because the new user property values will overwrite the original user property values. If you are a paying customer and this affects you, please reach out to our Support team.