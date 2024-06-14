---
id: 1c81e22f-872f-4ba9-b3ca-cf974084a600
blueprint: source-catalog
use_cases:
  - "Leverage Amplitude's behavioral analytics to identify and define specific user segments. You can send these cohorts to Userflow to create personalized in-app experiences."
  - "Capture user interactions within the app via Userflow's events and stream this data to Amplitude to enrich user behavior insights and improve analytics."
short_description: 'You want to improve user onboarding but your developers are busy. Userflow lets your team build  in-app product tours, checklists, trackers, and surveys, without code.'
integration_category:
  - customer-engagement
integration_type:
  - raw-events
  - cohorts
partner_doc_link: 'https://userflow.com/docs/integrations/amplitude'
title: Userflow
source: 'https://www.docs.developers.amplitude.com/data/sources/userflow'
category: Collaboration
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: source
partner_maintained: false
integration_icon: partner-icons/userflow.svg
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1713825771
---
[Userflow](https://userflow.com) enables your whole team to build in-app product tours, checklists, surveys, resource center and more. No coding skills required.

This integration streams Userflow-generated events (such as Flow Started and Checklist Task Completed) to Amplitude. You can then analyze your users' onboarding behavior together with the rest of your product events.

## Considerations

- This integration connects a single Userflow environment and a single Amplitude project. You should use separate testing and production environments to prevent test data from skewing production data. 
- If you have both a staging and a production environment, follow the setup steps for both staging and production. Start with your staging environment, and verify that it works as you expect before connecting your production environment.

## Setup

### Amplitude setup

Copy the API key for the Amplitude project you want to connect.

There are no other setup steps in Amplitude. 

### Userflow setup

For complete setup instructions, see the [Userflow](https://userflow.com/docs/integrations/amplitude) documentation.