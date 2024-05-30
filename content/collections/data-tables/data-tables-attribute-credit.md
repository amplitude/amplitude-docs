---
id: 17ec9033-f51e-4b77-ad1d-47beebe9471a
blueprint: data-table
title: 'Attribute credit to multiple acquisition touch points'
source: 'https://help.amplitude.com/hc/en-us/articles/6040784295195-Attribute-credit-to-multiple-acquisition-touch-points'
this_article_will_help_you:
  - 'Understand how specific touch points are contributing to your marketing outcomes'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103337
landing: true
landing_blurb: 'Understand how specific touch points are contributing to your marketing outcomes'
---
It can be challenging to attribute success of marketing activities without being able to clearly pinpoint which activities led your users to the desired outcome. For example, let's say a user visited your website after exposure to a Google ad, then interacting with a Facebook post, and finally watching a TikTok video. There are many ways you can attribute credit to one or more of the activities that led to the user's visit to your website. Attributing success to various property values, often referred to as [**multi-touch attribution**](https://amplitude.com/blog/amplitude-attribution), can provide more context for and drive the future of your marketing plans. 

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

### Restrictions

This feature is **limited** for users on **Starter** and **Plus plans**. See our [pricing page](https://amplitude.com/pricing) for more details. 

* Starter and Plus plan users are limited to one channel view

## Pre-built attribution models

Amplitude includes a number of common, pre-built attribution models out of the box that can be configured on your metric.

{{partial:admonition type='note'}}
First Touch and Last Touch are the **only** pre-built attribution models for which the event totals for all attribution groups will add up to match the overall event total count (as shown in the Overall row). For example, the Last Touch model attributes 100% of the credit to a single property value—the last one. For this reason, it makes sense to expect the resulting attribution group totals to sum to 100%. But the Participation model attributes 100% credit to multiple property values. So you should expect the resulting attribution group totals to sum to more than 100%.   
{{/partial:admonition}}
  
Also, when measuring unique users, **none** of these models will generate attribution group totals that sum to the count in the Overall row. This is because each unique user can appear in multiple attribution groups.

* **First Touch**: All credit for the selected metric is given to the first property value within the selected lookback window relative to the date the metric occurred.
* **Last Touch**: All credit for the selected metric is given to the last property value within the selected lookback window relative to the date the metric occurred.
* **Linear**: Credit for the selected metric is equally distributed for all property values within the selected lookback window relative to the date the metric occurred. For example, with two properties each would receive 50% credit, and with three properties each would receive 33.3%.
* **Participation**: Credit for the selected metric is fully allocated to all property values within the selected lookback window relative to the date the metric occurred. For example, with two properties each would receive 100% credit, and with three properties each would receive 100%.
* **U-Shaped**: Credit for the selected metrics biases credit to the first and last values for the selected property. With two touch points, the middle 20% is equally added to the first and middle touch points (50%, 50%). With four touch points, the middle two touch points would share the 20% (40%, 10%, 10%, 40%).
* **J-Shaped**: Credit for the selected metrics is distributed in a way that biases credit to the more recent values from the selected property. With two touch points, the first 20% is equally added to the last and middle touch points (30%, 70%). With four touch points, the final two touch points would share the 20% (10%, 10%, 20%, 60%).
* **Inverse J-Shaped**: Credit for the selected metrics is distributed in a way that biases credit to the first values from the selected property. With two touch points, the last 20% is equally added to the first and middle touch points (70%, 30%). With four touch points, the last two touch points would share the 20% (60%, 20%, 10%, 10%).
* **Data Driven:** With this model, Amplitude Analytics relies on a probabilistic algorithm based on [first-order Markov chains](https://rpubs.com/EelesCB/469421). Every customer journey—defined here as a sequence of channels or touch points—is represented as a chain in a directed Markov graph, where each node is a possible state (either a channel or a touch point), and the edges represent the probability of transition between states. Next, Amplitude Analytics removes the nodes one by one and estimates the impact of removing nodes on the overall conversion rate. Each channel gets credit in proportion to its removal effect. In general, you should use this model with properties that do not have a large number of unique values (those with 50 or fewer will work best). Learn more about the algorithm [here](https://www.analyzecore.com/2016/08/03/attribution-model-r-part-1/).

{{partial:admonition type='note'}}
The data-driven attribution model executes in real time, and calculations may take longer than with other models.
{{/partial:admonition}}

## Configure an attribution model

Inside a data table, you can configure an attribution model on each metric column by following these steps:

1. On the column, first click *…* , and then *Attribution*.
2. Select an attribution model and configure a lookback window. Optionally, you can choose to apply the attribution model to all columns in the table.
3. Click *Apply* to confirm the change and see the table results with the attribution model applied.

![attribution_sidecontrols.gif](/output/img/data-tables/attribution-sidecontrols-gif.gif)

## Create a custom attribution model

If the pre-built attribution models do not meet your needs, you can also create a custom model. You must be an Admin or Manager to create a custom attribution model. To do so, follow these steps:

1. On the column, click the *…* *options* and click *Attribution*.
2. Select *Custom* from the model dropdown, which will show a number of options for configuring your custom model.
3. Set a name and description for the model so others know how to interpret it.
4. Choose a custom weighting for your model.
    * The first weight will apply to the first touch.
    * The last weight will apply to the last touch.
    * The middle weight will be distributed evenly across all touches in between. If there are no touches in between, the first and last touch each receive half of the middle weight.
    * Note that it is not required for the weights to add up to 100%, although it is recommended unless you have a specific reason.
5. Set the default lookback window for the model. Optionally, lock the window to ensure others using this model will only be able to use that lookback window.
6. Decide whether you want to share the custom model with others in your organization.
7. If desired, exclude property values from attribution. This may be useful if you do not want to assign credit to a particular value (e.g. direct website visits or email).
8. Click on *Save* to confirm the change, save the model (for yourself and/or others to use in the future), and see the table results with the attribution model applied.  
  
![image1.png](/output/img/data-tables/image1-png.png)

## Use cases

* **Acquisition channel credit**: When analyzing the effectiveness of all organic and paid investments, you can leverage acquisition channels with a multi-touch attribution model to understand how each channel contributes to driving KPI outcomes. Depending on your business model and user behavior, you can analyze which model of attributing credit makes the most sense and make investment decisions based on the contribution of each of your channels to your target metric.
* **Comparing attribution models**: In longer conversion cycles with multiple session user flows, you can compare the same metric with different attribution models applied. This data supports discovering which attribution model reflects how to efficiently invest marketing dollars and what stage of the customer buying cycle a campaign impacts. For example, when attributing to advertising campaigns, you can determine which campaigns tend to be the first interaction (awareness) that a customer has, the last (high intent), or somewhere in between (research).
* **Content**: Use attribution to see not only how often content was viewed but how that content participated in driving a business KPI outcome. Knowing that content has a low bounce/exit rate or longer time spent on a page can be helpful, but you can clarify the business impact by generating a conversion rate based on different attribution models.
* **Internal campaigns**: Similar to paid off platform advertising investments, marketing teams invest their time and creative talent to generate offers and brand-building content to drive KPI outcomes. Using attribution on the impact of those marketing efforts can similarly inform your content marketing teams which types of offers and creatives are best at driving both short and long term business value.
* **Paid channels with LTV**: By combining your attribution model with your behavior-based LTV calculations, you can see a bigger perspective of how much value a paid channel or campaign is driving. This data can unlock potential for greater investments in channels that drive the most long term business value.

## Attribution example calculation

Here is a brief example to highlight the differences between attribution models and lookback windows.

{{partial:admonition type='note'}}
In Amplitude Analytics, attribution queries have a scope of one day.
{{/partial:admonition}}

 Suppose a user has three touch points before the `Sign Up` event, each with a different UTM source:

| UTM source | Date       | Event                 |
| ---------- | ---------- | --------------------- |
| google     | 2022-05-01 | Viewed Home Page      |
| facebook   | 2022-05-07 | Viewed Blog Post      |
| tiktok     | 2022-05-10 | Viewed Promotion Page |
|            | 2022-05-10 | Sign Up               |

Here are some example combinations of the attribution model and lookback window and the resulting attribution of credit to each UTM source.

| Attribution Model          | Lookback Window | Credit                                          | Explanation                                                                                  |
| -------------------------- | --------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------- |
| First Touch                | 30 Days         | google: 100%                                    | All credit goes to the first touch within the last 30 days, which is google on 2022-05-01.   |
| First Touch                | 7 Days          | facebook: 100%                                  | All credit goes to the first touch within the last 30 days, which is facebook on 2022-05-07. |
| Last Touch                 | 7 Days          | tiktok: 100%                                    | All credit goes to the last touch within the last 7 days, which is tiktok on 2022-05-10.     |
| Linear                     | 30 Days         | google: 33%<br />facebook: 33%<br />tiktok: 33% | Credit is divided evenly between all three touch points in the last 30 days.                 |
| Linear                     | 7 Days          | facebook: 50%<br />tiktok: 50%                  | Credit is divided evenly between the two touch points in the last 7 days.                    |
| J-Shaped                   | 30 Days         | google: 20%<br />facebook: 20%<br />tiktok: 60% | In the last 30 days, the first touch gets 20%, middle touches 20%, and last touch 60%.       |
| J-Shaped                   | 7 Days          | facebook: 30%<br />tiktok: 70%                  | There is no middle touch, so the 20% gets split across the first and last touches.           |
| Custom<br />5% - 20% - 75% | 30 Days         | google: 5%<br />facebook: 20%<br />tiktok: 75%  | In the last 30 days, the first touch gets 5%, middle touches 20%, and last touch 75%.        |