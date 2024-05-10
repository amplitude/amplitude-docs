---
id: 58c93fab-b1f4-4d12-8781-6287ae5f121e
blueprint: single-sign-on
title: 'Set up single sign-on (SSO) for Amplitude using G Suite'
source: 'https://help.amplitude.com/hc/en-us/articles/360002564052-Set-up-single-sign-on-SSO-for-Amplitude-using-G-Suite'
this_article_will_help_you:
  - 'Set up single sign-on using G Suite'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715363400
---
Amplitude provides a single sign-on integration with G Suite for customers on Scholarship, Growth, or Enterprise plans.

## Before you begin

For some general information about SSO, see [this article on SSO in Amplitude](/admin/single-sign-on/sso).

In order to set up SSO, you must be an org admin for your Amplitude organization. You must also be an administrator for your G Suite organization, and you must configure your own SSO settings, a requirement that is enforced when logging into your org.

## Set up SSO for Amplitude using G Suite

To configure SSO for Amplitude using G Suite, follow these steps:

1. In the G Suite [admin console,](https://admin.google.com/) navigate to *Apps* and click the *SAML apps* card.

![an_gsuite_1_apps.png](/output/img/single-sign-on/an-gsuite-1-apps-png.png)

2. Click the ***+*** button (in the bottom left corner) to add a SAML app.

![an_gsuite_2_add_app.png](/output/img/single-sign-on/an-gsuite-2-add-app-png.png)

3. In the modal, click *Setup my own custom app*.

![an_gsuite_3_custom_app.png](/output/img/single-sign-on/an-gsuite-3-custom-app-png.png)

4. Under Option 2, click *Download* to download the IDP metadata.

![an_gsuite_4_download_metadata.png](/output/img/single-sign-on/an-gsuite-4-download-metadata-png.png)

5. Upload the metadata file in Amplitude, under *Settings > Organizational settings > Access & SSO Settings*, then save the changes.

![SSO](/output/img/single-sign-on/sso.png)

6. Go back to G Suite and continue with the app creation process. Enter a name and description and optionally upload the logo for easy recognition.

![an_gsuite_6_name.png](/output/img/single-sign-on/an-gsuite-6-name-png.png)

7. Next, you will be prompted for the "ACS URL" and "Entity ID".  
  
![an_gsuite_7_sp_details.png](/output/img/single-sign-on/an-gsuite-7-sp-details-png.png)

You can find the Entity ID and Assertion Consumer Service URL in the Amplitude SSO settings; just navigate to *Settings > Organizational settings > Access & SSO Settings*:

![SSO](/output/img/single-sign-on/sso.png)

8. Finally, in Google Admin, click *Finish* to save the app and enable SSO.

![an_gsuite_8_attributes.png](/output/img/single-sign-on/an-gsuite-8-attributes-png.png)

{{partial:admonition type='note'}}
 You can review information regarding just-in-time (JIT) provisioning settings for G Suite administration [here](cloud.google.com/identity/solutions/automate-user-provisioning). There may be a short "settling period" when setting up and validating the configuration. If users are getting 403 errors, please wait a day and try JIT again. 
{{/partial:admonition}}