---
id: e7946941-3125-469b-9102-8f2e136aeb62
blueprint: api
title: 'SCIM API'
source: 'https://www.docs.developers.amplitude.com/analytics/apis/scim-api/'
auth_method: scim_key
standard_endpoint: 'https://core.amplitude.com/scim/1/'
postman_link: 'https://www.postman.com/amplitude-dev-docs/workspace/amplitude-developers/folder/20044411-4e4ab138-2055-4ed8-be5f-2b28c4c17c7f?action=share&source=copy-link&creator=29131806&ctx=documentation'
api_status: ga
lede: |-
  The User Management API in Amplitude provides a programmatic solution to provisioning and
   group management through a public API. This enables administrators to manage their organizations at scale and integrate the provisioning process with other tools, including Identity Providers.

  This guide provides detailed documentation on the specific routes supported by Amplitude's implementation of the [System for Cross-domain Identity Management (SCIM) 2.0 Standard](http://www.simplecloud.info/#Specification). This guide pays specific attention to any details useful for debugging issues with a SCIM integration.

  For help integrating the SCIM API with an Identity Provider like Okta or JumpCloud, or help enabling the SCIM API for an Amplitude organization, see [Set up SCIM provisioning in Amplitude](/docs/admin/account-management/scim-provision).
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716312360
summary: 'Provision and manage users and groups. This API uses the System for Cross-domain Identity Management (SCIM) 2.0 Standard.'
---
## Considerations
Keep the following in mind as you configure the SCIM API integration.

### Base URL

The Base URL of the SCIM API is `https://core.amplitude.com/scim/1/`, and all routes can be formed according to the SCIM Standard. This URL doesn't change between organizations, as the SCIM key used in authentication is used to determine which organization the requests are directed toward.

Although the route includes "1", this doesn't mean that Amplitude implements the SCIM 1.1 Standard. This is to denote the Amplitude version of this implementation, future-proofing for new iterations of the API that introduce breaking changes without disrupting service for current consumers.

### API usage limits

The SCIM API supports 100 requests per minute per organization. Amplitude can lift this restriction for burst requests on a per-request basis. Contact the support team or a customer success manager for more information.

## User routes

This section details routes and information that deal with user management.

{{partial:admonition type="note" heading="About users"}}
- Users are defined as active within Amplitude regardless of whether they have accepted the invitation and
  have logged in once to the organization within Amplitude. This prevents Identity Providers from resending invitations to invited and pending users.
- The SCIM API sends users created through the POST route an email invitation to complete sign up.
{{/partial:admonition}}

### Supported user fields

Amplitude supports the following fields in the core User Schema:

| SCIM User Attribute |  Notes |
| --- | --- |
| `userName` | Primary user email address. |
| `id` | Primary user email address. |
| `emails` | Amplitude supports one email address per user currently. |
| `name.givenName` | Prepended to `familyName` to create the display name. |
| `name.familyName` | appended to `givenName` to create display name within Amplitude. |
| `active` | True for pending and joined users. |

### Get users

`GET /Users`

Gets a list of users within Amplitude for that organization. This includes both pending and joined users, and supports pagination and filtering.

```bash
GET /scim/1/Users HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
```

#### Query parameters

|<div class="big-column">Name</div>| Description|
|---|---|
|`startIndex`| <span class="optional">Optional</span>. Integer. Defaults to 1. 1-indexed.|
|`itemsPerPage`| <span class="optional">Optional</span>. Integer. Defaults to 100. 100 is the maximum page size.|
|`filter`|String. Must follow the [SCIM filter syntax](https://datatracker.ietf.org/doc/html/rfc7644#section-3.4.2.2)|

#### Response

A successful request returns a JSON response with user data.

```json
{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "startIndex": 1,
    "itemsPerPage": 100,
    "totalResults": 1,
    "Resources": [
        {
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:User"
            ],
            "id": "datamonster@amplitude.com",
            "userName": "datamonster@amplitude.com",
            "name": {
                "givenName": "data",
                "familyName": "monster"
            },
            "active": true,
            "emails": [
                {
                    "value": "datamonster@amplitude.com",
                    "primary": true
                }
            ],
            "meta": {
                "resourceType": "User"
            }
        }
    ]
}
```

### Get user by ID

`GET /Users/:id`

Gets a user by their ID.

```bash
GET /scim/1/Users/datamonster@amplitude.com HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
```

#### Path variables

|<div class="big-column">Name</div>| Description|
|---|---|
|`id`| <span class="required">Required</span>. Must be a valid email address. Not case sensitive.|

#### Response

A successful request returns a JSON response with the user's data.

```json
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:User"
    ],
    "id": "datamonster@amplitude.com",
    "userName": "datamonster@amplitude.com",
    "name": {
        "givenName": "Data",
        "familyName": "Monster"
    },
    "active": true,
    "emails": [
        {
            "primary": true,
            "value": "datamonster@amplitude.com"
        }
    ],
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```

### Create users

`POST /Users`

A `POST` request creates a new user in Amplitude. This operation sends an invitation link to the email address.

To succeed, `id` and `userName` must be valid emails, and the user can't already exist or have a pending invite to your Amplitude organization.

The request body for the `POST` route should be a valid SCIM User Resource.

{{partial:admonition type="note" heading=""}}
The API ignores the `Groups` field on user routes. To add a user to a group, make a request to the group API routes.
{{/partial:admonition}}

```bash
POST /scim/1/Users/ HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
Content-Type: application/json
Content-Length: 364

{
   "schemas":[
      "urn:ietf:params:scim:schemas:core:2.0:User"
   ],
   "id":"<USER EMAIL>",
   "userName":"<USER EMAIL>",
   "name":{
      "givenName":"<USER GIVEN NAME>",
      "familyName":"<USER FAMILY NAME>"
   },
   "emails":[
      {
         "value":"<USER EMAIL>",
         "primary":true
      }
   ],
   "meta":{
      "resourceType":"User"
   }
}
```

#### Request body

See [supported user fields](#supported-user-fields) for this request's body parameters.

#### Response

A successful request returns `201 Created` and the original request body.

### Update users

`PUT /Users/:id` or `PATCH /Users/:id`

Updates the Amplitude user with the given ID. `id` must be a valid email address, and the user must have already been invited to Amplitude. You can't change the email address.

Setting the `active` schema field to `false` in the request body removes the user from the organization, and the user loses all access. If the user is pending (an invited user that hasn't accepted the invitation), the invitation is revoked.

{{partial:tabs tabs="Update a givenName, Deactivate a user"}}
{{partial:tab name="Update a givenName"}}
```bash hl_lines="11"
PUT /scim/1/Users/datamonster@amplitude.com HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
Content-Length: 423

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "datamonster@amplitude.com",
    "userName": "datamonster@amplitude.com",
    "name": {
        "givenName": "Datamonster", #[tl! ~~]
        "familyName": "Monster"
    },
    "emails": [{
        "primary": true,
        "value": "datamonster@amplitude.com"
    }],
    "active": true,
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```
{{/partial:tab}}
{{partial:tab name="Deactivate a user"}}
```bash
PUT /scim/1/Users/datamonster@amplitude.com HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
Content-Length: 424

{
    "schemas": ["urn:ietf:params:scim:schemas:core:2.0:User"],
    "id": "datamonster@amplitude.com",
    "userName": "datamonster@amplitude.com",
    "name": {
        "givenName": "Datamonster",
        "familyName": "Monster"
    },
    "emails": [{
        "primary": true,
        "value": "datamonster@amplitude.com"
    }],
    "active": false, #[tl! ~~]
    "groups": [],
    "meta": {
        "resourceType": "User"
    }
}
```
{{/partial:tab}}
{{/partial:tabs}}

#### Response

A successful request returns a `200 OK` status and the original request body.

### Delete a user

Deletes the Amplitude user with the given ID. The ID must be a valid email, and the user must have been invited to Amplitude already.

If a pending user (an invited user that hasn't accepted the invitation) is deleted, the invitation is revoked.

```bash
DELETE /scim/1/Users/datamonster@amplitude.com HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
```

#### Path variables

|<div class="big-column">Name</div>| Description|
|---|---|
|`id`| <span class="required">Required</span>. Must be a valid email address. Not case sensitive.|

#### User response

A successful delete request returns a `204 No Content` response.

## Group routes

This section details the requests available for Permission Group related APIs. Amplitude supports all core fields of the Group Schema, with users within groups returned with the fields listed in [supported user fields](#supported-user-fields).

### Get groups

```bash
GET /scim/1/Groups HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
```

```json
{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:ListResponse"
    ],
    "startIndex": 1,
    "itemsPerPage": 100,
    "totalResults": 1,
    "Resources": [
        {
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:Group"
            ],
            "id": 632,
            "displayName": "Datamonster Party",
            "members": [
                {
                    "value": "data.engineer@amplitude.com",
                    "display": "data nommer"
                },
                {
                    "value": "datamonster@amplitude.com",
                    "display": "data monster"
                }
            ],
            "meta": {
                "resourceType": "Group",
                "created": "2022-02-03T20:40:22.000+00:00",
                "lastModified": "2022-02-03T20:40:22.000+00:00"
            }
        }
    ]
}
```

### Get group by ID

Returns the Amplitude group with the given numeric ID.

```bash
GET /scim/1/Groups/632 HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
```

#### Path variables

|Name| Description|
|---|---|
|`id`| <span class="required">Required</span>. Integer. The group ID|

#### Example response

A successful request returns a `200 OK` status and a JSON response with data about the group.

```json
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    "id": "632",
    "displayName": "Datamonster Party",
    "members": [
        {
            "value": "data.engineer@amplitude.com",
            "display": "Data Engineer"
        },
        {
            "value": "datamonster@amplitude.com",
            "display": "data monster"
        }
    ],
    "meta": {
        "resourceType": "Group",
        "created": "2022-02-03T20:40:22.000+00:00",
        "lastModified": "2022-02-03T20:40:22.000+00:00"
    }
}
```

### Create a group

Creates a group in Amplitude. It adds existing users to the group and invites new users to Amplitude.

{{partial:admonition type="warning" heading=""}}
When a user is added to a group without first being invited to the Amplitude organization, they are immediately provisioned with the minimum permissions and added to the group. The user is invited via email. [Learn more about permission groups](/docs/admin/account-management/manage-permission-groups).
{{/partial:admonition}}

```bash
POST /scim/1/Groups HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
Content-Type: application/json
Content-Length: 265

{
   "schemas":[
      "urn:ietf:params:scim:schemas:core:2.0:Group"
   ],
   "displayName":"Group Name",
   "members":[
      {
         "value":"datamonster@amplitude.com"
      },
      {
         "value":"developerdocs@amplitude.com"
      }
   ]
}
```

#### Response

A successful request returns a `200 OK` status and JSON body with the group's data.

```json
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    "id": 671,
    "displayName": "Group Name",
    "members": [
        {
            "value": "datamonster@amplitude.com",
            "display": "data monster"
        },
        {
            "value": "developerdocs@amplitude.com",
            "display": "undefined undefined"
        }
    ],
    "meta": {
        "resourceType": "Group",
        "created": "2022-03-03T20:38:36.000+00:00",
        "lastModified": "2022-03-03T20:38:36.000+00:00"
    }
}
```

### Update a user group

```bash
PATCH /scim/1/Groups/632 HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {scim-token}
Content-Length: 241

{
    "schemas": ["urn:ietf:params:scim:api:messages:2.0:PatchOp"],
    "Operations": [
        {
          "op": "add",
          "path": "members",
          "value": [{
              "value": "new.member@amplitude.com"
        }]
    }]
}
```

#### Example response

A successful request returns a `200 OK` status with a JSON response with the
 updated group's new data.

```json
{
    "schemas": [
        "urn:ietf:params:scim:schemas:core:2.0:Group"
    ],
    "id": "632",
    "displayName": "New Name",
    "members": [
        {
            "value": "data.engineer@amplitude.com",
            "display": "data engineer"
        },
        {
            "value": "datamonster@amplitude.com",
            "display": "data monster"
        },
        {
            "value": "new.member@amplitude.com",
            "display": "New Member"
        }
    ],
    "meta": {
        "resourceType": "Group",
        "created": "2022-02-03T20:40:22.000+00:00",
        "lastModified": "2022-02-03T21:25:25.000+00:00"
    }
}
```

### `DELETE /Groups/:id`

Deletes an Amplitude group.

#### Example request

```bash
DELETE /scim/1/Groups/632 HTTP/1.1
Host: core.amplitude.com
Authorization: Bearer {{scim-token}}
```

#### Path variables

|Name| Description|
|---|---|
|`id`| <span class="required">Required</span>. Integer. The group ID|

#### Response

A successful deletions returns a `204 No Content` status.


####