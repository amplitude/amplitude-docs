---
id: 15617954-9537-4693-a1b0-653fa869c7cd
blueprint: destination-catalog
title: Kochava (Install)
source: 'https://docs.developers.amplitude.com/data/destinations/kochava-install'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
integration_category:
  - attribution
partner_maintained: false
integration_icon: partner-icons/kochava.svg
use_cases:
  - 'Ingesting events from Kochava to Amplitude enables secure, real-time data solutions for people-based marketers, enhancing their understanding and targeting of specific cohorts effectively.'
  - 'Streaming events from Amplitude to Kochava facilitates comprehensive insights into user behavior and engagement, empowering marketers to optimize their mobile marketing strategies and maximize ROI with accurate and up-to-date data synchronization.'
short_description: 'Kochava offers secure, real-time data solutions for people-based marketers, helping them understand and reach their target audiences effectively.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713479123
---

                                                                                                         
[Kochava](https://www.kochava.com) empowers advertisers and publishers with a platform to help growth marketers. Kochava delivers what marketers need, when they need it, to establish customer identity and segment and activate audiences in a privacy-first world.

{{partial:admonition type="note" title="Choose the correct Amplitude-Kochava streaming integration"}}
This guide is designed to assist you in creating a seamless connection for transmitting events right after users install your app. These crucial events, often termed as "install events," signify users' initial interactions within your app, forming the cornerstone of their ongoing engagement.
      
The "Send User" feature where we forward user attributes is not available in this integration. This decision is based on the requirements of Kochava's IdentityLink feature. IdentityLink calls, which link user identities with their actions, must align with or follow the installation or event data to ensure a smooth and accurate connection. In other words, user attributes forwarding needs to occur in conjunction with or after the initial app installation or event data for proper linkage and reporting.
{{/partial:admonition}}

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a Kochava account to enable this integration.
- Amplitude has two destinations for **Kochava (Install)** and Kochava **(Post Install)**.
  - We support only the identity (user-attributes) forwarding to Kochava in **Kochava (Post Install)**.
- Amplitude uses the **IdentityLink** API of Kochava to send user-attributes and this will link the user-level data with the device ID. The user attributes sent by Amplitude will not be tied if the Install event with the same device ID was not received at Kochava before.
- Relevant limits for Kochava events are:
  - Kochava does not impose any hard limits on quantity or velocity; however, requests sent too quickly will return 429 responses. Amplitude will handle these automatically. 
  - The requests must be smaller than 2MB.

## Setup

### Prerequisites

To configure an Event Streaming integration from Amplitude to Kochava, you must fulfill the following prerequisites from Kochava:

- **A Kochava Account:** You must have a Kochava account to leverage this integration. Contact Kochava for more details.
- **Kochava App GUID:** You must create an App and have the GUID assigned to the App.
- **(Optional) Kochava API Key:** If you want to enable the authentication with the integration, you have to add your API Key in the Account Option.
- **(Optional) Kochava secret authentication key:** If you want to enable the authentication with the integration, you have to request a secret authentication key through the Kochava Client Success Team.

### Kochava setup

1. Log into your Kochava dashboard and copy your **Account ID** and **Account Passcode**.
2. Go to the All **Apps** section and copy the GUID of the App you created.
3. (Optional) Go to **Account Options** and select **API Keys** to locate or create your API key.
4. (Optional) Contact your Kochava Client Success Manager to obtain your Kochava secret authentication key.

### Amplitude setup

1. In Amplitude, navigate to **Data Destinations**, then find **Kochava (Install)**.
2. Enter a sync name, then click **Create Sync**.
3. Toggle Status from **Disabled** to **Enabled**.
4. Paste your **App GUID**.
5. *(Optional)* Click the single box **Enable Authentication** if you want to authenticate your sync.
6. *(Optional)* Paste your **API Key** (taken from the Kochava account).
7. *(Optional)* Paste your secret key to **API secret** (provided by Kochava's CS team).
8. Under **Send Events**, make sure the toggle is enabled ("Events are sent to Kochava") if you want to stream events to Kochava. When enabled, events are automatically forwarded to Kochava when they're ingested in Amplitude. Events aren't sent on a schedule or on-demand using this integration.
9. In **Select and Filter** events choose which events you want to send. Choose only the events you need in Kochava. [Transformed events](/docs/data/transformations) aren't supported.
10. Click **Map properties to destination** to specify the identity mapping between Amplitude and Kochava. **Kochava Device ID** and **IP Address** (the IP address of the device on install) are required to map to save your sync configuration. Choose at least one of the following identifiers, Apple Advertising ID (idfa), Apple Vendor ID (idfv), Google Advertising ID (adid) and Android ID (android_id).
11. *(optional)* In **Select additional properties**, select any more user properties you want to send to Kochava. If you don't select any properties here, Amplitude doesn't send any. Transformed event properties and transformed user properties aren't supported.
12. When finished, enable the destination and **Save**.

#### What is difference between Kochava Device ID and other identifiers?

Send the Kochava Device ID as a unique string that is consistent for each instance of the app on a single device. The other identifiers (for example, Apple Advertising ID and Google Advertising ID) are the relevant mobile advertising IDs. So, a Kochava device can have the multiple device ids but the **Kochava Device ID** must be unique. Kochava Device ID can be technically the same string as the other identifiers but it is different concept.

### Use Cases

Sending events from Amplitude to Kochava can enhance the effectiveness of your communication strategies and help drive higher-value conversions through targeted and personalized messaging. Here are some specific use cases for integrating Amplitude with Kochava:

1) **Campaign ROI Insights:** Correlate user actions tracked by Amplitude with specific marketing campaigns in Kochava for accurate attribution, enabling optimized allocation of marketing budgets.
2) **Personalized Ad Targeting:** Combine Amplitude's user behavior data with Kochava's audience segmentation to deliver tailored ads to users based on their interactions, increasing conversion chances.
3) **LTV Analysis and Retention:** Analyze user behavior from Amplitude in Kochava to identify high lifetime value users, allowing for targeted retention strategies like customized incentives or offers.

