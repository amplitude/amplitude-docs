---
id: 1a6ab2be-93ba-4e1f-8caf-11de57756cd0
blueprint: destination-catalog
title: 'CommandBar (Cohort)'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
connection: destination
integration_type:
  - cohorts
partner_maintained: false
integration_icon: partner-icons/commandbar.svg
source: 'https://www.docs.developers.amplitude.com/data/destinations/commandbar-cohort/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718654984
---
[CommandBar](https://www.commandbar.com/) is an AI-powered user assistance platform that makes your product easier to use, without the old-school method of interrupting popups that users quickly close. Activate and retain more users through personalized, interactive in-product experiences that mimic what a human assistant would do. For example, Copilot chat (the only chatbot that can co-browse with users) and just-in-time proactive nudges that trigger when a user appears confused. This integration lets you sync cohorts from Amplitude to CommandBar to drive personalized experiences.

{{partial:admonition type="note" heading=""}}
This integration is maintained by CommandBar. Contact the [CommandBar](https://www.commandbar.com/) for support with this integration. 
{{/partial:admonition}}

## Considerations

- You must enable this integration in each Amplitude project you want to use it in.
- You need a paid CommandBar plan to enable this integration.
  
## Setup

### CommandBar setup

1. Log in to your **CommandBar** account.
2. In CommandBar, navigate to Integrations.
3. Find Amplitude then click **Configure**.
4. Copy the **API Key** to your clipboard.

### Amplitude setup

1. In Amplitude Data, click **Catalog** and select the **Destinations** tab.
2. In the Cohort section, click **CommandBar**.
3. Click **Add another destination**.
4. Enter **Name** and paste in the **API key** you copied from **CommandBar**.
5. Map the Amplitude User ID field to the Humanic.ai User ID field.
6. Save when finished.

## Send a cohort

To sync your first cohort, follow these steps:

1. In Amplitude, open the cohort you want to sync, then click **Sync**.
2. Select **CommandBar**, then click **Next**.
3. Choose the account you want to sync to.
4. Choose the sync cadence.
5. When finished, save your work.

## Locating your cohort in CommandBar

Cohorts are available for use across many parts of CommandBar.

1. **Audiences:** From https://app.commandbar.com/editor/audiences, you can edit or create an audience. In the condition dropdown, select “Amplitude Cohort” and then select your desired cohort. Audiences can be used to personalize nudge targeting, HelpHub recommendation sets, Copilot behavior, and more.
2. **Nudges:** For any nudge (for example, product tour, survey, or checklist), you can use your Amplitude cohort in the “Targeting” → “Who” rules. After choosing a “Custom” condition, you can select “Amplitude Cohort” and then select your desired cohort.

## Use Cases

1. **Feature Adoption:** You've discovered that a particular cohort of Amplitude users frequently visits your app but misses out on a key feature. Use CommandBar to tailor tooltips for this cohort, helping them discover and use the feature effectively.
2. **User Onboarding:** New users are added to an "onboarding" cohort in Amplitude. Create a step-by-step onboarding guide in CommandBar, offering contextual help and tips. Further segment this cohort based on an onboarding survey or account creation channel.
3. **Customer Support Efficiency:** Support tickets are surging. Your team creates a cohort in Amplitude to understand users with multiple tickets on a specific issue. Develop custom Playbooks for Copilot chat to handle common user queries and launch interactive tours.
4. **Retention Campaigns:** A cohort of Amplitude users shows inactivity and high churn risk. Use CommandBar Nudges to send re-engagement messages and offer discounts to these users.
5. **Freemium to Premium:** Conversion rates for the “Free tier” cohort are slower than expected. Implement CommandBar tooltips to highlight premium features and create in-app paywalls to encourage trial of the premium tier.
6. **Enhanced Onboarding Segmentation:** You want to refine the onboarding experience for new users. Segment new users further based on survey responses or the channel through which they joined, providing tailored onboarding steps with CommandBar.
