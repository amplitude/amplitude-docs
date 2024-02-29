---
title: "Work with branches"
source: "https://help.amplitude.com/hc/en-us/articles/5078713391387-Work-with-branches"
id: 1912398b-4b46-42ce-b63e-44d4f0f01881
---

#### This article will help you:

* Create and work with new branches of your tracking plan
* Merge your work back into the `main` branch
* Delete an old branch when it's no longer useful to you

If you're familiar with Git, branches in Amplitude Data will be immediately familiar to you. A **branch** is like a point-in-time snapshot of the tracking plan created for you and your team. You can make your own changes to it without those changes being immediately visible to everyone else, and only merge them back into the main tracking plan when you're ready.

When you first create your Amplitude Data account, a default branch called `main` will automatically be created for you. It will include a few sample events and properties to get you started. Think of the `main` branch as your production branch: it contains your latest official tracking plan and matches what's currently instrumented in your default branch in Git (typically `master` or `main`).

`main` is perfect for getting started in Amplitude Data, and you may find that it's the only branch you need for quite some time.

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only.

## Publish a version of your tracking plan

Changes you make on a branch are initially kept in the branch's staging area, where they remain **pending**. Pending changes are like work-in-progress changes: visible to you and your teammates, but hidden from your production systems and not yet available for instrumentation by your engineering team.

When your pending changes are ready to go, you'll **publish** them. Publishing your changes creates a new version of your tracking plan in which those changes are applied. It also exposes that new version to your engineering team for instrumentation. If your new version was created on the main branch, those changes will also propagate to your production systems.

Every new version is assigned a version number and an optional description, so you can tell them apart later. Version numbers start at 1 and increment by 1 each time you publish a new one.

Every branch has its own tracking plan versions, which means it's possible you'll have two versions of the tracking plan with the same version number: one in `main`, and one in your own branch. When this happens, Amplitude Data will always display the name of the branch, to avoid any confusion.

## Create and delete branches

As you and your team ramp up your use of Amplitude Data, you may outgrow the `main` branch and find yourselves in need of a more robust workflow. This usually happens when:

* Too many people are making changes to `main` at the same time; or
* Feature teams would like their own separate copy of the tracking plan to collaborate in, review their work, and get stakeholder approval

In Amplitude Data, all branches are created off `main` and merge back into `main`.

To **create** a new branch, follow these steps:

1. Click *main* in the page's header.
2. Type in the name of the branch you'd like to create.
3. Click *+*.

![create_branch.png](/output/img/data/create-branch-png.png)

4. In the *Create branch* modal, confirm the name of your branch, add an optional description, and click *Create*.

![Screenshot](/output/img/data/screenshot.png)

If you had any pending changes on `main`, you'll have a chance to either take those changes with you into your new branch, or leave them behind on `main`.

To **delete** a branch, follow these steps:

1. Click ![Screenshot](/output/img/data/screenshot.png) next to the branch name.
2. In the modal that appears, click *Delete* to confirm your choice.

## Work on a branch

Once your branch is created, working with it is just like working with `main`. You and your team will create and publish new versions on it, instrument those versions in the product, and report back to the branch on the status of the instrumentation.

All of this can happen in parallel with other teams working in their own branches, without any impact on you.

From time to time, you'll refresh your branch with any changes that may have been made to `main` since you created your branch. If Amplitude Data detects that your branch is out of date with `main`, you’ll see a *Refresh* button in the page's toolbar. Click it to get caught up.

## Merge your branch back into main

When you’re happy with the changes you've made on your branch, it’s time to merge them back into `main`. This typically happens when your product team is also ready to merge their changes into the `main` branch in Git.

There are a few prerequisites you’ll need to address before you can successfully merge:

* All pending changes must be published on your branch.
* Your branch must be up to date with `main`.
* `main` must have all its pending changes published as well.

To publish your changes to a new version on your branch, follow these steps:

1. In the left-hand sidebar, click *Save changes*.
2. In the *Save changes* modal, review the pending changes. If everything looks correct, click *Save*.

Then to merge, follow these steps:

1. Navigate to *Activity*. You may have to click *Refresh*.
2. Click *Approve*.
3. Click *Merge*.

If your account is configured for [team reviews](/data/amplitude-data-settings), you may not have permission to merge directly and will instead first create a merge request. A merge request is a way to ask stakeholders outside your team to review your changes and give their explicit approval. Only team members with Manager or Admin permissions can approve changes; do so by logging into Amplitude Data and clicking *Merge*, in the page's toolbar.

An approved merge request is now ready to be merged by anyone on your team.

## Copy branch changes to testing environments

Once you have applied changes to a branch, you can copy those changes to other projects or environments for testing purposes.

To copy branch changes, follow these steps:

1. Go to *Activity* > *Branch Changes* from the branch you'd like to copy.
2. Click *Copy Branch*.
3. In the modal that appears, select the testing projects to copy the branch to from the dropdown. Then click *Copy*.
4. Once complete, click on the notification to review the copied branch.
5. Review changes to the testing project. If changes look as expected, click *Merge*.

Managers and Admins can also restrict the projects that branch changes can be copied to.

To restrict branch copying, follow these steps:

1. From the source project, navigate to *Settings* and then *General*.
2. Select the checkbox next to *Restrict branch copying to specified testing projects*.
3. From the dropdown, select the checkbox next to the projects that the branch changes can be copied to.
