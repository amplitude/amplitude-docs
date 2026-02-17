---
id: bc4661be-3813-476c-8d76-7f89fe272407
blueprint: agent
title: 'Agent Modes'
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1770672098
---
Global Agent offers three modes that balance speed and depth of analysis: Fast, Default, and Investigate. Choose the mode based on your question's complexity and how quickly you need an answer.

## Fast mode

Fast mode delivers quick answers to straightforward questions in 2-10 seconds.

### When to use Fast mode

Use Fast mode for:

- Quick lookups and simple questions.  
- Reading data from existing charts without modifications.  
- Basic context queries (event names, properties, definitions).  
- Checking current metric values.  
- Simple comparisons on existing data.

### How Fast mode works

Fast mode uses direct data queries with minimal exploration. It's limited to 2-4 tool calls and focuses on answering your immediate question. This mode performs minimal taxonomy exploration, which keeps responses fast but less comprehensive.

### Limitations

Fast mode has several limitations:

- It doesn't create new charts or complex analyses.  
- It's less thorough in exploring alternative interpretations.  
- It may not discover related insights.  
- It works best for straightforward, well-defined questions.

### Example questions for Fast mode

- "What's the current DAU?"  
- "How many users are in this cohort?"  
- "What does this metric measure?"

## Default mode (recommended)

Default mode is the recommended choice for most use cases. It balances speed with analytical depth, typically responding in 30-60 seconds.

### When to use Default mode

Use Default mode for:

- Most analytical questions.  
- Creating new charts and analyses.  
- Modifying existing charts (filters, segments, time ranges).  
- Multi-chart comparisons.  
- Questions requiring data exploration.  
- Understanding trends and patterns.

### How Default mode works

Default mode balances speed with analytical depth. It uses 4-6 tool calls on average and searches for existing relevant work before creating new content. This mode can create charts, run queries, and explore your taxonomy while providing context-aware insights.

### Capabilities

Default mode can:

- Create new visualizations from natural language.  
- Modify chart parameters (metrics, intervals, segments).  
- Compare data across dimensions.  
- Discover and use relevant events and properties.  
- Suggest logical follow-up questions.

### Example questions for Default mode

- "Show me weekly active users for the last quarter."  
- "Compare conversion rates between mobile and web."  
- "Why did retention drop last month?"  
- "Create a funnel from signup to first purchase."

## Investigate mode

Investigate mode performs deep research on complex questions. It takes 4-5 minutes to deliver comprehensive analysis.

### When to use Investigate mode

Use Investigate mode for:

- Complex analytical investigations.  
- Root cause analysis.  
- Multi-dimensional trend analysis.  
- Anomaly investigation requiring extensive exploration.  
- Questions needing thorough, comprehensive research.  
- Strategic decision support.

### How Investigate mode works

Investigate mode performs comprehensive, multi-step analysis using up to 10 or more tool calls. It conducts extensive taxonomy exploration, tests multiple hypotheses, explores data from multiple angles, and synthesizes findings into detailed insights.

### Capabilities

Investigate mode can:

- Deep-dive into complex patterns.  
- Explore multiple potential explanations.  
- Perform comprehensive segmentation analysis.  
- Identify non-obvious correlations.  
- Provide strategic recommendations.

### Trade-offs

Investigate mode requires a longer response time (4-5 minutes). Use it sparingly for truly complex questions. Simple queries don’t require the same level of analysis that Investigation mode provides.

### Example questions for Investigate mode

- "Conduct a deep analysis of why our conversion rate dropped 15% in Q3."  
- "Investigate what's driving the spike in churn among enterprise customers."  
- "Thoroughly analyze user engagement patterns across all platforms and segments."  
- "What are all the factors contributing to our retention improvement?"

### Mode comparison

| Feature                | Fast     | Default   | Investigate |
| ---------------------- | -------- | --------- | ----------- |
| Response time          | 2-10 sec | 30-60 sec | 4-5 min     |
| Tool calls             | 2-4      | 4-6       | 10+         |
| Creates charts         | No       | Yes       | Yes         |
| Searches existing work | Limited  | Yes       | Yes         |
| Taxonomy exploration   | Minimal  | Standard  | Extensive   |
| Multi-step reasoning   | No       | Limited   | Yes         |
| Hypothesis testing     | No       | Limited   | Yes         |

## Choosing the right mode

Start with Default mode if you're unsure. It handles most questions and provides a good balance of speed and depth.

### Use Investigate mode when

- Default mode's answer prompts deeper questions.  
- You need comprehensive analysis for important decisions.  
- The question involves "why" with multiple potential factors.  
- You're investigating unexpected changes or anomalies.

### Use Fast mode when

- You just need a quick number or fact.  
- You're already looking at the right chart.  
- Time is critical and you need immediate answers.  
- The question is purely informational (no analysis needed).

### Decision guide

Follow this decision process to choose the right mode:

1. **Is your question simple and factual?**  
     
   - If yes, use Fast mode  
   - If no, continue to step 2

2. **Does it require creating charts or moderate analysis?**  
     
   - If yes, use Default mode  
   - If no, continue to step 3

3. **Does it require deep investigation across multiple dimensions?**  
     
   - If yes, use Investigate mode  
   - If no, use Default mode (safest choice)

## How modes behave

All modes share these characteristics:

- They respect your current context (chart, dashboard, page).  
- They provide evidence-based answers with links to supporting data.  
- They follow your organization's AI context settings.

You can switch modes mid-conversation if you need different depth. To improve efficiency, Amplitude recommends being intentional about using Investigate mode. Not every question requires the depth it provides.  