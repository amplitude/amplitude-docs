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
The Personalize with variables feature (also called interpolation) lets you dynamically display user properties to customize content within a guide or survey. Use this to customize content for each individual user, for example displaying their first name or `user_id`. You can add personalized variables to:

- Titles
- Content
- Button labels
- Button Action URLs

## Common examples

### Replacing parts of a URL
You can use user property variables in CTA links to personalize URLs. For example, you could create a link like:

```
www.example.com/path?user_id=@{{property.user_id}}&country=@{{property.country}}
```

When a user clicks on the CTA link, Amplitude replaces the user property variables with actual values:

```
www.example.com/path?user_id=12345&country=US
```

### Personalizing guides with a user's name
Create a user property to display the user's first name, like `firstName`. Then place this user property in any guide or survey where you want to address each of your users by name.

## Providing fallback values

Sometimes a user property isn't available for all users or all times. In that case, you can use fallback values as a safe default. For example, if you wanted to say "Hey there" instead of "Hey {firstName}" in case a user hasn't provided their name, you could use a fallback value like `{{property.firstName | there}}`.

![A guide modal built to include the user property property.fistName](statamic://asset::help_center_conversions::guides-surveys/personalize-with-variables.jpeg)


## User property requirements

User properties must be shared client-side during the session with either the Amplitude SDK or the Engagement SDK. Properties shared from prior sessions or properties only stored on the server aren't yet supported.

To set user properties, use the [`_setUserProperties`](/docs/guides-and-surveys/sdk#set-user-properties) method in the Engagement SDK, or use `amplitude.identify()` in the Amplitude SDK.

{{partial:admonition type="tip" heading=""}}
Amplitude autopopulates `user_id` and `device_id` for you. These variables are always available without additional setup.
{{/partial:admonition}}

{{partial:admonition type="tip" heading="User properties in conditional logic"}}
User properties can also power [conditional logic](/docs/guides-and-surveys/conditional-logic), enabling you to create different button actions or survey paths based on user characteristics. For example, direct premium users to different content than free users.
{{/partial:admonition}}

##### To include personalized variables into a guide or survey

1. Open an existing guide or survey or create a new one.
2. Click into the title, content block, button name, or any other piece of text.
The personalize variable icon appears on the right of the selected field.
3. Click the [user property](/docs/guides-and-surveys/sdk#set-user-properties) icon.
4. In the popup, enter the user property you want.
5. (*Optional*) Enter a fallback value for the user property.
6. Click **Insert**.
7. Repeat in every field where you want to include property variables.
