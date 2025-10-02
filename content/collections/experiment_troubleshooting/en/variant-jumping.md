---
id: 982a0f19-3b05-4358-adda-93a5b3c60919
blueprint: experiment_troubleshooting
title: 'Variant jumping'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
source: 'https://www.docs.developers.amplitude.com/experiment/guides/troubleshooting/variant-jumping/'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1719874098
this_article_will_help_you:
  - 'Understand what variant jumping is, and what you can do about it'
---
**Variant jumping** occurs when a user is exposed to two or more variants for a single flag or experiment. Variant jumping above a certain threshold may be cause for concern around the trustworthiness of an analysis.

Some types of variant jumping are normal, in that they're somewhat common and usually explainable. Other types are more difficult to track down. 

## Debug variant jumping 

The best way to debug variant jumping is to identify a user who has jumped variants, and analyze their user timeline. If you're using remote evaluation, check the `Assignment` event to identify assignment vs exposure discrepancies.

To find a user who has jumped variants, follow these steps:

1. Navigate to the diagnostics card of your experiment.
2. Find the variant jumping charts, and click *Open in Chart*.
3. Click the bar for users who jumped variants and click *View User Streams*.

It's often helpful to only show assignment and exposure events in the user timeline.

When debugging a user timeline, keep these things in mind:

* Did you introduce any [targeting changes](#targeting-changes) while your flag or experiment was active? Could the timing of this change have effected the variant assigned to this user? Click the version number to check the version history.
* What bucketing key is used in the flag or experiment? Does the value for this property change between assignments or exposures for this user?
* Does the user seem to have missing exposures or assignment events? If so, that missing event may have been sent for a different user.
* Is an assignment missing a user property it should have? If so, double-check the server upload timestamp of the assignment event and compare it to surrounding active events. It's possible that events sent from the client were actually uploaded and received after the assignment event, even if the client order is different.

## Normal variant jumping

Normal variant jumping may occur due to:

* [Targeting changes](#targeting-changes): Someone has made changes to targeting rules while your experiment is running.
* [Anonymous identity merging](#anonymous-identity-merging): Anonymous users, bucketed by Amplitude ID, may receive different variants until they're eventually resolved through a matching user ID.

### Targeting changes

Taking the following actions may cause a user to jump variants:

* Adding or removing a variant
* Changing variant distribution weights
* Targeting dynamic cohorts
* Changing the bucketing key
* Updating mutual exclusion

{{partial:admonition type="tip" heading="Avoid variant jumping by enabling sticky bucketing"}}
Enabling sticky bucketing before making targeting changes prevents variant jumping. However, sticky bucketing may cause a [sample ratio mismatch (SRM)](/docs/feature-experiment/troubleshooting/sample-ratio-mismatch).
{{/partial:admonition}}

### Anonymous identity merging

The way Amplitude handles anonymous users can sometimes lead to variant jumping. Specifically, Amplitude merges anonymous IDs with the correct existing user IDs (if one exists) as soon as it has enough information to do so. This may happen if a user uses your app on different devices without logging in, or if the device ID regenerates upon logout.

[Learn more about Amplitude's identity resolution and merging users.](/docs/data/sources/instrument-track-unique-users)

To identify this type of variant jumping, look for the assignment event where the user jumped between variants. Then compare the value of the Amplitude ID for both events. If it's different for both events, it's probably the result of anonymous identity merging.

To avoid this type of variant jumping, consider bucketing by user ID if you're only targeting logged-in users who have user IDs, or by device ID if you're only targeting anonymous users (you might do this for a sign-up experiment).

### Inclusion list

Imagine you have some user IDs in the inclusion list. You call `fetch()` and pass the user ID in to the call. This returns the control experience, per the inclusion list. But the next time you call `fetch()`, you don't pass in the user ID. Now the user doesn't meet the inclusion list criteria, so Amplitude hashes the bucketing key, and the user may see a different variant instead. The same thing can happen if you include device IDs.

In this example, the user has a user ID. They match the inclusion list and get the `signin-up-new_design` experience.

![Has a user id so matches the inclusion list and gets signin-up-new_design](statamic://asset::help_center_conversions::experiment-troubleshoot/inclusion-list-variant-jumping-1.png)

In this example, there is no user ID. The user doesn't match the inclusion list, is included in the "all other users" segment, and gets the `signin-up-original-view` experience instead.

![Doesn't have a user id so doesn't match the inclusion list and hits the all other users segment and gets signin-up-original-view](statamic://asset::help_center_conversions::experiment-troubleshoot/inclusion-list-variant-jumping-2.png)

## Abnormal variant jumping

Instances of abnormal variant jumping don't fit with any of the [normal explanations](#normal-variant-jumping). They can be difficult to track down. However, the most frequent cause is some form of identity mismatch, specifically when the user identity differs between assignment and exposure tracking. This is almost always due to an implementation inconsistency.

Here are some examples of abnormal variant jumping. It's not an exhaustive list, but it should get you thinking about how best to use identity in your systems and Amplitude Experiment.

### Multiple logged in accounts on a single device

Consider this timeline for a person with multiple user accounts (U1 and U2), for your app on a single device.

1. Open app as user U1 and fetch variants, assigned `treatment` for `experiment-1`.
2. Exposure to `experiment-1` variant `treatment` for U1.
3. Log out of U1 and into U2, fetching variants asynchronously on login.
4. Prior fetch for U2 resolving, exposure to `experiment-1` variant `treatment` for U2.
5. Fetch for U2 resolves, assigned `control` for `experiment-1`.
6. Exposure to `experiment-1` variant `control` for U2.

In this case, user U2 has jumped variants, from `treatment` to `control` due to being exposed to U1's stored variant. To avoid this, either wait for the fetch to resolve before rendering the user experience, or call the SDK's `clear()` method on logout to clear all stored variants from the SDK. Clearing variants wipes the SDK's variant storage, and ensures that the user isn't exposed to cached variants. It doesn't protect the user from viewing a fallback experience before the fetch request resolves.

If you keep a consistent device ID across logins, you can easily check for this type of variant jumping by searching for different users with the same device ID.

### Inconsistent identity input between assignment and exposure

In Amplitude, the user ID and device ID properties are essential to identify your user and [resolve their Amplitude ID](/docs/data/sources/instrument-track-unique-users). If the device ID or user ID used to fetch and evaluate assignments is different from the device ID and user ID used to track the exposure event, you may see variant jumping, SRMs, and inconsistent or unexpected bucketing behavior.

For example, you may be sending events through a proxy or CDP that masks IDs before sending to Amplitude. In this case, the identity used to fetch variants would be different from the identity included in the exposure events.

Another common case is simple overlooked implementation error. For example, the following cases have caused variant jumping:

* Additional characters in the ID. (Note the extra quotes around the actual identity.)
    * `15a4f7e9-db4e-4c57-82c7-e57a2995803a`
    * `"15a4f7e9-db4e-4c57-82c7-e57a2995803a"`
* Inconsistent capitalization, especially with UUIDs.
    * `15a4f7e9-db4e-4c57-82c7-e57a2995803a`
    * `15A4F7E9-DB4E-4C57-82C7-E57A2995803A`

## Remove users who variant jumped from experiment analysis

As you analyze results, be careful when you remove data, as you may introduce bias in your results. It's better to understand the cause of variant jumping and fix any implementation bugs, so this doesn't happen again in future  experiments. If you feel that removing users who jumped variants is the best course of action, use the Filter card on the Experiment Analysis tab. If the `All exposed users` segment, is enabled by default, click it and select *Experiment Segments > Exclude users who variant jumped*.
