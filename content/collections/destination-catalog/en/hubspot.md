---
id: 643a3c96-cc8f-4824-a2e8-2e8af2873080
blueprint: destination-catalog
use_cases:
  - 'HubSpot streaming integration enables you to forward your Amplitude events and event properties'
short_description: 'HubSpot is an all-in-one marketing tool that helps attract new leads and convert them into paying customers.'
integration_category:
  - marketing-automation
integration_type:
  - event-streaming
partner_doc_link: 'https://ecosystem.hubspot.com/marketplace/apps/marketing/analytics-data/amplitude-engage'
title: 'HubSpot (event stream)'
source: 'https://docs.developers.amplitude.com/data/destinations/hubspot'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/hubspot.svg
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1722024870
---
[HubSpot](https://www.hubspot.com/) is an easy to use and powerful CRM platform that enables scaling companies to sell, market and provide customer service from a unified UI. 

Amplitude's HubSpot streaming integration enables you to forward your Amplitude events and event properties straight to HubSpot with just a few clicks.

## Considerations

Keep these things in mind when sending events to HubSpot:

- You must enable this integration in each Amplitude project you want to use it in.
- Events from Amplitude appear as custom events in HubSpot.
- A HubSpot Enterprise subscription is required to send custom events.
- Relevant limits for HubSpot events are:
    - HubSpot enforces strict API rate limits. You can find more information about these limits [here](https://developers.hubspot.com/docs/api/usage-details).
    - HubSpot allows up to 50 properties for each custom behavior event.
- Types of data you can forward to HubSpot:
    - Amplitude sends selected event properties along with the event.
    - Amplitude doesn't perform an identity call for this integration. This means Amplitude doesn't send any user properties information directly to HubSpot.
- Latency considerations:
    - Amplitude targets an end-to-end p95 latency of 60s. This means 95% of Events streamed deliver to HubSpot within 60s or less. Amplitude has internal processes, monitors, and alerts in place meet this target.   

## Setup

### HubSpot setup

Create the custom events and note down their internal name and add event properties that you want to forward to HubSpot. Include a string property named `event_type` in the custom event, which indicates the specific type of event within Amplitude. 

Learn how to create the event and event property in HubSpot [here](https://knowledge.hubspot.com/analytics-tools/create-custom-behavioral-events-with-the-code-wizard). 

### Amplitude setup

1. In Amplitude Data, navigate to *Catalog > Destinations*.
2. Scroll down and click *HubSpot*.
3. Enter a sync name, then click *Create Sync*.
4. Choose a HubSpot Account ID or authenticate with HubSpot.

![hubspot.png](/docs/output/img/sources/hubspot.png)

6. Enter the HubSpot event name created by HubSpot.
7. Toggle the *Send events* filter to select the events to send. HubSpot recommends choosing the events that are most important to your use case. 
8. Click *Select & filter events* to choose the event type of the events you would like to send.
9. Click *Map properties to destination* to specify the identity mapping between Amplitude and HubSpot. HubSpot requires the identifier to be at least one of the following: `utk`, `email`, or object ID.
10. Click *Select additional properties* to specify the event properties you wish to forward to HubSpot. By default, the event properties only include the `event_type` property, which indicates the type of event for a particular event in Amplitude.
11. When finished, enable the destination and click *Save*.

## Use custom event data in HubSpot

- Learn more about how you can [analyze custom events](https://knowledge.hubspot.com/analytics-tools/analyze-custom-behavioral-events) in HubSpot.

### View event completions

1. In your HubSpot account, navigate to *Reports > Analytics Tools*.
2. Click *Custom Events*.
3. Open the *Analyze* tab.
4. To filter the data for a specific time range and frequency, click the Date range and Frequency dropdown menus.
5. To view chart data for specific events in the chart, check the checkboxes next to those events in the table.
6. To view more detail for an event, including completions, unique visitors, and the properties associated with the event, click the name of the event in the table.

### Report on custom events

1. In your HubSpot account, navigate to *Reports > Reports*.
2. In the upper right, click *Create custom report*.
3. In the left sidebar, select *Custom Report Builder*.
4. To use custom events as your primary data source, click the *Primary data source* dropdown menu, then select *Custom events*.
5. If you want to use custom events as a non-primary source, select *Custom events* from the Other section. 
6. Continue [building your report](https://knowledge.hubspot.com/reports/create-reports-with-the-custom-report-builder). To specify which event you want to report on, in the left sidebar, click the *Browse* dropdown menu, then select *Custom events*. Then, under custom events, select the event you want to report on.

### Custom events in workflows

1. In your HubSpot account, navigate to *Automation > Workflows*.
2. Click the name of a workflow. Or, learn how to create a new workflow.
3. In the workflow editor, click the **+ plus icon** to add a workflow action.
4. In the right panel, select **Delay until the event happens**.
5. Configure the delay:
    - Click the *Event* dropdown menu, then select a *custom event*.
    - Then, select the *event property* that you want to delay on.
    - Select the *filter* for the event property.
    - Click *Apply filter*.
    - Select the maximum wait time, or check *Delay as long as possible*.
6. Click *Save*.

## Use cases

1. **Personalized Marketing:** With the ability to track user behavior and capture user and event properties in Amplitude, businesses can create highly personalized and targeted marketing campaigns in HubSpot. This can lead to increased engagement, conversions, and customer loyalty.
2. **Lead Scoring and Nurturing:** By tracking user behavior and capturing user and event properties in Amplitude, businesses can score and rank leads based on their level of engagement and interests. This can help businesses to optimize their lead nurturing efforts and increase their chances of closing deals.
3. **Customer Retention:** By tracking user behavior and capturing user and event properties in Amplitude, businesses can identify customers who are at risk of churning and take proactive steps to retain them. For instance, businesses can trigger personalized emails or ads to offer discounts or incentives to encourage customers to stay engaged with the product or service.

## Disconnect HubSpot from within Amplitude

To disconnect HubSpot from within Amplitude, follow these steps:

1. In Amplitude, navigate to *Data > Sources > HubSpot*.
2. Click the trash can icon.
3. Follow the instructions displayed in the confirmation modal that appears.
4. Click *Delete*.

Disconnecting HubSpot means new data sent from this source will no longer be processed. Historical data from HubSpot won’t be deleted and can still be analyzed.

## Uninstall Amplitude from a HubSpot account

To disconnect HubSpot from within Amplitude, follow these steps:

1. In HubSpot, navigate to *Reporting & Data > Integrations > Connected apps > Amplitude*.
2. Select *Uninstall* from the *Actions* dropdown.
3. Follow the instructions displayed in the confirmation modal that appears.
4. Click *Uninstall*.

This won’t delete any existing Amplitude data in HubSpot, but it will no longer be updated.