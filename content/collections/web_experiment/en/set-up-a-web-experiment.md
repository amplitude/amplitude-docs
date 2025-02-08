---
id: b8db5ecf-b7b0-432d-b1f3-19ae70d13291
blueprint: web_experiment
title: 'Set up a web experiment'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1729195945
this_article_will_help_you:
  - 'Understand the difference between a Web Experiment and a feature experiment'
  - 'Build a Web Experiment using the Visual Editor'
---
Amplitude **Web Experiment** lets you create an A/B or [multi-armed bandit experiment](/docs/feature-experiment/workflow/multi-armed-bandit-experiments) **without new code**. Open your site in the [Visual Editor](#the-visual-editor), choose the elements you’d like to experiment with, and make changes to their content or properties directly. This allows for less-technical users to easily create experiments without engineering resources.

{{partial:admonition type='note'}}
See [Amplitude's pricing page](https://amplitude.com/pricing) to find out if this feature is available on your Amplitude plan.
{{/partial:admonition}}

## Before you begin

Before setting up a web experiment, you **must** [implement](/docs/web-experiment/implementation) the Web Experiment script on your site.

Keep in mind that creating and running a web experiment is different than in feature experiment, though there is some overlap.

## Set up a web experiment

To set up a web experiment, follow these steps:

1. In Amplitude Experiment, navigate to *Experiments > Create Experiment > Web Experiment*.
2. In the *New Experiment* modal, give your experiment a name. Enter the URL of a page this experiment targets—Amplitude must be instrumented on that page—and select the appropriate project from the drop-down.
3. If the script is present on the page you specified, Amplitude Experiment opens the page in the [Visual Editor](#the-visual-editor), as a new variant in your experiment.

    You have two options for the treatment variant action: [element changes](/docs/web-experiment/actions#element-changes) or [URL redirect](/docs/web-experiment/actions#url-redirect).

    ![web-exp-1.png](/docs/output/img/workflow/web-exp-1.png)

    {{partial:admonition type='warning'}}
    If the script isn’t present on the page you specify, or if you have an ad blocker or other privacy extension enabled, Amplitude Experiment can’t open the Visual Editor, and opens the Site Setup panel and prompt you to [implement](/docs/web-experiment/implementation) the script.
    {{/partial:admonition}}

4. To change text, colors, or other elements of the page’s UI, click *Element Changes*.
5. Click the element you want to change.
6. The element’s editing panel opens on the right-hand side. Edit the element’s display mode, visibility, text, background, color, or size here. Then click *Apply*.

    ![web-exp-2.png](/docs/output/img/workflow/web-exp-2.png)

7. Repeat this process for each element you want to change for your experiment.
8. If needed, click *+* to add another variant.
9. When you’re done, click *Continue*.
10. Next, [define your experiment’s goals](https://amplitude.com/docs/feature-experiment/workflow/define-goals).
11. In the *Pages* tab, edit the rules to [target additional pages](/docs/web-experiment/targeting#page-targeting) for this experiment. If you're only targeting the page you originally set on creation, you can skip this step. From the *Include pages where* dropdown, specify how you want Amplitude Experiment to identify these pages.

    ![web-exp-4.png](/docs/output/img/workflow/web-exp-4.png)

    Use the same pattern to exclude experiment from the pages you select. 

12. Next, target the users you want to include in this experiment. If you're familiar with feature experiment targeting, Web Experiment [audience targeting](/docs/web-experiment/targeting#audience-targeting) works differently.
13. The *Advanced* tab provides several [additional options](/docs/feature-experiment/workflow/finalize-statistical-preferences) for your experiment.
14. When you’re ready, click *Save and Close* to finish creating your Web Experiment.

## Test and preview your web experiment

Before running your web experiment, Amplitude recommends that you test and preview each variant. Once you're ready:

1. Click *Test & Preview*. This puts your experiment in test instrumentation mode, but it **doesn't** start your experiment. Only users who open the page with the preview link can see your changes.
2. In the modal, select the variant you want to preview (usually the treatment) and select *Test in new window*.

A new tab opens with the changes you made to the page applied.

Test each variant at least once, and testing on more than one page if your experiment targets multiple pages.

If you don't see your changes, **you may need to wait up to 60 seconds** for caches to refresh. If the changes don't appear correctly after that time, there might be something wrong with the configuration.

{{partial:admonition type="warning" heading="Ad blockers"}}
Ad blocking plugins or extensions may prevent you from testing and previewing your experiment. 
{{/partial:admonition}}

## The Visual Editor

The Visual Editor loads the site located at the URL specified on experiment creation and loads an overlay on top of it. Every element of your site is accessible within the Visual Editor, for you to modify in whatever ways best suit your experiment’s needs.

{{partial:admonition type='note'}}
When you’re making modifications to your site in the Visual Editor, your actual site remains as-is until you launch the experiment. Nothing you do here appears on your site in real time.
{{/partial:admonition}}

When you click on an element, its editing panel opens. This is where you make changes to that element. On apply, these changes are then added to the current variant.

![web-exp-5.png](/docs/output/img/workflow/web-exp-5.png)

At the top is the element’s **selector**. The selector is a unique identifier for the selected element on the current page. This is grayed out by default, but you can edit it if you need to. You may need to update the selector if you're running the experiment on multiple pages, as the selector that's generated by default is only unique for the current page. Alternatively, you could edit the selector to select and edit multiple elements.

Below the selector are the **display** and **visibility** settings. These specify how the element displays on the page. Setting *Visibility* to `Hidden` hides the element from view, but the element remains in place; the space it takes up on the page doesn’t change. Setting *Display* to `None` effectively removes the element from the page entirely.

The **text** field stores the element’s text, if any. Edit it directly in the field. You can also change the color and font size of the element’s text. You may use inline HTML tags in the text area to style plain text.

If you select an element **without** text, the field notes that the element contains inner HTML elements, and lets you edit that, if needed. Click *Edit Raw* to do so.

Finally, change the element’s **background** color, or replace the existing background with an image.

Click *Apply* to commit your changes to this variant.

You can always re-open the Visual Editor later, by clicking *Open Visual Editor* in the *Variants* tab.

### Navigation mode

Navigation Mode enables you to navigate between pages in your experiment without exiting the editor. 

It’s particularly useful for:

* Experiments spanning multiple pages, such as multi-step forms, checkout flows, or onboarding sequences.

* Editing variants across multiple pages within the same experiment.

To enter Navigation mode:

1. Open your experiment and access the visual editor as usual.
2. In the toolbar, click *Navigate*. Find it next to the pencil icon.
3. Navigate your site.
   * When you click an element on the page, it responds as it would normally. It performs its intended function, rather than selecting it as part of the experiment.
   * If you navigate to a page not included in your experiment and attempt to make edits, the Visual Editor automatically updates the page targeting rule to include the page URL and displays a message to let you know.
4. When you land on the page you went to edit, click the pencil icon to toggle the Visual Editor back to *Edit mode*.
5. Toggle between Edit and Navigation mode as needed to complete your experiment's configuration.