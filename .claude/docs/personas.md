# Amplitude Documentation Reader Personas

This file defines the eight reader personas used by the bulk-edit system. The Coordinator agent passes the relevant persona definition to each Collection Editor agent so it can apply persona-specific writing adjustments on top of the universal Amplitude style rules.

## How to use this file

Each persona definition includes:
1. **Persona name** and description — who reads these docs
2. **Collections** — which collections belong to this persona group
3. **Writing adjustments** — tonal and content guidance beyond the 12 universal style rules
4. **Vocabulary preferences** — terms this persona uses and recognizes

---

## Persona 1: Developers

**Branch:** `bulk-edit/developers`

### Description

Software engineers integrating Amplitude SDKs into web, mobile, or server-side applications. They're comfortable with code, expect technical precision, and scan documentation quickly for the exact method signature, parameter, or configuration snippet they need. They're often building under deadline pressure. They distrust vague prose and trust code examples above all.

### Collections

`browser_sdk`, `ios_sdk`, `android_sdk`, `flutter_sdk`, `react_native_sdk`, `go_sdk`, `java_sdk`, `python_sdk`, `node_js_sdk`, `unity_sdk`, `unreal_sdk`, `sdk-catalog`, `instrumentation`, `ampli`, `framework_integrations`

### Writing adjustments

- **Lead with code, not prose.** If a section can be illustrated with a code example, include one. Keep explanatory prose short — one to two sentences of context before a code example is enough.
- **Be terse in conceptual explanations.** Developers don't need extended background. Get to the code fast.
- **Use exact method and parameter names** in prose. For example: "Call `logEvent()` with an `event_type` string."
- **Distinguish platform differences explicitly.** If a behavior differs between iOS and Android, state it directly. Don't make developers infer it.
- **Imperative headings work well here.** "Initialize the SDK", "Track an event", "Configure session replay."
- **Don't over-explain concepts** the reader already knows — HTTP, JSON, async/await, lifecycle hooks, dependency management.
- **Error handling deserves its own section** or callout. Developers need to know failure modes, not just happy paths.
- **Version-specific content is acceptable** here. Developers need to know whether a feature exists in SDK version 1 or 2.

### Vocabulary preferences

- "Initialize" over "set up" for SDK initialization.
- "Method" over "function" for SDK calls (exception: standalone functions in Go or Python).
- "Event type" when referring to the event name string passed to `logEvent()`.
- "Event properties" not "event attributes".
- "`userId`" in code, "user ID" in prose.
- "Integrate" over "connect" or "link" for SDK installation.
- Acceptable shorthand: "install", "import", "require", "initialize", "instantiate".

---

## Persona 2: API users

**Branch:** `bulk-edit/api-users`

### Description

Developers and technical integrators who use Amplitude's REST APIs directly — often building server-side event ingestion, management tooling, or automated workflows. They work with JSON payloads, HTTP clients, and authentication tokens. They read API docs looking for exact endpoints, required parameters, response schemas, and error codes. They're more likely to copy a curl command than read conceptual background.

### Collections

`api`, `apis`, `experiment-apis`, `guides_and_surveys_api`

### Writing adjustments

- **Every endpoint needs a complete example.** Include the HTTP method, full URL, required headers, request body (JSON), and a sample response.
- **Parameter tables are essential.** For each endpoint, list every parameter with name, type, required/optional status, and description.
- **Lead with the endpoint signature** before any prose description.
- **Error codes deserve thorough treatment.** List HTTP status codes, error response bodies, and common causes.
- **Authentication must be prominent.** Don't bury auth instructions in a paragraph — use a dedicated section or callout.
- **Rate limits, quotas, and pagination** should be explicitly documented.
- **cURL examples** are the lingua franca. Include them even when an SDK version is more practical.
- **Don't explain Amplitude concepts** at length — API users are already Amplitude users. They need implementation details.

### Vocabulary preferences

- "Endpoint" not "URL" for API paths.
- "Request body" not "payload" in prose.
- "Response" not "output" for API return values.
- "API key" (two words, not hyphenated).
- "Bearer token" for OAuth tokens in Authorization headers.
- "Ingestion API" for the `/2/httpapi` endpoint.

---

## Persona 3: Data engineers

**Branch:** `bulk-edit/data-engineers`

### Description

Data engineers, analytics engineers, and integration specialists who move data into, out of, and within Amplitude. They configure sources, destinations, transformers, and warehouse syncs. They're comfortable with SQL, Python, cloud infrastructure (AWS, GCP, BigQuery, Snowflake), and data pipeline concepts. They care about schema, data types, transformation logic, and SLAs. They're skeptical of documentation that glosses over edge cases.

### Collections

`data`, `cdp`, `sources`, `destination-catalog`, `source-catalog`, `warehouse_native_amplitude`, `pii_integrations`, `audiences`

### Writing adjustments

- **Schema details matter.** When documenting a connector or destination, include the field mapping, data types, and any transformations that happen automatically.
- **Configuration steps should be precise.** Specify exact field names in UIs, exact values for dropdowns, and exact formats for connection strings.
- **Mention data freshness.** Data engineers need to know latency: "Events appear in BigQuery within 30 minutes."
- **Cover failure modes.** What happens if a sync fails? Is it retried? Where do errors appear?
- **Warehouse-specific behavior deserves its own section.** If BigQuery behavior differs from Snowflake, document them separately.
- **PII and privacy content** should be direct and specific. Name the properties affected, the transformation applied, and any compliance framework implications.
- **Use technical shorthand freely.** ETL, CDC, schema-on-read, partition key, webhook — these readers know the terms.
- **Don't explain basic data concepts.** Skip "a database is..." style introductions.

### Vocabulary preferences

- "Sync" (not "transfer" or "send") for data movement to warehouses.
- "Connector" for source and destination integrations.
- "Event schema" for the structure of events ingested.
- "Backfill" for historical data loads.
- "Mapping" for field-level transformations.
- Use the exact provider name (BigQuery, Snowflake, Redshift) rather than "data warehouse" wherever possible.

---

## Persona 4: Analysts and PMs

**Branch:** `bulk-edit/analysts-pms`

### Description

Product analysts, data analysts, product managers, and growth professionals who use Amplitude Analytics to answer product questions. They work in the UI daily — building charts, creating cohorts, interpreting retention curves, and building dashboards. They know the Amplitude product well but may not know every advanced feature. They read docs when they're stuck or exploring a new feature. They prefer visual examples and clear, concrete outcomes.

### Collections

`analytics`, `charts`, `event-segmentation`, `funnel-analysis`, `lifecycle`, `retention-analysis`, `stickiness`, `revenue-ltv`, `data-tables`, `other-charts`, `legacy-charts`, `impact-analysis`, `engagement-matrix`, `journeys`, `user-sessions`, `compass`, `personas`, `property_sets`

### Writing adjustments

- **Start with the business question.** "Use Retention Analysis to understand how often users return after their first session." Analysts think in terms of questions, not features.
- **UI-centric language is expected here.** Describe steps in terms of what the reader sees and clicks.
- **Concrete examples with realistic data** build confidence. "For example, if 60% of users return on day 7, that indicates strong weekly habit formation."
- **Chart interpretation guidance** is valuable and often missing. Don't just describe what a chart shows — help readers understand what it means for their product.
- **Explain "why" as well as "how".** Analysts need to understand what a metric means, not just how to compute it.
- **Avoid being too technical.** No SQL, no code examples unless in a dedicated "Advanced" section.

### Vocabulary preferences

- "Chart" not "report" or "visualization" (Amplitude uses "chart").
- "Segment" for user filtering (not "filter" alone — "add a segment" is correct).
- "Breakdown" for grouping by a property.
- "Conversion" for funnel steps completed.
- "Event" not "action" or "behavior" for user actions tracked.
- "Property" not "attribute" for event or user properties.
- "Cohort" for saved user groups.

---

## Persona 5: Experimenters

**Branch:** `bulk-edit/experimenters`

### Description

Product managers, engineers, and data scientists who design, run, and analyze A/B tests and feature flags using Amplitude Experiment. They care about statistical rigor, experiment design best practices, and interpreting results correctly. They may have varying statistical backgrounds. They're cautious about shipping the wrong variant due to misread results.

### Collections

`experiment`, `experiment-results`, `experiment-sdks`, `experiment-theory`, `experiment_integrations`, `experiment_troubleshooting`, `web_experiment`

### Writing adjustments

- **Statistical concepts need careful explanation.** Don't assume deep stats knowledge for UI-focused content, but don't over-simplify for advanced content.
- **Warn about common mistakes.** Peeking, under-powering, novelty effects — document these pitfalls explicitly.
- **Experiment design and results interpretation** deserve prominent treatment. Help readers understand what "statistical significance" means practically.
- **SDK integration content** (in `experiment-sdks`) follows Developer persona rules: terse, code-first, precise.
- **Troubleshooting content** should list specific symptoms and causes, not generic advice.
- **Distinguish local evaluation from remote evaluation** explicitly.

### Vocabulary preferences

- "Variant" (not "variation" or "version") for experiment arms.
- "Flag" (not "feature flag" on every reference — use "flag" after first mention).
- "Exposure" for when a user sees a variant.
- "Metric" for measured outcomes in an experiment.
- "Statistical significance" (not "significant" alone).
- "Sample ratio mismatch" for SRM issues.
- "Treatment" and "control" in statistical context.
- "Roll out" (two words, verb) and "rollout" (one word, noun).

---

## Persona 6: Engagement and survey authors

**Branch:** `bulk-edit/engagement-survey-authors`

### Description

Product managers, growth marketers, and UX researchers who create in-product guides, surveys, and onboarding flows using Amplitude Guides & Surveys and Amplitude Agents. They're non-technical or lightly technical — they build in the UI, use drag-and-drop editors, and configure targeting rules through dropdowns. They care about user experience, conversion, and feedback quality.

### Collections

`guides_and_surveys`, `agents`

### Writing adjustments

- **UI-first language** — every step should reference what the user sees in the product, including specific page names, buttons, and field labels.
- **Concrete use cases** help this audience understand when to use a feature. "Use a survey to collect NPS after a user completes their first purchase."
- **No-code framing** — this audience doesn't use code. Don't show code examples unless in a clearly labeled "For developers" callout.
- **Targeting and segmentation rules** deserve careful explanation because they directly affect who sees the guide or survey.
- **Publishing and scheduling** workflows should be step-by-step with granular UI instructions.
- **Tone can be slightly warmer** here. Contractions and second person are especially important for this audience.

### Vocabulary preferences

- "Guide" for in-product tours, tooltips, and walkthroughs.
- "Survey" for in-product feedback collection forms.
- "Respondent" for a user who answers a survey.
- "Targeting rule" for audience conditions.
- "Impression" for each time a guide or survey is shown.
- "Dismiss" for when a user closes without completing.
- "Publish" (not "activate" or "enable") for making a guide or survey live.

---

## Persona 7: Admins and IT

**Branch:** `bulk-edit/admins-it`

### Description

IT administrators, security officers, Amplitude organization administrators, and billing contacts who configure organization-wide settings, manage user access, set up SSO, and handle compliance requirements. They value precision and completeness. They're often following a compliance checklist or responding to a security audit. Errors in their work can affect the entire organization.

### Collections

`admin`, `account-management`, `rbac_permissions`, `billing-use`, `single-sign-on`, `partners`

### Writing adjustments

- **Permission requirements must be explicit.** Every procedure that requires elevated permissions should state: "You must have [role] or [permission] to perform this action."
- **Consequences matter.** For destructive actions (delete, remove, reset), state what is lost and whether it's reversible.
- **Security-sensitive content** (SSO, API keys, user provisioning) should use callouts to highlight security implications.
- **Step-by-step procedures need to be complete.** Don't assume the reader can infer intermediate steps.
- **The `rbac_permissions` collection** contains very short permission description pages. Apply style rules but keep edits minimal — these are reference entries, not prose narratives.
- **Billing content** should be factual and precise about plan names, limits, and pricing tiers.

### Vocabulary preferences

- "Organization" (not "org" in prose).
- "Role" for RBAC roles.
- "Permission" for individual capabilities.
- "Provision" for creating user accounts programmatically.
- "Deactivate" (not "disable" or "delete") for removing user access without deleting the account.
- "SSO" after first use of "Single Sign-On".
- "SCIM" for automated provisioning.

---

## Persona 8: General readers and onboarding users

**Branch:** `bulk-edit/general-onboarding`

### Description

New Amplitude users onboarding for the first time, users looking for answers to general questions, users migrating from an older SDK or feature, and readers exploring Amplitude's capabilities. The most heterogeneous persona — ranging from a first-day employee to a returning customer updating their implementation. The primary tone is welcoming and clear. Background context helps because readers may not know the full picture.

### Collections

`get-started`, `session-replay`, `faq_and_troubleshooting`, `migration`, `advanced-techniques`, `under-the-hood`, `glossary_events`, `glossary_properties`, `pages`

### Writing adjustments

- **Context-setting introductions** are more appropriate here than in developer docs. One to three sentences explaining what a feature is and why it matters helps new users orient themselves.
- **FAQ content** should feel conversational. Write the question as a real user would ask it, then answer directly and concisely.
- **Migration content** needs "before" and "after" comparisons. Show the old pattern, explain what changed, then show the new pattern.
- **Glossary entries** (`glossary_events`, `glossary_properties`) are short reference entries. Apply style rules, but don't add prose that doesn't belong. Ensure definitions are in present tense and use correct Amplitude vocabulary.
- **Session Replay** content has a mixed audience — some pages are for developers (installation), others for analysts (using the replay viewer). Use the appropriate tone for the page's content type.
- **Under-the-hood content** is for technically curious users. Technical depth is appropriate here.
- **Pages** (`pages` collection) are typically landing and navigation pages with minimal prose — apply style rules but don't add content.

### Vocabulary preferences

- "Set up" over "initialize" for non-developer pages.
- "Track events" (not "instrument events") in non-developer onboarding content.
- "Dashboard" for the main Amplitude interface.
- Keep technical jargon to a minimum in FAQ and onboarding content. Define terms on first use.

---

## Excluded collections

These collections are out of scope for bulk editing:

| Collection | Reason |
|---|---|
| `japanese_translation` | Non-English content — style rules are for English only |
| `sections` | Navigation/structural pages — minimal editable prose |
| `workflow` | Internal workflow templates — not customer-facing |
| `academy_content` | Managed separately by the Academy team |
