---
id: e4734233-911d-4b24-bea6-570c05955b05
blueprint: warehouse_native_amplitude
title: 'Build a warehouse-native data model'
source: 'https://help.amplitude.com/hc/en-us/articles/26004068419995-Build-a-warehouse-native-data-model'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717541636
---
Data models are the foundation for creating analyses within Warehouse-native Amplitude. Understanding how to structure your data is crucial for optimal performance and accurate insights.

While the following data types are like those used by traditional Amplitude, think of Warehouse-native events as a [fact table](https://en.wikipedia.org/wiki/Fact_table) and Warehouse-native properties (user, group, and event) as [dimensional tables](https://en.wikipedia.org/wiki/Dimension_(data_warehouse)).

## Supported data types

Warehouse-native Amplitude supports data types similar to the traditional platforms, with some additions:

| Type                          | Mandatory fields                             | Description                                                                                                                                                                                                              |
| ----------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Events                        | Unique ID <br /> Timestamp (`TIMESTAMP_NTZ`) | A specific action or interaction that's recorded and associated with a timestamp. Amplitude uses this ID to understand the project and organization’s MTU count as well as how Amplitude will count uniques in Analytics. |
| User properties (current)     | Unique ID                                    | These are current traits and attributes associated with an individual user at the present moment, such as their current preferences or recent interactions.                                                              |
| User properties (historical)  | Unique ID <br /> Start time <br /> End time  | These are traits and attributes associated with an individual user over time, such as historical preferences or past interactions.                                                                                       |
| Group properties (current)    | Unique ID                                    | Current characteristics and attributes of a group at the present moment, such as name, description, or membership composition.                                                                                           |
| Group properties (historical) | Unique ID <br /> Start time <br /> End time  | Past characteristics and attributes of a group or organization over time, such as previous name, description, or past membership composition.                                                                            |
| Event properties              | Event ID                                     | Current traits and attributes associated with a specific action or interaction that's recorded.                                                                                                                         |

## Data modeling approaches

Keep the following approaches in mind as you create your warehouse-native data model.

### Event data

Most organizations connect existing event data to the Event data type model, using one of the following approaches:

1. One event per table
2. Many event types in a single table

Amplitude recommends the "one event per table" approach for simplicity in setup and use as part of Analytics. "Multiple event types in a single table" is possible, but can complicate configuration.

### User data

User models most often map to the User Properties data type.

### Joining models

You can join Event and User models with each model's User ID or Unique ID.

Warehouse-native projects support multiple identity spaces. Keep in mind though, using models that cross identity spaces impacts the accuracy and usefulness of an analysis.

To join a Group model, select the corresponding ID in an existing Event or User Property model to establish the join.

## Flexibility in data types

Amplitude bases the data types in this article on and opinionated analysis structure. Warehouse-native Amplitude is flexible, however:

- Use the Event data model for fact tables in a data warehouse.
- Use the User property data model for any dimensional data models.

## Data structure recommendations

The structure of your data within a data warehouse or data lake impacts Amplitude's performance. Amplitude recommends that you model data in ways that the benefit analytical workloads that Warehouse-native Amplitude generates. For more detailed best practices, see [Warehouse-native Amplitude: Best Practices](/docs/data/warehouse-native/warehouse-native-amplitude-best-practices).

## Key considerations

1. Data model choice impacts analysis capabilities
2. Accurate insights require properly joined models
3. Even though Warehouse-native Amplitude is flexible, following the recommended structures can improve performance.
4. Consider your specific use case when you decide between one event per table or multiple events in a single table.

## Create a data model

1. In a Warehouse-native project, navigate to Amplitude Data and click *Add Models*.
2. Select **Table Selection** or **SQL Query** as the base table option.
   * Table selection provides selectable options based on the contents of your Snowflake instance. The available values reflect the access you granted to the set of credentials used for Warehouse-native Amplitude.
   * SQL Query provides more flexibility for base table creation. Join tables, filter rows and use any level of SQL you need to create the base table.

3. When the table is finished, complete the required fields. Supported data types are listed in the data types table at the top of this article.
4. Map the columns in the table or view you select.
5. Select or deselect any columns in the table.

    {{partial:admonition type="note" heading=""}}
    You can update this configuration post-set up. You can also use [Snowflake’s functions](https://docs.snowflake.com/en/sql-reference-functions) in the Source Column field to convert the value in the table into the desired value within Amplitude.
    {{/partial:admonition}}

6. Click Save to name your model.