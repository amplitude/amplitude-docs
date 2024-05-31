---
id: ba7cc6cb-a012-4124-8d8b-87f1ad793a04
blueprint: data-table
title: 'Create a metric'
source: 'https://help.amplitude.com/hc/en-us/articles/10249480038043-Create-a-metric'
this_article_will_help_you:
  - 'Create a reusable unit of measurement in Amplitude'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717103323
landing: true
landing_blurb: 'Create a reusable unit of measurement in Amplitude'
---
Metrics allow users to define and save reusable analysis objects in Amplitude. They accelerate workflows and increase confidence for end users when building analyses. Metrics are shared **project-wide**, and can be created by any member, project manager, or admin. However, only project managers and admins can designate a metric as official.

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only. See our [pricing page](https://amplitude.com/pricing) for more details.

## Create and configure a new metric

To create and configure a metric for use in your Event Segmentation charts or your Data Tables, follow these steps:

1. Navigate to where you'd add an event to your analysis. Then open the *Metrics* tab and click*+ Define new Metric*.  
![create a metric 1.png](/output/img/data-tables/create-a-metric-1-png.png)
2. In the modal that opens, specify the metric type you’d like to create. Event Segmentation, Revenue, and Formula metrics are available for both chart types. An additional metric type, Funnels, is available for use in Data Tables.   
![image2.png](/output/img/data-tables/image2-png.png)  
{{partial:admonition type='note'}}
See our Help Center article on [creating a custom formula in Amplitude Analytics](/analytics/charts/event-segmentation/event-segmentation-custom-formulas) to learn more about how custom formulas work.
{{/partial:admonition}}
3. Add your desired event and property selections.
4. Give the metric a unique name. You can also add a description to explain the metric to others on your team, as well as verify (or “officiate”) the metric if you desire.

{{partial:admonition type='note'}}
Only project managers and admins can verify metrics.
{{/partial:admonition}}

5. Click *Save* when you’re finished creating the metric to add it to your analysis.

Once added, you can **edit** or **remove** the metric from your analysis. To do so for a Data Table, click **More Options ** in the metric header. For an Event Segmentation chart, click *View Metric* in the flyout panel to edit your metric. You can remove a metric from an Event Segmentation chart the same way you would a normal event.

To **delete** the metric from the project, click *Edit metric*, followed by *Delete*, within the metric drawer. Only project managers and admins can delete metrics they do not own.

For **event total** metrics in Data Tables, click on the settings gear next to the datepicker to toggle between absolute numbers, relative percentage of total, or both visualization options.

![image3.png](/output/img/data-tables/image3-png.png)