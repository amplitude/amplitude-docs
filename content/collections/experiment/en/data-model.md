---
id: a07f325e-1e4a-4b62-a360-d21686c8a8ac
blueprint: experiment
title: 'Data model'
landing: true
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1740528000
landing_blurb: 'Understand how Amplitude Experiment organizes projects, deployments, flags, and users.'
---
Amplitude Experiment organizes its data in a hierarchy. Understanding this hierarchy helps you set up your integration correctly and avoid common configuration mistakes.

```
Organization
  └── Project  (maps 1:1 to an Amplitude Analytics project)
        └── Deployment  (the API key your SDK uses)
              └── Flag / Experiment
                    └── Variant  (the value returned to your code)
```

## Projects

Experiment uses the same projects as Amplitude Analytics. Every flag and experiment lives inside a project. As a best practice, create one project per product and per environment.

Because flags, experiments, and deployments only exist within a single project, you need to duplicate them across projects for the same product. For example, your production flag lives in your prod project and your dev flag lives in your dev project.

{{partial:admonition type='tip' heading="Copy a flag between projects"}}
When developing a new feature, create the flag in your dev project to test the implementation. When you're ready, copy it to your prod project: open the flag → click the **...** menu → **Copy to project**.
{{/partial:admonition}}

## Deployments

A deployment is a named API key that authorizes your SDK to fetch flag configurations. When you call `Experiment.initialize('DEPLOYMENT_KEY')`, that key identifies which flags to serve.

Key facts about deployments:

- Every project has a default deployment that uses the project's API key.
- You can create additional deployments — one per platform or service is a common pattern.
- Deployments are either **client-side** or **server-side**. Use client-side keys in browser and mobile SDKs; use server-side keys in Node.js, Python, Go, and other backend SDKs.
- A flag can associate with multiple deployments within the same project.

{{partial:admonition type='warning' heading="Never mix client and server keys"}}
Server-side deployment keys have broader access and must never be exposed in browser or mobile code. Always use client-side deployment keys for client-side SDKs.
{{/partial:admonition}}

For full deployment setup guidance, see [Deployments and environments](/docs/feature-experiment/deployments-and-environments).

## Flags and experiments

Flags and experiments share the same underlying data model. You can convert a flag to an experiment at any time, and back again — your evaluation code doesn't change.

Each flag or experiment has:

- A **flag key** — the string your code uses to look up the variant: `experiment.variant('flag-key')`.
- An **evaluation mode** — local or remote.
- One or more **deployments** it's associated with.
- One or more **variants**.
- **Targeting rules** that determine which users receive each variant.

The most visible difference between flags and experiments is the Amplitude UI: experiments add a planning and analysis layer on top of the same flag infrastructure.

| | Flag | Experiment |
| --- | --- | --- |
| Serves variants to users | ✅ | ✅ |
| Targeting rules | ✅ | ✅ |
| JSON payloads | ✅ | ✅ |
| Metrics and goals | ❌ | ✅ |
| Statistical significance | ❌ | ✅ |
| Experiment analysis view | ❌ | ✅ |

See [Flags vs. experiments](/docs/feature-experiment/flags-vs-experiments) for a full comparison and guidance on when to use each.

## Variants

A variant is the value returned to your code. Each flag has at least one variant. Experiments have at least two — `control` and `treatment` by default.

| Property | Required | Description |
| --- | --- | --- |
| `value` | Yes | The string your code checks. For example: `"control"`, `"treatment"`, `"on"`, `"off"`. Must be lowercase kebab-case or snake_case. |
| `payload` | No | A JSON object for sending structured data with the variant — for example, UI configuration or algorithm parameters. |
| `name` | No | A display name for the variant in the Amplitude UI. Doesn't affect your code. |
| `description` | No | A human-readable description of the user experience for this variant. |

{{partial:admonition type='note' heading="What's available in the SDK"}}
Only `value` and `payload` are accessible from the SDK or [Evaluation API](/docs/apis/experiment/experiment-evaluation-api). `name` and `description` are UI-only fields.
{{/partial:admonition}}

Example variant with a payload:

```typescript
const variant = experiment.variant('product-card-layout');

if (variant.value === 'v2') {
  const { columns, showRating, imageSize } = variant.payload;
  renderProductCard({ columns, showRating, imageSize });
}
```

## Users

A user is the entity being evaluated. Experiment maps users to Amplitude Analytics users through `user_id` and `device_id`. You must include at least one — remote evaluation returns a `400` error if both are null, empty, or missing.

| Property | Type | Description |
| --- | --- | --- |
| `user_id` | `string` | Your system's user identifier. Used for Amplitude ID resolution in remote evaluation and as the default bucketing key. |
| `device_id` | `string` | A secondary identifier, typically a random UUID generated by the analytics SDK. Required for anonymous user evaluation before login. |
| `user_properties` | `object` | Custom properties used in targeting rules — for example: `{ plan: "enterprise", beta_tester: true }`. |
| `groups` | `object` | Group membership for account-level bucketing — for example: `{ "org name": ["Amplitude"] }`. Requires the Accounts add-on. |

### Handle anonymous users

Before a user logs in, use `device_id` as the identifier. After login, set `user_id` and pass both. This lets Amplitude stitch the anonymous session to the identified user.

```typescript
// Before login: anonymous user
await experiment.fetch({ device_id: getDeviceId() });

// After login: call fetch again with the user's ID
await experiment.fetch({
  user_id: currentUser.id,
  device_id: getDeviceId(),
});
```

{{partial:collapse name="Full user object definition"}}
```json
{
  "user_id": "string",
  "device_id": "string",
  "country": "string",
  "region": "string",
  "city": "string",
  "dma": "string",
  "language": "string",
  "platform": "string",
  "version": "string",
  "os": "string",
  "device_manufacturer": "string",
  "device_brand": "string",
  "device_model": "string",
  "carrier": "string",
  "library": "string",
  "user_properties": {},
  "groups": {},
  "group_properties": {}
}
```
{{/partial:collapse}}
