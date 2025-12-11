---
id: d402c648-6218-4450-b216-0439206e1206
blueprint: guides_and_survey
title: Testing
landing: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1739220209
---
Amplitude provides two ways to test your guides and surveys:

* **Preview mode**: A quick first check to see how your guide or survey looks and confirm your setup.
* **Testing status**: A more thorough live test with specific users to be extra certain before launch.

## Preview mode

Preview mode helps make sure that your guides and surveys are set up as you want them. You can always see how a guide or survey looks just by opening it in Amplitude, but if you want to ensure that it behaves as expected, test it in preview mode.

Amplitude recommends that you test your guide or survey thoroughly before you launch. This helps ensure everything works as expected, and the experience has the look and feel you want.

* Ensure button actions behave as you intend
* Check that multi-step guides and surveys have the right pace
* Pins and tooltips appear exactly where they should.

{{partial:admonition type="note" heading="Multi-page displays"}}
There is a known issue in Preview mode where multi-page guides or surveys may not display as expected if used in multi-page apps. This only affects the Preview mode, not the published guide or survey.
{{/partial:admonition}}

Preview mode is accessible from the builder:

1. Open a guide or survey.
2. Click **Test & Preview**.
3. Enter the URL of the page with the [Guides and Surveys SDK](/docs/guides-and-surveys/sdk) installed.
4. Amplitude verifies that the SDK is available on the URL, and opens it in a new tab with the preview bar visible.

![](statamic://asset::help_center_conversions::guides-surveys/preview-bar.png)

### Conditions checked in preview mode

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

### How preview mode works

Preview mode uses browser messaging to communicate between the Amplitude dashboard and your application. When you start a preview:

1. The Amplitude dashboard opens your application URL in a new tab.
2. The dashboard waits (approximately 10 seconds) for a message from the Guides and Surveys SDK running on your page.
3. If the SDK sends a message, the dashboard responds with preview information (including the guide or survey ID).
4. The SDK receives this information and displays the preview.

This communication relies on the browser's `window.postMessage` API to pass messages between the dashboard and your application.

### Troubleshooting preview mode

Sometimes, the guide or survey doesn't appear in preview. When this happens, and the instrumentation is correct, check the following:

{{partial:admonition type="tip"}}
Use the [Amplitude Chrome extension](/docs/data/chrome-extension-debug) to debug Guides & Surveys setup and troubleshoot why guides or surveys aren't showing. The extension's Guides & Surveys tab shows SDK setup status, trigger conditions, and lets you test event-based triggers.
{{/partial:admonition}}

* That the user you're previewing as hasn't already seen the guide or survey you're trying to test. If this is the case, the preview bar shows a yellow (warning) status for the **Limit** condition. If this happens, hover over the condition, and click **Reset User History**.
* That the throttle limit isn't reached. In this case, the Throttle condition shows yellow (warning) status. If this happens, hover over the condition, and toggle **Ignore Throttle Limits**.
* If you're using **On event tracked** as the trigger condition, ensure that the corresponding event fires. If the event hasn't fired, the Trigger condition has a blue status. Hover over the Trigger condition, and click **Manually trigger event**.

#### No error message but preview doesn't appear

If the Amplitude dashboard doesn't show an error but your preview doesn't appear, this indicates that:

* The dashboard received the initial message from your SDK
* The SDK isn't receiving the response message from the dashboard

To troubleshoot this scenario:

* Check your browser console for errors related to message passing
* Verify that no browser extensions or security settings block cross-window messaging
* Enable the **Don't automatically close the preview window** option in the preview modal to keep the window open for debugging

#### Error message and preview doesn't appear

If the Amplitude dashboard displays an error after approximately 10 seconds, the dashboard didn't receive a message from the SDK. This indicates that:

* The SDK isn't loading on your page
* The SDK can't communicate with the dashboard

To troubleshoot this scenario:

* Verify the SDK is installed correctly using `window.engagement` in your browser console
* Enable the **Don't automatically close the preview window** option to extend the waiting time beyond 10 seconds
* Check that your application URL is correct and accessible

#### Known issue: Cross-Origin-Opener-Policy header

If your application sets the `Cross-Origin-Opener-Policy` (COOP) header to `same-origin`, it prevents message passing between the Amplitude dashboard and your application. This blocks preview mode from working.

To resolve this issue, either:

* Set the COOP header to `same-origin-allow-popups` instead of `same-origin`
* Temporarily disable the COOP header for testing purposes

For more information about the COOP header, review the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy).

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

* All specified test users (device IDs, user IDs, or cohorts) are eligible to see the guide or survey.
* Limits are automatically ignored to make testing easier.
* The guide or survey remains hidden from your production users.

{{partial:admonition type="note" heading="Test users in production"}}
Test users continue to receove the guide or survey when you update its status to **Published** or **Scheduled**. This allows for smooth transitions from testing to production.
{{/partial:admonition}}

##### To use the Testing status:

1. Open your guide or survey.
2. In the **Test users** section, specify your test users using device IDs, user IDs, or cohorts.
3. Change status to **Testing** .
