---
id: 0037796b-7b61-4125-bbc7-6d13c83e6e6a
blueprint: get-started
title: 'Create a new account'
this_article_will_help_you:
  - 'Create a new Amplitude account and organization'
  - 'Configure the Amplitude snippet to include the features you want'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1724879558
---
Amplitude's onboarding helps you to get data into your new organization as quickly as possible.

## Create your org

Get started with Amplitude for free. To create a new account:

1. Go to [amplitude.com/get-started](https://amplitude.com/get-started).
2. Sign in with Google or enter your work email address.
3. Verify your email address. You'll receive an email from Amplitude asking you to verify your email. Click the link in the email to set a password and finish creating your account.
4. Choose your data storage location (see below).

### Data storage location

When you sign up, you can choose the region which hosts your data, either United States or European Union. Amplitude is compliant with the [EU-US Data Privacy Framework](https://ec.europa.eu/commission/presscorner/detail/en/qanda_23_3752).

{{partial:admonition type="note" heading=""}}
This setting impacts the way in which your organization sends data to Amplitude, and where Amplitude stores that data. You can't change this setting after you create your org.
{{/partial:admonition}}

## The Amplitude snippet

After you sign up and activate your account, Amplitude prompts you to connect your first application with a single snippet. Enable [Session Replay](/docs/session-replay) and [Autocapture](/docs/data/autocapture) to enable those features automatically.

{{partial:partials/code/snippet autocapture="true" session_replay="true" unified="true"}}

{{partial:admonition type="note" heading="Session Replay sample rate"}}
When you add Session Replay to the snippet, Amplitude sets the Sample Rate to `1`. This ensures you can verify the implementation during testing. In production, Amplitude recommends you set this value lower to account for your monthly quota. For more information, review [Session Replay Plugin | Sampling rate](/docs/session-replay/session-replay-plugin#sampling-rate)
{{/partial:admonition}}

Amplitude inserts your API key in the snippet as necessary. Paste the snippet in the `head` tag of each page you want to track user behavior, create a feature flag, or build a cohort.

This snippet installs and initializes the [Browser SDK](/docs/sdks/analytics/browser/browser-sdk-2) and any extra features you enable.

After you install the snippet, browser your site to allow Amplitude to verify that data flows to your project. 

![](statamic://asset::help_center_conversions::get-started/data-flowing.png)

When Amplitude verifies that it can receive events, click *Next* to create your first chart, and optionally save it as a dashboard.

## Other ways to install

Amplitude supports other [integrations](/docs/data/source-catalog), [SDKs](/docs/sdks/analytics), and [API](/docs/apis/analytics/http-v2) to help you start sending data.

For these methods, view the associated documentation for help getting started.

## Send sample data

Amplitude supports sending test data to get you started. Use any of the following methods:

- CSV Upload
- Chrome extention
- Web bookmarklet