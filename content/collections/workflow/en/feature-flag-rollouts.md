---
id: 37e1ab54-da77-4a60-be41-1c1018c4163a
blueprint: workflow
title: 'Working with feature flags and feature rollouts'
source: 'https://help.amplitude.com/hc/en-us/articles/360061687311-Working-with-feature-flags-and-feature-rollouts'
this_article_will_help_you:
  - 'Understand the role of flags in Amplitude Experiment'
  - 'Create a new feature flag'
  - 'Use a flag to roll out a new feature'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717434102
landing: false
---
In Amplitude Experiment, a **flag** is a way for you to enable or disable a function or feature in your product, without having to deploy new code each time. Flags drive both experiments and feature rollouts: They're are ideal for launching experiments and ending them once you’ve collected enough data, or for rolling out new features (and rolling them back quickly, if you need to).

This article will explain how to create a flag for a **feature rollout**. If you need information on how to use flags in your experiments, start with our article on [rolling out your experiment to your users](/docs/experiment/workflow/experiment-test).

### Feature availability

This feature is available to users on **all Amplitude plans** who have **purchased Amplitude Experiment**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Create a new flag

You cannot create a new flag until you’ve created a deployment, and either installed the [SDK](https://www.docs.developers.amplitude.com/data/sdks/sdk-overview/#experiment-sdks) or are set up to call the [evaluation REST API](https://www.docs.developers.amplitude.com/experiment/apis/evaluation-api/). Once you've done that, follow these steps:

1. From the main Experiment page, navigate to *Flags* in the left-hand sidebar. Click *+ Create Feature Flag*.
2. In the *Create Flag* modal, choose the project that will include this flag from the *Projects* drop-down menu. Then give your flag a name. Amplitude Experiment will automatically generate the flag key from the name you choose. The flag key is an identifier for the flag used in your codebase.
3. Specify the [evaluation mode](https://www.docs.developers.amplitude.com/experiment/general/evaluation/local-evaluation/) for your experiment, either *Remote* (i.e., it will be evaluated on Amplitude servers) or *Local*. Then specify the **bucketing unit** you want to use for this experiment.  
  
    {{partial:admonition type='tip'}}
    The best bucketing unit will usually be the user. However, in some B2B use cases, you might want to use company ID or city as the bucketing unit. For example, bucketing by company ID ensures that all users in a particular company will have the same user experience. Be sure the [Stable Unit Treatment Value Assumption](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him) holds for whichever unit you choose.
    {{/partial:admonition}}

4. When you’re done, click *Create*. Experiment will open a blank template for your flag.
5. Next, choose the **deployment** for your experiment from the *Deployment* drop-down menu. For more information about working with deployments, see [this article on configuring Amplitude Experiment](/docs/experiment/workflow/configure).
6. In *Advanced Settings*, you can change the **bucketing salt**. But if you do, users might switch between variants in your experiment. For that reason, we recommend you **do not change the bucketing salt** unless you know what you're doing. For more information, see our article on [how randomization works in Amplitude Experiment](/docs/experiment/under-the-hood/experiment-randomization).
7. Your flag must have at least one **variant**. The variant is the new feature or product experience you want to roll out to your users.  
  
You can add as many variants as you need to a feature flag. To add a variant to your flag, click *+ Create Variant*.

![createVariant.png](/docs/output/img/workflow/createvariant-png.png)

The *Create Variant* modal will appear. Type in a name, value, and a description for your variant in the appropriate fields. Amplitude Experiment will automatically generate the variant value from the name you enter. The variant value is a string that you’ll use as a flag in your codebase. When you’re done, click *Apply*.

{{partial:admonition type='note'}}
 Do **not** name your variants **OFF**. In Amplitude Experiment, this name is reserved for fallbacks (i.e., the user segment not included in your experiments).
{{/partial:admonition}}

## Roll out a new feature

Continuing from the previous section, you can now use the flag you've created to roll out a new feature.

1. In the *Allocation* panel, you can define **user segments** that will see your new feature, specify the percentage of users you’ll roll it out to.

    Defining a user segment is useful if you’d like to limit your rollout to users in a specific geographical location, or those who belong to certain demographic groups, or those who meet certain usage thresholds in your product (i.e., power users).

    To define a user segment, scroll down to the *Rule Based User Segments* section and click into Segment 1. Then follow the same steps you’d use to build a user segment in Amplitude Analytics.

    All of Amplitude’s user properties and cohorts are available to use in defining user segments. There is no limit on the number of user segments you can include here.

2. Next, set the **rollout percentage** for this feature. This is the percentage of the users included in the flag’s user segments who will see the new feature. If you want everyone in the user segment to have access to the feature, set this value to 100%.
3. You’ll need to tell Amplitude Experiment how many users will see each variant. The **weights** are relative values: for example, if you give variant A a weight of 1 and variant B a weight of 4, then four times as many users will see variant B than variant A.
4. You can set separate rules for everyone not covered by any user segments you created. If, for example, you only want the feature rolled out to the specific cohorts you targeted earlier, scroll down to the *All Other Users* section and set the rollout percentage to zero.
5. Next, save your flag, if you haven’t already, and QA it before setting it to Active. For more information, see our Help Center article on [QAing before launching an experiment](/docs/experiment/workflow/experiment-test).
6. When you’re ready, click *Activate*. Your feature is now live for the user segments you selected.