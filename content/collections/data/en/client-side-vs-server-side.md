---
id: e738a4d5-a463-405e-aad0-665115a2b631
blueprint: data
title: 'Client-side vs Server-side'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1719856778
ai_summary: "The Amplitude technical documentation explains the differences between client-side and server-side sources, as well as third-party sources. Client-side sources run code on users' devices, while server-side sources run code on servers. Amplitude provides various SDKs for both client-side (web, mobile, game engines) and server-side (Node.js, Go, Python, Java). Third-party sources allow importing data from external platforms. Choose client-side for simple initial setup, server-side for tracking server events, a hybrid approach for both benefits, and third-party for existing data sources."
---
Client-side and server-side are terms that describe where an app's code runs: either on the user's device (client-side), or on a server (server-side). Amplitude has several types of sources to cover each of your needs. This doc primarily describes the differences between client-side and server-side sources, and gives a brief overview of third-party sources. 

Both Amplitude client-side SDKs and server-side SDKs use API endpoints. These endpoints offers flexibility for implementing custom solutions without relying on Amplitude's SDKs, especially for programming languages not supported by Amplitude's SDKs, like PHP.

| Name                                                               | API endpoints                                                                                                                 |
| ------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Analytics and Data SDKs](/docs/sdks/analytics) | [HTTP V2 API](/docs/apis/analytics/http-v2) and [Batch event upload](/docs/apis/analytics/batch-event-upload) |
| [Experiment SDKs](/docs/sdks/experiment-sdks)        | [Evaluation API](/docs/apis/experiment/experiment-evaluation-api)                                                                    |

## Client-side sources

Use client-side sources in apps that your users run on their own devices, like mobile, web browser, and desktop apps. In these types of sources, code runs on the user's device.

Amplitude's client-side sources include these SDKs:

- Web: Browser, Marketing Analytics Browser, React Native
- Mobile: Android, iOS, Unity Plugin, Flutter, React Native
- Game engine: Unity Plugin, Unreal
  
## Server-side sources

Use server-side sources in secure, multi-user environments like web servers and services that you run on your own servers. In these types of sources, code runs on the server. 

Amplitude's server-side sources include these SDKs and APIs:

- Node.js SDK
- Go SDK
- Python SDK
- Java SDK

## Third-party sources

Third-party is another kind of source. These sources let you import data from other platforms into Amplitude. These sources all require that you have an account with the third-party sources, and each have different setup requirements. You can see all third-party sources in the [Source catalog](/docs/data/source-catalog).

## How to choose

Choosing the kinds of sources you need to use can be daunting, so here's a basic guide to help you make a decision.

- **Client-side**: Choose client-side sources for the simplest initial instrumentation.
- **Server-side**: Choose server-side sources if you want track server-side events and leverage existing user data tracking workflows.
- **Hybrid**: Choose a hybrid approach that includes both client-side and server-side sources to get the benefits of simpler implementation and ability to track server-side events. 
- **Third party**: Choose these sources if you already have a third-party data layer such as ad networks or marketing automation tools.
