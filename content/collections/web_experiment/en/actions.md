---
id: 3ef0ccc6-5e0f-435b-9184-edb809f19210
blueprint: web_experiment
title: 'Web Experiment actions'
updated_by: 5817a4fa-a771-417a-aa94-a0b1e7f55eae
updated_at: 1729195880
---
Actions define how variants modify your site. Actions relate to variants rather than a specific page, and are applied to specific [Pages](/docs/web-experiment/pages) to control exactly where they apply.

Experiment applies variant actions during evaluation. This happens on the initial page load and any time state pushes to or pops from the session history. History state changes also cause the SDK to revert all applied element change and custom code actions before reevaluating and reapplying actions with the update page in mind.

## Element changes

Element changes modify existing elements on your site. Web Experiment applies these changes by editing the inner text of an element or appending style to the element based on the change you make in the visual editor.

The visual editor supports the following element changes:

- **[Display](/docs/web-experiment/set-up-a-web-experiment#display-and-visibility)**: Show or remove the element from the DOM.
- **[Visibility](/docs/web-experiment/set-up-a-web-experiment#display-and-visibility)**: Show or hide the element.
- **[Text](/docs/web-experiment/set-up-a-web-experiment#text)**: Update an element's inner text, color, and size.
- **[Background](/docs/web-experiment/set-up-a-web-experiment#background)**: Update a background image or color.
- **[Move](/docs/web-experiment/set-up-a-web-experiment#move)**: Move the position of an element.

## URL redirect

URL redirects load a new URL when a targeted user lands on a targeted page in your experiment. URL redirects happen on the client, and aren't the same as a server redirect with a `3xx` response.

URL redirects retain any query parameters on the original page URL. For example, you create a variant to redirect users from `https://example.com` to `https://example.com/get-started`. If a user clicks a link `https://example.com?utm_source=facebook`, Web Experiment redirects that user to `https://example.com/get-started?utm_source=facebook`.

{{partial:admonition type="note"}}
It's possible for the URL redirect test to have a [Sample Ratio Mismatch (SRM)](/docs/feature-experiment/troubleshooting/sample-ratio-mismatch). Redirect tests work by loading the redirected page, ideally as fast as possible. The sequence for this is:

**Control flow**
- Load control page HTML.
- Browser parses and loads dependencies (including the experiment script).
- Experiment script initializes, evaluates the user, and logs an impression if they're in control.

**Treatment flow**
- Load control page HTML.
- Browser parses and loads dependencies (including the experiment script).
- Experiment script evaluates the user → assigns them to treatment → triggers a redirect.
- Load treatment page HTML.
- Browser parses and loads dependencies (including the experiment script again).
- Experiment script initializes and logs the impression for treatment.

Because the treatment flow involves more steps before the impression is logged, users who bounce quickly (for example, after clicking an ad by mistake) are more likely to be counted in control than in treatment. This imbalance can show up as Sample Ratio Mismatch (SRM).

Researchers have observed similar effects: if treatment slows performance, more users may leave before logs are generated, leading to fewer recorded impressions. Conversely, faster performance can lead to more recorded users in treatment than in control.

**Further reading:**
* [Causes of SRM](https://www.lukasvermeer.nl/srm/docs/causes/)
* [Pitfalls in Metric Interpretation (KDD 2017)](https://exp-platform.com/Documents/2017-08%20KDDMetricInterpretationPitfalls.pdf)
* [Diagnosing SRM in Online Experiments (KDD 2019)](https://exp-platform.com/Documents/2019_KDDFabijanGupchupFuptaOmhoverVermeerDmitriev.pdf)

**What to do**

* **Reduce latency in evaluation**. The longer the delay before impressions are logged, the more pronounced the SRM effect.
* **Use local evaluation where possible**. For example, target only on browser properties instead of slower remote attributes like Country. This reduces the chance that users drop off before logging. Here’s a configuration example in Amplitude Experiment.

{{/partial:admonition}}

## Custom code

{{partial:admonition type="note"}}
Custom code is available on Growth and Enterprise plans only.
{{/partial:admonition}}

Web Experiment applies custom code actions as an optional part of the element changes action. With the custom code action, write custom JavaScript, CSS, and HTML for your site to add elements or customize your site in ways the visual editor doesn't support.

You apply custom code to specific [Pages](/docs/web-experiment/pages) using the **Apply to** dropdown, allowing you to run different code depending on which Page is active.

{{partial:admonition type="tip"}}
You can use custom code in tandem with the [element changes](#element-changes). For example, An engineer could build a custom code component with placeholder text. A non-technical user could then use the visual editor to edit the placeholder text without touching the custom code.
{{/partial:admonition}}

Web Experiment applies custom code to your site in the following order:

1. Adds **CSS** in a `<style>` tag in the page's `<head>`.
2. Parses **HTML** into a DOM element.
3. Wraps **JavaScript** in a function, and adds it to a `<script>` tag in the page's `<head>`.
4. Calls the wrapped **JavaScript** function and passes parsed HTML and utilities as arguments.

### JavaScript

Web Experiment wraps any custom JavaScript in a function, and calls it when the variant action applies. The function has two parameters you can use with your custom JavaScript code.

- `html`: The custom HTML code parsed as a DOM element object.
- `utils`: An object that contains utility functions you can use in your custom code.

#### Utilities

Web Experiment provides the following utilities:

- `waitForElement(selector: string): Promise<Element>`: Returns a promise that resolves when it finds an element that matches the selector in the DOM. Uses `MutationObserver` to listen for elements.

- `remove: (()=> void) | undefined`: A function that you can set inside the JavaScript you inject. Web Experiment calls this function on page change, when Amplitude reevaluates experiments and reapplies variants.

    This function can be useful for cleaning up changes to the page in single page apps, where the page doesn't fully reload. For example, if you inject an HTML element on a specific page, set this function to remove that element when the page changes.

### HTML

Web Experiment parses custom HTML as a DOM element, and passes it to the custom JavaScript code to insert it. This HTML can use existing CSS styles and classes, or new CSS that you define.

### CSS

Custom CSS styles you can use to manipulate existing CSS classes and styles, or add new styles for elements you add with custom HTML. Web Experiment adds custom CSS to a `<style>` tag in the page's `<head>` element.

### Examples

{{partial:admonition type="tip"}}
Generative AI like ChatGPT or equivalents can create HTML and CSS for simple elements. The modal and banner examples below were both initially generated initially by ChatGPT, then modified.
{{/partial:admonition}}

#### Insert an element

To insert an element onto your page, follow this simple pattern.

1. Write the HTML and CSS for the element you want to add to the page.
2. Identify the selector of the part element you want to insert your new element into. This is often just the `body`.
3. Paste the following JavaScript code, and update `PARENT_SELECTOR` with the parent element selector from step 2.

    ```js
    utils.waitForElement("PARENT_SELECTOR")
      .then(function (e) {
        e.appendChild(html);
        utils.remove = function () {
            html.remove();
        }
      });
    ```

If you want to insert your element into the parent element at a specific position, use `insertBefore()` instead of `appendChild()`.

#### Add a banner

This example adds a discount code banner to the top of the page.

{{partial:tabs tabs="JS, CSS, HTML"}}
{{partial:tab name="JS"}}
```js
utils.waitForElement("body")
  .then(function (e) {
    e.insertBefore(html, e.firstChild);
    utils.remove = function () {
      html.remove();
    }
  });
```
{{/partial:tab}}
{{partial:tab name="CSS"}}
```css
.announcement-banner {
 background-color: #fafafa;
 color: #333;
 padding: 10px;
 text-align: center;
 font-family: Arial, sans-serif;
 border-bottom: solid #e5e5e5;
 border-bottom-width: 1px;
}

.announcement-banner p {
 margin: 0;
 font-size: 16px;
}
```
{{/partial:tab}}
{{partial:tab name="HTML"}}
```html
<div class="announcement-banner">
 <p>🎉 Big Sale: Get 25% off on all items! Use code <strong>SAVE25</strong></p>
</div>
```
{{/partial:tab}}
{{/partial:tabs}}

#### Add a modal

This example adds a modal to the page after a 1 second delay.

{{partial:tabs tabs="JS, CSS, HTML"}}
{{partial:tab name="JS"}}
```js
var modal = html;
utils.waitForElement("body").then(function (body) {

    // Append the modal element to the body.
    body.appendChild(modal);

    // Get the close button element
    var closeBtn = document.getElementsByClassName("close")[0];

    // When the user clicks on the close button (x), close the modal
    closeBtn.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Show the modal after a 1 second delay.
    window.setTimeout(function () {
        modal.style.display = "block";
    }, 1000);

    // Remove the modal on teardown.
    utils.remove = function () {
        modal.remove();
    }
});
```
{{/partial:tab}}
{{partial:tab name="CSS"}}
```css
/* TODO: Style the action button */
.cta-btn {
    color: white;
    background-color: #000;
    border: #000 solid 1px;
}
.cta-btn:hover {
    color: black;
    background-color: #fff;
    border: #000 solid 1px;
}

/*
 * Modal Boilerplate
 */

/* Modal container */
.modal {
    display: none; /* Hidden by default */
    position: fixed;
    z-index: 1; /* Stay on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
}

/* Modal content box */
.modal-content {
    background-color: #fff;
    margin: 15% auto; /* Center the modal */
    padding: 20px;
    border-radius: 4px;
    border: 1px solid #888;
    width: 40%; /* Width of the modal */
    max-width: 800px;
    position: relative;
}

/* Close button */
.close {
    color: #999;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: #000;
    text-decoration: none;
    cursor: pointer;
}

/* Modal header */
.modal-header {
    margin: 0;
    padding: 0 0 15px 0;
    font-size: 24px;
    font-weight: bold;
}

/* Modal body */
.modal-body {
    margin: 20px 0;
    font-size: 16px;
}

/* Call to Action container */
.cta-container {
    text-align: right;
}

/* Call to Action button */
.cta-btn-base {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    bottom: 20px;
    right: 20px;
}
```
{{/partial:tab}}
{{partial:tab name="HTML"}}
```html
<div class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2 class="modal-header">
            <!-- TODO: Update modal header text -->
            Join the mailing list!
        </h2>
        <p class="modal-body">
            <!-- TODO: Update modal body text -->
            To get updates on new posts to the blog
            join the exclusive mailing list today!
        </p>
        <div class="cta-container">
            <!-- TODO: Update button link -->
            <a href="https://example.com">
                <button class="cta-btn cta-btn-base">
                    <!-- TODO: Update CTA button text -->
                    Subscribe
                </button>
            </a>
        </div>
    </div>
</div>
```
{{/partial:tab}}
{{/partial:tabs}}
