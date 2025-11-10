---
id: f8e3d9c2-4b5a-6c7d-8e9f-0a1b2c3d4e5f
blueprint: guides_and_survey
title: 'Conditional Logic'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1730995200
section: guides
landing: true
landing_blurb: 'Create dynamic experiences that adapt based on user properties and survey responses.'
---
Conditional logic enables you to create dynamic, personalized experiences that adapt based on user properties and survey responses. Use conditional logic to branch survey paths, trigger different actions based on user characteristics, or show different content to different users.

## Where you can use conditional logic

Conditional logic can be used with both guides and surveys and can be chosen as an action for either primary or secondary buttons.

## Types of conditions

Create conditions based on two types of data:

### User properties

User properties are attributes about your users, such as their location, subscription tier, or account type. User properties must be shared client-side during the session with either the Amplitude SDK or the Engagement SDK.

Common user property examples:

* `subscription_tier`
* `country`
* `account_type`
* `initial_referring_domain`

{{partial:admonition type="note" heading="User property requirements"}}
Properties must be available client-side during the current session. Properties shared from prior sessions or properties only stored on the server aren't supported. Go to [Set user properties](/docs/guides-and-surveys/sdk#set-user-properties) for implementation details.
{{/partial:admonition}}

### Survey responses

Survey responses are the answers users provide to questions in your surveys. Use survey responses to branch your survey based on how users answer.

Survey response examples:

* NPS ratings
* Star ratings
* Multiple choice selections
* Text input values

### Combining conditions

You can combine multiple conditions to create more sophisticated logic. When you add multiple conditions, all conditions must be met for the action to execute.

For example, you might create a condition that says: "If `subscription_tier = premium` AND `country = US`, then visit link to premium US-specific content."

## Set up conditional logic

The setup process is similar whether you're adding conditional logic to buttons or survey steps.

### Add conditional logic to buttons

1. In your guide or survey, add a primary or secondary button.
2. Click the **On button click** dropdown.
3. Select **Evaluate conditional logic**.
4. Navigate to the Conditional Logic section.
5. Under **When**, select either **User Property** or **Survey Response** from the dropdown.
6. Configure your condition:
   - For **User Property**: Select the property, operator, and value.
   - For **Survey Response**: Select the question, operator, and value.
7. (*Optional*) Click **Add condition** to add additional conditions.
8. Under **Do this**, select the action to execute when the condition is met.
9. Configure the action based on your selection.

{{partial:admonition type="tip" heading="Multiple conditional actions"}}
You can add multiple conditional actions to handle different scenarios. For example, one action for premium users and another for free users. Amplitude evaluates conditions in order and executes the first matching action.
{{/partial:admonition}}

## Examples and use cases

### Branch survey based on NPS score

Create a survey that asks different follow-up questions based on a user's NPS score:

1. Add an NPS rating block asking "How likely are you to recommend us?"
2. Add conditional logic:
   - If `rating ≤ 6` (Detractors), then go to step asking "What can we improve?"
   - If `rating ≥ 9` (Promoters), then go to step saying "Thank you! Would you leave us a review?"

This ensures detractors get a chance to provide feedback, while promoters are encouraged to share their positive experience.

### Redirect users based on subscription tier

Create a guide with a button that directs users to different pages based on their subscription level:

1. Add a primary button labeled "View Features".
2. Select **Evaluate conditional logic**.
3. Add conditions:
   - If `subscription_tier = premium`, then visit link `www.example.com/premium-features`.
   - If `subscription_tier = free`, then visit link `www.example.com/upgrade`.

This ensures each user sees content relevant to their subscription level.

### Show guide only to specific user segments

Launch a secondary guide based on both user property and survey response:

1. Add a primary button labeled "Next".
2. Select **Evaluate conditional logic**.
3. Add conditions:
   - If `country = US` AND `rating > 8`, then show guide "US-specific-offer".
   - If `country ≠ US` AND `rating > 8`, then show guide "international-offer".

This creates a personalized experience based on both location and satisfaction level.

### Personalized CTA based on user properties

Create a button action that clicks different elements based on user characteristics:

1. Add a primary button labeled "Get Started".
2. Select **Evaluate conditional logic**.
3. Add conditions:
   - If `user_type = new`, then click element `[data-testid="onboarding-flow"]`.
   - If `user_type = returning`, then click element `[data-testid="dashboard"]`.

This ensures new users enter onboarding while returning users go directly to their dashboard.

## Best practices

* **Test thoroughly**: Use [preview mode](/docs/guides-and-surveys/testing#preview-mode) to test all conditional paths before publishing.
* **Keep logic simple**: Complex nested conditions can be difficult to maintain and debug.
* **Monitor results**: Use [analytics](/docs/guides-and-surveys/analytics-glossary) to track how users flow through your conditional experiences.
