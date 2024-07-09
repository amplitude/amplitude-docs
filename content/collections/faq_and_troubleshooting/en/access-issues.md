---
id: 8c1b4e7b-5204-42e5-af57-77a82fff3eec
blueprint: faq_and_troubleshooting
title: 'Access issues'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/360059024552'
category: other
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1720538805
landing: true
---
In some cases, when customers try to access Amplitude or log in, they see this error page:

![Screen_Shot_2021-04-05_at_3.47.17_PM.png](/docs/output/img/faq/screen-shot-2021-04-05-at-3-47-17-pm-png.png)

Or if the customer is accessing Amplitude via SSO, they may come across a 500 or 403 error. 

This article covers some frequently asked questions log in issues.


{{partial:collapse name="What do I do if I'm having an issue logging in with a password?"}}
If you're experiencing an error while logging in with a password, here are several simple steps you can take to resolve it:

* Make sure the password you're using to log in is correct. Reset the password if you don't remember.
* See if you're experiencing the same behavior in another browser or incognito mode. If not, try clearing your browser's cookies and cache.
* Check that your browser version is up to date. If it isn't, update the browser and retry your login. You may need to restart your laptop after updating the browser to ensure the changes to the browser happen. Try to log in again after restarting.
* Make sure you are using a browser Amplitude is compatible with. You can see browser compatibility details [here](/docs/get-started/browser-compatibility).
* Running ad blockers (e.g. uBlock) or VPNs can cause Amplitude to behave in unexpected ways. If you're using any of these apps, try adding Amplitude to its allowed list.
* If you have forgotten your organization's URL, reach out to the Amplitude support team. They can let you know which organization is associated with your email address.
{{/partial:collapse}}

{{partial:collapse name="How do I fix a problem with logging in by SSO?"}}
A common SSO login error that you may come across is a 500 internal server error. Usually this means there is something wrong with your SAML certificate and as such, all of your users in your organization will be affected. Here are some troubleshooting steps for this error:

1. To resolve this 500 error issue, you will need access to your Amplitude platform. If you need to disable SSO login so you can resolve these errors, reach out to the Support team.
2. Check in with your IT team to see if the SAML certificate has expired. If it has, then uploading a new SAML certificate should resolve this issue.
3. Check that the format of the SAML certificate is correct. If it is incorrect, then have one of your Amplitude Admins upload a correctly formatted SAML to resolve this issue.

If you have configured SSO via Google Suite, another possible SSO login error that you might run into is the “403 Error: app\_not\_enabled\_for\_user” or “403 Error: app\_not\_configured\_for\_user”:

![](/docs/output/img/faq/pE-Cz24P1IMMLF4ThTaq27ZC3y8_m8aojhfOkeGHPWCM_D8FHnm_rLwCkeFKNRyFpJGn7Fb2skrAuID-PAUELNh0xldZUcVlbdTKLS9Im1yOg10yUtazvV-KlKAhPY6X03o10AHXsG_abK48y85BIgE)

If you see this page, refer to [Google Workspace Admin Help documentation](https://support.google.com/a/answer/6301076?hl=en) to find detailed instructions to resolve the login issue. 

If these tips don’t fix the problem, reach out to the Amplitude support team. Remember to include the browser you’re using, as well as its version, in your request.
{{/partial:collapse}}