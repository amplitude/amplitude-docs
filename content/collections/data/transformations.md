---
id: 34900232-5084-4b90-89aa-0bccbc06a95b
blueprint: data
title: 'Transformations: Retroactively modify your event data structure'
source: 'https://help.amplitude.com/hc/en-us/articles/5913315221915-Transformations-Retroactively-modify-your-event-data-structure'
this_article_will_help_you:
  - 'Understand and create the main types of transformations'
  - 'Edit and manage transformations'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717621255
---
Amplitude Data’s **transformations** feature allows you to transform event data in order to correct common implementation mistakes. Transformations are retroactive: you can create them whenever you want, and apply them to all historical data. This means you can make changes to your event data without having to touch your underlying code base. No matter when you recognize a mistake or want to make a change, you can use a transformation to correct all affected data, both historically and moving forward.

Currently, transformations on Amplitude's default user properties are not supported.

Transformations can only be performed in a project’s `main` branch. Ensure the *Show transformations* toggle is set to `ON`.

{{partial:admonition type="note" heading=""}}
Transformations are applied at query time when a chart or cohort generates results. **This does not affect the raw data**. Raw data on Snowflake or Redshift will not be impacted by transformations.
{{/partial:admonition}}

### Feature availability

This feature is available to users on **all Amplitude plans**.

## Merge events, event properties, and user properties

For many Amplitude users, the need to consolidate superfluous or duplicate events, event properties, or user properties will eventually arise. Transformations make this process easy.

### Merge events

This transformation allows you to merge events together. This is helpful if you are tracking two or more events that you would like to track as one single event instead. For example, you can merge the events `comment_reply_like` and `comment_share` into a single event, `comment`.

When merging events, you can also add a property that will help you distinguish between the two original events after you’ve merged them. This transformation can be helpful if you are logging data into two events with similar syntax when you could log this information as one event with different property values instead. For example, you could transform the events `comment_reply_like` and `comment_share` into one event, `comment`. The event `comment` will then have a new event property `comment type`  with values `reply like` and `share`.

To merge events, follow these steps:

1. In Amplitude Data, navigate to *Events.*
2. Find the events you want to merge together and click the checkbox next to their names.
3. Once the events are selected, the *Transform* option will appear in the menu bar above the events list. Click *Transform*.
4. Choose whether you want to merge the events you selected into a single event, or into a single event with an extra distinguishing property. Then click *Next*.  
  
  ![merge_transform.png](/output/img/data/merge-transform-png.png)

5. Use the drop-down in the *Transform & Merge Events* modal to tell Amplitude Data whether you’d like to merge the selected events into a **new** event, or whether you’d like to merge them into a different, **already** **existing** event. If you are merging into a new event, you’ll also name it here. Then click *Preview*.
6. In step 5 above, if you are **not** adding the extra distinguishing property to your merged event, skip to Step 9 below.  
  
  Otherwise, select the event property you’d like to use as a differentiator from the *Select Property* drop-down. Then click *Next*.

7. Next, you’ll map the events you’ve selected with new values for the property you selected in step 7 above. Enter the new value in the *Property Value…* field and click *Preview*.
8. Review your changes and click *Merge* to complete the transformation.

### Merge event properties or user properties

This transformation allows you to merge properties, either for events or for users. This is helpful if you have two properties that track the same information but were named with different syntax.

For example, imagine an event property is called `title` in some cases, and in others, it's called `TITLE` —but they represent the same thing on all events. You can clean things up by transforming `title` and `TITLE` into `Title`, combining the data.

Similarly, a user property called `name` in some cases and `NAME` in others—even though they represent the same thing for all users—could be unclear. Transforming `name` and `NAME` into `Name` is a good way to resolve any potential confusion.

Event properties can only be merged with other event properties, and user properties can only be merged with other user properties.

To merge event properties or user properties, follow these steps:

1. In Amplitude Data, navigate to *Properties*, then click either the *Event* or *User* tab, depending on which type of properties you want to merge.
2. Find the properties you want to merge together and click the checkbox next to their names. Once the event properties are selected, the *Transform* option will appear in the menu.
3. From the *Transform* drop-down, select *Merge Property*.
4. The Merge Properties modal will appear. Type a new event property name or type the name of the event property you would like to merge the selected event properties into. Click *Next*.
5. Review your changes and click *Merge* to complete the transformation.

## Rename property values

This transformation allows you to re-assign event and user property values. This transformation is useful if a property has a number of misspellings or nonsensical values in drop-downs and will allow you to hide them from the UI or turn them into another value.

For example, you can reassign the values of `true` and `TRUE` to `True`.

To rename a property value, follow these steps:

1. Navigate to *Properties* and open either the Event or User tab, depending on the type of property you want to rename.
2. Find the property with the property value you want to rename and click the checkbox next to its name.
3. From the *Transform* drop-down, select *Rename Value*.
4. The *Edit Renamed Values* modal will appear. Under *Current Property Value*, click *Select value(s)...* .
5. From the list, select the value you wish to rename and click *Apply*.
6. Under *Derived Value*, click *Select value...* to set a new value.
7. Click *New Value* and enter the new value in the field that appears.
8. Repeat steps 4 - 7 for every value you wish to rename. Then click *Next*.
9. A confirmation modal will appear. Click *Rename*.

## Hide property values

Setting a property value's visibility status to hidden is helpful for values you may want to track but do not want to appear on the dashboard in any charts. Hiding a property value does not delete its raw data, and the value will still be visible in the user's individual event stream.

To hide a property value, follow these steps:

1. Find the event or user property with the value you want to hide. Check the box next to its name.
2. From the *Transform* drop-down, select *Hide Values*.
3. Select the value or values you wish to hide from Amplitude and click *Next*.
4. A confirmation modal will appear. Click *Hide*.

## Edit and delete transformations

Transformations are not permanent and can be reversed. You can edit or delete them at any time.

To edit your transformation, follow these steps:

1. Find the transformed event, event property, or user property you are interested in.
2. Click the transformation’s name to open the details panel. Click *Transformed Values* to see the transformations tab.
3. Click *Edit* next to the transformation you'd like to edit, make the necessary changes, and save.

To delete your transformation, follow these steps:

1. Find the transformed event, event property, or user property you are interested in.
2. Click the check box next to the transformation you'd like to delete.
3. Click *Undo Transformation*.
4. A confirmation modal will appear. Click *Undo Transformation*.

![undoTransformation.png](/output/img/data/undotransformation-png.png)

Deleting a transformation does **not** delete the original events.