---
id: b09c311c-387a-476e-b382-49ce0ca448d6
blueprint: analytic
title: 'Amplitude MCP Server'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1758643314
hide_from_search: true
---

The Amplitude Model Context Protocol (MCP) integration enables teams to analyze product data, experiments, and user behavior using conversational AI. Query your Amplitude analytics, dashboards, experiments, and feature flags directly through AI interfaces using natural language.

## Available tools and capabilities

The Amplitude MCP provides comprehensive access to your analytics through these tools:

{{partial:collapse name="Available tools"}}
| Tool Name              | Description                                                                                                                                    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `search`               | Search for dashboards, charts, notebooks, experiments, and other content in Amplitude with comprehensive filtering and personalization options |
| `query_chart`          | Query chart data result using the internal dash API to get chart data                                                                          |
| `query_metric`         | Query metric data using the dataset endpoint with metric references                                                                            |
| `query_experiment`     | Query experiment analysis data using the dataset endpoint with proper experiment parameters                                                    |
| `query_dataset`        | Execute a data query using the dataset endpoint for complex ad hoc analysis within a project                                                   |
| `get_context`          | Get context information about the current user, organization, and accessible projects                                                          |
| `get_charts`           | Retrieve full chart objects by their IDs using the chart service directly                                                                      |
| `get_dashboard`        | Get specific dashboards and all their charts including chart IDs that can be queried individually                                              |
| `get_notebook`         | Get specific notebooks and all their charts including chart IDs that can be queried individually                                               |
| `get_flags`            | Retrieve feature flags from a project with optional filtering by deployment, type, and deleted status                                          |
| `get_experiments`      | Retrieve specific experiments by their IDs with additional information like state and decisions                                                |
| `get_deployments`      | Retrieve all deployments (Experiment API keys) for the current project                                                                         |
| `get_metrics`          | List all metrics from a project with optional filtering and sorting by various criteria                                                        |
| `get_metric`           | Get detailed information about a specific metric by ID                                                                                         |
| `get_events`           | Retrieve events from a project with optional filtering and sorting                                                                             |
| `get_event_properties` | Retrieve event properties from a project with filtering options                                                                                |
| `get_user_properties`  | Retrieve user properties from a project with filtering options                                                                                 |
| `get_session_replays`  | Search for session replays in the last 30 days, filtered by user properties or events.                                                         |
| `get_project_api_keys` | Get analytics API keys for a specific project                                                                                                  |

{{/partial:collapse}}

## Implementation instructions

Complete the steps below, depending on the tool you're integrating with. 

{{partial:tabs tabs="Claude (web and desktop), Claude Code, Cursor, Gemini CLI"}}
{{partial:tab name="Claude (web and desktop)"}}
1. Navigate to [claude.ai](https://claude.ai/) or open Claude desktop app  
2. Go to Settings → Connectors → Add custom connector  
3. Configure the integration:  
   * **Name:** Amplitude  
   * **URL:** `https://mcp.amplitude.com/v1/mcp`  
4. Complete Amplitude OAuth authorization when prompted  
5. Start asking questions about your Amplitude data.
{{/partial:tab}}
{{partial:tab name="Claude Code"}}
**Best for:** Developers who prefer command-line interfaces

   1. Add the MCP server globally:

       ```shell
       claude mcp add -t http -s user Amplitude "https://mcp.amplitude.com/v1/mcp"
       ```

   2. Start Claude Code:

       ```shell
       claude
       ```

   3. Authenticate with Amplitude:

       ```shell
       /mcp
       ```

   4. Follow the authentication flow

{{/partial:tab}}
{{partial:tab name="Cursor"}}

   1. Open Cursor Settings: `Cursor > Settings… > Cursor Settings` 
      
   2. Navigate to: `Tools & Integrations > New MCP Server`  

   3. Add this configuration to your `mcp.json`:

        ```json
        {  
          "mcpServers": {
            "Amplitude": {
              "url": "https://mcp.amplitude.com/v1/mcp",
              "transport": "streamable-http"
            }
          }
        }
        ```

   4. Return to Tools & Integration tab and authenticate with Amplitude
  
{{/partial:tab}}
{{partial:tab name="Gemini CLI"}}
   1. Ensure you're authenticated with Gemini  
   2. Add this to your `~/.gemini/settings.json`:

      ```json
      {
        "selectedAuthType": "oauth-personal",
        "mcpServers": {
          "amplitude": {
            "httpUrl": "https://mcp.amplitude.com/v1/mcp"
          }
        }
      }
      ```

   3. Restart the MCP server and authenticate:

      ```shell
      gemini/mcp auth amplitude
      ```
{{/partial:tab}}
{{/partial:tabs}}

## Query examples

### Basic analytics queries

> What were my daily active users over the last 7 days?

> Show me signup conversion rates by traffic source this month

> Which features have the highest engagement rates?

### Experiment analysis

> What's the performance of my checkout experiment?

> Show me the statistical significance of the new onboarding flow

> Which experiment variants are currently running?

### Content discovery

> Find all charts related to user retention

> Search for dashboards containing mobile app metrics

> Show me experiments testing the payment flow

### Advanced analysis

> Compare user behavior between iOS and Android platforms

> What's the typical user journey for power users?

> Analyze feature adoption rates after our recent product launch

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

* Integration only accesses Amplitude projects where you have existing permissions  
* No additional data access beyond your current Amplitude account privileges  
* OAuth authentication ensures secure connection

### Privacy considerations

Your Amplitude data is processed by the AI service you're using (for example, Claude or Gemini). Review your organization's policies regarding AI-powered data analysis tools and consider compliance requirements (GDPR, CCPA)

## Troubleshooting

### Common issues

**Authentication Problems**

* Ensure your Amplitude account has proper project access  
* Check that you are logged in to the correct Amplitude account  
* Try disconnecting the MCP connection and try re-authenticating through the OAuth flow
* Try logging out of Amplitude, then recconnecting the MCP connection

**Missing Data**

* Verify you have access to the specific Amplitude project  
* Check if the data exists in your Amplitude interface  
* Ensure proper permissions for the requested data

**Chart Query Issues**

* Some large charts may be truncated by AI platforms  
* Querying charts from dashboards may use default chart settings instead of saved dashboard filters

**OAuth Flow Issues**

* Authorization page may appear to spin indefinitely (close tab after authentication)  
* Desktop apps may require restart after configuration changes

### Getting help

If you encounter issues not covered here:

1. Verify your setup matches the configuration examples  
2. Test with a simple query like "What Amplitude projects do I have access to?"
3. Check that your Amplitude account has the necessary permissions  
4. Contact your Amplitude administrator for organization-specific setup help

## Technical specifications

**Transport Type:** Streamable HTTP (Remote)
**Authentication:** OAuth 2.0 with Amplitude
**Endpoint:** `https://mcp.amplitude.com/v1/mcp`
