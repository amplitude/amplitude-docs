---
description: Internal linking uses Statamic routes, not file paths
globs: ["content/**/*.md"]
alwaysApply: true
---

# Statamic Routing for Internal Links

## Critical Rule: Use Web Routes, Not File Paths

When creating internal links between documentation pages, you MUST use the web route defined in the collection's YAML file, NOT the file path or relative path.

## How Statamic Routing Works

Each collection in `content/collections/` has a YAML file that defines its route. The route pattern uses `{slug}` as a placeholder for the document's filename (without `.md`).

All internal documentation links must:
1. Start with `/docs/`
2. Follow the route pattern from the collection YAML
3. Use the document's slug (filename without `.md`)
4. Never use relative paths (`../`) or file extensions (`.md`)

## Examples

### ✅ Correct Internal Links

```markdown
[Lifecycle chart](/docs/analytics/charts/lifecycle/lifecycle-track-growth)
[Event Segmentation](/docs/analytics/charts/event-segmentation/event-segmentation-build)
[Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2)
[Taxonomy API](/docs/apis/analytics/taxonomy)
[Account settings](/docs/admin/account-management/account-settings)
```

### ❌ Incorrect Internal Links

```markdown
<!-- Don't use relative paths -->
[Lifecycle](../lifecycle/lifecycle-track-growth.md)
[Browser SDK](../../sdks/browser/browser-sdk-2.md)

<!-- Don't use file paths -->
[API](/content/collections/api/en/taxonomy.md)

<!-- Don't use collection paths without /docs/ -->
[Settings](/admin/account-management/account-settings)
```

## Full Collection Route Reference

When generating links, always use this mapping:

| Collection Folder | Web Route Pattern |
|------------------|-------------------|
| account-management | `/docs/admin/account-management/{slug}` |
| admin | `/docs/admin/{slug}` |
| advanced-techniques | `/docs/feature-experiment/advanced-techniques/{slug}` |
| agents | `/docs/agents/{slug}` |
| ampli | `/docs/sdks/ampli/{slug}` |
| analytics | `/docs/analytics/{slug}` |
| android_sdk | `/docs/sdks/analytics/android/{slug}` |
| api | `/docs/apis/analytics/{slug}` |
| apis | `/docs/apis/{slug}` |
| audiences | `/docs/data/audiences/{slug}` |
| billing-use | `/docs/admin/billing-use/{slug}` |
| browser_sdk | `/docs/sdks/analytics/browser/{slug}` |
| cdp | `/docs/data/{slug}` |
| charts | `/docs/analytics/charts/{slug}` |
| compass | `/docs/analytics/charts/compass/{slug}` |
| data | `/docs/data/{slug}` |
| data-tables | `/docs/analytics/charts/data-tables/{slug}` |
| destination-catalog | `/docs/data/destination-catalog/{slug}` |
| engagement-matrix | `/docs/analytics/charts/engagement-matrix/{slug}` |
| event-segmentation | `/docs/analytics/charts/event-segmentation/{slug}` |
| experiment | `/docs/feature-experiment/{slug}` |
| experiment-apis | `/docs/apis/experiment/{slug}` |
| experiment-results | `/docs/analytics/charts/experiment-results/{slug}` |
| experiment-sdks | `/docs/sdks/experiment-sdks/{slug}` |
| experiment-theory | `/docs/feature-experiment/experiment-theory/{slug}` |
| experiment_integrations | `/docs/feature-experiment/{slug}` |
| experiment_troubleshooting | `/docs/feature-experiment/troubleshooting/{slug}` |
| faq_and_troubleshooting | `/docs/faq/{slug}` |
| flutter_sdk | `/docs/sdks/analytics/flutter/{slug}` |
| framework_integrations | `/docs/sdks/frameworks/{slug}` |
| funnel-analysis | `/docs/analytics/charts/funnel-analysis/{slug}` |
| get-started | `/docs/get-started/{slug}` |
| go_sdk | `/docs/sdks/analytics/go/{slug}` |
| guides_and_surveys | `/docs/guides-and-surveys/{section}/{slug}` |
| guides_and_surveys_api | `/docs/apis/guides-and-surveys/{slug}` |
| impact-analysis | `/docs/analytics/charts/impact-analysis/{slug}` |
| instrumentation | `/docs/sdks/{slug}` |
| ios_sdk | `/docs/sdks/analytics/ios/{slug}` |
| java_sdk | `/docs/sdks/analytics/java/{slug}` |
| journeys | `/docs/analytics/charts/journeys/{slug}` |
| legacy-charts | `/docs/analytics/charts/legacy-charts/{slug}` |
| lifecycle | `/docs/analytics/charts/lifecycle/{slug}` |
| migration | `/docs/migration/{slug}` |
| node_js_sdk | `/docs/sdks/analytics/node/{slug}` |
| other-charts | `/docs/analytics/charts/other-charts/{slug}` |
| partners | `/docs/partners/{slug}` |
| personas | `/docs/analytics/charts/personas/{slug}` |
| pii_integrations | `/docs/data/pii/{slug}` |
| python_sdk | `/docs/sdks/analytics-sdks/python/{slug}` |
| react_native_sdk | `/docs/sdks/analytics/react-native/{slug}` |
| retention-analysis | `/docs/analytics/charts/retention-analysis/{slug}` |
| revenue-ltv | `/docs/analytics/charts/revenue-ltv/{slug}` |
| sdk-catalog | `/docs/sdks/analytics/{slug}` |
| session-replay | `/docs/session-replay/{slug}` |
| single-sign-on | `/docs/admin/single-sign-on/{slug}` |
| source-catalog | `/docs/data/source-catalog/{slug}` |
| sources | `/docs/data/sources/{slug}` |
| stickiness | `/docs/analytics/charts/stickiness/{slug}` |
| under-the-hood | `/docs/feature-experiment/under-the-hood/{slug}` |
| unity_sdk | `/docs/sdks/analytics/unity/{slug}` |
| unreal_sdk | `/docs/sdks/analytics/unreal/{slug}` |
| user-sessions | `/docs/analytics/charts/user-sessions/{slug}` |
| warehouse_native_amplitude | `/docs/data/warehouse-native/{slug}` |
| web_experiment | `/docs/web-experiment/{slug}` |
| workflow | `/docs/feature-experiment/workflow/{slug}` |

## How to Find the Correct Route

### Method 1: Use the Reference Table Above
Look up the collection folder name in the table and use the corresponding route pattern.

### Method 2: Check Collection YAML
1. Identify which collection the target file belongs to
2. Open `content/collections/[collection-name].yaml`
3. Find the `route:` line
4. Replace `{slug}` with the target filename (without `.md`)
5. Add `/docs/` prefix if not present

### Method 3: Search for Existing Links
Look for existing links to similar pages in other documentation files.

## Images vs Documentation Links

**Images** use different paths:
- ✅ `/docs/output/img/[folder]/[filename.png]` (for public images)
- ✅ `statamic://asset::help_center_conversions::[folder]/[filename]` (for Statamic assets)

**Documentation links** always use the route:
- ✅ `/docs/[route-path]/[slug]`

## Anchors (Deep Links)

You can add anchors to link to specific sections:
```markdown
[Lifecycle Growth view](/docs/analytics/charts/lifecycle/lifecycle-interpret#interpret-your-lifecycle-chart)
[SDK Installation](/docs/sdks/analytics/browser/browser-sdk-2#installation)
```

## When Creating New Documentation

1. Identify the collection (folder) where the file lives
2. Look up the collection's route in the reference table
3. Use the route pattern with `/docs/` prefix
4. Replace `{slug}` with the target filename (no extension)

## Special Cases

### Guides and Surveys
The guides_and_surveys collection uses a special pattern with `{section}`:
- Route: `/docs/guides-and-surveys/{section}/{slug}`
- Example: `/docs/guides-and-surveys/customization/content-editor`

### Pages Collection
The pages collection uses parent URIs:
- Route: `{parent_uri}/{slug}`
- Check the file's frontmatter for the actual route

