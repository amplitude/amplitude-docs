---
id: f4d58059-2b59-48d5-9ec2-c43c99d2f40d
blueprint: single-sign-on
title: 'Set up single sign-on (SSO) for Amplitude using another service'
this_article_will_help_you:
  - 'Set up single sign-on when using a service not specifically listed in the Access & SSO Settings section'
landing: false
exclude_from_sitemap: false
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1727367735
---
You may want to set up single sign-on (SSO) using a custom-built SSO provider, or one not explicitly named in the Amplitude app. Amplitude is compatible with any SAML 2.0 compliant SSO provider, so as long as the one you want to use meets that description, you can do so.

## Before you begin

Read the introductory article on [single sign-on in Amplitude](docs/admin/single-sign-on/sso) to get a basic understanding of the basic requirements.

## Set up SSO for an unlisted ("Other") SSO provider

To set up SSO using a provider that isn't Auth0, G Suite, Microsoft Azure Active Directory, Okta, or OneLogin, click the gear icon in Amplitude and navigate to *Organization Settings > Access & SSO Settings*. Then, from the *Identity Provider* dropdown, select *Other*.

  ![sso-other-1.png](/docs/output/img/single-sign-on/sso_other_1.png)

Next, upload your **metadata file** and enter the **entity ID** and the **assertion consumer service URL** in the appropriate fields. The location of these resources differs from provider to provider, so be sure to have this information before you begin this process.

When you're done defining your settings, click *Save*.