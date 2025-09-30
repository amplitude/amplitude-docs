---
id: 71dedb3e-eb17-4ed1-9df0-bcbc78a2e6a2
blueprint: experiment_troubleshooting
title: 'New Experiment Run'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
source: 'https://www.docs.developers.amplitude.com/experiment/guides/troubleshooting/restarting-experiments/'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717179968
---
Creating a new run of an existing experiment can be useful if you had instrumentation issues that affected data quality, and you've since fixed them. When you create a new run, you exclude any previous user data from the monitoring and analysis of your experiment.

## Create a new run

##### To create a new run of an existing experiment

1. Open a running or completed experiment for which you want to create the new run.
2. Open the menu next to **Turn off flag** (for completed experiments) or **Complete Experiment** (for running experiments) and select **New run**.
3. Select a new analysis range and, optionally, tell Amplitude how to handle users in the new run, and what to do with existing feature flags, if applicable.

## Options when creating a new run

Amplitude makes the following changes to your experiment configuration when you create a new run:

| Property                          | How it changes after on a new run                                                                          |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| [Experiment Key](#experiment-key) | Updated to a new value                                                                                        |
| Start Date                        | Updated to the date of the restart                                                                            |
| End Date                          | (Optional) Updated to your selected value                                                                     |
| Bucketing Salt                    | (Optional) If selected, randomized to a new value                                                             |
| Sticky Bucketing                  | If you selected the option to re-randomize users and sticky bucketing is on, Amplitude turns it off            |
| Decision                          | If you rolled out or rolled back your experiment, Amplitude erases the decision                   |

## Experiment Key

By default, Amplitude delimits your experiment runs by time, but you can optionally differentiate runs with the experiment key property on the default exposure event. This helps ensure your new run doesn't include stale evaluated users. After you create your new experiment run, enable the setting under the exposure event control to use the experiment key.

To use the experiment key: 

1. Your experiment must use Amplitude's default exposure tracking.
2. Your client SDK version must support experiment restarts.

| SDK          | Minimum version |
| ------------ | --------------- |
| JavaScript   | v1.10.2          |
| Android      | v1.10.0         |
| iOS          | v1.11.0         |
| React Native | v1.2.0          |

If you use the [Evaluation API](/docs/apis/experiment/experiment-evaluation-api), the response body contains the experiment key of the actively running experiment.

```json
{
    "<flag_key>": {
        "key": "<variant_value>",
        "payload": <variant_payload>,
        "experiment_key": "exp-1",
    },
    // ...
}
```

Similarly this experiment key is available when using fetching variants using Experiment SDKs.

For example, for the JavaScript SDK:

The [Variant](/docs/sdks/experiment-sdks/experiment-javascript#variant) object contains the existing `value` and `payload` properties, along with a new `expKey` property.
