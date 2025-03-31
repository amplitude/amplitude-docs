---
id: 37e1ab54-da77-4a60-be41-1c1018c4163a
blueprint: workflow
title: 'Create and roll out a feature flag'
source: 'https://help.amplitude.com/hc/en-us/articles/360061687311-Working-with-feature-flags-and-feature-rollouts'
this_article_will_help_you:
  - 'Understand the role of flags in Amplitude Experiment'
  - 'Create a new feature flag'
  - 'Use a flag to roll out a new feature'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724884966
landing: true
---
In Amplitude Experiment, a feature flag is a way for you to enable or disable a function or feature in your product without needing to deploy new code. Flags drive both experiments and feature releases: They’re ideal for launching experiments and ending them once you collect enough data, or for releasing out new features (and reverting them if you need to).

This article explains how to create a flag for a feature rollout. If you need information on how to use flags in your experiments, start with our article on [rolling out your experiment to your users](/docs/feature-experiment/workflow/experiment-test).

### Feature availability

This feature is available to users on all Amplitude plans. See the [pricing page](https://amplitude.com/pricing) for more details.

## Create a new flag

You can't create a new flag until you create a deployment and either install the [SDK](/docs/sdks/experiment-sdks) or set up to call the [evaluation REST API](/docs/apis/experiment/experiment-evaluation-api).  After that, follow these steps:

1. Navigate to *Experiment > Feature Flags* in the left sidebar. Click **+ Create Feature Flag**.
2. In the Create Flag modal, choose the project that includes this flag from the Projects drop-down menu. Then, give your flag a name. Amplitude Experiment generates the flag key from the name you choose. The flag key is an identifier for the flag used in your codebase.
3. Specify the [evaluation mode](/docs/feature-experiment/local-evaluation) for your experiment: either Remote (for example, Amplitude evaluates it on Amplitude's servers) or Local. Then, specify the bucketing unit you want to use for this experiment.  
    {{partial:admonition type='tip'}}
    The best bucketing unit is usually the user. However, in some B2B use cases, you might want to use the company ID or city as the bucketing unit. For example, bucketing by company ID ensures that all users in a particular company have the same user experience. Be sure that the [Stable Unit Treatment Value Assumption](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him) holds for whichever unit you choose.
    {{/partial:admonition}}

4. When you’re done, select *Create*. Experiment opens a blank template for your flag.
5. Next, choose the **deployment** for your experiment from the *Deployment* drop-down menu. For more information about working with deployments, see [this article on configuring Amplitude Experiment](/docs/feature-experiment/workflow/configure).
6. In *Advanced Settings*, you can change the **bucketing salt**. But if you do, users might switch between variants in your experiment. For that reason, Amplitude recommends not to change the bucketing unless you know what you're doing. For more information, see [How randomization works in Amplitude Experiment](/docs/feature-experiment/under-the-hood/experiment-randomization).
7. The flag must have at least one **variant**. The variant is the new feature or product experience you want to roll out to your users.  
  
You can add as many variants as you need to a feature flag. To add a variant to your flag, select *+ Create Variant*.

![createVariant.png](/docs/output/img/workflow/createvariant-png.png)

The *Create Variant* modal appears. Type in a name, value, and a description for your variant in the appropriate fields. Amplitude Experiment generates the variant value from the name you enter. The variant value is a string that you’ll use as a flag in your codebase. When you’re done, select *Apply*.

{{partial:admonition type='note'}}
Don't name your variants **OFF**. This is a reserved name for fallbacks in Amplitude Experiment (for example, the user segment not included in your experiments).
{{/partial:admonition}}

## Roll out a new feature

Continuing from the previous section, you can now use the flag you've created to roll out a new feature.

1. In the *Assignment* panel, you can define **user segments** that sees your new feature, specify the percentage of users you’ll roll it out to.

    Defining a user segment is useful if you’d like to limit your rollout to users in a specific geographical location, or those who belong to certain demographic groups, or those who meet certain usage thresholds in your product (for example power users).

    To define a user segment, scroll down to the *Rule Based User Segments* section and select into Segment 1. Then follow the same steps you’d use to build a user segment in Amplitude Analytics.

    All Amplitude’s user properties and cohorts are available to use in defining user segments. There is no limit on the number of user segments you can include here.

2. Next, set the **rollout percentage** for this feature. This is the percentage of the users included in the flag’s user segments who sees the new feature. If you want everyone in the user segment to have access to the feature, set this value to 100%.
3. You’ll need to tell Amplitude Experiment how many users sees each variant. The **weights** are relative values: for example, if you give variant A a weight of 1 and variant B a weight of 4, then four times as many users sees variant B than variant A.
4. You can set separate rules for everyone not covered by any user segments you created. If, for example, you only want the feature rolled out to the specific cohorts you targeted earlier, scroll down to the *All Other Users* section and set the rollout percentage to zero.
5. Next, save your flag, if you haven’t already, and QA it before setting it to Active. For more information, see the article on [Checking before launching an experiment](/docs/feature-experiment/workflow/experiment-test).
6. When you’re ready, select *Activate*. Your feature is now live for the user segments you selected.
