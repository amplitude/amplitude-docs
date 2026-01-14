---
id: 9efa3729-a771-4659-ab24-710758c53755
title: 'Proxy requests to Guides and Surveys'
exclude_from_sitemap: false
---

Set up a single AWS CloudFront distribution to reverse proxy both static assets and Guides and Surveys API traffic. This may help circumvent domain blocking in certain regions or by specific extensions and DNS servers. Guides and Surveys APIs and static assets are latency-sensitive, as a result Amplitude recommends using edge-hosted solutions to minimize round-trip time.

## Create a unified CloudFront distribution

This setup uses one CloudFront distribution with three origins and three cache behaviors:

- The **default origin** proxies `cdn.amplitude.com` or `cdn.eu.amplitude.com` for static SDK assets.
- A **secondary origin** proxies `gs.amplitude.com` or `gs.eu.amplitude.com` for API requests prefixed with `/sdk/`.
- A **third origin** proxies `engagement-static.amplitude.com` or `engagement-static.eu.amplitude.com` for nudge images using a wildcard pattern.

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

3. Add a second origin for the Guides and Surveys API. Navigate to the _Origins_ tab and click **Create origin**:

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

   {{partial:admonition type="warning"}}
   Use the wildcard pattern `/sdk/*` exactly as shown. Don't hard code a list of specific paths like `/sdk/config`. The Guides and Surveys SDK makes requests to multiple endpoints under the `/sdk/` path, including `/sdk/admin/config` for preview mode functionality. Using specific paths instead of the wildcard pattern causes some features to fail.
   {{/partial:admonition}}

5. Add a third origin for nudge images. Navigate to the _Origins_ tab and click **Create origin**:

   - **Origin domain**:
     - `engagement-static.amplitude.com` for the US data center
     - `engagement-static.eu.amplitude.com` for the EU data center

6. Navigate to the 'Behaviors' tab and click **Create behavior**:

   - **Path pattern**: `*`
   - **Origin**: Select `engagement-static.amplitude.com` or `engagement-static.eu.amplitude.com`
   - **Allowed HTTP methods**: `GET, HEAD, OPTIONS`
     - **Cache HTTP methods**: `OPTIONS`
   - **Cache policy**: Choose a suitable caching policy for static assets (for example, `CachingOptimized`)
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

Point `serverUrl`, `cdnUrl`, and `mediaUrl` to the same CloudFront domain:

```js
engagement.init("API_KEY", {
  serverUrl: "https://SUBDOMAIN.cloudfront.net",
  cdnUrl: "https://SUBDOMAIN.cloudfront.net",
  mediaUrl: "https://SUBDOMAIN.cloudfront.net",
});
```

The `mediaUrl` parameter ensures that images used in nudges are also proxied through your CloudFront distribution. This prevents images from failing to load when customer domains block requests to `engagement-static.amplitude.com`.

## Troubleshooting common proxy issues

| Issue                                              | Symptoms                                                                             | Cause                                                                                                                                                                                    | Solution                                                                                                                                                                                                                                                                                                                                                                                                                        |
| -------------------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Preview mode doesn't work                          | Preview mode fails to load or display guides properly                                | Path pattern configured with specific paths instead of wildcard pattern `/sdk/*` (for example, using `/sdk/config`)                                                                      | Set the path pattern to `/sdk/*` exactly as specified in step 4. Preview mode makes requests to `/sdk/admin/config`, which won't be proxied with specific paths.                                                                                                                                                                                                                                                                |
| Guides don't persist dismissal or completion state | Guides reappear on the next session even after the user dismisses or completes them. | Cause 1: Allowed HTTP methods don't include `POST`, which Guides and Surveys requires for state updates.<br>Cause 2: the origin request policy isn't `AllViewerExceptHostHeader`         | Solution 1: Verify that allowed HTTP methods in step 4 include `POST` along with other required methods: `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE`. Without POST, the SDK can't send requests to the `/state` endpoint to update user interaction state.<br>Solution 2: Ensure the origin request policy is `AllViewerExceptHostHeader`. `POST` requests will fail if the host header is overridden with an invalid value. |
| Images don't load in nudges                        | Images in guides appear as broken or missing, showing placeholder icons instead      | Cause 1: `mediaUrl` parameter not configured in SDK initialization.<br>Cause 2: Missing wildcard `*` cache behavior for image origin.<br>Cause 3: Image origin not configured correctly. | Solution 1: Add `mediaUrl: "https://SUBDOMAIN.cloudfront.net"` to your SDK initialization.<br>Solution 2: Ensure you've created a wildcard `*` cache behavior pointing to the `engagement-static.amplitude.com` or `engagement-static.eu.amplitude.com` origin.<br>Solution 3: Verify the image origin domain matches your data center (US vs EU).                                                                              |

### General debugging steps

1. **Check CloudFront logs**: Enable logging on your CloudFront distribution to see which requests are being made and their response codes.

2. **Verify all three origins are configured**: Ensure you have the CDN origin (`cdn.amplitude.com` or `cdn.eu.amplitude.com`), the API origin (`gs.amplitude.com` or `gs.eu.amplitude.com`), and the image origin (`engagement-static.amplitude.com` or `engagement-static.eu.amplitude.com`).

3. **Test both endpoints**: Use the curl commands in the "Test the proxy" section to verify both the API and CDN paths are working correctly.

4. **Check browser network tab**: Look for failed requests in your browser's developer tools network tab, particularly 404 or 403 errors that might indicate routing issues.
