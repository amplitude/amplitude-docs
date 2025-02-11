---
id: 614cd6a1-ed04-4be0-924e-bf6f4fa6f58e
blueprint: guides_and_survey
title: Themes
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_at: 1738949395
landing: true
landing_blurb: 'Discover how themes can enforce your brand identity in the guides and surveys you create.'
---
Guides and Surveys should match your branding and feel like part of your product. Themes gives you control over your Guides and Survey's appearance.

Themes ensure that every in-product message matches your colors, typography, and aesthetic. Whether it's a subtle guide, or a full page survey, it should look and feel like an extension of your product, not a random popup.

From buttons to borders, animations to background colors, you're in control of how users view guides and surveys.

## Create a new theme

To create a new Guides and Surveys theme:

1. In Amplitude, navigate to *Guides and Surveys > Theme*.
2. Click **Create New**. The Theme editor appears.
3. Customize your theme with the Brand and Component controls described below.
4. Click **Save** at any time to save your progress.
5. Click **Publish** to apply your theme to any guides or surveys you've already created.

## Theme viewer

The Theme Viewer updates as you make adjustments to provide an up-to-date representation of your theme as you work.

At the top of the viewer, toggle between the [brand](#brand-controls) and [component](#component-editor) editors, toggle between light and dark mode, and cancel, save, and publish your changes.

## Brand controls

Use the Theme Editor to customize elements of your brand and style. 

{{partial:admonition type="tip" heading="CSS properties"}}
Configure your branding using the same values you defined in your site's CSS. For example, specify font size in px, em, rem, or percent values.
{{/partial:admonition}}

### Accent

Accent represents your brand's primary color. This color appears on primary buttons and selected options.

In this example, the primary color is set to `#48705C`.

![](statamic://asset::help_center_conversions::guides-surveys/primary-color.png)

### Typography

Set the default type face of your theme. Choose from the [Google font library](https://fonts.google.com/), or specify a custom type face you've already defined on your site.

{{partial:admonition type="note" heading="Font previews"}}
Custom fonts you add that aren't part of Google Fonts don't appear in the theme preview.
{{/partial:admonition}}

### Content

Define the supplementary colors that complete your brand's pallette.

* Primary color      
* Secondary color    
* Disabled color     
* Link color         
* Link hover color   
* Link visited color 
* Highlight color    

### Border

Specify the color of element borders in each of the following states:

* Primary color      
* Primary hover color
* Disabled color     

### Background

Update the background color of elements in the specified state.

Set each of the following background variants:

* Primary color         
* Primary hover color   
* Secondary color       
* Secondary hover color 
* Disabled color        

### Form controls

Customize the appearance of the interactive elements in your guides or surveys.

Adjust the following, which apply to all form elements:

* Height
* Corner radius
* Padding
* Gaps
* Shadow
* Shadow color
* Background
* Active background
* Focus ring color
* Focus ring width

### Cards

Specify how individual cards display on screen. Adjust the following, which applies to all cards:

* Corner radius
* Padding
* Gaps
* Shadow
* Shadow color

### Widget dimensions

Specify the maximum dimensions for each type of widget.

| Widget        | Available dimension |
| ------------- | ------------------- |
| Modal         | Max content width   |
| Popover / pin | Max content width   |
| Tooltip       | Max width           |
| Checklist     | Width, Max-height   |

### Animations

Select the animation that each widget type uses to appear on screen, along with duration (in milliseconds) where applicable.

## Component editor

Components are reusable elements that you use across your guides and surveys. They let you specify the element properties once, and have them apply anywhere in the theme.

Each component includes states, for example default, hover, or focus, that you can customize.