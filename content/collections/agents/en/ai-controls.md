---
id: b2d0144c-be6b-4f51-95e0-d1c69c559c21
blueprint: agent
title: 'AI Settings and Controls'
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1770931598
---
The *AI Controls* page lets Organization Admins manage Global Agent availability, customize AI context, configure model providers, and set data retention policies.

## Overview

Access organization-level AI Controls from *Settings > AI Controls*.

The *AI Controls* page includes:

- **Global Agent availability**: Show or hide Global Agent and enable or disable it for your organization.
- **AI context**: Provide instructions and upload reference files that help Global Agent understand your business.
- **Model providers**: Enable or disable specific AI model providers.
- **Data retention and privacy**: Configure how long AI conversation data is stored.
- **Disable all AI**: Turn off all AI features across your organization.

## Global Agent availability

Control whether Global Agent appears in your organization's interface.

- **Navigation visibility**: Toggle **Show Global Agent in sidebar** to show or hide Global Agent from the left-side navigation bar for all users.
- **Feature access**: Toggle **Enable Global Agent for organization** to allow or block users from interacting with Global Agent features.

{{partial:admonition type="note" heading=""}}
These settings affect all users in your organization. Individual users can't override organization-level visibility or access settings.
{{/partial:admonition}}

## AI context

Provide custom instructions that teach Global Agent how your business works. For guidance on writing effective context, see [AI context](/docs/agents/ai-context).

### Two levels of context

Global Agent uses two layers of context: Organization and Project.

- **Organization context**: Applies to all projects. Use for company-wide standards like business model, KPI definitions, standard terminology, and global filters. Limit: 10,000 characters.
- **Project context**: Applies to one project. Use for product-specific events, metrics, segments, and overrides to org defaults. Limit: 10,000 characters.

At runtime, Global Agent combines both contexts. Project context overrides organization context when they conflict.

### Text instructions

Enter your context as structured markdown text. Use headings, bullets, and backticks to make it easy for Global Agent to parse.

To add text instructions:

1. Navigate to *Settings > AI Controls*.
2. In the *AI Context* section, select the **Organization** or **Project** tab.
3. Enter your instructions in the text field.
4. Select **Save**.

### File uploads

Upload reference files for Global Agent to use alongside your text instructions. Files provide additional context without consuming your 10,000-character instruction limit.

Supported file formats:

| Type | Formats | Size limit |
| ---- | ------- | ---------- |
| Documents | TXT, MD, HTML, DOC, DOCX, PDF | 50 MB |
| Spreadsheets | CSV, XLS, XLSX | 50 MB |
| Images | JPG, PNG | 3.75 MB |

To upload a file:

1. Navigate to the *AI Context* section of the *AI Controls* page.
2. Select **Upload file**.
3. Choose one or more files to upload.

Use file uploads for:

- Data dictionaries or event catalogs in spreadsheet format.
- Product requirement documents or specifications.
- Style guides or documentation standards.
- Reference images for UI-related questions.

{{partial:admonition type="note" heading=""}}
File uploads supplement your text instructions—they don't replace them. Use text instructions for rules and definitions, and file uploads for detailed reference material.
{{/partial:admonition}}

{{##
## Model providers

Enable or disable specific AI model providers for your organization.

| Provider | Models |
| -------- | ------ |
| Anthropic | Claude 3.5 Sonnet, Claude 3 Opus |
| Google | Gemini 1.5 Pro, Gemini Ultra |
| OpenAI | GPT-4o, GPT-4 Turbo |

Toggle each provider on or off based on your organization's policies. Amplitude recommends keeping all providers enabled for the best experience.

{{partial:admonition type="warning" heading=""}}
Disabling a provider may degrade performance across certain AI features. Only disable a provider if your organization's security or compliance policies require it.
{{/partial:admonition}}
##}}
## Data retention and privacy

Configure how long AI conversation data is stored.

### Data privacy

Amplitude doesn't store your data with third-party AI providers. Your data is never used for model training by Amplitude or its partners.

### Retention period

Set the retention period to control how long conversation logs are stored before automatic deletion. Adjust this setting based on your organization's data governance requirements.

For detailed information about AI data handling, privacy, and security, refer to [Privacy and security](/docs/agents/privacy-and-security).

## Disable all AI

Turn off all AI features across your organization. This setting immediately revokes access to all AI model providers and disables Global Agent for every user.

To disable all AI:

1. Navigate to *Settings > AI Controls*.
2. Scroll to the bottom of the page.
3. Select **Disable all AI**.

{{partial:admonition type="warning" heading=""}}
This action takes effect immediately. All AI-powered features, including Global Agent, stop working across your entire organization. Only organization administrators can re-enable AI features.
{{/partial:admonition}}

## Frequently asked questions

{{partial:collapse name="Who can access AI Controls?"}}
Only organization administrators can access and modify AI Controls. This includes Global Agent availability, model provider settings, data retention policies, and the option to disable all AI. Individual users can't change these settings.
{{/partial:collapse}}

{{partial:collapse name="What's the character limit for context?"}}
10,000 characters each for org context and project context (20,000 total). This is roughly 1,500–2,000 words—plenty for most use cases.

If you're hitting the limit, you're probably including too much detail. Focus on definitions and rules that apply to the majority of questions, not edge cases.
{{/partial:collapse}}

{{partial:collapse name="What file types can I upload as context?"}}
You can upload documents (TXT, MD, HTML, DOC, DOCX, PDF up to 50 MB), spreadsheets (CSV, XLS, XLSX up to 50 MB), and images (JPG, PNG up to 3.75 MB). Use file uploads for detailed reference material like data dictionaries or product specs that would exceed the 10,000-character instruction limit.
{{/partial:collapse}}

{{partial:collapse name="What happens if I disable a model provider?"}}
Disabling a provider removes that provider's models from all AI features in your organization. This may degrade performance if the disabled provider handles specific tasks. Amplitude recommends keeping all providers enabled unless your security or compliance policies require otherwise.
{{/partial:collapse}}

{{partial:collapse name="How do I re-enable AI after disabling it?"}}
An organization administrator can re-enable AI by navigating to *Settings > AI Controls* and toggling the providers back on. If you used the **Disable all AI** option, you need to re-enable it from the same section. This restores access to all AI model providers and re-enables Global Agent.
{{/partial:collapse}}