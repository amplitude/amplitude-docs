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
## Troubleshooting

### Short or incomplete replays

If you see short replays (less than 10 seconds) or replays that appear incomplete, check the Ingestion Monitor for 429 throttling errors.

429 errors mean your application sends too many Session Replay requests. Amplitude throttles these requests, and because replays consist of multiple chunks of data, some chunks may not send successfully. This causes incomplete or unusually short replays.

To resolve this:

1. Reduce your Session Replay sample rate to lower the number of requests your application sends per second.
2. Monitor the 429 error count in the Ingestion Monitor to confirm throttling errors decrease after you adjust the sample rate.