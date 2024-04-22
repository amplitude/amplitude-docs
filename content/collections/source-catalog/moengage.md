---
id: d6564a8e-f649-49de-a97f-ba708368a0f9
blueprint: source-catalog
use_cases:
  - 'Drive precisely tailored email, SMS, push, and in-product messaging by sending Amplitude cohorts to MoEngage.'
  - 'Improve customer engagement by ingesting campaign data from MoEngage for further analysis.'
  - 'Create more personalized experiences by sending user properties from Amplitude to MoEngage.'
  - 'Track the effectiveness of  your marketing campaigns and measure user behavior throughout the funnel by sending events from Amplitude to MoEngage.'
  - 'Create and run A/B tests to optimize messaging and content by sending events and user properties to MoEngage.'
short_description: 'MoEngage is an intelligent customer engagement platform. With AI-powered customer journey orchestration, personalization capabilities, and in-built analytics, MoEngage enables hyper-personalization at scale across messaging channels.'
integration_category:
  - marketing-automation
integration_type:
  - event-streaming
  - raw-events
  - cohorts
partner_doc_link: 'https://www.moengage.com/app-marketplace/amplitude/'
title: MoEngage
source: 'https://www.docs.developers.amplitude.com/data/sources/moengage'
category: 'Marketing Automation'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/moengage.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825524
---
MoEngage is an insights-led customer engagement platform for the customer-obsessed marketers and product owners. This integration allows you to ingest campaign data from MoEngage for further analysis.

## Considerations

- To use this integration, you need a MoEngage account.
- See this documentation for more information around the type of [campaign data events and user attributes](https://partners.moengage.com/hc/en-us/articles/4409507678228-Amplitude) you can ingest from MoEngage.

## Setup

### Amplitude setup

Copy the Amplitude API key for your project and have it ready for setup within MoEngage. There are no other setup steps in Amplitude. 

### MoEngage setup

For more information on how to set up and use this integration, see the [MoEngage documentation](https://partners.moengage.com/hc/en-us/articles/4409507678228-Amplitude).

1. In the MoEngage dashboard, navigate to the App Section.
2. Select **Add App** if you would like to create a new App.
3. Enter a name for your App and click **Add**.
4. Click **Export** and choose your report type: Basic or Advanced.
5. Select your channels type, campaign date and campaign.
6. Click **Export** to finish the export process.