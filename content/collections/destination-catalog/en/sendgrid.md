---
id: 5f04dfad-3aaa-4c7b-9b96-724ff0abe39f
blueprint: destination-catalog
use_cases:
  - 'By sending events from SendGrid to Amplitude, businesses can gain insights into email engagement metrics, such as open rates, click-through rates, and conversion rates. This integration allows organizations to track user interactions with email campaigns, understand customer behavior, and optimize email marketing strategies for better engagement and conversion.'
  - 'Create targeted and powerful email marketing campaigns by utilizing cohorts from Amplitude to segment your audience in SendGrid. By leveraging customer insights and behavioral data from Amplitude, businesses can personalize email content, tailor messaging, and optimize email campaigns to improve customer engagement and drive conversions.'
short_description: 'SendGrid helps marketers deliver transactional and marketing email through one reliable platform.'
integration_category:
  - customer-engagement
integration_type:
  - raw-events
  - cohorts
title: SendGrid
source: 'https://docs.developers.amplitude.com/data/destinations/sendgrid'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/sendgrid.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480074
---

[SendGrid](https://sendgrid.com/) is a proven cloud-based customer communication platform that successfully delivers over 45 billion emails each month.

This SendGrid integration allows you to send audiences from Amplitude to SendGrid to create more personalized campaigns. 

## Considerations

- The API key from SendGrid must be either Full Access or Restricted Access with Marketing permissions.
- Cohorts cannot have duplicate emails. Duplicates cause sync errors with SendGrid.
  - The recommended way to guarantee unique email addresses is by setting your Amplitude User IDs to use email addresses. 
- All exported emails must be valid or the sync will fail.
- You must map the email, first name, and last name fields. If the Amplitude user doesn't have values for the first and last name fields, the corresponding SendGrid contact won't have first or last names, only the email address.
- In cases where users don't have an email address, they aren't synced to SendGrid. This can cause a discrepancy between the number of users in SendGrid and Amplitude. 
- In SendGrid, emails aren't case-sensitive. For example, "User@Company.com" and "user@company.com" sync to the same contact (user@company.com).
- New contacts are created for Amplitude users that are not SendGrid contacts, and existing contacts aren't duplicated. Both types of users are added to the list.

## Setup

### SendGrid setup

Log in to SendGrid and [create your API key](https://docs.sendgrid.com/ui/account-and-settings/api-keys).

The type of API key must be either Full Access or Restricted Access with Marketing permissions

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **SendGrid**.
3. Click **Add another destination**.
4. Enter the name.
5. Paste the API key into the SendGrid destination settings.
6. Assign mappings for email (must be a unique identifier), first name, and last name.
7. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **SendGrid**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

Depending on the size of your cohort, it can take a few minutes to see the correct number of cohort users in SendGrid.
