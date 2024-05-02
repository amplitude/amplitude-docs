---
id: 5c091ba2-f202-4972-9e9f-4a9af712730d
blueprint: workflow
title: "Define your experiment's audience"
source: 'https://help.amplitude.com/hc/en-us/articles/9795802005019-Define-your-experiment-s-audience'
this_article_will_help_you:
  - 'Specify which users will be able to see your experiment'
  - 'Limit experiment exposure based on user segments'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714515027
---
Now that you’ve defined the events that make up your experiment, you’ll need to define who will be eligible for bucketing into the experiment. In the Audience section of the experiment design panel, you can choose to open eligibility up to all users, or you can target specific groups of users.

{{partial:admonition type='note'}}
Users will still have to trigger the exposure event before entering the experiment, no matter what choice you make here.
{{/partial:admonition}}

Targeting groups of users is useful if you’d like to limit experiment exposure to users in a specific geographical location, or those who belong to certain demographic groups, or those who meet certain usage thresholds in your product (i.e., power users). To do so, you’ll define a user segment to target, by selecting *Targeted Users* and clicking into Segment 1. Then follow the same steps you’d use to [build a user segment](/analytics/charts/build-charts-add-events) in Amplitude Analytics:

* To target your experiment based on **cohorts,** select *Cohort* and choose a cohort you've previously created in Amplitude Analytics. Cohort membership is evaluated and updated once an hour.
* To target based on **user properties** from Amplitude Analytics, select the user property you're interested in and enter the appropriate values. User properties come from the end user profile maintained by Amplitude Analytics, and are updated based on your analytics instrumentation. (If you need to evaluate user properties in real-time, add the value of the user property to the context you pass to the SDK or REST API.)
* To target based on **custom user properties** (i.e., properties that don't exist in Amplitude), type the user property name into the dropdown and enter values to match on for the property. (Rules containing custom user properties can only evaluate against values explicitly defined in the context passed to the SDK or REST API, since Amplitude does not know about these properties otherwise.)

Add more segments by clicking *+ Add Segment*.

All of Amplitude’s user properties and cohorts are available to use in defining user segments. Note that the value for any user property included in a rule-based user segment will be the **most recent value** received by Amplitude. There is no limit on the number of user segments you can include here. Any user who belongs to more than one segment included in an experiment will be assigned to the first one they match. 

{{partial:admonition type='note'}}
Caching expiration differs with the properties you use to define user segments. All user properties will always include the latest values your product has sent, defaulting to the most recent value in the event that Amplitude has not received your product’s data. Cohorts will be synced every hour.
{{/partial:admonition}}

The next step is [setting up your experiment’s variants](/experiment/workflow/add-variants).