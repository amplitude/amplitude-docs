---
id: 5757d120-a967-40f9-bc00-ab4839b2eee1
blueprint: data
title: 'Autocapture Events and Properties'
this_article_will_help_you:
  - 'Understand the specific events and properties used in Autocapture'
landing: false
exclude_from_sitemap: false
updated_by: 3f7c2286-b7da-4443-a04f-7c225af40254
updated_at: 1755185163
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

| Property Name | Description |
|------------|----------|
| **Element ID**         | The ID attribute of the HTML element. For example, if the element clicked was <br> `<a id="myID">Home</a>` <br> The property value is: `myID`.  |
| **Element Class**          | The class attribute of the HTML element. For example, if the element clicked was: <br>
 `<a class="myClass">Home</a>` <br> The property value is: `myClass`
  |
| **Element Tag**          | The tag name of the HTML element.
For example, if the element clicked was:
<a href=”#”>Home</a>
The property value would be: a
  |
| **Element Text**          | The text content (innerText) of the HTML element. Only applies to the Element Clicked event.
For example, if the element clicked was:
<a href=”#”>Home</a>
The property value would be: Home
  |
| **Element Href**         | The href attribute, specifying the URL for a link. Only applies to <a> tags on the Element Clicked event.
For example, if the element clicked was:
<a href=”https://www.amplitude.com”>Home</a>
The property value is: https://www.amplitude.com |
| **Element Position Left**    |  Captures the distance of the element from the left of the screen view, in pixels. <br> For example, a value of 600 means the element clicked was 600 pixels from the left of the screen view.   |
| **Element Position Top**      |     |
| **Viewport Height**       |     |
| Viewport Width            |     |
| Page URL                  |     |
| Page Title                |     |
| Element Hierarchy         |     |
| Element Selector          |     |
| Element Attributes        |     |
| Element ARIA Label        |      |
| Element Parent Label      |     |