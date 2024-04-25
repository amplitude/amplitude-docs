---
id: 6f7eb4cc-c08a-42de-9b9c-7e8e69749d6f
blueprint: destination-catalog
use_cases:
  - 'Use Blitzllama to deploy targeted in-product surveys for qualitative feedback collection directly from users.'
  - 'Integrate Blitzllama with Amplitude to seamlessly transfer collected feedback data for deeper analysis alongside user attributes.'
short_description: 'Launch targeted in-product surveys using Blitzllama and stream feedback data to Amplitude.'
integration_category:
  - qualitative-feedback
integration_type:
  - cohorts
  - raw-events
partner_doc_link: 'https://documentation.blitzllama.com/connections-sources/amplitude'
title: Blitzllama
source: 'https://docs.developers.amplitude.com/data/destinations/blitzllama'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
partner_maintained: false
integration_icon: partner-icons/blitzllama.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713478220
---
[Blitzllama](https://www.linkedin.com/company/blitzllama/) GPT-powered feedback analytics automatically categorizes survey responses into topics, sentiments, and provides recommendations. This saves time that would be spent manually summarizing the feedback. As all the feedback is stored in one place, you can segment historical feedback and create charts within a few clicks.

This integration enables you to seamlessly stream feedback data from Blitzllama to Amplitude to further analyze the feedback data with user attributes or to create feedback dashboards.

{{partial:admonition type="tip" title="Contact Blitzllama for help"}}
Contact the Blitzllama team at [tech@blitzllama.com](mailto:tech@blitzllama.com) for help with this integration.
{{/partial:admonition}}

## Setup

See the [Blitzllama documentation](https://documentation.blitzllama.com/connections-destinations/amplitude) for more details on sending events to Amplitude. 

### Amplitude setup 

Before you begin, you need your Amplitude project API key. 
There are no other setup steps in Amplitude.

### Blitzllama setup

1. On the Blitzllama's dashboard, navigate to **Destinations** under the Connections tab and click on Amplitude.
2. Click **Connect** and paste the API Key into the textbox.
3. Click **Save**.
