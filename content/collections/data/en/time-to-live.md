---
id: ba19562a-4957-464b-be1c-f86926c58289
blueprint: data
title: 'Time to Live (TTL)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722896162
source: 'https://www.docs.developers.amplitude.com/data/ttl-configuration/'
landing: false
exclude_from_sitemap: false
ai_summary: "Amplitude's TTL feature lets you control how long event data lives in your instance. You can set the retention period at the organization level and override it at the project level. Enabling TTL triggers daily data retention checks. This feature is available on the Enterprise plan. Remember, enabling TTL permanently deletes data. Admins can configure TTL settings. To enable TTL, contact your Account Manager or submit a support request. Admins can also add project-level TTL overrides. Remember, once TTL deletion starts, it is irreversible."
---
Amplitude Data's Time-to-Live (TTL) feature lets you have control over how long event data lives in your Amplitude instance. Set the retention period for event data at the organization level, and override it at the project level. When you enable TTL, a job runs daily to make sure that Amplitude retains your event data according to your TTL policy.

## Feature availability

This feature is available to organizations on an **Enterprise** plan. For more information, see the [pricing page](https://amplitude.com/pricing).

## Considerations

{{partial:admonition type="warning" heading="TTL causes irreversable data loss"}}
After TTL is enabled, Amplitude deletes data outside of the retention period.
{{/partial:admonition}}

- Amplitude uses the date the event data reaches the Amplitude server when determining the retention period. Therefore, any backfill or migration of event data may affect the retention period for that event data.
- When you enable TTL and set a retention period, Amplitude deletes all event data sent to Amplitude outside of your retention period.
- Enabling TTL affects existing Amplitude reports. After you enable TTL, Amplitude zeros out charts that query data outside the set retention period. They appear as if the data for that period never existed within Amplitude.
- The initial deletion may take longer than daily deletions. Depending on an organization’s historical event volume, it may take up to 30 days.

## Enable TTL 

To have TTL controls enabled for your organization, reach out to your Account Manager at Amplitude or fill out a [support request](https://help.amplitude.com/hc/en-us/requests/new).

## Configure TTL for your organization

Amplitude Admins can configure TTL. 

1. Navigate to **Organization Settings** and click the **Time to Live(TTL)** tab.
2. Choose the retention period.
3. Confirm your changes.

After you confirm, deletion of your event data starts in 24 hours. It may take up to 30 days for the initial deletion. 

{{partial:admonition type="warning" heading="Canceling TTL"}}
If you want to cancel TTL, an admin can rescind the request in the 24 hour period before data deletion begins. After 24 hours, the deletion begins and is irreversible.
{{/partial:admonition}}

### Add a project-level TTL override

Amplitude Admins can add overrides.

1.  Navigate to **Organization Settings** and click the **Time to Live(TTL)** tab.
2. Click **Add Project TTL Override**.
3. Search for and select the project, and set the retention period.
4. Click **Save** to update the project's retention.
