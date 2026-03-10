---
id: 8bfbe6f6-89ae-4878-abfe-89bcc113cddf
blueprint: experiment
title: Overview
source: 'https://help.amplitude.com/hc/en-us/articles/360061270232-Amplitude-Experiment-overview-Optimize-your-product-experience-through-A-B-testing'
landing: true
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1743538273
sourxe: 'https://help.amplitude.com/hc/en-us/articles/360061270232-Amplitude-Experiment-overview-Optimize-your-product-experience-through-A-B-testing'
landing_blurb: 'Learn the value of experimentation in your product.'
academy_course:
  - efd79a40-83e3-4c3d-a343-c0f81a41cdab
---
Experiment is a workflow-driven behavioral experimentation platform that lets you modify large sections of your customers' experience. Use it to test different aspects of the user journey and make changes as you review data generated from the experiment.

With Experiment, you can modify and configure product experiences for unique audiences through:

* **Product experimentation**: Improve key KPIs by running experiments and A/B tests to onboard new users, reduce friction in checkout experiences, roll out new features, and more.
* **Progressive feature delivery**: Pre-plan and stage new features for beta testers, a percentage of your users, or specific target audiences.
* **Dynamic in-product experiences**: Deploy and adapt custom experiences at scale.

There are two categories of experiments:

* **Feature Experiments**: Use feature flags to display or hide functionality or A/B options from your customers.
* **Web Experiments**: Use a visual editor to make direct changes to your website.

## Feature Experiments compared to Web Experiments

Feature experimentation uses feature flags to create experimental variants. Flags are switches that let you modify your product's experience without changing code. Use them to set up experiments in your product or to stage and roll out new features to your users. Your code uses the [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [REST API](/docs/apis/experiment) to communicate with Amplitude Experiment. For more information on feature flags, go to [Feature flags](/docs/feature-experiment/workflow/feature-flag-rollouts).

{{partial:admonition type='note'}}
Amplitude Experiment defaults to a sequential testing statistical model in all experiments, but you can opt for a [T-test](/docs/feature-experiment/experiment-theory/analyze-with-t-test) instead.
{{/partial:admonition}}

Web experimentation uses a visual editor to create experimental variants. This editor works best for A/B or multi-armed bandit experimentation. With the visual editor, you can select and alter web elements such as content and element properties. Web Experiment lets less technical users, or users with fewer permissions in your system, create experiments without engineering resources.

Web Experiments use pages to control where experiment variants apply on your website. This lets you scope experiments to specific URLs without affecting unrelated parts of your site.

For a detailed comparison of functionality available for Feature, Web, or both types of experimentation, go to [Differences between Feature and Web Experimentation](/docs/feature-experiment/feature-and-web-experiment-functional-comparison).

## Create an experiment

Many experimentation programs fail in the first step because nobody can articulate the problem that experimentation might solve. If you can't explain in clear, simple language why you're running an experiment, you can't realistically hope to learn anything useful from it.

Before doing anything else, spend some time coming up with a strong mission statement for your experiment. It should answer these questions: What's the problem, and how can running an experiment help you solve it? The effort you put in at this stage pays big dividends later.

After you've done that, you're ready to configure your experiment—create a new deployment (or choose an existing one) and install the SDK you'll use.

### Create a hypothesis

Focus on the mission statement you came up with for your experiment. This serves as the foundation for your experiment's hypothesis. A hypothesis is a prediction of how your experiment is likely to be the correct choice, and it's how you'll know if your experiment succeeds or fails.

A complete hypothesis has three parts: a problem statement, a proposed solution, and a predicted result.

A proposed solution is a description of the changes you want to make to fix your problem—for example, "Consolidate two steps of the onboarding process into one." A predicted result describes your expected outcomes—for example, "Decrease onboarding churn by 20%."

Here's an example of a hypothesis statement:

*"User churn in our onboarding funnel is significantly higher than industry average. Product data suggests our funnel may be too confusing; we believe this can be fixed by consolidating steps two and three in the funnel. As a result of this change, we expect onboarding churn to decrease by 20%."*

Every hypothesis is unique to your needs, particularly around the problem definition stage. For example, your question may be more exploratory: *"Why are so many users dropping out of our onboarding funnel?"* Or you may be testing different solutions to a problem you already understand: *"We've come up with several potential UI changes to rectify a known user pain point. Which one works best?"*

This basic template is a useful starting point for most hypotheses, especially if you're new to experimentation.

### Pick a metric

Look at the last sentence in the hypothesis statement. It includes a specific measurement of how you expect user behavior to change—onboarding churn will decrease by 20%. This measurement determines whether your experiment is a success.

To measure that decrease in churn, you need a metric. In Experiment, any event you log can serve as an experiment metric. For the example experiment above, you'd use the event your product uses to track drop-off in your funnels as your metric.

### Create a variant

You could roll out the new onboarding process to all your users and see what happens. But if you do that, you won't know whether the product changes you made caused any improvement in your onboarding churn rate. If that rate is lower after you roll out the new funnel, it could be the result of poor design choices, random chance, or some external influence. There's no way to find out the specific cause.

This is why you need to create at least one treatment variant for your experiment. A treatment variant is a different user experience that you display to a percentage of your users. In this example, the variant is the new, streamlined version of the onboarding process. Some users experience the new version, while others continue to experience the current process (known as the control). The differences in how users respond to each variant determine the experiment's success.

When creating variants, minimize the number of changes in each variant. Ideally, each variant contains only a single change—this lets you understand exactly which changes produce positive results. Also, make sure the variants are noticeably different from each other so you can be confident that users in each variant segment are truly experiencing different experiences.

### Decide who receives the variant

Define a bucketing unit—the determinant of what group of people sees the same variant. The most common bucketing unit is "user." However, if you're a B2B business or use the collaboration feature, you might want to use a bucketing unit such as "organization" or `company_id`, which means every user within the same organization experiences the same variant. This reduces product confusion when people sit next to coworkers using different interfaces, and it makes it easier for your customer support team to know which accounts have which features enabled.

Make sure the Stable Unit Treatment Value Assumption ([SUTVA](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him)) holds for whichever bucketing unit you choose to best ensure inference.

{{partial:admonition type='note'}}
If your organization has purchased the [Accounts add-on](/docs/analytics/account-level-reporting), you can perform bucketing and analysis on groups rather than users.
{{/partial:admonition}}

### Allocate users

Decide how many of your users receive each variant. You can roll your experiment out to your entire user base or to a fraction of them. Specify how many users in your experiment receive the control experience and how many receive your variants. You can define specific user segments to include or exclude from your experiment, and you can choose a specific experience for individual user or device IDs.

### Activate your experiment

Click **Start Experiment** to roll out your experiment to your users.

### Analyze your results

After your experiment goes live, generate and view your results at any time. Experiment tells you when your experiment has reached statistical significance—when it has enough results that you can trust the information you're gathering. Experiment provides all the data it collects so you can analyze and interpret your results.

To learn more about how to design, roll out, and learn from experiments, go to [articles on the experimentation workflow](/docs/feature-experiment/workflow/create).

{{partial:admonition type='note'}}
Consider using experiment briefs to better communicate and streamline your experimentation processes. They help create transparency and align experimentation goals. [Read more about experiment briefs in this blog](https://amplitude.com/blog/experiment-brief).
{{/partial:admonition}}

{{partial:admonition type="note" heading=""}}
The [Website Conversion Agent](/docs/amplitude-ai/website-conversion-agent) can help you identify high-impact pages, generate experiment strategies, and create draft experiments—all through a guided AI workflow.
{{/partial:admonition}}
