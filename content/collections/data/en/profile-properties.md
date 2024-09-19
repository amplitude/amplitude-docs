---
id: 762c167a-caad-4a25-9758-3b35af55857d
blueprint: data
title: Profiles
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1726776950
---
**Profiles** enable you to merge customer profile data from your data warehouse with existing behavioral product data already in Amplitude. 

Profiles act as standalone properties, in that they aren't associated with specific events and are instead associated with a user profile. In this way, they're different from traditional user properties.

Profiles always display the most current data synced from your warehouse.

## Setup

To set up a profile in Amplitude, follow these steps:

1. In Amplitude Data, navigate to *Connections > Catalog* and click the Snowflake tile.
2. In the *Set Up Connection* tab, connect Amplitude to your data warehouse by filling in all the relevant fields under *Snowflake Credentials*. You can either create a new connection, or reuse an existing one. Click *Next* when you're done.
3. In the *Verify Instrumentation* tab, follow the steps described in the [Snowflake Data Import guide](/docs/data/source-catalog/snowflake#add-snowflake-as-a-source). Click *Next* when you're done.
4. in the *Select Data* tab, select the `profiles` data type. Amplitude pre-selects the required change data capture import strategy for you, which you can see under the *Select Import Strategy* dropdown:

    * **Insert**: Always on, creates new profiles when added to your table.
    * **Update**: Syncs changes to values from your table to Amplitude.
    * **Delete**: Syncs deletions from your table to Amplitude.

When you're done, click *Next* to move on to data mapping.

{{partial:admonition type='note'}}
If this is the first time you're importing data from this table, set a data retention time and enable change tracking in Snowflake with the following commands:

```sql
ALTER TABLE DATAPL_DB_STAG.PUBLIC.PROFILE_PROPERTIES_TABLE_1 SET DATA_RETENTION_TIME_IN_DAYS = 7;

ALTER TABLE DATAPL_DB_STAG.PUBLIC.PROFILE_PROPERTIES_TABLE_1 SET CHANGE_TRACKING = TRUE;
```
Snowflake Standard Edition plans have a maximum retention time of one day.
{{/partial:admonition}}

5. You can see a list of your tables under *Select Table.* To begin column mapping, click the table you're interested in.
6. In the list of required fields under *Column Mapping,* enter the column names in the appropriate fields to match columns to required fields. To add more fields, click *+ Add field*. 
7. When you're done, click *Test Mapping* to verify your mapping information. When you're ready, click *Next.*
8. Name the source and set the frequency at which Amplitude should refresh your profiles from the data warehouse.

## Data specifications

Profiles supports a maximum of 200 warehouse properties, and supports known Amplitude users. A `user_id` must go with each profile.

| Field               | Description                                                                                                                   | Example                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `user_id`             | Identifier for the user. Must have a minimum length of 5.                                                                     | 
| `Profile Property 1`  | Profile property set at the user level. The value of this field is the value from the customer’s source since last sync. |
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