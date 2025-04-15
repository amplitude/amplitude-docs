---
id: 9efa3729-a771-4659-ab24-710758c53755
title: 'Proxy requests to G&S with AWS CloudFront'
exclude_from_sitemap: false
---

Set up a single CloudFront distribution to reverse proxy both static assets and G&S API traffic. This can help circumvent domain blocking in certain regions or by specific extensions and DNS servers. Because G&S APIs and static assets are latency-sensitive, Amplitude recommends using edge-hosted solutions to minimize round-trip time.

## Create a unified CloudFront distribution

This setup uses **one CloudFront distribution** with **two origins** and **two cache behaviors**:

- The **default origin** proxies `cdn.amplitude.com` for static SDK assets.
- A **secondary origin** proxies `gs.amplitude.com` or `gs.eu.amplitude.com` for API requests prefixed with `/sdk/`.

### Step-by-step configuration

1. In AWS, go to **CloudFront** and click **Create distribution**.

#### Default Origin (CDN)

2. Under **Origin settings**, configure the first origin:

   - **Origin domain**: `cdn.amplitude.com` for the US data center, or `cdn.eu.amplitude.com` for the EU data center
   - **Allowed HTTP methods**: `GET, HEAD, OPTIONS`
        - **Cache HTTP methods**: `OPTIONS`
   - **Cache policy**: Choose a suitable caching policy for static assets (e.g., `CachingOptimized`)
   - **Origin request policy**: `AllViewerExceptHostHeader`
   - **Response headers policy**: `CORS-with-preflight-and-SecurityHeadersPolicy`
   - **Web Application Firewall (WAF)**: Do not enable security protections.

#### Adding a second Origin (G&S API)

3. Navigate to the 'Origins' tab and click **Create origin**:

   - **Origin domain**:
     - `gs.amplitude.com` for the US data center, or
     - `gs.eu.amplitude.com` for the EU data center

#### Behavior for `/sdk/*`

4. Navigate to the 'Behaviors' tab and click **Create behavior**:

   - **Path pattern**: `/sdk/*`
   - **Origin**: Select `gs.amplitude.com` or `gs.eu.amplitude.com`
   - **Allowed HTTP methods**: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
        - **Cache HTTP methods**: `OPTIONS`
   - **Cache policy**: `CachingDisabled`
   - **Origin request policy**: `AllViewerExceptHostHeader`
   - **Response headers policy**: `CORS-with-preflight-and-SecurityHeadersPolicy`

## Testing the proxy

Once the distribution is deployed, test both the API and CDN paths to ensure requests are routed to the correct origins.

### Test the G&S API

Replace `SUBDOMAIN` with the CloudFront domain name and `APIKEY` with your project’s API key.

```bash
curl -i 'https://SUBDOMAIN.cloudfront.net/sdk/v1/decide' -H 'Authorization: Api-Key APIKEY'
```

A successful response will return HTTP status 200 OK.

### Test the CDN

```bash
curl -I 'https://SUBDOMAIN.cloudfront.net/engagement-browser/prod/index.min.js.gz'
```

A successful response will return HTTP status 200 OK.

## Initialize the SDK with the proxy

Point both serverUrl and cdnUrl to the same CloudFront domain:

```js
engagement.init("API_KEY", {
  serverUrl: "https://SUBDOMAIN.cloudfront.net",
  cdnUrl: "https://SUBDOMAIN.cloudfront.net"
});
```
