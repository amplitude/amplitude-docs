---
id: b09c311c-387a-476e-b382-49ce0ca448d6
blueprint: agent
title: 'Amplitude MCP Server'
landing: false
exclude_from_sitemap: false
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1765824836
---
The Amplitude [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) server enables teams to analyze product data, experiments, and user behavior using conversational AI. Query and create Amplitude content including charts, dashboards, experiments, and cohorts directly through AI interfaces using natural language.

The Amplitude MCP server is listed in the [official MCP servers registry](https://github.com/modelcontextprotocol/servers) on GitHub. You can also find MCP integration guides and examples in [Anthropic's Claude documentation](https://docs.anthropic.com/en/docs/build-with-claude/mcp), the [MCP quickstart resources](https://github.com/modelcontextprotocol/quickstart-resources), and [Cursor's MCP documentation](https://docs.cursor.com/context/model-context-protocol).

## Remote server

{{partial:admonition type="beta" heading="Beta notice"}}
The Amplitude MCP server is under active development. Some functions and settings may not be available, and you may experience bugs or performance issues during this period. This feature continues to evolve and might be subject to rate limits. 
{{/partial:admonition}}

### Who can use this feature

* Available to any existing Amplitude customer.

* You must use a code editor or application that supports MCP servers (for example, Cursor, Claude Code, ChatGPT, Lovable, or AWS Kiro).

## Regions

| Region | MCP Server URL |
| ------ | -------------- |
| United States Server (Default) | `https://mcp.amplitude.com/mcp` |
| EU Residency Server | `https://mcp.eu.amplitude.com/mcp` |

Use the Standard Server URL unless your Amplitude data resides in the EU region.

## Available tools and capabilities

The Amplitude MCP provides comprehensive access to your analytics through these tools:

{{partial:collapse name="Available tools"}}
| Tool Name                  | Description                                                                                                                                    |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `search`                   | Search for dashboards, charts, notebooks, experiments, and other content in Amplitude with comprehensive filtering and personalization options |
| `query_chart`              | Query chart data result using the internal dash API to get chart data                                                                          |
| `query_experiment`         | Query experiment analysis data using the dataset endpoint with proper experiment parameters                                                    |
| `query_dataset`            | Execute a data query using the dataset endpoint for complex ad-hoc analysis within a project                                                   |
| `get_context`              | Get context information about the current user, organization, and accessible projects                                                          |
| `get_charts`               | Retrieve full chart objects by their IDs using the chart service directly                                                                      |
| `get_dashboard`            | Get specific dashboards and all their charts including chart IDs for individual queries                                                        |
| `get_experiments`          | Retrieve specific experiments by their IDs with additional information like state and decisions                                                |
| `get_deployments`          | Retrieve all deployments (Experiment API keys) for the current project                                                                         |
| `get_events`               | Retrieve events from a project with optional filtering and sorting                                                                             |
| `get_event_properties`     | Retrieve event properties from a project with filtering options                                                                                |
| `get_user_properties`      | Retrieve user properties from a project with filtering options                                                                                 |
| `get_session_replays`      | Search for session replays in the last 30 days, filtered by user properties or events                                                          |
| `save_chart_edits`         | Save edits to existing charts, enabling you to modify chart configurations and parameters                                                      |
| `create_dashboard`         | Create new dashboards in your Amplitude project                                                                                                |
| `create_experiment`        | Create new experiments in your Amplitude project                                                                                               |
| `create_cohort`            | Create new cohorts based on user properties and behaviors                                                                                      |
| `get_cohorts`              | Retrieve cohorts from your project with filtering and sorting options                                                                          |
| `get_users`                | Retrieve user data from your project                                                                                                           |
| `get_feedback_insights`    | Retrieve customer feedback insights and analysis                                                                                               |
| `get_feedback_comments`    | Retrieve customer feedback comments                                                                                                            |
| `get_feedback_mentions`    | Retrieve customer feedback mentions                                                                                                            |
| `get_feedback_sources`     | Retrieve customer feedback sources and channels                                                                                                |

{{/partial:collapse}}

## Implementation instructions

Select your MCP client for setup instructions.

{{partial:collapse name="Claude Code"}}
For general MCP setup, refer to the [Claude Code MCP documentation](https://docs.anthropic.com/en/docs/claude-code/mcp).

1. Add the MCP server globally:

   ```shell
   claude mcp add -t http -s user Amplitude "https://mcp.amplitude.com/mcp"
   ```

   {{partial:admonition type="note"}}
   EU customers should use `https://mcp.eu.amplitude.com/mcp` instead.
   {{/partial:admonition}}

2. Start Claude Code:

   ```shell
   claude
   ```

3. Authenticate with Amplitude:

   ```shell
   /mcp
   ```

4. Follow the authentication flow.
{{/partial:collapse}}

{{partial:collapse name="Cursor"}}
For general MCP setup, refer to [Cursor's MCP documentation](https://docs.cursor.com/context/model-context-protocol).

**Quick install (recommended):**

**US server (default):**
[Install Amplitude MCP Server deep link (US)](cursor://anysphere.cursor-deeplink/mcp/install?name=Amplitude&config=eyJ1cmwiOiJodHRwczovL21jcC5hbXBsaXR1ZGUuY29tL21jcCJ9)

**EU server:**
[Install Amplitude MCP Server deep link (EU)](cursor://anysphere.cursor-deeplink/mcp/install?name=Amplitude&config=eyJ1cmwiOiJodHRwczovL21jcC5ldS5hbXBsaXR1ZGUuY29tL21jcCJ9)

**Manual setup:**

1. Open Cursor Settings: *Cursor > Settings… > Cursor Settings*.

2. Navigate to *Tools & Integrations > New MCP Server*.

3. Add this configuration to your `mcp.json`:

   ```json
   {
     "mcpServers": {
       "Amplitude": {
         "url": "https://mcp.amplitude.com/mcp",
         "transport": "streamable-http"
       }
     }
   }
   ```

   {{partial:admonition type="note"}}
   EU customers should use `https://mcp.eu.amplitude.com/mcp` instead.
   {{/partial:admonition}}

4. Return to the *Tools & Integrations* tab and authenticate with Amplitude.
{{/partial:collapse}}

{{partial:collapse name="ChatGPT"}}
For general MCP setup, refer to the [OpenAI remote MCP documentation](https://platform.openai.com/docs/guides/tools-remote-mcp).

{{partial:admonition type="note"}}
MCP support in ChatGPT is available through [developer mode](https://community.openai.com/t/mcp-server-tools-now-in-chatgpt-developer-mode/1357233), which provides full Model Context Protocol client support for both read and write operations. OpenAI is working to expand MCP support beyond this beta preview mode, including availability for enterprise organizations.
{{/partial:admonition}}

1. Navigate to [ChatGPT](https://chatgpt.com/) or open the ChatGPT desktop app.

2. Go to *Settings > Apps & Connectors > Browse Connectors*.

3. Select Amplitude, then select **Connect** to start the OAuth connection.

4. Complete Amplitude OAuth authorization when prompted.

5. For best results, Amplitude recommends creating a ChatGPT project specifically for the Amplitude MCP and adding this prompt to the instructions:

   ```text
   When using Amplitude MCP, follow these rules then act quickly and autonomously:
   - Use tools to find answers: If you need info (events, properties, chart definitions, cohorts), use tools to discover it rather than asking the user. Trust the Amplitude MCP tools provide access to actual data behind charts, dashboards, and other entities. Always attempt using tools before saying they don't exist.
   - Try NOT to ask clarifying questions: Make your best judgment with information available but sparingly elicit clarification from users
   - Resolve ambiguity yourself: When multiple options exist (e.g., which project to use, which saved chart or event matches best, how to define a segment), choose the most reasonable option based on tool results and context. Search saved charts, metrics, and other data before creating something new.
   - When responding to requests that involve Amplitude objects (charts, dashboards, or any entity), don't stop at referencing IDs and metadata. Retrieve underlying data, run analysis based on it, then share specific metrics as part of your analysis.
   - Complete the request: Execute the workflow requested, proactively share relevant data when analyzing, don't stop partway to ask for confirmation, then provide data-backed, actionable, and concise answers.
   - Report what you did: After completing the task, briefly explain key assumptions or data used
   - Cite your sources: When referencing data from Amplitude, include the link as part of the markdown response (()[])
   ```

6. Start asking questions about your Amplitude data.
{{/partial:collapse}}

{{partial:collapse name="Claude"}}
For general MCP connector setup, refer to the [Claude remote MCP server documentation](https://support.anthropic.com/en/articles/11503834-building-custom-connectors-via-remote-mcp-servers).

1. Navigate to [claude.ai](https://claude.ai/) or open the Claude desktop app.

2. Go to *Settings > Connectors > Add custom connector*.

3. Configure the integration:
   * **Name:** Amplitude
   * **URL:** `https://mcp.amplitude.com/mcp`

   {{partial:admonition type="note"}}
   EU customers should use `https://mcp.eu.amplitude.com/mcp` instead.
   {{/partial:admonition}}

4. Complete Amplitude OAuth authorization when prompted.

5. Start asking questions about your Amplitude data.
{{/partial:collapse}}

{{partial:collapse name="Gemini CLI"}}
For general MCP setup, refer to the [Gemini CLI MCP documentation](https://google-gemini.github.io/gemini-cli/docs/tools/mcp-server.html).

1. Ensure you're authenticated with Gemini.

2. Add this to your `~/.gemini/settings.json`:

   ```json
   {
     "selectedAuthType": "oauth-personal",
     "mcpServers": {
       "amplitude": {
         "httpUrl": "https://mcp.amplitude.com/mcp"
       }
     }
   }
   ```

   {{partial:admonition type="note"}}
   EU customers should use `https://mcp.eu.amplitude.com/mcp` instead.
   {{/partial:admonition}}

3. Restart the MCP server and authenticate:

   ```shell
   gemini/mcp auth amplitude
   ```
{{/partial:collapse}}

{{partial:collapse name="Replit"}}
For general MCP setup, refer to the [Replit MCP documentation](https://docs.replit.com/replitai/mcp).

**Quick install (recommended):**

**US server (default):**
[Add Amplitude MCP Server to Replit](https://replit.com/integrations?mcp=eyJkaXNwbGF5TmFtZSI6IkFtcGxpdHVkZSIsImJhc2VVcmwiOiJodHRwczovL21jcC5hbXBsaXR1ZGUuY29tL21jcCJ9)

**EU server:**
[Add Amplitude MCP Server to Replit (EU)](https://replit.com/integrations?mcp=eyJkaXNwbGF5TmFtZSI6IkFtcGxpdHVkZSIsImJhc2VVcmwiOiJodHRwczovL21jcC5ldS5hbXBsaXR1ZGUuY29tL21jcCJ9)

**Manual setup:**

1. Navigate to your Replit workspace settings.

2. Go to *Integrations > MCP Servers*.

3. Add a new MCP server with this configuration:
   * **Name:** Amplitude
   * **URL:** `https://mcp.amplitude.com/mcp`

   {{partial:admonition type="note"}}
   EU customers should use `https://mcp.eu.amplitude.com/mcp` instead.
   {{/partial:admonition}}

4. Complete Amplitude OAuth authorization when prompted.

5. Start asking questions about your Amplitude data.
{{/partial:collapse}}

{{partial:collapse name="Lovable"}}
For general MCP setup, refer to the [Lovable MCP documentation](https://docs.lovable.dev/integrations/mcp-servers).

1. Log in to [Lovable](https://lovable.dev/).

2. Select your avatar, then go to *Settings*.

3. Select **Connectors**.

4. Search for `Amplitude` in the search box.

5. Complete Amplitude OAuth authorization when prompted.

6. Start asking questions about your Amplitude data in the Lovable chat.
{{/partial:collapse}}

{{partial:collapse name="Figma Make"}}
For general MCP connector setup, refer to the [Figma Make connector documentation](https://help.figma.com/hc/en-us/articles/35440096186007-Connect-external-tools-to-Figma-Make-using-MCP).

1. Open a Figma Make file.

2. Select the **+** icon, then **Connectors**.

3. In the *Partners* tab, find Amplitude and select **Connect**.

4. Complete Amplitude OAuth authorization when prompted.

5. In the chat input, select the **+** icon, then *Connectors*, then **Amplitude** to start using the MCP server.

{{partial:admonition type="note"}}
Figma Make has a data limit that may cause initial tool calls to fail. They should recover with lower limits.
{{/partial:admonition}}
{{/partial:collapse}}

{{partial:collapse name="AWS Kiro"}}
For general MCP setup, refer to the [Kiro MCP documentation](https://kiro.dev/docs/mcp/configuration).

1. Open the Kiro IDE.

2. Open the Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux) and search for "MCP", or go to *File > Settings* and open the `mcp.json` configuration file.

3. Select the scope for your configuration:
   * **User settings**: Applies to all projects.
   * **Workspace Config**: Applies to the current project only.

4. Add this configuration to your `mcp.json`:

   ```json
   {
     "mcpServers": {
       "amplitude-mcp": {
         "type": "http",
         "url": "https://mcp.amplitude.com/mcp"
       }
     }
   }
   ```

   {{partial:admonition type="note"}}
   EU customers should use `https://mcp.eu.amplitude.com/mcp` instead.
   {{/partial:admonition}}

5. Save the configuration file.

6. In the *MCP Servers* section, verify the status shows **Connected**. If prompted, sign in to Amplitude through your default browser.
{{/partial:collapse}}

{{partial:collapse name="Codex CLI"}}
For general MCP setup, refer to the [OpenAI Codex CLI MCP documentation](https://developers.openai.com/codex/mcp/).

1. Add the Amplitude MCP server:

   ```shell
   codex mcp add amplitude --url https://mcp.amplitude.com/mcp
   ```

   {{partial:admonition type="note"}}
   EU customers should use `https://mcp.eu.amplitude.com/mcp` instead.
   {{/partial:admonition}}

2. Follow the authentication flow when prompted.
{{/partial:collapse}}

{{partial:collapse name="Other MCP clients"}}
For MCP-compatible clients not listed above:

1. Configure your client to connect to `https://mcp.amplitude.com/mcp`.

   {{partial:admonition type="note"}}
   EU customers should use `https://mcp.eu.amplitude.com/mcp` instead.
   {{/partial:admonition}}

2. Ensure your client supports OAuth authentication.

3. Set up the connection according to your client's documentation.

4. Authenticate with your Amplitude account when prompted.

5. Select which Amplitude tools to enable based on your needs.
{{/partial:collapse}}

## Query examples

### Basic analytics queries

> What were the daily active users over the last 7 days?

> Show signup conversion rates by traffic source this month.

> Which features have the highest engagement rates?

### Creation workflows

> Create a dashboard showing our key product metrics.

> Create an experiment to test the new checkout flow with a 50/50 split.

> Create a cohort of users who completed onboarding in the last 30 days.

> Edit the retention chart to show weekly instead of monthly data.

> Build a cohort of power users who have used the product more than 10 times.

### Experiment analysis

> What's the performance of the checkout experiment?

> Show the statistical significance of the new onboarding flow.

> Which experiment variants are running?

### Content discovery

> Find all charts related to user retention.

> Search for dashboards containing mobile app metrics.

> Show experiments testing the payment flow.

### User and cohort analysis

> Show me users who signed up in the last week.

> What cohorts exist for high-value customers?

> Analyze the behavior of users in the "Active Users" cohort.

### Customer feedback analysis

> What are the main insights from customer feedback this month?

> Show me recent customer feedback comments about the mobile app.

> Which feedback sources are generating the most mentions?

### Advanced analysis

> Compare user behavior between iOS and Android platforms.

> What's the typical user journey for power users?

> Analyze feature adoption rates after the recent product launch.

## Typical workflows

### Analysis workflow

Most analysis questions follow this pattern:

1. **Search**: Find relevant content (charts, dashboards, experiments)  
2. **Retrieve**: Get full definitions and metadata  
3. **Query**: Execute data queries and analysis  
4. **Analyze**: Ask follow-up questions and dive deeper

Example conversation flow:

> User: Show me user retention data.
> AI: [Searches for retention-related charts]  
> AI: [Retrieves chart definitions]  
> AI: [Queries the data and presents results]
> User: Can you break this down by user segment?
> AI: [Modifies query to include segmentation]

### Creation workflow

You can create new content directly through natural language:

1. **Create**: Build new charts, dashboards, experiments, or cohorts.
2. **Configure**: Specify parameters and settings through conversation.
3. **Refine**: Edit and adjust based on your needs.
4. **Deploy**: Save and use the created content in Amplitude.

Example conversation flow:

> User: Create a dashboard for mobile app metrics.
> AI: [Creates dashboard with relevant charts]
> User: Add a chart showing daily active users by platform.
> AI: [Adds chart to the dashboard]
> User: Create a cohort of users who completed checkout.
> AI: [Creates cohort with specified criteria]

## Security and compliance

### Data access

* The MCP server uses your existing Amplitude user permissions and access controls.
* You can only access Amplitude projects and data that you already have permission to view in your regular Amplitude account.
* You receive no additional data access beyond your current Amplitude account privileges  
* OAuth authentication ensures secure connection between the MCP server and your Amplitude account.

### Privacy considerations

The AI service you're using (for example, Claude or Gemini) processes your Amplitude data. Review your organization's policies regarding AI-powered data analysis tools and consider compliance requirements (General Data Protection Regulation, California Consumer Privacy Act).

Third parties (for example, Anthropic) develop and maintain the AI models used with this MCP server. Amplitude isn't responsible for model outputs, including hallucinations, inaccuracies, or errors resulting from model behavior, even if such outputs use your Amplitude data.


### Admin controls

MCP server access is **enabled by default** for all users in your organization. Organization administrators can opt out or restrict access if needed:

1. Navigate to *Settings > Content Access > MCP* in your Amplitude organization settings.
2. Use the content access controls to allow or block the Amplitude MCP server.
3. Access restrictions apply to all MCP clients across all users in your organization.

{{partial:admonition type="note"}}
MCP access controls are an admin-only setting. Individual users can't override organization-level MCP restrictions.
{{/partial:admonition}}

## Troubleshooting

### Common issues

**Authentication and OAuth Issues**

* Ensure your Amplitude account has proper project access.
* Check that you have logged into the correct Amplitude account.
* Make sure you're only logged into one Amplitude organization during the OAuth flow. Logging into multiple organizations can cause authentication issues.
* Try disconnecting the MCP connection and re-authenticating through the OAuth flow.
* Try logging out of Amplitude, then reconnecting.
* Desktop apps may require restart after configuration changes.
* Authorization page may appear to spin indefinitely (close tab after authentication).  

**Missing Data**

* Verify you have access to the specific Amplitude project.  
* Check if the data exists in your Amplitude interface.  
* Ensure proper permissions for the requested data.

**Chart Query Issues**

* AI platforms may truncate some large charts.  
* Querying charts from dashboards may use default chart settings instead of saved dashboard filters.

**MCP Client Issues**

* **Cursor tool call failures**: If MCP tool calls fail in Cursor, this is often due to expired or corrupted authentication tokens. Open the Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux), type and select "Clear All MCP Tokens," then re-authenticate with your accounts.
* **Token limit errors**: If you receive token limit exceeded errors, try starting a new conversation thread or increase the maximum token limit in your MCP client settings.
* **Connection timeouts**: If queries are timing out, try breaking down complex requests into smaller, more focused questions.
* **Tool loading failures**: If tools aren't loading, restart your MCP client application and re-authenticate.

### Getting help

If you encounter issues not covered here:

1. Verify your setup matches the configuration examples.  
2. Test with a simple query like "What Amplitude projects are accessible?"
3. Check that your Amplitude account has the necessary permissions.  
4. Contact your Amplitude administrator for organization-specific setup help.

## Send feedback

Amplitude is constantly improving the Amplitude MCP server and would appreciate hearing from you. Share your feedback, suggestions, or report issues using this [feedback form](https://docs.google.com/forms/d/e/1FAIpQLSeFgRd8607Y2Gzidva5ChEri2tk7wvl7vofUIwxcM_2aD2Nqw/viewform?usp=header).

## Technical specifications

**Transport Type:** Streaming HTTP (Remote).

**Authentication:** OAuth 2.0 with Amplitude.