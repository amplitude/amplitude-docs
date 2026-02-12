---
id: 0740104d-a145-47ed-bfdb-1882b4a81c2d
blueprint: web_experiment
title: 'URL redirect testing'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716914401
source: https://help.amplitude.com/hc/en-us/articles/26003807556635-Split-URL-testing
---
Marketers use A/B testing to create personalized experiences that resonate. By methodically testing the effectiveness of messaging, calls to action, and landing pages, marketers can generate real-world data to help them maximize conversions and create delightful user experiences. However, this often requires help from developers, who may not always be immediately available to assist.

With Amplitude's URL redirect testing feature, you can design, deploy, and analyze A/B tests that involve or require redirecting visitors to another URL, without extensive developer involvement. It's a fast and easy way to assess the effectiveness of redirects for achieving goals like increasing conversions or improving the user experience.

{{partial:admonition type="note" heading=""}}
The [Website Conversion Agent](/docs/amplitude-ai/website-conversion-agent) can analyze your pages, propose conversion optimization strategies, and create draft experiments for you automatically.
{{/partial:admonition}}

URL redirect testing works well if you're building different versions of your page or site on a CMS like WordPress. In these cases, your different URLs and their associated pages are the variants that Amplitude Experiment tracks.

You can use URL redirect testing with both standard A/B tests and [multi-armed bandits](/docs/feature-experiment/workflow/multi-armed-bandit-experiments).

To use URL redirect testing, you must [implement](/docs/web-experiment/implementation) the Web Experiment script on your site. Add the script to the `<head>` section of your site. Install the Amplitude Analytics SDK on your site for event tracking.

## Set up URL redirect testing

To set up a URL redirect test:

1. In Amplitude Experiment, navigate to the Experiments page and click **Create Experiment** and then click **Web**.
2. In the New Experiment modal, name your experiment.
3. Enter the URL of a page this experiment targets and select the appropriate project from the drop-down. This URL is used to create your first [Page](/docs/web-experiment/pages). Web Experiment must be instrumented on this URL for the experiment to work.

    If the script is present on the page you specified, Experiment opens the page in the [Visual Editor](/docs/web-experiment/set-up-a-web-experiment#the-visual-editor) as a new variant in your experiment.

4. Click the Treatment **three-dot** menu item and, select **Edit** and then, under Action, select **URL Redirect**.
5. In the URL Redirect panel, add each URL you want to test as a separate variant and click **Apply**.
6. Click **Apply and Exit** to leave the editing view.
7. Configure which [Pages](/docs/web-experiment/pages) your experiment should target. You can create new Pages or reuse existing saved Pages.
8. Target the users you want to include in this experiment. Go to [audience targeting](/docs/web-experiment/targeting#audience-targeting) for more information. Note that Web Experiment audience targeting works differently than Feature Experimentation.
9. Define your experiment's [Metrics](/docs/feature-experiment/workflow/define-goals).
10. Specify any [additional options](/docs/feature-experiment/workflow/finalize-statistical-preferences) in the Advanced tab.
11. Click **Save and Close** to finish creating your Web Experiment.

## Preview and test

Before running your web experiment, test and preview each variant.

To test your web experiment:

1. Click **Test & Preview**. This puts your experiment in test instrumentation mode, but it doesn't begin the experiment. Only users who open the page with the preview link experience your changes.
2. In the modal, click **Preview** to open a new tab that applies the changes you made for that variant.
3. Click the chain link icon to copy the URL to share it with others.

Test each variant at least one time, testing on more than one page if your experiment targets multiple pages.

If your changes aren't visible, you may need to wait up to 60 seconds for caches to refresh. If the changes don't appear correctly after that time, check your configuration for possible issues.

{{partial:admonition type="warning" heading="Ad blockers"}}
Ad blocking plugins or extensions may prevent you from testing and previewing your experiment.
{{/partial:admonition}}

## Configuration limits

Visual experimentation and Amplitude's low-code implementation apply the following limits on experiment configuration:

* **Evaluation mode**: Limited to *local* to optimize test performance and minimize latency impact to end-users.
* **Bucketing Unit**: Limited to *User* since evaluation mode is limited to *local*.
* **Keys**: Limited to *deviceID* since evaluation mode is limited to *local*.
* **Audience**: Limited to *all users*, since redirect logic triggers before tracking loads on the site.
* **Deployment**: Limited to the project API key to simplify setup requirements.

## Learn more

For more information about URL redirects in Web Experiment, see [Web Experiment actions](/docs/web-experiment/actions#url-redirect).
