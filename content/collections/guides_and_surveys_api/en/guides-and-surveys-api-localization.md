---
id: d55d1726-1779-4479-bd3d-063b71c49f52
title: Localization API (Beta)
landing: false
exclude_from_sitemap: false
api_status: beta
summary: Programmatically import and export translation files for your guides and surveys.
---

The Guides and Surveys Localization API allows you to programmatically import and export translation files for your guides and surveys in XLIFF 1.2 format. This enables integration with external translation management systems and workflows.

| <div class="big-column">Name</div>          | Description                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------- |
| [Import Translations](#import-translations) | Imports an XLIFF file to add or update translations for one or more Nudges.       |
| [Export Translations](#export-translations) | Exports translations for specified Nudges (by `flag_key`) into an XLIFF 1.2 file. |

## Regions

All API endpoints described here are relative to the following base URLs:

| Region              | URL                               |
| ------------------- | --------------------------------- |
| Standard Server     | `https://app.amplitude.com/a/`    |
| EU Residency Server | `https://app.eu.amplitude.com/a/` |

{{partial:admonition type="note" heading="Beta URLs"}}
The URLs above are for the Beta version of the Localization API. This URL may change once the API reaches general availability.
{{/partial:admonition}}

## Authentication

The API uses Basic Authentication. You need to provide your **API Key** and **Project Secret Key**.

Construct the Basic Auth header by Base64 encoding the string `YOUR_API_KEY:YOUR_PROJECT_SECRET_KEY`.

**Example Header:**
`Authorization: Basic <base64_encoding(api_key:project_secret_key)>`

(Replace `<base64_encoding(api_key:project_secret_key)>` with your actual Base64 encoded credentials.)

## XLIFF file structure

The API uses XLIFF version 1.2. Key aspects of the XLIFF structure relevant to this API:

- **`<file>` element:** Represents translations for a guide or survey.

  - `original`: This attribute is crucial. It identifies the guide or survey and optionally a specific variant.
    - Format: `<key>` or `<key>_<variant>`
    - `<key>`: The unique key of your guide or survey.
    - `<variant>` (optional): The identifier of a specific variant within the guide or survey.
      - For import, if `<variant>` is omitted, the API updates the first variant of the guide or survey.
      - For export, if a guide or survey has multiple active variants, each may be represented in a separate `<file>` element within the XLIFF document, with the `original` attribute formatted as `<key>_<variant>` to distinguish them.
  - `datatype="plaintext"`
  - `source-language`: The source language code (for example, "en").
  - `target-language`: The target language code for the translations in this file (for example, "de", "fr").

- **`<body>` element:** Contains one or more `<trans-unit>` elements.

- **`<trans-unit>` element:** Represents a segment of text for translation.
  - `id`: A unique identifier for the text segment within the guide or survey (for example, `snooze_label`, `step_1_title`, `step_6_content.markdown`). These IDs correspond to the translatable fields of your guide or survey content.
  - `<source>`: The original text in the `source-language`.
  - `<target>`: The translated text in the `target-language`. For import, provide the translation here. For export, this contains the existing translation. If empty, it means the text isn't yet translated for that target language.

## Endpoints

### Import translations

Imports an XLIFF file to add or update translations for one or more guides or surveys. Upon successful import of translations, Amplitude purges the relevant cache for your application to ensure the new translations are available.

- **HTTP Method:** `POST`
- **URL:** `/import/`
- **Headers:**
  - `Authorization: Basic <base64_encoded_app_id:app_secret_key>`
  - `Content-Type: application/xml; charset=utf-8`
- **Request Body:**
  The raw XLIFF 1.2 XML content.
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2">
      <file original="your-nudge-flag-key" datatype="plaintext" source-language="en" target-language="de">
          <body>
              <trans-unit id="step_1_title">
                  <source>Welcome!</source>
                  <target>Willkommen!</target>
              </trans-unit>
              <trans-unit id="step_1_content.markdown">
                  <source>This is an important announcement.</source>
                  <target>Dies ist eine wichtige Ankündigung.</target>
              </trans-unit>
              <!-- Add more trans-unit elements as needed -->
          </body>
      </file>
      <!-- Add more file elements for other Nudges or languages -->
  </xliff>
  ```
- **Example Request (curl):**
  ```bash
  curl -X POST \\
    -H "Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS" \\
    -H "Content-Type: application/xml; charset=utf-8" \\
    --data \'\'\'<?xml version="1.0" encoding="UTF-8"?>
  <xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2"><file original="nudge-translated-announcement-1" datatype="plaintext" source-language="en" target-language="de">
          <body>
              <trans-unit id="step_1_title">
                  <source>Announcement</source>
                  <target>Ankündigung</target>
              </trans-unit>
          </body>
      </file>
  </xliff>\'\'\' \\
    "https://app.amplitude.com/a/guides-surveys/api/v1/localization/import/"
  ```
  (Replace `<base64_encoding(api_key:project_secret_key)>` with your actual Base64 encoded API Key and Project Secret Key.)
- **Response:**
  - **`200 OK`**: All translation units in the XLIFF file processed successfully. The response body is a JSON object detailing the status for each file processed.
    Example:
    ```json
    {
      "nudge-translated-announcement-1": {
        "de": {
          "state": "COMPLETE",
          "message": "Updated 5 translation units."
        }
      }
    }
    ```

### Export translations

Exports translations for specified guides or survey (by `key`) into an XLIFF 1.2 file.

- **HTTP Method:** `GET`
- **URL:** `/export/`
- **Headers:**
  - `Authorization: Basic <base64_encoded_app_id:app_secret_key>`
- **Query Parameters:**
  - `key` (string, required): The key of the guide or survey to export translations for. Provide this parameter multiple times for multiple guides or surveys, or provide a comma separated list (for example, `?key=key1&key=key2` or `?key=key1,key2`). At least one `key` is required.
  - `locale` (string, optional): The specific target language codes to export (for example, "de", "fr"). Provide this parameter multiple times for multiple locales. If omitted, translations for all configured target locales (excluding the source language) for the app are exported.
- **Example Request (curl):**
  To export translations for a single guide or survey and a specific locale:
  ```bash
  curl -X GET \\
    -H "Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS" \\
    "https://app.amplitude.com/a/guides-surveys/api/v1/localization/export/?key=nudge-translated-announcement-1&locale=de"
  ```
  To export for multiple guide or survey keys and locales:
  ```bash
  curl -X GET \\
    -H "Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS" \\
    "https://app.amplitude.com/a/guides-surveys/api/v1/localization/export/?key=key-one&key=key-two&locale=de&locale=fr"
  ```
  (Replace `YOUR_BASE64_ENCODED_CREDENTIALS` with your actual Base64 encoded API Key and Project Secret Key.)
- **Response:**
  - **`200 OK`**: The response body contains the XLIFF 1.2 XML content.
