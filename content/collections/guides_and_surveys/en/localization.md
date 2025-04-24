---
blueprint: guides_and_survey
title: Localization
landing: false
---

Localization enables you to serve guides and surveys in different languages without having to create a new guide or survey for each language.


## Settings

Localization can be enabled in the project settings. It is available on Growth and Enterprise plans.

The default language is English and, for now, can only be changed by Amplitude support. Once you have enabled localization, add all the languages you want to support. Furthermore, the project settings let you configure what should happen if a translation is outdated or missing for a specific languages.

## Specifying a user's language

The user's language has to be specified through a locale code during the [SDK initialization](/docs/guides-and-surveys/sdk).

```javascript
amplitude.add(window.engagement.plugin({locale: 'en'}))

engagement.init(<apiKey>,  { locale: 'en' }) // for use with third-party Analytics SDKs
```

If you specify a language that is added to the supported languages in the project settings, the default language will be used.

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
