Guides and Surveys should match your brand and feel like part of your product. While [Themes](/docs/guides-and-surveys/themes) provide broad control over appearance, Custom CSS gives you fine-grained control over specific elements using data attribute selectors.

{{partial:admonition type="note" heading="Web SDK only"}}
Custom CSS is only available for the web SDK. Mobile SDKs (iOS, Android, React Native) don't support custom CSS.
{{/partial:admonition}}

## Overview

The Guides and Surveys SDK adds data attributes to form factor elements, allowing you to target them with CSS. These selectors:

- Provide stable targets for custom styling
- Focus on container and parent elements
- Work alongside existing theme settings

## Attribute selectors

Use CSS attribute selectors to target Guides and Surveys elements:

```css
/* Target banner container */
[data-amplitude-banner-container] {
  background-color: #f0f0f0;
}

/* Target modal overlay */
[data-amplitude-modal-overlay] {
  background-color: rgba(0, 0, 0, 0.8);
}
```

### Form factor containers

| Form Factor     | Selector                             |
| --------------- | ------------------------------------ |
| Banner          | `[data-amplitude-banner-container]`  |
| Modal           | `[data-amplitude-modal-container]`   |
| Modal overlay   | `[data-amplitude-modal-overlay]`     |
| Popover         | `[data-amplitude-popover-container]` |
| Tooltip         | `[data-amplitude-tooltip-container]` |
| Pin             | `[data-amplitude-pin]`               |
| Checklist       | `[data-amplitude-checklist]`         |
| Resource Center | `[data-amplitude-resource-center]`   |

### Common elements

| Element      | Selector                    |
| ------------ | --------------------------- |
| Header       | `[data-amplitude-header]`   |
| Footer       | `[data-amplitude-footer]`   |
| Content      | `[data-amplitude-content]`  |
| Media        | `[data-amplitude-media]`    |
| Close button | `[data-amplitude-close]`    |
| Branding     | `[data-amplitude-branding]` |

### Banner-specific elements

| Element                | Selector                                  |
| ---------------------- | ----------------------------------------- |
| Banner body            | `[data-amplitude-banner-body]`            |
| Banner title           | `[data-amplitude-banner-title]`           |
| Banner close           | `[data-amplitude-banner-close]`           |
| Banner close container | `[data-amplitude-banner-close-container]` |

### Tooltip-specific elements

| Element         | Selector                           |
| --------------- | ---------------------------------- |
| Tooltip content | `[data-amplitude-tooltip-content]` |
| Tooltip close   | `[data-amplitude-tooltip-close]`   |
| Tooltip trigger | `[data-amplitude-tooltip-trigger]` |

### Pin-specific elements

| Element     | Selector                       |
| ----------- | ------------------------------ |
| Pin beacon  | `[data-amplitude-pin-beacon]`  |
| Pin content | `[data-amplitude-pin-content]` |
| Pin mask    | `[data-amplitude-pin-mask]`    |

### Checklist-specific elements

| Element            | Selector                              |
| ------------------ | ------------------------------------- |
| Checklist header   | `[data-amplitude-checklist-header]`   |
| Checklist body     | `[data-amplitude-checklist-body]`     |
| Checklist progress | `[data-amplitude-checklist-progress]` |

### Buttons and actions

| Element          | Selector                                   |
| ---------------- | ------------------------------------------ |
| Button           | `[data-amplitude-button]`                  |
| Primary button   | `[data-amplitude-button-type="primary"]`   |
| Secondary button | `[data-amplitude-button-type="secondary"]` |
| Banner actions   | `[data-amplitude-banner-actions]`          |

### Form elements

| Element         | Selector                                      |
| --------------- | --------------------------------------------- |
| Form field      | `[data-amplitude-form-field]`                 |
| Input           | `[data-amplitude-input]`                      |
| Text input      | `[data-amplitude-input-type="text"]`          |
| Text area       | `[data-amplitude-input-type="text-short"]`    |
| Text other      | `[data-amplitude-input-type="text-other"]`    |
| Dropdown        | `[data-amplitude-input-type="dropdown"]`      |
| Radio list      | `[data-amplitude-input-type="radio-list"]`    |
| Checkbox list   | `[data-amplitude-input-type="checkbox-list"]` |
| Rating          | `[data-amplitude-rating]`                     |
| Rating type     | `[data-amplitude-rating-type]`                |
| Option          | `[data-amplitude-option]`                     |
| Radio option    | `[data-amplitude-option-type="radio"]`        |
| Checkbox option | `[data-amplitude-option-type="checkbox"]`     |

### Resource Center elements

| Element              | Selector                                                |
| -------------------- | ------------------------------------------------------- |
| Content              | `[data-amplitude-resource-center-content]`              |
| Header               | `[data-amplitude-resource-center-header]`               |
| Footer               | `[data-amplitude-resource-center-footer]`               |
| Search               | `[data-amplitude-resource-center-search]`               |
| Search results       | `[data-amplitude-resource-center-search-results]`       |
| Recommendations      | `[data-amplitude-resource-center-recommendations]`      |
| Additional resources | `[data-amplitude-resource-center-additional-resources]` |

## Usage

### Basic styling

```css
/* Style banner background */
[data-amplitude-banner-container] {
  background: linear-gradient(to right, #667eea, #764ba2);
}

/* Customize button appearance */
[data-amplitude-button] {
  border-radius: 8px;
  text-transform: uppercase;
}

/* Style close button hover state */
[data-amplitude-close]:hover {
  opacity: 0.7;
}
```

### Target specific form factors

```css
/* Style only modal headers */
[data-amplitude-modal-container] [data-amplitude-header] {
  border-bottom: 2px solid #e0e0e0;
}

/* Style primary buttons in banners */
[data-amplitude-banner-container] [data-amplitude-button-type="primary"] {
  width: 100%;
}
```

## Important considerations

### Specificity

You may need to use `!important` to override default styles:

```css
[data-amplitude-banner-container] {
  background-color: #custom-color !important;
}
```

### Selector stability

Target the documented data attributes rather than:

- Generated class names
- Internal element structure
- Undocumented attributes
