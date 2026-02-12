---
id: 73ffabf3-485b-4bb5-84a0-aea900f3dcad
blueprint: data
title: 'Using property groups'
source: 'https://help.amplitude.com/hc/en-us/articles/5078762828699-Streamline-property-updates-with-property-groups'
this_article_will_help_you:
  - "Update changes you've made to properties across multiple events simultaneously"
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1725399801
---
With **property groups**, you can define groups of properties so Amplitude Data can apply them to events quickly.

Property groups make it easier to manage complex tracking plans, since you don't have to keep adding the same properties to events multiple times. When you update a property group, Amplitude Data applies the changes to **all events** the group is associated with.

For example, a music app’s tracking manager might need a way to streamline creation of events relating to songs. Each of these events include the following properties:

* `albumName`
* `artistName`
* `genre`
* `recordLabel`
* `releaseDate`
* `songDuration`
* `songTitle`

Instead of individually adding properties to every single one of these events, the tracking plan manager can add these properties to their own property group. Whenever she creates a new song-related event that includes these properties, she will only have to **add the entire group** to the event.

Another benefit is that whenever she has to edit or update a property (but not a property value), that edit carries over to all events that include the group to which the property belongs.

For example, imagine the tracking manager wants to change the `recordLabel` property from a text string to a numeric code to align with a standardized database of record labels. As soon as she makes the change in Amplitude Data, that property updates for every event that uses the `Songs` property group.

Using property groups also ensures you are using the same iteration of a property with your events. In Amplitude Data, you can have multiple iterations of a property, which can sometimes be confusing when adding properties to events.

## Create a property group

To create a property group, follow these steps:

1. Navigate to *Properties > Event Properties* and click *Property Groups*.  
  
    ![streamline-property-updates-prop-groups.png](/docs/output/img/data/streamline-property-updates-prop-groups.png)

2. Click *+ Create property group*.
3. In the flyout window, enter a name for the group. Then add a description and any tags, if desired.
4. Click *+ Add property* to begin adding properties to this property group.
5. Select an event property from the dropdown menu. You can either scroll until you find it, or you can begin typing its name in the search box until it appears.
6. Repeat the previous step until you’ve added all the properties you want to include in the property group. Amplitude saves your progress automatically.

## Add a property group to an event

To add a property group to an event, follow these steps:

1. In *Events*, click the name of the event you’re interested in from the list. The event’s flyout window opens.
2. In the *Details* tab, look for the *Properties* section and click *+ Add property*.
3. In the drop-down list that appears, any existing property groups should appear first. Find the one you want and click it.

To modify the properties for a property group, follow these steps:

1. Navigate to *Properties* and click *Property Groups*.
2. Scroll until you find the group you wish to modify and click it. Its flyout window appears.
3. Make your changes; they apply across all events or sources.

**NOTE**: This only applies to **active** events and event properties **included in your tracking plan**. It also **doesn't** apply to custom events.