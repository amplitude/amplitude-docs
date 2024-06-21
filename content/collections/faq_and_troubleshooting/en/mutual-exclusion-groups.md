---
id: 257d4cbd-b83b-4aee-be98-7ba5bb509e83
blueprint: faq_and_troubleshooting
title: 'Mutual exclusion groups'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/14753159500827'
category: experiment
---
In Amplitude Experiment, you can set experiments as mutually exclusive. This means users will not interact with more than one experiment at the same time. For example, users who are shown experiment A will not see experiment B, and vice versa. 

{{partial:admonition type='note'}}
 Experiments running with local evaluation can only be added to mutual exclusion groups running with local evaluation.
{{/partial:admonition}}

This article covers some frequently asked questions about [mutual exclusion groups](/docs/experiment/advanced-techniques/mutually-exclusive-experiments).


{{partial:collapse name="Is it best to create a mutual exclusion group before launching an experiment?"}}
Yes. In general, you should avoid making any configuration changes affecting targeting once the experiment starts. If you add an active experiment to a mutual exclusion group, Amplitude Experiment may **re-determine** user assignments.
{{/partial:collapse}}


{{partial:collapse name="How do the *Slot %* allocations affect user targeting?"}}
When creating mutual exclusion groups, you can set an **allocation percentage**. This specifies the probability of a user being assigned to an experiment. For example, an allocation percentage of 25% means users have a 25% chance of being assigned to the experiment. Allocation percentages can total 100% or less. If less than 100%, unused traffic will experience the "off" treatment of the experiment.
{{/partial:collapse}}

{{partial:collapse name="When does Amplitude Experiment apply mutual exclusion?"}}
Amplitude Experiment follows a specific order of operations when assigning users to experiments:

`individual user qualification → mutual exclusion → sticky bucketing → target
 segment`

Because Amplitude Experiment considers the individual user qualification **before** mutual exclusion groups, users targeted under `Individual
 Users` may be able to see multiple experiments even if they are in the same mutual exclusion group. 

{{partial:admonition type='note'}}
Visit the [Amplitude Developer Center](/docs/experiment/implementation) for more information.
{{/partial:admonition}}
{{/partial:collapse}}


{{partial:collapse name="Why is a user being exposed to more than one experiment with mutual exclusion set up?"}}
The same user may be exposed to more than one experiment, even if the experiments are set up for mutual exclusion. This could be due to the way Amplitude orders its operations when assigning users to experiments (see further explanation in the answer to the question above).

Another reason could be due to how [unique users are tracked in Amplitude](/docs/cdp/sources/instrument-track-unique-users). For example, a user could anonymously use more than one device before logging in to Amplitude. Until that user is identified and merged to its existing ID, Amplitude will assume it's a different user that is available for assignment.

Or, the multiple exposures could be a case of [variant jumping](/docs/experiment/troubleshooting/variant-jumping), when a user is exposed to two or more variants for a single flag or experiment.
{{/partial:collapse}}