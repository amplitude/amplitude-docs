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
| Exposure Event | ✅ | ❌ |
| Custom Exposure | ✅ | ❌  |
| Proxy Exposure | ✅ | ❌ |
| **Bucketing Salt** |  |   |
| Bucketing salt  |  ✅ | ❌ |

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
| OOTB web editor widgets |   |  X |  | 
| Project-level user permissions |  |   | X |
| Notifications through Slack channel or webhook |  |   | X |

{{/partial:collapse}}

{{partial:collapse name="Experiment types"}}
|  |  |  |  |  |
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