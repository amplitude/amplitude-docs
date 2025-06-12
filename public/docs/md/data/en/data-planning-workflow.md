---
id: 52bfe4df-5034-4e5d-bfce-81736bf4face
blueprint: data
title: 'Planning and instrumentation workflow'
source: 'https://help.amplitude.com/hc/en-us/articles/5078746573979-The-complete-Amplitude-Data-planning-workflow'
this_article_will_help_you:
  - 'Understand the complete planning workflow using all the planning capabilities offered by Amplitude Data'
landing: true
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722895150
landing_blurb: 'Learn the end-to-end Amplitude data planning process.'
---
Using Amplitude Data for planning helps ensure high-quality data from the start and reduces the need for clean-up later. This article will give you a sense of the complete workflow in Amplitude Data.

## Plan your events

For most companies, the lifecycle starts when launching a product or feature.

Imagine the product team has created a new onboarding flow and wants to see how it performs. The first step is determining what to track in this onboarding flow. What metrics will your feature affect, and what does success look like?

Once you've figured out the events and properties you want to track, you can create them on the Events page. With our Premium plans, you can create a branch to capture all your related changes without impacting anyone else. The Git branch in your code and the branch in Amplitude Data will co-exist throughout the process, and engineering can pull analytics code from the Amplitude Data branch into their Git branch throughout the feature's development.

Branches are especially beneficial when multiple teams work on the same project, or when various features are being worked on simultaneously.

## Instrument events

If you haven't already, invite the developers working on the feature to Amplitude Data and ask them to review your proposed plan. If you're working in a branch, you can send them a link to the Activity page of your branch, which will show all the changes you'd like to make.

Next, engineers will start implementing the updated tracking plan in their branch. They'll use the [Ampli CLI](https://www.docs.developers.amplitude.com/data/ampli/cli/) to generate a new tracking library that matches the changes in the Amplitude Data branch (`ampli pull -b {branch-name}`).

It's normal to iterate on your tracking plan with your developers, such as responding to issues or challenges they encounter. Update your plan as your understanding evolves based on their feedback.

## Request reviews

If you've configured your project for team reviews, you may not have permission to merge directly and will instead first create a merge request. A merge request is a way to ask stakeholders outside your team to review your changes and give their explicit approval.

Once the feature team is happy with the changes—the plan is comprehensive, and engineering was able to implement it correctly—your branch is ready for review by other stakeholders.

{{partial:admonition type="tip" title=""}}
Be sure to refresh your changes from main to get your branch up to date and resolve any potential conflicts. You may do this more than once as your developers refresh their branch (with `git merge` or `git rebase`).
{{/partial:admonition}}

Analytics changes often affect the broader organization, so getting feedback is essential. Typical stakeholders include the security and legal team, the growth team, and the data team.

Soliciting reviews starts with the creation of a merge request. When creating a merge request, describe the changes you're proposing and @mention any specific reviewers or approvers you'd like to include. An admin- or manager-level user will then be able to approve changes.

## Merge

Once the tracking plan changes are ready and everyone who's needed to approve has done so, you're ready to merge into main.

Once the rest of the feature team is ready to merge in Git, merge your branch in Amplitude Data first. This will create a new official version of your tracking plan on main and assign new versions to all new and changed events.

If your Git branch is already up to date with the merged Amplitude Data branch, you can now merge your Git branch as-is. Running `ampli status --is-merged` will check that your Ampli code is up to date with the merged Data branch. If the command returns an error, run [ampli pull](https://www.docs.developers.amplitude.com/data/sdks/ampli-overview/#generate-the-ampli-wrapper-with-ampli-pull) to update the generated library to the latest version.

After `ampli status --is-merged` is successful, you can merge the Git branch.