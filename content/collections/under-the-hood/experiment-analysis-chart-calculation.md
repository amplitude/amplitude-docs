---
id: c3d4aec1-92db-4f44-b847-19d6f31f1add
blueprint: under-the-hood
title: 'How Amplitude calculates the values in Experiment Analysis charts'
source: 'https://help.amplitude.com/hc/en-us/articles/4455062287387-How-Amplitude-calculates-the-values-in-Experiment-Analysis-charts'
this_article_will_help_you:
  - 'Understand the inputs and formulas underlying Experiment Analysis charts'
  - 'Understand the counting logic Amplitude uses when calculating these values'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715104675
---
Knowing how the values in your Experiment Analysis charts are calculated can help you understand what your experiments are really telling you, so you can avoid making potentially costly interpretation errors.

These values are derived from a small selection of inputs and formulas, which are described below.

## Inputs

The formulas rely on a straightforward set of inputs:

* **E**: The number of unique users who have been **exposed** to the experiment.
* **M**: The number of unique users who triggered the **metric event**—in other words, the subset of the users who have been exposed to the experiment. M will always be less than E.
* **T**: The **total number of times** the metric event was triggered. A single user can trigger the metric event more than once. Amplitude only counts metric events triggered by users included in E.
* **S**: The **sum** of all the metric events' property values.
* **A**: The **sum of the** **average** of all the metric events' property values, per user.
* **FM**: The number of unique **users** who triggered the events **in the funnel**, in the specified order.
* **FT**: The total number of times **all the funnel events** are triggered in the specified order.

## Formulas

The inputs in the previous section are then plugged into the following formulas:

* Unique conversions: (M/E) \* 100
* Event totals: T/E
* Sum of property value: S/E
* Average of property value: A/E
* Funnel conversion, uniques: FM/E
* Funnel conversion, totals: FT/E

## Examples

For this example, assume the metric event has a numeric event property VALUE. This table is the chronological log of events coming into Amplitude:

|  |  |  |
| --- | --- | --- |
| **User** | **Event type** | **Metric event property value** |
| U1 | Exposure event |  |
| U1 | Metric event | 5 |
| U1 | Metric event | 10 |
| U2 | Exposure event |  |
| U2 | Metric event | 15 |
| U3 | Exposure event |  |
| U3 | Exposure event |  |
| U4 | Exposure event |  |
| U5 | Metric event | 20 |

In this example, the number of unique users exposed to the experiment—E in the list of notations above—is four (U1, U2, U3, U4). Of those, the number who triggered the metric event (M in the list) is two (U1 and U2). U5 doesn’t count, as they were not exposed to the experiment.

The metric event was triggered three times, twice by U1 and once by U2. Again, U5 does not count.

The sum of all the metric events' property values is 30, and the sum of their average — ```((5 + 10)/2 + (15)/1) = (7.5 + 15) = (U1 Avg + U2 Avg)``` — is 22.5.

With that information, we can plug these values into each of the formulas listed above:

* Unique conversions = (M/E) \* 100 = (2/4) \* 100 = 50%
* Event totals = T/E = 3/4 = 0.75
* Sum of property value = S/E = 30/4 = 7.5
* Average of property value = A/E = 22.5/4 = 5.625

### Funnel example

For this example, let’s define our funnel as events ME1 and ME2, performed in that order. This table is the chronological log of the events coming into Amplitude:

|  |  |
| --- | --- |
| **User** | **Event type** |
| U1 | Exposure event (EE) |
| U1 | Metric event 1 (ME1) |
| U1 | Metric event 2 (ME2) |
| U1 | Metric event 2 |
| U2 | Exposure event |
| U2 | Metric event 1 |
| U2 | Metric event 2 |
| U2 | Metric event 1 |
| U2 | Metric event 2 |
| U3 | Exposure event |
| U3 | Metric event 1 |
| U4 | Exposure event |
| U4 | Metric event 2 |
| U5 | Metric event 1 |
| U5 | Metric event 2 |

Here, the number of unique users who triggered the events in the funnel in the given order—defined as FM in the list earlier—is two (U1, U2). U3, U4. and U5 didn’t qualify for the funnel: U3 didn’t trigger ME2, and U4 triggered ME2 out of order; U5 never triggered the exposure event, and thus isn’t included in the experiment at all.

The value of FT—defined as the total number of times all the events in the funnel are triggered in the specified order—here is three. U1 triggered ME1 → ME2 once, while U2 did it twice.

Knowing that, we can plug these values into each of the formulas listed above:

* Funnel conversion, uniques = FM/E = 2/4 = 0.5
* Funnel conversion, totals = FT/E = 3/4 = 0.75