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

Experiment templates capture the configuration of an experiment. Templates include goals, metrics, audience targeting, and variants so you can reuse it for future experiments. Templates are particularly useful when you:

- Run similar experiments across different features or time periods.
- Want to enforce consistent experiment standards across your team.
- Need to quickly launch new experiments with proven configurations.
- Test variations of the same feature with different audiences.

## Permissions

To create, edit, or delete experiment templates, you need the Manage Experiments permission. For more information, review [Manage feature flags and feature experiments](/docs/admin/account-management/manage-feature-flags-and-feature-experiments).

### Template notes and caveats

* Templates are only available on Feature Experiments.
* Templates are project-specific.
* Templates can't be applied to pre-existing experiments.
* You can't convert a template back into an active experiment.
* Template changes don't sync to experiments already created from that template.

## Creating templates

### Create a template from an experiment

To create a template from an existing experiment:

1. Navigate to the experiment you want to save as a template.
2. Click **More options** (three dots) and select **Use as a template**.
3. Enter a Template name and optional Description.
4. Select which components to include in the template:
   - Deployment rules
   - Goals and metrics
   - User targeting rules
   - Evaluation mode and bucketing settings
5. Click **Use as a template**.

Your template automatically appears in the Templates library.

### Create a template from the Templates library

1. Navigate to *Experiments > Templates*.
2. Click **Create Template**.
3. Enter the name you want for your template.
4. Select the project where you want the template applied.
Templates can only apply to a single project.
5. Optionally, enter a description of the template.
6. Click **Create**.

## Create an experiment from a template

To use a template when creating a new experiment:

1. From the Experiments page, click **Create Experiment > Feature Experiment**.
2. Enter information about your experiment.
3. In the Apply a template section, select the template you want from the drop-down menu.
4. Click **Create**.
5. Make any adjustments you want to the experiment.
6. When you ready, click **Start Experiment**.

The new experiment inherits the template configuration but operates independently. Changes to the template don't affect experiments that were created from it.

## Manage experiment templates

### View all templates

Navigate to *Experiment > Templates* to view your organization's template library. The Templates page shows:

- Template name and description
- Number of experiments created from this template
- Last modified date
- Goals
- Evaluation mode
- Number of segments in the template
- Bucketing type

### Edit a template

1. Navigate to *Experiment > Templates*.
2. Click the name of the template you want to edit.
4. Modify the configuration as needed.
5. Click **Save**.

Changes to a template only affect future experiments created from it. Existing experiments created from the template aren't updated.

### Archive a template

1. Navigate to *Experiment > Templates*.
2. Open the template you want to archive.
3. Click the **three-dot** menu icon and then click **Archive**.
4. Confirm the archive.

Archiving a template doesn't affect any experiments that were created from the template.

## Template components

Templates can include the following experiment configurations:

### Experiment settings
- Evaluation mode (local vs. remote)
- Bucketing unit (user vs. group)

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

## Best practices

- **Name templates descriptively**: Use names that clearly indicate the template's purpose, like "Product Page Conversion Test" or "Mobile Onboarding Experiment."
- **Add detailed descriptions**: Include guidance on when to use the template and any special considerations.
- **Review templates regularly**: Archive or update templates that are outdated or no longer align with your experimentation standards.
- **Start with successful experiments**: Create templates from experiments that have proven configurations and clear learnings.
- **Document template variations**: If you create multiple similar templates, document the differences between them.

