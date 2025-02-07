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
* Add a button, and customize what happens when users click it.
* Add an image or video. Amplitude places media elements depending on the selected layout.
* Animate the text. Text animation causes any text you have to animate in when the guide appears.

### Popover

A subtle nudge that appears near a contextually relevant element. Popovers are great for quick tips, or for directing users' attention without interrupting their flow.

Popovers offer the same customization options as modals.

### Pin

A persistent marker that stays on screen until a user interacts with it. Pins are best at highlighting key features or providing contextual help users can refer to.

Pins offer different customization options than modals or popovers. Toggle between opening them by default, or start them closed. Choose to show a semi-transparent overlay that highlights the pinned element and dim the rest of the screen, or add an advanced trigger.

### Tooltip

{{partial:admonition type="tip" heading=""}}
Tooltips are available in the Tooltip template, and contain one step.
{{/partial:admonition}}

Tooltips are like pins, but reveal only when a user clicks, taps, or hovers their cursor over it. Tooltips are great for giving inline details about a feature while saving valuable UI real estate.

### Banner 

{{partial:admonition type="tip" heading=""}}
Banners are available in the Banner template, and contain one step.
{{/partial:admonition}}

Banners are full-width blocks that show on either the top or bottom of the page. Use banners for longer-term announcements, status updates, or time-sensitive promotions.

## Properties

These properties apply across form factors, enabling you to customize your guide components. Options available to each property may differ across form factors.

### Position

Position controls where the guide appears on screen.

| Form factor | Options                                                                                                                                                                                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Popover     | Top right, top left, bottom right, bottom left, center                                                                                                                                                                                                                                    |
| Modal       | Center                                                                                                                                                                                                                                                                                    |
| Pins        | Controls position of the pin relative to the target element. Select The position and the alignment of the guide. For example, Position: `Bottom of target` and Alignment: `Left` places the guide below the target element, and aligns the guide's left side with the target's left side. |
| Tooltip     | Specify the side of the target element that the info marker appears. Add additional vertical or horizontal offset as necessary.                                                                                                                                                           |
| Banner      | Top or bottom of the page. Set the **Sticky** option to keep the banner visible while the user scrolls. Choose the Display style: **Inline** to display the banner within the contents of the page, or **Overlay** to float the banner on top of the page contents.                       |

### Steps

Use steps to create multi-step guides. Break down complex processes into smaller, actionable steps that guide users from start to finish.

{{partial:admonition type="tip" heading=""}}
Tooltips and Banners contain one step.
{{/partial:admonition}}

### Blocks

Blocks enable you to make your guide more engaging and powerful. Add a Button CTA, an image, or a video. Blocks align automatically based on the form factor and alignment you set.

#### Buttons

When you add a Button, you can choose what happens when users click or tap that button.

| Action        | Description                                                                                              |
| ------------- | -------------------------------------------------------------------------------------------------------- |
| Visit link    | A link to the specified website opens in a new tab.                                                      |
| Click element | Specify an element on the page that receives a click event when the user clicks the button in the guide. |
| Show guide    | Launch another guide.                                                                                    |
| Show survey   | Launch a survey.                                                                                         |
| Go back       | Go to the previous step in the guide.                                                                    |
| Go forward    | Advance to the next step in the guide.                                                                   |
| Go to step    | Go to the specified step in the guide.                                                                   |

#### Image

Upload an image to include in your experience. The experience's layout determines the image's position.

#### Movie

Paste the URL of a video (YouTube, Vimeo, Loom, Vidyard, or .MP4 file). Like images, layout determines a movie's position.