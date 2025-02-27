---
id: df4d54b0-5e1d-482e-b922-2b0991c96549
blueprint: experiment
title: 'Decide who will see the variant'
this_article_will_help_you:
  - 'Learn how to decide who will see the variant'
landing: false
exclude_from_sitemap: false
updated_by: 13054dd3-3dcd-4d55-aaaf-13bb99388147
updated_at: 1740661362
---
Next you'll be able to decipher a bucketing unit, or the determinant of what group of people sees the same variant. The most common bucketing unit is “user”. However, if you’re a B2B business or are utilizing the collaboration feature, you might want to use a bucketing unit such as “organization” or company\_id, which means that every user within the same organization will see the same variant. This can help reduce product-related confusion caused by disparate user interfaces if people are sitting next to their coworkers. Another reason for bucketing by company\_id is to reduce the load on your customer support team. It is easier for the customer support team to know which accounts have which features enabled. Either way, you want to make sure the Stable Unit Treatment Value Assumption ([SUTVA](https://blogs.iq.harvard.edu/violations_of_s#:~:text=Methods%20for%20causal%20inference%2C%20in,treatments%20of%20others%20around%20him)) holds for whatever bucketing unit you choose to best ensure inference. 

{{partial:admonition type='note'}}
 If your organization has purchased the [Accounts add-on,](/docs/analytics/account-level-reporting) you may perform bucketing and analysis on groups rather than users.
{{/partial:admonition}}