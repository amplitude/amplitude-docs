---
id: 5a11feec-0efc-453c-9bf1-45d36f57ce81
blueprint: guides_and_survey
title: 'Guide form factors and properties'
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738949006
section: guides
landing: true
landing_blurb: 'Learn about the form factors available to guides, and the customization properties they contain.'
---
Guides and Surveys include five form factors you can chose from. Each form factor has a set of properties that control how it behaves to the end user.

## Form factors

Guides provide five form factors you can use to engage your users. Each form factor shares a similar set of [properties](#properties).

### Modal

Modals are a full-focus experience that takes center stage. Modals are best for delivering important messages or guiding users through a multi-step flow.

Customize your modal with the following:

* Pick a layout. Select classic, horizontal split, or vertical split.
* Add a button, and customize what happens when users click or tap it.
* Add an image or video. Amplitude places media elements depending on the selected layout.
* Animate the text. Text animation causes any text you have to animate in when the guide appears.

Click the three dot menu to access format settings.

| Setting                                | Description                                                       |
| -------------------------------------- | ----------------------------------------------------------------- |
| Content layout <br/> {.tag .web .zero} | Updates the visual ordering of the guide's content.               |
| Title and content alignment            | Changes the alignment of the title and body text.                 |
| Actions bar <br/> {.tag .web .zero}    | Updates the placement and layout of the guide's buttons.          |
| Click/Tap outside to close             | Enables users to click or tap outside of the modal to dismiss it. |
| Text animation                         | Enables the modal's text to animate in with a typewriter effect.  |



### Popover

A subtle nudge that appears near a contextually relevant element. Popovers are great for quick tips, or for directing users' attention without interrupting their flow.

Popovers offer the same customization options as modals.

Click the three dot menu to access format settings.

| Setting                                | Description                                                        |
| -------------------------------------- | ------------------------------------------------------------------ |
| Content layout <br/> {.tag .web .zero} | Updates the visual ordering of the guide's content.                |
| Title and content alignment            | Changes the alignment of the title and body text.                 |
| Actions bar <br/> {.tag .web .zero}    | Updates the placement and layout of the guide's buttons.           |
| Click/Tap outside to close             | Enables users to click or tap outside of the modal to dismiss it.  |
| Z-index <br/> {.tag .web .zero}        | Specify a custom z-index value for the popover.                    |
| Text animation                         | Enables the popover's text to animate in with a typewriter effect. |


### Pin

Pins are persistent markers that remain on screen until a user interacts with it. Pins are best at highlighting key features or providing contextual help users can refer to.

{{partial:admonition type="note" heading="Pins can advance without CTA clicks"}}
When you click on a pin's target element, the tour always advances to the next step. This is different from the "Advanced trigger" setting (described below), which allows you to specify an additional element that can also advance the tour when clicked. The target element's click behavior is built-in you can't disable it, while the advanced trigger is an optional setting.
{{/partial:admonition}}

Pins offer different customization options than modals or popovers. Toggle between opening them by default, or start them closed. Choose to show a semi-transparent overlay that highlights the pinned element and dim the rest of the screen through the **Show mask**.

Pins can use the following position settings:
- Auto
- Top of target
- Bottom of target
- Left of target
- Right of target

This setting specifies where the pin message should render with respect to its target. For example, if the position is set to "Left of target", Amplitude tries to show the pin left of the target element. If the location of the target element is incompatible with the specified position, then Amplitude automatically tries a different location. For example, if the element is on the far-left side of the page, then the pin can't render left of the element. In this situation, Amplitude attempts to render the pin above, below, or to the right of the target element. In the case where the pin can't be displayed in any of the four positions, the pin isn't rendered.

Click the three dot menu for the pin to access format settings.

| Setting                                  | Description                                                                                                |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Open by default                          | Enables the pin to open without user interaction. If disabled, users must click or tap the pin to open it. |
| Show mask                                | Enables a background mask when the pin is open to help draw the user's focus.                              |
| Content layout <br/> {.tag .web .zero}   | Updates the visual ordering of the guide's content.                                                        |
| Title and content alignment              | Changes the alignment of the title and body text.                                                          |
| Actions bar <br/> {.tag .web .zero}      | Updates the placement and layout of the guide's buttons.                                                   |
| Click/Tap outside to close               | Enables users to click or tap outside of the modal to dismiss it.                                          |
| Z-index <br/> {.tag .web .zero}          | Specify a custom z-index value for the popover.                                                            |
| Image Width                              | Define the width of the pin icon or image in pixels.                                                       |
| Text animation                           | Enables the pin's text to animate in with a typewriter effect.                                             |
| Advanced trigger <br/> {.tag .web .zero} | Enables advancing the guide to another step when the the user interacts with the element you specify.      |


### Tooltip

{{partial:admonition type="tip" heading=""}}
Tooltips are available in the Tooltip template, and contain one step.
{{/partial:admonition}}

Tooltips are like pins, but reveal only when a user clicks, taps, or hovers their cursor over it. Tooltips are great for giving inline details about a feature while saving valuable UI real estate.

| Setting                                  | Description                                                                                           |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Content layout <br/> {.tag .web .zero}   | Updates the visual ordering of the guide's content.                                                   |
| Title and content alignment              | Changes the alignment of the title and body text.                                                     |
| Actions bar <br/> {.tag .web .zero}      | Updates the placement and layout of the guide's buttons.                                              |
| Z-index <br/> {.tag .web .zero}          | Specify a custom z-index value for the popover.                                                       |
| Pointer                                  | Select the style with which the dialog relates to the marker.                                         |
| Image Width                              | Define the width of the tooltip icon or image in pixels.                                              |
| Text animation                           | Enables the tooltip's text to animate in with a typewriter effect.                                    |
| Advanced trigger <br/> {.tag .web .zero} | Enables advancing the guide to another step when the the user interacts with the element you specify. |
| Show on                                  | Select the trigger that causes the tooltip to appear.                                                 |
| Marker                                   | Select the appearance of the marker that launches the tooltip.                                        |

### Banner

{{partial:admonition type="tip" heading=""}}
Banners are available in the Banner template, and contain one step.
{{/partial:admonition}}

Banners are full-width blocks that show on either the top or bottom of the page. Use banners for longer-term announcements, status updates, or time-sensitive promotions.

| Setting                                | Description                                                                                                  |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Sticky <br/> {.tag .web .zero}         | Keeps the banner visible while the user scrolls.                                                             |
| Display style <br/> {.tag .web .zero}  | Controls the way in which the banner interacts with the page's content. Mobile banners support overlay only. |
| Z-index <br/> {.tag .web .zero}        | Specify a custom z-index value for the popover.                                                              |
| Text animation                         | Enables the banner's text to animate in with a typewriter effect.                                            |


### Checklist {.tag .web}

Checklists provide a form that helps users track progress toward a goal. They contain one header and one or more checklist items. Use checklist items to trigger actions

## Element selector

When you configure guides with pins, tooltips, or element-based triggers, you need to specify which element on your page to target. The element selector helps you identify and target specific page elements.

### How the element selector works

Amplitude's visual element selector automatically identifies the most stable CSS selector for the element you choose. This ensures your guide continues to work even if minor page changes occur.

To use the visual selector:

1. Click **Test and Preview** in the guide builder
2. Navigate to the page containing your target element
3. Click the element you want to target
4. Amplitude automatically generates a CSS selector for that element

#### Selecting nested elements

To select nested elements (elements inside other elements), use the Alt key (Option key on Mac) while hovering over elements:

1. Click **Test and Preview**
2. Hover over the parent element
3. Hold the Alt/Option key
4. Continue hovering to drill down into nested child elements
5. Click to select the desired nested element

This lets you precisely target specific elements within complex page structures, such as buttons within cards or icons within menus.

### Override or provide your own selector

If you prefer to specify your own selector or need more control, you can manually enter a CSS or XPath selector:

1. In the element selector field, paste your CSS selector or XPath expression
2. Choose your selection strategy:
   - **CSS Selector**: Standard CSS selector syntax (for example, `#submit-button`, `.primary-cta`)
   - **XPath**: XPath expression for more complex targeting (for example, `//button[@id='submit']`)
3. Optionally, add fallback text that Amplitude uses if the selector doesn't find a match
4. Test your selector with **Test and Preview** to confirm it targets the correct element

**Examples of custom selectors:**

- CSS Selector: `.header-navigation > .menu-item:first-child`
- XPath: `//div[@class='container']//button[contains(text(), 'Submit')]`

{{partial:admonition type='tip' heading='Best practices for custom selectors'}}
* Use stable attributes like IDs or data attributes that are less likely to change
* Avoid selectors that depend on specific positioning (like `:nth-child`) unless necessary
* Test your selectors across different pages and screen sizes
* Consider adding data attributes specifically for guide targeting to ensure reliability
{{/partial:admonition}}

## Properties

These properties apply across form factors, enabling you to customize your guide components. Options available to each property may differ across form factors.

### Position

Position controls where the guide appears on screen.

| Form factor                              | Options                                                                                                                                                                                                                                                                                   |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Popover                                  | Top right, top center, top left, right center, bottom right, bottom center, bottom left, left center, center                                                                                                                                                                                                                                    |
| Modal                                    | Center                                                                                                                                                                                                                                                                                    |
| Pins                                     | Controls position of the pin relative to the target element. Select The position and the alignment of the guide. For example, Position: `Bottom of target` and Alignment: `Left` places the guide below the target element, and aligns the guide's left side with the target's left side. |
| Tooltip                                  | Specify the side of the target element that the info marker appears. Add additional vertical or horizontal offset as necessary.                                                                                                                                                           |
| Banner                                   | Top or bottom of the page. Set the **Sticky** option to keep the banner visible while the user scrolls. Choose the Display style: **Inline** to display the banner within the contents of the page, or **Overlay** to float the banner on top of the page contents.                       |
| Checklist header <br/> {.tag .web .zero} | Bottom left or Bottom right, in relation to the page.                                                                                                                                                                                                                                     |

### Steps

Use steps to create multi-step guides. Break down complex processes into smaller, actionable steps that guide users from start to finish.

{{partial:admonition type="tip" heading=""}}
Tooltips and Banners contain one step.
{{/partial:admonition}}

### Blocks

Blocks enable you to make your guide more engaging and powerful. Add a Button CTA, an image, or a video. Blocks align automatically based on the form factor and alignment you set.

#### Buttons

When you add a Button, you can choose what happens when users click or tap that button. Both primary and secondary buttons support all actions, including conditional logic.

| Action                     | Description                                                                                                                                                                       |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Visit link                 | A link to the specified website opens in a new tab.                                                                                                                               |
| Click/Tap element          | Specify an element on the page that receives a click event when the user clicks the button in the guide.                                                                          |
| Show guide                 | Launch another guide.                                                                                                                                                             |
| Show survey                | Launch a survey.                                                                                                                                                                  |
| Go back                    | Go to the previous step in the guide.                                                                                                                                             |
| Go forward                 | Advance to the next step in the guide.                                                                                                                                            |
| Go to step                 | Go to the specified step in the guide.                                                                                                                                            |
| Evaluate conditional logic | Execute different actions based on user properties or survey responses. Create conditions to personalize the button's behavior for different users. Go to [Conditional Logic](/docs/guides-and-surveys/conditional-logic) for more information. |
| Run callback               | Trigger a callback function defined in your Guides and Surveys instrumentation. For more information, go to [Register a callback](/docs/guides-and-surveys/sdk#register-a-callback) |
| Submit app store rating request <br/> {.tag .mobile .zero} | Prompt the user to rate your app using the native in-app flow (App Store for iOS and Google Play for Android). If the rating request is unsuccessful and you provide the app identifier in the survey configuration, the request falls back to the platform’s app store page. |

{{partial:admonition type='note'}}
[Apple](https://developer.apple.com/documentation/storekit/requesting-app-store-reviews) and [Google](https://developer.android.com/guide/playcore/in-app-review) control their own native app review display and may override requests for review from your guide.
{{/partial:admonition}}

#### Mark step complete when
Only checklists have the **Mark step complete when** option. Amplitude marks a checklist step complete when one of the following activies is performed:
- `Button is clicked`
- `Page is visited`
- `Element is clicked`
- `Event is tracked`

For each of these options, the checklist step updates from "incomplete" to "complete" only if the action happens on the client while the checklist is visible. For example, if Amplitude tracks an event server side or the event happens before the checklist is shown, the step won't be marked completed.

#### Image

Upload an image to include in your experience. The experience's layout determines the image's position.

#### Movie

Paste the URL of a video (YouTube, Vimeo, Loom, Vidyard, or .MP4 file). Like images, layout determines a movie's position.
