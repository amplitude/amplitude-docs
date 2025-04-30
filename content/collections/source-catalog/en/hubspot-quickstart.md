---
id: d7b0db9e-9508-4804-aa22-b4f67692c322
blueprint: source-catalog
title: 'HubSpot Quickstart'
connection: source
partner_maintained: false
integration_icon: partner-icons/hubspot.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1725902610
---
When you integrate HubSpot with Amplitude, you have access to behavioral insights that enable you to personalize customer journeys, improve lead scoring, and drive product-led growth (PLG). 

## Quick setup

Keep the following high-level steps in mind as you plan your integration:

1. **Install Amplitude tracking with one line of code**. Copy a single line of code from Amplitude to start tracking user behavior, visualize user experiences, and establish your data structure.
2. **Sync a cohort from Amplitude to HubSpot**. After you define your target audience in Amplitude, sync the cohort to HubSpot to manage your marketing efforts.
3. **Configure PQL scoring in HubSpot**. Use HubSpot's lead scoring tool to rank leads. Set criteria based on product use and engagement to help decide which users are most likely to convert.
4. **Automate outreach**. Build HubSpot workflows to send your personalized emails, assigns tasks, or enroll leads in sequences when they hit certain PQL scores.
5. **Create alerts**. Configure alerts to tell your sales or marketing team when leads engage at a high level and are ready for outreach.
6. **Embed Amplitude charts in HubSpot reports**. Track PQL scores, lead engagement, and conversion rates on HubSpot dashboards for real-time insights and smarter decision making.

## Configuration for new Amplitude users

Amplitude provides a simplified flow specifically for HubSpot users who are new to Amplitude.

To configure:

1. From the HubSpot App Marketplace, find the Amplitude app and click Install.
2. Sign up for Amplitude using your email address or Google credentials.
3. After you create your account, continue to Step 3 in the [Connect HubSpot](#connect-hubspot) section.

## Configuration for existing Amplitude users 

Amplitude maintains this integration. For help with setup, contact [Amplitude Support](https://amplitude.zendesk.com/hc/en-us/requests/new).

### Install Amplitude

To begin tracking user behavior, add the one-line code snippet from Amplitude to your website. Optionally, include [Session Replay](/docs/session-replay) and [Autocapture](/docs/get-started/autocapture) functionality.

![](statamic://asset::help_center_conversions::sources/amp-snippet.png)

### Connect HubSpot

1. From Amplitude Data, navigate to *Catalog > Sources*, search for `HubSpot`, and select *HubSpot Quickstart*.
2. Select your CMS, and specify if you're on a [HubSpot Enterprise plan](https://knowledge.hubspot.com/account/manage-your-hubspot-subscription).
3. The integration provides customized HubSpot configuration instructions based on your selection. When you complete the steps in HubSpot, click *Next*.
4. Send test events from your website or CMS to verify your instrumentation.

### Sync the cohort to HubSpot

This integration uses Amplitude [cohorts](/docs/analytics/behavioral-cohorts) to select users who show key behaviors. 

Follow the instructions in [Define a new cohort](/docs/analytics/define-cohort) to build your cohort, then add the [HubSpot (cohort sync) destination](/docs/data/destination-catalog/hubspot-cohort-sync) to send your cohort to HubSpot.

### Configure product-qualified lead (PQL) scoring in HubSpot

After you sync your cohort to HubSpot, create a product-qualified lead (PQL) score to rank leads based on their likelihood to convert. For more information, see HubSpot's article [Build scores to qualify contacts and companies in the lead scoring tool (BETA)](https://knowledge.hubspot.com/properties/build-lead-scores).

### Automate outreach with HubSpot workflow templates

Use HubSpot's workflow automation to trigger actions based on PQL scores and ensure timely followups.

For more information, see HubSpot's article [Create workflows](https://knowledge.hubspot.com/workflows/create-workflows).

### Create a PQL alert trigger in HubSpot

Create alerts in HubSpot to tell your team when a potential lead is ready for engagement.

For more information, see HubSpot's articles [Set your workflow enrollment triggers](https://knowledge.hubspot.com/workflows/set-your-workflow-enrollment-triggers) and [Choose your workflow actions](https://knowledge.hubspot.com/workflows/choose-your-workflow-actions).

### Add Amplitude charts to HubSpot

Track and analyze product use data and lead performance from within HubSpot dashboards. This integration enables you to add Amplitude charts directly to your HubSpot dashboards. To add Amplitude charts to HubSpot:

1. Navigate to an existing dashboard, or [create a new one](https://knowledge.hubspot.com/dashboards/customize-your-dashboards) in HubSpot.
2. From the dashboard, click *Actions > Add external content*. For more information, see HubSpot's article [Embed external content on a dashboard](https://knowledge.hubspot.com/dashboards/embed-external-content-on-a-dashboard).
3. Name the chart, and enter the chart's URL from Amplitude. The URL should be in the format: `https://app.amplitude.com/analytics/<project>/1234abcd` where `1234abcd` represent an 8 character alphanumeric identifier of the chart.