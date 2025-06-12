---
id: db2cf17f-bc11-4a3b-ae77-020a55ad0455
blueprint: faq_and_troubleshooting
title: 'Block and filter internal users'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360016338212'
category: governance
---
To keep data clean on Amplitude, we recommend setting up a development project in conjunction with your production project; test data should be sent to the development project only. However, the necessary step of testing your production environment can send internal data into your production project. Because internal user events can falsely inflate your product's metrics, you must block or filter out these events for accurate reporting.

This article covers some frequently asked questions about preventing internal user data from affecting your metrics.


{{partial:collapse name="How do I block specific users?"}}
You can block all internal event data originating from your organization's IP address from ingestion into Amplitude Analytics. Your project's Data Filters page enables you to set up filters for this purpose.

To set up a filter to block events from a specified IP address, follow these steps:

1. From Data, navigate to Filters and click *+Create Block Filter*.
2. In the fly-out panel that appears, choose which environment you want to apply the filter to.
3. Select *Events* from the *Block* drop-down menu.
4. Choose *IP Address* and *equal to* from the two other drop-down menus. Then enter the IP address you wish to block.
5. Click *Block Data*.
6. Repeat steps 4 through 6 for each IP address you want to block.

{{partial:admonition type='note'}}
 You must be a manager or admin of your organization to add a data filter.
{{/partial:admonition}}

Once you have this filter set up, all events sent from your list of IP addresses will be dropped upon ingestion.

This filter **will not work** if you've modified Amplitude's SDK configurations to prevent the collection of IP addresses. It will only drop events that have a collected IP address string that matches the IPs you've blocked.
{{/partial:collapse}}


{{partial:collapse name="How do I filter out specific users?"}}
Internal user events can always be segmented out using the Segmentation Module of any Amplitude chart. Simply segment out users by user ID, device ID, Amplitude ID, IP address, or an identifiable user property (e.g. username or email). 

![block_and_filter_users_1.png](/docs/output/img/faq/block-and-filter-users-1-png.png)
{{/partial:collapse}}


{{partial:collapse name="How do I save user segments?"}}
You can easily save user segments and pin them to your charts so that you don't need recreate filters every time you want to use them. When you set a saved segment as your default, all new charts you create via the *Create Chart* or *New* button will have the default segment automatically applied. The applied filter will then be visible on your chart.

![build_charts_in_amplitude_default_segment.png](/docs/output/img/faq/build-charts-in-amplitude-default-segment-png.png)
{{/partial:collapse}}


{{partial:collapse name="How do I maintain user lists?"}}
Your list of internal users can change over time, and maintaining this list can be time-consuming if your users do not share a common attribute. In these cases, you can take advantage of Amplitude's [behavioral cohorts](/docs/analytics/behavioral-cohorts) feature and import a cohort of internal users to block on Amplitude.

This cohort can be applied to charts in a similar fashion to user properties. Once you've created a user segment that excludes your internal cohort, save and pin the segment for easy access.

![block_and_filter_2.png](/docs/output/img/faq/block-and-filter-2-png.png)

Behavioral cohorts can also be updated programmatically, so your cohort of internal users can be easily maintained. Please check out the [Behavioral Cohorts API](/docs/apis/analytics/behavioral-cohorts) for more details.
{{/partial:collapse}}
