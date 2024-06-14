---
id: 71d7adf2-0224-4708-8366-d09ee0bf7142
blueprint: source-catalog
use_cases:
  - 'Target customers by behavioral attributes to serve relevant flag treatments to the right cohorts.'
  - 'Create a predictive cohort for users most likely to achieve a desired outcome and test a new feature used to produce that outcome on the cohort.'
  - 'Run deeper analysis on impression data in Amplitude to compare user behavior across flag treatments and determine why certain metrics changed as a result.'
short_description: 'Split is revolutionizing software delivery with Impact-Driven Development, pairing the speed and reliability of feature flags with data to measure the impact of every feature.'
integration_category:
  - experimentation
integration_type:
  - raw-events
  - cohorts
partner_doc_link: 'https://www.split.io/product/integrations/amplitude'
title: Split
source: 'https://www.docs.developers.amplitude.com/data/sources/split'
category: Experimentation
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/split.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825683
---
Use this integration to import traffic impression data from Split. Impressions are sent as events and mapped according to the configuration settings.

See more detailed instructions in the [Split documentation](https://help.split.io/hc/en-us/articles/360046658932-Amplitude).

### Amplitude setup

Copy your Amplitude project's API Key and secret. There are no other setup steps in Amplitude.

### Split setup

1. Go to Admin settings, click **Integrations**, select your workspace, and navigate to the marketplace. 
2. Find Amplitude and click **Add**.
3. Select the environments from where you would like data sent and then select how you want to map Split traffic types to Amplitude identities. You can select either `user_id` or `device_id`.
4. Split impressions are shown as `get_treatment` in Amplitude by default. You can customize this event name, with a limit of 1,024 characters.
5. Paste your Amplitude API key and secret.
6. Save your work. 

After you save the configuration, you can send a test event from Split into Amplitude.

Repeat this process for every environment and traffic type you want to configure.