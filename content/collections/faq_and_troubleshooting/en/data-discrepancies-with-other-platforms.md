---
id: d96f413e-6cf2-4bac-b9e2-23575175d3fa
blueprint: faq_and_troubleshooting
title: 'Data discrepancies with other platforms'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/115002383247'
this_article_will_help_you:
  - "Troubleshoot when Amplitude's numbers do not match those provided by other platforms"
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720214605
category: other
landing: false
---
Sometimes, Amplitude's numbers may differ from those provided by other vendors. This can happen for a number of different reasons.

## Before you begin

This article assumes that you understand how Amplitude tracks users and sessions. If you don't feel confident in your understanding, check out our articles on [tracking unique users](/docs/cdp/sources/instrument-track-unique-users) and on [the definition of a session in Amplitude](/docs/cdp/sources/instrument-track-sessions) before proceeding.

## Data discrepancy checklist

This list of questions acts as a quick troubleshooting checklist for any data discrepancies you may be experiencing. If you can answer "yes" to a question, it's probably not the cause.

{{partial:collapse name="Do the time zones between Amplitude and the other platform align?"}}
If not, align the time zones before comparing numbers. Amplitude timestamps the data it ingests in UTC, but you can customize the time zone [within the Amplitude UI](/docs/admin/account-management/manage-orgs-projects#view-and-edit-your-project-information).
{{/partial:collapse}}

{{partial:collapse name="Do the events you currently track in Amplitude reflect what you're tracking in the other platform?"}}
If not, then a discrepancy between your users and sessions numbers becomes more likely, as both are dependent on the events being tracked.
{{/partial:collapse}}

{{partial:collapse name="Do Amplitude and the other platform block the same web bots and scrapers?"}}
If not, then a discrepancy between your users and sessions numbers becomes more likely. 
{{/partial:collapse}}

{{partial:collapse name="Do the other platform and Amplitude both define the metric of interest the same way?"}}
If not, then a discrepancy is more likely.
{{/partial:collapse}}

{{partial:collapse name="Does the other platform merge users like Amplitude does?"}}
If not, then you may see a discrepancy between your users and sessions numbers, depending on the identifiers the other platform uses to merge its users.
{{/partial:collapse}}

{{partial:collapse name="Is the session timeout window the same between Amplitude and the other platform?"}}
If not, you're more likely to see a discrepancy between your sessions numbers.

{{partial:admonition type='note'}}
If you're tracking data via the Amplitude SDKs, the default session timeout windows are 30 minutes for web and five minutes for mobile. These thresholds are customizable in Amplitude, so please confirm with your developer whether they have been customized.
{{/partial:admonition}}
{{/partial:collapse}}

## Sessions in Google Analytics

Though Google Analytics and Amplitude track sessions similarly, certain common events can cause a discrepancy in your session numbers.

| **Scenario** | **Amplitude** | **Google Analytics** | **Source** |
| --- | --- | --- | --- |
| Time hits midnight | Session continues | The current session ends at 11:59 PM and the new session starts at 12:00 AM. | [See "Time Based Expiration"](https://support.google.com/analytics/answer/2731565#time-based-expiration) |
| Campaign source changes | Session continues | New session begins even if it is within the 30-minute threshold. | [See "Campaign Based Expiration"](https://support.google.com/analytics/answer/2731565#campaign-based-expiration) |
| Session Event Limit | No limit | After the first 10 events, tracking is limited to 1 event per second. | [See "Events Per Session Limit"](https://support.google.com/analytics/answer/1033068) |