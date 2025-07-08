---
id: 3c450c92-9e04-4996-82ac-2baf0a741845
blueprint: get-started
title: 'Analyze A/B test results in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/115001580108-Analyze-A-B-test-results-in-Amplitude'
this_article_will_help_you:
  - 'Instrument your app for A/B testing (split testing)'
  - 'Review the results of A/B tests in Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720718906
ai_summary: "With Amplitude's A/B Test View, you can measure the impact of experiments on your website or app metrics. Instrument your experiments by updating user properties through SDKs, HTTP API, or the Identify API. Send user properties to track experiment variations. Choose to use one user property per experiment or for all experiments. Amplitude integrates with Optimizely for automatic user property updates. Analyze experiment results using the AB Test View to compare activity between experiment groups. Segment user data for detailed analysis in the chart control panel."
---
A/B testing is a method of conducting controlled, randomized experiments with the goal of improving a website or application metric. With Amplitude's [AB Test View](/docs/analytics/charts/funnel-analysis/funnel-analysis-interpret), you can measure the impact of your experiments by comparing how each experiment group behaves in your application.

For example, you can show two different onboarding flows to different groups of new users, then use the results to identify the flow that's more effective in driving users to complete the onboarding process. Or you can test different checkout flows to see which is more effective in generating sales.

{{partial:admonition type="note" heading="Note"}}
Don't confuse this feature with [Amplitude Experiment](/docs/analytics/charts/experiment-results/experiment-results-dig-deeper).
{{/partial:admonition}}

## Before you begin: Instrument your experiments

Before you can do anything, you must instrument your experiments. Amplitude recommends using user properties to associate a user with a given experiment variation. User properties reflect traits about each individual person using your product. Use them to segment your analysis in Amplitude Analytics.

There are two main ways to update a user property:

1. [SDKs](/docs/sdks) & [HTTP API](/docs/apis/analytics/http-v2): Update user properties on event action.

   * **How:** Send user properties with each event with Amplitude's [SDKs](/docs/sdks) or [HTTP API](/docs/apis/analytics/http-v2).
   * **Pros:** User properties take effect at the moment your app sends the event, and exist with the user for all subsequent events, until the property values are explicitly updated.
   * **Cons:** These events count towards your monthly event volume. Further, these events count users as **active** users by default, so make sure to mark any A/B testing-related events as [inactive events](/docs/data/change-event-activity-status).

2. [Identify API](/docs/apis/analytics/identify): Update user properties without sending an event.

   * **How:** Amplitude's [Identify API](/docs/apis/analytics/identify) allows you to update a user property without sending an event.
   * **Pros:** Can asynchronously update a user property without sending an event, and don't affect your monthly event volume count.
   * **Cons:** The user property doesn't take effect until the user takes an action. This isn't an issue for most experiments, but it may impact on experiments that track if inactive users return to your application.  
  
For example, suppose you're trying to get users who have been inactive for more than seven days to return to your app, and you're testing the effectiveness of an email to make that happen. If the [Identify API](/docs/apis/analytics/identify) is used to update a user property, it will only apply to those users who have returned to trigger an event in your application. If a user remains inactive after receiving the email, the user property doesn't apply to this user. As a result, this inactive user isn't included in the experiment group that has received the email, because the user property never attached to them. In situations like these, consider updating user properties on an event action (for example, an event called "Email Sent").

Learn more about [how user properties are synced in Amplitude](/docs/data/user-properties-and-events).

## How many user properties should you send?

Amplitude users tend to take one of two approaches when instrumenting split tests:

### Use one user property **per experiment**.  
  
All user properties arrive as key-value pairs. This approach sets the experiment name as the key and all variations of the experiments as the potential values.  
  
User Property Key: `Experiment 1`  
User Property Value: `variation_a`  
  
**Pros:** Can easily select experiments to segment by from the user segmentation tab.  
**Cons:** Can result in an overwhelming list of user properties, depending on the number of active experiments.

### Use one user property **for all** experiments 
  
All user properties arrive as key-value pairs. This approach sets the key to `Split Tests` (or something similar) and stores the values in an array.  
  
User Property: `Split Tests`  
User Property Value: [`experiment_1_value`, `experiment_2_value`]  
  
You can segment on the user property `Split Tests` by selecting the appropriate value or test group in the chart's [segmentation module](/docs/analytics/charts/build-charts-add-user-segments).  
  
**Pros:** You will only have one user property related to your split testing (rather than one per experiment), so your user property list is more manageable in the dashboard.   
**Cons:** Arrays can't exceed 10,000 characters if you use `append`  or `prepend` . If an array exceeds this limit, Amplitude doesn't record any characters past the threshold.

{{partial:admonition type="note" heading="Note"}}
This feature doesn't support merged or transformed properties. 
{{/partial:admonition}}

Amplitude also offers a full integration with [Optimizely](https://www.optimizely.com/) that automatically updates user properties for each experiment.

## Viewing results in Amplitude

Review the results of your split tests after user properties update for each experiment group. Use the [AB Test View](/docs/analytics/charts/funnel-analysis/funnel-analysis-interpret) conduct this analysis.

Compare the activity between experiment groups in the [segments module](/docs/analytics/charts/build-charts-add-user-segments) of the chart control panel. To do this, simply add your experimental groups.

![analyze_a_b_results_1.jpeg](/docs/output/img/get-started/analyze_a_b_results_1.jpeg)