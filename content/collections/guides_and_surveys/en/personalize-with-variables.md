---
id: a7fcd596-5113-4061-b1fc-4df208fbd744
blueprint: guides_and_survey
title: 'Personalize with Variables'
this_article_will_help_you:
  - 'Add personalization variables to guides and services'
landing: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753224454
---
The Personalize with variables function lets you customize content within your guides and surveys by dynamically displaying user properties. You can add user properties to most text blocks. 

Personalize with variables is only available for client-side user properties. All user properties that have been provided client-side during that session are available. For specifics on user properties and how they are included in this feature, go to [SDK](/docs/guides-and-surveys/sdk#set-user-properties).

For example, you could create a user property to display the user's first name such as `firstName`. You could then place this user property in any guide or survey where you want to address each of your users by name. 

![A guide modal built to include the user property property.fistName](statamic://asset::help_center_conversions::guides-surveys/personalize-with-variables.jpeg)

##### To include personalized variables into a guide or survey

1. Open an existing guide or survey or create a new one.
2. Click into the title, content block, button name, or any other piece of text.
The personalize variable icon appears on the right of the selected field. 
3. Click the /docs/guides-and-surveys/sdk#set-user-properties icon.
4. In the popup, enter the user property you want. 
5. (*Optional*) Enter a fallback value for the user property. 
For example, a fallback value for a user property for geographic-specific support sites could be your main company website.
6. Click **Insert**.
7. Repeat in every field where you want to include property variables.