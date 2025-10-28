---
id: b1d8d8a7-3cf2-43ad-8ee0-c2b4d81dcf4d
blueprint: destination-catalog
title: 'Google Pub/Sub (Cohort Sync)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
source: https://www.docs.developers.amplitude.com/data/destinations/google-pub-sub/
integration_type:
  - cohorts
integration_category:
  - messaging
partner_maintained: false
integration_icon: partner-icons/google-pub-sub.svg
use_cases:
  - 'The use case with sending data to Google Pub/Sub involves leveraging Google Cloud Pub/Sub as a reliable and scalable foundation for stream analytics and event-driven computing systems. With this integration, Amplitude users can instantly send customer data to Google Pub/Sub, allowing them to stream their Amplitude event data directly to Pub/Sub. This enables real-time exchange of messages between Google Cloud applications, making it an ideal solution for those seeking a distributed publish-subscribe system to streamline large-scale event-driven computing systems.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713563056
---
Amplitude Data's Google Pub/Sub Cohort integration lets you stream your cohort membership updates straight to a Pub/Sub topic.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration for each Amplitude project you want to use it in.
- You should have an understanding of [Amplitude Activation](https://help.amplitude.com/hc/en-us/articles/360028552471-Amplitude-Engage) and [Behavioral Cohorts](https://help.amplitude.com/hc/en-us/articles/231881448) before setting up this integration.
- Cohort updates can be sent via all the supported cadences (Daily, Hourly, Real Time).
- All the existing Real Time Cohort Sync limits apply here.

## Payload

The payload sent to Pub/Sub is a JSON object. Example:

```json
{
  "cohort_name": "Test Cohort",
  "cohort_id": "gs72ns",
  "in_cohort": true,
  "computed_time": "1685748245",
  "message_id": "some-message-id:54",
  "users": [{
    "user_id": "user1@amplitude.com"
    },
    {
      "user_id": "user2@amplitude.com"
    }]
}
```

- **cohort_name**: String. the name of the audience
- **cohort_id**: String. the unique ID of the audience, which can also be found in URL when viewing it on Amplitude
- **in_cohort**: Boolean. Indicating this batch of users is “entering” or “exiting” an audience. Each message will only have one of either state but not both.
- **compute_time**: String. The Epoch timestamp when we re-compute the audience in Amplitude. Due to the nature of Kinesis streaming, it’s impossible to enforce order upon receiving the message. The team can leverage this to resume the order.
  - We kept it as a string rather than a number because depending on the programming language/platform the team is using, a JSON number can be interpreted as a float and lose precision.
- **message_id**: String. The unique id of each message.
- **users**: List. The users batch. Each user will be represented as a JSON object
  - **user_id**: String. the id of the user

## Setup

### Prerequisites

Before you get started, create a topic in Pub/Sub, and a Google IAM service account.

Amplitude needs two things from Pub/Sub to set up the integration:

- **Pub/Sub topic name**: The name of the topic, not the full name in the google cloud. See the [Google Pub/Sub](https://cloud.google.com/pubsub/docs/admin) documentation for help with this step.
- **Google service account key**: You should create a dedicated service account for Amplitude Pub/Sub integration. See the [Google documentation](https://cloud.google.com/iam/docs/service-accounts) for help with this step.

### Google Pub/Sub Setup

After you create your topic and service role, you must add the service account as a principle for the topic you created. For more detailed instructions for this step, see the [Google documentation](https://cloud.google.com/pubsub/docs/access-control?hl=en#console).

1. Open the topic.
2. In the Permissions tab, click Add Principal.
3. Add the service account's name.
4. Select Pub/Sub Publisher as the role.

Now, create a key for the service account. You need this to complete Amplitude setup. See the [Google documentation](https://cloud.google.com/iam/docs/creating-managing-service-account-keys) for help with this step.

### Amplitude setup

1. In Amplitude Data, click Catalog and select the Destinations tab.
2. In the Cohort section, click on Google Pub/Sub.
3. Click Add another destination.
4. Enter the Display Name for this destination. This is just a name to identify the destination when syncing the cohort.
5. Enter the pub/sub topic id.
6. Upload the service account key in the .json format based on the above setup.
7. Save the destination.

This will create the destination for cohorts to be synced to.

### Syncing Cohort Updates

1. In Amplitude, open the cohort you want to export.
2. Click Sync, and choose Google Pub/Sub.
3. Select the destination created above.
4. Select the sync frequency you need.
