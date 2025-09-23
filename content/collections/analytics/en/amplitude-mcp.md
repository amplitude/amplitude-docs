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

The Amplitude MCP provides comprehensive access to your analytics through these categories:

### Analytics and data querying

* **Event Segmentation:** Analyze user actions, unique users, and event volumes  
* **Funnel Analysis:** Track conversion rates across user journeys  
* **Retention Analysis:** Monitor user engagement and return patterns  
* **Custom Queries:** Execute ad-hoc analysis on your behavioral data

### Content discovery and management

* **Search:** Find charts, dashboards, notebooks, and experiments by name or content  
* **Dashboard Access:** Retrieve complete dashboards with all associated charts  
* **Notebook Integration:** Access analysis notebooks and their visualizations  
* **Chart Querying:** Get data from specific charts with customizable parameters

### Experimentation and feature management

* **A/B Test Analysis:** Query experiment results and statistical significance  
* **Feature Flag Management:** Monitor flag status and variant performance  
* **Deployment Tracking:** Access experiment deployment configurations

### Data schema exploration

* **Event Discovery:** Browse all tracked events in your projects  
* **Property Exploration:** View available event and user properties  
* **Data Quality:** Monitor data ingestion and identify anomalies

## Implementation guide

Complete the steps below, depending on the tool you're integrating with. 

### Claude Web and Desktop

1. Navigate to [claude.ai](https://claude.ai/) or open Claude desktop app  
2. Go to Settings → Connectors → Add custom connector  
3. Configure the integration:  
   * **Name:** Amplitude  
   * **URL:** `https://mcp.amplitude.com/v1/mcp`  
4. Complete Amplitude OAuth authorization when prompted  
5. Start asking questions about your Amplitude data\!

### Claude Code

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

### Cursor

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

### Gemini CLI

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

## Query examples

### Basic analytics queries

```
"What were my daily active users over the last 7 days?"

"Show me signup conversion rates by traffic source this month"

"Which features have the highest engagement rates?"
```

### Experiment analysis

```
"What's the performance of my checkout experiment?"

"Show me the statistical significance of the new onboarding flow"

"Which experiment variants are currently running?"
```

### Content discovery

```
"Find all charts related to user retention"

"Search for dashboards containing mobile app metrics"

"Show me experiments testing the payment flow"
```

### Advanced analysis

```
"Compare user behavior between iOS and Android platforms"

"What's the typical user journey for power users?"

"Analyze feature adoption rates after our recent product launch"
```

## Typical analysis workflow

Most analysis questions follow this pattern:

1. **Search** → Find relevant content (charts, dashboards, experiments)  
2. **Retrieve** → Get full definitions and metadata  
3. **Query** → Execute data queries and analysis  
4. **Analyze** → Ask follow-up questions and dive deeper

Example conversation flow:

```
You: "Show me user retention data"
AI: [Searches for retention-related charts]
AI: [Retrieves chart definitions]
AI: [Queries the data and presents results]
You: "Can you break this down by user segment?"
AI: [Modifies query to include segmentation]
```

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
* Check that your organization ID is correct in the URL  
* Try re-authenticating through the OAuth flow

**Missing Data**

* Verify you have access to the specific Amplitude project  
* Check if the data exists in your Amplitude interface  
* Ensure proper permissions for the requested metrics

**Chart Query Issues**

* Some large charts may be truncated by AI platforms  
* Dashboard charts may use default settings instead of custom filters  
* Experiment queries may not include saved filters

**OAuth Flow Issues**

* Authorization page may appear to spin indefinitely (close tab after authentication)  
* Desktop apps may require restart after configuration changes

### Getting help

If you encounter issues not covered here:

1. Verify your setup matches the configuration examples  
2. Test with a simple query like "What projects do I have access to?"  
3. Check that your Amplitude account has the necessary permissions  
4. Contact your Amplitude administrator for organization-specific setup help

## Technical specifications

**Transport Type:** Streamable HTTP (Remote)  
**Authentication:** OAuth 2.0 with Amplitude  
**Endpoint:** `https://mcp.amplitude.com/v1/mcp`
