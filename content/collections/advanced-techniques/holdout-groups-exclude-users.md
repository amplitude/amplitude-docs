---
id: 59a4add6-ca49-4b8f-9f39-85ed13dbf5e9
blueprint: advanced-technique
title: 'Holdout groups'
source: 'https://help.amplitude.com/hc/en-us/articles/13508918823835-Exclude-users-from-your-experiments-with-holdout-groups'
this_article_will_help_you:
  - 'Understand how holdout groups work in Amplitude Experiment'
  - 'Create, manage, and analyze a holdout group and the experiments in it'
  - 'Delve deeper into holdout groups with use case examples'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716329388
---
Sometimes it can be useful to keep a certain percentage of users from viewing an experiment. This is especially true when measuring the long-term, combined effects of multiple experiments. Statistical significance in one experiment may not reflect the true, cumulative impact of your experiments.

Amplitude Experiment lets you easily exclude users from your experiments by creating a **holdout** group. Holdout groups are especially useful for measuring the **long term** impact of your rolled-out variants, and measuring the lift of your experimentation program as a whole.

To learn more about the underlying implementation, see documentation in the [Amplitude Developer Center](https://www.docs.developers.amplitude.com/experiment/general/flag-dependencies).

### Feature availability

This feature is available to users on **Enterprise plans** who have **purchased Amplitude Experiment**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin

When using holdout groups, there are a few things to keep in mind:

* **Set the holdout percentage between 1% and 10%**: Withholding a significant portion of your total traffic can extend the time your experiments need to reach a conclusion.
* **Add experiments to a holdout group before they’ve started running**: Adding running experiments to a holdout group can severely compromise the integrity of your data by unassigning users from the active experiments.
* **Don’t remove a running experiment from a holdout group**: This can compromise the integrity of your data by assigning users to the active experiments.
* **Don’t delete a holdout group with running experiments**: To prevent compromising your running experiment's data, delete the holdout group after all experiments in the group have concluded.

## Create a holdout group

To create a holdout group and add your experiments to it, follow these steps:

1. In Amplitude Experiment, navigate to the *Experiment Groups* tab in the Experiments page. (If you’re trying to do this from within an experiment, open the *Configure* tab and click *See Holdout Groups*.) Here, you can see all your holdout groups and be able to create new ones.
2. To add a new holdout group to your project, click *Add a new holdout group*.

![Screenshot](/docs/output/img/advanced-techniques/screenshot.png)

If you have existing groups, click *Create A New Group*, and then select *Holdout Group* in the drawer.

3. In the *Holdout group settings* modal, enter the name, description, and holdout percentage for the group. You can also view and change advanced settings such as the evaluation mode and bucketing key of your group.

{{partial:admonition type='note'}}
The holdout percentage cannot be changed once you’ve created the group. This ensures consistent bucketing, as well as a consistent user experience.
{{/partial:admonition}}

4. From the Experiments tab, click *+ Add Experiment* to add experiments to your holdout group.
5. If desired, specify individuals or cohorts that you'd like to include or exclude from your holdout group. From either the *Individuals* or *Cohorts* tabs, add a user or cohort under *Include in holdout* or *Exclude from holdout*. This is helpful if you would like to ensure that specific users are either always held out, or never held out, from the holdout group.  
  
Be sure not to add the same users nor cohorts to both the *Include a holdout* and *Exclude from holdout* slots, as inclusion will be determined by the *Include a holdout* slot.

6. Click *Add Group* to finish the process.

![holdoutGroupIndvCohortsSettings.png](/docs/output/img/advanced-techniques/holdoutgroupindvcohortssettings-png.png)

## Manage holdout groups

Manage your holdout groups from the *Experiment Groups* tab or from within an experiment:

1. In the *Experiment Groups* tab, scroll down the table until you find the group you want to edit.
2. Click the edit icon.
3. Make your changes in the *Holdout group settings* modal and click *Save*.

Alternatively, if you are within an experiment that is part of a holdout group, follow these steps: 

1. Navigate to the *Configure* tab.
2. Click the name of the group you want to edit.
3. Make your changes in the *Holdout group settings* modal and click *Save*.

## Analyze a holdout group

Analyze your holdout groups using an Experiment Results chart.

To create a pre-populated Experiment Results chart, follow these steps: 

1. Navigate to the Experiments page and open the *Experiment Groups* tab.
2. Find the holdout group you want to analyze and click the chart icon.
3. Click *Open in Analytics*.
4. A new Experiment Results chart will open, with the following fields prefilled:

* * Exposure event
	* Segments for *holdout* and *on*
	* Statistical method set to [T-test](/docs/experiment/experiment-theory/analyze-with-t-test) (*Samples per variant needed* set to 10,000)
	* Analysis date range

5. From here, select the primary metric and start analyzing the impact of your holdout group.

For more information, read the [help center article on advanced use cases for holdout groups](/docs/experiment/advanced-techniques/holdout-groups-advanced-use-cases).