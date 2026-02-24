---
id: b8e4f1a2-3c5d-4e6f-7890-abcdef123456
blueprint: admin
title: 'Audit log'
landing: false
exclude_from_sitemap: false
---

The Audit Log is a security and compliance feature that lets organization admins monitor and track key security events and user actions across their Amplitude organization. It contains detils about the specifics of user actions, who those users are, when they performed those ctions, and where those actions were performed.

## Tracked events by category
The Audit Log tracks the following events: 

### High-risk events

**Project and configuration**

- Project creation, updates (permissions), and deletion.
- Project data export.

### Medium-risk events

**User management**

- User invitations.
- Role updates to or from Admin.
- Role permission changes.
- Create, update, or delete roles.
- User exports.
- Access toggles (for example, request access).
- Bulk access transfers or edits.
- User deletions.

**Groups and access control**

- Group creation and member updates.
- SSO configuration changes (settings updates, toggles such as "require SSO").

### Low-risk events

**Authentication**

- Login through SSO, magic link, or password.
- Registration events.
- Password reset attempts.

**Content management**

- Chart, dashboard, or notebook deletion.

## Data captured per event

Each audit log entry includes:

- **Timestamp**: When the action occurred.
- **Domain**: Category (for example, content, config, group).
- **Feature**: Sub-category (for example, chart, user, group).
- **Action**: What was done (create, delete, update, invite, and so on).
- **Target**: The entity affected by the action.
- **User (Email)**: Who performed the action.
- **Org ID**: Which organization the action belongs to.
- **App/Project ID**: Associated project (if relevant).
- **IP Address**: The IP address of the user who performed the action.
- **User Agent**: The browser or client info.
- **Event Properties**: Additional context specific to the event (JSON).
- **Error**: Error information if the action failed.

{{partial:admonition type="note" heading="Availability through the API"}}
You can only acceew IP address, Org ID, User Agent, and Error metadata through the API endpoint, not the UI CSV export.
{{/partial:admonition}}

## Key behaviors and notes

- Audit logs retain up to 90 days of data.
- Audit logging is asynchronous and doesn't block the user's original action.
- Amplitude captures events automatically; you don't need to add instrumentation.
- The audit log is scoped to the organization.
  - Admins can access events across all projects in their org.
- You can search audit logs by user email in the UI.
- Audit logs are available in all production environments, including US and EU.

## Accessing audit logs

You can access audit logs in two ways: from the Organization Settings page in Amplitude, or through the [Audit Logs API](/docs/apis/audit-logs).

### Access audit logs in the UI

1. Navigate to *Organization Settings*.
2. Select the **Audit Logs** tab.

Only organization admins can access the Audit Log menu item.

#### Summary cards

At the top of the Audit Logs view, summary cards show (for the time period selected in the datepicker):

- **All Events**: Total count of logged events.
- **High Risk Event**: Total count of high-risk activity.
- **Medium Events**: Total count of medium-risk events.

#### High-risk events table

A filtered table shows only high-risk security events, such as promoting a user to org admin or updating organization link settings. This table is searchable and sortable.

#### Controls

- **Refresh**: Reload the latest audit log data.
- **Export CSV**: Download all raw audit log data as a CSV file for offline analysis or compliance archival.

### Access audit logs through the API

For programmatic access to the full and raw audit log, use the REST API endpoint to query and download raw audit logs.

#### Obtain an org secret key

Before you use the API, request an organization secret key. Contact [Amplitude Customer Support](https://gethelp.amplitude.com/hc/en-us/categories/26943798330267-Amplitude-Technical-Support) and provide your organization ID. After Support generates your key, you can use it to authenticate and download audit logs securely.

#### Make the API request

**Endpoint:**

```
POST https://amplitude.com/api/2/audit-logs/<ORG_ID>
```

**Example request:**

```bash
curl -X POST "https://amplitude.com/api/2/audit-logs/76273" \
  -H "Authorization: Basic Base64<ORG_API_KEY:ORG_SECRET_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "start_date": "2025-11-01T00:00:00Z",
    "end_date": "2025-11-10T23:59:59Z",
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

| Parameter | Required | Description |
|-----------|----------|-------------|
| `start_date` | Yes | Start of the date range in ISO 8601 format. |
| `end_date` | Yes | End of the date range in ISO 8601 format. |

All other fields (`filters`, `pagination`) are optional and refine your query.

#### API limitations

- Maximum 30-day query range for each request.
- 90-day data retention: Only the last 90 days of audit log data are available.

