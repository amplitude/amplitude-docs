---
id: a8b2c3d4-e5f6-4789-a012-3456789abcde
blueprint: guides_and_survey
title: Tags
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738273800
section: tags
landing_blurb: "Use custom tags to organize and manage your guides and surveys more effectively."
---
Tags help you organize and manage your guides and surveys by creating custom labels that make it easy to categorize, search, and coordinate your content across teams.

## Key benefits

- **Better organization**: Group related guides and surveys together.
- **Improved searchability**: Find specific content using tag filters.
- **Team coordination**: Make it easier for teams to manage their guides and surveys.
- **Bulk management**: Apply changes to multiple guides or surveys at the same time.
- **Event tracking**: Tags are automatically included as a property on all guide and survey events.

## Adding tags

##### Add tags to an individual guide or survey

1. In the guide or survey editor, click the Tags control under the title.
2. Select an existing tag, or enter a new one.

##### Add existing tags to multiple guides or surveys

1. From the list view, select the guides or surveys to which you want to apply a tag.
2. Click **Assign Tags** in the table header.
3. Select the tags you want to apply.

### Tag naming best practices

- Use descriptive, consistent names (for example, `onboarding`, `feature-announcement`, `user-feedback`)
- Keep tags concise but meaningful
- Use lowercase with hyphens for multi-word tags
- Establish naming conventions across your team

### Renaming tags and editing description

To rename a tag or update its description:

1. Navigate to the guides list view or surveys list view.
2. Ensure you enable the Tags column in table settings.
3. Hover over a cell in the Tags column and click edit.
4. Click the edit icon and update the name and/or description
5. Save

The tag updates across all guides and surveys where it's used.

### Tag best practices for organization

Come up with a system of tags that makes sense for your team. For example you might run with the following:

- **Campaign tags**: Use tags like `spring-campaign`, `product-launch` for time-bound initiatives.
- **Feature tags**: Tag content related to specific features (for example, `analytics`, `billing`, `onboarding`).
- **Team tags**: Identify ownership with tags like `growth-team`, `product-team`.

## Searching and filtering by tags

1. Navigate to the Guides or Surveys list view.
2. Ensure that the Tags columnn is visible.
3. Click **Add Filter** and select **Tags**.
4. Choose one or more tags from the available options.
5. The list updates to show only guides with the selected tags.

### Advanced filtering

Combine tag filters with other filters. For example, applying a team tag and a feature tag to a specific guide.

## Bulk operations with tags

From the guides list view or surveys list view, you can select multiple rows and bulk-apply tag updates.

## Tags and throttling

Tags are important in [advanced throttling](/docs/guides-and-surveys/throttling#advanced-throttles). Use tags to create sophisticated rate-limiting strategies for different categories of guides and surveys.

### Throttling use cases with tags

- **Campaign management**: Use campaign tags like `spring-launch` to limit promotional guides.
- **User journey stages**: Use tags like `onboarding`, `activation`, `retention` to control flow progression.
- **Content priority**: Use priority tags like `critical`, `important`, `optional` with different throttle limits.

{{partial:admonition type="tip" heading=""}}
Plan your tag strategy with throttling in mind. Consistent, meaningful, tags make advanced throttling more effective and easier to manage.
{{/partial:admonition}}

Go to [Advanced Throttles](/docs/guides-and-surveys/throttling#advanced-throttles) for detailed setup instructions.
