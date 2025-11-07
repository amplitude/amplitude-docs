---
id: f1b3c937-0ad7-4686-8079-fcdf8b6cb480
blueprint: under-the-hood
title: 'Event Tracking'
landing: false
source: 'https://www.docs.developers.amplitude.com/experiment/general/experiment-event-tracking/'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716917513
---
Experiment's end-to-end platform relies on two events: 
* **[assignment events](#assignment-events)**: The specific event of converting users into registered participant.
* **[exposure events](#exposure-events)**: The event that indicates when a user has actually experienced an experiment variant.

These two events, as well as an [experiment user property](#experiment-user-properties) for each experiment, enable experiment analysis, monitoring, and debugging.

Use the Amplitude-defined exposure or assignment events as your experiment's exposure event to ensure that the correct [experiment user property](#experiment-user-properties) is set when the exposure is ingested. Custom exposure events might be ingested before the experiment user property is set and, therefore, won't count in experiment analysis.

<table>
    <tbody>
        <tr>
            <th style="width: 50%;">Assignment</th>
            <th style="width: 50%;">Exposure</th>
        </tr>
        <tr>
            <td>
                <ul>
                <li>Tracked when Experiment assigns a user because of a remote evaluation  (<code>fetch()</code>) or server-side local evaluation (<code>evaluate()</code>).</li>
                <li>Contains assignment information for one or more flags and experiments.</li>
                <li>Useful for monitoring and debugging, or as an exposure heuristic for server-side experiments.</li>
                <li>Sets experiment user properties for all evaluated flags or experiments.</li>
                </ul>
            </td>
            <td>
                <ul>
                <li>Tracked when the user is exposed to a variant. Typically on the client-side when a variant is accessed from the SDK (<code>variant()</code>).</li>
                <li>Contains exposure information for a single flag or experiment.</li>
                <li>Used as the exposure event for client-side experiments.</li>
                <li>Sets the experiment user property for the exposed flags or experiment</li>
                </ul>
            </td>
        </tr>
    </tbody>
</table>

{{partial:admonition type="note" heading="Event volume billing and property limits"}}
Exposure (`[Experiment] Exposure`) and assignment (`[Experiment] Assignment`) events don't count toward your organization's event volume or Monthly Tracked Users (MTU).

If you use other events in place of `[Experiment] Exposure` or `[Experiment] Assignment`, those events do count toward your event volume and MTU.
{{/partial:admonition}}

## Experiment user properties

Experiment uses a user property per flag and experiment, which is set or unset on both assignment and exposure events. Experiment uses this user property to determine which variant the user is in for experiment analysis purposes. Amplitude supports up to 1500 experiment user properties per project.

The format of the user property is, `[Experiment] <flag_key>` and the value is the variant key that the user was assigned or exposed to. Use this user property in queries for non-experiment events which occur after Experiment sets the user property to segment based on the flag or experiment variant.

## Assignment events

Amplitude's evaluation servers or SDKs track assignment events as a result of either [remote evaluation](/docs/feature-experiment/remote-evaluation), or [local evaluation](/docs/feature-experiment/local-evaluation) using a server-side SDK configured for [automatic assignment tracking](#automatic-assignment-tracking). Use assignment events as a heuristic exposure event for server-side experiments, to monitor a flag or experiment while active, and to debug any issues. For server-side experiments where client-side exposure tracking isn't possible, choose the Amplitude Assignment event as the exposure event when you set up your experiment.

You shouldn't need to track assignment events manually.

{{partial:admonition type="warning" heading="User property inheritance"}}
Assignment events inherit all non-experiment user properties from the current user state in Amplitude at the time of event ingestion. In other words, the user properties on the assignment event aren't guaranteed to be the same as the properties used in evaluation. For example, if an assignment event is the first event ingested for a user, the event contains experiment user properties only, even if user properties are explicitly included in the evaluation.
{{/partial:admonition}}

### Assignment event definition

The assignment event, `[Experiment] Assignment`, contains an event property, `[Experiment] <flag_key>.variant`, for each evaluated flag or experiment, where the property value is the assigned variant key. If no variant is assigned, the property value is set to `off`.

The assignment event sets or unsets [experiment user properties](#experiment-user-properties) for each assigned, or unassigned variant respectively. The assignment event contains other event properties like `[Experiment] Environment Name` and `[Experiment] <flag_key>.details` which are useful for internal debugging.

{{partial:admonition type="example" heading="Example event JSON"}}
This is an example assignment event for a user, `123456789`, who was evaluated for one flag `my-flag` and one experiment `my-experiment`.
```json
{
    "user_id": "123456789",
    "event_type": "[Experiment] Assignment",
    "event_properties": {
        "[Experiment] my-flag.variant": "off",
        "[Experiment] my-experiment.variant": "treatment"
    },
    "user_properties": {
        "$set": {
            "[Experiment] my-experiment": "treatment"
        },
        "$unset": {
            "[Experiment] my-flag": "-"
        }
    }
}
```
{{/partial:admonition}}

### Automatic assignment tracking

Experiment supports automatic assignment tracking for [remote evaluation](/docs/feature-experiment/remote-evaluation) by default. Remote evaluation requests that miss the CDN cache, and which contain a valid user or device ID, will trigger an assignment event to be tracked asynchronously after evaluation.

For server-side [local evaluation](/docs/feature-experiment/local-evaluation), you may configure the local evaluation SDK on initialization to track assignment events on `evaluate()`. Amplitude deduplicates assignment events sent by server-side local evaluation SDKs  for each user using an `insert_id` that contains the user ID, device ID, hash of a canonicalized list of assigned flags and variants, and the date stamp. 

In other words, you should expect one Assignment per evaluated user, per unique evaluation result, per day.

| SDK | Minimum Version |
| --- | --- |
| [Node.js](/docs/sdks/experiment-sdks/experiment-node-js) | `1.7.4+` |
| [Ruby](/docs/sdks/experiment-sdks/experiment-ruby) | `1.2.2+` |
| [JVM](/docs/sdks/experiment-sdks/experiment-jvm) | `1.2.1+` |
| [Go](/docs/sdks/experiment-sdks/experiment-go) | `1.2.2+` |
| [Python](/docs/sdks/experiment-sdks/experiment-python) | `1.2.3+` |

## Exposure events

An exposure event is a [strictly defined](#exposure-event) analytics event that informs Experiment that a user was exposed to a variant of an [experiment or feature flag](/docs/feature-experiment/data-model#flags-and-experiments). Exposure events contain the flag key and the variant of the flag or experiment that the user has been exposed to in the event's event properties.

When Amplitude ingests an [exposure event](#exposure-event), it uses the flag key and variant to set or unset user properties on the user associated with the event. Setting user properties is essential for experiment analysis queries on primary and secondary success metrics.

### Exposure event definition

The exposure event is simple enough to send through any analytics implementation or customer data platform without the need to manipulate user properties.

| Event Type | <div class='big-column'>Event Property</div> | Requirement | Description |
| --- | --- | --- | --- |
| **`$exposure`** | `flag_key` | Required | The flag or experiment key which the user is being exposed to. |
| | `variant` | Optional | The variant for the flag or experiment that the user has been exposed to. If `null` or missing, the user property for the flag/experiment is unset, and the users is no longer a part of the experiment. |
| | `experiment_key` | Optional | The key of the experiment that the user was exposed to. The experiment key is used to differentiate between two [runs of an experiment on the same flag key](/docs/feature-experiment/troubleshooting/restart-an-experiment). |

{{partial:admonition type="example" heading="Example event JSON"}}
This is an example exposure event for a user, `123456789`, who was exposed to the `treatment` variant of the experiment, `my-experiment`.
```json
{
    "user_id": "123456789",
    "event_type": "$exposure",
    "event_properties": {
        "flag_key": "my-experiment",
        "variant": "treatment"
    }
}
```
{{/partial:admonition}}

#### Exposure transformation

When Amplitude ingests an `$exposure` event, it's transformed. The event type and event properties are modified for consistency with other Amplitude properties, and [experiment user properties](#experiment-user-properties) are set or unset for accurate experiment analysis.

| Property Type | Pre-transformation | Post-transformation |
| --- | --- | --- |
| Event Type | `$exposure` | `[Experiment] Exposure` |
| Event Property | `flag_key` | `[Experiment] Flag Key` |
| Event Property | `variant` | `[Experiment] Variant` |
| Event Property | `experiment_key` | `[Experiment] Experiment Key` |

### Automatic exposure tracking

Client-side Experiment SDKs support automatic exposure tracking through an exposure tracking provider implementation. Without an integration or custom implementation, exposure events aren't tracked automatically.

<!--vale off-->
| <div class='big-column'>SDK Integrations</div> | Minimum Version |
| --- | --- |
| [JavaScript SDK](/docs/sdks/experiment-sdks/experiment-javascript#integrations) | `1.4.1+` |
| [Android SDK](/docs/sdks/experiment-sdks/experiment-android#integrations) | `1.5.1+` |
| [iOS SDK](/docs/sdks/experiment-sdks/experiment-ios#integrations) | `1.6.0+` |
| [React Native](/docs/sdks/experiment-sdks/experiment-react-native#integrations) | `0.6.0+` |
<!-- vale on-->

### Exposure tracking example

{{partial:partials/experiment/interactive-exposure-tracking-table}}

### Proxy exposure events

Proxy exposure events are a selected analytics event used to model traffic and baseline conversion before an experiment runs. They primarily power the duration estimator and related calculations. They aren’t the same as actual exposure or assignment events used during analysis after an experiment is live.

A proxy exposure event is a normal analytics event you choose that best represents when a user may be exposed to your experiment experience. Amplitude uses historical traffic to estimate experiment duration and set baselines when the flag is inactive. The [duration estimator](/docs/feature-experiment/workflow/experiment-estimate-duration) explicitly relies on the proxy exposure event’s recent traffic. The “control mean” baseline is computed based on users who completed the proxy exposure event over the previous seven days prior to starting.

The activity log tracks when proxy exposure is changed so that configuration changes are visible in the flag history.

In analysis parameters, proxy exposure events are stored as a single `ExposureEvent`-shaped object (distinct from the array of actual exposure events). 

{{partial:admonition type="tip" heading="Proxy events with Experiment SDK"}}
If you use Experiment SDKs and call `.variant()` or configure the ExposureTrackingProvider, Amplitude can automatically track exposure events. Alternatively, you can call `exposure()` to explicitly log exposures using the cached variant. However, this doesn't automatically create or set the proxy exposure. You must select a normal analytics event as your proxy. 
{{/partial:admonition}}