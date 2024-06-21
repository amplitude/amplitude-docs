---
id: 95892000-ec56-4eb0-bd92-f45a49bb51e3
blueprint: faq_and_troubleshooting
title: Personas
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360053937572'
category: charts
---
This article covers some frequently asked questions about the [Personas chart](/docs/analytics/charts/personas/personas-clustering).


{{partial:collapse name="How does the Personas chart calculate clusters?"}}
Previously, Amplitude relied on the [K-Means](https://en.wikipedia.org/wiki/K-means_clustering) algorithm to generate clusters for the Personas charts. However, this approach has two important limitations:

* It does not handle outliers well, so behaviors with large frequency ranges could skew the clusters towards representing unusual patterns of engagement. As a byproduct, the clusters could fail to capture the nuance within more typical rates of behaviors.
* It does not handle “high-dimensional” data well, so when customers have a lot of different event types, the clusters could sometimes fail to represent groups of users who were truly similar in behavior.

For these reasons, we began exploring how we could better use clustering to help customers identify meaningful patterns of user behavior in their data. Through that work, we ultimately decided to replace K-Means with [Non-Negative Matrix Factorization](https://en.wikipedia.org/wiki/Non-negative_matrix_factorization).
{{/partial:collapse}}


{{partial:collapse name="What is Non-Negative Matrix Factorization (NMF)?"}}
Amplitude utilizes NMF to calculate clusters. Given a data set, clustering algorithms look for ways to partition the set that allow the similarities within each partition to be maximized, while simultaneously minimizing similarity between different partitions.

To escape the curse of high-dimensionality in the original "event space,” NMF explicitly carries out a mathematical [dimension-reduction](https://en.wikipedia.org/wiki/Dimensionality_reduction) to arrive at a more comprehensible “behavior space.” Moreover, the method diminishes outlier effects by weighing events based on their frequencies and by normalizing each user’s event counts. Once projected to the simpler behavior space, users who are similar along certain behavioral dimension will easily cluster/group together.

Note that the number of dimensions in the behavior space is exactly the number of clusters being specified; because of this built-in connection, NMF clusters tend to be very hierarchical.

If you are interested in learning more about how NMF works, please see [this article](https://arxiv.org/pdf/1507.03194.pdf).
{{/partial:collapse}}
