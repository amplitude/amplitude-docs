---
id: 185ee92c-69ab-465b-84f1-35d4da01c2d7
blueprint: guides_and_survey
title: Localization
landing: false
---

Localization enables you to serve guides and surveys in different languages without creating a new guide or survey for each language.

## Feature availability

Guides and Surveys localization is available to accounts with access to Guides and Surveys that are on Growth or Enterprise plans. For more information, see the [Pricing page](https://amplitude.com/pricing).

## Enable localization

Enabling localization on Guides or Surveys requires updates to your SDK implementation and Project settings.

### SDK updates

Specify the user's locale during [SDK initialization](/docs/guides-and-surveys/sdk).

{{partial:tabs tabs="Amplitude SDK, Third-party analytics"}}
{{partial:tab name="Amplitude SDK"}}
```js
const currentLocale = getLocale() // "en" or "en-US"

amplitude.add(window.engagement.plugin({locale: currentLocale}))
```
{{/partial:tab}}
{{partial:tab name="Third-party analytics"}}
```js
const currentLocale = getLocale() // "en" or "en-US"

engagement.init(apiKey,  { locale: currentLocale }) // for use with third-party Analytics SDKs
```
{{/partial:tab}}
{{/partial:tabs}}


{{partial:admonition type="note" heading="Locale code"}}
Amplitude considers only the language of a locale code. For example, `fr_FR` and `fr_CA` resolve to a single French translation.
{{/partial:admonition}}

### Project settings

Navigate to *Project Settings > Guides and Surveys*.

On this tab, you can:

- Enable or disable localization
- View the default language
- Define the languages available for your guides and surveys
- Set the behavior or fallback when a translation file for an individual guide or survey is unavailable or out of date.

{{partial:admonition type="note" heading="Default language"}}
English is the default language for all projects. To update your default language, contact [Amplitude Support](https://gethelp.amplitude.com)
{{/partial:admonition}}

The default language is English and, for now, only Amplitude support can change it. Once you have enabled localization, add all the languages you want to support. Furthermore, the project settings let you configure what happens when a translation is outdated or missing for a specific language.

## Add translation to a guide or survey

The languages you set in Project settings appear as languages in the *Localization* section on the *Setup* tab in your guide or survey.

To add or edit a translation, you have three options.

- Use the web interface to add or edit translations. Amplitude recommends this method.
- Use AI localization to automatically translate your content. Amplitude recommends this method for quick, automated translations.
- Use the .xliff file to add or edit translations. Amplitude recommends this method if you integrate with a custom translation workflow.

### Use the web interface

Use the language picker on the canvas to toggle between available languages. Changes you make to a guide or survey's text is saved for the selected language.

### Use AI localization

AI localization automatically translates your guide or survey content using Claude. We take the strings from the default language and attempt to do the following: 

- Maintain the original meaning and tone
- Make the translations natural and user-friendly
- Preserve HTML tags, formatting, and special characters

This feature provides quick, automated translations for all your project's supported languages.

#### To use AI localization

1. Complete the guide or survey's steps in the default language.
2. In the *Localization* section on the *Setup* tab, you have two AI translation options:
   - **Translate All Languages**: Translate your content into all languages set in your project settings.
   - **Translate Selected Language**: Translate your content for a single language.

{{partial:admonition type="note"}}
AI-generated translations provide a starting point but may require manual review and editing for accuracy, especially for technical terms or brand-specific language. You can edit AI translations using the web interface after Amplitude generates them.
{{/partial:admonition}}

### Use xliff files

Alternatively, if you want to integrate with your own translation workflow, you can download an .xliff file for each language.

1. Complete the guide or survey's steps in the default language.
2. Download the translation template. This template is a .xliff file that contains [translatable strings](#translatable-strings) from each step of your guide or survey.

    {{partial:admonition type="tip" heading="Adding translations to the xliff files"}}
    Guides and Surveys template files add untranslated content to `<source>` tags in a .xliff file. The content in these tags shouldn't change. Add translations to the `<target>` tags, like "Terminer" below:
    ```xml
        <trans-unit id="done_label">
            <source>Finish</source>
            <target>Terminer</target>
        </trans-unit>
    ```
    {{/partial:admonition}}
3. Create translations to your target languages with the template file, and upload a translated .xliff file for each language. If you don't upload a file for a language, Guides and Surveys follows the Project setting for a missing translation.
4. After you upload a translation file, use the language picker on the canvas to toggle between available languages.

    {{partial:admonition type="tip" heading="Update translations"}}
    Even after you upload a translation file, you can still make updates to translations inline, on the appropriate step of the guide or survey. Amplitude adds updates you make here to the template file to ensure it stays in sync.
    {{/partial:admonition}}

### Preview a translation

When you preview a localize guide or survey, the preview bar displays translation-based issues that may prevent the guide or survey from showing.


## Translatable strings

Localization is supported for the following copy:

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
