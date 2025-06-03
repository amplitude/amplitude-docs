---
id: 8f2a1b3c-4d5e-6f7g-8h9i-0j1k2l3m4n5o
blueprint: data
title: 'Data Mutability Features'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1735574400
---
Amplitude's Data Mutability features enable you to maintain data consistency between your warehouse and Amplitude by supporting `INSERT`, `UPDATE`, and `DELETE` operations on your event data. This capability is available through Mirror Sync strategies across multiple warehouse integrations, allowing you to keep your Amplitude data synchronized with your source of truth.

## Overview

Data Mutability allows you to:

- **Insert** new events into Amplitude
- **Update** existing events with new information
- **Delete** events that should no longer exist in your analytics

This functionality is particularly valuable for organizations that need to:

- Correct historical data errors
- Comply with data privacy regulations (GDPR, CCPA)
- Maintain data consistency across systems
- Handle late-arriving or corrected data

## Supported Integrations

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

## How Data Mutability Works

### Mirror Sync Strategy

When you enable Mirror Sync with data mutability:

1. **Change Detection**: The integration monitors your warehouse for data changes using native change tracking features (CDC for Snowflake, CDF for Databricks, or file metadata for S3)

2. **Operation Processing**: Amplitude processes three types of operations:
   - `INSERT`: Adds new events to Amplitude
   - `UPDATE`: Modifies existing events in Amplitude
   - `DELETE`: Removes events from Amplitude

3. **Data Synchronization**: Changes are applied to maintain consistency between your warehouse and Amplitude

### Enrichment Services

{{partial:admonition type="warning" heading="Enrichment Services Disabled"}}
When using Mirror Sync with data mutability, Amplitude disables enrichment services including:
- ID resolution and user merging
- Property and attribution syncing  
- Location resolution
- Taxonomy validation

This ensures your data remains exactly as it exists in your source of truth.
{{/partial:admonition}}

## Key Requirements and Limitations

### General Requirements

- **User ID Required**: All events must contain a user ID. Anonymous events are not supported with Mirror Sync
- **Unique Insert ID**: Each event should have a unique and immutable `insert_id` to prevent duplication
- **Chronological Order**: Events should be processed in chronological order when possible

### Event Volume Considerations

{{partial:admonition type="note" heading="Event Volume Impact"}}
Data mutations count toward your event volume:

- **Warehouse Sources (Snowflake, Databricks)**: Multiple operations on the same event within a sync window count as one event
- **File Sources (S3)**: Each operation counts separately toward your event volume

Monitor your usage and contact sales if you need additional event volume.
{{/partial:admonition}}

### Data Retention

- **Snowflake**: `DATA_RETENTION_TIME_IN_DAYS` must be ≥ 1 (recommended: ≥ 7 days)
- **Databricks**: Change Data Feed retention must cover your sync frequency
- **S3**: Files must remain accessible for the duration of processing

## Best Practices

### Planning Your Implementation

1. **Start with a Test Project**: Create a dedicated test environment to validate your mutation logic before implementing in production

2. **Design for Idempotency**: Ensure your mutation operations can be safely retried without causing data inconsistencies

3. **Monitor Data Quality**: Implement validation checks to ensure mutations are applied correctly

### Data Privacy Compliance

When using data mutability for privacy compliance:

1. **Stop Data Flow First**: Before deleting user data, ensure no new data about that user is being sent to Amplitude

2. **Use User Privacy API**: For complete user deletion, use the [User Privacy API](/docs/apis/analytics/user-privacy) in addition to warehouse deletions

3. **Verify Deletion**: Confirm that deleted data no longer appears in your analytics

### Performance Optimization

- **Batch Operations**: Group related mutations together when possible
- **Optimize Sync Frequency**: Balance data freshness needs with processing overhead
- **Monitor Resource Usage**: Track warehouse compute costs associated with change tracking

## Migration to Data Mutability

If you're migrating from a standard ingestion strategy to Mirror Sync:

### Recommended Migration Steps

1. **Create Cutoff Strategy**: 
   - Modify existing connection with a time filter (e.g., `WHERE time < {cutOffDate}`)
   - Set cutoff date to tomorrow in milliseconds since epoch

2. **Wait for Cutoff**: Allow the cutoff date to pass and verify no new data flows through the old connection

3. **Create New Mirror Sync Source**: 
   - Configure new source with complementary filter (e.g., `WHERE time >= {cutOffDate}`)
   - Enable Mirror Sync with desired mutation settings

4. **Clean Up**: Remove the old source connection after verifying the new one works correctly

## Troubleshooting

### Common Issues

**Events Not Updating**
- Verify change tracking is enabled on source tables
- Check that events contain required user IDs
- Confirm sync frequency settings

**Missing Deletions**
- Ensure DELETE operations are properly configured in your source
- Verify that deleted events had valid user IDs
- Check that change retention periods haven't expired

**Data Inconsistencies**
- Review mutation operation ordering
- Verify that enrichment services are disabled as expected
- Check for timing issues between warehouse changes and sync execution

### Getting Help

For additional support with Data Mutability features:

- Review integration-specific documentation for detailed setup instructions
- Contact your Customer Success Manager for implementation guidance
- Reach out to Amplitude Support for technical troubleshooting

## Related Resources

- [Snowflake Data Import](/docs/data/source-catalog/snowflake)
- [Databricks Integration](/docs/data/source-catalog/databricks)  
- [Amazon S3 Import](/docs/data/source-catalog/amazon-s3)
- [User Privacy API](/docs/apis/analytics/user-privacy)
- [Data Planning Workflow](/docs/data/data-planning-workflow)