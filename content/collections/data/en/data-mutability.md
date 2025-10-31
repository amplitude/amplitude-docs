---
id: 8f2a1b3c-4d5e-6f7g-8h9i-0j1k2l3m4n5o
blueprint: data
title: 'Data Mutability Features'
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1760633174
academy_course:
  - 2fe42547-ffe6-4b8a-a5fd-2b50ff7c13c5
landing: false
---
Amplitude's Data Mutability features enable you to keep data consistent between your warehouse and Amplitude by supporting `INSERT`, `UPDATE`, and `DELETE` operations on your event data. This capability is available through Mirror Sync strategies across multiple warehouse integrations, allowing you to keep your Amplitude data synchronized with your source of truth.

Data Mutability allows you to:

- **Insert** new events into Amplitude
- **Update** existing events with new information
- **Delete** events that should no longer exist in your analytics

This functionality is particularly valuable for organizations that need to:

- Correct historical data errors
- Adhere to data privacy regulations (GDPR, CCPA)
- Maintain data consistency across systems
- Handle late-arriving or corrected data

## Supported data sources

Data Mutability is available through the following warehouse integrations:

### Snowflake
- **Mirror Sync** strategy with Change Data Capture (CDC)
- Supports `INSERT`, `UPDATE`, and `DELETE` operations
- Requires Change Tracking to be enabled on source tables
- [Learn more about Snowflake integration →](/docs/data/source-catalog/snowflake)

### Databricks
- **Mirror Sync** strategy with Change Data Feed (CDF)
- Supports `INSERT`, `UPDATE`, and `DELETE` operations  
- Requires Change Data Feed to be enabled on Delta tables
- [Learn more about Databricks integration →](/docs/data/source-catalog/databricks)

### Amazon S3
- **Mirror Sync** strategy for file-based mutations
- Supports `INSERT`, `UPDATE`, and `DELETE` operations
- Requires structured mutation metadata in your data files
- [Learn more about Amazon S3 integration →](/docs/data/source-catalog/amazon-s3)

## Mirror sync strategy

When you enable Mirror Sync with data mutability:

1. **Change Detection**: The integration monitors your warehouse for data changes using native change tracking features (CDC for Snowflake, CDF for Databricks, or file metadata for S3)

2. **Operation Processing**: Amplitude processes three types of operations:
   - `INSERT`: Adds new events to Amplitude
   - `UPDATE`: Modifies existing events in Amplitude
   - `DELETE`: Removes events from Amplitude

3. **Data Synchronization**: Changes apply to keep consistency between your warehouse and Amplitude

## Enrichment services

{{partial:admonition type="warning" heading="Enrichment Services Disabled"}}
When using Mirror Sync with data mutability, Amplitude disables enrichment services including:
- ID resolution and user merging
- Property and attribution syncing  
- Location resolution
- Taxonomy validation

This ensures your data remains exactly as it exists in your source of truth.
{{/partial:admonition}}

## General requirements

- **User ID Required**: All events must contain a user ID. Anonymous events aren't supported with Mirror Sync
- **Unique Insert ID**: Each event should have a unique and immutable `insert_id` to prevent duplication
- **Chronological Order**: Process events in chronological order when possible

## Event volume considerations

{{partial:admonition type="note" heading="Event Volume Impact"}}
Data mutations count toward your event volume:

- **Warehouse Sources (Snowflake, Databricks)**: Multiple operations on the same event within a sync window count as one event
- **File Sources (S3)**: Each operation counts separately toward your event volume

Monitor your usage and contact sales if you need additional event volume.
{{/partial:admonition}}

### Data retention

- **Snowflake**: `DATA_RETENTION_TIME_IN_DAYS` must be ≥ 1 (recommended: ≥ 7 days)
- **Databricks**: Change Data Feed retention must cover your sync frequency
- **S3**: Files must remain accessible throughout processing

## Best practices

Keep the following best practices in mind as you enable data mutability.

### Plan your implementation

1. **Start with a Test Project**: Create a dedicated test environment to validate your mutation logic before implementing in production

2. **Design for Idempotency**: Ensure your mutation operations can be safely retried without causing data inconsistencies

3. **Monitor Data Quality**: Implement validation checks to ensure mutations apply correctly

### Data privacy compliance

When using data mutability for privacy compliance:

1. **Stop Data Flow First**: Before you delete user data, ensure you send no new data about that user to Amplitude.

2. **Use User Privacy API**: For complete user deletion, use the [User Privacy API](/docs/apis/analytics/user-privacy) with warehouse deletions

3. **Verify Deletion**: Confirm that deleted data no longer appears in your analytics

### Performance optimization

- **Batch Operations**: Group related mutations together when possible
- **Optimize Sync Frequency**: Balance data freshness needs with processing overhead
- **Monitor Resource Usage**: Track warehouse compute costs associated with change tracking

## Migration to data mutability

If you're migrating from a standard ingestion strategy to Mirror Sync:

### Recommended migration steps

1. **Create Cutoff Strategy**: 
   - Modify existing connection with a time filter (for example, `WHERE time < {cutOffDate}`)
   - Set cutoff date to tomorrow in milliseconds since epoch

2. **Wait for Cutoff**: Allow the cutoff date to pass and verify no new data flows through the old connection

3. **Create New Mirror Sync Source**: 
   - Configure new source with complementary filter (for example, `WHERE time >= {cutOffDate}`)
   - Enable Mirror Sync with desired mutation settings

4. **Clean Up**: Remove the old source connection after verifying the new one works correctly

## Common Issues

**Events Don't Update**
- Verify change tracking is enabled on source tables
- Check that events contain required user IDs
- Confirm sync frequency settings

**Missing Deletions**
- Ensure DELETE operations are properly configured in your source
- Verify that deleted events had valid user IDs
- Check that change retention periods haven't expired

**Data Inconsistencies**
- Review mutation operation ordering
- Verify that you disabled enrichment services as expected
- Check for timing issues between warehouse changes and sync execution