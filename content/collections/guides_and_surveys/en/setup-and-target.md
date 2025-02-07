---
id: 7fb2231a-9814-4449-8318-a80e7370c18b
blueprint: guides_and_survey
title: 'Setup and Targeting'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738796196
section: guides
landing: false
landing_blurb: "See how you can use guides, and the templates available to you."
---
Guides offer targeting and triggering options to ensure your guide appears when it should, to who it should.

Navigate to the **Setup** tab in a guide to access these options.

![](statamic://asset::help_center_conversions::guides-surveys/setup-tab.png)

## Targeting

Not every message is for every user. Targeting enables you to define exactly which users see your guide, when they see your guide. Target your guide to **All Users** or **Targeted Users**.

**All Users** means exactly that. Amplitude targets every user who visits your site with this guide.

**Targeted Users** enables you to create segments of users to whom Amplitude serves your guide.

Each segment can filter by property or cohort, and can have multiple filters. For example, target your guide to users from outside the United States, who are new users within the last 30 days. 

![](statamic://asset::help_center_conversions::guides-surveys/targeting.png)

{{partial:admonition type="note" heading="Using more than one segment"}}
When you add more than one segment to your targeting, Amplitude `OR`s each segment. This means that if a user belongs to *any* segment, Amplitude shows them the guide or survey.
{{/partial:admonition}}

## Triggers

Triggers control both when and where the experience appears.

Select what events or interactions launch the experience, gate the experience to specific pages, and adjust the priority all within the targeting card.

### When

Amplitude provides the following options to trigger an experience.

| Trigger              | Description                                                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| None                 | The experience doesn't appear by default. Select this option if you use the SDK to launch the experience, the CTA in another guide or survey to launch, or any other method of external trigger. |
| Immediately          | The experience appears as soon as the page loads.                                                                                                                                                |
| When element appears | Launches the experience when a specified element appears on screen. Enter a CSS Selector or XPath path expression, or click *Test and Preview* to launch the visual selector.                    |
| After time on page   | Specify a delay (in minutes or seconds) that a user must spend on the page before they see the experience.                                                                                       |
| Smart delay          | Show the experience after the user completes their current task.                                                                                                                                 |
| Rage click           | Shows the experience after a rage click by the user. Amplitude considers a rage click to be rapid successive clicking or tapping in the same location.                                           |
| User confusion       | Shows the experience when Amplitude detects user confusion, as signaled by the user's mouse movement.                                                                                            |
| On event tracked     | Shows the experience after the user triggers an event that you define.                                                                                                                           |

### Where

Control whether your guide or survey displays on all pages, include specific pages, or exclude specific pages.

When you exclude or include specific pages, Amplitude accepts the following:

* URL matches
* URL matches exactly
* URL matches pattern
* URL contains
* URL starts with
* URL ends with
* URL matches regex

### Priority

Use the priority to rank the importance of a guide or survey relative to others that the user might encounter.

* Urgent
* High
* Medium
* Low

{{partial:admonition type="note" heading="Prioritization"}}
When you have more than one guide or survey eligible to display to a user, the highest priority experience displays. Amplitude breaks prioritization ties by the experience that was seen most recently, then by the experience that was created most recently.
{{/partial:admonition}}

### Limits

Limits ensure you don't bombard users with your messaging. 

| Limit                       | Description                                                                                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stop showing when completed | Once the user completes the experience, they won’t see it again.                                                                                                                  |
| Stop showing when dismissed | Once the user dismisses the experience, they won’t see it again. This option requires `Stop showing when completed`.                                                              |
| Cooldown                    | When enabled, specify the maximum number of times a user can see the experience in the specified time range. This option requires that `Stop showing when dismissed` is disabled. |

## Status

Statuses enable you to manage when your guide displays.

| Status    | Description                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Draft     | Enables you to make changes to and test the guide, but the guide doesn't appear to users.                                      |
| Published | The guide is live. Any changes you make to a published guide appear to users as soon as you save the guide.                    |
| Schedule  | Define specific start and end dates during which your guide appears. Start and end times use the timezone set on your project. |

## Settings

Access guide settings with the gear icon at the top of the builder.

| Setting           | Description                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Dismissable       | Gives users an option to dismiss the guide.                                                                                          |
| Snoozable         | Allow the user to snooze the guide for the specified duration.                                                                       |
| Label             | The snooze button’s text.                                                                                                            |
| Duration          | How long the snooze lasts. The guide doesn't re-appear for the user until at least that much time has passed.                        |
| Show on all steps | If disabled, the guide’s first step is the only step with a snooze option.                                                           |
| Show step counter | Adds a step counter to each step in the guide. For example, on a guide with five steps, the user would see `2/5` on the second step. |
