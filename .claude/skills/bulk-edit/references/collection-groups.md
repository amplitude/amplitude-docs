# Collection Groups

This file maps every documentation collection to its persona group. The bulk-edit Coordinator reads this file to build the work queue for any target.

To reassign a collection to a different group, update this file. The skill logic reads it dynamically — no code changes are required.

## Group assignments

| Collection | Group | ~Files |
|---|---|---|
| `browser_sdk` | `developers` | 16 |
| `ios_sdk` | `developers` | 8 |
| `android_sdk` | `developers` | 8 |
| `flutter_sdk` | `developers` | 5 |
| `react_native_sdk` | `developers` | 5 |
| `go_sdk` | `developers` | 3 |
| `java_sdk` | `developers` | 3 |
| `python_sdk` | `developers` | 3 |
| `node_js_sdk` | `developers` | 5 |
| `unity_sdk` | `developers` | 3 |
| `unreal_sdk` | `developers` | 3 |
| `sdk-catalog` | `developers` | 4 |
| `instrumentation` | `developers` | 8 |
| `ampli` | `developers` | 4 |
| `framework_integrations` | `developers` | 6 |
| `api` | `api-users` | 12 |
| `apis` | `api-users` | 6 |
| `experiment-apis` | `api-users` | 12 |
| `guides_and_surveys_api` | `api-users` | 10 |
| `data` | `data-engineers` | 18 |
| `cdp` | `data-engineers` | 14 |
| `sources` | `data-engineers` | 22 |
| `destination-catalog` | `data-engineers` | 128 |
| `source-catalog` | `data-engineers` | 68 |
| `warehouse_native_amplitude` | `data-engineers` | 20 |
| `pii_integrations` | `data-engineers` | 8 |
| `audiences` | `data-engineers` | 7 |
| `analytics` | `analysts-pms` | 18 |
| `charts` | `analysts-pms` | 6 |
| `event-segmentation` | `analysts-pms` | 12 |
| `funnel-analysis` | `analysts-pms` | 10 |
| `lifecycle` | `analysts-pms` | 6 |
| `retention-analysis` | `analysts-pms` | 8 |
| `stickiness` | `analysts-pms` | 6 |
| `revenue-ltv` | `analysts-pms` | 6 |
| `data-tables` | `analysts-pms` | 6 |
| `other-charts` | `analysts-pms` | 10 |
| `legacy-charts` | `analysts-pms` | 8 |
| `impact-analysis` | `analysts-pms` | 6 |
| `engagement-matrix` | `analysts-pms` | 4 |
| `journeys` | `analysts-pms` | 8 |
| `user-sessions` | `analysts-pms` | 6 |
| `compass` | `analysts-pms` | 6 |
| `personas` | `analysts-pms` | 6 |
| `property_sets` | `analysts-pms` | 8 |
| `experiment` | `experimenters` | 14 |
| `experiment-results` | `experimenters` | 10 |
| `experiment-sdks` | `experimenters` | 8 |
| `experiment-theory` | `experimenters` | 6 |
| `experiment_integrations` | `experimenters` | 8 |
| `experiment_troubleshooting` | `experimenters` | 4 |
| `web_experiment` | `experimenters` | 4 |
| `guides_and_surveys` | `engagement-survey-authors` | 58 |
| `agents` | `engagement-survey-authors` | 9 |
| `admin` | `admins-it` | 14 |
| `account-management` | `admins-it` | 18 |
| `rbac_permissions` | `admins-it` | 46 |
| `billing-use` | `admins-it` | 5 |
| `single-sign-on` | `admins-it` | 8 |
| `partners` | `admins-it` | 8 |
| `get-started` | `general-onboarding` | 12 |
| `session-replay` | `general-onboarding` | 34 |
| `faq_and_troubleshooting` | `general-onboarding` | 16 |
| `migration` | `general-onboarding` | 14 |
| `advanced-techniques` | `general-onboarding` | 16 |
| `under-the-hood` | `general-onboarding` | 10 |
| `glossary_events` | `general-onboarding` | 48 |
| `glossary_properties` | `general-onboarding` | 94 |
| `pages` | `general-onboarding` | 36 |

## Excluded collections (not processed)

| Collection | Reason |
|---|---|
| `japanese_translation` | Non-English content |
| `sections` | Structural navigation pages — minimal editable prose |
| `workflow` | Internal workflow templates |
| `academy_content` | Managed by a separate team |

## Summary by group

| Group | Collections | ~Files | Branch |
|---|---|---|---|
| `developers` | 15 | 75 | `bulk-edit/developers` |
| `api-users` | 4 | 40 | `bulk-edit/api-users` |
| `data-engineers` | 8 | 285 | `bulk-edit/data-engineers` |
| `analysts-pms` | 19 | 144 | `bulk-edit/analysts-pms` |
| `experimenters` | 7 | 54 | `bulk-edit/experimenters` |
| `engagement-survey-authors` | 2 | 67 | `bulk-edit/engagement-survey-authors` |
| `admins-it` | 6 | 99 | `bulk-edit/admins-it` |
| `general-onboarding` | 9 | 280 | `bulk-edit/general-onboarding` |
| **Total in scope** | **70** | **~1,044** | |

## Navigation tree files by group

These `content/trees/navigation/en/` files correspond to each group. The Taxonomy & Navigation agent reads these to update section labels.

| Group | Navigation tree files |
|---|---|
| `developers` | `browser_sdk.yaml`, `android_sdk.yaml`, `flutter_sdk.yaml`, `node_js_sdk.yaml`, `node_sdk.yaml`, `analytics_sdks.yaml`, `developers.yaml` |
| `api-users` | `apis.yaml` |
| `data-engineers` | `data.yaml`, `cdp.yaml`, `destination_catalog.yaml`, `source_catalog.yaml` |
| `analysts-pms` | `analytics.yaml`, `charts.yaml` |
| `experimenters` | `experiment.yaml`, `experiment_sdks.yaml`, `web_experiment.yaml` |
| `engagement-survey-authors` | `guides_and_surveys.yaml`, `agents.yaml` |
| `admins-it` | `admin.yaml` |
| `general-onboarding` | `get_started.yaml`, `session_replay.yaml`, `faq.yaml`, `sc.yaml` |
