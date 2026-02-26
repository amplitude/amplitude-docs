---
id: 13d3177c-d6a1-4f10-aff0-573d251729e9
blueprint: faq_and_troubleshooting
title: 'Snowflake Password Authentication Deprecation FAQ'
description: 'Frequently asked questions about migrating from password to key pair authentication for Snowflake integrations'
category: Warehouse
---

Snowflake is implementing a phased rollout to deprecate single-factor password authentication, starting in May 2026 and completing by October 2026. This impacts all of Amplitude's Snowflake integrations — both sources (data imports from Snowflake to Amplitude) and destinations (data exports from Amplitude to Snowflake).

For the complete official timeline and enforcement details, see Snowflake's [Planning for the deprecation of single-factor password sign-ins](https://docs.snowflake.com/en/user-guide/security-mfa-rollout) documentation.

This FAQ addresses common questions about migrating to key pair authentication for your Amplitude integrations.

## Timeline and support

### When does this change take effect?

Amplitude and Snowflake are following a coordinated timeline:

**Already in effect:**

- **February 1, 2026**: Amplitude removed the password option from the new connection flow for Snowflake sources and destinations. You can't enter new password credentials when creating a Snowflake connection. Existing password-authenticated connections continue to work, and you can still reuse existing password credentials when setting up additional connections.

**Coming soon:**

- **May 2026**: Amplitude begins sending in-product warnings to users with existing password-authenticated connections.
- **May – July 2026**: Snowflake begins enforcing strong authentication for newly created users.
- **August – October 2026**: Snowflake enforces strong authentication for all existing users.

Amplitude won't disconnect your Snowflake connections if you don't migrate by these dates. However, Snowflake will eventually block password-based logins, which causes your Amplitude sources and destinations to stop working.

### What should I do now?

Migrate all Snowflake connections — both sources and destinations — to key pair authentication as soon as possible to:

- Avoid service interruptions when Snowflake enforces strong authentication.
- Improve security.
- Ensure future compatibility.

### Where can I get help?

If you encounter issues during migration:

- Contact [Amplitude Support](https://gethelp.amplitude.com) through your usual channels.
- See Snowflake's [key pair authentication documentation](https://docs.snowflake.com/en/user-guide/key-pair-auth).
- Ensure your account name follows the `ORGNAME-ACCOUNTNAME` format.

## Migration impact

### Does this affect both Snowflake sources and destinations?

Yes. Both Snowflake sources (imports from Snowflake to Amplitude) and Snowflake destinations (exports from Amplitude to Snowflake) require migration to key pair authentication.

### Will I lose any data during migration?

No. Changing the authentication method doesn't affect:

- Existing imported or exported data.
- Import and export configurations.
- Scheduled syncs.
- Data mappings.

### Will there be duplicate data if I migrate?

No. Migration only changes the authentication method. Your source and destination configurations remain identical.

### Do I need to recreate my queries or configurations?

No. Migration preserves all your configurations:

- SQL queries.
- Table selections.
- Column mappings.
- Import and export schedules.

### Will my imports or exports stop during migration?

No. The process is designed to be uninterrupted. The general flow when updating an existing connection:

1. Open the connection settings for your source or destination.
2. Switch to key pair authentication and generate a key.
3. Apply the public key in Snowflake.
4. Verify the connection.
5. Save.

Your imports and exports continue throughout the process.

## Technical details

### Can I use the same Snowflake user?

Yes. Amplitude recommends:

- Keeping the same Snowflake user.
- Adding key pair authentication through the connection settings for your existing source or destination.
- Removing password auth after verifying the new credentials work.

### Can I share credentials between sources and destinations?

Yes. Amplitude supports credential reuse across all Snowflake connections in your organization:

- Sources can use credentials from destinations, and vice versa.
- Connections across different Amplitude projects in the same organization can share credentials.

This is especially helpful when migrating to key pair auth. Instead of generating a new key pair for each connection, you can create one key pair and reuse it across your Snowflake sources and destinations.

Snowflake sources and destinations require slightly different Snowflake user permissions — sources need read access and destinations need write access. If you share credentials between a source and a destination, ensure your Snowflake user has the permissions required for both.

### What happens when I update credentials shared across multiple connections?

If multiple Snowflake connections share the same credentials, updating the credentials for one connection updates all of them. Amplitude shows you how many connections share the credentials when you view connection settings, so you can confirm the scope of your update before saving.

### Can I migrate connections one at a time?

Yes. You can:

- Migrate sources and destinations individually.
- Test each migration before proceeding to the next.
- Maintain a mix of password and key pair auth temporarily.

### What are the permission differences between sources and destinations?

Snowflake sources (imports) require read permissions to query your Snowflake data. Snowflake destinations (exports) require write permissions to load data into your warehouse. If you share credentials between a source and destination, ensure your Snowflake user has all the necessary permissions for both read and write operations.

### What about human Snowflake accounts vs service accounts?

Amplitude can't support MFA for Snowflake connections. If your connections use a human Snowflake user account, you need to either:

- Switch to a Snowflake service account and configure key pair authentication.
- Add key pair authentication to the existing human account (Snowflake allows both MFA and key pair on a single user).

Most Amplitude customers use dedicated service accounts for Snowflake connections.

## Best practices

### Should I create new Snowflake users for key pair auth?

You don't need to. Use your existing Snowflake user and add key pair authentication to it:

- Use your existing Snowflake user.
- Generate a single key pair and reuse it across all your Snowflake sources and destinations.
- Remove password authentication only after verifying all connections work with the new key pair.

### How do I set up key pair authentication for an existing connection?

The process is the same for both sources and destinations:

1. Open the connection settings for your existing Snowflake source or destination.
   - For sources: navigate to *Data > Sources*, select the source, then open its settings.
   - For destinations: navigate to *Data > Destinations*, select the destination, then open its settings.
2. Select **Key pair** authentication.
3. Click **Generate Key** to create a new key pair.
4. Copy the generated public key.
5. In Snowflake, run the following SQL to add the public key to your user:

   ```sql
   ALTER USER "your_username" SET rsa_public_key='your_public_key_here';
   ```

6. Provide your organization and account names in the format `ORGNAME-ACCOUNTNAME`.
7. Test the connection to verify it works.
8. After verification, save your changes.

If other connections share the same credentials, this update applies to all of them.

### How do I reuse existing credentials for a new connection?

When creating a new Snowflake source or destination, you can select previously saved credentials from any connection in your organization:

1. On the credentials step when creating a new source or destination, look for the option to use existing credentials.
2. Select credentials from an existing connection (source or destination) in your organization, including connections from other projects.
3. Verify that the Snowflake user has the required permissions for the new connection type.
4. Complete the connection setup.

### What format should I use for the account name?

Use the format `ORGNAME-ACCOUNTNAME`. To get the correct format, run this query in your Snowflake instance:

```sql
SELECT CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME();
```

### What if I get a "JWT token is invalid" error?

This error typically occurs when:

- The public key isn't properly set on the Snowflake user.
- The account name format is incorrect (should be `ORGNAME-ACCOUNTNAME`).
- There's a mismatch between the public and private keys.

To resolve:

1. Verify the public key is correctly set on the Snowflake user. Run the following to confirm:

   ```sql
   DESC USER "your_username";
   ```

2. Confirm you're using the correct account name format.
3. Ensure the Snowflake role you're using has the `ALTER USER` privilege when setting the public key.
4. If needed, regenerate the key pair and update the public key in Snowflake.
