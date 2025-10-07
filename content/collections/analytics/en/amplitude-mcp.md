---
id: b09c311c-387a-476e-b382-49ce0ca448d6
blueprint: analytic
title: 'Amplitude MCP (Model Context Protocol) Server'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1758643314
hide_from_search: true
---

The Amplitude [Model Context Protocol (MCP)](https://modelcontextprotocol.io/docs/getting-started/intro) server enables teams to analyze product data, experiments, and user behavior using conversational AI. Query your Amplitude analytics, dashboards, experiments, and feature flags directly through AI interfaces using natural language.

## Remote server

{{partial:admonition type="beta" heading="Beta notice"}}
The Amplitude MCP server is under active development. Some functions and settings may not be available, and you may experience bugs or performance issues during this period. This feature continues to evolve. Usage guidelines and rate limits are announced when the MCP server becomes available.
{{/partial:admonition}}

### Who can use this feature

* Available to any existing Amplitude customer.

* You must use a code editor or application that supports MCP servers (for example, VS Code, Cursor, Claude Code).

## Regions

| Region | MCP Server URL |
| ------ | -------------- |
| United States Server (Default) | `https://mcp.amplitude.com/mcp` |
| EU Residency Server | `https://mcp.eu.amplitude.com/mcp` |

Use the Standard Server URL unless your Amplitude data is hosted in the EU region.

## Available tools and capabilities

The Amplitude MCP provides comprehensive access to your analytics through these tools:

{{partial:collapse name="Available tools"}}
| Tool Name              | Description                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `search`               | Search for dashboards, charts, notebooks, experiments, and other content in Amplitude with comprehensive filtering and personalization options |
| `query_chart`          | Query chart data result using the internal dash API to get chart data                                                                          |
| `query_metric`         | Query metric data using the dataset endpoint with metric references                                                                            |
| `query_experiment`     | Query experiment analysis data using the dataset endpoint with proper experiment parameters                                                    |
| `query_dataset`        | Execute a data query using the dataset endpoint for complex ad-hoc analysis within a project                                                   |
| `get_context`          | Get context information about the current user, organization, and accessible projects                                                          |
| `get_charts`           | Retrieve full chart objects by their IDs using the chart service directly                                                                      |
| `get_dashboard`        | Get specific dashboards and all their charts including chart IDs for individual queries                                              |
| `get_notebook`         | Get specific notebooks and all their charts including chart IDs for individual queries                                               |
| `get_flags`            | Retrieve feature flags from a project with optional filtering by deployment, type, and deleted status                                          |
| `get_experiments`      | Retrieve specific experiments by their IDs with additional information like state and decisions                                                |
| `get_deployments`      | Retrieve all deployments (Experiment API keys) for the current project                                                                         |
| `get_metrics`          | List all metrics from a project with optional filtering and sorting by various criteria                                                        |
| `get_metric`           | Get detailed information about a specific metric by ID                                                                                         |
| `get_events`           | Retrieve events from a project with optional filtering and sorting                                                                             |
| `get_event_properties` | Retrieve event properties from a project with filtering options                                                                                |
| `get_user_properties`  | Retrieve user properties from a project with filtering options                                                                                 |
| `get_session_replays`  | Search for session replays in the last 30 days, filtered by user properties or events.                                                         |

{{/partial:collapse}}

## Implementation instructions

Complete the steps below, depending on the tool you're integrating with. 

{{partial:tabs tabs="Claude (web and desktop), Claude Code, Cursor, Gemini CLI"}}
{{partial:tab name="Claude (web and desktop)"}}
1. Navigate to [claude.ai](https://claude.ai/) or open Claude desktop app  
2. Go to Settings → Connectors → Add custom connector  
3. Configure the integration:  
   * **Name:** Amplitude  
   * **URL:** `https://mcp.amplitude.com/mcp` (or use the EU URL from the [Regions](#regions) table if your data is hosted in the EU.)
4. Complete Amplitude OAuth authorization when prompted  
5. Start asking questions about your Amplitude data.
{{/partial:tab}}
{{partial:tab name="Claude Code"}}
**Best for:** Developers who prefer command-line interfaces.

   1. Add the MCP server globally:

       ```shell
       claude mcp add -t http -s user Amplitude "https://mcp.amplitude.com/mcp"
       ```

   2. Start Claude Code:

       ```shell
       claude
       ```

   3. Authenticate with Amplitude:

       ```shell
       /mcp
       ```

   4. Follow the authentication flow.

{{/partial:tab}}
{{partial:tab name="Cursor"}}

**Quick Install (Recommended):**

**US Server (Default):**
[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=Amplitude&config=eyJ1cmwiOiJodHRwczovL21jcC5hbXBsaXR1ZGUuY29tL21jcCJ9)

**EU Server:**
[![Install MCP Server](https://cursor.com/deeplink/mcp-install-dark.svg)](https://cursor.com/install-mcp?name=Amplitude&config=eyJ1cmwiOiJodHRwczovL21jcC5ldS5hbXBsaXR1ZGUuY29tL21jcCJ9)

**Manual Setup:**

   1. Open Cursor Settings: `Cursor > Settings… > Cursor Settings` 
      
   2. Navigate to: `Tools & Integrations > New MCP Server`  

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

   4. Return to Tools & Integration tab and authenticate with Amplitude.
  
{{/partial:tab}}
{{partial:tab name="Gemini CLI"}}
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
{{/partial:tab}}
{{/partial:tabs}}

## Query examples

### Basic analytics queries

> What were the daily active users over the last 7 days?

> Show signup conversion rates by traffic source this month

> Which features have the highest engagement rates?

### Experiment analysis

> What's the performance of the checkout experiment?

> Show the statistical significance of the new onboarding flow

> Which experiment variants are running?

### Content discovery

> Find all charts related to user retention

> Search for dashboards containing mobile app metrics

> Show experiments testing the payment flow

### Advanced analysis

> Compare user behavior between iOS and Android platforms

> What's the typical user journey for power users?

> Analyze feature adoption rates after the recent product launch

## Typical analysis workflow

Most analysis questions follow this pattern:

1. **Search** → Find relevant content (charts, dashboards, experiments)  
2. **Retrieve** → Get full definitions and metadata  
3. **Query** → Execute data queries and analysis  
4. **Analyze** → Ask follow-up questions and dive deeper

Example conversation flow:

> User: Show me user retention data
> AI: [Searches for retention-related charts]  
> AI: [Retrieves chart definitions]  
> AI: [Queries the data and presents results]
> User: Can you break this down by user segment?
> AI: [Modifies query to include segmentation]

## Security and compliance

### Data access

* The MCP server uses your existing Amplitude user permissions and access controls.
* You can only access Amplitude projects and data that you already have permission to view in your regular Amplitude account.
* No additional data access is granted beyond your current Amplitude account privileges  
* OAuth authentication ensures secure connection between the MCP server and your Amplitude account.

### Privacy considerations

Your Amplitude data is processed by the AI service you're using (for example, Claude or Gemini). Review your organization's policies regarding AI-powered data analysis tools and consider compliance requirements (General Data Protection Regulation, California Consumer Privacy Act).

The AI models used with this MCP server are developed and maintained by third parties (for example, Anthropic). Amplitude isn't responsible for model outputs, including hallucinations, inaccuracies, or errors resulting from model behavior, even if such outputs are generated using your Amplitude data.

## Troubleshooting

### Common issues

**Authentication and OAuth Issues**

* Ensure your Amplitude account has proper project access.
* Check that you are logged in to the correct Amplitude account.
* Make sure you're only logged into one Amplitude organization during the OAuth flow. Being logged into multiple organizations can cause authentication issues.
* Try disconnecting the MCP connection and re-authenticating through the OAuth flow.
* Try logging out of Amplitude, then reconnecting.
* Desktop apps may require restart after configuration changes.
* Authorization page may appear to spin indefinitely (close tab after authentication).  

**Missing Data**

* Verify you have access to the specific Amplitude project.  
* Check if the data exists in your Amplitude interface.  
* Ensure proper permissions for the requested data.

**Chart Query Issues**

* Some large charts may be truncated by AI platforms.  
* Querying charts from dashboards may use default chart settings instead of saved dashboard filters.

**MCP Client Issues**

* Cursor tool call failures: If MCP tool calls fail in Cursor, this is often due to expired or corrupted authentication tokens. Open the Command Palette (`Cmd+Shift+P` on Mac, `Ctrl+Shift+P` on Windows/Linux), type and select "Clear All MCP Tokens," then re-authenticate with your accounts.
* Token limit errors: If you receive token limit exceeded errors, try starting a new conversation thread or increase the maximum token limit in your MCP client settings.
* Connection timeouts: If queries are timing out, try breaking down complex requests into smaller, more focused questions.
* Tool loading failures: If tools aren't loading, restart your MCP client application and re-authenticate.

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
