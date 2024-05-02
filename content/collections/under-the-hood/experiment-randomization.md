---
title: "How randomization works in Amplitude Experiment"
source: "https://help.amplitude.com/hc/en-us/articles/360061687351-How-randomization-works-in-Amplitude-Experiment"
id: 669c59bc-5161-42fd-ad49-ab8804311bee
---

#### This article will help you:

* Understand the process Amplitude Experiment uses to randomly assign users to experiment variants

Amplitude Experiment uses **deterministic randomization** of variations. This randomization uses the bucketing key selected in the UI, as well as the bucketing salt of the flag. In most cases, the Amplitude ID is used as the bucketing key.

This randomization model is two-dimensional: Amplitude Experiment performs a murmur3 hash of  `"bucketingSalt/amplitude_id"` , and uses that hash to determine first, whether a specific user should be assigned a variant, and second, which variant that user should be assigned.

**NOTE:** In this article, `/` refers to the backslash character. It does not imply mathematical division.

For the first stage (i.e., initial assignment), Experiment divides users into 100 buckets based on the value of  `mod(murmur3_x86_32("bucketingSalt/id", 100).`  If the bucket returned is **less** than the percentage rollout, then the user is bucketed into the experiment, in which case the user will be assigned a variant. If the user is **not bucketed** into the experiment, they will see the fallback variant instead.

For the second stage (variation assignment), Experiment will take all users bucketed into the experiment and assign each a variant according to the value of  `floor(murmur3_x86_32("bucketingSalt/id"), 100).` 

Variants are associated with values between 0 and 42949672, based on their **weights**. For example, in a two-variant experiment, if Variant A has weight 1 and Variant B has weight 1 (i.e., each variant should receive 50 percent of the experiment’s traffic), a user would be assigned to Variant A if the value of the hash lies between 0 and 21474835. The user would be assigned to Variant B if that value lies between 21474836 and 42949672.
