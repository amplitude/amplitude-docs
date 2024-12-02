---
id: f01c2196-6c7f-4ec9-9b62-2ed150653399
blueprint: data
title: 'Create a tracking plan'
source: 'https://help.amplitude.com/hc/en-us/articles/19717053646107-Create-a-tracking-plan'
this_article_will_help_you:
  - 'Plan your event, event properties, and user properties directly in Amplitude Data'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717620118
---
In Amplitude Data, the **tracking plan** is a living document that outlines what events and properties to track, why you're tracking them, and where they are tracked. It allows all stakeholders within the your organization to collaborate on a single source of truth. Analysts will use this information to determine which events and properties to use and ensure their understanding of the data is correct. Developers use it to instrument the analytics schema in the code base.

This article focuses on how to create your tracking plan directly in Amplitude Data. Be sure to check out the [data planning playbook](/docs/data/data-planning-workflow) to understand how planning in Amplitude Data fits into the overall planning process.

## Find your tracking plan

Each project in Amplitude has its own tracking plan. To find your plan, click the *Data* tab in the top navigation. Then, in the left navigation, select the project from the dropdown at the top.

You’ll see the events and properties for your plan on the left.

## Update your tracking plan

You can update your plan in two ways:

* Proactively plan new events and properties prior to implementation, and use Amplitude Data to define details, collaborate with team members, and agree on what you want to track. (Recommended)
* Reactively plan events and properties once they are ingested for the first time. By default, these events and properties will appear in your plan as “Unexpected.” You can choose to add them to your plan, or delete them to stop ingestion and remove them from your data catalog.

### Create a source

[Sources](/docs/data/sources/connect-to-source) represent the originating source of the data being sent to Amplitude. (For example, your iOS, Android, Web, and Backend.) When using the [Ampli Developer experience](/docs/sdks/ampli), you’ll need to create a source to generate the correct tracking library.

To create a source, follow these steps:

1. Navigate to *Connections —> Sources* and click *Add Source*.
2. Select the SDK source you want to add.
3. Name your new source and click *Create*.

### Create an event

An event is a distinct action that a user can take in your product. When creating an event, you’ll be able to specify metadata about the event that will help with both implementation and with discovery in Analytics once implemented.

To create an event, follow these steps:

1. Navigate to *Tracking Plan—>Events* and click *Create event*.
2. Give your event a name. Amplitude will automatically suggest any modifications to match your naming convention.
3. Add a source to specify where this event should be instrumented.
4. Add any relevant metadata, including:

	* A description to help define when the event should be sent or important details about the event.
	* A category to help provide more context and group similar events.
	* The active/inactive status of the event. An active event is something triggered by the user. Inactive events are those related to the user, but not initiated by a direct user action (for example, receiving a push notification).
5. Add any relevant event properties to the event.

### Create an event property

Event properties describe the particular event and the context it was invoked in. For example, a `Song Played` event may contain a `Song Title` property. Every property is defined by a name, description, examples, and rules for that property. Rules are specific to each data type. For example, property `Song Title` of type `String` can have the following rules: Min Length, Max Length, and Regex.

To create a new event property, follow these steps:

1. In Amplitude Data, navigate to *Tracking Plan—>Properties* and click the *Event Properties* tab.
2. Click *Create event property*.
3. Give your event property a name  and add any relevant metadata to the property, including:

    * A description. Including example values can be helpful.
    * Whether this property is required on this event. If it is, and Amplitude receives an event that doesn’t include it, Amplitude Data will generate a warning.
    * The data type (such as string, number, etc.) as well as any additional rules.

You can now add this property to your events.

To add an existing property, or create a new property within an event, follow these steps:

1. In Amplitude Data, navigate to *Tracking Plan—>Events* and select the event you'd like to add a property to.
2. In the event detail pane, click *Add property.*
3. Name your new property, or select an existing property to add to the event.

{{partial:admonition type="note" heading=""}}
If multiple events share similar properties, you can [create a property group](/docs/data/property-updates-property-groups). Property groups—which are **distinct** from group properties—make it easier to manage complex tracking plans, as you don't have to keep adding the same properties over and over. When you update a property group, the update applies to all events the group is associated with.
{{/partial:admonition}}

### Create a user property

User properties capture traits about the user. Once set, a user property automatically applies to any subsequent events triggered by that user, until its value is updated.

To create a new user property, follow these steps:

1. In Amplitude Data, navigate to *Tracking Plan—>Properties* and click the *User Properties* tab.
2. Click *Create user property*. Give your new user property a name.
3. Add any relevant metadata to the property, including:

	* A description. Including example values can be helpful.
	* The data type (such as string, number, etc.) as well as any additional rules.

### Create a group with group properties

{{partial:admonition type="note" heading=""}}
This feature requires the [Accounts](/docs/analytics/account-level-reporting-setup) add-on.
{{/partial:admonition}}

Group properties make it easy to associate a user with a particular account (for example, name, industry, employees, etc.) whenever the `group()` call is made. This is helpful when you want to track groups of users (for example, tracking events across an entire company, instead of specific users within that company).


To create a group, follow these steps:

1. In Amplitude Data, navigate to *Tracking Plan—>Groups* and click *Create group*.
2. Name your group and add any relevant metadata, including:

	* A description. Including example values can be helpful.
	* The data type (such as string, number, etc.) as well as any additional rules.
3. Add any group properties that apply to this group type.

To create a group property, follow these steps:

1. In Amplitude Data, navigate to *Tracking Plan—>Properties* and click the *Group Properties* tab.
2. Click *Create group property.*
3. Name your group and add any relevant metadata, including:

	* A description. Including example values can be helpful.
	* The data type (such as string, number, etc.) as well as any additional rules.

## Collaborate on your plan

If you want feedback on any changes you’ve made, you can @mention your colleagues in the rich text editor of any event or property to send them an email notification or Slack message. This is useful when working on a branch, finalizing the event and property names you plan to use.

## Send your plan to your developers

Lastly, you’ll want to send this plan to your developers.

If you’re using the Ampli Developer Tools, your tracking plan will be consumed by developers in the form of type-safe auto-generated code. Amplitude Data can generate a tracking library for all popular platforms and programming languages. The auto-generated library is a lightweight wrapper over your analytics provider's SDK that provides type-safety, supports linting, and enables additional features like input validation. The code exactly replicates the spec in the tracking plan and enforces all its rules and requirements.

You can also send them a link to the branch or directly to Amplitude Data, where they can review the details you’ve specified.