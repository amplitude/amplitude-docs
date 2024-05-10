---
id: f31f1b7a-09ee-40fd-ba66-7128a4a05be0
blueprint: single-sign-on
title: 'Set up single sign-on (SSO) for Amplitude using Microsoft Azure Active Directory'
source: 'https://help.amplitude.com/hc/en-us/articles/360002581311-Set-up-single-sign-on-SSO-for-Amplitude-using-Microsoft-Azure-Active-Directory'
this_article_will_help_you:
  - 'Set up single sign-on using Microsoft Azure Active Directory'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715363416
---
Amplitude provides a single sign-on integration with Microsoft Azure Active Directory for customers on Scholarship, Growth, or Enterprise plans.

## Before you begin

For some general information about SSO, see [this article on SSO in Amplitude](/admin/single-sign-on/sso).

In order to set up SSO, you must be an org admin for your Amplitude organization. You must also able to configure Azure Active Directory for your organization in Microsoft Azure.

## Set up SSO for Amplitude using Microsoft Azure Active Directory

To configure SSO for Amplitude using Azure Active Directory, follow these steps:

1. From the Azure [portal,](https://portal.azure.com) navigate to the Azure Active Directory section.

![an_azure_1_aad.png](/output/img/single-sign-on/an-azure-1-aad-png.png)

2. Open the *Enterprise applications* sub-section.

![an_azure_2_enterprise_apps.png](/output/img/single-sign-on/an-azure-2-enterprise-apps-png.png)

3. Click *+ New application* to add a new application.

![an_azure_3_new_app.png](/output/img/single-sign-on/an-azure-3-new-app-png.png)

4. Search for Amplitude in the app gallery. From the results list, select Amplitude and click *Add* in the bottom-right of the app summary.

![an_azure_4_gallery.png](/output/img/single-sign-on/an-azure-4-gallery-png.png)

5. Click *Single sign-on* to open the SSO app settings. Then enter the identifier and the reply URL in the appropriate text fields.

![an_azure_6_settings.png](/output/img/single-sign-on/an-azure-6-settings-png.png)

These can be found under *Entity ID* and *Assertion Consumer Service URL*, respectively, in Amplitude's SSO settings.

![Screen](/output/img/single-sign-on/screen.png)  
  
6. In the *User identifier* field, select *user.mail* from the drop-down list.

![an_azure_7_user_identifier.png](/output/img/single-sign-on/an-azure-7-user-identifier-png.png)

7. Save the changes. Then click *Metadata XML* to download the metadata file.

![an_azure_8_download_metadata.png](/output/img/single-sign-on/an-azure-8-download-metadata-png.png)

8. In Amplitude, navigate to *Settings > Organization settings > Access & SSO Setting > Single Sign-On Settings* and upload the metadata file. Be sure to choose Microsoft Azure Active Directory as the *Identity Provider*.
9. Save your changes to enable SSO.