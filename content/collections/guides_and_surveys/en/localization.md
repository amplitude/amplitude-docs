---
id: 185ee92c-69ab-465b-84f1-35d4da01c2d7
blueprint: guides_and_survey
title: Localization
landing: false
---

Localization enables you to serve guides and surveys in different languages without creating a new guide or survey for each language. Supported languages are available on a project basis.

To create localized versions of your guides and surveys, you must:
- Update the SDK to record the user's locale.
- Update your project settings to specify which languages you want.
- Specify how you want your supported languages to behave.
- Create the translated versions of your guides and surveys.

Guides and Surveys localization is available on all accounts with access to Guides and Surveys that are on Growth or Enterprise plans. For more information, go to [Pricing page](https://amplitude.com/pricing).

## Updating the Guides and Surveys SDK

Update the SDK to record each user's locale during the Guides and Surveys [SDK initialization](/docs/guides-and-surveys/sdk). With accurate information of your user's locale, the SDK serves up the correct translation of your guide or survey to your user.

Make the following change in your SDK:

{{partial:tabs tabs="Amplitude SDK, Third-party analytics"}}
{{partial:tab name="Amplitude SDK"}}
```js
const currentLocale = getLocale() // "en" or "en-US"

amplitude.add(window.engagement.plugin({locale: currentLocale}))
```
{{/partial:tab}}
{{partial:tab name="Third-party analytics"}}
```js
// replace with desired function
const currentLocale = navigator.language // for example: "en-US"

engagement.init(apiKey,  { locale: currentLocale }) // for use with third-party Analytics SDKs
```
{{/partial:tab}}
{{/partial:tabs}}

{{partial:admonition type="note" heading="Locale code"}}
Amplitude considers the language of a locale code for certain languages. Go to the section below for more details.
{{/partial:admonition}}

## Update project settings to support multiple languages

Navigate to *Project Settings > Guides and Surveys*.

From here, you can specify the localization settings for Guides and Surveys.

On this tab, you can:

- Enable or disable localization
- View the default language
- Define the languages available for your guides and surveys
- Set the behavior or fallback when a translation file for an individual guide or survey is unavailable or out of date.

Guides & Surveys supports [ISO 639](https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes) language codes, and the following locales:

* English: `en-US`, `en-GB`, `en-AU`, `en-CA`, `en-IN`
* Spanish: `es-ES`, `es-MX`, `es-AR`, `es-CO`
* French: `fr-FR`, `fr-CA`
* Portuguese: `pt-BR`, `pt-PT`
* Chinese: `zh-CN (Simplified)`, `zh-TW (Traditional)`, `zh-HK (Hong Kong, Traditional)`
* German: `de-DE`, `de-AT`, `de-CH`
* Arabic: `ar-SA`, `ar-EG`, `ar-MA`

{{partial:admonition type="note" heading=""}}
English is the default language for all projects. This default setting can only be changed by Amplitude Support staff. To update your default language, contact [Amplitude Support](https://gethelp.amplitude.com)
{{/partial:admonition}}

##### To add a supported language

1. In the Supported languages section, click **Add language**.
2. In the menu, search for or scroll to select the languages you want.
You can select as many as you want.
3. Click **Apply**.

### Specifying fallback behavior

Fallback behavior is what happens if, for some reason, the localized content isn't available. You can specify the following types of fallback behavior:

- **When translation is unavailable**: If a translation for a specific guide or survey hasn't been uploaded, you can specify if you want the content to appear in the default language or if you don't want the content to appear at all.
- **When translation is outdated**: If the default content is updated, but that update isn't reflected in the translated content, you can specify if you want the content to appear in the default language, the outdated version of the content should appear, or if you don't want the content to appear at all.

## Adding localized content to a guide or survey

You can add localized versions to existing guides or surveys or you can include localized content as you create new guides and surveys.

##### To add localized content to a guide or survey

1. Open the guide or survey you want or click the **Create Guide** or **Create Survey** button.
2. In existing guides or surveys, click **Setup**.
3. In new guides or surveys, create and save the default content and then click **Setup**.
4. Scroll to the Localization section.

### Translatable strings

You can localize the following parts of guides and surveys:
{{partial:collapse name="Click for more information..."}}
* Guide step title
* Guide step description
* Survey step title
* Survey step description
* Checklist title
* Checklist description
* Button text (primary and secondary)
* Checklist done button label
* Snooze label
* Survey text prompt
* Survey rating lower label
* Survey rating upper label
* Survey list required message
* Survey list "other" option label
* Survey list "other" option placeholder
* Survey list input options
* Video URL
{{/partial:collapse}}

### Translating content

There are a number of ways to add localized content to your guide or survey:

- Use the web interface to add or edit translations. Amplitude recommends this method.
- Use AI localization to automatically translate your content. Amplitude recommends this method for quick, automated translations.
- Use the .xliff file to add or edit translations. Amplitude recommends this method if you integrate with a custom translation workflow.
- Use the [localization API](/docs/apis/guides-and-surveys/guides-and-surveys-api-localization) to add or edit translations. Amplitude recommends this method for automated translation workflows. While it takes more time to set up than the others, it can be worth it for larger teams or teams that support many languages.

{{partial:tabs tabs="Web interface, AI localization, XLIFF file upload"}}
{{partial:tab name="Web interface"}}
The web interface is the most direct method of adding localized content to a guide or survey. The web interface is the preferred way of adding localized content to a guide or survey because it offers a direct relationship to each text string.

1. Click the **Build** tab of your guide or survey.
2. In the upper-right of the screen, click the language toggle.
By default, this is **English**.
3. Select the language you want.
4. Update the individual strings with your translated content.
All content is automatically associated with the language displayed in the language toggle.

{{/partial:tab}}
{{partial:tab name="AI localization"}}
AI localization automatically translates your guide or survey content using [Claude](https://claude.ai/login?returnTo=%2F%3F). Amplitude takes the strings from the default language and attempts to:

- Maintain the original meaning and tone.
- Make the translations natural and user-friendly.
- Preserve HTML tags, formatting, and special characters.

This feature provides quick, automated translations for all your project's supported languages. However, Amplitude can't guarantee the accuracy of AI-translated strings. Therefore, it's highly recommended to manually review AI-translated content before publishing your guide or survey to your users. You can edit AI translations using the web interface.

##### To use AI localization

1. Complete the guide or survey's steps in the default language.
2. In the Localization section of the Setup tab, select one of the following:
   - **Translate All Languages**: Translate your content into all languages set in your project settings.
   - **Translate Selected Language**: Translate your content for a single language.

{{/partial:tab}}
{{partial:tab name="XLIFF file upload"}}
If you want to integrate with your own translation workflow, you can download an [.xliff](https://en.wikipedia.org/wiki/XLIFF) file for each language.

##### To upload an XLIFF file
1. Create the guide or survey in the default language.
2. Download the translation template. This template is a .xliff file that contains [translatable strings](#translatable-strings) from each step of your guide or survey.

    {{partial:admonition type="tip" heading="Adding translations to the xliff files"}}
    Guides and Surveys template files add untranslated content to `<source>` tags in an .xliff file. The content in these tags shouldn't change. Add translations to the `<target>` tags. For example:
    ```xml
        <trans-unit id="done_label">
            <source>Finish</source>
            <target>Terminer</target>
        </trans-unit>
    ```
    {{/partial:admonition}}
3. Create translations to your target languages with the template file and upload a translated .xliff file for each language. If you don't upload a file for a language, Guides and Surveys follows the specified fallback setting for a missing translation. If you need to include HTML in your guide or survey content (common for `<br>` tags), make sure to escape the HTML in the `<target>` tag. For example:
    ```xml
    <target>First line&lt;br&gt;Second line</target>
    ```
4. After you upload an .xliff file, review the content by toggling through the language picker.

    {{partial:admonition type="tip" heading="Update translations"}}
   After you upload a translation .xliff file, you can still make updates to localized content on the appropriate step of the guide or survey. Amplitude adds updates that you make to the uploaded .xliff file to ensure it stays in sync.
    {{/partial:admonition}}
{{/partial:tab}}
{{/partial:tabs}}

### Preview a translation

When you preview a localized guide or survey, the preview bar displays translation-based issues that may prevent the guide or survey from showing.
