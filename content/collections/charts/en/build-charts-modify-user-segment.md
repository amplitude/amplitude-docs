---
id: 7a2db517-e19b-4eac-9dfc-02a984a05128
blueprint: chart
title: 'Build charts in Amplitude: Modify a user segment'
source: 'https://help.amplitude.com/hc/en-us/articles/19689507379995-Build-charts-in-Amplitude-Modify-a-user-segment'
this_article_will_help_you:
  - 'Use filters to refine your user segments into more powerful analytic tools'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717691081
---
The segment you created in the [Add user segments](/docs/analytics/charts/build-charts-add-user-segments) article is functional. Depending on the breadth of your analysis, it may be all you need. But many Amplitude users prefer to drill down more and create user segments based on specific combinations of **properties**. The Segmentation Module gives you all the tools you need to define user segments with a high level of precision.

## Add a filter

When adding properties to a segment definition, remember that you're specifying the property values at the time of each event.  

For example, imagine you add the filter `where City = Amsterdam` to your segment. If a user triggers an event where `City = Amsterdam`, but more recently triggered an event where `Country = United Kingdom`, Amplitude includes only the event that matches your filter in the chart. If you need to query an event based on the user property, make sure the user property is set before the moment when the user logs that event. 

If you segment by `Device ID`, `Event ID`, `Latitude`, `Longitude`, `Server Upload Time`, `Session ID`, `User ID`, or `ID`, specify the exact values you're looking for. You can't group by the user properties `Event ID`, `Latitude`, `Longitude`, `Server Upload Time`, or `ID`. 

To apply a filter to your user segment, follow these steps:

1. Click *+ Filter by* under your user segment. Be sure you don't click *+ Filter by* underneath your event.
2. From the *Select property...* menu, select the [user property](/docs/data/user-properties-and-events) or [behavioral cohort](/docs/analytics/behavioral-cohorts) you want to add to the filter.
3. Select the value of the user property you want to include (or specifically exclude).
4. Then, select the operator that defines how this property is used in your filter: `is`, `is not`, `contains`, `does not contain`, `less/greater than (or equal to)`, `set is`, `set is not`, s`et contains`, `set does not contain`, and `glob match`.   
  
![build_charts_in_amplitude_segment_operator.png](/docs/output/img/charts/build-charts-in-amplitude-segment-operator-png.png)

{{partial:admonition type='note'}}
 If you enter more than one property value, the operator acts as an OR statement. To create an `AND` statement, add another *Filter by* clause.
{{/partial:admonition}}

* **`is` or `is not`**: Include or exclude exact property values in your segment definition.
* **`contains` or `does not contain`**: Include or exclude property values with a specific substring in your segment definition. This operator isn't case sensitive.
* **`starts with` or `does not start with`**: Include or exclude property values with a specific prefix string in your segment definition. This operator isn't case sensitive.
* **`set is` or `set is not`**: Include or exclude specific array sets.

	For example, you could define a segment that includes users with an array set of `Movies` and `Music` as `Interests {=} Movies, Music.` This means that the user's array set must exactly include `Movies` and `Music`. So, if the user only has `Movies`, then they would **not** meet the definition. Likewise, if the user has `Sports` and `Movies` and `Music` they would not meet the definition.

* **`set contains` or `set does not contain`**: These operators match list values containing all the selected values, or list values that don't contain all the selected values, respectively. This is useful to view people who belong to multiple A/B test groups. 
	* If you are trying to exclude certain values from a property array, use `set does not contain`.
	* If you select multiple values, these operators apply an `AND` statement on the values. For example, if you use the condition `set does not contain group A and group B`, a user needs to be NOT in group A AND group B to be excluded. If you want to apply an OR statement, use multiple `set does not contain` filters.

* **`glob match` or `glob does not match`**: Amplitude has a simple version of regular expressions that allows you to match or exclude strings like `/org/*/chart/*` where `*` is a wildcard. You can also enter strings like `*[0-9]` or `[!a-z]*` to match values that end in a digit or start with a non-letter. Review the [Wikipedia article on Glob](https://en.wikipedia.org/wiki/Glob_(programming)) for more information.
	* The asterisk only matches non-`/` characters. To search for strings that contain `/`, use two asterisks instead. For example, if your URL format is `www.example.com/blogs/blog_id`, and you want to filter all URLs that contain the word “blog," use glob match and enter `**blog**`.

For more information, review [how array operators work in Amplitude](/docs/analytics/charts/array-operators).

You can also change the name of your segment by hovering over its current name and clicking it. This also changes the segment’s name in any charts already using it.

### Using an OR clause

To filter on multiple values of the same property, add more values in the *Select value(s)...* box. This creates an OR clause in the segment’s definition. In the screenshot below, the segment now includes users who fired an event in the United States OR the United Kingdom OR Japan .

{{partial:admonition type='note'}}
This doesn't apply when you set your operator to `set is` or `set is not`.
{{/partial:admonition}}

![](statamic://asset::help_center_conversions::charts/build-charts-in-amplitude-segment-or-operator-png.png)

### Using an AND Clause

Adding another filter creates an AND clause to your segment definition. To add additional filters, click *+ Filter by*. In the screenshot below, the segment definition now includes users who fired an event in the United States AND using German.

![build_charts_in_amplitude_segment_and_operator.png](/docs/output/img/charts/build-charts-in-amplitude-segment-and-operator-png.png)