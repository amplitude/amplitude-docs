---
id: 52bfec1f-fc6d-435e-b8ba-ac7d3f681869
blueprint: destination-catalog
title: Bento
source: 'https://docs.developers.amplitude.com/data/destinations/bento'
category: 'Event streaming'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - event-streaming
  - cohorts
integration_category:
  - customer-engagement
partner_doc_link: 'https://help.trybento.co/en/articles/6978743-amplitude-integration'
use_cases:
  -
    id: lv5gyw89
    use_case: "Customize user experiences on Bento using Amplitude's event data, improving engagement through targeted messages and tailored services."
  -
    id: lv5gz108
    use_case: 'Deliver context-specific guides on Bento based on Amplitude data, gathering user feedback to continually enhance guidance and user experience.'
short_description: 'Bento helps you build powerful and native-looking activation experiences in your product. From onboarding checklists presented in your app dashboard, to upsell and cross-sell cards, to new feature announcements, Bento empowers designers and PMs to build and test without being blocked by engineering.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713482003
partner_maintained: false
integration_icon: partner-icons/bento.svg
---
[Bento](https://www.trybento.co/) allows you to build powerful and native-looking activation experiences in your product. From onboarding checklists presented in your app dashboard, to upsell and cross-sell cards, to new feature announcements, Bento empowers designers and product managers to build and test without engineering support. 

To show the right users the right experience, you can send cohort information to Bento for guide targeting. Amplitude supports this at the user and group level. To automatically complete steps in a Bento guide when a user takes actions, you can pass in events from Amplitude. 

This integration lets you sync cohorts from Amplitude to Bento.

{{partial:admonition type="tip" heading="Bento maintains this integration"}}
Contact the [Bento support team](https://help.trybento.co/en/articles/6978743-send-events-to-amplitude) with any questions about this integration.
{{/partial:admonition}}

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.
- Users on paid plans Bento can access this integration.
- Bento processes cohorts and events will only for accounts and account users that already exist in Bento. Accounts or account users that aren't in Bento (for example, if Bento is feature flagged) have those attributes and events ignored."

## Setup

For more information on setting up this integration, see Bento’s [documentation](https://help.trybento.co/en/articles/6978743-amplitude-integration).

### Bento setup

1. On Bento’s dashboard, navigate to Settings → Keys & IDs.
2. Copy the App ID and the API key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Bento**.
3. Add a new destination.
4. Enter a name for this integration.
5. Paste your API key.
6. Map the same Amplitude User_ID with the primary key from the Bento panel.
7. Save when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to sync, then click **Sync**. 
2. Select **Bento**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

### Use cases

- **Targeted messaging:** By sending cohorts from Amplitude to User.com, businesses can target specific groups of users with relevant messaging. For example, a business might identify a cohort of users who have recently made a purchase and use User.com to send them a follow-up email with a personalized offer.
- **Behavioral triggers:** User.com allows businesses to set up automated triggers based on user behavior. By sending cohorts from Amplitude to User.com, businesses can create triggers based on specific actions or events. For example, a business might identify a cohort of users who have abandoned their cart and use User.com to automatically send them a reminder email after a certain period of time.
- **Segmentation:** User.com offers powerful segmentation capabilities, allowing businesses to create custom segments based on a variety of criteria. By sending cohorts from Amplitude to User.com, businesses can easily create segments based on specific user behaviors or characteristics.
- **Personalization:** User.com allows businesses to personalize their communications with users based on a variety of data points. By sending cohorts from Amplitude to User.com, businesses can leverage user data to create more personalized and relevant messaging.