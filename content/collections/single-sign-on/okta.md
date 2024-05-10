---
id: 36a39ebd-8189-4116-8c8b-894d1c493608
blueprint: single-sign-on
title: 'Set up single sign-on (SSO) for Amplitude using Okta'
source: 'https://help.amplitude.com/hc/en-us/articles/360002583131-Set-up-single-sign-on-SSO-for-Amplitude-using-Okta'
this_article_will_help_you:
  - 'Set up single sign-on using Okta'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1715363492
---
Amplitude provides a single sign-on integration with Okta for customers on Scholarship, Growth, or Enterprise plans.

## Before you begin

For some general information about SSO, see [this article on SSO in Amplitude](/admin/single-sign-on/sso).

In order to set up SSO, you must be an org admin for your Amplitude organization. You must also be able to configure your organization in Okta.

## Set up SSO for Amplitude using Okta

To configure SSO for Amplitude using Okta, follow these steps:

1. In Okta, navigate to the admin dashboard and click *Applications*.
2. On the *Applications* page, click *Create App Integration*.

![image4.png](/output/img/single-sign-on/image4-png.png)

3. In the modal that appears, select the *SAML 2.0* radio button and click *Next*.  

![image1.png](/output/img/single-sign-on/image1-png.png)

4. Enter a name for the app. For easier recognition, you can also upload a logo to go with it. Then click *Next*.  

![image6.png](/output/img/single-sign-on/image6-png.png)

5. Next, you'll configure your SAML settings. Enter the single sign-on URL (ACS URL) and the audience URL (Entity ID) in the appropriate spaces. Then, from the *Application username* dropdown, select *Email*.

![image5.png](/output/img/single-sign-on/image5-png.png)

You can find the Entity ID and Assertion Consumer Service URL in Amplitude, under *Settings > Organization settings > Access & SSO Settings > Single Sign-On settings*.

![SSO](/output/img/single-sign-on/sso.png)

6. Once the app is created, view the identity provider (**IdP**) metadata (found on the *Sign On* tab in Okta).  
  
![image3.png](/output/img/single-sign-on/image3-png.png)  
  
![image9.png](/output/img/single-sign-on/image9-png.png)

7. Click the metadata to display the XML. Save this as an .xml file (Many browsers allow saving the active page as a file and can use the .xml suffix).  
  
![image2.png](/output/img/single-sign-on/image2-png.png)

8. In Amplitude, navigate to *Settings > Organization settings > Access & SSO Setting > Single Sign-On Settings* and upload the metadata file.
9. Save your changes to enable SSO.