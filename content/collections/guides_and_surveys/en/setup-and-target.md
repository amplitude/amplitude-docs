---
id: 7fb2231a-9814-4449-8318-a80e7370c18b
blueprint: guides_and_survey
title: 'Setup and Targeting'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738796196
section: guides
landing: false
landing_blurb: "Understand how you can target guides and surveys."
---
Guides and Surveys offer targeting and triggering options to ensure your guide or survey appears when it should, to whom it should.

Navigate to the **Setup** tab in a guide to access these options.

## Targeting

Not every message is for every user. Targeting enables you to define exactly which users you want to receive your guide or survey as well as when they receive it. You can target either **All Users** or **Targeted Users**.

**All Users** means exactly that. Amplitude targets every user who visits your site with this guide or survey.

**Targeted Users** enables you to create segments of users to whom Amplitude serves your guide or survey.

Each segment can filter by property or cohort, and can have multiple filters. For example, target your guide or survey to users from outside the United States, who are new users within the last 30 days.

You can set both rollout percentage and bucketing unit for your user segments. For example, you can target 10% of a given segment when you first publish a guide and later increase it to 100% after you are confident about the engagement data.

![An image of the targeting window targeting a segment of two cohorts: where the cohort country doesn't equal the united states and where the cohort of users equals new users in the last 30 days ](statamic://asset::help_center_conversions::guides-surveys/targeting.png)

{{partial:admonition type="note" heading="Using more than one segment"}}
When you add more than one segment to your targeting, Amplitude `OR`s each segment. This means that if a user belongs to *any* segment, Amplitude shows them the guide or survey.
{{/partial:admonition}}

### Excluding group of users

There may be a group of users that you don't want to include in a specific guide or survey. For example, you might want to run a survey on your site but don't want to include customers within the United States. Or, you might want to exclude internal users and only receive responses from actual customers.

You can exclude users on the cohort or the segment level. However, the process is largely similar. For clarity, this content focuses on excluding on the cohort level. Go to [Cohorts](/docs/analytics/behavioral-cohorts) for more information about cohorts. 

To exclude a cohort of users, set up the `where` statement to be `does not equal` the cohort you want to exclude. The screenshot above displays a segment where users in the United States are excluded from the guide or survey.

### Send a link to a guide {.tag .web}

Send users a link to your guide or survey to target them more directly. From the guide or survey builder, expand the menu next to the Save button, and click **Share link**.

In the resulting modal, copy the query parameter, and append it to a page on your site that's instrumented with Guides and Surveys.

When the recipient clicks the link with the query parameter attached, the guide displays.

{{partial:admonition type="note" heading="User and page targeting"}}
When you send a direct link to a guide or survey, Amplitude overrides any audience or user targeting you set on the guide.

Amplitude doesn't override page targeting. To ensure your link works as expected, ensure the page you send can display the guide.
{{/partial:admonition}}

## Triggers

Triggers control both when and where the experience appears.

Select what events or interactions launch the experience, gate the experience to specific pages, and adjust the priority all within the targeting card.

### When

Amplitude provides the following options to trigger an experience.

| Trigger              | Description                                                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| None                 | The experience doesn't appear by default. Select this option if you use the SDK to launch the experience, the call to action (CTA) in another guide or survey to launch, or any other method of external trigger. |
| Immediately          | The experience appears as soon as the page loads.                                                                                                                                                |
| When element appears | Launches the experience when a specified element appears on screen. Enter a CSS Selector or XPath path expression, or click *Test and Preview* to launch the visual selector.                    |
| When element clicked/tapped | Launches the experience when a the user interacts with the specified element. Enter a CSS Selector or XPath path expression, or click **Test and Preview** to launch the visual selector.                    |
| After time on page   | Specify a delay (in minutes or seconds) that a user must spend on the page before they receive the experience.                                                                                       |
| Smart delay          | Show the experience after the user completes their current task.                                                                                                                                 |
| Rage click           | Shows the experience after a rage click by the user. Amplitude considers a rage click to be rapid successive clicking or tapping in the same location.                                           |
| User confusion <br/> {.tag .web .zero}      | Shows the experience when Amplitude detects user confusion, as signaled by the user's mouse movement.                                                                                            |
| On event tracked     | Shows the experience after the user triggers an event that you define. Guide and Surveys doesn't support using [Labeled Events](/docs/data/visual-labeling) or [Custom events](/docs/data/custom-events) as triggers.  

#### Session properties

Session properties provide an additional layer of trigger targeting restrictions for guides and surveys. When a guide or survey is triggered and has session property conditions, all configured session property conditions must be met for the experience to display to the user.

Session properties are set dynamically through the SDK using the `setSessionProperty` method and can change throughout a user's session. When a session property value changes, the SDK automatically evaluates whether any guides or surveys can now be shown, making them effective with the "Immediately" trigger.

Common use cases for session properties include:

- **User can belongs to multiple orgs**: Control guide or survey visibility based on specific features of the user's current organization. (`isFeatureEnabled: true`)
- **Progress tracking**: Show guides and surveys based on user progression (`onboardingStep: 3`)
- **Dynamic state that shouldn't persist as a user property**: React to real-time user behavior or application state

{{partial:admonition type="note" heading="Feature availability"}}
Session properties are a feature-flagged capability. Contact Amplitude support if you want to use this feature in your implementation.
{{/partial:admonition}}

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

## Limits

Limits ensure you don't bombard users with your messaging. 

| Limit                       | Description                                                                                                                                                                       |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Stop showing when completed | After the user completes the experience, the guide or survey is no longer visible. again.                                                                                                                  |
| Stop showing when dismissed | After the user dismisses the experience, they won’t receive it again. This option requires `Stop showing when completed`.                                                              |
| Cooldown                    | When enabled, specify the maximum number of times a user can receive the experience in the specified time range. This option requires that `Stop showing when dismissed` is disabled. |

## Localization

Localization enables you to serve guides and surveys in different languages without creating a new guide or survey for each language. Click [here](/docs/guides-and-surveys/localization) for more details.

## Status

Statuses enable you to manage when your guide or survey displays.

| Status    | Description                                                                                                                    |
| --------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Draft     | Enables you to make changes to and test the experience, but the experience doesn't appear to users.                                      |
| Published | The guide or survey is live. Any changes you make to a published experience appear to users as soon as you save the guide or survey.                    |
| Schedule  | Define specific start and end dates during which your experience appears. Start and end times use the timezone set on your project. |

## Settings

Access guide or survey settings with the gear icon at the top of the builder.

| Setting           | Description                                                                                                                          |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Dismissable       | Gives users an option to dismiss the experience.                                                                                          |
| Snoozable <br/> {.tag .web .zero}         | Allow the user to snooze the experience for the specified duration.                                                                       |
| Label             | The snooze button’s text.                                                                                                            |
| Duration          | How long the snooze lasts. The experience doesn't re-appear for the user until at least that much time has passed.                        |
| Show on all steps | If disabled, the guide or survey's first step is the only step with a snooze option.                                                           |
| Show step counter | Adds a step counter to each step in the guide or survey. For example, on a guide with five steps, the metric `2/5` appears on the second step. |

## Active state

When a user first views a guide or survey, it becomes "active". It remains active until that user completes or dismisses it. For example:

* A user sees a guide or survey on your homepage.
* They navigate to the contact page.
* The guide or survey remains active even though the trigger condition wasn't met. As a result, the guide or survey follows the user to the contact page.

If a guide or survey is temporarily hidden, Amplitude doesn't show it to the user, but it remains active. If the `temporarily hide if` rules aren't met, the active guide or survey is eligible for display again.

### Tiebreakers when multiple guides are eligible for display

When you have more than one guide or survey that are eligible for display at the same time, Amplitude uses these tiebreakers to decide which experience to show:

1. Amplitude shows active guides or surveys before inactive.
2. Priority
3. Most recently seen (relevant for active guides and surveys only)
4. Most recently created
