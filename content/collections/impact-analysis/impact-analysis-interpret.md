---
id: cf7c955b-582e-41cd-b864-8c41e82e2b48
blueprint: impact-analysi
title: 'Interpret your Impact Analysis chart'
source: 'https://help.amplitude.com/hc/en-us/articles/20962963769499-Interpret-your-Impact-Analysis-chart'
this_article_will_help_you:
  - 'Interpret the results of your Impact Analysis chart'
  - 'Effectively and appropriately use causal inference'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717104396
landing: true
landing_blurb: 'Effectively and appropriately use causal inference to interpret your Impact Analysis'
---
The [Impact Analysis chart](/docs/analytics/charts/impact-analysis/impact-analysis-track) can help you discover how triggering one event can effect the frequency at which your users fire other events.

## Interpret the results of your Impact Analysis chart

The Impact Analysis chart plots the outcome event on a relative *n*-day basis, from the time each user triggered the treatment event for the first time. Amplitude lines up each user's relative timeline for you, so you can easily see the pattern. The center line represents the day or week the users first triggered the event.

![impact analysis 1.5.png](/docs/output/img/impact-analysis/impact-analysis-1-5-png.png)

In the above example, you can see that the users who favorited a song for the first time between November 1st and November 30 played an average of just over three songs or videos per day in the week after they first tried favoriting. By contrast, those users only played an average of around two songs per day in the week before they discovered the favoriting feature.

### Choose your metric

Amplitude gives you a choice of four different metrics when viewing an Impact Analysis chart: **average**, **active percentage**, **frequency**, and **properties**.  

#### Average

When using Average, the chart's Y axis will show the mean number of times that users triggered the outcome event in each n-relative-day/n-relative-week interval. Only users who **triggered the event at least once** are counted. Hover over each data point to see how many users triggered the outcome event at least once in each interval.

#### Active %

Here, the Y axis will represent the percentage of people who triggered the outcome event at least once in each n-relative-day/n-relative-week interval. Users who **triggered any active event** in that interval will be included. Hover over each data point to see how many users triggered the outcome event at least once in each interval.

In the example below, 160,836 users were active the day after favoriting a song for the first time; 85.1% played a song or video. 

![impact analysis 3.png](/docs/output/img/impact-analysis/impact-analysis-3-png.png)

#### Frequency

With this metric, the chart's Y axis will show the distribution of the number of times people triggered the outcome event at least once in each n-relative-day/n-relative-week interval.

In the example below, 15,085 users played four songs or videos on the seventh day after favoriting a song for the first time.

![impact analysis 4.png](/docs/output/img/impact-analysis/impact-analysis-4-png.png)

#### Properties

The Properties metric allows you to compute either the average or sum of an event property for a given outcome event. These calculations will encompass every instance of that outcome event triggered in each n-relative-day/n-relative-week interval. For example, you could plot the average length of all songs or videos played by users in their weeks before and after favoriting a song.

## Causal inference interpretation best practices

Impact Analysis helps you to validate hypotheses in order to develop a better understanding of the effects between user behaviors. It is not a replacement for randomized experimentation, which is still the gold standard for determining causal effects. You should think of an Impact Analysis chart as a tool to help you determine where you should focus your experimentation program, in order to help your users engage more successfully with your product.

Here are a few things to consider before making causal conclusions:

* **Alternate hypotheses:** Have you thought about other potential actions that users take around the same time they fire your treatment behavior for the first time? These actions might also be contributing to the change in the rate of the outcome behavior. If those alternative actions are instrumented, try creating other Impact Analysis charts using those actions as the treatment event. If the results look similar, you'll need to further investigate how much each treatment event is contributing to the change in outcome, through user research and randomized experiments whenever possible.
* **User counts:** If your outcome metrics show high volatility (changing dramatically between intervals) or a dramatic change relative to the intervals before vs after the treatment, check your user count. A too-small user count can explain these inconsistencies or their magnitudes. A small handful of users can swing the metric in one direction, while large user counts typically have a "smoothing" effect that gives the metric more stability. Be cautious when making conclusions with small user counts, because they don't necessarily reflect a broader pattern.