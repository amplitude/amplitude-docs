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
Once you’ve designed your experiment and configured its delivery, you’re ready to test your experiment. Then, if all goes well, it’s time to launch it.

On the Experiment Overview page, review the *Design* and *Delivery* cards. Make sure everything is set the way you planned it. Then click *Test Instrumentation* to send the experiment’s variants to the testers you designated when you [configured the experiment's delivery](/docs/feature-experiment/workflow/configure-delivery).

{{partial:admonition type="note" heading="Test Instrumentation and targeting"}}
When you test your instrumentation, Amplitude ignores target segments you configure in the experiment. Test instrumentation sends variants to only the Testers you designate on the Testers tab the experiment's targeting section.
{{/partial:admonition}}

## QA before rollout

Before any users see your experiment, make sure the variants you’ve developed look and function exactly the way you intended.

Because Experiment allows you to assign specific variants by user ID, device ID, or cohort, you can quickly and easily ensure that Amplitude servers your test devices the relevant variants when they enter your experiment. 

## Launch your experiment

When you’re satisfied the implementation is as you intended, click *Start Experiment*. In the modal that opens, you can set an end date for the experiment, if you prefer.

{{partial:admonition type='note'}}
*Start Experiment* only activates the experiment once. Changing the start date doesn't trigger the experiment to activate on the new start date.
{{/partial:admonition}}

Once the experiment is running, the button changes to read *Complete Experiment*. Click this button again when you reach the experiment's end date, or when the experiment hits statistical significance. At that point, you can do one of three things:

* **roll out** the winning variant
* **roll back** everything and return to a pre-experiment state, or
* **continue** the experiment

You can always revisit this decision after you've made it.

{{partial:admonition type='note'}}
You may receive the warning "Unable to analyze this metric, check your metric definition or refresh this page" before launching an experiment or using a particular metric for the first time. This doesn't prevent you from running your experiment and testing your chosen parameters. 
{{/partial:admonition}}

### Schedule your experiment

To schedule the experiment for launch at a later time, expand the **Start Experiment** menu, and click **Schedule start**. In the modal that appears, set the date and time that you want to begin the experiment. 

{{partial:admonition type="note" heading="Experiment start and variant delivery"}}
When a scheduled experiment reaches its start time, there may be up to a one hour delay before the experiment begins exposing users to variants.
{{/partial:admonition}}

## QA after rollout

After rollout, you’ll be able to track how many of your users have been exposed to each variant on a daily basis. The *Diagnostics* card on the Experiment Overview page breaks this out for you in both chart and tabular form.

This is a useful way to QA the assignment process. If you notice that one variant is enrolling significantly more or significantly fewer users than you expected, it could mean an issue you should investigate.

If you do spot some outliers or anomalies that concern you, click *Root Cause Analysis* to conduct a deep dive into the potential causes. To learn more about how the Root Cause Analysis feature works, [see this article in the Help Center](/docs/analytics/root-cause-analysis).

## What happens when your experiment ends?

If you roll out your experiment to all users:

* Percentage rollouts are set to 100%
* Sticky bucketing is set to false
* The rollout weights change, to 1 for the variant you're rolling out and to 0 for all other variants

If you roll out your experiment to "custom," the automatic changes listed above don't occur. Apply changes manually after confirming your rollout decision.

If you roll back your experiment:

* Amplitude turns the flag off
* Percentage rollouts are set to 0%

If you opt to continue running, your experiment, you can enter a new end date.

Now that you’ve rolled out your experiment, the next step is to [learn from it](/docs/feature-experiment/workflow/experiment-learnings).
