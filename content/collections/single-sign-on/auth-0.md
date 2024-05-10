---
id: d327dfe0-9231-4954-8024-b3a171111ae5
blueprint: single-sign-on
title: 'Set up single sign-on (SSO) for Amplitude using Auth0'
source: 'https://help.amplitude.com/hc/en-us/articles/360002548591-Set-up-single-sign-on-SSO-for-Amplitude-using-Auth0'
this_article_will_help_you:
  - 'Set up single-sign on using Auth0'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715363264
---
Amplitude provides a single sign-on integration with Auth0 for customers on Scholarship, Growth, or Enterprise plans.

## Before you begin

For some general information about SSO, see [this article on SSO in Amplitude](/admin/single-sign-on/sso).

In order to set up SSO, you must be an org admin for your Amplitude organization. You must also have the permissions to configure Auth0 for your organization.

## Set up SSO for Amplitude using Auth0

To configure SSO for Amplitude using Auth0, follow these steps:

1. In Auth0, navigate to the *[Clients](https://manage.auth0.com/#/clients)* page.
2. Click *+ Create Client* to create a new client for Amplitude. Don't worry about specifying the client type; Amplitude will only be communicating with Auth0 via SAML.

![an_auth0_1_clients.png](/output/img/single-sign-on/an-auth0-1-clients-png.png)

3. Navigate to the *Addons* tab and switch the SAML2 plugin toggle to "enabled."

![an_auth0_2_addons.png](/output/img/single-sign-on/an-auth0-2-addons-png.png)

4. Enter the Application Callback URL in the appropriate field in the modal that appears. 

![an_auth0_3_saml2.png](/output/img/single-sign-on/an-auth0-3-saml2-png.png)

5. You can find the entity ID and Assertion Consumer Service URL in the Amplitude SSO settings. Just open Amplitude and navigate to *Settings > Organizational settings > Access & SSO Settings.*

![SSO](/output/img/single-sign-on/sso.png)

6. After entering the URL and saving the SAML2 settings, open the *Usage* tab and download the  identity provider certificate metadata file.
7. Upload the metadata file in Amplitude, under *Settings > Organizational settings > Access & SSO Settings**.*

![SSO](/output/img/single-sign-on/sso.png)

8. Save your changes to enable SSO.