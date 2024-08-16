---
id: 10d36278-7030-497c-acce-46469b415a93
blueprint: analytic
title: 'Ask Amplitude'
---
Ask Amplitude is a conversational interface for using Amplitude. It is designed to enable users with minimal experience using analytics tools or limited understanding of the data taxonomy to express concepts and questions in natural language.

## Ask Amplitude's capabilities
Users can interact with Ask Amplitude in conversation threads to do the following tasks:
- Create or edit charts from natural language.
- Search content (charts, dashboards, etc) inside your Amplitude organization.
- Answer questions about how to use Amplitude.
- Navigate to different parts of the Amplitude product.

They can create multiple threads interacting with Ask Amplitude which are saved and can be shared with other members of their organization.

## Large Language Model (LLM) usage
Ask Amplitude uses a third-party LLM (via the OpenAI API) to understand user requests and choose how to respond to questions. OpenAI is used to decide what types of actions to perform (e.g. creating a chart vs searching) and how to synthesize information into response messages.

In order to power Ask Amplitude, the following types of data may be sent to the OpenAI API:
1. chart definition metadata (events and properties, metrics, time range, etc);
2. taxonomy information (names/descriptions for events, properties, etc);
3. the names of dashboards, projects, users, and other metadata objects in your organization;
4. the aggregated results of charts.

Additionally, the conversation thread history you have with Ask Amplitude is sent to the OpenAI API.

### Is my customer data sent to OpenAI?
None of your customer event data is sent to OpenAI. None of your data is used to train OpenAI's models. 

### Is any data stored or used for training by OpenAI?
No. Amplitude pays for OpenAI API access to guarantee that OpenAI does not store or train on the data.

## Creating charts
A key part of creating the correct chart is taxonomy selection, i.e. choosing the correct events and properties to analyze. To power taxonomy selection, Ask Amplitude looks at which events and properties are most queried by your organization. It also looks at popular saved charts to see the event and property combinations used to represent different business concepts.

Data quality is a challenging problem in general, and it's often the case that you may have many different versions of the same property, e.g. variations of "User_ID". By leveraging usage patterns and existing content, Ask Amplitude can determine which one is most suitable to use. It will never be perfect, but the more content you save in Amplitude, the smarter it will become.

## Frequently Asked Questions

### What are the differences between this version and the prior version of Ask Amplitude?
The underlying chart creation capabilities are similar to before, but we've expanded the scope of Ask Amplitude to assist with a broader set of tasks. Additionally, we've modeled the interaction as a conversation rather than a single question to better reflect the iterative nature of analytics and asking questions.

### What are some tips to get more accurate responses?
The #1 tip is good data quality, i.e. having cleanly labeled events with descriptions. Use Amplitude's Data Assistant and other data governance tools to help maintain a clean taxonomy.

Otherwise, declarative statements of intent that use the specific terminology will work the most consistently. For example:
- "Create a chart of total event counts for A, B, and C."
- "How many users perform A, B, and C each week?"
- "What is the funnel conversion from A to B to C?"
- "Show this as conversion over time."
- "Group this chart by X."
- "Filter this by X = Y."
