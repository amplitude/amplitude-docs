---
id: 90eaef9b-bb06-45b3-8e19-3d1c8d2db1d0
blueprint: agent
title: 'Session Replay Deep Research'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1754518936
---
Session Replay Explorer helps you understand user behavior by combining advanced data science with real user session replays. This enables you to identify friction points, optimize user journeys, and make data-driven product decisions.

### Flow

1.  Select the following to provide a scope to the agent:

    1.  **Event**: Specify the key event or user interaction you want to analyze. For example, Add to Cart, Pricing Page Viewed, Form Submitted, or any other event in your taxonomy.

    2.  **Goal**: Tell the agent what you want to learn. For example, tell the agent “identify friction points,” “Help me understand navigation patterns,” or “Evaluate content engagement.”

    3.  Optional focus: Optionally instruct the agent to focus on a specific area, for example a new feature, a recent redesign, or a specific page.

2.  The agent begins to collect a representative sample of session replays where the event or action you selected occurs. Where possible, the agent adds relevant context like user paths, page URLs, and interaction metadata.

3.  The agent’s advanced algorithms analyze the sessions and try to identify:

- Navigation flows and drop-off points

- Signs of user frustration like rage clicks and repeated errors

- Engagement with specific content or features

- Differences between successful and unsuccessful user journeys

4.  When the analysis is complete, the agent returns:

    1.  A summary report with key insights

    2.  Actionable recommendations that include specific next steps to address issues or capitalize on opportunities

    3.  Session replay evidence to verify findings

This flow enables you to move from a question or hypothesis to actionable recommendations, backed by evidence.

### Tools

| Tool                             | Purpose                                                                                                    | Input                                                                                                 | Output                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Event Selector (UI Prompt)       | Collects the target event or funnel context to analyze                                                     | User selection of an event, page, or funnel step                                                      | Selected event/funnel definition used to scope analysis                                   |
| Session Replay Feature Generator | Finds matching session replays and extracts behavioral features                                            | Event sequence and optional filters (e.g., page URL pattern), time window, replay limit               | Structured feature dataset of matching sessions, segmented by conversion status           |
| Funnel Session Replay Selector   | Pulls sessions aligned to a specific funnel and step conversion/drop-off                                   | Funnel context (start/end step focus), time window, replay limit                                      | Two session sets (converted vs. not) tied to funnel steps for side-by-side analysis       |
| Analyzer Suite Runner            | Produces structured findings from replay features (friction, navigation, element flow, content visibility) | Feature dataset reference and selected analyzer types (e.g., Friction, Navigation Flow)               | Analyzer summaries with patterns, stats, and candidate areas for investigation            |
| Page HTML Extractor              | Retrieves representative HTML from the most relevant pages seen in sessions                                | Either a page URL/pattern or a reference to the feature dataset to infer key pages                    | Minified HTML snippets to identify exact UI elements (buttons, modals, labels, selectors) |
| Session Replay SQL Analyzer      | Runs custom SQL-style queries to uncover targeted behaviors and generate highlight collections             | Feature dataset reference and a task (e.g., “find rage clicks on checkout form”)                      | Stats plus session examples or highlight collections with timestamps and descriptions     |
| Taxonomy Explorer                | Discovers relevant events, properties, and common segmentations for the investigation                      | Short description of the user workflow or behavior to explore                                         | Recommended events/properties, typical filters, and related behaviors to drill into       |
| Insight Publisher                | Creates structured, evidence-backed insights with replay highlights                                        | Title, description, location, segment, category, impact, actions, evidence, and highlight collections | Persisted insight cards visible in the workspace, linked to replay highlights             |
| Knowledge Search                 | Surfaces Amplitude help content for out-of-scope or platform usage questions                               | Natural-language query (e.g., “how to build a funnel”)                                                | Ranked help articles and docs with brief summaries and links                              |

### Limitations

The Session Replay Analyzer can’t:

- Begin analysis without an event or funnel.

- Analyze sessions outside the recent window, which is usually 30 days.

- Fabricate evidence. Every insight is backed by real session highlights.

- Always reflect each user’s exact UI state.

- Build charts or dashboards

- Access systems beyond the provided tools and session data