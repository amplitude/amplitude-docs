---
id: 3f8a2c5d-9e1b-4a7f-8c3e-6d0f2a5b9c4e
blueprint: session-replay
title: 'Self-host Session Replay'
landing: false
exclude_from_sitemap: false
updated_by: ac74a6d2-0226-45a6-aaa4-c33675b8ca76
updated_at: 1769723460
instrumentation_guide: false
---
Self-hosting Session Replay lets you route Session Replay data through your own infrastructure before it reaches Amplitude. This approach helps organizations that need to:

- Comply with data residency requirements.
- Bypass ad blockers or browser extensions that block requests to third-party domains.
- Meet internal security policies that require first-party data collection.
- Add custom headers or authentication to outgoing requests.

Session Replay supports self-hosting through reverse proxy configuration. You configure the SDK to send data to your proxy server, which then forwards requests to Amplitude's endpoints.

{{partial:admonition type="note" heading="Self-hosting scope"}}
Self-hosting applies to how Session Replay data is transmitted. Amplitude still processes and stores the replay data. This documentation covers routing traffic through your infrastructure, not hosting the entire Session Replay backend.
{{/partial:admonition}}

## How self-hosting works

Session Replay SDKs communicate with two types of Amplitude endpoints:

1. **Data ingestion endpoints**: Receive captured replay data from the SDK.
2. **Remote configuration endpoints**: Provide settings like sample rate to the SDK.

When you configure self-hosting, your proxy server intercepts requests from the SDK and forwards them to Amplitude. This makes all traffic appear to originate from your domain.

```text
┌─────────────┐    ┌──────────────┐    ┌─────────────────────┐
│   Browser   │───▶│ Your Proxy   │───▶│ Amplitude Endpoints │
│   (SDK)     │    │   Server     │    │                     │
└─────────────┘    └──────────────┘    └─────────────────────┘
```

## SDK configuration

Both the Session Replay Browser SDK Plugin and Standalone SDK support the following configuration options for self-hosting:

| Option | Type | Description |
| ------ | ---- | ----------- |
| `trackServerUrl` | `string` | The URL where the SDK sends replay data. This overrides the default data ingestion endpoint. |
| `configServerUrl` | `string` | The URL where the SDK fetches remote configuration. This overrides the default configuration endpoint. |

### Browser SDK Plugin example

```js
import * as amplitude from '@amplitude/analytics-browser';
import { sessionReplayPlugin } from '@amplitude/plugin-session-replay-browser';

const sessionReplayTracking = sessionReplayPlugin({
  trackServerUrl: 'https://your-proxy.example.com/sessions/v2/track',
  configServerUrl: 'https://your-proxy.example.com/config',
  sampleRate: 0.1
});

amplitude.add(sessionReplayTracking);
amplitude.init(API_KEY);
```

### Standalone SDK example

```js
import * as sessionReplay from "@amplitude/session-replay-browser";

await sessionReplay.init(AMPLITUDE_API_KEY, {
  deviceId: "<device-id>",
  sessionId: Date.now(),
  trackServerUrl: 'https://your-proxy.example.com/sessions/v2/track',
  configServerUrl: 'https://your-proxy.example.com/config',
  sampleRate: 0.1
}).promise;
```

### Mobile SDK example (iOS)

For iOS standalone SDK, use the `serverUrl` configuration option:

```swift
let sessionReplay = SessionReplay(apiKey: API_KEY,
                                   deviceId: DEVICE_ID,
                                   sessionId: SESSION_ID,
                                   serverUrl: "https://your-proxy.example.com",
                                   sampleRate: 0.1)
```

## Amplitude API endpoints

Your proxy server must forward requests to the appropriate Amplitude endpoints based on your data center region.

### Data ingestion endpoints

| Region | Endpoint |
| ------ | -------- |
| US (default) | `https://api-sr.amplitude.com/sessions/v2/track` |
| EU | `https://api-sr.eu.amplitude.com/sessions/v2/track` |

### Remote configuration endpoints

| Region | Endpoint |
| ------ | -------- |
| US (default) | `https://sr-client-cfg.amplitude.com/config` |
| EU | `https://sr-client-cfg.eu.amplitude.com/config` |

## Proxy setup options

Choose a proxy solution based on your infrastructure and requirements.

### AWS CloudFront

AWS CloudFront provides a globally distributed edge network that minimizes latency. This is the recommended approach for most organizations.

#### Create a CloudFront distribution

1. In AWS, open **CloudFront** and select **Create distribution**.

2. Configure the origin for data ingestion:
   - **Origin domain**: `api-sr.amplitude.com` for US, or `api-sr.eu.amplitude.com` for EU.
   - **Protocol**: HTTPS only.
   - **Minimum origin SSL protocol**: TLSv1.2.

3. Configure the default cache behavior:
   - **Allowed HTTP methods**: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`.
   - **Cache HTTP methods**: Select `OPTIONS`.
   - **Cache policy**: `CachingDisabled` (replay data shouldn't be cached).
   - **Origin request policy**: `AllViewerExceptHostHeader`.
   - **Response headers policy**: `CORS-with-preflight-and-SecurityHeadersPolicy`.

4. Complete the distribution creation and note the CloudFront domain (for example, `d1234abcdef8.cloudfront.net`).

#### Add remote configuration origin

1. Navigate to your distribution's **Origins** tab and select **Create origin**.
   - **Origin domain**: `sr-client-cfg.amplitude.com` for US, or `sr-client-cfg.eu.amplitude.com` for EU.

2. Navigate to the **Behaviors** tab and select **Create behavior**.
   - **Path pattern**: `/config*`.
   - **Origin**: Select the remote configuration origin you created.
   - **Allowed HTTP methods**: `GET, HEAD, OPTIONS`.
   - **Cache policy**: `CachingDisabled` (configuration should always be fresh).
   - **Origin request policy**: `AllViewerExceptHostHeader`.

#### Configure the SDK

Point the SDK to your CloudFront distribution:

```js
const sessionReplayTracking = sessionReplayPlugin({
  trackServerUrl: 'https://d1234abcdef8.cloudfront.net/sessions/v2/track',
  configServerUrl: 'https://d1234abcdef8.cloudfront.net/config',
  sampleRate: 0.1
});
```

### Nginx

Nginx provides a lightweight reverse proxy option for organizations that prefer self-managed infrastructure.

#### Nginx configuration

```nginx
upstream amplitude_replay {
    server api-sr.amplitude.com:443;
    keepalive 32;
}

upstream amplitude_config {
    server sr-client-cfg.amplitude.com:443;
    keepalive 32;
}

server {
    listen 443 ssl;
    server_name your-proxy.example.com;

    ssl_certificate /path/to/certificate.pem;
    ssl_certificate_key /path/to/private-key.pem;

    # Data ingestion endpoint
    location /sessions/v2/track {
        proxy_pass https://amplitude_replay;
        proxy_ssl_server_name on;
        proxy_set_header Host api-sr.amplitude.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers
        add_header Access-Control-Allow-Origin $http_origin always;
        add_header Access-Control-Allow-Methods "GET, POST, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        
        if ($request_method = OPTIONS) {
            return 204;
        }
    }

    # Remote configuration endpoint
    location /config {
        proxy_pass https://amplitude_config;
        proxy_ssl_server_name on;
        proxy_set_header Host sr-client-cfg.amplitude.com;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers
        add_header Access-Control-Allow-Origin $http_origin always;
        add_header Access-Control-Allow-Methods "GET, OPTIONS" always;
        add_header Access-Control-Allow-Headers "Content-Type, Authorization" always;
        
        if ($request_method = OPTIONS) {
            return 204;
        }
    }
}
```

For EU data residency, replace the upstream servers:
- `api-sr.amplitude.com` → `api-sr.eu.amplitude.com`
- `sr-client-cfg.amplitude.com` → `sr-client-cfg.eu.amplitude.com`

### Node.js Express proxy

For development or testing, you can use a simple Node.js proxy:

```js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Proxy replay data to Amplitude
app.use('/sessions', createProxyMiddleware({
  target: 'https://api-sr.amplitude.com',
  changeOrigin: true,
  secure: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Host', 'api-sr.amplitude.com');
  }
}));

// Proxy remote configuration requests
app.use('/config', createProxyMiddleware({
  target: 'https://sr-client-cfg.amplitude.com',
  changeOrigin: true,
  secure: true,
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('Host', 'sr-client-cfg.amplitude.com');
  }
}));

app.listen(3000, () => {
  console.log('Proxy server running on port 3000');
});
```

## Test your proxy

After configuring your proxy, verify that it correctly forwards requests to Amplitude.

### Test data ingestion endpoint

Send a test request to validate the data ingestion path:

```bash
curl -i -X POST 'https://your-proxy.example.com/sessions/v2/track' \
  -H 'Content-Type: application/json' \
  -d '{}'
```

A successful configuration returns a response from Amplitude (the specific response depends on the request content).

### Test remote configuration endpoint

Verify the configuration endpoint works:

```bash
curl -i 'https://your-proxy.example.com/config?api_key=YOUR_API_KEY'
```

A successful response returns HTTP status `200 OK` with JSON configuration data.

## Content Security Policy (CSP)

If your application uses a Content Security Policy, update the `connect-src` directive to include your proxy domain instead of Amplitude's domains:

```text
Content-Security-Policy: connect-src 'self' https://your-proxy.example.com;
```

For applications using web workers with Session Replay, also include:

```text
Content-Security-Policy: connect-src 'self' https://your-proxy.example.com; worker-src 'self' blob:;
```

## Troubleshooting

### Replays don't appear in Amplitude

| Issue | Possible cause | Solution |
| ----- | -------------- | -------- |
| No replays captured | Proxy not forwarding requests correctly. | Check proxy logs for errors. Verify the upstream endpoint is correct. |
| 403 Forbidden errors | Missing or incorrect headers. | Ensure the `Host` header is set to the Amplitude endpoint, not your proxy domain. |
| CORS errors in browser | Proxy isn't returning CORS headers. | Add `Access-Control-Allow-Origin` and related headers to proxy responses. |
| SSL/TLS errors | Certificate issues with proxy or upstream. | Verify SSL certificates are valid and properly configured. |

### Configuration changes don't apply

If sample rate or other remote configuration changes don't take effect:

1. Verify the `configServerUrl` points to the correct proxy path.
2. Check that the proxy forwards requests to `sr-client-cfg.amplitude.com` (or EU equivalent).
3. Ensure the proxy isn't caching configuration responses.

### Debug proxy traffic

Enable verbose logging in your proxy to inspect requests:

**Nginx**: Add `error_log /var/log/nginx/debug.log debug;` to your server block.

**CloudFront**: Enable standard or real-time logs in your distribution settings.

### Verify SDK configuration

Enable debug mode in the SDK to see detailed logs:

```js
const sessionReplayTracking = sessionReplayPlugin({
  trackServerUrl: 'https://your-proxy.example.com/sessions/v2/track',
  configServerUrl: 'https://your-proxy.example.com/config',
  debugMode: true,
  sampleRate: 1.0
});
```

Check the browser console for Session Replay debug messages that indicate where data is being sent.