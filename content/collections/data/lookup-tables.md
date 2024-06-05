---
id: a47ad425-cbf2-4408-bd10-17f889025d70
blueprint: data
title: 'Add more data to event and user properties with Lookup Tables'
source: 'https://help.amplitude.com/hc/en-us/articles/8634149673627-Add-more-data-to-event-and-user-properties-with-Lookup-Tables'
this_article_will_help_you:
  - 'Understand how adding a Lookup Table data source can enhance your event and user properties'
  - 'Learn how to quickly add, edit, or delete a Lookup Table'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717622272
---
With Amplitude's Lookup Table feature, you can import your own data and map it to ingested properties to create an enhanced set of event and user properties.

### Feature availability

This feature is available to users on **Enterprise plans only**.

* This feature **is in closed beta**. Contact your Amplitude Customer Service Manager or Account Executive to get access.

With them, you can:

* **Enrich data using ingested property values**. Let's say you've captured an event called `Purchased` with an event property named `SKU`. The `SKU` value itself doesn’t inherently hold a lot of meaning. But with your list of all the SKUs and their corresponding product names, you can use this feature to create a new property called `Product Name` and have it automatically populate based on that list.
* **Bulk change or fix property values.** Imagine you've captured a user property called `Language Code` and passed in language codes (`en_US`, `fr_FR`, `de_DE`, etc.). This is difficult to read, so you want a `Language` property that maps to friendlier values like `English`, `French`, and `German`. Use this feature to create a new property called `Language` that maps the language codes to the language names.
* **Bulk filter long lists**. You want to see user behavior for a specific region and you have a list of all the customers and their regions. Use this to map each customer to a region, creating a new `Region` property. Now you can filter specifically to each region in a chart.

{{partial:admonition type="note" heading=""}}
Lookup Tables may not exceed 100MB or 1 million rows. Contact your Amplitude CSM if you have data that exceeds this limit. 
{{/partial:admonition}} 

## Create a Lookup Table

Before you can get started using Lookup Tables, you’ll need:

* An event property or user property to create a mapping from, and
* A .CSV that has the data you want to map to. The first column data must correspond to the mapping property value and must contain unique values.

{{partial:admonition type="note" heading=""}}
Lookup Tables are looking for exact matches, and are **case-sensitive**.
{{/partial:admonition}}

To create a new Lookup Table in Amplitude Data, follow these steps:

1. Navigate to *Sources* in the project you want to import the .CSV data to.
2. Click *+ Add Source*. Search for *CSV*, then click it.
3. Navigate to your .CSV file and upload it. Then click *Next*.
4. Map your event property by selecting it from the dropdown. When you're done, click *Finish*.

![Add_source.png](/output/img/data/add-source-png.png)

{{partial:admonition type="note" heading=""}}
You must be an Admin or Manager of the project to add or manage a source.
{{/partial:admonition}}

## Update a Lookup Table

If you want to create a new lookup property or fix an incorrectly-mapped property, you can update the lookup table by following these steps:

1. In Amplitude, navigate to *Sources*, find the Lookup Table in the *Sources List*. Click on it to open its *General* tab.
2. Open the *Edit Lookup Table Configuration* tab.
3. Make your changes. You can change the mapping, or replace the .CSV by uploading a new file.
4. When you’re finished, click *Update your lookup table configuration*.

## Delete a Lookup Table and its properties

To delete a Lookup Table you no longer need, follow these steps:

1. In Amplitude, navigate to *Sources*, then find the Lookup Table in the *Sources List*.
2. Open the *Edit Lookup Table Configuration* tab.
3. Click the trash can and follow the on-screen instructions.