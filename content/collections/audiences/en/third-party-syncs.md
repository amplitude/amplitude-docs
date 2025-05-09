---
id: 8cdc1ed2-7236-4312-ae35-1efdb910c563
blueprint: audience
title: 'Sync to third-party destinations'
source: 'https://help.amplitude.com/hc/en-us/articles/360060055531-Sync-to-third-party-destinations'
this_article_will_help_you:
  - 'Set up and manage syncs in Amplitude Activation'
exclude_from_sitemap: false
landing: true
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718122078
landing_blurb: 'Send user and event data to third-party downstream tools.'
---
Amplitude supports three types of syncs for cohorts, properties, computations and predictions: **on-demand syncs**, **automated syncs**, and **real-time syncs**. 

On-demand syncs are useful for audience testing and one-off campaigns. Automated syncs are scheduled on a daily or hourly frequency—so as your cohort audience membership changes, or the underlying predicted probabilities of the user change, Amplitude Activation will automatically adjust their cohort membership in connected destinations as well. Real-time syncs update each minute and are built for interactive use cases where a rapid update is required.

No more CSV downloads or manual syncs required—whenever your users take an action in your app, they’ll be automatically synced to your respective ad, email, or testing platform.

#### Feature availability

* **On-demand syncs** are available to users on Starter, Plus, Growth, and Enterprise plans.
* **Automated syncs** are available to users on the Growth, Enterprise, and Plus plans.
* **Real-time syncs** are available to users on the Growth and Enterprise plans.

## Real-time syncs

With real-time syncs, Amplitude Activation will send updates to a partner destination almost as soon as a user enters or exits a cohort. This in turn unlocks additional uses for cohort sync, such as just-in-time and contextual messaging to end users. When you create a real-time sync, Amplitude Activation will first send the initial population to the destination (this can take several hours if the sync is large).  After this initial sync, updates are sent every minute as users enter and exit the cohort.

Most destinations and cohorts support real-time cohort syncs. When partners fail or reject API requests, or when other network delays and errors are experienced, Amplitude Analytics will send any changes as soon as the issue is resolved. 

Real-time sync will not be available for select destinations that are not designed for receiving frequent updates (ad destinations, s3), or that have strict integration limits that prevent Amplitude Analytics from syncing frequently.

Real-time sync will not be available for some complex or very large cohorts due to the high cost of computation. Currently, cohort membership can be sent to destinations using real-time sync, but not computations, properties, or predictions.

## Create a new sync

To create a new sync, follow these steps:

1. Click *+ New* and click the *Sync* tile. The *Create New Sync* modal appears.
2. Select the sync type you’d like to create—cohort, recommendation, user property, or computation sync—and click *Next*.
3. From the drop-down list, select the specific item you want to sync. Then click *Next*.
4. Next, choose the destination you’d like to sync to. If the desired destination does not appear, click *+ Add* or *Manage Destinations* and set up the desired destination there. Then click *Next*.
5. Choose whether this will be a on-demand sync, a recurring sync, or a real-time sync. Recurring syncs take place on an hourly or daily schedule, while real-time syncs update each minute.  
  
Depending on your choice in step 4, you may also need to specify a customer account or API target to sync to.
6. Click *Sync*. Your sync is now active.

## Email notifications

Amplitude automatically sends email alerts for cohort sync jobs:

- **Success notifications**: Receive confirmation when your cohort sync completes successfully
- **Failure notifications**: Get alerted when a sync job fails, allowing you to quickly address any issues

These notifications help you monitor the status of your cohort syncs without having to manually check the platform. Email alerts are supported for partner integrations including Braze and other supported destinations.

## View sync details

Once your sync has been created, you can view all the sync's critical details by clicking the name of the sync, in the *Syncs* panel.

The *Details* tab provides basic information about the sync. The example above is a cohort sync, so the *Details* tab provides a definition of the cohort, as well as a chart detailing its population over time. The *Syncs* tab shows each destination that receives this sync.

On the *Comparisons* tab, you can view a head-to-head comparison between this synced cohort and another cohort of your choosing. You can break down the results of the User Composition chart by user property using the *Composition by* drop-down.

You can view a list of your synced cohorts from within Amplitude Analytics at any time, by clicking *Cohorts* and opening the *Synced Cohorts* tab.

## Understanding cohort sync discrepancies

When syncing cohorts from Amplitude to a third-party destination, you may notice differences between the user numbers in Amplitude and what's shown on the partner's platform. Understanding why these differences occur and knowing how to check which users were successfully transferred can help you fix these issues.

Amplitude lets you choose any user properties to sync. This aids in customization, but it also requires careful planning to minimize discrepancies during a cohort sync.

Common reasons for differences in cohort syncs include:

* **Unresolved mapping**: If a user property is not set (i.e., is `NULL`), Amplitude cannot sync the user the property is attached to. For example, if you're syncing a cohort of 100 users to a platform using email as the `User_ID`, but only 50 users have provided an email, only those 50 will sync. Check and fix your data at the source, update it in Amplitude, and then do another sync.
* **Invalid mapped properties**: Properties that do not conform to the expected format in third-party destinations can cause partial or failed syncs. For example, the downstream destination may not accept a particular identifier format, like email or phone number.

{{partial:admonition type='note'}}
If a sync is partially successful, the entire cohort sync will still be marked as successful, regardless of whether individual users are valid or not.
{{/partial:admonition}}

## Warning when updating cohort mapping

Amplitude issues a warning if you attempt to modify the Amplitude user property mapping, because doing so can impact active cohort syncs. Click *View Syncs* to view the sync that could be affected. From there, decide if you want to turn off the sync.

![](/docs/output/img/audiences/24324916576155.png)  

Even if you **don't** receive a warning, be careful when modifying the mapping properties. If you're not, you may get unexpected changes in the number of users tracked.

For instance, if you opt to stop mapping by email addresses and switch to phone numbers instead, users who were previously synced with their emails will not receive updates. Your modification will **only affect new users.** They'll be synced based on their phone numbers, while previously existing users will still be synced based on their email addresses. Over time, this could lead to data discrepancies.

If your cohort sync process has been in place for some time and you're considering changing the mapping, consider establishing a new sync destination first, and then proceed with the sync using this new target.

## View sync history

The cohort sync history page provides a detailed breakdown of cohort syncs over the last 14 days. Each cohort sync provides a list of skipped, added, or removed users. To access this page, follow these steps:

1. Click the *Cohorts* tab.
2. Choose the specific cohort of interest.
3. Click the *Syncs* tab.
4. If multiple destinations are involved, select the appropriate cohort destination.
5. Click the *History* tab.
6. Click *Export list* to download a CSV. See the [Inspect CSV exports via download](https://docs.google.com/document/d/18yRRJCbE35Dc9c7znO-YhQ00LYD6KWw1ltAKjXJ3J7U/edit#bookmark=id.8g3benqkxz79) section below for more detailed information.

![](/docs/output/img/audiences/24324901338907.png)

{{partial:admonition type='note'}}
This detailed cohort sync history page is available for all cohort sync destinations except for [Amazon S3](/docs/data/destination-catalog/amazon-s3) and [TradeDesk](/docs/data/destination-catalog/thetradedesk). These destinations continuously perform a full sync of users, not just the initial sync followed by incremental changes, making CSV downloads impractical. 
{{/partial:admonition}}

## Inspect exported cohorts via CSV download

To find out which and how many users have been exported from your cohort to your third-party destination, download a CSV containing all users that have been exported.

The CSV export includes the following columns:

* **Amplitude\_id:** Displays the unique Amplitude ID associated with each user.
* **Operation:** Indicates whether a user was added or removed from the cohort membership
* **Mapped properties:** This column shows the mapped user identifier for the cohort sync.
* **Skip\_detected:** Shows if a user was skipped during the cohort sync process.
* **Skip\_reason:** High-level categorization of why a user was skipped:
	* **Unresolved mapping**: This user was skipped during the cohort sync because the mapped property used to identify the user is missing or has no value.
	* **Rejected by partner:** This user was rejected by the third-party destination because the mapped property does not adhere to the required format. For example, if data fields aren't in the correct numeric or email format, the user is excluded from the cohort sync.

It's common for some user properties to be incomplete or out of compliance with the target platform's criteria. A cohort sync success rate over 80% is often acceptable for advertising campaigns, while a rate above 95% is recommended for email campaigns or A/B testing.

If there are a significant number of skipped entries, there may be a data quality issue at the source. To resolve this, review the CSV file to pinpoint the discrepancies. Then make any appropriate corrections to the user data when you're importing it into Amplitude. After doing so, launch the cohort sync process again to confirm the accuracy and consistency of your data.

## Additional considerations

* **Real-time cohort sync:** With Amplitude's Real-Time Sync (RTS) feature, the cohort sync history page does not allow you to download a CSV export for users who were skipped during the sync. For detailed tracking of skipped users, consider using hourly or daily syncs instead of real-time.
* **Users are silently dropped upon reaching destination:** Some destinations may return a 2XXs response to indicate the cohort sync has synced successfully from Amplitude, even though the destination has actually silently dropped users who didn't meet their criteria. In these cases, confirm that a specific user has been exported by looking at the CSV file.

{{partial:admonition type='note'}}
 Amplitude aims to detect when users are not included at third-party destinations by using their response codes. In some cases, these users cannot be identified. If you have any questions, post in the [Amplitude community](https://community.amplitude.com/) or contact the [Support team](https://help.amplitude.com/hc/en-us/requests/new) for assistance.
{{/partial:admonition}}

## Supported destinations

See the [Destination Catalog](/docs/data/destination-catalog).