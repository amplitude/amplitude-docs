---
id: b7e71edd-424f-41a0-8206-a787c75349e4
blueprint: funnel-analysi
title: 'Hold properties constant in a Funnel Analysis chart'
source: 'https://help.amplitude.com/hc/en-us/articles/19466646450203-Hold-properties-constant-in-a-Funnel-Analysis-chart'
this_article_will_help_you:
  - 'Set up your Funnel Analysis charts to display the unique count of user and property pairs that have completed the funnel, instead of just the unique count of users who have completed it at least once'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717015220
ai_summary: "By default, Amplitude counts unique users in a funnel chart. If a user repeats the funnel, they're only counted once. You can choose to hold event properties constant, counting user-event property pairs in the funnel. This enables tracking users with different event property values. Constant event properties must be sent for every event in the funnel. This functionality is useful for building session-based funnels. Holding the session ID constant ensures users complete the funnel in the same session. This setup does not show unique users, allowing multiple completions in different sessions."
---
By default, Amplitude doesn't hold properties constant in a funnel analysis. This means the funnel chart displays the **unique count of users** who have gone through the funnel **once or more** if, for example, the user goes through the entire funnel multiple times, they're only counted once.

For the following chart, if a user were to convert this funnel (`View Item` -> `Add to Cart` -> `Complete Purchase`) ten times over the last day, they would only show up once.

![constant_props.png](/docs/output/img/funnel-analysis/constant-props-png.png)

If, however, you opt to hold properties constant, the funnel chart displays the **unique count of user and user/event property pairs** that have completed the funnel. If a user goes through the entire funnel X times with Y distinct event property values, the user counts Y times.

For example, if a user converts `View Item Details` -> `Add Item to Cart` -> `Complete Purchase` with ten different `Item_ID` property values, they show up ten times in the chart. Here, `Item_ID` is an event property that's been sent for all three events in the funnel. **An event property can only hold constant** if you instrumented it for **every event** in the funnel.

You can use this method to build session-based funnels. To do this, hold constant `[Amplitude]Session ID`, as shown here:

![hold_prop_constant.png](/docs/output/img/funnel-analysis/hold-prop-constant-png.png)

A user must complete each step in the funnel with the same session ID to be converted. A Funnel Analysis chart with this setup doesn't show unique users, since users can complete the funnel multiple times in different sessions.