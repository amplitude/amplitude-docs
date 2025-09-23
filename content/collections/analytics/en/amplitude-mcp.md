---
id: b09c311c-387a-476e-b382-49ce0ca448d6
blueprint: analytic
title: 'Amplitude MCP'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1758643314
---

# **Amplitude MCP Server**

## **Overview**

The Amplitude Model Context Protocol (MCP) integration enables teams to analyze product data, experiments, and user behavior using conversational AI. Query your Amplitude analytics, dashboards, experiments, and feature flags directly through AI interfaces using natural language.

## **Available Tools & Capabilities**

The Amplitude MCP provides comprehensive access to your analytics through these categories:

### **Analytics & Data Querying**

* **Event Segmentation:** Analyze user actions, unique users, and event volumes  
* **Funnel Analysis:** Track conversion rates across user journeys  
* **Retention Analysis:** Monitor user engagement and return patterns  
* **Custom Queries:** Execute ad-hoc analysis on your behavioral data

### **Content Discovery & Management**

* **Search:** Find charts, dashboards, notebooks, and experiments by name or content  
* **Dashboard Access:** Retrieve complete dashboards with all associated charts  
* **Notebook Integration:** Access analysis notebooks and their visualizations  
* **Chart Querying:** Get data from specific charts with customizable parameters

### **Experimentation & Feature Management**

* **A/B Test Analysis:** Query experiment results and statistical significance  
* **Feature Flag Management:** Monitor flag status and variant performance  
* **Deployment Tracking:** Access experiment deployment configurations

### **Data Schema Exploration**

* **Event Discovery:** Browse all tracked events in your projects  
* **Property Exploration:** View available event and user properties  
* **Data Quality:** Monitor data ingestion and identify anomalies

## **Implementation Guide**

### **Option 1: Claude Web & Desktop** 

**Setup Steps:**

1. Navigate to [claude.ai](https://claude.ai/) or open Claude desktop app  
2. Go to Settings → Connectors → Add custom connector  
3. Configure the integration:  
   * **Name:** Amplitude  
   * **URL:** `https://mcp.amplitude.com/v1/mcp`  
4. Complete Amplitude OAuth authorization when prompted  
5. Start asking questions about your Amplitude data\!

### **Option 2: Claude Code** 

**Best for:** Developers who prefer command-line interfaces

**Setup Steps:**

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

### **Option 3: Cursor** 

**Setup Steps:**

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

### **Option 4: Gemini CLI**

**Setup Steps:**

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

## **Query Examples**

### **Basic Analytics Queries**

```
"What were my daily active users over the last 7 days?"

"Show me signup conversion rates by traffic source this month"

"Which features have the highest engagement rates?"
```

### **Experiment Analysis**

```
"What's the performance of my checkout experiment?"

"Show me the statistical significance of the new onboarding flow"

"Which experiment variants are currently running?"
```

### **Content Discovery**

```
"Find all charts related to user retention"

"Search for dashboards containing mobile app metrics"

"Show me experiments testing the payment flow"
```

### **Advanced Analysis**

```
"Compare user behavior between iOS and Android platforms"

"What's the typical user journey for power users?"

"Analyze feature adoption rates after our recent product launch"
```

## **Typical Analysis Workflow**

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

## **Security & Compliance**

### **Data Access**

* Integration only accesses Amplitude projects where you have existing permissions  
* No additional data access beyond your current Amplitude account privileges  
* OAuth authentication ensures secure connection

### **Privacy Considerations**

Your Amplitude data will be processed by the AI service you're using (Claude, Gemini, etc.). Review your organization's policies regarding AI-powered data analysis tools and consider compliance requirements (GDPR, CCPA, etc.)

## **Troubleshooting**

### **Common Issues**

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

### **Getting Help**

If you encounter issues not covered here:

1. Verify your setup matches the configuration examples  
2. Test with a simple query like "What projects do I have access to?"  
3. Check that your Amplitude account has the necessary permissions  
4. Contact your Amplitude administrator for organization-specific setup help

## **Technical Specifications**

**Transport Type:** Streamable HTTP (Remote)  
**Authentication:** OAuth 2.0 with Amplitude  
**Endpoint:** `https://mcp.amplitude.com/v1/mcp`
