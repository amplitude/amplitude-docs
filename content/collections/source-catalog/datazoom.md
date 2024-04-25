---
id: b5077685-e656-4a90-9d23-8cef6bc7f67c
blueprint: source-catalog
use_cases:
  - "This use case enables businesses to leverage Datazoom's real-time collection, management, and delivery of high-quality streaming video content to capture valuable insights into viewer behaviors. By integrating Datazoom with Amplitude, organizations can centralize and standardize their video data, creating a powerful data pipeline for improved observability, adaptability, and optimization solutions. This integration empowers companies to make informed decisions based on vital data from all their video sources, optimize existing workflows, and drive revenue growth by engaging viewers more effectively."
short_description: 'Datazoom enables video publishers to better operate distributed architectures through centralizing, standardizing, and integrating data in real-time to create a more powerful data pipeline and improve observability, adaptability, and optimization solutions.'
integration_category:
  - other
integration_type:
  - raw-events
title: Datazoom
source: 'https://www.docs.developers.amplitude.com/data/sources/datazoom'
category: Other
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/datazoom.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713821392
---
Datazoom enables video publishers to better operate distributed architectures through centralizing, standardizing, and integrating data in real-time to create a more powerful data pipeline and improve observability, adaptability, and optimization solutions.

Use this integration to send raw, standardized Datazoom video events into Amplitude.

### Setup

### Amplitude setup

Copy the Amplitude API key for your project. There are no other setup steps in Amplitude.

### Datazoom setup

See the [Datazoom documentation](https://help.datazoom.io/hc/en-us/articles/360046468532-Amplitude) for more details and instructions.

1. In Datazoom, navigate to **Settings**.
2. Create an Amplitude Connector in your [Datazoom account](https://app.datazoom.io/signup). 
3. Enter your Amplitude API Key and name the Connector to save it.
4. Add the new Amplitude Connector to a [Data Pipe with an active Data Collector](https://help.datazoom.io/hc/en-us/articles/360015525691-How-to-configure-a-Data-Pipe).
5. Follow the prompts to configure your connector.
    - Sampling Rate - select the percentage of sessions that you would like to have delivered to your Connector destination.
    - Redirect Standard Fields - Select this if you would like Datazoom to redirect Amplitude's standard fields to custom user properties. For example, if checked the `City` data point maps to a user custom property named `dz_city` 
6. Click **Save Changes** to complete setup.