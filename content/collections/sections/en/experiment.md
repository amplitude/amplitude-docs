---
id: 4cb8166f-a1a1-44dc-9b76-f2fb51db6b05
blueprint: section
title: Experiment
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1743023925
nav_title: experiment_new
hide_toc: false
---
For decades, product teams have relied on experimentation as a way to rank and implement product adjustments. But it’s never been easy. Because of that, these experiments often just tweak peripheral issues around the margins, instead of driving the big-picture changes that optimize the product experience.

Amplitude Experiment is a workflow-driven behavioral experimentation platform that actually accelerates your roadmap, letting you focus on making better decisions and building better products.

With Experiment, you can modify and configure product experiences for unique audiences through:

* **Product experimentation**: Improve key KPIs by running experiments and A/B tests to onboard new users, reduce friction for checkout experiences, roll out new features, and more.
* **Progressive feature delivery:** Pre-plan and stage new features for beta testers, a percentage of your users, or even specific target audiences.
* **Dynamic in-product experiences:** Deploy and adapt custom experiences at scale.

Amplitude Experiment enables all this through flags, switches that could modify your product's experience without code changes. Use them to set up experiments in your product, or to stage and roll out new features straight to your users. Your code uses the [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [REST API](/docs/apis/experiment) to communicate with Amplitude Experiment.

{{partial:admonition type='note'}}
Amplitude Experiment defaults to a sequential testing statistical model in all experiments, but you can opt for a [T-test](/docs/feature-experiment/experiment-theory/analyze-with-t-test) instead.
{{/partial:admonition}}

This article provides a high-level overview of the Amplitude Experiment workflow: we’ll start with the workflow for creating an experiment, and follow that with the workflow for creating a feature flag.

## Creating an experiment: an overview

Many experimentation programs fail in the first step of the process. Software design and testing requires you to clearly articulate the problem experimentation should solve. 

Before doing anything else, spend some time coming up with a strong mission statement for your experiment. It should, at the very least, answer these two questions: What’s the problem, and how can running an experiment help you solve it?

Once you’ve done that, you’re ready to configure your experiment. This means creating a new deployment (or choosing one you’ve created earlier) for the experiment, and installing the SDK you’ll be using.

## Create a hypothesis

Start with the mission statement for your experiment, which forms the basis of your hypothesis—a prediction of how the experiment could turn out and how you can identify success.

A hypothesis includes three parts: a problem statement, a proposed solution, and a predicted result. The problem defines the issue (for example, confusing onboarding steps), the solution describes the change (such as merging two steps), and the result is your expected outcome (for instance, reducing churn by 20%).

Here’s an example of a hypothesis statement:

“User churn in our onboarding funnel is significantly higher than industry average. Product data suggests our funnel may be too confusing; we believe we can fix it by consolidating steps two and three in the funnel. As a result of this change, we expect onboarding churn to decrease by 20%.”

The hypothesis statements you use are different, particularly around the problem definition stage. For example, your question may be more exploratory in nature (for example "why are so many users dropping out of our onboarding funnel?") or you may be more interested in testing different solutions to a problem you already understand ("we've come up with several potential UI changes to rectify a known user pain point; which one works best?"). Still, this basic template is a good one to follow, especially if you’re new to experimentation.

## Pick a metric

Take a look at the last sentence in that hypothesis statement. What do you notice about it? For one thing, it includes a specific measurement of how you expect user behavior to change—onboarding churn decreases by 20%. This is what decides if your experiment is a success: either you’ll hit this number, or you won’t.

But how do you know? You need a way to measure that decrease in churn. To do that, you’ll need a metric. In Amplitude Experiment, any event you log in Amplitude Analytics can serve as an experiment metric. For the example experiment described above, you’d want to use the event your product uses to track drop-off in your funnels as your metric.

## Create a variant

You could roll out the new onboarding process to all users, but that wouldn't let you know if the changes are responsible for any improvement in onboarding churn. Plus, if the churn rate worsens, it could be due to design issues, random chance, or an external factor—and you'd never know for sure.

To solve this, create a treatment variant: a different user experience shown to a percentage of users. In this case, it’s the new onboarding process. Some users may see the current process (control), while others may see the new version. The differences in user responses determines the experiment's success.

When creating variants, keep changes minimal (ideally one change) and ensure they're noticeably different. This way, you can confidently attribute any behavioral differences to your changes.

## Decide which user sees the variant

The most common bucketing unit is “user”. However, if you’re a B2B business or are utilizing the collaboration feature, you might want to use a bucketing unit such as “organization” or company\_id, which means that every user within the same organization could see the same variant. This can help reduce product-related confusion caused by disparate user interfaces if people are sitting next to their coworkers. Another reason for bucketing by company\_id is to reduce the load on your customer support team. It's easier for the customer support team to know which accounts have which features enabled. Either way, you want to make sure the Stable Unit Treatment Value Assumption ([SUTVA](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him)) holds for whatever bucketing unit you choose to best ensure inference. 

{{partial:admonition type='note'}}
 If your organization has purchased the [Accounts add-on,](/docs/analytics/account-level-reporting) you may perform bucketing and analysis on groups rather than users.
{{/partial:admonition}}

## Allocate users

Decide how many users should see your variants by rolling the experiment out to the entire user base or just a fraction. Specify the number of users for the control and variant experiences, define user segments to include or exclude, and even target specific user or device IDs.

## Activate your experiment and analyze your results

When your experiment is set up, select *Start Experiments* to enable the experiment and send it to users.

## Analyze your results

After your experiment goes live, you can generate and view your results at any time. When your experiment reaches statistical significance.

 Experiment actively informs you when the results reach 

Experiment shows you when your experiment has reached statistical significance, and it gives you all the data you need to analyze and interpret your results, and to apply the understanding to your product experience going forward.

To learn more about how to design, roll out, and learn from experiments, check out our [articles on the experimentation workflow](/docs/feature-experiment/workflow/create).

{{partial:admonition type='note'}}
 Now that you better understand the experiment workflow, consider using experiment briefs to better communicate and streamline your experimentation processes amongst your team. They can also help to create transparency and align experimentation goals. [Read more about experiment briefs and how to use them in this blog](https://amplitude.com/blog/experiment-brief).
{{/partial:admonition}}

## Create a feature flag

If you’re planning a phased feature rollout instead, your workflow is even simpler. Because you’re not asking a question about user behavior in your product, you don’t need to worry about creating a hypothesis, picking a metric, or analyzing your results. All you have to do is create a feature flag.

{{partial:admonition type='note'}}
Behind the scenes, experiments and flags are very similar, but the basic difference is this: An experiment helps you make sure you’re building the right thing for your business, while feature flags allow seamless feature releases and rollbacks. This is because an experiment has metrics and a feature flag doesn't, giving you greater flexibility to mess with controls without breaking anything.
{{/partial:admonition}}

Once you’ve configured your deployment, go straight to creating your variants. The basic idea, a new and different product experience that some users see but others don't—remains the same. But instead of exploring how different user segments react to different user experiences, you’ll be choosing which users get access to new features first. When working with feature flags, the variant represents code for a new feature that isn’t yet released to your entire user base.

You're allocating users to your variants as you would if you were running an experiment, and activating your flag is as simple as switching on your experiment.

Check out this article to [learn more about feature flags and how they work in Amplitude Experiment](/docs/feature-experiment/workflow/feature-flag-rollouts).

## Delete old experiments and flags

You can delete experiments and feature flags from your Amplitude portals with the steps below:

1. In the top right of your experiment,  select the three dots to open the more menu.
2. Choose *Deactivate flag* or *Archive* to archive the experiment.