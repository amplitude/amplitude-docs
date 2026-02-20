---
id: 6f75ddb8-9de6-4897-bcd8-76adf53c03f1
blueprint: api
title: 'Audit Logs API'
this_article_will_help_you:
  - 'Request access to the Audit Logs API.'
  - 'Retrieve audit events for security and compliance workflows.'
landing: false
exclude_from_sitemap: false
updated_by:
updated_at:
---

The Audit Logs API lets you programmatically access and export audit events for security monitoring, compliance reporting, and operational oversight.

## Prerequisites

- Access to an Organization API key.
- An Organization Secret Key from Amplitude Support.
- Your Organization ID.

## Retrieve audit events

Use the Audit Logs API to retrieve audit events and export them to a SIEM or internal workflow.

1. Contact Amplitude Support and request an Organization Secret Key.
2. Provide your Organization ID to Amplitude Support.
3. Locate your Organization API key in *Organization settings > API Keys*.
4. Send a request to the Audit Logs API endpoint: `POST https://amplitude.com/api/2/audit-logs/{ORG_ID}`.
5. Use Basic authentication with your Organization API key and Organization Secret Key.

Amplitude returns audit events for the organization in the response.

### Example request

```bash
curl -X POST "https://amplitude.com/api/2/audit-logs/76273" \
  -H "Authorization: Basic Base64<ORG_API_KEY:ORG_SECRET_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "start_date": "2026-01-01T00:00:00Z",
    "end_date": "2026-01-10T23:59:59Z",
    "filters": {
      "domain": "auth",
      "feature": "login",
      "action": "success"
    },
    "pagination": {
      "limit": 100
    }
  }'
```

#### Required parameters

- `start_date` (required): The start of the date range in ISO 8601 format.
- `end_date` (required): The end of the date range in ISO 8601 format.

All other fields are optional and refine your query. The API supports a maximum query range of 30 days, and Amplitude retains data for 90 days.

## Common use cases

### Integrate with a SIEM

Export audit events to your SIEM to monitor administrative activity and detect anomalous access patterns.

### Support compliance reporting

Collect audit events to support compliance workflows, such as SOC 2, ISO 27001, and HIPAA reporting.

### Investigate security incidents

Review audit events to trace administrative actions and support forensic investigations.

## Common questions

### Get an Organization Secret Key

Contact Amplitude Support and provide your Organization ID. Amplitude Support issues the Organization Secret Key.

### EU endpoint availability

No. The Audit Logs API uses `https://amplitude.com` for all requests.

## Related resources

- [Manage your API keys and secret keys](/docs/admin/account-management/manage-your-api-keys-and-secret-keys)
- [API authentication](/docs/apis/authentication)
- [Keys and tokens](/docs/apis/keys-and-tokens)
