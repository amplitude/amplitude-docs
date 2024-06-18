---
id: 3f525d05-80f3-4166-90d0-65e0fec16fb3
blueprint: api
title: 'Keys and Tokens'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
source: https://www.docs.developers.amplitude.com/guides/amplitude-keys-guide/
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718056101
exclude_from_sitemap: false
source: https://www.docs.developers.amplitude.com/guides/amplitude-keys-guide/
---
There are several different kinds of keys and tokens across Amplitude's products. This guide walks through what each is for, the basics you need to know about using them, and how to find them. 

## Keys overview

This table gives a brief overview of each kind of key. 

| Product    | Key                          | Public | Can it be rotated? |
| ---------- | ---------------------------- | ------ | ------------------ |
| Analytics  | Project API Key              | ✅      | ❌                  |
| Analytics  | Project Secret Key           | ❌      | Contact Support    |
| Experiment | Deployment Key (client-side) | ✅      | ✅                  |
| Experiment | Deployment Key (server-side) | ❌      | ✅                  |
| Experiment | Management API Key           | ❌      | ✅                  |
| Data       | API Token                    | ❌      | ✅                  |
| Other      | SCIM Key                     | ❌      | ✅                  |
| Other      | Org-level keys               | ❌      | Contact Support    |

## Analytics keys

Analytics keys are automatically created for each project, and can only be used to manipulate data within the project the key belongs to. 

To view your project's API Key and Secret Key, see [Authentication](/docs/apis/authentication/).

### API Key

To collect data from browsers and mobile applications, Amplitude must be able to identify which project the requests should go to. Amplitude does this with an *API Key* that's associated with a single project. 

Files sent to a browser and code distributed as part of a mobile app are shared with end users, so the API Key can't be truly secret. 

Because there's no way to keep the API Key secret, the scope of what the key can be used for is limited to the bare minimum needed to ingest data into Amplitude. This isn't unique to Amplitude: all services that support ingesting data from browsers or mobile apps have a similar key, though what they call it may vary.

{{partial:admonition type="note" heading="API keys are public"}}
API Keys are public. They aren't vulnerable to leaks or compromises.
{{/partial:admonition}}

### Secret Key

Projects also have a *Secret Key*. These are used in conjunction with the project API Key to manage your account.

{{partial:admonition type="warning" heading="Secret keys are private"}}
Keep the Secret Key private. If your Secret Key is compromised, contact Amplitude Support.
{{/partial:admonition}}

## Data keys

Use API Tokens to authenticate to Amplitude Data without logging in with your email address and a password. Tokens authorize applications to enjoy the same roles and permissions granted to you when you log in directly.

{{partial:admonition type="warning" heading="Data API tokens are private"}}
Keep your token secret. Your token has global permissions on your account.
{{/partial:admonition}}

You can create and revoke these as needed by navigating to **Data** > **Settings** > **API Tokens**. 

## Experiment keys

### Deployment Key

When you create a [deployment](/docs/experiment/data-model), Experiment creates a key for that deployment. Whether the key is public or private depends on whether the deployment is client-side or server-side.

{{partial:admonition type="tip" heading="Client-side deployment keys are public"}}
These deployments run on a client device, such as a web browser or mobile app. The key associated with client deployments can be viewed publicly and should be used in client-side SDKs. These keys are prepended with `client-`. Because this key is already public, you don't have to worry about it being compromised.
{{/partial:admonition}}

{{partial:admonition type="warning" heading="Server-side deployment keys are private"}}
These deployments run on a server you control, such as a web server or batch processing system. The key associated with server deployments should be kept secret and are for use in server-side SDKs. These keys are prepended with `server-`. If a server-side key is compromised, create a new deployment key, replace the old key with the new key on all flags and experiments, and delete the old key.
{{/partial:admonition}}

Manage your Deployment keys in **Experiment** > **Deployments**. 

### Management API Key 

Management API keys are used to authenticate requests made to manage flags and experiments. These keys are different from the deployment keys used to fetch flag variants. 

{{partial:admonition type="warning" heading="Management API keys are private"}}
Keep your Management API key secret. If your key has been compromised, create a new key and delete the old key.
{{/partial:admonition}}

Create and manage these keys via the **Management API link** in the Experiment sidebar.

## Other keys 

### Org-level API Key

Some APIs require an org-level API Key and Secret Key. You must request these from Amplitude Support. 

{{partial:admonition type="warning" heading="Org-level keys are private"}}
Keep org-level keys private. They have access to your entire Amplitude organization. If they have been compromised, contact Amplitude Support.
{{/partial:admonition}}

### SCIM Key

The SCIM key is used with the [SCIM API](/docs/apis/analytics/scim). SCIM features are available in accounts with an Enterprise plan.

{{partial:admonition type="warning" heading="SCIM tokens are secret"}}
Keep your token secret. It has global user management permissions on your account. If your key has been compromised, you can rotate it yourself in Amplitude.
{{/partial:admonition}}

See [Set up SCIM provisioning in Amplitude](/docs/admin/account-management/scim-provision) for more information.