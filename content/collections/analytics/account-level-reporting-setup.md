---
id: ceeb59de-e809-445f-82de-197c3f1173d6
blueprint: analytic
title: 'Set up account-level reporting'
source: 'https://help.amplitude.com/hc/en-us/articles/5332668738331-Set-up-account-level-reporting'
---
#### This article will help you:

* Correctly instrument account-level reporting in Amplitude

With [account-level reporting](/docs/analytics/account-level-reporting), you can set up aggregated, group-level analyses. This article will review the specific steps involved in the process depending on how you're sending data to Amplitude. 

## Before you begin

Before you can use account-level reporting, you will have to instrument it.

Once you've instrumented groups, a new dropdown will be visible in the right module of the chart control panel for certain charts. You will then be able to perform account-level reporting and designate whether you want to see events triggered by users or by groups.

**NOTE:** Amplitude has a limit of five group types per project.

## SDKs

You can set up account-level reporting in Amplitude's SDKs by following these specific instructions in the Developer Center, depending on which SDK you are using:

* [Android SDK](https://www.docs.developers.amplitude.com/data/sdks/android/)
* [iOS SDK](https://www.docs.developers.amplitude.com/data/sdks/ios/)
* [JavaScript SDK](https://www.docs.developers.amplitude.com/data/sdks/javascript/)

### Identify API

If you are sending data to Amplitude server-side, use the `groups` key in your identification object. This will associate a particular user in a certain group. Please see the [Identify API](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) documentation for more information on how to instrument groups via Amplitude's Identify API.

### HTTP API

If you are sending data to Amplitude server-side, use the `groups` key in your event object. This will add event-level groups (groups that only persist on that specific event). Please see the [HTTP API](https://www.docs.developers.amplitude.com/analytics/apis/http-v2-api/) documentation for more information on how to instrument groups via Amplitude's HTTP API.

## Segment

To set group types in Amplitude via Segment, you must first enable the following Amplitude destination settings and provide them with the appropriate values:

* **Group Type Trait:** This specifies what trait in your Segment `group` calls will contain the desired group type.
* **Group Value Trait:** This specifies what trait in your Segment `group` calls will contain the desired group value.

You can set groups and group properties using Segment's [`group`](/docs/analytics/account-level-reporting-setup) documentation for more information on how to instrument groups via Segment. 

## Create groups using the Group Identify API

Using the Group Identify API, you can create a new group tied with all expected group properties or update group properties for an existing group. In the example requests, the parameters and keys are *italicized*. The underlined values are what you need to replace with the parameters you are specifically interested in.

In addition, group property operations (`$set`, `$setOnce`, `$add`, `$append`, `$unset`) are supported in this Group Identify API. Please see the [Group Identify API](https://www.docs.developers.amplitude.com/analytics/apis/group-identify-api/) documentation for more information on how to instrument groups via Amplitude's Group Identify API. 

## 
