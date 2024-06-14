---
id: 81ab19f5-a628-4a08-81f0-97759a5bfa91
blueprint: audience
title: 'Build a recommendation'
source: 'https://help.amplitude.com/hc/en-us/articles/360059625252-Build-a-recommendation'
this_article_will_help_you:
  - 'Create a new recommendation and interpret its results'
  - 'Avoid common mistakes in setting up a recommendation'
exclude_from_sitemap: false
landing: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715121638
---
Amplitude Audiences allows you to create recommendations to be used in your personalization campaigns. A recommendation to your users can increase engagement, reduce churn, and create cross-selling opportunities. Read more about the algorithm behind Amplitude's personalization feature in this [blog post](https://amplitude.com/blog/audiences-algorithm).

## Build a new recommendation

To create a new recommendation, open Cohorts & Audiences and click *Recommendations* in the left rail. Click *Create Recommendation* and follow these steps:

1. The first step is selecting the **type of recommendation** you'd like to create:

	* **Top Trending:** The Top Trending recommendation generates a list of items that have experienced the highest increase in popularity over a specific time period. It helps identify new and emerging trends.
	* **Most Popular:** The Most Popular recommendation creates a list of the most popular items based on their usage across all users. It highlights the content or products that are currently trending and in high demand.
	* **AI Based:** The AI Based recommendation utilizes an AI-based model to provide personalized content to each user. It takes into account the user's past behavior and preferences to curate a list of items tailored specifically to them. This type of recommendation is the most sophisticated and has the potential to significantly enhance user engagement and conversion rates.

 {{partial:admonition type='note'}}
 The Top Trending and Most Popular recommendation types are currently in beta. All recommendations are only available to customers with Syncs and Models plans. Contact your Customer Success Manager for more information.
{{/partial:admonition}}

2. The second step is defining your outcome. The outcome is the **goal you are trying to reach,**or the**metric you are trying to improve**. In the *Define starting cohort* section, choose the cohort this recommendation will train its algorithm on. By default, Amplitude selects all users active in the last 90 days, but for best results, you should use a more narrowly-tailored cohort. To do that, select the conditions you'd like to modify to further define your cohort; such as, events performed and filters. **If you're defining a Top Trending or Most Popular recommendation type, skip to step #6.**
3. **If defining an AI Based recommendation type, your next step is** to create your item catalog, which is **choosing the items you want to recommend** in order to reach your desired outcome.  Under *Define items to be recommended* , click *Select event…* to choose the exposure event.
4. Click *Select property...* to designate the item to be recommended to the user. You won’t select the item itself; instead, you’ll choose an event property associated with the exposure event. The recommendation will choose the recommended item from the values of this event property.
5. **You'll then choose the items that will be recommended** in the *Current list of items that will be recommended* section. By default, Amplitude Audiences will choose from the 50 most-frequent (based on 30-day uniques) values of the event property you selected in the previous step.

Amplitude also allows you to set your recommendation to work from a **static list** of property values. To do this, toggle the *Create with Static List* toggle and select the candidates from the list of options. You can **exclude** **specific values** from a dynamic recommendation, **and** choose to **exclude converted items**, as well. Click *Next >* to continue to the *Save* section. **Skip to step #11 to complete your new AI Based recommendation.** 

6. **If you're building a Top Trending or Most Popular recommend type, your next step is in the *Select time range of trend*** **section.** Specify a time frame for the user to undertake this outcome event. The default setting is the past 7 days. The Top Trending type gives you an additional option to add an offset number of days, with a default of 2 days.

{{partial:admonition type='note'}}
 There is a limit of recommending on cohorts < 20 million users.
{{/partial:admonition}}

7. Under *Define your outcome*, choose the desired outcome event for this recommendation within a specified time frame. The default time frame is 1 hour for the desired outcome. Click *Next >* to move to the *Items* tab.
8. The next step is creating your item catalog, which is **choosing the items you want to recommend** in order to reach your desired outcome. Under *Define items to be recommended*, click *Select event…* to choose the exposure event.
9. Click *Select property...* to designate the item to be recommended to the user. You won’t select the item itself; instead, you’ll choose an event property associated with the exposure event. The recommendation will choose the recommended item from the values of this event property.

For example, a music app might want its users to buy concert tickets from within the app. It might show users who followed a playlist a concert popup, based on the genre of the playlist they followed. In this case, the event property selected here would be genre, and it would be attached to the follow\_playlist event. More generally, the event property will often be something like `SKU`, `ID`, `Name`, etc.

10. **Next, specify the number of items to be recommended to each user.** By default, Amplitude Audiences will choose from the 50 most-frequent (based on 30-day uniques) values of the event property you selected in the previous step.  
  
However, you can also set your recommendation to work from a **static list** of property values instead. To do this, toggle the *Create with Static List* toggle and select the candidates from the list of options. You can **exclude** specific values from a dynamic recommendation as well. Then click *Next >* to move to the next step.

11. In the *Save* tab, give your new recommendation a name and description.
12. Finally, use the *Control* slider to **configure the percentage of users to include as a control**. These users will be randomly selected to receive a random set of items as a recommendation, as a control group against which you can measure the lift this recommendation generates. If desired, you can choose to exclude the same group of users in the control across multiple recommendations by clicking on *Link to an Existing Recommendation* and choosing an existing recommendation.
13. When you’re finished, click *Build*. It’ll take about an hour to generate your recommendation. You’ll receive an email when it’s ready.

## Understand your recommendation

Once your recommendation is complete, you can view some basic information about it by clicking on it. It will open to the *Overview* tab.

The first thing you’ll notice is the confidence score. This represents Amplitude’s confidence that this recommendation will generate statistically-significant life, relative to a random list of items.

{{partial:admonition type='note'}}
If the confidence score is less than 60, you should not use the recommendation.
{{/partial:admonition}}

Below that, you’ll find a list of items ranked by their frequency of appearance in the recommendation. The item at the top of the list is the one most commonly suggested to users by this recommendation, and is the one most likely to result in a conversion.

The *Performance* tab shows four statistics across the top:

* **Accuracy**: Amplitude Experiment conducts regular training runs, using recent user data, and then builds a model based on that data and recent user activity. Data from a certain percentage of users are not included in each training run. When the model is completed, Amplitude Recommend runs it against this holdout group to generate an estimation of accuracy.
* **Lift against Baseline**: When a model is deployed, Amplitude Recommend shows the recommendations to some users, while others are shown random items. This is the ratio of conversions in the group that saw recommendations to those that didn’t.
* **Recommendation CR and Control CR**: These are the conversion rates in the population of users that saw a recommendation and the population of users that saw random items, respectively.
* **Significance:** The higher this number, the more confident Amplitude Recommend is of the result. Predictions and recommendations have their own built-in mini-version of Amplitude Experiment. The test and control groups mentioned earlier, the difference in conversion rates, and the number of exposures and conversions all go into calculating a standard significance calculation.

## Common mistakes in creating a recommendation

* **Using the wrong cohort.** While recommending all users can be sufficient, sometimes you need to be more specific. Think about your goal and which users are the best candidates to achieve it. If your goal is to optimize for a second purchase, for example, select users who have already purchased once as the starting cohort.
* **Specifying the wrong outcome**. Your outcome event will dictate the rankings of the selected items. So if you optimize for “product purchased WHERE amount > $100,” the recommendation will prioritize expensive items. Be sure that’s what you want before launching the recommendation.
* **Wrong exposure event timing.** If you choose an exposure event that occurs **after** the outcome event, the recommendation will not train properly.
* **Wrong exposure event context**. The context for the event property depends on the exposure event it’s configured from. The event property’s name can easily mean different things on “product clicked” vs “button clicked”.
* **Wrong event property.** For example, Product Name and Product ID convey the same basic information, but in very different formats. Make sure the one you select matches the way data is stored in your CMS.
* **Outcome event does not have enough unique actions:** Ensure that the outcome event has at least 50 (ideally 100) unique user actions every day. If the conversion numbers are below this threshold the model will not detect signals and it will recommend the same content for all users.