# Collection Routes Reference

Use this table to map a product area to the correct collection folder and web route pattern.

## Collection Mapping

| Product Area | Collection Folder | Web Route Pattern |
|---|---|---|
| Analytics (general) | `analytics` | `/docs/analytics/{slug}` |
| Event Segmentation | `event-segmentation` | `/docs/analytics/charts/event-segmentation/{slug}` |
| Funnel Analysis | `funnel-analysis` | `/docs/analytics/charts/funnel-analysis/{slug}` |
| Retention Analysis | `retention-analysis` | `/docs/analytics/charts/retention-analysis/{slug}` |
| Lifecycle | `lifecycle` | `/docs/analytics/charts/lifecycle/{slug}` |
| Other Analytics Charts | `charts` | `/docs/analytics/charts/{slug}` |
| CDP/Audiences | `audiences` | `/docs/data/audiences/{slug}` |
| Data Management | `data` | `/docs/data/{slug}` |
| Sources | `sources` | `/docs/data/sources/{slug}` |
| Destinations | `destination-catalog` | `/docs/data/destination-catalog/{slug}` |
| Session Replay | `session-replay` | `/docs/session-replay/{slug}` |
| Feature Experiment | `experiment` | `/docs/feature-experiment/{slug}` |
| Web Experiment | `web_experiment` | `/docs/web-experiment/{slug}` |
| Experiment SDKs | `experiment-sdks` | `/docs/sdks/experiment-sdks/{slug}` |
| Browser SDK | `browser_sdk` | `/docs/sdks/analytics/browser/{slug}` |
| iOS SDK | `ios_sdk` | `/docs/sdks/analytics/ios/{slug}` |
| Android SDK | `android_sdk` | `/docs/sdks/analytics/android/{slug}` |
| Analytics API | `api` | `/docs/apis/analytics/{slug}` |
| Experiment API | `experiment-apis` | `/docs/apis/experiment/{slug}` |
| Account Management | `account-management` | `/docs/admin/account-management/{slug}` |
| Admin | `admin` | `/docs/admin/{slug}` |

For a complete list of all 120+ collections, see `.cursor/rules/statamic-routing.mdc`.

## Blueprint Reference

Each collection uses a specific blueprint for frontmatter. Check an existing file in the target collection to confirm. Common blueprints:

| Collection | Blueprint |
|---|---|
| analytics | `analytic` |
| lifecycle | `lifecycle` |
| funnel-analysis | `funnel_analysis` |
| event-segmentation | `event_segmentation` |
| data | `data` |
| audiences | `audience` |
| browser_sdk, ios_sdk, android_sdk | `sdk` |
| api, experiment-apis | `api` |
| experiment, web_experiment | `experiment` |
| admin, account-management | `admin` |
| session-replay | `session_replay` |

**To verify:** Open an existing file in the target collection and check its `blueprint` frontmatter field.
