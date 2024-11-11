---
id: c657f85d-8174-4941-9c82-80b794b5d776
published: false
blueprint: account-management
title: 'Scale: Manage your event volume with dynamic behavioral sampling'
source: 'https://help.amplitude.com/hc/en-us/articles/115001476972-Scale-Manage-your-event-volume-with-dynamic-behavioral-sampling'
---
#### This article will help you:

* Manage costs related to very high event volumes

With Scale, Amplitude enables **dynamic behavioral sampling** for ultra-high volume customers who have unique cost challenges. Sampling lets you keep your data costs manageable without compromising the accuracy of your analyses.

### Feature availability

This feature is available to users on **Enterprise plans only**. See our [pricing page](https://amplitude.com/pricing) for more details.

{{partial:admonition type='note'}}
Scale is a paid add-on intended for extremely high volume customers. **Amplitude** **does not sample by default**. Contact your Account Manager if you believe Scale may be appropriate for your organization.
{{/partial:admonition}}

## How sampling works

At the user level, the Amplitude algorithmic sampling framework samples events based on **user identity**:

* For tracked users, it preserves users' full event streams, thus preserving their behaviors.
* It also ensures the integrity of data in Amplitude, as opposed to random event-level sampling which could potentially provide you with incomplete data.

When sampling is enabled, Amplitude will **upsample metrics** to provide you with highly accurate estimates on every chart and in every analysis.

To oversimplify, what this means is that Amplitude will multiply your events and users by a sampling factor, equivalent to `(100% / sampling rate)`.

For example, if you are sampling at 10%, Amplitude would multiply tracked events by 10 to give you an accurate estimate of your **true event volume**. This helps every end user in Amplitude focus on analytics without worrying about the sampling rate being used. 

Each Amplitude chart will show the sampling rate applied to it. This allows for transparent communication of effective sampling rates.

![Screen_Shot_2023-03-22_at_11.02.05_AM.png](/docs/output/img/account-management/screen-shot-2023-03-22-at-11-02-05-am-png.png)

You can see the raw events seen for your project for last month and the current month, along with the number of events after sampling. This provides you with real-time access to event volume. 

![scale_1.png](/docs/output/img/account-management/scale-1-png.png)

{{partial:admonition type='note'}}
Sampling does not apply to PROPCOUNT results.
{{/partial:admonition}}

## Set up sampling

You must be an [Admin](/docs/admin/account-management/user-roles-permissions) in your Amplitude organization in order to make any sampling-related changes.

To set up sampling, follow these steps:

1. Click ![gear_icon_for_settings.png](/docs/output/img/account-management/gear-icon-for-settings-png.png), then click *Projects.* Select the project you're interested in. Then click *Sampling*.

![scale_2.png](/docs/output/img/account-management/scale-2-png.png)

2. In the modal that opens, click *Edit* to set the **dynamic sampling rate**.

![scale_3.png](/docs/output/img/account-management/scale-3-png.png)

The dynamic sampling rate specifies the frequency with which your data will be queried. For example, if you have 50 million active users per year and you set a dynamic sampling rate of 10%, your queried data will contain 5 million active users per year. Your event costs will be significantly lower, yet you'll still have more than enough data to generate highly accurate analyses.

3. Next, set your **user property inclusion list**, if desired.

![scale_4.png](/docs/output/img/account-management/scale-4-png.png)

This list acts as a safelist to set aside small, key sub-populations from your sampling process. Users included in these populations will be exempt from sampling, and will always appear in your data. These populations are defined by the user properties and values you select in this step.

{{partial:admonition type='note'}}
This process does not apply retroactively. Additionally, the following properties are not supported by the user property inclusion list: `![amplitude_logo.png](/docs/output/img/account-management/amplitude-logo-png.png)User
{{/partial:admonition}}
 ID`, `![amplitude_logo.png](/docs/output/img/account-management/amplitude-logo-png.png)ID`, and `![amplitude_logo.png](/docs/output/img/account-management/amplitude-logo-png.png)Device ID`.

### Anonymous users

Although Amplitude prioritizes [identifying and tracking unique users](/docs/data/sources/instrument-track-unique-users), ingestion-side sampling can sometimes lead to inaccuracies when it comes to anonymous users. For example, if an anonymous user triggers an event from a new device, that user will be assigned a new Amplitude ID and will be sampled based on that new ID. Even if it's determined at a later time that this user was actually a previous user using a new device, there is **no way** to retroactively link the paired events to the particular user's previous Amplitude ID. Since the **sampling of events is based on the Amplitude ID at the time the event was ingested**, analyses that rely on user behavior on new devices may be inaccurate or skewed.

## Accuracy benchmarks

Amplitude benchmarks the accuracy of sampled results in terms of percent error, or relative standard deviation at a 95%, two-tailed confidence interval. This is a function of standard error and the true (unsampled) result.

Customers with high volumes (10M DAUs and more) will achieve results within 0.62% accuracy levels at a 5% sampling rate. Amplitude further assumes that any particular analysis would only need to consider 10% of the DAUs to achieve these results. Higher coverage will generally result in higher accuracy.

The following table shows percent error at a 95% confidence interval across sampling rates for various DAU volumes: 

| **DAUs | Sample Rate** | **25%** | **10%** | **5%** | **2%** | **1%** |
| --- | --- | --- | --- | --- | --- |
| 500,000 | 1.73% | 2.76% | 3.91% | 6.19% | 8.76% |
| 1,000,000 | 1.22% | 1.95% | 2.76% | 4.38% | 6.19% |
| 5,000,000 | 0.55% | 0.87% | 1.24% | 1.96% | 2.77% |
| 10,000,000 | 0.39% | 0.62% | 0.87% | 1.38% | 1.96% |
| 20,000,000 | 0.27% | 0.44% | 0.62% | 0.98% | 1.39% |
| 50,000,000 | 0.17% | 0.28% | 0.39% | 0.62% | 0.88% |

For example, if you sample at 10% with 10 million users, it's extremely unlikely you will ever see more than 0.62% error in any metric. So, if your retention is 16%, you might see a variance of:

`+/- 0.62% * 16% = +/- 0.1%`
