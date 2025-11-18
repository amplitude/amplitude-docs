---
id: 13d3177c-d6a1-4f10-aff0-573d251729e9
blueprint: faq_and_troubleshooting
title: 'Snowflake Password Authentication Deprecation FAQ'
description: 'Frequently asked questions about migrating from password to key pair authentication for Snowflake integrations'
category: Warehouse
---

Snowflake is implementing a phased rollout to deprecate single-factor password authentication, starting in May 2026 and completing by October 2026. This impacts Amplitude's source and destination integrations with Snowflake.

For the complete official timeline and enforcement details, review Snowflake's [Planning for the deprecation of single-factor password sign-ins](https://docs.snowflake.com/en/user-guide/security-mfa-rollout) documentation.

This FAQ addresses common questions about migrating to key pair authentication for your Amplitude integrations.

## Timeline and support

### When does this change take effect?

Snowflake's deprecation follows a phased approach:

- **September 2025 - January 2026**: Mandatory MFA for all Snowsight users
- **May 2026 - July 2026**: Strong authentication required for newly created users
- **August 2026 - October 2026**: Strong authentication required for all existing users

The official Snowflake timeline referenced in the introduction provides complete details about each milestone and enforcement dates.

### What should I do now?

Amplitude recommends migrating to key pair authentication as soon as possible to:

- Ensure future compatibility
- Improve security
- Avoid any potential service interruptions

### Where can I get help?

If you encounter issues during migration:

- Contact [Amplitude Support](https://gethelp.amplitude.com) through your usual channels.
- Reference Snowflake's [key pair authentication documentation](https://docs.snowflake.com/en/user-guide/key-pair-auth).
- Ensure that your account name follows the `ORGNAME-ACCOUNTNAME` format.

## Migration impact

### Will I lose any data during migration?

No. Changing authentication method doesn't affect:

- Existing imported data
- Import configurations  
- Scheduled imports
- Data mappings

### Will there be duplicate data if I migrate?

No. Migration only changes authentication method. The source configuration (for example, tables and queries,) remains identical.

### Do I need to recreate my import queries?

No. All configurations are preserved:

- SQL queries
- Table selections
- Column mappings
- Import schedules

### Will my imports stop during migration?

There will be no interruptions. In your `Manage Import Setting`, the process is:

1. Add key pair auth
2. Verify connection
3. Remove password

Your imports will continue throughout the migration process.

## Technical Details

### Can I use the same Snowflake user?

Yes. Amplitude recommends that you:

- Keep the same user
- Add key pair auth through the `Manage Import Setting` in your existing Snowflake integration
- Remove password after verification

### What happens to my warehouse/database settings?

All settings preserved:

- Database connections
- Warehouse configurations
- Role permissions
- Custom queries

### Can I migrate sources one at a time?

Yes. You can:

- Migrate sources individually
- Test each migration
- Maintain mixed auth temporarily

## Best practices

### Should I create new users for key pair auth?

This isn't necessary. As a best practice:

- Use existing user
- Add key pair auth
- Share key pair across sources
- Remove password last

### How do I set up key pair authentication?

1. In your existing integration `Manage Import Settings`, select **Key pair** authentication
2. Click **Generate Key** to create a new key pair
3. Copy the generated public key
4. In Snowflake, run the following SQL command to add the public key to your user:

   ```sql
   ALTER USER "your_username" SET rsa_public_key='your_public_key_here';
   ```

5. Provide your organization and account names in the format `ORGNAME-ACCOUNTNAME`
6. Test the connection to verify it works
7. After verification, you can remove password authentication

### What format should I use for the account name?

Use the format `ORGNAME-ACCOUNTNAME`. To get the correct format, run this query in your Snowflake instance:

```sql
SELECT CURRENT_ORGANIZATION_NAME() || '-' || CURRENT_ACCOUNT_NAME();
```

### What if I get a "JWT token is invalid" error?

This error typically occurs when:

- The public key isn't properly set on the user
- The account name format is incorrect (should be `ORGNAME-ACCOUNTNAME`)
- There's a mismatch between the public and private keys

To resolve:

1. Verify the public key is correctly set on the Snowflake user
2. Confirm you're using the correct account name format
3. If needed, regenerate the key pair and update the public key in Snowflake
