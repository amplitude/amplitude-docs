---
id: 09910eae-5073-45e2-9f8b-5b8cdb11806a
blueprint: data
title: 'Property types'
source: 'https://help.amplitude.com/hc/en-us/articles/17050314884635-Set-or-change-a-property-s-data-type'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722895665
ai_summary: "Amplitude's type checking feature helps you ensure the accuracy of event and user property data. You can easily adjust the data type of properties as needed, like changing from a string to a Boolean. This flexibility is valuable as your data analysis requirements evolve. Simply click on a property's name, choose a new data type from the drop-down menu, and select from options like String, Number, Boolean, Array, Enum, Const, or Any. This functionality allows you to adapt and improve your data management over time."
---
Because it uses type checking for event and user property values, Amplitude can detect when event data it receives doesn’t match the specified type. You can set and edit the data type of an event or user property — for example, from a string to a Boolean. This can be useful as your data and analysis needs shift and expand over time.

To edit the data type of a user property, follow these steps:

1. Click the property’s name to open the details panel.
2. Select the property’s new data type from the *Type* drop-down. Your options are:

      * `String`: A string value
      * `Number`: Numerical values (like 12345)
      * `Boolean`: Values representing Boolean states ("true"/ "false", "yes" / "no", "0" / "1")
      * `Array`: A collection of values stored in a single property (for example, ["apple", "banana", "strawberry"] or [1, 2, 3])
      * `Enum`: One of a set of possible values. (for example, property fruit is one of [apple, banana, strawberry])
      * `Const`: Set as a constant
      * `Any`: Any value