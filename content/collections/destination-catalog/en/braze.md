---
id: 82541dc2-197b-4f22-a8af-69352743caae
blueprint: destination-catalog
use_cases:
  - 'Sending Events to Braze: This capability allows organizations to transmit event data from Amplitude to Braze in real-time. By streaming events, such as user interactions or product usage, to Braze, customers gain deeper insights into customer behavior and engagement patterns. Braze can then leverage this data to trigger automated messages, optimize marketing campaigns, and deliver personalized experiences across various digital channels. This fosters more effective communication with customers and drives higher conversion rates.'
  - "Sending Events from Braze back to Amplitude: This use case enables a bidirectional flow of data between Braze and Amplitude. After processing customer interactions and engagements within Braze, relevant event data can be sent back to Amplitude. By integrating this data into Amplitude's analytics platform, customers gain a comprehensive view of customer behavior and campaign performance. This holistic understanding allows customers to refine their marketing strategies, identify growth opportunities, and optimize the customer experience for enhanced satisfaction and loyalty."
short_description: 'A comprehensive customer engagement platform that powers relevant experiences between consumers and brands they love. Braze helps foster human connection through interactive conversations across channels.'
integration_category:
  - marketing-automation
integration_type:
  - event-streaming
partner_doc_link: 'https://www.braze.com/docs/partners/data_and_infrastructure_agility/analytics/amplitude/amplitude_audiences/#sync-user-traits-and-computations'
title: 'Braze (Event Stream)'
source: 'https://docs.developers.amplitude.com/data/destinations/braze'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/braze.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713560693
---
The Amplitude Activation Braze streaming integration enables you to forward your Amplitude events and users straight to [Braze](https://www.braze.com/) with just a few clicks.

## Setup

### Prerequisites

To configure streaming from Amplitude to Braze, you need the following information from Braze.

- **Braze API Endpoint**: The Braze endpoint for REST operations. See the [Braze documentation](https://www.braze.com/docs/api/basics/#endpoints) for help determining your endpoint.
- **Braze API Key**: The Braze API key used for authentication. See the [Braze documentation](https://www.braze.com/docs/api/basics/#rest-api-key) for help locating your API key.
- **Braze App ID**: The Braze App ID for the app receiving Amplitude events. See the [Braze documentation](https://www.braze.com/docs/api/identifier_types/#the-app-identifier-api-key) for help locating your app ID.

### Create a new sync

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Braze**.
3. Enter a sync name, then click **Create Sync**.

### Enter credentials

1. Select your **Braze API Endpoint**.
2. Enter your **Braze API Key**.
3. Enter your **Braze App ID**.
4. If you use the [Braze User Alias](https://www.braze.com/docs/api/objects_filters/user_alias_object) to identify your users on Braze, enter the **Braze User Alias Label** you plan to use. Otherwise, you can ignore this field.
5. Check the **Update Users Only**  option to update users that exist in Braze, not create new users. If you send alias-only user profiles, don't check this field. If you check **Update Users Only**, your alias-only user profiles aren't created in Braze. More information available in the [Braze documentation](https://www.braze.com/docs/api/objects_filters/user_attributes_object).

### Configure mappings

_This applies to both event and user forwarding. Transformed user properties aren't supported._

1. Select an Amplitude user property that corresponds to your Braze user ID, from the left dropdown.
2. Select the type of your Braze user ID, from the right dropdown.
    - [**External ID**](https://www.braze.com/docs/api/basics/#user-ids): Any unique identifier for each user in Braze.
    - [**Braze ID**](https://www.braze.com/docs/api/basics/#user-ids): A unique identifier provided by Braze for each user.
    - [**User Alias**](https://www.braze.com/docs/api/objects_filters/user_alias_object): An alternative unique identifier for each user in Braze.
    - [**Email**](https://www.braze.com/docs/api/endpoints/user_data/post_user_track/#frequently-asked-questions): Using email as the identifier without an External ID or Braze ID may lead to unexpected behavior. For example, if Amplitude sends a user to Braze with an ID and the same email, Braze doesn't merge them, resulting in two separate users. For instructions to avoid this case, see Braze’s [User Profiles](https://www.braze.com/docs/user_guide/engagement_tools/segments/user_profiles/) documentation. Braze also provides a [Merge User API](https://www.braze.com/docs/api/endpoints/user_data/post_users_merge/) for merging users, offering you more flexibility and control.

### Configure event forwarding

Under **Send Events**, make sure the toggle is enabled ("Events are sent to Braze") if you want to stream events to Braze. When enabled, events are automatically forwarded to Braze when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.

1. In **Select and filter events** choose which events you want to send. Choose only the events you need in Braze. _Transformed events aren't supported._


{{partial:admonition type="warning" title="Events for anonymous users"}}
Braze requires that all events have a user ID present. If you have selected any events to send to Braze that may not have a user ID, add a filter to send only events where the user ID is present. Otherwise, your delivery metrics may be affected.
{{/partial:admonition}}

2. (optional) In **Select additional properties**, select any more event and user properties you want to send to Braze. If you don't select any properties here, Amplitude doesn't send any. These properties are sent to Braze as [Braze custom event properties](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_events/#custom-event-properties). _Transformed event properties and transformed user properties aren't supported._

### Configure user forwarding

To stream user and property updates to Braze, enable **Send Users**. This setting creates or updates users in Braze when you update them in Amplitude with the [HTTP V2 API](/docs/apis/analytics/http-v2) or [Identify API](/docs/apis/analytics/identify). This integration doesn't support scheduled or on-demand updates.

You can optionally select user properties to send to Braze in the **Select additional properties** field. Amplitude sends only the properties you select and only when one of them is updated. Amplitude sends these properties as [Braze custom attributes](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_attributes/). _This integration doesn't support transformed user properties_.

### Enable sync

When satisfied with your configuration, at the top of the page toggle the **Status** to "Enabled" and click **Save**.