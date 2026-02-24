---
id: e92f2898-e41b-45cd-8ce6-bf3404ba5a2a
blueprint: faq_and_troubleshooting
title: 'AI Visibility Technical FAQs'
landing: false
updated_by: 83fbb88a-75e7-45dc-aed3-39c10967893c
updated_at: 1770313443
---
## What are the usage limits for AI Visibility?
* 500 prompts for free/Starter users
* 1000 prompts for Plus
* 2500 prompts for Growth
* 5000 prompts for Enterprise

### How many popular prompts can be generated for each category or filter selection?
Unlimited by category or filter selection. However, your total number of prompts is limited by your pricing tier.

### Are identical prompts across different LLMs calculated separately? 
Identical prompts are considered a single prompt, regardless of the LLM. If the prompt is identical across different LLMs, it's still counted as a single prompt towards your usage limit. 

## Do popular prompts include volume data (for example, search counts) to support rankings? 
Not yet. Amplitude plans on adding Google search volume in the future to provide more context on the popularity of each prompt.

## What platforms and models does AI Visibility track?
AI Visibility monitors brand performance in OpenAI ChatGPT and Google AI Overviews. 

Through the [MCP](/docs/amplitude-ai/amplitude-mcp), Amplitude also supports external AI clients such as Cursor for natural-language queries against Amplitude data.

## How do Role-Based Access (RBAC) rules apply to AI Visibility? 
Amplitude's RBAC process uses three layers: roles, permissions, and actions to let administrators assign default or customer roles at the project level. You can assign users and groups to receive view-only, admin, or other permissions sets for each project. This lets you limit who can access each project's AI Visibility analysis. 

## What reporting or export options are available? 
You can export all prompt metrics as a CSV file. In Amplitude Analytics, you can export charts as PNG, PDF, CSV, or sharable links. Dashboards and usage reports can be exported to PDF or PNG files. All other aspects of Analytics can also be exported. 

## Can I modify the prompts? 
Yes, if you're logged into the Amplitude system. After you enter new prompts, the system refreshes. 

## Can I change the LLM that AI Visibility uses? 
No.

## Can I identify activity such as sessions and events from LLM or conversational AI tools?  
You can identify activity referred to an application from an LLM or conversational AI tool through either the referrer or the `utm_source`. There is logic for identifying each to the default channel rules. If you already have existing rules, you can replicate this logic within your own rules.

## Is prompt or citation level data available for referrals? 
LLM or conversational AI tools don't supply the prompts when users are referred to other applications. You can evaluate entry pages for sessions from LLMs to understand which pages on your site are most commonly receiving direct referrals. 

## Can I filter for premium users such as ChatGPT Plus or Pro? 
No. AI Visibility looks at the total responses from an LLM or AI.

## What is the maximum number of users I can have for AI Visibility? 
Unlimited. 

## What is the data source for popular prompts on my dashboard? 
Amplitude asks LLMs such as ChatGPT to come up with likely prompts that marketers might be interested in. 

## Does AI Visibility integrate with analytics platforms like Google Analytics? 
Yes, Amplitude provides a native Google Analytics 4 integration. 