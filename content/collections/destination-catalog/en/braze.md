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
The Amplitude Activation Braze streaming integration lets you forward your Amplitude events and users directly to [Braze](https://www.braze.com/).

## Setup

### Prerequisites

To configure streaming from Amplitude to Braze, you need the following information from Braze.

- **Braze API Endpoint**: The Braze endpoint for REST operations. Go to the [Braze documentation](https://www.braze.com/docs/api/basics/#endpoints) for help determining your endpoint.
- **Braze API Key**: The Braze API key used for authentication. Go to the [Braze documentation](https://www.braze.com/docs/api/basics/#rest-api-key) for help locating your API key.
- **Braze App ID**: The Braze App ID for the app receiving Amplitude events. Go to the [Braze documentation](https://www.braze.com/docs/api/identifier_types/#the-app-identifier-api-key) for help locating your app ID.

### Create a new sync

1. In Amplitude Data, go to *Catalog > Destinations*.
2. In the Event Streaming section, select **Braze**.
3. Enter a sync name, then select **Create Sync**.

### Enter credentials

1. Select your **Braze API Endpoint**.
2. Enter your **Braze API Key**.
3. Enter your **Braze App ID**.
4. If you use the [Braze User Alias](https://www.braze.com/docs/api/objects_filters/user_alias_object) to identify your users in Braze, enter the **Braze User Alias Label** you plan to use. Otherwise, leave this field blank.
5. Select **Update Users Only** to update users that already exist in Braze instead of creating new ones. Leave the option unchecked if you send alias-only user profiles, otherwise Braze won't create those profiles. Review the [Braze documentation](https://www.braze.com/docs/api/objects_filters/user_attributes_object) for more details.

### Configure mappings

_This applies to both event and user forwarding._

1. From the left dropdown, select the Amplitude user property that corresponds to your Braze user ID.
2. From the right dropdown, select the type of Braze user ID you use.
    - [**External ID**](https://www.braze.com/docs/api/basics/#user-ids): Any unique identifier for each user in Braze.
    - [**Braze ID**](https://www.braze.com/docs/api/basics/#user-ids): A unique identifier provided by Braze for each user.
    - [**User Alias**](https://www.braze.com/docs/api/objects_filters/user_alias_object): An alternative unique identifier for each user in Braze.
    - [**Email**](https://www.braze.com/docs/api/endpoints/user_data/post_user_track/#frequently-asked-questions): Using email as the identifier without an External ID or Braze ID may lead to unexpected behavior. For example, if Amplitude sends a user to Braze with an ID and the same email, Braze doesn't merge them, resulting in two separate users. For instructions to avoid this case, go to Braze’s [User Profiles](https://www.braze.com/docs/user_guide/engagement_tools/segments/user_profiles/) documentation. Braze also provides a [Merge User API](https://www.braze.com/docs/api/endpoints/user_data/post_users_merge/) for merging users, offering you more flexibility and control.

### Configure event forwarding

Enable **Send Events** to stream events to Braze. When the toggle shows "Events are sent to Braze," Amplitude forwards events as soon as it ingests them. The integration doesn't support scheduled or on-demand sends.

1. In **Select and filter events**, choose the events you need in Braze.


{{partial:admonition type="warning" title="Events for anonymous users"}}
Braze requires that all events have an identifier present. If you selected any events to send to Braze that may not have an identifier, add a filter to send only events where the identifier is present. Otherwise, your delivery metrics may be affected.
{{/partial:admonition}}

1. (Optional) In **Select additional properties**, choose any extra event and user properties you want to send to Braze. If you leave the field empty, Amplitude doesn't send additional properties. Amplitude maps the selected properties to [Braze custom event properties](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_events/#custom-event-properties).

### Configure user forwarding

Enable **Send Users** to stream user and property updates to Braze. Amplitude creates or updates Braze users when you update them in Amplitude with the [HTTP V2 API](/docs/apis/analytics/http-v2) or [Identify API](/docs/apis/analytics/identify). The integration doesn't support scheduled or on-demand updates.

Select optional user properties to send in **Select additional properties**. Amplitude sends only the properties you choose, and only after one of them changes. Amplitude maps those properties to [Braze custom attributes](https://www.braze.com/docs/user_guide/data_and_analytics/custom_data/custom_attributes/).

### Enable sync

When you're satisfied with the configuration, set **Status** to **Enabled**, then select **Save**.