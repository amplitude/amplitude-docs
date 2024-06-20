---
id: 15ebdb31-0f76-4270-8cb1-1bdb06334d72
blueprint: faq_and_troubleshooting
title: 'User Composition'
source: 'https://amplitude.zendesk.com/hc/en-us/articles/17382771805851'
---
This article covers some frequently asked questions about the [User Composition](/docs/analytics/charts/other-charts/other-charts-user-composition) chart.

I ran an Identify API call for a user. Why is this not reflected in the User Composition Chart?
Running an identify call will update the user property for events moving forward without sending an event. If an Identify call is sent, It will be reflected at the top of a user's profile, but will not appear in the User Composition chart results until another “active” event is sent after the Identify call.

I see the user property and value in the user profile. Why is it not showing in User Composition?
The property needs to be available in the most recent active event. If the user property was updated using the Identify API, the user profile will show the updated value but if the user has not performed an “active” event, the User Composition takes account of the user property in the most recent active event.

![](/docs/output/img/faq/GhDhd97e6KZ3skAhVUcolP1MnE2seCyjR3gtpEuyMGDM1vNLEaHde-WgqXIw2wlm9WRmR9kNGFC4hmqJQ5B89yrAbi_Ovys9pDCEj-lAqPv7ADXtWrk6M8IBC4XCVtyTH0_eIlkyeuEanjWrvb1Ub4M)

Why are we seeing a high volume of “none” values?
The property was not available at the time the most recent active event was performed. You can read more about why a user is counted under ‘(none)’ [here](https://help.amplitude.com/hc/en-us/articles/360016257391-FAQ-Why-is-this-user-counted-under-none-or-an-unexpected-value-#User-Properties). 

The account is showing the user property is not null. Why is it appearing null in User Composition in the last 30 days?
Accounts is a special case. There are many users that can be tied to an account and if all the users are performing active events, then the value of the user properties will be constantly changing.

Not all the values of the property are displayed on the chart. What could cause this?
The User Composition chart will display the top 100 user property values with the highest user count that are listed in the breakdown table. You can export the table as a .CSV file by clicking Export CSV in the Breakdown Table. The .CSV file has a limit of 10,000 rows; this means that you can get the top 10,000 user property values by user count with the CSV.
