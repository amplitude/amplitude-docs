---
id: e1b61782-4ec1-47a2-a803-0b6385477026
blueprint: audience
title: 'Build a prediction'
source: 'https://help.amplitude.com/hc/en-us/articles/360049164712-Build-a-prediction'
this_article_will_help_you:
  - 'Build a prediction in Amplitude Audiences'
  - 'Create a predictive cohort from your prediction'
  - 'Analyze your predictive cohort'
exclude_from_sitemap: false
landing: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715119140
---
Predictions allow you to segment your users based on their likelihood to perform specific events or actions in the future.

{{partial:admonition type='note'}}
Be sure to check out our other articles on predictions: [Predictions: use Amplitude's AI to help maximize lift](/docs/cdp/audiences/predictions) and [Use predictions in your campaigns](/docs/cdp/audiences/predictions-use).
{{/partial:admonition}}

## Build a prediction

To build a prediction in Amplitude Audiences, follow these steps:

1. Navigate to *Cohorts & Audiences* and click *Predictions* in the left rail. Then click *+ Create Prediction*.
2. Next, you'll be able to **apply this prediction to all users** who’ve been active in the last 90 days by clicking on *Start with All Users*, **or define your own** starting cohort.
3. If you choose to define your own starting cohort, the first step is selecting the users who will be included in the cohort. Under *Define starting cohort*, select the events, properties, or statuses that users in your cohort share.
4. Next, **specify the action you want the starting cohort to take**. Under *Define future outcome*, you can specify events you want—or don’t want—your users to fire, the properties you want them to have after taking an action, or some combination of all three. Be sure to specify the time frame in which you want your users to take this future action.  
  
{{partial:admonition type='tip'}}
Another way to think about a prediction is as a **cohort transition**: you’re predicting the relative likelihood of a user to transition from Cohort A (the starting cohort) to Cohort B (the future outcome) in the coming week.
{{/partial:admonition}}

5. If desired, **you may choose to add optional settings** under *Advanced Model Configuration*. This section allows you to further define your starting cohort by either including or excluding specific user properties. Click *Add Feature* under *Include* or *Exclude* to search for user properties to further define your starting cohort. Click *Save*.
6. **Give your prediction a name and add a brief description. Then click *Save*****.** It will take about an hour for Amplitude Audiences to build your prediction. You’ll receive an email when the process is done.

## Analyze your prediction

Once Amplitude Audiences has finished building your prediction, you’ll want to take a look at the results. Depending on what you see, you’ll either save the prediction as a cohort, or start over with a new prediction.

1. To view the results of your prediction, click the *Predictions* tab from the Cohorts & Audiences page. This will show you a list of all the predictions created so far.
2. Find your prediction and click it to open the prediction explorer's *Audience analysis* tab. Here, you’ll see the distribution of all users in your starting cohort:

* The Y-axis shows the likelihood a user will convert (i.e., arrive at the future outcome you specified earlier)
* The X-axis shows the percentile of users

You can select a range of users by percentile and see how many users fall in the range, the predicted conversion rate of users in that range, and the likelihood of conversion for those users relative to the average.

{{partial:admonition type='note'}}
**Percentile and probability are not the same thing**. If you select the 80% - 100% percentile range, this does NOT mean the users in it have an 80% - 99% probability to convert. Instead, it means they’re in the top 20% of users, as ranked by probability to convert.
{{/partial:admonition}}

### Feature importance

“Black box” predictions aren’t generally insightful. That’s why Amplitude ranks the events and user properties that are most important to your predictive model in the *Feature Importance* section, which you can find just below the *Audience definition* chart. 

The *Events* tab in *Feature Importance* houses a table with the following columns and insights:

* The *Ratio* column is a ranking of events or properties according to their importance to the model. It’s computed by comparing the percentage of users in the selected percentile range who fire an event  to those not in the selected percentile range.
* The *Event* column lists the ranked events.
* The *% in Range* column specifies the percentage of users in the selected percentile range who fired the respective event. Sort by this column to rank events according to overall level of engagement.
* The *% not in range* column calculates the percentage of users that performed the event but are not in the selected cohort.
* The *Frequency* column displays the average number of times a user in the selected range fires an event. Sort by this column to rank events according to overall level of engagement.

Narrow down your list of ranked events by clicking*Showing Significant Events* to modify which events you see in the table, or click the calendar icon to change the specified time frame and offset. Note that the modified time frame will apply to both the *Events* and *User Properties* tabs.

The *User Properties* tab allows you to view rankings of user properties and their importance to the prediction's model. Click *Select Property* to choose a user property for review. Similar to the Events table, the *User Properties* table will rank property values by *Ratio*, *% in range*, and *% not in range* columns. If desired, you can check the box next to *Show Hidden Property Values* to ensure they're visible in the table's results. 

### Model performance

At this point, you’ll want to evaluate whether your prediction is accurate or not. Amplitude Audiences provides metrics for you to accomplish this in the *Model performance* tab:

* **True Positive Rate**: this is the ratio of predicted users who convert
* **False Positive Rate**: this is the ratio of predicted users who do not convert
* **AUC**, aka Accuracy: technically, this is the area under the curve, a measure that weighs both true positive and false positive rates
* **Log loss****, aka** p**redicted vs actuals**: this compares the predicted conversion rates to observed historical conversion rates and gives you the difference, in percentage terms

Generally speaking, a good model will have an accuracy of at least 70%. Any model with an accuracy of 50% or less will be no better than a coin flip in its predictive ability.

### Tips for a good predictive model

* **Outcome event has at least 50** **unique actions per day:** Ensure that the outcome event has at least 50 (ideally 100) unique user actions every day. If the conversion numbers are below this threshold the model will not detect signals and it will recommend the same content for all users.
* **Ensure user cohort to be targeted for Audiences between 1K and 10M users**: If the user population is under 1K they cannot utilize Audiences at a 1:1 level, if it's above we will have to filter the cohort.
* **Use a large enough dataset:** The more data you have, the more accurate your recommendations will be. Amplitude Audiences requires a minimum of 10,000 events per user to build a prediction.
* **Relevant events in Amplitude related to desired outcome:** Cross reference the desired outcome and confirm the appropriate events are already being sent into Amplitude. These are typically `Purchase` or `Transaction completed`.

## Build a cohort from your prediction

Once you’ve got a useful prediction, you can save it as a cohort. This enables you to return to it in the future and repeatedly use it in targeting campaigns.

To save your prediction as a cohort, follow these steps:

1. Use the slider to select the desired percentile range on the chart. Then click *Save as predictive cohort*.
2. Give your cohort a name and click *Save*.

While it can be tempting to just slice the starting cohort into two sections—i.e., top 20% vs bottom 80%, or top 50% vs bottom 50%—other approaches can give you far more useful results:

* **Probability inflection**: Find the spot where the distribution graph spikes exponentially, and split users along the spikes. This will group users into broadly similar buckets of predicted conversion rates.
* **Sample size:** If you have an idea of how many users you want to target in a growth campaign, then select that percentage on the right side of the chart. For example, if you want to target 2000 users and you have 20,000 users in the starting cohort, then simply select the top 10%.
* **Minimum detectable lift.** If you plan to target the selected users in a growth campaign, make sure the sample size is large enough to detect incremental lift. For example, if the top 20% of a prediction is 20,000 users, but the predicted conversion rate is 1%, you won’t be able to detect lift at statistically significant levels. Instead, you must increase the sample size to top 45% of users at 45,000 users.

{{partial:admonition type='note'}}
When a user’s probabilities change, Amplitude Audiences will automatically adjust their cohort membership if they fall into or out of the selected percentile range.
{{/partial:admonition}}

## Analyze your predictive cohort

Once you save a prediction as a cohort, you can use it for analysis in any Amplitude Analytics chart. Here are some suggestions for analyses using prediction-derived cohorts:

* **Create top 20% and bottom 80% cohorts** to compare the best and worst users. Set them as different segments in the right module of any chart.
* **Event Segmentation:** see the historical behavioral trends of best users vs worst users prior to converting.
* **Pathfinder:** identify the different sequences of actions users take if they have a high likelihood vs low likelihood to convert.
* **Composition:** break down the property values of the respective cohorts to differences in user properties (i.e., which countries the best users vs worst users are in).
* **Engagement Matrix:** compare the events fired by the best users vs the worst users, based on the balance of frequency and % of users.
* **Funnel:** compare relative conversion rates for any sequence of actions between the best users and worst users.