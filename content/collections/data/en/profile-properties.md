---
id: 762c167a-caad-4a25-9758-3b35af55857d
blueprint: data
title: 'Profile properties'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1721926325
---
Profile properties enable you to merge customer profile data from your data warehouse with existing behavioral product data already in Amplitude. These values display the most current data synced from your warehouse.

{{partial:admonition type="note" heading=""}}
This feature isn't available in the EU.
{{/partial:admonition}}

## Setup

To set up a profile property in Amplitude, you must connect Amplitude to your data warehouse. Once connected, and you reach the data configuration section, you must select the “Warehouse Props” data type in the dropdown. From there, there are two minimum requirements for the import: a user identifier (`user_id`) and a profile property. Note: you may add more than one warehouse property per import, but there must be at least one per import.

## Data specifications

Profile properties supports a maximum of 200 warehouse properties, and supports known Amplitude users. A `user_id` must go with each profile property.

| Field               | Description                                                                                                                   | Example                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| User ID             | Identifier for the user. Must have a minimum length of 5.                                                                     | xyz@abc.com              |
| Profile Property 1  | Profile property set at the user-level. The value of this field is the value from the customer’s source since last sync. | “Title”: “Data Engineer” |
| Profile Property 2 | Profile property set at the user-level. The value of this field is the value from the customer’s source since last sync. | “City”: “San Francisco”  |

## SQL template


```sql
SELECT
         AS "user_id",
         AS "profile_property_1",
         AS "profile_property_2"
FROM DATABASE_NAME.SCHEMA_NAME.TABLE_OR_VIEW_NAME
```

## Clear a profile property value

When you remove profile property values in your data warehouse, those values sync to Amplitude during the next sync operation. You can also use Amplitude Data to remove unused property fields from users in Amplitude.

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