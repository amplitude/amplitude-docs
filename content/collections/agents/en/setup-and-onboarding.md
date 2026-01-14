---
id: 6acdb952-28cc-4a62-996d-e9af7d5e387b
blueprint: agent
title: 'Setup and Onboarding'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1754519028
published: true
---

Amplitude Agents are available and included as part of the Amplitude platform across all plan types. Availability of specific agents and functionality depend on the features and data available to your account. For example, you need access Session Replay for the agent to analyze them.

Access AI Agents from the left navigation panel in Amplitude to find a set of preconfigured agent templates like the Dashboard, Session Replay, and Website Optimization Agents. After you create your first agent, view all created and scheduled agent threads from the AI Agents page.

## Enable Agents in your organization

Amplitude Agents are available to all organizations by default, unless your organization has opted out of all AI features. If you’d like to opt your organization out from AI features, contact [Amplitude Support](https://gethelp.amplitude.com/hc/en-us).

## Creating agents

Open the AI Agents tab in Amplitude to create a new agent, or check on an agent you already created. You can create multiple agents spanning across multiple dashboards, product flows, or web pages to optimize.

Amplitude creates agents on a per-user basis, so agents that you’ve created are only visible by you and respect your individual permissions. If your agent identifies insights or recommends any actions to take, you can share the URL of the thread or artifact directly with teammates so they can view the outputs.

## Providing context

Agents are only as effective as the data and context provided to them. When creating any agent, you can provide:

- Context about the product or business the agent is working on.
- The types of insights or actions are most relevant.
- Additional context on your goals and metrics to improve the AI’s accuracy when interpreting analysis.

For each agent, Amplitude recommends that you add two or three detailed lines about the dashboard, product surface area, or preferences you have. Testing has shown that this extra context improves the agents accuracy and usefulness.

## Scheduling agents

Schedule agents to run on a cadence and push findings to Slack and email in the agent creation and editing flows under the Notification Settings.

You can customize the reporting cadence to daily or weekly along with configuring the day, hour, and timezone that the agent runs.

{{partial:admonition type="note" heading=""}}
To ensure Slack notifications work, invite the `Amplitude` Slackbot to the channel. Otherwise, the agent doesn't have write permissions to share its findings with the channel.
{{/partial:admonition}}

## Project-level agent settings

Some agents may require project-level configuration before getting started, like the Website Optimization Agent which requires setting the page view events, full page URL property, and base URL path before getting started. 

Find Agents Settings in the top-right of the AI Agents page.
