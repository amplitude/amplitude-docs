---
id: d402c648-6218-4450-b216-0439206e1206
blueprint: guides_and_survey
title: Testing and publishing
landing: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1739220209
---

Amplitude allows you to test your guides and surveys before publishing them to your users. This helps you ensure that your guides and surveys are set up as you want them and that they behave as expected.

There are two ways to test your guides and surveys:

- **Preview mode**: A quick first check to see how your guide or survey looks and confirm your setup.
- **Testing status**: A more thorough live test with specific users to be extra certain before launch.

## Preview mode

Preview mode helps make sure that your guides and surveys are set up as you want them. You can always see how a guide or survey looks just by opening it in Amplitude, but if you want to ensure that it behaves as expected, test it in preview mode.

{{partial:admonition type="tip" heading="Recommended testing"}}
Amplitude recommends that you test your guide or survey thoroughly before you launch. This helps ensure everything works as expected, and the experience has the look and feel you want.

- Ensure button actions behave as you intend
- Check that multi-step guides and surveys have the right pace
- Pins and tooltips appear exactly where they should.
  {{/partial:admonition}}

Preview mode is accessible from the builder:

1. Open a guide or survey.
2. Click **Test & Preview**.
3. Enter the URL of the page with the [Guides and Surveys SDK](/docs/guides-and-surveys/sdk) installed.
4. Amplitude verifies that the SDK is available on the URL, and opens it in a new tab with the preview bar visible.

![](statamic://asset::help_center_conversions::guides-surveys/preview-bar.png)

### Conditions checked in preview mode

The preview bar shows the status of the three conditions that Amplitude uses to decide to show the guide or survey:

- Trigger
- Limit
- Throttle

### Condition status

These conditions have three statuses:

| Status | Description                                                          |
| ------ | -------------------------------------------------------------------- |
| Green  | The condition is passed, and ready to display the guide or survey.   |
| Yellow | The condition isn't passed, and the guide or survey doesn't display. |
| Blue   | The condition is pending or bypassed.                                |

### Troubleshooting preview mode

Sometimes, the guide or survey doesn't appear in preview. When this happens, and the instrumentation is correct, check the following:

- That the user you're previewing as hasn't already seen the guide or survey you're trying to test. If this is the case, the preview bar shows a yellow (warning) status for the **Limit** condition. If this happens, hover over the condition, and click **Reset User History**.
- That the throttle limit isn't reached. In this case, the Throttle condition shows yellow (warning) status. If this happens, hover over the condition, and toggle **Ignore Throttle Limits**.
- If you're using **On event tracked** as the trigger condition, ensure that the corresponding event fires. If the event hasn't fired, the Trigger condition has a blue status. Hover over the Trigger condition, and click **Manually trigger event**.

{{partial:admonition type="note" heading="Clear user history"}}
Amplitude keeps a record of the guides and surveys your users encounter. To remove a guide or survey from a user's history:

1. Open the user's profile in Amplitude.
2. Navigate to the Guides or Surveys tab.
3. Find the guide or survey to remove.
4. In the corresponding row, click the ellipsis menu, and select **Clear history**.
   {{/partial:admonition}}

## Testing status function

While preview mode provides a close approximation of how your guide or survey appears to users, sometimes you want to test in a live environment. In these cases, use the [**Testing** status](/docs/guides-and-surveys/guides/setup-and-target#status) to test your guide or survey with specific users without affecting your broader audience.

When you set a guide or survey to Testing status:

- All specified test users (device IDs, user IDs, or cohorts) are eligible to see the guide or survey.
- Limits are automatically ignored to make testing easier.
- The guide or survey remains hidden from your production users.

{{partial:admonition type="note" heading="Test users in production"}}
Test users continue to receive the guide or survey when you update its status to **Published** or **Scheduled**. This allows for smooth transitions from testing to production.
{{/partial:admonition}}

##### To use the Testing status:

1. Open your guide or survey.
2. In the **Test users** section, specify your test users using device IDs, user IDs, or cohorts.
3. Change status to **Testing** .

## Publishing

When you are finished editing your guide or survey and have tested it successfully, you can publish it to your users. To do that, hit the **Publish** button in the builder.

Once a guide is published, you can still make changes. These changes will be saved as "unpublished" changes until you publish them by explicitly clicking on the **Publish** button again.

The dashboard's preview pane will show your guide or survey including any unpublished changes. The "Preview" mode will also show the unpublished changes. Use the version history to see how many changes you made since you last published.
