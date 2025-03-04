---
id: a782d4b0-22f5-45b3-805e-6802d15e33ca
blueprint: pii_integration
title: Osano
integration_type:
  - pii-management
partner_maintained: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1741115654
nav_title: data
---
[Osano](https://www.osano.com/) is an easy-to-use data privacy platform that helps you keep your website compliant with laws such as GDPR and CCPA. Osano monitors all the vendors you share data with so you don't have to.

Osano connects to Amplitude with a one-click integration. Osano then discovers and automatically classifies the personal data stored in Amplitude. After Osano finishes discovery and classification, you can include Amplitude in searches related to subject rights requests.

{{partial:admonition type="note" heading=""}}
If you have any feedback to improve or suggestions around this documentation or integration, contact [Osano's support team](https://www.osano.com/company/contact). 
{{/partial:admonition}}

## Considerations

- This integration requires an Osano Enterprise plan

## Amplitude setup

Copy the Amplitude API key and Secret Key for your project. There are no other setup steps in Amplitude.

## Osano setup

1. Log in to the Osano Portal.
2. From the **Data Discovery** menu, open the **Data Stores** page.
3. Click **+** to add a new data store.
4. Click **Connect to third-party vendors to enable automated data discovery**.
5. Select **Amplitude** from the dropdown menu.
6. Paste the Amplitude API Key into the **API Key field**.
7. Paste the Amplitude Secret Key into the **Secret Key field**.
8. Select a **Data Store Owner** from the dropdown menu.
9. Save when finished.

When you save, Amplitude and Osano immediately begin syncing to detect PII. Manage this information from Osano.