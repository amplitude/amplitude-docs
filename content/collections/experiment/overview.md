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
updated_at: 1717539472
sourxe: 'https://help.amplitude.com/hc/en-us/articles/360061270232-Amplitude-Experiment-overview-Optimize-your-product-experience-through-A-B-testing'
landing_blurb: 'Learn the value of experimentation in your product.'
---
For decades, product teams have relied on **experimentation** as a way to prioritize and implement product adjustments. But it’s never been easy. Because of that, these experiments often just tweak peripheral issues around the margins, instead of driving the big-picture changes that optimize the overall product experience. 

Amplitude Experiment is a workflow-driven behavioral experimentation platform that actually **accelerates your roadmaps**, letting you focus on making better decisions and building better products.

With Experiment, you can easily **modify and configure product experiences** for unique audiences through:

* **Product experimentation**: Improve key KPIs by **running experiments and A/B tests** to onboard new users, reduce friction for checkout experiences, roll out new features, and more.
* **Progressive feature delivery:** Pre-plan and **stage new features** for beta testers, a percentage of your users, or even specific target audiences.
* **Dynamic in-product experiences:** Deploy and adapt **custom experiences** at scale.

Amplitude Experiment enables all this through **flags**—easy-to-set up switches that let you modify your product's experience without having to change code. Use them to set up experiments in your product, or to stage and roll out new features straight to your users. Your code uses the [Amplitude Experiment SDK](https://www.docs.developers.amplitude.com/experiment/#sdks) or [REST API](https://www.docs.developers.amplitude.com/experiment/#rest-apis) to communicate with Amplitude Experiment.

{{partial:admonition type='note'}}
Amplitude Experiment defaults to a **sequential testing** statistical model in all experiments, but you can opt for a [T-test](/experiment/experiment-theory/analyze-with-t-test) instead.
{{/partial:admonition}}

This article will provide a high-level overview of the Amplitude Experiment workflow: we’ll start with the workflow for **creating an experiment**, and follow that with the workflow for **creating a feature flag**.

## Creating an experiment: an overview

Many experimentation programs fail in the first step of the process—nobody can **articulate the problem** experimentation is supposed to solve. If you can’t explain—in clear, simple language—why you’re running an experiment, you can’t realistically hope to learn anything useful from it. 

Before doing anything else, spend some time coming up with a strong mission statement for your experiment. It should, at the very least, answer these two questions: What’s the problem, and how can running an experiment help you solve it? The effort you put in at this stage will pay big dividends later.

Once you’ve done that, you’re ready to **configure your experiment**. This means creating a new deployment (or choosing one you’ve created earlier) for the experiment, and installing the SDK you’ll be using.

### Create a hypothesis

Next, reach back to the mission statement you came up with for your experiment. This will serve as the foundation for your experiment’s **hypothesis**. What’s a hypothesis? Think of it as a prediction of how your experiment is likely to turn out. This is how you’ll know if your experiment succeeds or fails.

But this **problem** statement is only the first part of a hypothesis. There are two others: a proposed **solution**, and a predicted **result**. The first is essentially a description of the changes you want to make to fix your problem—for example, consolidate two steps of the onboarding process into one—while the second is what you expect the results to be: i.e., “decrease onboarding churn by 20%.”

Here’s an example of a hypothesis statement:

“User churn in our onboarding funnel is significantly higher than industry average. Product data suggests our funnel may be too confusing; we believe this can be fixed by consolidating steps two and three in the funnel. As a result of this change, we expect onboarding churn to decrease by 20%.”

The hypothesis statements you use will be different, particularly around the problem definition stage. For example, your question may be more exploratory in nature—i.e., "why are so many users dropping out of our onboarding funnel?"—or you may be more interested in testing different solutions to a problem you already understand ("we've come up with several potential UI changes to rectify a known user pain point; which one works best?"). Still, this basic template is a good one to follow, especially if you’re new to experimentation.

### Pick a metric

Take a look at the last sentence in that hypothesis statement. What do you notice about it? For one thing, it includes a specific measurement of how you expect user behavior to change—onboarding churn will decrease by 20%. This is what will determine whether your experiment is a success: either you’ll hit this number, or you won’t.

But how will you know? You need a way to measure that decrease in churn. To do that, you’ll need a **metric**. In Amplitude Experiment, any event you log in Amplitude Analytics can serve as an experiment metric. For the example experiment described above, you’d want to use the event your product uses to track drop-off in your funnels as your metric. 

### Create a variant

At this point, you *could* go ahead and just roll out the new onboarding process to all your users and see what happens. But if you were to do that, you won’t know if the product changes you made were responsible for any improvement in your onboarding churn rate. And what if that rate gets *worse* after you roll out the new funnel? It could be the result of poor design choices, random chance, or some external influence you didn’t consider—but you’ll never know for sure. 

This is why you’ll need to create at least one **treatment** **variant** for your experiment. A treatment variant is simply a different user experience that you’ll show to a percentage of your users. Keeping with the example we’ve been using, the variant here would be the new, streamlined version of the onboarding process. Some of your users will see that, while others will see the current process instead (known as the **control**). It’s the differences in how your users respond to each variant that will determine the experiment’s success.

When coming up with variants, it’s good practice to keep the number of changes in each one low (if you can get that number down to one, so much the better). It’s also good to make sure the variants are noticeably different from each other. This way, you can be confident that users in each variant segment are truly experiencing the product differently from each other, and that your changes are what’s driving any differences in behavior between the segments.

### Decide who will see the variant

Next you'll be able to decipher a bucketing unit, or the determinant of what group of people sees the same variant. The most common bucketing unit is “user”. However, if you’re a B2B business or are utilizing the collaboration feature, you might want to use a bucketing unit such as “organization” or company\_id, which means that every user within the same organization will see the same variant. This can help reduce product-related confusion caused by disparate user interfaces if people are sitting next to their coworkers. Another reason for bucketing by company\_id is to reduce the load on your customer support team. It is easier for the customer support team to know which accounts have which features enabled. Either way, you want to make sure the Stable Unit Treatment Value Assumption ([SUTVA](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him)) holds for whatever bucketing unit you choose to best ensure inference. 

{{partial:admonition type='note'}}
 If your organization has purchased the [Accounts add-on,](/analytics/account-level-reporting) you may perform bucketing and analysis on groups rather than users.
{{/partial:admonition}}

### Allocate users

Now that you’ve got your variants, you’ll need to decide how many of your users will see them. You can choose to roll your experiment out to your entire user base, or you can just roll it out to a fraction of them instead. You’ll specify how many users in your experiment will see the control experience and how many will see your variants. You can define specific user segments to include or exclude from your experiment, and you can even choose a specific experience for individual user or device IDs.

### Activate your experiment

At this point, you’re ready to roll out your experiment to your users. Click *Start Experiment*, and your experiment will be live.

### Analyze your results

After your experiment goes live, you can generate and view your results at any time. Experiment will tell you when your experiment has reached **statistical significance**, and it gives you all the data you need to analyze and interpret your results, and to apply those learnings to your product experience going forward.

To learn more about how to design, roll out, and learn from experiments, check out our [articles on the experimentation workflow](/experiment/workflow/create).

{{partial:admonition type='note'}}
 Now that you better understand the experiment workflow, consider using experiment briefs to better communicate and streamline your experimentation processes amongst your team. They can also help to create transparency and align experimentation goals. [Read more about experiment briefs and how to use them in this blog](https://amplitude.com/blog/experiment-brief).
{{/partial:admonition}}

## Creating a feature flag: an overview

If, on the other hand, you’re planning a phased feature rollout instead, your workflow is even simpler. Because you’re not asking a question about user behavior in your product, you don’t need to worry about creating a hypothesis, picking a metric, or analyzing your results. All you have to do is create a **feature flag**.

{{partial:admonition type='note'}}
Behind the scenes, experiments and flags are very similar, but the basic difference is this: An experiment helps you make sure you’re building the right thing for your business, while feature flags allow seamless feature releases and rollbacks. This is because an experiment has metrics and a feature flag does not, giving you greater flexibility to mess with controls without breaking anything.
{{/partial:admonition}}

Once you’ve configured your deployment, go straight to creating your variants. The basic idea—i.e., a new and different product experience that some users see but others do not—remains the same. But instead of exploring how different user segments react to different user experiences, you’ll be choosing which users get access to new features first. When working with feature flags, the variant represents code for a new feature that isn’t yet released to your entire user base.

You’ll still allocate users to your variants as you would if you were running an experiment, and activating your flag is as simple as switching on your experiment.

Check out this article to [learn more about feature flags and how they work in Amplitude Experiment](/experiment/workflow/feature-flag-rollouts).

## Delete old experiments and flags

Deleting experiments and feature flags you no longer need is simple. You'll find both options from the "more" menu in the top right of your experiment. Click the three dots to open the menu and choose either *Deactivate flag* or, if you'd prefer to archive the experiment, *Archive*.