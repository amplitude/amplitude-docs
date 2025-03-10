---
id: e2e25f59-3bfc-4b09-bcd0-bdf0f97854bb
blueprint: guides_and_survey
title: 'Get Started'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1741625702
landing: true
landing_blurb: 'Learn about Guides and Surveys overview and available charts'
---
Before you get started with Guides and Surveys, install the [SDK](/docs/guides-and-surveys/sdk) on your website or application.

Click Guides and Surveys in the left navigation in Amplitude to get started.

## Roles and permissions

Guides and Surveys permissions enable you to override a user's base level Amplitude [role](/docs/admin/account-management/user-roles-permissions) to grant a different level of access specifically for Guides and Surveys.

| Guides and Surveys role | Access                                                                                                       |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ |
| No access | Can't view the Guides and Surveys section. |
| Viewer                  | Can view Guides and Surveys, but can't edit or run experiments.                                              |
| Member                  | Can edit draft Guides and Surveys. Can't publish or edit published guides or surveys. Can't run experiments. |
| Manager                 | Full access to Guides and Surveys.                                                                           |
| Administrator           | Full access to Guides and Surveys.                                                                           |

To update a user's access to Guides and Surveys:

1. Navigate to *Guides and Surveys > Permissions*. A list of your organization's users appears.
2. Select one or more users, then click **Manage Project Access**.
3. If your organization has more than one project, select the individual projects for which you need to update the user's role.
4. Select the update role on a per-project basis.

## Overview

The Overview tab provides a high-level snapshot about how your Guides and Surveys perform. It provides key insights into engagement, interactions, and user behavior.

This tab provides a single location to track how well your in-product guidance performs. Is a new guide gaining traction? Are users completing your surveys? This tab provides a pulse check.

### Filter card

![](statamic://asset::help_center_conversions::guides-surveys/filter-overview.png)

The Filter card enables you to narrow the scope of your analysis to a specific date range, segment, or property condition. For example, look at a users on a specific account tier engaged, or find users who performed a specific action.

### Views and completions over time

View line charts for surveys viewed, surveys completed, guides viewed, and guides completed over the time range defined in the filter card.

Use [Microscope](/docs/analytics/microscope) on this chart to dive deeper with session replays, user streams, and session replays. Or target the users in that data point with follow up guides or surveys, create cohort, or download the users for export to another system.

### Total guide views

Provides the total number of non-unique views for guides over the last 30 days. Use this to help track engagement across all live guides.

### Recent guides performance

Displays a breakdown of individual guides and their view counts, over the last 30 days. Use this to compare how different guides perform at a glance.

### Total survey responses

Shows the total number of survey responses from all active surveys, over the last 30 days.

### Recent survey performance

Displays a detailed view of individual surveys and their responses over the last 30 days. Use this value to analyze user response rates and identify trends.

### Rage closes

![](statamic://asset::help_center_conversions::guides-surveys/rage-closes.png)

Measures the percentage of users who rage closed a guide or survey. High rage close rates could mean poor timing or intrusive placement.

{{partial:admonition type="tip" heading="Rage closes"}}
Amplitude considers a guide or survey that was rapidly dismissed or exited to be "rage closed". This behavior indicates user dissatisfaction.
{{/partial:admonition}}

### Guides and Surveys interactions

![](statamic://asset::help_center_conversions::guides-surveys/interactions.png)

Provides a realtime feed that shows how users are interacting with your Guides and Surveys. Use this data to track engagement patterns and make optimizations.