---
id: 08a5b636-77d0-4671-bf40-3c42444400da
blueprint: web_experiment
title: 'Post-experiment steps'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1745618874
---
Running web experiments through Amplitude Experiment helps test hypotheses, validate ideas, and drive data-informed product decisions. However, after you have a clearly winning variant, Amplitude recommends moving the winning variant to your production code base rather than keeping the experiment live with 100% traffic allocation to the winning variant.

## When the experiment concludes

When you reach a point with your experiment where you want to end and decide a winner:

1. **Analyze the results and confirm a winner**. Ensure the experiment reached statistical significance and that the winning variant aligns with business goals.
2. **Implement the winner in code**. Work with your engineering team to replicate the winning experience in your production code base. For more information, go to [Benefits to migrating your winning variant](#benefits-to-migrating-your-winning-variant).
3. **Deactivate or archive the experiment in Amplitude**. Disable the experiment to remove unnecessary logic and prevent accidental reactivation or analysis confusion.
4. **Document the outcome**. Capture experiment details like the goal, key learning, decision made, and implementation follow up in an internal knowledge base.

### Activate a feature flag

If your change requires the ability to rollback or an incremental rollout, use a feature flag. Feature flags enable ongoing control, without the overhead required to support experiment logic and metadata.

## Benefits to migrating your winning variant

Moving your winning variant to your production code base provides the following benefits:

- **Performance and user experience**: If you continue to run web experiments at 100%, you add avoidable client-side overhead to your pages. This increases page load execution time and can negatively impact performance, especially at scale. For more information about how Amplitude optimizes for performance, go to  [Web Experiment Performance](/docs/web-experiment/performance).
- **Technical debt**: Long running experiments can add clutter to dashboards and experiment environments. Leaving them active after a decision causes unnecessary configuration overhead, and increases the risk of user-facing errors.
- **Platform cost and impression volume**: Every time a client evaluates an experiment, it counts toward your monthly impression volume in Experiment. When you run a test at 100%, even when it no longer provides learning, the experiment still evaluates on each page load. Over time, this increases your costs and creates budgeting inefficiencies.



