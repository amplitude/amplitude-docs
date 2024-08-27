---
id: 21a670fe-6939-4c52-919c-ff495b3109f3
blueprint: experiment
title: 'Cohort Targeting'
landing: false
exclude_from_sitemap: false
updated_by: c0ecd457-5b72-4dc9-b683-18a736413d32
updated_at: 1723477635
---

A cohort is a static or dynamic set of users defined in Amplitude. For experiment use cases, cohorts are particularly useful for advanced audience targeting. That said, cohorts are not always the best solution for targeting, so understanding how cohort targeting works with [local](./local-evaluation.md) vs [remote](./remote-evaluation.md) evaluation is important.

Experiment cohort targeting currently only supports targeting **user** cohorts.

## Remote evaluation

When you target a cohort in a remote evaluation flag, the cohort is automatically synced to the *Amplitude Experiment* destination. For dynamic cohorts, this sync runs hourly by default. This means that dynamic cohorts targeted in remote evaluation are **not real-time**. For example, if you target a cohort of users who performed a `Sign Up` event, users will be targeted within an hour of performing the event--not immediately after.

Cohorts targeted for remote evaluation may have a propagation delay on the initial sync or large change depending on the size of the difference. E.g. syncing a cohort of 10 million users for the first time will take some time to initially sync fully.

**Use remote evaluation cohort targeting if...**

- You are targeting users based on user behavior or properties which are not available in Experiment targeting segments.
- You are ok with some targeting delay introduced by cohort sync intervals.

**Don't use remote evaluation cohort targeting if...**

- Users must be targeted in real-time.

## Local evaluation

Local evaluation flags and experiment that are deployed to up-to-date server-side SDKs can also target cohorts. When you target a cohort in a local evaluation flag, the cohort is automatically synced to the *Experiment Local Evaluation* destination. For dynamic cohorts, this sync runs hourly by default. This means that dynamic cohorts targeted in local evaluation are **not real-time**. For example, if you target a cohort of users who performed a `Sign Up` event, users will be targeted within an hour of performing the event--not immediately after.

{{partial:admonition type="note" heading="Cohorts only support User IDs"}}
Local evaluation cohorts currently only sync **User IDs** to the SDKs. This means that in order to target cohorts in local evaluation flags, you **must** include a User ID in the user object passed to the evaluate function.
{{/partial:admonition}}

### SDK Support

Server-side SDKs can target cohorts if configured to do so. Client-side SDKs do not currently support local evaluation cohort targeting.

On initialization, configure the cohort sync configuration with the project API and Secret key to enable local evaluation
cohort downloading and targeting.

| SDK | Cohort Targeting | Version |
| --- | :---: | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) |  ✅ | `1.10.0+`  |
| [Ruby](/docs/sdks/experiment-sdks/experiment-ruby) |  ✅ | `1.5.0+` |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) |  ✅ | `1.4.0+` |
| [Go](/docs/sdks/experiment-sdks/experiment-go) |  ✅ | `1.7.0+` |
| [Python](/docs/sdks/experiment-sdks/experiment-python) |  ✅ | `1.4.0+` |
| [PHP](/docs/sdks/experiment-sdks/experiment-php) | ❌  | N/A |

{{partial:tabs tabs="Node.js, Java, Golang, Python, Ruby"}}
{{partial:tab name="Node.js"}}

```js
const experiment = Experiment.initializeLocal('DEPLOYMENT_KEY', {
  // (Recommended) Enable local evaluation cohort targeting.
  cohortSyncConfig: {
    apiKey: 'API_KEY',
    secretKey: 'SECRET_KEY'
  }
});
```

{{/partial:tab}}
{{partial:tab name="Java"}}

```java
// (1) Initialize the local evaluation client with a server deployment key.
LocalEvaluationClient experiment = Experiment.initializeLocal("<DEPLOYMENT_KEY>",
    // (Recommended) Enable local evaluation cohort targeting.
    LocalEvaluationConfig.builder()
        .cohortSyncConfig(new CohortSyncConfig("<API_KEY>", "<SECRET_KEY>"))
        .build());
```

{{/partial:tab}}
{{partial:tab name="Golang"}}

```go
client := local.Initialize("DEPLOYMENT_KEY", &local.Config{
  // (Recommended) Enable local evaluation cohort targeting.
  CohortSyncConfig: &local.CohortSyncConfig {
    ApiKey: "API_KEY",
    SecretKey: "SECRET_KEY"
  }
})
```

{{/partial:tab}}
{{partial:tab name="Python"}}

```python
experiment = Experiment.initialize_local("DEPLOYMENT_KEY", LocalEvaluationConfig(
  # (Recommended) Enable local evaluation cohort targeting.
  cohort_sync_config=CohortSyncConfig(api_key="API_KEY", secret_key="SECRET_KEY")
))
```

{{/partial:tab}}
{{partial:tab name="Ruby"}}

```ruby
experiment = AmplitudeExperiment.initialize_local('DEPLOYMENT_KEY',
  # (Recommended) Enable local evaluation cohort targeting.
  AmplitudeExperiment::LocalEvaluationConfig.new(
    cohort_sync_config: AmplitudeExperiment::CohortSyncConfig.new(
      api_key: 'API_KEY',
      secret_key: 'SECRET_KEY'
    )
  )
)
```

{{/partial:tab}}
{{/partial:tabs}}

## Troubleshooting

Troubleshooting cohort targeting can challenging due to the asynchronous nature of dynamic cohorts and cohort syncs in general. If you find that users that should be in the targeted cohort are not being targeted...

- For local evaluation, check that the SDK version supports local evaluation cohort targeting, and that **the cohort sync config has been set on initialization**.
- Check that **the cohort has the required sync** (*Amplitude Experiment* for remote evaluation, *Experiment Local Evaluation* for local evaluation).
- Check that **the cohort contains the expected user**. If the user is contained in the current cohort, check the sync history of the cohort -- is it possible that the user was added to the cohort in a sync after the evaluation occurred?
- Check that the **user info** passed to `fetch`/`evaluate` is correct.
