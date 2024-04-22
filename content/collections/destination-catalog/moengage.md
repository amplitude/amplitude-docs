---
id: c6193890-9440-41ea-b62b-8e3cc1444a04
blueprint: destination-catalog
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
partner_doc_link: 'https://www.moengage.com/app-marketplace/amplitude/'
title: MoEngage (Event Stream)
source: 'https://docs.developers.amplitude.com/data/destinations/moengage'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
partner_maintained: false
integration_icon: partner-icons/moengage.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479539
connection: destination
---

[MoEngage](https://www.linkedin.com/company/moengage/) is an insights-led customer engagement platform for the customer-obsessed marketers and product owners. With MoEngage you can analyze customer behavior and engage them with personalized communication across the web, mobile, and email. MoEngage is a full-stack solution consisting of powerful customer analytics, AI-powered customer journey orchestration, and personalization.

## Considerations

Keep these things in mind when sending events to [MoEngage](https://www.moengage.com/):

- You must enable this integration in each Amplitude project you want to use it in.
- You need a MoEngage account to enable this integration.
- Relevant limits for MoEngage events are:
    - 10k events per app per minute
- Amplitude sends selected user and event properties along with the event.
- This integration supports user identify forwarding. This means when you enable **Send Users**  during setup, user updates are sent to MoEngage every time any user property changes in Amplitude.

## Setup

### MoEngage setup

Create an access token in MoEngage. You need this to complete the Amplitude setup.

1. Log in to your My MoEngage account.
2. Navigate to MoEngage Dashboard >> Settings >> APIs.
3. Under Data API Settings, find your **DATA API ID** and **DATA API KEY**. You will need this later to configure the integration on Amplitude.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the Destinations tab.
2. In the Event Streaming section, click **MoEngage**.
3. Enter a sync name, then click **Create Sync**.
4. Toggle status to **Enabled**.
5. Generate your Basic Auth Token
    1. Go to https://www.debugbear.com/basic-auth-header-generator.
    2. Enter your DATA API ID as the username and your DATA API KEY as the password in the respective fields.
    3. Click the "Generate Token" button.
    4. Copy the generated token.
    5. Paste the token into the Basic Auth Token field in the integration setup form.
6. Paste your **Basic Auth Token**, **DATA APP ID** and **Data Center** information.
    1. Data Center Values: “01”, “02”, “03”, “04”. You can refer to this [article](https://help.moengage.com/hc/en-us/articles/360057030512-Data-Centers-in-MoEngage) for more details on identifying your MoEngage data center.
7. Toggle the **Send events** filter to select the events to send. You can send all events, but Amplitude recommends choosing the most important ones.
8. Use the **Event Properties** filter to select which Event Properties you would like to send.
9. Under **Send Users**, make sure the toggle is enabled ("Users are sent to MoEngage") if you want to stream users and their properties to MoEngage. When enabled, users are automatically created or updated in MoEngage when an event is sent to Amplitude.
10. When finished, save your work.

## View forwarded events from Amplitude in MoEngage

1. Log into MoEngage.
2. Navigate to the **Events** tab.
3. Click **Custom Events** to view the log of events.

## Use cases

1. **Personalization:** By sending user properties from Amplitude to MoEngage, you can create more personalized experiences for your users. For example, you could send information about a user's location or language preference, and use that information to tailor your messaging or content to their specific needs.
2. **Segmentation:** By sending events and event properties from Amplitude to MoEngage, you can create segments of users based on their behavior. For example, you could create a segment of users who have completed a specific action in your app or website, and then target them with a specific campaign or message.
3. **Conversion tracking:** By sending events from Amplitude to MoEngage, you can track the effectiveness of your marketing campaigns and measure user behavior throughout the funnel. For example, you could track how many users who received a specific message from MoEngage went on to make a purchase or complete another desired action.
4. **A/B testing:** By sending events and event properties from Amplitude to MoEngage, you can create and run A/B tests to optimize your messaging and content. For example, you could create two different versions of a message and send each version to a different segment of users, then track which version leads to more engagement or conversions.
