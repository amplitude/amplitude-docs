---
id: 0740104d-a145-47ed-bfdb-1882b4a81c2d
blueprint: advanced-technique
title: 'Split URL testing'
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1716914401
source: https://help.amplitude.com/hc/en-us/articles/26003807556635-Split-URL-testing
---
Marketers use A/B testing to create personalized experiences that resonate. By methodically testing the effectiveness of messaging, calls to action, and landing pages, marketers can generate real-world data to help them maximize conversions and create delightful user experiences. But this often requires help from developers, who may not always be immediately available to assist.

With Amplitude’s split URL testing feature, you can design, deploy, and analyze A/B tests that involve or require redirecting visitors to another URL, without extensive developer involvement. It’s a fast and easy way to assess the effectiveness of redirects for achieving goals like increasing conversions or improving the user experience.

Split URL testing works well if you’re building different versions of your page or site on a CMS like Wordpress. In these cases, your different URLs and their associated pages are the variants that Amplitude Experiment tracks.

You can use split URL testing with both standard A/B tests and multi-armed bandits.

To use split URL testing, you’ll have to add a script tag for Amplitude’s Experiment SDK to the site you want to test, in the `<head>` section. Install the Amplitude Analytics SDK on your site for event tracking.

## Set up split URL testing

To set up a URL redirect test:

1. In Amplitude, navigate to *Create > Experiment > Use a URL Redirect*.
2. In the *Variants* panel, add each URL you want to test as a separate variant.
3. In the *Analysis Settings* panel, copy the code snippet and paste it between the `<head>` and `</head>` tags of your site. Also, make sure your site has the latest Amplitude Analytics SDK installed.
4. For the rest of the setup process, follow the relevant [Experiment](/docs/experiment) documentation.

## Preview and test

As with feature-level experimentation (using flags), you can test the behavior of the redirect before you deploy it. The preview is available after you attach URLs to all your variants.

When you preview and test, you can specify the variant you want to verify for redirect behavior.

## Configuration limits

Visual experimentation and Amplitude's low-code implementation imposes the following limits on experiment configuration:

* **Evaluation mode**: Limited to *local* to optimize test performance and minimize latency impact to end-users.
* **Bucketing Unit**: Limited to *User* since evaluation mode is limited to *local*.
* **Keys**: Limited to *deviceID* since evaluation mode is limited to *local*.
* **Audience**: Limited to *all users*, since redirect logic triggers before tracking loads on the site.
* **Deployment**: Limited to the project API key to simplify setup requirements.