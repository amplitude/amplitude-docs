---
id: 10d36278-7030-497c-acce-46469b415a93
blueprint: analytic
title: 'Ask Amplitude'
---
Ask Amplitude is a conversational interface for using Amplitude. Intended primarily for Amplitude users with minimal experience using analytics tools, or with limited understanding of the data taxonomy, Ask Amplitude helps you express Amplitude-related concepts and questions in natural language.

With Ask Amplitude, you can:
- Create or edit charts from natural language.
- Search content, like charts and dashboards, in your Amplitude organization.
- Answer your own questions about using Amplitude.
- Navigate to different parts of Amplitude.
- Create multiple threads and share them with other members of your organization.

## Ask Amplitude, OpenAI, and Large Language Model (LLM) use

Ask Amplitude uses a third-party LLM (through the OpenAI API) to understand requests and choose how to respond to questions. OpenAI decides which actions to take (for example, creating a chart versus searching) and synthesizes that information into response messages.

To power Ask Amplitude, Amplitude may send the following data to the OpenAI API:
- Chart definition metadata (for example, events and properties, metrics, or time range).
- Taxonomy information, like names and descriptions for events or properties.
- The names of dashboards, projects, users, and other metadata objects in your organization.
- The aggregated results of charts.

### Your data and information

The conversation thread history between you and Ask Amplitude is sent to the OpenAI API. However, the OpenAI API **does not receive** your customer data. **OpenAI does not store or train on** any of your Amplitude data.

## Chart creation with Ask Amplitude

To create a useful and informative chart, you first need to choose the right events and properties for your analysis. Ask Amplitude helps you do this by looking at the events and properties your organization queries most frequently. It also looks at popular saved charts, to figure out the event and property combinations your organization uses to represent different business concepts.

Sometimes, you may have different versions of the same property, like variations of `User_ID`. By looking at patterns of use and existing content, Ask Amplitude can figure out which one is best to use. It'll probably never be perfect, but the more content you save in Amplitude, the smarter Ask Amplitude becomes.

## Frequently asked questions

### What are the differences between this version of Ask Amplitude and the last one?

While both versions have similar underlying chart creation capabilities, the scope of Ask Amplitude is now more expansive, to better assist with a broader set of tasks. This version also models interactions as a conversation instead of as a single question; this is a better way to model the iterative nature of analytics.

### How can I get more accurate responses?

The best way to improve your responses from Ask Amplitude is with good data quality. For example, always label your events events cleanly and clearly, and include descriptions. Use Amplitude's Data Assistant and other data governance tools to help keep your taxonomy clean.

Otherwise, declarative statements of intent that use the specific terminology tend to work best. For example:
- "Create a chart of total event counts for A, B, and C."
- "How many users perform A, B, and C each week?"
- "What is the funnel conversion from A to B to C?"
- "Show this as conversion over time."
- "Group this chart by X."
- "Filter this by X = Y."
