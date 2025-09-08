---
id: 9657141d-7565-47e4-b983-d8cd79c27cfc
blueprint: under-the-hood
title: 'Winsorization in Experiment'
landing: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1757362196
---
Winsorizing is the transformation of data by limiting extreme values in it to reduce the effect of outliers. A complete explanation of the process is beyond the scope of this article. Instead, this section will explain how to apply it to outliers in Amplitude. Go to this [page](https://www.statology.org/winsorize/) for more information about winsorization. 

For example, if you want to know how many charts the average user creates, but you already know some power users create a lot more than most users, winsorize at a value that seems reasonable (learn more about how to select a winsorization value here). For this example, that value is 100. Open a segmentation chart, select Formula from the Measured As block, and enter this formula:

```
(TOTALS(A1) + 100*UNIQUES(A2)) / (UNIQUES(A1) + UNIQUES(A2))
```

In this formula, only event A for segment 2 is winsorized (100 * UNIQUES(A2)). Amplitude counts the number of users who are subject to winsorization, and then multiplies by the winsorization value selected in the first step (100 in this case).

Amplitude Experiment supports max winsorization for all metric types except uniques, funnel uniques, and retention. This is only available for users on Enterprise plans.

When switched on, Amplitude Experiment applies winsorization at the per-metric level. Change the default value to one you want to use for winsorization.

In the metrics table, hovering over the cell will show how many users were winsorized.

As a best practice, avoid winsorizing more than 5% of your data. If, for example, 10% of your data are outliers, it’s better to investigate that group separately and run two different analyses. You can also find out if there are more outliers in one variant than another. For formula metrics, Amplitude applies the same winsorization value to each term.

In cases where it’s difficult to know the best value for winsorization, you can use derived properties to help you:

Run both min and max winsorization, either together or separately, by making a derived property of min(max(1, X), 100) where X is the property you’re interested in, and 1 and 100 are the lower and upper values for X.
Use derived properties for transformations. For instance, this transformation POWER(x, .5) gives you a square root. Some other transformations that reduce skew are log, sqrt, or a Box Cox transformation.

