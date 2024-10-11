---
id: 3ef0ccc6-5e0f-435b-9184-edb809f19210
blueprint: web_experiment
title: Web Experiment Actions
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1728666798
---

Actions define how variants modify your site. They relate to variants rather than a specific page, and apply to all pages that you target in your experiment.

Experiment applies variant actions during evaluation. This happens on the initial page load and any time state pushes to or pops from the session history. History state changes also cause the SDK to revert all applied element change and custom code actions before reevaluating and reapplying actions with the update page in mind.

## Element changes

Element changes modify existing elements on your site. Web Experiment applies these changes by editing the inner text of an element or appending style to the element based on the change you make in the visual editor.

The visual editor supports the following element changes:

- Display: Show or remove the element from the DOM.
- Visibility: Show or hide the element.
- Text: Update an element's inner text, color, and size.
- Background: Update a background image or color.

## URL redirect

URL redirects load a new URL when a targeted user lands on a targeted page in your experiment. URL redirects happen on the client, and aren't the same as a server redirect with a `3xx` response.

URL redirects retain any query parameters on the original page URL. For example, you create a variant to redirect users from `https://example.com` to `https://example.com/get-started`. If a user clicks a link `https://example.com?utm_source=facebook`, Web Experiment redirects that user to `https://example.com/get-started?utm_source=facebook`.

## Custom code

Web Experiment applies custom code actions as an optional part of the element changes action. With the custom code action, write custom JavaScript, CSS, and HTML for your site to add elements or customize your site in was the visual editor doesn't support.

Web Experiment applies custom code to your site in the following order:

1. Adds **CSS** in a `<style>` tag in the page's `<head>`.
2. Parses **HTML** into a DOM element.
3. Wraps **JavaScript** in a function, and adds it to a `<script>` tag in the page's `<head>`.
4. Calls the wrapped **JavaScript** function and passes parsed **HTML** and utils as arguments.

### JavaScript

Web Experiment wraps any custom JavaScript in a function, and calls it when the variant action applies. The function has two parameters you can use with your custom JavaScript code.

- `html`: The custom HTML code parsed as a DOM element object.
- `utils`: An object that contains utility functions you can use in your custom code.

#### Utils

Web Experiment provides the following utilities:

- `waitForElement(selector: string): Promise<Element>` returns a promise that resolves when it finds an element that matches the selector in the DOM. Uses `MutationObserver` to listen for elements.

- `remove: (()=> void) | undefined` is a function that you can set inside the JavaScript you inject. Web Experiment calls this function on page change, when Amplitude reevaluates experiments and reapplies variants.

    This function can be useful for cleaning up changes to the page in single page apps, where the page doesn't fully reload.

    For example, if you inject an HTML element on a specific page, set this function to remove that element when the page changes.

### HTML

Web Experiment parses custom HTML as a DOM element, and passes it to the custom JavaScript code to insert it. This HTML can use existing CSS styles and classes, or new CSS that you define.

### CSS

Custom CSS styles you can use to manipulate existing CSS classes and styles, or add new styles for elements you add with custom HTML. Web Experiment adds custom CSS to a `<style>` tag in the page's `<head>` element.