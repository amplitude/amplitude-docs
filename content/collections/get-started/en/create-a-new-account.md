---
id: 0037796b-7b61-4125-bbc7-6d13c83e6e6a
blueprint: get-started
title: 'Create a new Account'
this_article_will_help_you:
  - 'Create a new Amplitude Account and Organization'
  - 'Configure the Amplitude snippet to include the features you want'
landing: false
exclude_from_sitemap: false
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1722979409
---
Amplitude's onboarding enables you to get data into your new organization as quickly as possible.

## The Amplitude snippet

Once you sign up and activate your account, Amplitude prompts you to connect your first application with a single snippet. Enable [Session Replay](/docs/session-replay) and [Autocapture](/docs/data/autocapture) to enable those features automatically.

{{partial:partials/code/snippet autocapture="true" session_replay="true"}}

Amplitude inserts your API key in the snippet as necessary. Paste the snippet in the `head` tag of each page you want to track user behavior, create a feature flag, or build a cohort.

This snippet installs and initializes the [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) and any extra features you enable.

After you install the snippet, browser your site to allow Amplitude to verify that data flows to your project. 

![](statamic://asset::help_center_conversions::get-started/data-flowing.png)

When Amplitude verifies that it can receive events, click **Next** to create your first chart, and optionally save it as a dashboard.



## Other ways to install

Amplitude supports other [integrations](/docs/data/source-catalog), [SDKs](/docs/sdks/analytics), and [API](docs/apis/analytics/http-v2) to help you start sending data.

For these methods, view the associated documentation for help getting started.

## Send sample data

Amplitude supports sending test data to get you started. Use any of the following methods:

- CSV Upload
- Chrome extention
- Web bookmarklet