---
title: "Import or export experiment chart settings as JSON"
source: "https://help.amplitude.com/hc/en-us/articles/12347964006555-Import-or-export-experiment-chart-settings-as-JSON"
id: d8fdb1b4-2027-4785-aea6-375d53143cf8
---

#### This article will help you:

* Save experiment chart settings as JSON to your clipboard
* Import chart settings as JSON to your experiment results in analytics

Creating charts with aligning settings can be difficult and time consuming when analyzing experiment results in *both* Amplitude Experiment and Analytics. To combat this issue, users can import or export chart settings' data as JSON.

Follow these steps to copy settings as JSON from Experiment to Analytics:

1. While in any tab in Experiment, click the *More* dropdown and select *Copy flag as JSON* to copy chart settings to your clipboard.

![copy JSON.png](/output/img/advanced-techniques/copy-json-png.png)

2. From an Experiment Results chart in Analytics, click *Import*.

![import.png](/output/img/advanced-techniques/import-png.png)

3. Paste the copied settings in the *Import from JSON* window, then click *Apply* to exactly match your experiment's configuration.

![import_from_JSON.png](/output/img/advanced-techniques/import-from-json-png.png)

{{partial:admonition type='note'}}
 This feature is directly related to the feature for opening Experiment charts in Analytics: [Experiment: Open charts in Analytics](https://amplitude.atlassian.net/wiki/spaces/MTH/pages/1878392833). Both features provide a similar end state of an Experiment Results chart that matches an E2E experiment.
{{/partial:admonition}}

### JSON schema

The JSON copied to your clipboard contains a set of fields that completely describe the inputs to an Experiment Results chart. The fields differ slightly from what you might see in the version history for an experiment or feature flag.

* variants - Array of objects with the following keys:

	* name - The custom name set for the variant.
	* userPropertyValue - The variant value, used to build segment conditions when converting variants to segments in the chart.
* bucketingGroupType - The unit of analysis, see [Experiment: Account Level Analysis](https://amplitude.atlassian.net/wiki/spaces/MTH/pages/1811480577) for more information.
* userProperty - The Amplitude user property that identifies users exposed to each treatment. Used to build segment conditions when converting variants to segments in the chart. See [Exposure Tracking - Amplitude Developer Center](https://www.docs.developers.amplitude.com/experiment/general/exposure-tracking/) for more information.
* metrics - An array of metric objects, including test direction, MDE, events, and analysis type.
* experimentStartDate - The start date of the experiment.
* experimentEndDate - The end date for the date picker, or today if the experiment is still running.
* exposureEvent - The exposure event and filters for the experiment. When your experiment is configured to use the default Amplitude exposure event, the event type will always be "*[Experiment] Exposure"*. See [Exposure Tracking - Amplitude Developer Center](https://www.docs.developers.amplitude.com/experiment/general/exposure-tracking/#exposure-event) for more information about exposure events.
