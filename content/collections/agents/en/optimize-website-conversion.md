---
id: 7d0b778f-c493-41c5-b262-b3c9a5eb8cdf
blueprint: agent
title: 'Optimize Website Conversion'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1754518954
---
| **Target persona** | Growth/Product Manager                  |
|--------------------|-----------------------------------------|
| **Requires**       | Experiment, Guides & Surveys (optional) |
| **Tools**          |                                         |

The Website Optimization Agent guides you through optimizing website conversion metrics by helping you select high-impact pages, define clear goals, and generate tailored experiment strategies. It streamlines the process of creating, testing, and deploying web experiments or guides, making it easy for product and growth teams to quickly identify, implement, and measure changes that improve user engagement and business outcomes.

### Flow

1.  When you create the agent, specify the conversion event that you want to optimize for. The agent uses this information to recommend pages that see a high volume of the event you select.

2.  Choose the page you want to optimize.

3.  The agent analyzes data captured about the page you specify, and proposes up to four strategies to increase conversion based on the event you selected in step 1. Strategies can be implementations of an experiment or a guide, and the agent provides a level of confidence for each. Expand each strategy for more information. Click **Explore this Strategy** to instruct the agent to develop an implementation plan.

4.  The agent creates variants based on the strategy you select.

5.  Review the variants. Click a variant to view an expanded summary, and open the target page with to preview the variant (if you have Web Experimentation enabled). If a variant isn’t relevant, remove it from the experiment.

- To iterate on a variant, click **Create New with Feedback**. Tell the agent what you want to change about the variant.

- Click **Remove** to remove a variant from the experiment.

6.  When you have the variants you want to include in your experiment, click **Create draft experiment**. The agent creates a new experiment in draft. Review it and launch it yourself, or tell the agent to launch it.

7.  While the experiment runs, the agent can help you monitor and analyze its performance.

### Tools

| **Tool Name** | **Tool Purpose** | **Input** | **Output** |
|----|----|----|----|
| Get important pages | Retrieve the most important pages driving a specific conversion event | Number of top pages to return (top_n) | List of page URLs with importance, conversion, and traffic data |
| Set goal | Set the primary objective and metric for the optimization experiment | Goal, target page URL, target audiences, focus areas, observed challenges, hypothesis, constraints | Confirmation of goal set |
| Web Optimization Strategy Formulation | Research and propose web optimization strategies based on the goal and page context | Instructions (context, feedback, or request for new/refined strategies) | List of strategy proposals |
| Get current strategy | Retrieve the current set of proposed strategies for user selection | None | List of current strategy proposals |
| Set final web experimentation strategy | Set the final, detailed web experiment strategy and its variants | Strategy title, overview, 4 variant instructions, visual design guidance, positioning strategy | Confirmation of final strategy set |
| Start experiment variant creation | Begin the process of creating and editing experiment variants | None | Reference to the variant collection (not exposed to user) |
| Create web experiment from variant collection | Create a web experiment from a finalized set of variants | Experiment name, variant collection reference | Confirmation and reference to the experiment (not exposed to user) |
| Create nudge (simple) | Create a simple guide or survey (nudge) for the website | Title, subtitle, impact estimate, target URL, strategy overview, reasoning, content description, etc. | Reference to the guide/survey (not exposed to user) |
| Publish nudge | Publish a previously created guide or survey | Guide/survey reference | Confirmation of publication |
| Search knowledge | Search Amplitude’s documentation and knowledge base for relevant information | Query text, number of results | List of relevant articles and documentation links |
| sub_agent\_\_\_KnowledgeStoreFlow | Retrieve detailed answers from the knowledge base about company, KPIs, products, and optimization | Instructions (detailed question), search depth, response length, URL filter | Detailed answer with references |

### Limitations

The Website Optimization Agent:

- Can’t access or display real-time analytics, heatmaps, or funnel visualizations

- Requires sufficient event and page data to generate meaningful recommendations; limited or missing data may restrict optimization options.

- Doesn’t directly implement code changes on your website. You need to review and deploy experiment variants yourself.

- Can’t modify user permissions or access controls. The agent assumes the privileges of the user who calls it.

- Focuses on conversion optimization workflows and can’t answer unrelated product or technical support questions.

- Doesn’t remember previous user interactions across sessions

- Can’t guarantee specific business outcomes. Results depend on user input, experiment design, and external factors.
