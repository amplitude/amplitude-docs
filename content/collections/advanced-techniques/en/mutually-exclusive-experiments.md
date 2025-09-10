---
id: c9856100-2aad-440c-9d2f-505eb008d57b
blueprint: advanced-technique
title: 'Set up and run mutually exclusive experiments'
source: 'https://help.amplitude.com/hc/en-us/articles/360061270712-Set-up-and-run-mutually-exclusive-experiments'
this_article_will_help_you:
  - 'Understand how mutual exclusion works in Amplitude Experiment'
  - 'Set two or more experiments to be mutually exclusive of each other'
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714079731
---
When running several experiments at the same time, you may want to keep users who receive one experiment from being exposed to a second, related experiment. These experiments may be solving the same problem in different ways, and you worry about confusing users if they’re exposed to both. Or, your experiment results might be tainted by the [interaction effect](https://dictionary.apa.org/interaction-effect). 

Experiment lets you set two or more experiments as mutually exclusive to each other. When you set experiments as mutually exclusive, this means they can't share any users. Users who receive experiment A will not receive experiment B nor will the reverse be true. 

To learn more about the underlying implementation, review [flag dependencies](https://www.docs.developers.amplitude.com/experiment/general/flag-dependencies).

### Feature availability

This feature is available to users on Enterprise plans who have purchased Experiment. Go to the [pricing page](https://amplitude.com/pricing) for more details.

## When to use mutually exclusive experiments

Use mutually exclusive experiments in these situations:

* Simultaneous experiments that occur in the same area of your product and have the same goal.
* Simultaneous experiments that occur in the same funnel and have the same goal.

Alternatively, you could run these experiments one after the other, instead of simultaneously.

## Create a mutual exclusion group

Here are some things to keep in mind when using mutual exclusion groups:

* Distribute traffic evenly between your slots. A slot is the percentage of the group that you want to receive an experiment. You can add multiple slots to your group to distribute traffic in any way you want across your group.
* Don’t add a running experiment to a mutual exclusion group. This can severely compromise the integrity of your data by removing users from the active experiments. Instead, add experiments to a mutual exclusion group before they've started running.
* Don’t remove a running experiment from a mutual exclusion group. This can compromise the integrity of your data by exposing users to the other experiments in the group.
* Don't delete a mutual exclusion group with running experiments, for the same reason. Instead, delete the mutual exclusion group after all experiments in the group have concluded.

##### To create a mutual exclusion group

1. In the Experiment feature, go to *Experiments > MutEx and Holdouts tab*. 
2. If you have no groups in your project, click **Add a new mutual exclusion group** to create a new group. 
    (**Note:**)If you already have existing groups, click **Create Group** then select **Mutual Exclusion Group**.  
4. Enter a name and description for your group and then enter details about your delivery settings such as evaluation mode, bucketing, and key.
5. Create the number of slots you want and assign experiments to each slot. Experiments in different slots will be mutually exclusive from each other. You can add a maximum of 20 slots to a mutual exclusion group.

{{partial:admonition type='note'}}
After the group is created, you can't change the number of slots it contains. Additionally, you can't change traffic allocation percentages. This ensures consistent bucketing, as well as a consistent user experience.
{{/partial:admonition}}

6. (*Optional*) Specify individuals or cohorts that you'd like to add to your mutual exclusion group from either the Individuals or Cohorts tabs. This is helpful if you want to test an experiment that's in a mutual exclusion group to ensure that a certain user gets assigned to a specific experiment. Be sure not to add the same users or cohorts to more than one slot, as the first slot determines inclusion.
7. Set the traffic allocation percentages for each experiment. By default, traffic will be evenly distributed between them, but you can manually edit these percentages. 
8. Click **Add Group**.  

## Advanced use cases

* To increase traffic allocation to an experiment, either change the slot percentage when the group is created. If the group is already created, assign a single experiment to multiple slots within the same group.
* Adding an experiment to multiple mutual exclusion groups further limits the experiment's traffic. This is because each user must be evaluated for each mutual exclusion group to which they belong.  
  
    For example, consider the following two mutual exclusion groups:

    * Mutual exclusion group 1 has experiment A in slot 1 and experiment B in slot 2, where each experiment receives 50% of the traffic.
    * Mutual exclusion group 2 has experiment A in slot 1 and experiment C in slot 2, where each experiment receives 50% of the traffic.

    In this case, experiment A receives `0.5 * 0.5 = 0.25`, or 25% of the total traffic.

    Instead of adding an experiment to multiple mutual exclusion groups, create a group that includes all the relevant experiments. In this example, that group contains experiments A, B, and C.

* Adding an experiment to a holdout group and to a mutual exclusion group further limits the amount of traffic to the experiment because each user is evaluated for both groups.
    For example, consider the following holdout group and mutual exclusion group: 
   
    * The holdout group contains experiment A, with a holdout percentage of 5%.
    * The mutual exclusion group contains experiment A in slot 1 and experiment B in slot 2, where each experiment receives 50% of the traffic.

    In this case, experiment A receives `0.95 * 0.5 = 0.475`, or 47.5% of the total traffic.

Learn more in this article about [working with holdout groups in Amplitude Experiment.](/docs/feature-experiment/advanced-techniques/holdout-groups-exclude-users)