---
id: 762c167a-caad-4a25-9758-3b35af55857d
blueprint: data
title: Profiles
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1727805387
---
Profiles enable you to join customer profile data from your data warehouse with existing behavioral product data already in Amplitude.

{{partial:admonition type='note'}}
This feature is currently in an **open beta**.
{{/partial:admonition}}

Profiles act as standalone properties, in that they aren't associated with specific events and are instead associated with a user profile. They're different from traditional user properties and offer the opportunity to conduct more expansive analyses.

Profiles always display the most current data synced from your warehouse.

## Before you begin

Regardless of whether you're using Snowflake or Databricks, Change Data Capture (CDC) **doesn't support replacing existing tables**. Instead, you must use incremental modeling. If the table you integrate with drops and replaces data, the connection breaks.

### Profiles limits

| Plan       | Limits                                                      |
| ---------- | ----------------------------------------------------------- |
| Enterprise | 1 billion operations (insert / update / delete) per month   |
| Growth     | 300 million operations (insert / update / delete) per month |

Each profile must associate to a `user_id`.

### Snowflake users
If this is your first time importing data from this table, set a data retention time and enable change tracking in Snowflake with the following commands:

```sql
ALTER TABLE DATAPL_DB_STAG.PUBLIC.PROFILES_PROPERTIES_TABLE_1 SET DATA_RETENTION_TIME_IN_DAYS = 7;
 
ALTER TABLE DATAPL_DB_STAG.PUBLIC.PROFILES_PROPERTIES_TABLE_1 SET CHANGE_TRACKING = TRUE;
```
On Snowflake Standard Edition plans, the maximum retention time is one day. If you’re on this plan, you should set the frequency to 12 hours in later steps. 

### Databricks users
Follow these instructions to [enable change tracking](https://docs.databricks.com/en/delta/delta-change-data-feed.html#enable):

* If you're working with a new table, set the table property `delta.enableChangeDataFeed = true` in the `CREATE TABLE` command:
    `CREATE TABLE student (id INT, name STRING, age INT) TBLPROPERTIES (delta.enableChangeDataFeed = true)`
    
    Also set `spark.databricks.delta.properties.defaults.enableChangeDataFeed = true` for all new tables.

* If you're working with an existing table, set the table property `delta.enableChangeDataFeed = true` in the `ALTER TABLE` command:
    `ALTER TABLE myDeltaTable SET TBLPROPERTIES (delta.enableChangeDataFeed = true)`

Set a [data retention period](https://docs.databricks.com/en/delta/history.html#configure-data-retention-for-time-travel-queries). This must be at least one day, but in most cases you should set this period to seven days or longer. If your retention period is too short, the import process can fail.

## Set up a profile (Snowflake users)
To set up a profile in Amplitude, follow these steps:

1. In Amplitude Data, navigate to *Connections Overview*. Then in the *Sources panel*, click *Add More*. Scroll down until you find the Snowflake tile and click it.
2. On the *Set Up Connection* tab, connect Amplitude to your data warehouse by filling in all the relevant fields under *Snowflake Credentials*, which are outlined in the [Snowflake Data Import guide](/docs/data/source-catalog/snowflake#add-snowflake-as-a-source). You can either create a new connection, or reuse an existing one. Click *Next* when you're done.
3. You can see a list of your tables under *Select Table*. To begin column mapping, click the table you're interested in.
4. In the list of required fields under *Column Mapping*, enter the column names in the appropriate fields to match columns to required fields. To add more fields, click *+ Add field*.
5. On the *Select Data* tab, select the `profiles` data type. Amplitude pre-selects the required change data capture import strategy for you, which you can see under the *Select Import Strategy* dropdown:

    * **Insert**: Always on, creates new profiles when added to your table.
    * **Update**: Syncs changes to values from your table to Amplitude.
    * **Delete**: Syncs deletions from your table to Amplitude.

6. When you're done, click *Test Mapping* verify your mapping information. Then click *Next*.
7. Name the source and set the frequency at which Amplitude should refresh your profiles from the data warehouse. You should set the frequency to 12 hours if you are on Snowflake Standard Edition.

## Set up a profile (Databricks users)
To set up a profile in Amplitude, follow these steps:

1. In Amplitude Data, navigate to *Connections Overview*. Then in the *Sources* panel, click Add More. Scroll down until you find the Databricks tile and click it.
2. In the *Set Up Connection* tab, connect Amplitude to your data warehouse. Have the following information ready:
    * **Server hostname**: This is the hostname of your Databricks cluster. You can find it in your cluster configuration by navigating to *Advanced Options -> JDBC/ODBC -> Server Hostname*.
    * **HTTP path**: This is the HTTP path of the cluster you would like to connect to. You can find it in your cluster configuration by navigating to *Advanced Options -> JDBC/ODBC -> HTTP Path*.
    * **Personal access token**: Use the personal access token to authenticate with your Databricks cluster. [Learn how to create them here](https://docs.databricks.com/en/dev-tools/auth/index.html#common-tasks-for-databricks-authentication).

    Click Next when you're done.
3. You can see a list of your tables under *Select Table*. To begin column mapping, click the table you're interested in.
4. In the list of required fields under *Column Mapping*, enter the column names in the appropriate fields to match columns to required fields. To add more fields, click *+ Add field*.
5. In the *Data Selection* tab, select the `profiles` data type.
6. When you're done, click *Test Mapping* to verify your mapping information. Then click *Next*.
7. Name the source and set the frequency at which Amplitude should refresh your profiles from the data warehouse. The default frequency is 12 hours, but you can change it.

## Data specifications

| Field                | Description                                                                                                              | Example |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------- |
| `user_id`            | Identifier for the user. Must have a minimum length of 5.                                                                |
| `Profile Property 1` | Profile property set at the user level. The value of this field is the value from the customer’s source since last sync. |
| `Profile Property 2` | Profile property set at the user level. The value of this field is the value from the customer’s source since last sync. |

Example:
```json
{
  "user_id": 12345,
  "number of purchases": 10,
  "title": "Data Engineer"
}
```

See [this article for information on Snowflake profiles](/docs/data/source-catalog/snowflake#profile-properties).

## SQL template

```sql
SELECT
         AS "user_id",
         AS "profile_property_1",
         AS "profile_property_2"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

## Clear a profile value

When you remove profile values in your data warehouse, those values sync to Amplitude during the next sync operation. You can also use Amplitude Data to remove unused property fields from users in Amplitude.

## Sample queries

```sql
SELECT 
	user_id as "user_id",
	upgrade_propensity_score as "Upgrade Propensity Score",
	user_model_version as "User Model Version"
FROM
	ml_models.prod_propensity_scoring
```

```sql
SELECT 
	m.uid as "user_id",
	m.title as "Title",
	m.seniority as "Seniority",
	m.dma as "DMA"
FROM
	prod_users.demo_data m
```