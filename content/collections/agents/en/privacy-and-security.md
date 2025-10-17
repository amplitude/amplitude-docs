---
id: 3c152fc4-e6a1-4a5f-92f6-1bc3ca7073be
blueprint: agent
title: 'Privacy and Security'
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1754519006
---
Amplitude's Agents prioritize privacy and security by design. Agents operate inside authenticated Amplitude accounts, isolate each customer’s data and agent memory, and never train third‑party models on customer data. When features use an external Large Language Model (LLM), Amplitude enforces contractual no‑training controls and supports opt‑outs, while the broader platform remains covered by Amplitude’s [Data Processing Addendum (DPA)](https://amplitude.com/dpa) and independent audits.

## How Agents use data

Amplitude Agents pull context from assets that already live in your Amplitude account (for example, analytics charts, experiments, session replays, or guides/surveys) to answer questions and recommend actions. Agents use only the minimum context needed for each task and keep that context scoped to your organization’s tenant.

## Tenant isolation and access boundaries

Amplitude isolates each customer’s agent memory and keeps it separate from other customers. Agents operate within your authenticated Amplitude organization and honor your existing access controls and data governance, including which projects, dashboards, and datasets users can access.

## No model training on customer data

Amplitude doesn't train foundation models on customer data. Amplitude instructs models with Amplitude‑authored prompts and best practices, and Agents build customer‑specific memory that stays within your tenant. Amplitude keeps that memory separate and prevents any cross‑customer use.

## Third‑party LLM usage and opt‑out controls

Some AI features use third‑party LLM endpoints (for example, OpenAI or AWS Bedrock). Amplitude’s contracts prohibit model training on your data, and organizations can opt out of OpenAI‑powered features if they want. Amplitude runs customer‑specific modeling inside Amplitude’s secure cloud environment and doesn't share those models with other customers or third parties.

## Data‑flow overview (high‑level)

Agent interactions start in the Agents UI and route through Amplitude’s internal services. These services invoke Amplitude tools (for example, analytics query endpoints) and, when applicable, calls an LLM endpoint under no‑training and opt‑out controls. Outputs return to the authenticated user and can notify Slack or email per your configuration.

## Compliance, certifications, and the DPA

Amplitude processes Customer Data as a processor under its DPA and supports customer compliance programs with independent audits. Amplitude maintains SOC 2 Type 2, ISO 27001, and ISO 27018 certifications that cover platform services used by Agents. The DPA governs security commitments and international transfer mechanisms.

## Data retention and deletion

Customers control data retention during the subscription term and can delete data using Amplitude’s deletion tools. These platform controls extend to AI features so customers can align Agent usage with their internal data governance.

## Regional processing and data residency (context for AI)

Amplitude supports regional considerations for AI features. Amplitude documents how AI subprocessors handle regional processing and provides opt‑outs for OpenAI‑powered functionality, including for customers with EU residency requirements. For more information, review [Amplitude's Security and Privacy](https://amplitude.com/security-and-privacy) page.
