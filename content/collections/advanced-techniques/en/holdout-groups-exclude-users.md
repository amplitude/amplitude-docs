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
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1719503550
---
Sometimes it can be useful to keep a certain percentage of users from viewing an experiment. This is especially true when measuring the long-term, combined effects of multiple experiments. Statistical significance in one experiment may not reflect the true, cumulative impact of your experiments.

Amplitude Experiment lets you easily exclude users from your experiments by creating a **holdout** group. Holdout groups are especially useful for measuring the **long term** impact of your rolled-out variants, and measuring the lift of your experimentation program as a whole.

For more information, see the article on [Flag Dependencies](/docs/feature-experiment/under-the-hood/flag-dependencies#holdout-groups).

### Feature availability

This feature is available to users on **Enterprise plans** who have **purchased Amplitude Experiment**. See the [pricing page](https://amplitude.com/pricing) for more details.

## Before you begin

When using holdout groups, there are a few things to keep in mind:

* **Set the holdout percentage between 1% and 10%**: Withholding a significant part of your total traffic can extend the time your experiments need to reach a conclusion.
* **Add experiments to a holdout group before they’ve started running**: Adding running experiments to a holdout group can severely compromise the integrity of your data by unassigning users from the active experiments.
* **Don’t remove a running experiment from a holdout group**: This can compromise the integrity of your data by assigning users to the active experiments.
* **Don’t delete a holdout group with running experiments**: To prevent compromising your running experiment's data, delete the holdout group after all experiments in the group have concluded.

## Create a holdout group

To create a holdout group and add your experiments to it, follow these steps:

1. In Amplitude Experiment, navigate to the *Experiment Groups* tab in the Experiments page. Here, you can see all your holdout groups and be able to create new ones.
2. To add a new holdout group to your project, click *Add a new holdout group*.

![Screenshot](/docs/output/img/advanced-techniques/screenshot.png)

If you have existing groups, click *Create A New Group*, and then select *Holdout Group* in the drawer.

3. In the *Holdout group settings* modal, enter the name, description, and holdout percentage for the group. You can also view and change advanced settings such as the evaluation mode and bucketing key of your group.

  {{partial:admonition type='note'}}
  You can't change the holdout percentage after you create a group. This ensures consistent bucketing, as well as a consistent user experience.
  {{/partial:admonition}}

4. From the Experiments tab, click *+ Add Experiment* to add experiments to your holdout group.
5. If desired, specify individuals or cohorts that you'd like to include or exclude from your holdout group. From either the *Individuals* or *Cohorts* tabs, add a user or cohort under *Include in holdout* or *Exclude from holdout*. This is helpful if you would like to ensure that specific users are either always held out, or never held out, from the holdout group.  
  
Don't add the same users nor cohorts to both the *Include a holdout* and *Exclude from holdout* slots, as the *Include a holdout* slot determines inclusion.

6. Click *Add Group* to finish the process.

![holdoutGroupIndvCohortsSettings.png](/docs/output/img/advanced-techniques/holdoutgroupindvcohortssettings-png.png)

## Manage holdout groups

Manage your holdout groups from the *Experiment Groups* tab or from within an experiment:

1. In the *Experiment Groups* tab, scroll down the table until you find the group you want to edit.
2. Click the edit icon.
3. Make your changes in the *Holdout group settings* modal and click *Save*.

If you are within an experiment that's part of a holdout group, follow these steps: 

1. Navigate to the *Configure* tab.
2. Click the name of the group you want to edit.
3. Make your changes in the *Holdout group settings* modal and click *Save*.

## Analyze a holdout group

Analyze your holdout groups using an Experiment Results chart.

To create a pre-populated Experiment Results chart, follow these steps: 

1. Navigate to the Experiments page and open the *Experiment Groups* tab.
2. Find the holdout group you want to analyze and click the chart icon.
3. Click *Open in Analytics*.
4. A new Experiment Results chart opens, with the following fields complete:

   * Exposure event
   * Segments for *holdout* and *on*
   * Statistical method set to [T-test](/docs/feature-experiment/experiment-theory/analyze-with-t-test) (*Samples per variant needed* set to 10,000)
   * Analysis date range

5. From here, select the primary metric and start analyzing the impact of your holdout group.

## Advanced use cases

### Streamline multiple experiments and holdout groups

Adding an experiment to multiple holdout groups may limit an experiment's traffic. This is because Experiment evaluates each user for each holdout group they belong to.

For example, imagine two holdout groups:

* **Holdout group 1**: This group contains **experiment A** and **experiment B**, with a holdout percentage of 5%.
* **Holdout group 2**: The second group contains **experiment A** and **experiment C**, also with a holdout percentage of 5%.

Since **experiment A** is part of both holdout groups (1 and 2), it receives the majority of the total traffic:

0.95 * 0.95 = 0.9025 (90.25%)

Instead of adding an experiment to multiple holdout groups, create a single group with all the relevant experiments instead. This allows for a more even distribution of traffic across experiments. 

In the example above, you would create just **one** holdout group containing all three experiments (A, B, and C).

### Handle experiments with holdout groups and mutual exclusion

Adding an experiment to a holdout group **and** a mutual exclusion group can also further limit the amount of traffic to the experiment. Experiment evaluates each user for both the holdout group **and** the mutual exclusion group.

For example, imagine the following holdout group and mutual exclusion group: 

* **The holdout group** has a holdout percentage of 5% and contains **experiment A**.
* **The mutual exclusion group** has half the traffic directed to **experiment A in slot 1**, with the other half  to **experiment B in slot 2**.

In this scenario, experiment A receives about half of the total traffic:

0.95 * 0.5 = 0.475 (47.5%)

Using holdout groups with mutual exclusion isn't forbidden, but be cautious of the potential traffic limits as you plan and roll out your experiments.

Learn more in this [article about mutual exclusion groups](/docs/feature-experiment/advanced-techniques/mutually-exclusive-experiments).