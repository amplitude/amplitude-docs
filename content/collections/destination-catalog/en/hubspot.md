---
id: 643a3c96-cc8f-4824-a2e8-2e8af2873080
blueprint: destination-catalog
title: 'HubSpot (Event Stream)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
partner_maintained: false
integration_icon: partner-icons/hubspot.svg
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
source: 'https://www.docs.developers.amplitude.com/data/destinations/hubspot-event-streaming-v2/'
updated_at: 1722034306
---
[HubSpot](https://www.hubspot.com/) is an easy to use and powerful CRM platform that enables scaling companies to sell, market and provide customer service from a unified UI. Amplitude's HubSpot streaming integration enables you to forward your Amplitude events and event properties straight to HubSpot with just a few clicks.

## Use cases

1. **Personalized Marketing:** With the ability to track user behavior and capture user and event properties in Amplitude, businesses can create highly personalized and targeted marketing campaigns in HubSpot. This can lead to increased engagement, conversions, and customer loyalty.
2. **Lead Scoring and Nurturing:** By tracking user behavior and capturing user and event properties in Amplitude, businesses can score and rank leads based on their level of engagement and interests. This can help businesses to optimize their lead nurturing efforts and increase their chances of closing deals.
3. **Customer Retention:** By tracking user behavior and capturing user and event properties in Amplitude, businesses can identify customers who are at risk of churning and take proactive steps to retain them. For instance, businesses can trigger personalized emails or ads to offer discounts or incentives to encourage customers to stay engaged with the product or service.

## Considerations

Keep these things in mind when sending events to HubSpot:

- If you already have an existing HubSpot streaming connection, re-authenticate with HubSpot to grant additional permissions to create events and properties for you. With this update, Amplitude sends events and their properties to different event definitions in HubSpot, matching each of the selected events, rather than the single event definition from the internal event name.
- You must enable this integration in each Amplitude project you want to use it in.
- Events from Amplitude appear as custom events in HubSpot.
- A HubSpot Enterprise subscription is required to send custom events. See the [HubSpot Product & Services Catalog](https://legal.hubspot.com/hubspot-product-and-services-catalog) for more information.
- Relevant limits for HubSpot events are:
    - HubSpot enforces strict API rate limits. You can find more information about these limits on HubSport's[Usage Details](https://developers.HubSpot.com/docs/api/usage-details) page.
    - HubSpot allows up to 50 custom properties for each custom event.
- Amplitude sends selected event and user properties along with the event.
- Amplitude targets an end-to-end p95 latency of 60s. This means 95% of Events streamed deliver to HubSpot within 60s or less. Amplitude has internal processes, monitors, and alerts in place to meet this target.     

## Setup

### Amplitude setup

1. In Amplitude Data, navigate to *Catalog > Destinations*.
2. Scroll down and click *HubSpot V2*.
3. Enter a sync name, then click *Create Sync*.
4. Choose a HubSpot Account ID or authenticate with HubSpot. If you have an existing Account ID, re-authenticate to grant the necessary permissions from HubSpot.
5. Toggle the *Send events* filter to select the events to send.
6. Under *Select & filter events*, choose the Amplitude Events you would like to map to HubSpot. Provide a HubSpot Internal Event Name that corresponds to the Amplitude event you’ve selected. HubSpot recommends choosing the events that are most important to your use case.
7. Under *Map properties to destinations*, select the Event Properties you would like to send. The HubSpot identifier for this object must be at least one of the following: `User Token`, `Email` or `Object ID`.
8. Under *Select additional properties*, select any extra event and user properties you want to send to HubSpot. If you don't select any properties here, Amplitude doesn't send any.
9. When finished, enable the destination and click *Save*.

## Use custom event data in HubSpot

- Click here to learn more about how you can [analyze custom events](https://knowledge.HubSpot.com/analytics-tools/analyze-custom-behavioral-events) in HubSpot.
  
### Report on custom events

Analyze custom event completions from the custom events tool, and event data is available in the custom report builder and attribution reports.

Learn more about [analyzing your custom events](https://knowledge.hubspot.com/analytics-tools/analyze-custom-behavioral-events).

### View event completions on the contact timeline

Event completions appear on the contact record timeline, along with any properties that populate.

To view event details on the contact timeline:

- [Navigate to a contact record](https://knowledge.hubspot.com/records/work-with-records) that has completed a custom event.
- To filter a contact timeline by completed events, click *Filter activity*, then select *Custom event*.
- In the contact timeline, click to expand the *event* to display the event details.

### Use custom events in workflows

In a workflow, you can delay based on custom event completions using a [Delay until event happens action](https://knowledge.hubspot.com/workflows/use-delays) or an event enrollment trigger.

1. In your HubSpot account, navigate to *Automation > Workflows*.
2. Click the name of a workflow. Or, learn how to create a new workflow.
3. In the workflow editor, click the + icon to add a workflow action.
4. In the right panel, click *Delay until the event happens*.
5. Configure the delay:
    - From the *Event* dropdown menu, select a *custom event*.
    - Select the event property you want to delay on.
    - Select the filter for the event property.
    - Click *Apply filter*.
    - Select the maximum wait time, or check *Delay as long as possible*.
6. Click *Save*.

## Disconnect HubSpot from within Amplitude

To disconnect HubSpot from within Amplitude, follow these steps:

1. In Amplitude, navigate to *Data > Sources > HubSpot*.
2. Click the trash can icon.
3. Follow the instructions displayed in the confirmation modal that appears.
4. Click *Delete*.

Disconnecting HubSpot means Amplitude won't process new data sent from this source. Amplitude doesn't delete historical data from HubSpot, so you can still analyze it.

## Uninstall Amplitude from a HubSpot account

To disconnect HubSpot from within Amplitude, follow these steps:

1. In HubSpot, navigate to *Reporting & Data > Integrations > Connected apps > Amplitude*.
2. Select *Uninstall* from the *Actions* dropdown.
3. Follow the instructions displayed in the confirmation modal that appears.
4. Click *Uninstall*.

This won’t delete any existing Amplitude data in HubSpot, but it will no longer be updated.