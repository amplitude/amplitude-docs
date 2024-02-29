---
title: "Set or change a property's data type"
source: "https://help.amplitude.com/hc/en-us/articles/17050314884635-Set-or-change-a-property-s-data-type"
id: 09910eae-5073-45e2-9f8b-5b8cdb11806a
---

Because it uses type checking for event and user property values, Amplitude can detect when event data it receives doesn’t match the specified type. You can set and edit the data type of an event or user property — for example, from a string to a Boolean. This can be useful as your data and analysis needs shift and expand over time.

To edit the data type of a user property, follow these steps:

1. Click the property’s name to open the details panel.
2. Select the property’s new data type from the *Type* drop-down. Your options are:

* * `String`: A string value
	* `Number`: Numerical values (e.g. 12345)
	* `Boolean`: Values representing Boolean states ("true"/ "false", "yes" / "no", "0" / "1")
	* `Array`
	* `Enum`: One of a set of possible values. (e.g. property fruit is one of [apple, banana, strawberry])
	* `Const`: Set as a constant
	* `Any`: Any value
