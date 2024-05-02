---
id: 1623ff4b-4f76-411c-bbe4-2f38614ffc9a
blueprint: workflow
title: 'Create a new experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/360061687551-Create-a-new-experiment'
this_article_will_help_you:
  - 'Create and initialize a new experiment'
  - 'Add context to your experiment description, so other stakeholders will understand it'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714514653
---
The decisions you make in the **design** phase set the stage for your experiment’s success. By putting more thought into your experiment’s purpose and goals before you start, you’ll be far more likely to glean useful, actionable insights from it.

To create a new experiment, first ensure you’ve created a deployment, and either [installed the SDK](/experiment/workflow/configure) or are set up to call the [evaluation REST API](https://www.docs.developers.amplitude.com/experiment/apis/evaluation-api/ "https://www.docs.developers.amplitude.com/experiment/apis/evaluation-api/").  Then follow these steps:

1. Open Amplitude Experiment and click *+ New.* In the *Create New…* fly-out panel, select *Experiment*.
2. In the *Create Experiment* modal, choose the project that will house this experiment from the *Projects* drop-down menu.
3. Enter a name and a description for your experiment in the appropriate fields.   
  
{{partial:admonition type='note'}}
Amplitude Experiment uses **flags** to include experiments within your product. It will automatically generate the flag key for your experiment from the name you choose; this key will act as an identifier for the flag used in your codebase.
{{/partial:admonition}}

4. Optionally, you can select a template for this experiment.
5. When you’re done, click *Create*.

Amplitude Experiment will open the Experiment Design panel to guide you through the rest of the process. First, in the *Basics* section, you'll choose one of the following experiment types:

* *Hypothesis Testing* (default): Experiments where you’re using data to determine which variant to roll out based on performance. If no variant outperforms the control, you’ll usually want to roll back the experiment and stick with the control experience.
* *Do No Harm (DNH):* Experiments where you already have a direction in mind, and the purpose of the experiment is to make sure that this change **does not** significantly harm key metrics. This type of experiment is often used for design system changes, or features that have to be sunset.

As an example, let's say you've chosen to run a hypothesis testing experiment with a direction setting of "increase" and a minimum goal (MDE) of 2%. This means you believe the metric will increase by at least 2%. If you change the experiment type to *Do No Harm*, you'd be saying that you expect the metric to "*not* increase by 2%." A good use case for a Do No Harm experiment is launching a service agreement in your app and then testing for a lack of change in user retention.

Click *Continue* to move on to the next step—[defining your experiment’s goals](/experiment/workflow/define-goals).