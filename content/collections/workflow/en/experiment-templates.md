---
id: 8f9e2a1c-5d7b-4e3f-9c8a-2b1d6f4e8a3c
blueprint: workflow
title: 'Experiment templates'
this_article_will_help_you:
  - 'Understand what experiment templates are and when to use them'
  - 'Create experiment templates from existing experiments'
  - 'Use templates to quickly create new experiments'
  - 'Manage and update your experiment templates'
landing: false
exclude_from_sitemap: false
---

Experiment templates capture the configuration of an experiment. Templates include goals, metrics, audience targeting, statistical preferences, and variants so you can reuse it for future experiments. Templates are particularly useful when you:

- Run similar experiments across different features or time periods.
- Want to enforce consistent experiment standards across your team.
- Need to quickly launch new experiments with proven configurations.
- Test variations of the same feature with different audiences.

Templates are only applicable to Web Experiments.

## Create a template from an experiment

To create a template from an existing experiment:

1. Navigate to the experiment you want to save as a template.
2. Click **More options** (three dots) and select **Save as template**.
3. Enter a Template name and optional Description.
4. Select which components to include in the template:
   - Variants and allocations
   - Goals and metrics
   - Audience targeting rules
   - Statistical preferences
   - Evaluation mode and bucketing settings
5. Click **Create template**.

Your template appears in the Templates library.

## Create an experiment from a template

To use a template when creating a new experiment:

1. Click **Create > Experiment from template**.
2. Select the template you want to use from the Templates library.
3. Review and customize the pre-populated settings:
   - **Name**: Give your new experiment a unique name
   - **Project**: Confirm or change the project
   - **Key**: Amplitude generates a new key automatically
   - Review variants, goals, and audience settings
4. Make any necessary adjustments to the configuration.
5. Click **Create**.

The new experiment inherits the template configuration but operates independently. Changes to the template don't affect existing experiments created from it.

## Manage experiment templates

### View all templates

Navigate to *Experiment > Templates* to view your organization's template library. The Templates page shows:

- Template name and description
- Creator and creation date
- Number of experiments created from this template
- Last modified date

### Edit a template

To update a template:

1. Navigate to *Experiment > Templates*.
2. Select the template you want to edit.
3. Click **Edit template**.
4. Modify the configuration as needed.
5. Click **Save changes**.

Changes to a template only affect future experiments created from it. Existing experiments created from the template aren't updated.

### Delete a template

To remove a template:

1. Navigate to *Experiment > Templates*.
2. Select the template you want to delete.
3. Click **More options** (three dots) and select **Delete**.
4. Confirm the deletion.

Deleting a template doesn't affect any experiments that were created from the template.

## Template components

Templates can include the following experiment configurations:

### Variants
- Variant names and descriptions
- Payload configurations
- Traffic allocation percentages

### Goals and metrics
- Primary and secondary metrics
- Success and guardrail metrics
- Metric types and configurations
- Minimum detectable effects

### Audience targeting
- Segment definitions
- Property-based targeting rules
- Geographic or demographic filters
- User ID targeting

### Statistical preferences
- Confidence level
- Statistical power
- Test methodology (hypothesis testing vs. do-no-harm)
- Sequential testing settings

### Experiment settings
- Evaluation mode (local vs. remote)
- Bucketing unit (user vs. group)
- Sticky bucketing preferences

## Best practices

- **Name templates descriptively**: Use names that clearly indicate the template's purpose, like "Product Page Conversion Test" or "Mobile Onboarding Experiment."
- **Add detailed descriptions**: Include guidance on when to use the template and any special considerations.
- **Review templates regularly**: Archive or update templates that are outdated or no longer align with your experimentation standards.
- **Start with successful experiments**: Create templates from experiments that have proven configurations and clear learnings.
- **Document template variations**: If you create multiple similar templates, document the differences between them.

## Permissions

To create, edit, or delete experiment templates, you need the **Manage experiments** permission. For more information, review [Manage feature flags and feature experiments](/docs/admin/account-management/manage-feature-flags-and-feature-experiments).

## Limitations

- Templates aren't supported for Feature Flags (flags don't use the template system).
- Templates created from Web Experiments don't include page-specific targeting.
- You can't convert a template back into an active experiment.
- Template changes don't sync to experiments already created from that template.

