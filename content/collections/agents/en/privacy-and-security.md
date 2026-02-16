---
id: 3c152fc4-e6a1-4a5f-92f6-1bc3ca7073be
blueprint: agent
title: 'Privacy and Security'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1754519006
---
Amplitude's Agents prioritize privacy and security by design. Agents operate inside authenticated Amplitude accounts, isolate each customer’s data and agent context, and never train third‑party models on customer data. When features use an external Large Language Model (LLM), Amplitude enforces contractual no‑training controls and the broader platform remains covered by Amplitude’s [Data Processing Addendum (DPA)](https://amplitude.com/dpa) and independent audits. Customers who aren't comfortable with LLMs can choose to opt out of Amplitude’s AI features. Opting out disables all Amplitude AI features in your account, including Agents. For more information about the security and privacy for Amplitide’s AI features, view Amplitude's [Trust, Security, and Privacy](https://amplitude.com/trust) page.

## How Agents use data

Amplitude Agents pull context from assets that already live in your Amplitude account (for example, analytics charts, experiments, session replays, or guides/surveys) to answer questions and recommend actions. Agents use only the minimum context needed for each task and keep that context scoped to your organization’s tenant.

## Tenant isolation and access boundaries

Amplitude isolates each customer’s agent context and keeps it separate from other customers. Agents operate within your authenticated Amplitude organization and honor your existing access controls and data governance, including which projects, dashboards, and datasets users can access.

## Third‑party LLM usage 

Agents are powered by third‑party LLMs (OpenAI, Claude via AWS Bedrock and Google Vertex, and Google Gemini). Amplitude’s contracts with these LLMs prohibit them from using your data to train or improve their models. Instead, Amplitude instructs the models with Amplitude‑authored prompts and best practices, and Agents build customer‑specific context that stays within your tenant. Amplitude keeps that context separate and prevents any cross‑customer use.

## Data‑flow overview (high‑level)

Agent interactions start in the Agents UI and route through Amplitude’s internal services. These services invoke Amplitude tools (for example, analytics query endpoints) and, when applicable, calls an LLM endpoint. Outputs return to the authenticated user and can notify Slack or email per your configuration.

## Security and Privacy

Amplitude applies the same enterprise-grade security, privacy, and governance controls to Agents that Amplitude uses across the rest of the platform. The LLMs that Agents uses (OpenAI, Claude via AWS Bedrock and Google Vertex, and Google Gemini) sign enterprise-level agreements with Amplitude and must meet security measures at least as protective as Amplitude's.

Amplitude’s DPA covers Agents by ensuring that any of your data an agent processes is done in compliance with applicable privacy laws. Amplitude maintains SOC 2 Type 2, ISO 27001, and ISO 27018 certifications that cover platform services used by Agents. 

## Data retention and deletion

Amplitude has implemented zero data retention protocols with the LLMs that power Agents. This ensures that none of your data is retained by any third-party LLM outside of Amplitude’s secure AWS environment. 

Customers control data retention within their Amplitude account and can delete data from their Amplitude account at any time using Amplitude’s deletion tools. These platform controls extend to Agents so customers can align their Agent usage with their internal data governance.

## EU data residency 

If your organization is provisioned in Amplitude’s EU data center, your data never leaves the EU when using Amplitude’s AI features, including Agents. When you use Agents, the data is processed entirely within the EU and isn't transferred to LLMs in the United States.  
