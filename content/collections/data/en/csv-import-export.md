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
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1718136402
---
In Amplitude Data, you can view and manage event types, event properties, and user properties piece by piece, but you may want to see a holistic view of your entire tracking plan's schema and make bulk changes to the schema instead.

Amplitude lets you import and export your schema via .CSV to plan new events and properties, edit categories and descriptions, and generate bulk changes.

This article will discuss the differences between using import and export for events and event properties versus user properties.

## Events and event properties

Follow the below steps to import or export events and event properties:

1. Navigate to Data, and click *Events* under your tracking plan in the left side pane.
2. If you wish to import, click the import icon to open the import modal.
3. If your import file is ready to upload and follows the [expected schema for events and event properties](#h_01HN467J5969YRB1J9MG80MTBN), you can drag and drop your .CSV file or click *Upload* and choose the file from your desired location. If not, click *template* to download a template .CSV to update for importing.

    ![](/docs/output/img/data/22418776497947.png)

    The imported events and event properties will appear in a branch named *import*.

4. Once you’re sure the imported tracking plan updates are correct, you can [merge the changes back into the main branch](/docs/data/data-planning-workflow).
5. If you want to export events and event properties from your tracking plan, click the export icon instead.
6. In the export modal that appears, choose whether to download your tracking plan’s schema or a .CSV file template. Then, click *Download*.

![](/docs/output/img/data/22418907241627.png)

Downloaded .CSV files of your tracking plan contain additional fields not required for import. The next section will define the events and event properties .CSV import file structure and the [additional columns seen in the exported file](#01HNB56QS6HYFRW8BSRRXBC716).

{{partial:admonition type="note" heading=""}}
The import and export features do not support custom events, transformations, nor default Amplitude entities.
{{/partial:admonition}}

## Events and event properties file schema

The events and event properties .CSV file requires a specific schema for a successful import. The table below highlights the required schema by entity type. There are some things to note: 

* The file's header must contain all listed fields.
* The fields can be in any order, but their names and values must be exact in spelling and capitalization to ensure a successful import process.
* Some fields require a value depending on entity type, and are notated as such in the table below.

        | **Field name** | **Definition** | **Values or format** | **Events** | **Event properties** | **Property groups** | **Property group properties** |
|  Action | Action to perform on a particular entity | * **Ignore**: No changes will be made to the entity nor its subproperties
* **Remove**: Event and property groups can be removed from the tracking plan. The remove value will not affect individual properties.

Removing an event or property group will disassociate related properties, and will change a live property’s status to unexpected. 
The remove value does not delete an entity, nor does it stop ingestion.* ***<blank>***: Creates or updates an entity and it’s associated sub-entities
 |  X | X | X | X |
| Object Type |  Entity type | * Event
* Property Group
 |  **X** **(required)** |  | ****X**** **(required)** |  |
| Object Name | Name of the event or property group |  |  ****X**** **(required)** |  | **X** **(required)** |  |
| Event Display Name | Only applicable to optional display names of events |  |  X |  |  |  |
| Object description | Description of the entity |  | X |  | X |  |
| Event Category | Category of an event |  | X |  |  |  |
| Tags | Tags associated with an event | Separate each tag with a comma | X |  |  |  |
| Event Activity | Description of an event’s activity.  | * Active
* Inactive

Marking an event as inactive is applied retroactively and immediately, and will exclude the event from the Any Active Event metric. | X |  |  |  |
| Event Source | Sources associated with the event |  | X |  |  |  |
| Property Type | Type of property associated with the event | * Event Property
* Event Property Group
 | **X** **(required)** |  |  |  |
| Property Group Names | Property group that is associated with the event |  | X |  |  |  |
| Event Property Name | Name of the property  |  |  | **X** **(required)** |  | **X** **(required)** |
| Property Description | Description of the entity |  |  | X |  | X |
| Property Value Type | The value type of an event property or property group property | * string
* number
* boolean
* any
* enum
* const
 |  | X |  | X |
| Property Required | Denotes the required status of the property | * **True**: Property is required
* **False or** ***<blank>***: Property is optional
 |  | X |  | X |
| Property Is Array | Denotes if the property is an array | * **True**: Property is an array
* **False or** ***<blank>***: Property is not an array
 |  | X |  | X |
| Enum Values | Enum values for properties with an enum property value type | Separate each enum value with a comma |  | X |  | X |
| Property Regex | Regular expression (Regex) values for properties with a string property value type |  |  | X |  | X |
| Const Value | Const value for properties with a const property value type |  |  | X |  | X |
| String Property Value Min Length | Minimum length of a property with string property value type |  |  | X |  | X |
| String Property Value Max Length | Maximum length of a property with string property value type |  |  | X |  | X |
| Number Property Value Min  | Minimum value of a property with number property value type |  |  | X |  | X |
| Number Property Value Max | Maximum value of a property with number property value type |  |  | X |  | X |
| Number Is Integer | Denotes if a property with number property value type is an integer | * **True**: Property is an integer
* **False or** ***<blank>***: Property is not an integer
 |  | X |  | X |
| Array Min Items | Minimum number of items for a property with an array property value type |  |  | X |  | X |
| Array Max Items | Maximum number of items for a property with an array property value type |  |  | X |  | X |
| Array Unique Items | Denotes if an array property value type has unique items | * **TRUE**: Array has unique items
* ***<any>***: Assumes array does not have unique items
 |  | X |  | X |

### Additional fields .CSV export of events and event properties

The following table includes additional fields found in the .CSV export of your tracking plan’s events and event properties.

        | **Field name** | **Definition** | **Values or format** | **Events** | **Event properties** | **Property groups** | **Property group properties** |
|  Action | The default action to perform on a particular entity
This field exists in the import template, but the downloaded file will automatically include default values.  | * **Ignore**: The user property is unexpected, blocked or deleted.
* ***<blank>***: The user property is planned or live.
 |  X | X | X | X |
| Event First Seen | The date on which the Event was first seen. | “mm/dd/yyyy”  | X |  |  |  |
| Event Last Seen | The date on which the Event was last seen. | “mm/dd/yyyy”  | X |  |  |  |
| Property First Seen | The date on which the property was first seen. | “mm/dd/yyyy”  |  | X |  |  |
| Property Last Seen | The date on which the property was last seen. | “mm/dd/yyyy”  |  | X |  |  |

## User properties

Follow the below steps to import or export user properties:

1. Navigate to Data, and click *Properties* under *Tracking Plan* in the left side pane. Then click *User Properties*.
2. Click the import icon ![](/docs/output/img/data/22418899828635) to open the import modal.
3. If your import file is ready to upload and follows the [expected user properties schema](#h_01HNB5CSJY8QWZXPWXPJYK1JHQ), you can drag and drop your .CSV file or click Upload and choose the file from your desired location. If not, click *template* to download a template .CSV to update for importing.

![](/docs/output/img/data/22418907248795.png)

The imported events and event properties will appear in a branch named *import*.

4. Once you’re sure the imported tracking plan updates are correct, you can [merge the changes back into the main branch](/docs/data/data-planning-workflow).
5. If you want to export user properties from your tracking plan, click the export icon ![](/docs/output/img/data/22418905478939) instead.
6. In the export modal that appears, choose whether to download your tracking plan’s schema or a .CSV file template. Then, click Download.

**![](/docs/output/img/data/22418912795163.png)**

The next section will define the user properties .CSV import file structure and the [additional columns seen in the user properties export](#h_01HN4703NR0H9FRFDPZ610WCWN).

## User properties file schema

The table below highlights the required schema for the user properties .CSV file import. There are some things to note: 

* The file's header must contain all listed fields.
* The fields can be in any order, but their names and values must be exact in spelling and capitalization to ensure a successful import process.
* Some fields require a value and are notated as such in the table below.

    | **Field name** | **Definition** | **Values** |
|  Action | Action to perform on a particular user property | * **Ignore**: No changes will be made to the user property.
* **Remove**: User property will be removed from the tracking plan.

The remove value does not delete a user property, nor does it stop its ingestion.* ***<blank>***: Creates the user property if it did not already exist; or updates the user property if it did exist.
 |
| Property Type | User property type |  **User Property** 
 **(required)**  |
| Property Name | Name of the user property |  **(required)**  |
| Property description | Description of the user property |  |
| Property Value Type | The value type of a user property | * string
* number
* boolean
* any
* enum
* const
 |
| Property Is Array | Denotes if the property is an array | * **True**: Property is an array
* **False or** ***<blank>***: Property is not an array
 |
| Enum Values | Enum values for properties with an enum property value type | Separate each enum value with a comma |
| Property Regex | Regular expression (Regex) values for properties with a string property value type |  |
| Const Value | Const value for properties with a const property value type |  |
| String Property Value Min Length | Minimum length of a property with string property value type |  |
| String Property Value Max Length | Maximum length of a property with string property value type |  |
| Number Property Value Min  | Minimum value of a property with number property value type |  |
| Number Property Value Max | Maximum value of a property with number property value type |  |
| Number Is Integer | Denotes if a property with number property value type is an integer | * **True**: Property is an integer
* **False or** ***<blank>***: Property is not an integer
 |
| Array Min Items | Minimum number of items for a property with an array property value type |  |
| Array Max Items | Maximum number of items for a property with an array property value type |  |
| Array Unique Items | Denotes if an array property value type has unique items | * **TRUE**: Array has unique items
* ***<any>***: Assumes array does not have unique items
 |

### Additional fields in .CSV export of user properties

The following table includes additional fields found in the .CSV export of your tracking plan’s user properties.

    | **Field name** | **Definition** | **Values or format** |
|  Action | The default action to perform on a particular entity
This field exists in the import template, but the downloaded file will automatically include default values.  | * **Ignore**: The user property is unexpected, blocked or deleted.
* ***<blank>***: The user property is planned or live.
 |
| Property First Seen | The date on which the property was first seen. | “mm/dd/yyyy”  |
| Property Last Seen | The date on which the property was last seen. | “mm/dd/yyyy”  |