---
id: d002d2ad-3a7f-41f7-aec9-0df7db9fb90b
blueprint: experiment
title: 'Differences between Feature and Web Experimentation'
this_article_will_help_you:
  - 'Understand the differences between Feature and Web Experiment'
  - 'Understand what functionality is shared between Feature and Web Experiment'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1754343232
---
Feature experimentation is done through the use of feature flags. Flags are switches that let you modify your product's experience without having to change code. Use them to set up experiments in your product or to stage and roll out new features straight to your users. Your code uses the [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [REST API](/docs/apis/experiment) to communicate with Amplitude Experiment. For more information on feature flags, go to [Feature Flags](docs/feature-experiment/workflow/feature-flag-rollouts).

{{partial:admonition type='note'}}
Amplitude Experiment defaults to a **sequential testing** statistical model in all experiments, but you can opt for a [T-test](/docs/feature-experiment/experiment-theory/analyze-with-t-test) instead.
{{/partial:admonition}}

Web experimentation is done through a visual editor. This editor is recommended for A/B or multi-armed banded experimentation. With the visual editor, you can select and alter web elements such as directly altering content or element properties. Web experiment lets less technical users, or users with fewer permissions in your system, to create experiments without engineering resources. 

Web experiments use pages to control where your experiments variants apply on your website. This lets you scope experiments to specific URLs without affecting unrelated parts of your site.

### Functional Availability

The following tables describe which Experiment functionality is available for Feature experimentation, Web experimentation, or both: 

{{partial:collapse name="Planning"}}
|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** | **Both** |
| Client-side or Server-side implementation | X |  |  |
| Local or remote evaluation |  |   | X |
| **Stats Method** |  |   | X |
| Sequential |  |   | X |
| T-test |  |   | X |
| Bayesian |  |   | X |
| Thompson Sampling (MAB) |  |   | X |
| **Reduce chance of Error** |  |   | X |
| Bonferroni Correction |  |   | X |
| **Group Experiments** | X |   |   |
| Mutual Exclusion | X |   |   |   | 
| Holdouts | X |   |   |
| Rollout |   |   |   |
| % of audience to rollout| X |   |   |
| **Exposure Event Type** |   |   |   |
| Exposure Event | X |  |   |
| Custom Exposure | X |   |   |
| Proxy Exposure | X |  |   |
| **Bucketing Salt** |  |   |   |
| Bucketing salt  |  X |  |   |
{{/partial:collapse}}


{{partial:collapse name="Creating experiments"}}
|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** | **Both** |
| Name |  |  | X |
| Project |  |   | X |
| Template | X  |   |   |
| Recommended Settings |  |   | X |
| Link |  |   | X |
| Tag | X |   |   |
| Variants |  |   |  X |
| Payload |  X |   |  
| **When to Run**|  |   |   |
| When to start |   |   | X |
| When to end |   |   | X |
| Traffic estimate per day | X |  |   |
| Control mean estimator | X  |   |   |
| Power duration estimator | X |  |   |
{{/partial:collapse}}

This is an interrupting sentence to break apart the collapsed sections...

{{partial:collapse name="Experiment types"}}

| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** | **Both** |
| A/B |  |  | X |
| Multi-Armed Bandit |  |   | X |

{{/partial:collapse}}

{{partial:collapse name="Goals"}}

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** | **Both** |
| Primary Metric |  |  | X |
| Secondary Metric |  |   | X |
| Guardrail vs success |  |   | X |
| Direction |  |   | X |
| Minimum Detectable Effect | X |   |  |
| Windsorization |  |   | X |
| CUPED | X |   |  |
| Attribution | X |   |  |
| Window | X |   |  |

{{/partial:collapse}}

{{partial:collapse name="Targets"}}

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** | **Both** |
| User or Behavioral Cohort |  |  | X |
| Stratified Sampling |  |   | X |
| Rollout |   |   | X |
| Sticky Bucketing |  |   | X |

{{/partial:collapse}}

{{partial:collapse name="QA"}}

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** | **Both** |
| Deployment|  |  | X |
| Dependencies | X |   |  |
| Testers | X  |   |   |
| Sticky Bucketing |  |   | X |

{{/partial:collapse}}

{{partial:collapse name="Analysis"}}

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** | **Both** |
| Assignment and Exposure charts|  |  | X |
| Variant Jumping |  |   | X |
| Anonymous Exposures |   |   |  X |
| Exposures without Assignments |  |   | X |
| Rollout options |   |   | X |

{{/partial:collapse}}

