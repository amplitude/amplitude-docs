Guides and Surveys should match your brand and feel like part of your product. While [Themes](/docs/guides-and-surveys/themes) provide broad control over appearance, Custom CSS gives you fine-grained control over specific elements using CSS class selectors.

{{partial:admonition type="note" heading="Web SDK only"}}
Custom CSS is only available for the web SDK. Mobile SDKs (iOS, Android, React Native) don't support custom CSS.
{{/partial:admonition}}

## Overview

The Guides and Surveys SDK adds CSS classes to form factor elements, allowing you to target them with CSS. These selectors:

- Provide stable targets for custom styling
- Focus on container and parent elements
- Work alongside existing theme settings

## Class selectors

Use CSS class selectors to target Guides and Surveys elements:

```css
/* Target banner container */
.amplitude-banner-container {
  background-color: #f0f0f0;
}

/* Target modal overlay */
[data-amplitude-modal-overlay] {
  background-color: rgba(0, 0, 0, 0.8);
}
```

### Form factor containers

| Form Factor   | Selector                           |
| ------------- | ---------------------------------- |
| Banner        | `.amplitude-banner-container`      |
| Modal         | `.amplitude-modal-container`       |
| Modal overlay | `[data-amplitude-modal-overlay]`   |
| Popover       | `.amplitude-popover-container`     |
| Tooltip       | `.amplitude-tooltip-content`       |
| Pin           | `.amplitude-pin`                   |
| Checklist     | `.amplitude-checklist`             |

### Common elements

| Element      | Selector                |
| ------------ | ----------------------- |
| Close button | `.amplitude-close`      |
| Image        | `.amplitude-image`      |
| Beacon       | `.amplitude-beacon`     |

### Banner-specific elements

| Element               | Selector                           |
| --------------------- | ---------------------------------- |
| Banner body           | `.amplitude-banner-body`           |
| Banner title          | `.amplitude-banner-title`          |
| Banner content        | `.amplitude-banner-content`        |
| Banner actions        | `.amplitude-banner-actions`        |
| Banner close button   | `.amplitude-banner-close-button`   |

### Tooltip-specific elements

| Element                | Selector                              |
| ---------------------- | ------------------------------------- |
| Tooltip content        | `.amplitude-tooltip-content`          |
| Tooltip marker (image) | `.amplitude-tooltip-marker__image`    |
| Tooltip marker (icon)  | `.amplitude-tooltip-marker__icon`     |
| Tooltip marker (beacon)| `.amplitude-tooltip-marker__beacon`   |

### Pin-specific elements

| Element     | Selector                   |
| ----------- | -------------------------- |
| Pin         | `.amplitude-pin`           |
| Pin beacon  | `.amplitude-pin-beacon`    |
| Pin content | `.amplitude-pin-content`   |
| Pin arrow   | `.amplitude-pin-arrow`     |
| Pin mask    | `.amplitude-pin-mask`      |

### Checklist-specific elements

| Element                                  | Selector                                        |
| ---------------------------------------- | ----------------------------------------------- |
| Checklist                                | `.amplitude-checklist`                          |
| Checklist header                         | `.amplitude-checklist-header`                   |
| Checklist title                          | `.amplitude-checklist-title`                    |
| Checklist subtitle                       | `.amplitude-checklist-subtitle`                 |
| Checklist progress                       | `.amplitude-checklist-progress`                 |
| Checklist close button                   | `.amplitude-checklist-close-button`             |
| Checklist item header (expanded)         | `.amplitude-checklist-item-header__expanded`    |
| Checklist item header (collapsed)        | `.amplitude-checklist-item-header__collapsed`   |
| Checklist item body                      | `.amplitude-checklist-item-body`                |
| Checklist item content                   | `.amplitude-checklist-item-content`             |
| Checklist item buttons                   | `.amplitude-checklist-item-buttons`             |
| Checklist item button (primary)          | `.amplitude-checklist-item-button__primary`     |
| Checklist item button (secondary)        | `.amplitude-checklist-item-button__secondary`   |

### Buttons and actions

| Element                | Selector                           |
| ---------------------- | ---------------------------------- |
| CTA button             | `.amplitude-cta-button`            |
| CTA button (primary)   | `.amplitude-cta-button__primary`   |
| CTA button (secondary) | `.amplitude-cta-button__secondary` |
| Banner actions         | `.amplitude-banner-actions`        |

### Form elements (Survey elements)

| Element               | Selector                          |
| --------------------- | --------------------------------- |
| List                  | `.amplitude-list`                 |
| List dropdown         | `.amplitude-list-dropdown`        |
| Rating                | `.amplitude-rating`               |
| Rating (emojis)       | `.amplitude-rating__emojis`       |
| Text input            | `.amplitude-text-input`           |
| Short text input      | `.amplitude-short-text-input`     |
| Checkbox option       | `.amplitude-checkbox-option`      |
| Radio option          | `.amplitude-radio-option`         |

## Usage

### Basic styling

```css
/* Style banner background */
.amplitude-banner-container {
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* Customize CTA button appearance */
.amplitude-cta-button {
  border-radius: 8px;
  text-transform: uppercase;
}

/* Style close button hover state */
.amplitude-close:hover {
  opacity: 0.7;
}
```

### Target specific form factors

```css
/* Style banners with custom background */
.amplitude-banner-container {
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* Style primary CTA buttons in banners */
.amplitude-banner-container .amplitude-cta-button__primary {
  width: 100%;
}

/* Style checklist progress bars */
.amplitude-checklist-progress {
  background-color: #f5f5f5;
}
```

## Important considerations

### Specificity

You may need to use `!important` to override default styles:

```css
.amplitude-banner-container {
  background-color: #custom-color !important;
}
```

### Selector stability

Target the documented CSS classes rather than:

- Internal generated class names
- Element structure that may change
- Undocumented classes or attributes
