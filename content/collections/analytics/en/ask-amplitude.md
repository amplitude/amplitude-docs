---
id: 10d36278-7030-497c-acce-46469b415a93
blueprint: analytic
title: 'Ask Amplitude'
---
Ask Amplitude is a conversational interface for using Amplitude. It enables Amplitude users with minimal experience using analytics tools or limited understanding of the data taxonomy to express concepts and questions in natural language.

## Ask Amplitude's capabilities

You can interact with Ask Amplitude in conversation threads to do the following tasks:
- Create or edit charts from natural language.
- Search content like charts and dashboards in your Amplitude organization.
- Answer questions about how to use Amplitude.
- Navigate to different parts of Amplitude.

Create multiple threads with Ask Amplitude which you can share with other members of your organization.

## Large Language Model (LLM) use

Ask Amplitude uses a third-party LLM (through the OpenAI API) to understand requests and choose how to respond to questions. OpenAI decides the actions to perform (for example, creating a chart versus searching) and  synthesizes that information into response messages.

To power Ask Amplitude, Amplitude may send the following data to the OpenAI API:
1. Chart definition metadata (for example, events and properties, metrics, or time range).
2. Taxonomy information (like names and descriptions for events or properties).
3. The names of dashboards, projects, users, and other metadata objects in your organization.
4. The aggregated results of charts.

Additionally, the conversation thread history you have with Ask Amplitude is sent to the OpenAI API.

### Is my customer data sent to OpenAI?

None of your customer event data is sent to OpenAI. None of your data is used to train OpenAI's models. 

### Is any data stored or used for training by OpenAI?

No. Amplitude pays for OpenAI API access to guarantee that OpenAI does not store or train on the data.

## Creating charts

A key part of creating the correct chart is taxonomy selection, for example, choosing the correct events and properties to analyze. To power taxonomy selection, Ask Amplitude looks at the events and properties that your organization queries the most. It also looks at popular saved charts to see the event and property combinations used to represent different business concepts.

Data quality is a challenging problem in general, and you may have different versions of the same property, like variations of `User_ID`. By looking at patterns of use and existing content, Ask Amplitude determines which one is most suitable to use. It's never be perfect, but the more content you save in Amplitude, the smarter it becomes.

## Frequently Asked Questions

### What are the differences between this version and the prior version of Ask Amplitude?

The underlying chart creation capabilities are similar to the previous version of Ask Amplitude, but  the scope of Ask Amplitude is expanded to assist with a broader set of tasks. Additionally, Amplitude models the interactions as a conversation rather than a single question to better reflect the iterative nature of analytics and asking questions.

### What are some tips to get more accurate responses?

The most impactful tip is good data quality, for example having cleanly labeled events with descriptions. Use Amplitude's Data Assistant and other data governance tools to help maintain a clean taxonomy.

Otherwise, declarative statements of intent that use the specific terminology work the most consistently. For example:
- "Create a chart of total event counts for A, B, and C."
- "How many users perform A, B, and C each week?"
- "What is the funnel conversion from A to B to C?"
- "Show this as conversion over time."
- "Group this chart by X."
- "Filter this by X = Y."
