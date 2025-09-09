---
id: e552f2d5-5490-4c51-b779-cf7edb79ec61
blueprint: agent
title: 'Dashboard Summary'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1754518919
---
| **Target persona** | Product managers and marketers |
|--------------------|--------------------------------|
| **Requires**       | Analytics (input)              |
| **Tools**          | Analyze Dashboard              |

The Dashboard Monitoring agent helps you understand the most meaningful insights from your Amplitude dashboards. The agent surfaces actionable patterns, signals, and standout takeaways, without overwhelming you with unnecessary detail or technical jargon.

### Flow

1.  You provide the ID of or link to an Amplitude dashboard in your project. Optionally, tell the agent what you want it to focus on. For example, “look at retention trends” or “focus on enterprise users”.

2.  The agent follows a set of prompts to ensure it finds the most relevant information, and provides the right amount of detail.

3.  The agent calls the **Analyze Dashboard** tool to review the dashboard’s charts and synthesize the most meaningful patterns and takeaways. The tool focuses on any themes you provide.

4.  The agent returns an analysis that:

    - Presents the tool’s summary directly. It never paraphrases or alters the core insights.

    - Prompts you to ask follow-up questions or request deeper dives into specific areas.

    The agent has the following guardrails to ensure the analysis it provides is as useful as possible:

    - It never fabricates data or insights, and only reports on what appears on the dashboard.

    - It specifies limitations if you request an unsupported feature, and guides you back to the supported flow if the conversation begins to stray away from analyzing dashboards.

### Tools

| Tool                     | Purpose                                                                                                                          | Input                                                 | Output                                                                                                                  |
|--------------------------|----------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Analyze Dashboard        | Reviews the charts and data within an Amplitude dashboard and synthesizes the most meaningful patterns, trends, and takeaways.   | Dashboard link or ID Optional. Focus area. | A plain-language summary of the most important findings from the dashboard, tailored to your focus if you provided one. |
| Multi-tool collaboration | Runs multiple analysis tasks at once (for example, comparing two dashboards or running different types of analyses in parallel). |                                                       |                                                                                                                         |


### Limitations

The Dashboard Analysis agent can’t:

- Access or display raw data or internal IDs.

- Provide technical or statistical deep-dives unless specifically requested and relevant.

- Summarize or rephrase the tool’s output. What you see is the direct result of the analysis.