---
id: c4f3a8b2-1d5e-4f9a-b6c7-8d2e1f3a4b5c
blueprint: experiment
title: 'Flags vs. experiments'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1740528000
---
Amplitude Experiment has two object types: flags and experiments. They share the same underlying data model — but serve different purposes.

**Use a flag when you want to control what users see. Use an experiment when you want to measure the impact of what users see.**

## Feature flags

A feature flag is a switch in your code. It evaluates to a variant value — by default `on` or `off`, but you can define any values you want. Your code reads that value and branches accordingly.

```typescript
const variant = experiment.variant('dark-mode');

if (variant.value === 'on') {
  enableDarkMode();
}
```

Common flag use cases:

- Gradually roll out a new feature to 10% → 50% → 100% of users.
- Gate beta features behind a specific cohort or user segment.
- Create a kill switch to instantly disable a feature in production without a deploy.
- Serve different configurations per environment (dev, staging, prod).

Flags don't include built-in statistical analysis. They're about control, not measurement.

## Feature experiments

An experiment is a flag with a hypothesis and metrics attached. When you create an experiment, Amplitude adds a statistical analysis layer that tracks exposure events, runs significance tests, and tells you whether your change had a measurable impact.

```typescript
// The SDK call is identical — only the Amplitude UI changes
const variant = experiment.variant('checkout-cta-text');

if (variant.value === 'control') {
  showCTA('Buy now');
} else if (variant.value === 'treatment') {
  showCTA('Get started free');
}
```

Common experiment use cases:

- A/B test a new onboarding flow against your current flow.
- Compare two recommendation algorithms by measuring downstream retention.
- Test a pricing page redesign against a revenue metric.
- Run an A/A test to verify your instrumentation is working correctly.

## How they relate

Flags and experiments share the same data model. You can convert a flag to an experiment at any time — and back again. The evaluation code in your application doesn't change. Only the Amplitude UI changes to add analysis tools.

| | Flag | Experiment |
| --- | --- | --- |
| Serves variants to users | ✅ | ✅ |
| Targeting rules | ✅ | ✅ |
| Local evaluation support | ✅ | ✅ |
| JSON payloads | ✅ | ✅ |
| Metrics and goals | ❌ | ✅ |
| Statistical significance | ❌ | ✅ |
| Experiment analysis view | ❌ | ✅ |
| Holdout groups | ❌ | ✅ |
| Mutual exclusion groups | ❌ | ✅ |

## Which should I use?

| Scenario | Use |
| --- | --- |
| Rolling out a new feature with gradual traffic increase | Flag |
| Kill switch for a risky deployment | Flag |
| Environment-specific configuration | Flag |
| Showing a beta feature to specific users | Flag |
| Testing if a new design improves conversion | Experiment |
| Comparing algorithm A vs. B by measuring retention | Experiment |
| Validating that a refactor doesn't regress key metrics | Experiment |
| Running an A/A test to verify instrumentation | Experiment |

{{partial:admonition type='tip' heading="When in doubt, start with a flag"}}
You can always convert a flag to an experiment later. Starting with a flag gives you rollout control immediately, and you can add the statistical analysis layer when you're ready to measure impact.
{{/partial:admonition}}
