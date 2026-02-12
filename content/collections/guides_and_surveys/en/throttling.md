---
id: dbc8fb29-c647-4b15-b9d5-7467e1acd1f7
blueprint: guides_and_survey
title: Throttling
landing: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753372962
---
Throttling is a way to slow down the rate at which a guide or a survey appears for your user. Depending on how many guides, surveys, or nudges you have created, it's important to set limits on how many appear for each user or how often users experience them. You don't want users to feel overwhelmed or annoyed during their experience on your site.

Throttling works identically for both Guides and Surveys. However, the throttling settings for guides and for surveys are separate. This gives you more overall flexibility in how your guides or surveys appear.

{{partial:admonition type="tip" heading=""}}
Your throttling settings apply globally to all guides or surveys in the list. You can further specify how and when your guides or surveys appear by modifying the Limits section for each guide or survey.
{{/partial:admonition}}

## Built-in display limits

Amplitude has built-in limits that control how many guides and surveys can display simultaneously. These limits prevent overwhelming users with too many messages at once:

| Form Factor | Display Limit | Behavior |
| --- | --- | --- |
| Tooltips | Unlimited | Multiple tooltips can display at the same time. |
| Pins | One at a time | If a pin is already displayed and another pin is triggered, the first pin continues to show and the second pin doesn't display. |
| Popovers | One at a time | If a popover is already displayed and another popover is triggered, the first popover continues to show and the second popover doesn't display. |
| Modals | One at a time | If a modal is already displayed and another modal is triggered, the first modal continues to show and the second modal doesn't display. |
| Checklists <br/> {.tag .web .zero} | One at a time | If a checklist is already displayed and another checklist is triggered, the first checklist continues to show and the second checklist doesn't display. |
| Banners | One at a time | If a banner is already displayed and another banner is triggered, the first banner continues to show and the second banner doesn't display. |

{{partial:admonition type="note" heading="Checklists can display with other form factors"}}
Checklists can display at the same time as pins, popovers, or modals. Priority doesn't factor into this behavior. For example, if a high-priority modal is already showing and a low-priority checklist is triggered, both display simultaneously.
{{/partial:admonition}}

### Example scenarios

**Multiple pins triggered:** If checklist B is triggered while checklist A is already displayed, checklist A continues to show and checklist B doesn't display.

**Checklist and modal together:** If a modal is showing and a checklist is triggered, both display at the same time, regardless of their priority settings.

**Pin and tooltip together:** A pin can display while multiple tooltips are also visible, since tooltips have no display limit.

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
Before using advanced throttles, ensure your guides and surveys have [tags](/docs/guides-and-surveys/tags) applied. While tags aren’t strictly required, they’re recommended, since advanced throttling can leverage them to create more specific rate limits for different types of guides.
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

