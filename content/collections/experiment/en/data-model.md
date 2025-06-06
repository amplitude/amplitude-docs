---
id: a07f325e-1e4a-4b62-a360-d21686c8a8ac
blueprint: experiment
title: 'Data model'
landing: true
sourxe: 'https://www.docs.developers.amplitude.com/experiment/general/data-model/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717435427
landing_blurb: 'See how Amplitude Experiment is structured.'
---
At the top level in Amplitude is your **organization**. Within an organization, Amplitude Experiment follows the **project** structure defined by Amplitude Analytics. In short, all Experiment data must be associated with an Amplitude Analytics project.

[Flags](#flags-and-experiments), [experiments](#flags-and-experiments), and [deployments](#deployments) all live within an Amplitude project.

![](statamic://asset::help_center_conversions::experiment/data-model.drawio.svg)

## Projects

Experiment uses the same projects which are required for Amplitude Analytics. As a best practice, create a project per product and per environment. Because [flags](#flags-and-experiments), [experiments](#flags-and-experiments), and [deployments](#deployments) only exist within a single project, duplicate these objects across projects for the same product.

{{partial:admonition type="tip" heading="Copy a flag to another project"}}
When developing a new feature with an experiment, you can create the experiment in the dev environment project to develop and test that the implementation is correct, then copy the experiment into the prod project to run the experiment in prod.
{{/partial:admonition}}


In Amplitude Experiment, a deployment serves a group of flags or experiments for use in an application. Each [project](#projects) has a deployment using the project API key as the deployment key, available by default. On creation, experiment deployments have an associated randomly generated **deployment key** which Experiment uses to identify the deployment and authorize requests to the evaluation servers.

{{partial:admonition type="note" heading="Client vs. server deployments"}}
Deployments are either client or server deployments. Use client-side deployments to initialize client-side SDKs, and server-side deployments to initialize server-side SDKs or authorize requests to the Evaluation API.
{{/partial:admonition}}

## Deployments

Deployments belong to Amplitude Analytics projects, and a project can have multiple deployments. Amplitude recommends that you name deployments after the platform (client-side) or service (server-side) to which Experiment serves variants (for example: `android`, `ios`, `web`). The default project API key deployment is useful for getting started, but using explicit deployments for each platform or service is the best practice for larger organizations or teams that may share the same Amplitude project across multiple platforms for the same application.

Add deployments to [Flags and Experiments](/docs/feature-experiment/workflow/feature-flag-rollouts#create-a-new-flag) in the same project. When Experiment's evaluation servers receive a request to fetch variants for a user, Experiment uses the deployment key to look up all associated flags and experiments for evaluation.

## Flags and experiments

Experiment uses feature flags and experiments to serve a variable experience to a user. Flags and experiments are identified by the **flag key**, are associated with `0-n` [deployments](#deployments), and contain `1-k` [variants](#variants). The **evaluation mode** (local or remote) determines whether the flag or experiment can be [locally evaluated](/docs/feature-experiment/local-evaluation) and may limit the targeting capabilities for the flag if set to local.

Feature flags and experiments share the same underlying data model, and you can migrate from one to the other retroactively. The most visible difference comes in the product interface: experiments guide you through an experiment lifecycle and give you the ability to define success metrics and perform analysis. Flags are more bare-bones, and don't include special planning and analysis sections.

### Flags

Used for standard feature flagging without user analysis. When created, comes with a default variant, `on`.

{{partial:admonition type="example" heading="Flag use cases"}}
- Rolling out a feature to a subset of users (for example, beta customers).
- Different experience for a behavioral cohort (for example, power users).
{{/partial:admonition}}

### Experiments

Used for feature experimentation on users. When created, comes with two default variants, `control` and `treatment`.

{{partial:admonition type="example" heading="Experiment use cases"}}
- Run an A/B test for a new feature in your application.
- Experiment on multiple recommendation algorithms on your server.
{{/partial:admonition}}

## Variants

A variant exists within a flag or an experiment, and represents a variable experience for a user.

| <div class='med-column'> Property </div> | Requirement  | Description                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `Value`                                  | **Required** | A string which identifies the variant in the instrumentation. The value string is checked for equality when a variant is accessed from the SDK or [Evaluation REST API](/docs/apis/experiment/experiment-evaluation-api). Format must be lowercase, kebab-case, or snake_case. |
| `Payload`                                | Optional     | Dynamic JSON payload for sending arbitrary data down with the variant. For example, you could send down a hex code to change the color of a component in your application.                                                                                                     |
| `Name`                                   | Optional     | Name for the variant. This is like `Value`, but doesn't have formatting limitations, and you can change it without breaking the instrumentation in your code base.                                                                                                             |
| `Description`                            | Optional     | A more detailed description of the variant. You can use this to describe what the user experiences when viewing the variable experience in more detail.                                                                                                                        |


{{partial:admonition type="note" heading="SDK use"}}
Only the `Value` and `Payload` are available when accessing a variant from an SDK or the [Evaluation REST API](/docs/apis/experiment/experiment-evaluation-api).
{{/partial:admonition}}

## Users

Experiment users map to a user within Amplitude Analytics. Alongside flag configurations, users are an input to [evaluation](/docs/feature-experiment/implementation). Flag and experiment targeting rules can make use of user properties.

Pass users to evaluation via `fetch` requests for [remote evaluation](/docs/feature-experiment/remote-evaluation), or directly to the `evaluate` function for [local evaluation](/docs/feature-experiment/local-evaluation).

{{partial:admonition type="warning" heading=""}}
**You must include either a user ID or device ID in the user object for evaluation to succeed.** For example, remote evaluation returns a 400 error if both the User ID and Device ID are null, empty, or missing.

{{/partial:admonition}}
| <div class='med-big-column'> Property </div> | Type     | Description                                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `user_id`                                    | `string` | The [User ID](/docs/get-started/identify-users) is the primary identifier for the user. This value is typically their user ID within your system Experiment uses the User ID when resolving the Amplitude ID on enrichment before [remote evaluation](/docs/feature-experiment/remote-evaluation) where the Amplitude ID is the default bucketing key.                        |
| `device_id`                                  | `string` | The Device ID is the secondary identifier for the user. This is usually randomly generated by an analytics SDK on the client side or set in a cookie on the server side. The Device ID is also used when resolving the Amplitude ID on enrichment before [remote evaluation](/docs/feature-experiment/remote-evaluation) where the Amplitude ID is the default bucketing key. |
| `user_properties`                            | `object` | Optional object of custom properties used when evaluating the user during local or remote evaluation.                                                                                                                                                                                                                                                                         |
| `groups`                                     | `object` | Beta. Optional object that lists groups associated with this user. Format is an object where the key is the group type, and the value is an array of group value strings (for example, `{"org name":["Amplitude"]}`)                                                                                                                                                          |
| `group_properties`                           | `object` | Beta. Optional object listing group properties associated with this user. Format is an nested object where the key is the group type, and the value is an object where the key is a the group value, and the value is an object of properties (for example,`{"org name":{"Amplitude":{"plan":"enterprise"}}}`)                                                                |

{{partial:admonition type="beta" heading=""}}

If your organization has purchased the [Accounts add-on](/docs/analytics/account-level-reporting) you may perform bucketing and analysis on groups rather than users. Reach out to your representative to gain access to this beta feature.

Groups must be included in the user sent with the fetch request (recommended), or identified with the user via a group identify call from the [Group Identify API](/docs/apis/analytics/group-identify) or with [`setGroup()` from an analytics SDK](/docs/sdks/analytics/browser/browser-sdk-2#user-groups).

All Experiment SDKs support groups, with minimum versions described in the following table:

| SDK                                                                | Minimum version |
| ------------------------------------------------------------------ | --------------- |
| [Android](/docs/sdks/experiment-sdks/experiment-android)           | 1.9.0           |
| [iOS](/docs/sdks/experiment-sdks/experiment-ios)                   | 1.10.0          |
| [React Native](/docs/sdks/experiment-sdks/experiment-react-native) | 1.1.0           |
| [JavaScript](/docs/sdks/experiment-sdks/experiment-javascript)     | 1.5.6           |
| [Ruby](/docs/sdks/experiment-sdks/experiment-ruby)                 | 1.4.0           |
| [Go](/docs/sdks/experiment-sdks/experiment-go)                     | 1.7.0           |
| [Python](/docs/sdks/experiment-sdks/experiment-python)             | 1.3.0           |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm)                   | 1.3.0           |
| [Node](/docs/sdks/experiment-sdks/experiment-node-js)              | 1.5.0           |
| [PHP](/docs/sdks/experiment-sdks/experiment-php)                   | 1.0.0           |

{{/partial:admonition}}

### Full user definition

{{partial:collapse name="Full user definition"}}
```json
{
    "user_id": string,
    "device_id": string,
    "country": string,
    "region": string,
    "city": string,
    "dma": string,
    "language": string,
    "platform": string,
    "version": string,
    "os": string,
    "device_manufacturer": string,
    "device_brand": string,
    "device_model": string,
    "carrier": string,
    "library": string,
    "user_properties": object,
    "groups": object,
    "group_properties": object
}
```
{{/partial:collapse}}
