---
id: 0aecc9dc-f80b-44f4-8ead-4ae0e4fd2603
blueprint: warehouse_native_amplitude
title: 'Warehouse-native Amplitude: Best Practices'
source: 'https://help.amplitude.com/hc/en-us/articles/26004084762011-Warehouse-native-Amplitude-Best-Practices'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717541658
---
Warehouse-native Amplitude enables you to bring your own models to your analyses. However, to get the most out of your data as quickly as possible, you should consider these best practices:

## Clustering key

* Choose appropriate columns for clustering keys based on the query patterns and filtering conditions in your analytics workload.
  * For example, for event (fact) tables, cluster on event time using the `LINEAR()` function.
* Avoid using columns with high cardinality as clustering keys. This can lead to inefficiencies in data storage and query performance.
* Use composite clustering keys with multiple columns often used in join operations, or for filtering.

## Schema format

* Use a star schema or Snowflake schema to optimize query performance and simplify data analysis.
    * Star schema: features a central fact table linked to dimension tables, suitable for simpler queries and faster aggregations.
    * Snowflake schema: a normalized version of the star schema, which minimizes data redundancy and improves data integrity at the cost of more complex queries.

## Partition and clustering

Partition large tables to reduce the amount of data scanned, and improve query performance.
