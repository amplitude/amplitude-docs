---
id: 49af870e-6ebe-4441-8377-99204ad64716
blueprint: faq_and_troubleshooting
title: 'Channel classifier'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/18747333783067'
category: governance
landing: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1721323976
---
Amplitude's channel classifier offers the possibility to define acquisition channels that enables you to efficiently track your traffic sources. This article covers frequently asked questions about the channel classifier. 

{{partial:collapse name="Who can create and modify channel definitions?"}}
Channels classifier is currently only available to Growth and Enterprise users, and you must be an org admin or manager to create a channel and modify channel definitions. 

Are users notified if channel classifiers change?
Users and other admins aren't currently notified in this event. Any reports sourced from the channel classifier automatically updated to reference the most recent definition the next time someone loads or refreshes a report.
{{/partial:collapse}}


{{partial:collapse name="Where can users use these acquisition channels after they are defined?"}}
Channels are stored as properties, which you can query through any analytics chart type (including Data Tables). Find your channels by navigating to *Properties* in Amplitude Data.

What kind of properties can be used in configuring a channel?
Any (event, user, group) property can be used and mixed and matched in the definition. The channel classifier inherits the combination of the property types.
{{/partial:collapse}}


{{partial:collapse name="Are properties defined retroactively when a channel is created?"}}
Yes. All existing charts update retroactively to reflect the new definition the next time someone refreshes the report.
{{/partial:collapse}}


{{partial:collapse name="How can I upload a channel definition?"}}
It currently isn't possible to upload a channel classifier definition. If you'd like to create a channel classifier, you must manually create a column for every individual property you want to include in the definition.
{{/partial:collapse}}


{{partial:collapse name="Why can't I see my channels in a Data Table?"}}
If you're using our pre-defined sample Channel Classifier, ensure that you are tracking the *utm\_medium* and *referring\_domain* properties in order for this to generate results in your Data Table. If you're not tracking these, either remove the column containing them from the Channel Classifier or instrument them as properties to start tracking them. 

![Screenshot 2023-09-13 at 17.18.15.png](/docs/output/img/faq/screenshot-2023-09-13-at-17-18-15-png.png)
{{/partial:collapse}}


{{partial:collapse name="Is the referring domain captured by Amplitude, or do I have to pass this value?"}}
You must send Referring Domain, as well as any other properties you track for attribution purposes (like UTM parameters, for example), to Amplitude.
{{/partial:collapse}}

{{partial:collapse name="Should I be setting channel classifiers to include *initial_utm* and *utm_ properties* so that initial and most recent campaign traffic gets bucketed correctly?  "}}
Unless you'd like to create a specific "Initial Channel", you shouldn't use or mix any of the i*nitial\_{} properties*. It's best to focus on the standard/non-initial ones. 
{{/partial:collapse}}


{{partial:collapse name="Can I input a regex formula when creating a channel classifier?"}}
You can enter the regex as free-form text when creating a channel classifier.

![9fa030f73be38a0008933fa2a3f733b384ebfc74.png](/docs/output/img/faq/9fa030f73be38a0008933fa2a3f733b384ebfc74-png.png)
{{/partial:collapse}}

{{partial:collapse name="Is the referring domain captured by Amplitude, or do I have to pass this value?"}}
You must pass Referring Domain, as well as and any other properties you track for attribution purposes (like UTM parameters, for example), to Amplitude. 
{{/partial:collapse}}


{{partial:collapse name="Why am I seeing '(none)' values when grouping by my channel in a Data Table?"}}
You're seeing '(none)' values because you're querying on an event that occurred before that user property was ever sent. When using Amplitude, you're querying on the value of a user or event property at the time of the event. The '(none)' value showing for the property in the Data Table when grouping by your channel means that there's no value for that property.
{{/partial:collapse}}