---
id: 26007a03-f5ca-46e3-af19-a58c70532ed6
blueprint: faq_and_troubleshooting
title: 'Behavioral cohorts'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/4402840043789'
category: recommendation
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719951122
landing: true
landing_blurb: 'See what other people ask about Behavioral Cohorts'
---
This article covers some frequently asked questions about [Behavioral Cohorts](/docs/analytics/behavioral-cohorts).


{{partial:collapse name="How do I group users with a certain property value that was recently introduced?"}}
To create a cohort of these users, you can use the [**most recently**](/docs/analytics/define-cohort#user-property-clauses) feature. This will find users who had a certain property value on their most recent active event in the time frame given.

For example, here Amplitude is querying for users who most recently had "Germany" as the value for the `country` user property in the last 30 days:

![Screenshot](/docs/output/img/faq/screenshot.png)
{{/partial:collapse}}


{{partial:collapse name="Why does the .CSV file keep failing when uploading a list of users to create a cohort?"}}
The .CSV file may only contain one field with values:

* The file can contain either the user IDs or Amplitude IDs, but **not both**.
* It must not contain blank space or other text.

If the file isn't in the correct format, Amplitude shows an error message and won't upload the cohort. Read more about [uploading .CSV files as cohorts](/docs/data/csv-import-export).

A properly-formatted .CSV file looks like this:

![Screen_Shot_2021-07-07_at_10.05.11_AM.png](/docs/output/img/faq/screen-shot-2021-07-07-at-10-05-11-am-png.png)
{{/partial:collapse}}


{{partial:collapse name="Why is the cohort definition non-modifiable?"}}
While it is possible to create cohorts from certain charts, particularly retention charts, it is not possible to modify the events from within these cohorts. In this example, the steps are present, but not modifiable. In order to change them, return to the source of the chart, change the steps there, and recreate a new cohort.

![Screenshot](/docs/output/img/faq/screenshot.png)
{{/partial:collapse}}


{{partial:collapse name="Why doesn't this cohort support population over time?"}}
Cohort population is only supported for **dynamic cohorts**, i.e., cohorts that can be recomputed according to specified criteria. It is not supported for static cohorts. Examples of static cohorts include those imported from a .CSV file or created using Microscope within charts.

How do I create a cohort of users who fired an event a specific number of times in the last 30 days?
The [**count**](/docs/analytics/behavioral-cohorts) feature in cohorts allows you to segment these users. The following cohort definition will segment users who fired `Play Song or Video` ten times or more in the last 30 days.

![Screenshot](/docs/output/img/faq/screenshot.png)
{{/partial:collapse}}

{{partial:collapse name="How can I identify users who lack user properties or did not perform events?"}}
You can create a custom definition of a group of users based on not only the events they have performed, but also events which they **did not** perform.

{{partial:admonition type='note'}}
Amplitude does not process queries that include `Count = 0` or `Count < 1`. All such queries return zero users.
{{/partial:admonition}}

To identify users who did perform a particular event or who lack a particular property, follow one of the processes described below.

**Identify users who were on product in the last 30 days but did not complete Event A**

In this example, AmpliTunes is the product, and `Favorite Song or Video` is the key event we are interested in. To create this cohort, we can use the *did not* clause, which exists as an option when you add a second event to your cohort.

![behavioral_cohorts_faq_0.png](/docs/output/img/faq/behavioral-cohorts-faq-0-png.png)

This will **exclude** users who have triggered `Favorite Song or Video` at least once in the last 30 days. This will in turn help identify users who have not triggered this event.

**Identify users who lack a particular user property in the last 30 days** 

Another common scenario is identifying all the active users who **did not** become a paying user at any point in time during the last 30 days. To do this, you'll once again use the *did not* clause.

![behavioral_cohort_faq_1.png](/docs/output/img/faq/behavioral-cohort-faq-1-png.png)

Instead of identifying users who have `Paying = false` at any time in the last 30 days, you'll need to identify users who **did not** have `Paying
 = true` during that same timeframe. 

If a user was not a paying user at the start of the month but became a paying user by end of this month, querying for users who have `Paying = false` at any time in the last 30 days will identify them. Read on for more information about [cohorts in Amplitude](/docs/analytics/behavioral-cohorts).
{{/partial:collapse}}


{{partial:collapse name="How do I export a cohort with only user IDs or specific user properties?"}}
You can use Amplitude's [Behavioral Cohort API](/docs/apis/analytics/behavioral-cohorts) to download a cohort with only user IDs or specific user properties. Downloading a cohort via this API happens in three steps:

1. [Request a single cohort](/docs/apis/analytics/behavioral-cohorts#get-one-cohort).
2. [Poll the cohort status](/docs/apis/analytics/behavioral-cohorts#get-request-status).
3. [Download the file](/docs/apis/analytics/behavioral-cohorts#download-cohort).

In step 1, when you set the props parameter to 0, the download will only include Amplitude ID and User ID. When props = 1, the download will include all user properties.

If you want to export specific user properties, set props = 1 and add the desired user properties in the propKeys parameter. See the example below.

```curl
curl --location --request GET 'https://amplitude.com/api/5/cohorts/request/26umsb5?props=1&propKeys=Property1&propKeys=Property2' --header 'Authorization: Basic MTIzNDU2NzgwMDoxMjM0NTY3MDA='
```
{{/partial:collapse}}