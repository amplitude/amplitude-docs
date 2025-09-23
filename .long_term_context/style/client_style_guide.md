# Amplitude Documentation Style Guide

## Writing Style Guidelines

### Avoid Temporal Language
- **Don't use "currently"** in documentation. Documentation should always reflect the current state of the product.
- **Bad**: "Feature X is currently not supported"  
- **Good**: "Feature X is not supported" or "Amplitude does not support Feature X"

### Use Active Voice
- Prefer active voice over passive voice for clarity and directness.
- **Bad**: "Cross-region data sharing is currently not supported"
- **Good**: "Amplitude does not support cross-region data sharing"

## Formatting Guidelines

### Emphasis and Highlighting
- **Don't use bold text for emphasis** of important information. If content is important enough to be bolded, it should become a note or warning admonition instead.
- **Bad**: **Important limitation that users need to know**
- **Good**: Use appropriate admonition (note, warning, info) with descriptive title

### Admonitions
Use admonitions to highlight important information:
- `{{partial:admonition type="warning" title="Descriptive title"}}` for limitations, restrictions, or important caveats
- `{{partial:admonition type="note" title="Descriptive title"}}` for helpful information or clarifications  
- `{{partial:admonition type="info" title="Descriptive title"}}` for general information or context
