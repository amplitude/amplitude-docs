---
id: 64462898-6686-4899-8bbe-4d29d8a97f3f
blueprint: account-management
title: 'Manage your API keys and secret keys'
this_article_will_help_you:
  - 'Manage your API keys and secret keys'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1721166679
---

{{partial:admonition type="tip" heading="Contact support to enable this feature"}}
This feature is available to organizations on an Enterprise plan. Contact [Amplitude Support](https://gethelp.amplitude.com/hc/en-us) to enable it in your org.
{{/partial:admonition}}

Amplitude’s self-service key management page helps Managers & Admins create, revoke, or delete both API keys and secret keys. **All changes are permanent**.

You can: 
* Create and name multiple API keys and secret keys
* View a log of the creator, and the last action taken on the key
* Disable API access

{{partial:admonition type='note'}}
After you revoke an API key, you can't undo it. However, you can still view the key value.
{{/partial:admonition}}

## Manage your keys

To manage your keys, follow these steps:

1. Select *Organization settings* in the upper navigation.
2. Select *API Keys*. In the *API Keys* tab, you can see the legacy API key. This key was created along with the project.

![api_secret_manage.png](/docs/output/img/account-management/api_secret_manage.png)

## Generate an API key 

To generate an API key, follow these steps:

1. Select the project you’re interested in. 
2. Click *Generate API Key*.
3. Name the API key.

![api_secret_generate_api.png](/docs/output/img/account-management/api_secret_generate_api.png)

You can copy this API Key to store or use it elsewhere.

## Revoke an API key 

To revoke an API key, follow these steps:

1. Select the API key. 
2. Confirm that you want to revoke the key.

![api_secret_revoke1.png](/docs/output/img/account-management/api_secret_revoke1.png)

After you click *Revoke*, the key is permanently unusable. You still retain the API key for your records.

![ api_secret_revoke2.png](/docs/output/img/account-management/api_secret_revoke2.png)

## Generate a secret key 

To generate a secret key, follow these steps:

1. Select the appropriate project. 
2. Click *Generate Secret Key*.
3. Name the secret key and copy it into your records. Amplitude doesn't store secret keys, and there is no way to retrieve it. (The Key ID is a unique identifier for your secret key, but it's not the key itself.)

![api_secret_generate_secret1.png](/docs/output/img/account-management/api_secret_generate_secret1.png)

![api_secret_generate_secret2.png](/docs/output/img/account-management/api_secret_generate_secret2.png)

## Delete a secret key 

To delete a secret key, select the secret key you want to delete, then type “DELETE” to confirm your intent.

You can't use, see, or recover a secret key after deleting it.

## Limitations

* You can have a maximum of 50 active keys 
* Key creation is instantaneous 
* It can take up to 6 hours to delete a key