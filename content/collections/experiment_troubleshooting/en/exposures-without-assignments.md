---
id: 3599cb83-1395-4690-83fa-54379538dd5b
blueprint: experiment_troubleshooting
title: 'Exposures Without Assignments'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
source: 'https://www.docs.developers.amplitude.com/experiment/guides/troubleshooting/exposures-without-assignments/'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717179459
---

The Exposures without Assignments chart appears in the **Diagnostics** card and queries for the cumulative number of unique users who have performed an exposure event without a corresponding assignment event within each day. 

If you see a large number or percentage of users in the chart, be careful when interpreting the results of your experiment. Investigate what happens if someone gets exposed to the experiment that shouldn't: 

- Is the experience bad?
- Can the user even see the experience?
- What does it mean if a user sees both experiments when they're mutually exclusive?

Exposure without assignment may also affect future experiments, so you should investigate and fix the issue. 

{{partial:admonition type="note" heading=""}}
This chart doesn't appear if you selected assignment event as the exposure event or if you are using [local evaluation](/docs/feature-experiment/local-evaluation). 
{{/partial:admonition}}

{{partial:admonition type="note" heading=""}}
Sometimes the exposure event is delayed and is sent on a different day than the assignment event. For example, the assignment event is sent today and the exposure event is sent tomorrow. There may be an issue if, between the assignment and exposure events being sent, the user's user properties have changed in a way that affects whether they should be targeted. Otherwise, you can ignore this warning.

{{/partial:admonition}}

## Causes

A significant number of users in the Exposures without Assignments chart could be caused by a few different scenarios, such as: 

- Identity mismatch between assignment and exposure.
    - User ID and device ID are incorrect, switched, or [missing](/docs/apis/analytics/http-v2#device-ids-and-user-ids-minimum-length) on either assignment or exposure. For example, sending the device ID as the user ID or visa versa.
- Account switching on the same device.
    - If a real user has multiple accounts on the same device, and you don't call fetch on login/logout, the value accessed by `variant()` triggers an exposure for the new user without an assignment event. It's important to re-call `fetch()` whenever there are changes to the user identity.
- Exposures for fallback variants.
    - If you are manually tracking exposure events, you shouldn't track exposure events for fallback or default variant values. For example, if a user isn't assigned a variant for an experiment, so you show the user the control, the user shouldn't have an exposure event tracked with the variant value control.
    
## Debugging

To debug exposure without assignment, open the chart in analytics and view user streams. Some common problems you may see are:

1. Users who only have assignment or exposure events. This is likely due to an identity mismatch between assignment (`fetch()`) and the exposure tracked through analytics.
2. User login followed by exposure events without an assignment event. This is likely due to account switching on the same device. Use user lookup with the device ID to see if there are multiple logged in users sharing the same device. Someone has multiple accounts on the same device and you call `fetch()` and then they sign out and sign in to another account and then you call `variant()`. It's important to re-call `fetch()` whenever there are changes to the user identity. 

## Problems with your Experiment

- Users may be exposed to the experiment when they don't meet the rule based targeting criteria. This happens because the rule based targeting is checked on the `fetch()` call.
- Users may be exposed to both experiments even though the experiments are mutually exclusive.