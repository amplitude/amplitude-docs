---
id: 90eaef9b-bb06-45b3-8e19-3d1c8d2db1d0
blueprint: agent
title: 'Session Replay Deep Research'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1754518936
---
Session Replay Explorer helps you understand user behavior by combining advanced data science with real user session replays. This enables you to identify friction points, optimize user journeys, and make data-driven product decisions.

{{partial:collapse name="Agent summary"}}
As you get started with the Session Replay Explorer agent, keep the following in mind:

|||
|--|--|
| **Target user** | Product managers, UX Designers, Growth teams |
| **Requires** | [Session Replay](/docs/agents/session-replay-deep-research) |
| **Tools** | Event Picker, Session Replay Deep Research Agent, URL Search Tool, Event Relevance Search, Knowledge Base Search |

{{/partial:collapse}}


## Capabilities

* **Session replay insights**: Analyze replays to surface concrete, evidence-backed findings with highlight reels, UI element context, and quantified impact.
* **Content engagement profiling**: Measure scroll depth, dwell time, and element interactions to reveal which article structures drive copy intent.
* **Navigation flow mapping**: Compares entry paths and on-page sequences between copy and non-copy sessions to pinpoint behavior patterns.

## Creating and configuring the agent

1. Click **Create New Agent** on the AI Agents tab.
2. Click **Session Replay Explorer**.
3. Select the following to provide a scope to the agent:
    - **Agent name**: Enter a descriptive name for the agent.
    - **Funnel**: Select an existing funnel to filter available replays to those that contain the events that constitute the funnel.
    - **Event**: Specify the key event or user interaction you want to analyze. For example, Add to Cart, Pricing Page Viewed, Form Submitted, or any other event in your taxonomy.
4. Optionally instruct the agent to focus on a specific user behaviors or flows. For example a new feature, a recent redesign, or users who abandon their carts.
5. Configure how the agent sends you notifications. Set the email recipients, connect to Slack, and set the recurring report frequency.
6. Click **Create Agent**. The agent begins to collect a representative sample of session replays where the event or action you selected occurs. Where possible, the agent adds relevant context like user paths, page URLs, and interaction metadata.

The agent’s advanced algorithms analyze the sessions and try to identify:

- Navigation flows and drop-off points
- Signs of user frustration like rage clicks and repeated errors
- Engagement with specific content or features
- Differences between successful and unsuccessful user journeys

When the analysis is complete, the agent returns:

1. A summary report with key insights
2. Actionable recommendations that include specific next steps to address issues or capitalize on opportunities
3. Session replay evidence to verify findings

## Limitations

Session Replay Explorer analyzes recorded sessions within your retention window, so coverage depends on available replays. Some pages or elements may be missing or obfuscated, and it never surfaces raw session IDs or internal references. Page HTML and selectors come from sampled sessions, so they may not reflect every variant. The agent identifies patterns and correlations and works with your connected product data. Large data requests can be slow or fail, so it may recommend using smaller samples. 