---
id: 614cd6a1-ed04-4be0-924e-bf6f4fa6f58e
blueprint: guides_and_survey
title: Themes
author: 0c3a318b-936a-4cbd-8fdf-771a90c297f0
updated_by: b6c6019f-27db-41a7-98bb-07c9b90f212b
updated_at: 1750979108
landing: true
landing_blurb: 'Discover how themes can enforce your brand identity in the guides and surveys you create.'
---
Guides and Surveys should match your branding and feel like part of your product. Themes gives you control over your Guides and Survey's appearance.

Themes ensure that every in-product message matches your colors, typography, and aesthetic. Whether it's a subtle guide, or a full page survey, it should look and feel like an extension of your product, not a random popup.

From buttons to borders, animations to background colors, you're in control of how users view guides and surveys.

{{partial:admonition type="note" heading="Themes differ by platform"}}
Guides and Surveys on web and mobile have different themes. Themes aren't compatible across platform.
{{/partial:admonition}}

## Create a new theme

To create a new Guides and Surveys theme:

1. In Amplitude, navigate to *Guides and Surveys > Theme*.
2. Click **Create New**. The Theme editor appears.
3. Customize your theme with the Brand and Component controls described below.
4. Click **Save** at any time to save your progress.
5. Click **Publish** to enable your theme for selection by a guide or survey.

{{partial:admonition type="note" heading="Updating a theme"}}
When you publish an update an existing theme, those updates apply to any guide or survey that uses that theme. 
{{/partial:admonition}}

{{partial:admonition type="tip" heading="Customize a specific guide or survey"}}
If you need to customize the theme for a single guide or survey without affecting others, use the **Customize only this guide** or **Customize only this survey** option in the guide or survey editor. This creates a unique theme version for that specific experience, allowing you to make one-off customizations without changing the base theme.
{{/partial:admonition}}

## Theme viewer

The Theme Viewer shows how the theme appears when applied to a guide or survey. When editing a theme, you can choose the specific guide or survey you want to preview, to see how changes affect your real-world content.

Theme previews look different depending on where you preview them. When you build a guide or survey, theme previews show the published version. When editing themes, previews display draft changes and let you choose a guide or survey to preview against. This helps ensure consistency between what you see when building guides and what your users experience in your product.

At the top of the viewer, toggle between the [brand](#brand-controls) and [component](#component-editor) editors, toggle between light and dark mode, and cancel, save, and publish your changes.

## Brand controls

Use the Theme Editor to customize elements of your brand and style. 

{{partial:admonition type="tip" heading="CSS properties"}}
![](statamic://asset::help_center_conversions::guides-surveys/web-only.svg){.inline .my-0} Configure your branding using the same values you defined in your site's CSS. For example, specify font size in px, em, rem, or percent values.
{{/partial:admonition}}

### Accent

Accent represents your brand's primary color. This color appears on primary buttons and selected options.

In this example, the primary color is `#48705C`.

![A selection option where the primary color is a dark green and the accent color is a complementary, lighter green. ](statamic://asset::help_center_conversions::guides-surveys/primary-color.png)

### Typography

Set the default typeface of your theme. Choose from the [Google font library](https://fonts.google.com/), or specify a custom typeface you've already defined on your site.

To use a font natively in your mobile Guides and Surveys, be sure to include the full font family in your app project and use a consistent file name for the font.

#### Android
- Place font files in the `/res/font` directory of your project.  
- Use a clear and consistent naming convention:
  - `[fontNameWithoutSpaces]_[style].[fileExtension]`
  - For example: `adventpro_italic.ttf`
- Supported formats: **XML**, **TTF**.  
- After adding, the font can be referenced directly in your theme setup.  

For more information, go to Android's [Font resources](https://developer.android.com/guide/topics/resources/font-resource).

#### iOS
- Add font files to your Xcode project.  
- Use a clear and consistent naming convention:
  - `[FontName]-[Style].[fileExtension]`
  - For example: `Lora-Italic.ttf`
- Register the fonts in your app's `.plist` file.  
- Supported formats: **TTF**, **OTF**.  

For more information, go to Apple's [Adding a custom font to your app](https://developer.apple.com/documentation/uikit/adding-a-custom-font-to-your-app).  

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

| Widget        | Available dimension                                           |
| ------------- | ------------------------------------------------------------- |
| Modal         | Max content width for modals and mobile carousels on tablets  |
| Popover / pin | Max content width for pins                                    |
| Tooltip       | Max width for tooltips                                        |
| Checklist     | Max width and max height for checklists                       |

### Animations

Select the animation that each widget type uses to appear on screen, along with duration (in milliseconds) where applicable.

## Component editor

Components are reusable elements that you use across your guides and surveys. With components, you only specify the contents one time. You can then apply them anywhere in the theme.

Each component includes states, for example default, hover, or focus, that you can customize.

## Theme component usage

Theme components appear throughout guides and surveys. This section outlines where each component type appears in the application.

### Buttons

Buttons appear in the following locations:

- **Primary buttons**: The main call-to-action (CTA) buttons in guides and surveys. These buttons use the accent color you define in your theme.
- **Secondary buttons**: Alternative actions or less prominent CTAs. These buttons use the secondary color settings.
- **Button states**: All buttons support default, hover, active, and disabled states that you can customize in the component editor.

Buttons appear in:
- Guide steps with action buttons
- Survey submission buttons
- Modal dialogs
- Banner actions
- Form submissions

### Cards

Cards group and display content in guides and surveys. Card styling applies to:

- Guide step containers
- Survey question containers
- Content blocks within guides
- Information panels
- Result displays in surveys

Card properties (corner radius, padding, gaps, shadow) apply uniformly to all card elements in your guides and surveys.

### Form controls

Form controls are interactive elements in surveys and forms. These controls appear in:

- **Text inputs**: Short and long text input fields for survey responses.
- **Select dropdowns**: Dropdown menus for selecting from multiple options.
- **Checkboxes**: Multiple choice options where users can select more than one answer.
- **Radio buttons**: Single choice options where users can select only one answer.
- **Rating components**: Star ratings, emoji ratings, and numeric ratings for feedback.
- **List elements**: Ordered and unordered lists in survey questions.

All form controls share the same styling properties (height, corner radius, padding, gaps, shadow, focus ring) that you configure in the Form controls section.

### Widgets

Widgets are container elements that display guides and surveys. Each widget type has specific dimension settings:

- **Modals**: Full-screen or centered dialog boxes that appear over your application. Appears for multi-step guides, surveys, and important announcements.
- **Popovers / Pins**: Small, contextual elements that appear near specific UI elements. Appears for tooltips, hints, and inline guidance.
- **Tooltips**: Small informational boxes that appear when users hover over or interact with elements. Appears for contextual help and explanations.
- **Checklists**: Interactive lists that users can check off as they complete tasks. Appears for onboarding flows and task completion guides.

### Borders

Border colors apply to:

- Form control outlines
- Card edges
- Button borders
- Input field borders
- Separator lines between content sections

Border colors support primary, primary hover, and disabled states that you can customize.

### Backgrounds

Background colors apply to:

- Card backgrounds
- Form control backgrounds
- Button backgrounds (primary, secondary, and their hover states)
- Disabled element backgrounds
- Widget container backgrounds

Background settings support primary, primary hover, secondary, secondary hover, and disabled states.

### Typography

Typography settings apply to all text elements in guides and surveys, including:

- Guide step titles and descriptions
- Survey questions and instructions
- Button labels
- Form control labels
- Card content text
- Widget headers and body text

The typography you set becomes the default font for all text in guides and surveys that use your theme.

### Animations

Animations control how widgets appear on screen. Each widget type can have its own animation:

- **Modal animations**: Control how modals enter and exit the screen.
- **Popover / Pin animations**: Control how contextual elements appear.
- **Tooltip animations**: Control how tooltips fade in and out.
- **Checklist animations**: Control how checklist items appear.

Animation duration settings (in milliseconds) control the speed of these transitions.

### Content colors

Content colors apply to text and link elements:

- **Primary color**: Used for main text content.
- **Secondary color**: Used for secondary text and labels.
- **Disabled color**: Used for disabled text and inactive elements.
- **Link color**: Used for clickable links in guide and survey content.
- **Link hover color**: Used when users hover over links.
- **Link visited color**: Used for links that users have already clicked.
- **Highlight color**: Used to emphasize important text or selections.

## Advanced customization with Custom CSS

[Custom CSS](/docs/guides-and-surveys/custom-css) gives you control over specific elements using CSS class selectors for styling beyond what themes provide. Custom CSS is available for web SDKs only.

Amplitude recommends using themes for most styling. Use Custom CSS when themes don't provide the control you need.
