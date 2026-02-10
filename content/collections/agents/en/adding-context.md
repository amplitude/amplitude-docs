---
id: 6f1b7c3d-2fb7-4000-bae6-25365a144a79
blueprint: agent
title: 'Adding Context'
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1770672121
---
Page context enables Global Agent to understand what you're currently viewing in Amplitude. Global Agent captures details about your chart, dashboard, notebook, or experiment so you can ask questions naturally without manually explaining the context.

## Page context improves responses

Page context makes zyour interactions with Global Agent more natural and efficient in several ways.

### Eliminates the need to describe your current view

You can ask "What does this spike mean?" instead of "What does the spike in my DAU chart for October 2025 mean?" Global Agent already knows which chart, metrics, and time range you're viewing.

### Makes answers specific to your exact analysis

Global Agent references the actual events, properties, and segments in your current chart. It understands applied filters and can explain their impact. It knows which metrics you're measuring and how they're configured.

### Enables natural, conversational questions

With page context, you can ask questions like:

- "Why did this drop?" → Global Agent knows which metric and time period.  
- "Add a filter for mobile users" → Global Agent knows which chart to modify.  
- "Show me this by country" → Global Agent understands the current analysis and knows which properties to segment.

### Provides more actionable recommendations

Global Agent suggests relevant follow-up analyses based on what you're viewing. It recommends specific events or properties from your current context and offers next steps tailored to your current workflow.

## Information included with page context

The information included in page context varies by page type.

### For charts

Page context includes:

- Chart type (segmentation, funnel, retention, and so on).  
- Events and metrics being measured.  
- Time range and interval.  
- Applied segments and filters.  
- Group-by dimensions.  
- Chart name and description.

### For dashboards

Page context includes:

- Dashboard name and description.  
- All charts included in the dashboard.  
- Dashboard-level filters.  
- Layout and organization.

### For session replays

Page context includes:

- Page URLs visited in the session.  
- Page titles and domains.  
- UI elements and interactions.  
- Previous page navigation flow.  
- HTML and component-level details.

### For all pages

Page context always includes:

- Current page URL and path.  
- Page title.  
- Navigation history (where you came from).  
- Applied global filters or settings.

## Get the most value out of page context

Page context is especially useful in these scenarios:

### Interpreting existing analysis

- "What does this chart tell me?"  
- "Why is there a spike on October 15th?"  
- "Is this trend significant?"

### Modifying current work

- "Change this to weekly intervals."  
- "Add a breakdown by device type."  
- "Filter to only premium users."

### Exploring related questions

- "Show me the same analysis for mobile users."  
- "How does this compare to last quarter?"  
- "What happened before this drop?"

### Debugging or investigating

- "Why are these numbers different from the dashboard?"  
- "What filters are applied here?"  
- "Which events are included in this metric?"

## Page context compared to manual context

Page context provides significant advantages over manually describing your analysis. In this example scenario, you’re viewing a retention chart for mobile users in Q4 2025\.

### With page context (automatic)

- Global Agent knows the chart  you're viewing.  
- You ask: "Why did week 2 retention drop?"  
- Global Agent analyzes the specific chart, time period, and segment in the chart..

### Without page context (manual)

- You explain: "I'm looking at a retention chart for mobile users from October to December 2025, and I see week 2 retention dropped from 45% to 38%..."  
- More typing creates more room for miscommunication.  
- Global Agent may not have access to the actual chart configuration.

## Privacy and data considerations

Page context respects your privacy and follows Amplitude's security model.

### Respects your Amplitude permissions

Page context only includes data you already have access to view. It follows the same role-based access controls as the rest of Amplitude.

### Session-specific

Context only applies to your current conversation. It isn't shared with other users or sessions.

### No sensitive data exposure

Page context includes metadata and configuration, not raw user data. Global Agent accesses data only when it runs queries you request.

## Best practices for using page context

Follow these practices to get the most from page context:

### Navigate to the relevant page first before asking questions

Open the chart, dashboard, or analysis you want to discuss. When you open Global Agent, it adds your context to the chat.  The current context appears in the chat dialog box.

### Use contextual references

Use words like "this," "here," and "current":

- "Explain this chart" instead of describing the chart.  
- "Add a filter here" instead of specifying which chart.  
- "What's driving this trend?" instead of repeating the metric name.

### Ask follow-up questions naturally

Page context persists through the conversation. You can ask multiple related questions without re-explaining context.

### Switch pages to change context

When you navigate to a different chart or dashboard, Global Agent automatically updates to your new context.  