---
id: 39f7be45-463a-469a-a849-e41aa71437b5
blueprint: data
title: '.CSV import and export'
source: 'https://help.amplitude.com/hc/en-us/articles/360055925811--CSV-import-and-export'
this_article_will_help_you:
  - 'Manage the events, event properties, and user properties of your tracking plan via .CSV import and export'
  - 'Understand the data fields and values needed for importing and how they compare to exported files'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1718824177
---
In Amplitude Data, you can view and manage event types, event properties, and user properties piece by piece, but you may want to see a holistic view of your entire tracking plan's schema and make bulk changes to the schema instead.

Amplitude lets you import and export your schema with .CSV to plan new events and properties, edit categories and descriptions, and generate bulk changes.

This article covers the differences between using import and export for events and event properties versus user properties.

## Events and event properties

Follow the below steps to import or export events and event properties:

1. Navigate to Data, and click *Events* under your tracking plan in the left side pane.
2. If you wish to import, click the import icon to open the import modal.
3. If your import file is ready to upload and follows the [expected schema for events and event properties](#events-and-event-properties-file-schema), you can drop your .CSV file or click *Upload* and choose the file from your desired location. If not, click *template* to download a template .CSV to update for importing.

    ![](/docs/output/img/data/22418776497947.png)

    The imported events and event properties appear in a branch named *import*.

4. Once you’re sure the imported tracking plan updates are correct, you can [merge the changes back into the main branch](/docs/data/data-planning-workflow).
5. If you want to export events and event properties from your tracking plan, click the export icon instead.
6. In the export modal that appears, choose whether to download your tracking plan’s schema or a .CSV file template. Then, click *Download*.

![](/docs/output/img/data/22418907241627.png)

Downloaded .CSV files of your tracking plan contain additional fields not required for import. The next section defines the events and event properties .CSV import file structure and the [additional columns seen in the exported file](#events-and-event-properties-file-schema).

{{partial:admonition type="note" heading=""}}
The import and export features don't support custom events, transformations, nor default Amplitude entities.
{{/partial:admonition}}

## Events and event properties file schema

The events and event properties .CSV file requires a specific schema for a successful import. The table below highlights the required schema by entity type. There are some things to note: 

* The file's header must contain all listed fields.
* The fields can be in any order, but their names and values must be exact in spelling and capitalization to ensure a successful import process.
* Some fields require a value depending on entity type, as indicated in the following list.

**Action**
* Definition: Action to perform on a particular entity
* Values:
    * `Ignore`: No changes made to the entity nor its subproperties
    * `Remove`: Event and property groups can be removed from the tracking plan. The remove value doesn't affect individual properties. Removing an event or property group disassociates related properties, and changes a live property’s status to unexpected. The remove value doesn't delete an entity, nor does it stop ingestion.
    * `<blank>`: Creates or updates an entity and it’s associated sub-entities
* For events, event properties, property groups property group properties

**Array min items**
* Definition: Minimum number of items for a property with an array property value type
* For event properties and property group properties

**Array max items**
* Definition: Maximum number of items for a property with an array property value type
* For event properties and property group properties

**Array unique items**
* Definition: Denotes if an array property value type has unique items
* Values:
    * `TRUE`: Array has unique items
    * `<any>`: Assumes array doesn't have unique items
* For event properties and property group properties

**Const value**
* Definition: Const value for properties with a const property value type
* For event properties and property group properties

**Enum values**
* Definition: Enum values for properties with an enum property value type
* Format: Separate each enum value with a comma
* For event properties and property group properties

**Event activity**
* Definition: Description of an event’s activity
* Values:
    * `Active`
    * `Inactive`. Marking an event as inactive applies retroactively and immediately, and excludes the event from the `Any Active Event` metric.
* For events

**Event category**
* Definition: Category of an event
* For events

**Event display name**
* Definition: Only applicable to optional display names of events
* For events

**Event property name**
* Definition: Name of the property
* Required for event properties and property group properties

**Event source**
* Definition: Sources associated with the event
* For events

**Number property value min**
* Definition: Minimum value of a property with number property value type
* For event properties and property group properties

**Number property value max**
* Definition: Maximum value of a property with number property value type
* For event properties and property group properties

**Number is integer**
* Definition: Denotes if a property with number property value type is an integer
* Values:
    * `True`: Property is an integer
    * `False` or `<blank>`: Property isn't an integer
* For event properties and property group properties

**Object type**
* Definition: Entity type
* Values:
    * `Event`
    * `Property Group`
* **Required** for events and property groups

**Object name**
* Definition: Name of the event or property group
* **Required** for events and property groups

**Object description**
* Definition: Description of the entity
* For events and property groups

**Property type**
* Definition: Type of property associated with the event
* Values:
    * `Event Property`
    * `Event Property Group`
* **Required** for events

**Property group names**
* Definition: Property group that's associated with the event
* For events

**Property description**
* Definition: Description of the property
* For event properties and property group properties

**Property value type**
* Definition: The value type of an event property or property group property
* Values:
    * `string`
    * `number`
    * `boolean`
    * `any`
    * `enum`
    * `const`
* For event properties and property group properties

**Property required**
* Definition: Denotes the required status of the property
* Values:
    * `True`: Property is required
    * `False` or `<blank>`: Property is optional
* For event properties and property group properties

**Property is array**
* Definition: Denotes if the property is an array
* Values:
    * `True`: Property is an array
    * `False` or `<blank>`: Property isn't an array
* For event properties and property group properties

**Property regex**
* Definition: Regular expression (Regex) values for properties with a string property value type
* For event properties and property group properties

**String property value min length**
* Definition: Minimum length of a property with string property value type
* For event properties and property group properties

**String property value max length**
* Definition: Maximum length of a property with string property value type
* For event properties and property group properties

**Tags**
* Definition: Tags associated with an event
* Format: separate each tag with a comma
* For events

### Additional fields .CSV export of events and event properties

The following list includes additional fields found in the .CSV export of your tracking plan’s events and event properties.

**Action**
* Definition: The default action to perform on a particular entity. This field exists in the import template, but the downloaded file includes default values.
* Values:
    * `Ignore`: The user property is unexpected, blocked or deleted.
    * `<blank>`: The user property is planned or live.
* For events, event properties, property groups property group properties

**Event first seen**
* Definition: The date on which the event was first seen.
* Format: `mm/dd/yyyy`
* For events

**Event last seen**
* Definition: The date on which the event was last seen.
* Format: `mm/dd/yyyy`
* For events

**Property first seen**
* Definition: The date on which the property was first seen.
* Format: `mm/dd/yyyy`
* For property groups

**Property last seen**
* Definition: The date on which the property was last seen.
* Format: `mm/dd/yyyy`
* For property groups

## User properties

Follow the below steps to import or export user properties:

1. Navigate to Data, and click *Properties* under *Tracking Plan* in the left side pane. Then click *User Properties*.
2. Click the import icon to open the import modal.
3. If your import file is ready to upload and follows the [expected user properties schema](#user-properties-file-schema), you can drop your .CSV file or click Upload and choose the file from your desired location. If not, click *template* to download a template .CSV to update for importing.

![](/docs/output/img/data/22418907248795.png)

The imported events and event properties appear in a branch named *import*.

4. Once you’re sure the imported tracking plan updates are correct, you can [merge the changes back into the main branch](/docs/data/data-planning-workflow).
5. If you want to export user properties from your tracking plan, click the export icon instead.
6. In the export modal that appears, choose whether to download your tracking plan’s schema or a .CSV file template. Then, click Download.

**![](/docs/output/img/data/22418912795163.png)**

The next section defines the user properties .CSV import file structure and the [additional columns seen in the user properties export](#user-properties-file-schema).

## User properties file schema

The list below highlights the required schema for the user properties .CSV file import. There are some things to note: 

* The file's header must contain all listed fields.
* The fields can be in any order, but their names and values must be exact in spelling and capitalization to ensure a successful import process.
* Some fields require a value as indicated in the following list.

**Action**
* Definition: Action to perform on a particular user property
* Values:
    * `Ignore`: No changes will be made to the user property.
    * `Remove`:  The user property is removed from the tracking plan. The removed value doesn't delete a user property, nor does it stop its ingestion.
    * `<blank>`: Creates the user property if it did not already exist; or updates the user property if it did exist.

**Array min items**
* Definition: Minimum number of items for a property with an array property value type

**Array max items**
* Definition: Maximum number of items for a property with an array property value type

**Array unique items**
* Definition: Denotes if an array property value type has unique items
* Values:
    * `TRUE`: Array has unique items
    * `<any>`: Assumes array doesn't have unique items

**Const value**
* Definition: Const value for properties with a const property value type

**Enum values**
* Definition: Enum values for properties with an enum property value type
* Format: Separate each enum value with a comma

**Number property value min**
* Definition: Minimum value of a property with number property value type

**Number property value max**
* Definition: Maximum value of a property with number property value type

**Number is integer**
* Definition: Denotes if a property with number property value type is an integer
* Values: 
    * `True`: Property is an integer
    * `False` or `<blank>`: Property isn't an integer

**Property type**
* Definition: User property type
* Values: User property **(required)**

**Property name**
* Definition: Name of the user property
* This value is **required**

**Property description**
* Definition: Description of the user property

**Property value type**
* Definition: The value type of a user property
* Values:
    * `string`
    * `number`
    * `boolean`
    * `any`
    * `enum`
    * `const`

**Property is array**
* Definition: Denotes if the property is an array
* Values:
    * `True`: Property is an array
    * `False` or `<blank>`: Property isn't an array

**Property regex** 
* Definition: Regular expression (Regex) values for properties with a string property value type

**String property value min length**
* Definition: Minimum length of a property with string property value type

**String property value max length**
* Definition: Maximum length of a property with string property value type

### Additional fields in .CSV export of user properties

The following list includes additional fields found in the .CSV export of your tracking plan’s user properties.

**Action**
* Definition: The default action to perform on a particular entity. This field exists in the import template, but the downloaded file will automatically include default values.
* Values:
    * `Ignore`: The user property is unexpected, blocked or deleted.
    * `<blank>`: The user property is planned or live.

**Property first seen**
* Definition: The date on which the property was first seen.
* Format: `mm/dd/yyyy`

**Property last seen**
* Definition: The date on which the property was last seen.
* Format: `mm/dd/yyyy`