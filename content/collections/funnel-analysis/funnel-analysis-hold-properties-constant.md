---
title: "Hold properties constant in a Funnel Analysis chart"
source: "https://help.amplitude.com/hc/en-us/articles/19466646450203-Hold-properties-constant-in-a-Funnel-Analysis-chart"
id: b7e71edd-424f-41a0-8206-a787c75349e4
---

#### This article will help you:

* Set up your Funnel Analysis charts to display the unique count of user and property pairs that have completed the funnel, instead of just the unique count of users who have completed it at least once

By default, Amplitude does not hold properties constant in a funnel analysis. This means the funnel chart will display the **unique count of users** who have gone through the funnel **once or more**—if, for example, the user goes through the entire funnel multiple times, they are only counted once.

So for the following chart, if a user were to convert this funnel (`View Item` -> `Add to Cart` -> `Complete Purchase`) ten times over the last day, they would only show up once.

![constant_props.png](/output/img/funnel-analysis/constant-props-png.png)

If, however, you opt to hold properties constant, the funnel chart will display the **unique count of user and user/event property pairs** that have completed the funnel. If a user goes through the entire funnel X times with Y distinct event property values, the user will be counted Y times.

For example, if a user converts `View Item
 Details` -> `Add Item to Cart` -> `Complete Purchase` with ten different `Item_ID` property values, they will show up ten times in the chart. Here, `Item_ID` is an event property that's been sent for all three events in the funnel. **An event property can only be held constant** if you have instrumented it for **every event** in the funnel.

You can use this method to build session-based funnels. To do this, hold constant `![amplitude_logo.png](/output/img/funnel-analysis/amplitude-logo-png.png)
 Session ID`, as shown here:

![hold_prop_constant.png](/output/img/funnel-analysis/hold-prop-constant-png.png)

A user must complete each step in the funnel with the same session ID in order to be converted. A Funnel Analysis chart with this setup will no longer show unique users, since users can complete the funnel multiple times in different sessions. 

## 
