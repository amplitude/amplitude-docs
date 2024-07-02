---
id: 49af870e-6ebe-4441-8377-99204ad64716
blueprint: faq_and_troubleshooting
title: 'Channel classifier'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/18747333783067'
category: governance
---
Amplitude's channel classifier offers customers the possibility to define acquisition channels that will enable them to efficiently track their traffic sources. This article covers frequently asked questions about the channel classifier. 

{{partial:collapse name="Who can create and modify channel definitions?"}}
Channels classifier is currently only available to Growth and Enterprise users, and you must be an org admin or manager to create a channel and modify channel definitions. 

Are users notified if a change is made to a channel classifier?
Users and other admins aren't currently notified if any changes are made. Any reports sourced from the channel classifier are automatically updated to reference the most recent definition the next time a report is loaded or refreshed.
{{/partial:collapse}}


{{partial:collapse name="Where can users use these acquisition channels after they are defined?"}}
Channels are stored as properties and can be queried through any analytics chart type (including Data Tables). You can find your channels by going *Properties* in Amplitude Data.

What kind of properties can be used in configuring a channel?
Any (event, user, group) property can be used and mixed and matched in the definition. The channel classifier will inherit the combination of the property types.
{{/partial:collapse}}


{{partial:collapse name="Will the properties be defined retroactively at the time a channel is created?"}}
Yes. When a new channel is created, all existing charts will update retroactively to reflect the new definition the next time the report is refreshed.
{{/partial:collapse}}

{{partial:collapse name="How can I copy channel classifiers across projects in Amplitude Data?"}}
Select a channel classifier and click *Copy To,* then specify the project you want to copy it to. 
{{/partial:collapse}}

{{partial:collapse name="How can I upload a channel definition?"}}
It currently isn't possible to upload a channel classifier definition. If you would like to create a channel classifier, you must manually create a column for every individual property you want to include in the definition.
{{/partial:collapse}}


{{partial:collapse name="Why can't I see my channels in a Data Table?"}}
If you are using our pre-defined sample Channel Classifier, you'll have to ensure that you are tracking the *utm\_medium* and *referring\_domain* properties in order for this to generate results in your Data Table. If you're not tracking these, you'll either have to remove the column containing them from the Channel Classifier or instrument them as properties to start tracking them. 

![Screenshot 2023-09-13 at 17.18.15.png](/docs/output/img/faq/screenshot-2023-09-13-at-17-18-15-png.png)
{{/partial:collapse}}


{{partial:collapse name="Is the referring domain captured by Amplitude, or does this value need to be passed by the customer?"}}
Referring Domain and any other properties that can be tracked for attribution purposes (i.e. UTM parameters, etc.) need to be sent from the customer to Amplitude. 
{{/partial:collapse}}

{{partial:collapse name="Should I be setting channel classifiers to include *initial_utm* and *utm_ properties* so that initial and most recent campaign traffic gets bucketed correctly?  "}}
Unless you would like to create a specific "Initial Channel", you shouldn't use or mix any of the i*nitial\_{} properties*. It's best to focus on the standard/non-initial ones. 
{{/partial:collapse}}


{{partial:collapse name="Can I input a regex formula when creating a channel classifier?"}}
You can enter in the regex as free-form text when creating a channel classifier.

![9fa030f73be38a0008933fa2a3f733b384ebfc74.png](/docs/output/img/faq/9fa030f73be38a0008933fa2a3f733b384ebfc74-png.png)
{{/partial:collapse}}

{{partial:collapse name="Is the referring domain captured by Amplitude, or does this value need to be passed by the customer?"}}
Referring Domain and any other properties that can be tracked for attribution purposes (i.e. UTM parameters, etc.) need to be sent from the customer to Amplitude. 
{{/partial:collapse}}


{{partial:collapse name="Why am I seeing '(none)' values when grouping by my channel in a Data Table?"}}
You are seeing '(none)' values because you are querying on an event that occurred before that user property was ever sent. When using Amplitude, you are querying on the value of a user or event property at the time of the event. The '(none)' showing for the property in the Data Table when grouping by your channel means that there is no value for that property.
{{/partial:collapse}}
