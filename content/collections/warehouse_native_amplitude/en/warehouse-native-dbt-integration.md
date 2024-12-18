---
id: 06feb1be-15e3-419a-95ea-85a497dc07f5
blueprint: warehouse_native_amplitude
title: 'Warehouse-native DBT Integration'
this_article_will_help_you:
  - 'efficiently manage multiple models with a DBT integration'
landing: false
exclude_from_sitemap: false
---
The warehouse-native DBT integration helps you manage your warehouse native models.
Instead of managing one model at a time, you can create or edit multiple models 
leveraging the DBT manifest file.

## Approach

This section provides details about how to annotate the metadata for the DBT manifest file
to automatically generate all data models for you.

### Supported operations

Warehouse-native Amplitude supports both create and update operations with the manifest file. For each table present in the manifest file, multiple data models can be
created. 

To create data models based on a table, add `"amplitude_meta"` as a key to the
metadata for the table. The value associated with the `"amplitude_meta"` key must
be a dictionary with a single key, `"data_models"`. The value associated with
the `"data_models"` key must be a list of data model descriptions.

A data model description is a dictionary with three keys, `"name"`, `"type"`,
and `"special_columns"`. The value associated with the `"name"` key must be a
globally unique string among all data model descriptions, and is used to
identify the specific data model. If this name isn't present among the
data models already present, then a new data model will be created with this name.
Otherwise, the data model with that name will be overwritten with the specified
configuration.

The value associated with the `"type"` key defines
the type of data model and must be one of the following:
- `"EVENT"`
- `"EVENT_PROPERTIES"`
- `"CURRENT_USER_PROPERTIES"`
- `"HISTORICAL_USER_PROPERTIES"`
- `"CURRENT_GROUP_PROPERTIES"`
- `"HISTORICAL_GROUP_PROPERTIES"`

The value associated with the `"special_columns"` key must be a dictionary with
specified keys as follows:
| Data Model Type                 | Keys Expected                               |
| ------------------------------- | ------------------------------------------- |
| `"EVENT"`                       | `"unique_id"`, `"event_time"`               |
| `"EVENT_PROPERTIES"`            | `"event_type"`                              |
| `"CURRENT_USER_PROPERTIES"`     | `"unique_id"`                               |
| `"HISTORICAL_USER_PROPERTIES"`  | `"unique_id"`, `"start_time"`, `"end_time"` |
| `"CURRENT_GROUP_PROPERTIES"`    | `"unique_id"`                               |
| `"HISTORICAL_GROUP_PROPERTIES"` | `"unique_id"`, `"start_time"`, `"end_time"` |

Each key in the dictionary associated with the `"special_columns"` should be associated
with a string corresponding to the key in the `"columns"` dictionary.

{{partial:admonition type="note" heading="What happens to models that aren't configured in the manifest file?"}}
Amplitude ignores and doesn't alter models that aren't in the manifest file.
{{/partial:admonition}}

{{partial:admonition type="note" heading="What happens to tables which don't specify the `amplitude_meta` key?"}}
Amplitude ignores all such tables.
{{/partial:admonition}}

## Example

```json
{
  "nodes": {
    "event_table": {
      "database": "database",
      "schema": "schema",
      "name": "table_name",
      "meta": {
        "amplitude_meta": {
          "data_models": [
            {
              "name": "data_model_name",
              "type": "EVENT",
              "special_columns": {
                "unique_id": "unique_id_col",
                "event_time": "event_time_col"
              }
            }
          ]
        }
      },
      "columns": {
        "event_time_col": {
          "name": "event_time_col"
        },
        "unique_id_col": {
          "name": "unique_id_col"
        }
      }
    }
  }
}
```
