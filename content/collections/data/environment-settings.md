---
title: "Environment settings for projects (legacy feature)"
source: "https://help.amplitude.com/hc/en-us/articles/20587620067867-Environment-settings-for-projects-legacy-feature-"
id: 59306913-18a3-4948-87c4-877316da591c
---

#### This article will help you:

* Manage projects with multiple environments

**NOTE:** This article is about an unsupported **legacy feature**. It is still available for a small number of Amplitude customers, but will not be made accessible for customers who do not already have access.

In Amplitude Data, the **project** is where you configure events, properties, sources, and destinations. It’s also called the [**tracking plan**, and you can read about it here](https://help.amplitude.com/hc/en-us/articles/5078731378203). This is distinct from an **environment**. 

Amplitude Analytics also uses projects, but it does so differently. Setting up a project in Amplitude Analytics is a prerequisite for receiving data from your product—the project is where the data flows to, and it’s where you conduct your analyses. 

In fact, it’s best practice to have at least two projects in Amplitude Analytics: one for production, and one for development. This way, you can validate against the development project first, and then roll out approved changes to production.

In Amplitude Data, the environment is **just another name** for a specific project in Amplitude Analytics. 

Each project in Amplitude Data can have up to two environments. Ideally, you’ll use one for debugging and the other for clean production data.

In Amplitude Data, the **Environments tab** is where you’ll manage the mapping between your two environments—production and development—and your Amplitude projects. Amplitude Data will use the information you enter here to configure sources and destinations, validate data in the tracking plan page, and schema syncing on the *Integrations* tab.

For each environment, select the desired project name from the appropriate drop-down list. When you’re finished, click *Save*.

## Environments in the tracking plan

You can make modifications to your tracking plan in any filtered environment—*Production*, *Development*, or *Staging—*or an environment further segmented by status and filters, as seen in the image below. It's important to understand which changes will or won't sustain when working in environments where the action wasn't taken.

Any creation, update or deletion to events, properties, or groups will apply to all environments that the object is present in. All other actions, like blocking or transformations, are environment-specific.

The following table highlights actions that will sustain across all environments versus solely the filtered environment in which the action was performed. 

Actions that will sustain across all environments are:

* Creating events, properties, or groups
* Updating events, properties, or groups (includes visibility and activity status changes)
* Deleting events, properties, or groups

Actions that will sustain only in the filtered environment in which the action was performed are:

* Applying block or drop filters
* Blocking events, properties, or groups
* Any action involving custom events
* Any action involving derived properties
* Any action involving lookup properties
* Any action involving transformations

**NOTE****:** The branch and settings you're working with dictate how changes are saved, approved, or merged. For example, changes allowed on a main branch depend on your settings but are automatically applied when saved. Read more about [working with branches](/data/work-with-branches).
