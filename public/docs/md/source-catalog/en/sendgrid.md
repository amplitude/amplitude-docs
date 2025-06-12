---
id: 691ebbfa-9e9e-4069-87f6-5e6c84ced2c6
blueprint: source-catalog
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
source: 'https://www.docs.developers.amplitude.com/data/sources/sendgrid'
category: Collaboration
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/sendgrid.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825652
---
SendGrid is a cloud-based customer communication platform that drives engagement and business growth through email delivery. Send your SendGrid message event data to Amplitude to help you attribute results stemming from your organization's marketing and communication efforts.

## Considerations

- If you are in the European Union, be sure you are working within the `eu.amplitude.com domain`, not `amplitude.com`.
- By default, SendGrid sends events with the email address as the user ID. If you use a different key, then attach a `unique_arg` to all your email events called `amp_user_id` and assign the Amplitude user ID to that value. This makes sure that Amplitude sends events using that value as the user ID.

## Setup

### Prerequisites

Before you begin, you need your Amplitude project API key. 

There are no other required setup steps in Amplitude. 

### SendGrid setup

1. In SendGrid, find Settings, then click **Mail Settings**.
2. Select **Event Webhook**.
3. Under HTTP Post URL, enter the following, depending on the region that processes your data: 
   
      - US: `https://<your-api-key>:CJdAK9fWEn4dH2UzKht37sAM@api.amplitude.com/sendgrid`. 
      - EU: `https://<your-api-key>:CJdAK9fWEn4dH2UzKht37sAM@api.eu.amplitude.com/sendgrid`

4. Select the event data you want to send to Amplitude.
5. Toggle the Event Webhook Status to **Enabled**.
6. Save your work. 

SendGrid sends the selected events to Amplitude. SendGrid event names in Amplitude are prepended with the prefix `[Sendgrid]` , and the Library is `sendgrid`.