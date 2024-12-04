---
id: 131771f8-ba6f-4492-a6bd-a0105e6a71ff
blueprint: warehouse_native_amplitude
title: 'Warehouse Native Bulk Model Management'
this_article_will_help_you:
  - 'efficiently manage multiple models in batch'
landing: false
exclude_from_sitemap: false
updated_by: 36df5bf6-28d6-4b56-9bba-1c675073870d
updated_at: 1728602881
---
Bulk Model Management helps you manage your warehouse native models. Instead of managing one model at a time, you can create or edit multiple models with one configuration file.

## Approach

This section provides detail about the approach of using Bulk Model Management.

### Why YAML

A configuration file is a YAML-based file that enables you to define your models. [YAML](https://yaml.org/) is a human-friendly format that's easy to read and edit in a standard text editor or IDE.

### Supported operations

Warehouse-native Amplitude supports both create and update operations with the config file. If the model `name` exists, Amplitude updates the existing model based on that `name`. If the `name` doesn't exist, Amplitude creates a new model with that `name`. 

A model's `name` value is a unique identifier. Make sure model names in your configuration file are correct to ensure updates apply to the right model

{{partial:admonition type="note" heading="What happens to models that aren't in the config file?"}}
Amplitude ignores and doesn't alter models that aren't in the config file.
{{/partial:admonition}}

### Supported model types

Warehouse-native Amplitude Bulk Model Management supports these model types:

- Events
- User properties (current)  
- User properties (historical)
- Group properties (current) 
- Group properties (historical)
- Event properties  

## Create the configuration file

To get started:

- Download an example configuration file from Amplitude. On the *Data > Sources* tab of your warehouse-native project, click **Update/Create via YAML**. Click **Download YAML File** to generate a YAML file with all your project's models.
- Follow the [specification](#config-spec) below to create a new config file.

### Apply the changes

Upload your configuration file to apply changes to your models. All changes commit to the database in one transaction, and roll back automatically if the process encounters an error.

## Config specification

For information about creating a configuration file, see the following sections.

### Field descriptions

The following specification outlines the structure and purpose of the fields in the data modeling configuration file.

### DataModel object

| Field       | Type   | Description                                                                 |
|-------------|--------|-----------------------------------------------------------------------------|
| `apiVersion`  | string | Defines the API version for the data modeling configuration.                |
| `metadata`    | object | Contains metadata used primarily to identify the target models.             |
| `spec`        | object | Specifies the desired behavior and structure of the model.                  |

### Metadata object

| Field       | Type   | Description                                                                             |
|-------------|--------|-----------------------------------------------------------------------------------------|
| `org`         | string | A unique identifier for the organization.                                               |
| `app`         | string | A unique identifier for the app.                                                        |
| `integration` | string | A unique identifier for the data's integration type. Currently only support `snowflake` |

### Spec object

| Field       | Type   | Description                                                |
|-------------|--------|------------------------------------------------------------|
| `models`      | array  | A list of data models included in this specification.      |

### Model object

| Field          | Type   | Description                                                                                                                                                                |
|----------------|--------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `name`           | string | The name of the model which is used as the unique identifier.                                                                                                              |
| `selection`      | string | Specifies the selection type: either `sql` or `table`.                                                                                                                     |
| `type`           | string | The type of model could be `event`, `current_user_properties`, `historical_user_properties`, `current_group_properties`, `historical_group_properties`, `event_properties` |
| `tableConfig`    | object | Configuration settings for table-based models.                                                                                                                             |
| `sqlConfig`      | object | Configuration settings for SQL-based models.                                                                                                                               |

### TableConfig object

| Field             | Type   | Description                                                                                                     |
|-------------------|--------|-----------------------------------------------------------------------------------------------------------------|
| `database`          | string | The name of the database being used.                                                                            |
| `schema`            | string | The name of the schema within the database.                                                                     |
| `table`             | string | The name of the table within the schema.                                                                        |
| `isMultiEventTable` | bool   | Indicates if the table contains multiple event types (default is `false`). Only `false` is supported currently. |
| `multiEventConfig`  | object | Configuration details for multi-event tables (currently not supported).                                         |
| `requiredFields`    | object | Required fields necessary for defining the model based on its type.                                             |
| `additionalFields`  | array  | Definitions and mappings for additional fields/columns in the table.                                            |

### SQLConfig object

| Field             | Type   | Description                                                                                                                            |
|-------------------|--------|----------------------------------------------------------------------------------------------------------------------------------------|
| `query`             | string | The SQL query used to define the model.                                                                                                |
| `isMultiEventTable` | bool   | Reserved, Only `false` is supported currently. Indicates if the result is from a table with multiple event types (default is `false`). |
| `multiEventConfig`  | object | Configuration details for multi-event tables.                                                                                          |
| `requiredFields`    | object | Fields required to define the model for a specific type.                                                                               |
| `additionalFields`  | array  | An array of mappings for additional fields.                                                                                            |


### RequiredFields object (Event-Specific)

| Field       | Type                   | Description                                                                      |
|-------------|------------------------|----------------------------------------------------------------------------------|
| `eventTime`   | object (field mapping) | Field mapping configuration for event time, with the default label "Event Time". |
| `userId`      | object (field mapping) | Field mapping configuration for the user ID, with the default label "User ID".   |

### RequiredFields object (User Properties-Specific)

| Field       | Type                   | Description                                                                      |
|-------------|------------------------|----------------------------------------------------------------------------------|
| `userId`      | object (field mapping) | Field mapping configuration for the user ID, with the default label "User ID".   |

### RequiredFields object (Group Properties-Specific)

| Field       | Type                   | Description                                                                      |
|-------------|------------------------|----------------------------------------------------------------------------------|
| `groupId`     | object (field mapping) | Field mapping configuration for the group ID, with the default label "Group ID". |

### FieldMapping object

| Field   | Type   | Description                                                                                     |
|---------|--------|-------------------------------------------------------------------------------------------------|
| `column`  | string | The name of the column in the table or SQL result set.                                          |
| `label`   | string | The label displayed in Amplitude, defaulting to a title-cased version of the `column` name.     |

## Example

```yaml
apiVersion: warehouse/models/v1
metadata:
  org: 12345
  app: 12345
  integration: snowflake
spec:
  models:
    - name: Play Song
      selection: "table"
      type: "event"
      tableConfig:
        database: "DB_1234"
        schema: "SCHEMA_3456"
        table: "all_events"
        isMultiEventTable: true
        multiEventConfig:
          eventType:
            column: "Event_Type"
            label: "play"
          subEvents:
            - play_song
            - purchase_song
          excludedEvents:
            - cancel_subscription
        requiredFields:
          eventTime:
            column: "EVENT_TIME"
            label: "Event Time Label"
          userId:
            column: "USER_ID"
            label: "User ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Add Song #[tl! collapse:start]
      selection: "table"
      type: "event"
      tableConfig:
        database: "DB_1234"
        schema: "SCHEMA_3456"
        table: "add_songs"
        isMultiEventsTable: false
        requiredFields:
          eventTime:
            column: "EVENT_TIME"
            label: "Event Time Label"
          userId:
            column: "USER_ID"
            label: "User ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Pause Song
      selection: "sql"
      type: event
      sqlConfig:
        query: "SELECT * FROM schema_main.all_events"
        isMultiEventsTable: true
        multiEventConfig:
          eventType:
            column: "Event_Type"
            label: "play"
          subEvents:
            - play_song
            - purchase_song
          excludedEvents:
            - cancel_subscription
        requiredFields:
          eventTime:
            column: "EVENT_TIME"
            label: "Event Time Label"
          userId:
            column: "USER_ID"
            label: "User ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Delete Song
      selection: "sql"
      type: "event"
      sqlConfig:
        query: "SELECT * FROM schema_main.delete_songs"
        isMultiEventsTable: false
        requiredFields:
          eventTime:
            column: "EVENT_TIME"
            label: "Event Time Label"
          userId:
            column: "USER_ID"
            label: "User ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Current User Property Table-based
      selection: "table"
      type: "current_user_properties"
      tableConfig:
        database: "DB_1234"
        schema: "SCHEMA_3456"
        table: "user_properties"
        requiredFields:
          userId:
            column: "USER_ID"
            label: "User ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Current User Property sql-based
      selection: "sql"
      type: "current_user_properties"
      sqlConfig:
        query: "SELECT * FROM schema_main.current_user_properties"
        requiredFields:
          userId:
            column: "USER_ID"
            label: "User ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Historical User Property Table-based
      selection: "table"
      type: "current_user_properties"
      tableConfig:
        database: "DB_1234"
        schema: "SCHEMA_3456"
        table: "user_properties"
        requiredFields:
          userId:
            column: "USER_ID"
            label: "User ID Label"
          startTime:
            column: "START_TIME"
            label: "START TIME Label"
          endTime:
            column: "END_TIME"
            label: "END TIME Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Historical User Property sql-based
      selection: "sql"
      type: "historical_user_properties"
      sqlConfig:
        query: "SELECT * FROM schema_main.current_user_properties"
        requiredFields:
          userId:
            column: "USER_ID"
            label: "User ID Label"
          startTime:
            column: "START_TIME"
            label: "START TIME Label"
          endTime:
            column: "END_TIME"
            label: "END TIME Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Current Group Properties Table-based
      selection: "table"
      type: "current_group_properties"
      eventJoinField: "GROUP_ID"
      tableConfig:
        database: "DB_1234"
        schema: "SCHEMA_3456"
        table: "add_songs"
        requiredFields:
          groupId:
            column: "GROUP_ID"
            label: "GROUP ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Current Group Properties Sql-based
      selection: "sql"
      type: "current_group_properties"
      eventJoinField: "GROUP_ID"
      sqlConfig:
        query: "SELECT * FROM schema_main.all_events"
        requiredFields:
          groupId:
            column: "GROUP_ID"
            label: "GROUP ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Historical Group Properties Table-based
      selection: "table"
      type: "historical_group_properties"
      eventJoinField: "GROUP_ID"
      tableConfig:
        database: "DB_1234"
        schema: "SCHEMA_3456"
        table: "add_songs"
        requiredFields:
          groupId:
            column: "GROUP_ID"
            label: "GROUP ID Label"
          startTime:
            column: "START_TIME"
            label: "START TIME Label"
          endTime:
            column: "END_TIME"
            label: "END TIME Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Historical Group Properties Sql-based
      selection: "sql"
      type: "historical_group_properties"
      eventJoinField: "GROUP_ID"
      sqlConfig:
        query: "SELECT * FROM schema_main.all_events"
        requiredFields:
          groupId:
            column: "GROUP_ID"
            label: "GROUP ID Label"
          startTime:
            column: "START_TIME"
            label: "START TIME Label"
          endTime:
            column: "END_TIME"
            label: "END TIME Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
    - name: Event Properties Table-based
      selection: "table"
      type: "event_properties"
      eventJoinField: "EVENT_ID"
      tableConfig:
        database: "DB_1234"
        schema: "SCHEMA_3456"
        table: "add_songs"
        requiredFields:
          eventId:
            column: "EVENT_ID"
            label: "EVENT ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"  #[tl! collapse:end]
    - name: Event Properties Sql-based
      selection: "sql"
      type: "event_properties"
      eventJoinField: "EVENT_ID"
      sqlConfig:
        query: "SELECT * FROM schema_main.all_events"
        requiredFields:
          eventId:
            column: "EVENT_ID"
            label: "EVENT ID Label"
        additionalFields:
          - column: "prop_1"
          - column: "prop_2"
            label: "Prop 2"
```