---
id: 669b31f3-9b53-46c3-ac8a-3d12ac172d0a
blueprint: destination-catalog
title: Apxor
source: 'https://docs.developers.amplitude.com/data/destinations/apxor'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
integration_category:
  - other
use_cases:
  -
    id: lv5gtprc
    use_case: 'Use data from Amplitude to identify specific user segments based on their behavior, and then use Apxor to create personalized nudges and messages to guide users through onboarding, helping them understand the value of your product and reducing abandonment rates.'
  -
    id: lv5gtu27
    use_case: 'Analyze user behavior in Amplitude to identify underused features or features that cause confusion, then use Apxor to target those users with in-app nudges that provide step-by-step guidance, encouraging greater feature adoption and use.'
  -
    id: lv5gtxr4
    use_case: "Use Amplitude data to pinpoint users who haven't reached the desired level of engagement with your product, then use Apxor to create nudges that encourage users to take specific actions or follow certain paths to achieve activation and retention."
short_description: 'Apxor is a no-code, in-app nudging tool for product teams. Personalize all stages of the user journey for exceptional product success. This integration lets you sync cohorts from Amplitude to Apxor.'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713482034
partner_maintained: false
integration_icon: partner-icons/apxor.svg
---
{{partial:admonition type="beta"}}
This integration is in Beta and is in active development. If you have any feedback to improve the Apxor destination or have suggestions for their documentation, contact the [Apxor support team](https://Apxor.com/). 
{{/partial:admonition}}

[Apxor](https://Apxor.com/) is a no-code in-app nudging tool for product folks. Personalize all stages of the user journey for exceptional product success. This integration lets you sync cohorts from Amplitude to Apxor.

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.
- Users on the free and paid plans of Apxor can access this integration.

## Setup

For more information on setting up this integration, see [Apxor](https://www.apxor.com/success-stories)’s documentation.

### Apxor setup

1. On Apxor’s dashboard, navigate to the Connections tab.
2. Click on Amplitude under the Sources section.
3. Click Connect and copy the API key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Apxor**.
3. Click **Add another destination**.
4. Enter **Name** and paste in the **API** key you copied from **Apxor**.
5. Map the Amplitude User ID field to the primary key from the Apxor panel.
6. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **Apxor**, then click **Next**
3. Choose the account you want to sync to
4. Choose the sync cadence.
5. When finished, save your work.

### Use cases

1. **Personalized Onboarding:** You can use data from Amplitude to identify specific user segments based on their behavior, such as those who drop off during onboarding or those who engage extensively. With Apxor, you can create personalized nudges and messages to guide users through onboarding, helping them understand the value of your product and reducing abandonment rates.
2. **Feature Adoption:** When you analyze user behavior in Amplitude, you can identify underused features or features that cause confusion. Apxor enables you to target these users with in-app nudges that provide step-by-step guidance on how to use these features effectively, encouraging greater feature adoption and use.
3. **User Activation:** Use Amplitude data to pinpoint users who haven't reached the desired level of engagement with your product. With Apxor, you can create nudges that encourage users to take specific actions or follow certain paths to achieve activation, thus increasing the likelihood of them becoming long-term users.