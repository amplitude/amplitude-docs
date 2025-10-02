---
id: 29db4e07-fe88-46f9-8f21-76c7b6d77142
blueprint: workflow
title: 'Troubleshoot your experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/360061270832-Troubleshoot-your-experiment'
this_article_will_help_you:
  - 'Identify the cause of potentially unanticipated behaviors in Amplitude Experiment'
  - 'Fix any issues yourself, without contacting Amplitude support'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714517153
---
You may experience unexpected issues with creating and rolling out an experiment or flag. This can happen for a few different reasons, several of which appear below.

## Before you begin

This article assumes that you understand how to set up and run an experiment in Amplitude Experiment. If you don't feel confident in your understanding, check out our Help Center articles on [an overview of Amplitude Experiment](/docs/feature-experiment/overview) and [configuring your experiment](/docs/feature-experiment/workflow/configure) before proceeding.

## Experiment troubleshooting checklist

This list of questions acts as a quick troubleshooting checklist for any experiment discrepancies you may be experiencing. If you can answer "yes" to a question, it's probably not the cause.

**Do the device ID and user ID align?**
The device ID and user ID you use for experiments and flags **must be the same** as the device ID and user ID used in Amplitude Analytics.

**Is your flag enabled?**
In order for a flag to show up in a deployment, it **must be enabled** in that deployment.

**Is your variant assigned a name of anything besides the value "off"?**
Don't assign a variant a name value of “off.” This value is explicitly reserved for users in the "OFF/FALLBACK" bucket.

**Is your assignment event and exposure event set to different events?**

While it's possible for the assignment event and the exposure event to be the same event,they're different concepts, and each plays a different role in your experiment: 

* The assignment event is the event that immediately precedes a user's assignment to a variant.
* The exposure event is the event the user must trigger to see to the variant. 

Amplitude assigns users at the beginning of their session, and they may not trigger the exposure event until later in the flow. 

Make sure you have the correct events assigned to each.

**Are your old properties synced to new ones?**

If you are running an experiment on a single platform only (for example, iOS), you might still get users showing up with a different platform value (for example, Android). This can happen if your users are using your product on multiple platforms, with their most recent event sent from a platform other than the one you've specified for your experiment. When the assignment event is automatically sent, it doesn't contain non-Experiment properties (like, for example, `platform`).   

## Other experiment discrepancies

At times troubleshooting issues in your experiment may be out of your control. This section highlights some of those scenarios.

### Targeting on user properties is delayed

Amplitude Experiment updates the targeting on cohorts each hour. Targeting on properties explicitly sent to Experiment is immediate and real-time. Targeting on user properties stores in Amplitude may have a delay up to one hour, due to the [CDN](/docs/feature-experiment/under-the-hood/experiment-performance-scaling).

### A user doesn't see their assigned the variant

Amplitude Experiment generates data on the server side and stores assignments as user properties. For this reason, a user may not see the variant to which they were assigned. The cause of this is usually timeouts, network errors, or ad blockers.

It's also possible for a user to see one variant of your experiment one day, but another variant the next. Because [bucketing in Amplitude Experiment relies on user ID and device ID](/docs/feature-experiment/troubleshooting/variant-jumping), this can happen if you are relying on device ID alone and the **user's device ID changes**. This can occur if the user is using incognito mode, or if they've cleared their cache and cookies since their last visit.

### A user doesn't log any events past the assignment event

Sometimes, a user can **trigger the assignment event without logging** any other active events: 

* The user's ad blockers or analytics blockers interfere with analytics application events. But since experiment requests are made from backend servers, those generally aren't impeded. This mostly affects Web users.
* A user opened the app, a request was made to Amplitude's backend servers (which in turn triggered the assignment event), and the **user left the app** before firing any other actions that trigger an analytics event.
* Amplitude's servers are **receiving assignment requests directly** from your backend, instead of from the end user. Check if you have instrumented experiments in offline campaigns sending a group push notification, marketing emails, etc.

