---
id: dc3957fe-c77b-49c2-b68e-1375330d5949
blueprint: experiment
title: 'Create a feature flag'
this_article_will_help_you:
  - 'Learn how to create a feature flag.'
landing: false
exclude_from_sitemap: false
updated_by: 13054dd3-3dcd-4d55-aaaf-13bb99388147
updated_at: 1740661648
---
If, on the other hand, you’re planning a phased feature rollout instead, your workflow is even simpler. Because you’re not asking a question about user behavior in your product, you don’t need to worry about creating a hypothesis, picking a metric, or analyzing your results. All you have to do is create a **feature flag**.

{{partial:admonition type='note'}}
Behind the scenes, experiments and flags are very similar, but the basic difference is this: An experiment helps you make sure you’re building the right thing for your business, while feature flags allow seamless feature releases and rollbacks. This is because an experiment has metrics and a feature flag does not, giving you greater flexibility to mess with controls without breaking anything.
{{/partial:admonition}}

Once you’ve configured your deployment, go straight to creating your variants. The basic idea, a new and different product experience that some users see but others do not—remains the same. But instead of exploring how different user segments react to different user experiences, you’ll be choosing which users get access to new features first. When working with feature flags, the variant represents code for a new feature that isn’t yet released to your entire user base.

You are allocating users to your variants as you would if you were running an experiment, and activating your flag is as simple as switching on your experiment.

Check out this article to [learn more about feature flags and how they work in Amplitude Experiment](/docs/feature-experiment/workflow/feature-flag-rollouts).