---
id: 668eb44f-64ea-41e0-b244-5fb7b336c262
blueprint: single-sign-on
title: 'Single sign-on (SSO) in Amplitude'
source: 'https://help.amplitude.com/hc/en-us/articles/360002534392-Single-sign-on-SSO-in-Amplitude'
this_article_will_help_you:
  - 'Understand the basics of using single sign-on in Amplitude'
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1717697644
landing: true
landing_blurb: "Integrate Amplitude with your business's SSO service."
exclude_from_sitemap: false
---
**Single sign-on** (SSO) is an authentication scheme that enables users to use a single ID and password combination to log into multiple platforms, services, or systems. Amplitude supports SSO and is compatible with any SAML 2.0-compliant SSO provider, including:

* [Auth0](/docs/admin/single-sign-on/auth-0)
* [G Suite](/docs/admin/single-sign-on/g-suite)
* [Microsoft Azure Active Directory](/docs/admin/single-sign-on/azure-active-directory)
* [Okta](/docs/admin/single-sign-on/okta)
* [OneLogin](/docs/admin/single-sign-on/one-login)

Just click through to see more detailed information on setting up and configuring SSO with each of these services.

### Feature availability

This feature is available to users on **Growth** and **Enterprise plans** only. See our [pricing page](https://amplitude.com/pricing) for more details.

## SSO Basics

Some things you should be aware of:

* You can **require** members of your organization to sign in with SSO. Doing so will prevent users from signing in with their email and password, so make sure your SSO system is working and configured properly before turning it on in Amplitude.
* You can also **automatically** grant new users access to your organization via just-in-time provisioning. Amplitude only requires a new user to successfully authenticate with your identity provider; once authentication is received, Amplitude will add the user to your organization. You can then configure roles for each new user to reflect their needs, and those of the organization.  
  
Enterprise customers with access to project [permissions](/docs/admin/account-management/user-roles-permissions) can also choose the default project(s) that JIT-provisioned users will have access to.

* When a user attempts to use SSO to sign in, Amplitude uses their email address in the SAML assertion to identify them. Amplitude will attempt to find the user's email by looking in these places, in this order:

1. The assertion subject
2. An email claim attribute (`http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress`)
3. An "emailaddress" attribute (case insensitive)
4. An "email" attribute (case insensitive)

If a valid email address cannot be found, the user will not be able to log into Amplitude.