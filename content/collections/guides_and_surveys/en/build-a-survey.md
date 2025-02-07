---
id: b321e1a4-7306-48df-a501-f49573d7f897
blueprint: guides_and_survey
title: 'Build a Survey'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738273389
section: surveys
landing_blurb: See what goes in to building a survey, and how they differ from guides.
---
The survey build experience contains many of the same features at the guide builder, and uses a subset of the available [form factors](/docs/guides-and-surveys/guides/form-factors#form-factors) (modal, popover, pin) and [properties](/docs/guides-and-surveys/guides/form-factors#properties).

## Survey blocks

Surveys offer four unique block types, each suitable for capturing a different kind of user feedback.

### Rating

The Rating block enables users provide structured feedback using a scale you define. Surveys provide the following rating types:

| Rating type   | Description                                                                            |
| ------------- | -------------------------------------------------------------------------------------- |
| Stars         | A three or five point scale that displays star icons to the user.                      |
| Rating labels | Enter text labels that appear on the low and high ends of the scale.                   |
| Emoji         | A two, three, or five point scale that displays emojis that you choose for each value. |
| NPS           | A 0 - 10 point [Net Promoter Score](https://en.wikipedia.org/wiki/Net_promoter_score). |

Click the gear icon in the rating block to access more settings.

| Setting                 | Description                                                                  |
| ----------------------- | ---------------------------------------------------------------------------- |
| Required                | Enable to require the user to enter a rating.                                |
| Numbers                 | A five or ten point scale that displays numbers to the user.                 |
| Stars / Numbers / Emoji | Select the number of options available in the rating. Not applicable to NPS. |

#### Conditional logic

Unlike guides, surveys often require dynamic responses based on user input. Conditional logic supports these use cases.

On each step of a survey, you can add one or more conditions that consider the entered rating, and enable you to trigger an action if the rating meets the condition.

Use conditional logic to:

* **Trigger actions based on responses**: Change what happens next depending on how a user answers.
* **Branch survey paths**: Users who give a low rating might get a follow-up question asking why.
* **Personalized experiences**: Show different questions or steps based on previous responses.

For example, if you have a question with a five point scale, you can use the following logic:

* If `rating < 4` then `Show step to ask what went wrong`
* If `rating > 3` then `Show step with a 'thank you' message`

This logic asks a followup question to users who gave a 1-3, and shows a thank you message to users who gave a 4 or 5.

## Setup and target your survey

Setup and targeting of surveys works the same as for [guides](docs/guides-and-surveys/guides/setup-and-target). Follow those instructions for your survey.