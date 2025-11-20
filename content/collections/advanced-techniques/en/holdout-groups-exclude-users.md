---
id: 59a4add6-ca49-4b8f-9f39-85ed13dbf5e9
blueprint: advanced-technique
title: 'Holdout groups'
source: 'https://help.amplitude.com/hc/en-us/articles/13508918823835-Exclude-users-from-your-experiments-with-holdout-groups'
this_article_will_help_you:
  - 'Understand how holdout groups work in Amplitude Feature Experiment'
  - 'Create, manage, and analyze a holdout group and the experiments in it'
  - 'Delve deeper into holdout groups with use case examples'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1730484258
---
Sometimes, it can be useful to keep a certain percentage of users from viewing an experiment. This is especially true when measuring the long-term, combined effects of multiple experiments. Statistical significance in one experiment may not reflect the true, cumulative impact of your experiments.

You can exclude users from your experiments by creating a holdout group. Holdout groups help you measure the long term impact of your rolled-out variants as well as measuring the lift of your experimentation program as a whole. Holdout groups do this by retaining a number of users from previous experiments. You use this group of holdout users to then show the winning combinations of previous results. These holdout groups can then show you true measures of success for your previous experiments. 

Your holdout groups experience previous experiments. You can set up dependencies for which experiments you want to show your holdout group. For more information, go to the article on [Flag Dependencies](/docs/feature-experiment/under-the-hood/flag-dependencies#holdout-groups).

## Creating a holdout group

When using holdout groups, there are a few things to keep in mind:

* **Set the holdout percentage between 1% and 10%**: Withholding a significant part of your total traffic can extend the time your experiments need to reach a conclusion.
* **Add experiments to a holdout group before they’ve started running**: Adding running experiments to a holdout group can severely compromise the integrity of your data by unassigning users from the active experiments.
* **Don’t remove a running experiment from a holdout group**: This can compromise the integrity of your data by assigning users to the active experiments.
* **Don’t delete a holdout group with running experiments**: To prevent compromising your running experiment's data, delete the holdout group after all experiments in the group have concluded.

##### To create a holdout group

1. In the Experiment functionality, go to *Experiments > Mutex and Holdouts tab*. 
2. To add a new holdout group to your project, click **Add a new holdout group**. 
   * If you have existing groups, click **Create A New Group**, and then select **Holdout Group**.
3. In the Holdout group settings modal, enter the name, description, and holdout percentage for the group. You can also view and change advanced settings such as the evaluation mode and bucketing key of your group.

  {{partial:admonition type='note'}}
  You can't change the holdout percentage after you create a group. This ensures consistent bucketing, as well as a consistent user experience.
  {{/partial:admonition}}

4. Click **Add Experiment** to add experiments to your holdout group.
5. (*Optional*) Specify individuals or cohorts that you'd like to include or exclude from your holdout group. From either the Individuals or Cohorts tabs, add a user or cohort under *Include in holdout* or *Exclude from holdout*. This is helpful if you would like to ensure that specific users are either always held out, or never held out, from the holdout group.  
  
Don't add the same users nor cohorts to both the *Include a holdout* and *Exclude from holdout* slots, as the *Include a holdout* slot determines inclusion.

6. Click **Add Group** to finish the process.

![holdoutGroupIndvCohortsSettings.png](/docs/output/img/advanced-techniques/holdoutgroupindvcohortssettings-png.png)

## Managing holdout groups

Manage your holdout groups from the Experiment Groups tab or from within an experiment:

1. In the Mutex and Holdout tab, scroll down the table until you find the group you want to edit.
2. Click the **edit** icon.
3. Make your changes in the Holdout group settings modal and click **Save**.

If you are within an experiment that's part of a holdout group, follow these steps: 

1. Click the name of the group you want to edit.
2. Make your changes in the Holdout group settings modal and click **Save**.

## Analyzing a holdout group

Analyze your holdout groups using an Experiment Results chart.

##### To create a pre-populated Experiment Results chart

1. Navigate to the Experiments page and click the **Mutex and Holdout** tab.
2. Find the holdout group you want to analyze and click the **Analyze** icon.
3. Click **Open in Chart**.
4. A new Experiment Results chart opens, with the following fields complete:

   * Exposure event
   * Segments for `Holdout` and `On`
   * Statistical method set to [T-test](/docs/feature-experiment/experiment-theory/analyze-with-t-test) (*Samples per variant needed* set to 10,000)
   * Analysis date range

5. From here, select the primary metric and start analyzing the impact of your holdout group.

## Advanced use cases

### Streamline multiple experiments and holdout groups

Adding an experiment to multiple holdout groups may limit an experiment's traffic. This is because Experiment evaluates each user for each holdout group they belong to.

For example, you have the following two holdout groups:

* **Holdout group 1**: This group contains Experiment A and Experiment B, with a holdout percentage of 5%.
* **Holdout group 2**: The second group contains Experiment A and Experiment C, also with a holdout percentage of 5%.

Because Experiment A is part of both holdout groups (1 and 2), it receives the majority of the total traffic, or `0.95 * 0.95 = 0.9025` (90.25%).

Instead of adding an experiment to multiple holdout groups, create a single group with all the relevant experiments instead. This allows for a more even distribution of traffic across experiments. 

In the example above, you would create one holdout group containing all three experiments (A, B, and C).

### Managing experiments with holdout groups and mutual exclusion

Adding an experiment to a holdout group and a mutual exclusion group can also further limit the amount of traffic to the experiment. Experiment evaluates each user for both the holdout group and the mutual exclusion group.

For example, imagine the following holdout group and mutual exclusion group: 

* **The holdout group** has a holdout percentage of 5% and contains Experiment A.
* **The mutual exclusion group** has half the traffic directed to Experiment A in slot 1, with the other half  to Experiment B in slot 2.

In this scenario, experiment A receives about half of the total traffic, or `0.95 * 0.5 = 0.475` (47.5%).

Using holdout groups with mutual exclusion isn't forbidden, but be cautious of the potential traffic limits as you plan and roll out your experiments.

Learn more in this [article about mutual exclusion groups](/docs/feature-experiment/advanced-techniques/mutually-exclusive-experiments).