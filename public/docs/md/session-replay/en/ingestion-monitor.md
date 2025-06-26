---
id: ca7fddb3-2ba6-4d57-a943-cfaa9d2651c0
blueprint: session-replay
title: 'Ingestion Monitor'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1714506320
source: https://www.docs.developers.amplitude.com/session-replay/ingestion-monitor/
---
To help debug issues with your Session Replay implementation, Amplitude provides an Ingestion Monitor tool that tracks Session Replay status over time.

Access the Ingestion Monitor from:

- The top-right of the Session Replay section of your project's __Users & Sessions__ tab.
- Any individual replay that displays an error.

### Tracked statuses

Ingestion Monitor displays charts that show the count of the following status over a time range that you select:

- Successful request (status 200)
- Throttling errors (status 429)
- Quota exceeded errors (status 402)
- Invalid session IDs

Use the information in these graphs to help debug the cause of unavailable session replays and monitor the health of your Session Replay implementation.