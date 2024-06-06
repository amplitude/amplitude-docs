---
id: c3c874b0-ba20-4e12-bdf7-7104a492d9a4
blueprint: analytic
title: 'Create cohorts via Microscope, file import, or the Segmentation module'
source: 'https://help.amplitude.com/hc/en-us/articles/19528398045083-Create-cohorts-via-Microscope-file-import-or-the-Segmentation-module'
---
#### This article will help you:

* Create cohorts via the Microscope feature
* Learn how to import a cohort from a file
* Create cohorts with the Segmentation module of all Amplitude chart types except Compass

## Create cohorts via Microscope

[Microscope's](/docs/analytics/microscope) *Create Cohort* option lets you create a cohort that contains all the users captured by the data point you selected. These are usually static cohorts. However, for some chart types (like basic retention and funnel analyses), you can still create [behavioral cohorts](/docs/analytics/behavioral-cohorts), though not all fields will be editable: static fields will be grayed out.

Microscope can also create a group cohort from a data point with groups applied.

Cohorts created from within Microscope will be static under the following scenarios:

* Composition with cross property values
* Retention if you have multiple returning events
* Usage interval view in retention
* Funnels with exclusion events
* Funnels that hold a property constant
* Funnels with Combine Events Inline
* Funnels with Compare Events at Step
* Distribution views in funnels (Time to Convert + Frequency)
* Event segmentation for properties (PropSum + PropAvg)
* Any chart depending on a different cohort

## Import a cohort from a file

You can create a static cohort of users or groups by uploading a .CSV or text file of [user IDs](/docs/get-started/identify-users) or Amplitude IDs. To do so, navigate to *Cohorts & Audiences* and click *Import from CSV*.

If you have the [Accounts](/docs/analytics/account-level-reporting) add-on, you can also create a cohort of groups. The file **must** contain one ID per line, and **cannot** contain any other text or extra spaces. The file size must be under 50MB.

If a user ID does not exist in Amplitude, it will simply be skipped, and that user will not be included in the cohort. If you are uploading Amplitude IDs, then all Amplitude IDs must be valid.

Your file should look like this:

![image3.png](/docs/output/img/analytics/image3.png)

A properly-formatted file has no header row, contains values only in the leftmost column, and does not include extraneous spaces or characters. The following is an example of an **improperly**-formatted file:

![image1.png](/docs/output/img/analytics/image1.png)

Once you select a file, specify whether the file contains Amplitude IDs, user IDs, or groups.

![Behavioral_Cohorts_15_Import_Cohort_from_File.png](/docs/output/img/analytics/Behavioral_Cohorts_15_Import_Cohort_from_File.png)

### Re-import a cohort from a file

Manually uploaded cohorts can be re-imported. This lets you update your cohort in place, and avoid having to change all your charts to point to a new cohort.

## Inline behavioral cohorts and interval cohorts

You can create simple behavioral cohorts directly within the Segmentation module of all Amplitude chart types except Compass. This lets you create a behavioral cohort in the context of a specific chart without having to navigate away from it and into the [Behavioral Cohorts tab](/docs/analytics/behavioral-cohorts).

To do this, click *+ Performed*.

![behavioral_cohorts_inline.png](/docs/output/img/analytics/behavioral_cohorts_inline.png)

Use this to filter your charts for users who have triggered certain events.

One difference between an inline cohort and one created via the Behavioral Cohorts tab is the existence of the *in each* clause. This lets you filter for users who have triggered the selected event a certain number of times within the time interval you specify, allowing you to create **interval cohorts**.

For example, this cohort would filter this [Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build) chart for users in the last four weeks who triggered `Download Song or Video` at least three times in a given week:

![behavioral_cohort_interval_cohort.png](/docs/output/img/analytics/behavioral_cohort_interval_cohort.png)

Of those users, 143,793 downloaded three or more songs or videos during the week of January 9th **and** triggered the `Purchase Song or Video` event.

Use inline cohorts to measure populations of cohorts over time. For example, say an important milestone in your product is playing five or more songs—each of which is longer than three minutes—in a single day. This is your **highly engaged** cohort.

From there, you can add additional *where* filters to specify event properties or user property conditions. By looking at this behavior in each interval, you can measure the population of your highly engaged cohort over time.

Next, learn how to compare and manage your behavioral cohorts.
