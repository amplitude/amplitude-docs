---
id: 6aa1ef6b-eb50-4df6-a218-1133d4707624
blueprint: experiment
title: 'Feature and Web Experiment Functional Comparison'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1756412669
---
The following tables describe which Experiment functionality is available for Feature experimentation, Web experimentation, or both. For more information on the differences and use cases between Feature and Web Experiment, go to [Feature and Web Experiment Use Cases](/docs/feature-experiment/feature-vs-web-experimentation).

{{partial:collapse name="Planning"}}
|  |  |  |  |
| --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** |
| Client-side or Server-side implementation | ✅ | ❌ |
| Local or remote evaluation | ✅ | ✅  |
| **Stats Method** |  |   |
| Sequential | ✅  | ✅  |
| T-test | ✅ |  ✅ |
| Thompson Sampling (MAB) | ✅ |  ✅ |
| **Reduce chance of Error** |  |   |
| Bonferroni Correction | ✅ | ✅  |
| **Group Experiments** |  |   |
| Mutual Exclusion | ✅ |  ❌ | 
| Holdouts | ✅ | ❌  |
| % of audience to rollout| ✅ | ❌  |
| **Exposure Event Type** |   |     |
| Exposure Event | ✅ | ✅ |
| Custom Exposure | ✅ | ❌  |
| **Bucketing Salt** |  |   |
| Bucketing salt  |  ✅ | ✅ |

{{/partial:collapse}}


{{partial:collapse name="Creating experiments"}}
|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** |
| Name |  ✅ |  ✅ |
| Project |  ✅ |  ✅  |
| Template |  ✅  | ❌  |
| Recommended Settings |  ✅ |  ✅  |
| Link |  ✅ | ✅ |
| Tag |  ✅ | ✅  |
| Variants |  ✅ | ✅ |
| Payload | ✅ | ❌  |  
| **When to Run**|  |   |
| When to start | ✅  | ✅  |
| When to end | ✅  | ✅ |
| Traffic estimate, Control mean estimator, Power duration estimator for each day | ✅ | ✅ |
| OOTB web editor widgets | ❌ |  ✅ |
| Project-level user permissions | ✅ | ✅  |
| Notifications through Slack channel or webhook | ✅ | ✅  |

{{/partial:collapse}}

{{partial:collapse name="Experiment types"}}
|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** |
| A/B | ✅ | ✅ |
| Multi-Armed Bandit | ✅ | ✅ |

{{/partial:collapse}}

{{partial:collapse name="Metrics"}}
|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** |
| Primary Metric | ✅ | ✅ |
| Secondary Metric | ✅ | ✅ |
| Guardrail vs success | ✅ | ✅ |
| Direction | ✅ | ✅ |
| Minimum Detectable Effect | ✅ | ✅ |
| Winsorization | ✅ | ✅  |
| CUPED | ✅ | ✅  |
| Attribution | ✅ | ✅ |
| Window | ✅ | ✅ |

{{/partial:collapse}}

{{partial:collapse name="Targets"}}

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** |
| User or Behavioral Cohort | ✅ | ✅  |
| Stratified Sampling | ✅ | ✅ |
| Rollout | ✅  | ✅  |
| Sticky Bucketing | ✅ | ❌ |

{{/partial:collapse}}

{{partial:collapse name="QA"}}

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** |
| Deployment| ✅ | ✅ |
| Dependencies | ✅ |  ❌ |
| Testers | ✅ |  ❌ |

{{/partial:collapse}}

{{partial:collapse name="Analysis"}}

|  |  |  |  |  |
| --- | --- | --- | --- | --- |
| **Functionality** | **Feature** | **Web** |
| Assignment and Exposure charts| ✅ | ❌ |
| Variant Jumping | ✅ | ✅ |
| Anonymous Exposures | ✅  | ✅ |
| Exposures without Assignments | ✅ | ❌ |
| Rollout options | ✅  | ✅  |

{{/partial:collapse}}
