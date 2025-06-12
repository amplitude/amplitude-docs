---
id: 504243e6-32ce-40ae-bc69-a65c9648cf32
blueprint: faq_and_troubleshooting
title: 'Export CSV files'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360052836411'
category: other
---
This article covers some frequently asked questions about how Amplitude exports .CSV files.


{{partial:collapse name="How does Amplitude determine the structure of the .CSV file when exporting from an Event Segmentation chart?"}}
Amplitude uses the breakdown data table as a guide when creating the .CSV file to export. The format and structure of the table should be mirrored in the .CSV.

The .CSV file is not showing all the possible values of the user/event property. Why is that?
There are limits to the amount of values appear in a .CSV file. This differs from chart to chart. Read more about these limits [here](/docs/faq/limits).
{{/partial:collapse}}


{{partial:collapse name="Why is the value of the user property different between the chart and .CSV export?"}}
When downloading users from the chart via Microscope, the .CSV will contain the most recent property values for the user. The chart is returning the property value *at the time of the event*.

Sometimes the .CSV has certain property values populated which are listed as "none" in the chart. Why is that?
Similar to the previous answer, when downloading users from the chart via Microscope, the .CSV will contain the most recent property values for the user. The chart is returning the property value *at the time of the event*.
{{/partial:collapse}}


{{partial:collapse name="Why are there leading spaces (tabs) in my exported .CSV file?"}}
By default, leading empty spaces may be in the cells of your exported .CSV file. To change this default setting:

1. Go to *Personal settings*,
2. then *Profile*,
3. and enable the *Always Remove Leading Spaces from Export* toggle under *Site Settings*.

![siteSettings.png](/docs/output/img/faq/sitesettings-png.png)

Read more about how to [manage your settings](/docs/admin/account-management/account-settings).
{{/partial:collapse}}
