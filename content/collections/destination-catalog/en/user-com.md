---
id: fd0e36b4-f88d-47cf-810c-72d73ff8308c
blueprint: destination-catalog
use_cases:
  - "Utilize Amplitude's behavioral analytics to identify and segment specific user groups. By sending these cohorts to User.com, businesses can create targeted messaging and personalized communication across various channels such as email, SMS, and chatbots."
short_description: 'Migrate data from Amplitude to User.com'
integration_category:
  - marketing-automation
integration_type:
  - cohorts
title: User.com
source: 'https://docs.developers.amplitude.com/data/destinations/user-com'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/user-com.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713480271
---
[User.com](https://www.user.com/en) is a customer communication platform that provides businesses with a suite of tools to engage, communicate, and build relationships with their customers across multiple channels. The platform enables businesses to communicate with customers via email, SMS, push notifications, live chat, and other channels, and provides marketing automation tools for creating and executing automated campaigns based on user behavior and events.

This User.com integration allows you to send audiences from Amplitude to User.com to create more personalized campaigns. 

## Considerations

- This integration is only available for customers who have paid plans with Amplitude.
- You must enable this integration in each Amplitude project you want to use it in.

## Setup

### User.com setup

1. Log into your User.com dashboard and copy your API key.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **User.com**.
3. Add a new destination.
4. Enter a name for this integration.
5. Paste in your API key.
6. Map your Amplitude properties to User.com’s User ID
7. Save when finished.

## Send a cohort

1. In Amplitude, open the cohort you want to export. Click **Sync**, and choose **User.com**.
2. Choose the destination.
3. Select the sync cadence.
4. Save your work.

### Use Cases

- **Targeted messaging:** By sending cohorts from Amplitude to User.com, businesses can target specific groups of users with relevant messaging. For example, a business might identify a cohort of users who have recently made a purchase and use User.com to send them a follow-up email with a personalized offer.
- **Behavioral triggers:** User.com allows businesses to set up automated triggers based on user behavior. By sending cohorts from Amplitude to User.com, businesses can create triggers based on specific actions or events. For example, a business might identify a cohort of users who have abandoned their cart and use User.com to automatically send them a reminder email after a certain period of time.
- **Segmentation:** User.com offers powerful segmentation capabilities, allowing businesses to create custom segments based on a variety of criteria. By sending cohorts from Amplitude to User.com, businesses can easily create segments based on specific user behaviors or characteristics.
- **Personalization:** User.com allows businesses to personalize their communications with users based on a variety of data points. By sending cohorts from Amplitude to User.com, businesses can leverage user data to create more personalized and relevant messaging.
