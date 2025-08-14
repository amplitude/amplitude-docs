---
id: 6e11f99c-17af-4b9e-864b-ec5639f0b636
blueprint: data
title: 'Autocapture Events and Properties'
this_article_will_help_you:
  - 'Learn about all of the specific events and properties associated with Autocapture'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1755188049
---
This page contains best practices for the various aspects of Autocapture. Remember that every implementation is unique and these best practices are only recommendations. 
## Sessions
### Session Started

| Property Name | Description |
|------------|----------|
| *No properties collected*         |  |

### Session Ended

| Property Name | Description |
|------------|----------|
| *No properties collected*         |  |


## Page Views

### Page viewed

| Property Name | Description |
|------------|----------|
| **Page Domain**         | The full hostname from the current web address, including any subdomains such as `www` or `app`.  |
| **Page Location**          | The full URL of the current page, including any URL Search Parameters.  |
| **Page Path**          | The pathname of the current page. This excludes any URL Search Parameters and URL Fragments.  |
| **Page Title**          | The title of the page.  |
| **Page URL**         | The URL of the page excluding the URL Search Parameters. |

## File Downloads

### File Downloaded

| Property Name | Description |
|------------|----------|
| **File Extension**         | The extension of the file that was downloaded. for example: .pdf, .docx, .zip, and so forth.  |
| **File Name**          | The full pathname of the downloaded file. This can include more than just the filename of the file.  |
| **Link ID**          | The ID of the link element.  |
| **Link Text**          | The text content of the link element.  |
| **Link URL**         | The link address of the file download. |

## Form Interactions

### Form Started
Captures when a user initially interacts with a form element within a form, which includes modifications to a text input, radio button, or a dropdown. Autocapture can capture forms constructed with the `<form>` tags.

| Property Name | Description |
|------------|----------|
| **Form Destination**         | The action attribute of the form element. For example, if the form is `<form action="/subscribe">` <br> The property value is: `/subscribe`.   |
| **Form ID**          | The ID of the form element.  |
| **Form Name**          | The name attribute of the form element.  |

### Form Submitted
Captures when a user submits the form. Autocapture can capture forms constructed with the `<form>` tags.

| Property Name | Description |
|------------|----------|
| **Form Destination**         | The action attribute of the form element. For example, if the form is `<form action="/subscribe">` <br> The property value is: `/subscribe`.   |
| **Form ID**          | The ID of the form element.  |
| **Form Name**          | The name attribute of the form element.  |

## Element Interactions

### Element Clicked 
Captures clicks on page elements.

The default configuration is designed to capture user interactions with interactive elements on your page. This optimizes for capturing important interactions with your app while eliminating event noise (clicks to highlight text, white-space clicks, and so forth.). This includes:

* All clicks on form elements: a, button, input, select, text area, label, and elements where `contenteditable` is set to `true`.
* All clicks on video and audio elements
* Clicks on select elements that result in a change on your page (for example, a modal appearing) or navigation to another page. These elements include divs, spans, and headers.
* All clicks on elements with an attribute of “data-amp-default-track” or a class of `amp-default-track`.
* You can customize this configuration to add or remove selectors, and can choose if you want those selectors to always be tracked, or only track when the click results in a change to the page.

| Property Name           | Description |
|-------------------------|-------------|
| **Element ID** | The `id` attribute of the HTML element.<br>Example: if the clicked element is `<a id="myID">Home</a>` <br> The property value is `myID` |
| **Element Class** | The `class` attribute of the HTML element.<br>Example: if the clicked element is `<a class="myClass">Home</a>` <br> The property value is `myClass` |
| **Element Tag** | The tag name of the HTML element.<br>Example: if the clicked element is `<a href="#">Home</a>` <br> The property value is `a` |
| **Element Text** | The text content (`innerText`) of the HTML element. Only applies to the Element Clicked event.<br>Example: if the clicked element is `<a href="#">Home</a>` <br> The property value is `Home` |
| **Element Href** | The `href` attribute, specifying the URL for a link. Only applies to `<a>` tags on the Element Clicked event.<br>Example: if the clicked element is `<a href="https://www.amplitude.com">Home</a>` <br> The property value is `https://www.amplitude.com` |
| **Element Position Left** | Captures the distance of the element from the left of the screen view (in pixels).<br>Example: a value of `600` means the clicked element was 600px from the left of the view screen. |
| **Element Position Top** | Captures the distance of the element from the top of the screen view (in pixels).<br>Example: a value of `400` means the clicked element was 400px from the top of the view screen. |
| **Viewport Height** | Captures the height (in pixels) of the viewport when the element was clicked (not related to the element itself).<br>Example: a value of `900` means the viewport had a height of `900` pixels. |
| **Viewport Width** | Captures the width (in pixels) of the viewport when the element was clicked (not related to the element itself).<br>Example: a value of `1200` means the viewport had a width of `1200` pixels. |
| **Page URL** | Captures the URL of the page where the element was clicked.<br>Example: a value of `https://www.amplitude.com` means that the clicked element was on this page. |
| **Page Title** | Captures the page title of the page where the element was clicked.<br>Example: if the page where the element was clicked has `<title>Amplitude</title>` <br> The value is: `Amplitude` |
| **Element Hierarchy** | Captures DOM elements and attributes of the element clicked and its parent or sibling elements. Used for visual labeling. |
| **Element Selector** | **Deprecated** in favor of Element Hierarchy. Captures a unique CSS selector of the element.<br>Example: if the clicked element is `<a id="myID">Home</a>` <br> The value is `#myID` |
| **Element Attributes** | Captures unique attributes associated with click events through the `dataAttributePrefix` setting.<br>Example: if there is a unique attribute on your HTML elements used by your testing frame work such as `<a data-testid="feature-start">Start</a>` <br> A property on the click exists such as `[Amplitude] Element Attributes.id` with a value of `feature-start` |
| **Element Aria Label** | The `aria-label` of the element, used for interactive elements without visible text. These can further define your click events. <br>Example: if the clicked event is `<button aria-label="Close" onclick="myDialog.close()"></button>` <br> The value is `Close` |
| **Element Parent Label** | The text label in the parent element (or upper ancestors if not found in one-level parent) of the element. <br>Example: if the clicked element is `<div><span>Amplitude</span><a id="myID">Home</a></div>` <br> The value is `Amplitude` |

### Element Changed
Captures form element interactions, such as changes to a dropdown or inputs text into a text box.

| Property Name           | Description |
|-------------------------|-------------|
| **Element ID** | The `id` attribute of the HTML element.<br>Example: if the clicked element is `<a id="myID">Home</a>` <br> The property value is `myID` |
| **Element Class** | The `class` attribute of the HTML element.<br>Example: if the clicked element is `<a class="myClass">Home</a>` <br> The property value is `myClass` |
| **Element Tag** | The tag name of the HTML element.<br>Example: if the clicked element is `<a href="#">Home</a>` <br> The property value is `a` |
| **Element Text** | The text content (`innerText`) of the HTML element. Only applies to the Element Clicked event.<br>Example: if the clicked element is `<a href="#">Home</a>` <br> The property value is `Home` |
| **Element Href** | The `href` attribute, specifying the URL for a link. Only applies to `<a>` tags on the Element Clicked event.<br>Example: if the clicked element is `<a href="https://www.amplitude.com">Home</a>` <br> The property value is `https://www.amplitude.com` |
| **Element Position Left** | Captures the distance of the element from the left of the screen view (in pixels).<br>Example: a value of `600` means the clicked element was 600px from the left of the view screen. |
| **Element Position Top** | Captures the distance of the element from the top of the screen view (in pixels).<br>Example: a value of `400` means the clicked element was 400px from the top of the view screen. |
| **Viewport Height** | Captures the height (in pixels) of the viewport when the element was clicked (not related to the element itself).<br>Example: a value of `900` means the viewport had a height of `900` pixels. |
| **Viewport Width** | Captures the width (in pixels) of the viewport when the element was clicked (not related to the element itself).<br>Example: a value of `1200` means the viewport had a width of `1200` pixels. |
| **Page URL** | Captures the URL of the page where the element was clicked.<br>Example: a value of `https://www.amplitude.com` means that the clicked element was on this page. |
| **Page Title** | Captures the page title of the page where the element was clicked.<br>Example: if the page where the element was clicked has `<title>Amplitude</title>` <br> The value is: `Amplitude` |
| **Element Hierarchy** | Captures DOM elements and attributes of the element clicked and its parent or sibling elements. Used for visual labeling. |
| **Element Selector** | **Deprecated** in favor of Element Hierarchy. Captures a unique CSS selector of the element.<br>Example: if the clicked element is `<a id="myID">Home</a>` <br> The value is `#myID` |
| **Element Attributes** | Captures unique attributes associated with click events through the `dataAttributePrefix` setting.<br>Example: if there is a unique attribute on your HTML elements used by your testing frame work such as `<a data-testid="feature-start">Start</a>` <br> A property on the click exists such as `[Amplitude] Element Attributes.id` with a value of `feature-start` |
| **Element Aria Label** | The `aria-label` of the element, used for interactive elements without visible text. These can further define your click events. <br>Example: if the clicked event is `<button aria-label="Close" onclick="myDialog.close()"></button>` <br> The value is `Close` |
| **Element Parent Label** | The text label in the parent element (or upper ancestors if not found in one-level parent) of the element. <br>Example: if the clicked element is `<div><span>Amplitude</span><a id="myID">Home</a></div>` <br> The value is `Amplitude` |