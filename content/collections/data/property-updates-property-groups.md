---
title: "Streamline property updates with property groups"
source: "https://help.amplitude.com/hc/en-us/articles/5078762828699-Streamline-property-updates-with-property-groups"
id: 73ffabf3-485b-4bb5-84a0-aea900f3dcad
---

#### This article will help you:

* Update changes you've made to properties across multiple events simultaneously

With **property groups**, you can define groups of properties so Amplitude Data can apply them to events quickly.

Property groups make it easier to manage complex tracking plans, since you don't have to keep adding the same properties to events multiple times. When you update a property group, Amplitude Data applies the changes to **all events** the group is associated with.

**NOTE:** Property groups are different from [group properties](/hc/en-us/articles/5078752725147).

For example, a music app’s tracking manager might need a way to streamline creation of events relating to songs. Each of these events will include the following properties:

* `albumName`
* `artistName`
* `genre`
* `recordLabel`
* `releaseDate`
* `songDuration`
* `songTitle`

Instead of individually adding properties to every single one of these events, the tracking plan manager can add these properties to their own property group. Whenever she creates a new song-related event that includes these properties, she will only have to **add the entire group** to the event.

Another benefit is that whenever she has to edit or update a property (but not a property value), that edit will promulgate to every event that includes the group to which the property belongs.

For example, imagine the tracking manager wants to change the `recordLabel` property from a text string to a numeric code to align with a standardized database of record labels. Every event that uses the `Songs` property group will have that property updated as soon as she makes the change in Amplitude Data.

Using property groups also ensures you are using the same iteration of a property with your events. In Amplitude Data, it is possible to have multiple iterations of a property, which can sometimes be confusing when adding properties to events.

## Create a property group

To create a property group, follow these steps:

1. Navigate to *Properties > Event Properties* and click *Property Groups*.  
  
![Screenshot 2023-07-20 at 8.00.38 AM.png](/output/img/data/screenshot-2023-07-20-at-8-00-38-am-png.png)
2. Click *+ Create property group*.
3. In the fly-out window, enter a name for the group. Then add a description and any tags, if desired.
4. Click *+ Add property* to begin adding properties to this property group.
5. Select an event property from the dropdown menu. You can either scroll until you find it, or you can begin typing its name in the search box until it appears.
6. Repeat the previous step until you’ve added all the properties you want to include in the property group. Amplitude will save your progress automatically.

## Add a property group to an event

To add a property group to an event, follow these steps:

1. In *Events*, click the name of the event you’re interested in from the list. The event’s fly-out window will open.
2. In the *Details* tab, look for the *Properties* section and click *+ Add property*.
3. In the drop-down list that appears, any existing property groups should be listed first. Find the one you want and click it.

To modify the properties for a property group, follow these steps:

1. Navigate to *Properties* and click *Property Groups*.
2. Scroll until you find the group you wish to modify and click it. Its fly-out window will appear.
3. Make your changes; they'll be applied across all events or sources.

**NOTE**: This only applies to **active** events and event properties that are **included in your tracking plan**. It also **does not** apply to custom events.
