---
id: 51a87950-b35d-4a2f-b919-af92f00f75dd
blueprint: data
title: 'Warehouse Metrics Overview'
this_article_will_help_you:
  - 'Import precomputed metrics from your data warehouse into Amplitude'
  - 'Use warehouse-defined metrics in experiments and analytics'
  - 'Maintain consistency between your warehouse and Amplitude metrics'
landing: false
exclude_from_sitemap: false
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1762800477
---
Warehouse Metrics enable you to import precomputed metrics directly from your data warehouse into Amplitude, ensuring consistency between your source of truth and your analytics.

Unlike event-based metrics that Amplitude calculates from behavioral data, Warehouse Metrics sync pre-calculated values from your warehouse. This lets you use critical business metrics like revenue, customer lifetime value, health scores, and financial KPIs alongside behavioral data in Amplitude's analytics and experimentation tools.

## How Warehouse Metrics work

Warehouse Metrics sync on a recurring schedule from tables in your data warehouse. Each metric value includes:

- **Timestamp**: When the metric value is valid
- **User identifier**: The `user_id`, `device_id`, or `group_id` the metric applies to
- **Metric values**: Numeric values (like revenue: 13423, count: 50)
- **Dimensions** (optional): Categorical attributes (like `health_score`: `"green"`, or `paid: true`)

Amplitude displays the most current data synced from your warehouse.

## Requirements

- An Amplitude project (Enterprise or Growth plan)
- Read access to your data warehouse
- A table containing metric values with timestamps and user identifiers
- Change Data Capture (CDC) enabled for your metrics table

{{partial:admonition type="note" heading="Anonymous user support"}}
Warehouse Metrics support both identified users (`user_id`) and anonymous users (`device_id`).
{{/partial:admonition}}

## Metric types

Warehouse Metrics supports the following aggregation types:

- **Sum**: Total of all values
- **User Average**: Mean value across users
- **Min**: Minimum value
- **Max**: Maximum value

For detailed explanations of each calculation type with examples and use cases, review [Warehouse Metric calculations](/docs/data/warehouse-metric-calculations).

## Data types

- **Metrics**: Numeric values only (integers, decimals)
- **Dimensions**: String or boolean values for grouping and filtering

## Limits

| Plan       | Limits                                    |
| ---------- | ----------------------------------------- |
| Enterprise | 1 billion operations per month            |
| Growth     | 300 million operations per month          |

## Common use cases

Warehouse Metrics solve challenges where critical business metrics are difficult or impossible to calculate natively in Amplitude:

### Revenue and financial metrics

- **Average Order Value (AOV)**: Total Revenue / Number of Orders
- **Customer Acquisition Cost (CAC)**: Marketing Spend / New Customers
- **Credits Remaining/Used**: Account balance tracking

These metrics often require data that's too high-volume, sensitive, or non-event-based to send to Amplitude efficiently.

### Customer health metrics

- **Customer Lifetime Value (LTV)**: Forward-looking revenue projections
- **Health Scores**: Composite metrics from multiple data sources
- **Churn Risk**: ML-based predictions from your warehouse

These metrics require modeling and forecasting that happens in your data warehouse.

### State metrics

- **Activation Status**: User onboarding state
- **Subscription Tier**: Current plan level
- **Beta Group Membership**: Feature access flags
- **Experiment Exposure**: Assignment tracking

These metrics track current user state rather than discrete events.

## Set up Warehouse Metrics

Warehouse Metrics supports Snowflake. Support for additional data warehouses is coming soon.

### Enable change tracking

If this is your first time importing from this table, enable change tracking in Snowflake:

```sql
ALTER TABLE YOUR_DATABASE.YOUR_SCHEMA.YOUR_METRICS_TABLE 
  SET DATA_RETENTION_TIME_IN_DAYS = 7;

ALTER TABLE YOUR_DATABASE.YOUR_SCHEMA.YOUR_METRICS_TABLE 
  SET CHANGE_TRACKING = TRUE;
```

{{partial:admonition type="note" heading="Snowflake Standard Edition"}}
On Snowflake Standard Edition, the maximum retention time is one day. Set your sync frequency to 12 hours.
{{/partial:admonition}}

### Connect and configure

1. In Amplitude Data, navigate to *Connections Overview*. In the *Sources* panel, click *Add More*.
2. Find and click the Snowflake tile.
3. On the *Set Up Connection* tab, connect to your data warehouse. Enter your Snowflake credentials as outlined in the [Snowflake Data Import guide](/docs/data/source-catalog/snowflake#add-snowflake-as-a-source). You can create a new connection or reuse an existing one. Click *Next*.
4. Under *Select Table*, find and click the table containing your metrics.
5. Under *Column Mapping*, map your table columns to required fields:
   - **Timestamp**: Column containing when the metric value is valid
   - **User ID**: Column with `user_id`, `device_id`, or `group_id`
   - **Metric columns**: Numeric columns you want to import
   - **Dimension columns**: Optional string or boolean columns for filtering
6. On the *Select Data* tab, select **Metrics** as the data type.
7. Amplitude pre-selects the change data capture import strategy:
   - **Insert**: Creates new metric values
   - **Update**: Syncs changes to existing values
   - **Delete**: Removes metric values
8. Click *Test Mapping* to verify your configuration. Then click *Next*.
9. Name the source and set the sync frequency (default: 12 hours).
10. Click *Save and Enable* to begin syncing metrics.

## Data specifications

Your metrics table must include specific required fields and can optionally include additional metric and dimension fields.

### Required fields

| Field       | Description                                                  | Example              |
| ----------- | ------------------------------------------------------------ | -------------------- |
| `timestamp` | When the metric value is valid                                | 2025-01-15 14:30:00  |
| `user_id`   | User, device, or group identifier                             | user_12345           |

### Metric fields

| Field Type  | Description                                                  | Example              |
| ----------- | ------------------------------------------------------------ | -------------------- |
| Metric      | Numeric value (integer or decimal)                            | 150.25               |
| Dimension   | String or boolean for filtering/grouping                      | "active," true       |

### Example

```json
{
  "timestamp": "2025-01-15T14:30:00Z",
  "user_id": "user_12345",
  "total_revenue": 1543.50,
  "order_count": 12,
  "ltv": 15430.00,
  "health_score": "green",
  "is_paid": true
}
```

## SQL template

```sql
SELECT
  event_date AS "timestamp",
  user_id AS "user_id",
  total_revenue AS "total_revenue",
  order_count AS "order_count",
  ltv AS "ltv",
  health_score AS "health_score",
  is_paid_customer AS "is_paid"
FROM DATABASE_NAME.SCHEMA_NAME.METRICS_TABLE
WHERE event_date >= CURRENT_DATE - INTERVAL '30 days'
```

## Use Warehouse Metrics in Amplitude

After syncing, Warehouse Metrics appear throughout Amplitude with a warehouse icon indicator.

### In Experiment

Use Warehouse Metrics as:

- **Experiment goals**: Measure impact on business metrics
- **Analysis metrics**: Understand how experiments affect revenue, LTV, and other KPIs

When you create or edit an experiment, select metrics from the Warehouse source in the metrics picker.

{{partial:admonition type="note" heading="Last synced information"}}
Warehouse Metrics display when they were last synced and when the next sync is scheduled.
{{/partial:admonition}}

### In analytics

Use Warehouse Metrics in:

- **Event Segmentation**: Visualize metric trends over time
- **Data Tables**: Combine metrics with behavioral events
- **Notebooks and Dashboards**: Add metric cards to workspaces
- **Cohorts**: Create audiences based on metric values (Beta)

### Group and filter by dimensions

If you included dimension columns, you can:

- **Group by**: Break down metrics by dimension values (like health_score, subscription_tier)
- **Filter by**: Analyze specific segments (like is_paid: true)

## Manage Warehouse Metrics

You can view, govern, and control access to your Warehouse Metrics through several interfaces in Amplitude.

### Metrics home

View and manage your Warehouse Metrics in the Metrics home:

- View the source warehouse and SQL definition
- Check sync status and schedule
- View usage across experiments and charts
- Access the activity log for configuration changes

### Access control

Configure who can create and manage Warehouse Metrics using Amplitude's role-based access control (RBAC). Data engineers typically create metrics, while product and marketing teams use them in analysis.

### Verified Metrics

Mark critical Warehouse Metrics as "verified" to indicate they're approved for company-wide use. This helps teams trust and adopt standardized metrics.

## Best practices

1. **Define metrics once**: Create metrics in your warehouse and reference them everywhere in Amplitude
2. **Use descriptive names**: Name metrics clearly (like "Average Order Value" not "metric_1")
3. **Include descriptions**: Add descriptions in the Metrics creation flow to help users understand what each metric measures
4. **Set appropriate sync frequency**: 
   - Use 12-hour sync for most use cases
   - Consider more frequent syncs for time-sensitive experiments
5. **Start with key metrics**: Begin with 5-10 critical metrics before expanding
6. **Document your SQL**: Keep your warehouse SQL well-documented for future updates

## Troubleshooting

If you encounter issues with Warehouse Metrics, these common problems and solutions can help you resolve them.

### Metrics not appearing after setup

- Verify your table has data with recent timestamps
- Check that change tracking is enabled
- Confirm column mapping is correct
- Review the activity log for errors

### Sync failures

- Ensure data retention period is at least 7 days
- Verify warehouse credentials haven't expired
- Check that the table structure hasn't changed

### Data mismatch between warehouse and Amplitude

- Compare timestamps—Amplitude displays the most recently synced value
- Check if mutations (updates/deletes) are syncing correctly
- Verify the sync completed successfully in the activity log

## Limitations

- Warehouse Metrics require a unique user identifier per row
- Metric values can only be numeric (dimensions can be strings or booleans)
- Each metric represents a point-in-time value, not an event stream
- Groups and entity support coming soon
- Amplitude doesn't yet support rollup or aggregate tables without unique identifiers

## FAQs

### Use Warehouse Metrics without sending events to Amplitude

Yes, but Warehouse Metrics are most powerful when combined with behavioral events. You can create metric-only charts if needed.

### Differences between Warehouse Metrics and Profiles

Profiles sync current user attributes. Warehouse Metrics sync time-series numeric values that can be aggregated, used as experiment goals, and visualized over time.

### Edit Warehouse Metrics after creation

You can update the sync schedule and configuration. To change the metric definition, update the SQL in your data warehouse.

### Metrics when a user is deleted

Warehouse Metrics integrate with Amplitude's data deletion compliance system, including SSDD, user deletion, and TTL deletion.

### Warehouse Metrics and event volume limits

No. Warehouse Metrics have separate limits based on operations (insert/update/delete) per month.

## Related documentation

- [Warehouse Metric calculations](/docs/data/warehouse-metric-calculations) - Understand Sum, User Average, Min, and Max calculations
- [Profiles](/docs/data/profiles) - Import user profile data from your warehouse
- [Snowflake Data Import](/docs/data/source-catalog/snowflake) - Detailed Snowflake connection guide
- [Warehouse-native Amplitude](/docs/data/warehouse-native/overview) - Run analyses directly on warehouse data