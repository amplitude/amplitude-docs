---
id: 761569fa-61e0-451b-8c08-4f1d52b8e17e
blueprint: data
title: 'Event and property display names'
source: 'https://help.amplitude.com/hc/en-us/articles/16805727661211-Display-names-in-Amplitude-Data'
this_article_will_help_you:
  - 'Understand the benefits to using a display name for an event or user property'
  - 'Learn how to change the display name of your events or user properties'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722895571
---
By default, an event's display name in Amplitude data is the same as the ingested name. However, these can be difficult to read, understand, and incorporate directly into your analyses. For this reason, you can give your events and user properties new display names that offer an easy-to-read description of their purpose and content.

{{partial:admonition type="note" heading=""}}
This only applies to active events and user properties that you added to your tracking plan, and doesn't apply to custom events. It changes the display name of the event or property within the Amplitude UI and doesn't change the raw data.
{{/partial:admonition}}

## Change the display name for an event

You can update an event type's display name directly from the *Events* screen. To do so, follow these steps:

1. Click *Events* in Amplitude Data’s left-hand rail.
2. Click the event name.
3. Type the new display name for the event.

![display name.png](/docs/output/img/data/display-name-png.png)

## Change the display name for a user property

You can update a user property's display from the *User Properties* tab on the *Properties* screen. To do so, follow these steps:

1. Click *Properties* in Amplitude Data’s left-hand rail and open the *User Properties* tab.
2. Click the property name to open the details panel.
3. Click the property name in the panel and enter a display name.

## Update an event's visibility

Hide events from appearing in areas of Amplitude where you don't want them. For example, you can hide noisy events from your user stream to make the data that appears more effective.

Support for updating an event's visibility depends on the event type.

| Event type         | Editable?                                                | Where to edit                      |
| ------------------ | -------------------------------------------------------- | ---------------------------------- |
| Default events     | Must be in the tracking plan, and have `Modify` enabled. | Table menu, table row, side panel. |
| Transformed events | Yes. Hiding from event streams isn't supported.          | Side panel                         |
| Live events        | Yes                                                      | Table menu, table row, side panel. |
| Planned events     | No                                                       |                                    |
| Unexpected events  | No                                                       |                                    |
| Blocked events     | Yes                                                      | Table menu, table row, side panel. |
| Deleted events     | No                                                       |                                    |

To update an event's visibility:

1. Navigate to *Data > Events*.
2. Select the events you want to update.
3. In the menu that appears at the top of the table, click **Edit visibility** and select the areas where you don't want the selected events to appear.
