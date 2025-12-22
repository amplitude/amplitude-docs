---
id: 7f642b6c-723e-4a61-8fca-94c859eac7fc
blueprint: guides_and_survey
title: 'Custom CSS'
---

Amplitude provides two options for customizing the look and feel of your guides and surveys. [Themes](/docs/guides-and-surveys/themes) provide control over the appearance of your guides and surveys. Custom CSS offers additional fine-grained control for specific styling needs that themes can't address. Amplitude recommends using themes for most customizations, as they offer better flexibility and backward compatibility.

{{partial:admonition type="note" heading="Web SDK only"}}
Custom CSS is available for the web SDK. Mobile SDKs (iOS, Android, React Native) don't support custom CSS.
{{/partial:admonition}}

## Overview

The Guides and Surveys SDK adds CSS classes to form factor elements, enabling you to target them with CSS. These selectors:

- Provide stable targets for custom styling
- Focus on container and parent elements
- Work alongside existing theme settings

## Class selectors

Use CSS class selectors to target Guides and Surveys elements:

```css
/* Target banner container */
.amplitude-engagement-banner-container {
  background-color: #f0f0f0;
}

/* Target modal overlay */
[data-amplitude-engagement-modal-overlay] {
  background-color: rgba(0, 0, 0, 0.8);
}
```

### Form factor containers

| Form Factor   | Selector                                    |
| ------------- | ------------------------------------------- |
| Banner        | `.amplitude-engagement-banner-container`    |
| Card          | `.amplitude-engagement-card-container`      |
| Modal         | `.amplitude-engagement-modal-container`     |
| Modal overlay | `[data-amplitude-engagement-modal-overlay]` |
| Popover       | `.amplitude-engagement-popover-container`   |
| Tooltip       | `.amplitude-engagement-tooltip-content`     |
| Pin           | `.amplitude-engagement-pin`                 |
| Checklist     | `.amplitude-engagement-checklist`           |

### Common elements

| Element      | Selector                       |
| ------------ | ------------------------------ |
| Close button | `.amplitude-engagement-close`  |
| Image        | `.amplitude-engagement-image`  |
| Video        | `.amplitude-engagement-video`  |
| Title        | `.amplitude-engagement-title`  |
| Content      | `.amplitude-engagement-content`|
| Beacon       | `.amplitude-engagement-beacon` |

### Banner-specific elements

| Element             | Selector                                    |
| ------------------- | ------------------------------------------- |
| Banner body         | `.amplitude-engagement-banner-body`         |
| Banner title        | `.amplitude-engagement-banner-title`        |
| Banner content      | `.amplitude-engagement-banner-content`      |
| Banner actions      | `.amplitude-engagement-banner-actions`      |
| Banner close button | `.amplitude-engagement-banner-close-button` |

### Tooltip-specific elements

| Element                 | Selector                                       |
| ----------------------- | ---------------------------------------------- |
| Tooltip content         | `.amplitude-engagement-tooltip-content`        |
| Tooltip marker          | `.amplitude-engagement-tooltip-marker`         |
| Tooltip marker (image)  | `.amplitude-engagement-tooltip-marker__image`  |
| Tooltip marker (icon)   | `.amplitude-engagement-tooltip-marker__icon`   |
| Tooltip marker (beacon) | `.amplitude-engagement-tooltip-marker__beacon` |

### Pin-specific elements

| Element     | Selector                            |
| ----------- | ----------------------------------- |
| Pin         | `.amplitude-engagement-pin`         |
| Pin beacon  | `.amplitude-engagement-pin-beacon`  |
| Pin content | `.amplitude-engagement-pin-content` |
| Pin arrow   | `.amplitude-engagement-pin-arrow`   |
| Pin mask    | `.amplitude-engagement-pin-mask`    |

### Checklist-specific elements

| Element                           | Selector                                                 |
| --------------------------------- | -------------------------------------------------------- |
| Checklist                         | `.amplitude-engagement-checklist`                        |
| Checklist header                  | `.amplitude-engagement-checklist-header`                 |
| Checklist title                   | `.amplitude-engagement-checklist-title`                  |
| Checklist subtitle                | `.amplitude-engagement-checklist-subtitle`               |
| Checklist progress                | `.amplitude-engagement-checklist-progress`               |
| Checklist close button            | `.amplitude-engagement-checklist-close-button`           |
| Checklist item header (expanded)  | `.amplitude-engagement-checklist-item-header__expanded`  |
| Checklist item header (collapsed) | `.amplitude-engagement-checklist-item-header__collapsed` |
| Checklist item body               | `.amplitude-engagement-checklist-item-body`              |
| Checklist item content            | `.amplitude-engagement-checklist-item-content`           |
| Checklist item buttons            | `.amplitude-engagement-checklist-item-buttons`           |
| Checklist item button (primary)   | `.amplitude-engagement-checklist-item-button__primary`   |
| Checklist item button (secondary) | `.amplitude-engagement-checklist-item-button__secondary` |

### Card-specific elements

| Element      | Selector                              |
| ------------ | ------------------------------------- |
| Card         | `.amplitude-engagement-card`          |
| Card content | `.amplitude-engagement-card-content`  |

### Modal-specific elements

| Element     | Selector                            |
| ----------- | ----------------------------------- |
| Modal body  | `.amplitude-engagement-modal-body`  |

### Buttons and actions

| Element                | Selector                                      |
| ---------------------- | --------------------------------------------- |
| CTA button             | `.amplitude-engagement-cta-button`            |
| CTA button (primary)   | `.amplitude-engagement-cta-button__primary`   |
| CTA button (secondary) | `.amplitude-engagement-cta-button__secondary` |
| Banner actions         | `.amplitude-engagement-banner-actions`        |

### Form elements (Survey elements)

| Element          | Selector                                 |
| ---------------- | ---------------------------------------- |
| List             | `.amplitude-engagement-list`             |
| List dropdown    | `.amplitude-engagement-list-dropdown`    |
| Rating           | `.amplitude-engagement-rating`           |
| Rating (emojis)  | `.amplitude-engagement-rating__emojis`   |
| Rating (numbers) | `.amplitude-engagement-rating__numbers`  |
| Rating (stars)   | `.amplitude-engagement-rating__stars`    |
| Rating label     | `.amplitude-engagement-rating-label`     |
| Text input       | `.amplitude-engagement-text-input`       |
| Short text input | `.amplitude-engagement-short-text-input` |
| Input            | `.amplitude-engagement-input`            |
| Select           | `.amplitude-engagement-select`           |
| Select input     | `.amplitude-engagement-select-input`     |
| Checkbox option  | `.amplitude-engagement-checkbox-option`  |
| Radio option     | `.amplitude-engagement-radio-option`     |

## Using class selectors

Use class selectors for basic styling, or to target specific form factors.

### Basic styling

```css
/* Style banner background */
.amplitude-engagement-banner-container {
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* Customize CTA button appearance */
.amplitude-engagement-cta-button {
  border-radius: 8px;
  text-transform: uppercase;
}

/* Style close button hover state */
.amplitude-engagement-close:hover {
  opacity: 0.7;
}
```

### Target specific form factors

```css
/* Style banners with custom background */
.amplitude-engagement-banner-container {
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* Style primary CTA buttons in banners */
.amplitude-engagement-banner-container
  .amplitude-engagement-cta-button__primary {
  width: 100%;
}

/* Style checklist progress bars */
.amplitude-engagement-checklist-progress {
  background-color: #f5f5f5;
}
```

## Important considerations

Keep the following considerations in mind as you implement custom CSS.

### Specificity

You may need to use `!important` to override default styles:

```css
.amplitude-engagement-banner-container {
  background-color: #custom-color !important;
}
```

### Selector stability

Target the documented CSS classes rather than:

- Internal generated class names
- Element structure that may change
- Undocumented classes or attributes
