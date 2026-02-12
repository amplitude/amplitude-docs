---
id: f8d2a4c6-3e5b-47a9-b1d0-6c8e0f2a4b6d
blueprint: agent
title: 'Customer Feedback Agent'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1739404800
---
The Customer Feedback Agent automatically surfaces top customer requests, bugs, complaints, and praises from your [AI Feedback](/docs/amplitude-ai/ai-feedback) sources. It analyzes incoming qualitative feedback---from surveys, support tickets, and sales calls---to identify key themes, sentiment shifts, and emerging issues. The agent pairs these qualitative insights with behavioral data to help you understand not just what users do, but why, and delivers prioritized recommendations asynchronously through email or Slack.

{{partial:collapse name="Agent summary"}}
As you get started with the Customer Feedback Agent, keep the following in mind:

|||
|--|--|
| **Target user** | Product managers, customer experience teams, growth teams |
| **Requires** | [AI Feedback](/docs/amplitude-ai/ai-feedback) (at least one connected source) |
| **Tools** | Feedback Analysis, Theme Identification, Sentiment Tracking |

{{/partial:collapse}}

## Capabilities

- **Automated feedback analysis**: Analyzes incoming qualitative feedback from connected AI Feedback sources and identifies key themes, sentiment shifts, and emerging issues without manual review.
- **Qualitative-quantitative connection**: Connects qualitative insights to behavioral data so you understand not just what users do, but why.
- **Theme grouping**: Groups feedback into categories---feature requests, bugs, complaints, loved features, and pain points---instead of requiring you to read through hundreds of responses.
- **Prioritized recommendations**: Generates actionable, customer-informed recommendations on improvements to ship, ranked by impact and frequency.
- **Async reporting**: Delivers scheduled reports through email or Slack so you stay informed without manually checking dashboards.

## Prerequisites

The Customer Feedback Agent requires at least one connected [AI Feedback source](/docs/amplitude-ai/ai-feedback#setting-up-a-data-source). Set up your feedback sources before you create the agent.

## Create and configure the agent

1. Select **Create New Agent** on the *AI Agents* tab.
2. Select **Customer Feedback Agent**.
3. **Agent Name**: Enter a descriptive name for the agent.
4. **Product**: Optionally enter a product name to scope the agent's analysis to a specific product area.
5. Define the customer insights you want the agent to identify. Describe the types of feedback, sources, and time ranges you want the agent to monitor. For example, "top bugs from Zendesk this month" or "feature requests from support tickets in the last week."

   Use a starter prompt to get started quickly:
   - **Top Weekly Feedback Themes**: Surfaces the most common feedback themes each week.
   - **Feature-Specific Deep Dive**: Focuses analysis on feedback about a specific feature.
   - **Customer Love Stories**: Highlights positive feedback and loved features.
   - **Urgent Product Bugs**: Prioritizes bug reports and critical issues.
   - **Sentiment Score & Trend Analysis**: Tracks sentiment shifts and trends over time.

6. Configure how the agent sends you notifications.
   - **Email**: Add subscribers by entering names or email addresses.
   - **Slack**: Select a Slack channel to receive reports.
   - Set the recurring report frequency, day, time, and time zone.
7. Select **Create Agent and Run Agent**.

{{partial:admonition type="tip" heading="Agents benefit from detail"}}
The more detail you provide about the feedback types and sources you care about, the more relevant the agent's insights are. Ask follow-up questions in the chat to refine the analysis.
{{/partial:admonition}}

## How the agent runs

The Customer Feedback Agent connects to your [AI Feedback](/docs/amplitude-ai/ai-feedback) sources and operates in two modes:

### Interactive mode

Chat directly with the agent to explore specific questions about your customer feedback. Ask questions like "What are the top complaints this week?" or "Show me feature requests related to onboarding" and the agent responds in real time with evidence-backed findings.

### Scheduled runs

On its configured schedule, the agent analyzes recent feedback across your connected sources and delivers a report that includes:

1. **Theme summary**: The most common feedback themes grouped into categories like feature requests, bugs, complaints, loved features, pain points, and key takeaways.
2. **Sentiment shifts**: Changes in customer sentiment compared to the previous reporting period.
3. **Emerging issues**: New or growing patterns that need attention.
4. **Actionable recommendations**: Prioritized suggestions on what to build, fix, or investigate next, based on feedback volume and customer impact.

## Limitations

The Customer Feedback Agent analyzes feedback from connected AI Feedback sources only. The quality and completeness of insights depend on the volume and variety of feedback available in your sources. The agent identifies patterns and themes from qualitative data but doesn't modify your feedback sources or AI Feedback configuration. Large volumes of feedback may take longer to process, and the agent may recommend smaller time ranges for more focused analysis.
