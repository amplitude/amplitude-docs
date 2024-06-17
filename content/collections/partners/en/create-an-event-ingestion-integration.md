---
id: 0c5a2f84-c8e8-40be-8065-c6e4df96246a
blueprint: partner
title: 'Create an Event Ingestion Integration'
landing: true
source: 'https://www.docs.developers.amplitude.com/partners/event-ingestion-integration-guide/'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718647169
landing_blurb: 'Learn how to create an event ingestion integration with Amplitude.'
---
{{partial:admonition type="note" heading="Prework requirements"}}
This guide assumes that you've completed the prerequisites for building partner integrations listed in [Amplitude Integration Portal](/docs/partners/integration-portal)
{{/partial:admonition}}


This guide walks through the basics of creating an event ingestion integration in Amplitude. This guide doesn't cover any steps to building your integration or sending events to Amplitude. For information about how to send events to Amplitude see the [Http v2 API](/docs/apis/analytics/http-v2) documentation.

1. Navigate to **Settings > Developer Portal**.
2. Click **Add Connection Info**.
3. Enter the connection info: 
      - **Display Name**: The display name of the integration. This is the name that appears in the Integration Catalog and on your integration tile.
      - **Category**: Choose a category. The Integration Catalog  uses the category in filters.
      - **Summary**: A brief overview of your product.
      - **Full Description**: Detailed description of your integration. Include some common use cases so users understand why they should use the integration. 
      - **Integration Logo**: Upload your integration logo in PNG format.

## Integration setup

Configure the integration tile that appears on the **Sources** page in Amplitude after your integration is validated.

![](statamic://asset::help_center_conversions::partners/partner-add-new-source-page.png)

Notice that this page has two sections:

**Left Panel**: The *Configuration* section on the left is where you create the setup instructions for your data source and configure your integration tile.

**Right Panel**: The *Preview Data Source Setup Page* section provides a preview of what your setup instructions look like for a user.

1. From the Integration Portal page (**Settings > Developer Portal**), click **Add New Source**.
2. The Display Name is controlled by the Connection Information section.
3. Enter a subtitle. This appears under the title when the user sets up the integration. 
      
    {{partial:admonition type="example" heading="Example subtitles"}}
    - If you use Braze, you can now send events to Amplitude.
    - If you're using RudderStack to ingest data, you can import events into Amplitude with a few simple steps.
    - If you use Split for feature flagging and experimentation, you can track data into Amplitude with a simple configuration.
    {{/partial:admonition}}

4. Add as many setup steps as you need, but aim for no more than 5-8. You can include images that help orient your users. Mark **Show Project API Key** to automatically pull the relevant Project API on behalf of the user. Remember that all sources and destinations for Amplitude are configured on the [project level](/docs/admin/account-management/manage-orgs-projects), not the organization level.

    {{partial:admonition type="example" heading="See example setup steps in Amplitude"}}
    Navigate to **Data Sources** and click **I want to import data into Amplitude**. From there, you can click any integration tile to see their setup instructions.
    {{/partial:admonition}}
  
5. In **Additional Resources**, add a link to your documentation. For example: *See the Amplitude [documentation](/) for more details and instructions.*
6. When finished, click **Next** to go to the testing tab.

## Test and submit the integration

After you've configured your source information, you can test it and finally submit it for review.

1. From the **Test Source** tab, select the Amplitude project to test the integration with.
2. Copy the value in **Assigned Partner ID for this Source Integration**. You must include this value in a `partner_id` parameter when sending events to Amplitude. Amplitude needs this to track events coming from partners and validate the number of integration users.
3. Send a test event from your system.

    {{partial:admonition type="example" heading="Example payload"}}
    ```json

            POST https://api2.amplitude.com/2/httpapi

            {
            "api_key": "2a0d30356cbb278eee1a69b2bbe81c37",
            "events": [
                {
                "user_id": "test@example.com",
                "partner_id": "integration_name",
                "event_type": "Product Viewed",
                "time": 1663940508564,
                "event_properties": {
                    "message_type": "push",
                    "message_title": "Sample Message title",
                    "message_id": "68b32868-b6ab-4511-b552-cf668a1c0e59",
                    "message_contents": "Sample message content"
                }
                }
            ]
            }
    ```
    {{/partial:admonition}}

4. Wait for Amplitude to verify the event. 

After you have finished your testing, click **Submit** to submit your integration to the Amplitude team. The review process should take about one week. When Amplitude approves your integration, you are notified via email and are able to see your integration tile in the Sources section of Amplitude.