---
id: f74a2f4f-6b98-4533-802f-e706987a423e
blueprint: event-segmentation
title: 'Create in-line custom events'
source: 'https://help.amplitude.com/hc/en-us/articles/13321766657947-Create-in-line-custom-events-in-funnel-and-event-segmentation-analyses'
this_article_will_help_you:
  - 'Combine multiple existing events into a custom event from within your event segmentation or funnel charts'
landing: true
landing_blurb: 'Combine multiple existing events into a custom event from within your event segmentation or funnel charts'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717101857
---
Sometimes an analysis calls for combining multiple events, but you might not know which events you need. You can explore event combinations directly in the chart controls without needing to create and save a permanent custom event. Amplitude offers in-line OR logic to combine events for funnels and event segmentation charts.

{{partial:admonition type='note'}}
This feature is in closed beta. To gain access, contact your Customer Success Manager.
{{/partial:admonition}}

Follow these steps to add a custom event:

1. Click **More Options** in the Events side control and select *Combine events inline*.

![](/docs/output/img/event-segmentation/-4kwHCRJq_nvW0E9oN9Y_JbirBp57tTdA5TE09o5UHb3XWt3Vx_rWP6A0e4C87r9LLOIk14GvHYr5554HS8HD1HPjYk0D9-O_qWjTZaswL24ICTPq5ti88C6sOXme80Qcj4Y77J8AyoPQZqsLrCA-uc)

2. Next, click *Add event inline* to add a custom event. Add any number of custom events.

![](/docs/output/img/event-segmentation/rFM_7I88rsHivl7dYUFlLxirvXBSxjBv0yilzSTzFeznNiL4mVchXd5brDg0Xay_nsnlJx6jjm8arG1yu5g_FQUVjr6clxac2oNyh1Z32iSoncl0PHk3PzcvK8AixQXFA7qRX_iFmjMv8zU9aBrXK28)

{{partial:admonition type='note'}}
 The in-line event that you create will only be relevant to that specific chart and will not be accessible anywhere else unless it is saved as a custom event. 
{{/partial:admonition}}

3. If desired, hover on the event and click **Filter** to add event properties. Add as many filter properties as needed for each in-line event.

![](/docs/output/img/event-segmentation/2qGAw9uAmao0tp6ZE4c0Hyo3VXKt6VApaZNJE0LKdXPKLt2i-yeaFyfSM_vn_d0EtYOiVS2SxFmBNLPZy1cAFuTN5WNp_Aj6dQfWT1sMG63QJfh4i44oHfaHYs4KTzOZLN93vEmKMepdCZHkLT23e_w)

4. Save the in-line events as a [custom event](/docs/analytics/charts/group-events) to use it in other charts. Click **More Options** and choose *Save Custom Event*.

![inline_to_custom.png](/docs/output/img/event-segmentation/inline-to-custom-png.png)

5. Click **Remove** to remove properties and in-line events, as needed.

{{partial:admonition type="note" heading=""}}
Custom events can't contain other custom events. Also, *Show User Journeys*, *Explore Conversion Drivers* and *Show User Paths* aren't available via the Microscope for in-line event steps in funnels.
{{/partial:admonition}}