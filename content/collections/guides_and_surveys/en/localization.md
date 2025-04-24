---
id: 185ee92c-69ab-465b-84f1-35d4da01c2d7
blueprint: guides_and_survey
title: Localization
landing: false
---

Localization enables you to serve guides and surveys in different languages without having to create a new guide or survey for each language.


## Settings

Localization can be enabled in the project settings. It's available on Growth and Enterprise plans.

The default language is English and, for now, only Amplitude support can change it. Once you have enabled localization, add all the languages you want to support. Furthermore, the project settings let you configure what happens when a translation is outdated or missing for a specific language:

- When translation is unavailable: This means the language is configured to be supported but no translation has been set. Please note that once any translated string is set, the translation is considered available.
    - Show in default language: The default language will be used.
    - Don't show guide or survey: The guide or survey will not be shown.
- When translation is outdated: This means the translation has been set but a copy string that is supported for translation has been updated after the translation has been edited.
    - Show in default language: The default language will be used.
    - Show outdated translation: The outdated translation will be shown.
    - Don't show guide or survey: The guide or survey will not be shown.

## Specifying a user's language

The user's language you must specify through a locale code during the [SDK initialization](/docs/guides-and-surveys/sdk).

```javascript
amplitude.add(window.engagement.plugin({locale: 'en'}))

engagement.init(<apiKey>,  { locale: 'en' }) // for use with third-party Analytics SDKs
```

If you specify a language added to the supported languages in the project settings, the default language is used.

## Editing translations

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

Configuring translations is possible through uploading XLIFF files as well as using the builder interface directly. To use XLIFF files, go to the _Setup_ tab and scroll down to the _Localization_ section. Start by downloading a template file. Then, modify the translations and upload the file again. Before publishing your guide or survey, make sure to preview each language by using the language selector in the preview area.

When switching to another language, the preview pane and also builder will automatically load the translations for the selected language. You can then edit the translations directly in the builder.
