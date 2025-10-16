---
id: 8bfbe6f6-89ae-4878-abfe-89bcc113cddf
blueprint: experiment
title: Overview
source: 'https://help.amplitude.com/hc/en-us/articles/360061270232-Amplitude-Experiment-overview-Optimize-your-product-experience-through-A-B-testing'
this_article_will_help_you:
  - 'Understand the value of experimentation in general, and how Amplitude Experiment can help your company make better decisions and build better products'
  - 'Familiarize yourself with the concepts and processes involved in creating an experiment or feature flag in Amplitude Experiment'
landing: true
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1743538273
sourxe: 'https://help.amplitude.com/hc/en-us/articles/360061270232-Amplitude-Experiment-overview-Optimize-your-product-experience-through-A-B-testing'
landing_blurb: 'Learn the value of experimentation in your product.'
academy_course:
  - efd79a40-83e3-4c3d-a343-c0f81a41cdab
---
Experiment is a workflow-driven behavioral experimentation platform that lets you modify large sections of your customer's experience. This lets you test different aspects of the user journey and make changes as you receive and review the data generated from the experiment. 
With Experiment, you can modify and configure product experiences for unique audiences through:

* **Product experimentation**: Improve key KPIs by running experiments and A/B tests to onboard new users, reduce friction for checkout experiences, roll out new features, and more.
* **Progressive feature delivery:** Pre-plan and stage new features for beta testers, a percentage of your users, or even specific target audiences.
* **Dynamic in-product experiences:** Deploy and adapt custom experiences at scale.

There are two categories of experiments:
* **Feature Experiments**: Uses feature flags to display or hide functionality or A/B options from your customers.
* **Web Experiments**: Uses a Web editor to let you make direct changes to your website.

## Feature Flags and Web Editor differences

Feature experimentation uses feature flags to create your experimental variants. Flags are switches that let you modify your product's experience without having to change code. Use them to set up experiments in your product or to stage and roll out new features straight to your users. Your code uses the [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [REST API](/docs/apis/experiment) to communicate with Amplitude Experiment. For more information on feature flags, go to [Feature Flags](docs/feature-experiment/workflow/feature-flag-rollouts).

{{partial:admonition type='note'}}
Amplitude Experiment defaults to a sequential testing statistical model in all experiments, but you can opt for a [T-test](/docs/feature-experiment/experiment-theory/analyze-with-t-test) instead.
{{/partial:admonition}}

Web experimentation uses a visual editor to create your experimental variants. This editor works best for A/B or multi-armed banded experimentation. With the visual editor, you can select and alter web elements such as directly altering content or element properties. Web experiment lets less technical users, or users with fewer permissions in your system, to create experiments without engineering resources. 

Web experiments use pages to control where your experiments variants apply on your website. This lets you scope experiments to specific URLs without affecting unrelated parts of your site.

### Functional Availability

For in depth information about what functionality is available for Feature, Web, or both types of experimentation, go to [Differences Between Feature and Web Experimentation](/docs/feature-experiment/feature-and-web-experiment-functional-comparison).

## Creating an experiment

Many experimentation programs fail in the first step of the process because nobody can articulate the problem that experimentation might solve. If you can’t explain in clear, simple language, why you’re running an experiment, you can’t realistically hope to learn anything useful from it. 

Before doing anything else, spend some time coming up with a strong mission statement for your experiment. It should answer the following questions: What’s the problem, and how can running an experiment help you solve it? The effort you put in at this stage will pay big dividends later.

After you’ve done that, you’re ready to configure your experiment. This means creating a new deployment (or choosing one you’ve created earlier) for the experiment, and installing the SDK you’ll be using.

### Create a hypothesis

Next, focus on the mission statement you came up with for your experiment. This serves as the foundation for your experiment’s hypothesis. A hypothesis is a prediction of how your experiment is likely to be the correct choice. This is how you’ll know if your experiment succeeds or fails.

But this problem statement is only the first part of a hypothesis. There are two others: a proposed solution and a predicted result. 

A proposed solution is a description of the changes you want to make to fix your problem. For example: "Consolidate two steps of the onboarding process into one." A predicted result are your expected outcomes from the experiment. For example: “Decrease onboarding churn by 20%.”

An example of a hypothesis statement:

*"User churn in our onboarding funnel is significantly higher than industry average. Product data suggests our funnel may be too confusing; we believe this can be fixed by consolidating steps two and three in the funnel. As a result of this change, we expect onboarding churn to decrease by 20%."*

Every hypothesis statements you use is unique to your needs, particularly around the problem definition stage. For example, your question may be more exploratory in nature: *"Why are so many users dropping out of our onboarding funnel?"* Or, you may be more interested in testing different solutions to a problem you already understand such as *"We've come up with several potential UI changes to rectify a known user pain point. Which one works best?"* 

This basic template can be used as a starting point for most hypotheses, especially if you’re new to experimentation.

### Pick a metric

Focus on the last sentence in the hypothesis statement. What do you notice about it? For one thing, it includes a specific measurement of how you expect user behavior to change—onboarding churn will decrease by 20%. This is what will determine whether your experiment is a success: either you’ll hit this number, or you won’t.

But how will you know? You need a way to measure that decrease in churn. To do that, you’ll need a metric. In Experiment, any event you log can serve as an experiment metric. For the example experiment described above, you’d want to use the event your product uses to track drop-off in your funnels as your metric. 

### Create a variant

At this point, you could go ahead and just roll out the new onboarding process to all your users and find out what happens. But if you were to do that, you won’t know if the product changes you made were responsible for any improvement in your onboarding churn rate. And what if that rate is lower after you roll out the new funnel? It could be the result of poor design choices, random chance, or some external influence you didn’t consider. There is no way to find out the specific cause. 

This is why you’ll need to create at least one treatment variant for your experiment. A treatment variant is a different user experience that you’ll display to a percentage of your users. Keeping with the above example, the variant here would be the new, streamlined version of the onboarding process. Some of your users will experience the new version, while others will continue to experience the current process (known as the control). It’s the differences in how your users respond to each variant that determines the experiment’s success.

When creating variants, it’s good practice to minimize the number of changes contained in each variant. Ideally, each variant only contains a single change. This lets you understand exactly which changes produce positive results. Also, make sure the variants are noticeably different from each other. This way, you can be confident that users in each variant segment are truly experiencing the different experiences and that your changes are what’s driving any differences in behavior between the segments.

### Decide who will receive the variant

Next, you will define a bucketing unit, or the determinant of what group of people sees the same variant. The most common bucketing unit is “user.” However, if you’re a B2B business or are utilizing the collaboration feature, you might want to use a bucketing unit such as “organization” or `company_id`, which means that every user within the same organization will experience the same variant. This can help reduce product-related confusion caused by disparate user interfaces if people are sitting next to their coworkers. Another reason for bucketing by `company_id` is to reduce the load on your customer support team. It's easier for the customer support team to know which accounts have which features enabled. Either way, you want to make sure the Stable Unit Treatment Value Assumption ([SUTVA](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him)) holds for whatever bucketing unit you choose to best ensure inference. 

{{partial:admonition type='note'}}
 If your organization has purchased the [Accounts add-on,](/docs/analytics/account-level-reporting) you may perform bucketing and analysis on groups rather than users.
{{/partial:admonition}}

### Allocate users

Now that you’ve got your variants, you’ll need to decide how many of your users will receive them. You can choose to roll your experiment out to your entire user base, or you can just roll it out to a fraction of them instead. You’ll specify how many users in your experiment receive the control experience and how many receive your variants. You can define specific user segments to include or exclude from your experiment, and you can even choose a specific experience for individual user or device IDs.

### Activate your experiment

At this point, you’re ready to roll out your experiment to your users. Click **Start Experiment**, and your experiment will be live.

### Analyze your results

After your experiment goes live, you can generate and view your results at any time. Experiment tells you when your experiment has reached statistical significance, which is when the experiment has enough results and data that you can trust that the information you're gathering is accurate. Experiment provides all the data it collects so that you can analyze and interpret your results.

To learn more about how to design, roll out, and learn from experiments, review these [articles on the experimentation workflow](/docs/feature-experiment/workflow/create).

{{partial:admonition type='note'}}
 Consider using experiment briefs to better communicate and streamline your experimentation processes amongst your team. They can also help to create transparency and align experimentation goals. [Read more about experiment briefs and how to use them in this blog](https://amplitude.com/blog/experiment-brief).
{{/partial:admonition}}
