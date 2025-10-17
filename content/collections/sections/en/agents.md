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
Amplitude Agents are goal‑oriented AI experts embedded in Amplitude’s platform. Unlike generic copilots, they combine your product’s behavioral data with Amplitude’s full suite of products to investigate issues, generate hypotheses, design experiments, recommend actions, and track impact. They’re designed to behave like product analytics specialists that run analyses in the background.

## How agents work with Amplitude

Amplitude Agents bring together analytics, experimentation, guides, and session replay data from across your account to build a deep understanding of user behavior. The more complete your Amplitude setup is, the more context the agents have to work with.

Start by defining a goal, like improving trial-to-paid conversion or increasing feature adoption. After you set the goal, the agent continuously scans your data for patterns, identifies friction points, and recommends next steps. It can also carry out actions you approve, like running an experiment or sending targeted guidance to specific user segments.

Amplitude built each agent with a specific focus. These specialized agents come preloaded with optimization patterns and best practices, drawing from Amplitude’s experience with thousands of teams. This allows them to deliver tailored strategies for the outcomes you want.

Use natural language to guide the agent's work, adjust their level of autonomy, and approve their recommendations. Behind the scenes, Amplitude manages the orchestration, combining models from OpenAI and AWS Bedrock with its own memory and tooling to ensure your agents operate effectively.

## Get started with Amplitude Agents

Access Amplitude Agents from the left navigation panel in Amplitude to find a set of agent templates, like [Dashboard Monitoring](/docs/agents/dashboard-monitoring) and [Session Replay Analysis](/docs/agents/session-replay-explorer).

### Agent settings

To help agents start with the best context, project administrators can define which event in your taxonomy represents a page view, and which property in that event contains a page's full URL.