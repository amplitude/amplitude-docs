---
id: a850a054-935c-4f90-9142-b950c87e533b
blueprint: api
title: 'Session Replay API'
auth_method: http_basic
standard_endpoint: 'https://amplitude.com/api/1/session-replays'
api_status: beta
lede: 'Use the Session Replay API to list session replays and retrieve the event files for a specific replay.'
summary: 'List session replays and retrieve replay event files.'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1741046400
hide_from_search: true
---

## Considerations

- All endpoints use HTTP Basic auth. Use your project's API key as the username and secret key as the password.
- No `project_id` parameter is needed because the authenticated API key carries the project inference.
- Presigned file URLs expire after 15 minutes.
- Pagination cursors are opaque strings. Don't construct or modify them. Use `next_page_token` from the previous response as-is.
- The `sort_order` parameter must be consistent across all pages of a paginated request. Passing a `page_token` from an `asc` request with `sort_order=desc` returns a 400 error.

## List session replays

Returns a paginated list of session replays for the authenticated project.

`GET https://amplitude.com/api/1/session-replays`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location 'https://amplitude.com/api/1/session-replays' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/1/session-replays HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: List replays with filters and descending sort"}}
{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location 'https://amplitude.com/api/1/session-replays?start_time=2024-01-01T00%3A00%3A00Z&end_time=2024-01-31T23%3A59%3A59Z&page_size=25&sort_order=desc' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/1/session-replays?start_time=2024-01-01T00%3A00%3A00Z&end_time=2024-01-31T23%3A59%3A59Z&page_size=25&sort_order=desc HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

| Name | Description |
|---|---|
| `start_time` | Optional. ISO 8601 string. Lower bound on replay `start_time`, inclusive. For example, `2024-01-01T00:00:00Z`. |
| `end_time` | Optional. ISO 8601 string. Upper bound on replay `start_time`, inclusive. For example, `2024-01-31T23:59:59Z`. |
| `page_size` | Optional. Integer. Number of results per page. Default is `50`, maximum is `200`. |
| `page_token` | Optional. String. Opaque pagination cursor from a previous response's `next_page_token`. |
| `sort_order` | Optional. String. `asc` returns oldest replays first (default). `desc` returns newest replays first. Must be consistent across pages when using `page_token`. |

### Response

```json
{
  "session_replays": [
    {
      "replay_id": "string",
      "session_id": "string",
      "device_id": "string",
      "amplitude_id": 123456,
      "start_time": "2024-01-01T00:00:00Z",
      "end_time": "2024-01-01T00:05:00Z",
      "retention_in_days": 90
    }
  ],
  "next_page_token": "string | null"
}
```

| Property | Description |
|---|---|
| `session_replays` | Array of session replay objects. |
| `session_replays[].replay_id` | Unique identifier for the replay, in `device_id/session_id` format. Use this as the `replay_id` parameter when fetching files. |
| `session_replays[].session_id` | The session identifier. |
| `session_replays[].device_id` | The device identifier. |
| `session_replays[].amplitude_id` | The Amplitude user ID. |
| `session_replays[].start_time` | ISO 8601 timestamp of when the session started. |
| `session_replays[].end_time` | ISO 8601 timestamp of when the session ended. |
| `session_replays[].retention_in_days` | Number of days the replay data is retained. |
| `next_page_token` | Opaque cursor to pass as `page_token` to retrieve the next page. `null` when there are no more results. |

---

## Get session replay files

Returns a paginated list of presigned S3 URLs for the event files belonging to a specific replay. Each URL points to a gzip-compressed JSON array of rrweb events. Files are ordered by key, which encodes start time.

`GET https://amplitude.com/api/1/session-replays/files`

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location 'https://amplitude.com/api/1/session-replays/files?replay_id={device_id}%2F{session_id}' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/1/session-replays/files?replay_id={device_id}%2F{session_id} HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Fetch v2 files with pagination"}}
{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location 'https://amplitude.com/api/1/session-replays/files?replay_id={device_id}%2F{session_id}&version=2&page_size=50&page_token={page_token}' \
-u '{api_key}:{secret_key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/1/session-replays/files?replay_id={device_id}%2F{session_id}&version=2&page_size=50&page_token={page_token} HTTP/1.1
Host: amplitude.com
Authorization: Basic {api-key}:{secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Query parameters

| Name | Description |
|---|---|
| `replay_id` | Required. String. The replay identifier, in `device_id/session_id` format. URL-encode the `/` separator as `%2F`. |
| `version` | Optional. Integer. Recording format version. `2` or `3`. Default is `3`. |
| `page_size` | Optional. Integer. Number of files per page. Default is `100`, maximum is `1000`. |
| `page_token` | Optional. String. Opaque pagination cursor from a previous response's `next_page_token`. |

### Response

```json
{
  "files": [
    "https://s3.amazonaws.com/...presigned-url-1...",
    "https://s3.amazonaws.com/...presigned-url-2..."
  ],
  "next_page_token": "string | null"
}
```

| Property | Description |
|---|---|
| `files` | Array of presigned S3 URLs. Each URL serves a gzip-compressed JSON array of rrweb events. URLs expire after 15 minutes. |
| `next_page_token` | Opaque cursor to pass as `page_token` to retrieve the next page. `null` when there are no more files. |

## Decompress and parse replay files

The format of each file depends on the `version` you requested.

### Version 3

Each file is gzip-compressed. Decompress it to get a JSON array of [rrweb](https://github.com/amplitude/rrweb) events ready to pass to an rrweb player.

{{partial:tabs tabs="JavaScript, Python, cURL"}}
{{partial:tab name="JavaScript"}}
```javascript
async function fetchReplayEvents(fileUrl) {
  const response = await fetch(fileUrl);
  // The response is gzip-compressed; fetch decompresses automatically in browsers.
  // In Node.js 18+, use the DecompressionStream API or the zlib module.
  const buffer = await response.arrayBuffer();
  const text = new TextDecoder().decode(buffer);
  return JSON.parse(text); // array of rrweb events
}
```
{{/partial:tab}}
{{partial:tab name="Python"}}
```python
import gzip
import json
import urllib.request

def fetch_replay_events(file_url):
    with urllib.request.urlopen(file_url) as response:
        decompressed = gzip.decompress(response.read())
    return json.loads(decompressed)  # list of rrweb events
```
{{/partial:tab}}
{{partial:tab name="cURL"}}
```bash
curl -s '{presigned_url}' | gunzip | python3 -m json.tool
```
{{/partial:tab}}
{{/partial:tabs}}

The result is a JSON array of rrweb events:

```json
[
  { "type": 4, "data": { "href": "https://example.com", "width": 1440, "height": 900 }, "timestamp": 1700000000000 },
  { "type": 2, "data": { ... }, "timestamp": 1700000000050 },
  ...
]
```

### Version 2

Version 2 files require two decompression steps:

1. **gzip decompress** the file, then JSON parse → array of packed strings.
2. **zlib decompress** each string: each element is a JSON-encoded, zlib-compressed (DEFLATE) binary payload → rrweb event object.

{{partial:tabs tabs="JavaScript, Python"}}
{{partial:tab name="JavaScript"}}
```javascript
const zlib = require('zlib');

async function fetchReplayEventsV2(fileUrl) {
  const response = await fetch(fileUrl);
  const buffer = Buffer.from(await response.arrayBuffer());

  // Step 1: gzip decompress the file, then JSON parse → array of packed strings
  const packedStrings = JSON.parse(zlib.gunzipSync(buffer).toString('utf8'));

  // Step 2: unpack each string
  return packedStrings.map((packed) => {
    // Each packed string is itself a JSON string whose value is a latin1-encoded
    // binary blob of zlib-compressed event data.
    const compressedBinary = JSON.parse(packed);
    const buf = Buffer.from(compressedBinary, 'latin1');
    return JSON.parse(zlib.inflateSync(buf).toString('utf8')); // rrweb event
  });
}
```
{{/partial:tab}}
{{partial:tab name="Python"}}
```python
import gzip
import json
import zlib
import urllib.request

def fetch_replay_events_v2(file_url):
    with urllib.request.urlopen(file_url) as response:
        # Step 1: gzip decompress, then JSON parse → list of packed strings
        packed_strings = json.loads(gzip.decompress(response.read()))

    # Step 2: unpack each string
    events = []
    for packed in packed_strings:
        # Each packed string is a JSON string whose value is a latin1-encoded
        # binary blob of zlib-compressed event data.
        compressed_binary = json.loads(packed)
        buf = compressed_binary.encode('latin1')
        events.append(json.loads(zlib.decompress(buf)))
    return events
```
{{/partial:tab}}
{{/partial:tabs}}

### Playing back events

To replay a full session, fetch all files for a replay in order, unpack each one, concatenate the event arrays, and pass the result to Amplitude's [rrweb player](https://github.com/amplitude/rrweb). Use Amplitude's fork rather than upstream rrweb, as it includes fixes that may be incompatible with the upstream version.

```javascript
const events = (await Promise.all(fileUrls.map(fetchReplayEvents))).flat();
rrweb.replay({ events, root: document.getElementById('player') });
```

## Status and error codes

| Code | Description |
|---|---|
| `200 OK` | Successful request. |
| `400 Bad Request` | Invalid parameter value. Check the error message for details. |
| `401 Unauthorized` | Missing or invalid API credentials. |
| `404 Not Found` | No data found for the given `replay_id` (only returned on the first page). |
