---
id: 2ab490ae-fda8-4a9a-8028-218b4b41984a
blueprint: agent
title: 'Ensuring Your Content Appears in LLM Searches'
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1761677343
nav_title: analytics
---
As AI systems become the primary way users discover information, clear and well-structured content is essential. Large language models (LLMs) such as ChatGPT, Claude, and Perplexity use a combination of structure, freshness, and credibility to determine which content to reference in their responses.  

This guide outlines how to write and organize Amplitude content so that it's easily understood and accurately represented by LLMs.

## Write with clarity and intent

LLMs prioritize content that's clear, direct, and written for readers rather than for algorithms.  

When creating content:
- Use short sentences and clear verbs.  
- Begin each section with a specific purpose statement.  
- Avoid technical jargon that's not necessary for understanding.  
- Write as if you are explaining a concept to a colleague who is new to the topic.  

Every heading or paragraph should answer a question someone might type into an AI assistant, such as “How do I track custom events in Amplitude?”

## Use question-based headings

LLMs identify and extract content more effectively when questions are explicit in your headings.

Examples:
| Poor Heading | Improved Heading |
|---------------|------------------|
| Activation Metrics | How Do I Track Activation Metrics in Amplitude? |
| Funnels Overview | What Is a Funnel in Amplitude? |
| Retention Guide | How Can I Measure User Retention? |

Whenever possible, use natural phrasing that mirrors real search queries.

## Structure pages for AI readability

Models understand structured documents better than long blocks of text. Use a predictable hierarchy and clear segmentation.  

Use the following structural checklist to ensure your hierarchy is understandable:
- One H1 title per page.  
- Clear H2 and H3 subheadings that divide major concepts.  
- Short paragraphs (2–4 sentences).  
- Bulleted or numbered lists for steps and comparisons.  
- Tables to organize examples or parameters.  

A well-structured page also improves readability for human users and accessibility tools.

## Keep content updated and accurate

LLMs heavily weight content that appears recent and up to date. Outdated or stale pages are less likely to appear in model-generated answers.

Remember to:
- Update 10–15% of existing Amplitude documentation or help content each month.  
- Include a “last updated” line at the top or bottom of each page.  
- Refresh examples when SDKs, APIs, or UI components change.  
- Review internal links regularly to ensure they point to current resources.  

Even small edits, such as clarifying event names or adding a recent use case, help signal freshness to LLMs.

## Add FAQ sections for common queries

LLMs often surface question-and-answer content directly, especially when it matches user phrasing.  

Create FAQ sections that include:
- Common implementation questions, such as “How do I set up event tracking?”  
- Comparison queries, such as “What's the difference between Amplitude and Google Analytics?”  
- Troubleshooting questions, such as “Why are events not appearing in my charts?”  

Each answer should be short (three sentences or fewer) and written in plain language. Include links to relevant documentation for further detail.

## Reinforce credibility through citations and context

Models favor content that demonstrates expertise and reliability.  
Provide context through links, attribution, and clear sourcing.  

Remember to:
- Link to Amplitude’s official documentation and API references.  
- Include case studies or success stories when possible.  
- Attribute quotes or data points to reliable sources.  
- Include author names or roles on major guides or blog posts.  

Transparent sourcing not only helps LLMs identify credible content but also improves user trust.

## Ensure public discoverability

If you want AI agents to include your content in their answers, they must be able to access it. 

Remember to:
- Confirm that your robots.txt file allows major AI crawlers to index public documentation.  
- Ensure that public Amplitude content isn't blocked by authentication or rate limits.  
- Avoid dynamic text loading that prevents crawlers from reading content (for example, rendering key text only after JavaScript execution).  

Keep sensitive or internal information private. Only make documentation publicly available if it's' intended for external readers.

## Maintain ethical and responsible representation

LLM visibility should never come at the expense of accuracy, fairness, or privacy. 

Remember to:
- Keep descriptions factual, neutral, and current.  
- Avoid speculative claims about competitors or performance.  
- Don't use hidden keywords or manipulative phrasing.  
- Respect data governance and compliance standards in all examples.  

Responsible, transparent content ensures that both people and AI systems represent Amplitude accurately.


