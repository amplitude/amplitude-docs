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

Amplitude’s self-service key management page helps Managers & Admins create, revoke, or delete both API keys and secret keys. **All changes are permanent**.

You can:

* Create and name multiple API keys and secret keys.
* View a log of the creator, and the last action taken on the key.
* Disable API access.

## Manage your keys

To manage your keys, follow these steps:

1. Select *Organization settings* in the upper navigation.
2. Select *API Keys* in the side navigation.

## API key

An API key identifies your project so Amplitude can route ingested data to it. Learn more about [API Key](/docs/apis/keys-and-tokens#api-key).

### Legacy API key

The first time you use API key management, you see the legacy API key in the *API Keys* tab. Amplitude created this key when you created the project. You can't disable it but you can click **Rotate** to replace the key.

### Generate an API key

To generate an API key, follow these steps:

1. Select the project you’re interested in.
2. Click **Generate API Key**.
3. Name the API key.

You can copy this API key to store or use it elsewhere.

### Revoke an API key

To revoke an API key, follow these steps:

1. Select the API key.
2. Confirm that you want to revoke the key.

After you click **Revoke**, the key is permanently unusable. You still retain the API key for your records.

## Secret key (Beta)

Secret keys authenticate you to server-side Analytics APIs that read or modify project data. For more information, review [Keys and Tokens](/docs/apis/keys-and-tokens#secret-key).

### Generate a secret key

To generate a secret key, follow these steps:

1. Select the appropriate project.
2. Click **Generate Secret Key**.
3. Name the secret key and copy it into your records. Amplitude doesn't store secret keys, and there's no way to retrieve it. (The Key ID is a unique identifier for your secret key, but it's not the key itself.)

### Delete a secret key

To delete a secret key, select the secret key you want to delete, then type “DELETE” to confirm your intent.

You can't use, see, or recover a secret key after deleting it.

## Limitations

* You can have a maximum of 50 active keys.
* While key creation is instantaneous, a revoked key can take up to 6 hours to stop working in rare cases. This applies to both legacy and non-legacy API keys.