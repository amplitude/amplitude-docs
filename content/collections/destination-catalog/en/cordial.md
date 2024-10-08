---
id: bf191571-1732-4536-8cad-02f2a2d7a4dc
blueprint: destination-catalog
use_cases:
  - 'Sync Amplitude cohorts to Cordial lists for targeted messaging and analytics.'
  - 'Import real-time customer behavior and profile data from Cordial to Amplitude for enhanced analysis and decision-making.'
short_description: 'Cordial is a customer engagement and data platform that unifies real-time data from anywhere in your technology stack, so you can engage with your customers in more personalized ways across email, SMS, mobile app, and more.'
integration_category:
  - customer-engagement
integration_type:
  - cohorts
  - raw-events
partner_doc_link: 'https://cordial.com/partners/amplitude/'
title: Cordial
source: 'https://docs.developers.amplitude.com/data/destinations/cordial'
category: 'Cohort syncing'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721766896
integration_icon: partner-icons/cordial.svg
---
[Cordial](https://cordial.com/) is a customer engagement and data platform that unifies real-time data from anywhere in your technology stack. With it, you can engage with your customers in more personalized ways across email, SMS, mobile app, and more.

This cohort integration allows you to sync users from Amplitude cohorts to Cordial lists. Using lists along with other contact data in Cordial, you can create dynamic segments of contacts for sending messages, searching contacts, and filtering analytics reports.

## Setup

### Cordial setup

1. Navigate to the [Cordial's Portal](https://admin.cordial.io/).
2. Create an API Key in Cordial following the [instructions](https://support.cordial.com/hc/en-us/articles/115005365087).

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **Cordial**.
3. Enter Name and Cordial API Key.
4. Reach out to your Cordial CSM to get your Amplitude service URL and paste it into the Endpoint field.
5. Enter the name of your contact identifier in Cordial into the Contact identifier name field. This key identifies users in Cordial. For example, "email".
6. In the Contact identifier mapping dropdown, select a user property name. This value is used for the contact identifier.
7. Save the destination.

## Send a cohort

1. In Amplitude, open the cohort to sync. 
2. Click **Sync**, and choose Cordial.
3. Select the destination.
4. Select the sync frequency you need.
5. Save when finished.

After a cohort is synced, the contacts are added to a list in Cordial. The list name is the cohort name in Amplitude with spaces removed. For example, when the "active users" cohort with 10 users is synced to Cordial, you see 10 contacts added to the `activeusers` list. When a user is removed from a cohort and the cohort is synced, the contact is removed from the list. Refer to [Cordial's lists](https://support.cordial.com/hc/en-us/articles/115005528428) article for details on using lists.