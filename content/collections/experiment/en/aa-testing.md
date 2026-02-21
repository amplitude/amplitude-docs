---
id: f2ec214a-e983-47f1-bf4f-7656427b8b14
blueprint: experiment
title: 'Run an A/A test'
this_article_will_help_you:
  - 'Validate your experimentation setup with an A/A test'
  - 'Interpret A/A test results and troubleshoot issues'
landing: false
exclude_from_sitemap: false
---
A/A testing is a quality assurance technique where you run an experiment with two identical variations to validate your experimentation setup. Unlike A/B testing, where you compare different experiences, an A/A test splits traffic between two groups that receive the exact same experience.

## Why run A/A tests

A/A tests help you verify that your experimentation infrastructure works correctly before you run real experiments. They're particularly valuable when:

- **Setting up experimentation for the first time.** Validate that your SDK integration, traffic allocation, and metric tracking function properly.
- **Implementing new metrics.** Confirm that new success metrics behave as expected and don't show false positives.
- **Diagnosing unexpected results.** Rule out implementation issues when an A/B test shows surprising outcomes.
- **Testing at scale.** Verify that your randomization works correctly across large traffic volumes.

## Common issues an A/A test detects

A/A tests can reveal several implementation problems:

- **Improper randomization.** The system doesn't evenly distribute users between variants, which creates [sample ratio mismatches](/docs/feature-experiment/troubleshooting/sample-ratio-mismatch), or users jump between variants and see different experiences across sessions or page loads. For more on causes and fixes, refer to [Variant jumping](/docs/feature-experiment/troubleshooting/variant-jumping).
- **Tracking inconsistencies.** Events fire differently between variants because of timing issues or conditional logic errors.
- **Sample pollution.** Pre-exposure bias occurs when users see content before the system properly allocates them to a variant.
- **Statistical configuration.** Incorrect significance thresholds or multiple testing without proper correction.

## When to run A/A tests

A/A tests are diagnostic tools, not routine practice. Run them strategically when you need to validate your setup.

### Good reasons to run an A/A test

- **Initial setup.** First time implementing Amplitude Experiment—verify everything works correctly.
- **Major infrastructure changes.** After you update your SDK version, change tracking implementation, or migrate to a new platform.
- **Troubleshooting unexpected results.** An A/B test shows surprising outcomes and you suspect technical issues rather than real user behavior differences.
- **New team members.** When you onboard engineers to experimentation, an A/A test provides hands-on validation of the implementation.

### Don't run A/A tests for

- Routine experiments when you've already validated your setup.
- Every single new experiment—this wastes traffic and delays real insights.
- "Just to be safe" without a specific concern.

## Run an A/A test in Web Experiment

### Custom code approach

1. Create a new experiment in Web Experiment.
2. Set up two variants (control and treatment) with a 50/50 traffic split.
3. In both variants, apply identical changes:
   - **Option 1:** Add a `console.log` statement through custom code: `console.log('A/A test variant');`.
   - **Option 2:** Insert an HTML comment that doesn't affect the user experience: `<!-- A/A test -->`.
4. Configure your success metrics (the conversion events you want to validate).
5. Run the experiment for at least one full business cycle.
6. Analyze results to confirm no significant differences between variants.

### Visual Editor approach

1. Create a new experiment in Web Experiment.
2. Set up two variants (control and treatment) with a 50/50 traffic split.
3. For each variant, open the Visual Editor:
   1. Select the variant to open the Visual Editor on your site.
   2. Use the element selector to select any element on the page (for example, a header, button, or div).
   3. Select **More**, then find the element selector field in the right panel.
   4. Change the selector to an invalid one that doesn't match anything on your page (for example, `#nonexistent-element-aa-test`).
4. Configure your success metrics (the conversion events you want to validate).
5. Run the experiment for at least one full business cycle.
6. Analyze results to confirm no significant differences between variants.

This ensures the experiment loads and tracks properly without changing anything visible to users.

## Run an A/A test in Feature Experiment

1. Create a new flag-based experiment with two variants.
2. Ensure both variants return the same feature flag value or configuration.
3. Implement the flag in your code, but keep the experience identical regardless of variant.
4. Track the same conversion events for both groups.
5. Monitor the experiment dashboard for several days to validate proper traffic distribution and metric tracking.

## Interpret your A/A test results

Expect random variation in A/A tests—it's normal. The key indicator of a healthy A/A test is statistical significance.

### Successful A/A test

No statistically significant difference between variants, the system splits traffic evenly, and metrics are comparable. You can proceed with confidence to run real A/B tests.

### Failed A/A test

Any statistically significant result indicates a potential implementation issue that needs investigation. If you see significant differences, check:

- Your traffic allocation percentages in the experiment dashboard.
- Event tracking implementation for conditional logic that might affect variants differently.
- That the experiment fires before any page content that might influence results.
- That Amplitude calculates your metrics consistently across both variants.

## Best practices

- **Run A/A tests during representative traffic periods.** Avoid holidays or unusual traffic patterns that might skew results.
- **Use the same sample size you'd use for real experiments.** This validates your statistical power calculations.
- **Test your most important metrics.** Focus on the conversion events that matter most to your business.
- **Document your setup.** A/A tests serve as baseline validation you can reference when you troubleshoot future experiments.
- **Don't over-interpret noise.** Expect random variation. Focus on statistical significance rather than the size of percentage differences between variants.
- **Expect some variant jumping.** A small percentage of users may see different variants across sessions. This is normal and shouldn't cause statistically significant differences in a properly configured test.

## When to skip A/A tests

While A/A tests are valuable validation tools, you don't need to run them for every experiment. Skip A/A tests when:

- You have a mature experimentation program with proven infrastructure.
- You're running similar experiments to ones you've validated before.
- Your last A/A test was recent and showed clean results.
- Time-to-insight is critical and you have high confidence in your setup.

If you see unexpected results in your A/B tests or make significant changes to your implementation, an A/A test can quickly rule out technical issues and save time debugging.
