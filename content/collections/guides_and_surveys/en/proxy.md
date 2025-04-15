---
id: 9efa3729-a771-4659-ab24-710758c53755
blueprint: advanced-technique
title: 'Proxy requests to G&S with AWS CloudFront'
exclude_from_sitemap: false
---

Set up reverse proxies to circumvent domain blocking in particular regions or by certain extensions and DNS servers. Because G&S APIs and static assets are latency-sensitive, Amplitude recommends using edge-hosted solutions to minimize the round-trip time from the proxy to Amplitude.

## Create CloudFront distributions

You will create **two** CloudFront distributions:

- One for G&S API traffic
- One for the CDN assets (JavaScript bundles, etc.)

Any configuration field not explicitly mentioned can be left with the default value.

### 1. Proxy the G&S API

Follow these steps to create a CloudFront distribution that proxies `gs.amplitude.com` (US) or `gs.eu.amplitude.com` (EU):

1. In AWS, go to CloudFront and click **Create distribution**.
2. In the **Origin domain** field, enter:
   - `gs.amplitude.com` for the US data center, or
   - `gs.eu.amplitude.com` for the EU data center.
3. In the **Default cache behavior** section, select `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE` as the **Allowed HTTP methods** and `OPTIONS` as the **Cache HTTP methods**.
4. In **Cache key and origin requests**, select:
   - Cache policy: `CachingDisabled`
   - Origin request policy: `AllViewExceptHostHeader`
   - Response headers policy: `CORS-with-preflight-and-SecurityHeadersPolicy`
5. In the **Web Application Firewall (WAF)** section, select **Do not enable security protections**.
6. Click **Create distribution**.

### 2. Proxy the CDN

Create a second CloudFront distribution that proxies `cdn.amplitude.com`:

1. Go to CloudFront and click **Create distribution**.
2. In the **Origin domain** field, enter `cdn.amplitude.com`.
3. In the **Default cache behavior** section, select `GET, HEAD, OPTIONS` as the **Allowed HTTP methods**.
4. In **Cache key and origin requests**, select:
   - Cache policy: `CachingDisabled`
   - Origin request policy: `AllViewerExceptHostHeader`
   - Response headers policy: `CORS-with-preflight-and-SecurityHeadersPolicy`
5. In the **Web Application Firewall (WAF)** section, select **Do not enable security protections**.
6. Click **Create distribution**.

## Testing the proxies

Once the distributions are deployed, test each endpoint to ensure traffic is correctly proxied.

### Test the G&S API

Replace `API_SUBDOMAIN` with the domain name of your G&S API proxy distribution and `APIKEY` with your project’s API key.

```bash
curl -i 'https://API_SUBDOMAIN.cloudfront.net/sdk/v1/decide' -H 'Authorization: Api-Key APIKEY'
```

A successful response will return HTTP status 200.

### Test the CDN proxy

Replace `CDN_SUBDOMAIN` with the domain name of your CDN proxy distribution.

```bash
curl -I 'https://CDN_SUBDOMAIN.cloudfront.net/engagement-browser/prod/index.min.js.gz'
```

A successful response will return HTTP status 200 OK.

## Initialize the SDK with proxy URLs

To fully route SDK traffic through the proxies, pass the proxy URLs using the serverUrl and cdnUrl options in engagement.init():

```js
engagement.init("APIKEY", {
  serverUrl: "https://APISUBDOMAIN.cloudfront.net",
  cdnUrl: "https://CDNSUBDOMAIN.cloudfront.net"
});
```
