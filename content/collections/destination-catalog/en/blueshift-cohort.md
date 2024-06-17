---
id: 1d6b6acf-cb5f-4725-b8bc-a05d9693c7df
blueprint: destination-catalog
title: 'Blueshift Cohort'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
partner_maintained: false
integration_icon: partner-icons/blueshift.svg
source: 'https://www.docs.developers.amplitude.com/data/destinations/blueshift-cohort/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718649581
---

[Blueshift](https://blueshift.com/) helps brands deliver relevant, connected experiences across every customer interaction. The Blueshift platform uses patented AI technology to unify, inform, and activate the fullness of customer data across all channels and applications. Through unified data, omnichannel orchestration, intelligent decisioning, and unmatched scale, Blueshift gives brands all the tools to seamlessly deliver 1:1 experiences in real-time across the entire customer journey.

{{partial:admonition type="note" heading=""}}
This integration is maintained by Blueshift. Contact the [Blueshift support team](https://help.blueshift.com/hc/en-us) for support with this integration. 
{{/partial:admonition}}

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- Blueshift supports both email addresses and `customer_id` as the identifier. This means you need to map the `user_id` or user property you select in Amplitude must to either `email` or `customer_id`.

## Setup

For more information on setting up this integration, see [Blueshift’s documentation](https://help.blueshift.com/hc/en-us/articles/28092370413331-Amplitude).

### Blueshift setup

1. In Blueshift, navigate to Account Settings > API Keys.
2. Copy the User API Key and secret to your clipboard.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Blueshift**.
3. Click **Add another destination**.
4. Enter **Name** and paste in the **API key** and **Secret/Password** you copied from Blueshift.
5. Select the type of User ID from the dropdown (`email` or `customer_id`).
6. Map the Amplitude **User ID** field to the Blueshift **User ID** field.
7. Choose your identifier as the field.
8. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Blueshift**, then click **Next**
3. Choose the account you want to sync to
4. Choose the sync cadence.
5. When finished, save your work.

## Locating your cohort in Blueshift

1. Navigate to Data > Customers > List
2. Find cohorts synced from Amplitude with nomenclature - `[Amplitude] {Amplitude cohort name}: {Amplitude cohort ID}`

### Use cases

Sending cohorts from Amplitude to Blueshift can enable brands to leverage the power of Blueshift's AI technology and omnichannel capabilities to enhance customer engagement and deliver personalized experiences. Here are some use cases for sending cohorts from Amplitude to Blueshift:

1. **Behavior-Based Personalization:** Brands can create cohorts in Amplitude based on user behavior, such as product usage patterns, feature adoption, or content consumption. Send these cohorts to Blueshift to trigger 1:1 personalized messaging and offers to users who exhibit specific behaviors. For example, if a cohort shows that users have abandoned their shopping carts, Blueshift can send automated cart abandonment emails with 1:1 personalized product recommendations.
   
2. **Onboarding and Activation:** Brands can identify cohorts of new users who have signed up but haven't completed onboarding or activation steps. Send these cohorts to Blueshift to trigger personalized onboarding journeys, welcome emails, or in-app messages to guide users through the activation process and improve retention.

3. **Segmented Campaigns:** Brands can segment their user base in Amplitude based on various attributes, such as demographics, location, or engagement history. Send these segments to Blueshift for targeted marketing campaigns. For instance, sending a cohort of high-value customers to Blueshift for a VIP campaign with exclusive offers and content.
