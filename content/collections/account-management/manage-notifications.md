---
title: "Manage user privacy notifications in Amplitude"
source: "https://help.amplitude.com/hc/en-us/articles/360031965572-Manage-user-privacy-notifications-in-Amplitude"
id: 1f4c1ebb-ff86-488d-9971-5f5295a00295
---

#### This article will help you:

* Set up email notifications for user data deletion requests

In order to comply with GDPR and other user privacy regulations, Amplitude will send emails when we receive and process user data deletion requests. You can control the kinds of emails each user receives by managing user privacy notifications.

This feature is **applied at the project level**, and admin privileges are required to use it. Admins can control the following notification types:

* **Job Creation**: confirmation email at the time of request
* **Job Completion**: confirmation email when the requests are completed
* **Unset Violation**: email sent when SDK unset is not done
* **All Notifications**: all of the above

There must be at least one recipient per notification.

### Feature availability

This feature is available to users on **all Amplitude plans**. See our [pricing page](https://amplitude.com/pricing) for more details.

## Enable user privacy notifications

To enable specific users to receive notifications:

1. 1. Ensure you are in the project you want to manage and navigate to ![gear_icon_for_settings.png](/output/img/account-management/gear-icon-for-settings-png.png) > *Organization settings* > *User Privacy Notifications.*
	2. In the table listing the team members currently set to receive notifications, change their notification types and frequencies by selecting from the appropriate drop-down menus.
	3. To add new team members to the notification list, enter their names or email addresses into the text box and click *Add Team Members*.
	4. Repeat this process for each project within your organization, as needed.

![manage_user_privacy_notifications.png](/output/img/account-management/manage-user-privacy-notifications-png.png)

For more information on our user privacy API, see our [User Privacy API Developer Documentation](https://www.docs.developers.amplitude.com/analytics/apis/user-privacy-api/).
