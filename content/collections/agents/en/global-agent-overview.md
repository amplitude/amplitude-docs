---
id: 72bff997-dcb0-45b1-b85c-a405581b302f
blueprint: agent
title: 'Global Agent Overview'
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1770672081
---
Amplitude’s Global Agent is an agent embedded directly in Amplitude. It helps you understand your product data in context, generates  insights and explanations, and takes action by carrying out complex multi-step workflows.

## Access Global Agent

You can access Amplitude’s Global Agent on every page in Amplitude. It’s accessible through:

- A floating action button in the lower right-hand corner of the screen  
- The "Chat" option in the left-side navigation bar

{{partial:admonition type="note" heading="Don't see Global Agent?"}}
Contact your Amplitude administrator to see if it’s enabled in your workspace.
{{/partial:admonition}}

## Global Agent vs chatbots

Global Agent provides value beyond typical chatbot capabilities in several ways.

### Context-aware intelligence

Global Agent understands the content of any page you’re looking at in Amplitude, whether that’s a chart, dashboard, or experiment. You don't need to explain what you're looking at, it already knows. This means answers are specific to your data, not generic responses.

### Data-grounded responses

Actual data from your Amplitude project backs every response. Global Agent provides links to charts, dashboards, and analyses as evidence. It never fabricates or guesses, it reports what the data shows.

### Action-oriented

Global Agent doesn't just explain your data. It creates charts, builds analyses, and generates insights. It proactively suggests next questions to deepen your exploration and searches past analyses to learn from your team's existing work.

### Analytics expertise built-in

Global Agent understands product analytics concepts like retention, funnels, and cohorts. It interprets trends and patterns, not just numbers, and explains why data matters, not just the current values. It’s capable of both quick and dirty summaries as well as deep analyses incorporating statistical significance, it all depends on how you prompt it. 

### Comparison with chatbots

| Feature     | Standard Chatbot          | Amplitude Global Agent       |
| ----------- | ------------------------- | ---------------------------- |
| Context     | Requires full explanation | Knows what you're viewing    |
| Data access | Generic responses         | Your actual Amplitude data   |
| Actions     | Provides instructions     | Creates charts and analyses  |
| Evidence    | No data backing           | Every claim linked to data   |
| Expertise   | General knowledge         | Product analytics specialist |
| Integration | Separate tool             | Embedded in your workflow    |

## Core capabilities

Global Agent can help with four main types of tasks:

### Interpret existing analysis

Use Global Agent on existing charts or dashboards to:

- Explain what a chart or metric means  
- Identify trends, spikes, or anomalies  
- Provide context for data patterns

### Answer analytical questions

Global Agent can answer questions like:

- "Why did retention drop last month?"  
- "How many active users do we have?"  
- "What's our conversion rate for mobile users?"

### Create new analysis

Start from scratch by using Global Agent to:

- Build charts from natural language requests  
- Modify existing charts (change time ranges, add filters, switch metrics)  
- Generate multi-chart comparisons

### Explore your data

Global Agent has access to your entire project and can help:

- Discover relevant events and properties  
- Find existing dashboards and analyses  
- Understand your data taxonomy

## Key features

### Intelligent search

Global Agent finds relevant existing work before creating duplicates. It searches across charts, dashboards, notebooks, and cohorts, and leverages your team's past analyses. It prioritizes “Official” and highly-viewed content in the organization. 

### Evidence-based insights

Every claim includes a link to supporting data. Chart links render as visual previews, making Global Agent transparent about data sources and calculations.

### Plain language interface

You don't need SQL or technical jargon. Ask questions naturally, as you would a colleague. Global Agent provides concise, actionable responses.

### Guided exploration

Global Agent suggests logical next questions, helps you dig deeper into insights, and adapts to your analysis workflow.

## Get started with Global Agent

### Access Global Agent

1. Open any chart, dashboard, or navigate to your Amplitude home page.  
2. Look for the Global Agent interface (a floating button in the lower left-hand side of the screen).  
3. Type your question in plain language.

### Ask your first question

Start with a simple question about your current context:

- "What does this chart show?"  
- "Why did this metric spike last week?"  
- "How many users completed this funnel?"

Global Agent responds with a concise answer (2-5 sentences), supporting data and links, and optional follow-up question suggestions.

### Best practices

Follow these guidelines to get the most from Global Agent:

- **Be specific about time ranges and segments** when your question requires them. For example: "What's our retention rate for mobile users in the last 30 days?"  
- **Reference "this chart" or "this dashboard"** for context-specific questions. Global Agent understands what you're viewing.  
- **Ask follow-up questions** to refine your analysis. Each question builds on the previous context.

### Example use cases

Here are common scenarios where Global Agent can help:

- **Understanding a spike in user activity**: "Why did daily active users increase by 30% last Tuesday?"  
- **Comparing conversion rates across segments**: "How does conversion rate differ between iOS and Android users?"  
- **Building a retention analysis from scratch**: "Show me 7-day retention for users who signed up in December."  
- **Finding existing work on a specific topic**: "Are there any dashboards about checkout funnel performance?"

## Understand Global Agent responses

### Response structure

Each Global Agent response includes three components by default:

1. **Concise answer**: 2-5 sentences that directly address your question.   
2. **Supporting data and links**: Charts, dashboards, or analyses that back up the answer  
3. **Follow-up suggestions** (optional): Logical next questions to deepen your exploration

Response formats vary depending on your prompt. If you want a deeper answer, specify that in your prompt.

### Chart links and previews

When Global Agent references a chart, it embeds a visual preview you can interact with. Select the preview to access the full chart details. Save analyses that Global Agent generates to your workspace for future reference.

### Global Agent creates new content

When Global Agent creates a new chart or analysis for you:

- Charts are saved to your personal space by default  
- You can share or publish AI-generated work like any other Amplitude content  
- Always review and validate AI-created analyses before using them in important decisions

## Tips for success

Keep these tips in mind as you work with Global Agent:

- **Start with your current context** (chart or dashboard) for fastest results. Global Agent uses this context to provide more relevant answers.  
- **Leverage your team's analyses**. Global Agent searches for existing work, so you can benefit from analyses others have already created.  
- **Allow time for complex questions**. Global Agent may take 30-60 seconds to research and generate comprehensive answers.  
- **Validate the data**. All generated content includes links so you can verify the analysis and explore deeper.

{{partial:admonition type="note" heading="Global Agent and Data Privacy"}}
For more information about how Global Agent handles your data, review [Amplitude's Security and Privacy ](https://amplitude.com/trust#:~:text=Trust%20in%20Amplitude%20AI)information.
{{/partial:admonition}}