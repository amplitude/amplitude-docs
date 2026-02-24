# Collection Routes Reference

Use this table to map a collection name to its web route pattern when suggesting link corrections.

## Collection Mapping

| Collection | Route Pattern |
|---|---|
| analytics | `/docs/analytics/{slug}` |
| charts | `/docs/analytics/charts/{slug}` |
| event-segmentation | `/docs/analytics/charts/event-segmentation/{slug}` |
| funnel-analysis | `/docs/analytics/charts/funnel-analysis/{slug}` |
| lifecycle | `/docs/analytics/charts/lifecycle/{slug}` |
| retention-analysis | `/docs/analytics/charts/retention-analysis/{slug}` |
| data | `/docs/data/{slug}` |
| audiences | `/docs/data/audiences/{slug}` |
| sources | `/docs/data/sources/{slug}` |
| destination-catalog | `/docs/data/destination-catalog/{slug}` |
| session-replay | `/docs/session-replay/{slug}` |
| experiment | `/docs/feature-experiment/{slug}` |
| web_experiment | `/docs/web-experiment/{slug}` |
| experiment-sdks | `/docs/sdks/experiment-sdks/{slug}` |
| browser_sdk | `/docs/sdks/analytics/browser/{slug}` |
| ios_sdk | `/docs/sdks/analytics/ios/{slug}` |
| android_sdk | `/docs/sdks/analytics/android/{slug}` |
| api | `/docs/apis/analytics/{slug}` |
| experiment-apis | `/docs/apis/experiment/{slug}` |
| admin | `/docs/admin/{slug}` |
| account-management | `/docs/admin/account-management/{slug}` |
| guides_and_surveys | `/docs/guides-and-surveys/{section}/{slug}` |

For a complete list of all 120+ collections, see `.cursor/rules/statamic-routing.mdc`.

## File-to-URL Mapping

To map a file path to its web URL:

1. Take the filename without `.md`: for example, `lifecycle-interpret`.
2. Find the collection folder the file lives in: for example, `lifecycle`.
3. Look up the route pattern for that collection: `/docs/analytics/charts/lifecycle/{slug}`.
4. Replace `{slug}` with the filename: `/docs/analytics/charts/lifecycle/lifecycle-interpret`.

## Example Corrections

| Incorrect Link | Correct Link |
|---|---|
| `../lifecycle/lifecycle-interpret.md` | `/docs/analytics/charts/lifecycle/lifecycle-interpret` |
| `/content/collections/analytics/en/chart.md` | `/docs/analytics/chart` |
| `/analytics/chart` | `/docs/analytics/chart` |
| `/docs/apis/analytics/taxonomy.md` | `/docs/apis/analytics/taxonomy` |
