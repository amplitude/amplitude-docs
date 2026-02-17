---
id: 3bbe3a80-aaff-4930-ae38-1a7219585f35
blueprint: agent
title: 'Specialized Agents Overview'
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1739404800
---
Specialized Agents are purpose-built AI agents that focus on a single domain or workflow. Unlike [Global Agent](/docs/amplitude-ai/global-agent-overview), which serves as a unified entry point for exploration and ad-hoc analysis, Specialized Agents run on a recurring schedule to analyze what's happening and push summaries, opportunities, and recommended actions to your Agent Inbox, email, or Slack.

## Available Specialized Agents

Amplitude offers four Specialized Agents, each tuned to a specific workflow:

- **[Dashboard Agent](/docs/amplitude-ai/dashboard-agent)**: Points at any existing Amplitude dashboard and continuously analyzes each chart for meaningful changes. It surfaces top trends, runs root-cause analyses on specific metrics, and supports natural-language follow-up questions with ad-hoc chart creation.
- **[Session Replay Agent](/docs/amplitude-ai/session-replay-agent)**: Analyzes session replays at scale across your chosen funnels or events. It identifies behavioral patterns, friction signals like rage clicks and dead clicks, and delivers actionable themes with curated playlists of the most relevant session clips.
- **[Website Conversion Agent](/docs/amplitude-ai/website-conversion-agent)**: Continuously analyzes key digital conversion flows such as signup and checkout. It identifies drop-offs and behavioral anomalies, leverages session replay signals to diagnose root causes, and can initiate actions like launching experiments or creating cohorts.
- **[Customer Feedback Agent](/docs/amplitude-ai/customer-feedback-agent)**: Analyzes qualitative feedback from surveys, support tickets, and other [AI Feedback](/docs/amplitude-ai/ai-feedback) sources. It identifies themes, tracks sentiment shifts, and connects qualitative insights back to behavioral data.

## Access Specialized Agents

Find Specialized Agents under the *Agents* tab in Amplitude. The *Agents* tab contains:

- **Agent Inbox**: A unified, in-product inbox for all Specialized Agent activity. Review agent threads, scheduled run outputs, alerts, and generated artifacts asynchronously without monitoring agents in real time.
- **Shared Agents**: Discoverable, reusable agent instances at the organization level. Use shared agents directly or share them across teams for consistent workflows. Shared Agents follow existing Amplitude permissions and are managed at the organization level.

## Share agents with your team

You can share any Specialized Agent so others in your organization can view its insights and reports. There are two ways to share an agent:

- **Make it discoverable**: Set an agent as discoverable across your organization. All discoverable agent threads appear in every user's Agent Inbox on the *Agents* overview page, so anyone in the org can see the insights and reports the agent generates.
- **Add specific users**: Add individual users to the agent. Those users see the agent's scheduled threads in their Agent Inbox and can edit the notification settings for themselves.

To share an agent, configure the sharing options when you create the agent, or update them from the Agent Inbox on an existing agent.

### Discover agents from dashboards

On any dashboard, you can see which Specialized Agents other users have created and made discoverable for that dashboard. Select an agent to view its latest insights and reports directly from the dashboard.

## How Specialized Agents work with Global Agent

Specialized Agents and Global Agent form a complementary system:

1. **Specialized Agents surface insights continuously**: Each agent monitors its domain on a schedule and delivers findings proactively.
2. **Global Agent enables exploration and action**: Use Global Agent to ask follow-up questions about what Specialized Agents find, dig deeper into specific insights, and take action like creating cohorts, launching experiments, or building dashboards.

This creates a loop from insight detection to exploration to action, shifting analytics from a reactive process to a proactive, agent-driven system.

## Scheduling and notifications

Each Specialized Agent supports flexible notification options:

- **Email**: Add subscribers to receive scheduled reports.
- **Slack**: Connect a Slack channel to receive agent outputs.
- **Agent Inbox**: All agent activity appears in the *Agents* tab for async review.

Set the recurring frequency, day, time, and time zone when you create or configure an agent. Scheduled agents analyze data at each run and push summaries and recommendations through your configured channels.
