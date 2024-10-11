---
id: b8db5ecf-b7b0-432d-b1f3-19ae70d13291
blueprint: web_experiment
title: 'Set up a web experiment'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1728676886
---
Amplitude Experiment’s **web experiment** feature lets you create an A/B test or multi-armed bandit experiment **without new code**. Open your site in the [Visual Editor](#the-visual-editor), choose the elements you’d like to experiment with, and make changes to their content or properties directly. This allows for less-technical users to easily create experiments, and provides for a more intuitive process.

## Before you begin

Before setting up a web experiment, you must implement the web experiment script on your site. Learn more in our implementation documentation.

Keep in mind that creating a web experiment is a different process from creating a feature experiment, though there is overlap.

## Set up a web experiment

To set up a web experiment, follow these steps:

1. In Amplitude Experiment, navigate to *Experiments > Create Experiment > Web Experiment*.
2. In the *New Experiment* modal, give your experiment a name. Enter the URL for the page this experiment targets—Amplitude must be instrumented on that page—and select the appropriate project from the drop-down.

     You can also add a key, or specify the type of experiment—A/B test or multi-armed bandit.

3. If the script is present on the page you specified, Amplitude Experiment will open the page in the [Visual Editor](#the-visual-editor), as a new variant in your experiment.

     You have two options for creating this variant: editing page elements, or adding URL redirects. To set up a URL redirect experiment, [see below](#set-up-a-url-redirect-experiment). To build an experiment with the Visual Editor, continue to step 4.

![web-exp-1.png](/docs/output/img/workflow/web-exp-1.png)

{{partial:admonition type='note'}}
If the script isn’t present on the page you specified, Amplitude Experiment can’t open the Visual Editor, and will instead open the Site Setup panel and prompt you to implement the script.
{{/partial:admonition}}

4. To change text, colors, or other elements of the page’s UI, click *Element Changes*.
5. Click the element you want to change.
6. The element’s editing panel opens on the right-hand side. Edit the element’s display mode, visibility, text, background, color, or size here. Then click *Apply*.

![web-exp-2.png](/docs/output/img/workflow/web-exp-2.png)

7. Repeat this process for each element you want to change for your experiment.
8. If needed, click *+* to add another variant.
9. When you’re done, click *Continue*.
10. Next, [define your experiment’s goals](https://amplitude.com/docs/experiment/workflow/define-goals). 
11. In the *Pages* tab, add the URLs to include in this experiment. From the *Include pages where* dropdown, specify how you want Amplitude Experiment to identify these pages. [Learn more about page targeting in this article]()[Visual Editor](/docs/experiment/web/targeting).

     You can also opt to exclude specific pages from the experiment, by clicking on *+ Exclude Page*.

![web-exp-4.png](/docs/output/img/workflow/web-exp-4.png)

12. Next, target the users you want to include in this experiment. Audience targeting works differently for web experiments; [learn more here]([Visual Editor](/docs/experiment/web/targeting).
13. The *Advanced* tab provides several additional options for your experiment, [which you can read about in this article](https://amplitude.com/docs/experiment/workflow/finalize-statistical-preferences). Note that several of the options discussed in that article are not available for web experiments.
14. When you’re ready, click *Save and Close* to finish creating your web experiment.

### Set up a URL redirect experiment

Another type of web experiment doesn’t involve the use of the Visual Editor at all. Instead, it relies on URL redirects, to send your users to another URL in place of the one hosting the experiment. 

{{partial:admonition type='note'}}
Setting up a URL redirect precludes you from using the Visual Editor. Don’t use this option unless you specifically want to use URL redirects instead of the Visual Editor.
{{/partial:admonition}}

To redirect users bucketed into your experiment (and assigned to this variant) to another website, click *URL Redirect* and enter the URL you want to send your users to. This variant is now **locked**.

Return to step 10 in the procedure above to finish setting up your experiment.

## The Visual Editor

The Visual Editor takes the site located at the URL you specified in step 2 of the setup procedure above and loads a copy of it. Every element of your site is accessible within the Visual Editor, for you to modify in whatever ways best suit your experiment’s needs.

{{partial:admonition type='note'}}
When you’re making modifications to your site in the Visual Editor, your actual site remains as-is until you launch the experiment. Nothing you do here will appear on your site in real time.
{{/partial:admonition}}

When you click on an element, its editing panel opens. This is where you make changes to that element. These changes are then added to the variant.

![web-exp-5.png](/docs/output/img/workflow/web-exp-5.png)

At the top is the element’s **selector**. This is grayed out by default, but you can edit it if you need to. Be aware that doing so can deliver unpredictable results if you’re not careful, so change this only if you know what you’re doing.

Below that is the **display** setting. This specifies how the element displays on the page. Your options are `Block` or `None`. Next, you can change the **visibility** of the element. An element can be visible or hidden.

{{partial:admonition type='note'}}
Display and visibility may at first appear to be the same, but there is an important difference between them. Setting *Visibility* to `Hidden` hides the element from view, but the element remains in place; the space it takes up on the page doesn’t change. Setting *Display* to `None` removes the element from the page entirely.
{{/partial:admonition}}

The **text** field stores the element’s text, if any. Edit it directly in the field. You can also change the color and font size of the element’s text.

If you select an element **without** text, the field notes that the element contains inner HTML elements, and lets you edit that, if needed. Click *Edit Raw* to do so.

Finally, change the element’s **background** color, or replace the existing background with an image.

Click *Apply* to commit your changes to this variant.

You can always re-open the Visual Editor later, by clicking *Open Visual Editor* in the *Variants* tab.