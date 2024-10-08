---
id: fd1f6569-6f22-4562-9ab0-a06bd12f2a7f
blueprint: destination-catalog
use_cases:
  - 'The use case with sending data to Google Pub/Sub involves leveraging Google Cloud Pub/Sub as a reliable and scalable foundation for stream analytics and event-driven computing systems. With this integration, Amplitude users can instantly send customer data to Google Pub/Sub, allowing them to stream their Amplitude event data directly to Pub/Sub. This enables real-time exchange of messages between Google Cloud applications, making it an ideal solution for those seeking a distributed publish-subscribe system to streamline large-scale event-driven computing systems.'
short_description: 'Google Cloud Pub/Sub is a simple, reliable, scalable foundation for stream analytics and event-driven computing systems.'
integration_category:
  - messaging
integration_type:
  - event-streaming
title: 'Google Pub/Sub (Event Stream)'
source: 'https://docs.developers.amplitude.com/data/destinations/google-pub-sub'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/google-pub-sub.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478922
---

Amplitude Data's Google Pub/Sub integration lets you stream your Amplitude event data straight to Pub/Sub.

## Considerations

- Amplitude sends the `user_id`, `event_name`, and `created_at`  along with all user, group, and event properties to Pub/Sub.
- The data Amplitude posts in Pub/Sub is the same JSON as documented in the [Amplitude Export API](https://www.docs.developers.amplitude.com/analytics/apis/export-api/#response).
- This destination supports Identify Forwarding. Anytime you make an Identify call to Amplitude, Amplitude forwards that user information. See [Identify documentation](https://www.docs.developers.amplitude.com/analytics/apis/identify-api/) for more information.
- You must enter the Google Cloud Service Account as a base64 encoded string.  

## Setup

### Prerequisites

Before you get started, create a topic in Pub/Sub, and a Google IAM service account.

Amplitude needs two things from Pub/Sub to set up the integration:

- **Pub/Sub topic name**: The name of the topic, not the full name in the google cloud. See the [Google Pub/Sub](https://cloud.google.com/pubsub/docs/admin) documentation for help with this step. 
- **Google service account key**: You should create a dedicated service account for Amplitude Pub/Sub integration. See the [Google documentation](https://cloud.google.com/iam/docs/service-accounts) for help with this step.

### Google Pub/Sub setup

After you create your topic and service role, you must add the service account as a principle for the topic you created. For more detailed instructions for this step, see the [Google documentation](https://cloud.google.com/pubsub/docs/access-control?hl=en#console).

1. Open the topic.
2. In the *Permissions tab*, click **Add Principal**.
3. Add the service account's name.
4. Select **Pub/Sub Publisher** as the role.

Now, create a key for the service account. You need this to complete Amplitude setup. See the [Google documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for help with this step.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Event Streaming section, click **Google Pub/Sub**.
3. Enter a sync name, then click **Create Sync**.
4. Click **Edit**, then paste your Pub/Sub topic name and Google Cloud service account key.
5. Use the **Send events** filter to select the events you want to send. You can send all events, but Amplitude recommends choosing the most important ones.
6. When finished, enable the destination and save.
