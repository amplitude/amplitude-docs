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

  For help integrating the SCIM API with an Identity Provider like Okta or JumpCloud, or help enabling the SCIM API for an Amplitude organization, see [Set up SCIM provisioning in Amplitude](/admin/account-management/scim-provision).
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1715982864
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

Amplitude supports the following fields in the core User Schema:

| SCIM User Attribute |  Notes |
| --- | --- |
| `userName` | Primary user email address. |
| `id` | Primary user email address. |
| `emails` | Amplitude supports one email address per user currently. |
| `name.givenName` | Prepended to `familyName` to create the display name. |
| `name.familyName` | appended to `givenName` to create display name within Amplitude. |
| `active` | True for pending and joined users. |