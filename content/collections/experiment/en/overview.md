---
id: 8bfbe6f6-89ae-4878-abfe-89bcc113cddf
blueprint: experiment
title: 'Amplitude Experiment overview'
landing: true
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1740528000
landing_blurb: 'Understand how Amplitude Experiment works and choose the right integration path for your application.'
academy_course:
  - efd79a40-83e3-4c3d-a343-c0f81a41cdab
---
Amplitude Experiment is a feature flagging and A/B testing platform that lets you safely ship and test code changes in production. Your application calls the Experiment SDK or API, and Experiment determines — in real time — which variant each user sees.

Experiment integrates natively with Amplitude Analytics, so the same user data that drives your analytics charts also drives your experiment targeting and results.

## How it works

At its core, Experiment is an evaluation engine. Your code asks "which variant should this user see?" and Experiment answers based on your flag configuration and targeting rules.

The flow looks like this:

1. Your app initializes the SDK with a deployment key.
2. The SDK fetches flag configurations from Amplitude (or evaluates locally).
3. On each `variant()` call, the SDK evaluates the user against your targeting rules.
4. Experiment returns a variant value — for example, `"control"`, `"treatment"`, or any custom string you define.
5. If you use Amplitude Analytics, the SDK automatically sends an exposure event so your results appear in the analysis view.

## Choose your integration path

Experiment supports three modes. Choose based on what you're building:

| Mode | What it is | Best for | Evaluation |
| --- | --- | --- | --- |
| **Feature flags** | Boolean or multivariate switches in your code | Gradual rollouts, beta access, kill switches | Local (sub-ms) or Remote |
| **Feature experiments** | A/B tests with statistical analysis | Testing hypotheses, measuring impact on metrics | Local or Remote |
| **Web experiments** | Visual editor for no-code website changes | Marketing pages, content tests, non-engineers | Browser (local) |

{{partial:admonition type='tip' heading="Not sure which to use?"}}
- Use **feature flags** when you want to control code behavior without measuring statistical impact.
- Use **feature experiments** when you have a hypothesis and want to measure impact on a metric.
- Use **web experiments** when you want to change website content without touching code.

See [Flags vs. experiments](/docs/feature-experiment/flags-vs-experiments) for a full comparison.
{{/partial:admonition}}

## Get started in 5 minutes

Install the SDK for your platform, initialize it with your deployment key, and check your first flag variant.

{{partial:tabs tabs="Client-side, Server-side"}}
{{partial:tab name="Client-side"}}
| Platform | Package |
| --- | --- |
| **JavaScript / Browser** | `npm install @amplitude/experiment-js-client` |
| **iOS** | Swift Package Manager or CocoaPods |
| **Android** | `implementation 'com.amplitude:experiment-android:+'` |
| **React Native** | `npm install @amplitude/experiment-react-native-client` |
| **Flutter** | `amplitude_experiment: ^x.x.x` |
{{/partial:tab}}
{{partial:tab name="Server-side"}}
| Platform | Package |
| --- | --- |
| **Node.js** | `npm install @amplitude/experiment-node-js` |
| **Python** | `pip install amplitude-experiment` |
| **Go** | `go get github.com/amplitude/experiment-go-server` |
| **Java / JVM** | `implementation 'com.amplitude:experiment-jvm-server:+'` |
| **Ruby** | `gem install amplitude-experiment` |
| **PHP** | `composer require amplitude/experiment-php` |
{{/partial:tab}}
{{/partial:tabs}}

→ Go to the [Quickstart](/docs/feature-experiment/experiment-quick-start) for step-by-step instructions.

## What you'll need

- An Amplitude account with Experiment enabled.
- A deployment key — find this at *Experiments > Deployments* in the Amplitude UI.
- Developer access to the application you're integrating.

## Next steps

- [Quickstart](/docs/feature-experiment/experiment-quick-start) — get a flag working in 5 minutes.
- [Core concepts](/docs/feature-experiment/data-model) — understand how flags, experiments, and deployments relate.
- [Flags vs. experiments](/docs/feature-experiment/flags-vs-experiments) — when to use each.
- [Local vs. remote evaluation](/docs/feature-experiment/local-evaluation) — understand the performance and targeting trade-offs.
- [SDK reference](/docs/sdks/experiment-sdks) — full API documentation for your platform.
