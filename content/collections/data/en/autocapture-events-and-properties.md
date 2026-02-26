---
id: 6e11f99c-17af-4b9e-864b-ec5639f0b636
blueprint: data
title: 'Autocapture Events and Properties'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1755188049
---
This page contains information about the events and event properties that Autocapture collects:

## Sessions
### Session Started

| Property Name             | Description |
| ------------------------- | ----------- |
| *No properties collected* |             |

### Session Ended

| Property Name             | Description |
| ------------------------- | ----------- |
| *No properties collected* |             |


## Page Views

### Page viewed

| Property Name     | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| **Page Domain**   | The full hostname from the current web address, including any subdomains such as `www` or `app`. |
| **Page Location** | The full URL of the current page, including any URL Search Parameters.                           |
| **Page Path**     | The pathname of the current page. This excludes any URL Search Parameters and URL Fragments.     |
| **Page Title**    | The title of the page.                                                                           |
| **Page URL**      | The URL of the page excluding the URL Search Parameters.                                         |

## File Downloads

### File Downloaded

| Property Name      | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| **File Extension** | The extension of the downloaded file. For example: .pdf, .docx, .zip, and so forth.                 |
| **File Name**      | The full pathname of the downloaded file. This can include more than just the filename of the file. |
| **Link ID**        | The ID of the link element.                                                                         |
| **Link Text**      | The text content of the link element.                                                               |
| **Link URL**       | The link address of the file download.                                                              |

## Form Interactions
Autocapture can capture forms constructed with the `<form>` tags.

### Form Started
Captures when a user initially interacts with a form element within a form, which includes modifications to a text input, radio button, or a dropdown. 

| Property Name        | Description                                                                                                                                         |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Form Destination** | The action attribute of the form element. For example, in the following form: `<form action="/subscribe">` <br>The property value is: `/subscribe`. |
| **Form ID**          | The ID of the form element.                                                                                                                         |
| **Form Name**        | The name attribute of the form element.                                                                                                             |

### Form Submitted
Captures when a user submits the form. 

| Property Name        | Description                                                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Form Destination** | The action attribute of the form element. For example, in the following form: `<form action="/subscribe">` <br> The property value is: `/subscribe`. |
| **Form ID**          | The ID of the form element.                                                                                                                          |
| **Form Name**        | The name attribute of the form element.                                                                                                              |

## Element Interactions

### Element Clicked 
Captures clicks on page elements.

The default configuration captures user interactions with interactive elements on your page. This optimizes capturing important interactions with your app while eliminating event noise (such as clicks to highlight text, white-space clicks, and so forth.) This includes:

* All clicks on form elements: `<a>`, button, input, select, text area, label, and elements where `contentEditable` is set to `true`.
* All clicks on video and audio elements
* Clicks on select elements that result in a change on your page (for example, a modal appearing) or navigation to another page. These elements include divs, spans, and headers.
* All clicks on elements with an attribute of `data-amp-default-track` or a class of `amp-default-track`.
* You can customize this configuration to add or remove selectors. You can choose if you want those selectors to always be tracked or only track them when the click results in a change to the page.

| Property Name             | Description                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Element ID**            | The `id` attribute of the HTML element.<br>Example: if the clicked element is `<a id="myID">Home</a>` <br> The property value is `myID`.                                                                                                                                                                                                                                |
| **Element Class**         | The `class` attribute of the HTML element.<br>Example: if the clicked element is `<a class="myClass">Home</a>` <br> The property value is `myClass`.                                                                                                                                                                                                                    |
| **Element Tag**           | The tag name of the HTML element.<br>Example: if the clicked element is `<a href="#">Home</a>` <br> The property value is `a`.                                                                                                                                                                                                                                          |
| **Element Text**          | The text content (`innerText`) of the HTML element. Only applies to the Element Clicked event.<br>Example: if the clicked element is `<a href="#">Home</a>` <br> The property value is `Home`.                                                                                                                                                                          |
| **Element Href**          | The `href` attribute of the HTML element. Only applies to `<a>` tags on the Element Clicked event. Values longer than 128 bytes are truncated.<br>Example: if the clicked element is `<a href="https://www.amplitude.com">Home</a>` <br> The property value is `https://www.amplitude.com`.                                                                             |
| **Element Position Left** | Captures the distance of the element from the left of the screen view (pixels).<br>Example: a value of `600` means the clicked element was 600px from the left of the view screen.                                                                                                                                                                                      |
| **Element Position Top**  | Captures the distance of the element from the top of the screen view (pixels).<br>Example: a value of `400` means the clicked element was 400px from the top of the view screen.                                                                                                                                                                                        |
| **Viewport Height**       | Captures the height (pixels) of the viewport when the element was clicked (not related to the element itself).<br>Example: a value of `900` means the viewport had a height of `900` pixels.                                                                                                                                                                            |
| **Viewport Width**        | Captures the width (pixels) of the viewport when the element was clicked (not related to the element itself).<br>Example: a value of `1200` means the viewport had a width of `1200` pixels.                                                                                                                                                                            |
| **Page URL**              | Captures the URL of the page where the element was clicked.<br>Example: a value of `https://www.amplitude.com` means that the clicked element was on this page.                                                                                                                                                                                                         |
| **Page Title**            | Captures the page title of the page where the element was clicked.<br>Example: if the page where the element was clicked has `<title>Amplitude</title>` <br> The value is: `Amplitude`                                                                                                                                                                                  |
| **Element Hierarchy**     | Captures DOM elements and attributes of the element clicked and its parent or sibling elements. Used for visual labeling.                                                                                                                                                                                                                                               |
| **Element Selector**      | **Deprecated** in favor of Element Hierarchy. Captures a unique CSS selector of the element.<br>Example: if the clicked element is `<a id="myID">Home</a>` <br> The value is `#myID`..                                                                                                                                                                                  |
| **Element Attributes**    | Captures unique attributes associated with click events through the `dataAttributePrefix` setting.<br>Example: if there is a unique attribute on your HTML elements used by your testing frame work such as `<a data-testid="feature-start">Start</a>` <br> A property on the click exists such as `[Amplitude] Element Attributes.id` with a value of `feature-start`. |
| **Element Aria Label**    | The `aria-label` of the element, used for interactive elements without visible text. These can further define your click events. <br>Example: if the clicked event is `<button aria-label="Close" onclick="myDialog.close()"></button>` <br> The value is `Close`.                                                                                                      |
| **Element Parent Label**  | The text label in the parent element (or upper ancestors if not found in one-level parent) of the element. <br>Example: if the clicked element is `<div><span>Amplitude</span><a id="myID">Home</a></div>` <br> The value is `Amplitude`.                                                                                                                               |

### Element Changed
Captures form element interactions, such as changes to a dropdown or inputs text into a text box.

| Property Name             | Description                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Element ID**            | The `id` attribute of the HTML element.<br>Example: if the clicked element is `<a id="myID">Home</a>` <br> The property value is `myID`.                                                                                                                                                                                                                                |
| **Element Class**         | The `class` attribute of the HTML element.<br>Example: if the clicked element is `<a class="myClass">Home</a>` <br> The property value is `myClass`.                                                                                                                                                                                                                    |
| **Element Tag**           | The tag name of the HTML element.<br>Example: if the clicked element is `<a href="#">Home</a>` <br> The property value is `a`.                                                                                                                                                                                                                                          |
| **Element Position Left** | Captures the distance of the element from the left of the screen view (pixels).<br>Example: a value of `600` means the clicked element was 600px from the left of the view screen.                                                                                                                                                                                      |
| **Element Position Top**  | Captures the distance of the element from the top of the screen view (pixels).<br>Example: a value of `400` means the clicked element was 400px from the top of the view screen.                                                                                                                                                                                        |
| **Viewport Height**       | Captures the height (pixels) of the viewport when the element was clicked (not related to the element itself).<br>Example: a value of `900` means the viewport had a height of `900` pixels.                                                                                                                                                                            |
| **Viewport Width**        | Captures the width (pixels) of the viewport when the element was clicked (not related to the element itself).<br>Example: a value of `1200` means the viewport had a width of `1200` pixels.                                                                                                                                                                            |
| **Page URL**              | Captures the URL of the page where the element was clicked. <br>Example: a value of `https://www.amplitude.com` means that the clicked element was on this page.                                                                                                                                                                                                        |
| **Page Title**            | Captures the page title of the page where the element was clicked.<br>Example: if the page where the element is clicked has `<title>Amplitude</title>` <br> The value is: `Amplitude`.                                                                                                                                                                                  |
| **Element Hierarchy**     | Captures DOM elements and attributes of the element clicked and its parent or sibling elements. Used for visual labeling.                                                                                                                                                                                                                                               |
| **Element Selector**      | **Deprecated** in favor of Element Hierarchy. Captures a unique CSS selector of the element.<br>Example: if the clicked element is `<a id="myID">Home</a>` <br> The value is `#myID`.                                                                                                                                                                                   |
| **Element Attributes**    | Captures unique attributes associated with click events through the `dataAttributePrefix` setting.<br>Example: if there is a unique attribute on your HTML elements used by your testing frame work such as `<a data-testid="feature-start">Start</a>` <br> A property on the click exists such as `[Amplitude] Element Attributes.id` with a value of `feature-start`. |
| **Element Aria Label**    | The `aria-label` of the element, used for interactive elements without visible text. These can further define your click events. <br>Example: if the clicked event is `<button aria-label="Close" onclick="myDialog.close()"></button>` <br> The value is `Close`.                                                                                                      |
| **Element Parent Label**  | The text label in the parent element (or upper ancestors if not found in one-level parent) of the element. <br>Example: if the clicked element is `<div><span>Amplitude</span><a id="myID">Home</a></div>` <br> The value is `Amplitude`.                                                                                                                               |

## Network Request

Captures when the application makes a network request. By default, tracks network requests with a response code in the range 500-599, excluding requests made to any `amplitude.com` domain.

To enable network request tracking, set `config.autocapture.networkTracking` to `true` in your SDK configuration.

| Property Name                      | Description                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| **[Amplitude] URL**                | The URL of the network request with sensitive information masked.                   |
| **[Amplitude] URL Query**          | The query parameters of the URL.                                                    |
| **[Amplitude] URL Fragment**       | The fragment identifier of the URL.                                                 |
| **[Amplitude] Request Method**     | The HTTP method used for the request (for example, GET, POST, PUT, or DELETE).      |
| **[Amplitude] Status Code**        | The HTTP status code of the response.                                               |
| **[Amplitude] Error Code**         | The local error code if the request failed without a status code.                   |
| **[Amplitude] Error Message**      | The local error message if the request failed without a status code.                |
| **[Amplitude] Start Time**         | The timestamp when the request started, in milliseconds since Unix epoch.           |
| **[Amplitude] Completion Time**    | The timestamp when the request completed, in milliseconds since Unix epoch.         |
| **[Amplitude] Duration**           | The duration of the request in milliseconds.                                        |
| **[Amplitude] Request Body Size**  | The size of the request body in bytes.                                              |
| **[Amplitude] Response Body Size** | The size of the response body in bytes.                                             |
| **[Amplitude] Request Body**       | The captured JSON request body (when you configure a `requestBody` capture rule).   |
| **[Amplitude] Response Body**      | The captured JSON response body (when you configure a `responseBody` capture rule). |

For more information about configuring network tracking, including advanced capture rules and filtering options, review [Track network requests](/docs/sdks/analytics/browser/browser-sdk-2#track-network-requests) in the Browser SDK 2 documentation.

## Web Vitals

Captures Core Web Vitals performance metrics when the browser tab becomes hidden.

| Property Name                       | Description                                                                                                      |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Page Domain**                     | The full hostname from the current web address, including any subdomains such as `www` or `app`.                 |
| **Page Location**                   | The full URL of the current page, including any URL Search Parameters.                                           |
| **Page Path**                       | The pathname of the current page. This excludes any URL Search Parameters and URL Fragments.                     |
| **Page Title**                      | The title of the page.                                                                                           |
| **Page URL**                        | The URL of the page excluding the URL Search Parameters.                                                         |
| **LCP (Largest Contentful Paint)**  | The time it takes for the largest content element to become visible in the viewport. Measured in milliseconds.   |
| **FCP (First Contentful Paint)**    | The time it takes for the first content element to be painted on the screen. Measured in milliseconds.           |
| **INP (Interaction to Next Paint)** | The time from a user interaction to the next paint. Measured in milliseconds.                                    |
| **CLS (Cumulative Layout Shift)**   | The sum of all individual layout shift scores for unexpected layout shifts. A dimensionless value.               |
| **TTFB (Time to First Byte)**       | The time from the navigation start to when the first byte of the response is received. Measured in milliseconds. |

Each metric includes a performance rating (good, needs-improvement, or poor) based on Web Vitals thresholds and timing data.
