---
id: dbc8fb29-c647-4b15-b9d5-7467e1acd1f7
blueprint: guides_and_survey
title: Throttling
this_article_will_help_you:
  - 'Understand what throttling is'
  - 'Set basic throttling for your guides or surveys'
  - 'Configure time delays between sequential guides'
  - 'Set up advanced throttling using tags'
landing: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753372962
---
Throttling is a way to slow down the rate at which a guide or a survey appears for your user. Depending on how many guides, surveys, or nudges you have created, it's important to set limits on how many appear for each user or how often users experience them. You don't want users to feel overwhelmed or annoyed during their experience on your site.

Throttling works identically for both Guides and Surveys. However, the throttling settings for guides and for surveys are separate. This gives you more overall flexibility in how your guides or surveys appear.

{{partial:admonition type="tip" heading=""}}
Your throttling settings apply globally to all guides or surveys in the list. You can further specify how and when your guides or surveys appear by modifying the Limits section for each guide or survey.
{{/partial:admonition}}

##### To set the throttling for Guides or Surveys

1. Go to *Guides and Surveys* and then select either *Guides* or *Surveys*.
2. Click the **Settings** icon for the list of artifacts.
3. Turn throttling **On**.
4. Set the throttling. You can set:
    - **Limit**: The number of guides or surveys that appear.
    - **Period**: The rate of time in which the maximum limit of guides or surveys can appear. Time periods can be:
        - Day
        - Week
        - Month
        - Session
5. Click **Save Changes**.

## Time between guides

Control the delay between when sequential guides can trigger for the same user. This prevents users from being overwhelmed by multiple guides appearing in quick succession.

##### To set time between sequential guides

1. Go to *Guides and Surveys* and then select either *Guides* or *Surveys*.
2. Click the **Settings** icon for the list of artifacts.
3. In the Time Between section, enter the delay period.
4. Select the time unit from the dropdown:
    - Minute
    - Hour
    - Day
5. Click **Save Changes**.

{{partial:admonition type="tip" heading=""}}
This setting applies to sequential guides triggering for the same user. For example, setting "10 minutes" ensures that after a user sees one guide, they won't see another guide for at least 10 minutes.
{{/partial:admonition}}

## Advanced throttles

Advanced throttles let you set additional rate limits for guides or surveys grouped by tags. This gives you granular control over how different categories of content appear to users.

{{partial:admonition type="important" heading="Prerequisites"}}
Before using advanced throttles, ensure your guides and surveys have [tags](/docs/guides-and-surveys/tags) applied. Tags are required to group content for advanced throttling.
{{/partial:admonition}}

##### To set up advanced throttles

1. Go to *Guides and Surveys* and then select either *Guides* or *Surveys*.
2. Click the **Settings** icon for the list of artifacts.
3. In the Advanced Throttles section, click **Add throttle**.
4. Configure your advanced throttle:
    - **Limit**: The maximum number of guides/surveys for this tag group.
    - **Tags**: Select one or more tags to group guides/surveys.
    - **Period**: Choose the time period (Day/Week/Month/Session).
5. Click **Save Changes**.

### Advanced throttle examples

**Campaign throttling**: Limit `product-launch` tagged guides to three (3) for each day.
**Feature throttling**: Limit `onboarding` tagged content to five (5) for each session.
**Team coordination**: Limit `growth-team` guides to two (2) for each week.

{{partial:admonition type="tip" heading=""}}
Advanced throttles work alongside your global throttling settings. The most restrictive limit applies. For example, if global throttling allows 10 guides each day but an advanced throttle limits `onboarding` guides to two (2) each day, users receive, at most, two (2) onboarding guides daily.
{{/partial:admonition}}

### Multiple advanced throttles

You can create multiple advanced throttles for different tag combinations. This enables sophisticated throttling strategies:

- **Urgent announcements**: `urgent` + `announcement` tags - 1 each day
- **Onboarding flow**: `onboarding` tag - 3 each session
- **Feature updates**: `feature-update` tag - 2 each week

