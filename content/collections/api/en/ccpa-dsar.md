---
id: 84983d6c-24a5-4f0c-aebc-89cb22e1ab09
blueprint: api
title: 'Data Subject Access Request API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/ccpa-dsar-api/'
auth_method: http_basic
key: org
standard_endpoint: 'https://amplitude.com/api/2/dsar/requests'
eu_endpoint: 'https://analytics.eu.amplitude.com/api/2/dsar/requests'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-9debb5b3-8c58-4eed-b2e5-33f4717b9fc1?action=share&source=copy-link&creator=29131806&ctx=documentation'
lede: 'The California Consumer Privacy Act (CCPA) requires businesses to provide all data about an end user upon request. This Data Subject Access Request (DSAR) API makes it easy to retrieve all data about a user.'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715897991
---
## Considerations

- You can expect about one file per month per app for which the user has data.
- Each download URL requires the same auth credentials to access.
- Because the API is asynchronous, you must poll to check the status of the request. See the Rate Limits section to help select the appropriate polling rate.

### Asynchronous operation

To support data volume, this API works asynchronously. Getting user data happens in three steps:

1. Make a POST request, which returns a `requestId`.
2. Make a GET request using the `requestId` to check the status of the job.
3. When the job finishes, make a GET request to fetch a list of URLs from which to get the data files.

## Output

Each file is gzipped, and the contents adhere to the following rules:

- One line per event
- Each line is a JSON object
- No order guarantee

Example Output

``` json
{"amplitude_id":123456789,"app":12345,"event_time":"2020-02-15 01:00:00.123456","event_type":"first_event","server_upload_time":"2020-02-18 01:00:00.234567"}
{"amplitude_id":123456789,"app":12345,"event_time":"2020-02-15 01:00:11.345678","event_type":"second_event","server_upload_time":"2020-02-18 01:00:11.456789"}
{"amplitude_id":123456789,"app":12345,"event_time":"2020-02-15 01:02:00.123456","event_type":"third_event","server_upload_time":"2020-02-18 01:02:00.234567"}
```

## Rate limits

All DSAR endpoints share a budget of 14.4 K “cost” per hour. POST requests cost 8, and GET requests cost 1. Requests beyond this count get 429 response codes.

In general for each POST, there is typically one output file per month per project the user has events for.

For example, if you are fetching 13 months of data for a user with data in two projects, expect about 26 files.

If you need to get data for 40 users per hour, you can spend `14400 / 40 = 360` cost per request. Conservatively allocating 52 GETs for output files (twice the computed amount) and 8 for the initial POST, you can poll for the status of the request `360 - 8 - 52 = 300` times.

Given the 3 day SLA for results (4,320 minutes), this allows for checking the status every `4320 / 300 ~= 15` minutes over 3 days.
A practical use might be to have a service which runs every 20 minutes, posting 20 new requests and checking on the status of all outstanding requests.

## SLAs

- Request jobs complete within 3 days.
- Request result expires in 2 days.
- Users with more than 100k events per month aren't supported.

## Example client implementation

```python
base_url = 'https://amplitude.com/api/2/dsar/requests'
payload = {
  "amplitudeId": AMPLITUDE_ID,
  "startDate": "2019-03-01",
  "endDate": "2020-04-01"
}
headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}
auth = HTTPBasicAuth(API_KEY, SECRET_KEY)
r = requests.post(base_url, headers=headers, auth=auth, data=payload)
request_id = r.json().get('requestId')
time.sleep(POLL_DELAY)
while (True):
    r = requests.get(f'{base_url}/{request_id}', auth=auth, headers=headers)
    response = r.json()
    if response.get('status') == 'failed':
        sys.exit(1)
    if response.get('status') == 'done':
        break
    time.sleep(POLL_INTERVAL)
for url in response.get('urls'):
    r = requests.get(url, headers=headers, auth=auth, allow_redirects=True)
    index = url.split('/')[-1]
    filename = f'{AMPLITUDE_ID}-{index}.gz'
    with open(f'{OUTPUT_DIR}/{filename}','wb') as f:
        f.write(r.content)
```

## Create a request for data

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request POST 'https://amplitude.com/api/2/dsar/requests' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
-u '{org-api-key}:{org-secret-key}' \
--data-raw '{
"userId": "12345",
"startDate": "2020-04-24",
"endDate": "2022-02-20"
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/2/dsar/requests HTTP/1.1
Host: amplitude.com
Accept: application/json
Content-Type: application/json
Authorization: Basic {org-api-key}:{org-secret-key} # credentials must be base64 encoded
{
    "userId": "12345",
    "startDate": "2020-04-24",
    "endDate": "2022-02-20"
}
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Create a request by user ID"}}
This example creates a request by user ID `12345`, between the dates of April 24, 2020 and February 20, 2022.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request POST 'https://amplitude.com/api/2/dsar/requests' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
-u '7f6e5d4c3b2a1e0f9d8c7b6a5e4d3c2b:c2b3a4d5e6f7c8d9a0b1c2d3e4f5a6b7' \
--data-raw '{
    "userId": "12345",
    "startDate": "2020-04-24",
    "endDate": "2022-02-20"
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/2/dsar/requests HTTP/1.1
Host: amplitude.com
Accept: application/json
Content-Type: application/json
Authorization: Basic N2Y2ZTVkNGMzYjJhMWUwZjlkOGM3YjZhNWU0ZDNjMmI6YzJiM2E0ZDVlNmY3YzhkOWEwYjFjMmQzZTRmNWE2YjcK
Content-Length: 83

{
    "userId": "12345",
    "startDate": "2020-04-24",
    "endDate": "2022-02-20"
}
```    
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

{{partial:collapse name="Example: Create a request by Amplitude ID"}}
This example creates a request by Amplitude ID `90102919293`, between the dates of April 24, 2020 and February 20, 2022.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request POST 'https://amplitude.com/api/2/dsar/requests' \
--header 'Accept: application/json' \
--header 'Content-Type: application/json' \
-u '7f6e5d4c3b2a1e0f9d8c7b6a5e4d3c2b:c2b3a4d5e6f7c8d9a0b1c2d3e4f5a6b7' \
--data-raw '{
    "amplitudeId": 90102919293,
    "startDate": "2020-04-24",
    "endDate": "2022-02-20"
}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
POST /api/2/dsar/requests HTTP/1.1
Host: amplitude.com
Accept: application/json
Content-Type: application/json
Authorization: Basic N2Y2ZTVkNGMzYjJhMWUwZjlkOGM3YjZhNWU0ZDNjMmI6YzJiM2E0ZDVlNmY3YzhkOWEwYjFjMmQzZTRmNWE2YjcK
Content-Length: 83

{
    "amplitudeId": 90102919293,
    "startDate": "2020-04-24",
    "endDate": "2022-02-20"
}
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Request body

| Name | Description |
| --- | --- |
| `userId` | <span class="required">Required if `amplitudeID` isn't set</span>. The user ID of the user to request data for. |
| `amplitudeId` | <span class="required">Required if `userID` isn't set</span>. Integer. The Amplitude ID of the user to request data for. |
| `startDate` | <span class="required">Required</span>. Date. The start date for the data request. |
| `endDate` | <span class="required">Required</span>. Date. The end date for the data request. |

### Response

When successful, the call returns a `202 Accepted` response and `requestId`. Use the `requestId` to poll the job status.

```json
{
    "requestId": 53367
}
```

## Get request status

Poll the data request job to get its status. 

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/dsar/requests/{request-id}' \
--header 'Accept: application/json' \
-u '{org-api-key}:{org-secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/dsar/requests/requestID HTTP/1.1
Host: amplitude.com
Accept: application/json
Authorization: Basic {org-api-key}:{org-secret-key} #credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Poll a specific request"}}
This example polls request `53367`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://amplitude.com/api/2/dsar/requests/53367' \
--header 'Accept: application/json' \
-u '7f6e5d4c3b2a1e0f9d8c7b6a5e4d3c2b:c2b3a4d5e6f7c8d9a0b1c2d3e4f5a6b7'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/dsar/requests/53367 HTTP/1.1
Host: amplitude.com
Accept: application/json
Authorization: Basic N2Y2ZTVkNGMzYjJhMWUwZjlkOGM3YjZhNWU0ZDNjMmI6YzJiM2E0ZDVlNmY3YzhkOWEwYjFjMmQzZTRmNWE2YjcK
```
{{/partial:tab}}
{{/partial:tabs}}
{{/partial:collapse}}

### Path variables

|Name|Description|
|----|-----------|
|`requestId`|<span class="required">Required</span>. The request ID retrieved with the [create data request](#create-a-request-for-data) call.|

### Response

| Name | Description |
| --- | --- |
| `requestId` | Integer. The ID of the request. |
| `userId` | String. The User Id of the user to request data for. |
| `amplitudeId` | Integer. The Amplitude ID of the user to request data for. |
| `startDate` | Date. The start date for the data request. |
| `endDate` | The end date for the data request. |
| `status` | **staging**: not started  <br>**submitted**: in progress  <br>**done**: job completed and download URLs populated  <br>**failed**: job failed, may need to retry  <br> |
| `failReason` | String. If the job failed, contains Information about the failure. |
| `urls` | Array of strings. A list of download URLs for the data. |
| `expires` | Date. The date that the output download links expire. |

## Get output files

Download a returned output file.

The download link is valid for two days. Most clients used to send API requests automatically download the data from the S3 link. If your API client doesn't automatically download the file from the link, access it manually using your org API key as the username and your org secret key as the password.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```curl
curl --location --request GET 'https://analytics.amplitude.com/api/2/dsar/requests/:request_id/outputs/:output_id' \
-u '{org-api-key}:{org-secret-key}'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}
```bash
GET /api/2/dsar/requests/request_id/outputs/:output_id HTTP/1.1
Host: analytics.amplitude.com
Authorization: Basic {org-api-key}:{org-secret-key} # credentials must be base64 encoded
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:collapse name="Example: Get the output for a specific request ID"}}
This example gets output with ID `0` for request `53367`.

{{partial:tabs tabs="cURL, HTTP"}}
{{partial:tab name="cURL"}}
```bash
curl --location --request GET 'https://analytics.amplitude.com/api/2/dsar/requests/53367/outputs/0' \
-u '7f6e5d4c3b2a1e0f9d8c7b6a5e4d3c2b:c2b3a4d5e6f7c8d9a0b1c2d3e4f5a6b7'
```
{{/partial:tab}}
{{partial:tab name="HTTP"}}

{{/partial:tab}}
{{/partial:tabs}}
```bash
GET /api/2/dsar/requests/53367/outputs/0 HTTP/1.1
Host: amplitude.com
Accept: application/json
Authorization: Basic N2Y2ZTVkNGMzYjJhMWUwZjlkOGM3YjZhNWU0ZDNjMmI6YzJiM2E0ZDVlNmY3YzhkOWEwYjFjMmQzZTRmNWE2YjcK
```
{{/partial:collapse}}

### Path variables

| <div class="big-column">Name</div>|Description|
|-----|-----|
|`request_id`|<span class="required">Required</span>. Integer. The ID of the request. Returned with the original GET request.|
|`output_id`|<span class="required">Required</span>. Integer. The ID of the output to download. An integer at the end of the URL returned in the status response after the job finishes.|
