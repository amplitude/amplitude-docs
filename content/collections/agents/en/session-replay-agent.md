---
id: 90eaef9b-bb06-45b3-8e19-3d1c8d2db1d0
blueprint: agent
title: 'Session Replay Agent'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1760997431
---
The Session Replay Agent helps you understand user behavior by combining advanced data science with real user session replays. This enables you to identify friction points, optimize user journeys, and make data-driven product decisions.

{{partial:collapse name="Agent summary"}}
As you get started with the Session Replay Agent, keep the following in mind:

|                 |                                                                                                                             |
| --------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Target user** | Product managers, UX Designers, Growth teams                                                                                |
| **Requires**    | [Session Replay](/docs/agents/session-replay-explorer)                                                                      |
| **Tools**       | Session Replay Analysis, Friction Detection, Navigation Flow Analysis, Content Engagement Analysis, HTML Context Extraction |

{{/partial:collapse}}

## Capabilities

- **Session replay insights**: Analyze replays to surface concrete, evidence-backed findings with highlight reels, UI element context, and quantified impact.
- **Multi-phase analysis**: Conducts systematic analysis through data gathering, structured analysis with specialized analyzers, insight refinement, and documentation phases.
- **Friction detection**: Identifies rage clicks, dead clicks, form abandonment, and other user frustration signals across your application.
- **Navigation flow mapping**: Analyzes page-to-page user journeys, drop-off points, and element-to-element interaction patterns to understand user behavior.
- **Content engagement profiling**: Measure scroll depth, dwell time, and element interactions to reveal which article structures drive copy intent.
- **Product context integration**: Automatically extracts page HTML and UI component information to provide specific, actionable recommendations tied to your actual interface elements.

## Creating and configuring the agent

1. Click **Create New Agent** on the AI Agents tab.
2. Click **Session Replay**.
3. **Agent name**: Enter a descriptive name for the agent.
4. Select one of the following to provide a scope to the agent to explore each run:
   - **Funnel**: Select an existing funnel to filter available replays to those that contain the events that constitute the funnel.
   - **Event**: Specify the key event or user interaction you want to analyze. For example, Add to Cart, Pricing Page Viewed, Form Submitted, or any other event in your taxonomy.
5. Optionally instruct the agent to focus on a specific user behaviors or flows. For example a new feature, a recent redesign, or users who abandon their carts.
6. Configure how the agent sends you notifications. Set the email recipients, connect to Slack, and set the recurring report frequency.
7. Click **Create Agent**. The agent begins to collect a representative sample of session replays where the event or action you selected occurs. Where possible, the agent adds relevant context like user paths, page URLs, and interaction metadata.

The agent’s advanced algorithms analyze the sessions and try to identify:

- Navigation flows and drop-off points
- Signs of user frustration like rage clicks and repeated errors
- Engagement with specific content or features
- Differences between successful and unsuccessful user journeys

When the analysis is complete, the agent returns:

1. **Structured insights**: Individual findings with titles, impact assessments, and specific UI element references
2. **Highlight reels**: Curated session replay clips that demonstrate each identified pattern or issue
3. **Actionable recommendations**: Specific next steps tied to actual page elements, buttons, and flows in your application
4. **Quantified impact**: Statistical evidence showing how many sessions and what percentage of users are affected by each finding

## How the agent runs

The Session Replay can operate in two modes:

### Interactive mode

Chat directly with the agent to explore specific questions about your users' behavior. The agent responds to your requests in real-time, helping you dive deeper into particular insights or explore different analytical angles as the conversation develops.

### Scheduled runs

When running on its configured schedule, the agent acts like a product manager exploring your data with fresh eyes. It automatically selects an analytical focus area within your configured funnel or event scope, choosing from different research approaches like friction detection, user journey mapping, or content engagement analysis.

This simulated product manager perspective helps surface insights you might not have thought to investigate, conducting multiple rounds of deep-dive analysis to uncover actionable patterns. Each scheduled run explores a different analytical angle, ensuring comprehensive coverage of potential opportunities and issues within your specified scope.

## Limitations

Session Replay analyzes recorded sessions within your retention window, so coverage depends on available replays. Some pages or elements may be missing or obfuscated, and it never surfaces raw session IDs or internal references. Page HTML and selectors come from sampled sessions, so they may not reflect every variant. The agent identifies patterns and correlations and works with your connected product data. Large data requests can be slow or fail, so it may recommend using smaller samples.

## Platform compatibility

The Session Replay Agent analyzes replay data to surface interaction insights and behavioral summaries. Its capabilities depend on the type of replay data available.

- **Web apps**: Fully supported. The agent can reliably analyze clicks, navigation, text interactions, and produce aggregate insights.
- **Mobile WebView and in-app browsers**: Supported. Web content rendered inside a native app shell is captured the same way as standard web, so the agent works as expected.
- **Native mobile apps (iOS and Android)**: Not yet supported. Native mobile replays capture visual frames and raw gesture coordinates, but don't include the structured element-level data the agent needs to identify what users interacted with. You can still watch native mobile replays for qualitative review, but agent-powered analysis and aggregates aren't yet available.