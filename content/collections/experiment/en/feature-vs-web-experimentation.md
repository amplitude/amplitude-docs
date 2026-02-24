---
id: d002d2ad-3a7f-41f7-aec9-0df7db9fb90b
blueprint: experiment
title: 'Feature and Web Experiment Use Cases'
this_article_will_help_you:
  - 'Understand the differences between Feature and Web Experiment'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1756412125
---
You can create experiments using either Feature Experiment or Web Experiment. Depending on your needs for any particular experiment and the results you want to generate, you'll select Feature or Web Experiment to design your experiment. 

## Feature Experiment use cases

Feature Experiment is most useful for Product experts, Data Engineering and Operations, and Data Analysts. These roles focus on deep knowledge of specific products or data repositories. Their goals are to:

* Launch new products
* Reduce risk
* Analyze and report on data
* Adhere to security and compliance requirements
* Monitor performance
* Ship code
* Run complex models

Feature experimentation uses feature flags to create the variants you want. Flags are switches that let you modify your product's experience without having to change code. Use them to set up experiments in your product or to stage and roll out new features to your users. Your code uses the [Amplitude Experiment SDK](/docs/sdks/experiment-sdks) or [APIs](/docs/apis/experiment) to communicate with Experiment. Typically, feature flags need a little more advanced knowledge of your code to successfully use them for experimentation. For more information on feature flags, go to [Feature Flags](/docs/feature-experiment/workflow/feature-flag-rollouts).

## Web Experiment use cases

Web Experiment is most useful for digital marketers and growth marketing. These roles focus on strategic changes to the existing functionality and design of your website. Their goals are to: 

* Optimize the website or the lifecycle of the product
* Drive adoption
* Personalization
* Test hypotheses
* Track key product insights (KPIs)
* Upsell or cross-sell products

Web experimentation uses a visual editor to create variations of your web site. With the visual editor, you can select directly alter content or element properties. Web experiment lets less technical users, or users with fewer permissions in your system, create experiments without engineering resources. Web experiments use pages to control where your experiments variants apply on your website. This lets you scope experiments to specific URLs without affecting unrelated parts of your site. For more information on how to create experiments with the web editor, go to [Setting up a Web Experiment](/docs/web-experiment/set-up-a-web-experiment).

For a full description of the functional differences between Feature and Web Experiment, go to [Feature and Web Experiment Functional Comparison](/docs/feature-experiment/feature-and-web-experiment-functional-comparison).

{{partial:admonition type="note" heading=""}}
The [Website Conversion Agent](/docs/amplitude-ai/website-conversion-agent) can help you identify high-impact pages and generate experiment strategies to increase conversion, whether you use Feature or Web Experiment.
{{/partial:admonition}}