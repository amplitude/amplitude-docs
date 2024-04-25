---
title: "Set up and run mutually exclusive experiments"
source: "https://help.amplitude.com/hc/en-us/articles/360061270712-Set-up-and-run-mutually-exclusive-experiments"
id: c9856100-2aad-440c-9d2f-505eb008d57b
---

#### This article will help you:

* Understand how mutual exclusion works in Amplitude Experiment
* Set two or more experiments to be mutually exclusive of each other

When running several experiments at once, you may want to keep users who are included in one experiment from being exposed to a second, related experiment at the same time. Perhaps these experiments are working on solving the same problem in different ways, and you worry that your users will be confused if they’re exposed to both, or that your experiment results might be tainted by the **interaction effect**. 

Amplitude Experiment makes it easy to set two or more experiments to be **mutually exclusive** to each other. When you set experiments as mutually exclusive, this means they cannot share any users: users who are shown experiment A will not see experiment B, and vice versa. Simply add both experiments to the same **mutual** **exclusion group**, and Amplitude Experiment will take care of the rest.

To learn more about the underlying implementation, see [Amplitude's developer documentation](https://www.docs.developers.amplitude.com/experiment/general/flag-dependencies).

### Feature availability

This feature is available to users on **Enterprise plans** who have **purchased Amplitude Experiment**. See our [pricing page](https://amplitude.com/pricing) for more details.

## When should you make experiments mutually exclusive?

Generally, mutually exclusive experiments are recommended in these situations:

* Simultaneous experiments that occur in the **same area** of your product, and have the **same goal**.
* Simultaneous experiments that occur in the **same funnel**, and have the **same goal**.

Alternatively, you could run these experiments one after the other, instead of simultaneously.

## Before you begin

Here are some things to keep in mind when using mutual exclusion groups:

* Distribute traffic evenly between your slots.
* **Don’t** **add a running experiment** to a mutual exclusion group. This can severely compromise the integrity of your data by unassigning users from the active experiments. Instead, add experiments to a mutual exclusion group **before** they've started running.
* **Don’t** **remove** a running experiment from a mutual exclusion group. This can compromise the integrity of your data by exposing users to the other experiments in the group.
* **Don't delete** a mutual exclusion group with running experiments, for the same reason. Instead, delete the mutual exclusion group after all experiments in the group have concluded.

## Create a mutual exclusion group

To create a mutual exclusion group and add your experiment to it, follow these steps:

1. In Amplitude Experiment, navigate to the *Experiment Groups* tab in the Experiments page. (If you are trying to do this from within an experiment, head to the *Configure* tab and click *See Mutual Exclusion Groups*.) Here, you can see all your mutual exclusion groups and be able to create new ones.
2. If you have no groups in your project, click *Add a new mutual exclusion group* to create a new group. If you already have existing groups, click *Create A New Group*, then select *Mutual Exclusion Group* in the drawer.  
  
![Screenshot](/output/img/advanced-techniques/screenshot.png)
3. In the *Mutual exclusion group settings* modal, enter a name and description for your group. You can also view and change your group's advanced settings here, such as the evaluation mode and bucketing key.
4. Next, add your **slots** and assign experiments to each slot. Experiments in different slots will be mutually exclusive from each other. You can add a maximum of 20 slots to a mutual exclusion group.

**NOTE:** Once the group has been created, you will be unable to change the number of slots it contains, or the traffic allocation percentages. This ensures consistent bucketing, as well as a consistent user experience.

5. If desired, specify individuals or cohorts that you'd like to add to your mutual exclusion group from either the *Individuals* or *Cohorts* tabs. This is helpful if you would like to test an experiment that is in a mutual exclusion group to ensure that a certain user gets assigned to a specific experiment.  
  
Be sure not to add the same users nor cohorts to more than one slot, as the first slot will be used to determine inclusion.
6. Set the traffic allocation percentages for each experiment. By default, traffic will be evenly distributed between them, but you can manually edit these percentages. This determines the percentage of the total traffic that will be allocated to each experiment in the group.
7. Click *Add Group* to finish the process.  

![mutual exclusions.png](/output/img/advanced-techniques/mutual-exclusions-png.png)

## Advanced use cases

* To increase traffic allocation to an experiment, you can either directly change the slot percentage when you first create the group, or you can assign a single experiment to multiple slots within the same group, thus enabling you to change traffic allocation after the group creation stage.
* Adding an experiment to multiple mutual exclusion groups will limit the experiment's traffic even more. This is because each user must be evaluated for each mutual exclusion group they belong to.  
  
For example, consider the following two mutual exclusion groups:

* * * * * Mutual exclusion group 1 has experiment A in slot 1 and experiment B in slot 2, where each experiment receives 50% of the traffic
				* Mutual exclusion group 2 has experiment A in slot 1 and experiment C in slot 2, where each experiment receives 50% of the traffic

In this case, experiment A will receive 0.5 \* 0.5 = 0.25, or 25% of the total traffic.

Instead of adding an experiment to multiple mutual exclusion groups, create a group that includes all the relevant experiments instead; here, that group would contain experiments A, B, and C.

* Adding an experiment to a holdout group **and** a mutual exclusion group will further limit the amount of traffic to the experiment, as each user will be evaluated for both groups.

For example, consider the following holdout group and mutual exclusion group: 

* * * * * The holdout group contains experiment A, with a holdout percentage of 5%
				* The mutual exclusion group contains experiment A in slot 1 and experiment B in slot 2, where each experiment receives 50% of the traffic

In this case, experiment A will receive 0.95 \* 0.5 = 0.475, or 47.5% of the total traffic.

Learn more in this Help Center article about [working with holdout groups in Amplitude Experiment.](/experiment/advanced-techniques/holdout-groups-exclude-users)
