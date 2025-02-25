---
id: 57ce7f2b-1b49-4a17-99de-76f4a5c86238
blueprint: advanced-technique
title: 'Sticky bucketing'
source: 'https://help.amplitude.com/hc/en-us/articles/12939879862171-Sticky-bucketing-in-Amplitude-Experiment'
this_article_will_help_you:
  - 'Learn when and when not to use sticky bucketing in your experiments'
  - 'Confirm if sticky bucketing was used for a specified user'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716329324
---
Sticky bucketing ensures that a user will continue to see the same variant even when your experiment’s targeting criteria, percentage rollout, or rollout weights are changed. 

Sticky bucketing is often used as a defense mechanism against [variant jumping](https://www.docs.developers.amplitude.com/experiment/guides/troubleshooting/variant-jumping/): when a user is exposed to two or more variants for a single flag or experiment. However, simply enabling sticky bucketing does not guarantee that you’ll never see variant jumping. For example, it may still occur if your experiment includes both a logged-out and a logged-in experience, since a user may have a different Amplitude ID when they are logged in versus not.

{{partial:admonition type='note'}}
Sticky bucketing is only available on feature experiments not flags.
{{/partial:admonition}}

{{partial:admonition type='note'}}
 Amplitude Experiment uses [consistent bucketing](/docs/feature-experiment/implementation#consistent-bucketing) and a [deterministic hashing algorithm](/docs/feature-experiment/implementation#hashing), which keeps users bucketed into their original variants as long as you don’t change anything. 
{{/partial:admonition}}

## How sticky bucketing works

To turn sticky bucketing on or off, open your experiment and navigate to *Bucketing > Delivery Settings.* Click the edit icon, then Advanced (Optional) in the left sidebar. Here you'll find the sticky bucketing toggle. 

When sticky bucketing is enabled, Amplitude Experiment checks whether a user already has a value for the user property associated with the experiment. If so, the user is assigned the current value of the user property (the last variant they saw); otherwise, the user is re-evaluated.

{{partial:admonition type='note'}}
If two or more experiment assignments occur within a few seconds of each other, Amplitude Experiment may not have time to apply sticky bucketing. 
{{/partial:admonition}}

Users do not get sticky bucketed to the **off** variant. Learn more about evaluation and exposure with these Amplitude resources: [evaluation flow chart](/docs/feature-experiment/advanced-techniques/cumulative-exposure-change-slope), and [local evaluation targeting capabilities](https://www.docs.developers.amplitude.com/experiment/general/evaluation/local-evaluation/#targeting-capabilities).

## When to use sticky bucketing, and when not to

This section provides examples of when to enable sticky bucketing versus when not to. Note that this is not intended to be an exhaustive list. There are also cases where the results would be the same, regardless of whether sticky bucketing was on or off. An example might be an experiment where you’re targeting everyone who views your home page, and you do not touch any of the experiment controls while the experiment is running. 

#### Enable sticky bucketing when:

* You want to **give the user a consistent experience**, even if the user property you’re targeting changes. For example, if you’re running an experiment only in the United States, enabling sticky bucketing would ensure your users would see the same variant if they happened to travel outside the country.
* You want to **decrease the percentage rollout** of an experiment (rolled out to half your users, for example) where the treatment group is not performing well. But you **don’t** want users to be moved from either the treatment or the control to the group that never saw either variant. Enabling sticky bucketing will keep users in their assigned groups even after you change the percentage rollout.
* You want to **target users for a specified duration** (for example, two weeks) and then stop targeting new users, while maintaining the original assignments for any users that have already been bucketed. (You might do this if you want to study the long-term effects of a particular treatment on user behavior, or if you are unsure of the quality of one or more of the experiment’s treatments.) Enable sticky bucketing at the beginning of the experiment, with a 50/50 split. Then, after the duration passes, change the rollout percentage to zero.
* You want to **sunset a failed experiment**, but ensure the users bucketed into an experience still get that experience. Enable sticky bucketing and set the rollout percentages to zero.

Do not enable sticky bucketing when:

* You want the **user’s experience to change** as the targeted user property changes. To continue an example from the previous list, if you‘re running an experiment in the United States, you may not want users to have the same experience if they’re traveling abroad.
* Your experiment is intended to **drive free users to becoming paid users**, and relies on earning rewards. Once these users convert, you no longer need to offer a reward. If sticky bucketing were enabled here, those users would receive the free experience even after upgrading to paid.
* You want to **enforce a “cool down” period** between giving discounts. If you want to limit the frequency of discounts for each user to once every seven days, you can add a seven-day filter to the targeting criteria; if a user received a discount within that period, the flag would evaluate to [off]. This will prevent the user from collecting another discount before you want them to.
* You are **rolling out or rolling back** a variant. When sticky bucketing is enabled and you change the traffic allocation, you’ll actually get a weighted average between the old and new allocation (since the users who were previously bucketed will stay in their bucket). It will take some time for your experiment to achieve the desired allocation.

## Verify if sticky bucketing was enabled for a specific user

Follow these steps to see if a user was subject to sticky bucketing:

1. Check the Experiment Assignment events in the user's [event stream](/docs/analytics/user-data-lookup). (You can only do this if you have not blocked the Experiment Assignment events in Data).
2. Find the event property with `.details` that corresponds to the experiment flag key you are interested in. This will show the version of the flag that was evaluated, and which targeting rule applies to the user. This can also be helpful for debugging assignment issues.

![image2.png](/docs/output/img/advanced-techniques/image2-png.png)

For example, the properties above show that the user was assigned to `off` for the `lp-app-downloads` flag because the device family was not iOS. We also see that this is the 21st version of the flag; the name of the rule applied to them is `non-iOS users`; and the user failed the first rule-based targeting filter, so they went to the second one instead.

![image3.png](/docs/output/img/advanced-techniques/image3-png.png)

In this example, sticky bucketing was enabled and the user was bucketed to the 14th version of the `signup-ux-updates` flag, where they were served the `phone-number-removed` variant. Having the flag version helps with debugging when the flag has been changed. (Remember that the assignment event shows the evaluation for all active flags in that project, but the exposure event is shown on a per-flag basis). If you don’t see an event property corresponding to the flag you’re interested in, check the `[Experiment] Environment Name` field and make sure it matches the deployment your flag belongs to.
