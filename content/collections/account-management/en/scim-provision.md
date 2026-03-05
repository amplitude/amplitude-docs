---
id: 3da7e352-3754-41f3-b6a7-9e054e038130
blueprint: account-management
title: 'Set up SCIM provisioning in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/360058399851-Set-up-SCIM-provisioning-in-Amplitude'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1721758941
---
Amplitude's User Management API provides a programmatic solution to provisioning and group management through a public API. Use it to manage your organizations at scale and integrate the provisioning process with other tools, including identity providers.

The User Management API follows the [SCIM 2.0 Standard.](http://www.simplecloud.info/#Specification) It supports creation, retrieval, update, and deletion calls for users (including pending users) and permission groups.

{{partial:admonition type='note'}}
For a technical guide and spec for interfacing with the SCIM API, see the [SCIM API guide](/docs/apis/analytics/scim). It's useful for developers testing the SCIM API, developing scripts that call the Amplitude SCIM API, or constructing one-off requests.
{{/partial:admonition}}

## Before you begin

The User Management API works in tandem with [permission groups](/docs/admin/account-management/manage-users).

If you plan to use SCIM provisioning to integrate with an identity provider/SSO solution, make sure SCIM is also enabled within that tool.

## Enable SCIM provisioning in Amplitude

If SCIM provisioning is available in your organization, you can find it in the *Access and SSO Settings* section of your organization's settings menu, under *Provisioning Settings:*

![](statamic://asset::help_center_conversions::account-management/scim-enabled.png)

Set the *Enable SCIM Provisioning* toggle to *Enabled*. Then click *Generate SCIM Key* to generate the access token used to authenticate requests for the SCIM API.

{{partial:admonition type='note'}}
For security reasons, the SCIM Key is available only when you enable it. If you lose access to the key, click *Regenerate SCIM Key.* Keep a record of the new key. When you generate or regenerate the SCIM key, changes apply immediately and Amplitude rejects the old key from any API calls, even if the other changes on the page aren't saved.
{{/partial:admonition}}

### Supported fields

Amplitude supports all fields of the core group schema of SCIM, as well as the following fields in the core user schema:

|                         |                                                          |
| ----------------------- | -------------------------------------------------------- |
| **SCIM user attribute** | **Special note**                                         |
| `userName`              | Same as `email`                                      |
| `givenName`             | prepended to `familyName` to create display name           |
| `familyName`            | appended to `givenName` to create display name             |
| `email`                 | only one email is allowed                                |
| `active`                | active is true for invited users as well as joined users |

## Configure a SCIM application with Okta

In Okta, the Amplitude SCIM API provides the following features:

* **Import Users/Groups**: Accesses the users and groups in your Amplitude organization and adds new users or updates existing users within Okta.
* **Create New Users:** On assignment of a user or group to the application, Amplitude invites users to your organization and sends an invitation email to complete sign-up.
* **Update User Attributes**: Keeps profiles in sync from Okta to Amplitude.
* **Deactivate Users**: On removal of a user assignment from the Okta application, Amplitude removes the users from your Amplitude organization.
* **Push Groups**: Creates new groups in Amplitude and links them to groups within Amplitude.

### Okta integration

The best way to integrate Okta provisioning with Amplitude is with the Amplitude application within the Okta Integration Network. To do so, follow these steps:

1. In the Okta Integration Catalog, navigate to *Applications* and find the Amplitude application. Use the Org ID available in the *General Settings* section in Amplitude to create the integration.

2. Once you create the integration, set up and authenticate provisioning calls to Amplitude. Navigate to the *Provisioning* tab and click *Configure API Integration*.

  ![blobid0.png](/docs/output/img/account-management/blobid0-png.png)

3. Enter the API Token: this is the same as the SCIM key Amplitude provided earlier. Enter the token in the field and click *Save*. You now have access to user provisioning actions in the *Import*, *Assignment*, and *Push Groups* tabs of the application.

  ![blobid1.png](/docs/output/img/account-management/blobid1-png.png)

4. Once Okta verifies the connection, select the provisioning actions that Okta can send to Amplitude. Check any features in the *To App* section of the *Provisioning* tab that fit your needs. It's usually best to select all available features to ensure that Amplitude's user records closely match your Okta directory.

  ![blobid2.png](/docs/output/img/account-management/blobid2-png.png)


### Manual configuration (SAML)

If your SSO requires SAML support, use the manual configuration described in [Set up single sign-on (SSO) for Amplitude using Okta](/docs/admin/single-sign-on/okta).


## Troubleshooting

Amplitude asks users to provide their first and last names upon **first sign-up in Amplitude**, though they may receive an invitation to join an organization before this happens. If **Import Users** runs while there are pending users who have never been in any Amplitude organization, the SCIM API uses placeholder values for their first and last names (`NO_GIVEN_NAME` and `NO_FAMILY_NAME`, respectively).

There can also be issues when authenticating an identity provider's application with Amplitude's SCIM API, for example when testing the SCIM connection within Okta. In these instances, try this procedure:

1. In your *Access and SSO Settings* tab, ensure that SCIM is enabled (remember to save the configuration if this needs to be enabled).
2. Click *Regenerate SCIM Key* and confirm the key regeneration (this immediately invalidates the old key).
3. Copy the new key value and retest the configuration (see the [technical guide](/docs/apis/analytics/scim) if you'd like to construct your own requests outside of a provider's integration).
