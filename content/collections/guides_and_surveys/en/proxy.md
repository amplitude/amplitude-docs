---
id: 9efa3729-a771-4659-ab24-710758c53755
title: 'Proxy requests to Guides and Surveys'
exclude_from_sitemap: false
---

Set up a single AWS CloudFront distribution to reverse proxy both static assets and Guides and Surveys API traffic. This may help circumvent domain blocking in certain regions or by specific extensions and DNS servers. Guides and Surveys APIs and static assets are latency-sensitive, as a result Amplitude recommends using edge-hosted solutions to minimize round-trip time.

## Create a unified CloudFront distribution

This setup uses one CloudFront distribution with two origins and two cache behaviors:

- The **default origin** proxies `cdn.amplitude.com` or `cdn.eu.amplitude.com` for static SDK assets.
- A **secondary origin** proxies `gs.amplitude.com` or `gs.eu.amplitude.com` for API requests prefixed with `/sdk/`.

### Step-by-step configuration

1. In AWS, open **CloudFront** and click **Create CloudFront distribution**.

2. Configure the first origin:

   - **Origin domain**: `cdn.amplitude.com` for the US data center, or `cdn.eu.amplitude.com` for the EU data center
   - **Allowed HTTP methods**: `GET, HEAD, OPTIONS`
        - **Cache HTTP methods**: `OPTIONS`
   - **Cache policy**: Choose a suitable caching policy for static assets (for example, `CachingOptimized`)
   - **Origin request policy**: `AllViewerExceptHostHeader`
   - **Response headers policy**: `CORS-with-preflight-and-SecurityHeadersPolicy`
   - **Web Application Firewall (WAF)**: Don't enable security protections.
  
   Click **Create distribution**

3. Add a second origin for the Guides and Surveys API. Navigate to the *Origins* tab and click **Create origin**:

   - **Origin domain**:
     - `gs.amplitude.com` for the US data center, or
     - `gs.eu.amplitude.com` for the EU data center

4. Navigate to the 'Behaviors' tab and click **Create behavior**:

   - **Path pattern**: `/sdk/*`
   - **Origin**: Select `gs.amplitude.com` or `gs.eu.amplitude.com`
   - **Allowed HTTP methods**: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`
        - **Cache HTTP methods**: `OPTIONS`
   - **Cache policy**: `CachingDisabled`
   - **Origin request policy**: `AllViewerExceptHostHeader`
   - **Response headers policy**: `CORS-with-preflight-and-SecurityHeadersPolicy`

## Test the proxy

After AWS deploys the distribution, test both the API and CDN paths to ensure that requests route to the correct origins.

### Test the Guides and Surveys API

Replace `SUBDOMAIN` with the CloudFront domain name and `APIKEY` with your project’s API key.

```bash
curl -i 'https://SUBDOMAIN.cloudfront.net/sdk/v1/decide' -H 'Authorization: Api-Key APIKEY'
```

A successful response returns HTTP status `200 OK`.

### Test the CDN

```bash
curl -I 'https://SUBDOMAIN.cloudfront.net/engagement-browser/prod/index.min.js.gz'
```

A successful response returns HTTP status `200 OK`.

## Initialize the SDK with the proxy

Point both `serverUrl` and `cdnUrl` to the same CloudFront domain:

```js
engagement.init("API_KEY", {
  serverUrl: "https://SUBDOMAIN.cloudfront.net",
  cdnUrl: "https://SUBDOMAIN.cloudfront.net"
});
```
