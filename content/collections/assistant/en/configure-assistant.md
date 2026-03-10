---
id: 06681d20-1968-4640-b93f-efb6905adac7
blueprint: assistant
title: 'Configure Assistant'
section: assistant
landing: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1772784000
landing_blurb: Learn how to enable Assistant, connect content sources, create custom answers, configure fallbacks, build workflows and tools, and style the widget.
---
This article covers how Amplitude admins and builders configure Assistant, Resource Center, and related content and styling.

## Enable Assistant and choose where it appears

Configuration typically involves:

1. **Enable Assistant for your org**

   Make sure you enable Assistant for your organization and projects. This may involve:

   * Having Assistant included in your Amplitude plan.
   * Enabling Assistant in *Assistant > Settings > Assistant*.

2. **Configure the widget launcher**

   From the *Assistance / Assistant* or *Resource Center* configuration area:

   * Choose a pre-built launcher, a custom element, or custom code to determine where the launcher appears. For example, on the bottom-right of all pages, or only on certain screens.
   * Specify targeting logic based on:
     * User properties (such as role or plan).
     * Cohorts defined in Amplitude.
     * URL or route rules.

3. **Choose which surfaces to enable**

   In the widget configuration:

   * Turn **Chat (Assistant)** on or off.
   * Turn **Resource Center** on or off.
   * Decide whether users land on Chat or Resource Center by default when the widget opens.

## Connect content sources

Assistant is only as good as the content you give it. You manage that content through **Content & Sources** and Resource Center.

### Add content sources

Examples of sources include:

* Your public docs or help center.
* An internal knowledge base.
* Product marketing pages.
* A blog with how-to content.

To connect a source:

1. Open the **Content & Sources** or similar section.
2. Add a new **Source** and choose the type (for example, "Help center", "Web", or "Docs site").
3. Provide the required details such as base URL, credentials if needed, or site map.
4. Configure the **sync frequency** (automatic or on-demand).
5. Save and run an initial sync.

Each source ingests many content items (individual articles, pages, or documents). Amplitude indexes these for both:

* Resource Center (search and recommendations).
* Assistant (through its documentation search tool).

Plan limits may control how many sources and documents for each source you can connect; check your Amplitude plan if you hit a limit.

### Curate Resource Center recommendations

Use the Resource Center configuration to build recommendation sets for different contexts:

* By page or feature.
* By user segment.
* As a global default.

You can include:

* Articles and documents.
* Guides & Surveys content (tours, checklists, surveys).
* Links or other resources.

Assistant can then:

* Link users to these items in its answers.
* Trigger guides or surveys as part of workflows.

## Create custom answers

Custom answers let you fill specific gaps in your documentation or enforce exact wording for high-importance topics.

Typical use cases:

* "What is your SLA?"
* "What's the difference between the Business and Enterprise plans?"
* "How do I cancel my subscription?"

To create an answer:

1. Navigate to *Assistant > Answers*.
2. Click **Create New**.
3. Set the following:
   * **Status**: `Draft` or `Published`. Determines if the answer is available to Assistant.
   * **Title**: A title or short description of the answer.
   * **Answer**: The text you want Assistant to use.
   * **Answer is verbatim**: Instructs Assistant to use the text as you provide it, rather than interpret it. This is useful when you have specific or important topics you want to convey, for example, when a user asks about a refund.
4. Click **Create**.

Amplitude indexes answers and makes them available to Assistant. Answers don't appear in Resource Center as standalone articles—they exist specifically to power Assistant's responses.

## Configure fallbacks and handoffs

When Assistant can't confidently answer a question, it falls back gracefully rather than guessing.

To configure a fallback:

1. Navigate to *Assistant > Behavior > Fallbacks*.
2. Configure a fallback for each of the following scenarios:
   * Assistant can't find an answer to a user's question.
   * A user provides negative feedback.
   * A user requests to escalate to a human.

{{partial:admonition type="note" heading=""}}
Assistant requires at least one fallback to support cases where it can't find a suitable answer. This fallback must target all users.
{{/partial:admonition}}

Each fallback includes:

* **Targeting**, so you can configure different fallback options for different cohorts or segments of users.
* A **fallback message** that you define, for example: "I'm not confident I can answer that correctly. Let me connect you with another resource."
* An **action or assist**:

   | Action                | Description                                                                                                   |
   | --------------------- | ------------------------------------------------------------------------------------------------------------- |
   | Visit link            | Supply a URL that opens along with Assistant's response.                                                      |
   | Click element         | Specify an element on the page, which you can use to trigger another action.                                  |
   | Run callback          | Run a callback function you defined in the Guides & Surveys SDK.                                              |
   | Open third-party chat | Select a chat provider to direct the user to. This action is most useful with the Escalate to human fallback. |
   | Show guide            | Select an existing guide to launch.                                                                           |
   | Show survey           | Select an existing survey to launch.                                                                          |
   | Open article          | Select an indexed article to open in Resource Center.                                                         |
   | Play video            | Select a video to play. Add and manage available videos in *Guides and Surveys > Content > Videos*.           |

## Configure workflows and tools

Under the hood, Assistant can call tools (APIs) and workflows (multi-step procedures) so it can do more than just answer questions.

### Built-in tools

By default, Assistant has access to tools such as:

* **Documentation search** — finds relevant help content.
* **Guides search** — finds relevant Guides & Surveys experiences.
* **Guide launcher** — starts a specific guide or checklist in the user's product.
* **Fallback tools** — Assistant uses these when it can't answer confidently or when users provide negative feedback.

Assistant automatically considers these tools whenever they could help answer or act on a user's request.

### Workflows

Workflows string together multiple steps and tools into a reusable pattern. For example:

* "Help a user reset their password."
* "Troubleshoot why a dashboard is empty."
* "Walk through a feature adoption checklist."

A typical workflow might:

1. Ask clarifying questions in chat.
2. Call an internal API to look up data.
3. Decide between multiple branches based on that data.
4. Launch a relevant guide or checklist.
5. Exit back to Assistant chat with a summary.

To create a workflow:

1. Navigate to *Assistant > Automations > Workflows* and click **Create**.
2. Define the workflow's trigger. For example, define the words or phrases that trigger the workflow when a user enters them. Optionally, tell Assistant when to exit a workflow, for example, when the user changes topic or no longer responds.
3. Define the workflow. Use natural language to inform Assistant how it should respond. Click **Insert Actions** or enter `@` to insert an action into the workflow.
4. Set targeting for the workflow.
5. Click **Save** and **Enable** to activate the workflow.

#### Example workflow

This workflow helps users troubleshoot an empty dashboard by checking their plan and launching a relevant guide.

**Trigger**: 

```text
Use this workflow whenever the user reports that their dashboard or charts aren't showing data, or asks why their data is missing.
```

**Prompt**:

```text
First, ask the user whether they recently set up a new project or whether data was previously showing.

Then, check the user's account and plan status using @Get user account information.

If the account is on a free plan, let the user know that data may take up to 24 hours to appear and launch @Empty dashboard troubleshooting guide.

If the account is on a paid plan, ask whether they've verified that events are being sent using the Amplitude Debugger, then launch @Instrumentation troubleshooting guide.

Exit the workflow and return to Assistant chat with a brief summary of what you recommended.
```

### Tools

Extend Assistant with custom tools backed by your own APIs. For each tool you define:

1. A name and description (written in plain language as if you're describing it to a human agent).
2. One or more **input parameters**, with types and validations.
3. A backend endpoint that receives the request.

Assistant then uses these tools to:

* Look up internal information (for example, account status, plan limits).
* Perform actions (for example, create a support ticket, start an internal workflow).
* Provide more personalized, contextual help.

To create a new tool:

1. Navigate to *Assistant > Automations > Tools* and click **Create**.
2. Enter details about the tool. Provide a name and description written in plain language, as if you're explaining the tool to a human agent. Optionally, enable a confirmation dialog that prompts the user before the tool runs.
3. Define the API call:
   - **Select the HTTP method**: GET, POST, PUT, PATCH, or DELETE.
   - **Add the API endpoint**: Enter the full URL on your server that receives the request. The endpoint must be a valid `http` or `https` URL.
   - **Define the request parameters**: Parameters are the inputs that Assistant can fill in when it calls the tool. For each parameter, set the **Type** (for example, `string` or `number`), **Key**, **Required** state, and **Description**. Write the description in plain language so Assistant understands when and how to use the parameter.
   - **Wire parameters into the endpoint or body**: Parameters aren't automatically appended to the URL or request body. To use a parameter, reference it with a `{{parameter_name}}` placeholder in the endpoint URL, request body, or both. Any parameter you define but don't reference with a placeholder is ignored.
   - **Define the request body**: Supply valid JSON. The body must be a JSON object (not an array). Reference parameters in the body with `{{parameter_name}}` placeholders. Leave the body empty for GET requests that pass all parameters through the URL.
   - **Define the request headers**: Supply valid JSON. For example, `{"Content-Type": "application/json"}` or `{"Authorization": "Bearer YOUR_TOKEN"}`.
4. Test the response. Enter values for each parameter you defined, send a test request to the endpoint, and review the response.

#### Example GET request

A simple GET request that passes a parameter as a query string value:

- **Method**: `GET`
- **Endpoint**: `https://weather.example.com/search?city={{city}}`
- **Parameters**: `city` (string, required) — "The city to look up the weather for."
- **Body**: leave empty

For GET requests, embed parameters directly in the endpoint URL. For example, use `?city={{city}}`, not just `?city` — the `{{city}}` placeholder is what tells Assistant where to insert the value.

#### POST request with URL and body parameters

You can mix parameter placeholders in both the URL path and the request body, and include static values alongside them:

- **Method**: `POST`
- **Endpoint**: `https://api.example.com/update_order/{{order_id}}`
- **Parameters**: `order_id` (string, required); `shipping` (string, required) — "The shipping method for the order, for example 'standard' or 'express'."
- **Body**:

```json
{
  "shipping": "{{shipping}}",
  "notify_customer": true
}
```

- **Headers**:

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer YOUR_TOKEN"
}
```

In this example, `{{order_id}}` is wired into the URL path, `{{shipping}}` is wired into the body, and `"notify_customer": true` is a static value that doesn't come from a parameter.

#### Key things to know about parameters

- Parameters define what Assistant is allowed to provide when it calls the tool. They don't automatically generate query strings, form fields, or body content.
- You must wire each parameter into the endpoint URL or body yourself using `{{parameter_name}}` placeholders.
- Assistant validates required parameters before the tool runs. If a required parameter is missing, Assistant won't send the request.
- The tool sends all requests as JSON, so custom tools work best with JSON APIs.

### User approvals and safety

For tools that affect user data or perform sensitive actions, you can require user approval:

* Assistant explains what it wants to do in plain language.
* The user confirms or rejects the action.

As you add tools:

* Start with read-only tools to minimize risk.
* Limit write-capable tools to well-scoped, high-value actions.
* Use X-ray to audit when, how, and why Assistant called tools.

## Style Assistant and Resource Center

Assistant uses the same theme system as Guides & Surveys and Resource Center, which lets you maintain a consistent in-app brand.

### Choose or create a theme

1. Navigate to *Assistant > Themes*.
2. Select an existing theme to edit, or click **Create Theme**.

{{partial:admonition type="note" heading=""}}
Assistant and Resource Center don't share themes with Guides and Surveys, but each supports the same settings and configuration.
{{/partial:admonition}}

A theme typically controls:

* Primary and secondary colors.
* Fonts and typography.
* Button styles.
* Panel backgrounds and borders.

### Apply themes to Resource Center and Assistant

In the Resource Center configuration:

1. Select the **theme** you want the widget to use.
2. Confirm that the theme's components for **Launcher**, **Panel / header**, **List items**, and **Tabs (Chat / Resources)** (when available) look the way you want.

Assistant shares the same base theme but may expose additional configuration for:

* **Chat tab styling** such as chat bubble colors and background.
* Assistant **name and avatar**.
* Icon used for the launcher.
