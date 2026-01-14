---
id: 65d9fafb-4f9c-4c7d-936e-0627d5c20937
blueprint: workflow
title: 'Test and launch your experiment'
source: 'https://help.amplitude.com/hc/en-us/articles/360061687611-Test-and-launch-your-experiment'
this_article_will_help_you:
  - 'QA your experiment before and after rollout'
  - 'Launch your experiment to your users'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1714517033
---
Before any users view your experiment, make sure the variants you’ve developed look and function exactly the way you intended. Because Experiment allows you to assign specific variants by user ID, device ID, or cohort, you can ensure that Amplitude serves your test devices the relevant variants when they enter your experiment. 

On the Overview page for your specific experiment, review the Overview, Delivery, Variants, and Targeting sections. Make sure you set everything the way you planned it. 

Click **Test Instrumentation** to send the experiment’s variants to the testers you designated when you [configured the experiment's audience](/docs/feature-experiment/workflow/define-audience).

{{partial:admonition type="note" heading="Test Instrumentation and targeting"}}
When you test your instrumentation, Amplitude ignores the target segments you configured in the experiment. Test instrumentation sends variants to only the Testers.
{{/partial:admonition}}

## Launch your experiment

When you’re satisfied that your experiment works as you intended, click **Start Experiment**. 

If you want, you can set an end date for the experiment or accept the default Experiment analysis range.

{{partial:admonition type='note'}}
Clicking **Start Experiment** is the only way to activate your experiment. If you change the start date for the experiment, it won't automatically activate on the new date. 
{{/partial:admonition}}

## Ending your experiment

When you want to end the experiment, click **Complete Experiment**. End the experiment when you reach the experiment's end date or when the experiment reaches statistical significance. 

From there, you can do one of the following:

* **roll out** the winning variant.
* **roll back** everything and return to a pre-experiment state.
* **continue** the experiment.

You can always revisit this decision after you've made it.

### Rolling out variants

If you want to roll out the winning variant to all users, Amplitude:

* Sets the rollout percentage to 100%.
* Changes the distribution weight of the variant you roll out to 100 for the winning variant and 0 for all other variants.
* Disables sticky bucketing (sets it to `false`).

If you roll out your experiment to a "custom" percentage of users, the automatic changes listed above don't occur. Apply changes manually after confirming your rollout decision.

You can also roll out to "only the targeted users." This option helps avoid situations that generalize your experiment's results. For example, you target users in the United States, and find a 5% improvement in your results. These results don't mean that if you roll out to all users, there would be a lift of 5% outside of the United States. Sometimes, you may experience a 5% lift for U.S users but find a -2% lift for all other users.

### Rolling back an experiment

If you roll back your experiment, Amplitude:

* Turns the flag off.
* Sets percentage rollouts to 0%.

### Continuing your experiment

If you opt to continue running your experiment enter a new end date to gather more information and then click **Start Experiment** again.

## Scheduling your experiment

To schedule the experiment for launch at a later time, expand the **Start Experiment** menu and click **Schedule start**. In the modal that appears, set the date and time that you want to begin the experiment. 

{{partial:admonition type="note" heading="Experiment start and variant delivery"}}
When a scheduled experiment reaches its start time, there may be up to a one hour delay before the experiment begins exposing users to variants.
{{/partial:admonition}}

## QA after rollout

After rollout, you can track how many of your users were exposed to each variant on a daily basis. 

Go to *Experiments > your experiment > Activity tab > Diagnostics* to view how many users were exposed to each variant. 

This is a useful way to QA the assignment process. If you notice that one variant is enrolling significantly more or significantly fewer users than you expected, it could mean an issue you should investigate.

If you do spot some outliers or anomalies that concern you, click into the chart or information to conduct a deep dive into the potential causes. To learn more about understanding anomalies, review this article on [Root Cause Analysis](/docs/analytics/root-cause-analysis).
