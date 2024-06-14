---
id: 8554f01f-abfc-4669-ae44-f00f5d2b4ccd
blueprint: experiment-api
title: 'Experiment Management API Version Endpoints'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
landing: false
parent: f64a356a-2a9a-44e3-a482-f429a565a12c
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717530376
---


## List versions

```bash
GET https://experiment.amplitude.com/api/1/versions
```

Fetch a list of versions of all experiments or flags can the management api key has access to, across multiple projects if the key is scoped to them.

### Query parameters

|Name|Description|
|---|----|
|`start`| The ISO 8601 formatted start time of versions to be returned (inclusive).|
|`end`| The ISO 8601 formatted end time to versions to be returned (exclusive).|
|`limit`| The max number of deployments to be returned. Capped at 1000.|
|`cursor`| The offset to start the "page" of results from.|

### Response

A successful request returns a `200 OK` response and a list of versions encoded as JSON in the response body, along with the cursor to next page.
Versions are ordered by version creation time descending.

!!!example "Example cURL"
{{partial:admonition type="example" heading="Example cURL"}}
```bash
curl --request GET \                                                                                    
    --url 'https://experiment.amplitude.com/api/1/versions?limit=3&cursor=3000&start=2023-01-01T00:00:00Z&end=2024-12-31T23:59:59Z' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <management-api-key>'
```
{{/partial:admonition}}


{{partial:admonition type="example" heading="Exaple response"}}
```json
    {
        "nextCursor": 3003,
        "versions": [
            {
                "createdAt": "2023-07-29T03:32:49.594Z",
                "createdBy": <userId>,
                "version": 3,
                "flagConfig": {
                    "id": <id>,
                    "projectId": <projectId>,
                    "deployments": [<deploymentId>],
                    "key": "flag-key",
                    "name": "flag-key",
                    "description": "feature flag access",
                    "enabled": true,
                    "evaluationMode": "remote",
                    "bucketingKey": "amplitude_id",
                    "bucketingSalt": "mHdQDzeE",
                    "bucketingUnit": "User",
                    "variants": [
                        {
                            "key": "on"
                        }
                    ],
                    "rolloutPercentage": 0,
                    "rolloutWeights": {
                        "on": 1
                    },
                    "targetSegments": [
                        {
                            "name": "Segment 1",
                            "conditions": [
                                {
                                    "prop": "country",
                                    "op": "is",
                                    "type": "property",
                                    "values": [
                                        "United States"
                                    ]
                                }
                            ],
                            "percentage": 0,
                            "bucketingKey": "amplitude_id",
                            "rolloutWeights": {
                                "on": 1
                            }
                        }
                    ]
                }
            },
            { //[tl! collapse:start]
                "createdAt": "2023-07-29T03:32:39.494Z",
                "createdBy": <userId>,
                "version": 2,
                "flagConfig": {
                    "id": <id>,
                    "projectId": <projectId>,
                    "deployments": [<deploymentId>],
                    "key": "flag-key",
                    "name": "flag-key",
                    "description": "feature flag access",
                    "enabled": false,
                    "evaluationMode": "remote",
                    "bucketingKey": "amplitude_id",
                    "bucketingSalt": "mHdQDzeE",
                    "bucketingUnit": "User",
                    "variants": [
                        {
                            "key": "on"
                        }
                    ],
                    "rolloutPercentage": 0,
                    "rolloutWeights": {
                        "on": 1
                    },
                    "targetSegments": [
                        {
                            "name": "Segment 1",
                            "conditions": [
                                {
                                    "prop": "country",
                                    "op": "is",
                                    "type": "property",
                                    "values": [
                                        "United States"
                                    ]
                                }
                            ],
                            "percentage": 0,
                            "bucketingKey": "amplitude_id",
                            "rolloutWeights": {
                                "on": 1
                            }
                        }
                    ]
                }
            },
            {
                "createdAt": "2023-07-29T03:30:45.703Z",
                "createdBy": <userId>,
                "version": 1,
                "flagConfig": {
                    "id": <id>,
                    "projectId": <projectId>,
                    "deployments": [],
                    "key": "flag-key",
                    "name": "flag-key",
                    "description": "",
                    "enabled": false,
                    "evaluationMode": "remote",
                    "bucketingKey": "amplitude_id",
                    "bucketingSalt": "mHdQDzeE",
                    "bucketingUnit": "User",
                    "variants": [
                        {
                            "key": "on"
                        }
                    ],
                    "rolloutPercentage": 0,
                    "rolloutWeights": {
                        "on": 1
                    },
                    "targetSegments": []
                }
            } //[tl! collapse:end]
        ]
    }
```

{{/partial:admonition}}