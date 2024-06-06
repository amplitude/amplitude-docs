---
title: "Cart analysis: Use object arrays to drive behavioral insights"
source: "https://help.amplitude.com/hc/en-us/articles/9623000954907-Cart-analysis-Use-object-arrays-to-drive-behavioral-insights"
id: a80bb339-97b8-4d0e-955a-7bb2c2972ace
---

#### This article will help you:

* Unlock new insights by analyzing Amplitude data as object arrays

Amplitude's **cart analysis** feature enables you to analyze data sent as object arrays. This can be particularly useful for behavioral insights into e-commerce transaction and shopping cart flows. You can analyze search results or cart events in the aggregate (e.g., total order volume or co-occurrence), or you can segment your analyses by dimensions such as brand, category, price, or SKU, among others.

Once you've set everything up, you'll be able to access and analyze these object arrays from within your chart. 

Likely use cases include:

* Product performance (volume) by attribute (SKU, category, brand)
* Conversion rates by product type (or another attribute)
* Top-performing product combinations that reveal opportunities for cross-selling
* Revenue and business outcomes performance by item or product
* Average basket size or item count

{{partial:admonition type='note'}}
 Cart Analysis is available for Amplitude's Event Segmentation and Funnel Analysis charts.
{{/partial:admonition}}

### Feature availability

This feature is is currently in an open beta and only available to users on Growth and Enterprise plans. See [Set up property splitting](#h_01GGX3KMYSJX6EBW6WHRC7PEMH) to get started. 

## Terms and concepts

Here's a brief overview of the more important ideas that make cart analysis work:

* **Object array**: This is a data format that can store a collection of distinct objects under a single name. In an Amplitude context, the array itself acts as an event or user property, while the objects it contains are item-specific attributes or properties. In the example below, `products` is the object array that holds two distinct objects.

```
products: [  
 {  
 product\_id: 1,  
 sku: '45360-32',  
 name: 'Special Facial Soap',  
 category: 'Beauty',  
 price: 12.60,  
 },  
 {  
 product\_id: 5,  
 sku: '47738-11',  
 name: 'Fancy Hairbrush',  
 category: 'Beauty',  
 price: 18.90,  
 }  
]
```

* **Parent property**: This is the top-level event or user property that contains an array of objects; in the example above, this is `products`.
* **Child property** (or **item property**): These are the nested attributes within the array of objects; these are what Amplitudes splits out for its analyses. In the example above, `sku` and `price` are two examples of child properties. These are limited to **one** level of nesting.
* **Sibling property**: These are two or more child properties tied to the same parent event or user property. In the example above, `sku` and `price` are sibling properties.
* **Property splitting**: This is the processing method Amplitude uses to split out nested child properties from parent properties in your data, after ingestion has occurred. The property splitting process will preserve the parent properties.  
  
{{partial:admonition type='note'}}
Child properties count toward your property volume counts.
{{/partial:admonition}}

## Set up property splitting

Property splitting must be enabled before you can use object arrays for cart analysis. You can complete the process in Amplitude Data.

{{partial:admonition type='note'}}
Only project managers and admins can enable splitting. Splitting is not supported in Portfolio projects.
{{/partial:admonition}}

To enable property splitting, follow these steps:

1. Open Amplitude Data.
2. Find the event or user property you want to use as a parent property and select it. (In the example used above, this is `products`.)  
  
{{partial:admonition type='note'}}
If you're using Amplitude Data, you may need to add the event you're interested in to your tracking plan.
{{/partial:admonition}}
3. In the property drawer, set `Type` to `Array` and set `Item type` to `Any`. The *Splitting* tab will show up on the right.
4. If the property has been seen or ingested at least once before, you'll see a preview of what the splitting process would deliver. Click *Start Splitting* to begin.  
  
![](/docs/output/img/charts/21705259614363)

To stop splitting, go to the *Splitting* tab and click *Stop Splitting*.

This change will take effect for any net new data ingestion. Data will persist for previously split events. To learn more about hiding or deleting split properties, see our articles on [managing events in Amplitude](https://help.amplitude.com/hc/en-us/sections/16805649563163-Clean-up-your-data).

## Send the cart object array

You have two options for sending the cart object array. The first is to use either the `set()` or `append()` method with the [Identify API](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/):

```
const identifyEvent = new amplitude.Identify();  
  
// can use either set() or append()   
identifyEvent.append('products', [{  
product_id: 123,  
sku: '41245',  
name: 'Sunscreen'  
}]);  
  
amplitude.identify(identifyEvent);
```

The second is to send it as event properties:

```
const myCartObjectArray = {"products": [{  
product_id: 123,  
sku: '41245',  
name: 'Sunscreen'   
}]};  
  
amplitude.logEvent("Product Viewed", event_properties=myCartObjectArray)
```

To learn more, see the [Amplitude developer documentation](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/).

## Use object arrays in your Event Segmentation and Funnel Analysis charts

As mentioned earlier, you can access the object arrays generated by the property splitting process from within your chart events—just like any other event or user property.

These arrays show up in the event / user property dropdowns and are designated by {:} :

![cart_analysis_1.png](/docs/output/img/charts/cart-analysis-1-png.png)

### Filters

As with standard event and user properties, you can apply conditions to filter your results. Filters work a little differently for object arrays. 

* **Cross-property filters** (default): These filters point to or reference **all** items or objects within the array. This is also referred to as “mix and match” semantics. To apply cross-property filters, apply two separate clauses via *+ Filter by* on the same event.

![Screen_Shot_2023-04-05_at_6.56.30_PM.png](/docs/output/img/charts/screen-shot-2023-04-05-at-6-56-30-pm-png.png)

* **Parallel filters**: These filters point to or reference the **same** item or object within the array. To apply parallel filters, add two or more `contains` clauses on the same item or object.

![Screen_Shot_2023-04-05_at_6.59.21_PM.png](/docs/output/img/charts/screen-shot-2023-04-05-at-6-59-21-pm-png.png)  
  
{{partial:admonition type='note'}}
You can only apply parallel semantics on sibling properties.  
{{/partial:admonition}}

* **Item match**: Selecting this option tells Amplitude Analytics to respect filter conditions when displaying group-by values (for example, **only** electronics items).

![Screen_Shot_2023-04-05_at_3.46.23_PM.png](/docs/output/img/charts/screen-shot-2023-04-05-at-3-46-23-pm-png.png)

* **Collection match**: Selecting this option tells Amplitude Analytics to reference all objects in the event when displaying group-by values (for example, **all items** in purchases containing electronics).

![Screen_Shot_2023-04-05_at_3.46.52_PM.png](/docs/output/img/charts/screen-shot-2023-04-05-at-3-46-52-pm-png.png)

## Examples of queries using object arrays for cart analysis

Object arrays are highly flexible tools and are capable of complex queries. Here are some examples of expected use cases for object arrays that may help you develop your own queries.

* Purchases containing an electronics product:

![Screen_Shot_2023-04-05_at_3.42.47_PM.png](/docs/output/img/charts/screen-shot-2023-04-05-at-3-42-47-pm-png.png)

* Purchases containing an electronics product, where the price was greater than or equal to $24.99:

![Screen_Shot_2023-04-05_at_7.01.47_PM.png](/docs/output/img/charts/screen-shot-2023-04-05-at-7-01-47-pm-png.png)

* Compare purchases containing seasonal products to purchases containing beauty products:

![Screen_Shot_2023-04-05_at_3.43.50_PM.png](/docs/output/img/charts/screen-shot-2023-04-05-at-3-43-50-pm-png.png)

* Sum the price of electronics products in any purchases that contain at least one electronics product:

![Screen_Shot_2023-04-05_at_3.44.39_PM.png](/docs/output/img/charts/screen-shot-2023-04-05-at-3-44-39-pm-png.png)
