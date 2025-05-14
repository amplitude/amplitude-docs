---
id: 4E08BF94-559B-42EE-A095-D5B0026298FE
title: Localization API (Beta)
---

# Guides and Surveys Localization API

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
The URLs above are for the Beta version of the Localization API. The production version will be hosted at a different URL.
{{/partial:admonition}}


## Authentication

The API uses Basic Authentication. You need to provide your **App ID** and **App Secret Key**.

Construct the Basic Auth header by Base64 encoding the string `YOUR_APP_ID:YOUR_APP_SECRET_KEY`.

**Example Header:**
`Authorization: Basic <base64_encoded_app_id:app_secret_key>`

(Replace `<base64_encoded_app_id:app_secret_key>` with your actual Base64 encoded credentials.)

## XLIFF File Structure

The API uses XLIFF version 1.2. Key aspects of the XLIFF structure relevant to this API:

*   **`<file>` element:** Represents translations for a Nudge or a Nudge variant.
    *   `original`: This attribute is crucial. It identifies the Nudge and optionally a specific variant.
        *   Format: `<flag_key>` or `<flag_key>_<variant_key>`
        *   `<flag_key>`: The unique key of your Nudge (typically a Feature Flag key).
        *   `<variant_key>` (optional): The key of a specific variant within the Nudge.
            *   For import, if `<variant_key>` is omitted, the API updates the first non-archived variant of the Nudge.
            *   For export, if a Nudge has multiple active variants, each may be represented in a separate `<file>` element within the XLIFF document, with the `original` attribute formatted as `<flag_key>_<variant_key>` to distinguish them.
    *   `datatype="plaintext"`
    *   `source-language`: The source language code (e.g., "en").
    *   `target-language`: The target language code for the translations in this file (e.g., "de", "fr").

*   **`<body>` element:** Contains one or more `<trans-unit>` elements.

*   **`<trans-unit>` element:** Represents a segment of text for translation.
    *   `id`: A unique identifier for the text segment within the Nudge (e.g., `snooze_label`, `step_1_title`, `step_6_content.markdown`). These IDs correspond to the translatable fields of your Nudge content.
    *   `<source>`: The original text in the `source-language`.
    *   `<target>`: The translated text in the `target-language`. For import, provide the translation here. For export, this will contain the existing translation. If empty, it means the text is not yet translated for that target language.

## Endpoints

### Import Translations

Imports an XLIFF file to add or update translations for one or more Nudges. Upon successful import of translations, the relevant cache for your application will be purged to ensure the new translations are served.

*   **HTTP Method:** `POST`
*   **URL:** `/import/`
*   **Headers:**
    *   `Authorization: Basic <base64_encoded_app_id:app_secret_key>`
    *   `Content-Type: application/xml; charset=utf-8`
*   **Request Body:**
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
*   **Example Request (curl):**
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
    (Replace `YOUR_BASE64_ENCODED_CREDENTIALS` with your actual Base64 encoded App ID and Secret Key.)
*   **Response:**
    *   **`200 OK`**: All translation units in the XLIFF file were processed successfully. The response body is a JSON object detailing the status for each file processed.
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

### Export Translations

Exports translations for specified guides or survey (by `key`) into an XLIFF 1.2 file.

*   **HTTP Method:** `GET`
*   **URL:** `/export/`
*   **Headers:**
    *   `Authorization: Basic <base64_encoded_app_id:app_secret_key>`
*   **Query Parameters:**
    *   `flag_key` (string, required): The flag key of the Nudge to export translations for. Provide this parameter multiple times for multiple guides or surveys, or provide a commae separated list (e.g., `?flag_key=key1&flag_key=key2` or `?flag_key=key1,key2`). At least one `flag_key` is required.
    *   `locale` (string, optional): The specific target language code(s) to export (e.g., "de", "fr"). Provide this parameter multiple times for multiple locales. If omitted, translations for all configured target locales (excluding the source language) for the app will be exported.
*   **Example Request (curl):**
    To export translations for a single Nudge and a specific locale:
    ```bash
    curl -X GET \\
      -H "Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS" \\
      "https://app.amplitude.com/a/guides-surveys/api/v1/localization/export/?flag_key=nudge-translated-announcement-1&locale=de"
    ```
    To export for multiple flag keys and locales:
    ```bash
    curl -X GET \\
      -H "Authorization: Basic YOUR_BASE64_ENCODED_CREDENTIALS" \\
      "https://app.amplitude.com/a/guides-surveys/api/v1/localization/export/?flag_key=key-one&flag_key=key-two&locale=de&locale=fr"
    ```
    (Replace `YOUR_BASE64_ENCODED_CREDENTIALS` with your actual Base64 encoded App ID and Secret Key.)
*   **Response:**
    *   **`200 OK`**: The response body contains the XLIFF 1.2 XML content.
