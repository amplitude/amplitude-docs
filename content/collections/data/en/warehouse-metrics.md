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

{{partial:admonition type="beta" heading="This feature is in closed Beta"}}
If you're interested in testing the feature and providing feedback, contact your account team.
{{/partial:admonition}}

## How Warehouse Metrics work

Warehouse Metrics sync on a recurring schedule from tables in your data warehouse. Each row should include the following:

- **Time**: When the metric value is valid.  
- **User identifier**: The `user_id` or `device_id` to which the metric applies.
- **Insert identifier**: An optional unique identifier for deduplication. 
- **Metric values**: Numeric values (like revenue: 13423, count: 50).  
- **Dimensions** (optional): Categorical attributes (like `health_score`: `"green"`, or `paid: true`).

## Requirements

- An Amplitude project  
- Read access to your Snowflake instance  
- A table or view that contains metric values with timestamps and user identifiers  
- Change Data Capture (CDC) enabled for your metrics table

{{partial:admonition type="note" heading="Anonymous user support"}}  
Warehouse Metrics support both identified users (`user_id`) and anonymous users (`device_id`).  
{{/partial:admonition}}

## Metric types

Warehouse Metrics supports the following aggregation types on values:

- **Sum**: Total of all values  
- **Average**: Mean value across per-user sums  
- **Min**: Minimum value  
- **Max**: Maximum value

For more information, review [Warehouse Metric Calculations](/docs/data/warehouse-metric-calculations).

## Data types

- **Metrics**: Numeric values only (integers, decimals)  
- **Dimensions**: String, number, or boolean values for grouping and filtering

{{partial:admonition type="note" heading=""}}
Metrics require the source data to be numeric.
{{/partial:admonition}}

## Common use cases

Warehouse Metrics solve challenges where critical business metrics are difficult or impossible to calculate natively in Amplitude:

### Revenue and financial metrics

- **Average Order Value (AOV)**: Precomputed  
- **Credits Remaining/Used**: Account balance tracking

These metrics often require data that's too high-volume, sensitive, or non-event-based to send to Amplitude efficiently.

### Customer health metrics

- **Customer Lifetime Value (LTV)**: Forward-looking revenue projections  
- **Health Scores**: Composite metrics from multiple data sources  
- **Churn Risk**: Machine learning predictions from your warehouse

These metrics require modeling and forecasting that happens in your data warehouse.

### State metrics

- **Activation Status**: User onboarding state  
- **Subscription Tier**: Current plan level  
- **Beta Group Membership**: Feature access flags  
- **Experiment Exposure**: Assignment tracking

These metrics track current user state rather than discrete events.

## Import metric data

Warehouse Metrics supports Snowflake.

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

Follow the instructions in [Snowflake Data Import ](/docs/data/source-catalog/snowflake#add-and-configure-the-snowflake-source) to connect to your Snowflake instance.

## Data specifications

Your metrics table must include specific required fields and can optionally include additional fields. At least one metric or dimension field is required.

### Required fields

| Field       | Description                                      | Example                                |
| ---------- | ----------------------------------------------- | ------------------------------------- |
| `time`      | When the metric value is valid                   | `1762813185`                           |
| `user_id` or `device_id`   | A unique identifier for a user or device.                | `user_12345`                           |

{{partial:admonition type="note" heading="Time conversion"}}  
Amplitude requires that the incoming time is represented in milliseconds from Unix epoch. Use Snowflake’s built-in conversion functions or other tooling in your data pipeline to convert to this format before Amplitude ingests the data.  
{{/partial:admonition}}

### Optional fields

| Field       | Description                                      | Example                                |
| ---------- | ----------------------------------------------- | ------------------------------------- |
| `insert_id` | A unique identifier for deduplication. | `51a87950-b35d-4a2f-b919-af92f00f75dd` |

### Metric fields

| Field Type | Description                              | Example        |
| --------- | :--------------------------------------- | ------------- |
| Metric     | Numeric value (integer or decimal)       | `150.25`         |
| Dimension  | String, boolean, or number for filtering/grouping | `"active"`, `true`, `10` |

### Example

```json
{
  "time": "1762813185",
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
  event_date AS "time",
  user_id AS "user_id",
  total_revenue AS "total_revenue",
  order_count AS "order_count",
  ltv AS "ltv",
  health_score AS "health_score",
  is_paid_customer AS "is_paid"
FROM DATABASE_NAME.SCHEMA_NAME.METRICS_TABLE
WHERE event_date >= CURRENT_DATE - INTERVAL '30 days'
```

## Add your metric to an experiment

Use Warehouse Metrics in end-to-end experiments or experiment results as:

- **Goals**: Measure impact on business metrics  
- **Analysis metrics**: Understand how experiments affect revenue, LTV, and other KPIs

When you create or edit an experiment, select metrics from the Warehouse source in the metrics picker.

{{partial:admonition type="note" heading="Last synced information"}}   
Warehouse Metrics display when they were last synced and when the next sync is scheduled.   
{{/partial:admonition}}

##### Creating a Warehouse Metric in your experiment

1. In the experiment, navigate to the **Metrics** panel.
2. Click **Create a custom metric**.
3. Enter a **Name** and **Description** for the metric.
4. Click the **Warehouse** tab.
5. Select the table you specified during data import.
6. Define the metric. Choose **Sum**, **User Average**, **Min**, or **Max**.
7. Select the column in the table you want to aggregate using the definition you selected.
8. Preview the results and click **Save**.

{{partial:admonition type="tip" heading=""}}
Warehouse metrics you previously created are available in the **Add Metric** dialog. You don't need to recreate them.
{{/partial:admonition}}

## Best practices

1. **Define metrics once**: Create metrics in your warehouse and reference them everywhere in Amplitude  
2. **Use descriptive names**: Name metrics clearly (like "Average Order Value" not "metric_1")  
3. **Include descriptions**: Add descriptions in the Metrics creation flow to help users understand what each metric measures  
4. **Start with key metrics**: Begin with 5-10 critical metrics before expanding  

## Troubleshooting

If you encounter issues with Warehouse Metrics, these common problems and solutions can help you resolve them.

### Sync failures

- Ensure data retention period is at least seven days, unless you use Snowflake Standard Edition, then set it to one day.  
- Verify warehouse credentials haven't expired.  
- Check that the table structure hasn't changed.
- Ensure Change Data Capture (CDC) is enabled in your Snowflake table or view.
- Verify the sync completed successfully in the activity log

## Limitations

- Warehouse Metrics require a unique user identifier per row  
- Metric values can only be numeric (dimensions can be strings, numbers, or booleans)  
- Each metric represents a point-in-time value, not an event stream  
- Amplitude doesn't support rollup or aggregate tables without unique user identifiers  
- Warehouse metrics don’t support CUPED or group by

## FAQs

### Can I Use Warehouse Metrics without sending events to Amplitude?

Yes, but Warehouse Metrics are most powerful when combined with behavioral events. You can create metric-only charts if needed.

### What are the differences between Warehouse Metrics and Profiles?

Profiles sync current user attributes. Warehouse Metrics sync time-series numeric values that can be aggregated, used as experiment goals, and visualized over time.
