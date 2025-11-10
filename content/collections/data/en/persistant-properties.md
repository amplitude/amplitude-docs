---
id: 40e5e616-40b7-4b5e-96a0-ac70689b6150
blueprint: data
title: 'Persistent Properties'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1762540974
---
Persistent properties are event properties to related to metrics and events beyond the specific event where the value was originally captured. Property persistence determines how long a property value is accessible and to which events it is associated after it's observed. 

For example, a customer clicks a Facebook add to reach your website. Clicking the add generates the property `utm_source = facebook`. By making that property value persisted, you can specify that you want to apply that value to all subsequent clicks your customer makes on your website. This means that you know which products are sold, which pages are visited, how long the customers stayed on your site, and so on, based on the visit that originated from that Facebook ad.

Persistence is applied on a property level. 

Persistences relies on the following concepts:

* **Allocation**: Which value receives credit for the property.
* **Expiration**: When that credit expires.

## Allocation

Over time, multiple values could appear for the same property. Allocation determines which value is retained when multiple values for a property are available. 

For example, you have a customer who visits your site through a Facebook ad, by directly entering your website's URL, and by Googling your website and then clicking through the search results. 
. 
You can set the allocation to be one of: 

* **Most recent**:
* **Original**: 
* **All**:
* **First known**:
* **Last known**:
