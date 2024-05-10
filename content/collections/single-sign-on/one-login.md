---
id: 14b08e52-7066-47c7-8b58-afe8ca107555
blueprint: single-sign-on
title: 'Set up single sign-on (SSO) for Amplitude using OneLogin'
source: 'https://help.amplitude.com/hc/en-us/articles/360002583351-Set-up-single-sign-on-SSO-for-Amplitude-using-OneLogin'
this_article_will_help_you:
  - 'Set up single sign-on using OneLogin'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715363551
---
Amplitude provides a single sign-on integration with OneLogin for customers on Scholarship, Growth, or Enterprise plans.

## Before you begin

For some general information about SSO, see [this article on SSO in Amplitude](/admin/single-sign-on/sso).

In order to set up SSO, you must be an org admin for your Amplitude organization. You must also able to configure your organization in OneLogin.

## Set up SSO for Amplitude using OneLogin

To configure SSO for Amplitude using OneLogin, follow these setup steps:

1. In OneLogin, click *Add Apps* from the *Apps* drop-down menu.

![an_onelogin_1_add_app.png](/output/img/single-sign-on/an-onelogin-1-add-app-png.png)

2. Enter "Amplitude" in the search box. Select the SAML2.0 app from the list of results.

![an_onelogin_2_find_amp.png](/output/img/single-sign-on/an-onelogin-2-find-amp-png.png)

3. Enter a name for the app in the *Display Name* text box. Then click Save.

![an_onelogin_3_save.png](/output/img/single-sign-on/an-onelogin-3-save-png.png)

4. Open the *Configuration* tab of the new app. Then enter your Amplitude org ID and click *Save*.

![an_onelogin_4_org.png](/output/img/single-sign-on/an-onelogin-4-org-png.png)

You can find your org ID in Amplitude's SSO settings—it's at the end of the ACS URL.

![an_amp_sp_settings.png](/output/img/single-sign-on/an-amp-sp-settings-png.png)  
  
5. From the *More Actions* menu, click *SAML Metadata* to download the metadata file.

![an_onelogin_5_download_metadata.png](/output/img/single-sign-on/an-onelogin-5-download-metadata-png.png)

6. In Amplitude, navigate to *Settings > Access & SSO Settings*, then click *Upload Metadata File* to upload your SAML metadata file. Be sure to choose OneLogin as the *Identity Provider*.
7. Save your changes to enable SSO.