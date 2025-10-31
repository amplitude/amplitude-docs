---
id: 494972be-95b9-48c6-91e1-f3ce85dc5bbd
blueprint: section
title: Amplitude Agents
author: b6c6019f-27db-41a7-98bb-07c9b90f212b
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1760460724
nav_title: agents
hide_toc: false
---
Amplitude AI Agents are specialized, goal‑oriented AI experts embedded in Amplitude’s platform. Unlike generic copilots, agents have access to Amplitude analytics, session replay, experiment, surveys, and other data types to surface insights, investigate issues, generate hypotheses, then recommend actions.

{{partial:admonition type="info" heading="AI Agents rollout"}}
Amplitude AI Agents is rolling out to all Amplitude accounts during the week of October 20, 2025. If you don't have the AI Agents tab in your account, it may not be enabled.
{{/partial:admonition}}

## How Agents work with Amplitude

Amplitude AI Agents bring together analytics, session replays, experimentation, guides, and survey data from across your account to build a deep understanding of user behavior. The more complete your Amplitude setup is, the more context and action recommendations the Agents have to work with.

The first Amplitude Agents are task-specific agents tuned to solve common problems like monitoring dashboards, bulk analyzing session replays, and optimizing conversion on websites. 

Select a dashboard or define a goal to get started. Examples of goals are improving trial-to-paid conversion or increasing feature adoption. After you set the context and instructions, the Agent analyzes your data for patterns, identifies issues, and recommends next step opportunities. It can also carry out actions you approve, like running an experiment or sending targeted guidance to specific user segments. 

Create and schedule multiple agents to identify and report key takeaways and improvement areas across your product then push insights and actions into places where work, like Slack, Amplitude, and email.

Interacting with Agents is simple. Use natural language to guide their work, set custom instructions and context to improve accuracy and relevance, then review insights and approve recommendations. Behind the scenes, Amplitude manages the orchestration, combining models from OpenAI, Claude (through AWS Bedrock), and Gemini with its own memory and tooling to ensure your Agents operate effectively.

## Example use cases

- Automate reporting with the [Dashboard Agent](/docs/agents/dashboard-agent)
- Discover behavioral insights with the [Session Replay Agent](/docs/agents/session-replay-agent)
- Explore strategies with the [Website Conversion Agent](/docs/agents/website-conversion-agent)