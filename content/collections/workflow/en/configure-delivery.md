---
id: bbc8aee8-3cf6-49b1-bcd7-29150092c584
blueprint: workflow
title: "Configure your experiment's delivery"
source: 'https://help.amplitude.com/hc/en-us/articles/20009673705627-Configure-your-experiment-s-delivery'
this_article_will_help_you:
  - 'Ensure your experiment is ready for testing'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714514372
---
Now that you've designed your experiment, the next step is making sure it's ready to be tested and launched. You'll specify the evaluation mode and bucketing unit (if you haven't already), specify the deployments that will house this experiment, double-check your variants, and identify members of your team who will participate in QA testing.

This stage of the experiment process should be overseen by members of your engineering team.

{{partial:admonition type='note'}}
If you are launching a feature flag and not an experiment, you can skip the experiment design steps. However, you'll still need to complete the process described in this article.
{{/partial:admonition}}

To configure your experiment's delivery, follow these steps:

1. On the *Evaluation and Bucketing* tab, specify the [evaluation mode](https://www.docs.developers.amplitude.com/experiment/general/evaluation/local-evaluation/) for your experiment—either *Remote* (it will be evaluated on Amplitude servers) or *Local*. Then specify the **bucketing unit** you want to use for this experiment.  
  
    Most of the time, you should set the bucketing unit to *User*. However, sometimes you might want to use company ID or city as the bucketing unit, especially in certain B2B use cases. For example, bucketing by company ID ensures that all users in a particular company will have the same user experience. Be sure the [Stable Unit Treatment Value Assumption](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him) holds for whichever unit you choose.  
      
    When you’re ready, click *Continue*.

2. In the *Deployments* tab, select the deployments you’d like to use for this experiment or flag. In Amplitude Experiment, a deployment is where you can serve a group of flags or experiments for code execution. Learn more about deployments in the article on [configuring your experiment.](/docs/feature-experiment/workflow/configure). When you’ve selected all the deployments you need, click *Continue*.
   
3. Next, check your variants. Click *Continue* when you’re ready.
   
4. The final step is adding the user or device, or cohort IDs of your QA testers, so that you can ensure your implementation has been successful. Add the appropriate IDs for each variant. You’ll want to assign each tester to only one variant, just as if they were users who had been bucketed into your experiment.

  When you’re done, click *Save and Close*. It's time to [launch your experiment](/docs/feature-experiment/workflow/experiment-test).