---
id: e552f2d5-5490-4c51-b779-cf7edb79ec61
blueprint: agent
title: 'Dashboard Agent'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1760997583
---
The Dashboard Agent is an analytics assistant that automatically analyzes your Amplitude dashboards to surface the most important insights and trends for product decision-making. Select a dashboard and optionally provide custom focus instructions (like "focus on onboarding drop-off" or "emphasize mobile user behavior"). The agent analyzes every chart to identify patterns, anomalies, and executive-level takeaways. It generates a list of prioritized insights and recommendations, highlighting what changed, why it matters, and which user segments are most affected.

{{partial:collapse name="Agent summary"}}
As you get started with the Dashboard agent, keep the following in mind:

|||
|--|--|
| **Target user** | Product managers, marketers |
| **Requires** | Analytics (input) |
| **Tools** | Analyze Dashboard, Chart Deep Dive, General Analytics |

{{/partial:collapse}}

## Capabilities

* **Comprehensive Dashboard Analysis**: Automatically examines all charts in a dashboard to identify trends, conversion rates, user behavior patterns, and cross-chart correlations in a single executive summary.
* **Chart Deep Dive**: Provides detailed root-cause analysis and explanations for specific charts, investigating anomalies, funnel drop-offs, and trend drivers using advanced analytics.
* **General Analytics Questions**: Creates new charts and queries event data to answer ad-hoc questions that go beyond existing dashboard content.

## Creating and configuring the agent


1. Click **Create New Agent** on the AI Agents tab.
2. Click **Dashboard Agent**.
3. Select a dashboard from the dropdown menu to start configuring your analysis. Add custom instructions to focus the analysis on specific areas of interest or provide context about what you use the dashboard for.
4. Configure how the agent sends you notifications. Set the email recipients, connect to Slack, and set the recurring report frequency. 
5. After the initial analysis, ask follow-up questions like "What caused the conversion drop?" or "Investigate further" and the agent autonomously drills into the most relevant data to provide comprehensive explanations.

    {{partial:admonition type="tip" heading="Agents benefit from detail"}}
    The more detail you provide to the agent, the better it can return the most useful information. Ask follow up questions to help distill the best insights.
    {{/partial:admonition}}

6. Optionally, schedule the agent to run automatically and proactively monitor key business metrics.

## Limitations

The comprehensive dashboard analysis reviews existing dashboards without modifying chart configurations or date ranges. It focuses on pattern recognition and correlation identification rather than predictive modeling. This limitation doesn't apply to the chart deep dive and general analytics capabilities.