---
title: "Channels"
source: "https://help.amplitude.com/hc/en-us/articles/5918635077403-Channels"
id: ca26cfe2-d99f-498a-8581-6485a736d4bb
---

#### This article will help you:

* Understand how adding a channel can help to better track sources of site traffic
* Learn how to create channels and compare metrics between them

Marketers often want to define their acquisition channels based on [UTM](/get-started/analyze-acquisition-channels) and referrer data. Amplitude’s **channels** allow you to create new properties retroactively, based on functions and operators you can apply across multiple existing properties. These do not affect your raw data and will be computed on the fly.

For example, you may want to understand the distribution of organic traffic to your site. Define a version of your channels that includes the known social and search domains at that time. When a new social or search channel becomes prevalent, you can update your organic search definition and all of your existing charts will update **retroactively** to reflect the new definition.

![image2.png](/output/img/data/image2-png.png)

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only.

## Create a channel

You must be an Admin or Manager to create a channel.

To create a channel, follow these steps:

1. Navigate to the *Properties* section of Amplitude Data and open the *Channels* tab.
2. Click *+ Add Channel Classifier.* A pre-built, default channel definition screen will open. Optionally, click the default channel title (*Channel*) to edit the name. You can also add a description below it, if you like.
3. To begin creating the definition of the channel, start from the default template or click *Clear Table* to clear the table's contents and start from scratch.  
  
![image2.gif](/output/img/data/image2-gif.gif)  
  
You can add multiple properties to a row to create a more complex classifier.
4. Add one row for each channel you would like to define. For example, you can add rows labeled `Paid`, `Organic`, `Referral`, and `Direct` to create a high-level channel definition.
5. Fill in the values for each row. Each cell must evaluate to True for an event to be classified to that channel.

**TIP:** If a channel could be defined as `row A OR row B`, you can add one row for A and one row for B, and then set the channel name to be the same for both rows.

6. Click *Save*. Channels will be denoted in property drop downs under the *Channels* category.

## Compare metrics between channels with Data Tables

Amplitude’s [Data Tables](/analytics/charts/data-tables/data-tables-multi-dimensional-analysis) allow you to define metrics critical to your bottom line, such as CPA, AOV and ROAS. Evaluate how these metrics perform between different channels by **grouping by your channel** on the left-hand column. To see how these channels break down further, add other core dimensions like campaigns.

![image1.png](/output/img/data/image1-png.png)

Metrics can be attributed in different ways if a user has multiple touch points with different channels before converting. Amplitude has built [attribution modeling](/analytics/charts/data-tables/data-tables-attribute-credit) into data tables to enable defining user attribution in your channels.

**NOTE:** Applying a channel classifier before an attribution model can attribute values in potentially unexpected ways. For example, in a sequence consisting of:  
  
`CPC
 --> email --> website`  
  
Applying a channel classifier of `CPC only` will result in `email` and `website` being filtered out. In this case, the attribution model would attribute to CPC.

## Use cases

* **Blended views:** Easily create top level blended views of all paid and all organic traffic to easily see how efficiency and performance has changed over time.
* **High-level channels:** You can break down your core metrics according to the common definitions of channels you already use in [Google Analytics](https://support.google.com/analytics/answer/6010097?hl=en#zippy=%2Cin-this-article) and [Adobe](https://experienceleague.adobe.com/docs/analytics/components/marketing-channels/c-getting-started-mchannel.html?lang=en).
* **Channels with campaigns:** Add a property denoting a campaign as a column in your channel definitions, in order to break down metrics by campaign channels.
* **Attribution:** Use channels in conjunction with attribution models in data tables to evaluate the breakdown of a metric by first, last, or a custom attribution definition.

## Special values

These special values will be evaluated on events:

|  |  |
| --- | --- |
| **Value** | **Description** |
| ANY | Any event with a defined value for that property will be valid |
| (none) | Any event with an undefined value will be valid |
|  | All events will be valid |
