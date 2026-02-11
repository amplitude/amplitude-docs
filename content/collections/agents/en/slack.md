---
id: 8d809aa0-5a61-4b23-9c43-fd99f03a13af
blueprint: agent
title: 'Global Agent in Slack'
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1770672156
---
The Amplitude Slack app gives your team access to Global Agent, so you can ask questions about product data directly from Slack and get AI-generated answers grounded in your Amplitude data.

Global Agent in Slack uses the same AI assistant as the Amplitude web app. It respects your Amplitude permissions, uses your configured [AI context](/docs/agents/ai-context), and links back to charts and dashboards for deeper analysis. For more about Global Agent's full capabilities, refer to [Global Agent overview](/docs/agents/global-agent-overview).

## Prerequisites

Before you use Global Agent in Slack, make sure you meet these requirements:

- **Slack connected to Amplitude.** Connect your Slack account to Amplitude through *Settings > Personal Settings > Profile*. For detailed setup steps, refer to [Integrate Slack with Amplitude](/docs/analytics/integrate-slack).
- **Global Agent enabled.** Your Amplitude organization must have Global Agent enabled.
- **Paid Slack plan.** Your Slack workspace must be on a paid Slack plan. This is a Slack platform requirement for AI-powered features.

## Get started

After you connect your Amplitude account to Slack, follow these steps to start using Global Agent:

1. Message Amplitude in any Slack channel where it's enabled, or in a direct message.
2. Ask your first question. Type a natural-language question about your data, such as:
   - "What are our weekly active users?"
   - "How is sign-up to purchase conversion trending this month?"
3. Choose your project.
   - The first time you use Global Agent in Slack, Amplitude prompts you to select a **project**.
   - This project acts as your default context for that DM or channel.
   - You can change it later with the **Change project** button that appears in Global Agent responses.

After you complete these steps, you can @mention Amplitude in any Slack channel to use Global Agent in that channel.

## What you can do

Global Agent in Slack gives you a subset of the in-product Global Agent capabilities, optimized for chat.

### Ask natural-language questions about your product data

Use plain language to ask about product usage, growth, and engagement:

- "What's our DAU trend over the last 30 days?"
- "Which countries have the fastest user growth?"
- "How is retention for users who signed up in the last 7 days?"

Global Agent interprets your question, queries Amplitude with the same analytics engine available in the product, and returns a concise summary with links back to supporting charts or dashboards.

### Create and refine charts

Global Agent can generate or adjust analyses without leaving Slack:

- "Create a funnel from signup to first purchase."
- "Add a filter to show only mobile users on this chart."
- "Break this down by pricing plan."

Global Agent creates or edits charts in your Amplitude project and returns direct links. Open the chart in Amplitude to explore it further, adjust configurations, or share it with your team.

### Find and share existing content

Use Global Agent as a discovery layer over your saved work:

- "Find our retention dashboard for the mobile app."
- "Show me revenue trend charts."
- "Locate dashboards about onboarding experiments."

Global Agent surfaces existing charts and dashboards and shares them back into Slack, making it easy to reuse analyses instead of rebuilding them.

## Link previews and chart unfurls

When Global Agent includes Amplitude links in its Slack replies:

- Slack unfurls the links into rich previews, so teammates can quickly see the referenced content.
- Where supported, chart previews help stakeholders validate insights at a glance.

If previews aren't showing for links that Global Agent shares, confirm that you've enabled link previews in Slack for your workspace and client. For setup details, refer to [Turn on link previews](/docs/analytics/integrate-slack#turn-on-link-previews).

{{partial:admonition type="note" heading=""}}
Some legacy chart types (including Pathfinder, Compass, and Persona) don't unfurl as rich previews, even when you enable link previews.
{{/partial:admonition}}

## Permissions and context

Global Agent in Slack uses the same assistant that runs in the Amplitude web app:

- It uses your organization's Global Agent context and settings (such as default organization or project context).
- It respects existing Role-Based Access Control (RBAC) and Space permissions. Global Agent returns only results based on data you can already access in Amplitude.
- Links that Global Agent generates open directly in Amplitude, where you can access the full chart, dashboard, or notebook experience if you have the required permissions.

For sensitive or high-impact decisions, always open the linked chart or dashboard in Amplitude and validate the underlying data and configuration.

## Troubleshooting

If Global Agent in Slack isn't behaving as expected, try the following checks:

- **No response from @Amplitude.**
  - Verify that you've connected your Slack account in *Settings > Personal Settings > Profile* in Amplitude.
  - Confirm that you've added the Amplitude app to the channel.
  - Make sure your Slack workspace is on a paid plan and your Amplitude organization has Global Agent enabled.

- **Answers seem incomplete or irrelevant.**
  - Check which project Global Agent shows in its response and, if needed, select **Change project** to switch to a more relevant project.
  - Rephrase your question with more context (for example, specify platform, date range, or key segments).

- **Link previews aren't showing.**
  - Ensure that you've enabled link previews in Slack. For details, refer to [Turn on link previews](/docs/analytics/integrate-slack#turn-on-link-previews).
  - Confirm that the link points to a supported chart or dashboard type.

If issues persist, contact your Amplitude administrator or reach out to Amplitude Support.

## Data verification

Global Agent helps you move faster by summarizing and exploring your Amplitude data. However, like any AI system:

- Responses may sometimes be incomplete or inaccurate.
- The model may misinterpret ambiguous questions or rely on misconfigured charts.

For critical business decisions:

- Always open the linked charts and dashboards in Amplitude.
- Confirm that filters, segments, and date ranges match what you expect.
- Use Global Agent as a starting point or accelerator, not as the final source of truth.
