---
id: b4c5d6e7-f8a9-4b0c-8d1e-2f3a4b5c6d7e
blueprint: api
title: 'Events from Certain Regions are Not Reaching Amplitude'
standard_endpoint: none
api_status: ga
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1730000000
---
If events from users in a specific region have suddenly stopped appearing in Amplitude, the cause usually isn't your SDK setup or Amplitude's ingestion endpoints. The most common cause is DNS poisoning of our API domains. DNS Poisoning is when fake information is entered into the cache of a DNS server. This results in DNS queries producing incorrect replies, which may send users to the wrong website. 

This article explains why this happens, how to confirm it, and how to resolve the issue.

{{partial:admonition type="warning" heading="Important"}}
DNS poisoning isn't caused by Amplitude and is outside Amplitude's control. It occurs at the network level and depends on where the device is located geographically relative to Amplitude's data centers.
{{/partial:admonition}}

## Why events stop flowing

Amplitude's SDKs send event data to Amplitude's ingestion endpoints, typically:

- `https://api.amplitude.com`
- `https://api2.amplitude.com`

These domains can be subject to DNS poisoning. When that happens:

- Devices can't resolve Amplitude's ingestion domains correctly.
- Requests to Amplitude's API endpoints fail before they leave the network.
- Events from users' devices never reach Amplitude.

## How to confirm DNS poisoning

If you suspect events are being blocked:

1. **Check your event logs**: Look for a sudden drop or complete stop in events from a specific region while events from other regions stay normal.
2. **Test DNS resolution**: Try resolving `api.amplitude.com` from within the affected region. If the domain doesn't resolve correctly or points to an invalid IP, it's likely poisoned.
3. **Use a different network**: Try sending the same event from unaffected regions. If it succeeds, that further confirms the issue is region specific.

## Resolving DNS poisoning

Although you can't directly prevent DNS poisoning, you can use the following strategies so events from the affected region still reach Amplitude.

### Deploy a domain proxy to relay events for impacted regions

Set up a domain proxy within the affected region that forwards traffic to Amplitude. Then configure your SDK to send data to this proxy instead of `api.amplitude.com`.

Review [Use domain proxy to relay events](/docs/analytics/domain-proxy) for options.

#### Why the solution works

- The SDK sends events to a custom domain you control (for example, `https://analytics.yourdomain.com`).
- That domain is hosted in that region and resolves without DNS poisoning.
- The reverse proxy forwards events to Amplitude's ingestion endpoints.

{{partial:card-grid}}
{{partial:card style="plain" }}
### Pros {.js-toc-ignore}

- Minimal changes to your analytics setup.
- Events are forwarded in real time with little additional latency.
{{/partial:card}}
{{partial:card style="plain"}}
### Cons {.js-toc-ignore}

- Requires infrastructure inside the affected region (or a CDN that supports reverse proxying).
- You must maintain and secure the proxy.
{{/partial:card}}
{{/partial:card-grid}}

### Route events through your own server or API

Configure your SDK to send all data to your own server endpoint rather than directly to Amplitude. This is similar to deploying a domain proxy to relay events but this solution applies to all your events, not only the affected regions. With this solution, you get more flexibility to store data in your preferred data warehouse and integrate with Amplitude.

#### Why the solution works

- The client SDK sends events to your server (for example, `https://events.yourcompany.com`).
- Your server ingests the events and stores the data in your infrastructure (for example, in Amazon S3).
- You set up an integration (for example, Amazon S3) with Amplitude.
- Because your server isn't blocked, the data flows through even if client-side requests fail.

{{partial:card-grid}}
{{partial:card style="plain" }}
### Pros {.js-toc-ignore}

- Full control over data routing and retry logic.
- Easier to implement if you already have backend infrastructure.
{{/partial:card}}
{{partial:card style="plain"}}
### Cons {.js-toc-ignore}

- Slightly more complex data pipeline.
- Events may have additional latency depending on how you batch and forward them.
{{/partial:card}}
{{/partial:card-grid}}

## Related content

- [Use domain proxy to relay events](/docs/analytics/domain-proxy)
- [HTTP V2 API](/docs/apis/analytics/http-v2)
- [Batch event upload](/docs/apis/analytics/batch-event-upload)
