---
id: d402c648-6218-4450-b216-0439206e1206
blueprint: guides_and_survey
title: Testing
landing: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1739220209
---
Preview mode helps make sure that your guides and surveys are set up as you want them. You can always see how a guide or survey looks just by opening it in Amplitude, but if you want to ensure that it behaves as expected, test it in preview mode. 

Preview mode enables you to confirm the conditions and settings you apply in the builder work on your site or application.

{{partial:admonition type="tip" heading="Recommended testing"}}
Amplitude recommends that you test your guide or survey thoroughly before you launch. This helps ensure everything works as expected, and the experience has the look and feel you want.

* Ensure button actions behave as you intend
* Check that multi-step guides and surveys have the right pace
* Pins and tooltips appear exactly where they should.
{{/partial:admonition}}

## Enter preview mode

Preview mode is accessible from the builder:

1. Open a guide or survey.
2. Click **Test & Preview**.
3. Enter the URL of the page with the [Guides and Surveys SDK](/docs/guides-and-surveys/sdk) installed.
4. Amplitude verifies that the SDK is available on the URL, and opens it in a new tab with the preview bar visible.

![](statamic://asset::help_center_conversions::guides-surveys/preview-bar.png)

## Conditions

The preview bar shows the status of the three conditions that Amplitude uses to decide to show the guide or survey:

* Trigger
* Limit
* Throttle

### Condition status

These conditions have three statuses:

| Status | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| Green  | The condition is passed, and ready to display the guide or survey.   |
| Yellow | The condition isn't passed, and the guide or survey doesn't display. |
| Blue   | The condition is pending or bypassed.                                |

## Preview troubleshooting

Sometimes, the guide or survey doesn't appear in preview. When this happens, and the instrumentation is correct, check the following:

* That the user you're previewing as hasn't already seen the guide or survey you're trying to test. If this is the case, the preview bar shows a yellow (warning) status for the **Limit** condition. If this happens, hover over the condition, and click **Reset User History**.
* That the throttle limit isn't reached. In this case, the Throttle condition shows yellow (warning) status. If this happens, hover over the condition, and toggle **Ignore Throttle Limits**.
* If you're using **On event tracked** as the trigger condition, ensure that the corresponding event fires. If the event hasn't fired, the Trigger condition has a blue status. Hover over the Trigger condition, and click **Manually trigger event**.

{{partial:admonition type="note" heading="Clear user history"}}
Amplitude keeps a record of the guides and surveys your users encounter. To remove a guide or survey from a user's history:

1. Open the user's profile in Amplitude.
2. Navigate to the Guides or Surveys tab.
3. Find the guide or survey to remove.
4. In the corresponding row, click the ellipsis menu, and select **Clear history**.
{{/partial:admonition}}

## Live testing

While preview mode provides a close approximation of how your guide or survey appears to users, sometimes you want to test in a live environment to be sure. In these cases, use Guides and Surveys' targeting to target the experience to just yourself, or a subset of internal users.

Amplitude recommends that you:

1. Create a cohort for the set of users you want to test. 
2. Apply that cohort to the targeting section of the guides and surveys you want to live test.
3. Change status to **Published**. 