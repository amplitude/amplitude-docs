---
id: 5b361e39-e4a0-4842-965f-e2e73bcc9c19
blueprint: source-catalog
use_cases:
  - "Utilize Survicate's customer feedback surveys to gather insights into customer satisfaction levels. By ingesting survey events from Survicate to Amplitude, businesses can create cohorts based on user satisfaction scores. These cohorts can then be analyzed to track user activation or behavior among different satisfaction groups, providing valuable insights into how satisfied users interact with the product or service."
short_description: 'Survicate is a complete toolkit for customer feedback, including website optimization, customer satisfaction surveys, and complex customer insight processes integrated with your email campaigns.'
integration_category:
  - qualitative-feedback
integration_type:
  - raw-events
partner_doc_link: 'https://help.survicate.com/en/articles/5707918-amplitude-integration'
title: Survicate
source: 'https://www.docs.developers.amplitude.com/data/sources/survicate'
category: 'Qualitative Feedback'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/survicate.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825718
---
Survicate's integration sends your survey responses as events to Amplitude so you can capture qualitative user insights and connect them with your quantitative data in Amplitude. All to help you make more informed decisions and create better products.


## About Survicate

[Survicate](https://survicate.com/) is survey software for online businesses that lets you collect customer feedback at all stages of the funnel. 

## Set up and use the integration

Before you begin setup, copy your Amplitude project API key.

1. In Survicate, navigate to [**Settings > Integrations**](https://panel.survicate.com/#/o/0/w/0/settings/integrations/), search for "Amplitude" or select it from the list of available integrations, and click it.
2. Next, click **Connect**. In the window that opens, enter your Amplitude project's API key in the text box and click **Authorize**.

{{partial:admonition type="note" title=""}}
This integration works on a workspace level, which means it will send the information from all surveys you store in your Survicate workspace.
{{/partial:admonition}}

There are no other setup steps in Amplitude.

## Use Survicate's data in Amplitude

After collecting new survey responses, you see the `survicate_survey_answered` event in Amplitude. You can then group your data by the following event properties:

- `type`: Question type
- `survey_name`: Name of the survey
- `question_name`: Name of the question
- `question_introduction`: Introduction message in the question
- `question_id`: Unique ID of the survey's question
- `integrationID`: Value is always `survicate`
- `answer`: Answer given

Specific use cases include:

- **Creating cohorts based on user satisfaction**. Send the CSAT or NPS surveys' responses to Amplitude to create cohorts of satisfied or dissatisfied users. When done, track down the activation or user behavior among these groups to understand what made them answer the way they did.
- **Getting a detailed view behind qualitative feedback**. Ask users for product or feature ideas while they're in your app, or let them pick one feature they'd like to see built next. Analyze results both in Survicate and Amplitude to have a better understanding of the background behind feature requests.
- **Measure release performance**. Launch in-product contextual surveys to ask users about their satisfaction with the latest release. Then combine survey answers with the release performance metrics, or application versions users use, to get a better understanding of how each version of the application performs.