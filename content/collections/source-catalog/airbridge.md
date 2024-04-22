---
id: 3fa2f5df-8817-4ef0-b672-49d8c65a13b4
blueprint: source-catalog
use_cases:
  - 'Better analyze user behaviors down funnel by sending attribution data, events, event properties, and user properties from Airbridge to Amplitude.'
  - 'Automate relevant, personalized real-time Mobile Push, In-App, Web Push, SMS, and Email notifications based on event triggers and user attributes.'
short_description: 'Airbridge is a people-based, multi-touch attribution, and incrementality measurement platform helping marketers measure the true sources of their growth and confidently optimize their marketing campaigns.'
integration_category:
  - attribution
integration_type:
  - raw-events
partner_doc_link: 'https://help.airbridge.io/en/guides/amplitude'
title: Airbridge
source: 'https://www.docs.developers.amplitude.com/data/sources/airbridge'
category: Attribution
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/airbridge.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713818870
---
[Airbridge](https://www.airbridge.io) is a mobile measurement (MMP) solution that provides best-in-class measurement services. Services include web and app universal attribution and multi-touch attribution (MTA) and incrementality to measure true marketing effectiveness.

You can send attribution data, events, event properties and user properties from Airbridge to Amplitude to further analyze the user behaviors down the funnel. 

See the [Airbridge documentation](https://help.airbridge.io/en/guides/amplitude#amplitude-v2-integration-http-api) for more details on sending events to Amplitude. 

## Setup

{{partial:admonition type="note" title="Using Amplitude JavaScript or React Native SDKs"}}
If you use an Amplitude JavaScript SDK or React Native SDK, contact [support@airbridge.io](mailto:support@airbridge.io) to enhance your user matching probability before setting up this integration.
{{/partial:admonition}}

### Amplitude setup 

Before you begin, you need your Amplitude project API key. 

There are no other setup steps in Amplitude.

### Airbridge setup

1. In the Airbridge dashboard, navigate to the Integration section and select Third-party Integrations, followed by the Amplitude V2 tile.
2. Select **Add Connection**. Enter a name and enter your Amplitude project's API key into the input box. 
3. Click **Next**.
4. Select all the events you want to send to Amplitude and click **Next**.
5. Select all the properties you want to send to Amplitude and click **Next**.
6. Click **Add rule** and customize your data delivery rule by adding conditions. You can apply multiple conditions by selecting **+ Add Condition**. Select **Add** to proceed with next steps.
7. Click **Add connection**.
8. Click **Activate** to complete the setup process.