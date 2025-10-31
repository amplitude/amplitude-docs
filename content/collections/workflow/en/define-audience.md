---
id: 5c091ba2-f202-4972-9e9f-4a9af712730d
blueprint: workflow
title: "Define your experiment's audience"
source: 'https://help.amplitude.com/hc/en-us/articles/9795802005019-Define-your-experiment-s-audience'
this_article_will_help_you:
  - 'Specify which users will be able to see your experiment'
  - 'Limit experiment exposure based on user segments'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1726005676
landing: false
---
After you define the events that make up your experiment, you can set who's eligible for the experiment. You can choose to open eligibility up to all users or you can target specific groups of users.

{{partial:admonition type='note'}}
Users still must trigger the exposure event before they receive the experiment. The targeting section only defines the potential audience you want. 
{{/partial:admonition}}

Targeting groups of users limits experiment exposure to users in geographical locations, specific demographic groups, or who meet certain usage thresholds in your product (like power users). Defining your audience is also known as targeting segments. The segments are the unique characteristics of your audience that you want to target, such as geolocation or device type. All Amplitude user properties and cohorts are available to use in defining user segments. The value for any user property included in a rule-based user segment is always the most recent value received by Amplitude. For more information on segments, go to [Segment Overview](/docs/data/destination-catalog/segment).

{{partial:admonition type='note'}}
Experiment doesn't support the use of transformed properties in targeting.
{{/partial:admonition}}

There is no limit on the number of user segments you can include here. Any user who belongs to more than one segment included in an experiment is assigned to the first one they match. 

{{partial:admonition type='note'}}
Caching expiration differs with the properties you use to define user segments. All user properties always include the latest values your product has sent, defaulting to the most recent value if Amplitude hasn't received your product’s data. Cohorts sync every hour.
{{/partial:admonition}}

Defining your audience isn't just about the segments or user properties. You must also specify your Distribution and Rollout. 

* **Distribution**: The percentage between the control and the experiment group. By default, this is set to 50% distribution so that half of your group is the control and half is the experiment. You can customize the percentage if you want more people in one distribution group or the other. This is the distribution across your targeted audience and not your total user base. 
* **Rollout**: The percentage of people, within your targeted audience who you want to receive the experiment. If you set this number to 100%, then all users within your targeted audience receives the experiment as either the control or treatment group. Experiment displays the potential number of people who will receive the experiment.

##### To define the audience for your experiment

1. Either create a new experiment or open an existing one. 
2. In the Targeting section, click the **edit** icon.
3. In the Targeting tab, select the bucketing unit you want.
   Typically, the bucketing unit is by `User`. However, you can also bucket by [groups](/docs/analytics/account-level-reporting#group-level-reporting-an-overview).
4. Select who you want to be eligible for this experiment. 
   By default, targeting will be on **All Users**. Add a segment to switch to **Targeted Users**. Targeting all users means that every users who triggers the exposure event receives your experiment. Targeting users lets you specify segments of users to receive your experiment.
5. Select the bucketing you want to target. 
   By default, this is `Amplitude ID`. However you could select something like:
   * Device type
   * Language
   * Region
   * Postal code
6. If you want to customize the distribution percentage, click **Switch to custom** and then specify the percentages you want. 
7. In the All users field, specify the percentage of users you want to receive the experiment. 
8. Click either **Save & Close** or **Testers**. 

After you have specified your audience, specify your testers.

### Testers

Testing your experiment is important so that you can be sure that all aspects of your experiment are working and to ensure that the implementation of your experiment is successful. Go to [Test and Launch Your Experiment](/docs/feature-experiment/workflow/experiment-test) for more details about testers. 

### Boolean logic in segments
Amplitude applies Boolean `AND` logic to conditions within the same segment. These conditions are evaluated as `if, else if`. For example, you have two Segments:

Segment 1: Users in India and who access your site through the Web.
Segment 2: Users who use Android devices and access your website through the mobile browser.

Using Boolean logic, both conditions for a segment must be met to include users in the experiment. If users access your website but aren't located in India, they're not included in Segment 1. Likewise, if users access your site through an iOS device, they aren't included in Segment 2. 

The `if, else if` evaluation means that a user is evaluated if they meet the conditions for Segment 1. If not, they're evaluated if they meet the conditions for Segment 2. 