---
id: a7fcd596-5113-4061-b1fc-4df208fbd744
blueprint: guides_and_survey
title: 'Personalize with Variables'
this_article_will_help_you:
  - 'Add personalization variables to guides and surveys'
landing: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1753224454
---
The Personalize with variables feature lets you customize content within your guides and surveys by dynamically displaying user properties. You can add user properties to most text blocks. 

Personalize with variables is only available for client-side user properties. All user properties included from the client-side during that session are available. For specifics on user properties, go to the [SDK](/docs/guides-and-surveys/sdk#set-user-properties) information on setting user properties.

For example, you could create a user property to display the user's first name such as `firstName`. You could then place this user property in any guide or survey where you want to address each of your users by name. 

The Personalize with variables feature also provides the option of a fallback value for a property. The fallback values are used whenever the user property isn't available for that specific user. In the above example, you could use the word "there" as a fallback value for `firstName`. If the first name of your user isn't available, your guide or survey may say "Hey there" instead of "Hey `firstName`." This fallback value prevents gaps in the messaging to your users. 

![A guide modal built to include the user property property.fistName](statamic://asset::help_center_conversions::guides-surveys/personalize-with-variables.jpeg)


##### To include personalized variables into a guide or survey

1. Open an existing guide or survey or create a new one.
2. Click into the title, content block, button name, or any other piece of text.
The personalize variable icon appears on the right of the selected field. 
3. Click the [user property](/docs/guides-and-surveys/sdk#set-user-properties) icon.
4. In the popup, enter the user property you want. 
5. (*Optional*) Enter a fallback value for the user property. 
6. Click **Insert**.
7. Repeat in every field where you want to include property variables.