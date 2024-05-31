---
id: adaff2f2-ddd7-41b5-af79-7e0fe0c599a9
blueprint: advanced-technique
title: 'Proxy requests to Experiment with AWS Cloudfront'
source: 'https://www.docs.developers.amplitude.com/experiment/guides/aws-cloudfront-proxy/'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717178910
---
Set up a reverse proxy to circumvent domain blocking in particular regions or by certain extensions and DNS servers. Because experiment APIs are latency sensitive, Amplitude recommends approach using an edge hosted solution to minimize the round trip time from the proxy to Amplitude.

## Create a distribution

Follow these steps to create a new CloudFront distribution to proxy requests to Amplitude Experiment's evaluation servers. Any configuration field not explicitly mentioned in any steps can be left with the default value.

1. In AWS, navigate to CloudFront and click **Create distribution**.
2. In the **Origin domain** field, enter `api.lab.amplitude.com` for the US data center or `api.lab.eu.amplitude.com` for the EU data center.
3. In the **Default cache behavior** section, select `GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE` as the **Allowed HTTP methods** and `OPTIONS` as the **Cache HTTP methods** value. **Cache HTTP methods** appears when you select the **Allowed HTTP methods** value.
4. In the **Cache key and origin requests** section, select the `CachingDisabled` cache policy, the `AllViewExceptHostHeader` origin request policy, and the `CORS-with-preflight-and-SecurityHeadersPolicy` response headers policy. The above selections require that you choose **Cache policy and origin request policy (recommended)** rather than **Legacy cache settings**.
5. In the **Web Application Firewall (WAF)** section, select **Do not enable security protections**.
6. Click **Create distribution**.

## Testing the distribution

Test the new distribution with `curl` request. To find the distribution domain name, select the new distribution from the list in CloudFront, copy the subdomain, and replace the `SUBDOMAIN` in the following curl. Then replace `APIKEY` with your deployment or project API key to authorize the request.

Successful requests return a `200` response.

```bash
curl -i 'https://SUBDOMAIN.cloudfront.net/v1/vardata' -H 'Authorization: Api-Key APIKEY'
```